/// <reference path="./pds.d.ts" />

/**
 * Public PDS runtime object exported to consumers.
 *
 * This object exposes the core runtime building blocks for the Pure Design System.
 * It intentionally provides a small, stable surface area so consuming apps can:
 * - programmatically generate design system artifacts (via `getGenerator()` in live mode),
 * - adopt styles into Shadow DOM (via `adoptLayers` / `adoptPrimitives`),
 * - query runtime mode and obtain constructable stylesheets (via `registry`).
 *
 * Common events in the PDS ecosystem (emitted by other packages/components):
 * - `design-updated` — emitted by the designer component when the in-memory design changes (detail: { config }).
 * - `pds-generated` — emitted by the PDS configurator when generation completes (detail: { modules, meta }).
 * - `pds-error` — emitted by the PDS configurator when generation fails (detail: Error).
 *
 * Error handling notes:
 * - Methods that perform dynamic imports (e.g. `adoptLayers` via the registry) may log and return fallbacks
 *   rather than throwing; consumers should check return values (e.g. null) and listen for `pds-error` in UI flows.
 * - `createStylesheet(css)` will throw synchronously if the provided CSS cannot be parsed by the browser's
 *   `CSSStyleSheet.replaceSync()` — callers should guard invalid input or wrap calls in try/catch.
 *
 * @typedef {Object} PDSAPI
 * @property {import("./pds-core/pds-registry.js").PDSRegistry} registry - Singleton runtime registry for live/static mode
 * @property {(generator?: import("./pds-core/pds-generator.js").Generator) => void} applyStyles - Apply generated styles to the document (live-only)
 * @property {(shadowRoot: ShadowRoot, layers?: string[], additionalSheets?: CSSStyleSheet[]) => Promise<void>} adoptLayers - Adopt multiple layers into a ShadowRoot. May log errors and fallback to additionalSheets when static imports fail.
 * @property {(shadowRoot: ShadowRoot, additionalSheets?: CSSStyleSheet[]) => Promise<void>} adoptPrimitives - Adopt primitives layer into a ShadowRoot. Designed as a convenience for components.
 * @property {(css:string) => CSSStyleSheet} createStylesheet - Create a constructable stylesheet from CSS text. @throws {DOMException} on invalid CSS in some browsers.
 * @property {() => boolean} isLiveMode - Returns true when running in live/designer-backed mode
 * @property {() => Promise<typeof import("./pds-core/pds-generator.js").Generator>} getGenerator - Live-only accessor for the Generator class
 * @property {(level: 'log'|'warn'|'error'|'debug'|'info', message?: any, ...data: any[]) => void} log - Unified logging entry point used by PDS internals and consumers
 */
import { PDS } from "./pds-singleton.js";

// State properties
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

import {
  adoptLayers,
  adoptPrimitives,
  createStylesheet,
} from "./pds-core/pds-runtime.js";
import { registry } from "./pds-core/pds-registry.js";
import { enums } from "./pds-core/pds-enums.js";
import * as common from "./common/common.js";
import { resolvePublicAssetURL } from "./pds-core/pds-paths.js";
import {
  ensureAbsoluteAssetURL,
  ensureTrailingSlash,
  attachFoucListener,
  resolveRuntimeAssetRoot,
  resolveThemeAndApply,
  setupAutoDefinerAndEnhancers,
} from "./pds-core/pds-start-helpers.js";
import {
  isPresetThemeCompatible,
  resolveThemePreference,
} from "./pds-core/pds-theme-utils.js";
import { configurePDSLogger, pdsLog } from "./common/pds-log.js";

let __autoCompletePromise = null;
let __askPromise = null;
let __toastPromise = null;
let __defaultEnhancersPromise = null;
let __localizationPromise = null;
let __localizationRuntime = null;

const __LOCALIZATION_RUNTIME_SINGLETON_KEY__ = "__pdsLocalizationRuntime";

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
  getLogger: () => (typeof PDS.logHandler === "function" ? PDS.logHandler : null),
  getContext: () => {
    const mode =
      PDS?.mode ||
      PDS?.compiled?.mode ||
      (PDS?.registry?.isLive ? "live" : "static");
    const debug =
      (PDS?.debug ||
        PDS?.currentConfig?.debug ||
        PDS?.currentConfig?.design?.debug ||
        PDS?.compiled?.debug ||
        PDS?.compiled?.design?.debug ||
        false) === true;
    return {
      mode,
      debug,
      thisArg: PDS,
    };
  },
});

PDS.log = (level = "log", message, ...data) => {
  pdsLog(level, message, ...data);
};

const __fallbackLocalizationState = {
  locale: "en",
  messages: {},
  hasProvider: false,
};
const __pendingLocalizationKeys = new Set();

function __isStrTagged(template) {
  return (
    Boolean(template) &&
    typeof template !== "string" &&
    typeof template === "object" &&
    "strTag" in template
  );
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
  return String(input).replace(/\{(\d+)\}/g, (_match, index) =>
    callback(Number(index))
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
    raw: Array.from(strings?.raw || []),
  };
}

function __fallbackMsg(template) {
  if (!template) {
    return "";
  }

  if (__isStrTagged(template)) {
    const key = __collateStrings(template.strings || []);
    const translated = __fallbackLocalizationState.messages[key] || key;
    return __replacePlaceholders(translated, (index) => template.values?.[index]);
  }

  const key = String(template);
  return __fallbackLocalizationState.messages[key] || key;
}

function __queuePendingLocalizationKey(template) {
  if (!template) {
    return;
  }

  const key = __isStrTagged(template)
    ? __collateStrings(template.strings || [])
    : String(template);

  if (typeof key === "string" && key.length > 0) {
    __pendingLocalizationKeys.add(key);
  }
}

function __flushPendingLocalizationKeys(runtime) {
  if (
    !runtime ||
    typeof runtime.msg !== "function" ||
    __pendingLocalizationKeys.size === 0
  ) {
    return;
  }

  const pendingKeys = Array.from(__pendingLocalizationKeys);
  __pendingLocalizationKeys.clear();

  for (const key of pendingKeys) {
    try {
      runtime.msg(key);
    } catch {}
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

    __localizationPromise = import(localizationModuleURL)
      .then((mod) => {
        if (
          typeof mod?.msg !== "function" ||
          typeof mod?.str !== "function" ||
          typeof mod?.configureLocalization !== "function" ||
          typeof mod?.loadLocale !== "function" ||
          typeof mod?.setLocale !== "function" ||
          typeof mod?.getLocalizationState !== "function"
        ) {
          throw new Error("Failed to load localization runtime exports");
        }

        __setLocalizationRuntime(mod);
        __flushPendingLocalizationKeys(mod);
        return mod;
      })
      .catch((error) => {
        __localizationPromise = null;
        throw error;
      });
  }

  return __localizationPromise;
}

const msg = (template, options = {}) => {
  const runtime = __getLocalizationRuntimeSync();
  if (typeof runtime?.msg === "function") {
    return runtime.msg(template, options);
  }
  __queuePendingLocalizationKey(template);
  return __fallbackMsg(template, options);
};

const str = (strings, ...values) => {
  const runtime = __getLocalizationRuntimeSync();
  if (typeof runtime?.str === "function") {
    return runtime.str(strings, ...values);
  }
  return __fallbackStr(strings, ...values);
};

const configureLocalization = (config = null) => {
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
      hasProvider: __fallbackLocalizationState.hasProvider,
    };
  }

  if (typeof config.locale === "string" && config.locale.trim()) {
    __fallbackLocalizationState.locale = config.locale.trim();
  }

  if (Object.prototype.hasOwnProperty.call(config, "messages")) {
    __fallbackLocalizationState.messages = __normalizeMessages(config.messages);
  }

  const hasProvider = Boolean(
    config.provider ||
      config.translate ||
      config.loadLocale ||
      config.setLocale
  );
  __fallbackLocalizationState.hasProvider = hasProvider;

  if (hasProvider) {
    __loadLocalizationRuntime()
      .then((runtime) => {
        runtime.configureLocalization(config);
        __flushPendingLocalizationKeys(runtime);
      })
      .catch(() => {});
  }

  return {
    locale: __fallbackLocalizationState.locale,
    messages: { ...__fallbackLocalizationState.messages },
    hasProvider: __fallbackLocalizationState.hasProvider,
  };
};

const loadLocale = async (locale) => {
  const runtime = await __loadLocalizationRuntime();
  return runtime.loadLocale(locale);
};

const setLocale = async (locale, options = {}) => {
  const runtime = await __loadLocalizationRuntime();
  return runtime.setLocale(locale, options);
};

const getLocalizationState = () => {
  const runtime = __getLocalizationRuntimeSync();
  if (typeof runtime?.getLocalizationState === "function") {
    return runtime.getLocalizationState();
  }
  return {
    locale: __fallbackLocalizationState.locale,
    messages: { ...__fallbackLocalizationState.messages },
    hasProvider: __fallbackLocalizationState.hasProvider,
  };
};

const createJSONLocalization = (options = {}) => {
  const runtime = __getLocalizationRuntimeSync();
  if (typeof runtime?.createJSONLocalization === "function") {
    return runtime.createJSONLocalization(options);
  }

  const defaultLocale =
    typeof options?.locale === "string" && options.locale.trim()
      ? options.locale.trim().toLowerCase()
      : "en";

  const configuredLocales = Array.isArray(options?.locales)
    ? options.locales
        .map((locale) => String(locale || "").trim().toLowerCase())
        .filter(Boolean)
    : [];

  const locales = Array.from(new Set([defaultLocale, ...configuredLocales]));

  let __jsonLocalizationConfigPromise = null;
  const __resolveJSONLocalizationConfig = async () => {
    if (!__jsonLocalizationConfigPromise) {
      __jsonLocalizationConfigPromise = __loadLocalizationRuntime()
        .then((runtime) => {
          if (typeof runtime?.createJSONLocalization === "function") {
            return runtime.createJSONLocalization(options);
          }
          return null;
        })
        .catch(() => null);
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
      },
    },
  };
};

function __resolveExternalRuntimeModuleURL(filename, overrideURL) {
  if (overrideURL && typeof overrideURL === "string") {
    return overrideURL;
  }
  const assetRootURL = resolveRuntimeAssetRoot(PDS.currentConfig || {}, {
    resolvePublicAssetURL,
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
    __defaultEnhancersPromise = import(enhancersModuleURL)
      .then((mod) => {
        const enhancers = Array.isArray(mod?.defaultPDSEnhancers)
          ? mod.defaultPDSEnhancers
          : [];
        PDS.defaultEnhancers = enhancers;
        return enhancers;
      })
      .catch((error) => {
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
    __askPromise = import(askModuleURL)
      .then((mod) => {
        const impl = mod?.ask;
        if (typeof impl !== "function") {
          throw new Error("Failed to load ask helper");
        }
        PDS.ask = impl;
        return impl;
      })
      .catch((error) => {
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
    __toastPromise = import(toastModuleURL)
      .then((mod) => {
        const impl = mod?.toast;
        if (typeof impl !== "function") {
          throw new Error("Failed to load toast helper");
        }
        PDS.toast = impl;
        return impl;
      })
      .catch((error) => {
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

const __defaultLog = function (level = "log", message, ...data) {
  PDS.log(level, message, ...data);
};

function __stripFunctionsForClone(value) {
  if (value === null || value === undefined) return value;
  if (typeof value === "function") return undefined;
  if (typeof value !== "object") return value;

  if (Array.isArray(value)) {
    return value
      .map((item) => __stripFunctionsForClone(item))
      .filter((item) => item !== undefined);
  }

  const result = {};
  for (const [key, entry] of Object.entries(value)) {
    const stripped = __stripFunctionsForClone(entry);
    if (stripped !== undefined) {
      result[key] = stripped;
    }
  }
  return result;
}

function __deepFreeze(value, seen = new WeakSet()) {
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
  if (value === null || value === undefined) {
    return value;
  }
  if (typeof value !== "object") {
    return value;
  }
  return __deepFreeze(structuredClone(__stripFunctionsForClone(value)));
}

async function __loadRuntimeConfig(assetRootURL, config = {}) {
  if (config?.runtimeConfig === false) return null;
  if (typeof fetch !== "function") return null;
  const runtimeUrl =
    config?.runtimeConfigURL || `${assetRootURL}pds-runtime-config.json`;
  try {
    const res = await fetch(runtimeUrl, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

/** Singleton runtime registry. Use `registry.setLiveMode()` to enable live mode or `registry.setStaticMode()` for static assets */
PDS.registry = registry;

/** Expose enums in static and live modes */
PDS.enums = enums;

/** Adopt a set of layered stylesheets into a ShadowRoot */
PDS.adoptLayers = adoptLayers;

/** Convenience to adopt only primitives into a ShadowRoot */
PDS.adoptPrimitives = adoptPrimitives;

/** Parse an HTML string into a NodeList */
PDS.parse = common.parseHTML;

/** Create a constructable CSSStyleSheet from a CSS string */
PDS.createStylesheet = createStylesheet;

/** Return true when running inside a live/designer-backed environment */
PDS.isLiveMode = () => registry.isLive;
PDS.ask = __lazyAsk;
PDS.toast = __lazyToast;
PDS.common = common;
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
  createJSONLocalization,
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
    __autoCompletePromise = import(/* @vite-ignore */ autoCompleteModuleURL)
      .then((mod) => {
        const autoCompleteCtor =
          mod?.AutoComplete ||
          mod?.default?.AutoComplete ||
          mod?.default ||
          null;
        if (!autoCompleteCtor) {
          throw new Error("AutoComplete export not found in module");
        }
        PDS.AutoComplete = autoCompleteCtor;
        return autoCompleteCtor;
      })
      .catch((error) => {
        __autoCompletePromise = null;
        throw error;
      });
  }
  return __autoCompletePromise;
};

function __emitPDSReady(detail) {
  const hasCustomEvent = typeof CustomEvent === "function";

  try {
    const readyEvent = hasCustomEvent
      ? new CustomEvent("pds:ready", { detail })
      : new Event("pds:ready");
    PDS.dispatchEvent(readyEvent);
  } catch (e) {}

  if (typeof document !== "undefined") {
    if (hasCustomEvent) {
      const eventOptions = { detail, bubbles: true, composed: true };
      try {
        document.dispatchEvent(new CustomEvent("pds:ready", eventOptions));
      } catch (e) {}
      try {
        document.dispatchEvent(new CustomEvent("pds-ready", eventOptions));
      } catch (e) {}
    } else {
      try {
        document.dispatchEvent(new Event("pds:ready"));
      } catch (e) {}
      try {
        document.dispatchEvent(new Event("pds-ready"));
      } catch (e) {}
    }
  }
}

function __emitPDSConfigChanged(detail = {}) {
  const hasCustomEvent = typeof CustomEvent === "function";
  const payload = {
    at: Date.now(),
    ...detail,
  };

  try {
    const changedEvent = hasCustomEvent
      ? new CustomEvent("pds:config-changed", { detail: payload })
      : new Event("pds:config-changed");
    PDS.dispatchEvent(changedEvent);
  } catch (e) {}

  if (typeof document !== "undefined") {
    if (hasCustomEvent) {
      const eventOptions = { detail: payload, bubbles: true, composed: true };
      try {
        document.dispatchEvent(
          new CustomEvent("pds:config-changed", eventOptions)
        );
      } catch (e) {}
    } else {
      try {
        document.dispatchEvent(new Event("pds:config-changed"));
      } catch (e) {}
    }
  }
}

// ---------------------------------------------------------------------------
// Theme management (centralized on PDS.theme)
// Consumers may read/write `PDS.theme` with values: 'system' | 'light' | 'dark'
// Setting the property persists to localStorage (when available), updates
// document.documentElement[data-theme] to an explicit 'light'|'dark' value
// and emits a `pds:theme:changed` event. Reading the property returns the
// raw stored preference (or null if none).

// Private module-level variables for theme management
const __themeStorageKey = "pure-ds-theme";
let __themeMQ = null;
let __themeMQListener = null;

// Private: Apply resolved theme to document
function __applyResolvedTheme(raw) {
  try {
    if (typeof document === "undefined") return;
    let resolved = "light";
    if (!raw) {
      // No stored preference: use OS preference
      const prefersDark =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      resolved = prefersDark ? "dark" : "light";
    } else if (raw === "system") {
      const prefersDark =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      resolved = prefersDark ? "dark" : "light";
    } else {
      resolved = raw;
    }
    document.documentElement.setAttribute("data-theme", resolved);
  } catch (e) {}
}

// Private: Setup system theme change listener when needed
function __setupSystemListenerIfNeeded(raw) {
  try {
    // Remove any existing listener first
    if (__themeMQ && __themeMQListener) {
      try {
        if (typeof __themeMQ.removeEventListener === "function")
          __themeMQ.removeEventListener("change", __themeMQListener);
        else if (typeof __themeMQ.removeListener === "function")
          __themeMQ.removeListener(__themeMQListener);
      } catch (e) {}
      __themeMQ = null;
      __themeMQListener = null;
    }

    if (
      raw === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia
    ) {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const listener = (e) => {
        const isDark = e?.matches === undefined ? mq.matches : e.matches;
        try {
          const newTheme = isDark ? "dark" : "light";
          document.documentElement.setAttribute("data-theme", newTheme);
          PDS.dispatchEvent(
            new CustomEvent("pds:theme:changed", {
              detail: { theme: newTheme, source: "system" },
            })
          );
        } catch (ex) {}
      };
      __themeMQ = mq;
      __themeMQListener = listener;
      if (typeof mq.addEventListener === "function")
        mq.addEventListener("change", listener);
      else if (typeof mq.addListener === "function") mq.addListener(listener);
    }
  } catch (e) {}
}

const __themeDescriptor = Object.getOwnPropertyDescriptor(PDS, "theme");
if (!__themeDescriptor) {
  Object.defineProperty(PDS, "theme", {
    get() {
      try {
        if (typeof window === "undefined") return null;
        return localStorage.getItem(__themeStorageKey) || null;
      } catch (e) {
        return null;
      }
    },
    set(value) {
      try {
        if (typeof window === "undefined") return;
        const currentPreset = PDS.currentConfig?.design || null;
        const resolvedTheme = resolveThemePreference(value);
        if (currentPreset && !isPresetThemeCompatible(currentPreset, resolvedTheme)) {
          const presetName =
            currentPreset?.name ||
            PDS.currentPreset?.name ||
            PDS.currentConfig?.preset ||
            "current preset";
          PDS.log(
            "warn",
            `PDS theme "${resolvedTheme}" not supported by preset "${presetName}".`
          );
          PDS.dispatchEvent(
            new CustomEvent("pds:theme:blocked", {
              detail: { theme: value, resolvedTheme, preset: presetName },
            })
          );
          return;
        }
        if (value === null || value === undefined) {
          localStorage.removeItem(__themeStorageKey);
        } else {
          localStorage.setItem(__themeStorageKey, value);
        }

        // Apply resolved (light/dark) value to document
        __applyResolvedTheme(value);
        // Setup system change listener only when 'system' is selected
        __setupSystemListenerIfNeeded(value);

        // Emit a notification with the raw preference (value may be 'system')
        PDS.dispatchEvent(
          new CustomEvent("pds:theme:changed", {
            detail: { theme: value, source: "api" },
          })
        );
      } catch (e) {}
    },
  });
}

// ----------------------------------------------------------------------------
// Default Enhancers — first-class citizens alongside AutoDefiner
// ----------------------------------------------------------------------------
/**
 * Default DOM enhancers shipped with PDS. These are lightweight progressive
 * enhancements that can be applied to vanilla markup. Consumers can override
 * or add to these via the `enhancers` option of PDS.start({ mode }).
 */
PDS.defaultEnhancers = [];

/**
 * Initialize PDS in live mode with the given configuration (new unified shape).
 * Typically invoked via PDS.start({ mode: 'live', ... }).
 *
 * Shape:
 * PDS.start({
 *   mode: 'live',
 *   preset?: string,
 *   design?: object,
 *   autoDefine?: {
 *     baseURL?: string,
 *     predefine?: string[],
 *     mapper?: (tag:string)=>string|undefined|null, // return undefined/null/false to let PDS default mapper handle it
 *     // plus any AutoDefiner flags: scanExisting, observeShadows, patchAttachShadow, debounceMs, onError
 *   },
 *   // runtime flags (optional)
 *   applyGlobalStyles?: boolean,
 *   manageTheme?: boolean,
 *   themeStorageKey?: string,
 *   preloadStyles?: boolean,
 *   criticalLayers?: string[]
 * })
 *
 * @param {object} config - The PDS configuration object (unified shape)
 * @returns {Promise<{generator: Generator, config: object, theme: string, autoDefiner?: any}>}
 *
 * @example
 * await PDS.start({ mode: 'live',
 *   preset: 'paper-and-ink',
 *   design: { colors: { accent: '#FF4081' } },
 *   autoDefine: { predefine: ['pds-icon'] }
 * });
 */

/**
 * Start PDS given a unified configuration and an explicit mode.
 *
 * @param {object} config - Unified configuration
 * @param {('live'|'static')} [config.mode='live'] - Runtime mode selector
 * @returns {Promise<any>} Live returns { generator, config, theme, autoDefiner }; Static returns { config, theme, autoDefiner }
 */
async function start(config) {
  PDS.initializing = true;
  try {
    const mode = (config && config.mode) || "live";
    const { mode: _omit, ...rest } = config || {};

    PDS.mode = mode;
    PDS.logHandler = typeof rest?.log === "function" ? rest.log : null;

    PDS.currentConfig = __toReadonlyClone(rest);

    const localizationConfig =
      rest && typeof rest.localization === "object" && rest.localization
        ? rest.localization
        : null;

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
      const managerUrl =
        managerConfig?.managerURL ||
        managerConfig?.public?.managerURL ||
        managerConfig?.manager?.url ||
        new URL("core/pds-manager.js", assetRootURL).href ||
        new URL("./pds-manager.js", import.meta.url).href;
      const { startLive } = await import(/* @vite-ignore */ managerUrl);
      startResult = await startLive(PDS, managerConfig, {
        emitReady: __emitPDSReady,
        emitConfigChanged: __emitPDSConfigChanged,
        applyResolvedTheme: __applyResolvedTheme,
        setupSystemListenerIfNeeded: __setupSystemListenerIfNeeded,
      });
    }

    PDS.compiled = __toReadonlyClone(startResult?.config || null);

    const resolvedExternalIconPath =
      PDS?.compiled?.design?.icons?.externalPath || "/assets/img/icons/";

    PDS.log("info", `startup ready; external icon path: ${resolvedExternalIconPath}`);

    return startResult;
  } finally {
    PDS.initializing = false;
  }
}

/** Primary unified entry point */
PDS.start = start;

/**
 * Initialize PDS in static mode with the same unified configuration shape as live mode.
 *
 * Shape:
 * PDS.start({
 *   mode: 'static',
 *   preset?: string,
 *   design?: object,
 *   autoDefine?: {
 *     baseURL?: string,
 *     predefine?: string[],
 *     mapper?: (tag:string)=>string,
 *     // plus any AutoDefiner flags
 *   },
 *   // static/runtime flags (optional)
 *   applyGlobalStyles?: boolean,
 *   manageTheme?: boolean,
 *   themeStorageKey?: string,
 *   staticPaths?: Record<string,string>
 * })
 */
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
  const cfgAuto = (config && config.autoDefine) || null;
  let autoDefineBaseURL;
  if (cfgAuto && cfgAuto.baseURL) {
    autoDefineBaseURL = ensureTrailingSlash(
      ensureAbsoluteAssetURL(cfgAuto.baseURL, { preferModule: false })
    );
  } else {
    autoDefineBaseURL = `${assetRootURL}components/`;
  }
  const autoDefinePreload =
    (cfgAuto && Array.isArray(cfgAuto.predefine) && cfgAuto.predefine) || [];
  const autoDefineMapper =
    (cfgAuto && typeof cfgAuto.mapper === "function" && cfgAuto.mapper) || null;

  try {
    attachFoucListener(PDS);
    // 1) Theme
    const { resolvedTheme } = resolveThemeAndApply({
      manageTheme,
      themeStorageKey,
      applyResolvedTheme: __applyResolvedTheme,
      setupSystemListenerIfNeeded: __setupSystemListenerIfNeeded,
    });

    // Load runtime config for static assets; config metadata remains live-mode only
    const runtimeConfig = await __loadRuntimeConfig(assetRootURL, config);
    const userEnhancers = Array.isArray(config?.enhancers)
      ? config.enhancers
      : config?.enhancers && typeof config.enhancers === "object"
        ? Object.values(config.enhancers)
        : [];
    const resolvedConfig = runtimeConfig?.config
      ? {
          ...runtimeConfig.config,
          ...config,
          design: config?.design || runtimeConfig.config.design,
          preset: config?.preset || runtimeConfig.config.preset,
        }
      : { ...config };
    

    // 2) Derive static asset URLs from the normalized public root
    const baseStaticPaths = {
      tokens: `${assetRootURL}styles/pds-tokens.css.js`,
      primitives: `${assetRootURL}styles/pds-primitives.css.js`,
      components: `${assetRootURL}styles/pds-components.css.js`,
      utilities: `${assetRootURL}styles/pds-utilities.css.js`,
      styles: `${assetRootURL}styles/pds-styles.css.js`,
    };
    const runtimePaths = runtimeConfig?.paths || {};
    staticPaths = { ...baseStaticPaths, ...runtimePaths, ...staticPaths };

    // 3) Static mode registry
    PDS.registry.setStaticMode(staticPaths);

    // 4) Apply global static styles if requested
    if (applyGlobalStyles && typeof document !== "undefined") {
      try {
        // Always adopt from exported css.js modules so static mode loads from JS exports
        const stylesSheet = await PDS.registry.getStylesheet("styles");
        if (stylesSheet) {
          // Tag and adopt alongside existing non-PDS sheets
          stylesSheet._pds = true;
          const others = (document.adoptedStyleSheets || []).filter(
            (s) => s._pds !== true
          );
          document.adoptedStyleSheets = [...others, stylesSheet];
          __emitPDSConfigChanged({
            mode: "static",
            source: "static:styles-applied",
          });
        }
      } catch (e) {
        __defaultLog.call(PDS, "warn", "Failed to apply static styles:", e);
      }
    }

    // 5) AutoDefiner + Enhancers
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
        autoDefinePreferModule: !(cfgAuto && cfgAuto.baseURL),
      }, { baseEnhancers: defaultPDSEnhancers });
      autoDefiner = res.autoDefiner;
      mergedEnhancers = res.mergedEnhancers || [];
    } catch (error) {
      __defaultLog.call(
        PDS,
        "error",
        "❌ Failed to initialize AutoDefiner/Enhancers (static):",
        error
      );
    }

    PDS.compiled = __toReadonlyClone({
      mode: "static",
      ...resolvedConfig,
      theme: resolvedTheme,
      enhancers: mergedEnhancers,
    });

    // 6) Emit ready event (unified)
    __emitPDSReady({
      mode: "static",
      config: resolvedConfig,
      theme: resolvedTheme,
      autoDefiner,
    });
    return {
      config: resolvedConfig,
      theme: resolvedTheme,
      autoDefiner,
    };
  } catch (error) {
    PDS.dispatchEvent(new CustomEvent("pds:error", { detail: { error } }));
    throw error;
  }
}

// Note: PDS.static is not exported. Use PDS.start({ mode: 'static', ... }).

// Note: PDS object is not frozen to allow runtime properties like currentConfig
// to be set during initialization. The config object itself is frozen for immutability.

export const applyResolvedTheme = __applyResolvedTheme;
export const setupSystemListenerIfNeeded = __setupSystemListenerIfNeeded;
export {
  PDS,
  msg,
  str,
  configureLocalization,
  loadLocale,
  setLocale,
  getLocalizationState,
  createJSONLocalization,
};
