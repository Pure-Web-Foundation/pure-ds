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

/** @type {PDSAPI} 
 * Workspace for the Pure Design System runtime API
*/
const PDS = {};

import {
  Generator,
  adoptLayers,
  adoptPrimitives,
  createStylesheet,
  isLiveMode,
} from "./pds-core/pds-generator.js";
import { registry } from "./pds-core/pds-registry";
import ontology from "./pds-core/pds-ontology";
import { findComponentForElement } from "./pds-core/pds-ontology.js";
import { defaultConfig } from "./pds-core/pds-config.js";
import { enums } from "./pds-core/pds-enums.js";

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

PDS.defaultConfig = defaultConfig;

/** Find a component definition (ontology) for a given DOM element */
PDS.findComponentForElement = findComponentForElement;

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
    const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
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
    const gen = new PDS.Generator(structuredClone(designConfig));
    const c = gen.tokens.colors;

    // Light theme checks
    const light = {
      surfaceBg: c.surface?.base || c.semantic?.background,
      surfaceText: c.semantic?.onSurface,
      primary600: c.primary?.[600] || c.primary?.[500] || designConfig.colors?.primary,
    };

  // Primary button (light): prefer semantic primaryFill, else primary600; text white
  const lightPrimaryFill = c.semantic?.primaryFill || light.primary600;
  const lightBtnRatio = contrast(lightPrimaryFill, "#ffffff");
    if (lightBtnRatio < MIN) {
      issues.push({
        path: "/colors/primary",
        message: `Primary button contrast too low in light theme (${lightBtnRatio.toFixed(2)} < ${MIN}). Choose a darker primary.`,
        ratio: lightBtnRatio,
        min: MIN,
        context: "light/btn-primary"
      });
    }

    // Surface text (light): onSurface vs surface base
    const lightTextRatio = contrast(light.surfaceBg, light.surfaceText);
    if (lightTextRatio < MIN) {
      issues.push({
        path: "/colors/background",
        message: `Base text contrast on surface (light) is too low (${lightTextRatio.toFixed(2)} < ${MIN}). Adjust background or secondary (gray).`,
        ratio: lightTextRatio,
        min: MIN,
        context: "light/surface-text"
      });
    }

    // Prefer semantic primaryText if available for outline/link; fallback to primary600
    const lightPrimaryText = c.semantic?.primaryText || light.primary600;
    const lightOutlineRatio = contrast(lightPrimaryText, light.surfaceBg);
    if (lightOutlineRatio < MIN) {
      issues.push({
        path: "/colors/primary",
        message: `Primary text on surface is too low for outline/link styles (light) (${lightOutlineRatio.toFixed(2)} < ${MIN}). Choose a darker primary, lighter surface, or adjust semantic.primaryText.`,
        ratio: lightOutlineRatio,
        min: MIN,
        context: "light/outline"
      });
    }

    // Dark theme checks
    const d = c.dark;
    if (d) {
      const dark = {
        surfaceBg: d.surface?.base || d.semantic?.background || c.surface?.inverse,
        primary600: d.primary?.[600] || d.primary?.[500] || c.primary?.[600],
      };
  const darkPrimaryFill = d.semantic?.primaryFill || dark.primary600;
  const darkBtnRatio = contrast(darkPrimaryFill, "#ffffff");
      if (darkBtnRatio < MIN) {
        issues.push({
          path: "/colors/darkMode/primary",
          message: `Primary button contrast too low in dark theme (${darkBtnRatio.toFixed(2)} < ${MIN}). Override darkMode.primary or pick a brighter hue.`,
          ratio: darkBtnRatio,
          min: MIN,
          context: "dark/btn-primary"
        });
      }

      // Outline/link style in dark: primary text on dark surface (AA target)
      const darkPrimaryText = d.semantic?.primaryText || dark.primary600;
      const darkOutlineRatio = contrast(darkPrimaryText, dark.surfaceBg);
      if (darkOutlineRatio < MIN) {
        issues.push({
          path: "/colors/darkMode/primary",
          message: `Primary text on surface is too low for outline/link styles (dark) (${darkOutlineRatio.toFixed(2)} < ${MIN}). Override darkMode.primary/background or adjust semantic.primaryText.`,
          ratio: darkOutlineRatio,
          min: MIN,
          context: "dark/outline"
        });
      }
    }
  } catch (err) {
    issues.push({ path: "/", message: `Validation failed: ${String(err?.message || err)}`, ratio: 0, min: 0 });
  }

  return { ok: issues.length === 0, issues };
}

/** Expose validator on the public API */
PDS.validateDesign = validateDesign;

/**
 * Initialize PDS in live mode with the given configuration.
 * This is the main entry point for consuming applications.
 * 
 * @param {object} config - The PDS configuration object
 * @param {object} [options] - Optional settings
 * @param {string} [options.autoDefineBaseURL] - Base URL for auto-define components (default: '/auto-define/')
 * @param {boolean} [options.applyGlobalStyles=true] - Whether to apply styles globally via adoptedStyleSheets
 * @param {boolean} [options.manageTheme=true] - Whether to automatically manage data-theme attribute and localStorage
 * @param {string} [options.themeStorageKey='pure-ds-theme'] - localStorage key for theme preference
 * @returns {Promise<{generator: Generator, config: object, theme: string}>} The generator instance, resolved config, and current theme
 * 
 * @example
 * ```js
 * import { PDS } from '@pure-ds/core';
 * 
 * await PDS.live({
 *   colors: {
 *     primary: '#007acc',
 *     secondary: '#666666'
 *   },
 *   typography: {
 *     fontFamily: 'Inter, sans-serif'
 *   }
 * });
 * ```
 */
async function live(config, options = {}) {
  if (!config || typeof config !== 'object') {
    throw new Error('PDS.live() requires a valid configuration object');
  }

  const {
    autoDefineBaseURL = '/auto-define/',
    applyGlobalStyles = true,
    manageTheme = true,
    themeStorageKey = 'pure-ds-theme'
  } = options;

  try {
    let resolvedTheme = 'light'; // default fallback
    
    // 1) Handle theme preference early so styles are generated with correct scope
    if (manageTheme && typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem(themeStorageKey);
      
      if (storedTheme) {
        // If user explicitly stored 'light' or 'dark', use that. If they stored 'system',
        // resolve current OS preference and set the attribute to an explicit value
        if (storedTheme === 'system') {
          const prefersDark = window.matchMedia && 
            window.matchMedia('(prefers-color-scheme: dark)').matches;
          resolvedTheme = prefersDark ? 'dark' : 'light';
          document.documentElement.setAttribute('data-theme', resolvedTheme);
        } else {
          resolvedTheme = storedTheme;
          document.documentElement.setAttribute('data-theme', storedTheme);
        }
      } else {
        // No persisted preference: choose from OS preference and do not persist
        const prefersDark = window.matchMedia && 
          window.matchMedia('(prefers-color-scheme: dark)').matches;
        resolvedTheme = prefersDark ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', resolvedTheme);
      }

      // 2) If the user preference is 'system' we need to keep the html[data-theme]
      // attribute in sync with the OS. When localStorage contains 'system' we
      // register a matchMedia listener that updates the attribute to either
      // 'dark' or 'light' on changes.
      if (storedTheme === 'system' && window.matchMedia) {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const listener = (e) => {
          const isDark = e.matches === undefined ? mq.matches : e.matches;
          try {
            const newTheme = isDark ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            
            // Emit event so consuming apps can react to theme changes
            window.dispatchEvent(new CustomEvent('pds-theme-changed', {
              detail: { theme: newTheme, source: 'system' }
            }));
          } catch (ex) {
            /* ignore */
          }
        };

        // Attach listener using modern API where available
        if (typeof mq.addEventListener === 'function') {
          mq.addEventListener('change', listener);
        } else if (typeof mq.addListener === 'function') {
          mq.addListener(listener);
        }
      }
    }

    // 3) Create generator with the provided config, including theme
    const generatorConfig = structuredClone(config);
    if (manageTheme) {
      generatorConfig.theme = resolvedTheme;
    }
    
    const generator = new PDS.Generator(generatorConfig);
    
    // Set the registry to use this designer
    PDS.registry.setDesigner(generator);
    
    // Apply styles globally if requested (default behavior)
    if (applyGlobalStyles) {
      await PDS.Generator.applyStyles(generator);
    }
    
    // Set up auto-define base URL for lazy-loaded components
    if (typeof window !== 'undefined' && window.document) {
      window.__pds = window.__pds || {};
      window.__pds.autoDefineBaseURL = autoDefineBaseURL;
    }
    
    // Emit event to notify that PDS is ready
    if (typeof window !== 'undefined' && window.document) {
      window.dispatchEvent(new CustomEvent('pds-live-ready', {
        detail: { generator, config: generator.config, theme: resolvedTheme }
      }));
    }
    
    return { generator, config: generator.config, theme: resolvedTheme };
    
  } catch (error) {
    // Emit error event
    if (typeof window !== 'undefined' && window.document) {
      window.dispatchEvent(new CustomEvent('pds-error', {
        detail: error
      }));
    }
    throw error;
  }
}

/** Initialize PDS in live mode with the given configuration */
PDS.live = live;

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
  const { storageKey = 'pure-ds-theme', persist = true } = options;
  
  if (!['light', 'dark', 'system'].includes(theme)) {
    throw new Error(`Invalid theme "${theme}". Must be "light", "dark", or "system".`);
  }

  if (typeof window === 'undefined') {
    return theme === 'system' ? 'light' : theme;
  }

  let resolvedTheme = theme;

  // Resolve 'system' to actual preference
  if (theme === 'system') {
    const prefersDark = window.matchMedia && 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    resolvedTheme = prefersDark ? 'dark' : 'light';
  }

  // Update data-theme attribute
  document.documentElement.setAttribute('data-theme', resolvedTheme);

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
      console.warn('Failed to update styles for new theme:', error);
    }
  }

  // Emit theme change event
  window.dispatchEvent(new CustomEvent('pds-theme-changed', {
    detail: { theme: resolvedTheme, requested: theme, source: 'programmatic' }
  }));

  return resolvedTheme;
}

/** Change the current theme programmatically */
PDS.setTheme = setTheme;

Object.freeze(PDS);

export { PDS };
