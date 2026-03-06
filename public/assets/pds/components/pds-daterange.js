import { PDS, msg, str } from "#pds";

const DEFAULT_DISPLAY_FORMAT = "d MMM yy";

/**
 * @component pds-daterange
 * @description Form-associated date range picker with a dropdown panel and two compact calendars.
 *
 * @attr {String} name - Form field name used during form submission.
 * @attr {Boolean} required - Requires both start and end dates to be selected.
 * @attr {Boolean} disabled - Disables interaction and closes the panel when active.
 * @attr {String} value - Serialized range value as ISO interval: `YYYY-MM-DD/YYYY-MM-DD`.
 * @attr {String} display-format - Button date text format. Default is `d MMM yy`.
 *
 * @prop {String} name - Form field name.
 * @prop {Boolean} required - Whether the field is required.
 * @prop {Boolean} disabled - Whether the control is disabled.
 * @prop {Date|null} startDate - Start date value.
 * @prop {Date|null} endDate - End date value.
 * @prop {String} value - Serialized range value as ISO interval: `YYYY-MM-DD/YYYY-MM-DD`.
 * @prop {String} displayFormat - Button date text format.
 *
 * @fires range-change - Fired whenever range selection changes.
 * @fires change - Native-like change event fired alongside `range-change`.
 *
 * @csspart trigger - The button used to open/close the date range panel.
 * @csspart panel - The dropdown panel containing calendars and actions.
 *
 * @example
 * <pds-daterange
 *   name="travelPeriod"
 *   value="2026-03-10/2026-03-18"
 *   required
 * ></pds-daterange>
 *
 * @example
 * <form>
 *   <pds-daterange name="bookingDates" value="2026-03-10/2026-03-18"></pds-daterange>
 *   <button type="submit">Submit</button>
 * </form>
 */
class PdsDateRange extends HTMLElement {
  #startDate;
  #endDate;
  #internals;
  #initialValue;
  #stylesApplied;
  #eventsBound;
  #syncingValueAttribute;
  #outsideClickHandler;

  static formAssociated = true;

  static get observedAttributes() {
    return ["name", "required", "disabled", "value", "display-format"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.#startDate = null;
    this.#endDate = null;
    this.#initialValue = "";
    this.#stylesApplied = false;
    this.#eventsBound = false;
    this.#syncingValueAttribute = false;
    this.#outsideClickHandler = this.handleOutsideClick.bind(this);

    this.#internals = this.attachInternals?.() ?? null;
  }

  async connectedCallback() {
    if (!this.#stylesApplied) {
      const componentStyles = PDS.createStylesheet(
        `
:host {
  display: block;
}

.daterange {
  position: relative;
  display: inline-block;
}

.trigger {
  min-width: 16rem;
  justify-content: flex-start;
}

.panel {
  position: absolute;
  top: calc(100% + var(--spacing-2));
  left: 0;
  z-index: var(--z-dropdown, 1050);
  min-width: max-content;
}

.panel[hidden] {
  display: none;
}

.calendars {
  display: grid;
  grid-template-columns: repeat(2, max-content);
  gap: var(--spacing-3);
}

.calendars pds-calendar {
  --shadow: none;
}

.status {
  margin-top: var(--spacing-2);
  color: var(--surface-text-secondary);
  font-size: var(--font-size-sm);
}

.actions {
  margin-top: var(--spacing-2);
  display: flex;
  justify-content: flex-end;
}
        `
      );

      await PDS.adoptLayers(
        this.shadowRoot,
        ["primitives", "components", "utilities"],
        [componentStyles]
      );

      this.#stylesApplied = true;
    }

    this.render();
    await this.ensureCalendarsReady();

    this.#initialValue = this.getAttribute("value") || "";
    if (this.#initialValue) this.value = this.#initialValue;
    else this.positionCalendars();

    this.bindEvents();
    this.syncUI();
    this.updateFormState();
  }

  async ensureCalendarsReady() {
    if (typeof customElements !== "undefined") {
      await customElements.whenDefined("pds-calendar");
    }

    this.leftCalendar = this.shadowRoot?.querySelector("#left-calendar") || this.leftCalendar;
    this.rightCalendar = this.shadowRoot?.querySelector("#right-calendar") || this.rightCalendar;
  }

  setCalendarDate(calendar, value) {
    if (!calendar || !(value instanceof Date) || Number.isNaN(value.getTime())) return;

    const serialized = this.serializeDate(value);
    if (serialized) {
      calendar.setAttribute("date", serialized);
    }
    calendar.date = value;
  }

  disconnectedCallback() {
    document.removeEventListener("pointerdown", this.#outsideClickHandler, true);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    if (!this.shadowRoot) return;

    if (name === "value") {
      if (this.#syncingValueAttribute) return;
      this.value = newValue || "";
      return;
    }

    if (name === "disabled") {
      this.applyDisabledState();
    }

    if (name === "display-format") {
      this.syncUI();
    }

    this.updateFormState();
  }

  get form() {
    return this.#internals?.form ?? null;
  }

  get name() {
    return this.getAttribute("name") || "";
  }

  set name(value) {
    if (value == null || value === "") {
      this.removeAttribute("name");
      return;
    }
    this.setAttribute("name", value);
  }

  get required() {
    return this.hasAttribute("required");
  }

  set required(value) {
    this.toggleAttribute("required", Boolean(value));
    this.updateFormState();
  }

  get disabled() {
    return this.hasAttribute("disabled");
  }

  set disabled(value) {
    this.toggleAttribute("disabled", Boolean(value));
    this.applyDisabledState();
    this.updateFormState();
  }

  get displayFormat() {
    return this.getAttribute("display-format") || DEFAULT_DISPLAY_FORMAT;
  }

  set displayFormat(value) {
    if (value == null || String(value).trim() === "") {
      this.removeAttribute("display-format");
      this.syncUI();
      return;
    }
    this.setAttribute("display-format", String(value));
  }

  get startDate() {
    return this.#startDate ? new Date(this.#startDate) : null;
  }

  set startDate(value) {
    const parsed = this.parseDate(value);
    this.#startDate = parsed;

    if (this.#endDate && this.#startDate && this.#endDate < this.#startDate) {
      this.#endDate = null;
    }

    this.positionCalendars();
    this.syncUI();
    this.updateFormState();
  }

  get endDate() {
    return this.#endDate ? new Date(this.#endDate) : null;
  }

  set endDate(value) {
    const parsed = this.parseDate(value);
    this.#endDate = parsed;

    if (this.#startDate && this.#endDate && this.#endDate < this.#startDate) {
      this.#endDate = null;
    }

    this.positionCalendars();
    this.syncUI();
    this.updateFormState();
  }

  get value() {
    if (!this.#startDate || !this.#endDate) return "";
    return `${this.serializeDate(this.#startDate)}/${this.serializeDate(this.#endDate)}`;
  }

  set value(rawValue) {
    const parsed = this.parseRangeValue(rawValue);
    this.#startDate = parsed?.start ?? null;
    this.#endDate = parsed?.end ?? null;

    if (this.#endDate && this.#startDate && this.#endDate < this.#startDate) {
      this.#endDate = null;
    }

    this.positionCalendars();
    this.syncUI();
    this.updateFormState();
  }

  checkValidity() {
    this.updateFormState();
    return this.#internals?.checkValidity() ?? true;
  }

  reportValidity() {
    this.updateFormState();
    return this.#internals?.reportValidity() ?? true;
  }

  formAssociatedCallback() {
    this.updateFormState();
  }

  formDisabledCallback(disabled) {
    this.disabled = disabled;
  }

  formResetCallback() {
    this.value = this.#initialValue || "";
  }

  formStateRestoreCallback(state) {
    if (typeof state === "string") this.value = state;
    else this.value = "";
  }

  render() {
    this.shadowRoot.innerHTML = `
      <div class="daterange">
        <button type="button" class="trigger btn-outline" part="trigger" aria-haspopup="dialog" aria-expanded="false">${msg("When - Add dates")}</button>
        <section class="panel card surface-overlay" part="panel" hidden>
          <div class="calendars">
            <pds-calendar compact id="left-calendar"></pds-calendar>
            <pds-calendar compact id="right-calendar"></pds-calendar>
          </div>
          <p class="status text-muted" id="status-text"></p>
          <div class="actions">
            <button type="button" class="btn-secondary btn-sm" id="clear-btn">${msg("Clear")}</button>
          </div>
        </section>
      </div>
    `;

    this.triggerButton = this.shadowRoot.querySelector(".trigger");
    this.panel = this.shadowRoot.querySelector(".panel");
    this.leftCalendar = this.shadowRoot.querySelector("#left-calendar");
    this.rightCalendar = this.shadowRoot.querySelector("#right-calendar");
    this.statusText = this.shadowRoot.querySelector("#status-text");
    this.clearButton = this.shadowRoot.querySelector("#clear-btn");

    this.applyDisabledState();
  }

  bindEvents() {
    if (this.#eventsBound) return;
    this.#eventsBound = true;

    this.triggerButton?.addEventListener("click", () => {
      if (this.disabled) return;
      this.togglePanel();
    });

    this.clearButton?.addEventListener("click", () => {
      this.#startDate = null;
      this.#endDate = null;
      this.syncUI();
      this.refreshHighlights();
      this.updateFormState();
      this.dispatchRangeChange();
    });

    this.shadowRoot?.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      this.closePanel();
      this.triggerButton?.focus();
    });

    document.addEventListener("pointerdown", this.#outsideClickHandler, true);

    this.bindCalendar(this.leftCalendar, "left");
    this.bindCalendar(this.rightCalendar, "right");
  }

  bindCalendar(calendar, side) {
    if (!calendar || calendar.dataset.rangeBound) return;
    calendar.dataset.rangeBound = "true";

    calendar.addEventListener("month-change", () => this.enforceMinimumGap(side));
    calendar.addEventListener("month-rendered", (event) => {
      this.enforceMinimumGap(side);
      const { year, month } = event.detail;
      event.detail.fill(this.buildRangeEventsForMonth(year, month));
    });

    const bindSelection = () => {
      calendar.shadowRoot?.addEventListener("change", (event) => {
        const radio = event.target?.closest?.(".day-radio-input[data-day]");
        if (!radio) return;

        const day = Number.parseInt(radio.dataset.day || "", 10);
        if (!Number.isInteger(day)) return;

        const picked = this.toDayStart(new Date(calendar.year, calendar.month, day));
        this.applyRangeSelection(picked);
      });
    };

    if (calendar.shadowRoot) bindSelection();
    else queueMicrotask(bindSelection);
  }

  handleOutsideClick(event) {
    if (!this.isConnected || !this.isOpen()) return;
    if (event.composedPath().includes(this)) return;
    this.closePanel();
  }

  togglePanel() {
    if (this.isOpen()) this.closePanel();
    else this.openPanel();
  }

  openPanel() {
    if (!this.panel) return;
    this.panel.hidden = false;
    this.triggerButton?.setAttribute("aria-expanded", "true");
  }

  closePanel() {
    if (!this.panel) return;
    this.panel.hidden = true;
    this.triggerButton?.setAttribute("aria-expanded", "false");
  }

  isOpen() {
    return Boolean(this.panel && !this.panel.hidden);
  }

  toDayStart(value) {
    return new Date(value.getFullYear(), value.getMonth(), value.getDate());
  }

  toMonthStart(value) {
    return new Date(value.getFullYear(), value.getMonth(), 1);
  }

  addMonths(value, monthDelta) {
    return new Date(value.getFullYear(), value.getMonth() + monthDelta, 1);
  }

  parseDate(value) {
    if (value == null || value === "") return null;
    const parsed = value instanceof Date ? new Date(value) : new Date(value);
    if (Number.isNaN(parsed.getTime())) return null;
    return this.toDayStart(parsed);
  }

  serializeDate(value) {
    if (!(value instanceof Date) || Number.isNaN(value.getTime())) return "";
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  parseRangeValue(rawValue) {
    if (typeof rawValue !== "string") return null;
    const match = rawValue.trim().match(/^(\d{4}-\d{2}-\d{2})\/(\d{4}-\d{2}-\d{2})$/);
    if (!match) return null;

    const start = this.parseDate(match[1]);
    const end = this.parseDate(match[2]);
    if (!start || !end) return null;

    return { start, end };
  }

  isRangeComplete() {
    return (
      this.#startDate instanceof Date
      && !Number.isNaN(this.#startDate.getTime())
      && this.#endDate instanceof Date
      && !Number.isNaN(this.#endDate.getTime())
      && this.#endDate >= this.#startDate
    );
  }

  formatDisplayDate(value) {
    if (!(value instanceof Date) || Number.isNaN(value.getTime())) return "";

    const scopedLang =
      this.getAttribute("lang")
      || this.closest("[lang]")?.getAttribute("lang")
      || document.documentElement?.getAttribute("lang")
      || navigator.language
      || "en";

    const preset = (this.displayFormat || DEFAULT_DISPLAY_FORMAT).trim();
    const presetOptions = {
      "d MMM yy": { day: "numeric", month: "short", year: "2-digit" },
      "d MMM yyyy": { day: "numeric", month: "short", year: "numeric" },
      "dd MMM yy": { day: "2-digit", month: "short", year: "2-digit" },
      "short": { dateStyle: "short" },
      "medium": { dateStyle: "medium" },
      "long": { dateStyle: "long" },
      "full": { dateStyle: "full" },
    };

    const options = presetOptions[preset] || presetOptions[DEFAULT_DISPLAY_FORMAT];
    return new Intl.DateTimeFormat(scopedLang, options).format(value);
  }

  buildRangeEventsForMonth(year, month) {
    if (!this.isRangeComplete()) return {};

    const map = {};
    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month + 1, 0);
    const rangeStart = this.toDayStart(this.#startDate);
    const rangeEnd = this.toDayStart(this.#endDate);

    const visibleStart = rangeStart > monthStart ? rangeStart : monthStart;
    const visibleEnd = rangeEnd < monthEnd ? rangeEnd : monthEnd;
    if (visibleStart > visibleEnd) return map;

    for (
      let cursor = new Date(visibleStart.getFullYear(), visibleStart.getMonth(), visibleStart.getDate());
      cursor <= visibleEnd;
      cursor.setDate(cursor.getDate() + 1)
    ) {
      const day = cursor.getDate();
      const isStart = cursor.getTime() === rangeStart.getTime();
      const isEnd = cursor.getTime() === rangeEnd.getTime();
      map[day] = [{
        title: isStart ? msg("Departure") : isEnd ? msg("Return") : msg("Travel day"),
        type: isStart || isEnd ? "primary" : "info"
      }];
    }

    return map;
  }

  applyRangeSelection(pickedDate) {
    if (this.#startDate && this.#endDate) {
      this.#startDate = pickedDate;
      this.#endDate = null;
    } else if (!this.#startDate) {
      this.#startDate = pickedDate;
    } else if (pickedDate < this.#startDate) {
      this.#startDate = pickedDate;
      this.#endDate = null;
    } else {
      this.#endDate = pickedDate;
    }

    this.syncUI();
    this.refreshHighlights();
    this.updateFormState();
    this.dispatchRangeChange();

    if (this.isRangeComplete()) {
      this.closePanel();
    }
  }

  enforceMinimumGap() {
    if (!this.leftCalendar || !this.rightCalendar) return;
    if (!Number.isInteger(this.leftCalendar.year) || !Number.isInteger(this.leftCalendar.month)) return;
    if (!Number.isInteger(this.rightCalendar.year) || !Number.isInteger(this.rightCalendar.month)) return;

    const leftMonth = this.toMonthStart(new Date(this.leftCalendar.year, this.leftCalendar.month, 1));
    const rightMonth = this.toMonthStart(new Date(this.rightCalendar.year, this.rightCalendar.month, 1));
    const minimumRight = this.addMonths(leftMonth, 1);
    if (rightMonth < minimumRight) {
      this.setCalendarDate(this.rightCalendar, minimumRight);
    }
  }

  positionCalendars() {
    if (!this.leftCalendar || !this.rightCalendar) return;

    const baseMonth = this.#startDate
      ? this.toMonthStart(this.#startDate)
      : this.toMonthStart(new Date());

    this.setCalendarDate(this.leftCalendar, baseMonth);

    const minimumRight = this.addMonths(baseMonth, 1);
    if (this.#endDate) {
      const endMonth = this.toMonthStart(this.#endDate);
      this.setCalendarDate(this.rightCalendar, endMonth < minimumRight ? minimumRight : endMonth);
    } else {
      this.setCalendarDate(this.rightCalendar, minimumRight);
    }
  }

  refreshHighlights() {
    this.leftCalendar?.refresh();
    this.rightCalendar?.refresh();
  }

  syncUI() {
    if (!this.triggerButton || !this.statusText) {
      this.triggerButton = this.triggerButton || this.shadowRoot?.querySelector(".trigger");
      this.statusText = this.statusText || this.shadowRoot?.querySelector("#status-text");
      if (!this.triggerButton || !this.statusText) {
        this.reflectValueAttribute();
        return;
      }
    }

    const complete = this.isRangeComplete();

    if (complete) {
      this.triggerButton.textContent = `${this.formatDisplayDate(this.#startDate)} - ${this.formatDisplayDate(this.#endDate)}`;
      const oneDayMs = 24 * 60 * 60 * 1000;
      const nights = Math.round((this.toDayStart(this.#endDate) - this.toDayStart(this.#startDate)) / oneDayMs);
      this.statusText.textContent =
        nights === 1
          ? msg(str`${nights} night selected`)
          : msg(str`${nights} nights selected`);
    } else if (this.#startDate) {
      this.triggerButton.textContent = `${this.formatDisplayDate(this.#startDate)} - -`;
      this.statusText.textContent = msg("Select checkout date");
    } else {
      this.triggerButton.textContent = "- - -";
      this.statusText.textContent = msg("Select check-in and checkout dates");
    }

    this.reflectValueAttribute();
  }

  reflectValueAttribute() {
    const nextValue = this.value;
    this.#syncingValueAttribute = true;
    if (nextValue) this.setAttribute("value", nextValue);
    else this.removeAttribute("value");
    this.#syncingValueAttribute = false;
  }

  applyDisabledState() {
    const disabled = this.disabled;
    if (this.triggerButton) this.triggerButton.disabled = disabled;
    if (this.clearButton) this.clearButton.disabled = disabled;
    if (this.leftCalendar) this.leftCalendar.disabled = disabled;
    if (this.rightCalendar) this.rightCalendar.disabled = disabled;
    if (disabled) this.closePanel();
  }

  updateFormState() {
    if (!this.#internals) return;

    const fieldValue = this.value;

    if (!this.name || this.disabled) {
      this.#internals.setFormValue(null);
      this.#internals.setValidity({});
      return;
    }

    this.#internals.setFormValue(fieldValue);

    if (this.required && !fieldValue) {
      this.#internals.setValidity(
        { valueMissing: true },
        msg("Please select a start and end date."),
        this.triggerButton
      );
      return;
    }

    this.#internals.setValidity({});
  }

  dispatchRangeChange() {
    this.dispatchEvent(
      new CustomEvent("range-change", {
        detail: {
          startDate: this.startDate,
          endDate: this.endDate,
          value: this.value,
          complete: this.isRangeComplete(),
        },
        bubbles: true,
        composed: true,
      })
    );

    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
  }
}

customElements.define("pds-daterange", PdsDateRange);
