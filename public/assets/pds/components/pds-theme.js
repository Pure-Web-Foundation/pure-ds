/**
 * `<pds-theme>` exposes a zero-config theme toggle that updates `PDS.theme` and
 * keeps its UI in sync with programmatic theme changes.
 *
 * @element pds-theme
 * @attr {string} label - Optional legend text (defaults to "Theme").
 */
const THEME_OPTIONS = [
  { value: "system", label: "System", icon: "moon-stars" },
  { value: "light", label: "Light", icon: "sun" },
  { value: "dark", label: "Dark", icon: "moon" },
];

const DEFAULT_LABEL = "Theme";
const LAYERS = ["tokens", "primitives", "components", "utilities"];
const DEFAULT_THEMES = ["light", "dark"];
const VALID_THEMES = new Set(DEFAULT_THEMES);

const normalizePresetThemes = (preset) => {
  const themes = Array.isArray(preset?.themes)
    ? preset.themes.map((theme) => String(theme).toLowerCase())
    : DEFAULT_THEMES;
  const normalized = themes.filter((theme) => VALID_THEMES.has(theme));
  return normalized.length ? normalized : DEFAULT_THEMES;
};

const resolveThemePreference = (preference) => {
  const normalized = String(preference || "").toLowerCase();
  if (VALID_THEMES.has(normalized)) return normalized;

  if (typeof document !== "undefined") {
    const applied = document.documentElement?.getAttribute("data-theme");
    if (VALID_THEMES.has(applied)) return applied;
  }

  if (typeof window !== "undefined" && window.matchMedia) {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  }

  return "light";
};

const isPresetThemeCompatible = (preset, themePreference) => {
  const resolvedTheme = resolveThemePreference(themePreference);
  const themes = normalizePresetThemes(preset);
  return themes.includes(resolvedTheme);
};

class PdsTheme extends HTMLElement {
  static get observedAttributes() {
    return ["label"];
  }

  #observer;
  #listening = false;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.shadowRoot.hasChildNodes()) {
      void this.#setup();
    } else {
      this.#attachObserver();
      this.#syncLegend();
      this.#syncCheckedState();
    }
  }

  disconnectedCallback() {
    this.#teardownObserver();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    if (name === "label") {
      this.#syncLegend();
    }
  }

  /**
   * Gets the legend/aria-label text to display.
   * @returns {string}
   */
  get label() {
    return this.getAttribute("label")?.trim() || DEFAULT_LABEL;
  }

  set label(value) {
    if (value == null || value === "") {
      this.removeAttribute("label");
    } else {
      this.setAttribute("label", value);
    }
  }

  async #setup() {
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

    this.shadowRoot.innerHTML = this.#template();

    if (!this.#listening) {
      this.shadowRoot.addEventListener("change", this.#handleChange);
      this.#listening = true;
    }

    this.#attachObserver();
    this.#syncLegend();
    this.#syncCheckedState();
  }

  #template() {
    const optionsMarkup = THEME_OPTIONS.map(
      (option) => /*html*/`
        <label part="option">
          <input type="radio" name="theme" value="${option.value}" />
          <span>
            <pds-icon icon="${option.icon}" size="sm"></pds-icon>
            ${option.label}
          </span>
        </label>`,
    ).join("");

    return /*html*/`
      <form part="form">
        <fieldset part="fieldset" role="radiogroup" aria-label="${DEFAULT_LABEL}" class="buttons">
          <legend part="legend">${DEFAULT_LABEL}</legend>
          ${optionsMarkup}
        </fieldset>
      </form>`;
  }

  #handleChange = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) || target.name !== "theme") {
      return;
    }

    const { value } = target;
    if (!THEME_OPTIONS.some((option) => option.value === value)) {
      return;
    }

    const currentPreset = PDS.currentConfig?.design || null;
    if (currentPreset && !isPresetThemeCompatible(currentPreset, value)) {
      const resolvedTheme = resolveThemePreference(value);
      const presetName =
        currentPreset?.name ||
        PDS.currentPreset?.name ||
        PDS.currentConfig?.preset ||
        "current preset";
      console.warn(
        `PDS theme "${resolvedTheme}" not supported by preset "${presetName}".`
      );
      this.#syncCheckedState();
      return;
    }

    if (PDS.theme !== value) {
      PDS.theme = value;
    }

  };

  #attachObserver() {
    if (this.#observer) return;

    this.#observer = new MutationObserver(() => {
      this.#syncCheckedState();
    });

    this.#observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
  }

  #teardownObserver() {
    if (!this.#observer) return;
    this.#observer.disconnect();
    this.#observer = undefined;
  }

  #syncLegend() {
    const legend = this.shadowRoot.querySelector("legend");
    const fieldset = this.shadowRoot.querySelector("fieldset");
    if (legend) legend.textContent = this.label;
    if (fieldset) fieldset.setAttribute("aria-label", this.label);
  }

  #syncCheckedState() {
    const currentTheme = PDS.theme || "system";
    const currentPreset = PDS.currentConfig?.design || null;
    const supportedThemes = normalizePresetThemes(currentPreset);
    this.shadowRoot
      .querySelectorAll('input[type="radio"]')
      .forEach((radio) => {
        radio.checked = radio.value === currentTheme;
        if (radio.value === "system") {
          radio.disabled = false;
        } else if (currentPreset) {
          const resolved = resolveThemePreference(radio.value);
          radio.disabled = !supportedThemes.includes(resolved);
        } else {
          radio.disabled = false;
        }
      });
  }
}

if (!customElements.get("pds-theme")) {
  customElements.define("pds-theme", PdsTheme);
}
