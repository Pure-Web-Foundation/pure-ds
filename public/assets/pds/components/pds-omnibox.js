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
import { PDS } from "#pds";

const LAYERS = ["tokens", "primitives", "components", "utilities"];
const DEFAULT_PLACEHOLDER = "Search...";
const DEFAULT_ICON = "magnifying-glass";

export class PdsOmnibox extends HTMLElement {
  static formAssociated = true;

  static get observedAttributes() {
    return [
      "name",
      "placeholder",
      "value",
      "disabled",
      "required",
      "autocomplete",
      "icon",
    ];
  }

  #root;
  #internals;
  #input;
  #icon;
  #settings;
  #defaultValue = "";
  #autoCompleteResizeHandler;
  #autoCompleteScrollHandler;
  #autoCompleteViewportHandler;
  #lengthProbe;
  #suggestionsUpdatedHandler;
  #suggestionsObserver;

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
    if (!this.#suggestionsUpdatedHandler) {
      this.#suggestionsUpdatedHandler = (event) => {
        this.#handleSuggestionsUpdated(event);
      };
      this.addEventListener(
        "suggestions-updated",
        this.#suggestionsUpdatedHandler,
      );
    }
  }

  disconnectedCallback() {
    this.#teardownAutoCompleteSizing();
    this.#teardownSuggestionsObserver();
    const autoComplete = this.#input?._autoComplete;
    if (autoComplete) {
      autoComplete.controller?.().clear?.("disconnected");
      autoComplete.resultsDiv?.remove?.();
      this.#input._autoComplete = null;
    }
    if (this.#suggestionsUpdatedHandler) {
      this.removeEventListener(
        "suggestions-updated",
        this.#suggestionsUpdatedHandler,
      );
      this.#suggestionsUpdatedHandler = null;
    }
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

  get icon() {
    return this.getAttribute("icon") || DEFAULT_ICON;
  }

  set icon(value) {
    if (value == null || value === "") this.removeAttribute("icon");
    else this.setAttribute("icon", value);
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
				<pds-icon morph icon="${DEFAULT_ICON}"></pds-icon>
				<input class="ac-input" type="search" placeholder="${DEFAULT_PLACEHOLDER}" autocomplete="off" />
			</div>
		`;

    this.#lengthProbe = document.createElement("div");
    this.#lengthProbe.style.cssText =
      "position:absolute; visibility:hidden; width:0; height:0; pointer-events:none;";
    this.#root.appendChild(this.#lengthProbe);

    this.#input = this.#root.querySelector("input");
    this.#icon = this.#root.querySelector("pds-icon");
    this.#input.addEventListener("input", () => {
      this.#updateFormValue(this.#input.value);
      this.#updateSuggestionMaxHeight();
      this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    });
    this.#input.addEventListener("change", () => {
      this.dispatchEvent(
        new Event("change", { bubbles: true, composed: true }),
      );
    });
    this.#input.addEventListener("focus", (e) => {
      this.#handleAutoComplete(e);
    });
    this.#input.addEventListener("show-results", (event) => {
      this.dispatchEvent(
        new CustomEvent("suggestions-updated", {
          detail: { results: event?.detail?.results ?? [] },
          bubbles: true,
          composed: true,
        }),
      );
    });
  }

  async #adoptStyles() {
    const componentStyles = PDS.createStylesheet(/*css*/ `
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
					--ac-viewport-gap: var(--spacing-4);
					--ac-suggest-offset: var(--spacing-1);
				}

				.ac-container {
					position: relative;
					width: 100%;

					.ac-input {
						width: 100%;
					}

					.ac-suggestion {
						background-color: var(--color-surface-base);
						max-height: min(
							var(--ac-max-height, var(--ac-max-height-default)),
							calc(100dvh - var(--ac-viewport-gap))
						);
						position: absolute;
						z-index: var(--z-dropdown);
						left: 0;
						top: calc(100% + var(--ac-suggest-offset));
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

							&.disabled{
								mouse-events: none;
								opacity: 0.5;
                cursor: not-allowed;
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
								background-color: var(--color-surface-elevated);
								border: 2px dotted var(--color-primary-500);

								svg-icon,
								pds-icon {
									filter: brightness(120%)
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

          .ac-suggestion.ac-active[data-direction="down"] {
            border-radius: 0 0 var(--ac-rad) var(--ac-rad);

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

						.ac-suggestion {
							top: auto;
							bottom: calc(100% + var(--ac-suggest-offset));
              border-radius: var(--ac-rad) var(--ac-rad) 0 0;
						}

						.ac-itm:last-child {
							border-bottom-left-radius: 0;
							border-bottom-right-radius: 0;
						}

						.ac-itm:first-child {
							border-top-left-radius: var(--ac-rad);
							border-top-right-radius: var(--ac-rad);
              border-bottom-left-radius: 0;
              border-bottom-right-radius: 0;
						}
					}

          .ac-suggestion.ac-active[data-direction="up"] {
            border-radius: var(--ac-rad) var(--ac-rad) 0 0;

            .ac-itm:last-child {
              border-bottom-left-radius: 0;
              border-bottom-right-radius: 0;
            }

            .ac-itm:first-child {
              border-top-left-radius: var(--ac-rad);
              border-top-right-radius: var(--ac-rad);
              border-bottom-left-radius: 0;
              border-bottom-right-radius: 0;
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
								background-color: var(--color-primary-500);
								color: var(--color-primary-contrast, #ffffff);
							}

							&.is-disabled {
								cursor: not-allowed;
								color: var(--color-text-muted);

								small,
								.category {
									color: var(--color-text-muted);
								}

								svg-icon,
								pds-icon {
									--icon-fill-color: var(--color-text-muted);
									color: var(--color-text-muted);
									filter: none;
								}
							}

							&.is-disabled:hover,
							&.is-disabled.selected {
								background-color: var(--ac-bg, var(--ac-bg-default));
								box-shadow: none;
							}
						}

						.preset-colors {
							display: flex;
							gap: var(--spacing-1);
							flex-shrink: 0;
						}

						.preset-colors span {
							width: var(--spacing-2);
							height: var(--spacing-5);
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
    if (this.#icon) this.#icon.setAttribute("icon", this.icon);

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
      this.#input,
    );
  }

  async #handleAutoComplete(e) {
    if (!this.settings) return;

    let AutoComplete = PDS.AutoComplete;
    if ((!AutoComplete || typeof AutoComplete.connect !== "function") &&
      typeof PDS.loadAutoComplete === "function") {
      try {
        AutoComplete = await PDS.loadAutoComplete();
      } catch (error) {
        return;
      }
    }

    if (AutoComplete && typeof AutoComplete.connect === "function") {
      const settings = {
        //debug: true,
        iconHandler: (item) => {
          return item.icon ? `<pds-icon icon="${item.icon}"></pds-icon>` : null;
        },
        ...this.settings,
      };

      const container = this.#input?.parentElement;
      if (container?.style) {
        container.style.removeProperty("--ac-bg-default");
        container.style.removeProperty("--ac-color-default");
        container.style.removeProperty("--ac-accent-color");

        const gridOverride =
          typeof settings.itemGrid === "string" ? settings.itemGrid.trim() : "";
        if (gridOverride) {
          container.style.setProperty("--ac-grid", gridOverride);
        } else if (settings.hideCategory === true) {
          container.style.setProperty("--ac-grid", "45px 1fr");
        } else {
          container.style.removeProperty("--ac-grid");
        }
      }

      if (!this.#input._autoComplete) {
        this.#input._autoComplete = new AutoComplete(
          this.#input.parentNode,
          this.#input,
          settings,
        );
      }

      this.#wrapAutoCompleteResultsHandler(this.#input._autoComplete);
      setTimeout(() => {
        this.#input._autoComplete.focusHandler(e);
        this.#setupAutoCompleteSizing();
        this.#updateSuggestionMaxHeight();
        this.#setupSuggestionsObserver();
      }, 100);
    }
  }

  #wrapAutoCompleteResultsHandler(autoComplete) {
    if (!autoComplete || autoComplete.__pdsSuggestionsWrapped) return;
    autoComplete.__pdsSuggestionsWrapped = true;
    const originalResultsHandler =
      autoComplete.resultsHandler?.bind(autoComplete);
    if (!originalResultsHandler) return;

    autoComplete.resultsHandler = (results, options) => {
      const container = this.#input?.parentElement;
      if (container && autoComplete.settings) {
        autoComplete.settings.direction =
          this.#resolveSuggestionDirection(container);
      }
      this.dispatchEvent(
        new CustomEvent("suggestions-updated", {
          detail: { results },
          bubbles: true,
          composed: true,
        }),
      );
      const res = originalResultsHandler(results, options);
      this.#updateSuggestionMaxHeight();
      return res;
    };
  }

  #setupAutoCompleteSizing() {
    if (this.#autoCompleteResizeHandler) return;
    this.#autoCompleteResizeHandler = () => this.#updateSuggestionMaxHeight();
    this.#autoCompleteScrollHandler = () => this.#updateSuggestionMaxHeight();
    this.#autoCompleteViewportHandler = () => this.#updateSuggestionMaxHeight();

    window.addEventListener("resize", this.#autoCompleteResizeHandler);
    window.addEventListener("scroll", this.#autoCompleteScrollHandler, true);
    if (window.visualViewport) {
      window.visualViewport.addEventListener(
        "resize",
        this.#autoCompleteViewportHandler,
      );
      window.visualViewport.addEventListener(
        "scroll",
        this.#autoCompleteViewportHandler,
      );
    }
  }

  #setupSuggestionsObserver() {
    if (this.#suggestionsObserver) return;
    const container = this.#input?.parentElement;
    const root = container?.shadowRoot ?? container;
    const suggestion = root?.querySelector?.(".ac-suggestion");
    if (!suggestion) return;
    this.#suggestionsObserver = new MutationObserver(() => {
      if (!suggestion.classList.contains("ac-active")) {
        this.removeAttribute("data-suggestions-open");
        this.#clearSuggestionOverlayStyles(suggestion);
        this.#resetIconToDefault();
      }
    });
    this.#suggestionsObserver.observe(suggestion, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }

  #teardownSuggestionsObserver() {
    if (!this.#suggestionsObserver) return;
    this.#suggestionsObserver.disconnect();
    this.#suggestionsObserver = null;
  }

  #teardownAutoCompleteSizing() {
    if (!this.#autoCompleteResizeHandler) return;
    window.removeEventListener("resize", this.#autoCompleteResizeHandler);
    window.removeEventListener("scroll", this.#autoCompleteScrollHandler, true);
    if (window.visualViewport) {
      window.visualViewport.removeEventListener(
        "resize",
        this.#autoCompleteViewportHandler,
      );
      window.visualViewport.removeEventListener(
        "scroll",
        this.#autoCompleteViewportHandler,
      );
    }
    this.#autoCompleteResizeHandler = null;
    this.#autoCompleteScrollHandler = null;
    this.#autoCompleteViewportHandler = null;
  }

  #clearSuggestionOverlayStyles(suggestion) {
    if (!suggestion || !suggestion.style) return;
    suggestion.style.removeProperty("position");
    suggestion.style.removeProperty("left");
    suggestion.style.removeProperty("right");
    suggestion.style.removeProperty("top");
    suggestion.style.removeProperty("bottom");
    suggestion.style.removeProperty("width");
    suggestion.style.removeProperty("max-width");
  }

  #getComposedParent(node) {
    if (!node) return null;
    if (node.parentElement) return node.parentElement;
    const root = node.getRootNode?.();
    if (root && root.host) return root.host;
    return null;
  }

  #hasTransformedAncestor(startNode) {
    let current = startNode;
    let safety = 0;
    while (current && safety < 80) {
      if (current instanceof Element) {
        const style = getComputedStyle(current);
        if (
          style.transform !== "none" ||
          style.perspective !== "none" ||
          style.filter !== "none" ||
          style.backdropFilter !== "none"
        ) {
          return true;
        }
      }
      current = this.#getComposedParent(current);
      safety += 1;
    }
    return false;
  }

  #shouldUseFixedSuggestionOverlay(container) {
    if (!container) return false;
    if (this.closest("pds-drawer, dialog")) return false;
    return !this.#hasTransformedAncestor(this);
  }

  #positionSuggestionInline({ container, suggestion, rect, direction, offset, maxHeight }) {
    if (!container || !suggestion) return;
    this.#clearSuggestionOverlayStyles(suggestion);
    if (direction === "up") {
      suggestion.style.top = "auto";
      suggestion.style.bottom = `${Math.round(rect.height + offset)}px`;
    } else {
      suggestion.style.bottom = "auto";
      suggestion.style.top = `${Math.round(rect.height + offset)}px`;
    }
    container.setAttribute("data-direction", direction);
    suggestion.setAttribute("data-direction", direction);
    container.style.setProperty("--ac-max-height", `${maxHeight}px`);
  }

  #positionSuggestionOverlay({
    container,
    suggestion,
    rect,
    viewportHeight,
    viewportWidth,
    direction,
    maxHeight,
    gap,
    offset,
  }) {
    if (!container || !suggestion || !suggestion.style) return;
    if (suggestion.classList.contains("full-mobile")) {
      this.#clearSuggestionOverlayStyles(suggestion);
      return;
    }

    const clampedLeft = Math.max(gap, Math.min(rect.left, viewportWidth - rect.width - gap));
    const clampedWidth = Math.max(0, Math.min(rect.width, viewportWidth - gap * 2));

    suggestion.style.position = "fixed";
    suggestion.style.left = `${Math.round(clampedLeft)}px`;
    suggestion.style.width = `${Math.round(clampedWidth)}px`;
    suggestion.style.maxWidth = `${Math.round(Math.max(0, viewportWidth - gap * 2))}px`;
    suggestion.style.right = "auto";

    if (direction === "up") {
      suggestion.style.top = "auto";
      suggestion.style.bottom = `${Math.round(viewportHeight - rect.top + offset)}px`;
    } else {
      suggestion.style.bottom = "auto";
      suggestion.style.top = `${Math.round(rect.bottom + offset)}px`;
    }

    container.setAttribute("data-direction", direction);
    suggestion.setAttribute("data-direction", direction);
    container.style.setProperty("--ac-max-height", `${maxHeight}px`);
  }

  #updateSuggestionMaxHeight() {
    if (!this.#input) return;
    const container = this.#input.parentElement;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const viewportHeight = window.visualViewport?.height || window.innerHeight;
    const gap = this.#readSpacingToken(container, "--ac-viewport-gap") || 0;
    const root = container.shadowRoot ?? container;
    const suggestion = root?.querySelector?.(".ac-suggestion");
    const currentDirection =
      suggestion?.getAttribute("data-direction") ||
      container.getAttribute("data-direction") ||
      "down";
    const offset = this.#readSpacingToken(container, "--ac-suggest-offset") || 0;

    const availableDown = viewportHeight - rect.bottom - gap;
    const availableUp = rect.top - gap;
    const direction = this.#resolveSuggestionDirection(container);

    if (direction !== currentDirection) {
      container.setAttribute("data-direction", direction);
      if (suggestion) suggestion.setAttribute("data-direction", direction);
      if (suggestion) {
        if (direction === "up") {
          suggestion.style.top = "auto";
          suggestion.style.bottom = `${rect.height + offset}px`;
        } else {
          suggestion.style.bottom = "auto";
          suggestion.style.top = `${rect.height + offset}px`;
        }
      }
    }

    const available = direction === "up" ? availableUp : availableDown;

    const configuredMaxHeight =
      this.#readSpacingToken(container, "--ac-max-height-default") || 200;
    const maxHeight = Math.max(
      0,
      Math.floor(Math.min(available, configuredMaxHeight)),
    );
    container.style.setProperty("--ac-max-height", `${maxHeight}px`);

    const isSuggestionActive = suggestion?.classList?.contains("ac-active");
    this.toggleAttribute("data-suggestions-open", Boolean(isSuggestionActive));

    if (!suggestion || !isSuggestionActive || suggestion.classList.contains("full-mobile")) {
      this.#clearSuggestionOverlayStyles(suggestion);
      return;
    }

    if (!this.#shouldUseFixedSuggestionOverlay(container)) {
      this.#positionSuggestionInline({
        container,
        suggestion,
        rect,
        direction,
        offset,
        maxHeight,
      });
      return;
    }

    const viewportWidth = window.visualViewport?.width || window.innerWidth;
    this.#positionSuggestionOverlay({
      container,
      suggestion,
      rect,
      viewportHeight,
      viewportWidth,
      direction,
      maxHeight,
      gap,
      offset,
    });
  }

  #resolveSuggestionDirection(container) {
    const rect = container.getBoundingClientRect();
    const viewportHeight = window.visualViewport?.height || window.innerHeight;
    const gap = this.#readSpacingToken(container, "--ac-viewport-gap") || 0;
    const availableDown = viewportHeight - rect.bottom - gap;
    const availableUp = rect.top - gap;
    const maxDefault =
      this.#readSpacingToken(container, "--ac-max-height-default") || 200;
    const minDown = Math.min(maxDefault, 180);

    return availableDown >= minDown || availableDown >= availableUp
      ? "down"
      : "up";
  }

  #readSpacingToken(element, tokenName) {
    const value = getComputedStyle(element).getPropertyValue(tokenName).trim();
    if (!value) return 0;
    if (!this.#lengthProbe) return 0;
    this.#lengthProbe.style.height = value;
    const resolved = getComputedStyle(this.#lengthProbe).height;
    const parsed = Number.parseFloat(resolved);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  #handleSuggestionsUpdated(event) {
    const results = event?.detail?.results;
    if (!Array.isArray(results) || !this.settings?.categories) return;
    if (!results.length) {
      this.#icon?.setAttribute("icon", this.icon);
      return;
    }

    const categories = this.settings.categories;
    const firstResult = results[0];
    const categoryConfig = categories[firstResult?.category] || {};
    const useIconForInput =
      categoryConfig?.useIconForInput ?? this.settings?.useIconForInput;

    if (typeof useIconForInput === "string") {
      this.#icon?.setAttribute("icon", useIconForInput);
      return;
    }

    if (useIconForInput === true) {
      const icon =
        firstResult?.icon ||
        firstResult?.element
          ?.querySelector?.("pds-icon, svg-icon")
          ?.getAttribute?.("icon");
      if (icon) {
        this.#icon?.setAttribute("icon", icon);
        return;
      }
    }

    this.#resetIconToDefault();
  }

  #resetIconToDefault() {
    this.#icon?.setAttribute("icon", this.icon);
  }
}

if (!customElements.get("pds-omnibox")) {
  customElements.define("pds-omnibox", PdsOmnibox);
}
