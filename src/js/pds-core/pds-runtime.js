/**
 * Runtime helpers for applying and adopting PDS styles in live and static modes.
 * These functions are intentionally separated from the Generator to keep the
 * generator bundle lean and optional.
 */
import { registry as pdsRegistry } from "./pds-registry.js";

/**
 * Install runtime styles for PDS using constructable stylesheets when
 * available, otherwise update a single <style id="pds-runtime-stylesheet">.
 * This approach reduces flicker and avoids link/blob swapping.
 */
export function installRuntimeStyles(cssText) {
  try {
    if (typeof document === "undefined") return; // server-side guard

    // Preferred: constructable stylesheet (fast, atomic)
    if (
      typeof CSSStyleSheet !== "undefined" &&
      "adoptedStyleSheets" in Document.prototype
    ) {
      const sheet = new CSSStyleSheet();
      // replaceSync is synchronous and atomic for the stylesheet
      sheet.replaceSync(cssText);

      // Tag it so we can keep existing non-PDS sheets
      sheet._pds = true;

      const others = (document.adoptedStyleSheets || []).filter(
        (s) => s._pds !== true
      );
      document.adoptedStyleSheets = [...others, sheet];
      return;
    }

    // Fallback: single <style> element in the document head
    const styleId = "pds-runtime-stylesheet";
    let el = document.getElementById(styleId);
    if (!el) {
      el = document.createElement("style");
      el.id = styleId;
      el.type = "text/css";
      const head = document.head || document.getElementsByTagName("head")[0];
      if (head) head.appendChild(el);
      else document.documentElement.appendChild(el);
    }

    // Update the stylesheet content in place
    el.textContent = cssText;
  } catch (err) {
    console.warn("installRuntimeStyles failed:", err);
  }
}

/**
 * Apply generated styles to the current document.
 * @param {Generator} [generator] - Optional Generator instance (defaults to singleton)
 */
export function applyStyles(generator) {
  const target = generator;

  if (!target || typeof target !== "object") {
    console.error(
      "[Runtime] applyStyles requires an explicit generator instance in live mode"
    );
    return;
  }

  // Preferred: apply layered CSS so tokens + primitives + components + utilities
  // are available in light DOM (ensures primitives like :where(button):active apply)
  const cssText = target.layeredCSS || target.css || "";
  if (!cssText) {
    target.options?.log?.(
      "warn",
      "[Runtime] No CSS available on generator to apply"
    );
    return;
  }

  // Install/update runtime styles atomically to avoid flicker
  installRuntimeStyles(cssText);
}

// ============================================================================
// PDS ADOPTER - Helper for web components
// ============================================================================

/**
 * Adopt primitives stylesheet into a shadow root.
 * This is the primary method components should use.
 *
 * @param {ShadowRoot} shadowRoot - The shadow root to adopt into
 * @param {CSSStyleSheet[]} additionalSheets - Additional component-specific stylesheets
 * @returns {Promise<void>}
 */
export async function adoptPrimitives(
  shadowRoot,
  additionalSheets = [],
  generator = null
) {
  try {
    // Prefer live generator when provided
    const primitives = generator?.primitivesStylesheet
      ? generator.primitivesStylesheet
      : await pdsRegistry.getStylesheet("primitives");

    // Adopt primitives + additional sheets
    shadowRoot.adoptedStyleSheets = [primitives, ...additionalSheets];
  } catch (error) {
    const componentName = shadowRoot.host?.tagName?.toLowerCase() || "unknown";
    console.error(
      `[PDS Adopter] <${componentName}> failed to adopt primitives:`,
      error
    );
    // Continue with just additional sheets as fallback
    shadowRoot.adoptedStyleSheets = additionalSheets;
  }
}

/**
 * Adopt multiple layers into a shadow root.
 * For complex components that need more than just primitives.
 *
 * @param {ShadowRoot} shadowRoot - The shadow root to adopt into
 * @param {string[]} layers - Array of layer names to adopt (e.g., ['tokens', 'primitives', 'components'])
 * @param {CSSStyleSheet[]} additionalSheets - Additional component-specific stylesheets
 * @returns {Promise<void>}
 */
export async function adoptLayers(
  shadowRoot,
  layers = ["primitives"],
  additionalSheets = [],
  generator = null
) {
  const safeAdditionalSheets = Array.isArray(additionalSheets)
    ? additionalSheets.filter(Boolean)
    : [];

  // Apply component-local sheets immediately so lazy-loaded components avoid
  // transient UA default styling while shared layers are resolving.
  if (safeAdditionalSheets.length) {
    const existing = Array.isArray(shadowRoot.adoptedStyleSheets)
      ? shadowRoot.adoptedStyleSheets
      : [];
    const nonAdditional = existing.filter(
      (sheet) => !safeAdditionalSheets.includes(sheet)
    );
    shadowRoot.adoptedStyleSheets = [...nonAdditional, ...safeAdditionalSheets];
  }

  try {
    // Get all requested stylesheets
    const stylesheets = await Promise.all(
      layers.map(async (layer) => {
        if (generator) {
          switch (layer) {
            case "tokens":
              return generator.tokensStylesheet;
            case "primitives":
              return generator.primitivesStylesheet;
            case "components":
              return generator.componentsStylesheet;
            case "utilities":
              return generator.utilitiesStylesheet;
            default:
              break;
          }
        }
        return pdsRegistry.getStylesheet(layer);
      })
    );

    // Filter out any null results
    const validStylesheets = stylesheets.filter((sheet) => sheet !== null);

    // Adopt all layers + additional sheets
    shadowRoot.adoptedStyleSheets = [...validStylesheets, ...safeAdditionalSheets];
  } catch (error) {
    const componentName = shadowRoot.host?.tagName?.toLowerCase() || "unknown";
    console.error(
      `[PDS Adopter] <${componentName}> failed to adopt layers:`,
      error
    );
    // Continue with just additional sheets as fallback
    shadowRoot.adoptedStyleSheets = safeAdditionalSheets;
  }
}

/**
 * Create a component-specific stylesheet from CSS string.
 * Helper to create constructable stylesheets.
 *
 * @param {string} css - CSS string
 * @returns {CSSStyleSheet}
 */
export function createStylesheet(css) {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(css);
  return sheet;
}
