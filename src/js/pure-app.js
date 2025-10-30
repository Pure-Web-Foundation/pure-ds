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
        // resolve current OS preference and set the attribute to an explicit value
        // ('dark'|'light') so the attribute is always concrete.
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
      } else {
        // No persisted preference: choose from OS preference and do not persist
        const prefersDark =
          typeof window !== "undefined" &&
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.setAttribute(
          "data-theme",
          prefersDark ? "dark" : "light"
        );
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
      
      // Ensure there's only ever one toaster in the DOM
      if (!document.querySelector("pds-toaster")) {
        const toaster = document.createElement("pds-toaster");
        document.body.appendChild(toaster);
      }
      // 5) If the user preference is 'system' we need to keep the html[data-theme]
      // attribute in sync with the OS. When localStorage contains 'system' we
      // register a matchMedia listener that updates the attribute to either
      // 'dark' or 'light' on changes. If the user stored an explicit 'light' or
      // 'dark', we do not override it.
      try {
        if (
          storedTheme === "system" &&
          typeof window !== "undefined" &&
          window.matchMedia
        ) {
          const mq = window.matchMedia("(prefers-color-scheme: dark)");
          const listener = (e) => {
            const isDark = e.matches === undefined ? mq.matches : e.matches;
            try {
              document.documentElement.setAttribute(
                "data-theme",
                isDark ? "dark" : "light"
              );
            } catch (ex) {
              /* ignore */
            }
          };

          // Attach listener using modern API where available
          if (typeof mq.addEventListener === "function") {
            mq.addEventListener("change", listener);
          } else if (typeof mq.addListener === "function") {
            mq.addListener(listener);
          }
        }
      } catch (ex) {
        /* ignore matchMedia wiring errors */
      }
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

  /**
   * Wait for all media elements (images, videos) to load
   * @param {HTMLElement} container - Container to search for media elements
   * @param {number} maxTimeout - Maximum time to wait in milliseconds
   * @returns {Promise<void>}
   */
  async waitForMedia(container, maxTimeout = 500) {
    const mediaElements = container.querySelectorAll("img, video");
    if (mediaElements.length === 0) {
      return Promise.resolve();
    }

    const mediaPromises = Array.from(mediaElements).map((el) => {
      if (el.tagName === "IMG") {
        // Image already loaded
        if (el.complete && el.naturalHeight !== 0) {
          return Promise.resolve();
        }
        // Wait for image to load
        return new Promise((resolve) => {
          el.addEventListener("load", resolve, { once: true });
          el.addEventListener("error", resolve, { once: true }); // Resolve even on error
        });
      } else if (el.tagName === "VIDEO") {
        // Video metadata loaded
        if (el.readyState >= 1) {
          // HAVE_METADATA
          return Promise.resolve();
        }
        // Wait for video metadata
        return new Promise((resolve) => {
          el.addEventListener("loadedmetadata", resolve, { once: true });
          el.addEventListener("error", resolve, { once: true }); // Resolve even on error
        });
      }
      return Promise.resolve();
    });

    // Race between media loading and timeout
    const timeoutPromise = new Promise((resolve) =>
      setTimeout(resolve, maxTimeout)
    );
    await Promise.race([Promise.all(mediaPromises), timeoutPromise]);
  }

  /**
   * Show content in the global drawer
   * @param {TemplateResult|HTMLElement|string} htmlContent - Content for drawer body (Lit template, HTML element, or string)
   * @param {Object} options - Drawer options
   * @param {TemplateResult|HTMLElement|string} options.header - Optional content for drawer header
   * @param {string} options.position - Drawer position ('bottom' | 'top' | 'left' | 'right')
   * @param {string} options.maxHeight - Max height CSS value (e.g., '70vh', '500px')
   * @param {string} options.minHeight - Min height CSS value (e.g., '200px', '30vh')
   * @param {boolean} options.showClose - Show an icon-only close button in the header (default: true for left/right; false otherwise)
   * @param {boolean} options.waitForMedia - Whether to wait for images/videos to load (default: true)
   * @param {number} options.mediaTimeout - Max time to wait for media in ms (default: 500)
   * @returns {Promise<HTMLElement>} The drawer element
   */
  async showDrawer(htmlContent, options = {}) {
    const drawer = document.getElementById("global-drawer");
    if (!drawer) {
      console.warn(
        'Global drawer not found. Make sure <pds-drawer id="global-drawer"> exists in the DOM.'
      );
      return null;
    }

    // Set drawer properties
    if (options.position) {
      drawer.setAttribute("position", options.position);
    }
    if (options.maxHeight) {
      drawer.setAttribute("max-height", options.maxHeight);
    }
    if (options.minHeight) {
      drawer.setAttribute("min-height", options.minHeight);
    }
    // Show or hide close button
    const pos = options.position || drawer.getAttribute("position") || "bottom";
    const defaultShowClose = pos === "left" || pos === "right";
    const showClose = options.showClose === undefined ? defaultShowClose : !!options.showClose;
    if (showClose) drawer.setAttribute("show-close", "");
    else drawer.removeAttribute("show-close");

    // Render content
    drawer.setContent(htmlContent, options.header);

    // Wait for Lit to finish rendering the slotted content
    await drawer.updateComplete;

    // Optionally wait for media to load (default: true)
    const shouldWaitForMedia = options.waitForMedia !== false;
    if (shouldWaitForMedia) {
      const mediaTimeout = options.mediaTimeout || 500;
      await this.waitForMedia(drawer, mediaTimeout);
    }

    // Now open with the correct height calculated
    setTimeout(() => {
      drawer.open = true;
    }, 10);

    return drawer;
  }

  /**
   * Close the global drawer
   */
  closeDrawer() {
    const drawer = document.getElementById("global-drawer");
    if (drawer) {
      drawer.open = false;
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
