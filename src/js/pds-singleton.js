export class PDSBase extends EventTarget {
  constructor() {
    super();
    /** @type {'live' | 'static' | null} */
    this.mode = null;
    /** @type {Record<string, any> | null} */
    this.compiled = null;
    /** @type {(level: 'log' | 'warn' | 'error' | 'debug' | 'info', message?: any, ...data: any[]) => void} */
    this.log = () => {};
    /** @type {((level: 'log' | 'warn' | 'error' | 'debug' | 'info', message?: any, ...data: any[]) => void) | null} */
    this.logHandler = null;
  }
}

export const PDS_SINGLETON_KEY = "__PURE_DS_PDS_SINGLETON__";

const globalScope = typeof globalThis !== "undefined" ? globalThis : window;
const existingPDS = globalScope?.[PDS_SINGLETON_KEY];

export const PDS =
  existingPDS && typeof existingPDS.addEventListener === "function"
    ? existingPDS
    : new PDSBase();

if (globalScope) {
  globalScope[PDS_SINGLETON_KEY] = PDS;
}

if (typeof PDS.log !== "function") {
  PDS.log = (level = "log", message, ...data) => {
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
  };
}

if (typeof PDS.logHandler !== "function") {
  PDS.logHandler = null;
}
