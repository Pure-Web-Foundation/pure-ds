import { render, html } from "lit";
import { config } from "../../../pds.config.js"

/**
 * Get the current page title for dialogs
 */
function getPageTitle() {
  return document.title || 
         document.querySelector('h1')?.textContent || 
         'Application';
}

/**
 * Create a PDS-compliant dialog with proper semantic structure
 * @param {string|TemplateResult} message - Message content (string or Lit template)
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
    // Create native dialog element
    const dialog = document.createElement("dialog");
    
    if(config.options.liquidGlassEffects)
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

    // Build button elements
    const buttons = Object.entries(options.buttons).map(([code, obj]) => {
      const btnClass = obj.primary ? "btn-primary btn-sm" : "btn-outline btn-sm";
      const btnType = obj.cancel ? "button" : "submit";
      return `<button type="${btnType}" class="${btnClass}" value="${code}">${obj.name}</button>`;
    });

    // Create PDS-compliant dialog structure
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
    if (typeof message === "object" && message._$litType$) {
      // Lit template
      render(message, article);
    } else if (typeof message === "string") {
      article.textContent = message;
    } else {
      // Assume it's a Lit template or HTML
      render(message, article);
    }

    // Handle cancel button clicks
    dialog.addEventListener("click", (e) => {
      const btn = e.target.closest('button[value="cancel"]');
      if (btn) {
        dialog.close();
        resolve(false);
      }
    });

    // Handle form submission
    dialog.querySelector("form").addEventListener("submit", (event) => {
      event.preventDefault();
      
      const result = options.useForm 
        ? (event.submitter.value === "ok" ? new FormData(dialog.querySelector("form")) : null)
        : (event.submitter.value === "ok");
      
      dialog.close();
      resolve(result);
    });

    // Handle dialog close event
    dialog.addEventListener("close", () => {
      // Small delay to allow exit animation
      setTimeout(() => dialog.remove(), 200);
    });

    // Append to body and show
    document.body.appendChild(dialog);

    // Call optional rendered callback
    if (typeof options.rendered === "function") {
      options.rendered(dialog);
    }

    // Show the dialog as modal
    dialog.showModal();
  });
}

/**
 * Show an alert dialog
 * @param {string|TemplateResult} message - Alert message
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
 * @param {string|TemplateResult} message - Confirmation message
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
