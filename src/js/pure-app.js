import { AutoDesigner, pdsRegistry } from "./auto-designer.js";
import { html, LitElement, css, nothing } from "lit";
export { html, LitElement, css, nothing };
import { config } from "./config";
import { ask } from "./ask";
import "./svg-icon"

import { AutoDefiner } from "pure-web/auto-definer";

// Initialize the design system FIRST
const designer = new AutoDesigner(config.design);

// Register designer globally for component access (enables live mode)
pdsRegistry.setDesigner(designer);

// Make registry globally available for late-loaded components
if (typeof window !== 'undefined') {
  window.pdsRegistry = pdsRegistry;
}

// Apply the generated CSS to the document using BLOB URLs
AutoDesigner.applyStyles(designer);

// Export designer instance and registry for programmatic access
export { designer, pdsRegistry };

// Create AutoDefiner instance AFTER designer is initialized
const definer = new AutoDefiner(config.autoDefine);

// // Make definer globally available so it doesn't get garbage collected
// if (typeof window !== 'undefined') {
//   window.__pdsAutoDefiner = definer;
//   console.log('[AutoDefiner] Instance created and stored globally');
// }

// Pre-define critical components
//await AutoDefiner.define(["pds-toaster", "pds-jsonform"]);

export class PureApp extends HTMLElement {
  constructor() {
    super();
    this.init()
  }

  ensureToasterExists() {
    // Check if toaster already exists
    if (!document.querySelector("pds-toaster")) {
      const toaster = document.createElement("pds-toaster");
      document.body.appendChild(toaster);

      // Store reference for easy access
      this._toaster = toaster;
    } else {
      // Get existing toaster reference
      this._toaster = document.querySelector("pds-toaster");
    }
  }

  get toaster() {
    // Ensure toaster exists and return reference
    if (!this._toaster || !document.body.contains(this._toaster)) {
      this.ensureToasterExists();
    }
    return this._toaster;
  }

  async init(){
    
    // Automatically inject the toaster component into the document body
    this.ensureToasterExists();

    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = this.render();
  }

  render() {
    return /* html */ `<slot></slot>`;
  }

  // Expose the designer instance for runtime updates
  get designer() {
    return designer;
  }

  get definer(){
    return definer;
  }

  async ask() {
    return await ask(...arguments);
  }

  // Toast method - duration is auto-calculated based on message length
  toast(message, options = {}) {
    //if (this.toaster) {
      return this.toaster.toast(message, options);
    //}
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
