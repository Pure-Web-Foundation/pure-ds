/// <reference path="./pds.d.ts" />

/**
 * Public PDS runtime object exported to consumers.
 *
 * This object exposes the core runtime building blocks for the Pure Design System.
 * It intentionally provides a small, stable surface area so consuming apps can:
 * - programmatically generate design system artifacts (via `Generator`),
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
 * @property {typeof import("./pds-core/pds-generator.js").Generator} Generator - Generator class to produce design system assets
 * @property {import("./pds-core/pds-registry.js").PDSRegistry} registry - Singleton runtime registry for live/static mode
 * @property {any} ontology - Ontology helpers and metadata for components
 * @property {(shadowRoot: ShadowRoot, layers?: string[], additionalSheets?: CSSStyleSheet[]) => Promise<void>} adoptLayers - Adopt multiple layers into a ShadowRoot. May log errors and fallback to additionalSheets when static imports fail.
 * @property {(shadowRoot: ShadowRoot, additionalSheets?: CSSStyleSheet[]) => Promise<void>} adoptPrimitives - Adopt primitives layer into a ShadowRoot. Designed as a convenience for components.
 * @property {(css:string) => CSSStyleSheet} createStylesheet - Create a constructable stylesheet from CSS text. @throws {DOMException} on invalid CSS in some browsers.
 * @property {() => boolean} isLiveMode - Returns true when running in live/designer-backed mode
 * @property {(el: Element) => import("./pds-core/pds-ontology.js").ComponentDef | null} findComponentForElement - Helper to find a component definition for a DOM element
 */

/**
 * Workspace for the Pure Design System runtime API
 * PDS is now an EventTarget so consumers can subscribe to a single, consistent
 * event bus instead of listening on window/document or individual elements.
 */
class PDSBase extends EventTarget {}
/** @type {PDSAPI & PDSBase} */
const PDS = new PDSBase();

import {
  Generator,
  adoptLayers,
  adoptPrimitives,
  createStylesheet,
  isLiveMode,
} from "./pds-core/pds-generator.js";
import { registry } from "./pds-core/pds-registry.js";
import ontology from "./pds-core/pds-ontology.js";
import { findComponentForElement } from "./pds-core/pds-ontology.js";
import { presets, defaultLog } from "./pds-core/pds-config.js";
import { enums } from "./pds-core/pds-enums.js";
import { ask } from "./common/ask.js";
import { PDSQuery } from "./pds-core/pds-query.js";
import * as common from "./common/common.js";
import { defaultPDSEnhancers } from "./pds-core/pds-enhancers.js";
import { resolvePublicAssetURL } from "./pds-core/pds-paths.js";

// Font loading utilities
import { loadTypographyFonts } from "./common/font-loader.js";

/** Generator class — use to programmatically create design system assets from a config */
PDS.Generator = Generator;

/** Singleton runtime registry. Use `registry.setDesigner()` to enable live mode or `registry.setStaticMode()` for static assets */
PDS.registry = registry;

/** Ontology and metadata about components and tokens */
PDS.ontology = ontology;

/** Adopt a set of layered stylesheets into a ShadowRoot */
PDS.adoptLayers = adoptLayers;

/** Convenience to adopt only primitives into a ShadowRoot */
PDS.adoptPrimitives = adoptPrimitives;

/** Create a constructable CSSStyleSheet from a CSS string */
PDS.createStylesheet = createStylesheet;

/** Return true when running inside a live/designer-backed environment */
PDS.isLiveMode = isLiveMode;

PDS.enums = enums;

PDS.ask = ask;

// Expose common utilities (deepMerge, isObject, etc.)
PDS.common = common;

// Expose presets object directly
PDS.presets = presets;

/** Find a component definition (ontology) for a given DOM element */
PDS.findComponentForElement = findComponentForElement;

/** 
 * Smart query interface for design system questions
 * @param {string} question - Natural language query about tokens, components, utilities, or patterns
 * @returns {Promise<Array>} Array of results with text, value, icon, category, code examples
 * @example
 * const results = await PDS.query("what is the focus border color on inputs?");
 * const results = await PDS.query("how do I create an icon-only button?");
 */
PDS.query = async function(question) {
  const queryEngine = new PDSQuery(PDS);
  return await queryEngine.search(question);
};

/** Current configuration (set after PDS.start() completes) - read-only, frozen after initialization */
Object.defineProperty(PDS, "currentConfig", {
  value: null,
  writable: true,
  enumerable: true,
  configurable: false,
});

/** 
 * Compiled design system state - provides structured access to all generated tokens, 
 * layers, and metadata. Available in live mode when a generator is active.
 * Returns the generator's compiled representation or null if not in live mode.
 * 
 * Structure includes:
 * - tokens: All generated token groups (colors, spacing, typography, etc.)
 * - layers: CSS content and metadata for each layer (tokens, primitives, components, utilities)
 * - config: Configuration snapshot used to generate the current state
 * - capabilities: Runtime environment capabilities
 * - references: Links to ontology and enums for introspection
 * - meta: Computed metadata about the design system
 * - helpers: Utility methods to query the compiled state
 */
Object.defineProperty(PDS, "compiled", {
  get() {
    // Only available in live mode when we have a generator
    if (PDS.registry?.isLive && PDS.registry?._designer) {
      return PDS.registry._designer.compiled;
    }
    return null;
  },
  enumerable: true,
  configurable: false,
});

// Always expose PDS on the window in browser contexts so consumers can access it in both live and static modes
if (typeof window !== "undefined") {
  // @ts-ignore
  window.PDS = PDS;
}

// ---------------------------------------------------------------------------
// FOUC Prevention: Add pds-ready class when PDS is fully initialized in live mode
// This works in conjunction with CSS injected by the live() function
if (typeof document !== "undefined") {
  PDS.addEventListener("pds:ready", (event) => {
    const mode = event.detail?.mode;
    if (mode) {
      // Add mode-specific class (pds-live or pds-static)
      document.documentElement.classList.add(`pds-${mode}`);
      
      // Only add pds-ready class in live mode for FOUC prevention
      if (mode === "live") {
        document.documentElement.classList.add("pds-ready");
      }
    }
  });
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
 * Validate a design configuration for accessibility sanity checks.
 * Currently validates color contrast for primary buttons and base surface text
 * in both light and dark themes.
 *
 * @param {object} designConfig - A full or partial PDS config object
 * @param {object} [options]
 * @param {number} [options.minContrast=4.5] - Minimum contrast ratio for normal text
 * @returns {{ ok: boolean, issues: Array<{path:string, message:string, ratio:number, min:number, context?:string}> }}
 */
function validateDesign(designConfig = {}, options = {}) {
  const MIN = Number(options.minContrast || 4.5);

  // Local helpers (keep public; no dependency on private Generator methods)
  const hexToRgb = (hex) => {
    const h = String(hex || "").replace("#", "");
    const full =
      h.length === 3
        ? h
            .split("")
            .map((c) => c + c)
            .join("")
        : h;
    const num = parseInt(full || "0", 16);
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
  };
  const luminance = (hex) => {
    const { r, g, b } = hexToRgb(hex);
    const srgb = [r / 255, g / 255, b / 255].map((v) =>
      v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    );
    return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
  };
  const contrast = (a, b) => {
    if (!a || !b) return 0;
    const L1 = luminance(a);
    const L2 = luminance(b);
    const lighter = Math.max(L1, L2);
    const darker = Math.min(L1, L2);
    return (lighter + 0.05) / (darker + 0.05);
  };

  const issues = [];
  try {
    // Build tokens from the candidate config
    const gen = new PDS.Generator({ design: structuredClone(designConfig) });
    const c = gen.tokens.colors;

    // Light theme checks - use computed interactive tokens
    const light = {
      surfaceBg: c.surface?.base,
      surfaceText: c.gray?.[900] || "#000000",
      primaryFill: c.interactive?.light?.fill || c.primary?.[600],
      primaryText: c.interactive?.light?.text || c.primary?.[600],
    };

    // Primary button (light): check button fill with white text
    const lightBtnRatio = contrast(light.primaryFill, "#ffffff");
    if (lightBtnRatio < MIN) {
      issues.push({
        path: "/colors/primary",
        message: `Primary button contrast too low in light theme (${lightBtnRatio.toFixed(
          2
        )} < ${MIN}). Choose a darker primary.`,
        ratio: lightBtnRatio,
        min: MIN,
        context: "light/btn-primary",
      });
    }

    // Surface text (light): text vs surface base
    const lightTextRatio = contrast(light.surfaceBg, light.surfaceText);
    if (lightTextRatio < MIN) {
      issues.push({
        path: "/colors/background",
        message: `Base text contrast on surface (light) is too low (${lightTextRatio.toFixed(
          2
        )} < ${MIN}). Adjust background or secondary (gray).`,
        ratio: lightTextRatio,
        min: MIN,
        context: "light/surface-text",
      });
    }

    // Primary text for outline/link: check link text on surface
    const lightOutlineRatio = contrast(light.primaryText, light.surfaceBg);
    if (lightOutlineRatio < MIN) {
      issues.push({
        path: "/colors/primary",
        message: `Primary text on surface is too low for outline/link styles (light) (${lightOutlineRatio.toFixed(
          2
        )} < ${MIN}). Choose a darker primary or lighter surface.`,
        ratio: lightOutlineRatio,
        min: MIN,
        context: "light/outline",
      });
    }

    // Dark theme checks - use computed interactive tokens
    const d = c.dark;
    if (d) {
      const dark = {
        surfaceBg: d.surface?.base || c.surface?.inverse,
        primaryFill: c.interactive?.dark?.fill || d.primary?.[600],
        primaryText: c.interactive?.dark?.text || d.primary?.[600],
      };
      
      // Primary button (dark): check button fill with white text
      const darkBtnRatio = contrast(dark.primaryFill, "#ffffff");
      if (darkBtnRatio < MIN) {
        issues.push({
          path: "/colors/darkMode/primary",
          message: `Primary button contrast too low in dark theme (${darkBtnRatio.toFixed(
            2
          )} < ${MIN}). Override darkMode.primary or pick a brighter hue.`,
          ratio: darkBtnRatio,
          min: MIN,
          context: "dark/btn-primary",
        });
      }

      // Outline/link style in dark: check link text on dark surface
      const darkOutlineRatio = contrast(dark.primaryText, dark.surfaceBg);
      if (darkOutlineRatio < MIN) {
        issues.push({
          path: "/colors/darkMode/primary",
          message: `Primary text on surface is too low for outline/link styles (dark) (${darkOutlineRatio.toFixed(
            2
          )} < ${MIN}). Override darkMode.primary/background.`,
          ratio: darkOutlineRatio,
          min: MIN,
          context: "dark/outline",
        });
      }
    }
  } catch (err) {
    issues.push({
      path: "/",
      message: `Validation failed: ${String(err?.message || err)}`,
      ratio: 0,
      min: 0,
    });
  }

  return { ok: issues.length === 0, issues };
}

/** Expose validator on the public API */
PDS.validateDesign = validateDesign;

/**
 * Validate multiple design configurations at once.
 * Useful for build-time enforcement of preset compliance.
 *
 * @param {Array<object>} designs - Array of design configs; items may include an optional `name` property.
 * @param {object} [options] - Options forwarded to validateDesign (e.g., { minContrast })
 * @returns {{ ok: boolean, results: Array<{ name?: string, ok: boolean, issues: Array<{path:string, message:string, ratio:number, min:number, context?:string}> }> }}
 */
function validateDesigns(designs = [], options = {}) {
  const results = [];

  const list = Array.isArray(designs)
    ? designs
    : designs && typeof designs === "object"
    ? Object.values(designs)
    : [];

  for (const item of list) {
    let name;
    let configToValidate = null;

    // Accept a few shapes:
    // - string => treat as preset id/name
    // - { preset, design?, name? } => resolve preset then merge overrides
    // - full config object (legacy) => validate directly
    if (typeof item === "string") {
      const id = String(item).toLowerCase();
      const found =
        presets?.[id] ||
        Object.values(presets || {}).find(
          (p) =>
            __slugify(p.name) === id ||
            String(p.name || "").toLowerCase() === id
        );
      if (!found) {
        results.push({
          name: item,
          ok: false,
          issues: [
            {
              path: "/",
              message: `Preset not found: ${item}`,
              ratio: 0,
              min: 0,
            },
          ],
        });
        continue;
      }
      name = found.name || id;
      configToValidate = structuredClone(found);
    } else if (item && typeof item === "object") {
      name = item.name || item.preset || undefined;
      if ("preset" in item || "design" in item) {
        const effectivePreset = String(item.preset || "default").toLowerCase();
        const found =
          presets?.[effectivePreset] ||
          Object.values(presets || {}).find(
            (p) =>
              __slugify(p.name) === effectivePreset ||
              String(p.name || "").toLowerCase() === effectivePreset
          );
        if (!found) {
          results.push({
            name,
            ok: false,
            issues: [
              {
                path: "/",
                message: `Preset not found: ${item.preset}`,
                ratio: 0,
                min: 0,
              },
            ],
          });
          continue;
        }
        let base = structuredClone(found);
        if (item.design && typeof item.design === "object") {
          base = __deepMerge(base, structuredClone(item.design));
        }
        configToValidate = base;
      } else {
        // Assume a full config object
        configToValidate = item;
      }
    }

    if (!configToValidate) {
      results.push({
        name,
        ok: false,
        issues: [
          { path: "/", message: "Invalid design entry", ratio: 0, min: 0 },
        ],
      });
      continue;
    }

    const { ok, issues } = validateDesign(configToValidate, options);
    results.push({ name, ok, issues });
  }

  return { ok: results.every((r) => r.ok), results };
}

/** Expose batch validator on the public API */
PDS.validateDesigns = validateDesigns;

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
// Internal: resolve theme and set html[data-theme], return resolvedTheme and storedTheme
function __resolveThemeAndApply({ manageTheme, themeStorageKey }) {
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
      __applyResolvedTheme(storedTheme);
      __setupSystemListenerIfNeeded(storedTheme);
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
function __stripFunctions(obj) {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === "function") return undefined;
  if (typeof obj !== "object") return obj;
  
  if (Array.isArray(obj)) {
    return obj.map(item => __stripFunctions(item)).filter(item => item !== undefined);
  }
  
  const result = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (typeof value !== "function") {
        const stripped = __stripFunctions(value);
        if (stripped !== undefined) {
          result[key] = stripped;
        }
      }
    }
  }
  return result;
}

// Internal: normalize first-arg config to a full generator config and extract enhancers if provided inline
function __normalizeInitConfig(inputConfig = {}, options = {}) {
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

  const hasNewShape =
    "preset" in (inputConfig || {}) ||
    "design" in (inputConfig || {}) ||
    "enhancers" in (inputConfig || {});

  let generatorConfig;
  let presetInfo = null;

  if (hasNewShape) {
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
    if (designOverrides && typeof designOverrides === "object") {
      // Strip functions before cloning to avoid DataCloneError
      const cloneableDesign = __stripFunctions(designOverrides);
      mergedDesign = __deepMerge(mergedDesign, structuredClone(cloneableDesign));
    }
    
    // Build structured config with design nested
    // Exclude runtime-specific properties that shouldn't be passed to Generator
    const { 
      mode, autoDefine, applyGlobalStyles, manageTheme, 
      themeStorageKey, preloadStyles, criticalLayers, 
      preset: _preset, design: _design, enhancers: _enhancers,
      log: userLog,  // Extract log if provided at root
      ...otherProps 
    } = inputConfig;
    
    generatorConfig = {
      ...otherProps, // Keep only generator-relevant properties
      design: mergedDesign,
      preset: presetInfo.name,
      // Add log method at root level (use user's or default)
      log: userLog || defaultLog,
    };
  } else if (hasDesignKeys) {
    // Back-compat: treat the provided object as the full design, wrap it
    // Extract log before cloning to avoid DataCloneError
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

// Internal: setup AutoDefiner and run enhancers
async function __setupAutoDefinerAndEnhancers(options) {
  const {
    autoDefineBaseURL = "/auto-define/",
    autoDefinePreload = [],
    autoDefineMapper = null,
    enhancers = [],
    // New: raw overrides for AutoDefiner config (scanExisting, observeShadows, etc.)
    autoDefineOverrides = null,
  } = options;

  // // Warn if assets not present (best-effort)
  // try {
  //   if (typeof window !== "undefined") {
  //     const response = await fetch(`${autoDefineBaseURL}pds-icon.js`, {
  //       method: "HEAD",
  //     });
  //     if (!response.ok) {
  //       // No config available in this context, using console
  //       console.warn("⚠️ PDS components not found in auto-define directory.");
  //     }
  //   }
  // } catch {}

  // Merge defaults with user enhancers (user overrides by selector)
  const mergedEnhancers = (() => {
    const map = new Map();
    (PDS.defaultEnhancers || []).forEach((e) => map.set(e.selector, e));
    (enhancers || []).forEach((e) => map.set(e.selector, e));
    return Array.from(map.values());
  })();

  // Setup AutoDefiner in browser context (it already observes shadow DOMs)
  let autoDefiner = null;
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    // Dynamically import AutoDefiner to avoid Node/CJS interop at build time
    let AutoDefinerCtor = null;
    try {
      const mod = await import("pure-web/auto-definer");
      AutoDefinerCtor =
        mod?.AutoDefiner || mod?.default?.AutoDefiner || mod?.default || null;
    } catch (e) {
      // No config available in this context, using console
      console.warn("AutoDefiner not available:", e?.message || e);
    }

    const defaultMapper = (tag) => {
      switch (tag) {
        case "pds-tabpanel":
          return "pds-tabstrip.js";
        default:
          return `${tag}.js`;
      }
    };

    // Respect user overrides but never allow them to overwrite our mapper wrapper.
    const { mapper: _overrideMapperIgnored, ...restAutoDefineOverrides } =
      autoDefineOverrides && typeof autoDefineOverrides === "object"
        ? autoDefineOverrides
        : {};

    const autoDefineConfig = {
      baseURL: autoDefineBaseURL,
      predefine: autoDefinePreload,
      scanExisting: true,
      observeShadows: true,
      patchAttachShadow: true,
      debounceMs: 16,
      enhancers: mergedEnhancers,
      onError: (tag, err) => {
        if (typeof tag === "string" && tag.startsWith("pds-")) {
          // No config available in this context, using console
          console.warn(
            `⚠️ PDS component <${tag}> not found. Assets may not be installed.`
          );
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
            // Treat undefined, null, false, or empty string as "not handled" and fallback
            if (
              mapped === undefined ||
              mapped === null ||
              mapped === false ||
              mapped === ""
            ) {
              return defaultMapper(tag);
            }
            return mapped;
          } catch (e) {
            // Be resilient: if custom mapper throws, fall back to default
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

    if (AutoDefinerCtor) {
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
  }
  // Rely on AutoDefiner to run enhancers across light and shadow DOMs

  return { autoDefiner };
}

async function live(config) {
  if (!config || typeof config !== "object") {
    throw new Error(
      "PDS.start({ mode: 'live', ... }) requires a valid configuration object"
    );
  }

  // FOUC Prevention: Use constructable stylesheet for synchronous, immediate effect
  if (typeof document !== "undefined" && document.adoptedStyleSheets) {
    const css = /*css*/`
          html { opacity: 0; }
          html.pds-ready { opacity: 1; transition: opacity 0.3s ease-in; }
        `
    try {
      // Check if we've already added the FOUC prevention sheet
      const hasFoucSheet = document.adoptedStyleSheets.some(sheet => sheet._pdsFouc);
      if (!hasFoucSheet) {
        const foucSheet = new CSSStyleSheet();
        foucSheet.replaceSync(css);
        foucSheet._pdsFouc = true;
        document.adoptedStyleSheets = [foucSheet, ...document.adoptedStyleSheets];
      }
    } catch (e) {
      // Fallback for browsers that don't support constructable stylesheets
      // No config available here, using console
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

  // PDS is exposed on window at module init for both modes

  // Extract runtime flags directly from unified config
  let applyGlobalStyles = config.applyGlobalStyles ?? true;
  let manageTheme = config.manageTheme ?? true;
  let themeStorageKey = config.themeStorageKey ?? "pure-ds-theme";
  let preloadStyles = config.preloadStyles ?? false;
  let criticalLayers = config.criticalLayers ?? ["tokens", "primitives"];

  // New unified shape: autoDefine inside the first argument
  const cfgAuto = (config && config.autoDefine) || null;
  if (cfgAuto && typeof cfgAuto === "object") {
    // no-op here; resolved below for __setupAutoDefinerAndEnhancers
  }

  try {
    // 1) Handle theme preference
    const { resolvedTheme, storedTheme } = __resolveThemeAndApply({
      manageTheme,
      themeStorageKey,
    });

    // 2) Normalize first-arg API: support { preset, design, enhancers }
    const normalized = __normalizeInitConfig(config, {});
    const userEnhancers = normalized.enhancers;
    // Extract log function before cloning to avoid DataCloneError
    const { log: logFn, ...configToClone } = normalized.generatorConfig;
    const generatorConfig = structuredClone(configToClone);
    // Add log back after cloning
    generatorConfig.log = logFn;
    if (manageTheme) {
      generatorConfig.theme = resolvedTheme;
    }

    const generator = new PDS.Generator(generatorConfig);

    // 3) Load fonts from Google Fonts if needed (before applying styles)
    if (generatorConfig.design?.typography) {
      try {
        await loadTypographyFonts(generatorConfig.design.typography);
      } catch (ex) {
        generatorConfig?.log?.("warn", "Failed to load some fonts from Google Fonts:", ex);
        // Continue anyway - the system will fall back to default fonts
      }
    }

    // 4) Preload critical styles synchronously to prevent flash
    if (preloadStyles && typeof window !== "undefined" && document.head) {
      try {
        // Generate critical CSS layers synchronously
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
          // Remove any existing PDS critical styles
          const existingCritical = document.head.querySelector(
            "style[data-pds-critical]"
          );
          if (existingCritical) {
            existingCritical.remove();
          }

          // Inject critical CSS as a <style> tag in head
          const styleEl = document.createElement("style");
          styleEl.setAttribute("data-pds-critical", "");
          styleEl.textContent = criticalCSS;

          // Insert early in head, but after charset/viewport if present
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
        // Continue without critical styles - better than crashing
      }
    }

    // Set the registry to use this designer
    PDS.registry.setDesigner(generator, {
      presetName: normalized.presetInfo?.name,
    });

    // Apply styles globally if requested (default behavior)
    if (applyGlobalStyles) {
      await PDS.Generator.applyStyles(generator);

      // Clean up critical styles after adoptedStyleSheets are applied
      if (typeof window !== "undefined") {
        // Small delay to ensure adoptedStyleSheets have taken effect
        setTimeout(() => {
          // Remove any previously inlined critical/preload styles that were unlayered
          const criticalStyle = document.head.querySelector(
            "style[data-pds-critical]"
          );
          if (criticalStyle) criticalStyle.remove();

          const preloadStyle = document.head.querySelector(
            "style[data-pds-preload]"
          );
          if (preloadStyle) preloadStyle.remove();

          // Remove legacy fallback runtime style tag if present
          const legacyRuntime = document.getElementById(
            "pds-runtime-stylesheet"
          );
          if (legacyRuntime) legacyRuntime.remove();
        }, 100);
      }
    }

    // Note: auto-define base URL is used internally; no globals are written

    // Derive a sensible default AutoDefiner base for LIVE mode too when not provided.
    // Use the normalized public asset root so live and static modes share the same directory layout.
    const assetRootURL = resolvePublicAssetURL(config);
    let derivedAutoDefineBaseURL =
      (cfgAuto && cfgAuto.baseURL) || `${assetRootURL}components/`;

    // 5) Set up AutoDefiner + run enhancers (defaults merged with user)
    let autoDefiner = null;
    try {
      const res = await __setupAutoDefinerAndEnhancers({
        autoDefineBaseURL: derivedAutoDefineBaseURL,
        autoDefinePreload:
          (cfgAuto && Array.isArray(cfgAuto.predefine) && cfgAuto.predefine) ||
          [],
        autoDefineMapper:
          (cfgAuto && typeof cfgAuto.mapper === "function" && cfgAuto.mapper) ||
          null,
        enhancers: userEnhancers,
        autoDefineOverrides: cfgAuto || null,
      });
      autoDefiner = res.autoDefiner;
    } catch (error) {
      generatorConfig?.log?.("error", "❌ Failed to initialize AutoDefiner/Enhancers:", error);
    }

    // Determine resolved config to expose (generator stores input as options)
    const resolvedConfig = generator?.options || generatorConfig;

    // Expose current config as frozen read-only on PDS, preserving input shape
    // Strip functions before cloning to avoid DataCloneError
    const cloneableConfig = __stripFunctions(config);
    PDS.currentConfig = Object.freeze({
      mode: "live",
      ...structuredClone(cloneableConfig),
      design: structuredClone(normalized.generatorConfig.design),
      preset: normalized.generatorConfig.preset,
      theme: resolvedTheme,
    });

    // Emit event to notify that PDS is ready (unified)
    PDS.dispatchEvent(
      new CustomEvent("pds:ready", {
        detail: {
          mode: "live",
          generator,
          config: resolvedConfig,
          theme: resolvedTheme,
          autoDefiner,
        },
      })
    );

    return {
      generator,
      config: resolvedConfig,
      theme: resolvedTheme,
      autoDefiner,
    };
  } catch (error) {
    // Emit error event
    PDS.dispatchEvent(
      new CustomEvent("pds:error", {
        detail: { error },
      })
    );
    throw error;
  }
}

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
  return live(rest);
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
  const assetRootURL = resolvePublicAssetURL(config);
  const cfgAuto = (config && config.autoDefine) || null;
  let autoDefineBaseURL = (cfgAuto && cfgAuto.baseURL) || `${assetRootURL}components/`;
  const autoDefinePreload =
    (cfgAuto && Array.isArray(cfgAuto.predefine) && cfgAuto.predefine) || [];
  const autoDefineMapper =
    (cfgAuto && typeof cfgAuto.mapper === "function" && cfgAuto.mapper) || null;

  try {
    // 1) Theme
    const { resolvedTheme } = __resolveThemeAndApply({
      manageTheme,
      themeStorageKey,
    });

    // Normalize first-arg to allow { preset, design, enhancers }
    const normalized = __normalizeInitConfig(config, {});
    const userEnhancers = normalized.enhancers;

    // 2) Derive static asset URLs from the normalized public root
    const baseStaticPaths = {
      tokens: `${assetRootURL}styles/pds-tokens.css.js`,
      primitives: `${assetRootURL}styles/pds-primitives.css.js`,
      components: `${assetRootURL}styles/pds-components.css.js`,
      utilities: `${assetRootURL}styles/pds-utilities.css.js`,
      styles: `${assetRootURL}styles/pds-styles.css.js`,
    };
    staticPaths = { ...baseStaticPaths, ...staticPaths };
    if (!(cfgAuto && cfgAuto.baseURL)) {
      autoDefineBaseURL = `${assetRootURL}components/`;
    }

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
        // No config available in static mode, using console
        console.warn("Failed to apply static styles:", e);
      }
    }

    // 5) AutoDefiner + Enhancers
    let autoDefiner = null;
    try {
      const res = await __setupAutoDefinerAndEnhancers({
        autoDefineBaseURL,
        autoDefinePreload,
        autoDefineMapper,
        enhancers: userEnhancers,
        autoDefineOverrides: cfgAuto || null,
      });
      autoDefiner = res.autoDefiner;
    } catch (error) {
      // No config available in static mode, using console
      console.error(
        "❌ Failed to initialize AutoDefiner/Enhancers (static):",
        error
      );
    }

    // Expose current config as frozen read-only on PDS, preserving input shape
    // Strip functions before cloning to avoid DataCloneError
    const cloneableConfig = __stripFunctions(config);
    PDS.currentConfig = Object.freeze({
      mode: "static",
      ...structuredClone(cloneableConfig),
      design: structuredClone(normalized.generatorConfig.design),
      preset: normalized.generatorConfig.preset,
      theme: resolvedTheme,
    });

    // 6) Emit ready event (unified)
    PDS.dispatchEvent(
      new CustomEvent("pds:ready", {
        detail: {
          mode: "static",
          config: normalized.generatorConfig,
          theme: resolvedTheme,
          autoDefiner,
        },
      })
    );
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

/**
 * Change the current theme programmatically.
 * This updates localStorage, the data-theme attribute, and regenerates styles if in live mode.
 *
 * @param {string} theme - Theme to apply: 'light', 'dark', or 'system'
 * @param {object} [options] - Optional settings
 * @param {string} [options.storageKey='pure-ds-theme'] - localStorage key for theme preference
 * @param {boolean} [options.persist=true] - Whether to save to localStorage
 * @returns {Promise<string>} The resolved theme ('light' or 'dark')
 */
async function setTheme(theme, options = {}) {
  const { storageKey = "pure-ds-theme", persist = true } = options;

  if (!["light", "dark", "system"].includes(theme)) {
    throw new Error(
      `Invalid theme "${theme}". Must be "light", "dark", or "system".`
    );
  }

  if (typeof window === "undefined") {
    return theme === "system" ? "light" : theme;
  }

  let resolvedTheme = theme;

  // Resolve 'system' to actual preference
  if (theme === "system") {
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    resolvedTheme = prefersDark ? "dark" : "light";
  }

  // Update data-theme attribute
  document.documentElement.setAttribute("data-theme", resolvedTheme);

  // Persist to localStorage if requested
  if (persist) {
    localStorage.setItem(storageKey, theme);
  }

  // If we're in live mode, regenerate styles with new theme
  if (PDS.registry.isLive && PDS.registry.hasDesigner) {
    try {
      const currentDesigner = PDS.registry._designer; // Access internal designer
      if (currentDesigner && currentDesigner.configure) {
        // Update the designer's config with new theme
        const newConfig = { ...currentDesigner.config, theme: resolvedTheme };
        currentDesigner.configure(newConfig);

        // Reapply styles
        await PDS.Generator.applyStyles(currentDesigner);
      }
    } catch (error) {
      currentDesigner?.options?.log?.("warn", "Failed to update styles for new theme:", error);
    }
  }

  // Emit theme change event (unified)
  PDS.dispatchEvent(
    new CustomEvent("pds:theme:changed", {
      detail: {
        theme: resolvedTheme,
        requested: theme,
        source: "programmatic",
      },
    })
  );

  return resolvedTheme;
}

/** Change the current theme programmatically */
PDS.setTheme = setTheme;

/**
 * Preload minimal CSS to prevent flash of unstyled content.
 * Call this BEFORE any DOM content is rendered for best results.
 * This is a lightweight alternative to full PDS.start({ mode: 'live' }) initialization.
 *
 * @param {object} config - Minimal PDS config (colors at minimum)
 * @param {object} [options] - Optional settings
 * @param {string} [options.theme] - Theme to generate for ('light', 'dark', or 'system')
 * @param {string[]} [options.layers=['tokens']] - Which CSS layers to preload
 * @returns {void}
 *
 * @example
 * ```html
 * <script type="module">
 *   import { PDS } from 'pure-ds/pds-core';
 *   // Call immediately to prevent flash
 *   PDS.preloadCritical({ colors: { primary: '#007acc' } });
 * </script>
 * ```
 */
function preloadCritical(config, options = {}) {
  if (typeof window === "undefined" || !document.head || !config) {
    return;
  }

  const { theme, layers = ["tokens"] } = options;

  try {
    // Resolve theme quickly
    let resolvedTheme = theme || "light";
    if (theme === "system" || !theme) {
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      resolvedTheme = prefersDark ? "dark" : "light";
    }

    // Set theme attribute immediately
    document.documentElement.setAttribute("data-theme", resolvedTheme);

    // Generate minimal CSS synchronously
    // Normalize config to ensure design property exists
    const tempConfig = config.design 
      ? { ...config, theme: resolvedTheme }
      : { design: config, theme: resolvedTheme };
    const tempGenerator = new PDS.Generator(tempConfig);

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
      // Remove any existing critical styles
      const existing = document.head.querySelector("style[data-pds-preload]");
      if (existing) existing.remove();

      // Inject immediately
      const styleEl = document.createElement("style");
      styleEl.setAttribute("data-pds-preload", "");
      styleEl.textContent = criticalCSS;

      // Insert as early as possible
      document.head.insertBefore(styleEl, document.head.firstChild);
    }
  } catch (error) {
    // Fail silently - better than blocking page load
    // No config available in this context, using console
    console.warn("PDS preload failed:", error);
  }
}

/** Preload minimal CSS to prevent flash of unstyled content */
PDS.preloadCritical = preloadCritical;

// Note: PDS object is not frozen to allow runtime properties like currentConfig
// to be set during initialization. The config object itself is frozen for immutability.

export { PDS, validateDesign };
