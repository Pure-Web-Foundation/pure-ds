/**
 * Live-mode initialization and API surface for PDS.
 * Separated to keep the base runtime bundle lean for production/static usage.
 */
import { Generator } from "./pds-generator.js";
import { applyStyles, adoptLayers, adoptPrimitives } from "./pds-runtime.js";
import {
  presets,
  defaultLog,
  PDS_CONFIG_RELATIONS,
  PDS_DESIGN_CONFIG_SPEC,
  PDS_DEFAULT_CONFIG_EDITOR_METADATA,
  PDS_DEFAULT_CONFIG_FORM_SCHEMA,
  buildDesignConfigFormSchema,
  getDesignConfigEditorMetadata,
  validateDesignConfig,
  validateInitConfig,
} from "./pds-config.js";
import { defaultPDSEnhancers } from "./pds-enhancers.js";
import { defaultPDSEnhancerMetadata } from "./pds-enhancers-meta.js";
import { resolvePublicAssetURL } from "./pds-paths.js";
import { loadTypographyFonts } from "../common/font-loader.js";
import {
  ensureAbsoluteAssetURL,
  ensureTrailingSlash,
  attachFoucListener,
  normalizeInitConfig,
  resolveRuntimeAssetRoot,
  resolveThemeAndApply,
  setupAutoDefinerAndEnhancers,
  stripFunctions,
} from "./pds-start-helpers.js";
import {
  isPresetThemeCompatible,
  normalizePresetThemes,
  resolveThemePreference,
} from "./pds-theme-utils.js";

let __liveApiReady = false;
let __queryClass = null;

const LIVE_EDIT_TOGGLE_ID = "pds-live-edit-toggle";
const LIVE_EDIT_TOGGLE_STYLE_ID = "pds-live-edit-toggle-style";

function whenDocumentBodyReady(callback) {
  if (typeof document === "undefined" || typeof callback !== "function") return;
  if (document.body) {
    callback();
    return;
  }

  const onReady = () => {
    if (!document.body) return;
    document.removeEventListener("DOMContentLoaded", onReady);
    callback();
  };

  document.addEventListener("DOMContentLoaded", onReady, { once: true });
}

function mountLiveEdit() {
  if (typeof document === "undefined") return;
  whenDocumentBodyReady(() => {
    if (!document.querySelector("pds-live-edit")) {
      const liveEditor = document.createElement("pds-live-edit");
      document.body.appendChild(liveEditor);
    }
  });
}

function unmountLiveEdit() {
  if (typeof document === "undefined") return;
  const editors = document.querySelectorAll("pds-live-edit");
  editors.forEach((editor) => editor.remove());
}

function ensureLiveEditToggleStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(LIVE_EDIT_TOGGLE_STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = LIVE_EDIT_TOGGLE_STYLE_ID;
  style.textContent = /*css*/`
    :where(#${LIVE_EDIT_TOGGLE_ID}) {
      position: fixed;
      top: var(--spacing-3);
      right: var(--spacing-3);
      z-index: var(--z-dropdown, 1050);
    }
  `;
  document.head.appendChild(style);
}

function updateLiveEditToggleState(button, isEnabled) {
  if (!button) return;

  button.classList.toggle("btn-primary", isEnabled);
  button.classList.toggle("btn-secondary", !isEnabled);
  button.setAttribute("aria-pressed", isEnabled ? "true" : "false");

  const label = isEnabled
    ? "Disable live edit mode"
    : "Enable live edit mode";
  button.setAttribute("aria-label", label);
  button.setAttribute("title", label);
}

function ensureLiveEditToggleButton() {
  if (typeof document === "undefined") return null;

  ensureLiveEditToggleStyles();

  let button = document.getElementById(LIVE_EDIT_TOGGLE_ID);
  if (!button) {
    button = document.createElement("button");
    button.id = LIVE_EDIT_TOGGLE_ID;
    button.type = "button";
    button.className = "icon-only btn-secondary";
    button.setAttribute("data-pds-live-edit-ignore", "true");
    button.innerHTML = '<pds-icon icon="cursor-click" size="sm"></pds-icon>';
    whenDocumentBodyReady(() => {
      if (!document.getElementById(LIVE_EDIT_TOGGLE_ID)) {
        document.body.appendChild(button);
      }
    });
  }

  return button;
}

function teardownLiveEditToggle() {
  if (typeof document === "undefined") return;
  const button = document.getElementById(LIVE_EDIT_TOGGLE_ID);
  if (button) button.remove();
  const style = document.getElementById(LIVE_EDIT_TOGGLE_STYLE_ID);
  if (style) style.remove();
  unmountLiveEdit();
}

function initializeLiveEditToggle() {
  if (typeof document === "undefined") return;
  const toggleButton = ensureLiveEditToggleButton();
  if (!toggleButton) return;

  const setLiveEditEnabled = (enabled) => {
    if (enabled) {
      mountLiveEdit();
    } else {
      unmountLiveEdit();
    }
    updateLiveEditToggleState(toggleButton, enabled);
  };

  setLiveEditEnabled(false);

  toggleButton.onclick = () => {
    const isEnabled = Boolean(document.querySelector("pds-live-edit"));
    if (isEnabled) {
      setLiveEditEnabled(false);
      return;
    }

    setLiveEditEnabled(true);
  };

  if (toggleButton.__pdsLiveEditDisableHandler) {
    document.removeEventListener("pds:live-edit:disable", toggleButton.__pdsLiveEditDisableHandler);
  }
  if (toggleButton.__pdsLiveEditEnableHandler) {
    document.removeEventListener("pds:live-edit:enable", toggleButton.__pdsLiveEditEnableHandler);
  }

  const disableHandler = () => {
    setLiveEditEnabled(false);
  };

  const enableHandler = () => {
    setLiveEditEnabled(true);
  };

  toggleButton.__pdsLiveEditDisableHandler = disableHandler;
  document.addEventListener("pds:live-edit:disable", disableHandler);
  toggleButton.__pdsLiveEditEnableHandler = enableHandler;
  document.addEventListener("pds:live-edit:enable", enableHandler);
}

function getStoredLiveConfig() {
  if (typeof window === "undefined" || !window.localStorage) return null;
  try {
    const raw = window.localStorage.getItem("pure-ds-config");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && ("preset" in parsed || "design" in parsed)) return parsed;
  } catch (e) {
    return null;
  }
  return null;
}

function deepMergeConfig(target = {}, source = {}) {
  if (!source || typeof source !== "object") return target;
  const out = Array.isArray(target) ? [...target] : { ...target };
  for (const [key, value] of Object.entries(source)) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      out[key] = deepMergeConfig(
        out[key] && typeof out[key] === "object" ? out[key] : {},
        value
      );
    } else {
      out[key] = value;
    }
  }
  return out;
}

function applyStoredConfigOverrides(baseConfig) {
  const stored = getStoredLiveConfig();
  if (!stored || !baseConfig || typeof baseConfig !== "object") return baseConfig;

  const storedPreset = stored.preset;
  const storedDesign =
    stored.design && typeof stored.design === "object" ? stored.design : null;

  if (!storedPreset && !storedDesign) return baseConfig;

  const hasNewShape =
    "preset" in baseConfig || "design" in baseConfig || "enhancers" in baseConfig;

  let nextConfig = { ...baseConfig };

  if (storedPreset) {
    nextConfig.preset = storedPreset;
  }

  if (storedDesign) {
    if (hasNewShape) {
      const baseDesign =
        baseConfig.design && typeof baseConfig.design === "object"
          ? baseConfig.design
          : {};
      nextConfig.design = deepMergeConfig(baseDesign, storedDesign);
    } else {
      nextConfig = deepMergeConfig(baseConfig, storedDesign);
    }
  }

  return nextConfig;
}

function buildPresetOmniboxSettings(PDS, options = {}) {
  const {
    hideCategory = true,
    itemGrid = "45px 1fr",
    includeIncompatible = true,
    disableIncompatible = true,
    categoryName = "Presets",
    theme,
    onSelect,
    iconHandler,
  } = options || {};

  const resolvedTheme = resolveThemePreference(theme ?? PDS?.theme);

  const defaultIconHandler = (item) => {
    const preset = findPresetById(item?.id);
    const colors = preset?.colors || {};
    const primary = colors?.primary;
    const secondary = colors?.secondary;
    const accent = colors?.accent;

    if (primary && secondary && accent) {
      return `<span style="display:flex;gap:1px;flex-shrink:0;" aria-hidden="true">
        <span style="display:inline-block;width:10px;height:20px;background-color:${primary};">&nbsp;</span>
        <span style="display:inline-block;width:10px;height:20px;background-color:${secondary};">&nbsp;</span>
        <span style="display:inline-block;width:10px;height:20px;background-color:${accent};">&nbsp;</span>
      </span>`;
    }

    if (item?.icon) {
      return `<pds-icon icon="${item.icon}" size="sm"></pds-icon>`;
    }
    return "";
  };

  const getPresetEntries = () => {
    const source = PDS?.presets || {};
    return Object.values(source || {}).filter((preset) => {
      const presetId = preset?.id || preset?.name;
      return Boolean(presetId);
    });
  };

  const findPresetById = (presetId) => {
    if (!presetId) return null;
    const entries = getPresetEntries();
    return (
      entries.find((preset) => String(preset?.id || preset?.name) === String(presetId)) ||
      null
    );
  };

  return {
    hideCategory,
    itemGrid,
    iconHandler:
      typeof iconHandler === "function" ? iconHandler : defaultIconHandler,
    categories: {
      [categoryName]: {
        trigger: () => true,
        getItems: (context = {}) => {
          const query = String(context?.search || "").toLowerCase().trim();
          const entries = getPresetEntries();

          return entries
            .filter((preset) => {
              const name = String(preset?.name || preset?.id || "").toLowerCase();
              const description = String(preset?.description || "").toLowerCase();
              const tags = Array.isArray(preset?.tags)
                ? preset.tags.map((tag) => String(tag).toLowerCase())
                : [];

              if (query) {
                const matchesQuery =
                  name.includes(query) ||
                  description.includes(query) ||
                  tags.some((tag) => tag.includes(query));
                if (!matchesQuery) return false;
              }

              const compatible = isPresetThemeCompatible(preset, resolvedTheme);
              if (!includeIncompatible && !compatible) return false;
              return true;
            })
            .map((preset) => {
              const presetId = preset?.id || preset?.name;
              const compatible = isPresetThemeCompatible(preset, resolvedTheme);
              const supportedThemes = normalizePresetThemes(preset);
              const themeHint =
                supportedThemes.length === 1
                  ? `${supportedThemes[0]} only`
                  : `Not available in ${resolvedTheme} mode`;
              const baseDescription = String(preset?.description || "").trim();
              const description = compatible
                ? baseDescription
                : baseDescription
                  ? `${baseDescription} - ${themeHint}`
                  : themeHint;

              return {
                id: presetId,
                text: preset?.name || String(presetId),
                description,
                icon: "palette",
                class:
                  !compatible && disableIncompatible ? "disabled" : "",
                disabled: !compatible && disableIncompatible,
                tooltip: !compatible ? themeHint : "",
              };
            })
            .sort((a, b) =>
              String(a.text || "").localeCompare(String(b.text || ""))
            );
        },
        action: async (selection) => {
          if (!selection?.id) return selection?.id;
          if (selection?.disabled) return selection?.id;

          const preset = findPresetById(selection.id);
          if (!preset) return selection?.id;

          if (typeof onSelect === "function") {
            return await onSelect({ preset, selection, resolvedTheme });
          }

          if (typeof PDS?.applyLivePreset === "function") {
            await PDS.applyLivePreset(preset.id || selection.id);
          }

          return preset.id || selection.id;
        },
      },
    },
  };
}

async function __attachLiveAPIs(PDS, { applyResolvedTheme, setupSystemListenerIfNeeded }) {
  if (__liveApiReady) return;

  const [ontologyModule, enumsModule, queryModule, commonModule] =
    await Promise.all([
      import("./pds-ontology.js"),
      import("./pds-enums.js"),
      import("./pds-query.js"),
      import("../common/common.js"),
    ]);

  const ontology = ontologyModule?.default || ontologyModule?.ontology;
  const findComponentForElement = ontologyModule?.findComponentForElement;
  const enums = enumsModule?.enums;
  __queryClass = queryModule?.PDSQuery || queryModule?.default || null;

  // Expose live-only APIs
  PDS.ontology = ontology;
  PDS.findComponentForElement = findComponentForElement;
  PDS.enums = enums;
  PDS.common = commonModule || {};
  PDS.presets = presets;
  PDS.configRelations = PDS_CONFIG_RELATIONS;
  PDS.configSpec = PDS_DESIGN_CONFIG_SPEC;
  PDS.configEditorMetadata = PDS_DEFAULT_CONFIG_EDITOR_METADATA;
  PDS.configFormSchema = PDS_DEFAULT_CONFIG_FORM_SCHEMA;
  PDS.buildConfigFormSchema = buildDesignConfigFormSchema;
  PDS.getConfigEditorMetadata = getDesignConfigEditorMetadata;
  PDS.enhancerMetadata = defaultPDSEnhancerMetadata;
  PDS.applyStyles = function(generator) {
    return applyStyles(generator || Generator.instance);
  };
  PDS.adoptLayers = function(shadowRoot, layers, additionalSheets) {
    return adoptLayers(
      shadowRoot,
      layers,
      additionalSheets,
      Generator.instance
    );
  };
  PDS.adoptPrimitives = function(shadowRoot, additionalSheets) {
    return adoptPrimitives(shadowRoot, additionalSheets, Generator.instance);
  };
  PDS.getGenerator = async function() {
    return Generator;
  };
  PDS.query = async function(question) {
    if (!__queryClass) {
      const mod = await import("./pds-query.js");
      __queryClass = mod?.PDSQuery || mod?.default || null;
    }
    if (!__queryClass) return [];
    const queryEngine = new __queryClass(PDS);
    return await queryEngine.search(question);
  };
  PDS.buildPresetOmniboxSettings = function(options = {}) {
    return buildPresetOmniboxSettings(PDS, options);
  };

  PDS.applyLivePreset = async function(presetId, options = {}) {
    if (!presetId) return false;
    if (!PDS.registry?.isLive) {
      console.warn("PDS.applyLivePreset is only available in live mode.");
      return false;
    }

    const baseConfig = PDS.currentConfig || {};
    const { design: _design, preset: _preset, ...rest } = baseConfig;
    const inputConfig = {
      ...structuredClone(stripFunctions(rest)),
      preset: presetId,
    };

    const normalized = normalizeInitConfig(inputConfig, {}, {
      presets,
      defaultLog,
      validateDesignConfig,
      validateInitConfig,
    });

    const resolvedTheme = resolveThemePreference(PDS.theme);
    if (!isPresetThemeCompatible(normalized.generatorConfig.design, resolvedTheme)) {
      const presetName =
        normalized.presetInfo?.name ||
        normalized.generatorConfig?.design?.name ||
        presetId;
      console.warn(
        `PDS theme "${resolvedTheme}" not supported by preset "${presetName}".`
      );
    }

    if (baseConfig.theme && !normalized.generatorConfig.theme) {
      normalized.generatorConfig.theme = baseConfig.theme;
    }

    const generator = new Generator(normalized.generatorConfig);

    if (normalized.generatorConfig.design?.typography) {
      try {
        await loadTypographyFonts(normalized.generatorConfig.design.typography);
      } catch (error) {
        normalized.generatorConfig?.log?.(
          "warn",
          "Failed to load some fonts from Google Fonts:",
          error,
        );
      }
    }

    await applyStyles(generator);

    const presetInfo = normalized.presetInfo || { id: presetId, name: presetId };
    PDS.currentPreset = presetInfo;
    PDS.currentConfig = Object.freeze({
      ...baseConfig,
      preset: normalized.generatorConfig.preset,
      design: structuredClone(normalized.generatorConfig.design),
      theme: normalized.generatorConfig.theme || baseConfig.theme,
    });
    PDS.configEditorMetadata = getDesignConfigEditorMetadata(
      normalized.generatorConfig.design
    );
    PDS.configFormSchema = buildDesignConfigFormSchema(
      normalized.generatorConfig.design
    );

    const persist = options?.persist !== false;
    if (persist && typeof window !== "undefined") {
      const storageKey = "pure-ds-config";
      try {
        const storedRaw = localStorage.getItem(storageKey);
        const storedParsed = storedRaw ? JSON.parse(storedRaw) : null;
        const nextStored = {
          ...(storedParsed && typeof storedParsed === "object"
            ? storedParsed
            : {}),
          preset: presetInfo.id || presetId,
          design: structuredClone(normalized.generatorConfig.design || {}),
        };
        localStorage.setItem(storageKey, JSON.stringify(nextStored));
      } catch (error) {
        normalized.generatorConfig?.log?.(
          "warn",
          "Failed to store preset:",
          error,
        );
      }
    }

    return true;
  };

  // Live-only compiled getter
  if (!Object.getOwnPropertyDescriptor(PDS, "compiled")) {
    Object.defineProperty(PDS, "compiled", {
      get() {
        if (PDS.registry?.isLive && Generator.instance) {
          return Generator.instance.compiled;
        }
        return null;
      },
      enumerable: true,
      configurable: false,
    });
  }

  // Live-only preload helper
  PDS.preloadCritical = function(config, options = {}) {
    if (typeof window === "undefined" || !document.head || !config) {
      return;
    }

    const { theme, layers = ["tokens"] } = options;

    try {
      let resolvedTheme = theme || "light";
      if (theme === "system" || !theme) {
        const prefersDark =
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches;
        resolvedTheme = prefersDark ? "dark" : "light";
      }

      document.documentElement.setAttribute("data-theme", resolvedTheme);

      const tempConfig = config.design
        ? { ...config, theme: resolvedTheme }
        : { design: config, theme: resolvedTheme };
      const tempGenerator = new Generator(tempConfig);

      const criticalCSS = layers
        .map((layer) => {
          try {
            return tempGenerator.css?.[layer] || "";
          } catch (e) {
            return "";
          }
        })
        .filter((css) => css.trim())
        .join("\n");

      if (criticalCSS) {
        const existing = document.head.querySelector("style[data-pds-preload]");
        if (existing) existing.remove();

        const styleEl = document.createElement("style");
        styleEl.setAttribute("data-pds-preload", "");
        styleEl.textContent = criticalCSS;
        document.head.insertBefore(styleEl, document.head.firstChild);
      }
    } catch (error) {
      console.warn("PDS preload failed:", error);
    }
  };

  __liveApiReady = true;
}


export async function startLive(PDS, config, { emitReady, applyResolvedTheme, setupSystemListenerIfNeeded }) {
  if (!config || typeof config !== "object") {
    throw new Error(
      "PDS.start({ mode: 'live', ... }) requires a valid configuration object"
    );
  }

  config = applyStoredConfigOverrides(config);

  // Attach live-only API surface (ontology, presets, query, etc.)
  await __attachLiveAPIs(PDS, { applyResolvedTheme, setupSystemListenerIfNeeded });
  attachFoucListener(PDS);

  // FOUC Prevention: Use constructable stylesheet for synchronous, immediate effect
  if (typeof document !== "undefined" && document.adoptedStyleSheets) {
    const css = /*css*/`
          html { opacity: 0; }
          html.pds-ready { opacity: 1; transition: opacity 0.3s ease-in; }
        `;
    try {
      const hasFoucSheet = document.adoptedStyleSheets.some((sheet) => sheet._pdsFouc);
      if (!hasFoucSheet) {
        const foucSheet = new CSSStyleSheet();
        foucSheet.replaceSync(css);
        foucSheet._pdsFouc = true;
        document.adoptedStyleSheets = [foucSheet, ...document.adoptedStyleSheets];
      }
    } catch (e) {
      console.warn("Constructable stylesheets not supported, using <style> tag fallback:", e);
      const existingFoucStyle = document.head.querySelector("style[data-pds-fouc]");
      if (!existingFoucStyle) {
        const foucStyle = document.createElement("style");
        foucStyle.setAttribute("data-pds-fouc", "");
        foucStyle.textContent = css;
        document.head.insertBefore(foucStyle, document.head.firstChild);
      }
    }
  }

  // Extract runtime flags directly from unified config
  let applyGlobalStyles = config.applyGlobalStyles ?? true;
  let manageTheme = config.manageTheme ?? true;
  let themeStorageKey = config.themeStorageKey ?? "pure-ds-theme";
  let preloadStyles = config.preloadStyles ?? false;
  let criticalLayers = config.criticalLayers ?? ["tokens", "primitives"];

  const cfgAuto = (config && config.autoDefine) || null;

  try {
    // 1) Handle theme preference
    const { resolvedTheme } = resolveThemeAndApply({
      manageTheme,
      themeStorageKey,
      applyResolvedTheme,
      setupSystemListenerIfNeeded,
    });

    // 2) Normalize first-arg API: support { preset, design, enhancers }
    const normalized = normalizeInitConfig(config, {}, {
      presets,
      defaultLog,
      validateDesignConfig,
      validateInitConfig,
    });
    if (manageTheme && !isPresetThemeCompatible(normalized.generatorConfig.design, resolvedTheme)) {
      const presetName =
        normalized.presetInfo?.name ||
        normalized.generatorConfig?.design?.name ||
        normalized.generatorConfig?.preset ||
        "current preset";
      console.warn(
        `PDS theme "${resolvedTheme}" not supported by preset "${presetName}".`
      );
    }
    const userEnhancers = normalized.enhancers;
    const { log: logFn, ...configToClone } = normalized.generatorConfig;
    const generatorConfig = structuredClone(configToClone);
    generatorConfig.log = logFn;
    if (manageTheme) {
      generatorConfig.theme = resolvedTheme;
    }

    const generator = new Generator(generatorConfig);

    // 3) Load fonts from Google Fonts if needed (before applying styles)
    if (generatorConfig.design?.typography) {
      try {
        await loadTypographyFonts(generatorConfig.design.typography);
      } catch (ex) {
        generatorConfig?.log?.("warn", "Failed to load some fonts from Google Fonts:", ex);
      }
    }

    // 4) Preload critical styles synchronously to prevent flash
    if (preloadStyles && typeof window !== "undefined" && document.head) {
      try {
        const criticalCSS = criticalLayers
          .map((layer) => {
            try {
              return generator.css?.[layer] || "";
            } catch (e) {
              generatorConfig?.log?.(
                "warn",
                `Failed to generate critical CSS for layer "${layer}":`,
                e
              );
              return "";
            }
          })
          .filter((css) => css.trim())
          .join("\n");

        if (criticalCSS) {
          const existingCritical = document.head.querySelector(
            "style[data-pds-critical]"
          );
          if (existingCritical) {
            existingCritical.remove();
          }

          const styleEl = document.createElement("style");
          styleEl.setAttribute("data-pds-critical", "");
          styleEl.textContent = criticalCSS;

          const insertAfter = document.head.querySelector(
            'meta[charset], meta[name="viewport"]'
          );
          if (insertAfter) {
            insertAfter.parentNode.insertBefore(
              styleEl,
              insertAfter.nextSibling
            );
          } else {
            document.head.insertBefore(styleEl, document.head.firstChild);
          }
        }
      } catch (error) {
        generatorConfig?.log?.("warn", "Failed to preload critical styles:", error);
      }
    }

    // Set the registry to live mode
    PDS.registry.setLiveMode();

    // Log preset info if available
    if (normalized.presetInfo?.name) {
      generatorConfig?.log?.("log", `PDS live with preset "${normalized.presetInfo.name}"`);
    } else {
      generatorConfig?.log?.("log", "PDS live with custom config");
    }

    // Apply styles globally if requested (default behavior)
    if (applyGlobalStyles) {
      await applyStyles(Generator.instance);

      if (typeof window !== "undefined") {
        setTimeout(() => {
          const criticalStyle = document.head.querySelector(
            "style[data-pds-critical]"
          );
          if (criticalStyle) criticalStyle.remove();

          const preloadStyle = document.head.querySelector(
            "style[data-pds-preload]"
          );
          if (preloadStyle) preloadStyle.remove();

          const legacyRuntime = document.getElementById(
            "pds-runtime-stylesheet"
          );
          if (legacyRuntime) legacyRuntime.remove();
        }, 100);
      }
    }

    const assetRootURL = resolveRuntimeAssetRoot(config, { resolvePublicAssetURL });

    let derivedAutoDefineBaseURL;
    if (cfgAuto && cfgAuto.baseURL) {
      derivedAutoDefineBaseURL = ensureTrailingSlash(
        ensureAbsoluteAssetURL(cfgAuto.baseURL, { preferModule: false })
      );
    } else {
      derivedAutoDefineBaseURL = `${assetRootURL}components/`;
    }

    // 5) Set up AutoDefiner + run enhancers (defaults merged with user)
    let autoDefiner = null;
    let mergedEnhancers = [];
    
    try {
      const res = await setupAutoDefinerAndEnhancers({
        autoDefineBaseURL: derivedAutoDefineBaseURL,
        autoDefinePreload:
          (cfgAuto && Array.isArray(cfgAuto.predefine) && cfgAuto.predefine) ||
          [],
        autoDefineMapper:
          (cfgAuto && typeof cfgAuto.mapper === "function" && cfgAuto.mapper) ||
          null,
        enhancers: userEnhancers,
        autoDefineOverrides: cfgAuto || null,
        autoDefinePreferModule: !(cfgAuto && cfgAuto.baseURL),
      }, { baseEnhancers: defaultPDSEnhancers });
      autoDefiner = res.autoDefiner;
      mergedEnhancers = res.mergedEnhancers || [];
      
    } catch (error) {
      generatorConfig?.log?.("error", "❌ Failed to initialize AutoDefiner/Enhancers:", error);
    }

    const resolvedConfig = generator?.options || generatorConfig;

    const cloneableConfig = stripFunctions(config);
    PDS.currentConfig = Object.freeze({
      mode: "live",
      ...structuredClone(cloneableConfig),
      design: structuredClone(normalized.generatorConfig.design),
      preset: normalized.generatorConfig.preset,
      theme: resolvedTheme,
      enhancers: mergedEnhancers,
    });
    PDS.configEditorMetadata = getDesignConfigEditorMetadata(
      normalized.generatorConfig.design
    );
    PDS.configFormSchema = buildDesignConfigFormSchema(
      normalized.generatorConfig.design
    );

    if (typeof document !== "undefined") {
      try {
        if (config?.liveEdit) {
          setTimeout(() => {
            initializeLiveEditToggle();
          }, 0);
        } else {
          teardownLiveEditToggle();
        }
      } catch (error) {
        generatorConfig?.log?.("warn", "Live editor toggle failed to start:", error);
      }
    }

    emitReady({
      mode: "live",
      generator,
      config: resolvedConfig,
      theme: resolvedTheme,
      autoDefiner,
    });

    return {
      generator,
      config: resolvedConfig,
      theme: resolvedTheme,
      autoDefiner,
    };
  } catch (error) {
    PDS.dispatchEvent(new CustomEvent("pds:error", { detail: { error } }));
    throw error;
  }
}
