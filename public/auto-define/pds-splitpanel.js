import { LitElement, html, css } from "/assets/js/lit.js";
import { adoptLayers } from "/assets/js/app.js";

customElements.define("pds-splitpanel", class extends LitElement {
  static properties = {
    layout: { type: String },
    defaultSplit: { type: String },
    breakpoint: { type: Number },
  };

  constructor() {
    super();
    this.layout = "horizontal";
    this.defaultSplit = "450px";
    this.breakpoint = 1024;
    this.isDragging = false;
  }

  static styles = [
    
    css`
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

    .mobile-toggle {
      display: none;
      position: fixed;
      top: var(--spacing-4);
      right: var(--spacing-4);
      z-index: 1001;
      padding: var(--spacing-3);
      background: var(--color-surface-base);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      cursor: pointer;
      box-shadow: var(--shadow-md);
      transition: all var(--transition-fast);
      color: var(--color-text-primary);
    }

    .mobile-toggle:hover {
      background: var(--color-surface-hover);
      box-shadow: var(--shadow-lg);
    }

    .mobile-toggle:active {
      transform: scale(0.95);
    }

    .mobile-overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1000;
    }

    :host([mobile]) .mobile-toggle {
      display: block;
    }
  `];

  firstUpdated() {
    this.leftPanel = this.querySelector('[slot="left"]');
    this.rightPanel = this.querySelector('[slot="right"]');
    this.splitter = this.shadowRoot.querySelector(".splitter");
    this.mobileToggle = this.shadowRoot.getElementById("mobile-toggle");

    //this.mobileOverlay = this.shadowRoot.querySelector(".mobile-overlay");

    this.updateLayout();

    window.addEventListener("resize", () => this.updateLayout());

    this.splitter.addEventListener("mousedown", (e) => this.startDragging(e));
    document.addEventListener("mousemove", (e) => this.drag(e));
    document.addEventListener("mouseup", () => this.stopDragging());
  }

  updateLayout() {
    const isMobile = window.innerWidth < this.breakpoint;
    this.toggleAttribute("mobile", isMobile);

    if (isMobile) {
      this.leftPanel.style.display = "none"; // Ensure left panel is hidden below breakpoint
      this.leftPanel.style.transform = "";
      this.leftPanel.style.transition = "";
      this.leftPanel.style.position = "";
      this.leftPanel.style.top = "";
      this.leftPanel.style.left = "";
      this.leftPanel.style.height = "";
      this.leftPanel.style.width = "";
      this.splitter.style.display = "none"; // Hide splitter below breakpoint
      this.rightPanel.style.flex = "";
      this.rightPanel.style.display = "block";
    } else {
      this.leftPanel.style.display = "block"; // Restore left panel visibility above breakpoint
      this.leftPanel.style.transform = "none";
      this.leftPanel.style.transition = "";
      this.leftPanel.style.position = "";
      this.leftPanel.style.top = "";
      this.leftPanel.style.left = "";
      this.leftPanel.style.height = "";
      this.leftPanel.style.width = this.defaultSplit;
      this.splitter.style.display = "block"; // Show splitter above breakpoint
      this.rightPanel.style.flex = `1 1 calc(100% - ${this.defaultSplit})`;
      this.rightPanel.style.display = "flex";
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
      this.leftPanel.style.width = `${newSize}px`;
      this.rightPanel.style.flex = `1 1 calc(100% - ${newSize}px)`;
    } else {
      this.leftPanel.style.height = `${newSize}px`;
      this.rightPanel.style.flex = `1 1 calc(100% - ${newSize}px)`;
    }
  }

  stopDragging() {
    if (!this.isDragging) return;
    this.isDragging = false;
    document.body.style.cursor = "";
  }

  toggleMobileView() {
    const isOpen = this.hasAttribute("left-open");

    if (isOpen) {
      this.removeAttribute("left-open");
      this.leftPanel.style.transform = "translateX(-100%)"; // Slide out
      this.leftPanel.style.transition =
        "transform var(--transition-fast) ease-in-out"; // Ensure transition
      setTimeout(() => {
        this.leftPanel.style.display = "none"; // Hide after transition
      }, 300); // Match transition duration
      this.splitter.style.display = "none"; // Ensure splitter is hidden
      this.mobileToggle.innerHTML = `<svg-icon name="list" width="24" height="24" ></svg-icon>`; // Restore menu icon
    } else {
      this.setAttribute("left-open", "true");
      this.leftPanel.style.display = "block"; // Ensure visibility
      setTimeout(() => {
        this.leftPanel.style.transform = "translateX(0)"; // Slide in
        this.leftPanel.style.transition =
          "transform var(--transition-fast) ease-in-out"; // Ensure transition
      }, 10); // Delay to ensure display:block is applied
      this.leftPanel.style.position = "fixed"; // Ensure fixed positioning
      this.leftPanel.style.top = "0";
      this.leftPanel.style.left = "0";
      this.leftPanel.style.height = "100%";
      this.leftPanel.style.width = "100%"; // Full screen
      this.splitter.style.display = "none"; // Ensure splitter is hidden
      this.mobileToggle.innerHTML = `<svg-icon name="x" width="24" height="24" ></svg-icon>`; // Show close icon
    }
  }

  closeMobileView() {
    this.leftPanel.style.transform = "translateX(-100%)";
    this.mobileOverlay.style.display = "none";
    this.rightPanel.style.display = "block";
  }

  render() {
    return html`
      <slot name="left"></slot>
      <div class="splitter"></div>
      <slot name="right"></slot>
      <button
        @click="${this.toggleMobileView}"
        id="mobile-toggle"
        class="mobile-toggle"
        aria-label="Toggle panel"
      >
        <svg-icon name="list" width="24" height="24"></svg-icon>
      </button>
      <div class="mobile-overlay"></div>
    `;
  }
})
