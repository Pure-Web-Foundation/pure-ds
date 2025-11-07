customElements.define(
  "pds-splitpanel",
  class extends HTMLElement {
    static get observedAttributes() {
      return ["layout", "defaultsplit", "breakpoint", "open"];
    }

    constructor() {
      super();
      this.attachShadow({ mode: "open" });

      // Defaults
      this._layout = "horizontal";
      this._defaultSplit = "450px";
      this._breakpoint = 1024;
      this._open = this.hasAttribute("open");
      this.isDragging = false;

      // Bound handlers for add/remove
      this._onResize = () => this.updateLayout();
      this._onMouseMove = (e) => this.drag(e);
      this._onMouseUp = () => this.stopDragging();

      this._render();
    }

    connectedCallback() {
      // Ensure defaults reflected if attributes missing
      if (!this.hasAttribute("layout")) this.setAttribute("layout", this._layout);
      if (!this.hasAttribute("defaultsplit")) this.setAttribute("defaultsplit", this._defaultSplit);
      if (!this.hasAttribute("breakpoint")) this.setAttribute("breakpoint", String(this._breakpoint));
      if (this._open) this.setAttribute("open", "");

      // Adopt primitives + component stylesheet (fallback to <style> if PDS not present)
      this._adoptStyles();

      // Cache references
      this.$leftWrap = this.shadowRoot.querySelector(".left-panel");
      this.$rightWrap = this.shadowRoot.querySelector(".right-panel");
      this.$splitter = this.shadowRoot.querySelector(".splitter");
      this.$toggleBtn = this.shadowRoot.getElementById("mobile-toggle");
      this.$overlay = this.shadowRoot.querySelector(".mobile-overlay");
      this.$icon = this.shadowRoot.querySelector("pds-icon");

      // Wire events
      window.addEventListener("resize", this._onResize);
      if (this.$splitter) this.$splitter.addEventListener("mousedown", (e) => this.startDragging(e));
      document.addEventListener("mousemove", this._onMouseMove);
      document.addEventListener("mouseup", this._onMouseUp);
      if (this.$toggleBtn) this.$toggleBtn.addEventListener("click", () => this.toggleMobileView());
      if (this.$overlay) this.$overlay.addEventListener("click", () => this.closeMobileView());

      // Initial layout
      this.updateLayout();
      this._updateToggleButton();
    }

    disconnectedCallback() {
      window.removeEventListener("resize", this._onResize);
      document.removeEventListener("mousemove", this._onMouseMove);
      document.removeEventListener("mouseup", this._onMouseUp);
      if (this.$splitter) this.$splitter.removeEventListener("mousedown", (e) => this.startDragging(e));
      if (this.$toggleBtn) this.$toggleBtn.removeEventListener("click", () => this.toggleMobileView());
      if (this.$overlay) this.$overlay.removeEventListener("click", () => this.closeMobileView());
    }

    attributeChangedCallback(name, _oldVal, newVal) {
      switch (name) {
        case "layout":
          this._layout = (newVal || "horizontal").toLowerCase();
          this.updateLayout();
          break;
        case "defaultsplit":
          this._defaultSplit = newVal || "450px";
          this.updateLayout();
          break;
        case "breakpoint":
          this._breakpoint = Number(newVal) || 1024;
          this.updateLayout();
          break;
        case "open":
          this._open = this.hasAttribute("open");
          this._updateToggleButton();
          break;
      }
    }

    // Properties
    get layout() {
      return this._layout;
    }
    set layout(v) {
      this.setAttribute("layout", v);
    }

    get defaultSplit() {
      return this._defaultSplit;
    }
    set defaultSplit(v) {
      this.setAttribute("defaultsplit", v);
    }

    get breakpoint() {
      return this._breakpoint;
    }
    set breakpoint(v) {
      this.setAttribute("breakpoint", String(v));
    }

    get open() {
      return this._open;
    }
    set open(v) {
      if (Boolean(v)) {
        if (!this.hasAttribute("open")) this.setAttribute("open", "");
      } else {
        if (this.hasAttribute("open")) this.removeAttribute("open");
      }
    }

    // Rendering
    _render() {
      this.shadowRoot.innerHTML = `
        <div class="left-panel">
          <slot name="left"></slot>
        </div>
        <div class="splitter"></div>
        <div class="right-panel">
          <slot name="right"></slot>
        </div>
        <button
          id="mobile-toggle"
          class="mobile-toggle btn btn-sm"
          aria-label="Toggle panel"
          aria-expanded="${this._open ? "true" : "false"}"
        >
          <pds-icon icon="${this._open ? "x" : "list"}" width="24" height="24"></pds-icon>
        </button>
        <div class="mobile-overlay"></div>
      `;
    }

    async _adoptStyles() {
      const cssText = `
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

      .left-panel,
      .right-panel {
        display: block;
        min-width: 0;
      }

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

      :host([mobile]) .left-panel {
        display: none;
      }

      :host([mobile]) .right-panel {
        flex: 1 1 100%;
        width: 100%;
      }

      :host([mobile][open]) .left-panel {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        background: var(--color-surface-base);
      }

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

      .mobile-overlay {
        display: none;
      }

      :host([mobile][open]) .mobile-overlay {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 999;
      }

      .mobile-toggle.btn {
        padding: var(--spacing-1, 4px) var(--spacing-2, 6px);
      }

      .mobile-toggle.btn-sm {
        padding: var(--spacing-1, 4px);
      }
      `;

      // Prefer PDS layers if available
      try {
        if (window.PDS && typeof PDS.createStylesheet === "function" && typeof PDS.adoptLayers === "function") {
          const componentStyles = PDS.createStylesheet(cssText);
          await PDS.adoptLayers(this.shadowRoot, ["primitives", "components"], [componentStyles]);
          return;
        }
      } catch (e) {
        console.error("pds-splitpanel: adoptLayers failed", e);
      }

      // Fallback: inject <style> into shadow root
      const style = document.createElement("style");
      style.textContent = cssText;
      this.shadowRoot.prepend(style);
    }

    updateLayout() {
      const isMobile = window.innerWidth < this._breakpoint;
      this.toggleAttribute("mobile", isMobile);

      if (isMobile) {
        if (!this.hasAttribute("open")) this._open = false;
        if (this.$splitter) this.$splitter.style.display = "none";
        if (this.$rightWrap) this.$rightWrap.style.display = "block";
        this.style.removeProperty("--left-width");
        if (this.$leftWrap) this.$leftWrap.style.height = "";
        if (this.$rightWrap) this.$rightWrap.style.flex = "1 1 auto";
      } else {
        if (this.$splitter) this.$splitter.style.display = "block";
        this.style.setProperty("--left-width", this._defaultSplit);
        if (this.$rightWrap)
          this.$rightWrap.style.flex = `1 1 calc(100% - ${this._defaultSplit})`;
        if (this._layout === "vertical") {
          // For vertical layout, width var isn't used; ensure panels reset
          if (this.$leftWrap) this.$leftWrap.style.height = "";
          if (this.$rightWrap) this.$rightWrap.style.flex = "1 1 auto";
        }
      }
      this._updateToggleButton();
    }

    startDragging(event) {
      if (this.hasAttribute("mobile")) return;
      this.isDragging = true;
      document.body.style.cursor =
        this._layout === "horizontal" ? "col-resize" : "row-resize";
      event.preventDefault();
    }

    drag(event) {
      if (!this.isDragging) return;

      const newSize =
        this._layout === "horizontal"
          ? Math.max(200, Math.min(event.clientX, window.innerWidth - 200))
          : Math.max(200, Math.min(event.clientY, window.innerHeight - 200));

      if (this._layout === "horizontal") {
        this.style.setProperty("--left-width", `${newSize}px`);
        if (this.$rightWrap)
          this.$rightWrap.style.flex = `1 1 calc(100% - ${newSize}px)`;
      } else {
        if (this.$leftWrap) this.$leftWrap.style.height = `${newSize}px`;
        if (this.$rightWrap)
          this.$rightWrap.style.flex = `1 1 calc(100% - ${newSize}px)`;
      }
    }

    stopDragging() {
      if (!this.isDragging) return;
      this.isDragging = false;
      document.body.style.cursor = "";
    }

    toggleMobileView() {
      this.open = !this._open;
    }

    closeMobileView() {
      this.open = false;
    }

    _updateToggleButton() {
      if (!this.$toggleBtn || !this.$icon) return;
      this.$toggleBtn.setAttribute("aria-expanded", this._open ? "true" : "false");
      this.$icon.setAttribute("icon", this._open ? "x" : "list");
    }
  }
);