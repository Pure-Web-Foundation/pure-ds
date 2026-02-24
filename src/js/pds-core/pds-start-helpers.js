/**
 * Shared initialization helpers for static and live startup.
 * Kept separate to avoid pulling live-only logic into the base runtime bundle.
 */

import { AutoDefiner as CoreAutoDefiner } from "pure-web/auto-definer";

const __ABSOLUTE_URL_PATTERN__ = /^[a-z][a-z0-9+\-.]*:\/\//i;
const __MODULE_URL__ = (() => {
  try {
    return import.meta.url;
  } catch (e) {
    return undefined;
  }
})();

export const ensureTrailingSlash = (value) =>
  typeof value === "string" && value.length && !value.endsWith("/")
    ? `${value}/`
    : value;

export function ensureAbsoluteAssetURL(value, options = {}) {
  if (!value || __ABSOLUTE_URL_PATTERN__.test(value)) {
    return value;
  }

  const { preferModule = true } = options;

  const tryModule = () => {
    if (!__MODULE_URL__) return null;
    try {
      return new URL(value, __MODULE_URL__).href;
    } catch (e) {
      return null;
    }
  };

  const tryWindow = () => {
    if (typeof window === "undefined" || !window.location?.origin) {
      return null;
    }
    try {
      return new URL(value, window.location.origin).href;
    } catch (e) {
      return null;
    }
  };

  const resolved = preferModule
    ? tryModule() || tryWindow()
    : tryWindow() || tryModule();

  return resolved || value;
}

const __MODULE_DEFAULT_ASSET_ROOT__ = (() => {
  if (!__MODULE_URL__) return undefined;
  try {
    const parsed = new URL(__MODULE_URL__);
    if (/\/public\/assets\/js\//.test(parsed.pathname)) {
      return new URL("../pds/", __MODULE_URL__).href;
    }
  } catch (e) {
    return undefined;
  }
  return undefined;
})();

let __foucListenerAttached = false;

export function attachFoucListener(PDS) {
  if (__foucListenerAttached || typeof document === "undefined") return;
  __foucListenerAttached = true;
  PDS.addEventListener("pds:ready", (event) => {
    const mode = event.detail?.mode;
    if (mode) {
      document.documentElement.classList.add(`pds-${mode}`, "pds-ready");
    }
  });
}

// Internal: deep merge utility (arrays replace; objects merge)
function __deepMerge(target = {}, source = {}) {
  if (!source || typeof source !== "object") return target;
  const out = Array.isArray(target) ? [...target] : { ...target };
  for (const [key, value] of Object.entries(source)) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      out[key] = __deepMerge(
        out[key] && typeof out[key] === "object" ? out[key] : {},
        value
      );
    } else {
      out[key] = value;
    }
  }
  return out;
}

// Internal: create a slug for matching names like "Paper & Ink" -> "paper-and-ink"
function __slugify(str = "") {
  return String(str)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Internal: recursively remove functions from an object to make it cloneable
export function stripFunctions(obj) {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === "function") return undefined;
  if (typeof obj !== "object") return obj;

  if (Array.isArray(obj)) {
    return obj.map((item) => stripFunctions(item)).filter((item) => item !== undefined);
  }

  const result = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (typeof value !== "function") {
        const stripped = stripFunctions(value);
        if (stripped !== undefined) {
          result[key] = stripped;
        }
      }
    }
  }
  return result;
}

// Internal: normalize first-arg config to a full generator config and extract enhancers if provided inline
export function normalizeInitConfig(
  inputConfig = {},
  options = {},
  { presets, defaultLog, validateDesignConfig, validateInitConfig } = {}
) {
  const logFn =
    inputConfig && typeof inputConfig.log === "function"
      ? inputConfig.log
      : defaultLog;

  // If caller passed a plain design config (legacy), keep as-is
  const hasDesignKeys =
    typeof inputConfig === "object" &&
    ("colors" in inputConfig ||
      "typography" in inputConfig ||
      "spatialRhythm" in inputConfig ||
      "shape" in inputConfig ||
      "behavior" in inputConfig ||
      "layout" in inputConfig ||
      "advanced" in inputConfig ||
      "a11y" in inputConfig ||
      "components" in inputConfig ||
      "icons" in inputConfig);

  // Extract potential inline enhancers from config; prefer inline over options
  let inlineEnhancers = inputConfig && inputConfig.enhancers;
  if (inlineEnhancers && !Array.isArray(inlineEnhancers)) {
    // If an object was provided, convert to array of values
    inlineEnhancers = Object.values(inlineEnhancers);
  }
  const enhancers = inlineEnhancers ?? options.enhancers ?? [];

  // New API: { preset?: string, design?: object }
  const presetId = inputConfig && inputConfig.preset;
  const designOverrides = inputConfig && inputConfig.design;
  const iconOverrides =
    inputConfig &&
    inputConfig.icons &&
    typeof inputConfig.icons === "object"
      ? inputConfig.icons
      : null;

  const hasNewShape =
    "preset" in (inputConfig || {}) ||
    "design" in (inputConfig || {}) ||
    "enhancers" in (inputConfig || {});

  if (inputConfig && typeof inputConfig === "object" && typeof validateInitConfig === "function") {
    validateInitConfig(inputConfig, { log: logFn, context: "PDS.start" });
  }

  let generatorConfig;
  let presetInfo = null;

  if (hasNewShape) {
    if (
      designOverrides &&
      typeof designOverrides === "object" &&
      typeof validateDesignConfig === "function"
    ) {
      validateDesignConfig(designOverrides, { log: logFn, context: "PDS.start" });
    }
    // Always resolve a preset; default if none provided
    const effectivePreset = String(presetId || "default").toLowerCase();
    const found =
      presets?.[effectivePreset] ||
      Object.values(presets || {}).find(
        (p) =>
          __slugify(p.name) === effectivePreset ||
          String(p.name || "").toLowerCase() === effectivePreset
      );
    if (!found)
      throw new Error(`PDS preset not found: "${presetId || "default"}"`);

    presetInfo = {
      id: found.id || __slugify(found.name),
      name: found.name || found.id || String(effectivePreset),
    };

    // Merge preset with design overrides
    let mergedDesign = structuredClone(found);
    if (
      (designOverrides && typeof designOverrides === "object") ||
      iconOverrides
    ) {
      // Strip functions before cloning to avoid DataCloneError
      const cloneableDesign = designOverrides
        ? stripFunctions(designOverrides)
        : {};
      const cloneableIcons = iconOverrides
        ? stripFunctions(iconOverrides)
        : null;
      const mergedOverrides = cloneableIcons
        ? __deepMerge(cloneableDesign, { icons: cloneableIcons })
        : cloneableDesign;
      mergedDesign = __deepMerge(
        mergedDesign,
        structuredClone(mergedOverrides)
      );
    }

    // Build structured config with design nested
    // Exclude runtime-specific properties that shouldn't be passed to Generator
    const {
      mode, autoDefine, applyGlobalStyles, manageTheme,
      themeStorageKey, preloadStyles, criticalLayers,
      managerURL, manager,
      preset: _preset, design: _design, enhancers: _enhancers,
      log: userLog,
      ...otherProps
    } = inputConfig;

    generatorConfig = {
      ...otherProps,
      design: mergedDesign,
      preset: presetInfo.name,
      log: userLog || defaultLog,
    };
  } else if (hasDesignKeys) {
    if (typeof validateDesignConfig === "function") {
      validateDesignConfig(inputConfig, { log: logFn, context: "PDS.start" });
    }
    // Back-compat: treat the provided object as the full design, wrap it
    const { log: userLog, ...designConfig } = inputConfig;
    generatorConfig = {
      design: structuredClone(designConfig),
      log: userLog || defaultLog,
    };
  } else {
    // Nothing recognizable: use default preset
    const foundDefault =
      presets?.["default"] ||
      Object.values(presets || {}).find((p) => __slugify(p.name) === "default");
    if (!foundDefault) throw new Error("PDS default preset not available");
    presetInfo = {
      id: foundDefault.id || "default",
      name: foundDefault.name || "Default",
    };
    generatorConfig = {
      design: structuredClone(foundDefault),
      preset: presetInfo.name,
      log: defaultLog,
    };
  }

  return { generatorConfig, enhancers, presetInfo };
}

// Internal: resolve theme and set html[data-theme], return resolvedTheme and storedTheme
export function resolveThemeAndApply({ manageTheme, themeStorageKey, applyResolvedTheme, setupSystemListenerIfNeeded }) {
  let resolvedTheme = "light";
  let storedTheme = null;
  if (manageTheme && typeof window !== "undefined") {
    // Read raw preference (may be null, 'system', 'light', 'dark') using provided storage key
    try {
      storedTheme = localStorage.getItem(themeStorageKey) || null;
    } catch (e) {
      storedTheme = null;
    }

    // Apply the resolved theme and ensure system listener exists when needed
    try {
      applyResolvedTheme?.(storedTheme);
      setupSystemListenerIfNeeded?.(storedTheme);
    } catch (e) {}

    // Compute explicit resolvedTheme to return
    if (storedTheme) {
      if (storedTheme === "system") {
        const prefersDark =
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches;
        resolvedTheme = prefersDark ? "dark" : "light";
      } else {
        resolvedTheme = storedTheme;
      }
    } else {
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      resolvedTheme = prefersDark ? "dark" : "light";
    }
  }
  return { resolvedTheme, storedTheme };
}

export function resolveRuntimeAssetRoot(config, { resolvePublicAssetURL }) {
  const hasCustomRoot = Boolean(config?.public?.root || config?.static?.root);
  let candidate = resolvePublicAssetURL(config);

  if (!hasCustomRoot && __MODULE_DEFAULT_ASSET_ROOT__) {
    candidate = __MODULE_DEFAULT_ASSET_ROOT__;
  }

  return ensureTrailingSlash(ensureAbsoluteAssetURL(candidate));
}

// Internal: setup AutoDefiner and run enhancers
export async function setupAutoDefinerAndEnhancers(options, { baseEnhancers = [] } = {}) {
  const {
    autoDefineBaseURL = "/auto-define/",
    autoDefinePreload = [],
    autoDefineMapper = null,
    enhancers = [],
    autoDefineOverrides = null,
    autoDefinePreferModule = true,
  } = options;

  // Merge defaults with user enhancers (user overrides by selector)
  const mergedEnhancers = (() => {
    const map = new Map();
    (baseEnhancers || []).forEach((e) => map.set(e.selector, e));
    (enhancers || []).forEach((e) => map.set(e.selector, e));
    return Array.from(map.values());
  })();

  // Setup AutoDefiner in browser context (it already observes shadow DOMs)
  let autoDefiner = null;
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    const AutoDefinerCtor = CoreAutoDefiner;

    const defaultMapper = (tag) => {
      switch (tag) {
        case "pds-tabpanel":
          return "pds-tabstrip.js";
        default:
          return `${tag}.js`;
      }
    };

    // Respect user overrides but never allow them to overwrite our mapper wrapper.
    // Also merge `autoDefine.enhancers` safely instead of allowing it to clobber
    // default enhancers (this previously caused silent loss of required/dropdown behavior).
    const {
      mapper: _overrideMapperIgnored,
      enhancers: overrideEnhancers,
      ...restAutoDefineOverrides
    } =
      autoDefineOverrides && typeof autoDefineOverrides === "object"
        ? autoDefineOverrides
        : {};

    const normalizedOverrideEnhancers = (() => {
      if (!overrideEnhancers) return [];
      if (Array.isArray(overrideEnhancers)) return overrideEnhancers;
      if (typeof overrideEnhancers === "object") {
        return Object.values(overrideEnhancers);
      }
      return [];
    })();

    const resolvedEnhancers = (() => {
      const map = new Map();
      (mergedEnhancers || []).forEach((enhancer) => {
        if (!enhancer?.selector) return;
        map.set(enhancer.selector, enhancer);
      });

      (normalizedOverrideEnhancers || []).forEach((enhancer) => {
        if (!enhancer?.selector) return;
        const existing = map.get(enhancer.selector) || null;
        map.set(enhancer.selector, {
          ...(existing || {}),
          ...enhancer,
          run:
            typeof enhancer?.run === "function"
              ? enhancer.run
              : existing?.run,
        });
      });

      return Array.from(map.values());
    })();

    const normalizedBaseURL = autoDefineBaseURL
      ? ensureTrailingSlash(
          ensureAbsoluteAssetURL(autoDefineBaseURL, {
            preferModule: autoDefinePreferModule,
          })
        )
      : autoDefineBaseURL;

    const autoDefineConfig = {
      baseURL: normalizedBaseURL,
      predefine: autoDefinePreload,
      scanExisting: true,
      observeShadows: true,
      patchAttachShadow: true,
      debounceMs: 16,
      enhancers: resolvedEnhancers,
      onError: (tag, err) => {
        if (typeof tag === "string" && tag.startsWith("pds-")) {
          const litDependentComponents = ["pds-form", "pds-drawer"];
          const isLitComponent = litDependentComponents.includes(tag);
          const isMissingLitError = err?.message?.includes("#pds/lit") ||
                                     err?.message?.includes("Failed to resolve module specifier");

          if (isLitComponent && isMissingLitError) {
            console.error(
              `❌ PDS component <${tag}> requires Lit but #pds/lit is not in import map.
              See: https://github.com/Pure-Web-Foundation/pure-ds/blob/main/readme.md#lit-components-not-working`
            );
          } else {
            console.warn(
              `⚠️ PDS component <${tag}> not found. Assets may not be installed.`
            );
          }
        } else {
          console.error(`❌ Auto-define error for <${tag}>:`, err);
        }
      },
      // Apply all user overrides except mapper so we can still wrap it
      ...restAutoDefineOverrides,
      mapper: (tag) => {
        // If already defined, do nothing
        if (customElements.get(tag)) return null;

        // If a custom mapper exists, let it try first; if it returns a non-value, fallback to default
        if (typeof autoDefineMapper === "function") {
          try {
            const mapped = autoDefineMapper(tag);
            if (mapped === undefined) {
              return defaultMapper(tag);
            }
            return mapped;
          } catch (e) {
            console.warn(
              "Custom autoDefine.mapper error; falling back to default:",
              e?.message || e
            );
            return defaultMapper(tag);
          }
        }

        // No custom mapper provided — use default
        return defaultMapper(tag);
      },
    };

    autoDefiner = new AutoDefinerCtor(autoDefineConfig);
    if (
      autoDefinePreload.length > 0 &&
      typeof AutoDefinerCtor.define === "function"
    ) {
      await AutoDefinerCtor.define(...autoDefinePreload, {
        baseURL: autoDefineBaseURL,
        mapper: autoDefineConfig.mapper,
        onError: autoDefineConfig.onError,
      });
    }
  }

  return { autoDefiner, mergedEnhancers };
}
