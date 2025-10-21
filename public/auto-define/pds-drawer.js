import { LitElement, html, css, ifDefined } from "/assets/js/lit.js";

export class DrawerPanel extends LitElement {
  #isDragging = false;
  #startY = 0;
  #lastY = 0;
  #lastTS = 0;
  #velocityY = 0;
  #startFraction = 0;
  #aside = null;
  #drawerHeight = 0;
  #raf = 0;
  #currentFraction = 0; // 0=open, 1=closed
  #resizeObs = null;

  static properties = {
    open: { type: Boolean, reflect: true },
    position: { type: String, reflect: true },
    drag: { type: String, reflect: true },
    maxHeight: { type: String, attribute: "max-height" },
  };

  static styles = css`
    :host {
      position: fixed;
      inset: 0;
      display: contents;
      --_max-h: var(--drawer-max-height, 70vh);
      --_easing: var(--drawer-easing, cubic-bezier(0.25, 1, 0.5, 1));
      --_dur: var(--drawer-duration, 280ms);
      --_backdrop-bg: var(--drawer-backdrop-bg, rgba(0, 0, 0, 0.2));
      --_backdrop-blur: var(--drawer-backdrop-blur, 5px);
      --_backdrop-brightness: var(--drawer-backdrop-brightness, 0.8);
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
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.2),
        rgba(255, 255, 255, 0.1)
      );
      backdrop-filter: blur(10px) saturate(150%) brightness(0.9);
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--_dur) var(--_easing);
      z-index: var(--_backdrop-z);
    }
    :host([open]) .backdrop {
      opacity: 1;
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

    aside {
      display: grid;
      grid-template-rows: auto minmax(0, 1fr);
      background: var(--_panel-bg);
      box-shadow: var(--_shadow);
      max-height: var(--_max-h);
      width: 100vw;
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
    ::slotted([slot="drawer-header"]) {
      inline-size: 100%;
      display: block;
      min-block-size: var(--_header-min-hit);
    }
    main {
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      contain: layout paint style;
    }
    :host([open]) .layer {
      transform: translateY(0);
    }
    :host(:not([open])) .layer {
      transform: translateY(100%);
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
          style=${this.maxHeight ? `--drawer-max-height:${this.maxHeight}` : ""}
          @pointerdown=${this.drag !== "none" ? this.#onPointerDown : null}
        >
          <header part="header">
            <div
              class="grab-handle"
              part="grab-handle"
              aria-hidden="true"
            ></div>
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
    this.#startY = p.y;
    this.#lastY = p.y;
    this.#lastTS = performance.now();
    this.#velocityY = 0;
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
    const dir = this.position === "bottom" ? 1 : -1;

    // Compute fraction based on displacement since drag start (not cumulative updates)
    const deltaFromStart = p.y - this.#startY; // positive when moving down
    const next = this.#clamp(
      this.#startFraction +
        (dir * deltaFromStart) / Math.max(1, this.#drawerHeight),
      0,
      1
    );
    this.#applyFraction(next, false);

    // Velocity (px/ms), positive when moving down in screen coords
    const now = performance.now();
    const dt = Math.max(1, now - this.#lastTS);
    this.#velocityY = (p.y - this.#lastY) / dt; // px/ms
    this.#lastY = p.y;
    this.#lastTS = now;

    if (e.cancelable) e.preventDefault();
  };

  #onPointerUp = (e) => {
    if (!this.#isDragging) return;
    this.#isDragging = false;
    this.style.userSelect = "";
    document.documentElement.style.cursor = "";
    this.renderRoot.querySelector("main")?.style.removeProperty("overflow");

    const dir = this.position === "bottom" ? 1 : -1;
    const throwCloseThreshold = (1.0 / 1000) * 1000; // keep var for clarity; we use 1.0 px/ms below

    // Decide based on velocity first (throw down closes), else position threshold
    const fastDown = this.#velocityY * dir > 1.0; // > ~1000 px/s downward relative to panel
    const fastUp = this.#velocityY * dir < -1.0; // fast upward

    if (fastDown) {
      this.#animateTo(1); // close
    } else if (fastUp) {
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
    const yPct =
      this.position === "bottom"
        ? this.#currentFraction * 100
        : -this.#currentFraction * 100;
    layer.style.transform = `translateY(${yPct}%)`;
  }

  #animateTo(targetFraction) {
    const layer = this.renderRoot.getElementById("layer");
    if (!layer) return;
    layer.style.transition = `transform var(--_dur) var(--_easing)`;
    const clamped = this.#clamp(targetFraction, 0, 1);
    this.#currentFraction = clamped;
    const yPct = this.position === "bottom" ? clamped * 100 : -clamped * 100;
    layer.style.transform = `translateY(${yPct}%)`;

    // Update the `open` property based on the target fraction
    this.open = clamped === 0;
  }
}

customElements.define("pds-drawer", DrawerPanel);
