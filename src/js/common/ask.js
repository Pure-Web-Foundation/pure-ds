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
    
    if(config.options?.liquidGlassEffects)
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
    // When useForm is true, don't wrap in a form - let the content provide the form
    if (options.useForm) {
      dialog.innerHTML = /*html*/ `
        <header>
          <h2>${options.title}</h2>
        </header>
        
        <article id="msg-container"></article>
      `;
      
      // Render message content first
      const article = dialog.querySelector("#msg-container");
      if (typeof message === "object" && message._$litType$) {
        render(message, article);
      } else if (typeof message === "string") {
        article.textContent = message;
      } else {
        render(message, article);
      }
      
      // Wait for content to render, then find the form and add buttons to it
      requestAnimationFrame(() => {
        const form = dialog.querySelector("form");
        if (form) {
          const footer = document.createElement("footer");
          footer.innerHTML = buttons.join("");
          form.appendChild(footer);
        }
      });
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
      if (typeof message === "object" && message._$litType$) {
        render(message, article);
      } else if (typeof message === "string") {
        article.textContent = message;
      } else {
        render(message, article);
      }
    }

    // Handle cancel button clicks
    dialog.addEventListener("click", (e) => {
      const btn = e.target.closest('button[value="cancel"]');
      if (btn) {
        dialog.close();
        resolve(false);
      }
    });

    // Wait for form to exist before adding submit listener
    const setupFormListener = () => {
      const form = dialog.querySelector("form");
      if (form) {
        form.addEventListener("submit", (event) => {
          event.preventDefault();
          
          let result;
          if (options.useForm && event.submitter.value === "ok") {
            console.log("Found form:", form);
            console.log("Form elements:", form ? Array.from(form.elements) : "no form");
            result = new FormData(form);
            console.log("FormData entries:", Array.from(result.entries()));
          } else {
            result = (event.submitter.value === "ok");
          }

          dialog.close();
          resolve(result);
        });
      } else {
        // Form doesn't exist yet, wait and try again
        requestAnimationFrame(setupFormListener);
      }
    };
    
    setupFormListener();

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
