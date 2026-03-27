var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// node_modules/pure-web/src/js/auto-definer.js
var auto_definer_exports = {};
__export(auto_definer_exports, {
  AutoDefiner: () => AutoDefiner
});
async function defineWebComponents(...args) {
  let opts = {};
  if (args.length && typeof args[args.length - 1] === "object") {
    opts = args.pop() || {};
  }
  const tags = args;
  const {
    baseURL,
    mapper = (tag) => `${tag}.js`,
    onError = (tag, err) => console.error(`[defineWebComponents] ${tag}:`, err)
  } = opts;
  const base = baseURL ? new URL(
    baseURL,
    typeof location !== "undefined" ? location.href : import.meta.url
  ) : new URL("./", import.meta.url);
  const toPascal = (tag) => tag.toLowerCase().replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase());
  const loadOne = async (tag) => {
    try {
      if (customElements.get(tag))
        return { tag, status: "already-defined" };
      const spec = mapper(tag);
      const href = spec instanceof URL ? spec.href : new URL(spec, base).href;
      const mod = await import(href);
      const Named = mod?.default ?? mod?.[toPascal(tag)];
      if (!Named) {
        if (customElements.get(tag))
          return { tag, status: "self-defined" };
        throw new Error(
          `No export found for ${tag}. Expected default export or named export "${toPascal(
            tag
          )}".`
        );
      }
      if (!customElements.get(tag)) {
        customElements.define(tag, Named);
        return { tag, status: "defined" };
      }
      return { tag, status: "race-already-defined" };
    } catch (err) {
      onError(tag, err);
      throw err;
    }
  };
  return Promise.all(tags.map(loadOne));
}
var AutoDefiner;
var init_auto_definer = __esm({
  "node_modules/pure-web/src/js/auto-definer.js"() {
    AutoDefiner = class {
      constructor(options = {}) {
        const {
          baseURL,
          mapper,
          onError,
          predicate = () => true,
          attributeModule = "data-module",
          root = document,
          scanExisting = true,
          debounceMs = 16,
          observeShadows = true,
          enhancers = [],
          // [{String selector, Function run(elem)}]
          patchAttachShadow = true
        } = options;
        const pending = /* @__PURE__ */ new Set();
        const inFlight = /* @__PURE__ */ new Set();
        const knownMissing = /* @__PURE__ */ new Set();
        const perTagModulePath = /* @__PURE__ */ new Map();
        const shadowObservers = /* @__PURE__ */ new WeakMap();
        const enhancerApplied = /* @__PURE__ */ new WeakMap();
        let timer = 0;
        let stopped = false;
        let restoreAttachShadow = null;
        const applyEnhancers = (element) => {
          if (!element || !enhancers.length)
            return;
          let appliedEnhancers = enhancerApplied.get(element);
          if (!appliedEnhancers) {
            appliedEnhancers = /* @__PURE__ */ new Set();
            enhancerApplied.set(element, appliedEnhancers);
          }
          for (const enhancer of enhancers) {
            if (!enhancer.selector || !enhancer.run)
              continue;
            if (appliedEnhancers.has(enhancer.selector))
              continue;
            try {
              if (element.matches && element.matches(enhancer.selector)) {
                enhancer.run(element);
                appliedEnhancers.add(enhancer.selector);
              }
            } catch (err) {
              console.warn(
                `[AutoDefiner] Error applying enhancer for selector "${enhancer.selector}":`,
                err
              );
            }
          }
        };
        const queueTag = (tag, el) => {
          if (stopped)
            return;
          if (!tag || !tag.includes("-"))
            return;
          if (customElements.get(tag))
            return;
          if (inFlight.has(tag))
            return;
          if (knownMissing.has(tag))
            return;
          if (el && el.getAttribute) {
            const override = el.getAttribute(attributeModule);
            if (override && !perTagModulePath.has(tag)) {
              perTagModulePath.set(tag, override);
            }
          }
          pending.add(tag);
          schedule();
        };
        const schedule = () => {
          if (timer)
            return;
          timer = setTimeout(flush, debounceMs);
        };
        const crawlTree = (rootNode) => {
          if (!rootNode)
            return;
          if (rootNode.nodeType === 1) {
            const el = (
              /** @type {Element} */
              rootNode
            );
            const tag = el.tagName?.toLowerCase();
            if (tag && tag.includes("-") && !customElements.get(tag) && predicate(tag, el)) {
              queueTag(tag, el);
            }
            applyEnhancers(el);
            if (observeShadows && el.shadowRoot) {
              observeShadowRoot(el.shadowRoot);
            }
          }
          if (rootNode.querySelectorAll) {
            rootNode.querySelectorAll("*").forEach((e) => {
              const t = e.tagName?.toLowerCase();
              if (t && t.includes("-") && !customElements.get(t) && predicate(t, e)) {
                queueTag(t, e);
              }
              applyEnhancers(e);
              if (observeShadows && e.shadowRoot) {
                observeShadowRoot(e.shadowRoot);
              }
            });
          }
        };
        const observeShadowRoot = (sr) => {
          if (!sr || shadowObservers.has(sr))
            return;
          crawlTree(sr);
          const mo = new MutationObserver((mutations) => {
            for (const m of mutations) {
              m.addedNodes?.forEach((n) => {
                crawlTree(n);
              });
              if (m.type === "attributes" && m.target) {
                crawlTree(m.target);
              }
            }
          });
          mo.observe(sr, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: [
              attributeModule,
              ...enhancers.map((e) => e.selector).filter((s) => s.startsWith("data-"))
            ]
          });
          shadowObservers.set(sr, mo);
        };
        async function flush() {
          clearTimeout(timer);
          timer = 0;
          if (!pending.size)
            return;
          const tags = Array.from(pending);
          pending.clear();
          tags.forEach((t) => inFlight.add(t));
          try {
            const effectiveMapper = (tag) => perTagModulePath.get(tag) ?? (mapper ? mapper(tag) : `${tag}.js`);
            await defineWebComponents(...tags, {
              baseURL,
              mapper: effectiveMapper,
              onError: (tag, err) => {
                knownMissing.add(tag);
                onError?.(tag, err);
              }
            });
          } catch {
          } finally {
            tags.forEach((t) => inFlight.delete(t));
          }
        }
        const mountNode = root === document ? document.documentElement : root;
        const obs = new MutationObserver((mutations) => {
          for (const m of mutations) {
            m.addedNodes?.forEach((n) => {
              crawlTree(n);
            });
            if (m.type === "attributes" && m.target) {
              crawlTree(m.target);
            }
          }
        });
        obs.observe(mountNode, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: [
            attributeModule,
            ...enhancers.map((e) => e.selector).filter((s) => s.startsWith("data-"))
          ]
        });
        if (observeShadows && patchAttachShadow && Element.prototype.attachShadow) {
          const orig = Element.prototype.attachShadow;
          Element.prototype.attachShadow = function patchedAttachShadow(init) {
            const sr = orig.call(this, init);
            if (init && init.mode === "open") {
              observeShadowRoot(sr);
              const tag = this.tagName?.toLowerCase();
              if (tag && tag.includes("-") && !customElements.get(tag)) {
                queueTag(tag, this);
              }
            }
            return sr;
          };
          restoreAttachShadow = () => Element.prototype.attachShadow = orig;
        }
        if (scanExisting) {
          crawlTree(mountNode);
        }
        return {
          stop() {
            stopped = true;
            obs.disconnect();
            if (restoreAttachShadow)
              restoreAttachShadow();
            if (timer) {
              clearTimeout(timer);
              timer = 0;
            }
            shadowObservers.forEach((mo) => mo.disconnect());
          },
          flush
        };
      }
      /**
       * Dynamically load and (idempotently) define a set of web components by tag name.
       */
      static async define(...args) {
        let opts = {};
        if (args.length && typeof args[args.length - 1] === "object") {
          opts = args.pop() || {};
        }
        const tags = args;
        const {
          baseURL,
          mapper = (tag) => `${tag}.js`,
          onError = (tag, err) => console.error(`[defineWebComponents] ${tag}:`, err)
        } = opts;
        const base = baseURL ? new URL(
          baseURL,
          typeof location !== "undefined" ? location.href : import.meta.url
        ) : new URL("./", import.meta.url);
        const toPascal = (tag) => tag.toLowerCase().replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase());
        const loadOne = async (tag) => {
          try {
            if (customElements.get(tag))
              return { tag, status: "already-defined" };
            const spec = mapper(tag);
            const href = spec instanceof URL ? spec.href : new URL(spec, base).href;
            const mod = await import(href);
            const Named = mod?.default ?? mod?.[toPascal(tag)];
            if (!Named) {
              if (customElements.get(tag))
                return { tag, status: "self-defined" };
              throw new Error(
                `No export found for ${tag}. Expected default export or named export "${toPascal(
                  tag
                )}".`
              );
            }
            if (!customElements.get(tag)) {
              customElements.define(tag, Named);
              return { tag, status: "defined" };
            }
            return { tag, status: "race-already-defined" };
          } catch (err) {
            onError(tag, err);
            throw err;
          }
        };
        return Promise.all(tags.map(loadOne));
      }
    };
  }
});

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

// src/js/pds-core/pds-registry.js
var PDSRegistry = class {
  constructor() {
    this._mode = "static";
    this._staticPaths = {
      tokens: "/assets/pds/styles/pds-tokens.css.js",
      primitives: "/assets/pds/styles/pds-primitives.css.js",
      components: "/assets/pds/styles/pds-components.css.js",
      utilities: "/assets/pds/styles/pds-utilities.css.js",
      styles: "/assets/pds/styles/pds-styles.css.js"
    };
  }
  /**
   * Switch to live mode
   */
  setLiveMode() {
    this._mode = "live";
  }
  /**
   * Switch to static mode with custom paths
   * Called by consumers who want to use static CSS files
   */
  setStaticMode(paths = {}) {
    this._mode = "static";
    this._staticPaths = { ...this._staticPaths, ...paths };
  }
  /**
   * Get stylesheet for adoption in shadow DOM
   * Returns CSSStyleSheet object (constructable stylesheet)
   */
  async getStylesheet(layer) {
    if (this._mode === "live") {
      return null;
    } else {
      try {
        const module = await import(
          /* @vite-ignore */
          this._staticPaths[layer]
        );
        return module[layer];
      } catch (error) {
        PDS.log("error", `Registry: failed to load static ${layer}:`, error);
        PDS.log("error", `Registry: looking for ${this._staticPaths[layer]}`);
        PDS.log("error", "Registry: make sure you've run 'npm run pds:build' and configured PDS.start() with the correct static.root path");
        const fallback = new CSSStyleSheet();
        fallback.replaceSync("/* Failed to load " + layer + " */");
        return fallback;
      }
    }
  }
  /**
   * Get current mode
   */
  get mode() {
    return this._mode;
  }
  /**
   * Check if in live mode
   */
  get isLive() {
    return this._mode === "live";
  }
};
var registry = new PDSRegistry();

// src/js/pds-core/pds-runtime.js
async function adoptPrimitives(shadowRoot, additionalSheets = [], generator = null) {
  try {
    const primitives = generator?.primitivesStylesheet ? generator.primitivesStylesheet : await registry.getStylesheet("primitives");
    shadowRoot.adoptedStyleSheets = [primitives, ...additionalSheets];
  } catch (error) {
    const componentName = shadowRoot.host?.tagName?.toLowerCase() || "unknown";
    PDS.log(
      "error",
      `Adopter: <${componentName}> failed to adopt primitives:`,
      error
    );
    shadowRoot.adoptedStyleSheets = additionalSheets;
  }
}
async function adoptLayers(shadowRoot, layers = ["primitives"], additionalSheets = [], generator = null) {
  const safeAdditionalSheets = Array.isArray(additionalSheets) ? additionalSheets.filter(Boolean) : [];
  if (safeAdditionalSheets.length) {
    const existing = Array.isArray(shadowRoot.adoptedStyleSheets) ? shadowRoot.adoptedStyleSheets : [];
    const nonAdditional = existing.filter(
      (sheet) => !safeAdditionalSheets.includes(sheet)
    );
    shadowRoot.adoptedStyleSheets = [...nonAdditional, ...safeAdditionalSheets];
  }
  try {
    const stylesheets = await Promise.all(
      layers.map(async (layer) => {
        if (generator) {
          switch (layer) {
            case "tokens":
              return generator.tokensStylesheet;
            case "primitives":
              return generator.primitivesStylesheet;
            case "components":
              return generator.componentsStylesheet;
            case "utilities":
              return generator.utilitiesStylesheet;
            default:
              break;
          }
        }
        return registry.getStylesheet(layer);
      })
    );
    const validStylesheets = stylesheets.filter((sheet) => sheet !== null);
    shadowRoot.adoptedStyleSheets = [...validStylesheets, ...safeAdditionalSheets];
  } catch (error) {
    const componentName = shadowRoot.host?.tagName?.toLowerCase() || "unknown";
    PDS.log(
      "error",
      `Adopter: <${componentName}> failed to adopt layers:`,
      error
    );
    shadowRoot.adoptedStyleSheets = safeAdditionalSheets;
  }
}
function createStylesheet(css) {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(css);
  return sheet;
}

// src/js/pds-core/pds-enums.js
var enums = {
  FontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  },
  LineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75
  },
  BorderWidths: {
    hairline: 0.5,
    thin: 1,
    medium: 2,
    thick: 3
  },
  RadiusSizes: {
    none: 0,
    small: 4,
    medium: 8,
    large: 16,
    xlarge: 24,
    xxlarge: 32
  },
  ShadowDepths: {
    none: "none",
    light: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    medium: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    deep: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    extreme: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
  },
  TransitionSpeeds: {
    fast: 150,
    normal: 250,
    slow: 350
  },
  AnimationEasings: {
    linear: "linear",
    ease: "ease",
    "ease-in": "ease-in",
    "ease-out": "ease-out",
    "ease-in-out": "ease-in-out",
    bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
  },
  TouchTargetSizes: {
    compact: 36,
    standard: 44,
    // iOS/Android accessibility standard
    comfortable: 48,
    spacious: 56
  },
  LinkStyles: {
    inline: "inline",
    // Normal inline text links
    block: "block",
    // Block-level links
    button: "button"
    // Button-like links (flex with touch target)
  },
  FocusStyles: {
    ring: "ring",
    // Box-shadow ring (default)
    outline: "outline",
    // Browser outline
    border: "border",
    // Border change
    glow: "glow"
    // Subtle glow effect
  },
  TabSizes: {
    compact: 2,
    standard: 4,
    wide: 8
  },
  SelectIcons: {
    chevron: "chevron",
    // Standard chevron down
    arrow: "arrow",
    // Simple arrow
    caret: "caret",
    // Triangle caret
    none: "none"
    // No icon
  },
  IconSizes: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 48,
    "2xl": 64,
    "3xl": 96
  }
};

// src/js/common/common.js
var common_exports = {};
__export(common_exports, {
  deepMerge: () => deepMerge,
  fragmentFromTemplateLike: () => fragmentFromTemplateLike,
  isObject: () => isObject,
  parseFragment: () => parseFragment,
  parseHTML: () => parseHTML
});
function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}
function deepMerge(target, source) {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
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
function parseFragment(html2, ...values) {
  const isTaggedTemplate = Array.isArray(html2) && Object.prototype.hasOwnProperty.call(html2, "raw");
  if (isTaggedTemplate) {
    return fragmentFromTemplateLike({ strings: Array.from(html2), values });
  }
  if (Array.isArray(html2?.strings) && Array.isArray(html2?.values)) {
    return fragmentFromTemplateLike({ strings: html2.strings, values: html2.values });
  }
  const tpl = document.createElement("template");
  tpl.innerHTML = String(html2 ?? "");
  return tpl.content;
}
function parseHTML(html2, ...values) {
  return parseFragment(html2, ...values).childNodes;
}

// src/js/pds-core/pds-paths.js
var DEFAULT_SEGMENT = "pds";
var URL_PATTERN = /^([a-z][a-z0-9+\-.]*:)?\/\//i;
var DRIVE_PATTERN = /^[a-z]:/i;
function ensureTrailingSlash(value = "") {
  return value.endsWith("/") ? value : `${value}/`;
}
function appendSegmentIfMissing(input = "", segment = DEFAULT_SEGMENT) {
  const trimmed = input.replace(/\/+$/, "");
  const regex = new RegExp(`(?:^|/)${segment}$`, "i");
  if (regex.test(trimmed)) {
    return trimmed;
  }
  return `${trimmed}/${segment}`;
}
function stripLeadingDotSlash(value) {
  return value.replace(/^\.\/+/, "");
}
function stripDriveLetter(value) {
  if (DRIVE_PATTERN.test(value)) {
    return value.replace(DRIVE_PATTERN, "").replace(/^\/+/, "");
  }
  return value;
}
function stripPublicPrefix(value) {
  if (value.startsWith("public/")) {
    return value.substring("public/".length);
  }
  return value;
}
function resolvePublicAssetURL(config, options = {}) {
  const segment = options.segment || DEFAULT_SEGMENT;
  const defaultRoot = options.defaultRoot || `/assets/${segment}/`;
  const candidate = config?.public && config.public?.root || config?.static && config.static?.root || null;
  if (!candidate || typeof candidate !== "string") {
    return ensureTrailingSlash(defaultRoot);
  }
  let normalized = candidate.trim();
  if (!normalized) {
    return ensureTrailingSlash(defaultRoot);
  }
  normalized = normalized.replace(/\\/g, "/");
  normalized = appendSegmentIfMissing(normalized, segment);
  normalized = ensureTrailingSlash(normalized);
  if (URL_PATTERN.test(normalized)) {
    return normalized;
  }
  normalized = stripLeadingDotSlash(normalized);
  normalized = stripDriveLetter(normalized);
  if (normalized.startsWith("/")) {
    return ensureTrailingSlash(normalized);
  }
  normalized = stripPublicPrefix(normalized);
  if (!normalized.startsWith("/")) {
    normalized = `/${normalized}`;
  }
  normalized = normalized.replace(
    /\/+/g,
    (match, offset) => offset === 0 ? match : "/"
  );
  return ensureTrailingSlash(normalized);
}

// src/js/pds-core/pds-start-helpers.js
var __coreAutoDefinerCtorPromise = null;
async function getCoreAutoDefinerCtor() {
  if (!__coreAutoDefinerCtorPromise) {
    __coreAutoDefinerCtorPromise = Promise.resolve().then(() => (init_auto_definer(), auto_definer_exports)).then((mod) => mod?.AutoDefiner || mod?.default?.AutoDefiner || mod?.default).then((ctor) => {
      if (typeof ctor !== "function") {
        throw new Error("AutoDefiner constructor not found in pure-web/auto-definer");
      }
      return ctor;
    });
  }
  return __coreAutoDefinerCtorPromise;
}
var __ABSOLUTE_URL_PATTERN__ = /^[a-z][a-z0-9+\-.]*:\/\//i;
var __MODULE_URL__ = (() => {
  try {
    return import.meta.url;
  } catch (e) {
    return void 0;
  }
})();
var ensureTrailingSlash2 = (value) => typeof value === "string" && value.length && !value.endsWith("/") ? `${value}/` : value;
function ensureAbsoluteAssetURL(value, options = {}) {
  if (!value || __ABSOLUTE_URL_PATTERN__.test(value)) {
    return value;
  }
  const { preferModule = true } = options;
  const tryModule = () => {
    if (!__MODULE_URL__)
      return null;
    try {
      return new URL(value, __MODULE_URL__).href;
    } catch (e) {
      return null;
    }
  };
  const tryWindow = () => {
    if (typeof window === "undefined" || !window.location?.origin) {
      return null;
    }
    try {
      return new URL(value, window.location.origin).href;
    } catch (e) {
      return null;
    }
  };
  const resolved = preferModule ? tryModule() || tryWindow() : tryWindow() || tryModule();
  return resolved || value;
}
var __MODULE_DEFAULT_ASSET_ROOT__ = (() => {
  if (!__MODULE_URL__)
    return void 0;
  try {
    const parsed = new URL(__MODULE_URL__);
    if (/\/public\/assets\/js\//.test(parsed.pathname)) {
      return new URL("../pds/", __MODULE_URL__).href;
    }
  } catch (e) {
    return void 0;
  }
  return void 0;
})();
var __foucListenerAttached = false;
function attachFoucListener(PDS2) {
  if (__foucListenerAttached || typeof document === "undefined")
    return;
  __foucListenerAttached = true;
  PDS2.addEventListener("pds:ready", (event) => {
    const mode = event.detail?.mode;
    if (mode) {
      document.documentElement.classList.add(`pds-${mode}`, "pds-ready");
    }
  });
}
function resolveThemeAndApply({ manageTheme, themeStorageKey, applyResolvedTheme: applyResolvedTheme2, setupSystemListenerIfNeeded: setupSystemListenerIfNeeded2 }) {
  let resolvedTheme = "light";
  let storedTheme = null;
  if (manageTheme && typeof window !== "undefined") {
    try {
      storedTheme = localStorage.getItem(themeStorageKey) || null;
    } catch (e) {
      storedTheme = null;
    }
    try {
      applyResolvedTheme2?.(storedTheme);
      setupSystemListenerIfNeeded2?.(storedTheme);
    } catch (e) {
    }
    if (storedTheme) {
      if (storedTheme === "system") {
        const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        resolvedTheme = prefersDark ? "dark" : "light";
      } else {
        resolvedTheme = storedTheme;
      }
    } else {
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      resolvedTheme = prefersDark ? "dark" : "light";
    }
  }
  return { resolvedTheme, storedTheme };
}
function resolveRuntimeAssetRoot(config, { resolvePublicAssetURL: resolvePublicAssetURL2 }) {
  const hasCustomRoot = Boolean(config?.public?.root || config?.static?.root);
  let candidate = resolvePublicAssetURL2(config);
  if (!hasCustomRoot && __MODULE_DEFAULT_ASSET_ROOT__) {
    candidate = __MODULE_DEFAULT_ASSET_ROOT__;
  }
  return ensureTrailingSlash2(ensureAbsoluteAssetURL(candidate));
}
async function setupAutoDefinerAndEnhancers(options, { baseEnhancers = [] } = {}) {
  const {
    autoDefineBaseURL = "/auto-define/",
    autoDefinePreload = [],
    autoDefineMapper = null,
    enhancers = [],
    autoDefineOverrides = null,
    autoDefinePreferModule = true
  } = options;
  const mergedEnhancers = (() => {
    const map = /* @__PURE__ */ new Map();
    (baseEnhancers || []).forEach((e) => map.set(e.selector, e));
    (enhancers || []).forEach((e) => map.set(e.selector, e));
    return Array.from(map.values());
  })();
  let autoDefiner = null;
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    const AutoDefinerCtor = await getCoreAutoDefinerCtor();
    const defaultMapper = (tag) => {
      switch (tag) {
        case "pds-tabpanel":
          return "pds-tabstrip.js";
        default:
          return `${tag}.js`;
      }
    };
    const {
      mapper: _overrideMapperIgnored,
      enhancers: overrideEnhancers,
      ...restAutoDefineOverrides
    } = autoDefineOverrides && typeof autoDefineOverrides === "object" ? autoDefineOverrides : {};
    const normalizedOverrideEnhancers = (() => {
      if (!overrideEnhancers)
        return [];
      if (Array.isArray(overrideEnhancers))
        return overrideEnhancers;
      if (typeof overrideEnhancers === "object") {
        return Object.values(overrideEnhancers);
      }
      return [];
    })();
    const resolvedEnhancers = (() => {
      const map = /* @__PURE__ */ new Map();
      (mergedEnhancers || []).forEach((enhancer) => {
        if (!enhancer?.selector)
          return;
        map.set(enhancer.selector, enhancer);
      });
      (normalizedOverrideEnhancers || []).forEach((enhancer) => {
        if (!enhancer?.selector)
          return;
        const existing = map.get(enhancer.selector) || null;
        map.set(enhancer.selector, {
          ...existing || {},
          ...enhancer,
          run: typeof enhancer?.run === "function" ? enhancer.run : existing?.run
        });
      });
      return Array.from(map.values());
    })();
    const normalizedBaseURL = autoDefineBaseURL ? ensureTrailingSlash2(
      ensureAbsoluteAssetURL(autoDefineBaseURL, {
        preferModule: autoDefinePreferModule
      })
    ) : autoDefineBaseURL;
    const autoDefineConfig = {
      baseURL: normalizedBaseURL,
      predefine: autoDefinePreload,
      scanExisting: true,
      observeShadows: true,
      patchAttachShadow: true,
      debounceMs: 16,
      enhancers: resolvedEnhancers,
      onError: (tag, err) => {
        if (typeof tag === "string" && tag.startsWith("pds-")) {
          const litDependentComponents = ["pds-form", "pds-drawer"];
          const isLitComponent = litDependentComponents.includes(tag);
          const isMissingLitError = err?.message?.includes("#pds/lit") || err?.message?.includes("Failed to resolve module specifier");
          if (isLitComponent && isMissingLitError) {
            PDS.log(
              "error",
              `\u274C PDS component <${tag}> requires Lit but #pds/lit is not in import map.
              See: https://github.com/Pure-Web-Foundation/pure-ds/blob/main/readme.md#lit-components-not-working`
            );
          } else {
            PDS.log(
              "warn",
              `\u26A0\uFE0F PDS component <${tag}> not found. Assets may not be installed.`
            );
          }
        } else {
          PDS.log("error", `\u274C Auto-define error for <${tag}>:`, err);
        }
      },
      // Apply all user overrides except mapper so we can still wrap it
      ...restAutoDefineOverrides,
      mapper: (tag) => {
        if (customElements.get(tag))
          return null;
        if (typeof autoDefineMapper === "function") {
          try {
            const mapped = autoDefineMapper(tag);
            if (mapped === void 0) {
              return defaultMapper(tag);
            }
            return mapped;
          } catch (e) {
            PDS.log(
              "warn",
              "Custom autoDefine.mapper error; falling back to default:",
              e?.message || e
            );
            return defaultMapper(tag);
          }
        }
        return defaultMapper(tag);
      }
    };
    autoDefiner = new AutoDefinerCtor(autoDefineConfig);
    if (autoDefinePreload.length > 0 && typeof AutoDefinerCtor.define === "function") {
      await AutoDefinerCtor.define(...autoDefinePreload, {
        baseURL: autoDefineBaseURL,
        mapper: autoDefineConfig.mapper,
        onError: autoDefineConfig.onError
      });
    }
  }
  return { autoDefiner, mergedEnhancers };
}

// src/js/pds-core/pds-theme-utils.js
var DEFAULT_THEMES = ["light", "dark"];
var VALID_THEMES = new Set(DEFAULT_THEMES);
function normalizePresetThemes(preset) {
  const themes = Array.isArray(preset?.themes) ? preset.themes.map((theme) => String(theme).toLowerCase()) : DEFAULT_THEMES;
  const normalized = themes.filter((theme) => VALID_THEMES.has(theme));
  return normalized.length ? normalized : DEFAULT_THEMES;
}
function resolveThemePreference(preference, { preferDocument = true } = {}) {
  const normalized = String(preference || "").toLowerCase();
  if (VALID_THEMES.has(normalized))
    return normalized;
  if (preferDocument && typeof document !== "undefined") {
    const applied = document.documentElement?.getAttribute("data-theme");
    if (VALID_THEMES.has(applied))
      return applied;
  }
  if (typeof window !== "undefined" && window.matchMedia) {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  }
  return "light";
}
function isPresetThemeCompatible(preset, themePreference) {
  const resolvedTheme = resolveThemePreference(themePreference);
  const themes = normalizePresetThemes(preset);
  return themes.includes(resolvedTheme);
}

// src/js/common/pds-log.js
var __SUPPORTED_LOG_LEVELS = /* @__PURE__ */ new Set(["log", "warn", "error", "debug", "info"]);
var __PDS_SINGLETON_KEY = "__PURE_DS_PDS_SINGLETON__";
var __logProvider = null;
var __contextProvider = null;
function __resolveGlobalPDS() {
  try {
    const scope = typeof globalThis !== "undefined" ? globalThis : window;
    const candidate = scope?.[__PDS_SINGLETON_KEY];
    if (candidate && typeof candidate === "object") {
      return candidate;
    }
  } catch (error) {
    return null;
  }
  return null;
}
function __normalizeContext(context) {
  if (!context || typeof context !== "object") {
    return null;
  }
  return {
    mode: context.mode === "live" || context.mode === "static" ? context.mode : null,
    debug: context.debug === true,
    thisArg: context.thisArg
  };
}
function __normalizeLevel(level) {
  if (typeof level !== "string")
    return "log";
  const normalized = level.toLowerCase();
  return __SUPPORTED_LOG_LEVELS.has(normalized) ? normalized : "log";
}
function __resolveContext() {
  if (typeof __contextProvider === "function") {
    try {
      const configuredContext = __normalizeContext(__contextProvider());
      if (configuredContext) {
        return configuredContext;
      }
    } catch (error) {
    }
  }
  const globalPDS = __resolveGlobalPDS();
  if (globalPDS) {
    const mode = globalPDS?.mode || globalPDS?.compiled?.mode || (globalPDS?.registry?.isLive ? "live" : "static");
    const debug = (globalPDS?.debug || globalPDS?.currentConfig?.debug || globalPDS?.currentConfig?.design?.debug || globalPDS?.compiled?.debug || globalPDS?.compiled?.design?.debug || false) === true;
    return {
      mode,
      debug,
      thisArg: globalPDS
    };
  }
  return { mode: null, debug: false };
}
function __resolveLogger() {
  if (typeof __logProvider === "function") {
    try {
      const logger = __logProvider();
      if (typeof logger === "function") {
        return logger;
      }
    } catch (error) {
    }
  }
  const globalPDS = __resolveGlobalPDS();
  if (typeof globalPDS?.logHandler === "function") {
    return globalPDS.logHandler;
  }
  return null;
}
function __consoleLog(level, message, ...data) {
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
}
function __shouldUseConsoleFallback(level, context) {
  const debugEnabled = context?.debug === true;
  const staticMode = context?.mode === "static";
  if (staticMode && !debugEnabled) {
    return false;
  }
  if (!debugEnabled && level !== "error" && level !== "warn") {
    return false;
  }
  return true;
}
function configurePDSLogger({ getLogger, getContext } = {}) {
  __logProvider = typeof getLogger === "function" ? getLogger : null;
  __contextProvider = typeof getContext === "function" ? getContext : null;
}
function pdsLog(level = "log", message, ...data) {
  const normalizedLevel = __normalizeLevel(level);
  const context = __resolveContext();
  const customLogger = __resolveLogger();
  if (customLogger) {
    try {
      customLogger.call(context?.thisArg, normalizedLevel, message, ...data);
      return;
    } catch (error) {
      __consoleLog("error", "Custom log handler failed:", error);
    }
  }
  if (!__shouldUseConsoleFallback(normalizedLevel, context)) {
    return;
  }
  __consoleLog(normalizedLevel, message, ...data);
}

// src/js/pds-reactive.js
var State = class {
  /**
   * Create a reactive state container
   * @param {Object} initialValue - Initial state object
   * @param {EventTarget} [eventTarget] - Optional event target for dispatching events
   */
  constructor(initialValue = {}, eventTarget = null) {
    const source = initialValue && typeof initialValue === "object" ? initialValue : {};
    const target = eventTarget || (typeof document !== "undefined" ? document : new EventTarget());
    const proxies = /* @__PURE__ */ new WeakMap();
    const toPath = (parts) => parts.map((part) => String(part)).join(".");
    let rootProxy;
    const dispatchChange = (pathParts, property, value, oldValue) => {
      const path = toPath(pathParts);
      const baseDetail = {
        property,
        path,
        value,
        oldValue
      };
      target.dispatchEvent(
        new CustomEvent(`change:${path}`, {
          detail: baseDetail,
          bubbles: true,
          composed: true
        })
      );
      target.dispatchEvent(
        new CustomEvent("change", {
          detail: {
            ...baseDetail,
            state: rootProxy
          },
          bubbles: true,
          composed: true
        })
      );
    };
    const on = (event, callback) => {
      if (typeof callback === "function") {
        target.addEventListener(event, callback);
      }
      return rootProxy;
    };
    const off = (event, callback) => {
      if (typeof callback === "function") {
        target.removeEventListener(event, callback);
      }
      return rootProxy;
    };
    const once = (event, callback) => {
      if (typeof callback === "function") {
        const handler = (e) => {
          callback(e);
          target.removeEventListener(event, handler);
        };
        target.addEventListener(event, handler);
      }
      return rootProxy;
    };
    const wrap = (obj, pathParts) => {
      if (!obj || typeof obj !== "object") {
        return obj;
      }
      if (proxies.has(obj)) {
        return proxies.get(obj);
      }
      const proxy = new Proxy(obj, {
        get(currentTarget, prop, receiver) {
          if (prop === "on")
            return on;
          if (prop === "off")
            return off;
          if (prop === "once")
            return once;
          const value = Reflect.get(currentTarget, prop, receiver);
          if (value && typeof value === "object") {
            return wrap(value, [...pathParts, prop]);
          }
          return value;
        },
        set(currentTarget, prop, value, receiver) {
          const oldValue = Reflect.get(currentTarget, prop, receiver);
          if (Object.is(oldValue, value)) {
            return true;
          }
          const didSet = Reflect.set(currentTarget, prop, value, receiver);
          if (!didSet) {
            return false;
          }
          dispatchChange([...pathParts, prop], prop, value, oldValue);
          return true;
        },
        deleteProperty(currentTarget, prop) {
          if (!Reflect.has(currentTarget, prop)) {
            return true;
          }
          const oldValue = currentTarget[prop];
          const didDelete = Reflect.deleteProperty(currentTarget, prop);
          if (!didDelete) {
            return false;
          }
          dispatchChange([...pathParts, prop], prop, void 0, oldValue);
          return true;
        }
      });
      proxies.set(obj, proxy);
      return proxy;
    };
    rootProxy = wrap(source, []);
    return rootProxy;
  }
};
function createReactiveComponent(initialState, renderFn, container) {
  const state = new State(initialState);
  const render = () => {
    container.replaceChildren();
    const fragment = renderFn(state);
    if (fragment instanceof DocumentFragment) {
      container.appendChild(fragment);
    } else if (fragment instanceof Node) {
      container.appendChild(fragment);
    }
  };
  render();
  state.on("change", render);
  return state;
}
function bindState(element, state, bindings) {
  if (!element || !state || typeof bindings !== "object") {
    return () => {
    };
  }
  const handlers = {};
  Object.entries(bindings).forEach(([prop, updateFn]) => {
    handlers[prop] = (e) => {
      if (typeof updateFn === "function") {
        updateFn(element, e.detail.value, e.detail.oldValue);
      }
    };
    state.on(`change:${prop}`, handlers[prop]);
  });
  return () => {
    Object.entries(handlers).forEach(([prop, handler]) => {
      state.off(`change:${prop}`, handler);
    });
  };
}

// src/js/pds.js
if (typeof PDS.initializing !== "boolean") {
  PDS.initializing = false;
}
if (!("currentPreset" in PDS)) {
  PDS.currentPreset = null;
}
if (typeof PDS.debug !== "boolean") {
  PDS.debug = false;
}
if (!("currentConfig" in PDS)) {
  PDS.currentConfig = null;
}
if (!("compiled" in PDS)) {
  PDS.compiled = null;
}
if (typeof PDS.logHandler !== "function") {
  PDS.logHandler = null;
}
if (!("mode" in PDS)) {
  PDS.mode = null;
}
var __autoCompletePromise = null;
var __askPromise = null;
var __toastPromise = null;
var __defaultEnhancersPromise = null;
var __localizationPromise = null;
var __localizationRuntime = null;
var __LOCALIZATION_RUNTIME_SINGLETON_KEY__ = "__pdsLocalizationRuntime";
function __getLocalizationRuntimeSync() {
  if (__localizationRuntime) {
    return __localizationRuntime;
  }
  const sharedRuntime = PDS?.[__LOCALIZATION_RUNTIME_SINGLETON_KEY__];
  if (sharedRuntime && typeof sharedRuntime === "object") {
    __localizationRuntime = sharedRuntime;
    return sharedRuntime;
  }
  return null;
}
function __setLocalizationRuntime(runtime) {
  const normalizedRuntime = runtime && typeof runtime === "object" ? runtime : null;
  __localizationRuntime = normalizedRuntime;
  PDS[__LOCALIZATION_RUNTIME_SINGLETON_KEY__] = normalizedRuntime;
}
configurePDSLogger({
  getLogger: () => typeof PDS.logHandler === "function" ? PDS.logHandler : null,
  getContext: () => {
    const mode = PDS?.mode || PDS?.compiled?.mode || (PDS?.registry?.isLive ? "live" : "static");
    const debug = (PDS?.debug || PDS?.currentConfig?.debug || PDS?.currentConfig?.design?.debug || PDS?.compiled?.debug || PDS?.compiled?.design?.debug || false) === true;
    return {
      mode,
      debug,
      thisArg: PDS
    };
  }
});
PDS.log = (level = "log", message, ...data) => {
  pdsLog(level, message, ...data);
};
var __fallbackLocalizationState = {
  locale: "en",
  messages: {},
  hasProvider: false
};
var __pendingLocalizationKeys = /* @__PURE__ */ new Set();
function __isStrTagged(template) {
  return Boolean(template) && typeof template !== "string" && typeof template === "object" && "strTag" in template;
}
function __collateStrings(strings = []) {
  let result = "";
  for (let index = 0; index <= strings.length - 1; index += 1) {
    result += strings[index];
    if (index < strings.length - 1) {
      result += `{${index}}`;
    }
  }
  return result;
}
function __replacePlaceholders(input, callback) {
  return String(input).replace(
    /\{(\d+)\}/g,
    (_match, index) => callback(Number(index))
  );
}
function __normalizeMessages(messages) {
  if (!messages || typeof messages !== "object") {
    return {};
  }
  const normalized = {};
  for (const [key, value] of Object.entries(messages)) {
    if (typeof value === "string") {
      normalized[key] = value;
      continue;
    }
    if (value && typeof value === "object" && typeof value.content === "string") {
      normalized[key] = value.content;
    }
  }
  return normalized;
}
function __fallbackStr(strings, ...values) {
  return {
    strTag: true,
    strings: Array.from(strings || []),
    values,
    raw: Array.from(strings?.raw || [])
  };
}
function __fallbackMsg(template) {
  if (!template) {
    return "";
  }
  if (__isStrTagged(template)) {
    const key2 = __collateStrings(template.strings || []);
    const translated = __fallbackLocalizationState.messages[key2] || key2;
    return __replacePlaceholders(translated, (index) => template.values?.[index]);
  }
  const key = String(template);
  return __fallbackLocalizationState.messages[key] || key;
}
function __queuePendingLocalizationKey(template) {
  if (!template) {
    return;
  }
  const key = __isStrTagged(template) ? __collateStrings(template.strings || []) : String(template);
  if (typeof key === "string" && key.length > 0) {
    __pendingLocalizationKeys.add(key);
  }
}
function __flushPendingLocalizationKeys(runtime) {
  if (!runtime || typeof runtime.msg !== "function" || __pendingLocalizationKeys.size === 0) {
    return;
  }
  const pendingKeys = Array.from(__pendingLocalizationKeys);
  __pendingLocalizationKeys.clear();
  for (const key of pendingKeys) {
    try {
      runtime.msg(key);
    } catch {
    }
  }
}
async function __loadLocalizationRuntime() {
  const runtime = __getLocalizationRuntimeSync();
  if (runtime) {
    return runtime;
  }
  if (!__localizationPromise) {
    const localizationModuleURL = __resolveExternalRuntimeModuleURL(
      "pds-localization.js"
    );
    __localizationPromise = import(
      /* @vite-ignore */
      localizationModuleURL
    ).then((mod) => {
      if (typeof mod?.msg !== "function" || typeof mod?.str !== "function" || typeof mod?.configureLocalization !== "function" || typeof mod?.loadLocale !== "function" || typeof mod?.setLocale !== "function" || typeof mod?.getLocalizationState !== "function") {
        throw new Error("Failed to load localization runtime exports");
      }
      __setLocalizationRuntime(mod);
      __flushPendingLocalizationKeys(mod);
      return mod;
    }).catch((error) => {
      __localizationPromise = null;
      throw error;
    });
  }
  return __localizationPromise;
}
var msg = (template, options = {}) => {
  const runtime = __getLocalizationRuntimeSync();
  if (typeof runtime?.msg === "function") {
    return runtime.msg(template, options);
  }
  __queuePendingLocalizationKey(template);
  return __fallbackMsg(template, options);
};
var str = (strings, ...values) => {
  const runtime = __getLocalizationRuntimeSync();
  if (typeof runtime?.str === "function") {
    return runtime.str(strings, ...values);
  }
  return __fallbackStr(strings, ...values);
};
var configureLocalization = (config = null) => {
  const runtime = __getLocalizationRuntimeSync();
  if (typeof runtime?.configureLocalization === "function") {
    return runtime.configureLocalization(config);
  }
  if (!config || typeof config !== "object") {
    __fallbackLocalizationState.locale = "en";
    __fallbackLocalizationState.messages = {};
    __fallbackLocalizationState.hasProvider = false;
    return {
      locale: __fallbackLocalizationState.locale,
      messages: { ...__fallbackLocalizationState.messages },
      hasProvider: __fallbackLocalizationState.hasProvider
    };
  }
  if (typeof config.locale === "string" && config.locale.trim()) {
    __fallbackLocalizationState.locale = config.locale.trim();
  }
  if (Object.prototype.hasOwnProperty.call(config, "messages")) {
    __fallbackLocalizationState.messages = __normalizeMessages(config.messages);
  }
  const hasProvider = Boolean(
    config.provider || config.translate || config.loadLocale || config.setLocale
  );
  __fallbackLocalizationState.hasProvider = hasProvider;
  if (hasProvider) {
    __loadLocalizationRuntime().then((runtime2) => {
      runtime2.configureLocalization(config);
      __flushPendingLocalizationKeys(runtime2);
    }).catch(() => {
    });
  }
  return {
    locale: __fallbackLocalizationState.locale,
    messages: { ...__fallbackLocalizationState.messages },
    hasProvider: __fallbackLocalizationState.hasProvider
  };
};
var loadLocale = async (locale) => {
  const runtime = await __loadLocalizationRuntime();
  return runtime.loadLocale(locale);
};
var setLocale = async (locale, options = {}) => {
  const runtime = await __loadLocalizationRuntime();
  return runtime.setLocale(locale, options);
};
var getLocalizationState = () => {
  const runtime = __getLocalizationRuntimeSync();
  if (typeof runtime?.getLocalizationState === "function") {
    return runtime.getLocalizationState();
  }
  return {
    locale: __fallbackLocalizationState.locale,
    messages: { ...__fallbackLocalizationState.messages },
    hasProvider: __fallbackLocalizationState.hasProvider
  };
};
var createJSONLocalization = (options = {}) => {
  const runtime = __getLocalizationRuntimeSync();
  if (typeof runtime?.createJSONLocalization === "function") {
    return runtime.createJSONLocalization(options);
  }
  const defaultLocale = typeof options?.locale === "string" && options.locale.trim() ? options.locale.trim().toLowerCase() : "en";
  const configuredLocales = Array.isArray(options?.locales) ? options.locales.map((locale) => String(locale || "").trim().toLowerCase()).filter(Boolean) : [];
  const locales = Array.from(/* @__PURE__ */ new Set([defaultLocale, ...configuredLocales]));
  let __jsonLocalizationConfigPromise = null;
  const __resolveJSONLocalizationConfig = async () => {
    if (!__jsonLocalizationConfigPromise) {
      __jsonLocalizationConfigPromise = __loadLocalizationRuntime().then((runtime2) => {
        if (typeof runtime2?.createJSONLocalization === "function") {
          return runtime2.createJSONLocalization(options);
        }
        return null;
      }).catch(() => null);
    }
    return __jsonLocalizationConfigPromise;
  };
  const resolveLoader = async (kind = "loadLocale") => {
    const runtimeConfig = await __resolveJSONLocalizationConfig();
    if (!runtimeConfig || typeof runtimeConfig !== "object") {
      return null;
    }
    const provider = runtimeConfig.provider;
    if (!provider || typeof provider !== "object") {
      return null;
    }
    const exactLoader = provider[kind];
    if (typeof exactLoader === "function") {
      return exactLoader;
    }
    if (kind === "setLocale" && typeof provider.loadLocale === "function") {
      return provider.loadLocale;
    }
    return null;
  };
  return {
    locale: defaultLocale,
    locales: [...locales],
    provider: {
      locales: [...locales],
      async loadLocale(context = {}) {
        const loader = await resolveLoader("loadLocale");
        if (typeof loader !== "function") {
          return {};
        }
        return loader(context);
      },
      async setLocale(context = {}) {
        const loader = await resolveLoader("setLocale");
        if (typeof loader !== "function") {
          return {};
        }
        return loader(context);
      }
    }
  };
};
function __resolveExternalRuntimeModuleURL(filename, overrideURL) {
  if (overrideURL && typeof overrideURL === "string") {
    return overrideURL;
  }
  const assetRootURL = resolveRuntimeAssetRoot(PDS.currentConfig || {}, {
    resolvePublicAssetURL
  });
  return `${assetRootURL}core/${filename}`;
}
async function __loadDefaultEnhancers() {
  if (Array.isArray(PDS.defaultEnhancers) && PDS.defaultEnhancers.length > 0) {
    return PDS.defaultEnhancers;
  }
  if (!__defaultEnhancersPromise) {
    const enhancersModuleURL = __resolveExternalRuntimeModuleURL(
      "pds-enhancers.js",
      PDS.currentConfig?.enhancersURL
    );
    __defaultEnhancersPromise = import(
      /* @vite-ignore */
      enhancersModuleURL
    ).then((mod) => {
      const enhancers = Array.isArray(mod?.defaultPDSEnhancers) ? mod.defaultPDSEnhancers : [];
      PDS.defaultEnhancers = enhancers;
      return enhancers;
    }).catch((error) => {
      __defaultEnhancersPromise = null;
      throw error;
    });
  }
  return __defaultEnhancersPromise;
}
async function __loadAsk() {
  if (typeof PDS.ask === "function" && PDS.ask !== __lazyAsk) {
    return PDS.ask;
  }
  if (!__askPromise) {
    const askModuleURL = __resolveExternalRuntimeModuleURL(
      "pds-ask.js",
      PDS.currentConfig?.askURL
    );
    __askPromise = import(
      /* @vite-ignore */
      askModuleURL
    ).then((mod) => {
      const impl = mod?.ask;
      if (typeof impl !== "function") {
        throw new Error("Failed to load ask helper");
      }
      PDS.ask = impl;
      return impl;
    }).catch((error) => {
      __askPromise = null;
      throw error;
    });
  }
  return __askPromise;
}
async function __loadToast() {
  if (typeof PDS.toast === "function" && PDS.toast !== __lazyToast) {
    return PDS.toast;
  }
  if (!__toastPromise) {
    const toastModuleURL = __resolveExternalRuntimeModuleURL(
      "pds-toast.js",
      PDS.currentConfig?.toastURL
    );
    __toastPromise = import(
      /* @vite-ignore */
      toastModuleURL
    ).then((mod) => {
      const impl = mod?.toast;
      if (typeof impl !== "function") {
        throw new Error("Failed to load toast helper");
      }
      PDS.toast = impl;
      return impl;
    }).catch((error) => {
      __toastPromise = null;
      throw error;
    });
  }
  return __toastPromise;
}
async function __lazyAsk(...args) {
  const askImpl = await __loadAsk();
  return askImpl(...args);
}
async function __lazyToast(...args) {
  const toastImpl = await __loadToast();
  return toastImpl(...args);
}
__lazyToast.success = async (...args) => {
  const toastImpl = await __loadToast();
  return toastImpl.success(...args);
};
__lazyToast.error = async (...args) => {
  const toastImpl = await __loadToast();
  return toastImpl.error(...args);
};
__lazyToast.warning = async (...args) => {
  const toastImpl = await __loadToast();
  return toastImpl.warning(...args);
};
__lazyToast.info = async (...args) => {
  const toastImpl = await __loadToast();
  return toastImpl.info(...args);
};
var __defaultLog = function(level = "log", message, ...data) {
  PDS.log(level, message, ...data);
};
function __stripFunctionsForClone(value) {
  if (value === null || value === void 0)
    return value;
  if (typeof value === "function")
    return void 0;
  if (typeof value !== "object")
    return value;
  if (Array.isArray(value)) {
    return value.map((item) => __stripFunctionsForClone(item)).filter((item) => item !== void 0);
  }
  const result = {};
  for (const [key, entry] of Object.entries(value)) {
    const stripped = __stripFunctionsForClone(entry);
    if (stripped !== void 0) {
      result[key] = stripped;
    }
  }
  return result;
}
function __deepFreeze(value, seen = /* @__PURE__ */ new WeakSet()) {
  if (!value || typeof value !== "object") {
    return value;
  }
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  Object.freeze(value);
  for (const key of Object.keys(value)) {
    __deepFreeze(value[key], seen);
  }
  return value;
}
function __toReadonlyClone(value) {
  if (value === null || value === void 0) {
    return value;
  }
  if (typeof value !== "object") {
    return value;
  }
  return __deepFreeze(structuredClone(__stripFunctionsForClone(value)));
}
async function __loadRuntimeConfig(assetRootURL, config = {}) {
  if (config?.runtimeConfig === false)
    return null;
  if (typeof fetch !== "function")
    return null;
  const runtimeUrl = config?.runtimeConfigURL || `${assetRootURL}pds-runtime-config.json`;
  try {
    const res = await fetch(runtimeUrl, { cache: "no-store" });
    if (!res.ok)
      return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}
PDS.registry = registry;
PDS.enums = enums;
PDS.adoptLayers = adoptLayers;
PDS.adoptPrimitives = adoptPrimitives;
var parse = parseHTML;
PDS.parse = parse;
var html = parseFragment;
PDS.html = html;
PDS.State = State;
PDS.bindState = bindState;
PDS.createStylesheet = createStylesheet;
PDS.isLiveMode = () => registry.isLive;
PDS.ask = __lazyAsk;
PDS.toast = __lazyToast;
PDS.common = common_exports;
PDS.msg = msg;
PDS.str = str;
PDS.configureLocalization = configureLocalization;
PDS.loadLocale = loadLocale;
PDS.setLocale = setLocale;
PDS.getLocalizationState = getLocalizationState;
PDS.createJSONLocalization = createJSONLocalization;
PDS.i18n = {
  msg,
  str,
  configure: configureLocalization,
  loadLocale,
  setLocale,
  getState: getLocalizationState,
  createJSONLocalization
};
PDS.AutoComplete = null;
PDS.loadAutoComplete = async () => {
  if (PDS.AutoComplete && typeof PDS.AutoComplete.connect === "function") {
    return PDS.AutoComplete;
  }
  const autoCompleteModuleURL = __resolveExternalRuntimeModuleURL(
    "pds-autocomplete.js",
    PDS.currentConfig?.autoCompleteURL
  );
  if (!__autoCompletePromise) {
    __autoCompletePromise = import(
      /* @vite-ignore */
      autoCompleteModuleURL
    ).then((mod) => {
      const autoCompleteCtor = mod?.AutoComplete || mod?.default?.AutoComplete || mod?.default || null;
      if (!autoCompleteCtor) {
        throw new Error("AutoComplete export not found in module");
      }
      PDS.AutoComplete = autoCompleteCtor;
      return autoCompleteCtor;
    }).catch((error) => {
      __autoCompletePromise = null;
      throw error;
    });
  }
  return __autoCompletePromise;
};
function __emitPDSReady(detail) {
  const hasCustomEvent = typeof CustomEvent === "function";
  try {
    const readyEvent = hasCustomEvent ? new CustomEvent("pds:ready", { detail }) : new Event("pds:ready");
    PDS.dispatchEvent(readyEvent);
  } catch (e) {
  }
  if (typeof document !== "undefined") {
    if (hasCustomEvent) {
      const eventOptions = { detail, bubbles: true, composed: true };
      try {
        document.dispatchEvent(new CustomEvent("pds:ready", eventOptions));
      } catch (e) {
      }
      try {
        document.dispatchEvent(new CustomEvent("pds-ready", eventOptions));
      } catch (e) {
      }
    } else {
      try {
        document.dispatchEvent(new Event("pds:ready"));
      } catch (e) {
      }
      try {
        document.dispatchEvent(new Event("pds-ready"));
      } catch (e) {
      }
    }
  }
}
function __emitPDSConfigChanged(detail = {}) {
  const hasCustomEvent = typeof CustomEvent === "function";
  const payload = {
    at: Date.now(),
    ...detail
  };
  try {
    const changedEvent = hasCustomEvent ? new CustomEvent("pds:config-changed", { detail: payload }) : new Event("pds:config-changed");
    PDS.dispatchEvent(changedEvent);
  } catch (e) {
  }
  if (typeof document !== "undefined") {
    if (hasCustomEvent) {
      const eventOptions = { detail: payload, bubbles: true, composed: true };
      try {
        document.dispatchEvent(
          new CustomEvent("pds:config-changed", eventOptions)
        );
      } catch (e) {
      }
    } else {
      try {
        document.dispatchEvent(new Event("pds:config-changed"));
      } catch (e) {
      }
    }
  }
}
var __themeStorageKey = "pure-ds-theme";
var __themeMQ = null;
var __themeMQListener = null;
function __applyResolvedTheme(raw) {
  try {
    if (typeof document === "undefined")
      return;
    let resolved = "light";
    if (!raw) {
      const prefersDark = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      resolved = prefersDark ? "dark" : "light";
    } else if (raw === "system") {
      const prefersDark = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      resolved = prefersDark ? "dark" : "light";
    } else {
      resolved = raw;
    }
    document.documentElement.setAttribute("data-theme", resolved);
  } catch (e) {
  }
}
function __setupSystemListenerIfNeeded(raw) {
  try {
    if (__themeMQ && __themeMQListener) {
      try {
        if (typeof __themeMQ.removeEventListener === "function")
          __themeMQ.removeEventListener("change", __themeMQListener);
        else if (typeof __themeMQ.removeListener === "function")
          __themeMQ.removeListener(__themeMQListener);
      } catch (e) {
      }
      __themeMQ = null;
      __themeMQListener = null;
    }
    if (raw === "system" && typeof window !== "undefined" && window.matchMedia) {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const listener = (e) => {
        const isDark = e?.matches === void 0 ? mq.matches : e.matches;
        try {
          const newTheme = isDark ? "dark" : "light";
          document.documentElement.setAttribute("data-theme", newTheme);
          PDS.dispatchEvent(
            new CustomEvent("pds:theme:changed", {
              detail: { theme: newTheme, source: "system" }
            })
          );
        } catch (ex) {
        }
      };
      __themeMQ = mq;
      __themeMQListener = listener;
      if (typeof mq.addEventListener === "function")
        mq.addEventListener("change", listener);
      else if (typeof mq.addListener === "function")
        mq.addListener(listener);
    }
  } catch (e) {
  }
}
var __themeDescriptor = Object.getOwnPropertyDescriptor(PDS, "theme");
if (!__themeDescriptor) {
  Object.defineProperty(PDS, "theme", {
    get() {
      try {
        if (typeof window === "undefined")
          return null;
        return localStorage.getItem(__themeStorageKey) || null;
      } catch (e) {
        return null;
      }
    },
    set(value) {
      try {
        if (typeof window === "undefined")
          return;
        const currentPreset = PDS.currentConfig?.design || null;
        const resolvedTheme = resolveThemePreference(value);
        if (currentPreset && !isPresetThemeCompatible(currentPreset, resolvedTheme)) {
          const presetName = currentPreset?.name || PDS.currentPreset?.name || PDS.currentConfig?.preset || "current preset";
          PDS.log(
            "warn",
            `PDS theme "${resolvedTheme}" not supported by preset "${presetName}".`
          );
          PDS.dispatchEvent(
            new CustomEvent("pds:theme:blocked", {
              detail: { theme: value, resolvedTheme, preset: presetName }
            })
          );
          return;
        }
        if (value === null || value === void 0) {
          localStorage.removeItem(__themeStorageKey);
        } else {
          localStorage.setItem(__themeStorageKey, value);
        }
        __applyResolvedTheme(value);
        __setupSystemListenerIfNeeded(value);
        PDS.dispatchEvent(
          new CustomEvent("pds:theme:changed", {
            detail: { theme: value, source: "api" }
          })
        );
      } catch (e) {
      }
    }
  });
}
PDS.defaultEnhancers = [];
async function start(config) {
  PDS.initializing = true;
  try {
    const mode = config && config.mode || "live";
    const { mode: _omit, ...rest } = config || {};
    PDS.mode = mode;
    PDS.logHandler = typeof rest?.log === "function" ? rest.log : null;
    PDS.currentConfig = __toReadonlyClone(rest);
    const localizationConfig = rest && typeof rest.localization === "object" && rest.localization ? rest.localization : null;
    if (localizationConfig) {
      await __loadLocalizationRuntime();
      configureLocalization(localizationConfig);
    } else {
      configureLocalization(null);
    }
    let startResult;
    if (mode === "static") {
      startResult = await staticInit(rest);
    } else {
      const { localization: _managerLocalization, ...managerConfig } = rest || {};
      const assetRootURL = resolveRuntimeAssetRoot(managerConfig, { resolvePublicAssetURL });
      const managerUrl = managerConfig?.managerURL || managerConfig?.public?.managerURL || managerConfig?.manager?.url || new URL("core/pds-manager.js", assetRootURL).href || new URL("./pds-manager.js", import.meta.url).href;
      const { startLive } = await import(
        /* @vite-ignore */
        managerUrl
      );
      startResult = await startLive(PDS, managerConfig, {
        emitReady: __emitPDSReady,
        emitConfigChanged: __emitPDSConfigChanged,
        applyResolvedTheme: __applyResolvedTheme,
        setupSystemListenerIfNeeded: __setupSystemListenerIfNeeded
      });
    }
    PDS.compiled = __toReadonlyClone(startResult?.config || null);
    const resolvedExternalIconPath = PDS?.compiled?.design?.icons?.externalPath || "/assets/img/icons/";
    PDS.log("info", `startup ready; external icon path: ${resolvedExternalIconPath}`);
    return startResult;
  } finally {
    PDS.initializing = false;
  }
}
PDS.start = start;
async function staticInit(config) {
  if (!config || typeof config !== "object") {
    throw new Error(
      "PDS.start({ mode: 'static', ... }) requires a valid configuration object"
    );
  }
  const applyGlobalStyles = config.applyGlobalStyles ?? true;
  const manageTheme = config.manageTheme ?? true;
  const themeStorageKey = config.themeStorageKey ?? "pure-ds-theme";
  let staticPaths = config.staticPaths ?? {};
  const assetRootURL = resolveRuntimeAssetRoot(config, { resolvePublicAssetURL });
  const cfgAuto = config && config.autoDefine || null;
  let autoDefineBaseURL;
  if (cfgAuto && cfgAuto.baseURL) {
    autoDefineBaseURL = ensureTrailingSlash2(
      ensureAbsoluteAssetURL(cfgAuto.baseURL, { preferModule: false })
    );
  } else {
    autoDefineBaseURL = `${assetRootURL}components/`;
  }
  const autoDefinePreload = cfgAuto && Array.isArray(cfgAuto.predefine) && cfgAuto.predefine || [];
  const autoDefineMapper = cfgAuto && typeof cfgAuto.mapper === "function" && cfgAuto.mapper || null;
  try {
    attachFoucListener(PDS);
    const { resolvedTheme } = resolveThemeAndApply({
      manageTheme,
      themeStorageKey,
      applyResolvedTheme: __applyResolvedTheme,
      setupSystemListenerIfNeeded: __setupSystemListenerIfNeeded
    });
    const runtimeConfig = await __loadRuntimeConfig(assetRootURL, config);
    const userEnhancers = Array.isArray(config?.enhancers) ? config.enhancers : config?.enhancers && typeof config.enhancers === "object" ? Object.values(config.enhancers) : [];
    const resolvedConfig = runtimeConfig?.config ? {
      ...runtimeConfig.config,
      ...config,
      design: config?.design || runtimeConfig.config.design,
      preset: config?.preset || runtimeConfig.config.preset
    } : { ...config };
    const baseStaticPaths = {
      tokens: `${assetRootURL}styles/pds-tokens.css.js`,
      primitives: `${assetRootURL}styles/pds-primitives.css.js`,
      components: `${assetRootURL}styles/pds-components.css.js`,
      utilities: `${assetRootURL}styles/pds-utilities.css.js`,
      styles: `${assetRootURL}styles/pds-styles.css.js`
    };
    const runtimePaths = runtimeConfig?.paths || {};
    staticPaths = { ...baseStaticPaths, ...runtimePaths, ...staticPaths };
    PDS.registry.setStaticMode(staticPaths);
    if (applyGlobalStyles && typeof document !== "undefined") {
      try {
        const stylesSheet = await PDS.registry.getStylesheet("styles");
        if (stylesSheet) {
          stylesSheet._pds = true;
          const others = (document.adoptedStyleSheets || []).filter(
            (s) => s._pds !== true
          );
          document.adoptedStyleSheets = [...others, stylesSheet];
          __emitPDSConfigChanged({
            mode: "static",
            source: "static:styles-applied"
          });
        }
      } catch (e) {
        __defaultLog.call(PDS, "warn", "Failed to apply static styles:", e);
      }
    }
    let autoDefiner = null;
    let mergedEnhancers = [];
    try {
      const defaultPDSEnhancers = await __loadDefaultEnhancers();
      const res = await setupAutoDefinerAndEnhancers({
        autoDefineBaseURL,
        autoDefinePreload,
        autoDefineMapper,
        enhancers: userEnhancers,
        autoDefineOverrides: cfgAuto || null,
        autoDefinePreferModule: !(cfgAuto && cfgAuto.baseURL)
      }, { baseEnhancers: defaultPDSEnhancers });
      autoDefiner = res.autoDefiner;
      mergedEnhancers = res.mergedEnhancers || [];
    } catch (error) {
      __defaultLog.call(
        PDS,
        "error",
        "\u274C Failed to initialize AutoDefiner/Enhancers (static):",
        error
      );
    }
    PDS.compiled = __toReadonlyClone({
      mode: "static",
      ...resolvedConfig,
      theme: resolvedTheme,
      enhancers: mergedEnhancers
    });
    __emitPDSReady({
      mode: "static",
      config: resolvedConfig,
      theme: resolvedTheme,
      autoDefiner
    });
    return {
      config: resolvedConfig,
      theme: resolvedTheme,
      autoDefiner
    };
  } catch (error) {
    PDS.dispatchEvent(new CustomEvent("pds:error", { detail: { error } }));
    throw error;
  }
}
var applyResolvedTheme = __applyResolvedTheme;
var setupSystemListenerIfNeeded = __setupSystemListenerIfNeeded;
export {
  PDS,
  State,
  applyResolvedTheme,
  bindState,
  configureLocalization,
  createJSONLocalization,
  createReactiveComponent,
  getLocalizationState,
  html,
  loadLocale,
  msg,
  parse,
  setLocale,
  setupSystemListenerIfNeeded,
  str
};
//# sourceMappingURL=pds.js.map
