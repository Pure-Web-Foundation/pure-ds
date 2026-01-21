/**
 * my-theme Web Component - allows users to select the app theme (light, dark, system)
 *
 * Uses Pure Design System (PDS) for styling and theming.
 */
customElements.define(
  "my-theme",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }

    async connectedCallback() {
      const componentStyles = PDS.createStylesheet(`
        :host {
          display: block;
        }
      `);

      await PDS.adoptLayers(
        this.shadowRoot,
        ["tokens", "primitives", "components", "utilities"],
        [componentStyles],
      );

      this.shadowRoot.innerHTML = /*html*/ `<form>
          <fieldset role="radiogroup" aria-label="Theme" class="buttons">
            <legend>Theme</legend>
            <label>
              <input type="radio" name="theme" value="system" />
              <span><pds-icon icon="moon-stars"></pds-icon>System</span>
            </label>
            <label>
              <input type="radio" name="theme" value="light" />
              <span>
                <pds-icon icon="sun"></pds-icon> Light </span>
              </label>
              <label>
                <input type="radio" name="theme" value="dark" />
                <span><pds-icon icon="moon"></pds-icon> Dark </span>
              </label>
          </fieldset>
        </form>
        `;

      this.updateCheckedState();

      this.shadowRoot.addEventListener("change", (e) => {
        if (e.target.type === "radio" && e.target.name === "theme") {
          PDS.theme = e.target.value;
          PDS.toast("Theme changed to " + e.target.value, { duration: 2000 });
        }
      });

      const observer = new MutationObserver(() => {
        this.updateCheckedState();
      });

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });
    }

    updateCheckedState() {
      const currentTheme = PDS.theme || "system";
      const radios = this.shadowRoot.querySelectorAll('input[type="radio"]');
      radios.forEach((radio) => {
        radio.checked = radio.value === currentTheme;
      });
    }
  },
);
