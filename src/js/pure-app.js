import { config } from "./config";
import { ask } from "./common/ask";

export class PureApp extends HTMLElement {
  constructor() {
    super();
    // Minimal host: provide a light wrapper with a slot
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this.render();
  }

  get toaster() {
    return document.querySelector("pds-toaster");
  }

  render() {
    return /* html */ `<slot></slot>`;
  }

  async ask() {
    return await ask(...arguments);
  }

  // Toast method - duration is auto-calculated based on message length
  toast(message, options = {}) {
    let toaster = this.toaster;
    if (!toaster) {
      toaster = document.createElement("pds-toaster");
      document.body.appendChild(toaster);
    }
    return toaster.toast(message, options);
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
    // Delegate to the drawer component's public API
    return await drawer.show(htmlContent, options);
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
