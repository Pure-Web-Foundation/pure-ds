/**
 * @element pds-toaster
 * @fires pds:toast - Global event for creating toasts
 * 
 * @slot - Toast messages are dynamically added to the shadow DOM
 * 
 * @cssprop --z-notification - Z-index for toast positioning (default: 9999)
 * @cssprop --transition-normal - Animation duration for toasts
 * 
 * @example
 * <pds-toaster></pds-toaster>
 * 
 * // Show toast via API
 * toaster.toast('Hello!', { type: 'success' });
 * 
 * // Show toast via event
 * PDS.dispatchEvent(new CustomEvent('pds:toast', {
 *   detail: { message: 'Hello!', type: 'success' }
 * }));
 */
export class AppToaster extends HTMLElement {
  constructor() {
    super();
    this.toasts = [];
  }

  async connectedCallback() {
    // Attach shadow DOM
    this.attachShadow({ mode: "open" });

    // Listen for global toast events
    this._handleToastEvent = (e) => {
      const { message, type, duration, closable, persistent } = e.detail;
      this.toast(message, { type, duration, closable, persistent });
    };
    PDS.addEventListener('pds:toast', this._handleToastEvent);

    // Component-specific styles (toaster layer for animations/positioning)
    const componentStyles = PDS.createStylesheet(/*css*/ `
      @layer toaster {
        :host {
          position: fixed;
          top: var(--spacing-4);
          right: var(--spacing-4);
          z-index: var(--z-notification, 9999);
          display: flex;
          flex-direction: column;
          gap: var(--spacing-3);
          pointer-events: none;
          max-width: 400px;
        }

        /* Toast animations and transitions */
        aside.toast {
          transform: translateX(100%);
          opacity: 0;
          margin-bottom: var(--spacing-3);
          position: relative;
          pointer-events: auto;
          max-height: 500px;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          transition: transform var(--transition-normal, 0.3s) cubic-bezier(0.175, 0.885, 0.32, 1.275),
                      opacity var(--transition-normal, 0.3s) ease-out,
                      margin-bottom var(--transition-normal, 0.3s) ease-out,
                      max-height var(--transition-normal, 0.3s) ease-out;
        }

        aside.toast.show {
          transform: translateX(0);
          opacity: 1;
        }

        /* Toast dismiss animation */
        aside.toast.dismissing {
          margin-bottom: 0;
          max-height: 0;
          opacity: 0;
          transform: translateX(100%);
          transition: transform var(--transition-normal, 0.3s) ease-out,
                      opacity var(--transition-normal, 0.3s) ease-out,
                      margin-bottom var(--transition-normal, 0.3s) ease-out,
                      max-height var(--transition-normal, 0.3s) ease-out;
        }

        /* Toast progress bar */
        aside.toast .toast-progress {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          opacity: 0.7;
          transition: width linear;
        }

        aside.toast.alert-info .toast-progress { 
          background: var(--color-info-600);
        }

        aside.toast.alert-success .toast-progress { 
          background: var(--color-success-600);
        }

        aside.toast.alert-warning .toast-progress { 
          background: var(--color-warning-600);
        }

        aside.toast.alert-danger .toast-progress,
        aside.toast.alert-error .toast-progress { 
          background: var(--color-danger-600);
        }

        /* Toast shrink animation */
        @keyframes toast-shrink {
          from { width: 100%; }
          to { width: 0%; }
        }

        aside.toast p {
           white-space: pre-line;
        }

        /* Mobile responsive toast positioning */
        @_media (max-width: 640px) {
          :host {
            top: auto;
            bottom: var(--spacing-4);
            left: var(--spacing-4);
            right: var(--spacing-4);
            max-width: none;
          }

          aside.toast {
            transform: translateY(100%);
          }

          aside.toast.show {
            transform: translateY(0);
          }
        }
      }
    `);

    // Adopt primitives (buttons), components (.alert classes), and toaster-specific styles
    await PDS.adoptLayers(
      this.shadowRoot,
      ["primitives", "components"],
      [componentStyles]
    );
  }

  disconnectedCallback() {
    // Clean up event listener
    if (this._handleToastEvent) {
      PDS.removeEventListener('pds:toast', this._handleToastEvent);
      this._handleToastEvent = null;
    }
  }

  /**
   * Display a toast notification
   * @method toast
   * @public
   * @param {string} message - The message to display
   * @param {Object} [options] - Toast configuration
   * @param {"information"|"success"|"warning"|"error"} [options.type="information"] - Toast type
   * @param {number} [options.duration] - Duration in ms (auto-calculated if not provided)
   * @param {boolean} [options.closable=true] - Whether toast can be closed manually
   * @param {boolean} [options.persistent=false] - If true, toast doesn't auto-dismiss
   * @returns {string} Toast ID
   */
  toast(message, options = {}) {
    const defaults = {
      type: "information", // information, success, warning, error
      duration: null, // auto-calculated based on reading time
      closable: true,
      persistent: false, // if true, doesn't auto-dismiss
    };

    const config = { ...defaults, ...options };

    // Calculate reading time (average 200 words per minute)
    const wordCount = message.split(/\s+/).length;
    const baseReadingTime = Math.max(2000, (wordCount / 200) * 60 * 1000); // minimum 2 seconds

    // Extend time for errors (people need more time to process error messages)
    const multiplier = config.type === "error" ? 1.5 : 1;
    const duration = config.duration || baseReadingTime * multiplier;

    return this.showToast(message, config, duration);
  }

  showToast(message, config, duration) {
    // Generate unique ID for this toast
    const toastId = `toast-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    // Create toast element
    const toastElement = this.createToastElement(
      toastId,
      message,
      config.type,
      config.closable,
      duration,
      config.persistent
    );

    // Add to DOM
    this.shadowRoot.appendChild(toastElement);

    // Force reflow to ensure initial state is painted
    void toastElement.offsetHeight;

    // Trigger animation on next frame
    requestAnimationFrame(() => {
      toastElement.classList.add("show");
    });

    // Auto-dismiss if not persistent
    if (!config.persistent) {
      setTimeout(() => {
        this.dismissToast(toastId);
      }, duration);
    }

    return toastId;
  }

  createToastElement(id, message, type, closable, duration, persistent) {
    const toast = document.createElement("aside");
    toast.className = `toast alert ${this.getAlertClass(type)}`;
    toast.setAttribute("data-toast-id", id);
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");

    const icon = document.createElement("pds-icon");
    icon.className = "alert-icon";
    icon.setAttribute("icon", this.getToastIcon(type));
    icon.setAttribute("size", "lg");

    const content = document.createElement("div");

    const title = document.createElement("div");
    title.className = "alert-title";
    title.textContent = this.getToastTitle(type);

    const text = document.createElement("p");
    text.style.margin = "0";
    text.textContent = message;

    content.appendChild(title);
    content.appendChild(text);

    toast.appendChild(icon);
    toast.appendChild(content);

    if (closable) {
      const closeBtn = document.createElement("button");
      closeBtn.className = "alert-close";
      closeBtn.setAttribute("aria-label", "Close");
      closeBtn.textContent = "×";
      closeBtn.onclick = () => this.dismissToast(id);
      toast.appendChild(closeBtn);
    }

    if (!persistent) {
      const progress = document.createElement("div");
      progress.className = "toast-progress";
      progress.style.width = "100%";
      progress.style.animation = `toast-shrink ${duration}ms linear`;
      toast.appendChild(progress);
    }

    return toast;
  }

  /**
   * Dismiss a toast by ID
   * @method dismissToast
   * @public
   * @param {string} toastId - The ID of the toast to dismiss
   */
  dismissToast(toastId) {
    const toastElement = this.shadowRoot.querySelector(
      `[data-toast-id="${toastId}"]`
    );
    if (!toastElement) return;

    // Remove show class and add dismissing class for smooth collapse
    toastElement.classList.remove("show");
    toastElement.classList.add("dismissing");

    // Remove from DOM after animation completes
    setTimeout(() => {
      if (toastElement.parentNode === this.shadowRoot) {
        this.shadowRoot.removeChild(toastElement);
      }
    }, 300);
  }

  dismissAll() {
    const toastElements = this.shadowRoot.querySelectorAll(".toast");
    toastElements.forEach((toast) => {
      toast.classList.remove("show");
      toast.classList.add("dismissing");
    });

    // Clear all toasts after animation completes
    setTimeout(() => {
      while (this.shadowRoot.firstChild) {
        this.shadowRoot.removeChild(this.shadowRoot.firstChild);
      }
    }, 300);
  }

  handleCloseClick(toastId) {
    this.dismissToast(toastId);
  }

  handleAnimationEnd(toastId) {
    // Placeholder for potential future use
  }

  getToastIcon(type) {
    const icons = {
      information: "info",
      success: "check-circle",
      warning: "warning",
      error: "x-circle",
    };
    return icons[type] || icons.information;
  }

  getToastTitle(type) {
    const titles = {
      information: "Information",
      success: "Success!",
      warning: "Warning",
      error: "Error",
    };
    return titles[type] || titles.information;
  }

  getAlertClass(type) {
    const classMap = {
      information: "alert-info",
      success: "alert-success",
      warning: "alert-warning",
      error: "alert-danger",
    };
    return classMap[type] || "alert-info";
  }

  /**
   * Display a success toast
   * @method toastSuccess
   * @public
   * @param {string} message - The message to display
   * @param {Object} [options] - Toast configuration options
   * @returns {string} Toast ID
   */
  toastSuccess(message, options = {}) {
    return this.toast(message, { ...options, type: "success" });
  }

  /**
   * Display a warning toast
   * @method toastWarning
   * @public
   * @param {string} message - The message to display
   * @param {Object} [options] - Toast configuration options
   * @returns {string} Toast ID
   */
  toastWarning(message, options = {}) {
    return this.toast(message, { ...options, type: "warning" });
  }

  /**
   * Display an error toast
   * @method toastError
   * @public
   * @param {string} message - The message to display
   * @param {Object} [options] - Toast configuration options
   * @returns {string} Toast ID
   */
  toastError(message, options = {}) {
    return this.toast(message, { ...options, type: "error" });
  }

  /**
   * Display an information toast
   * @method toastInfo
   * @public
   * @param {string} message - The message to display
   * @param {Object} [options] - Toast configuration options
   * @returns {string} Toast ID
   */
  toastInfo(message, options = {}) {
    return this.toast(message, { ...options, type: "information" });
  }
}

customElements.define("pds-toaster", AppToaster);
