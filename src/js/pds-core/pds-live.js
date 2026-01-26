/**
 * Live-mode initialization and API surface for PDS.
 * Separated to keep the base runtime bundle lean for production/static usage.
 */
import { Generator } from "./pds-generator.js";
import { applyStyles, adoptLayers, adoptPrimitives } from "./pds-runtime.js";
import { presets, defaultLog } from "./pds-config.js";
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

let __liveApiReady = false;
let __queryClass = null;

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
    const normalized = normalizeInitConfig(config, {}, { presets, defaultLog });
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
