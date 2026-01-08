const PDS = window.PDS;

/**
 * @element pds-drawer
 * @fires toggle - Fired when the drawer opens or closes
 * 
 * @slot drawer-header - Header content for the drawer
 * @slot drawer-content - Main content of the drawer
 * 
 * @cssprop --drawer-duration - Animation duration (default: var(--transition-normal))
 * @cssprop --drawer-easing - Animation easing function (default: var(--easing-emphasized))
 * @cssprop --drawer-max-height - Maximum height when position is top/bottom (default: 70vh)
 * @cssprop --drawer-min-height - Minimum height when position is top/bottom (default: auto)
 * 
 * @csspart backdrop - The semi-transparent backdrop overlay
 * @csspart panel - The drawer panel container
 * @csspart header - The drawer header section
 * @csspart close-button - The close button
 * @csspart grab-handle - The drag handle indicator
 * @csspart content - The drawer content section
 */
class PdsDrawer extends HTMLElement {
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
  #openAnimationController = null;
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
  
  /**
   * Controls whether the drawer is open or closed
   * @type {boolean}
   * @attr open
   */
  get open() {
    return this._open;
  }
  set open(val) {
    const bool = Boolean(val);
    if (this._open === bool) return;
    this._open = bool;
    this.toggleAttribute("open", this._open);
    if (this._open) {
      queueMicrotask(() => this.#aside?.focus());
      document.body.classList.add("drawer-open");
    }
    else {
      document.body.classList.remove("drawer-open");
    }
    this.dispatchEvent(new Event("toggle"));
    this.#syncAria();
  }

  /**
   * Position of the drawer relative to the viewport
   * @type {"bottom" | "top" | "left" | "right"}
   * @attr position
   * @default "bottom"
   */
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

  /**
   * Controls drag interaction behavior
   * @type {"header" | "none"}
   * @attr drag
   * @default "header"
   */
  get drag() {
    return this._drag;
  }
  set drag(val) {
    const v = String(val || "header");
    if (this._drag === v) return;
    this._drag = v;
    this.setAttribute("drag", v);
  }

  /**
   * Maximum height for top/bottom positioned drawers (CSS value)
   * @type {string}
   * @attr max-height
   * @default "70vh"
   */
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

  /**
   * Minimum height for top/bottom positioned drawers (CSS value)
   * @type {string}
   * @attr min-height
   * @default "auto"
   */
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

  /**
   * Whether to show the close button in the header
   * @type {boolean}
   * @attr show-close
   * @default false
   */
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
        if (this._open) {
          this.#queueOpenAnimation();
        } else {
          this.#cancelPendingOpenAnimation();
          this.#animateTo(1);
        }
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

    // Set default position attribute if not explicitly set
    if (!this.hasAttribute('position')) {
      this.setAttribute('position', 'bottom');
    }

    // Compose shadow DOM
    this.shadowRoot.innerHTML = /*html*/`
      <div class="backdrop" part="backdrop"></div>
      <div class="layer" id="layer" aria-hidden="true">
        <aside part="panel" tabindex="-1">
          <header part="header">
            <button class="close-btn" part="close-button" aria-label="Close drawer" hidden>
              <pds-icon icon="x" size="sm"></pds-icon>
            </button>
            <slot name="drawer-header"></slot>
            <div class="grab-handle" part="grab-handle" aria-hidden="true"></div>
          </header>
          <div part="content">
            <slot name="drawer-content"></slot>
          </div>
        </aside>
      </div>
    `;

    // Adopt PDS layers + component stylesheet
    const componentStyles = PDS.createStylesheet(/*css*/ `
      @layer pds-drawer {
        :host { position: fixed; inset: 0; display: contents; contain: layout style size; }

        /* Timing tokens */
        :host { --_dur: var(--drawer-duration, var(--transition-normal)); }
        :host { --_easing: var(--drawer-easing, var(--easing-emphasized, cubic-bezier(0.25,1,0.5,1))); }

        ::slotted(*) { 
          padding: var(--spacing-4);
          background-color: var(--color-surface-overlay);
        }

        /* Backdrop */
        .backdrop {
          position: fixed; inset: 0;
          background: var(--backdrop-bg, var(--color-scrim, color-mix(in oklab, CanvasText 20%, Canvas 80%)));
          backdrop-filter: var(--backdrop-filter, none);
          opacity: 0; pointer-events: none; visibility: hidden;
          transition: opacity var(--_dur) var(--_easing), visibility 0s var(--_dur);
          z-index: var(--z-modal);
        }
        :host([open]) .backdrop { opacity: var(--backdrop-opacity); pointer-events: auto; visibility: visible; transition-delay: 0s; }

        /* Layer container */
        .layer {
          position: fixed; left: 0; right: 0; width: 100%; max-width: 100%;
          contain: layout paint style; will-change: transform;
          z-index: var(--z-drawer);
          display: flex; align-items: flex-end;
          pointer-events: none; visibility: hidden;
          transition: visibility 0s var(--_dur);
        }
        :host([open]) .layer { pointer-events: auto; visibility: visible; transition-delay: 0s; }
        :host([position="bottom"]) .layer { bottom: 0; height: auto; }
        :host([position="top"]) .layer { top: 0; height: auto; align-items: flex-start; }

        /* Left/Right layout */
        :host([position="left"]) .layer, :host([position="right"]) .layer {
          top: 0; bottom: 0; translate: none;
          width: var(--drawer-width, min(90vw, 28rem));
          max-width: var(--drawer-width, min(90vw, 28rem));
        }
        :host([position="left"]) .layer { left: 0; right: auto; }
        :host([position="right"]) .layer { right: 0; left: auto; }

        /* Panel */
        aside {
          display: flex; flex-direction: column;
          background: var(--drawer-bg, var(--color-surface-overlay, Canvas));
          box-shadow: var(--drawer-shadow, var(--shadow-xl));
          max-height: var(--drawer-max-height, 70vh);
          min-height: var(--drawer-min-height, auto);
          width: 100%; max-width: 100%;
          margin: 0;
          border-radius: var(--drawer-radius, var(--radius-lg));
          overflow: clip; contain: layout paint style; will-change: transform;
          touch-action: none;
          outline: none;
        }
        :host([position="bottom"]) aside {
          border-bottom-left-radius: 0; border-bottom-right-radius: 0;
        }
        :host([position="top"]) aside {
          flex-direction: column-reverse;
          border-top-left-radius: 0; border-top-right-radius: 0;
        }
        :host([position="left"]) aside {
          border-top-left-radius: 0; border-bottom-left-radius: 0;
          max-height: 100vh; height: 100%; width: 100%;
        }
        :host([position="right"]) aside {
          border-top-right-radius: 0; border-bottom-right-radius: 0;
          max-height: 100vh; height: 100%; width: 100%;
        }

        header {
          position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center;
          min-block-size: var(--drawer-header-min-hit, var(--control-min-height, var(--spacing-10)));
        }
        .grab-handle {
          order: -1; /* Put grab handle first (top) by default */
          inline-size: var(--drawer-handle-width, var(--size-9, var(--spacing-9)));
          block-size: var(--drawer-handle-height, var(--size-1, var(--spacing-1)));
          border-radius: var(--drawer-handle-radius, var(--radius-full));
          background: var(--drawer-handle-bg, var(--color-border));
          opacity: 0.9; pointer-events: none; user-select: none;
        }
        :host([position="left"]) .grab-handle, :host([position="right"]) .grab-handle { display:none; }
        :host([position="top"]) .grab-handle { order: 1; } /* Put grab handle last (bottom visually) for top position */

        .close-btn {
          position: absolute; right: var(--spacing-2); top: 50%; transform: translateY(-50%);
          display: inline-flex; align-items: center; justify-content: center;
          width: var(--size-8, var(--spacing-8)); height: var(--size-8, var(--spacing-8));
          border-radius: var(--radius-sm);
          border: none; background: transparent; color: inherit; cursor: pointer;
        }
        .close-btn:hover { opacity: 0.85; }
        .close-btn:focus { outline: var(--focus-outline, none); }
        ::slotted([slot="drawer-header"]) { inline-size: 100%; display: block; min-block-size: var(--drawer-header-min-hit, var(--control-min-height, var(--spacing-10))); }

        [part="content"] { flex: 1; min-height: 0; overflow: auto; -webkit-overflow-scrolling: touch; contain: layout paint style; }

        main { overflow: auto; -webkit-overflow-scrolling: touch; contain: layout paint style; transition: height var(--_dur) var(--_easing); }

        @media (min-width: 800px) {
          aside { width: 100%; max-width: 800px; margin-inline: auto; border-radius: var(--drawer-radius, var(--radius-lg)); overflow: hidden; }
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
    this.#cancelPendingOpenAnimation();
  }

  // Public API
  
  /**
   * Opens the drawer
   * @method openDrawer
   * @public
   */
  openDrawer() {
    this.open = true;
  }
  
  /**
   * Closes the drawer
   * @method closeDrawer
   * @public
   */
  closeDrawer() {
    this.open = false;
  }
  
  /**
   * Toggles the drawer open/closed state
   * @method toggleDrawer
   * @public
   */
  toggleDrawer() {
    this.open = !this.open;
  }

  /**
   * Configure and open the drawer in one call
   * @method show
   * @public
   * @param {any|HTMLElement|string} htmlContent - The main content to display
   * @param {Object} [options] - Configuration options
   * @param {any|HTMLElement|string} [options.header] - Header content
   * @param {"bottom"|"top"|"left"|"right"} [options.position] - Drawer position
   * @param {string} [options.maxHeight] - Maximum height (CSS value)
   * @param {string} [options.minHeight] - Minimum height (CSS value)
   * @param {boolean} [options.showClose] - Show close button
   * @param {boolean} [options.waitForMedia=true] - Wait for images/videos to load
   * @param {number} [options.mediaTimeout=500] - Media load timeout in ms
   * @returns {Promise<this>} Resolves to the drawer element
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

    this.openDrawer();
    return this;
  }

  /**
   * Set drawer content using slots
  * @param {any|HTMLElement|string} bodyContent - Content for drawer body (HTMLElement or string; Lit templates supported if runtime available)
  * @param {any|HTMLElement|string} headerContent - Optional content for drawer header
   */
  /**
   * Set the content of the drawer
   * @method setContent
   * @public
   * @param {any|HTMLElement|string} bodyContent - Content for the drawer body
   * @param {any|HTMLElement|string} [headerContent] - Optional header content
   * @returns {Promise<void>}
   */
  async setContent(bodyContent, headerContent = null) {
    // Clear existing slotted content
    this.querySelectorAll('[slot="drawer-content"], [slot="drawer-header"]').forEach(el => el.remove());
    
    // Add new body content
    if (bodyContent) {
      const bodyWrapper = document.createElement('div');
      bodyWrapper.setAttribute('slot', 'drawer-content');
      //bodyWrapper.className = 'surface-overlay';

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
      //headerWrapper.className = 'surface-overlay';

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
   * @method clearContent
   * @public
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
      } catch { /* */}
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

    //const isVertical = this.position === "bottom" || this.position === "top";
    const dir = this.position === "bottom" || this.position === "right" ? 1 : -1;
    //const throwCloseThreshold = (1.0 / 1000) * 1000; // keep var for clarity; we use 1.0 px/ms below

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
      } catch {/**/}
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
  #cancelPendingOpenAnimation() {
    if (!this.#openAnimationController) return;
    this.#openAnimationController.abort();
    this.#openAnimationController = null;
  }

  #queueOpenAnimation() {
    const aside = this.#aside;
    if (!aside) return;

    this.#cancelPendingOpenAnimation();
    const controller = new AbortController();
    this.#openAnimationController = controller;

    this.#applyFraction(1, false);
    void aside.offsetHeight; // Force layout to register the closed state

    this.#whenReadyForOpen(controller.signal)
      .then(() => {
        if (controller.signal.aborted) return;
        this.#animateTo(0);
      })
      .finally(() => {
        if (this.#openAnimationController === controller) {
          this.#openAnimationController = null;
        }
      });
  }

  async #whenReadyForOpen(signal) {
    await this.#nextFrame(signal);
    await this.#nextFrame(signal);
    await this.#waitForIdle(signal);
  }

  #nextFrame(signal) {
    if (signal?.aborted) return Promise.resolve();
    return new Promise((resolve) => {
      const id = requestAnimationFrame(() => resolve());
      signal?.addEventListener("abort", () => {
        cancelAnimationFrame(id);
        resolve();
      }, { once: true });
    });
  }

  #waitForIdle(signal) {
    if (signal?.aborted) return Promise.resolve();
    if (typeof window.requestIdleCallback === "function") {
      return new Promise((resolve) => {
        const idleId = window.requestIdleCallback(() => resolve());
        signal?.addEventListener("abort", () => {
          if (typeof window.cancelIdleCallback === "function") {
            window.cancelIdleCallback(idleId);
          }
          resolve();
        }, { once: true });
      });
    }
    // Fallback: wait for another frame as a lightweight idle approximation
    return this.#nextFrame(signal);
  }

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
    const aside = this.#aside;
    if (!aside) return;
    aside.style.transition = t;
    if (this._position === "bottom" || this._position === "top") {
      const yPct = this._position === "bottom" ? this.#currentFraction * 100 : -this.#currentFraction * 100;
      aside.style.transform = `translateY(${yPct}%)`;
    } else {
      const xPct = this._position === "right" ? this.#currentFraction * 100 : -this.#currentFraction * 100;
      aside.style.transform = `translateX(${xPct}%)`;
    }
  }

  // Whether to show the close icon button
  #shouldShowClose() {
    // Always show for side drawers; hide by default for top/bottom unless showClose flag is set
    if (this._position === "left" || this._position === "right") return true;
    if (this._position === "top" || this._position === "bottom") return !!this._showClose;
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
    const aside = this.#aside;
    if (!aside) return;
    
    const clamped = this.#clamp(targetFraction, 0, 1);
    const isOpening = clamped < this.#currentFraction;
    
    // On mobile, ensure the browser recognizes the starting position before animating
    // This fixes the missing transition when opening
    if (isOpening) {
      // First, ensure we're at the closed position without transition
      aside.style.transition = 'none';
      if (this._position === "bottom" || this._position === "top") {
        const startPct = this._position === "bottom" ? this.#currentFraction * 100 : -this.#currentFraction * 100;
        aside.style.transform = `translateY(${startPct}%)`;
      } else {
        const startPct = this._position === "right" ? this.#currentFraction * 100 : -this.#currentFraction * 100;
        aside.style.transform = `translateX(${startPct}%)`;
      }
      // Force reflow to ensure starting position is applied
      void aside.offsetHeight;
    }
    
    // Now apply transition and animate to target
    aside.style.transition = `transform var(--_dur) var(--_easing)`;
    this.#currentFraction = clamped;
    if (this._position === "bottom" || this._position === "top") {
      const yPct = this._position === "bottom" ? clamped * 100 : -clamped * 100;
      aside.style.transform = `translateY(${yPct}%)`;
    } else {
      const xPct = this._position === "right" ? clamped * 100 : -clamped * 100;
      aside.style.transform = `translateX(${xPct}%)`;
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
customElements.define("pds-drawer", PdsDrawer);
