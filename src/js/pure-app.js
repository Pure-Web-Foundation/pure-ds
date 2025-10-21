import { AutoDesigner, pdsRegistry } from "./auto-designer";
import { html, LitElement, css, nothing } from "lit";
export { html, LitElement, css, nothing };
import { config } from "./config";
import { ask } from "./ask";
import "./svg-icon";

import { AutoDefiner } from "pure-web/auto-definer";

// Initialize the design system FIRST
const designer = new AutoDesigner(config.design);

// Register designer globally for component access (enables live mode)
pdsRegistry.setDesigner(designer);

// Make registry globally available for late-loaded components
if (typeof window !== "undefined") {
  window.pdsRegistry = pdsRegistry;
}

// Apply the generated CSS to the document using BLOB URLs
AutoDesigner.applyStyles(designer);

// Export designer instance and registry for programmatic access
export { designer, pdsRegistry };

// Create AutoDefiner instance AFTER designer is initialized
const definer = new AutoDefiner(config.autoDefine);

// Pre-define critical components
await AutoDefiner.define(["pds-toaster", "pds-jsonform"]);

export class PureApp extends HTMLElement {
  constructor() {
    super();
    this.init();
  }

  get toaster() {
    return document.querySelector("pds-toaster");
  }

  async init() {
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = this.render();

    const toaster = document.createElement("pds-toaster");
    document.body.appendChild(toaster);
  }

  render() {
    return /* html */ `<slot></slot>`;
  }

  // Expose the designer instance for runtime updates
  get designer() {
    return designer;
  }

  get definer() {
    return definer;
  }

  async ask() {
    return await ask(...arguments);
  }

  // Toast method - duration is auto-calculated based on message length
  toast(message, options = {}) {
    return this.toaster.toast(message, options);
  }

  // Event handlers for AutoForm
  handleConfigSubmit = (event) => {
    return event.detail.values;
  };

  handleConfigCancel = () => {
    return null;
  };

  // Get current configuration
  get config() {
    return {
      design: { ...config.design },
      autoDefine: { ...config.autoDefine },
    };
  }
}

customElements.define("pure-app", PureApp);
