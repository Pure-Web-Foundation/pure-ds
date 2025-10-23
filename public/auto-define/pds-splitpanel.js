import { LitElement, html, css } from "/assets/js/lit.js";
import { adoptLayers, createStylesheet } from "/assets/js/app.js";

customElements.define(
  "pds-splitpanel",
  class extends LitElement {
    static properties = {
      layout: { type: String },
      defaultSplit: { type: String },
      breakpoint: { type: Number },
      open: { type: Boolean, reflect: true },
    };

    constructor() {
      super();
      this.layout = "horizontal";
      this.defaultSplit = "450px";
      this.breakpoint = 1024;
      this.isDragging = false;
      this.open = false; // reactive mobile-open state
    }

    async firstUpdated() {
      // create a small component stylesheet for local tweaks
      const componentStyles = createStylesheet(/*css*/ `
      :host {
        display: flex;
        position: relative;
        height: 100%;
        width: 100%;
      }

      :host([layout="horizontal"]) {
        flex-direction: row;
      }

      :host([layout="vertical"]) {
        flex-direction: column;
      }

      /* Panels wrappers used for layout and overlaying */
      .left-panel,
      .right-panel {
        display: block;
        min-width: 0;
      }

      /* left panel width controlled by CSS variable (set from JS) */
      .left-panel {
        flex: 0 0 var(--left-width, 450px);
      }

      .right-panel {
        flex: 1 1 auto;
        display: flex;
      }

      .splitter {
        background-color: var(--color-border);
        cursor: col-resize;
        position: relative;
        z-index: 1;
      }

      :host([layout="horizontal"]) .splitter {
        width: 5px;
        height: 100%;
      }

      :host([layout="vertical"]) .splitter {
        height: 5px;
        width: 100%;
        cursor: row-resize;
      }

      /* Mobile toggle positioning (hidden by default, visible under host[mobile]) */
      #mobile-toggle {
        visibility: hidden;
        position: fixed;
        top: var(--spacing-4);
        right: var(--spacing-4);
        z-index: 1001;
      }

      :host([mobile]) #mobile-toggle {
        visibility: visible;
      }

      /* Default: hide the left slot element on mobile (slot box takes no space)
         and let the right slot take the full width. When open, show the left
         slot as an overlayed fixed panel. */
      :host([mobile]) .left-panel {
        display: none;
      }

      :host([mobile]) .right-panel {
        flex: 1 1 100%;
        width: 100%;
      }

      :host([mobile][open]) .left-panel {
        display: block;
        /* overlay the left panel within the splitpanel host */
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        background: var(--color-surface-base);
      }

      /* Also style the assigned left node to animate in/out and ensure it fills the slot */
      :host([mobile]) .left-panel ::slotted([slot="left"]) {
        display: block;
        width: 100%;
        height: 100%;
        transform: translateX(-100%);
        transition: transform var(--transition-fast) ease-in-out;
      }

      :host([mobile][open]) .left-panel ::slotted([slot="left"]) {
        transform: translateX(0);
      }

      /* Overlay visibility controlled by host attributes */
      .mobile-overlay {
        display: none;
      }

      :host([mobile][open]) .mobile-overlay {
        display: block;
        /* overlay the splitpanel host area */
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 999;
      }

      /* Ensure small buttons are tighter — primitives provide .btn/.btn-sm but
         some demos may not include the base .btn; include a safe local tweak */
      .mobile-toggle.btn {
        padding: var(--spacing-1, 4px) var(--spacing-2, 6px);
      }

      .mobile-toggle.btn-sm {
        padding: var(--spacing-1, 4px);
      }
    `);

      // Adopt primitives + our component stylesheet early so primitives' button styles
      // are available inside the shadow root before render interactions.
      try {
        await adoptLayers(
          this.shadowRoot,
          ["primitives", "components"],
          [componentStyles]
        );
      } catch (e) {
        // adoptPrimitives handles errors internally, but guard here just in case
        console.error("pds-splitpanel: adoptPrimitives failed", e);
      }

      this.leftPanel = this.querySelector('[slot="left"]');
      this.rightPanel = this.querySelector('[slot="right"]');
      this.splitter = this.shadowRoot.querySelector(".splitter");

      // Mobile overlay and toggle will render from template; grab references if needed
      this.mobileToggle = this.shadowRoot.getElementById("mobile-toggle");
      this.mobileOverlay = this.shadowRoot.querySelector(".mobile-overlay");

      this.updateLayout();

      window.addEventListener("resize", () => this.updateLayout());

      if (this.splitter)
        this.splitter.addEventListener("mousedown", (e) =>
          this.startDragging(e)
        );
      document.addEventListener("mousemove", (e) => this.drag(e));
      document.addEventListener("mouseup", () => this.stopDragging());
    }

    updateLayout() {
      const isMobile = window.innerWidth < this.breakpoint;
      this.toggleAttribute("mobile", isMobile);

      // Use CSS-driven show/hide for mobile — reactive state controls `open` and host attributes
      if (isMobile) {
        // when switching to mobile, ensure `open` is false by default
        if (!this.hasAttribute("open")) this.open = false;
        // collapse splitter in mobile via CSS (host[mobile] .splitter)
        if (this.splitter) this.splitter.style.display = "none";
        if (this.rightPanel) this.rightPanel.style.display = "block";
        // clear left width so right panel can claim full width
        this.style.removeProperty('--left-width');
      } else {
        // restore desktop layout
        if (this.splitter) this.splitter.style.display = "block";
        // set CSS var to control left panel width
        this.style.setProperty('--left-width', this.defaultSplit);
        if (this.rightPanel)
          this.rightPanel.style.flex = `1 1 calc(100% - ${this.defaultSplit})`;
      }
    }

    startDragging(event) {
      if (this.hasAttribute("mobile")) return;
      this.isDragging = true;
      document.body.style.cursor =
        this.layout === "horizontal" ? "col-resize" : "row-resize";
      event.preventDefault(); // Prevent text selection during dragging
    }

    drag(event) {
      if (!this.isDragging) return;

      const newSize =
        this.layout === "horizontal"
          ? Math.max(200, Math.min(event.clientX, window.innerWidth - 200))
          : Math.max(200, Math.min(event.clientY, window.innerHeight - 200));

      if (this.layout === "horizontal") {
        // set CSS variable so layout updates purely via CSS
        this.style.setProperty('--left-width', `${newSize}px`);
        if (this.rightPanel) this.rightPanel.style.flex = `1 1 calc(100% - ${newSize}px)`;
      } else {
        if (this.leftPanel) this.leftPanel.style.height = `${newSize}px`;
        if (this.rightPanel) this.rightPanel.style.flex = `1 1 calc(100% - ${newSize}px)`;
      }
    }

    stopDragging() {
      if (!this.isDragging) return;
      this.isDragging = false;
      document.body.style.cursor = "";
    }

    toggleMobileView() {
      // Toggle reactive open state — template and CSS will handle UI changes
      this.open = !this.open;
    }

    closeMobileView() {
      this.open = false;
    }

    render() {
      return html`
        <div class="left-panel">
          <slot name="left"></slot>
        </div>
        <div class="splitter"></div>
        <div class="right-panel">
          <slot name="right"></slot>
        </div>
        <button
          @click="${this.toggleMobileView}"
          id="mobile-toggle"
          class="mobile-toggle btn btn-sm"
          aria-label="Toggle panel"
          aria-expanded="${this.open}"
        >
          <svg-icon
            icon="${this.open ? "x" : "list"}"
            width="24"
            height="24"
          ></svg-icon>
        </button>
        <div class="mobile-overlay" @click="${this.closeMobileView}"></div>
      `;
    }
  }
);
