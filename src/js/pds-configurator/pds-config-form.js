import { LitElement, html, nothing } from "../lit";
import { config } from "../config";
import { PDS } from "../pds";
//import { Generator } from "../pds-core/pds-generator";
import "../svg-icon";
import { deepMerge } from "../common/common";

const STORAGE_KEY = "pure-ds-config";

function toast(message, options = {}) {
  document.querySelector("pure-app").toast(message, options);
}

async function ask(message, options = {}) {
  return await document.querySelector("pure-app").ask(...arguments);
}

customElements.define(
  "pds-config-form",
  class extends LitElement {
    #tmr;
    #lastDesignEmit = 0;
    #scheduledDesignEmit = null;
    #scheduledApply = null;
    #designEmitDelay = 500; // ms throttle

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

      // Initialize document theme attribute: prefer localStorage, otherwise use OS preference
      try {
        const storedTheme = localStorage.getItem("pure-ds-theme");
        if (storedTheme) {
          if (storedTheme === "system") {
            // Resolve system to an explicit value so the attribute is always 'light' or 'dark'
            const prefersDark =
              typeof window !== "undefined" &&
              window.matchMedia &&
              window.matchMedia("(prefers-color-scheme: dark)").matches;
            document.documentElement.setAttribute(
              "data-theme",
              prefersDark ? "dark" : "light"
            );
          } else {
            document.documentElement.setAttribute("data-theme", storedTheme);
          }
        } else {
          // No stored preference — choose from OS preference and do not persist
          const prefersDark =
            typeof window !== "undefined" &&
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches;
          document.documentElement.setAttribute(
            "data-theme",
            prefersDark ? "dark" : "light"
          );
        }
      } catch (ex) {
        /* ignore if document not available or other errors */
      }

      this.updateForm();
      // Apply host-level CSS variable overrides from the default design config
      // so the designer UI doesn't visually change when user edits are applied
      // elsewhere (these variables remain fixed for the designer element).
      this.applyDefaultHostVariables();
    }

    /**
     * Apply CSS custom properties to the designer host derived from
     * Generator.defaultConfig. This locks spacing and typography
     * variables for the designer's UI so they don't change during form edits.
     */
    applyDefaultHostVariables() {
      try {
        const baseConfig = structuredClone(PDS.defaultConfig);
        const tmpDesigner = new PDS.Generator(baseConfig);

        // Spacing tokens (keys are numeric strings 1..N)
        const spacing = tmpDesigner.generateSpacingTokens(
          baseConfig.spatialRhythm || {}
        );
        Object.entries(spacing).forEach(([key, val]) => {
          try {
            this.style.setProperty(`--spacing-${key}`, val);
          } catch (e) {
            /* ignore per-property failures */
          }
        });

        // Also expose base unit explicitly (px) so consumers can read it directly
        const baseUnitValue =
          (baseConfig.spatialRhythm && baseConfig.spatialRhythm.baseUnit) || 16;
        this.style.setProperty("--base-unit", `${baseUnitValue}px`);

        // Typography tokens
        const typography = tmpDesigner.generateTypographyTokens(
          baseConfig.typography || {}
        );
        if (typography.fontSize) {
          Object.entries(typography.fontSize).forEach(([k, v]) => {
            this.style.setProperty(`--font-size-${k}`, v);
          });
        }
        // Also expose the numeric baseFontSize explicitly
        const baseFontSizeValue =
          (baseConfig.typography && baseConfig.typography.baseFontSize) || 16;
        this.style.setProperty("--base-font-size", `${baseFontSizeValue}px`);
        if (typography.fontFamily) {
          Object.entries(typography.fontFamily).forEach(([k, v]) => {
            this.style.setProperty(`--font-family-${k}`, v);
          });
        }
        if (typography.lineHeight) {
          Object.entries(typography.lineHeight).forEach(([k, v]) => {
            this.style.setProperty(`--font-lineHeight-${k}`, v);
          });
        }

        console.debug("pds-config-form: applied default host CSS variables");
      } catch (ex) {
        console.warn(
          "pds-config-form: failed to apply default host variables",
          ex
        );
      }
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

    applyStyles(useUserConfig = false) {
      // By default, use Generator.defaultConfig (non-designer callers)
      // If useUserConfig is true (pds-config-form wants to apply user edits),
      // merge the persisted user config into the default to generate runtime styles.
      let baseConfig = structuredClone(PDS.defaultConfig);

      if (useUserConfig && this.config) {
        // Deep-merge user edits on top of defaults to ensure all keys exist
        baseConfig = deepMerge(baseConfig, this.config);
      }

      // Pass explicit theme option (from dedicated localStorage) separately so
      // configs remain theme-agnostic while Generator can emit the correct
      // scoping (html[data-theme] vs prefers-color-scheme).
      let storedTheme = null;
      try {
        storedTheme = (typeof window !== 'undefined' && localStorage.getItem('pure-ds-theme')) || null;
      } catch (ex) {
        storedTheme = null;
      }

      const generatorOptions = structuredClone(baseConfig);
      if (storedTheme) generatorOptions.theme = storedTheme;

      this.designer = new PDS.Generator(generatorOptions);
      PDS.Generator.applyStyles(this.designer);

      // Ensure document html[data-theme] respects persisted theme if present.
      // Priority: localStorage 'pure-ds-theme' > leave existing attribute (set at startup from OS preference).
      try {
        const storedTheme = localStorage.getItem("pure-ds-theme");
        if (storedTheme) {
          // Honor stored preference (system/light/dark)
          if (storedTheme === "system") {
            const prefersDark =
              typeof window !== "undefined" &&
              window.matchMedia &&
              window.matchMedia("(prefers-color-scheme: dark)").matches;
            document.documentElement.setAttribute(
              "data-theme",
              prefersDark ? "dark" : "light"
            );
          } else {
            document.documentElement.setAttribute("data-theme", storedTheme);
          }
        }
        // No else needed: if no stored theme, leave the current attribute (set at startup from OS preference)
      } catch (ex) {
        /* ignore in non-browser environments */
      }

      // Emit design-updated in a throttled manner with the actual designer
      this.scheduleDesignUpdatedEmit({
        config: baseConfig,
        designer: this.designer,
      });
    }

    /**
     * Centralized throttled emitter for the `design-updated` event.
     * Accepts an object with { config, designer } to include in the event detail.
     */
    scheduleDesignUpdatedEmit(detail) {
      const now = Date.now();

      const emitNow = () => {
        this.#lastDesignEmit = Date.now();
        // Clear any scheduled timer
        if (this.#scheduledDesignEmit) {
          clearTimeout(this.#scheduledDesignEmit);
          this.#scheduledDesignEmit = null;
        }

        this.dispatchEvent(
          new CustomEvent("design-updated", {
            bubbles: true,
            composed: true,
            detail,
          })
        );
      };

      if (now - this.#lastDesignEmit >= this.#designEmitDelay) {
        // Enough time has passed — emit immediately
        emitNow();
        return;
      }

      // Otherwise schedule a trailing emit (only one scheduled at a time)
      if (!this.#scheduledDesignEmit) {
        const delay = this.#designEmitDelay - (now - this.#lastDesignEmit);
        this.#scheduledDesignEmit = setTimeout(() => {
          this.#scheduledDesignEmit = null;
          emitNow();
        }, delay);
      }
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

      // Convert flattened dot-notation or JSON-pointer keys to nested structure
      // e.g., { "colors.primary": "#123" } => { colors: { primary: "#123" } }
      // and { "/colors/primary": "#123" } => { colors: { primary: "#123" } }
      const nestedValues = {};
      const unescapePointer = (seg) => seg.replace(/~1/g, "/").replace(/~0/g, "~");

      for (const [key, value] of Object.entries(values)) {
        if (!key) continue;

        if (key.startsWith("/")) {
          // JSON Pointer style
          const raw = key.replace(/^\//, "");
          const parts = raw.split("/").map(unescapePointer);
          let current = nestedValues;
          for (let i = 0; i < parts.length - 1; i++) {
            const p = parts[i];
            if (!current[p] || typeof current[p] !== "object") current[p] = {};
            current = current[p];
          }
          current[parts[parts.length - 1]] = value;
        } else if (key.includes(".")) {
          const parts = key.split(".");
          let current = nestedValues;
          for (let i = 0; i < parts.length - 1; i++) {
            if (!current[parts[i]] || typeof current[parts[i]] !== "object") current[parts[i]] = {};
            current = current[parts[i]];
          }
          current[parts[parts.length - 1]] = value;
        } else {
          nestedValues[key] = value;
        }
      }

      console.log("Nested values:", nestedValues);

      // Deep merge the nested values into config
      // Persist user changes locally, but do NOT apply them to the runtime designer
      // (pds-config-form should use defaultConfig for styling)
      this.config = deepMerge(this.config, nestedValues);

      console.log("Updated (persisted) config (not applied):", this.config);
      this.saveConfig();

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
      // Debounce applying styles using the user-edited config so the showcase
      // receives the actual runtime CSS generated from user edits. We still
      // persist immediately, but only apply (and emit) the styles at most once
      // per #designEmitDelay to avoid excessive recalculation.
      try {
        if (this.#scheduledApply) {
          clearTimeout(this.#scheduledApply);
          this.#scheduledApply = null;
        }
        this.#scheduledApply = setTimeout(() => {
          this.#scheduledApply = null;
          this.applyStyles(true); // apply with user config and emit
        }, this.#designEmitDelay);
      } catch (ex) {
        console.warn("Failed to schedule applyStyles with user config:", ex);
      }
    };

    handleReset = async () => {
      const result = await ask(
        "Reset to default configuration? This will clear your saved settings."
      );

      if (result) {
        localStorage.removeItem(STORAGE_KEY);
        this.config = JSON.parse(JSON.stringify(PDS.defaultConfig));
        this.updateForm();
        this.saveConfig();
        this.applyStyles();
      }
    };

    handleThemeChange(e) {
      try {
        const value = e.target.value;
        // Persist only to dedicated localStorage key (theme is not part of config)
        try {
          localStorage.setItem("pure-ds-theme", value);
        } catch (ex) {
          /* ignore localstorage failures */
        }

        // Update document attribute so generated CSS scoped to data-theme applies.
        // Always set an explicit 'light' or 'dark' attribute. If the user
        // selected 'system', resolve the current OS value via matchMedia.
        if (value === "system") {
          const prefersDark =
            typeof window !== "undefined" &&
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches;
          document.documentElement.setAttribute(
            "data-theme",
            prefersDark ? "dark" : "light"
          );
        } else {
          document.documentElement.setAttribute("data-theme", value);
        }

        // Apply immediately and emit styles using the user config (keep config separate)
        this.applyStyles(true);

        toast(`Theme set to ${value}`, { type: "info", duration: 1200 });
      } catch (ex) {
        console.warn("Failed to change theme:", ex);
      }
    }

    handleDownload = (format) => {
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

import { Generator } from './auto-designer.js';

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
                  : "Switch to Advanced Mode"}</span>
            </label>

            <button
              class="inspector-toggle ${this.inspectorMode ? "active" : ""}"
              @click=${this.toggleInspectorMode}
              title="${this.inspectorMode
                ? "Deactivate"
                : "Activate"} Code Inspector"
            >
              <svg-icon
                icon="${this.inspectorMode ? "eye-slash" : "code"}"
                size="sm"
              ></svg-icon>
              <span
                >${this.inspectorMode
                  ? "Inspector Active"
                  : "Code Inspector"}</span>
            </button>
            
            <fieldset role="radiogroup" aria-label="Theme" class="theme-select">
              <legend>Theme</legend>
              ${(() => {
                const stored = (typeof window !== 'undefined' && localStorage.getItem('pure-ds-theme')) || null;
                const selected = stored || 'system';
                return html`
                  <label>
                    <input type="radio" name="theme" value="system" @change=${this.handleThemeChange} .checked=${selected === 'system'} />
                    <span>System</span>
                  </label>
                  <label>
                    <input type="radio" name="theme" value="light" @change=${this.handleThemeChange} .checked=${selected === 'light'} />
                    <span>Light</span>
                  </label>
                  <label>
                    <input type="radio" name="theme" value="dark" @change=${this.handleThemeChange} .checked=${selected === 'dark'} />
                    <span>Dark</span>
                  </label>
                `;
              })()}
            </fieldset>
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
      ui["/typography/fontFamilyMono"] = {
        "ui:datalist": [
          "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace",
          "Consolas, 'Liberation Mono', Menlo, monospace",
          "'Fira Code', 'Cascadia Code', 'Source Code Pro', monospace",
        ],
      };

      // Numeric fields rendered as ranges for better UX
      ui["/typography/baseFontSize"] = {
        "ui:widget": "input-range",
        "ui:min": 12,
        "ui:max": 24,
      };
      ui["/typography/fontScale"] = {
        "ui:widget": "input-number",
        "ui:min": 1.1,
        "ui:max": 1.618,
        "ui:step": 0.01
      };
      ui["/spatialRhythm/baseUnit"] = {
        "ui:widget": "input-range",
        "ui:min": 4,
        "ui:max": 32,
      };

      // Dark mode color overrides
      ui["/colors/darkMode/background"] = { "ui:widget": "input-color" };
      ui["/colors/darkMode/secondary"] = { "ui:widget": "input-color" };

      // Advanced: container padding
      ui["/spatialRhythm/containerPadding"] = {
        "ui:widget": "input-range",
        "ui:min": 0,
        "ui:max": 4,
      };

      return ui;
    }
  }
);
