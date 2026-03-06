// @ts-check

/** @typedef {import("./src/js/pds-core/pds-config").PDSInitConfig} PDSInitConfig */

const DEFAULT_LOCALE = "en";
const SUPPORTED_LOCALES = ["en", "nl"];

const i18nRows = {
  "Why develop a Design System when you can generate one?": {
    nl: "Waarom een Design System ontwikkelen als je er één kunt genereren?",
  },
};

function getLocaleOrDefault(locale) {
  return SUPPORTED_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;
}

function buildMessagesForLocale(locale) {
  const effectiveLocale = getLocaleOrDefault(locale);

  return Object.fromEntries(
    Object.entries(i18nRows).map(([english, translations]) => {
      return [english, translations?.[effectiveLocale] || english];
    })
  );
}

/** @type {PDSInitConfig} */
export const config = {
  mode: "live",
  liveEdit: true,
  preset: "default",
  localization: {
    locale: "en",
    provider: {
      loadLocale({ locale }) {
        return buildMessagesForLocale(locale);
      },
    },
  },
  autoDefine: {
    predefine: ["pds-icon", "pds-drawer", "pds-toaster"]
  },

  log(level, message, ...data) {
    console[level](message, ...data);
  },
};
