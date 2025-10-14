import { AutoDefiner } from "pure-web/auto-definer";
import { AutoDesigner } from "./auto-designer.js";
import { html, LitElement, css } from "lit";
export { html, LitElement, css };
import { config } from "./config";
import { ask } from "./ask";
import "./auto-form";
import "./app-toaster";
import "./schema-form";
import "./svg-icon"

// Initialize the design system
const designer = new AutoDesigner(config.design);

// Apply the generated CSS to the document
// The host application controls when/how styles are applied
AutoDesigner.applyStyles(designer.css);

// Export designer instance for programmatic access
export { designer };

// Create a single AutoDefiner instance for the whole application
// This prevents multiple instances from applying the same enhancers
const definer = new AutoDefiner(config.autoDefine);

export class PureApp extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this.render();

    // Automatically inject the toaster component into the document body
    this.ensureToasterExists();
  }

  ensureToasterExists() {
    // Check if toaster already exists
    if (!document.querySelector("app-toaster")) {
      const toaster = document.createElement("app-toaster");
      document.body.appendChild(toaster);

      // Store reference for easy access
      this._toaster = toaster;
    } else {
      // Get existing toaster reference
      this._toaster = document.querySelector("app-toaster");
    }
  }

  get toaster() {
    // Ensure toaster exists and return reference
    if (!this._toaster || !document.body.contains(this._toaster)) {
      this.ensureToasterExists();
    }
    return this._toaster;
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
    if (this.toaster) {
      return this.toaster.toast(message, options);
    }
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
