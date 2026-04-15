import { PDS, html, State } from "#pds";

/**
 * <pds-render> - Pure Design System sandboxed renderer
 *
 * A first-class PDS web component that embeds an isolated iframe with full PDS
 * support: tokens, components, enhancements, theme switching, and preset switching.
 *
 * Attributes (observed, reactive):
 *   theme        - "light" | "dark" | "system"  (default: "light")
 *   preset       - any PDS preset ID            (default: "default")
 *   height       - CSS length for iframe height (default: "200px")
 *   src-base     - base URL for PDS assets      (default: auto-detected)
 *   padding      - body padding inside iframe   (default: "1rem")
 *   background   - override body background     (default: "")
 *   viewport     - "mobile" (375 px) | "tablet" (768 px) | "desktop" (window width)
 *                  sets the virtual viewport width for auto-zoom              (default: "desktop")
 *   locale       - BCP-47 language tag set on <html lang>                    (default: "en")
 *   expanded     - forces fullscreen preview mode when present
 *
 * Properties (live-update without full reload):
 *   html         - HTML string to render in the iframe body
 *   css          - CSS string injected as <style> in the iframe
 *   js           - JS module string executed after PDS is ready
 *                  JS changes force a full iframe reload
 *   expanded     - reflected fullscreen state
 *
 * Slots:
 *   expand-icon   - overrides the default expand icon
 *   collapse-icon - overrides the default collapse icon
 *
 * CSS Parts:
 *   frame, iframe, overlay, toolbar, expand-button, collapse-button,
 *   expand-icon, collapse-icon
 *
 * Events:
 *   pds-render-ready  - fired when the iframe is initialized and PDS is running
 *   pds-render-error  - fired if the iframe script throws; detail.error = error object
 *
 * Methods:
 *   setContent(content, options?) - batch updates html/css/js via a single public contract
 *   update(content, options?)     - alias of setContent for API ergonomics
 *   reload()          - force full srcdoc rebuild
 */

/**
 * @typedef {object} PdsRenderContent
 * @property {string} [html] HTML string rendered in the iframe body.
 * @property {string} [css] CSS text injected into the iframe user stylesheet.
 * @property {string} [js] JavaScript module source evaluated in the iframe runtime.
 */

/**
 * @typedef {object} PdsRenderSetContentOptions
 * @property {boolean} [reload=false] Force full iframe rebuild after applying content.
 */

const LAYERS = ["primitives", "components", "utilities"];

const COMPONENT_CSS = /*css*/ `
  @layer pds-render {
    :host {
      display: block;
      position: relative;
      overflow: hidden;
      border-radius: var(--radius-md, 0.375rem);
      background: var(--pds-render-surface, var(--color-surface-base, Canvas));
    }

    :host([bordered]) {
      border: var(--border-width-thin, 1px) solid var(--pds-render-border-color, var(--color-border, currentColor));
    }

    :host([expanded]) {
      position: fixed !important;
      inset: 0 !important;
      inline-size: 100vw !important;
      block-size: 100vh !important;
      z-index: var(--z-modal, 9999);
      border-radius: 0 !important;
      overflow: hidden;
    }

    .zoom-wrapper {
      position: relative;
      transform-origin: top left;
    }

    iframe {
      display: block;
      border: none;
      background: var(--pds-render-frame-background, transparent);
    }

    .overlay {
      display: flex;
      position: absolute;
      inset: 0;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transform: none;
      isolation: isolate;
      transition:
        opacity var(--transition-fast, 0.22s) ease,
        background var(--transition-fast, 0.22s) ease;
      background: color-mix(in oklab, var(--color-scrim, CanvasText) 0%, transparent);
      z-index: 1;
    }

    :host([resizable]) .overlay {
      pointer-events: auto;
    }

    :host([resizable]:hover) .overlay {
      opacity: 1;
      background: color-mix(in oklab, var(--color-scrim, CanvasText) 42%, transparent);
    }

    :host([expanded]) .overlay {
      display: none;
    }

    .toolbar {
      transform: none;
      isolation: isolate;
      display: none;
      position: absolute;
      inset-block-start: var(--spacing-5, 1.25rem);
      inset-inline-end: var(--spacing-5, 1.25rem);
      opacity: 0.2;
      transition: opacity var(--transition-fast, 0.22s) ease;
      z-index: 2;
      pointer-events: none;
    }

    :host([expanded]) .toolbar {
      display: flex;
      pointer-events: auto;
    }

    :host([expanded]) .toolbar:hover {
      opacity: 0.9;
    }

    .control-button {
      appearance: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      border: 0;
      background: none;
      color: var(--pds-render-control-color, var(--color-static-white, #fff));
      cursor: pointer;
    }

    .control-button:focus-visible {
      outline: var(--focus-outline, 2px solid currentColor);
      outline-offset: var(--spacing-1, 0.25rem);
    }

    .overlay-btn {
      filter: drop-shadow(0 0 1rem color-mix(in oklab, black 85%, transparent));
      transform: scale(5);
      transform-origin: center;
    }

    .toolbar-btn {
      filter:
        drop-shadow(0 0 0.5rem color-mix(in oklab, black 100%, transparent))
        drop-shadow(0 0 1rem color-mix(in oklab, black 90%, transparent))
        drop-shadow(0 0 2rem color-mix(in oklab, black 80%, transparent));
    }

    .icon-wrap {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      inline-size: 100%;
      block-size: 100%;
    }

    .overlay-btn .icon-wrap {
      inline-size: 1rem;
      block-size: 1rem;
    }

    .toolbar-btn .icon-wrap {
      inline-size: 5rem;
      block-size: 5rem;
    }

    slot[name="expand-icon"],
    slot[name="collapse-icon"] {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      inline-size: 100%;
      block-size: 100%;
    }

    ::slotted([slot="expand-icon"]),
    ::slotted([slot="collapse-icon"]) {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      inline-size: 100%;
      block-size: 100%;
      color: currentColor;
    }

    svg {
      display: block;
      inline-size: 100%;
      block-size: 100%;
      fill: currentColor;
    }

    [hidden] {
      display: none !important;
    }
  }
`;

class PdsRender extends HTMLElement {
  static #componentSheet;

  static get observedAttributes() {
    return [
      "theme",
      "preset",
      "height",
      "aspect-ratio",
      "src-base",
      "padding",
      "background",
      "zoom",
      "viewport",
      "locale",
      "resizable",
      "expanded",
    ];
  }

  constructor() {
    super();
    this._html = "";
    this._css = "";
    this._js = "";
    this._ready = false;
    this._iframeReady = false;
    this._pendingMessages = [];
    this._bodyOverflow = null;
    this._adoptPromise = null;

    this._state = new State({ expanded: this.hasAttribute("expanded") }, this);
    this._state.on("change:expanded", () => {
      this._applyExpandedState(Boolean(this._state.expanded));
    });

    this._messageHandler = (e) => {
      if (e.source !== this._iframe?.contentWindow) return;
      const { type, detail } = e.data || {};
      if (type === "pds-render:ready") {
        this._iframeReady = true;
        for (const msg of this._pendingMessages) this._send(msg);
        this._pendingMessages = [];
        this.dispatchEvent(new CustomEvent("pds-render-ready", { bubbles: true, composed: true }));
      }
      if (type === "pds-render:error") {
        this.dispatchEvent(
          new CustomEvent("pds-render-error", {
            bubbles: true,
            composed: true,
            detail: { error: detail },
          }),
        );
      }
    };

    this._escHandler = (e) => {
      if (e.key === "Escape" && this.expanded) this._toggleExpanded(false);
    };

    this._root = this.attachShadow({ mode: "open" });
    this._renderShadow();
    this._cacheShadowRefs();
    this._syncExpandedControls();
    this._adoptStyles().catch((error) => {
      console.warn("[pds-render] adoptLayers failed", error);
    });
  }

  connectedCallback() {
    this._ready = true;

    for (const [pub, priv] of [["html", "_html"], ["css", "_css"], ["js", "_js"]]) {
      if (Object.prototype.hasOwnProperty.call(this, pub)) {
        const val = this[pub];
        delete this[pub];
        this[priv] = String(val || "");
      }
    }

    window.addEventListener("message", this._messageHandler);
    window.addEventListener("keydown", this._escHandler);

    this._resizeObserver = new ResizeObserver(() => {
      if (this.getAttribute("zoom") === null) this._applyZoom();
    });
    this._resizeObserver.observe(this);

    this._applyExpandedState(this.expanded, { syncAttribute: false });
    this._buildSrcdoc();
  }

  disconnectedCallback() {
    window.removeEventListener("message", this._messageHandler);
    window.removeEventListener("keydown", this._escHandler);
    this._resizeObserver?.disconnect();
    this._setBodyScrollLocked(false);
    this._ready = false;
    this._iframeReady = false;
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === "expanded") {
      const expanded = newVal !== null;
      if (this._state.expanded !== expanded) {
        this._state.expanded = expanded;
      }
      return;
    }

    if (!this._ready || oldVal === newVal) return;
    if (name === "resizable") return;
    if (name === "height" || name === "aspect-ratio" || name === "zoom" || name === "viewport") {
      this._applyZoom();
      return;
    }
    if (name === "theme" && this._iframeReady) {
      this._post({ type: "pds-render:set-theme", value: newVal || "light" });
      return;
    }
    if (name === "preset" && this._iframeReady) {
      this._post({ type: "pds-render:set-preset", value: newVal || "default" });
      return;
    }
    if (name === "locale") {
      if (this._iframeReady) {
        this._post({ type: "pds-render:set-locale", value: newVal || "en" });
      } else {
        this._buildSrcdoc();
      }
      return;
    }
    this._buildSrcdoc();
  }

  get html() {
    return this._html;
  }

  set html(value) {
    this.setContent({ html: value });
  }

  get css() {
    return this._css;
  }

  set css(value) {
    this.setContent({ css: value });
  }

  get js() {
    return this._js;
  }

  set js(value) {
    this.setContent({ js: value }, { reload: true });
  }

  /**
   * Batch update iframe content using the public component contract.
   * Prefer this method when applying multiple fields at once.
   *
   * @param {PdsRenderContent} content Content payload with any combination of html/css/js.
   * @param {PdsRenderSetContentOptions} [options] Content update options.
   */
  setContent(content = {}, options = {}) {
    const next = content && typeof content === "object" ? content : {};
    const { reload = false } = options || {};

    const hasHtml = Object.prototype.hasOwnProperty.call(next, "html");
    const hasCss = Object.prototype.hasOwnProperty.call(next, "css");
    const hasJs = Object.prototype.hasOwnProperty.call(next, "js");

    const nextHtml = hasHtml ? String(next.html || "") : this._html;
    const nextCss = hasCss ? String(next.css || "") : this._css;
    const nextJs = hasJs ? String(next.js || "") : this._js;

    const htmlChanged = hasHtml && nextHtml !== this._html;
    const cssChanged = hasCss && nextCss !== this._css;
    const jsChanged = hasJs && nextJs !== this._js;

    if (hasHtml) this._html = nextHtml;
    if (hasCss) this._css = nextCss;
    if (hasJs) this._js = nextJs;

    if (!this._ready || !(htmlChanged || cssChanged || jsChanged || reload)) return;

    if (reload || jsChanged) {
      this.reload();
      return;
    }

    if (this._iframeReady) {
      if (htmlChanged) this._post({ type: "pds-render:set-html", value: this._html });
      if (cssChanged) this._post({ type: "pds-render:set-css", value: this._css });
      return;
    }

    this._buildSrcdoc();
  }

  /**
   * Alias for setContent to support fluent consumer APIs.
   *
   * @param {PdsRenderContent} content Content payload with any combination of html/css/js.
   * @param {PdsRenderSetContentOptions} [options] Content update options.
   */
  update(content = {}, options = {}) {
    this.setContent(content, options);
  }

  get expanded() {
    return Boolean(this._state.expanded);
  }

  set expanded(value) {
    this.toggleAttribute("expanded", Boolean(value));
  }

  reload() {
    this._iframeReady = false;
    this._pendingMessages = [];
    this._buildSrcdoc();
  }

  _renderShadow() {
    const expanded = this.expanded;
    this._root.replaceChildren(
      html`
        <div class="zoom-wrapper" part="frame">
          <iframe title="PDS Render" part="iframe"></iframe>
        </div>
        <div class="overlay" part="overlay" aria-hidden="${expanded ? "true" : "false"}">
          <button
            type="button"
            class="control-button overlay-btn"
            part="expand-button"
            aria-label="Expand preview"
            ?hidden=${expanded}
            @click=${(e) => {
              e.stopPropagation();
              this._toggleExpanded(true);
            }}
          >
            <span class="icon-wrap" part="expand-icon">
              <slot name="expand-icon">
                <svg viewBox="0 0 256 256" aria-hidden="true">
                  <path d="M216,48V88a8,8,0,0,1-16,0V56H168a8,8,0,0,1,0-16h40A8,8,0,0,1,216,48ZM88,200H56V168a8,8,0,0,0-16,0v40a8,8,0,0,0,8,8H88a8,8,0,0,0,0-16Zm120-40a8,8,0,0,0-8,8v32H168a8,8,0,0,0,0,16h40a8,8,0,0,0,8-8V168A8,8,0,0,0,208,160ZM88,40H48a8,8,0,0,0-8,8V88a8,8,0,0,0,16,0V56H88a8,8,0,0,0,0-16Z"></path>
                </svg>
              </slot>
            </span>
          </button>
        </div>
        <div class="toolbar" part="toolbar" aria-hidden="${expanded ? "false" : "true"}">
          <button
            type="button"
            class="control-button toolbar-btn"
            part="collapse-button"
            aria-label="Exit fullscreen preview"
            ?hidden=${!expanded}
            @click=${(e) => {
              e.stopPropagation();
              this._toggleExpanded(false);
            }}
          >
            <span class="icon-wrap" part="collapse-icon">
              <slot name="collapse-icon">
                <svg viewBox="0 0 256 256" aria-hidden="true">
                  <path d="M152,96V48a8,8,0,0,1,16,0V88h40a8,8,0,0,1,0,16H160A8,8,0,0,1,152,96ZM96,152H48a8,8,0,0,0,0,16H88v40a8,8,0,0,0,16,0V160A8,8,0,0,0,96,152Zm112,0H160a8,8,0,0,0-8,8v48a8,8,0,0,0,16,0V168h40a8,8,0,0,0,0-16ZM96,40a8,8,0,0,0-8,8V88H48a8,8,0,0,0,0,16H96a8,8,0,0,0,8-8V48A8,8,0,0,0,96,40Z"></path>
                </svg>
              </slot>
            </span>
          </button>
        </div>
      `,
    );
  }

  _cacheShadowRefs() {
    this._zoomWrapper = this._root.querySelector(".zoom-wrapper");
    this._iframe = this._root.querySelector("iframe");
    this._overlay = this._root.querySelector(".overlay");
    this._toolbar = this._root.querySelector(".toolbar");
    this._overlayBtn = this._root.querySelector(".overlay-btn");
    this._toolbarBtn = this._root.querySelector(".toolbar-btn");
  }

  async _adoptStyles() {
    if (this._adoptPromise) return this._adoptPromise;
    if (!PdsRender.#componentSheet) {
      PdsRender.#componentSheet = PDS.createStylesheet(COMPONENT_CSS);
    }
    this._adoptPromise = PDS.adoptLayers(this._root, LAYERS, [PdsRender.#componentSheet]);
    return this._adoptPromise;
  }

  _applyExpandedState(expanded, options = {}) {
    const { syncAttribute = true } = options;

    if (syncAttribute) {
      this.toggleAttribute("expanded", expanded);
    }

    this._syncExpandedControls();

    if (!this.isConnected) return;

    this._setBodyScrollLocked(expanded);

    if (this._ready) {
      this._applyZoom();
    }
  }

  _syncExpandedControls() {
    const expanded = this.expanded;
    this._overlay?.setAttribute("aria-hidden", String(expanded));
    this._toolbar?.setAttribute("aria-hidden", String(!expanded));
    if (this._overlayBtn) this._overlayBtn.hidden = expanded;
    if (this._toolbarBtn) this._toolbarBtn.hidden = !expanded;
  }

  _setBodyScrollLocked(locked) {
    if (locked) {
      if (this._bodyOverflow === null) {
        this._bodyOverflow = document.body.style.overflow;
      }
      document.body.style.overflow = "hidden";
      return;
    }

    if (this._bodyOverflow !== null) {
      document.body.style.overflow = this._bodyOverflow;
      this._bodyOverflow = null;
    }
  }

  _effectiveZoom() {
    const attr = this.getAttribute("zoom");
    if (attr !== null) return Math.max(0.05, Math.min(1, parseFloat(attr) || 1));
    const viewport = this.getAttribute("viewport") || "desktop";
    const refWidth = viewport === "mobile"
      ? 375
      : viewport === "tablet"
        ? 768
        : (window.innerWidth || 1280);
    const width = this.offsetWidth;
    if (!width) return 1;
    return Math.min(1, width / refWidth);
  }

  _applyZoom() {
    if (!this._zoomWrapper || !this._iframe) return;

    if (this.expanded) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this._zoomWrapper.style.transform = "";
      this._zoomWrapper.style.width = `${width}px`;
      this._zoomWrapper.style.height = `${height}px`;
      this._iframe.style.width = `${width}px`;
      this._iframe.style.height = `${height}px`;
      this.style.height = "";
      return;
    }

    const zoom = this._effectiveZoom();
    const hostWidth = this.offsetWidth || 300;

    const arAttr = this.getAttribute("aspect-ratio");
    let displayHeight;
    if (arAttr) {
      const [aspectWidth, aspectHeight] = arAttr.split("/").map(Number);
      displayHeight = Math.round(hostWidth * ((aspectHeight || 1) / (aspectWidth || 1)));
      this.style.height = `${displayHeight}px`;
    } else {
      displayHeight = parseFloat(this.getAttribute("height")) || 200;
      this.style.height = `${displayHeight}px`;
    }

    const iframeWidth = Math.round(hostWidth / zoom);
    const iframeHeight = Math.round(displayHeight / zoom);

    this._zoomWrapper.style.transform = zoom < 1 ? `scale(${zoom})` : "";
    this._zoomWrapper.style.width = `${iframeWidth}px`;
    this._zoomWrapper.style.height = `${iframeHeight}px`;
    this._iframe.style.width = `${iframeWidth}px`;
    this._iframe.style.height = `${iframeHeight}px`;
  }

  _toggleExpanded(force) {
    const expanded = typeof force === "boolean" ? force : !this.expanded;

    const doToggle = () => {
      this._state.expanded = expanded;
    };

    if (!document.startViewTransition) {
      doToggle();
      return;
    }

    if (!document.getElementById("__pds-render-vt-style")) {
      const style = document.createElement("style");
      style.id = "__pds-render-vt-style";
      style.textContent = [
        "::view-transition-group(pds-render-expand){animation-duration:0.4s;animation-timing-function:cubic-bezier(0.4,0,0.2,1)}",
        "::view-transition-old(pds-render-expand){animation:none;mix-blend-mode:normal}",
        "::view-transition-new(pds-render-expand){animation:none;mix-blend-mode:normal}",
      ].join("\n");
      document.head.appendChild(style);
    }

    this.style.viewTransitionName = "pds-render-expand";
    const transition = document.startViewTransition(doToggle);
    transition.finished.finally(() => {
      this.style.viewTransitionName = "";
    });
  }

  _resolveSrcBase() {
    const attr = this.getAttribute("src-base");
    if (attr) return attr.endsWith("/") ? attr : `${attr}/`;
    const scripts = document.querySelectorAll("script[src]");
    for (const script of scripts) {
      if (script.src.includes("/components/pds-render")) {
        return script.src.replace(/\/components\/pds-render\.js.*$/, "/");
      }
    }
    return `${window.location.origin}/assets/pds/`;
  }

  _buildSrcdoc() {
    if (!this._ready || !this._iframe) return;
    this._iframeReady = false;
    this._pendingMessages = [];

    const theme = this.getAttribute("theme") || "light";
    const preset = this.getAttribute("preset") || "default";
    const padding = this.getAttribute("padding") || "1rem";
    const background = this.getAttribute("background") || "";
    const lang = this.getAttribute("locale") || "en";
    const base = this._resolveSrcBase();

    this._applyZoom();

    const cssUrl = `${base}styles/pds-styles.css`;
    const coreUrl = `${base}core.js`;
    const litUrl = `${base}external/lit.js`;

    const presetInit = preset && preset !== "default"
      ? `try { await PDS.applyLivePreset(${JSON.stringify(preset)}, { persist: false }); } catch(e) { notify('error', e); }`
      : "";

    const userJs = this._js
      ? `try {\n${this._js}\n} catch(e) { notify('error', e); }`
      : "";

    const srcdoc = `<!DOCTYPE html>
<html lang="${lang}" data-theme="${theme}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="${cssUrl}">
<script type="importmap">
{"imports":{"#pds":"${coreUrl}","#pds/lit":"${litUrl}"}}
</script>
<style>
*,*::before,*::after{box-sizing:border-box}
html,body{margin:0;padding:0}
body{padding:${padding};${background ? `background:${background};` : ""}min-height:100vh}
</style>
<style id="__user-css">${this._css}</style>
</head>
<body>${this._html}
<script type="module">
import { PDS } from '#pds';

const __pdsBase = ${JSON.stringify(base)};

function notify(type, detail) {
  window.parent.postMessage({ type: 'pds-render:' + type, detail: detail ? String(detail) : null }, '*');
}

try {
  await PDS.start({ mode: 'live', preset: 'default' });
} catch(e) {}

${presetInit}

${userJs}

window.addEventListener('message', async (e) => {
  if (!e.data || typeof e.data !== 'object') return;
  const { type, value } = e.data;

  if (type === 'pds-render:set-html') {
    document.body.innerHTML = value;
  }
  if (type === 'pds-render:set-css') {
    const style = document.getElementById('__user-css');
    if (style) style.textContent = value;
  }
  if (type === 'pds-render:set-theme') {
    document.documentElement.setAttribute('data-theme', value);
    try { PDS.theme = value; } catch {}
  }
  if (type === 'pds-render:set-preset') {
    try { await PDS.applyLivePreset(value, { persist: false }); } catch(e) { notify('error', e); }
  }
  if (type === 'pds-render:set-locale') {
    document.documentElement.setAttribute('lang', value);
  }
});

notify('ready', null);
</script>
</body>
</html>`;

    this._iframe.srcdoc = srcdoc;
  }

  _post(msg) {
    if (this._iframeReady) {
      this._send(msg);
    } else {
      this._pendingMessages.push(msg);
    }
  }

  _send(msg) {
    try {
      this._iframe.contentWindow?.postMessage(msg, "*");
    } catch {}
  }
}

if (!customElements.get("pds-render")) {
  customElements.define("pds-render", PdsRender);
}