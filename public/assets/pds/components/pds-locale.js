import { PDS, msg } from "#pds";

/**
 * `<pds-locale>` renders a locale switcher backed by configured/runtime
 * localization locales and keeps its checked state synced with `<html lang>`.
 *
 * @element pds-locale
 */
const LAYERS = ["tokens", "primitives", "components", "utilities"];

let startupLocalizationLocales = null;
let startupLocalizationLocalesPromise = null;

const LOCALE_PROBE_CANDIDATES = [
  "en", "nl", "de", "fr", "es", "it", "pt", "sv", "no", "da", "fi",
  "pl", "cs", "sk", "sl", "hu", "ro", "bg", "hr", "sr", "ru", "uk",
  "tr", "el", "he", "ar", "fa", "hi", "ja", "ko", "zh", "zh-cn", "zh-tw",
];

function normalizeLocaleTag(locale) {
  return String(locale || "").trim().toLowerCase();
}

function toCanonicalLocaleTag(locale) {
  const normalized = normalizeLocaleTag(locale);
  if (!normalized) return "";

  if (typeof Intl !== "undefined" && typeof Intl.getCanonicalLocales === "function") {
    try {
      const [canonical] = Intl.getCanonicalLocales(normalized);
      if (canonical) {
        return canonical;
      }
    } catch (error) {}
  }

  return normalized;
}

function isFiveLetterLocaleTag(locale) {
  return /^[a-z]{2}-[A-Z]{2}$/.test(String(locale || ""));
}

function collectKnownFiveLetterLocales() {
  const known = new Set();

  const add = (value) => {
    const canonical = toCanonicalLocaleTag(value);
    if (isFiveLetterLocaleTag(canonical)) {
      known.add(canonical);
    }
  };

  const configLocalization =
    PDS?.currentConfig?.localization && typeof PDS.currentConfig.localization === "object"
      ? PDS.currentConfig.localization
      : null;

  (configLocalization?.locales || []).forEach(add);
  (configLocalization?.provider?.locales || []).forEach(add);

  const runtimeState =
    typeof PDS?.getLocalizationState === "function"
      ? PDS.getLocalizationState()
      : null;
  (runtimeState?.loadedLocales || []).forEach(add);

  return Array.from(known);
}

function resolveFiveLetterLocaleTag(locale, knownLocales = []) {
  const canonical = toCanonicalLocaleTag(locale);
  if (isFiveLetterLocaleTag(canonical)) {
    return canonical;
  }

  const base = toBaseLocale(canonical);
  if (!base) return "";

  const mapped = knownLocales.find((candidate) => toBaseLocale(candidate) === base);
  return mapped || "";
}

function toBaseLocale(locale) {
  const normalized = normalizeLocaleTag(locale);
  if (!normalized) return "";
  return normalized.split("-")[0] || normalized;
}

function isLocalizationActive() {
  const configLocalization =
    PDS?.currentConfig?.localization && typeof PDS.currentConfig.localization === "object"
      ? PDS.currentConfig.localization
      : null;

  const runtimeState =
    typeof PDS?.getLocalizationState === "function"
      ? PDS.getLocalizationState()
      : null;

  const hasRuntimeProvider = Boolean(runtimeState?.hasProvider);

  const hasConfigProvider = Boolean(
    configLocalization?.provider ||
      typeof configLocalization?.translate === "function" ||
      typeof configLocalization?.loadLocale === "function" ||
      typeof configLocalization?.setLocale === "function"
  );

  const hasConfigMessages = Boolean(
    configLocalization?.messages &&
      typeof configLocalization.messages === "object" &&
      Object.keys(configLocalization.messages).length > 0
  );

  const hasRuntimeMessages = Boolean(
    runtimeState?.messages &&
      typeof runtimeState.messages === "object" &&
      Object.keys(runtimeState.messages).length > 0
  );

  return hasRuntimeProvider || hasConfigProvider || hasConfigMessages || hasRuntimeMessages;
}

function isLocaleBundle(bundle) {
  if (!bundle || typeof bundle !== "object" || Array.isArray(bundle)) {
    return false;
  }

  return Object.values(bundle).some((value) => {
    if (typeof value === "string") return true;
    return Boolean(value && typeof value === "object" && typeof value.content === "string");
  });
}

function normalizeMessageBundle(bundle) {
  if (!bundle || typeof bundle !== "object" || Array.isArray(bundle)) {
    return {};
  }

  const normalized = {};
  Object.entries(bundle).forEach(([key, value]) => {
    if (typeof value === "string") {
      normalized[key] = value;
      return;
    }

    if (value && typeof value === "object" && typeof value.content === "string") {
      normalized[key] = value.content;
    }
  });

  return normalized;
}

function getLocalizationProviderLoader(configLocalization) {
  if (!configLocalization || typeof configLocalization !== "object") return null;

  return (
    (typeof configLocalization?.loadLocale === "function"
      ? configLocalization.loadLocale
      : null) ||
    (typeof configLocalization?.provider?.loadLocale === "function"
      ? configLocalization.provider.loadLocale
      : null) ||
    (typeof configLocalization?.setLocale === "function"
      ? configLocalization.setLocale
      : null) ||
    (typeof configLocalization?.provider?.setLocale === "function"
      ? configLocalization.provider.setLocale
      : null)
  );
}

function buildLocaleProbeList({ defaultLocale, runtimeState, knownLocales }) {
  const candidates = new Set();

  const normalizedDefault = normalizeLocaleTag(defaultLocale);
  if (normalizedDefault) {
    candidates.add(normalizedDefault);
  }

  if (Array.isArray(runtimeState?.loadedLocales)) {
    runtimeState.loadedLocales.forEach((locale) => {
      const normalized = normalizeLocaleTag(locale);
      if (normalized) {
        candidates.add(normalized);
        candidates.add(toBaseLocale(normalized));
      }
    });
  }

  if (Array.isArray(knownLocales)) {
    knownLocales.forEach((locale) => {
      const normalized = normalizeLocaleTag(locale);
      if (normalized) {
        candidates.add(normalized);
        candidates.add(toBaseLocale(normalized));
      }
    });
  }

  if (typeof navigator !== "undefined" && Array.isArray(navigator.languages)) {
    navigator.languages.forEach((locale) => {
      const normalized = normalizeLocaleTag(locale);
      if (normalized) {
        candidates.add(normalized);
        candidates.add(toBaseLocale(normalized));
      }
    });
  }

  LOCALE_PROBE_CANDIDATES.forEach((locale) => {
    const normalized = normalizeLocaleTag(locale);
    if (normalized) {
      candidates.add(normalized);
      candidates.add(toBaseLocale(normalized));
    }
  });

  candidates.delete("");
  return Array.from(candidates).sort((a, b) => a.localeCompare(b));
}

function bundlesDifferFromOrigin(originBundle, candidateBundle) {
  const originEntries = normalizeMessageBundle(originBundle);
  const candidateEntries = normalizeMessageBundle(candidateBundle);

  const originKeys = Object.keys(originEntries);
  const candidateKeys = Object.keys(candidateEntries);
  if (!originKeys.length || !candidateKeys.length) {
    return false;
  }

  return originKeys.some((key) => {
    if (!Object.prototype.hasOwnProperty.call(candidateEntries, key)) return false;
    return String(candidateEntries[key]) !== String(originEntries[key]);
  });
}

function collectLocalesFromMessageRows(source, locales) {
  if (!source || typeof source !== "object" || Array.isArray(source)) return;

  Object.values(source).forEach((row) => {
    if (!row || typeof row !== "object" || Array.isArray(row)) return;
    if (typeof row.content === "string") return;

    Object.entries(row).forEach(([localeKey, translatedValue]) => {
      const normalized = normalizeLocaleTag(localeKey);
      if (!normalized) return;

      const hasValue =
        typeof translatedValue === "string" ||
        Boolean(
          translatedValue &&
            typeof translatedValue === "object" &&
            typeof translatedValue.content === "string"
        );

      if (hasValue) {
        locales.add(normalized);
      }
    });
  });
}

function collectLocalesFromLocaleBundles(source, locales) {
  if (!source || typeof source !== "object" || Array.isArray(source)) return;

  Object.entries(source).forEach(([localeKey, bundle]) => {
    const normalized = normalizeLocaleTag(localeKey);
    if (!normalized) return;
    if (!isLocaleBundle(bundle)) return;
    locales.add(normalized);
  });
}

function collectLocalesFromConfiguredList(source, locales) {
  if (!Array.isArray(source)) return;

  source.forEach((localeValue) => {
    const normalized = normalizeLocaleTag(localeValue);
    if (normalized) {
      locales.add(normalized);
    }
  });
}

async function detectStartupLocalizationLocales() {
  const locales = new Set();

  const configLocalization =
    PDS?.currentConfig?.localization && typeof PDS.currentConfig.localization === "object"
      ? PDS.currentConfig.localization
      : null;

  const defaultLocale = normalizeLocaleTag(configLocalization?.locale);
  if (defaultLocale) {
    locales.add(defaultLocale);
  }

  collectLocalesFromConfiguredList(configLocalization?.locales, locales);
  collectLocalesFromConfiguredList(configLocalization?.provider?.locales, locales);

  if (locales.size >= 2) {
    return Array.from(locales).sort((a, b) => a.localeCompare(b));
  }

  const runtimeState =
    typeof PDS?.getLocalizationState === "function"
      ? PDS.getLocalizationState()
      : null;
  const runtimeDefaultLocale = normalizeLocaleTag(runtimeState?.locale);
  if (runtimeDefaultLocale) {
    locales.add(runtimeDefaultLocale);
  }

  const messageSources = [
    configLocalization?.messages,
    configLocalization?.messagesByLocale,
    configLocalization?.i18n,
    configLocalization?.translations,
    configLocalization?.provider?.messages,
    configLocalization?.provider?.messagesByLocale,
    configLocalization?.provider?.i18n,
    configLocalization?.provider?.translations,
  ];

  messageSources.forEach((source) => {
    collectLocalesFromMessageRows(source, locales);
    collectLocalesFromLocaleBundles(source, locales);
  });

  const localeListFromRows = Array.from(locales).sort((a, b) => a.localeCompare(b));
  if (localeListFromRows.length >= 2) {
    return localeListFromRows;
  }

  const providerLoader = getLocalizationProviderLoader(configLocalization);
  const runtimeLoadLocale =
    typeof PDS?.loadLocale === "function" ? PDS.loadLocale.bind(PDS) : null;

  if (typeof providerLoader !== "function" && typeof runtimeLoadLocale !== "function") {
    return localeListFromRows;
  }

  const originLocale =
    normalizeLocaleTag(configLocalization?.locale) ||
    normalizeLocaleTag(runtimeState?.locale) ||
    "en";

  locales.add(originLocale);

  let originBundle = normalizeMessageBundle(runtimeState?.messages || configLocalization?.messages);
  if (!Object.keys(originBundle).length) {
    try {
      let loadedOrigin = null;

      if (typeof runtimeLoadLocale === "function") {
        loadedOrigin = await Promise.resolve(runtimeLoadLocale(originLocale));
      } else {
        loadedOrigin = await Promise.resolve(
          providerLoader({
            locale: originLocale,
            defaultLocale: originLocale,
            reason: "startup-locale-detect-origin",
            loadedLocales: Array.from(locales),
            messages: {},
            load: true,
          })
        );
      }

      originBundle = normalizeMessageBundle(loadedOrigin);
    } catch (error) {}
  }

  const probeLocales = buildLocaleProbeList({
    defaultLocale: originLocale,
    runtimeState,
    knownLocales: Array.from(locales),
  });

  for (const candidateLocale of probeLocales) {
    if (!candidateLocale || candidateLocale === originLocale) {
      continue;
    }

    try {
      let candidateBundle = null;

      if (typeof runtimeLoadLocale === "function") {
        candidateBundle = await Promise.resolve(runtimeLoadLocale(candidateLocale));
      } else {
        candidateBundle = await Promise.resolve(
          providerLoader({
            locale: candidateLocale,
            defaultLocale: originLocale,
            reason: "startup-locale-detect-probe",
            loadedLocales: Array.from(locales),
            messages: {},
            load: true,
          })
        );
      }

      if (bundlesDifferFromOrigin(originBundle, candidateBundle)) {
        locales.add(candidateLocale);
        if (locales.size >= 2) {
          break;
        }
      }
    } catch (error) {}
  }

  return Array.from(locales).sort((a, b) => a.localeCompare(b));
}

async function getStartupLocalizationLocales({ forceReload = false } = {}) {
  if (forceReload) {
    startupLocalizationLocales = null;
    startupLocalizationLocalesPromise = null;
  }

  if (Array.isArray(startupLocalizationLocales)) {
    return [...startupLocalizationLocales];
  }

  if (startupLocalizationLocalesPromise) {
    const inFlight = await startupLocalizationLocalesPromise;
    return [...inFlight];
  }

  startupLocalizationLocalesPromise = detectStartupLocalizationLocales()
    .then((locales) => {
      startupLocalizationLocales = Array.isArray(locales) ? locales : [];
      return startupLocalizationLocales;
    })
    .catch(() => {
      startupLocalizationLocales = [];
      return startupLocalizationLocales;
    })
    .finally(() => {
      startupLocalizationLocalesPromise = null;
    });

  const resolved = await startupLocalizationLocalesPromise;
  return [...resolved];
}

function localeOptionLabel(locale) {
  const canonical = toCanonicalLocaleTag(locale);
  const normalized = normalizeLocaleTag(canonical);
  if (!normalized) return "";

  try {
    // Use the locale's own language for its label (self-localized).
    const displayNames = new Intl.DisplayNames([canonical], {
      type: "language",
    });
    const named = displayNames.of(canonical);
    if (named && String(named).trim()) {
      return named;
    }
  } catch (error) {}

  return canonical || normalized;
}

function localeOptionAlias(locale) {
  const normalized = normalizeLocaleTag(locale);
  if (!normalized) return "";

  const base = toBaseLocale(normalized);
  if (!base) return normalized;
  return base.slice(0, 2);
}

function localeMatches(selectedLocale, activeLocale) {
  const selected = normalizeLocaleTag(selectedLocale);
  const active = normalizeLocaleTag(activeLocale);
  if (!selected || !active) return false;
  return selected === active || toBaseLocale(selected) === toBaseLocale(active);
}

/**
 * Payload for `pds:locale:changed`.
 *
 * @typedef {Object} PdsLocaleChangedDetail
 * @property {string} locale Canonical 5-letter locale tag (`xx-YY`).
 */

/**
 * Locale switcher component.
 *
 * The component only persists canonical 5-letter locale tags (`xx-YY`),
 * for example `en-US` and `nl-NL`.
 *
 * @element pds-locale
 * @formAssociated
 * @attr {string} [name] Form field name used during submit.
 * @attr {string} [value] Selected canonical locale tag (`xx-YY`).
 * @attr {boolean} [required] Requires a locale value for validity.
 * @attr {boolean} [disabled] Disables interaction and omits form value.
 * @attr {"compact"|"full"} [mode="compact"] Label display mode.
 * In `compact`, the UI shows 2-letter aliases and puts the full Intl language
 * name in the `title` attribute. In `full`, it renders the full Intl language
 * name as the visible label.
 * @attr {string} [data-label] Accessible label for the locale radio group.
 * @prop {string} name Form field name.
 * @prop {string} value Selected canonical locale tag (`xx-YY`).
 * @prop {boolean} required Whether a value is required.
 * @prop {boolean} disabled Whether interaction is disabled.
 * @prop {"compact"|"full"} mode Label display mode.
 * @prop {HTMLFormElement|null} form Associated form element.
 * @prop {NodeListOf<HTMLLabelElement>|null} labels Associated labels.
 * @prop {string} type Form control type.
 * @prop {ValidityState|null} validity Current validity state.
 * @prop {string} validationMessage Current validation message.
 * @prop {boolean} willValidate Whether the control participates in validation.
 * @fires pds-locale:ready Emitted after locale availability is resolved.
 * @fires pds:locale:changed Emitted after a new locale is selected.
 * @fires input Native-like input event when user selection changes.
 * @fires change Native-like change event when user selection changes.
 */
class PdsLocale extends HTMLElement {

  static formAssociated = true;

  static get observedAttributes() {
    return ["name", "value", "required", "disabled", "mode", "data-label"];
  }

  #observer;
  #isReady = false;
  #resolveReady;
  #readyPromise;
  #available = false;
  #locales = [];
  #radioName = `pds-locale-${Math.random().toString(36).slice(2, 10)}`;
  #internals;
  #defaultValue = "";
  #capturedDefault = false;
  #syncingValueAttribute = false;
  #listening = false;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.#internals = this.attachInternals?.() ?? null;
    this.#readyPromise = new Promise((resolve) => {
      this.#resolveReady = resolve;
    });
  }

  connectedCallback() {
    if (!this.#capturedDefault) {
      this.#defaultValue = this.getAttribute("value") || "";
      this.#capturedDefault = true;
    }
    void this.#setup();
  }

  disconnectedCallback() {
    this.#teardownObserver();

    if (this.#listening) {
      this.shadowRoot.removeEventListener("change", this.#handleChange);
      this.#listening = false;
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    if (name === "value" && this.#syncingValueAttribute) {
      return;
    }

    if (name === "data-label") {
      const fieldset = this.shadowRoot.querySelector("fieldset[role='radiogroup']");
      if (fieldset) {
        fieldset.setAttribute("aria-label", this.getAttribute("data-label") || msg("Language"));
      }
    }

    if (name === "mode" && this.#available) {
      this.#renderOptions(this.#locales);
      this.#applyDisabledState();
      this.#syncCheckedState();
      this.#syncFormState();
      return;
    }

    if (name === "value" && this.#available) {
      this.#syncValueFromAttribute({ updateDocumentLang: true, emitEvents: false });
      return;
    }

    if (name === "disabled") {
      this.#applyDisabledState();
    }

    this.#syncFormState();
  }

  formAssociatedCallback() {}

  formDisabledCallback(disabled) {
    this.disabled = Boolean(disabled);
  }

  formResetCallback() {
    const candidateLocales = this.#locales.length
      ? this.#locales
      : collectKnownFiveLetterLocales();

    const resetLocale =
      resolveFiveLetterLocaleTag(this.#defaultValue, candidateLocales) ||
      candidateLocales[0] ||
      "";

    if (!resetLocale) {
      this.#setValueAttribute("");
      this.#syncCheckedState();
      this.#syncFormState();
      return;
    }

    this.#commitLocaleSelection(resetLocale, {
      emitEvents: false,
      updateDocumentLang: true,
      reflectAttribute: true,
    });
  }

  formStateRestoreCallback(state) {
    const candidateLocales = this.#locales.length
      ? this.#locales
      : collectKnownFiveLetterLocales();

    const restoredValue = typeof state === "string" ? state : "";
    const restoredLocale = resolveFiveLetterLocaleTag(restoredValue, candidateLocales);

    if (!restoredLocale) {
      this.#syncValueFromAttribute({ updateDocumentLang: true, emitEvents: false });
      return;
    }

    this.#commitLocaleSelection(restoredLocale, {
      emitEvents: false,
      updateDocumentLang: true,
      reflectAttribute: true,
    });
  }

  checkValidity() {
    this.#syncFormState();
    return this.#internals?.checkValidity() ?? true;
  }

  reportValidity() {
    this.#syncFormState();
    return this.#internals?.reportValidity() ?? true;
  }

  get form() {
    return this.#internals?.form ?? null;
  }

  get labels() {
    return this.#internals?.labels ?? null;
  }

  get type() {
    return "pds-locale";
  }

  get validity() {
    return this.#internals?.validity ?? null;
  }

  get validationMessage() {
    return this.#internals?.validationMessage ?? "";
  }

  get willValidate() {
    return this.#internals?.willValidate ?? false;
  }

  get name() {
    return this.getAttribute("name") || "";
  }

  set name(value) {
    if (value == null || value === "") {
      this.removeAttribute("name");
      return;
    }

    this.setAttribute("name", String(value));
  }

  get value() {
    const candidateLocales = this.#locales.length
      ? this.#locales
      : collectKnownFiveLetterLocales();

    return resolveFiveLetterLocaleTag(this.getAttribute("value"), candidateLocales) || "";
  }

  set value(value) {
    const candidateLocales = this.#locales.length
      ? this.#locales
      : collectKnownFiveLetterLocales();

    const canonicalValue = resolveFiveLetterLocaleTag(value, candidateLocales);
    if (!canonicalValue) {
      if (this.#available && this.#locales.length) {
        this.#syncValueFromAttribute({ updateDocumentLang: false, emitEvents: false });
        return;
      }

      this.#setValueAttribute("");
      this.#syncCheckedState();
      this.#syncFormState();
      return;
    }

    this.#setValueAttribute(canonicalValue);

    if (this.#available) {
      this.#commitLocaleSelection(canonicalValue, {
        emitEvents: false,
        updateDocumentLang: true,
        reflectAttribute: false,
      });
    }
  }

  get required() {
    return this.hasAttribute("required");
  }

  set required(value) {
    this.toggleAttribute("required", Boolean(value));
  }

  get disabled() {
    return this.hasAttribute("disabled");
  }

  set disabled(value) {
    this.toggleAttribute("disabled", Boolean(value));
  }

  get mode() {
    return this.#resolveMode(this.getAttribute("mode"));
  }

  set mode(value) {
    if (value == null || value === "") {
      this.removeAttribute("mode");
      return;
    }

    this.setAttribute("mode", this.#resolveMode(value));
  }

  /**
   * Resolves once the first availability check is complete.
   *
   * @returns {Promise<boolean>}
   */
  whenReady() {
    return this.#readyPromise;
  }

  /**
   * Whether locale switching is currently available.
   *
   * @returns {boolean}
   */
  get available() {
    return this.#available;
  }

  /**
   * Re-detect available locales and re-render.
   *
   * @returns {Promise<boolean>}
   */
  async refresh() {
    await this.#setup({ forceReloadLocales: true });
    return this.#available;
  }

  async #setup({ forceReloadLocales = false } = {}) {
    const componentStyles = PDS.createStylesheet(`
      :host {
        display: block;
      }

      label span {
        display: inline-flex;
        gap: var(--spacing-xs, 0.35rem);
        align-items: center;
      }
    `);

    await PDS.adoptLayers(this.shadowRoot, LAYERS, [componentStyles]);

    const localizationEnabled = isLocalizationActive();
    const detectedLocales = localizationEnabled
      ? await getStartupLocalizationLocales({ forceReload: forceReloadLocales })
      : [];

    const knownFiveLetterLocales = collectKnownFiveLetterLocales();

    const canonicalLocales = Array.from(
      new Set(
        detectedLocales
          .map((locale) => resolveFiveLetterLocaleTag(locale, knownFiveLetterLocales))
          .filter(Boolean)
      )
    );

    if (!localizationEnabled || canonicalLocales.length < 2) {
      this.#locales = [];
      this.#available = false;
      this.hidden = true;
      this.shadowRoot.innerHTML = "";
      this.#teardownObserver();
      this.#syncFormState();
      this.#emitReady(false);
      return;
    }

    this.hidden = false;
    this.#available = true;
    this.#locales = [...canonicalLocales];

    if (this.#defaultValue) {
      this.#defaultValue = resolveFiveLetterLocaleTag(this.#defaultValue, this.#locales) || "";
    }

    this.#renderOptions(this.#locales);

    if (!this.#listening) {
      this.shadowRoot.addEventListener("change", this.#handleChange);
      this.#listening = true;
    }

    this.#attachObserver();
    this.#syncValueFromAttribute({ updateDocumentLang: true, emitEvents: false });
    this.#applyDisabledState();
    this.#syncFormState();
    this.#emitReady(true);
  }

  #syncValueFromAttribute({ updateDocumentLang = true, emitEvents = false } = {}) {
    const localeFromValue = resolveFiveLetterLocaleTag(this.getAttribute("value"), this.#locales);
    const localeFromDocument = resolveFiveLetterLocaleTag(
      document.documentElement?.getAttribute?.("lang"),
      this.#locales
    );

    const nextLocale = localeFromValue || localeFromDocument || this.#locales[0] || "";
    if (!nextLocale) {
      this.#setValueAttribute("");
      this.#syncCheckedState();
      this.#syncFormState();
      return;
    }

    if (!this.#defaultValue) {
      this.#defaultValue = nextLocale;
    }

    this.#commitLocaleSelection(nextLocale, {
      emitEvents,
      updateDocumentLang,
      reflectAttribute: true,
    });
  }

  #renderOptions(locales) {
    this.shadowRoot.innerHTML = "";
    const renderMode = this.mode;

    const form = document.createElement("form");
    form.setAttribute("part", "form");

    const fieldset = document.createElement("fieldset");
    fieldset.setAttribute("part", "fieldset");
    fieldset.className = "buttons";
    fieldset.setAttribute("role", "radiogroup");
    fieldset.setAttribute("aria-label", this.getAttribute("data-label") || msg("Language"));

    locales.forEach((locale) => {
      const canonicalLocale = resolveFiveLetterLocaleTag(locale, this.#locales);
      if (!canonicalLocale) return;
      const optionLabel = document.createElement("label");
      optionLabel.setAttribute("part", "option");

      const optionInput = document.createElement("input");
      optionInput.type = "radio";
      optionInput.name = this.#radioName;
      optionInput.value = canonicalLocale;

      const optionText = document.createElement("span");
      const fullLocaleLabel = localeOptionLabel(canonicalLocale);
      const localeAlias =
        localeOptionAlias(canonicalLocale) || fullLocaleLabel || canonicalLocale;
      optionText.textContent =
        renderMode === "full"
          ? fullLocaleLabel || canonicalLocale
          : localeAlias.toUpperCase();

      if (fullLocaleLabel) {
        if (renderMode === "compact") {
          optionLabel.title = fullLocaleLabel;
          optionText.title = fullLocaleLabel;
          optionInput.setAttribute("aria-label", `${fullLocaleLabel} (${localeAlias})`);
        } else {
          optionInput.setAttribute("aria-label", fullLocaleLabel);
        }
      }

      optionLabel.append(optionInput, optionText);
      fieldset.appendChild(optionLabel);
    });

    form.appendChild(fieldset);
    this.shadowRoot.appendChild(form);
  }

  #handleChange = (event) => {
    const selected = event.target;
    if (!(selected instanceof HTMLInputElement) || selected.type !== "radio") {
      return;
    }

    const canonicalLocale = resolveFiveLetterLocaleTag(selected.value, this.#locales);
    if (!canonicalLocale) return;

    this.#commitLocaleSelection(canonicalLocale, {
      emitEvents: true,
      updateDocumentLang: true,
      reflectAttribute: true,
    });
  };

  #commitLocaleSelection(
    locale,
    { emitEvents = false, updateDocumentLang = true, reflectAttribute = true } = {}
  ) {
    const canonicalLocale = resolveFiveLetterLocaleTag(locale, this.#locales);
    if (!canonicalLocale) {
      this.#syncFormState();
      return;
    }

    const previousValue = this.value;

    if (reflectAttribute) {
      this.#setValueAttribute(canonicalLocale);
    }

    if (updateDocumentLang) {
      document.documentElement.setAttribute("lang", canonicalLocale);
    }

    this.#syncCheckedState();
    this.#syncFormState();

    if (!emitEvents || previousValue === canonicalLocale) {
      return;
    }

    this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));

    /** @type {CustomEvent<PdsLocaleChangedDetail>} */
    const localeChangedEvent = new CustomEvent("pds:locale:changed", {
      detail: { locale: canonicalLocale },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(localeChangedEvent);
  }

  #attachObserver() {
    if (this.#observer || typeof document === "undefined") return;

    this.#observer = new MutationObserver(() => {
      const activeDocumentLocale = resolveFiveLetterLocaleTag(
        document.documentElement?.getAttribute?.("lang"),
        this.#locales
      );

      if (!activeDocumentLocale) {
        this.#syncCheckedState();
        this.#syncFormState();
        return;
      }

      this.#commitLocaleSelection(activeDocumentLocale, {
        emitEvents: false,
        updateDocumentLang: false,
        reflectAttribute: true,
      });
    });

    this.#observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });
  }

  #teardownObserver() {
    if (!this.#observer) return;
    this.#observer.disconnect();
    this.#observer = undefined;
  }

  #syncCheckedState() {
    if (!this.#locales.length) return;

    const activeLocale =
      this.value ||
      normalizeLocaleTag(document.documentElement?.getAttribute?.("lang")) ||
      normalizeLocaleTag(PDS?.getLocalizationState?.()?.locale) ||
      this.#locales[0];

    this.shadowRoot.querySelectorAll('input[type="radio"]').forEach((radio) => {
      radio.checked = localeMatches(radio.value, activeLocale);
    });
  }

  #applyDisabledState() {
    const isDisabled = this.disabled;
    this.toggleAttribute("aria-disabled", isDisabled);

    this.shadowRoot.querySelectorAll('input[type="radio"]').forEach((radio) => {
      radio.disabled = isDisabled;
    });
  }

  #resolveMode(value) {
    const normalized = String(value || "").trim().toLowerCase();
    return normalized === "full" ? "full" : "compact";
  }

  #setValueAttribute(value) {
    const nextValue = value ? String(value) : "";

    if (nextValue) {
      if (this.getAttribute("value") === nextValue) return;
      this.#syncingValueAttribute = true;
      this.setAttribute("value", nextValue);
      this.#syncingValueAttribute = false;
      return;
    }

    if (!this.hasAttribute("value")) return;

    this.#syncingValueAttribute = true;
    this.removeAttribute("value");
    this.#syncingValueAttribute = false;
  }

  #syncFormState() {
    if (!this.#internals) return;

    if (!this.#available || this.disabled) {
      this.#internals.setFormValue(null);
      this.#internals.setValidity({});
      return;
    }

    const checkedRadioValue = resolveFiveLetterLocaleTag(
      this.shadowRoot.querySelector('input[type="radio"]:checked')?.value,
      this.#locales
    );

    const formValue = this.value || checkedRadioValue || "";

    if (!this.value && formValue) {
      this.#setValueAttribute(formValue);
    }

    this.#internals.setFormValue(formValue || "");

    if (this.required && !formValue) {
      const focusTarget =
        this.shadowRoot.querySelector('input[type="radio"]:checked') ||
        this.shadowRoot.querySelector('input[type="radio"]') ||
        this;

      this.#internals.setValidity(
        { valueMissing: true },
        msg("Please select a language."),
        focusTarget
      );
      return;
    }

    this.#internals.setValidity({});
  }

  #emitReady(available) {
    const detail = { available: Boolean(available), locales: [...this.#locales] };
    this.dispatchEvent(
      new CustomEvent("pds-locale:ready", {
        detail,
        bubbles: true,
        composed: true,
      })
    );

    if (!this.#isReady) {
      this.#isReady = true;
      this.#resolveReady(Boolean(available));
    }
  }
}

if (!customElements.get("pds-locale")) {
  customElements.define("pds-locale", PdsLocale);
}
