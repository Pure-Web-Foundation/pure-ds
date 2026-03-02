const STAR_PATH =
  "M12 .9l3.1 6.3 7 1-5 4.9 1.2 6.9L12 16.8 5.7 20l1.2-6.9-5-4.9 7-1L12 .9z";

/**
 * Star-based rating input that participates in native HTML forms.
 *
 * @element pds-rating
 * @formAssociated
 *
 * @attr {number} max - Maximum rating value and rendered star count (minimum 1, default 5)
 * @attr {number} value - Current rating value (snapped to 0.5 increments)
 * @attr {boolean} disabled - Disables keyboard/pointer interaction and form submission value
 * @attr {boolean} required - Marks the rating as required for form validation
 * @attr {boolean} readonly - Makes the rating non-editable while still focusable
 * @attr {string} name - Form field name used when submitting the rating
 * @attr {string} color - Optional active star color (CSS color value)
 *
 * @property {number} min - Minimum rating value (always 0)
 * @property {number} max - Maximum rating value and rendered star count
 * @property {number} step - Step size used for keyboard and pointer input (always 0.5)
 * @property {number} value - Current rating value
 * @property {string} name - Form field name
 * @property {boolean} disabled - Disabled state
 * @property {boolean} required - Required state
 * @property {boolean} readOnly - Read-only state
 * @property {string} color - Active star color override
 * @property {HTMLFormElement|null} form - Associated form element
 * @property {string} type - Form control type (`range`)
 * @property {ValidityState} validity - Current validity state
 * @property {string} validationMessage - Current validation message
 * @property {boolean} willValidate - Whether the element is eligible for validation
 *
 * @fires input - Fired when the value changes via pointer or keyboard interaction
 * @fires change - Fired after input when the value commit completes
 */
class PdsRating extends HTMLElement {
  static formAssociated = true;

  static observedAttributes = ["max", "value", "disabled", "required", "readonly", "name", "color"];

  #internals;
  #input;
  #interactive;
  #svg;
  #fillRect;
  #onInput;
  #onChange;
  #onPointerDown;
  #onPointerMove;
  #onPointerUp;
  #onKeyDown;
  #observer;
  #pointerActive = false;

  /**
   * Creates a form-associated rating control with a shadow DOM star strip renderer.
   */
  constructor() {
    super();
    this.#internals = this.attachInternals();
    this.attachShadow({ mode: "open", delegatesFocus: true });

    this.#onInput = () => {
      if (this.readOnly && this.#input) {
        this.#input.value = String(this.getAttribute("value") ?? 0);
        return;
      }
      this.#syncFromInput();
    };
    this.#onChange = () => {
      if (this.readOnly && this.#input) {
        this.#input.value = String(this.getAttribute("value") ?? 0);
        return;
      }
      this.#syncFromInput();
    };

    this.#onPointerDown = (event) => {
      if (this.disabled || this.readOnly) return;
      this.#pointerActive = true;
      this.#interactive?.setPointerCapture?.(event.pointerId);
      this.#setValueFromClientX(event.clientX);
      event.preventDefault();
    };

    this.#onPointerMove = (event) => {
      if (!this.#pointerActive || this.disabled || this.readOnly) return;
      this.#setValueFromClientX(event.clientX);
      event.preventDefault();
    };

    this.#onPointerUp = (event) => {
      if (!this.#pointerActive) return;
      this.#pointerActive = false;
      this.#interactive?.releasePointerCapture?.(event.pointerId);
      this.#dispatchInputAndChange();
    };

    this.#onKeyDown = (event) => {
      if (this.disabled || this.readOnly) return;

      const step = this.step;
      let next = this.value;

      switch (event.key) {
        case "ArrowLeft":
        case "ArrowDown":
          next -= step;
          break;
        case "ArrowRight":
        case "ArrowUp":
          next += step;
          break;
        case "Home":
          next = this.min;
          break;
        case "End":
          next = this.max;
          break;
        default:
          return;
      }

      event.preventDefault();
      this.value = next;
      this.#dispatchInputAndChange();
    };

    this.shadowRoot.innerHTML = /* html */ `
      <style>
        :host {
          --rating-star-size: var(--spacing-lg);
          --rating-star-gap: var(--spacing-2xs);
          --rating-star-off: var(--color-text-muted);
          --rating-star-on: var(--color-warning-500);
          --rating-focus: var(--color-primary-500);
          --rating-fill-pct: 0%;
          display: inline-block;
          inline-size: fit-content;
          max-inline-size: 100%;
          touch-action: none;
        }

        ::slotted(input[type="range"]) {
          position: absolute !important;
          inset-inline-start: 0 !important;
          inset-block-start: 0 !important;
          inline-size: 1px !important;
          block-size: 1px !important;
          min-inline-size: 1px !important;
          min-block-size: 1px !important;
          margin: -1px !important;
          border: 0 !important;
          padding: 0 !important;
          opacity: 0 !important;
          overflow: hidden !important;
          clip: rect(0 0 0 0) !important;
          clip-path: inset(50%) !important;
          white-space: nowrap !important;
          appearance: none !important;
          -webkit-appearance: none !important;
          pointer-events: none !important;
        }

        .wrap {
          position: relative;
          display: inline-grid;
          gap: var(--spacing-2xs);
          align-items: center;
          justify-items: start;
          min-block-size: calc(var(--rating-star-size) + var(--spacing-xs));
        }

        .interactive {
          display: inline-grid;
          place-items: center start;
          inline-size: 100%;
          cursor: pointer;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
          touch-action: pan-x;
        }

        :host([disabled]) .interactive,
        :host([readonly]) .interactive {
          cursor: default;
        }

        :host([disabled]) {
          opacity: 0.5;
        }

        .stars {
          display: block;
          inline-size: auto;
          block-size: var(--rating-star-size);
          overflow: visible;
          transition: transform 220ms ease, opacity 220ms ease;
        }

        :host([data-in-view="false"]) .stars {
          opacity: 0;
          transform: translateY(var(--spacing-xs)) scale(0.98);
        }

        :host([data-in-view="true"]) .stars {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        input[type="range"] {
          position: absolute !important;
          inset-inline-start: 0 !important;
          inset-block-start: 0 !important;
          inline-size: 1px !important;
          block-size: 1px !important;
          min-inline-size: 1px !important;
          min-block-size: 1px !important;
          margin: -1px !important;
          border: 0 !important;
          padding: 0 !important;
          opacity: 0 !important;
          overflow: hidden !important;
          clip: rect(0 0 0 0) !important;
          clip-path: inset(50%) !important;
          white-space: nowrap !important;
          appearance: none !important;
          -webkit-appearance: none !important;
          pointer-events: none !important;
        }

        :host(:focus-within) .interactive {
          outline: 2px solid var(--rating-focus);
          outline-offset: var(--spacing-3xs);
          border-radius: var(--radius-sm);
        }

        @media (prefers-reduced-motion: reduce) {
          .stars {
            transition: none;
          }
        }
      </style>

      <div class="wrap" part="control">
        <div class="interactive" part="interactive" aria-hidden="true">
          <svg class="stars" part="stars" focusable="false" aria-hidden="true"></svg>
        </div>
        <slot></slot>
      </div>
    `;

    this.#interactive = this.shadowRoot.querySelector(".interactive");
    this.#svg = this.shadowRoot.querySelector(".stars");
  }

  /**
   * Initializes DOM wiring, syncing, and in-view animation observation.
   * @returns {void}
   */
  connectedCallback() {
    this.setAttribute("data-in-view", "false");
    this.#wireInput();
    this.#renderSvg();
    this.#syncFromInput();
    this.#observeInView();

    this.#interactive?.addEventListener("pointerdown", this.#onPointerDown);
    this.#interactive?.addEventListener("pointermove", this.#onPointerMove);
    this.#interactive?.addEventListener("pointerup", this.#onPointerUp);
    this.#interactive?.addEventListener("pointercancel", this.#onPointerUp);

    this.addEventListener("keydown", this.#onKeyDown);
  }

  /**
   * Cleans up listeners and observers.
   * @returns {void}
   */
  disconnectedCallback() {
    this.#teardownInput();
    this.#observer?.disconnect();

    this.#interactive?.removeEventListener("pointerdown", this.#onPointerDown);
    this.#interactive?.removeEventListener("pointermove", this.#onPointerMove);
    this.#interactive?.removeEventListener("pointerup", this.#onPointerUp);
    this.#interactive?.removeEventListener("pointercancel", this.#onPointerUp);

    this.removeEventListener("keydown", this.#onKeyDown);
  }

  /**
   * Reacts to reflected attribute changes and keeps internal state in sync.
   * @param {string} name
   * @param {string|null} oldValue
   * @param {string|null} newValue
   * @returns {void}
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    if (name === "max") {
      if (this.#input) this.#input.max = String(this.max);
      this.#renderSvg();
      this.#syncFromInput();
      return;
    }

    if (name === "value") {
      if (this.#input && this.#input.value !== String(this.value)) {
        this.#input.value = String(this.value);
      }
      this.#syncFromInput();
      return;
    }

    if (name === "disabled") {
      if (this.#input) this.#input.disabled = this.disabled;
      this.#syncFromInput();
      return;
    }

    if (name === "required") {
      if (this.#input) this.#input.required = this.required;
      this.#syncFromInput();
      return;
    }

    if (name === "readonly") {
      if (this.#input) this.#input.readOnly = this.readOnly;
      this.#syncFromInput();
      return;
    }

    if (name === "name" && this.#input) {
      this.#input.name = this.name;
      this.#syncFromInput();
    }

    if (name === "color") {
      this.#syncFromInput();
    }
  }

  /** @returns {number} */
  get min() {
    return 0;
  }

  /** @returns {number} */
  get max() {
    const raw = Number(this.getAttribute("max") ?? 5);
    if (!Number.isFinite(raw)) return 5;
    return Math.max(1, Math.round(raw));
  }

  /** @param {number|string} value */
  set max(value) {
    this.setAttribute("max", String(value));
  }

  /** @returns {number} */
  get step() {
    return 0.5;
  }

  /** @returns {number} */
  get value() {
    const raw = Number(this.getAttribute("value") ?? this.#input?.value ?? 0);
    if (!Number.isFinite(raw)) return 0;
    return this.#clamp(raw);
  }

  /** @param {number|string} next */
  set value(next) {
    const clamped = this.#clamp(Number(next));
    this.setAttribute("value", String(clamped));
    if (this.#input) this.#input.value = String(clamped);
    this.#syncFromInput();
  }

  /** @returns {string} */
  get name() {
    return this.getAttribute("name") ?? "";
  }

  /** @param {string|null|undefined} next */
  set name(next) {
    if (next == null || next === "") {
      this.removeAttribute("name");
      return;
    }
    this.setAttribute("name", String(next));
  }

  /** @returns {HTMLFormElement|null} */
  get form() {
    return this.#internals.form;
  }

  /** @returns {string} */
  get color() {
    return this.getAttribute("color") ?? "";
  }

  /** @param {string|null|undefined} next */
  set color(next) {
    if (next == null || String(next).trim() === "") {
      this.removeAttribute("color");
      return;
    }
    this.setAttribute("color", String(next));
  }

  /** @returns {string} */
  get type() {
    return "range";
  }

  /** @returns {ValidityState} */
  get validity() {
    return this.#internals.validity;
  }

  /** @returns {string} */
  get validationMessage() {
    return this.#internals.validationMessage;
  }

  /** @returns {boolean} */
  get willValidate() {
    return this.#internals.willValidate;
  }

  /** @returns {boolean} */
  get disabled() {
    return this.hasAttribute("disabled");
  }

  /** @param {boolean} next */
  set disabled(next) {
    this.toggleAttribute("disabled", Boolean(next));
  }

  /** @returns {boolean} */
  get required() {
    return this.hasAttribute("required");
  }

  /** @param {boolean} next */
  set required(next) {
    this.toggleAttribute("required", Boolean(next));
  }

  /** @returns {boolean} */
  get readOnly() {
    return this.hasAttribute("readonly");
  }

  /** @param {boolean} next */
  set readOnly(next) {
    this.toggleAttribute("readonly", Boolean(next));
  }

  /**
   * Runs constraint validation.
   * @returns {boolean}
   */
  checkValidity() {
    return this.#internals.checkValidity();
  }

  /**
   * Runs constraint validation and reports the result to the user agent.
   * @returns {boolean}
   */
  reportValidity() {
    return this.#internals.reportValidity();
  }

  /**
   * Restores default value during parent form reset.
   * @returns {void}
   */
  formResetCallback() {
    if (!this.#input) return;
    const resetValue = this.#input.defaultValue ? Number(this.#input.defaultValue) : 0;
    this.value = this.#clamp(resetValue);
  }

  /**
   * Restores state from browser session history/form restore.
   * @param {string|File|FormData|null} state
   * @returns {void}
   */
  formStateRestoreCallback(state) {
    const restored = Number(state);
    if (Number.isFinite(restored)) {
      this.value = restored;
    }
  }

  #wireInput() {
    const existing = this.querySelector('input[type="range"]');
    this.#input = existing ?? document.createElement("input");

    if (!existing) {
      this.#input.type = "range";
      this.append(this.#input);
    }

    this.#input.type = "range";
    this.#input.min = "0";
    this.#input.max = String(this.max);
    this.#input.step = "0.5";
    this.#input.setAttribute("data-enhanced-range", "1");
    this.#input.tabIndex = -1;

    if (!this.hasAttribute("value") && this.#input.value) {
      this.setAttribute("value", this.#input.value);
    }

    this.#input.value = String(this.value);

    if (this.disabled) this.#input.disabled = true;
    if (this.required) this.#input.required = true;
    if (this.readOnly) this.#input.readOnly = true;

    if (!this.hasAttribute("name") && this.#input.name) {
      this.name = this.#input.name;
    }
    this.#input.name = this.name;

    if (!this.#input.hasAttribute("aria-label") && !this.#input.hasAttribute("aria-labelledby")) {
      this.#input.setAttribute("aria-label", "Rating");
    }

    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "slider");
    }

    this.#input.addEventListener("input", this.#onInput);
    this.#input.addEventListener("change", this.#onChange);

    this.tabIndex = this.disabled ? -1 : 0;
  }

  #teardownInput() {
    if (!this.#input) return;
    this.#input.removeEventListener("input", this.#onInput);
    this.#input.removeEventListener("change", this.#onChange);
  }

  #syncFromInput() {
    if (!this.#input) return;

    const current = this.#clamp(Number(this.#input.value));
    this.#input.value = String(current);

    if (this.getAttribute("value") !== String(current)) {
      this.setAttribute("value", String(current));
    }

    const max = this.max;
    const percentage = max > 0 ? (current / max) * 100 : 0;
    this.style.setProperty("--rating-fill-pct", `${Math.max(0, Math.min(100, percentage))}%`);

    if (this.color.trim()) {
      this.style.setProperty("--rating-star-on", this.color.trim());
    } else {
      this.style.removeProperty("--rating-star-on");
    }

    this.#input.setAttribute("aria-valuetext", `${current} out of ${max} stars`);
    this.setAttribute("aria-label", this.#input.getAttribute("aria-label") || "Rating");
    this.setAttribute("aria-disabled", String(this.disabled));
    this.setAttribute("aria-readonly", String(this.readOnly));
    this.setAttribute("aria-valuemin", "0");
    this.setAttribute("aria-valuemax", String(max));
    this.setAttribute("aria-valuenow", String(current));

    if (this.#fillRect) {
      this.#fillRect.setAttribute("width", String((current / max) * this.#starStripWidth(max)));
    }

    const valueForForm = this.disabled ? null : String(current);
    this.#internals.setFormValue(valueForForm, valueForForm);
    this.#internals.setValidity(this.#input.validity, this.#input.validationMessage, this.#input);

    this.tabIndex = this.disabled ? -1 : 0;
  }

  #renderSvg() {
    const max = this.max;
    const starSize = 24;
    const gap = 4;
    const width = this.#starStripWidth(max, starSize, gap);
    const height = starSize;
    const maskId = `stars-mask-${crypto.randomUUID()}`;

    const stars = Array.from({ length: max }, (_, index) => {
      const x = index * (starSize + gap);
      return `<path d="${STAR_PATH}" transform="translate(${x},0)" />`;
    }).join("");

    this.#svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    this.#svg.setAttribute("width", String(width));
    this.#svg.setAttribute("height", String(height));
    this.#svg.innerHTML = `
      <style>
        #rating-fill {
          transition: width 180ms ease-out;
        }
      </style>
      <defs>
        <mask id="${maskId}" maskUnits="userSpaceOnUse" x="0" y="0" width="${width}" height="${height}">
          <rect x="0" y="0" width="${width}" height="${height}" fill="black"></rect>
          <g fill="white">${stars}</g>
        </mask>
      </defs>
      <rect x="0" y="0" width="${width}" height="${height}" fill="var(--rating-star-off)" mask="url(#${maskId})"></rect>
      <rect id="rating-fill" x="0" y="0" width="0" height="${height}" fill="var(--rating-star-on)" mask="url(#${maskId})"></rect>
    `;

    this.#fillRect = this.#svg.querySelector("#rating-fill");
  }

  #starStripWidth(max, starSize = 24, gap = 4) {
    return max * starSize + Math.max(0, max - 1) * gap;
  }

  #setValueFromClientX(clientX) {
    const rect = this.#interactive?.getBoundingClientRect();
    if (!rect || !rect.width) return;

    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const ratio = x / rect.width;
    const raw = this.min + ratio * (this.max - this.min);
    const snapped = Math.round(raw / this.step) * this.step;

    this.value = snapped;
  }

  #dispatchInputAndChange() {
    if (!this.#input) return;

    const inputEvent = new Event("input", { bubbles: true, composed: true });
    const changeEvent = new Event("change", { bubbles: true, composed: true });

    this.#input.dispatchEvent(inputEvent);
    this.#input.dispatchEvent(changeEvent);

    this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
  }

  #clamp(value) {
    if (!Number.isFinite(value)) return 0;
    const bounded = Math.max(this.min, Math.min(this.max, value));
    return Math.round(bounded / this.step) * this.step;
  }

  #observeInView() {
    this.#observer?.disconnect();
    this.#observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          this.setAttribute("data-in-view", "true");
          this.#observer?.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    this.#observer.observe(this);
  }
}

if (!customElements.get("pds-rating")) {
  customElements.define("pds-rating", PdsRating);
}
