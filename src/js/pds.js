/// <reference path="./pds.d.ts" />

import { AutoComplete } from "pure-web/ac";

/**
 * Public PDS runtime object exported to consumers.
 *
 * This object exposes the core runtime building blocks for the Pure Design System.
 * It intentionally provides a small, stable surface area so consuming apps can:
 * - programmatically generate design system artifacts (via `getGenerator()` in live mode),
 * - adopt styles into Shadow DOM (via `adoptLayers` / `adoptPrimitives`),
 * - query runtime mode and obtain constructable stylesheets (via `registry`).
 *
 * Common events in the PDS ecosystem (emitted by other packages/components):
 * - `design-updated` — emitted by the designer component when the in-memory design changes (detail: { config }).
 * - `pds-generated` — emitted by the PDS configurator when generation completes (detail: { modules, meta }).
 * - `pds-error` — emitted by the PDS configurator when generation fails (detail: Error).
 *
 * Error handling notes:
 * - Methods that perform dynamic imports (e.g. `adoptLayers` via the registry) may log and return fallbacks
 *   rather than throwing; consumers should check return values (e.g. null) and listen for `pds-error` in UI flows.
 * - `createStylesheet(css)` will throw synchronously if the provided CSS cannot be parsed by the browser's
 *   `CSSStyleSheet.replaceSync()` — callers should guard invalid input or wrap calls in try/catch.
 *
 * @typedef {Object} PDSAPI
 * @property {import("./pds-core/pds-registry.js").PDSRegistry} registry - Singleton runtime registry for live/static mode
 * @property {(generator?: import("./pds-core/pds-generator.js").Generator) => void} applyStyles - Apply generated styles to the document (live-only)
 * @property {(shadowRoot: ShadowRoot, layers?: string[], additionalSheets?: CSSStyleSheet[]) => Promise<void>} adoptLayers - Adopt multiple layers into a ShadowRoot. May log errors and fallback to additionalSheets when static imports fail.
 * @property {(shadowRoot: ShadowRoot, additionalSheets?: CSSStyleSheet[]) => Promise<void>} adoptPrimitives - Adopt primitives layer into a ShadowRoot. Designed as a convenience for components.
 * @property {(css:string) => CSSStyleSheet} createStylesheet - Create a constructable stylesheet from CSS text. @throws {DOMException} on invalid CSS in some browsers.
 * @property {() => boolean} isLiveMode - Returns true when running in live/designer-backed mode
 * @property {() => Promise<typeof import("./pds-core/pds-generator.js").Generator>} getGenerator - Live-only accessor for the Generator class
 */

/**
 * Workspace for the Pure Design System runtime API
 * PDS is now an EventTarget so consumers can subscribe to a single, consistent
 * event bus instead of listening on window/document or individual elements.
 */
class PDSBase extends EventTarget {}
/** @type {PDSAPI & PDSBase} */
const PDS = new PDSBase();

// State properties
PDS.initializing = false;
PDS.currentPreset = null;
PDS.debug = false;

import {
  adoptLayers,
  adoptPrimitives,
  createStylesheet,
} from "./pds-core/pds-runtime.js";
import { registry } from "./pds-core/pds-registry.js";
import { enums } from "./pds-core/pds-enums.js";
import { ask } from "./common/ask.js";
import { toast } from "./common/toast.js";
import * as common from "./common/common.js";
import { defaultPDSEnhancers } from "./pds-core/pds-enhancers.js";
import { resolvePublicAssetURL } from "./pds-core/pds-paths.js";
import {
  ensureAbsoluteAssetURL,
  ensureTrailingSlash,
  attachFoucListener,
  normalizeInitConfig,
  resolveRuntimeAssetRoot,
  resolveThemeAndApply,
  setupAutoDefinerAndEnhancers,
  stripFunctions,
} from "./pds-core/pds-start-helpers.js";

const __slugifyPreset = (str = "") =>
  String(str)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const __defaultLog = function (level = "log", message, ...data) {
  const isStaticMode = Boolean(PDS.registry && !PDS.registry.isLive);
  const debug =
    (this?.debug || this?.design?.debug || PDS.debug || false) === true;

  if (isStaticMode) {
    if (!PDS.debug) return;
  } else if (!debug && level !== "error" && level !== "warn") {
    return;
  }

  const method = console[level] || console.log;
  if (data.length > 0) {
    method(message, ...data);
  } else {
    method(message);
  }
};

async function __loadRuntimeConfig(assetRootURL, config = {}) {
  if (config?.runtimeConfig === false) return null;
  if (typeof fetch !== "function") return null;
  const runtimeUrl =
    config?.runtimeConfigURL || `${assetRootURL}pds-runtime-config.json`;
  try {
    const res = await fetch(runtimeUrl, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

/** Singleton runtime registry. Use `registry.setLiveMode()` to enable live mode or `registry.setStaticMode()` for static assets */
PDS.registry = registry;

/** Expose enums in static and live modes */
PDS.enums = enums;

/** Adopt a set of layered stylesheets into a ShadowRoot */
PDS.adoptLayers = adoptLayers;

/** Convenience to adopt only primitives into a ShadowRoot */
PDS.adoptPrimitives = adoptPrimitives;

/** Parse an HTML string into a NodeList */
PDS.parse = common.parseHTML;

/** Create a constructable CSSStyleSheet from a CSS string */
PDS.createStylesheet = createStylesheet;

/** Return true when running inside a live/designer-backed environment */
PDS.isLiveMode = () => registry.isLive;
PDS.ask = ask;
PDS.toast = toast;
PDS.common = common;
PDS.AutoComplete = AutoComplete;

function __emitPDSReady(detail) {
  const hasCustomEvent = typeof CustomEvent === "function";

  try {
    const readyEvent = hasCustomEvent
      ? new CustomEvent("pds:ready", { detail })
      : new Event("pds:ready");
    PDS.dispatchEvent(readyEvent);
  } catch (e) {}

  if (typeof document !== "undefined") {
    if (hasCustomEvent) {
      const eventOptions = { detail, bubbles: true, composed: true };
      try {
        document.dispatchEvent(new CustomEvent("pds:ready", eventOptions));
      } catch (e) {}
      try {
        document.dispatchEvent(new CustomEvent("pds-ready", eventOptions));
      } catch (e) {}
    } else {
      try {
        document.dispatchEvent(new Event("pds:ready"));
      } catch (e) {}
      try {
        document.dispatchEvent(new Event("pds-ready"));
      } catch (e) {}
    }
  }
}

if (typeof window !== "undefined") {
  // @ts-ignore
  window.PDS = PDS;
}

// ---------------------------------------------------------------------------
// Theme management (centralized on PDS.theme)
// Consumers may read/write `PDS.theme` with values: 'system' | 'light' | 'dark'
// Setting the property persists to localStorage (when available), updates
// document.documentElement[data-theme] to an explicit 'light'|'dark' value
// and emits a `pds:theme:changed` event. Reading the property returns the
// raw stored preference (or null if none).

// Private module-level variables for theme management
const __themeStorageKey = "pure-ds-theme";
let __themeMQ = null;
let __themeMQListener = null;

// Private: Apply resolved theme to document
function __applyResolvedTheme(raw) {
  try {
    if (typeof document === "undefined") return;
    let resolved = "light";
    if (!raw) {
      // No stored preference: use OS preference
      const prefersDark =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      resolved = prefersDark ? "dark" : "light";
    } else if (raw === "system") {
      const prefersDark =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      resolved = prefersDark ? "dark" : "light";
    } else {
      resolved = raw;
    }
    document.documentElement.setAttribute("data-theme", resolved);
  } catch (e) {}
}

// Private: Setup system theme change listener when needed
function __setupSystemListenerIfNeeded(raw) {
  try {
    // Remove any existing listener first
    if (__themeMQ && __themeMQListener) {
      try {
        if (typeof __themeMQ.removeEventListener === "function")
          __themeMQ.removeEventListener("change", __themeMQListener);
        else if (typeof __themeMQ.removeListener === "function")
          __themeMQ.removeListener(__themeMQListener);
      } catch (e) {}
      __themeMQ = null;
      __themeMQListener = null;
    }

    if (
      raw === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia
    ) {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const listener = (e) => {
        const isDark = e?.matches === undefined ? mq.matches : e.matches;
        try {
          const newTheme = isDark ? "dark" : "light";
          document.documentElement.setAttribute("data-theme", newTheme);
          PDS.dispatchEvent(
            new CustomEvent("pds:theme:changed", {
              detail: { theme: newTheme, source: "system" },
            })
          );
        } catch (ex) {}
      };
      __themeMQ = mq;
      __themeMQListener = listener;
      if (typeof mq.addEventListener === "function")
        mq.addEventListener("change", listener);
      else if (typeof mq.addListener === "function") mq.addListener(listener);
    }
  } catch (e) {}
}

Object.defineProperty(PDS, "theme", {
  get() {
    try {
      if (typeof window === "undefined") return null;
      return localStorage.getItem(__themeStorageKey) || null;
    } catch (e) {
      return null;
    }
  },
  set(value) {
    try {
      if (typeof window === "undefined") return;
      if (value === null || value === undefined) {
        localStorage.removeItem(__themeStorageKey);
      } else {
        localStorage.setItem(__themeStorageKey, value);
      }

      // Apply resolved (light/dark) value to document
      __applyResolvedTheme(value);
      // Setup system change listener only when 'system' is selected
      __setupSystemListenerIfNeeded(value);

      // Emit a notification with the raw preference (value may be 'system')
      PDS.dispatchEvent(
        new CustomEvent("pds:theme:changed", {
          detail: { theme: value, source: "api" },
        })
      );
    } catch (e) {}
  },
});

// ----------------------------------------------------------------------------
// Default Enhancers — first-class citizens alongside AutoDefiner
// ----------------------------------------------------------------------------
/**
 * Default DOM enhancers shipped with PDS. These are lightweight progressive
 * enhancements that can be applied to vanilla markup. Consumers can override
 * or add to these via the `enhancers` option of PDS.start({ mode }).
 */
PDS.defaultEnhancers = defaultPDSEnhancers;

/**
 * Initialize PDS in live mode with the given configuration (new unified shape).
 * Typically invoked via PDS.start({ mode: 'live', ... }).
 *
 * Shape:
 * PDS.start({
 *   mode: 'live',
 *   preset?: string,
 *   design?: object,
 *   autoDefine?: {
 *     baseURL?: string,
 *     predefine?: string[],
 *     mapper?: (tag:string)=>string|undefined|null, // return undefined/null/false to let PDS default mapper handle it
 *     // plus any AutoDefiner flags: scanExisting, observeShadows, patchAttachShadow, debounceMs, onError
 *   },
 *   // runtime flags (optional)
 *   applyGlobalStyles?: boolean,
 *   manageTheme?: boolean,
 *   themeStorageKey?: string,
 *   preloadStyles?: boolean,
 *   criticalLayers?: string[]
 * })
 *
 * @param {object} config - The PDS configuration object (unified shape)
 * @returns {Promise<{generator: Generator, config: object, theme: string, autoDefiner?: any}>}
 *
 * @example
 * await PDS.start({ mode: 'live',
 *   preset: 'paper-and-ink',
 *   design: { colors: { accent: '#FF4081' } },
 *   autoDefine: { predefine: ['pds-icon'] }
 * });
 */

/**
 * Start PDS given a unified configuration and an explicit mode.
 *
 * @param {object} config - Unified configuration
 * @param {('live'|'static')} [config.mode='live'] - Runtime mode selector
 * @returns {Promise<any>} Live returns { generator, config, theme, autoDefiner }; Static returns { config, theme, autoDefiner }
 */
async function start(config) {
  const mode = (config && config.mode) || "live";
  const { mode: _omit, ...rest } = config || {};
  
  if (mode === "static") return staticInit(rest);
  const assetRootURL = resolveRuntimeAssetRoot(rest, { resolvePublicAssetURL });
  const managerUrl =
    rest?.managerURL ||
    rest?.public?.managerURL ||
    rest?.manager?.url ||
    new URL("core/pds-manager.js", assetRootURL).href ||
    new URL("./pds-manager.js", import.meta.url).href;
  const { startLive } = await import(managerUrl);
  return startLive(PDS, rest, {
    emitReady: __emitPDSReady,
    applyResolvedTheme: __applyResolvedTheme,
    setupSystemListenerIfNeeded: __setupSystemListenerIfNeeded,
  });
}

/** Primary unified entry point */
PDS.start = start;

/**
 * Initialize PDS in static mode with the same unified configuration shape as live mode.
 *
 * Shape:
 * PDS.start({
 *   mode: 'static',
 *   preset?: string,
 *   design?: object,
 *   autoDefine?: {
 *     baseURL?: string,
 *     predefine?: string[],
 *     mapper?: (tag:string)=>string,
 *     // plus any AutoDefiner flags
 *   },
 *   // static/runtime flags (optional)
 *   applyGlobalStyles?: boolean,
 *   manageTheme?: boolean,
 *   themeStorageKey?: string,
 *   staticPaths?: Record<string,string>
 * })
 */
async function staticInit(config) {
  if (!config || typeof config !== "object") {
    throw new Error(
      "PDS.start({ mode: 'static', ... }) requires a valid configuration object"
    );
  }

  const applyGlobalStyles = config.applyGlobalStyles ?? true;
  const manageTheme = config.manageTheme ?? true;
  const themeStorageKey = config.themeStorageKey ?? "pure-ds-theme";
  let staticPaths = config.staticPaths ?? {};
  const assetRootURL = resolveRuntimeAssetRoot(config, { resolvePublicAssetURL });
  const cfgAuto = (config && config.autoDefine) || null;
  let autoDefineBaseURL;
  if (cfgAuto && cfgAuto.baseURL) {
    autoDefineBaseURL = ensureTrailingSlash(
      ensureAbsoluteAssetURL(cfgAuto.baseURL, { preferModule: false })
    );
  } else {
    autoDefineBaseURL = `${assetRootURL}components/`;
  }
  const autoDefinePreload =
    (cfgAuto && Array.isArray(cfgAuto.predefine) && cfgAuto.predefine) || [];
  const autoDefineMapper =
    (cfgAuto && typeof cfgAuto.mapper === "function" && cfgAuto.mapper) || null;

  try {
    attachFoucListener(PDS);
    // 1) Theme
    const { resolvedTheme } = resolveThemeAndApply({
      manageTheme,
      themeStorageKey,
      applyResolvedTheme: __applyResolvedTheme,
      setupSystemListenerIfNeeded: __setupSystemListenerIfNeeded,
    });

    // Normalize first-arg to allow { preset, design, enhancers }
    const runtimeConfig = await __loadRuntimeConfig(assetRootURL, config);
    const runtimeDesign =
      runtimeConfig?.config?.design || runtimeConfig?.design || null;
    const runtimePresetLabel =
      runtimeConfig?.config?.preset || runtimeConfig?.preset || "default";
    const runtimePresetId =
      runtimeConfig?.presetId || __slugifyPreset(runtimePresetLabel) || "default";
    const runtimePresets = runtimeDesign
      ? {
          [String(runtimePresetId).toLowerCase()]: runtimeDesign,
          ...(String(runtimePresetId).toLowerCase() !== "default"
            ? { default: runtimeDesign }
            : {}),
        }
      : null;

    const inlineDesign =
      config?.design && typeof config.design === "object"
        ? stripFunctions(config.design)
        : null;
    const inlinePresetId = __slugifyPreset(config?.preset || "default") || "default";
    const inlinePresets = inlineDesign
      ? {
          [String(inlinePresetId).toLowerCase()]: inlineDesign,
          ...(String(inlinePresetId).toLowerCase() !== "default"
            ? { default: inlineDesign }
            : {}),
        }
      : null;

    const presets = runtimePresets || config?.presets || inlinePresets || {};
    if (!Object.keys(presets || {}).length) {
      throw new Error(
        "PDS static mode requires preset data. Run pds:build or provide config.presets/config.design."
      );
    }
    const normalizedInput = runtimeConfig?.config
      ? {
          ...runtimeConfig.config,
          ...config,
          preset: config?.preset || runtimePresetId,
          design: inlineDesign || runtimeDesign || runtimeConfig?.config?.design,
        }
      : config;

    const normalized = normalizeInitConfig(normalizedInput, {}, {
      presets,
      defaultLog: __defaultLog,
    });
    const userEnhancers = normalized.enhancers;
    

    // 2) Derive static asset URLs from the normalized public root
    const baseStaticPaths = {
      tokens: `${assetRootURL}styles/pds-tokens.css.js`,
      primitives: `${assetRootURL}styles/pds-primitives.css.js`,
      components: `${assetRootURL}styles/pds-components.css.js`,
      utilities: `${assetRootURL}styles/pds-utilities.css.js`,
      styles: `${assetRootURL}styles/pds-styles.css.js`,
    };
    const runtimePaths = runtimeConfig?.paths || {};
    staticPaths = { ...baseStaticPaths, ...runtimePaths, ...staticPaths };

    // 3) Static mode registry
    PDS.registry.setStaticMode(staticPaths);

    // 4) Apply global static styles if requested
    if (applyGlobalStyles && typeof document !== "undefined") {
      try {
        // Always adopt from exported css.js modules so static mode loads from JS exports
        const stylesSheet = await PDS.registry.getStylesheet("styles");
        if (stylesSheet) {
          // Tag and adopt alongside existing non-PDS sheets
          stylesSheet._pds = true;
          const others = (document.adoptedStyleSheets || []).filter(
            (s) => s._pds !== true
          );
          document.adoptedStyleSheets = [...others, stylesSheet];
        }
      } catch (e) {
        __defaultLog.call(PDS, "warn", "Failed to apply static styles:", e);
      }
    }

    // 5) AutoDefiner + Enhancers
    let autoDefiner = null;
    let mergedEnhancers = [];
    try {
      const res = await setupAutoDefinerAndEnhancers({
        autoDefineBaseURL,
        autoDefinePreload,
        autoDefineMapper,
        enhancers: userEnhancers,
        autoDefineOverrides: cfgAuto || null,
        autoDefinePreferModule: !(cfgAuto && cfgAuto.baseURL),
      }, { baseEnhancers: defaultPDSEnhancers });
      autoDefiner = res.autoDefiner;
      mergedEnhancers = res.mergedEnhancers || [];
    } catch (error) {
      __defaultLog.call(
        PDS,
        "error",
        "❌ Failed to initialize AutoDefiner/Enhancers (static):",
        error
      );
    }

    // Expose current config as frozen read-only on PDS, preserving input shape
    // Strip functions before cloning to avoid DataCloneError
    const cloneableConfig = stripFunctions(config);
    PDS.currentConfig = Object.freeze({
      mode: "static",
      ...structuredClone(cloneableConfig),
      design: structuredClone(normalized.generatorConfig.design),
      preset: normalized.generatorConfig.preset,
      theme: resolvedTheme,
      enhancers: mergedEnhancers,
    });

    // 6) Emit ready event (unified)
    __emitPDSReady({
      mode: "static",
      config: normalized.generatorConfig,
      theme: resolvedTheme,
      autoDefiner,
    });
    return {
      config: normalized.generatorConfig,
      theme: resolvedTheme,
      autoDefiner,
    };
  } catch (error) {
    PDS.dispatchEvent(new CustomEvent("pds:error", { detail: { error } }));
    throw error;
  }
}

// Note: PDS.static is not exported. Use PDS.start({ mode: 'static', ... }).

// Note: PDS object is not frozen to allow runtime properties like currentConfig
// to be set during initialization. The config object itself is frozen for immutability.

export const applyResolvedTheme = __applyResolvedTheme;
export const setupSystemListenerIfNeeded = __setupSystemListenerIfNeeded;
export { PDS };
