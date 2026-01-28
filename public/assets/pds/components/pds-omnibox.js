/**
 * Omnibox search input with PDS styling and form-associated behavior.
 *
 * @element pds-omnibox
 * @formAssociated
 *
 * @attr {string} name - Form field name for submitted data
 * @attr {string} placeholder - Placeholder text for the search input
 * @attr {string} value - Current input value
 * @attr {boolean} disabled - Disable the input
 * @attr {boolean} required - Mark the input as required
 * @attr {string} autocomplete - Native autocomplete attribute (default: off)
 *
 * @property {Object} settings - AutoComplete settings object (required by consumer)
 */
const LAYERS = ["tokens", "primitives", "components", "utilities"];
const DEFAULT_PLACEHOLDER = "Search...";

export class PdsOmnibox extends HTMLElement {
	static formAssociated = true;

	static get observedAttributes() {
		return ["name", "placeholder", "value", "disabled", "required", "autocomplete"];
	}

	#root;
	#internals;
	#input;
	#settings;
	#defaultValue = "";

	constructor() {
		super();
		this.#root = this.attachShadow({ mode: "open" });
		this.#internals = this.attachInternals();
		this.#renderStructure();
		void this.#adoptStyles();
	}

	connectedCallback() {
		this.#defaultValue = this.getAttribute("value") || "";
		this.#syncAttributes();
		this.#updateFormValue(this.#input.value || "");
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue === newValue) return;
		this.#syncAttributes();
	}

	get settings() {
		return this.#settings;
	}

	set settings(value) {
		this.#settings = value;
    console.log('settings set', this.#settings);
	}

	get name() {
		return this.getAttribute("name") || "";
	}

	set name(value) {
		if (value == null || value === "") this.removeAttribute("name");
		else this.setAttribute("name", value);
	}

	get placeholder() {
		return this.getAttribute("placeholder") || DEFAULT_PLACEHOLDER;
	}

	set placeholder(value) {
		if (value == null || value === "") this.removeAttribute("placeholder");
		else this.setAttribute("placeholder", value);
	}

	get value() {
		return this.#input?.value || "";
	}

	set value(value) {
		const next = value == null ? "" : String(value);
		if (this.#input) this.#input.value = next;
		this.#updateFormValue(next);
	}

	get disabled() {
		return this.hasAttribute("disabled");
	}

	set disabled(value) {
		if (value) this.setAttribute("disabled", "");
		else this.removeAttribute("disabled");
	}

	get required() {
		return this.hasAttribute("required");
	}

	set required(value) {
		if (value) this.setAttribute("required", "");
		else this.removeAttribute("required");
	}

	get autocomplete() {
		return this.getAttribute("autocomplete") || "off";
	}

	set autocomplete(value) {
		if (value == null || value === "") this.removeAttribute("autocomplete");
		else this.setAttribute("autocomplete", value);
	}

	formAssociatedCallback() {}

	formDisabledCallback(disabled) {
		if (!this.#input) return;
		this.#input.disabled = disabled;
	}

	formResetCallback() {
		this.value = this.#defaultValue;
	}

	formStateRestoreCallback(state) {
		this.value = state ?? "";
	}

	checkValidity() {
		return this.#input?.checkValidity?.() ?? true;
	}

	reportValidity() {
		return this.#input?.reportValidity?.() ?? true;
	}

	#renderStructure() {
		this.#root.innerHTML = `
			<div class="ac-container input-icon">
				<pds-icon icon="magnifying-glass"></pds-icon>
				<input class="ac-input" type="search" placeholder="${DEFAULT_PLACEHOLDER}" autocomplete="off" />
			</div>
		`;

		this.#input = this.#root.querySelector("input");
		this.#input.addEventListener("input", () => {
			this.#updateFormValue(this.#input.value);
			this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
		});
		this.#input.addEventListener("change", () => {
			this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
		});
		this.#input.addEventListener("focus", (e) => {
			this.#handleAutoComplete(e);
		});
	}

	async #adoptStyles() {
		const componentStyles = PDS.createStylesheet(/*css*/`
			@layer omnibox {
				:host {
					display: block;
					--ac-grid-default: 45px 1fr 80px;
					--ac-bg-default: var(--color-surface-subtle);
					--ac-color-default: var(--color-text-primary);
					--ac-accent-color-default: var(--color-accent-500);
					--ac-rad: var(--radius-lg);
					--ac-box-shadow: var(--shadow-md);
          --ac-color-muted: var(--color-text-muted);
					--ac-margin: var(--spacing-0);
					--icon-size: var(--spacing-6);
					--ac-itm-height-default: 5rem;
          --ac-max-height-default: 300px;
				}

				.ac-container {
					position: relative;
					width: 100%;

					.ac-input {
						width: 100%;
					}

					.ac-suggestion {
						background-color: var(--color-surface-base);
						max-height: var(--ac-max-height, var(--ac-max-height-default));
						position: absolute;
						z-index: var(--z-dropdown);
						left: 0;
						padding: var(--ac-margin);
						border-radius: 0 0 var(--ac-rad) var(--ac-rad);
						box-shadow: var(--ac-box-shadow);
						overflow-y: auto;

						&.ac-active {
							box-shadow: var(--shadow-sm);
						}

						.ac-empty {
							padding: var(--spacing-4);
							border-radius: var(--ac-rad);
						}

						.ac-itm {
							display: grid;
							grid-template-columns: var(--ac-grid, var(--ac-grid-default));
							align-items: center;
							column-gap: var(--spacing-2);
							border-color: var(--color-border);
							background-color: var(--ac-bg, var(--ac-bg-default));
							color: var(--ac-color, var(--ac-color-default));
							cursor: pointer;
							transition: background-color var(--transition-fast), color var(--transition-fast), box-shadow var(--transition-fast);
							max-height: var(--ac-itm-height, var(--ac-itm-height-default));
							border-radius: 0;
              padding: var(--spacing-2) var(--spacing-3);

							> pds-icon,
							> svg-icon,
							> img {
								grid-column: 1;
								justify-self: center;
							}

							> .text {
								grid-column: 2;
								min-width: var(--spacing-0);
							}

							> .category {
								grid-column: 3;
								justify-self: end;
                font-size: var(--font-size-sm);
							}

							.text {
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}

							img {
								width: var(--icon-size);
								height: var(--icon-size);
							}

							.category {
								
								color: var(--ac-color, var(--ac-color-muted));
							}


							svg-icon,
							pds-icon {
								--icon-fill-color: var(--ac-icon-fill, var(--ac-accent-color-default));
								color: var(--ac-icon-fill, var(--ac-accent-color-default));
							}

							small {
								color: var(--ac-color-description, var(--ac-color-default));
							}

							&:hover,
							&.selected {
								background-color: var(--accent-color, var(--ac-accent-color-default));
								color: var(--ac-bg, var(--ac-bg-default));

								svg-icon,
								pds-icon {
									--icon-fill-color: var(--color-surface-base);
									color: var(--color-surface-base);
								}

								small,
								.category {
									color: inherit;
								}
							}
						}

						.text {
							overflow: visible;
							text-overflow: unset;
							white-space: unset;
							height: auto !important;
						}
					}

					&.ac-active[data-direction="down"] {
						.ac-input {
							border-bottom-left-radius: 0;
							border-bottom-right-radius: 0;
						}

						.ac-itm:first-child {
							border-top-left-radius: 0;
							border-top-right-radius: 0;
						}

						.ac-itm:last-child {
							border-bottom-left-radius: var(--ac-rad);
							border-bottom-right-radius: var(--ac-rad);
						}
					}

					&.ac-active[data-direction="up"] {
						.ac-input {
							border-top-left-radius: 0;
							border-top-right-radius: 0;
						}

						.ac-itm:last-child {
							border-bottom-left-radius: 0;
							border-bottom-right-radius: 0;
						}

						.ac-itm:first-child {
							border-top-left-radius: var(--ac-rad);
							border-top-right-radius: var(--ac-rad);
						}
					}
				}

				@media (max-width: var(--breakpoint-sm)) {
					.ac-container {
						.ac-suggestion.full-mobile {
							padding: var(--spacing-4);
							display: flex;
							flex-direction: column-reverse;
							grid-area: suggest;
							position: relative;
							max-height: unset;
							max-width: unset;

							.ac-itm {
								padding: var(--spacing-3) 0;
								background-color: var(--color-surface-base);
								margin: var(--spacing-0) var(--spacing-1) var(--spacing-1) var(--spacing-0);
								border-radius: var(--radius-sm);
							}

							.ac-itm:hover,
							.ac-itm.selected {
								background-color: var(--color-accent-300);
								color: var(--color-surface-base);
							}
						}
					}
				}
			}
		`);

		await PDS.adoptLayers(this.#root, LAYERS, [componentStyles]);
	}

	#syncAttributes() {
		if (!this.#input) return;

		this.#input.placeholder = this.placeholder;
		this.#input.autocomplete = this.autocomplete;

		if (this.hasAttribute("value")) {
			const v = this.getAttribute("value") || "";
			if (this.#input.value !== v) this.#input.value = v;
		}

		if (this.disabled) this.#input.setAttribute("disabled", "");
		else this.#input.removeAttribute("disabled");

		if (this.required) this.#input.setAttribute("required", "");
		else this.#input.removeAttribute("required");

		this.#updateFormValue(this.#input.value);
	}

	#updateFormValue(value) {
		this.#internals.setFormValue(value);
		this.#syncValidity();
	}

	#syncValidity() {
		if (!this.#input) return;
		if (this.#input.checkValidity()) {
			this.#internals.setValidity({}, "", this.#input);
			return;
		}
		this.#internals.setValidity(
			{ customError: true },
			this.#input.validationMessage || "Invalid value",
			this.#input
		);
	}

	async #handleAutoComplete(e) {

		if (!this.settings) return;

		const AutoComplete =
			(PDS && PDS.AutoComplete) ||
			(PDS && typeof PDS.loadAutoComplete === "function"
				? await PDS.loadAutoComplete()
				: null);

		if (AutoComplete && typeof AutoComplete.connect === "function") {
      const settings = {
        //debug: true,
        iconHandler: (item) => {
          return item.icon ? `<pds-icon icon="${item.icon}"></pds-icon>` : null;
        },
        ...this.settings
      };
      // const ev = {
      //   ...e,
      //   target: this.#input
      // }
			//AutoComplete.connect(ev, settings, this.#root);

      this.#input._autoComplete = new AutoComplete(this.#input.parentNode, this.#input, settings);
      setTimeout(() => {
          this.#input._autoComplete.focusHandler(e);
        }, 100);

		}
	}
}

if (!customElements.get("pds-omnibox")) {
	customElements.define("pds-omnibox", PdsOmnibox);
}
