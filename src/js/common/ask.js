import { fragmentFromTemplateLike } from "./common.js";

/**
 * Get the current page title for dialogs
 */
function getPageTitle() {
  return document.title || 
         document.querySelector('h1')?.textContent || 
         'Application';
}

/**
 * Append message content using vanilla DOM APIs
 * @param {HTMLElement} container
 * @param {unknown} message
 */
function appendMessageContent(container, message) {
  if (message == null) return;

  if (
    typeof message === "object" &&
    Array.isArray(message.strings) &&
    Array.isArray(message.values)
  ) {
    container.appendChild(fragmentFromTemplateLike(message));
    return;
  }

  if (message instanceof Node) {
    container.appendChild(message);
    return;
  }

  if (Array.isArray(message)) {
    message.forEach((item) => appendMessageContent(container, item));
    return;
  }

  const text = typeof message === "string" ? message : String(message);
  container.appendChild(document.createTextNode(text));
}

/**
 * Validate host form plus nested shadow-root forms (e.g. inside custom elements like pds-form).
 * @param {HTMLFormElement} form
 * @returns {boolean}
 */
function validateDialogFormTree(form) {
  if (!form) return true;

  let valid = true;

  const describeElement = (el) => {
    if (!el || typeof el !== "object") return "<unknown>";
    const tag = el.tagName ? String(el.tagName).toLowerCase() : "node";
    const id = el.id ? `#${el.id}` : "";
    const name = typeof el.getAttribute === "function" ? el.getAttribute("name") : null;
    const namePart = name ? `[name="${name}"]` : "";
    return `${tag}${id}${namePart}`;
  };

  const reportInvalidControls = (root, scopeLabel) => {
    if (!root || typeof root.querySelectorAll !== "function") return;
    const invalidControls = Array.from(root.querySelectorAll(":invalid"));
    if (!invalidControls.length) return;
    const list = invalidControls.map((el) => {
      const message = typeof el.validationMessage === "string" ? el.validationMessage : "";
      return `${describeElement(el)}${message ? ` — ${message}` : ""}`;
    });
    console.warn(`ask.validateDialogFormTree: invalid controls in ${scopeLabel}:`, list);
  };

  const runValidity = (target, scopeLabel) => {
    try {
      const targetValid = typeof target.reportValidity === "function"
        ? target.reportValidity()
        : target.checkValidity?.() ?? true;
      if (!targetValid) {
        reportInvalidControls(target, scopeLabel);
      }
      return targetValid;
    } catch (error) {
      console.error(`ask.validateDialogFormTree: validation threw in ${scopeLabel}`, error);
      return false;
    }
  };

  valid = runValidity(form, "host dialog form") && valid;

  const nestedLightDomForms = Array.from(form.querySelectorAll("form"));
  for (const nestedForm of nestedLightDomForms) {
    if (nestedForm === form) continue;
    const nestedValid = runValidity(nestedForm, `nested light DOM form ${describeElement(nestedForm)}`);
    valid = nestedValid && valid;
  }

  const descendants = Array.from(form.querySelectorAll("*"));
  for (const host of descendants) {
    const root = host?.shadowRoot;
    if (!root) continue;

    const nestedForms = Array.from(root.querySelectorAll("form"));
    for (const nestedForm of nestedForms) {
      const nestedValid = runValidity(
        nestedForm,
        `shadow form under ${describeElement(host)}`
      );
      valid = nestedValid && valid;
    }
  }

  return valid;
}

function isSafariBrowser() {
  const userAgent = navigator.userAgent;
  const isSafariEngine = /Safari/i.test(userAgent);
  const isOtherBrowser = /(Chrome|Chromium|CriOS|FxiOS|EdgiOS|OPiOS|Opera)/i.test(userAgent);
  return isSafariEngine && !isOtherBrowser;
}

function playDialogEnterAnimation(dialog) {
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const isMobile = window.matchMedia?.('(max-width: 639px)').matches;
  const animationName = dialog.classList.contains('dialog-no-scale-animation')
    ? 'pds-dialog-fade-enter'
    : isMobile
      ? 'pds-dialog-enter-mobile'
      : 'pds-dialog-enter';

  dialog.style.animation = 'none';
  void dialog.offsetWidth;
  dialog.style.animation = `${animationName} var(--transition-normal) ease`;

  dialog.addEventListener('animationend', () => {
    dialog.style.animation = '';
  }, { once: true });
}

function shouldUseLiquidGlass(options = {}) {
  return options?.liquidGlassEffects === true;
}

/**
 * Create a PDS-compliant dialog with proper semantic structure
 * @param {string|Node|Array} message - Message content (string or DOM nodes)
 * @param {Object} options - Dialog options
 * @returns {Promise} Resolves with result when dialog closes
 */
export async function ask(message, options = {}) {
  
  const defaults = {
    title: "Confirm",
    type: "confirm", // 'alert', 'confirm', 'custom'
    buttons: {
      ok: { name: "OK", primary: true },
      cancel: { name: "Cancel", cancel: true },
    },
  };
  
  options = { ...defaults, ...options };
  
  return new Promise((resolve) => {
    let settled = false;
    const settle = (value, dialog) => {
      if (settled) return;
      settled = true;
      dialog.close();
      resolve(value);
    };

    // Create native dialog element
    const dialog = document.createElement("dialog");

    if (isSafariBrowser()) {
      dialog.classList.add("dialog-no-scale-animation");
    }
    
    if (shouldUseLiquidGlass(options))
      dialog.classList.add("liquid-glass");
    
    // Add optional CSS classes
    if (options.size) {
      dialog.classList.add(`dialog-${options.size}`); // dialog-sm, dialog-lg, dialog-xl
    }
    if (options.type) {
      dialog.classList.add(`dialog-${options.type}`);
    }
    if (options.class) {
      if (Array.isArray(options.class)) {
        dialog.classList.add(...options.class);
      } else {
        dialog.classList.add(options.class);
      }
    }
    
    // Set maxHeight via CSS custom property (constrained to 90vh by default)
    if (options.maxHeight) {
      dialog.style.setProperty('--dialog-max-height', options.maxHeight);
    }

    // Build button elements
    const buttons = Object.entries(options.buttons).map(([code, obj]) => {
      const btnClass = obj.primary ? "btn-primary btn-sm" : "btn-outline btn-sm";
      const btnType = obj.cancel ? "button" : "submit";
      const formNoValidate = obj.formNoValidate ? " formnovalidate" : "";
      return `<button type="${btnType}" class="${btnClass}" value="${code}"${formNoValidate}>${obj.name}</button>`;
    });

    // Create PDS-compliant dialog structure
    // When useForm is true, don't wrap in a form - let the content provide the form
    if (options.useForm) {
      // Create a temporary container to render the message content
      const tempContainer = document.createElement("div");
      appendMessageContent(tempContainer, message);
      
      // Find the form in the rendered content
      const form = tempContainer.querySelector("form");
      if (form) {
        // Build dialog structure with form as direct child for proper flex layout
        dialog.innerHTML = /*html*/ `
          <header>
            <h2>${options.title}</h2>
          </header>
        `;
        
        // Create article wrapper and move form children into it (preserves DOM nodes & bindings)
        const article = document.createElement("article");
        article.className = "dialog-body";
        while (form.firstChild) {
          article.appendChild(form.firstChild);
        }
        form.appendChild(article);
        
        // Add footer with buttons
        const footer = document.createElement("footer");
        footer.innerHTML = buttons.join("");
        form.appendChild(footer);
        
        // Append the restructured form to dialog
        dialog.appendChild(form);
      } else {
        // No form found, use standard article structure
        dialog.innerHTML = /*html*/ `
          <header>
            <h2>${options.title}</h2>
          </header>
          <article id="msg-container"></article>
          <footer>
            ${buttons.join("")}
          </footer>
        `;
        const article = dialog.querySelector("#msg-container");
        article.appendChild(tempContainer);
      }
    } else {
      dialog.innerHTML = /*html*/ `
        <form method="dialog">
          <header>
            <h2>${options.title}</h2>
          </header>
          
          <article id="msg-container"></article>
          
          <footer>
            ${buttons.join("")}
          </footer>
        </form>
      `;

      // Render message content
      const article = dialog.querySelector("#msg-container");
      appendMessageContent(article, message);
    }

    // Handle cancel button clicks
    dialog.addEventListener("click", (e) => {
      const okBtn = e.target.closest('button[value="ok"]');
      if (okBtn && options.useForm) {
        e.preventDefault();
        const form = dialog.querySelector("form");
        if (!form) return;

        const bypassValidation = Boolean(okBtn.hasAttribute("formnovalidate"));
        if (!bypassValidation) {
          const valid = validateDialogFormTree(form);
          if (!valid) return;
        }

        const result = new FormData(form);
        settle(result, dialog);
        return;
      }

      const btn = e.target.closest('button[value="cancel"]');
      if (btn) {
        settle(false, dialog);
      }
    });

    // Wait for form to exist before adding submit listener
    const setupFormListener = () => {
      const form = dialog.querySelector("form");
      if (form) {
        if (form.dataset.askSubmitBound === "true") {
          return;
        }
        form.dataset.askSubmitBound = "true";

        form.addEventListener("submit", (event) => {
          event.preventDefault();

          const submitValue = event.submitter?.value ?? (options.useForm ? "ok" : undefined);
          const bypassValidation = Boolean(event.submitter?.hasAttribute("formnovalidate"));

          if (options.useForm && submitValue === "ok" && !bypassValidation) {
            const valid = validateDialogFormTree(form);

            if (!valid) {
              return;
            }
          }
          
          let result;
          if (options.useForm && submitValue === "ok") {
            result = new FormData(form);
          } else {
            result = (submitValue === "ok");
          }

          settle(result, dialog);
        });
      } else {
        // Form doesn't exist yet, wait and try again
        requestAnimationFrame(setupFormListener);
      }
    };

    // Handle dialog close event
    dialog.addEventListener("close", () => {
      // Small delay to allow exit animation
      setTimeout(() => dialog.remove(), 200);
    });

    // Append to body and show
    document.body.appendChild(dialog);

    // Bind submit behavior after element is connected so lazy-rendered forms are discoverable
    requestAnimationFrame(setupFormListener);

    // Call optional rendered callback
    if (typeof options.rendered === "function") {
      options.rendered(dialog);
    }

    // Show the dialog as modal
    dialog.showModal();

    requestAnimationFrame(() => playDialogEnterAnimation(dialog));
  });
}

/**
 * Show an alert dialog
 * @param {string|Node|Array} message - Alert message
 * @param {Object} options - Optional dialog options
 * @returns {Promise}
 */
export async function alert(message, options = {}) {
  const defaults = {
    title: getPageTitle(),
    type: "alert",
    buttons: {
      ok: { name: "OK", primary: true },
    },
  };

  return ask(message, { ...defaults, ...options });
}

/**
 * Show a confirmation dialog
 * @param {string|Node|Array} message - Confirmation message
 * @param {Object} options - Optional dialog options
 * @returns {Promise<boolean>}
 */
export async function confirm(message, options = {}) {
  const defaults = {
    title: "Confirm Action",
    type: "confirm",
    buttons: {
      ok: { name: "Confirm", primary: true },
      cancel: { name: "Cancel", cancel: true },
    },
  };

  return ask(message, { ...defaults, ...options });
}
