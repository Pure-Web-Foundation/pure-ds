const __SUPPORTED_LOG_LEVELS = new Set(["log", "warn", "error", "debug", "info"]);
const __PDS_SINGLETON_KEY = "__PURE_DS_PDS_SINGLETON__";

let __logProvider = null;
let __contextProvider = null;

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
    thisArg: context.thisArg,
  };
}

function __normalizeLevel(level) {
  if (typeof level !== "string") return "log";
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
    } catch (error) {}
  }

  const globalPDS = __resolveGlobalPDS();
  if (globalPDS) {
    const mode =
      globalPDS?.mode ||
      globalPDS?.compiled?.mode ||
      (globalPDS?.registry?.isLive ? "live" : "static");
    const debug =
      (globalPDS?.debug ||
        globalPDS?.currentConfig?.debug ||
        globalPDS?.currentConfig?.design?.debug ||
        globalPDS?.compiled?.debug ||
        globalPDS?.compiled?.design?.debug ||
        false) === true;
    return {
      mode,
      debug,
      thisArg: globalPDS,
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
    } catch (error) {}
  }

  const globalPDS = __resolveGlobalPDS();
  if (typeof globalPDS?.logHandler === "function") {
    return globalPDS.logHandler;
  }

  return null;
}

function __consoleLog(level, message, ...data) {
  if (typeof console === "undefined") return;
  const method =
    typeof console[level] === "function"
      ? console[level].bind(console)
      : typeof console.log === "function"
        ? console.log.bind(console)
        : null;
  if (!method) return;

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

export function configurePDSLogger({ getLogger, getContext } = {}) {
  __logProvider = typeof getLogger === "function" ? getLogger : null;
  __contextProvider = typeof getContext === "function" ? getContext : null;
}

export function pdsLog(level = "log", message, ...data) {
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
