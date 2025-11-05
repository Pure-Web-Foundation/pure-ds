// Explicitly import from Lit
import { nothing, LitElement, html as litHtml, css as litCss, svg, render } from "lit";


// Re-export while preserving type hints
/** @type {typeof import("./lit").html} */
export const html = litHtml;

/** @type {typeof import("./lit").css} */
export const css = litCss;

export { LitElement, nothing, svg, render };

export * from "lit/directives/repeat.js";
export * from "lit/directives/keyed.js";
export * from 'lit/directives/class-map.js';

export { ref, createRef } from "lit/directives/ref.js";
export { ifDefined } from "lit/directives/if-defined.js";
//export { str } from "@lit/localize";
export { until } from "lit/directives/until.js";
export { unsafeHTML } from "lit/directives/unsafe-html.js";

export { unsafeSVG } from 'lit/directives/unsafe-svg.js';

export { msg } from "./common/msg.js";

/**
 * Loads the strings from a given (5-letter-code) locale
 * @param {String} locale
 */
export async function loadLocale(locale) {
  try {
    window.__strings = await fetch(`/assets/locales/${locale}.json`).then((r) => r.json());
  } catch {
    window.__strings = {};
  }
}

export { html as staticHtml, unsafeStatic } from 'lit/static-html.js';