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

// src/js/common/localization.js
var __DEFAULT_LOCALE__ = "en";
var __localizationState = {
  defaultLocale: __DEFAULT_LOCALE__,
  provider: null,
  messagesByLocale: /* @__PURE__ */ new Map(),
  loadingByLocale: /* @__PURE__ */ new Map(),
  observer: null,
  reconcileTimer: null,
  requestedKeys: /* @__PURE__ */ new Set(),
  textNodeKeyMap: /* @__PURE__ */ new WeakMap(),
  attributeKeyMap: /* @__PURE__ */ new WeakMap(),
  valueToKeys: /* @__PURE__ */ new Map(),
  missingWarnings: /* @__PURE__ */ new Set()
};
var __LOCALIZABLE_ATTRIBUTES = [
  "title",
  "placeholder",
  "aria-label",
  "aria-description",
  "aria-placeholder",
  "aria-roledescription",
  "alt",
  "label"
];
var __isStrTagged = (val) => Boolean(val) && typeof val !== "string" && typeof val === "object" && "strTag" in val;
function __normalizeLocale(locale) {
  return String(locale || "").trim().toLowerCase();
}
function __toBaseLocale(locale) {
  const normalized = __normalizeLocale(locale);
  if (!normalized)
    return "";
  return normalized.split("-")[0] || normalized;
}
function __resolveLocaleCandidate(locale) {
  const normalized = __normalizeLocale(locale);
  if (!normalized) {
    return __localizationState.defaultLocale;
  }
  const resolveLocale = __localizationState.provider?.resolveLocale;
  if (typeof resolveLocale === "function") {
    const resolved = __normalizeLocale(resolveLocale(locale));
    if (resolved) {
      return resolved;
    }
  }
  return normalized;
}
function __collateStrings(strings) {
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
  return String(input).replace(/\{(\d+)\}/g, (_match, index) => callback(Number(index)));
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
function __localeVariants(locale) {
  const normalized = __normalizeLocale(locale);
  if (!normalized) {
    return [__localizationState.defaultLocale];
  }
  const base = __toBaseLocale(normalized);
  if (!base || base === normalized) {
    return [normalized];
  }
  return [normalized, base];
}
function __setLocaleMessages(locale, messages) {
  const normalizedLocale = __resolveLocaleCandidate(locale);
  __localizationState.messagesByLocale.set(
    normalizedLocale,
    __normalizeMessages(messages)
  );
}
function __registerRequestedKey(key) {
  if (typeof key === "string" && key.length > 0) {
    __localizationState.requestedKeys.add(key);
  }
}
function __indexTranslatedValue(key, value) {
  if (typeof key !== "string" || !key.length) {
    return;
  }
  const translatedValue = typeof value === "string" ? value : String(value || "");
  if (!translatedValue.length) {
    return;
  }
  if (!__localizationState.valueToKeys.has(translatedValue)) {
    __localizationState.valueToKeys.set(translatedValue, /* @__PURE__ */ new Set());
  }
  __localizationState.valueToKeys.get(translatedValue).add(key);
}
function __getLocaleMessages(locale) {
  const variants = __localeVariants(locale);
  for (const candidate of variants) {
    if (__localizationState.messagesByLocale.has(candidate)) {
      return {
        locale: candidate,
        messages: __localizationState.messagesByLocale.get(candidate)
      };
    }
  }
  return null;
}
async function __loadLocaleInternal(locale, reason = "explicit") {
  const targetLocale = __resolveLocaleCandidate(locale);
  const existing = __getLocaleMessages(targetLocale);
  if (existing) {
    return existing.messages;
  }
  const loadingKey = targetLocale;
  if (__localizationState.loadingByLocale.has(loadingKey)) {
    return __localizationState.loadingByLocale.get(loadingKey);
  }
  if (!__localizationState.provider) {
    return {};
  }
  const loader = __localizationState.provider.loadLocale || __localizationState.provider.setLocale || null;
  if (typeof loader !== "function") {
    return {};
  }
  const context = {
    locale: targetLocale,
    defaultLocale: __localizationState.defaultLocale,
    reason,
    loadedLocales: Array.from(__localizationState.messagesByLocale.keys()),
    messages: {
      ...__getLocaleMessages(targetLocale)?.messages || {}
    },
    load: reason === "set-default" || reason === "explicit-load"
  };
  let result;
  try {
    result = loader(context);
  } catch {
    return {};
  }
  if (result && typeof result.then === "function") {
    const promise = result.then((value) => {
      const normalized2 = __normalizeMessages(value);
      __setLocaleMessages(targetLocale, normalized2);
      return normalized2;
    }).catch(() => ({})).finally(() => {
      __localizationState.loadingByLocale.delete(loadingKey);
    });
    __localizationState.loadingByLocale.set(loadingKey, promise);
    return promise;
  }
  const normalized = __normalizeMessages(result);
  __setLocaleMessages(targetLocale, normalized);
  return normalized;
}
function __resolveLocaleFromElementScope(element) {
  if (!element || typeof element !== "object") {
    return "";
  }
  const canUseElementCtor = typeof Element !== "undefined";
  const el = canUseElementCtor && element instanceof Element ? element : element?.nodeType === 1 ? element : null;
  if (!el) {
    return "";
  }
  if (el.hasAttribute?.("lang")) {
    return __normalizeLocale(el.getAttribute("lang"));
  }
  const scoped = el.closest?.("[lang]");
  if (scoped && scoped.getAttribute) {
    return __normalizeLocale(scoped.getAttribute("lang"));
  }
  return "";
}
function __resolveContextLocale(options = {}) {
  if (typeof options?.lang === "string" && options.lang.trim()) {
    return __resolveLocaleCandidate(options.lang);
  }
  const scopeElement = options?.element || options?.scope || options?.host || options?.contextElement || null;
  const scopedLocale = __resolveLocaleFromElementScope(scopeElement);
  if (scopedLocale) {
    return __resolveLocaleCandidate(scopedLocale);
  }
  if (typeof document !== "undefined" && document.documentElement) {
    const rootLocale = __normalizeLocale(document.documentElement.getAttribute("lang"));
    if (rootLocale) {
      return __resolveLocaleCandidate(rootLocale);
    }
  }
  return __localizationState.defaultLocale;
}
function __collectDetectedLocales() {
  const detected = /* @__PURE__ */ new Set([__localizationState.defaultLocale]);
  if (typeof document === "undefined") {
    return detected;
  }
  const rootLang = __normalizeLocale(document.documentElement?.getAttribute?.("lang"));
  if (rootLang) {
    detected.add(__resolveLocaleCandidate(rootLang));
  }
  const nodes = document.querySelectorAll?.("[lang]") || [];
  for (const node of nodes) {
    const lang = __normalizeLocale(node.getAttribute("lang"));
    if (lang) {
      detected.add(__resolveLocaleCandidate(lang));
    }
  }
  return detected;
}
async function __ensureDetectedLocalesLoaded(detectedLocales) {
  for (const locale of detectedLocales) {
    await __loadLocaleInternal(locale, "lang-detected");
  }
}
function __pruneUndetectedLocales(detectedLocales) {
  for (const loadedLocale of Array.from(__localizationState.messagesByLocale.keys())) {
    if (!detectedLocales.has(loadedLocale)) {
      __localizationState.messagesByLocale.delete(loadedLocale);
    }
  }
}
function __splitTextWhitespace(value) {
  const input = String(value || "");
  const leading = (input.match(/^\s*/) || [""])[0];
  const trailing = (input.match(/\s*$/) || [""])[0];
  const start = leading.length;
  const end = input.length - trailing.length;
  const core = end >= start ? input.slice(start, end) : "";
  return { leading, core, trailing };
}
function __escapeRegExp(value) {
  return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function __extractValuesFromTemplate(template, text) {
  const inputTemplate = typeof template === "string" ? template : String(template || "");
  const inputText = typeof text === "string" ? text : String(text || "");
  const placeholderPattern = /\{(\d+)\}/g;
  const matches = Array.from(inputTemplate.matchAll(placeholderPattern));
  if (!matches.length) {
    return inputTemplate === inputText ? [] : null;
  }
  const placeholderOrder = [];
  let pattern = "^";
  let lastIndex = 0;
  for (const match of matches) {
    const matchIndex = match.index ?? 0;
    pattern += __escapeRegExp(inputTemplate.slice(lastIndex, matchIndex));
    pattern += "([\\s\\S]*?)";
    placeholderOrder.push(Number(match[1]));
    lastIndex = matchIndex + match[0].length;
  }
  pattern += __escapeRegExp(inputTemplate.slice(lastIndex));
  pattern += "$";
  const result = new RegExp(pattern).exec(inputText);
  if (!result) {
    return null;
  }
  const values = [];
  for (let groupIndex = 1; groupIndex < result.length; groupIndex += 1) {
    const placeholderIndex = placeholderOrder[groupIndex - 1];
    const extractedValue = result[groupIndex];
    if (Object.prototype.hasOwnProperty.call(values, placeholderIndex) && values[placeholderIndex] !== extractedValue) {
      return null;
    }
    values[placeholderIndex] = extractedValue;
  }
  return values;
}
function __resolveTemplateValuesForText(key, text) {
  if (typeof key !== "string" || !key.length) {
    return [];
  }
  const templates = [key];
  for (const [, messages] of __localizationState.messagesByLocale.entries()) {
    const candidate = messages?.[key];
    if (typeof candidate === "string" && candidate.length) {
      templates.push(candidate);
    }
  }
  for (const template of templates) {
    const extracted = __extractValuesFromTemplate(template, text);
    if (extracted) {
      return extracted;
    }
  }
  return [];
}
function __findRequestedKeyForText(coreText) {
  if (!coreText) {
    return null;
  }
  const indexedKeys = __localizationState.valueToKeys.get(coreText);
  if (indexedKeys && indexedKeys.size > 0) {
    for (const key of indexedKeys) {
      if (__localizationState.requestedKeys.has(key)) {
        return key;
      }
    }
  }
  if (__localizationState.requestedKeys.has(coreText)) {
    return coreText;
  }
  const loadedEntries = Array.from(__localizationState.messagesByLocale.entries());
  for (const key of __localizationState.requestedKeys) {
    for (const [, messages] of loadedEntries) {
      if (messages && messages[key] === coreText) {
        return key;
      }
    }
  }
  return null;
}
function __findRequestedSubsegmentForText(coreText) {
  if (!coreText) {
    return null;
  }
  let bestMatch = null;
  for (const [indexedValue, indexedKeys] of __localizationState.valueToKeys.entries()) {
    if (typeof indexedValue !== "string" || !indexedValue.length) {
      continue;
    }
    if (indexedValue === coreText) {
      continue;
    }
    const start = coreText.indexOf(indexedValue);
    if (start === -1) {
      continue;
    }
    for (const key of indexedKeys) {
      if (!__localizationState.requestedKeys.has(key)) {
        continue;
      }
      const values = __resolveTemplateValuesForText(key, indexedValue);
      const candidate = {
        key,
        matchedText: indexedValue,
        start,
        end: start + indexedValue.length,
        values
      };
      if (!bestMatch || candidate.matchedText.length > bestMatch.matchedText.length) {
        bestMatch = candidate;
      }
      break;
    }
  }
  return bestMatch;
}
async function __localizeTextNode(textNode) {
  if (!textNode || textNode.nodeType !== 3) {
    return;
  }
  const parentElement = textNode.parentElement || null;
  if (!parentElement) {
    return;
  }
  const { leading, core, trailing } = __splitTextWhitespace(textNode.nodeValue);
  if (!core) {
    return;
  }
  let key = __localizationState.textNodeKeyMap.get(textNode) || null;
  if (!key || !__localizationState.requestedKeys.has(key)) {
    key = __findRequestedKeyForText(core);
  }
  if (!key) {
    const segmentMatch = __findRequestedSubsegmentForText(core);
    if (!segmentMatch) {
      return;
    }
    const scopedLocale2 = __resolveContextLocale({ element: parentElement });
    await __loadLocaleInternal(scopedLocale2, "text-node");
    const translated2 = __resolveTranslation(
      segmentMatch.key,
      segmentMatch.values,
      { element: parentElement },
      null
    );
    const translatedText2 = segmentMatch.values.length ? __replacePlaceholders(translated2, (index) => segmentMatch.values[index]) : translated2;
    const localizedCore = core.slice(0, segmentMatch.start) + translatedText2 + core.slice(segmentMatch.end);
    const localizedText = `${leading}${localizedCore}${trailing}`;
    if (localizedText !== textNode.nodeValue) {
      textNode.nodeValue = localizedText;
    }
    return;
  }
  __localizationState.textNodeKeyMap.set(textNode, key);
  const scopedLocale = __resolveContextLocale({ element: parentElement });
  await __loadLocaleInternal(scopedLocale, "text-node");
  const values = __resolveTemplateValuesForText(key, core);
  const translated = __resolveTranslation(key, values, { element: parentElement }, null);
  const translatedText = values.length ? __replacePlaceholders(translated, (index) => values[index]) : translated;
  const nextText = `${leading}${translatedText}${trailing}`;
  if (nextText !== textNode.nodeValue) {
    textNode.nodeValue = nextText;
  }
}
async function __localizeRequestedTextNodes() {
  if (typeof document === "undefined" || __localizationState.requestedKeys.size === 0) {
    return;
  }
  const root = document.body || document.documentElement;
  if (!root || typeof document.createTreeWalker !== "function") {
    return;
  }
  const roots = [];
  const seenRoots = /* @__PURE__ */ new Set();
  const addRoot = (candidateRoot) => {
    if (!candidateRoot || seenRoots.has(candidateRoot)) {
      return;
    }
    seenRoots.add(candidateRoot);
    roots.push(candidateRoot);
  };
  addRoot(root);
  for (let index = 0; index < roots.length; index += 1) {
    const currentRoot = roots[index];
    if (!currentRoot || typeof currentRoot.querySelectorAll !== "function") {
      continue;
    }
    const elements = currentRoot.querySelectorAll("*");
    for (const element of elements) {
      const shadowRoot = element?.shadowRoot;
      if (shadowRoot) {
        addRoot(shadowRoot);
      }
    }
  }
  const nodes = [];
  for (const scanRoot of roots) {
    const walker = document.createTreeWalker(scanRoot, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      nodes.push(walker.currentNode);
    }
  }
  for (const node of nodes) {
    await __localizeTextNode(node);
  }
}
function __getElementAttributeKeyMap(element) {
  let map = __localizationState.attributeKeyMap.get(element);
  if (!map) {
    map = /* @__PURE__ */ new Map();
    __localizationState.attributeKeyMap.set(element, map);
  }
  return map;
}
async function __localizeAttribute(element, attrName) {
  if (!element || typeof element.getAttribute !== "function") {
    return;
  }
  const rawValue = element.getAttribute(attrName);
  if (typeof rawValue !== "string" || !rawValue.length) {
    return;
  }
  const keyMap = __getElementAttributeKeyMap(element);
  let key = keyMap.get(attrName) || null;
  if (!key || !__localizationState.requestedKeys.has(key)) {
    key = __findRequestedKeyForText(rawValue);
  }
  if (!key) {
    const segmentMatch = __findRequestedSubsegmentForText(rawValue);
    if (!segmentMatch) {
      return;
    }
    const scopedLocale2 = __resolveContextLocale({ element });
    await __loadLocaleInternal(scopedLocale2, "attribute");
    const translated2 = __resolveTranslation(segmentMatch.key, segmentMatch.values, { element }, null);
    const translatedText2 = segmentMatch.values.length ? __replacePlaceholders(translated2, (index) => segmentMatch.values[index]) : translated2;
    const localizedValue = rawValue.slice(0, segmentMatch.start) + translatedText2 + rawValue.slice(segmentMatch.end);
    if (localizedValue !== rawValue) {
      element.setAttribute(attrName, localizedValue);
    }
    keyMap.set(attrName, segmentMatch.key);
    return;
  }
  keyMap.set(attrName, key);
  const scopedLocale = __resolveContextLocale({ element });
  await __loadLocaleInternal(scopedLocale, "attribute");
  const values = __resolveTemplateValuesForText(key, rawValue);
  const translated = __resolveTranslation(key, values, { element }, null);
  const translatedText = values.length ? __replacePlaceholders(translated, (index) => values[index]) : translated;
  if (translatedText !== rawValue) {
    element.setAttribute(attrName, translatedText);
  }
}
async function __localizeRequestedAttributes() {
  if (typeof document === "undefined" || __localizationState.requestedKeys.size === 0) {
    return;
  }
  const root = document.body || document.documentElement;
  if (!root) {
    return;
  }
  const roots = [];
  const seenRoots = /* @__PURE__ */ new Set();
  const addRoot = (candidateRoot) => {
    if (!candidateRoot || seenRoots.has(candidateRoot)) {
      return;
    }
    seenRoots.add(candidateRoot);
    roots.push(candidateRoot);
  };
  addRoot(root);
  for (let index = 0; index < roots.length; index += 1) {
    const currentRoot = roots[index];
    if (!currentRoot || typeof currentRoot.querySelectorAll !== "function") {
      continue;
    }
    const elements = currentRoot.querySelectorAll("*");
    for (const element of elements) {
      const shadowRoot = element?.shadowRoot;
      if (shadowRoot) {
        addRoot(shadowRoot);
      }
    }
  }
  for (const scanRoot of roots) {
    if (!scanRoot || typeof scanRoot.querySelectorAll !== "function") {
      continue;
    }
    const elements = scanRoot.querySelectorAll("*");
    for (const element of elements) {
      for (const attrName of __LOCALIZABLE_ATTRIBUTES) {
        if (element.hasAttribute(attrName)) {
          await __localizeAttribute(element, attrName);
        }
      }
    }
  }
}
async function __reconcileLocalization() {
  const detectedLocales = __collectDetectedLocales();
  await __ensureDetectedLocalesLoaded(detectedLocales);
  await __localizeRequestedTextNodes();
  await __localizeRequestedAttributes();
  __pruneUndetectedLocales(detectedLocales);
}
function __scheduleReconcile() {
  if (typeof window === "undefined") {
    return;
  }
  if (__localizationState.reconcileTimer) {
    clearTimeout(__localizationState.reconcileTimer);
  }
  __localizationState.reconcileTimer = setTimeout(() => {
    __localizationState.reconcileTimer = null;
    __reconcileLocalization();
  }, 16);
}
function __resolveTranslation(key, values = [], options = {}, template = null) {
  const requestedLocale = __resolveContextLocale(options);
  const resolvedMessages = __getLocaleMessages(requestedLocale);
  if (!resolvedMessages) {
    __loadLocaleInternal(requestedLocale, "msg");
  }
  const targetMessages = __getLocaleMessages(requestedLocale)?.messages || {};
  const defaultMessages = __getLocaleMessages(__localizationState.defaultLocale)?.messages || {};
  const context = {
    key,
    values,
    options,
    locale: requestedLocale,
    defaultLocale: __localizationState.defaultLocale,
    messages: targetMessages,
    messagesByLocale: Object.fromEntries(
      Array.from(__localizationState.messagesByLocale.entries())
    ),
    template
  };
  let translated;
  const localeLoaded = Boolean(resolvedMessages);
  const isDefaultLocale = requestedLocale === __localizationState.defaultLocale;
  if (typeof __localizationState.provider?.translate === "function") {
    translated = __localizationState.provider.translate(context);
  }
  let fallbackKind = null;
  if (translated === void 0 || translated === null) {
    translated = targetMessages[key];
  }
  if (translated === void 0 || translated === null) {
    translated = defaultMessages[key];
    fallbackKind = translated === void 0 || translated === null ? null : "default";
  }
  if (translated === void 0 || translated === null) {
    translated = key;
    fallbackKind = "key";
  }
  if (localeLoaded && !isDefaultLocale && fallbackKind) {
    const warningKey = `${requestedLocale}::${key}`;
    if (!__localizationState.missingWarnings.has(warningKey)) {
      __localizationState.missingWarnings.add(warningKey);
      pdsLog(
        "warn",
        `[i18n] Missing translation for locale "${requestedLocale}" and key "${key}"; using ${fallbackKind} fallback.`
      );
    }
  }
  const resolved = typeof translated === "string" ? translated : String(translated);
  __indexTranslatedValue(key, resolved);
  if (Array.isArray(values) && values.length > 0) {
    const materialized = __replacePlaceholders(resolved, (index) => values[index]);
    if (materialized !== resolved) {
      __indexTranslatedValue(key, materialized);
    }
  }
  return resolved;
}
var joinStringsAndValues = (strings, values, options = {}) => {
  const messageKey = __collateStrings(strings);
  __registerRequestedKey(messageKey);
  const translated = __resolveTranslation(messageKey, values, options, {
    strings,
    values
  });
  return __replacePlaceholders(translated, (index) => values[index]);
};
var msg = (template, options = {}) => {
  if (!template) {
    return "";
  }
  if (__isStrTagged(template)) {
    return joinStringsAndValues(template.strings, template.values, options);
  }
  const key = String(template);
  __registerRequestedKey(key);
  const translated = __resolveTranslation(key, [], options, null);
  if (!options?.element && !options?.scope && !options?.host && !options?.contextElement && !options?.lang) {
    __scheduleReconcile();
  }
  return translated;
};

// src/js/pds-core/pds-enhancers.js
var enhancerDefinitions = [
  { selector: ".accordion" },
  { selector: "nav[data-dropdown]" },
  { selector: "label[data-toggle]" },
  { selector: "label[data-color]" },
  { selector: 'input[type="range"]' },
  { selector: "form[data-required]" },
  { selector: "fieldset[role=group][data-open]" },
  { selector: "[data-clip]" },
  { selector: "button, a[class*='btn-']" }
];
function enhanceAccordion(elem) {
  if (elem.dataset.enhancedAccordion)
    return;
  elem.dataset.enhancedAccordion = "true";
  elem.addEventListener(
    "toggle",
    (event) => {
      if (event.target.open && event.target.parentElement === elem) {
        elem.querySelectorAll(":scope > details[open]").forEach((details) => {
          if (details !== event.target) {
            details.open = false;
          }
        });
      }
    },
    true
  );
}
function enhanceDropdown(elem) {
  if (elem.dataset.enhancedDropdown)
    return;
  elem.dataset.enhancedDropdown = "true";
  const menu = elem.lastElementChild;
  if (!menu)
    return;
  const trigger = elem.querySelector("[data-dropdown-toggle]") || elem.querySelector("button");
  const supportsPopover = typeof HTMLElement !== "undefined" && "showPopover" in HTMLElement.prototype && "hidePopover" in HTMLElement.prototype;
  if (trigger && !trigger.hasAttribute("type")) {
    trigger.setAttribute("type", "button");
  }
  if (!menu.id) {
    menu.id = `dropdown-${Math.random().toString(36).slice(2, 9)}`;
  }
  const isMenu = menu.tagName?.toLowerCase() === "menu";
  const VIEWPORT_PADDING = 8;
  if (isMenu && !menu.hasAttribute("role")) {
    menu.setAttribute("role", "menu");
  }
  if (!menu.hasAttribute("aria-hidden")) {
    menu.setAttribute("aria-hidden", "true");
  }
  if (trigger) {
    trigger.setAttribute("aria-haspopup", "true");
    trigger.setAttribute("aria-controls", menu.id);
    trigger.setAttribute("aria-expanded", "false");
  }
  if (!supportsPopover) {
    const warnKey = "__PDS_DROPDOWN_POPOVER_WARNED__";
    if (!globalThis[warnKey]) {
      globalThis[warnKey] = true;
      console.warn(
        "[PDS] nav[data-dropdown] requires the Popover API. Add a popover polyfill (recommended: @oddbird/popover-polyfill) for browsers without support."
      );
    }
    return;
  }
  menu.setAttribute("popover", "auto");
  const measureMenuSize = () => {
    const previousStyle = menu.getAttribute("style");
    menu.style.visibility = "hidden";
    menu.style.display = "inline-block";
    menu.style.pointerEvents = "none";
    const rect = menu.getBoundingClientRect();
    const width = Math.max(menu.offsetWidth || 0, menu.scrollWidth || 0, rect.width || 0, 1);
    const height = Math.max(
      menu.offsetHeight || 0,
      menu.scrollHeight || 0,
      rect.height || 0,
      1
    );
    if (previousStyle === null) {
      menu.removeAttribute("style");
    } else {
      menu.setAttribute("style", previousStyle);
    }
    return { width, height };
  };
  const isPopoverOpen = () => {
    try {
      return menu.matches(":popover-open");
    } catch {
      return false;
    }
  };
  const syncClosedState = () => {
    menu.setAttribute("aria-hidden", "true");
    trigger?.setAttribute("aria-expanded", "false");
  };
  const syncOpenState = () => {
    menu.setAttribute("aria-hidden", "false");
    trigger?.setAttribute("aria-expanded", "true");
  };
  const resolveDirection = () => {
    const mode = (elem.getAttribute("data-direction") || elem.getAttribute("data-dropdown-direction") || elem.getAttribute("data-mode") || "auto").toLowerCase();
    if (mode === "up" || mode === "down")
      return mode;
    const anchorRect = (trigger || elem).getBoundingClientRect();
    const { height: menuHeight } = measureMenuSize();
    const spaceBelow = Math.max(0, window.innerHeight - anchorRect.bottom);
    const spaceAbove = Math.max(0, anchorRect.top);
    const fitsDown = spaceBelow >= menuHeight;
    const fitsUp = spaceAbove >= menuHeight;
    if (fitsDown && !fitsUp)
      return "down";
    if (fitsUp && !fitsDown)
      return "up";
    if (fitsDown && fitsUp)
      return "down";
    return spaceAbove > spaceBelow ? "up" : "down";
  };
  const resolveAlign = () => {
    const align = (elem.getAttribute("data-align") || elem.getAttribute("data-dropdown-align") || "auto").toLowerCase();
    if (align === "left" || align === "right" || align === "start" || align === "end") {
      return align === "start" ? "left" : align === "end" ? "right" : align;
    }
    const anchorRect = (trigger || elem).getBoundingClientRect();
    const { width: menuWidth } = measureMenuSize();
    const spaceForLeftAligned = Math.max(0, window.innerWidth - anchorRect.left);
    const spaceForRightAligned = Math.max(0, anchorRect.right);
    const fitsLeft = spaceForLeftAligned >= menuWidth;
    const fitsRight = spaceForRightAligned >= menuWidth;
    if (fitsLeft && !fitsRight)
      return "left";
    if (fitsRight && !fitsLeft)
      return "right";
    if (fitsLeft && fitsRight)
      return "left";
    return spaceForRightAligned > spaceForLeftAligned ? "right" : "left";
  };
  const readLengthToken = (tokenName, fallback = 8) => {
    const raw = getComputedStyle(elem).getPropertyValue(tokenName).trim();
    if (!raw)
      return fallback;
    const probe = document.createElement("span");
    probe.style.position = "fixed";
    probe.style.visibility = "hidden";
    probe.style.pointerEvents = "none";
    probe.style.height = raw;
    document.body.appendChild(probe);
    const parsed = Number.parseFloat(getComputedStyle(probe).height);
    probe.remove();
    return Number.isFinite(parsed) ? parsed : fallback;
  };
  const clearFloatingMenuPosition = () => {
    [
      "position",
      "left",
      "top",
      "right",
      "bottom",
      "margin-top",
      "margin-bottom",
      "max-width",
      "max-inline-size",
      "max-height",
      "overflow"
    ].forEach((prop) => menu.style.removeProperty(prop));
  };
  const positionPopoverMenu = () => {
    if (!isPopoverOpen())
      return;
    const anchorRect = (trigger || elem).getBoundingClientRect();
    const viewport = window.visualViewport;
    const viewportWidth = viewport?.width || document.documentElement?.clientWidth || window.innerWidth;
    const viewportHeight = viewport?.height || document.documentElement?.clientHeight || window.innerHeight;
    const viewportOffsetLeft = viewport?.offsetLeft || 0;
    const viewportOffsetTop = viewport?.offsetTop || 0;
    const maxMenuWidth = Math.max(1, viewportWidth - VIEWPORT_PADDING * 2);
    const maxMenuHeight = Math.max(1, viewportHeight - VIEWPORT_PADDING * 2);
    menu.style.maxWidth = `${Math.round(maxMenuWidth)}px`;
    menu.style.maxInlineSize = `${Math.round(maxMenuWidth)}px`;
    menu.style.maxHeight = `${Math.round(maxMenuHeight)}px`;
    menu.style.overflow = "auto";
    const { width: menuWidth, height: menuHeight } = measureMenuSize();
    const spacing = readLengthToken("--spacing-2", 8);
    const direction = resolveDirection();
    const align = resolveAlign();
    elem.dataset.dropdownDirection = direction;
    elem.dataset.dropdownAlign = align;
    let left = align === "right" ? anchorRect.right - menuWidth : anchorRect.left;
    if (menuWidth >= maxMenuWidth - 1) {
      left = viewportOffsetLeft + VIEWPORT_PADDING;
    } else {
      left = Math.max(
        viewportOffsetLeft + VIEWPORT_PADDING,
        Math.min(
          left,
          viewportOffsetLeft + viewportWidth - menuWidth - VIEWPORT_PADDING
        )
      );
    }
    let top = direction === "up" ? anchorRect.top - spacing - menuHeight : anchorRect.bottom + spacing;
    top = Math.max(
      viewportOffsetTop + VIEWPORT_PADDING,
      Math.min(
        top,
        viewportOffsetTop + viewportHeight - menuHeight - VIEWPORT_PADDING
      )
    );
    Object.assign(menu.style, {
      position: "fixed",
      left: `${Math.round(left)}px`,
      top: `${Math.round(top)}px`,
      right: "auto",
      bottom: "auto",
      marginTop: "0",
      marginBottom: "0"
    });
  };
  let repositionHandler = null;
  const bindReposition = () => {
    if (repositionHandler)
      return;
    repositionHandler = () => positionPopoverMenu();
    window.addEventListener("resize", repositionHandler);
    window.addEventListener("scroll", repositionHandler, true);
  };
  const unbindReposition = () => {
    if (!repositionHandler)
      return;
    window.removeEventListener("resize", repositionHandler);
    window.removeEventListener("scroll", repositionHandler, true);
    repositionHandler = null;
  };
  let configChangedHandler = null;
  let configRepositionFrame = null;
  const bindConfigChanged = () => {
    if (configChangedHandler || typeof document === "undefined")
      return;
    configChangedHandler = () => {
      if (!isPopoverOpen())
        return;
      elem.dataset.dropdownDirection = resolveDirection();
      elem.dataset.dropdownAlign = resolveAlign();
      if (configRepositionFrame !== null) {
        cancelAnimationFrame(configRepositionFrame);
      }
      configRepositionFrame = requestAnimationFrame(() => {
        configRepositionFrame = null;
        if (!isPopoverOpen())
          return;
        positionPopoverMenu();
      });
    };
    document.addEventListener("pds:config-changed", configChangedHandler);
  };
  const unbindConfigChanged = () => {
    if (!configChangedHandler || typeof document === "undefined")
      return;
    document.removeEventListener("pds:config-changed", configChangedHandler);
    configChangedHandler = null;
    if (configRepositionFrame !== null) {
      cancelAnimationFrame(configRepositionFrame);
      configRepositionFrame = null;
    }
  };
  menu.addEventListener("toggle", (event) => {
    const isOpen = event.newState === "open";
    if (isOpen) {
      syncOpenState();
      positionPopoverMenu();
      bindReposition();
      bindConfigChanged();
      return;
    }
    syncClosedState();
    unbindReposition();
    unbindConfigChanged();
    clearFloatingMenuPosition();
  });
  const openMenu = () => {
    if (isPopoverOpen())
      return;
    elem.dataset.dropdownDirection = resolveDirection();
    elem.dataset.dropdownAlign = resolveAlign();
    menu.showPopover();
    requestAnimationFrame(() => positionPopoverMenu());
  };
  const closeMenu = () => {
    if (!isPopoverOpen())
      return;
    menu.hidePopover();
  };
  const toggleMenu = () => {
    if (isPopoverOpen()) {
      closeMenu();
    } else {
      openMenu();
    }
  };
  syncClosedState();
  menu.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : event.target?.parentElement;
    if (!target)
      return;
    if (!target.closest("[data-dropdown-close]"))
      return;
    closeMenu();
  });
  trigger?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleMenu();
  });
  elem.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      trigger?.focus();
    }
  });
}
function enhanceToggle(elem) {
  if (elem.dataset.enhancedToggle)
    return;
  elem.dataset.enhancedToggle = "true";
  const checkbox = elem.querySelector('input[type="checkbox"]');
  if (!checkbox)
    return;
  if (!elem.hasAttribute("tabindex")) {
    elem.setAttribute("tabindex", "0");
  }
  elem.setAttribute("role", "switch");
  elem.setAttribute("aria-checked", checkbox.checked ? "true" : "false");
  const toggleSwitch = document.createElement("span");
  toggleSwitch.className = "toggle-switch";
  toggleSwitch.setAttribute("role", "presentation");
  toggleSwitch.setAttribute("aria-hidden", "true");
  const knob = document.createElement("span");
  knob.className = "toggle-knob";
  toggleSwitch.appendChild(knob);
  elem.insertBefore(toggleSwitch, checkbox.nextSibling);
  const updateAria = () => {
    elem.setAttribute("aria-checked", checkbox.checked ? "true" : "false");
  };
  const toggle = () => {
    if (checkbox.disabled)
      return;
    checkbox.checked = !checkbox.checked;
    updateAria();
    checkbox.dispatchEvent(new Event("input", { bubbles: true }));
    checkbox.dispatchEvent(new Event("change", { bubbles: true }));
  };
  elem.addEventListener("click", (event) => {
    event.preventDefault();
    toggle();
  });
  elem.addEventListener("keydown", (event) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      toggle();
    }
  });
  checkbox.addEventListener("change", updateAria);
}
function enhanceColorInput(elem) {
  if (elem.dataset.enhancedColorInput)
    return;
  const input = elem.querySelector('input[type="color"]');
  if (!input)
    return;
  elem.dataset.enhancedColorInput = "true";
  let control = elem.querySelector(":scope > .color-control");
  let swatch = elem.querySelector(":scope > .color-control > .color-swatch");
  let output = elem.querySelector(":scope > .color-control > output");
  if (!control) {
    control = document.createElement("span");
    control.className = "color-control";
    input.before(control);
  }
  if (!swatch) {
    swatch = document.createElement("span");
    swatch.className = "color-swatch";
    control.appendChild(swatch);
  }
  if (input.parentElement !== swatch) {
    swatch.appendChild(input);
  }
  if (!output) {
    output = document.createElement("output");
    control.appendChild(output);
  }
  const sync = () => {
    const isUnset = input.dataset.colorUnset === "1";
    if (isUnset) {
      output.value = "";
      output.textContent = msg("not set");
      control.dataset.value = "";
      control.dataset.unset = "1";
      swatch.dataset.unset = "1";
      return;
    }
    output.value = input.value;
    output.textContent = input.value;
    control.dataset.value = input.value;
    delete control.dataset.unset;
    delete swatch.dataset.unset;
  };
  sync();
  const setResolved = () => {
    if (input.dataset.colorUnset === "1") {
      input.dataset.colorUnset = "0";
    }
    sync();
  };
  input.addEventListener("input", setResolved, { passive: true });
  input.addEventListener("change", setResolved, { passive: true });
}
function enhanceRange(elem) {
  if (elem.dataset.enhancedRange)
    return;
  const wireProgrammaticUpdates = (updateFn) => {
    if (elem.dataset.enhancedRangeProgrammatic)
      return;
    elem.dataset.enhancedRangeProgrammatic = "1";
    const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(elem), "value") || Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");
    if (descriptor?.get && descriptor?.set) {
      Object.defineProperty(elem, "value", {
        configurable: true,
        enumerable: descriptor.enumerable,
        get() {
          return descriptor.get.call(this);
        },
        set(nextValue) {
          descriptor.set.call(this, nextValue);
          updateFn();
        }
      });
    }
    const attrObserver = new MutationObserver((mutations) => {
      const shouldUpdate = mutations.some((mutation) => {
        const attr = mutation.attributeName;
        return attr === "value" || attr === "min" || attr === "max";
      });
      if (shouldUpdate)
        updateFn();
    });
    attrObserver.observe(elem, {
      attributes: true,
      attributeFilter: ["value", "min", "max"]
    });
  };
  const label = elem.closest("label");
  const hasRangeOutputClass = label?.classList.contains("range-output");
  const inputId = elem.id || `range-${Math.random().toString(36).substring(2, 11)}`;
  const outputId = `${inputId}-output`;
  elem.id = inputId;
  if (hasRangeOutputClass) {
    const labelSpan = label.querySelector("span");
    if (labelSpan && !labelSpan.classList.contains("range-output-wrapper")) {
      const explicitRangeLabel = labelSpan.getAttribute("data-range-label") || label.getAttribute("data-range-label") || "";
      const wrapper = document.createElement("span");
      wrapper.className = "range-output-wrapper";
      wrapper.style.display = "flex";
      wrapper.style.justifyContent = "space-between";
      wrapper.style.alignItems = "center";
      const textSpan = document.createElement("span");
      textSpan.textContent = explicitRangeLabel || labelSpan.textContent;
      wrapper.appendChild(textSpan);
      const output = document.createElement("output");
      output.id = outputId;
      output.setAttribute("for", inputId);
      output.style.color = "var(--surface-text-secondary, var(--color-text-secondary))";
      output.style.fontSize = "0.875rem";
      output.textContent = elem.value;
      wrapper.appendChild(output);
      labelSpan.textContent = "";
      labelSpan.appendChild(wrapper);
      const updateOutput = () => {
        output.textContent = elem.value;
      };
      elem.addEventListener("input", updateOutput);
      elem.addEventListener("change", updateOutput);
      wireProgrammaticUpdates(updateOutput);
      updateOutput();
    }
  } else {
    let container = elem.closest(".range-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "range-container";
      elem.parentNode?.insertBefore(container, elem);
      container.appendChild(elem);
    }
    container.style.position = "relative";
    const bubble = document.createElement("output");
    bubble.id = outputId;
    bubble.setAttribute("for", inputId);
    bubble.className = "range-bubble";
    bubble.setAttribute("aria-live", "polite");
    container.appendChild(bubble);
    const updateBubble = () => {
      const min = parseFloat(elem.min) || 0;
      const max = parseFloat(elem.max) || 100;
      const value = parseFloat(elem.value);
      const pct = (value - min) / (max - min);
      bubble.style.left = `calc(${pct * 100}% )`;
      bubble.textContent = String(value);
    };
    const show = () => bubble.classList.add("visible");
    const hide = () => bubble.classList.remove("visible");
    elem.addEventListener("input", updateBubble);
    elem.addEventListener("pointerdown", show);
    elem.addEventListener("pointerup", hide);
    elem.addEventListener("pointerleave", hide);
    elem.addEventListener("focus", show);
    elem.addEventListener("blur", hide);
    elem.addEventListener("change", updateBubble);
    wireProgrammaticUpdates(updateBubble);
    updateBubble();
  }
  elem.dataset.enhancedRange = "1";
}
function enhanceRequired(elem) {
  if (elem.dataset.enhancedRequired)
    return;
  elem.dataset.enhancedRequired = "true";
  const enhanceRequiredField = (input) => {
    let label;
    if (input.closest("[role$=group]")) {
      label = input.closest("[role$=group]").querySelector("legend");
    } else {
      label = input.closest("label");
    }
    if (!label)
      return;
    if (label.querySelector(".required-asterisk"))
      return;
    const asterisk = document.createElement("span");
    asterisk.classList.add("required-asterisk");
    asterisk.textContent = "*";
    asterisk.style.marginLeft = "4px";
    const labelText = label.querySelector("span, [data-label]");
    if (labelText) {
      labelText.appendChild(asterisk);
    } else {
      const field = label.querySelector("input, select, textarea");
      if (field) {
        label.insertBefore(asterisk, field);
      } else {
        label.appendChild(asterisk);
      }
    }
    const form = input.closest("form");
    if (form && !form.querySelector(".required-legend")) {
      const legend = document.createElement("small");
      legend.classList.add("required-legend");
      legend.textContent = msg("* Required fields");
      form.insertBefore(
        legend,
        form.querySelector(".form-actions") || form.lastElementChild
      );
    }
  };
  elem.querySelectorAll("[required]").forEach((input) => {
    enhanceRequiredField(input);
  });
}
function enhanceOpenGroup(elem) {
  if (elem.dataset.enhancedOpenGroup)
    return;
  elem.dataset.enhancedOpenGroup = "true";
  elem.classList.add("flex", "flex-wrap", "buttons");
  const addInput = document.createElement("input");
  addInput.type = "text";
  addInput.placeholder = msg("Add item...");
  addInput.classList.add("input-text", "input-sm");
  addInput.style.width = "auto";
  const getFirstInput = () => elem.querySelector('input[type="radio"], input[type="checkbox"]');
  elem.appendChild(addInput);
  addInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === "Tab") {
      const value = addInput.value.trim();
      if (value) {
        event.preventDefault();
        const firstInput = getFirstInput();
        const type = firstInput?.type === "radio" ? "radio" : "checkbox";
        const id = `open-group-${Math.random().toString(36).substring(2, 11)}`;
        const label = document.createElement("label");
        const span = document.createElement("span");
        span.setAttribute("data-label", "");
        span.textContent = value;
        const input = document.createElement("input");
        input.type = type;
        input.name = firstInput?.name || elem.getAttribute("data-name") || "open-group";
        input.value = value;
        input.id = id;
        label.appendChild(span);
        label.appendChild(input);
        elem.insertBefore(label, addInput);
        addInput.value = "";
      }
    } else if (event.key === "Backspace" && addInput.value === "") {
      event.preventDefault();
      const labels = elem.querySelectorAll("label");
      if (labels.length > 0) {
        const lastLabel = labels[labels.length - 1];
        lastLabel.remove();
      }
    }
  });
}
function enhanceClip(elem) {
  if (elem.dataset.enhancedClip)
    return;
  elem.dataset.enhancedClip = "true";
  if (!elem.hasAttribute("tabindex")) {
    elem.setAttribute("tabindex", "0");
  }
  if (!elem.hasAttribute("role")) {
    elem.setAttribute("role", "button");
  }
  const syncAria = () => {
    const isOpen = elem.getAttribute("data-clip-open") === "true";
    elem.setAttribute("aria-expanded", isOpen ? "true" : "false");
  };
  const toggleOpen = () => {
    const isOpen = elem.getAttribute("data-clip-open") === "true";
    elem.setAttribute("data-clip-open", isOpen ? "false" : "true");
    syncAria();
  };
  elem.addEventListener("click", (event) => {
    if (event.defaultPrevented)
      return;
    toggleOpen();
  });
  elem.addEventListener("keydown", (event) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      toggleOpen();
    }
  });
  syncAria();
}
function enhanceButtonWorking(elem) {
  if (elem.dataset.enhancedBtnWorking)
    return;
  elem.dataset.enhancedBtnWorking = "true";
  let originalIcon = null;
  let addedIcon = false;
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === "class") {
        const hasWorking = elem.classList.contains("btn-working");
        const icon = elem.querySelector("pds-icon");
        if (hasWorking) {
          if (icon) {
            if (!originalIcon) {
              originalIcon = icon.getAttribute("icon");
            }
            icon.setAttribute("icon", "circle-notch");
          } else {
            const newIcon = document.createElement("pds-icon");
            newIcon.setAttribute("icon", "circle-notch");
            newIcon.setAttribute("size", "sm");
            elem.insertBefore(newIcon, elem.firstChild);
            addedIcon = true;
          }
        } else if (mutation.oldValue?.includes("btn-working")) {
          if (icon) {
            if (addedIcon) {
              icon.remove();
              addedIcon = false;
            } else if (originalIcon) {
              icon.setAttribute("icon", originalIcon);
              originalIcon = null;
            }
          }
        }
      }
    });
  });
  observer.observe(elem, {
    attributes: true,
    attributeFilter: ["class"],
    attributeOldValue: true
  });
}
var enhancerRunners = /* @__PURE__ */ new Map([
  [".accordion", enhanceAccordion],
  ["nav[data-dropdown]", enhanceDropdown],
  ["label[data-toggle]", enhanceToggle],
  ["label[data-color]", enhanceColorInput],
  ['input[type="range"]', enhanceRange],
  ["form[data-required]", enhanceRequired],
  ["fieldset[role=group][data-open]", enhanceOpenGroup],
  ["[data-clip]", enhanceClip],
  ["button, a[class*='btn-']", enhanceButtonWorking]
]);
var defaultPDSEnhancers = enhancerDefinitions.map((meta) => ({
  ...meta,
  run: enhancerRunners.get(meta.selector) || (() => {
  })
}));
export {
  defaultPDSEnhancers
};
//# sourceMappingURL=pds-enhancers.js.map
