export function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

export function deepMerge(target, source) {
    const output = { ...target };
    if (isObject(target) && isObject(source)) {
      Object.keys(source).forEach(key => {
        if (isObject(source[key])) {
          if (!(key in target))
            Object.assign(output, { [key]: source[key] });
          else
            output[key] = deepMerge(target[key], source[key]);
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    return output;
  }

/**
 * Build a DocumentFragment from a template-like object (strings + values)
 * @param {{strings: string[], values: unknown[]}} templateLike
 * @returns {DocumentFragment}
 */
export function fragmentFromTemplateLike(templateLike) {
  const strings = Array.isArray(templateLike?.strings) ? templateLike.strings : [];
  const values = Array.isArray(templateLike?.values) ? templateLike.values : [];
  const consumedValues = new Set();
  const htmlParts = [];

  // Patterns handle both quoted (attr="${val}") and unquoted (attr=${val}) forms.
  const propBindingPattern = /(\s)(\.[\w-]+)=["']?\s*$/;
  const eventBindingPattern = /(\s)(@[\w-]+)=["']?\s*$/;
  const booleanBindingPattern = /(\s)(\?[\w-]+)=["']?\s*$/;
  const attrBindingPattern = /(\s)([\w:-]+)=["']?\s*$/;
  // Detects whether the original string used a quoted binding (e.g. attr="..."),
  // so we can strip the matching closing quote from the next string part.
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
    if (!parent) return;

    if (value == null) {
      parent.removeChild(markerNode);
      return;
    }

    const insertValue = (val) => {
      if (val == null) return;
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
      if (!attr.name.startsWith("data-pds-bind-")) return;

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
        if (typeof value === "function" || (value && typeof value.handleEvent === "function")) {
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

/**
 * Parses either an HTML string or tagged template into a DocumentFragment.
 * Useful when you want direct appendChild(fragment) ergonomics.
 * @param {string | TemplateStringsArray | {strings: string[], values: unknown[]}} html
 * @param {...unknown} values
 * @returns {DocumentFragment}
 */
export function parseFragment(html, ...values) {
  const isTaggedTemplate =
    Array.isArray(html) && Object.prototype.hasOwnProperty.call(html, "raw");

  if (isTaggedTemplate) {
    return fragmentFromTemplateLike({ strings: Array.from(html), values });
  }

  if (Array.isArray(html?.strings) && Array.isArray(html?.values)) {
    return fragmentFromTemplateLike({ strings: html.strings, values: html.values });
  }

  const tpl = document.createElement("template");
  tpl.innerHTML = String(html ?? "");
  return tpl.content;
}

/**
 * Parses either an HTML string or a tagged template into DOM nodes.
 * 
 * Supports two modes:
 * 1. String mode: PDS.parse(htmlString) - returns NodeList, no binding support
 *    Example: PDS.parse(`<button class="btn">Click</button>`)
 * 
 * 2. Tagged template mode: PDS.parse`...` - supports Lit-like bindings
 *    Bindings: `.prop=${value}`, `@event=${handler}`, `?boolean=${flag}`, `attr=${value}`
 *    Example: PDS.parse`<h1 @click=${handler}>...</h1>`
 * 
 * @param {string | TemplateStringsArray | {strings: string[], values: unknown[]}} html
 * @param {...unknown} values
 * @returns {NodeListOf<ChildNode>}
 */
export function parseHTML(html, ...values) {
  return parseFragment(html, ...values).childNodes;
}

export function throttle(fn, timeoutMs = 100) {
  let handle;
  return function throttled(...args) {
    const fire = () => {
      clearTimeout(handle);
      fn(...args);
    };
    clearTimeout(handle);
    handle = setTimeout(fire, timeoutMs);
  };
}

export function enQueue(fn) {
  setTimeout(fn, 0);
}

export function isUrl(str) {
  try {
    if (typeof str !== "string") return false;
    if (str.indexOf("\n") !== -1 || str.indexOf(" ") !== -1) return false;
    if (str.startsWith("#/")) return false;
    const newUrl = new URL(str, window.location.origin);
    return newUrl.protocol === "http:" || newUrl.protocol === "https:";
  } catch {
    return false;
  }
}

export function withTimeout(promise, timeoutMs, label = "Operation") {
  if (!timeoutMs || timeoutMs <= 0) return promise;

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error(`${label} timed out after ${timeoutMs}ms`));
    }, timeoutMs);

    Promise.resolve(promise)
      .then((value) => {
        clearTimeout(timeout);
        resolve(value);
      })
      .catch((error) => {
        clearTimeout(timeout);
        reject(error);
      });
  });
}

export function escapeForRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function openCenteredWindow(url, width, height) {
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;
  return window.open(
    url,
    "",
    `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=${width}, height=${height}, top=${top}, left=${left}`,
  );
}

export function humanizeIdentifier(value) {
  if (value == null) return "";
  const input = String(value).trim();
  if (!input) return "";

  return input
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
