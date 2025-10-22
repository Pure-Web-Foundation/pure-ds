import { LitElement, html, nothing } from "./lit";
import { config } from "./config";
import { AutoDesigner } from "./auto-designer";
import "./svg-icon";
import { deepMerge } from "./common";

const STORAGE_KEY = "pure-ds-config";

function toast(message, options = {}) {
  document.querySelector("pure-app").toast(message, options);
}

async function ask(message, options = {}) {
  return await document.querySelector("pure-app").ask(...arguments);
}

export class DsDesigner extends LitElement {
  #tmr;
  
  static properties = {
    config: { type: Object, state: true },
    schema: { type: Object, state: true },
    mode: { type: String },
    inspectorMode: { type: Boolean, state: true },
  };

  createRenderRoot() {
    return this; // Disable shadow DOM
  }

  
  connectedCallback() {
    super.connectedCallback();

    this.mode = "simple";
    this.inspectorMode = false;

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

  toggleInspectorMode() {
    this.inspectorMode = !this.inspectorMode;
    
    // Dispatch event to notify showcase
    this.dispatchEvent(
      new CustomEvent("inspector-mode-changed", {
        bubbles: true,
        composed: true,
        detail: { active: this.inspectorMode },
      })
    );

    toast(
      this.inspectorMode 
        ? "Code Inspector active - click any element in the showcase to view its code" 
        : "Code Inspector deactivated",
      { type: "info", duration: 3000 }
    );
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
      ask(
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
        <div class="designer-toolbar">
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

          <button
            class="inspector-toggle ${this.inspectorMode ? "active" : ""}"
            @click=${this.toggleInspectorMode}
            title="${this.inspectorMode ? "Deactivate" : "Activate"} Code Inspector"
          >
            <svg-icon 
              icon="${this.inspectorMode ? "eye-slash" : "code"}" 
              size="sm"
            ></svg-icon>
            <span>${this.inspectorMode ? "Inspector Active" : "Code Inspector"}</span>
          </button>
        </div>

        <div class="designer-form-container">
          <pds-jsonform
            .jsonSchema=${this.schema}
            .uiSchema=${this._designerUiSchema()}
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

  // Provide a uiSchema to customize widgets for designer UX (datalists for fonts, ranges for numeric values)
  _designerUiSchema() {
    // Common font-family suggestions (similar to dev console suggestions)
    const fontSuggestions = [
      "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      "Roboto, 'Helvetica Neue', Arial, sans-serif",
      "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
      "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    ];

    // UI schema (paths use the pds-jsonform path notation, e.g. /typography/fontFamilyHeadings)
    const ui = {};

    // Font family fields: use datalist via ui.datalist
    ui["/typography/fontFamilyHeadings"] = { "ui:datalist": fontSuggestions };
    ui["/typography/fontFamilyBody"] = { "ui:datalist": fontSuggestions };
    ui["/typography/fontFamilyMono"] = { "ui:datalist": [
      "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace",
      "Consolas, 'Liberation Mono', Menlo, monospace",
      "'Fira Code', 'Cascadia Code', 'Source Code Pro', monospace"
    ] };

    // Numeric fields that are better as ranges (baseFontSize, baseUnit, etc.)
    ui["/typography/baseFontSize"] = { "ui:widget": "input-range", "ui:min": 8, "ui:max": 32 };
    ui["/spatialRhythm/baseUnit"] = { "ui:widget": "input-range", "ui:min": 4, "ui:max": 48 };

    // Add any other numeric fields you'd like to surface as ranges
    ui["/spatialRhythm/containerPadding"] = { "ui:widget": "input-range", "ui:min": 0, "ui:max": 4 };

    return ui;
  }
}

customElements.define("ds-designer", DsDesigner);
