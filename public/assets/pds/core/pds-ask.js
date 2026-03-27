// src/js/common/common.js
function fragmentFromTemplateLike(templateLike) {
  const strings = Array.isArray(templateLike?.strings) ? templateLike.strings : [];
  const values = Array.isArray(templateLike?.values) ? templateLike.values : [];
  const consumedValues = /* @__PURE__ */ new Set();
  const htmlParts = [];
  const propBindingPattern = /(\s)(\.[\w-]+)=["']?\s*$/;
  const eventBindingPattern = /(\s)(@[\w-]+)=["']?\s*$/;
  const booleanBindingPattern = /(\s)(\?[\w-]+)=["']?\s*$/;
  const attrBindingPattern = /(\s)([\w:-]+)=["']?\s*$/;
  const quotedBindingPattern = /=["']\s*$/;
  let skipLeadingQuote = false;
  for (let i = 0; i < strings.length; i += 1) {
    let chunk = strings[i] ?? "";
    if (skipLeadingQuote) {
      chunk = chunk.replace(/^["']/, "");
      skipLeadingQuote = false;
    }
    if (i < values.length) {
      const marker = `pds-val-${i}`;
      const propMatch = chunk.match(propBindingPattern);
      const eventMatch = chunk.match(eventBindingPattern);
      const boolMatch = chunk.match(booleanBindingPattern);
      const attrMatch = chunk.match(attrBindingPattern);
      if (propMatch) {
        const propName = propMatch[2].slice(1);
        skipLeadingQuote = quotedBindingPattern.test(strings[i] ?? "");
        chunk = chunk.replace(
          propBindingPattern,
          `$1data-pds-bind-${i}="prop:${propName}:${marker}"`
        );
        consumedValues.add(i);
      } else if (eventMatch) {
        const eventName = eventMatch[2].slice(1);
        skipLeadingQuote = quotedBindingPattern.test(strings[i] ?? "");
        chunk = chunk.replace(
          eventBindingPattern,
          `$1data-pds-bind-${i}="event:${eventName}:${marker}"`
        );
        consumedValues.add(i);
      } else if (boolMatch) {
        const attrName = boolMatch[2].slice(1);
        skipLeadingQuote = quotedBindingPattern.test(strings[i] ?? "");
        chunk = chunk.replace(
          booleanBindingPattern,
          `$1data-pds-bind-${i}="boolean:${attrName}:${marker}"`
        );
        consumedValues.add(i);
      } else if (attrMatch) {
        const attrName = attrMatch[2];
        skipLeadingQuote = quotedBindingPattern.test(strings[i] ?? "");
        chunk = chunk.replace(
          attrBindingPattern,
          `$1data-pds-bind-${i}="attr:${attrName}:${marker}"`
        );
        consumedValues.add(i);
      }
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
    [...el.attributes].forEach((attr) => {
      if (!attr.name.startsWith("data-pds-bind-"))
        return;
      const firstColon = attr.value.indexOf(":");
      const lastColon = attr.value.lastIndexOf(":");
      if (firstColon <= 0 || lastColon <= firstColon) {
        el.removeAttribute(attr.name);
        return;
      }
      const kind = attr.value.slice(0, firstColon);
      const bindingName = attr.value.slice(firstColon + 1, lastColon);
      const markerValue = attr.value.slice(lastColon + 1);
      const index = Number(String(markerValue).replace("pds-val-", ""));
      const value = values[index];
      if (!bindingName || !Number.isInteger(index)) {
        el.removeAttribute(attr.name);
        return;
      }
      if (kind === "prop") {
        el[bindingName] = value;
      } else if (kind === "event") {
        if (typeof value === "function" || value && typeof value.handleEvent === "function") {
          el.addEventListener(bindingName, value);
        }
      } else if (kind === "boolean") {
        if (value) {
          el.setAttribute(bindingName, "");
        } else {
          el.removeAttribute(bindingName);
        }
      } else if (kind === "attr") {
        if (value == null || value === false) {
          el.removeAttribute(bindingName);
        } else {
          el.setAttribute(bindingName, String(value));
        }
      }
      el.removeAttribute(attr.name);
    });
  });
  return tpl.content;
}

// src/js/pds-singleton.js
var PDSBase = class extends EventTarget {
  constructor() {
    super();
    this.mode = null;
    this.compiled = null;
    this.log = () => {
    };
    this.logHandler = null;
  }
};
var PDS_SINGLETON_KEY = "__PURE_DS_PDS_SINGLETON__";
var globalScope = typeof globalThis !== "undefined" ? globalThis : window;
var existingPDS = globalScope?.[PDS_SINGLETON_KEY];
var PDS = existingPDS && typeof existingPDS.addEventListener === "function" ? existingPDS : new PDSBase();
if (globalScope) {
  globalScope[PDS_SINGLETON_KEY] = PDS;
}
if (typeof PDS.log !== "function") {
  PDS.log = (level = "log", message, ...data) => {
    if (typeof console === "undefined")
      return;
    const method = typeof console[level] === "function" ? console[level].bind(console) : typeof console.log === "function" ? console.log.bind(console) : null;
    if (!method)
      return;
    if (data.length > 0) {
      method(message, ...data);
    } else {
      method(message);
    }
  };
}
if (typeof PDS.logHandler !== "function") {
  PDS.logHandler = null;
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
function validateDialogFormTree(form) {
  if (!form)
    return true;
  let valid = true;
  const describeElement = (el) => {
    if (!el || typeof el !== "object")
      return "<unknown>";
    const tag = el.tagName ? String(el.tagName).toLowerCase() : "node";
    const id = el.id ? `#${el.id}` : "";
    const name = typeof el.getAttribute === "function" ? el.getAttribute("name") : null;
    const namePart = name ? `[name="${name}"]` : "";
    return `${tag}${id}${namePart}`;
  };
  const reportInvalidControls = (root, scopeLabel) => {
    if (!root || typeof root.querySelectorAll !== "function")
      return;
    const invalidControls = Array.from(root.querySelectorAll(":invalid"));
    if (!invalidControls.length)
      return;
    const list = invalidControls.map((el) => {
      const message = typeof el.validationMessage === "string" ? el.validationMessage : "";
      return `${describeElement(el)}${message ? ` \u2014 ${message}` : ""}`;
    });
    PDS.log("warn", `ask.validateDialogFormTree: invalid controls in ${scopeLabel}:`, list);
  };
  const runValidity = (target, scopeLabel) => {
    try {
      const targetValid = typeof target.reportValidity === "function" ? target.reportValidity() : target.checkValidity?.() ?? true;
      if (!targetValid) {
        reportInvalidControls(target, scopeLabel);
      }
      return targetValid;
    } catch (error) {
      PDS.log("error", `ask.validateDialogFormTree: validation threw in ${scopeLabel}`, error);
      return false;
    }
  };
  valid = runValidity(form, "host dialog form") && valid;
  const nestedLightDomForms = Array.from(form.querySelectorAll("form"));
  for (const nestedForm of nestedLightDomForms) {
    if (nestedForm === form)
      continue;
    const nestedValid = runValidity(nestedForm, `nested light DOM form ${describeElement(nestedForm)}`);
    valid = nestedValid && valid;
  }
  const descendants = Array.from(form.querySelectorAll("*"));
  for (const host of descendants) {
    const root = host?.shadowRoot;
    if (!root)
      continue;
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
  const buttonConfigs = options.buttons && typeof options.buttons === "object" ? options.buttons : defaults.buttons;
  const resolveActionMeta = (actionCode) => {
    if (actionCode == null) {
      return {
        actionCode: "dismiss",
        actionKind: "dismiss",
        button: null
      };
    }
    const button = buttonConfigs?.[actionCode] ?? null;
    const actionKind = actionCode === "ok" ? "ok" : actionCode === "dismiss" ? "dismiss" : button?.cancel || actionCode === "cancel" ? "cancel" : "custom";
    return {
      actionCode,
      actionKind,
      button
    };
  };
  const normalizeBeforeCloseResult = (result) => {
    if (typeof result === "undefined" || result === null || result === true) {
      return { allow: true };
    }
    if (result === false) {
      return { allow: false };
    }
    if (typeof result === "object") {
      const hasResult = Object.prototype.hasOwnProperty.call(result, "result") || Object.prototype.hasOwnProperty.call(result, "value");
      return {
        allow: result.allow !== false,
        hasResult,
        result: Object.prototype.hasOwnProperty.call(result, "result") ? result.result : result.value
      };
    }
    return { allow: Boolean(result) };
  };
  return new Promise((resolve) => {
    let settled = false;
    const settle = (value, dialog2, { shouldClose = true } = {}) => {
      if (settled)
        return;
      settled = true;
      resolve(value);
      if (!shouldClose || !dialog2?.open) {
        return;
      }
      try {
        dialog2.close();
      } catch (error) {
        PDS.log("warn", "ask: dialog.close() failed", error);
      }
    };
    const runBeforeClose = async (context) => {
      if (context.actionKind !== "ok" || typeof options.beforeClose !== "function") {
        return { allow: true };
      }
      try {
        const beforeCloseResult = await options.beforeClose(context);
        return normalizeBeforeCloseResult(beforeCloseResult);
      } catch (error) {
        PDS.log("error", "ask.beforeClose: validation failed", error);
        return { allow: false };
      }
    };
    const resolveDefaultResult = ({ actionKind, form }) => {
      if (actionKind === "ok") {
        if (options.useForm && form) {
          return new FormData(form);
        }
        return true;
      }
      return false;
    };
    const attemptResolve = async ({
      actionCode,
      form,
      submitter,
      originalEvent,
      bypassValidation = false,
      shouldClose = true
    }) => {
      if (settled)
        return;
      const { actionKind, button } = resolveActionMeta(actionCode);
      const activeForm = form || dialog.querySelector("form") || null;
      if (options.useForm && actionKind === "ok" && activeForm && !bypassValidation) {
        const valid = validateDialogFormTree(activeForm);
        if (!valid) {
          return;
        }
      }
      const defaultResult = resolveDefaultResult({
        actionKind,
        form: activeForm
      });
      const guard = await runBeforeClose({
        actionCode,
        actionKind,
        dialog,
        form: activeForm,
        formData: options.useForm && actionKind === "ok" && activeForm ? defaultResult : null,
        submitter,
        originalEvent,
        options,
        button,
        defaultResult
      });
      if (!guard.allow) {
        return;
      }
      const result = guard.hasResult ? guard.result : defaultResult;
      settle(result, dialog, { shouldClose });
    };
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
    const buttons = Object.entries(buttonConfigs).map(([code, obj]) => {
      const btnClass = obj.primary ? "btn-primary btn-sm" : "btn-outline btn-sm";
      const btnType = obj.cancel ? "button" : "submit";
      const formNoValidate = obj.formNoValidate ? " formnovalidate" : "";
      return `<button type="${btnType}" class="${btnClass}" value="${code}"${formNoValidate}>${obj.name}</button>`;
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
        attemptResolve({
          actionCode: "cancel",
          form: dialog.querySelector("form"),
          submitter: btn,
          originalEvent: e
        });
      }
    });
    const setupFormListener = () => {
      const form = dialog.querySelector("form");
      if (form) {
        if (form.dataset.askSubmitBound === "true") {
          return;
        }
        form.dataset.askSubmitBound = "true";
        form.addEventListener("submit", (event) => {
          event.preventDefault();
          const submitValue = event.submitter?.value ?? (options.useForm ? "ok" : void 0);
          const bypassValidation = Boolean(event.submitter?.hasAttribute("formnovalidate"));
          attemptResolve({
            actionCode: submitValue,
            form,
            submitter: event.submitter,
            originalEvent: event,
            bypassValidation
          });
        });
      } else {
        requestAnimationFrame(setupFormListener);
      }
    };
    dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      attemptResolve({
        actionCode: "dismiss",
        form: dialog.querySelector("form"),
        originalEvent: event
      });
    });
    dialog.addEventListener("close", () => {
      if (!settled) {
        settle(false, dialog, { shouldClose: false });
      }
      setTimeout(() => dialog.remove(), 200);
    });
    document.body.appendChild(dialog);
    requestAnimationFrame(setupFormListener);
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
