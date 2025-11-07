// Refactored to a plain Web Component (no Lit dependency)
// - Adopts PDS layers (primitives, components) into Shadow DOM
// - Uses semantic tokens and CSS custom properties (no hardcoded colors)
// - Preserves public API (attributes/methods) and drag/animate behavior

export class DrawerPanel extends HTMLElement {
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
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    // default state
    this._open = false;
    this._position = "bottom"; // bottom | top | left | right
    this._drag = "header"; // header | none
    this._maxHeight = "";
    this._minHeight = "";
    this._showClose = false;
  }
  static get observedAttributes() {
    return [
      "open",
      "position",
      "drag",
      "max-height",
      "min-height",
      "show-close",
    ];
  }

  // Attribute/property reflection
  get open() {
    return this._open;
  }
  set open(val) {
    const bool = Boolean(val);
    if (this._open === bool) return;
    this._open = bool;
    this.toggleAttribute("open", this._open);
    this.#animateTo(this._open ? 0 : 1);
    // Focus panel when opening
    if (this._open) {
      queueMicrotask(() => this.#aside?.focus());
    }
    this.dispatchEvent(new Event("toggle"));
    this.#syncAria();
  }

  get position() {
    return this._position;
  }
  set position(val) {
    const v = String(val || "bottom");
    if (this._position === v) return;
    this._position = v;
    this.setAttribute("position", v);
    this.#applyFraction(this.#currentFraction, false);
    this.#renderCloseButtonVisibility();
  }

  get drag() {
    return this._drag;
  }
  set drag(val) {
    const v = String(val || "header");
    if (this._drag === v) return;
    this._drag = v;
    this.setAttribute("drag", v);
  }

  get maxHeight() {
    return this._maxHeight;
  }
  set maxHeight(val) {
    this._maxHeight = val || "";
    if (this.#aside) {
      this.#aside.style.setProperty(
        "--drawer-max-height",
        this._maxHeight || "70vh"
      );
      this.#recalc();
    }
    if (this._maxHeight) this.setAttribute("max-height", this._maxHeight);
    else this.removeAttribute("max-height");
  }

  get minHeight() {
    return this._minHeight;
  }
  set minHeight(val) {
    this._minHeight = val || "";
    if (this.#aside) {
      this.#aside.style.setProperty(
        "--drawer-min-height",
        this._minHeight || "auto"
      );
      this.#recalc();
    }
    if (this._minHeight) this.setAttribute("min-height", this._minHeight);
    else this.removeAttribute("min-height");
  }

  get showClose() {
    return this._showClose;
  }
  set showClose(val) {
    const bool = Boolean(val);
    this._showClose = bool;
    this.toggleAttribute("show-close", this._showClose);
    this.#renderCloseButtonVisibility();
  }

  attributeChangedCallback(name, _old, value) {
    switch (name) {
      case "open":
        this._open = this.hasAttribute("open");
        this.#animateTo(this._open ? 0 : 1);
        this.#syncAria();
        break;
      case "position":
        this._position = value || "bottom";
        this.#applyFraction(this.#currentFraction, false);
        this.#renderCloseButtonVisibility();
        break;
      case "drag":
        this._drag = value || "header";
        break;
      case "max-height":
        this._maxHeight = value || "";
        if (this.#aside)
          this.#aside.style.setProperty(
            "--drawer-max-height",
            this._maxHeight || "70vh"
          );
        break;
      case "min-height":
        this._minHeight = value || "";
        if (this.#aside)
          this.#aside.style.setProperty(
            "--drawer-min-height",
            this._minHeight || "auto"
          );
        break;
      case "show-close":
        this._showClose = this.hasAttribute("show-close");
        this.#renderCloseButtonVisibility();
        break;
    }
  }

  async connectedCallback() {
    if (!this.shadowRoot) this.attachShadow({ mode: "open" });

    // Compose shadow DOM
    this.shadowRoot.innerHTML = `
      <div class="backdrop" part="backdrop"></div>
      <div class="layer" id="layer" aria-hidden="true">
        <aside part="panel" tabindex="-1">
          <header part="header">
            <div class="grab-handle" part="grab-handle" aria-hidden="true"></div>
            <button class="close-btn" part="close-button" aria-label="Close drawer" hidden>
              <pds-icon icon="x" size="sm"></pds-icon>
            </button>
            <slot name="drawer-header"></slot>
          </header>
          <main part="content">
            <slot name="drawer-content"></slot>
          </main>
        </aside>
      </div>
    `;

    // Adopt PDS layers + component stylesheet
    const componentStyles = PDS.createStylesheet(/*css*/ `
      @layer pds-drawer {
        :host { position: fixed; inset: 0; display: contents; contain: layout style size; }

        /* Timing tokens */
        :host { --_dur: var(--drawer-duration, var(--transition-normal, 280ms)); }
        :host { --_easing: var(--drawer-easing, var(--easing-emphasized, cubic-bezier(0.25,1,0.5,1))); }

        /* Backdrop */
        .backdrop {
          position: fixed; inset: 0;
          background: var(--backdrop-bg, var(--color-scrim, color-mix(in oklab, CanvasText 20%, Canvas 80%)));
          backdrop-filter: var(--backdrop-filter, none);
          opacity: 0; pointer-events: none;
          transition: opacity var(--_dur) var(--_easing);
          z-index: var(--z-modal, 1040);
        }
        :host([open]) .backdrop { opacity: var(--backdrop-opacity, .6); pointer-events: auto; }

        /* Layer container */
        .layer {
          position: fixed; left: 50%; width: min(100vw, 100%); max-width: 100%; translate: -50% 0;
          contain: layout paint style; will-change: transform; transform: translateY(var(--_y, 100%));
          z-index: var(--z-drawer, 1050);
        }
        :host([position="bottom"]) .layer { bottom: 0; }
        :host([position="top"]) .layer { top: 0; }

        /* Left/Right layout */
        :host([position="left"]) .layer, :host([position="right"]) .layer {
          top: 0; bottom: 0; translate: none;
          width: var(--drawer-width, min(90vw, 420px));
          max-width: var(--drawer-width, min(90vw, 420px));
        }
        :host([position="left"]) .layer { left: 0; right: auto; }
        :host([position="right"]) .layer { right: 0; left: auto; }

        /* Panel */
        aside {
          display: grid; grid-template-rows: auto minmax(0,1fr);
          background: var(--drawer-bg, var(--color-surface-overlay, Canvas));
          box-shadow: var(--drawer-shadow, var(--shadow-xl, var(--elevation-3, none))));
          max-height: var(--drawer-max-height, 70vh);
          min-height: var(--drawer-min-height, auto);
          width: 100%; max-width: 100%;
          border-top-left-radius: var(--drawer-radius, var(--radius-lg, 16px));
          border-top-right-radius: var(--drawer-radius, var(--radius-lg, 16px));
          overflow: clip; contain: layout paint style; will-change: transform;
          touch-action: none;
          outline: none;
        }
        :host([position="top"]) aside {
          border-top-left-radius: 0; border-top-right-radius: 0;
          border-bottom-left-radius: var(--drawer-radius, var(--radius-lg, 16px));
          border-bottom-right-radius: var(--drawer-radius, var(--radius-lg, 16px));
        }
        :host([position="left"]) aside {
          border-top-left-radius: 0; border-bottom-left-radius: 0;
          border-top-right-radius: var(--drawer-radius, var(--radius-lg, 16px));
          border-bottom-right-radius: var(--drawer-radius, var(--radius-lg, 16px));
          max-height: 100vh; height: 100%; width: 100%;
        }
        :host([position="right"]) aside {
          border-top-right-radius: 0; border-bottom-right-radius: 0;
          border-top-left-radius: var(--drawer-radius, var(--radius-lg, 16px));
          border-bottom-left-radius: var(--drawer-radius, var(--radius-lg, 16px));
          max-height: 100vh; height: 100%; width: 100%;
        }

        header {
          position: relative; display: grid; align-items: center; justify-items: center;
          min-block-size: var(--drawer-header-min-hit, var(--control-min-height, 40px));
        }
        .grab-handle {
          inline-size: var(--drawer-handle-width, var(--size-9, 36px));
          block-size: var(--drawer-handle-height, var(--size-1, 4px));
          border-radius: var(--drawer-handle-radius, var(--radius-full, 999px));
          background: var(--drawer-handle-bg, color-mix(in oklab, CanvasText 20%, Canvas 80%));
          opacity: .9; pointer-events: none; user-select: none;
        }
        :host([position="left"]) .grab-handle, :host([position="right"]) .grab-handle { display:none; }

        .close-btn {
          position: absolute; right: var(--spacing-2,8px); top: 50%; transform: translateY(-50%);
          display: inline-flex; align-items: center; justify-content: center;
          width: var(--size-8, 32px); height: var(--size-8, 32px);
          border-radius: var(--radius-sm);
          border: none; background: transparent; color: inherit; cursor: pointer;
        }
        .close-btn:hover { opacity: .85; }
        .close-btn:focus { outline: var(--focus-outline, none); }
        ::slotted([slot="drawer-header"]) { inline-size: 100%; display: block; min-block-size: var(--drawer-header-min-hit, var(--control-min-height, 40px)); }

        main { overflow: auto; -webkit-overflow-scrolling: touch; contain: layout paint style; transition: height var(--_dur) var(--_easing); }

        @media (min-width: 800px) {
          aside { width: 100%; max-width: 800px; margin-inline: auto; border-radius: var(--drawer-radius, var(--radius-lg, 16px)); overflow: hidden; }
        }
      }
    `);

    await PDS.adoptLayers(this.shadowRoot, ["primitives", "components"], [componentStyles]);

    // References
    this.#aside = this.shadowRoot.querySelector("aside");
    this.#applyFraction(this.open ? 0 : 1, false);
    this.#syncAria();
    this.#renderCloseButtonVisibility();

    // Wire events
    const backdrop = this.shadowRoot.querySelector('.backdrop');
    backdrop?.addEventListener('click', this.#onBackdropClick);

    const aside = this.#aside;
    if (aside) aside.addEventListener('pointerdown', (e) => {
      if (this._drag === 'none') return;
      // Only allow drag from header when configured
      if (this._drag === 'header') {
        const header = this.shadowRoot.querySelector('header');
        const path = e.composedPath();
        if (!path.includes(header)) return;
      }
      this.#onPointerDown(e);
    });

    // Global listeners
    window.addEventListener("pointermove", this.#onPointerMove, { passive: false });
    window.addEventListener("pointerup", this.#onPointerUp, { passive: true });
    window.addEventListener("keydown", this.#onKeyDown);

    // Resize observers
    this.#resizeObs = new ResizeObserver(this.#recalc);
    this.#resizeObs.observe(this.#aside);
    window.addEventListener("resize", this.#recalc, { passive: true });
    if (window.visualViewport) window.visualViewport.addEventListener("resize", this.#recalc, { passive: true });

    this.#recalc();
  }

  disconnectedCallback() {
    // Clean up global listeners
    window.removeEventListener("pointermove", this.#onPointerMove);
    window.removeEventListener("pointerup", this.#onPointerUp);
    window.removeEventListener("keydown", this.#onKeyDown);
    if (window.visualViewport)
      window.visualViewport.removeEventListener("resize", this.#recalc);
    window.removeEventListener("resize", this.#recalc);
    this.#resizeObs?.disconnect();
    cancelAnimationFrame(this.#raf);
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
   * Public convenience to configure and open the drawer in one call.
   * Mirrors PureApp.showDrawer signature for a near drop-in replacement.
  * @param {any|HTMLElement|string} htmlContent
   * @param {Object} [options]
  * @param {any|HTMLElement|string} [options.header]
   * @param {('bottom'|'top'|'left'|'right')} [options.position]
   * @param {string} [options.maxHeight]
   * @param {string} [options.minHeight]
   * @param {boolean} [options.showClose]
   * @param {boolean} [options.waitForMedia=true]
   * @param {number} [options.mediaTimeout=500]
   * @returns {Promise<this>} resolves to the drawer element
   */
  async show(htmlContent, options = {}) {
    // Apply provided options to this instance
    if (options.position) this.position = options.position;
    if (options.maxHeight) this.maxHeight = options.maxHeight;
    if (options.minHeight) this.minHeight = options.minHeight;

    // Close button visibility
    const pos = this.position || "bottom";
    const defaultShowClose = pos === "left" || pos === "right";
    const showClose = options.showClose === undefined ? defaultShowClose : !!options.showClose;
    this.showClose = showClose;

  // Render content (header/body)
  await this.setContent(htmlContent, options.header);

  // Wait for next frame so slots are distributed
  await new Promise((r) => requestAnimationFrame(() => r()));

    // Optionally wait for media to load (default: true)
    const shouldWaitForMedia = options.waitForMedia !== false;
    if (shouldWaitForMedia) {
      const mediaTimeout = options.mediaTimeout || 500;
      await this.#waitForMedia(mediaTimeout);
    }

    // Open with a short delay to ensure layout has settled
    await new Promise((r) => setTimeout(r, 10));
    this.openDrawer();
    return this;
  }

  /**
   * Set drawer content using slots
  * @param {any|HTMLElement|string} bodyContent - Content for drawer body (HTMLElement or string; Lit templates supported if runtime available)
  * @param {any|HTMLElement|string} headerContent - Optional content for drawer header
   */
  async setContent(bodyContent, headerContent = null) {
    // Clear existing slotted content
    this.querySelectorAll('[slot="drawer-content"], [slot="drawer-header"]').forEach(el => el.remove());
    
    // Add new body content
    if (bodyContent) {
      const bodyWrapper = document.createElement('div');
      bodyWrapper.setAttribute('slot', 'drawer-content');
      bodyWrapper.className = 'surface-overlay';

      // Best-effort support for Lit templates only if lit renderer is available at runtime
      if (bodyContent && bodyContent._$litType$) {
        try {
          const mod = await import("#pds/lit");
          mod.render(bodyContent, bodyWrapper);
        } catch {
          // Fallback: attempt to set as text
          bodyWrapper.textContent = String(bodyContent);
        }
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

      if (headerContent && headerContent._$litType$) {
        try {
          const mod = await import("#pds/lit");
          mod.render(headerContent, headerWrapper);
        } catch {
          headerWrapper.textContent = String(headerContent);
        }
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
    if (this._drag === "none") return;
    if (this._drag === "header") {
      const header = this.shadowRoot.querySelector("header");
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
    this.shadowRoot.querySelector("main")?.style.setProperty("overflow", "hidden");
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
  this.shadowRoot.querySelector("main")?.style.removeProperty("overflow");

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
  async #waitForMedia(maxTimeout = 500) {
    // Find media elements within the drawer (including slotted content)
    const media = Array.from(this.querySelectorAll("img, video"));
    if (media.length === 0) return;

    const mediaPromises = media.map((el) => {
      if (el.tagName === "IMG") {
        const img = /** @type {HTMLImageElement} */ (el);
        if (img.complete && img.naturalHeight !== 0) return Promise.resolve();
        return new Promise((resolve) => {
          img.addEventListener("load", resolve, { once: true });
          img.addEventListener("error", resolve, { once: true });
        });
      }
      if (el.tagName === "VIDEO") {
        const vid = /** @type {HTMLVideoElement} */ (el);
        if (vid.readyState > 0) return Promise.resolve();
        return new Promise((resolve) => {
          vid.addEventListener("loadedmetadata", resolve, { once: true });
          vid.addEventListener("error", resolve, { once: true });
        });
      }
      return Promise.resolve();
    });

    const timeout = new Promise((resolve) => setTimeout(resolve, maxTimeout));
    await Promise.race([Promise.all(mediaPromises), timeout]);
  }
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
    const layer = this.shadowRoot.getElementById("layer");
    if (!layer) return;
    layer.style.transition = t;
    if (this._position === "bottom" || this._position === "top") {
      const yPct = this._position === "bottom" ? this.#currentFraction * 100 : -this.#currentFraction * 100;
      layer.style.transform = `translateY(${yPct}%)`;
    } else {
      const xPct = this._position === "right" ? this.#currentFraction * 100 : -this.#currentFraction * 100;
      layer.style.transform = `translateX(${xPct}%)`;
    }
  }

  // Whether to show the close icon button
  #shouldShowClose() {
    // Always show for side drawers; for top/bottom obey showClose flag
    if (this._position === "left" || this._position === "right") return true;
    return !!this._showClose;
  }

  #renderCloseButtonVisibility() {
    const btn = this.shadowRoot?.querySelector('.close-btn');
    if (!btn) return;
    btn.hidden = !this.#shouldShowClose();
    if (!btn._pdsBound) {
      btn.addEventListener('click', () => this.closeDrawer());
      btn._pdsBound = true;
    }
  }

  #animateTo(targetFraction) {
    const layer = this.shadowRoot.getElementById("layer");
    if (!layer) return;
    layer.style.transition = `transform var(--_dur) var(--_easing)`;
    const clamped = this.#clamp(targetFraction, 0, 1);
    this.#currentFraction = clamped;
    if (this._position === "bottom" || this._position === "top") {
      const yPct = this._position === "bottom" ? clamped * 100 : -clamped * 100;
      layer.style.transform = `translateY(${yPct}%)`;
    } else {
      const xPct = this._position === "right" ? clamped * 100 : -clamped * 100;
      layer.style.transform = `translateX(${xPct}%)`;
    }

    // Update the `open` property based on the target fraction
    const isOpen = clamped === 0;
    if (this._open !== isOpen) {
      // Avoid recursion: just sync internal and attribute
      this._open = isOpen;
      this.toggleAttribute("open", isOpen);
      this.#syncAria();
    }
  }

  #syncAria() {
    const layerEl = this.shadowRoot?.getElementById('layer');
    const aside = this.#aside;
    if (layerEl) layerEl.setAttribute('aria-hidden', String(!this._open));
    if (aside) {
      if (this._open) {
        aside.setAttribute('role', 'dialog');
        aside.setAttribute('aria-modal', 'true');
      } else {
        aside.removeAttribute('role');
        aside.removeAttribute('aria-modal');
      }
    }
  }
}

customElements.define("pds-drawer", DrawerPanel);
