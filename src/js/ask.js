import { render } from "lit";

/**
 * Get the current page title for dialogs
 */
function getPageTitle() {
  return document.title || 
         document.querySelector('h1')?.textContent || 
         'Application';
}

export async function ask(message, options = {}) {
  
  const defaults = {
    title: "Confirm",
    buttons: {
      ok: { name: "OK" },
      cancel: { name: "Cancel", default: true, cancel: true },
    },
  };
  options = {
    ...defaults,
    ...options,
  };
  return new Promise((resolve) => {
    // Create dialog element
    const dialog = document.createElement("dialog");
    dialog.classList.add(options.align ?? "center");

    if (options.class) {
      if (Array.isArray(options.class)) dialog.classList.add(...options.class);
      else dialog.classList.add(options.class);
    }

    const buttons = Object.entries(options.buttons).map(([code, obj]) => {
      return `<button type="${obj.cancel ? "button" : "submit"}" class="${
        obj.default ? "btn-primary btn-sm" : "btn-outline btn-sm"
      }" value="${code}">${obj.name}</button>`;
    });

    dialog.innerHTML = /*html*/ `
      <ui-widget ${options.padding === false ? "no-padding" : ""} label="${
      options.title
    }" data-dialog>
      <form method="dialog" class="${options.padding === false ? "no-padding" : ""}">
        <div id="msg-container"></div>
        <fieldset class="flex row jc-end">
          ${buttons.join("")}
        </fieldset>
      </form>
      </ui-widget>
    `;

    const div = dialog.querySelector("#msg-container");
    if (typeof message === "object") {
      render(message, div);
    } else div.innerHTML = message;

    dialog.addEventListener("click", (e) => {
      const btn = e.target.closest("[type=button]");
      if (btn) {
        dialog.close();
        resolve(false);
      }
    });

    // Append to body
    document.body.appendChild(dialog);

    dialog.addEventListener("close", (e) => {
      dialog.remove();
    });

    if (typeof options.rendered === "function") options.rendered(dialog);

    // Show the dialog
    dialog.showModal();

    dialog.querySelector("form").addEventListener("submit", (event) => {
      
      event.preventDefault();
      const result = options.useForm 
        ? (event.submitter.value === "ok" ? new FormData(dialog.querySelector("form")) : null)
        : (event.submitter.value === "ok");
      
      dialog.close();
      resolve(result);
    });
  });
}

export async function alert(message) {
  const defaults = {
    title: getPageTitle(),
    buttons: {
      ok: { name: "OK" },
    },
  };

  return ask(message, defaults);
}
