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
import { AutoDefiner } from "pure-web/auto-definer";

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

// ----------------------------------------------------------------------------
// Default Enhancers — first-class citizens alongside AutoDefiner
// ----------------------------------------------------------------------------
/**
 * Default DOM enhancers shipped with PDS. These are lightweight progressive
 * enhancements that can be applied to vanilla markup. Consumers can override
 * or add to these via the `enhancers` option of PDS.live()/PDS.static().
 */
PDS.defaultEnhancers = [
  {
    selector: "nav[data-dropdown]",
    demoHtml: () => `
      <nav data-dropdown>
        <button class="btn-primary">Menu</button>
        <menu style="display:none">
          <li><a href="#">Item 1</a></li>
          <li><a href="#">Item 2</a></li>
        </menu>
      </nav>`,
    run: (elem) => {
      if (elem.dataset.enhancedDropdown) return;
      elem.dataset.enhancedDropdown = "true";
      elem.style.position = "relative";
      const menu = elem.querySelector("menu");
      if (!menu) return;
      // Ensure toggle button doesn't submit forms by default
      const btn = elem.querySelector('button');
      if (btn && !btn.hasAttribute('type')) {
        btn.setAttribute('type', 'button');
      }
      const toggle = () => {
        const isCurrentlyVisible = menu.style.display !== "none";
        menu.style.display = isCurrentlyVisible ? "none" : "block";
      };
      menu.style.display = "none";
      elem.addEventListener("click", toggle);
    },
  },
  {
    selector: "label[data-toggle]",
    demoHtml: () => `<label data-toggle>
      <span data-label>Enable notifications</span>
      <input type="checkbox">
    </label>`,
    run: (elem) => {
      if (elem.dataset.enhancedToggle) return;
      elem.dataset.enhancedToggle = "true";
      const checkbox = elem.querySelector('input[type="checkbox"]');
      if (!checkbox) return;
      const toggleSwitch = document.createElement("span");
      toggleSwitch.className = "toggle-switch";
      toggleSwitch.setAttribute("role", "presentation");
      toggleSwitch.setAttribute("aria-hidden", "true");
      const knob = document.createElement("span");
      knob.className = "toggle-knob";
      toggleSwitch.appendChild(knob);
      const labelSpan = elem.querySelector("span[data-label]");
      if (labelSpan) elem.insertBefore(toggleSwitch, labelSpan);
      else elem.appendChild(toggleSwitch);
      elem.addEventListener("click", (e) => {
        if (checkbox.disabled) return;
        e.preventDefault();
        checkbox.checked = !checkbox.checked;
        checkbox.dispatchEvent(new Event("change", { bubbles: true }));
      });
    },
  },
  {
    selector: 'input[type="range"]',
    demoHtml: (elem) => {
      const min = elem?.getAttribute?.("min") || 0;
      const max = elem?.getAttribute?.("max") || 100;
      const value = elem?.getAttribute?.("value") || elem?.value || 0;
      return `<input type="range" min="${min}" max="${max}" value="${value}">`;
    },
    run: (elem) => {
      if (elem.dataset.enhancedRange) return;
      let container = elem.closest(".range-container");
      if (!container) {
        container = document.createElement("div");
        container.className = "range-container";
        elem.parentNode?.insertBefore(container, elem);
        container.appendChild(elem);
      }
      container.style.position = "relative";
      const bubble = document.createElement("div");
      bubble.className = "range-bubble";
      bubble.setAttribute("aria-hidden", "true");
      container.appendChild(bubble);
      const updateBubble = () => {
        const min = parseFloat(elem.min) || 0;
        const max = parseFloat(elem.max) || 100;
        const value = parseFloat(elem.value);
        const pct = (value - min) / (max - min);
        bubble.style.left = `calc(${pct * 100}% )`;
        bubble.textContent = String(value);
      };
      const show = () => bubble.classList.add("visible");
      const hide = () => bubble.classList.remove("visible");
      elem.addEventListener("input", updateBubble);
      elem.addEventListener("pointerdown", show);
      elem.addEventListener("pointerup", hide);
      elem.addEventListener("pointerleave", hide);
      elem.addEventListener("focus", show);
      elem.addEventListener("blur", hide);
      updateBubble();
      elem.dataset.enhancedRange = "1";
    },
  },
];

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
 * @param {string[]} [options.autoDefinePreload] - Component tags to predefine immediately (e.g., ['pds-icon'])
 * @param {function} [options.autoDefineMapper] - Custom mapper function for tag-to-file mapping
 * @param {boolean} [options.applyGlobalStyles=true] - Whether to apply styles globally via adoptedStyleSheets
 * @param {boolean} [options.manageTheme=true] - Whether to automatically manage data-theme attribute and localStorage
 * @param {string} [options.themeStorageKey='pure-ds-theme'] - localStorage key for theme preference
 * @param {boolean} [options.preloadStyles=false] - Whether to inject critical CSS synchronously to prevent flash
 * @param {string[]} [options.criticalLayers=['tokens', 'primitives']] - Which CSS layers to preload synchronously
 * @returns {Promise<{generator: Generator, config: object, theme: string, autoDefiner?: any}>} The generator instance, resolved config, current theme, and autoDefiner if available
 * 
 * @example
 * ```js
 * import { PDS } from '@pure-ds/core';
 * 
 * // With auto-define components
 * await PDS.live({
 *   colors: { primary: '#007acc' }
 * }, { 
 *   autoDefineBaseURL: '/components/',
 *   autoDefinePreload: ['my-app', 'pds-icon']
 * });
 * ```
 */
// Internal: resolve theme and set html[data-theme], return resolvedTheme and storedTheme
function __resolveThemeAndApply({ manageTheme, themeStorageKey }) {
  let resolvedTheme = "light";
  let storedTheme = null;
  if (manageTheme && typeof window !== "undefined") {
    storedTheme = localStorage.getItem(themeStorageKey);
    if (storedTheme) {
      if (storedTheme === "system") {
        const prefersDark =
          window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        resolvedTheme = prefersDark ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", resolvedTheme);
      } else {
        resolvedTheme = storedTheme;
        document.documentElement.setAttribute("data-theme", storedTheme);
      }
    } else {
      const prefersDark =
        window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      resolvedTheme = prefersDark ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", resolvedTheme);
    }

    if (storedTheme === "system" && window.matchMedia) {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const listener = (e) => {
        const isDark = e.matches === undefined ? mq.matches : e.matches;
        try {
          const newTheme = isDark ? "dark" : "light";
          document.documentElement.setAttribute("data-theme", newTheme);
          window.dispatchEvent(
            new CustomEvent("pds-theme-changed", { detail: { theme: newTheme, source: "system" } })
          );
        } catch {}
      };
      if (typeof mq.addEventListener === "function") mq.addEventListener("change", listener);
      else if (typeof mq.addListener === "function") mq.addListener(listener);
    }
  }
  return { resolvedTheme, storedTheme };
}

// Internal: setup AutoDefiner and run enhancers
async function __setupAutoDefinerAndEnhancers(options) {
  const {
    autoDefineBaseURL = "/auto-define/",
    autoDefinePreload = [],
    autoDefineMapper = null,
    enhancers = [],
  } = options;

  // Warn if assets not present (best-effort)
  try {
    if (typeof window !== "undefined") {
      const response = await fetch(`${autoDefineBaseURL}pds-icon.js`, { method: "HEAD" });
      if (!response.ok) {
        console.warn("⚠️ PDS components not found in auto-define directory.");
      }
    }
  } catch {}

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
    const defaultMapper = (tag) => {
      switch (tag) {
        case "pds-tabpanel":
          return "pds-tabstrip.js";
        default:
          return `${tag}.js`;
      }
    };

    const autoDefineConfig = {
      baseURL: autoDefineBaseURL,
      predefine: autoDefinePreload,
      scanExisting: true,
      observeShadows: true,
      patchAttachShadow: true,
      debounceMs: 16,
      enhancers: mergedEnhancers,
      mapper: (tag) => {
        if (customElements.get(tag)) return null;
        return (autoDefineMapper || defaultMapper)(tag);
      },
      onError: (tag, err) => {
        if (typeof tag === "string" && tag.startsWith("pds-")) {
          console.warn(`⚠️ PDS component <${tag}> not found. Assets may not be installed.`);
        } else {
          console.error(`❌ Auto-define error for <${tag}>:`, err);
        }
      },
    };

    autoDefiner = new AutoDefiner(autoDefineConfig);
    if (autoDefinePreload.length > 0) {
      await AutoDefiner.define(autoDefinePreload);
    }
  }
  // Rely on AutoDefiner to run enhancers across light and shadow DOMs

  return { autoDefiner };
}

async function live(config, options = {}) {
  if (!config || typeof config !== 'object') {
    throw new Error('PDS.live() requires a valid configuration object');
  }

  const {
    autoDefineBaseURL = '/auto-define/',
    autoDefinePreload = [],
    autoDefineMapper = null,
    applyGlobalStyles = true,
    manageTheme = true,
    themeStorageKey = 'pure-ds-theme',
    preloadStyles = false,
    criticalLayers = ['tokens', 'primitives']
  } = options;

  try {
    // 1) Handle theme preference
    const { resolvedTheme, storedTheme } = __resolveThemeAndApply({ manageTheme, themeStorageKey });

    // 3) Create generator with the provided config, including theme
    const generatorConfig = structuredClone(config);
    if (manageTheme) {
      generatorConfig.theme = resolvedTheme;
    }
    
    const generator = new PDS.Generator(generatorConfig);
    
    // 4) Preload critical styles synchronously to prevent flash
    if (preloadStyles && typeof window !== 'undefined' && document.head) {
      try {
        // Generate critical CSS layers synchronously
        const criticalCSS = criticalLayers
          .map(layer => {
            try {
              return generator.css?.[layer] || '';
            } catch (e) {
              console.warn(`Failed to generate critical CSS for layer "${layer}":`, e);
              return '';
            }
          })
          .filter(css => css.trim())
          .join('\n');

        if (criticalCSS) {
          // Remove any existing PDS critical styles
          const existingCritical = document.head.querySelector('style[data-pds-critical]');
          if (existingCritical) {
            existingCritical.remove();
          }

          // Inject critical CSS as a <style> tag in head
          const styleEl = document.createElement('style');
          styleEl.setAttribute('data-pds-critical', '');
          styleEl.textContent = criticalCSS;
          
          // Insert early in head, but after charset/viewport if present
          const insertAfter = document.head.querySelector('meta[charset], meta[name="viewport"]');
          if (insertAfter) {
            insertAfter.parentNode.insertBefore(styleEl, insertAfter.nextSibling);
          } else {
            document.head.insertBefore(styleEl, document.head.firstChild);
          }
        }
      } catch (error) {
        console.warn('Failed to preload critical styles:', error);
        // Continue without critical styles - better than crashing
      }
    }
    
    // Set the registry to use this designer
    PDS.registry.setDesigner(generator);
    
    // Apply styles globally if requested (default behavior)
    if (applyGlobalStyles) {
      await PDS.Generator.applyStyles(generator);
      
      // Clean up critical styles after adoptedStyleSheets are applied
      if (preloadStyles && typeof window !== 'undefined') {
        // Small delay to ensure adoptedStyleSheets have taken effect
        setTimeout(() => {
          const criticalStyle = document.head.querySelector('style[data-pds-critical]');
          if (criticalStyle) {
            criticalStyle.remove();
          }
        }, 100);
      }
    }
    
    // Note: auto-define base URL is used internally; no globals are written

    // 5) Set up AutoDefiner + run enhancers (defaults merged with user)
    let autoDefiner = null;
    try {
      const res = await __setupAutoDefinerAndEnhancers({
        autoDefineBaseURL,
        autoDefinePreload,
        autoDefineMapper,
        enhancers: options.enhancers,
      });
      autoDefiner = res.autoDefiner;
    } catch (error) {
      console.error('❌ Failed to initialize AutoDefiner/Enhancers:', error);
    }
    
    // Determine resolved config to expose (generator stores input as options)
    const resolvedConfig = generator?.options || generatorConfig;

    // Emit event to notify that PDS is ready
    if (typeof window !== 'undefined' && window.document) {
      window.dispatchEvent(new CustomEvent('pds-live-ready', {
        detail: { generator, config: resolvedConfig, theme: resolvedTheme, autoDefiner }
      }));
    }
    
    return { generator, config: resolvedConfig, theme: resolvedTheme, autoDefiner };
    
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
 * Initialize PDS in static mode with the given configuration.
 * Signature mirrors PDS.live(config, options).
 */
async function staticInit(config, options = {}) {
  if (!config || typeof config !== 'object') {
    throw new Error('PDS.static() requires a valid configuration object');
  }

  const {
    autoDefineBaseURL = '/auto-define/',
    autoDefinePreload = [],
    autoDefineMapper = null,
    applyGlobalStyles = true,
    manageTheme = true,
    themeStorageKey = 'pure-ds-theme',
    staticPaths = {},
  } = options;

  try {
    // 1) Theme
    const { resolvedTheme } = __resolveThemeAndApply({ manageTheme, themeStorageKey });

    // 2) Static mode registry
    PDS.registry.setStaticMode(staticPaths);

    // 3) Apply global static styles if requested
    if (applyGlobalStyles && typeof document !== 'undefined') {
      try {
        const stylesSheet = await PDS.registry.getStylesheet('styles');
        if (stylesSheet) {
          // Tag and adopt alongside existing non-PDS
          stylesSheet._pds = true;
          const others = (document.adoptedStyleSheets || []).filter((s) => s._pds !== true);
          document.adoptedStyleSheets = [...others, stylesSheet];
        }
      } catch (e) {
        console.warn('Failed to apply static styles:', e);
      }
    }

    // 4) AutoDefiner + Enhancers
    let autoDefiner = null;
    try {
      const res = await __setupAutoDefinerAndEnhancers({
        autoDefineBaseURL,
        autoDefinePreload,
        autoDefineMapper,
        enhancers: options.enhancers,
      });
      autoDefiner = res.autoDefiner;
    } catch (error) {
      console.error('❌ Failed to initialize AutoDefiner/Enhancers (static):', error);
    }

    // 5) Emit ready event
    if (typeof window !== 'undefined' && window.document) {
      window.dispatchEvent(new CustomEvent('pds-static-ready', {
        detail: { config, theme: resolvedTheme, autoDefiner }
      }));
    }
    return { config, theme: resolvedTheme, autoDefiner };

  } catch (error) {
    if (typeof window !== 'undefined' && window.document) {
      window.dispatchEvent(new CustomEvent('pds-error', { detail: error }));
    }
    throw error;
  }
}

/** Initialize PDS in static mode with the given configuration */
PDS.static = staticInit;

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

/**
 * Preload minimal CSS to prevent flash of unstyled content.
 * Call this BEFORE any DOM content is rendered for best results.
 * This is a lightweight alternative to full PDS.live() initialization.
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
 *   import { PDS } from '@pure-ds/core';
 *   // Call immediately to prevent flash
 *   PDS.preloadCritical({ colors: { primary: '#007acc' } });
 * </script>
 * ```
 */
function preloadCritical(config, options = {}) {
  if (typeof window === 'undefined' || !document.head || !config) {
    return;
  }

  const { theme, layers = ['tokens'] } = options;
  
  try {
    // Resolve theme quickly
    let resolvedTheme = theme || 'light';
    if (theme === 'system' || !theme) {
      const prefersDark = window.matchMedia && 
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      resolvedTheme = prefersDark ? 'dark' : 'light';
    }

    // Set theme attribute immediately
    document.documentElement.setAttribute('data-theme', resolvedTheme);

    // Generate minimal CSS synchronously
    const tempConfig = { ...config, theme: resolvedTheme };
    const tempGenerator = new PDS.Generator(tempConfig);
    
    const criticalCSS = layers
      .map(layer => {
        try {
          return tempGenerator.css?.[layer] || '';
        } catch (e) {
          return '';
        }
      })
      .filter(css => css.trim())
      .join('\n');

    if (criticalCSS) {
      // Remove any existing critical styles
      const existing = document.head.querySelector('style[data-pds-preload]');
      if (existing) existing.remove();

      // Inject immediately
      const styleEl = document.createElement('style');
      styleEl.setAttribute('data-pds-preload', '');
      styleEl.textContent = criticalCSS;
      
      // Insert as early as possible
      document.head.insertBefore(styleEl, document.head.firstChild);
    }
  } catch (error) {
    // Fail silently - better than blocking page load
    console.warn('PDS preload failed:', error);
  }
}

/** Preload minimal CSS to prevent flash of unstyled content */
PDS.preloadCritical = preloadCritical;

Object.freeze(PDS);

export { PDS };
