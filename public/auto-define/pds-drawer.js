import { LitElement, html, css, ifDefined } from "/assets/js/lit.js";
import { render } from "/assets/js/lit.js";

export class DrawerPanel extends LitElement {
  #isDragging = false;
  #startX = 0;
  #startY = 0;
  #lastX = 0;
  #lastY = 0;
  #lastTS = 0;
  #velocity = 0; // px/ms along active axis
  #startFraction = 0;
  #aside = null;
  #drawerHeight = 0;
  #drawerWidth = 0;
  #raf = 0;
  #currentFraction = 0; // 0=open, 1=closed
  #resizeObs = null;

  static properties = {
    open: { type: Boolean, reflect: true },
    position: { type: String, reflect: true },
    drag: { type: String, reflect: true },
    maxHeight: { type: String, attribute: "max-height" },
    minHeight: { type: String, attribute: "min-height" },
    showClose: { type: Boolean, attribute: "show-close", reflect: true },
  };

  static styles = css`
    :host {
      position: fixed;
      inset: 0;
      display: contents;
      --_max-h: var(--drawer-max-height, 70vh);
      --_min-h: var(--drawer-min-height, auto);
      --_easing: var(--drawer-easing, cubic-bezier(0.25, 1, 0.5, 1));
      --_dur: var(--drawer-duration, 280ms);
      --_handle-w: var(--drawer-handle-width, 36px);
      --_handle-h: var(--drawer-handle-height, 4px);
      --_handle-r: var(--drawer-handle-radius, 999px);
      --_handle-bg: var(
        --drawer-handle-bg,
        color-mix(in oklab, CanvasText 20%, Canvas 80%)
      );
      --_panel-radius: var(--drawer-radius, 16px);
      --_shadow: var(--drawer-shadow, 0 10px 40px rgba(0, 0, 0, 0.25));
      --_panel-bg: var(--drawer-bg, var(--color-surface-overlay, Canvas));
      --_header-min-hit: 40px;
      --_backdrop-z: var(
        --z-modal,
        1040
      ); /* Use AutoDesigner z-index for modal */
      --_drawer-z: var(
        --z-drawer,
        1050
      ); /* Use AutoDesigner z-index for drawer */
      contain: layout style size;
    }
    .backdrop {
      position: fixed;
      inset: 0;
      background: var(--backdrop-bg);
      backdrop-filter: var(--backdrop-filter);
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--_dur) var(--_easing);
      z-index: var(--_backdrop-z);
    }
    :host([open]) .backdrop {
      opacity: var(--backdrop-opacity, 1);
      pointer-events: auto;
    }
    .layer {
      position: fixed;
      left: 50%;
      width: min(100vw, 100%);
      max-width: 100%;
      translate: -50% 0;
      contain: layout paint style;
      will-change: transform;
      transform: translateY(var(--_y, 100%));
      z-index: var(--_drawer-z);
    }
    :host([position="bottom"]) .layer {
      bottom: 0;
    }
    :host([position="top"]) .layer {
      top: 0;
    }
    /* Left/Right positioning and sizing */
    :host([position="left"]) .layer,
    :host([position="right"]) .layer {
      top: 0;
      bottom: 0;
      translate: none;
      width: var(--drawer-width, min(90vw, 420px));
      max-width: var(--drawer-width, min(90vw, 420px));
    }
    :host([position="left"]) .layer { left: 0; right: auto; }
    :host([position="right"]) .layer { right: 0; left: auto; }

    aside {
      display: grid;
      grid-template-rows: auto minmax(0, 1fr);
      background: var(--_panel-bg);
      box-shadow: var(--_shadow);
      max-height: var(--_max-h);
      min-height: var(--_min-h);
      width: 100%;
      max-width: 100%;
      border-top-left-radius: var(--_panel-radius);
      border-top-right-radius: var(--_panel-radius);
      overflow: clip;
      contain: layout paint style;
      will-change: transform;
      touch-action: none; /* prevents native scroll during pointer drag */
    }
    :host([position="top"]) aside {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border-bottom-left-radius: var(--_panel-radius);
      border-bottom-right-radius: var(--_panel-radius);
    }
    :host([position="left"]) aside {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-top-right-radius: var(--_panel-radius);
      border-bottom-right-radius: var(--_panel-radius);
      max-height: 100vh;
      height: 100%;
      width: 100%;
    }
    :host([position="right"]) aside {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-top-left-radius: var(--_panel-radius);
      border-bottom-left-radius: var(--_panel-radius);
      max-height: 100vh;
      height: 100%;
      width: 100%;
    }
    header {
      position: relative;
      min-block-size: var(--_header-min-hit);
      display: grid;
      align-items: center;
      justify-items: center;
    }
    .grab-handle {
      inline-size: var(--_handle-w);
      block-size: var(--_handle-h);
      border-radius: var(--_handle-r);
      background: var(--_handle-bg);
      opacity: 0.9;
      pointer-events: none;
      user-select: none;
    }
    /* Hide grab handle on side drawers to avoid odd appearance */
    :host([position="left"]) .grab-handle,
    :host([position="right"]) .grab-handle {
      display: none;
    }
    /* Close button styles */
    .close-btn {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      border: none;
      background: transparent;
      color: inherit;
      cursor: pointer;
    }
    .close-btn:hover { opacity: 0.85; }
    .close-btn:focus { outline: var(--focus-outline, none); }
    ::slotted([slot="drawer-header"]) {
      inline-size: 100%;
      display: block;
      min-block-size: var(--_header-min-hit);
    }
    main {
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      contain: layout paint style;
      transition: height var(--_dur) var(--_easing);
    }
    :host([open]) .layer {
      transform: translateY(0);
    }
    :host(:not([open])) .layer {
      transform: translateY(100%);
    }
    /* Orientation-specific open/closed transforms for sides */
    :host([position="left"][open]) .layer,
    :host([position="right"][open]) .layer {
      transform: translateX(0);
    }
    :host([position="left"]:not([open])) .layer {
      transform: translateX(-100%);
    }
    :host([position="right"]:not([open])) .layer {
      transform: translateX(100%);
    }
    :host aside {
      outline: none;
    }

    @media (min-width: 800px) {
      aside {
        width: 100%;
        max-width: 800px;
        margin-inline: auto;
        border-radius: var(--_panel-radius);
        overflow: hidden;
      }
    }
  `;

  constructor() {
    super();
    this.open = false;
    this.position = "bottom";
    this.drag = "header";
    this.maxHeight = "";
    this.minHeight = "";
    this.showClose = false; // optional for bottom/top; sides default via render()
  }

  render() {
    return html`
      <div
        class="backdrop"
        @click=${this.#onBackdropClick}
        part="backdrop"
      ></div>
      <div class="layer" id="layer" aria-hidden=${!this.open}>
        <aside
          role=${ifDefined(this.open ? "dialog" : undefined)}
          aria-modal=${ifDefined(this.open ? "true" : undefined)}
          part="panel"
          tabindex="-1"
          style=${this.maxHeight || this.minHeight 
            ? `${this.maxHeight ? `--drawer-max-height:${this.maxHeight};` : ''}${this.minHeight ? `--drawer-min-height:${this.minHeight};` : ''}`
            : ""}
          @pointerdown=${this.drag !== "none" ? this.#onPointerDown : null}
        >
          <header part="header">
            <div
              class="grab-handle"
              part="grab-handle"
              aria-hidden="true"
            ></div>
            ${this.#shouldShowClose()
              ? html`<button class="close-btn" part="close-button" aria-label="Close drawer" @click=${this.closeDrawer}>
                  <svg-icon icon="x" size="sm"></svg-icon>
                </button>`
              : null}
            <slot name="drawer-header"></slot>
          </header>
          <main part="content">
            <slot name="drawer-content"></slot>
          </main>
        </aside>
      </div>
    `;
  }

  firstUpdated() {
    this.#aside = this.renderRoot.querySelector("aside");
    this.#applyFraction(this.open ? 0 : 1, false);

    // Pointer listeners
    window.addEventListener("pointermove", this.#onPointerMove, {
      passive: false,
    });
    window.addEventListener("pointerup", this.#onPointerUp, { passive: true });
    window.addEventListener("keydown", this.#onKeyDown);

    // Resize handling
    this.#resizeObs = new ResizeObserver(this.#recalc);
    this.#resizeObs.observe(this.#aside);
    window.addEventListener("resize", this.#recalc, { passive: true });
    if (window.visualViewport)
      window.visualViewport.addEventListener("resize", this.#recalc, {
        passive: true,
      });

    this.#recalc();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("pointermove", this.#onPointerMove);
    window.removeEventListener("pointerup", this.#onPointerUp);
    window.removeEventListener("keydown", this.#onKeyDown);
    if (window.visualViewport)
      window.visualViewport.removeEventListener("resize", this.#recalc);
    window.removeEventListener("resize", this.#recalc);
    this.#resizeObs?.disconnect();
    cancelAnimationFrame(this.#raf);
  }

  updated(changed) {
    if (changed.has("open")) {
      this.#animateTo(this.open ? 0 : 1);
      if (this.open) this.updateComplete.then(() => this.#aside?.focus());
      this.dispatchEvent(new Event("toggle"));
    }
    if (changed.has("maxHeight") && this.#aside) {
      this.#aside.style.setProperty(
        "--drawer-max-height",
        this.maxHeight || "70vh"
      );
      this.#recalc();
    }
    if (changed.has("minHeight") && this.#aside) {
      this.#aside.style.setProperty(
        "--drawer-min-height",
        this.minHeight || "auto"
      );
      this.#recalc();
    }
  }

  // Public API
  openDrawer() {
    this.open = true;
  }
  closeDrawer() {
    this.open = false;
  }
  toggleDrawer() {
    this.open = !this.open;
  }

  /**
   * Set drawer content using slots
   * @param {TemplateResult|HTMLElement|string} bodyContent - Content for drawer body (Lit template, HTML element, or string)
   * @param {TemplateResult|HTMLElement|string} headerContent - Optional content for drawer header
   */
  setContent(bodyContent, headerContent = null) {
    // Clear existing slotted content
    this.querySelectorAll('[slot="drawer-content"], [slot="drawer-header"]').forEach(el => el.remove());
    
    // Add new body content
    if (bodyContent) {
      const bodyWrapper = document.createElement('div');
      bodyWrapper.setAttribute('slot', 'drawer-content');
      bodyWrapper.className = 'surface-overlay';
      
      // Check if it's a Lit TemplateResult (has _$litType$ property)
      if (bodyContent._$litType$) {
        render(bodyContent, bodyWrapper);
      } else if (typeof bodyContent === 'string') {
        bodyWrapper.innerHTML = bodyContent;
      } else {
        bodyWrapper.appendChild(bodyContent);
      }
      this.appendChild(bodyWrapper);
    }
    
    // Add new header content
    if (headerContent) {
      const headerWrapper = document.createElement('div');
      headerWrapper.setAttribute('slot', 'drawer-header');
      headerWrapper.className = 'surface-overlay';
      
      // Check if it's a Lit TemplateResult
      if (headerContent._$litType$) {
        render(headerContent, headerWrapper);
      } else if (typeof headerContent === 'string') {
        headerWrapper.innerHTML = headerContent;
      } else {
        headerWrapper.appendChild(headerContent);
      }
      this.appendChild(headerWrapper);
    }
    
    // Recalculate height after content is rendered
    // Use double RAF to ensure slots are fully processed
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.#recalc();
      });
    });
  }

  /**
   * Clear drawer content (removes all slotted content)
   */
  clearContent() {
    this.querySelectorAll('[slot="drawer-content"], [slot="drawer-header"]').forEach(el => el.remove());
  }

  // Events
  #onBackdropClick = () => this.closeDrawer();

  #onKeyDown = (e) => {
    if (this.open && e.key === "Escape") this.closeDrawer();
  };

  #onPointerDown = (e) => {
    if (this.drag === "none") return;
    if (this.drag === "header") {
      const header = this.renderRoot.querySelector("header");
      const path = e.composedPath();
      if (!path.includes(header)) return;
    }
    const p = this.#getPoint(e);
    this.#isDragging = true;
    this.#startX = p.x;
    this.#startY = p.y;
    this.#lastX = p.x;
    this.#lastY = p.y;
    this.#lastTS = performance.now();
    this.#velocity = 0;
    this.#startFraction = this.#currentFraction;

    // Capture pointer so dragging continues outside the element
    if (e.target?.setPointerCapture && e.pointerId != null) {
      try {
        e.target.setPointerCapture(e.pointerId);
      } catch {}
    }

    cancelAnimationFrame(this.#raf);
    this.style.userSelect = "none";
    document.documentElement.style.cursor = "grabbing";
    this.renderRoot
      .querySelector("main")
      ?.style.setProperty("overflow", "hidden");
  };

  #onPointerMove = (e) => {
    if (!this.#isDragging) return;
    const p = this.#getPoint(e);
    const isVertical = this.position === "bottom" || this.position === "top";
    const dir = this.position === "bottom" || this.position === "right" ? 1 : -1;
    const deltaFromStart = isVertical ? (p.y - this.#startY) : (p.x - this.#startX);
    const extent = isVertical ? Math.max(1, this.#drawerHeight) : Math.max(1, this.#drawerWidth);
    const next = this.#clamp(this.#startFraction + (dir * deltaFromStart) / extent, 0, 1);
    this.#applyFraction(next, false);

    // Velocity (px/ms), positive when moving down in screen coords
    const now = performance.now();
    const dt = Math.max(1, now - this.#lastTS);
    const comp = isVertical ? p.y : p.x;
    const lastComp = isVertical ? this.#lastY : this.#lastX;
    this.#velocity = (comp - lastComp) / dt; // px/ms along active axis
    if (isVertical) this.#lastY = p.y; else this.#lastX = p.x;
    this.#lastTS = now;

    if (e.cancelable) e.preventDefault();
  };

  #onPointerUp = (e) => {
    if (!this.#isDragging) return;
    this.#isDragging = false;
    this.style.userSelect = "";
    document.documentElement.style.cursor = "";
    this.renderRoot.querySelector("main")?.style.removeProperty("overflow");

    const isVertical = this.position === "bottom" || this.position === "top";
    const dir = this.position === "bottom" || this.position === "right" ? 1 : -1;
    const throwCloseThreshold = (1.0 / 1000) * 1000; // keep var for clarity; we use 1.0 px/ms below

    // Decide based on velocity first (positive in closing direction), else position threshold
    const fastForward = this.#velocity * dir > 1.0; // closing direction
    const fastBackward = this.#velocity * dir < -1.0; // opening direction

    if (fastForward) {
      this.#animateTo(1); // close
    } else if (fastBackward) {
      this.#animateTo(0); // open
    } else {
      const shouldClose = this.#currentFraction >= 0.5;
      this.#animateTo(shouldClose ? 1 : 0);
    }

    // Release pointer capture
    if (e.target?.releasePointerCapture && e.pointerId != null) {
      try {
        e.target.releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  #recalc = () => {
    if (!this.#aside) return;
    const rect = this.#aside.getBoundingClientRect();
    this.#drawerHeight = rect.height || 0;
    this.#drawerWidth = rect.width || 0;
    this.#applyFraction(this.#currentFraction, false);
  };

  // Helpers
  #getPoint(e) {
    if (e.touches && e.touches[0])
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    return { x: e.clientX ?? 0, y: e.clientY ?? 0 };
  }
  #clamp(v, lo, hi) {
    return Math.min(hi, Math.max(lo, v));
  }

  #applyFraction(f, withTransition) {
    this.#currentFraction = this.#clamp(f, 0, 1);
    const t = withTransition ? `transform var(--_dur) var(--_easing)` : "none";
    const layer = this.renderRoot.getElementById("layer");
    if (!layer) return;
    layer.style.transition = t;
    if (this.position === "bottom" || this.position === "top") {
      const yPct = this.position === "bottom" ? this.#currentFraction * 100 : -this.#currentFraction * 100;
      layer.style.transform = `translateY(${yPct}%)`;
    } else {
      const xPct = this.position === "right" ? this.#currentFraction * 100 : -this.#currentFraction * 100;
      layer.style.transform = `translateX(${xPct}%)`;
    }
  }

  // Whether to show the close icon button
  #shouldShowClose() {
    // Always show for side drawers; for top/bottom obey showClose flag
    if (this.position === "left" || this.position === "right") return true;
    return !!this.showClose;
  }

  #animateTo(targetFraction) {
    const layer = this.renderRoot.getElementById("layer");
    if (!layer) return;
    layer.style.transition = `transform var(--_dur) var(--_easing)`;
    const clamped = this.#clamp(targetFraction, 0, 1);
    this.#currentFraction = clamped;
    if (this.position === "bottom" || this.position === "top") {
      const yPct = this.position === "bottom" ? clamped * 100 : -clamped * 100;
      layer.style.transform = `translateY(${yPct}%)`;
    } else {
      const xPct = this.position === "right" ? clamped * 100 : -clamped * 100;
      layer.style.transform = `translateX(${xPct}%)`;
    }

    // Update the `open` property based on the target fraction
    this.open = clamped === 0;
  }
}

customElements.define("pds-drawer", DrawerPanel);
