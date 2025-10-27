import { PDS } from "./pds";
import { html, LitElement, css, nothing } from "lit";
export { html, LitElement, css, nothing };
import { config } from "./config";
import { ask } from "./common/ask";
import "./svg-icon";

import { AutoDefiner } from "pure-web/auto-definer";

// Designer and definer will be initialized asynchronously in PureApp.init()
let designer = null;
let definer = null;

// Export PDS object (registry is available immediately; designer is set at runtime)
export { PDS };

export class PureApp extends HTMLElement {
  constructor() {
    super();
    this.init();
  }

  get toaster() {
    return document.querySelector("pds-toaster");
  }

  async init() {
    // 1) Apply theme preference early so styles generated below pick the right scope
    try {
      const storedTheme =
        typeof window !== "undefined" && localStorage.getItem("pure-ds-theme");
      if (storedTheme) {
        // If user explicitly stored 'light' or 'dark', use that. If they stored 'system',
        // set attribute to 'system' and let CSS media queries handle actual rendering.
        if (storedTheme === "system") {
          document.documentElement.setAttribute("data-theme", "system");
        } else {
          document.documentElement.setAttribute("data-theme", storedTheme);
        }
      } else {
        // No persisted preference: default to 'system' so CSS can adapt via media queries
        document.documentElement.setAttribute("data-theme", "system");
      }

      // 2) Initialize the design system (designer + registry + styles)
      // Pass explicit theme option from localStorage so generated CSS is scoped correctly
      const generatorOptions = structuredClone(config.design);
      if (storedTheme) generatorOptions.theme = storedTheme;
      designer = new PDS.Generator(generatorOptions);
      PDS.registry.setDesigner(designer);
      if (typeof window !== "undefined") {
        window.PDS = PDS;
      }
      PDS.Generator.applyStyles(designer);

      // 3) Initialize AutoDefiner and predefine critical components
      definer = new AutoDefiner(config.autoDefine);
      await AutoDefiner.define(["pds-toaster", "pds-jsonform"]);

      // 4) Now render and attach runtime UI elements
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = this.render();
      const toaster = document.createElement("pds-toaster");
      document.body.appendChild(toaster);

      // 5) We intentionally do NOT programmatically toggle html[data-theme] here for
      // 'system' mode. The generated CSS includes a prefers-color-scheme media query
      // targeting html[data-theme="system"] so the browser will apply the correct
      // dark/light rules automatically. Avoiding JS-driven toggling prevents
      // mismatches and flicker if matchMedia evaluates differently at different
      // times in some environments.
    } catch (ex) {
      console.error("pure-app.init failed:", ex);
      // Best-effort render even on failure
      try {
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = this.render();
      } catch (e) {
        /* ignore */
      }
    }
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
