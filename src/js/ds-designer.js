import { LitElement, html, nothing } from "./lit";
import { config } from "./config";
import { AutoDesigner } from "./auto-designer";
import "./svg-icon";
import { deepMerge } from "./common";

const STORAGE_KEY = "pure-ds-config";

function toast(message, options = {}) {
  document.querySelector("pure-app").toast(message, options);
}

export class DsDesigner extends LitElement {
  #tmr;
  
  static properties = {
    config: { type: Object, state: true },
    schema: { type: Object, state: true },
    mode: { type: String },
  };

  createRenderRoot() {
    return this; // Disable shadow DOM
  }

  
  connectedCallback() {
    super.connectedCallback();

    this.mode = "simple";

    this.config = this.loadConfig();

    this.updateForm();
  }

  updateForm() {
    this.schema = null; // Reset schema to show loading state
    fetch(`/assets/data/auto-design-${this.mode}.json`)
      .then((response) => response.json())
      .then((data) => {
        this.schema = data;
      });
  }

  loadConfig() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Merge with defaults to ensure all properties exist
        return deepMerge(config.design, parsed);
      } catch (e) {
        console.warn("Failed to parse stored config, using defaults", e);
      }
    }
    return JSON.parse(JSON.stringify(config.design)); // Deep clone
  }

  saveConfig() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.config));
  }

  updated(changedProps) {
    if (changedProps.has("schema")) {
      this.applyStyles();
    }
  }

  applyStyles() {
    this.designer = new AutoDesigner(this.config);
    AutoDesigner.applyStyles(this.designer);

    clearTimeout(this.#tmr);
    this.#tmr = setTimeout(() => {
      this.dispatchEvent(
        new CustomEvent("design-updated", {
          bubbles: true,
          detail: { config: this.config, designer: this.designer },
        })
      );
    }, 500);
    // Dispatch event for showcase to update
  }

  // Flatten nested config to dot-notation for pds-jsonform
  flattenConfig(obj, prefix = "") {
    const flattened = {};
    for (const [key, value] of Object.entries(obj)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      if (value && typeof value === "object" && !Array.isArray(value)) {
        Object.assign(flattened, this.flattenConfig(value, newKey));
      } else {
        flattened[newKey] = value;
      }
    }
    return flattened;
  }

  handleFormChange = (event) => {
    // Get values from the pds-jsonform's serialize method or from event detail
    let values;
    let changedField = null;

    // Capture which field changed for smart scrolling
    if (event.type === "pw:value-change" && event.detail) {
      changedField = event.detail.name;
    }

    if (event.detail && event.detail.json) {
      // pw:serialize event provides { json, formData, valid, issues }
      values = event.detail.json;
    } else {
      // Fallback: get values directly from the form element
      const form = event.target.closest("pds-jsonform") || event.target;
      if (form && form.values) {
        values = form.values;
      } else {
        console.warn("No values found in form change event", event);
        return;
      }
    }

    console.log("Form values received:", values);

    // Convert flattened dot-notation to nested structure
    // e.g., { "colors.primary": "#123" } => { colors: { primary: "#123" } }
    const nestedValues = {};
    for (const [key, value] of Object.entries(values)) {
      if (key.includes(".")) {
        const parts = key.split(".");
        let current = nestedValues;
        for (let i = 0; i < parts.length - 1; i++) {
          if (!current[parts[i]]) current[parts[i]] = {};
          current = current[parts[i]];
        }
        current[parts[parts.length - 1]] = value;
      } else {
        nestedValues[key] = value;
      }
    }

    console.log("Nested values:", nestedValues);

    // Deep merge the nested values into config
    this.config = deepMerge(this.config, nestedValues);
    console.log("Updated config:", this.config);
    //this.schema = designToSchema(this.config);

    this.saveConfig();
    this.applyStyles();

    // Emit event for showcase to scroll to relevant section
    if (changedField) {
      console.log(
        "🔔 Emitting design-field-changed event for field:",
        changedField
      );
      this.dispatchEvent(
        new CustomEvent("design-field-changed", {
          bubbles: true,
          composed: true,
          detail: {
            field: changedField,
            config: this.config,
          },
        })
      );
    }
  };

  handleReset = () => {
    if (
      confirm(
        "Reset to default configuration? This will clear your saved settings."
      )
    ) {
      localStorage.removeItem(STORAGE_KEY);
      this.config = JSON.parse(JSON.stringify(config.design));
      //this.schema = designToSchema(this.config);
      this.saveConfig();
      this.applyStyles();
    }
  };

  handleDownload = (format) => {
    debugger;
    let content, filename, mimeType;

    switch (format) {
      case "css":
        content = this.designer.css;
        filename = "pure-ds.css";
        mimeType = "text/css";
        break;

      case "config":
        content = `// Pure Design System Configuration
// Generated: ${new Date().toISOString()}

import { AutoDesigner } from './auto-designer.js';

export const autoDesignerConfig = ${JSON.stringify(this.config, null, 2)};
`;
        filename = "auto-designer.config.js";
        mimeType = "text/javascript";
        break;

      case "tokens":
        const tokens = this.designer.generateColorTokens(this.config.colors);
        content = JSON.stringify(tokens, null, 2);
        filename = "design-tokens.json";
        mimeType = "application/json";
        break;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  render() {
    
    if (!this.schema) {
      setTimeout(() => {
        toast("Loading schema...", { duration: 1000 });
      }, 500); 
      return nothing;
    }
    return html`
      <div class="designer-container">
        <label data-toggle id="mode-toggle">
          <input
            type="checkbox"
            .checked=${this.mode === "advanced"}
            @change=${(e) => {
              this.mode = e.target.checked ? "advanced" : "simple";
              this.updateForm();
            }}
          /><span
            >${this.mode === "advanced"
              ? "Switch to Basic Mode"
              : "Switch to Advanced Mode"}</span
          >
        </label>

        <div class="designer-form-container">
          <pds-jsonform
            .jsonSchema=${this.schema}
            .values=${this.flattenConfig(this.config)}
            hide-reset
            hide-submit
            @pw:value-change=${this.handleFormChange}
            @pw:serialize=${this.handleFormChange}
            @change=${this.handleFormChange}
            @input=${this.handleFormChange}
          >
          </pds-jsonform>
        </div>

        <div class="designer-actions">
          <button
            @click=${this.handleReset}
            class="btn-secondary"
            style="width: 100%;"
          >
            <svg-icon icon="arrow-counter-clockwise" size="sm"></svg-icon>
            <span>Reset to Defaults</span>
          </button>

          <nav data-dropdown>
            <button class="btn-primary" style="width: 100%;">
              <svg-icon icon="download" size="sm"></svg-icon>
              <span>Download</span>
              <svg-icon icon="caret-down" size="sm"></svg-icon>
            </button>

            <menu>
              <li>
                <a
                  href="#"
                  @click=${(e) => {
                    e.preventDefault();
                    this.handleDownload("css");
                  }}
                >
                  <svg-icon icon="file-css" size="sm"></svg-icon>
                  <span>CSS File</span>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  @click=${(e) => {
                    e.preventDefault();
                    this.handleDownload("config");
                  }}
                >
                  <svg-icon icon="file-js" size="sm"></svg-icon>
                  <span>Config File</span>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  @click=${(e) => {
                    e.preventDefault();
                    this.handleDownload("tokens");
                  }}
                >
                  <svg-icon icon="brackets-curly" size="sm"></svg-icon>
                  <span>Design Tokens (JSON)</span>
                </a>
              </li>
            </menu>
          </nav>
        </div>
      </div>
    `;
  }
}

customElements.define("ds-designer", DsDesigner);
