import { pdsLog } from "./pds-log.js";

const __DEFAULT_LOCALE__ = "en";

const __localizationState = {
  defaultLocale: __DEFAULT_LOCALE__,
  provider: null,
  messagesByLocale: new Map(),
  loadingByLocale: new Map(),
  observer: null,
  reconcileTimer: null,
  requestedKeys: new Set(),
  textNodeKeyMap: new WeakMap(),
  valueToKeys: new Map(),
  missingWarnings: new Set(),
};

const __isStrTagged = (val) =>
  Boolean(val) && typeof val !== "string" && typeof val === "object" && "strTag" in val;

function __normalizeLocale(locale) {
  return String(locale || "").trim().toLowerCase();
}

function __toBaseLocale(locale) {
  const normalized = __normalizeLocale(locale);
  if (!normalized) return "";
  return normalized.split("-")[0] || normalized;
}

function __resolveLocaleCandidate(locale) {
  const normalized = __normalizeLocale(locale);
  if (!normalized) {
    return __localizationState.defaultLocale;
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

function __resolveProvider(config) {
  const provider =
    config && typeof config.provider === "object" && config.provider
      ? config.provider
      : null;

  const translate =
    typeof config?.translate === "function"
      ? config.translate
      : typeof provider?.translate === "function"
        ? provider.translate
        : null;

  const loadLocale =
    typeof config?.loadLocale === "function"
      ? config.loadLocale
      : typeof provider?.loadLocale === "function"
        ? provider.loadLocale
        : null;

  const setLocale =
    typeof config?.setLocale === "function"
      ? config.setLocale
      : typeof provider?.setLocale === "function"
        ? provider.setLocale
        : null;

  if (!translate && !loadLocale && !setLocale) {
    return null;
  }

  return {
    translate,
    loadLocale,
    setLocale,
  };
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
    __localizationState.valueToKeys.set(translatedValue, new Set());
  }

  __localizationState.valueToKeys.get(translatedValue).add(key);
}

function __getLocaleMessages(locale) {
  const variants = __localeVariants(locale);
  for (const candidate of variants) {
    if (__localizationState.messagesByLocale.has(candidate)) {
      return {
        locale: candidate,
        messages: __localizationState.messagesByLocale.get(candidate),
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

  const loader =
    __localizationState.provider.loadLocale ||
    __localizationState.provider.setLocale ||
    null;

  if (typeof loader !== "function") {
    return {};
  }

  const context = {
    locale: targetLocale,
    defaultLocale: __localizationState.defaultLocale,
    reason,
    loadedLocales: Array.from(__localizationState.messagesByLocale.keys()),
    messages: {
      ...(__getLocaleMessages(targetLocale)?.messages || {}),
    },
    load: reason === "set-default" || reason === "explicit-load",
  };

  let result;
  try {
    result = loader(context);
  } catch {
    return {};
  }

  if (result && typeof result.then === "function") {
    const promise = result
      .then((value) => {
        const normalized = __normalizeMessages(value);
        __setLocaleMessages(targetLocale, normalized);
        return normalized;
      })
      .catch(() => ({}))
      .finally(() => {
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
  const el =
    canUseElementCtor && element instanceof Element
      ? element
      : element?.nodeType === 1
        ? element
        : null;

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

  const scopeElement =
    options?.element || options?.scope || options?.host || options?.contextElement || null;
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
  const detected = new Set([__localizationState.defaultLocale]);

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

    if (
      Object.prototype.hasOwnProperty.call(values, placeholderIndex) &&
      values[placeholderIndex] !== extractedValue
    ) {
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
        values,
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

    const scopedLocale = __resolveContextLocale({ element: parentElement });
    await __loadLocaleInternal(scopedLocale, "text-node");

    const translated = __resolveTranslation(
      segmentMatch.key,
      segmentMatch.values,
      { element: parentElement },
      null
    );
    const translatedText = segmentMatch.values.length
      ? __replacePlaceholders(translated, (index) => segmentMatch.values[index])
      : translated;
    const localizedCore =
      core.slice(0, segmentMatch.start) +
      translatedText +
      core.slice(segmentMatch.end);
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
  const translatedText = values.length
    ? __replacePlaceholders(translated, (index) => values[index])
    : translated;
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
  const seenRoots = new Set();

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

async function __reconcileLocalization() {
  const detectedLocales = __collectDetectedLocales();
  await __ensureDetectedLocalesLoaded(detectedLocales);
  await __localizeRequestedTextNodes();
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

function __attachLangObserver() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  if (__localizationState.observer) {
    __localizationState.observer.disconnect();
    __localizationState.observer = null;
  }

  if (typeof MutationObserver !== "function") {
    return;
  }

  const observer = new MutationObserver(() => {
    __scheduleReconcile();
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"],
    childList: true,
    characterData: true,
    subtree: true,
  });

  __localizationState.observer = observer;
}

function __resolveTranslation(key, values = [], options = {}, template = null) {
  const requestedLocale = __resolveContextLocale(options);
  const resolvedMessages = __getLocaleMessages(requestedLocale);

  if (!resolvedMessages) {
    __loadLocaleInternal(requestedLocale, "msg");
  }

  const targetMessages = __getLocaleMessages(requestedLocale)?.messages || {};
  const defaultMessages =
    __getLocaleMessages(__localizationState.defaultLocale)?.messages || {};

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
    template,
  };

  let translated;
  const localeLoaded = Boolean(resolvedMessages);
  const isDefaultLocale = requestedLocale === __localizationState.defaultLocale;
  if (typeof __localizationState.provider?.translate === "function") {
    translated = __localizationState.provider.translate(context);
  }

  let fallbackKind = null;

  if (translated === undefined || translated === null) {
    translated = targetMessages[key];
  }

  if (translated === undefined || translated === null) {
    translated = defaultMessages[key];
    fallbackKind = translated === undefined || translated === null ? null : "default";
  }

  if (translated === undefined || translated === null) {
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

export function getLocalizationState() {
  const defaultBundle = __getLocaleMessages(__localizationState.defaultLocale);
  return {
    locale: __localizationState.defaultLocale,
    messages: { ...(defaultBundle?.messages || {}) },
    loadedLocales: Array.from(__localizationState.messagesByLocale.keys()),
    hasProvider: Boolean(__localizationState.provider),
  };
}

export function configureLocalization(config = null) {
  if (__localizationState.observer) {
    __localizationState.observer.disconnect();
    __localizationState.observer = null;
  }
  if (__localizationState.reconcileTimer) {
    clearTimeout(__localizationState.reconcileTimer);
    __localizationState.reconcileTimer = null;
  }

  __localizationState.defaultLocale = __DEFAULT_LOCALE__;
  __localizationState.provider = null;
  __localizationState.messagesByLocale.clear();
  __localizationState.loadingByLocale.clear();
  __localizationState.requestedKeys.clear();
  __localizationState.textNodeKeyMap = new WeakMap();
  __localizationState.valueToKeys.clear();
  __localizationState.missingWarnings.clear();

  if (!config || typeof config !== "object") {
    return getLocalizationState();
  }

  if (typeof config.locale === "string" && config.locale.trim()) {
    __localizationState.defaultLocale = __resolveLocaleCandidate(config.locale);
  }

  if (Object.prototype.hasOwnProperty.call(config, "messages")) {
    __setLocaleMessages(__localizationState.defaultLocale, config.messages);
  }

  if (
    Object.prototype.hasOwnProperty.call(config, "provider") ||
    Object.prototype.hasOwnProperty.call(config, "translate") ||
    Object.prototype.hasOwnProperty.call(config, "loadLocale") ||
    Object.prototype.hasOwnProperty.call(config, "setLocale")
  ) {
    __localizationState.provider = __resolveProvider(config);
  }

  __attachLangObserver();
  __scheduleReconcile();

  return getLocalizationState();
}

export async function loadLocale(locale) {
  const targetLocale = __resolveLocaleCandidate(locale);
  await __loadLocaleInternal(targetLocale, "explicit-load");
  const bundle = __getLocaleMessages(targetLocale)?.messages || {};
  return { ...bundle };
}

export async function setLocale(locale, { load = true } = {}) {
  __localizationState.defaultLocale = __resolveLocaleCandidate(locale);
  if (load) {
    await __loadLocaleInternal(__localizationState.defaultLocale, "set-default");
  }
  __scheduleReconcile();
  return __localizationState.defaultLocale;
}

export const joinStringsAndValues = (strings, values, options = {}) => {
  const messageKey = __collateStrings(strings);
  __registerRequestedKey(messageKey);
  const translated = __resolveTranslation(messageKey, values, options, {
    strings,
    values,
  });

  return __replacePlaceholders(translated, (index) => values[index]);
};

export const str = (strings, ...values) => ({
  strTag: true,
  strings: Array.from(strings),
  values,
  raw: Array.from(strings?.raw || []),
});

export const msg = (template, options = {}) => {
  if (!template) {
    return "";
  }

  if (__isStrTagged(template)) {
    return joinStringsAndValues(template.strings, template.values, options);
  }

  const key = String(template);
  __registerRequestedKey(key);
  const translated = __resolveTranslation(key, [], options, null);

  if (
    !options?.element &&
    !options?.scope &&
    !options?.host &&
    !options?.contextElement &&
    !options?.lang
  ) {
    __scheduleReconcile();
  }

  return translated;
};
