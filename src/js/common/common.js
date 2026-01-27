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
    const propAttr = el.getAttribute("data-pds-prop");
    if (!propAttr) return;
    const [propName, markerValue] = propAttr.split(":");
    const index = Number(String(markerValue).replace("pds-val-", ""));
    if (propName && Number.isInteger(index)) {
      el[propName] = values[index];
    }
    el.removeAttribute("data-pds-prop");
  });

  return tpl.content;
}