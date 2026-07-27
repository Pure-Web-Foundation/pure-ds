import { pdsLog } from "./pds-log.js";

const __DEFAULT_LOCALE__ = "en";
const __RECONCILE_DEBOUNCE_MS = 16;
const __MAX_RECONCILE_PASSES = 5;
const __MAX_INDEXED_VALUES = 1000;

/**
 * Key under which the one true localization state lives on the global scope.
 *
 * The string is duplicated rather than imported, matching how `pds-log.js`
 * reaches `__PURE_DS_PDS_SINGLETON__`: modules under `common/` are leaf
 * utilities and must not depend on `pds-singleton.js`. Importing it would also
 * give `import "@pure-ds/core/localization"` the side effect of instantiating
 * the PDS singleton, and would make this bundle -- which is loaded dynamically
 * and may evaluate before, after, or entirely without `pds.js` -- depend on
 * load order.
 */
const __LOCALIZATION_STATE_KEY = "__PURE_DS_LOCALIZATION_STATE__";

function __createLocalizationState() {
  return {
    defaultLocale: __DEFAULT_LOCALE__,
    provider: null,
    messagesByLocale: new Map(),
    loadingByLocale: new Map(),
    observer: null,
    reconcileTimer: null,
    reconcileInFlight: false,
    reconcileDirty: false,
    selfWrittenTextNodes: new WeakSet(),
    textNodeValueMap: new WeakMap(),
    attributeValueMap: new WeakMap(),
    requestedKeys: new Set(),
    textNodeKeyMap: new WeakMap(),
    attributeKeyMap: new WeakMap(),
    valueToKeys: new Map(),
    messageValueToKeys: new Map(),
    missingWarnings: new Set(),
    configureCount: 0,
  };
}

/**
 * Backfill fields an older copy of this module may not have created.
 *
 * Must test with `in`, never `||=` or `??=`: `provider`, `observer` and
 * `reconcileTimer` are legitimately falsy, so a truthiness test would clobber
 * live values -- including, once the reconciler serializes its passes, the
 * in-flight latch that makes concurrent copies safe.
 */
function __adoptLocalizationState(existingState) {
  const defaults = __createLocalizationState();
  for (const field of Object.keys(defaults)) {
    if (!(field in existingState)) {
      existingState[field] = defaults[field];
    }
  }
  return existingState;
}

function __resolveGlobalScope() {
  try {
    if (typeof globalThis !== "undefined") return globalThis;
    if (typeof window !== "undefined") return window;
  } catch {
    return null;
  }
  return null;
}

/**
 * Resolve the single source of truth for localization state, shared by every
 * copy of this module in the realm.
 *
 * Several `@pure-ds/core` bundles statically inline this file
 * (`pds-localization.js`, `pds-enhancers.js`, `pds-manager.js`) and a consumer
 * may bundle a further copy, so module-level state would fork: only the copy
 * that receives `configureLocalization()` would work, and every `msg()` call in
 * the others would return its raw key. Two configured copies would run two
 * MutationObservers over one document, each seeing the other's writes as
 * external mutations.
 *
 * INVARIANT: the state OBJECT identity is never replaced -- only its fields are
 * mutated. Every access in this file goes through `__localizationState.<field>`,
 * so a field reassignment (as `configureLocalization` does for the key maps) is
 * immediately visible to all copies. Never reassign `__localizationState`, and
 * never destructure a field into a module-level binding: either re-forks the
 * state silently.
 *
 * Fields are append-only, because the object is a contract across versions. If
 * a breaking shape change is ever needed, change the KEY rather than the shape
 * -- refusing to adopt an older-shaped state would recreate the fork this
 * exists to remove.
 */
function __resolveLocalizationState() {
  const scope = __resolveGlobalScope();
  if (!scope) {
    return __createLocalizationState();
  }

  const existingState = scope[__LOCALIZATION_STATE_KEY];
  if (existingState && typeof existingState === "object") {
    return __adoptLocalizationState(existingState);
  }

  const createdState = __createLocalizationState();
  try {
    scope[__LOCALIZATION_STATE_KEY] = createdState;
  } catch {
    // Frozen or sealed global (hardened realms, some CSP shims): degrade to
    // per-copy state, which is the pre-fix behaviour. Never throw from module
    // evaluation.
  }
  return createdState;
}

const __localizationState = __resolveLocalizationState();

const __LOCALIZABLE_ATTRIBUTES = [
  "title",
  "placeholder",
  "aria-label",
  "aria-description",
  "aria-placeholder",
  "aria-roledescription",
  "alt",
  "label",
];

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

  const resolveLocale =
    typeof config?.resolveLocale === "function"
      ? config.resolveLocale
      : typeof provider?.resolveLocale === "function"
        ? provider.resolveLocale
        : null;

  if (!translate && !loadLocale && !setLocale && !resolveLocale) {
    return null;
  }

  return {
    translate,
    loadLocale,
    setLocale,
    resolveLocale,
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

/**
 * Rebuilds the authoritative value -> requested-key(s) index from every
 * loaded locale bundle. Replaces the map wholesale rather than patching it in
 * place, since a removed or changed key can't be found to unindex without
 * rescanning anyway.
 *
 * This is what __findRequestedKeyForText's third tier reads instead of its
 * former nested "for each requested key, for each loaded locale" scan.
 */
function __rebuildMessageValueIndex() {
  const index = new Map();

  for (const messages of __localizationState.messagesByLocale.values()) {
    if (!messages) {
      continue;
    }

    for (const [key, value] of Object.entries(messages)) {
      if (typeof value !== "string" || !value.length) {
        continue;
      }

      let keys = index.get(value);
      if (!keys) {
        keys = new Set();
        index.set(value, keys);
      }
      keys.add(key);
    }
  }

  __localizationState.messageValueToKeys = index;
}

/**
 * Wholesale-replaces the text/attribute skip caches. Called whenever the
 * decision __localizeTextNode/__localizeAttribute made for a node could now
 * be different even though the node's own value hasn't changed: a locale
 * bundle arrived or changed, the effective locale scope changed (a `lang`
 * mutation), or the default locale changed via setLocale().
 */
function __invalidateValueCaches() {
  __localizationState.textNodeValueMap = new WeakMap();
  __localizationState.attributeValueMap = new WeakMap();
}

function __setLocaleMessages(locale, messages) {
  const normalizedLocale = __resolveLocaleCandidate(locale);
  __localizationState.messagesByLocale.set(
    normalizedLocale,
    __normalizeMessages(messages)
  );
  __rebuildMessageValueIndex();
  __invalidateValueCaches();
  // Loading a locale bundle can happen mid-pass, on demand, for a node the
  // tree walker hasn't reached yet -- or, if two nodes share a locale scope
  // that wasn't loaded yet, for a node that has already been processed and
  // is otherwise done for this pass. Scheduling here (a no-op-to-dirty if a
  // pass is already in flight) is what gives that earlier node another
  // chance instead of leaving it permanently cached on a fallback value.
  __scheduleReconcile();
}

/**
 * Registers a key as one msg()/str() has asked for, returning whether it was
 * newly added.
 *
 * A text node visited before its key was registered gets cached in
 * textNodeValueMap as "nothing to do here" (see __localizeTextNode). Without
 * invalidating on a genuinely new key, that cached decision would never be
 * revisited, so server-rendered text whose key a later-mounted component
 * registers via msg() would never localize.
 */
function __registerRequestedKey(key) {
  if (typeof key !== "string" || key.length === 0) {
    return false;
  }

  if (__localizationState.requestedKeys.has(key)) {
    return false;
  }

  __localizationState.requestedKeys.add(key);
  __invalidateValueCaches();
  return true;
}

function __indexTranslatedValue(key, value) {
  if (typeof key !== "string" || !key.length) {
    return;
  }

  const translatedValue = typeof value === "string" ? value : String(value || "");
  if (!translatedValue.length) {
    return;
  }

  const index = __localizationState.valueToKeys;
  let keys = index.get(translatedValue);

  if (!keys) {
    // FIFO eviction on Map insertion order -- a `while`, not an `if`, so a
    // lowered cap still converges. Without this the index (and the O(index)
    // per-node scan in __findRequestedSubsegmentForText) grows for the
    // lifetime of a session. Accepted trade-off: __findRequestedSubsegmentForText
    // reads only this index, not messageValueToKeys, so evicting a value can
    // silently stop a subsegment match from firing once the cap is exceeded.
    while (index.size >= __MAX_INDEXED_VALUES) {
      const oldest = index.keys().next();
      if (oldest.done) {
        break;
      }
      index.delete(oldest.value);
    }

    keys = new Set();
    index.set(translatedValue, keys);
  }

  keys.add(key);
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

function __collectDetectedLocales(roots = []) {
  const detected = new Set([__localizationState.defaultLocale]);

  if (typeof document === "undefined") {
    return detected;
  }

  const rootLang = __normalizeLocale(document.documentElement?.getAttribute?.("lang"));
  if (rootLang) {
    detected.add(__resolveLocaleCandidate(rootLang));
  }

  const addLangFrom = (scanRoot) => {
    const nodes = scanRoot?.querySelectorAll?.("[lang]") || [];
    for (const node of nodes) {
      const lang = __normalizeLocale(node.getAttribute("lang"));
      if (lang) {
        detected.add(__resolveLocaleCandidate(lang));
      }
    }
  };

  addLangFrom(document);

  // document.querySelectorAll does not pierce shadow boundaries, but
  // __resolveContextLocale can resolve a `lang` set inside one (via
  // closest("[lang]") on a shadow-internal element). Without this, a
  // shadow-scoped locale gets loaded once and then pruned again on every
  // subsequent pass, since __pruneUndetectedLocales only keeps locales this
  // function reports.
  for (const root of roots) {
    if (root && root !== document) {
      addLangFrom(root);
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
  let removedAny = false;

  for (const loadedLocale of Array.from(__localizationState.messagesByLocale.keys())) {
    if (!detectedLocales.has(loadedLocale)) {
      __localizationState.messagesByLocale.delete(loadedLocale);
      removedAny = true;
    }
  }

  // Guarded on removedAny: this runs at the end of every pass, and in steady
  // state nothing is removed, so an unconditional rebuild here would redo the
  // full-index scan on every settle for no reason.
  if (removedAny) {
    __rebuildMessageValueIndex();
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

  // Formerly an O(requestedKeys x loaded locales) scan re-run for every text
  // node on every pass; __rebuildMessageValueIndex keeps this map current
  // instead. A tie (two requested keys sharing one locale's translated
  // value) can pick a different key than the old insertion-order scan did,
  // but whichever key is chosen translates back to this same coreText, so the
  // rendered output is unaffected -- only textNodeKeyMap/attributeKeyMap
  // bookkeeping could differ.
  const messageKeys = __localizationState.messageValueToKeys.get(coreText);
  if (messageKeys) {
    for (const key of messageKeys) {
      if (__localizationState.requestedKeys.has(key)) {
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

/**
 * Single write path for localized text. The characterData observer on
 * document.documentElement sees every nodeValue assignment the reconciler
 * makes, including its own, so a write recorded here is filtered back out in
 * __attachLangObserver's callback instead of retriggering another pass.
 *
 * Added to the set only when a write actually happens -- an entry added on a
 * no-op write would sit there and swallow the NEXT genuine external mutation
 * to that node instead of this one.
 */
function __setTextNodeValue(textNode, nextValue) {
  if (textNode.nodeValue !== nextValue) {
    __localizationState.selfWrittenTextNodes.add(textNode);
    textNode.nodeValue = nextValue;
  }
  __localizationState.textNodeValueMap.set(textNode, nextValue);
}

async function __localizeTextNode(textNode) {
  if (!textNode || textNode.nodeType !== 3) {
    return;
  }

  const parentElement = textNode.parentElement || null;
  if (!parentElement) {
    return;
  }

  const currentValue = textNode.nodeValue;
  if (__localizationState.textNodeValueMap.get(textNode) === currentValue) {
    return;
  }

  const { leading, core, trailing } = __splitTextWhitespace(currentValue);
  if (!core) {
    __localizationState.textNodeValueMap.set(textNode, currentValue);
    return;
  }

  let key = __localizationState.textNodeKeyMap.get(textNode) || null;
  if (!key || !__localizationState.requestedKeys.has(key)) {
    key = __findRequestedKeyForText(core);
  }

  if (!key) {
    const segmentMatch = __findRequestedSubsegmentForText(core);
    if (!segmentMatch) {
      __localizationState.textNodeValueMap.set(textNode, currentValue);
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

    __setTextNodeValue(textNode, localizedText);
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

  __setTextNodeValue(textNode, nextText);
}

/**
 * Snapshots every localization root (document.body plus every shadow root
 * reachable from it) and every element in those roots, in one walk.
 *
 * Previously __localizeRequestedTextNodes and __localizeRequestedAttributes
 * each independently rediscovered the shadow-root list via their own
 * querySelectorAll("*"), and __localizeRequestedAttributes did it a second
 * time for its own element loop -- three full-tree element snapshots per
 * pass where one suffices.
 */
function __collectLocalizationRoots() {
  if (typeof document === "undefined") {
    return { roots: [], elements: [] };
  }

  const root = document.body || document.documentElement;
  if (!root) {
    return { roots: [], elements: [] };
  }

  const roots = [];
  const elements = [];
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

    const rootElements = currentRoot.querySelectorAll("*");
    for (const element of rootElements) {
      elements.push(element);

      const shadowRoot = element?.shadowRoot;
      if (shadowRoot) {
        addRoot(shadowRoot);
      }
    }
  }

  return { roots, elements };
}

async function __localizeRequestedTextNodes(roots) {
  if (
    typeof document === "undefined" ||
    __localizationState.requestedKeys.size === 0 ||
    typeof document.createTreeWalker !== "function"
  ) {
    return;
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
    map = new Map();
    __localizationState.attributeKeyMap.set(element, map);
  }
  return map;
}

function __getElementAttributeValueMap(element) {
  let map = __localizationState.attributeValueMap.get(element);
  if (!map) {
    map = new Map();
    __localizationState.attributeValueMap.set(element, map);
  }
  return map;
}

/**
 * Single write path for a localized attribute. No self-write filtering is
 * needed here (unlike __setTextNodeValue): `lang` is not one of the
 * localizable attributes, and the observer's attributeFilter is ["lang"], so
 * a write here is structurally unobservable to it.
 */
function __setElementAttributeValue(element, attrName, nextValue) {
  if (element.getAttribute(attrName) !== nextValue) {
    element.setAttribute(attrName, nextValue);
  }
  __getElementAttributeValueMap(element).set(attrName, nextValue);
}

async function __localizeAttribute(element, attrName) {
  if (!element || typeof element.getAttribute !== "function") {
    return;
  }

  const rawValue = element.getAttribute(attrName);
  if (typeof rawValue !== "string" || !rawValue.length) {
    return;
  }

  const valueMap = __getElementAttributeValueMap(element);
  if (valueMap.get(attrName) === rawValue) {
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
      valueMap.set(attrName, rawValue);
      return;
    }

    const scopedLocale = __resolveContextLocale({ element });
    await __loadLocaleInternal(scopedLocale, "attribute");

    const translated = __resolveTranslation(segmentMatch.key, segmentMatch.values, { element }, null);
    const translatedText = segmentMatch.values.length
      ? __replacePlaceholders(translated, (index) => segmentMatch.values[index])
      : translated;

    const localizedValue =
      rawValue.slice(0, segmentMatch.start) +
      translatedText +
      rawValue.slice(segmentMatch.end);

    __setElementAttributeValue(element, attrName, localizedValue);
    keyMap.set(attrName, segmentMatch.key);
    return;
  }

  keyMap.set(attrName, key);

  const scopedLocale = __resolveContextLocale({ element });
  await __loadLocaleInternal(scopedLocale, "attribute");

  const values = __resolveTemplateValuesForText(key, rawValue);
  const translated = __resolveTranslation(key, values, { element }, null);
  const translatedText = values.length
    ? __replacePlaceholders(translated, (index) => values[index])
    : translated;

  __setElementAttributeValue(element, attrName, translatedText);
}

async function __localizeRequestedAttributes(elements) {
  if (typeof document === "undefined" || __localizationState.requestedKeys.size === 0) {
    return;
  }

  for (const element of elements) {
    for (const attrName of __LOCALIZABLE_ATTRIBUTES) {
      if (element.hasAttribute(attrName)) {
        await __localizeAttribute(element, attrName);
      }
    }
  }
}

async function __reconcileLocalization() {
  // Collecting roots/elements walks the whole tree, so skip it entirely when
  // there is nothing registered to localize -- matching the bail-out
  // __localizeRequestedTextNodes/__localizeRequestedAttributes each used to
  // do independently.
  const hasRequestedKeys = __localizationState.requestedKeys.size > 0;
  const { roots, elements } = hasRequestedKeys
    ? __collectLocalizationRoots()
    : { roots: [], elements: [] };

  const detectedLocales = __collectDetectedLocales(roots);
  await __ensureDetectedLocalesLoaded(detectedLocales);

  if (hasRequestedKeys) {
    await __localizeRequestedTextNodes(roots);
    await __localizeRequestedAttributes(elements);
  }

  __pruneUndetectedLocales(detectedLocales);
}

/**
 * Runs reconcile passes until the DOM settles or a cap is hit, serializing
 * against `__scheduleReconcile` via `reconcileInFlight` so that mutations
 * arriving mid-pass coalesce into `reconcileDirty` instead of starting a
 * second concurrent pass. Without this latch, `__scheduleReconcile`'s
 * un-awaited call to `__reconcileLocalization` let passes stack without
 * bound under a busy MutationObserver.
 */
async function __runReconcilePasses() {
  __localizationState.reconcileInFlight = true;
  let passes = 0;

  try {
    do {
      __localizationState.reconcileDirty = false;
      passes += 1;
      await __reconcileLocalization();
    } while (__localizationState.reconcileDirty && passes < __MAX_RECONCILE_PASSES);
  } finally {
    __localizationState.reconcileInFlight = false;
  }

  // No work is dropped by the cap: a still-dirty state re-schedules for the
  // next debounce window instead of settling silently, and there is no await
  // between clearing the latch above and this check, so nothing else can run
  // in between and observe a false "settled" state.
  if (__localizationState.reconcileDirty) {
    pdsLog(
      "warn",
      `[i18n] Localization did not settle after ${__MAX_RECONCILE_PASSES} reconcile passes; continuing in the next scheduling window.`
    );
    __scheduleReconcile();
  }
}

function __scheduleReconcile() {
  if (typeof window === "undefined") {
    return;
  }

  __localizationState.reconcileDirty = true;
  if (__localizationState.reconcileInFlight) {
    return;
  }

  if (__localizationState.reconcileTimer) {
    clearTimeout(__localizationState.reconcileTimer);
  }

  __localizationState.reconcileTimer = setTimeout(() => {
    __localizationState.reconcileTimer = null;
    __runReconcilePasses().catch((error) => {
      pdsLog("error", "[i18n] Localization reconcile pass failed.", error);
    });
  }, __RECONCILE_DEBOUNCE_MS);
}

function __attachLangObserver() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  // Exactly one observer must exist per realm, however many copies of this
  // module are loaded. Re-creating it on every configure would swap a working
  // observer for an identical one and open a window in which mutations are
  // missed, so an already-attached observer is left alone.
  if (__localizationState.observer) {
    return;
  }

  if (typeof MutationObserver !== "function") {
    return;
  }

  const observer = new MutationObserver((records) => {
    // A characterData record whose target is in selfWrittenTextNodes is the
    // reconciler observing its own write. Consuming it here (rather than just
    // checking it) is what stops that write from retriggering the very next
    // pass -- without this the reconciler could livelock on any translation
    // whose messages are not fixpoints (e.g. two keys translating to each
    // other's source text). "attributes" (lang, per attributeFilter below)
    // and "childList" records are never self-inflicted -- the reconciler only
    // ever assigns nodeValue or setAttribute on existing nodes -- so they
    // always count as external.
    let externalMutation = false;
    let langMutated = false;

    for (const record of records) {
      if (record.type === "characterData") {
        if (__localizationState.selfWrittenTextNodes.delete(record.target)) {
          continue;
        }
      } else if (record.type === "attributes") {
        // attributeFilter below is ["lang"], so any "attributes" record IS a
        // lang change. The scope a node resolves its locale from can now
        // differ even though the node's own value hasn't -- e.g. a subtree
        // whose ancestor gained or lost `lang` -- so the skip caches can no
        // longer be trusted.
        langMutated = true;
      }
      externalMutation = true;
    }

    if (langMutated) {
      __invalidateValueCaches();
    }

    if (externalMutation) {
      __scheduleReconcile();
    }
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

function __detachLangObserver() {
  if (__localizationState.observer) {
    __localizationState.observer.disconnect();
    __localizationState.observer = null;
  }
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
    indexedValueCount: __localizationState.valueToKeys.size,
  };
}

export function configureLocalization(config = null) {
  // The state is shared across every copy of this module in the realm, so a
  // second call tears down the first caller's configuration. That is the
  // documented contract, but it is also the likeliest cause of a "my provider
  // disappeared" report, so make it visible.
  __localizationState.configureCount += 1;
  if (__localizationState.configureCount > 1) {
    const incomingLocale =
      typeof config?.locale === "string" && config.locale.trim()
        ? config.locale
        : __DEFAULT_LOCALE__;
    pdsLog(
      "debug",
      `[i18n] configureLocalization() call #${__localizationState.configureCount} replaces the previous configuration (incoming locale "${incomingLocale}"${
        config ? "" : ", resetting to defaults"
      }).`
    );
  }

  // The observer is deliberately NOT disconnected here. It is realm-wide and
  // idempotent (see __attachLangObserver), and it observes only `lang` plus
  // structure -- nothing that the configuration changes. MutationObserver
  // callbacks are microtasks and reconcile is a macrotask, so neither can
  // interleave with this synchronous reset.
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
  __localizationState.attributeKeyMap = new WeakMap();
  __invalidateValueCaches();
  __localizationState.valueToKeys.clear();
  __localizationState.messageValueToKeys.clear();
  __localizationState.missingWarnings.clear();

  if (!config || typeof config !== "object") {
    // A reset leaves nothing to reconcile for, and this path never reaches
    // __attachLangObserver, so the observer must be torn down here or it would
    // keep running a document-wide "[lang]" query on every mutation batch for
    // the rest of the page's life.
    __detachLangObserver();
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
    Object.prototype.hasOwnProperty.call(config, "setLocale") ||
    Object.prototype.hasOwnProperty.call(config, "resolveLocale")
  ) {
    __localizationState.provider = __resolveProvider(config);
  }

  if (__localizationState.provider?.resolveLocale) {
    __localizationState.defaultLocale = __resolveLocaleCandidate(
      __localizationState.defaultLocale
    );
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
  // For an ALREADY-loaded bundle, __loadLocaleInternal returns early and
  // __setLocaleMessages never runs, so nothing would otherwise invalidate the
  // skip caches -- making a switch to a previously-visited locale a silent
  // no-op. Explicit here, rather than relying on __setLocaleMessages, because
  // that early-return path is exactly the case that needs covering.
  __invalidateValueCaches();
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
  const isNewKey = __registerRequestedKey(key);
  const translated = __resolveTranslation(key, [], options, null);

  // Gated on isNewKey, not just "was this called": DOM changes are already
  // covered by the MutationObserver, so a repeat msg() call for an
  // already-registered key has nothing new to reconcile. Without this gate, a
  // render-heavy app calling msg() for the same keys on every render would
  // mark every in-flight pass dirty continuously, turning the reconciler's
  // "did not settle" warning into noise.
  if (
    isNewKey &&
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
