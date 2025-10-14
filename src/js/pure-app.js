import { AutoDefiner } from "pure-web/auto-definer";
import { AutoDesigner } from "./auto-designer.js";
import { html, LitElement, css } from "lit";
export { html, LitElement, css };
import { config } from "./config";
import { ask } from "./ask";
import "./auto-form";
import "./app-toaster";
import "./schema-form"

// // Initialize the design system
// const designer = new AutoDesigner(config.design);

// // Apply the generated CSS to the document
// // The host application controls when/how styles are applied
// AutoDesigner.applyStyles(designer.css);

// Export designer instance for programmatic access
//export { designer };

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

  // Toast delegation methods
  toast(message, type = "information", duration = null) {
    if (this.toaster) {
      return this.toaster.toast(message, { type, duration });
    }
  }

  success(message, duration) {
    return this.toast(message, "success", duration);
  }

  warning(message, duration) {
    return this.toast(message, "warning", duration);
  }

  error(message, duration) {
    return this.toast(message, "error", duration);
  }

  information(message, duration) {
    return this.toast(message, "information", duration);
  }

  // Legacy methods for backwards compatibility
  toastSuccess(message, options = {}) {
    return this.success(message, options.duration);
  }

  toastWarning(message, options = {}) {
    return this.warning(message, options.duration);
  }

  toastError(message, options = {}) {
    return this.error(message, options.duration);
  }

  toastInfo(message, options = {}) {
    return this.information(message, options.duration);
  }

  async configure() {
    try {
      // Create a container div to hold the auto-form
      const container = document.createElement('div');
      const autoForm = document.createElement('auto-form');
      autoForm.id = 'configForm';
      autoForm.config = config;
      container.appendChild(autoForm);

      const result = await this.ask(container, {
        title: "Design System Configuration",
        useForm: true,
        buttons: {
          ok: { name: "Apply Changes", default: true },
          cancel: { name: "Cancel", cancel: true },
        },
        rendered: (dialog) => {
          // Get reference to the AutoForm component
          const autoFormElement = dialog.querySelector("#configForm");
          const formElement = dialog.querySelector("form");

          // Intercept form submission to inject AutoForm values as hidden inputs
          const originalSubmit = formElement.addEventListener;
          formElement.addEventListener("submit", (event) => {
            // Get the AutoForm config and inject as hidden inputs
            const config = autoFormElement.getConfig();
            
            // Flatten the config structure for FormData
            const flattenConfig = (obj, prefix = '') => {
              const flattened = {};
              Object.entries(obj).forEach(([key, value]) => {
                const newKey = prefix ? `${prefix}.${key}` : key;
                if (value && typeof value === 'object' && !Array.isArray(value)) {
                  Object.assign(flattened, flattenConfig(value, newKey));
                } else {
                  flattened[newKey] = value;
                }
              });
              return flattened;
            };

            const flatConfig = flattenConfig(config);
            
            // Clear any existing hidden inputs
            formElement
              .querySelectorAll('input[type="hidden"]')
              .forEach((input) => input.remove());

            // Add hidden inputs for each config value
            Object.entries(flatConfig).forEach(([key, value]) => {
              const hiddenInput = document.createElement("input");
              hiddenInput.type = "hidden";
              hiddenInput.name = key;
              hiddenInput.value = value !== null && value !== undefined ? value : '';
              formElement.appendChild(hiddenInput);
            });
          }, { capture: true }); // Use capture to run before the ask() handler
        },
      });

      if (result) {
        debugger;
        // Convert FormData back to config structure
        const newConfig = { design: {} };
        
        for (const [key, value] of result.entries()) {
          // Parse the flattened key (e.g., "design.colors.primary" -> ["design", "colors", "primary"])
          const parts = key.split('.');
          let current = newConfig;
          
          for (let i = 0; i < parts.length - 1; i++) {
            if (!current[parts[i]]) {
              current[parts[i]] = {};
            }
            current = current[parts[i]];
          }
          
          // Set the value, converting numbers where appropriate
          const lastKey = parts[parts.length - 1];
          current[lastKey] = value === '' ? null : (isNaN(value) ? value : Number(value));
        }
        
        return this.applyConfiguration(newConfig);
      }
    } catch (error) {
      console.error("Configuration cancelled or failed:", error);
      return null;
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
