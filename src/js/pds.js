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
class __PDS_EventBus extends EventTarget {}
/** @type {PDSAPI & __PDS_EventBus} */
const PDS = new __PDS_EventBus();

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
import { presets } from "./pds-core/pds-config.js";
import { enums } from "./pds-core/pds-enums.js";
import { ask } from "./common/ask.js";

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

// Expose presets object directly
PDS.presets = presets;

/** Find a component definition (ontology) for a given DOM element */
PDS.findComponentForElement = findComponentForElement;

// Always expose PDS on the window in browser contexts so consumers can access it in both live and static modes
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
PDS._themeStorageKey = "pure-ds-theme";
PDS._themeMQ = null;
PDS._themeMQListener = null;

PDS._applyResolvedTheme = function (raw) {
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
};

PDS._setupSystemListenerIfNeeded = function (raw) {
  try {
    // Remove any existing listener first
    if (PDS._themeMQ && PDS._themeMQListener) {
      try {
        if (typeof PDS._themeMQ.removeEventListener === "function")
          PDS._themeMQ.removeEventListener("change", PDS._themeMQListener);
        else if (typeof PDS._themeMQ.removeListener === "function")
          PDS._themeMQ.removeListener(PDS._themeMQListener);
      } catch (e) {}
      PDS._themeMQ = null;
      PDS._themeMQListener = null;
    }

    if (raw === "system" && typeof window !== "undefined" && window.matchMedia) {
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
      PDS._themeMQ = mq;
      PDS._themeMQListener = listener;
      if (typeof mq.addEventListener === "function") mq.addEventListener("change", listener);
      else if (typeof mq.addListener === "function") mq.addListener(listener);
    }
  } catch (e) {}
};

Object.defineProperty(PDS, "theme", {
  get() {
    try {
      if (typeof window === "undefined") return null;
      return localStorage.getItem(PDS._themeStorageKey) || null;
    } catch (e) {
      return null;
    }
  },
  set(value) {
    try {
      if (typeof window === "undefined") return;
      if (value === null || value === undefined) {
        localStorage.removeItem(PDS._themeStorageKey);
      } else {
        localStorage.setItem(PDS._themeStorageKey, value);
      }

      // Apply resolved (light/dark) value to document
      PDS._applyResolvedTheme(value);
      // Setup system change listener only when 'system' is selected
      PDS._setupSystemListenerIfNeeded(value);

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
      const menu = elem.querySelector("menu");
      if (!menu) return;

      // Ensure toggle button doesn't submit forms by default
      const btn = elem.querySelector("button");
      if (btn && !btn.hasAttribute("type")) {
        btn.setAttribute("type", "button");
      }

      // Accessibility attributes
      if (btn) {
        btn.setAttribute("aria-haspopup", "true");
        btn.setAttribute("aria-expanded", "false");
      }
      menu.setAttribute("role", menu.getAttribute("role") || "menu");
      menu.setAttribute("aria-hidden", "true");

      // Ensure initial hidden state
      menu.style.display = "none";

      const placeMenu = (direction) => {
        if (direction === "up") {
          menu.style.top = "auto";
          menu.style.bottom = "100%";
          menu.style.marginTop = "";
          menu.style.marginBottom = "var(--spacing-2)";
        } else {
          menu.style.top = "100%";
          menu.style.bottom = "auto";
          menu.style.marginBottom = "";
          menu.style.marginTop = "var(--spacing-2)";
        }
      };

      const computeAutoDirection = () => {
        // Choose the direction with the most vertical space available.
        // This is simpler and more robust for very long menus: prefer the
        // direction that gives the user the most room and allow the menu to
        // scroll when needed.
        const rect = elem.getBoundingClientRect();
        const spaceBelow = Math.max(0, window.innerHeight - rect.bottom);
        const spaceAbove = Math.max(0, rect.top);
        return spaceAbove > spaceBelow ? "up" : "down";
      };

      const showMenu = () => {
        const mode = (elem.getAttribute("data-mode") || "auto").toLowerCase();
        let dir = mode;
        if (mode === "auto") {
          dir = computeAutoDirection();
        }
        placeMenu(dir);
        // Constrain menu height to available viewport space and allow scrolling
        // when content exceeds that height. Add a tiny safety margin.
        const rect = elem.getBoundingClientRect();
        const spaceBelow = Math.max(0, window.innerHeight - rect.bottom);
        const spaceAbove = Math.max(0, rect.top);
        const available = dir === "up" ? spaceAbove : spaceBelow;
        const maxHeight = Math.max(0, available - 8); // 8px margin
        if (maxHeight > 0) {
          menu.style.maxHeight = `${maxHeight}px`;
          menu.style.overflowY = "auto";
        } else {
          // Fallback: allow the menu to grow but still scroll if needed
          menu.style.maxHeight = "60vh";
          menu.style.overflowY = "auto";
        }

        menu.style.display = "block";
        menu.setAttribute("aria-hidden", "false");
        if (btn) btn.setAttribute("aria-expanded", "true");
      };

      const hideMenu = () => {
        menu.style.display = "none";
        menu.setAttribute("aria-hidden", "true");
        if (btn) btn.setAttribute("aria-expanded", "false");
      };

      const toggle = (e) => {
        // If event originates from a link inside the menu, let it proceed
        if (e && e.target && e.target.closest && e.target.closest('menu')) return;
        const isVisible = menu.style.display !== "none";
        if (isVisible) hideMenu();
        else showMenu();
      };

      // Click only on the toggle button should open/close; clicks inside menu
      // should be handled normally. Close when clicking outside.
      if (btn) btn.addEventListener("click", (ev) => { ev.stopPropagation(); toggle(ev); });
      // Close on outside click
      document.addEventListener("click", (ev) => {
        if (!elem.contains(ev.target)) hideMenu();
      });

      // Also close on Escape
      document.addEventListener("keydown", (ev) => {
        if (ev.key === "Escape") hideMenu();
      });
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
    const gen = new PDS.Generator(structuredClone(designConfig));
    const c = gen.tokens.colors;

    // Light theme checks
    const light = {
      surfaceBg: c.surface?.base || c.semantic?.background,
      surfaceText: c.semantic?.onSurface,
      primary600:
        c.primary?.[600] || c.primary?.[500] || designConfig.colors?.primary,
    };

    // Primary button (light): prefer semantic primaryFill, else primary600; text white
    const lightPrimaryFill = c.semantic?.primaryFill || light.primary600;
    const lightBtnRatio = contrast(lightPrimaryFill, "#ffffff");
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

    // Surface text (light): onSurface vs surface base
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

    // Prefer semantic primaryText if available for outline/link; fallback to primary600
    const lightPrimaryText = c.semantic?.primaryText || light.primary600;
    const lightOutlineRatio = contrast(lightPrimaryText, light.surfaceBg);
    if (lightOutlineRatio < MIN) {
      issues.push({
        path: "/colors/primary",
        message: `Primary text on surface is too low for outline/link styles (light) (${lightOutlineRatio.toFixed(
          2
        )} < ${MIN}). Choose a darker primary, lighter surface, or adjust semantic.primaryText.`,
        ratio: lightOutlineRatio,
        min: MIN,
        context: "light/outline",
      });
    }

    // Dark theme checks
    const d = c.dark;
    if (d) {
      const dark = {
        surfaceBg:
          d.surface?.base || d.semantic?.background || c.surface?.inverse,
        primary600: d.primary?.[600] || d.primary?.[500] || c.primary?.[600],
      };
      const darkPrimaryFill = d.semantic?.primaryFill || dark.primary600;
      const darkBtnRatio = contrast(darkPrimaryFill, "#ffffff");
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

      // Outline/link style in dark: primary text on dark surface (AA target)
      const darkPrimaryText = d.semantic?.primaryText || dark.primary600;
      const darkOutlineRatio = contrast(darkPrimaryText, dark.surfaceBg);
      if (darkOutlineRatio < MIN) {
        issues.push({
          path: "/colors/darkMode/primary",
          message: `Primary text on surface is too low for outline/link styles (dark) (${darkOutlineRatio.toFixed(
            2
          )} < ${MIN}). Override darkMode.primary/background or adjust semantic.primaryText.`,
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
      const found = presets?.[id] || Object.values(presets || {}).find((p) => __slugify(p.name) === id || String(p.name || "").toLowerCase() === id);
      if (!found) {
        results.push({ name: item, ok: false, issues: [{ path: "/", message: `Preset not found: ${item}`, ratio: 0, min: 0 }] });
        continue;
      }
      name = found.name || id;
      configToValidate = structuredClone(found);
    } else if (item && typeof item === "object") {
      name = item.name || item.preset || undefined;
      if ("preset" in item || "design" in item) {
        const effectivePreset = String(item.preset || "default").toLowerCase();
        const found = presets?.[effectivePreset] || Object.values(presets || {}).find((p) => __slugify(p.name) === effectivePreset || String(p.name || "").toLowerCase() === effectivePreset);
        if (!found) {
          results.push({ name, ok: false, issues: [{ path: "/", message: `Preset not found: ${item.preset}`, ratio: 0, min: 0 }] });
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
      results.push({ name, ok: false, issues: [{ path: "/", message: "Invalid design entry", ratio: 0, min: 0 }] });
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
 *     mapper?: (tag:string)=>string,
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
      PDS._applyResolvedTheme(storedTheme);
      PDS._setupSystemListenerIfNeeded(storedTheme);
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
    const found = presets?.[effectivePreset] || Object.values(presets || {}).find((p) => __slugify(p.name) === effectivePreset || String(p.name || "").toLowerCase() === effectivePreset);
    if (!found)
      throw new Error(`PDS preset not found: "${presetId || "default"}"`);

    presetInfo = {
      id: found.id || __slugify(found.name),
      name: found.name || found.id || String(effectivePreset),
    };

    let base = structuredClone(found);
    if (designOverrides && typeof designOverrides === "object") {
      base = __deepMerge(base, structuredClone(designOverrides));
    }
    generatorConfig = base;
  } else if (hasDesignKeys) {
    // Back-compat: treat the provided object as the full config
    generatorConfig = structuredClone(inputConfig);
  } else {
    // Nothing recognizable: use default preset
    const foundDefault = presets?.["default"] || Object.values(presets || {}).find((p) => __slugify(p.name) === "default");
    if (!foundDefault) throw new Error("PDS default preset not available");
    presetInfo = {
      id: foundDefault.id || "default",
      name: foundDefault.name || "Default",
    };
    generatorConfig = structuredClone(foundDefault);
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

  // Warn if assets not present (best-effort)
  try {
    if (typeof window !== "undefined") {
      const response = await fetch(`${autoDefineBaseURL}pds-icon.js`, {
        method: "HEAD",
      });
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
    // Dynamically import AutoDefiner to avoid Node/CJS interop at build time
    let AutoDefinerCtor = null;
    try {
      const mod = await import("pure-web/auto-definer");
      AutoDefinerCtor =
        mod?.AutoDefiner || mod?.default?.AutoDefiner || mod?.default || null;
    } catch (e) {
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
          console.warn(
            `⚠️ PDS component <${tag}> not found. Assets may not be installed.`
          );
        } else {
          console.error(`❌ Auto-define error for <${tag}>:`, err);
        }
      },
      // Merge user overrides (new API) last
      ...(autoDefineOverrides && typeof autoDefineOverrides === 'object' ? autoDefineOverrides : {}),
    };

    if (AutoDefinerCtor) {
      autoDefiner = new AutoDefinerCtor(autoDefineConfig);
      if (
        autoDefinePreload.length > 0 &&
        typeof AutoDefinerCtor.define === "function"
      ) {
        await AutoDefinerCtor.define(autoDefinePreload);
      }
    }
  }
  // Rely on AutoDefiner to run enhancers across light and shadow DOMs

  return { autoDefiner };
}

async function live(config) {
  if (!config || typeof config !== "object") {
    throw new Error("PDS.start({ mode: 'live', ... }) requires a valid configuration object");
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
  if (cfgAuto && typeof cfgAuto === 'object') {
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
    const generatorConfig = structuredClone(normalized.generatorConfig);
    if (manageTheme) {
      generatorConfig.theme = resolvedTheme;
    }

    const generator = new PDS.Generator(generatorConfig);

    // 4) Preload critical styles synchronously to prevent flash
    if (preloadStyles && typeof window !== "undefined" && document.head) {
      try {
        // Generate critical CSS layers synchronously
        const criticalCSS = criticalLayers
          .map((layer) => {
            try {
              return generator.css?.[layer] || "";
            } catch (e) {
              console.warn(
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
        console.warn("Failed to preload critical styles:", error);
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

    // 5) Set up AutoDefiner + run enhancers (defaults merged with user)
    let autoDefiner = null;
    try {
      const res = await __setupAutoDefinerAndEnhancers({
        autoDefineBaseURL: (cfgAuto && cfgAuto.baseURL) || "/auto-define/",
        autoDefinePreload: (cfgAuto && Array.isArray(cfgAuto.predefine) && cfgAuto.predefine) || [],
        autoDefineMapper: (cfgAuto && typeof cfgAuto.mapper === 'function' && cfgAuto.mapper) || null,
        enhancers: userEnhancers,
        autoDefineOverrides: cfgAuto || null,
      });
      autoDefiner = res.autoDefiner;
    } catch (error) {
      console.error("❌ Failed to initialize AutoDefiner/Enhancers:", error);
    }

    // Determine resolved config to expose (generator stores input as options)
    const resolvedConfig = generator?.options || generatorConfig;

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

// Note: PDS.live is not exported. Use PDS.start({ mode: 'live', ... }).

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
    throw new Error("PDS.start({ mode: 'static', ... }) requires a valid configuration object");
  }

  const applyGlobalStyles = config.applyGlobalStyles ?? true;
  const manageTheme = config.manageTheme ?? true;
  const themeStorageKey = config.themeStorageKey ?? "pure-ds-theme";
  let staticPaths = config.staticPaths ?? {};
  const staticConfig = /** @type {{ root?: string }} */ (config.static || {});
  const cfgAuto = (config && config.autoDefine) || null;
  const autoDefineBaseURL = (cfgAuto && cfgAuto.baseURL) || "/auto-define/";
  const autoDefinePreload = (cfgAuto && Array.isArray(cfgAuto.predefine) && cfgAuto.predefine) || [];
  const autoDefineMapper = (cfgAuto && typeof cfgAuto.mapper === 'function' && cfgAuto.mapper) || null;

  try {
    // 1) Theme
    const { resolvedTheme } = __resolveThemeAndApply({
      manageTheme,
      themeStorageKey,
    });

  // Normalize first-arg to allow { preset, design, enhancers }
  const normalized = __normalizeInitConfig(config, {});
    const userEnhancers = normalized.enhancers;

    // 2) Compute static asset URLs from config.static.root if provided
    //    This allows consumers to specify a filesystem-ish path like
    //    "public/assets/pds/" which maps to "/assets/pds/" at runtime.
    const toUrlRoot = (root) => {
      if (!root) return null;
      try {
        let r = String(root).replace(/\\/g, '/');
        // If already an absolute URL or root-relative, use as-is
        if (/^https?:\/\//i.test(r) || r.startsWith('/')) {
          if (!r.endsWith('/')) r += '/';
          return r;
        }
        // Map repo/public-relative to web root
        if (r.startsWith('public/')) r = r.substring('public/'.length);
        if (!r.startsWith('/')) r = '/' + r;
        if (!r.endsWith('/')) r += '/';
        return r;
      } catch {
        return null;
      }
    };

    const staticRootURL = toUrlRoot(staticConfig.root);

    // Derive default staticPaths from staticRootURL when not explicitly provided
    if (staticRootURL) {
      staticPaths = {
        tokens: `${staticRootURL}styles/pds-tokens.css.js`,
        primitives: `${staticRootURL}styles/pds-primitives.css.js`,
        components: `${staticRootURL}styles/pds-components.css.js`,
        utilities: `${staticRootURL}styles/pds-utilities.css.js`,
        styles: `${staticRootURL}styles/pds-styles.css.js`,
        ...staticPaths,
      };
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
          const others = (document.adoptedStyleSheets || []).filter((s) => s._pds !== true);
          document.adoptedStyleSheets = [...others, stylesSheet];
        }
      } catch (e) {
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
      console.error(
        "❌ Failed to initialize AutoDefiner/Enhancers (static):",
        error
      );
    }

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
      console.warn("Failed to update styles for new theme:", error);
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
 *   import { PDS } from '@pure-ds/core';
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
    const tempConfig = { ...config, theme: resolvedTheme };
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
    console.warn("PDS preload failed:", error);
  }
}

/** Preload minimal CSS to prevent flash of unstyled content */
PDS.preloadCritical = preloadCritical;

Object.freeze(PDS);

export { PDS, validateDesign };
