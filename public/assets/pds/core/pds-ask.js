// src/js/common/common.js
function fragmentFromTemplateLike(templateLike) {
  const strings = Array.isArray(templateLike?.strings) ? templateLike.strings : [];
  const values = Array.isArray(templateLike?.values) ? templateLike.values : [];
  const consumedValues = /* @__PURE__ */ new Set();
  const htmlParts = [];
  const propBindingPattern = /(\s)(\.[\w-]+)=\s*$/;
  for (let i = 0; i < strings.length; i += 1) {
    let chunk = strings[i] ?? "";
    const match = chunk.match(propBindingPattern);
    if (match && i < values.length) {
      const propToken = match[2];
      const propName = propToken.slice(1);
      const marker = `pds-val-${i}`;
      chunk = chunk.replace(
        propBindingPattern,
        `$1data-pds-prop="${propName}:${marker}"`
      );
      consumedValues.add(i);
    }
    htmlParts.push(chunk);
    if (i < values.length && !consumedValues.has(i)) {
      htmlParts.push(`<!--pds-val-${i}-->`);
    }
  }
  const tpl = document.createElement("template");
  tpl.innerHTML = htmlParts.join("");
  const replaceValueAtMarker = (markerNode, value) => {
    const parent = markerNode.parentNode;
    if (!parent)
      return;
    if (value == null) {
      parent.removeChild(markerNode);
      return;
    }
    const insertValue = (val) => {
      if (val == null)
        return;
      if (val instanceof Node) {
        parent.insertBefore(val, markerNode);
        return;
      }
      if (Array.isArray(val)) {
        val.forEach((item) => insertValue(item));
        return;
      }
      parent.insertBefore(document.createTextNode(String(val)), markerNode);
    };
    insertValue(value);
    parent.removeChild(markerNode);
  };
  const walker = document.createTreeWalker(tpl.content, NodeFilter.SHOW_COMMENT);
  const markers = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node?.nodeValue?.startsWith("pds-val-")) {
      markers.push(node);
    }
  }
  markers.forEach((node) => {
    const index = Number(node.nodeValue.replace("pds-val-", ""));
    replaceValueAtMarker(node, values[index]);
  });
  const elements = tpl.content.querySelectorAll("*");
  elements.forEach((el) => {
    const propAttr = el.getAttribute("data-pds-prop");
    if (!propAttr)
      return;
    const [propName, markerValue] = propAttr.split(":");
    const index = Number(String(markerValue).replace("pds-val-", ""));
    if (propName && Number.isInteger(index)) {
      el[propName] = values[index];
    }
    el.removeAttribute("data-pds-prop");
  });
  return tpl.content;
}

// src/js/common/ask.js
function appendMessageContent(container, message) {
  if (message == null)
    return;
  if (typeof message === "object" && Array.isArray(message.strings) && Array.isArray(message.values)) {
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
function isSafariBrowser() {
  const userAgent = navigator.userAgent;
  const isSafariEngine = /Safari/i.test(userAgent);
  const isOtherBrowser = /(Chrome|Chromium|CriOS|FxiOS|EdgiOS|OPiOS|Opera)/i.test(userAgent);
  return isSafariEngine && !isOtherBrowser;
}
function playDialogEnterAnimation(dialog) {
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    return;
  }
  const isMobile = window.matchMedia?.("(max-width: 639px)").matches;
  const animationName = dialog.classList.contains("dialog-no-scale-animation") ? "pds-dialog-fade-enter" : isMobile ? "pds-dialog-enter-mobile" : "pds-dialog-enter";
  dialog.style.animation = "none";
  void dialog.offsetWidth;
  dialog.style.animation = `${animationName} var(--transition-normal) ease`;
  dialog.addEventListener("animationend", () => {
    dialog.style.animation = "";
  }, { once: true });
}
function shouldUseLiquidGlass(options = {}) {
  return options?.liquidGlassEffects === true;
}
async function ask(message, options = {}) {
  const defaults = {
    title: "Confirm",
    type: "confirm",
    // 'alert', 'confirm', 'custom'
    buttons: {
      ok: { name: "OK", primary: true },
      cancel: { name: "Cancel", cancel: true }
    }
  };
  options = { ...defaults, ...options };
  return new Promise((resolve) => {
    const dialog = document.createElement("dialog");
    if (isSafariBrowser()) {
      dialog.classList.add("dialog-no-scale-animation");
    }
    if (shouldUseLiquidGlass(options))
      dialog.classList.add("liquid-glass");
    if (options.size) {
      dialog.classList.add(`dialog-${options.size}`);
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
    if (options.maxHeight) {
      dialog.style.setProperty("--dialog-max-height", options.maxHeight);
    }
    const buttons = Object.entries(options.buttons).map(([code, obj]) => {
      const btnClass = obj.primary ? "btn-primary btn-sm" : "btn-outline btn-sm";
      const btnType = obj.cancel ? "button" : "submit";
      return `<button type="${btnType}" class="${btnClass}" value="${code}">${obj.name}</button>`;
    });
    if (options.useForm) {
      const tempContainer = document.createElement("div");
      appendMessageContent(tempContainer, message);
      const form = tempContainer.querySelector("form");
      if (form) {
        dialog.innerHTML = /*html*/
        `
          <header>
            <h2>${options.title}</h2>
          </header>
        `;
        const article = document.createElement("article");
        article.className = "dialog-body";
        while (form.firstChild) {
          article.appendChild(form.firstChild);
        }
        form.appendChild(article);
        const footer = document.createElement("footer");
        footer.innerHTML = buttons.join("");
        form.appendChild(footer);
        dialog.appendChild(form);
      } else {
        dialog.innerHTML = /*html*/
        `
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
      dialog.innerHTML = /*html*/
      `
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
      const article = dialog.querySelector("#msg-container");
      appendMessageContent(article, message);
    }
    dialog.addEventListener("click", (e) => {
      const btn = e.target.closest('button[value="cancel"]');
      if (btn) {
        dialog.close();
        resolve(false);
      }
    });
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
            result = event.submitter.value === "ok";
          }
          dialog.close();
          resolve(result);
        });
      } else {
        requestAnimationFrame(setupFormListener);
      }
    };
    setupFormListener();
    dialog.addEventListener("close", () => {
      setTimeout(() => dialog.remove(), 200);
    });
    document.body.appendChild(dialog);
    if (typeof options.rendered === "function") {
      options.rendered(dialog);
    }
    dialog.showModal();
    requestAnimationFrame(() => playDialogEnterAnimation(dialog));
  });
}
export {
  ask
};
//# sourceMappingURL=pds-ask.js.map
