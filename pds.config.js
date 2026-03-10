// @ts-check
/** @typedef {import("./src/js/pds-core/pds-config").PDSInitConfig} PDSInitConfig */
/** @typedef {import("./src/js/pds-singleton.js").PDSBase} PDSBase */
import { PDS } from "./src/js/pds.js";

const localization = PDS.createJSONLocalization({
  locale: "en-US",
  locales: ["en-US", "nl-NL"],
  aliases: {
    en: ["en-US"],
    nl: ["nl-NL"],
  },
  basePath: "/assets/locales",
});

/** @type {PDSInitConfig} */
export const config = {
  mode: "live",
  liveEdit: true,
  preset: "default",
  localization,
  autoDefine: {
    predefine: ["pds-icon", "pds-drawer", "pds-toaster"]
  },

  /** @this {PDSBase} */
  log(level, message, ...data) {
    const mode = this?.mode || this?.compiled?.mode || "live";
    if (mode !== "static") {
      const method = typeof console[level] === "function" ? console[level] : console.log;
      method(`[PDS] ${message}`, ...data);
    }
  },
};
