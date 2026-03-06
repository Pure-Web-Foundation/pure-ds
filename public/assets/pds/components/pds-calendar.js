import { PDS, msg, str } from "#pds";

function parseHTML(html) {
  return new DOMParser().parseFromString(html, "text/html").body.childNodes;
}
/**
 * Simple class for efficient HTML string building
 * @private
 */
export class HTMLBuilder {
  #lines = [];
  #container = "";

  /**
   * Constructor
   * @param {String} container - use '{html}' for the built-up string to be placed in
   */
  constructor(container = "{html}") {
    this.#container = container;
  }

  /**
   * Adds a string to the builder
   * @param {String} htmlPart
   */
  add(htmlPart) {
    this.#lines.push(htmlPart);
  }

  /**
   * Returns the built-up string, optionally using the given container for enclosing.
   * @returns {String} html string
   */
  toHTML() {
    const html = this.#lines.join("");

    if (this.#container.length) return this.#container.replace("{html}", html);

    return html;
  }
}

/**
 * Helper class for date operations
 * @private
 */
class DateHelper {
  #locale;

  constructor(locale = "en-US") {
    this.#locale = locale;
  }

  parseDate(dateString) {
    if (typeof dateString === "string") {
      const trimmed = dateString.trim();
      const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
      if (dateOnly) {
        const [, year, month, day] = dateOnly;
        return new Date(Number(year), Number(month) - 1, Number(day));
      }
    }
    const timestamp = Date.parse(dateString);
    return new Date(timestamp);
  }

  getMonthNames() {
    return Array.from({ length: 12 }, (_, i) => {
      return new Date(0, i).toLocaleString(this.#locale, { month: "long" });
    });
  }

  getDayNames(format = "long") {
    return Array.from({ length: 7 }, (_, i) => {
      // Create a new Date object for each day of the week, starting from Sunday
      const date = new Date(Date.UTC(2024, 0, i + 15));
      return new Intl.DateTimeFormat(this.#locale, { weekday: format }).format(
        date
      );
    });
  }
}

/**
 * @component pds-calendar
 * @description A fully featured calendar component with month navigation, event display, and keyboard-friendly date selection
 *
 * @fires pds-calendar#month-rendered - Dispatched after the calendar month is rendered with event fill capability
 * @fires pds-calendar#month-change - Dispatched when the visible month/year changes
 *
 * @attr {String} date - The date to display (defaults to current date). Accepts any valid date string
 *
 * @prop {Date} date - Gets or sets the current date being displayed
 *
 * @example
 * <caption>Basic calendar</caption>
 * <pds-calendar></pds-calendar>
 *
 * @example
 * <caption>Calendar with specific date</caption>
 * <pds-calendar date="2024-12-25"></pds-calendar>
 *
 * @example
 * <caption>Calendar with event handling</caption>
 * <pds-calendar id="my-calendar"></pds-calendar>
 * <script>
 *   const calendar = document.getElementById('my-calendar');
 *   calendar.addEventListener('month-rendered', (e) => {
 *     e.detail.fill({
 *       '15': [
 *         { title: 'Team Meeting', type: 'primary' },
 *         { title: 'Code Review', type: 'info' }
 *       ],
 *       '20': [
 *         { title: 'Project Deadline', type: 'danger' }
 *       ]
 *     });
 *   });
 * </script>
 *
 * @example
 * <caption>Event types and styling</caption>
 * // Event objects support the following types:
 * // - 'primary' (blue)
 * // - 'info' (light blue)
 * // - 'warning' (yellow)
 * // - 'danger' (red)
 * {
 *   title: 'Event Title',
 *   type: 'primary' // optional, defaults to 'info'
 * }
 *
 * @cssprop --surface-bg - Calendar background color
 * @cssprop --surface-border - Border color for calendar elements
 * @cssprop --surface-text-secondary - Secondary text color
 * @cssprop --color-primary-500 - Primary color for events and highlights
 * @cssprop --color-warning-500 - Warning event color
 * @cssprop --color-danger-500 - Danger event color
 * @cssprop --color-info-500 - Info event color
 *
 * @csspart calendar-container - The main container for the calendar
 * @csspart calendar-header - The header containing month name and navigation
 * @csspart calendar - The grid container for the calendar days
 * @csspart day - Individual day cells
 * @csspart task - Event items within days
 */
class PdsCalendar extends HTMLElement {
    #date;
    #dayNames;
    #monthNames;
    #internals;
    #initialDate;

    static formAssociated = true;

    static get observedAttributes() {
      return ["date", "required", "name", "disabled", "compact"];
    }

    constructor() {
      super();
      this.#date = new Date();
      this.#initialDate = "";

      this.dateHelper = new DateHelper();
      this.#dayNames = this.dateHelper.getDayNames();
      this.#monthNames = this.dateHelper.getMonthNames();

      this.#internals = this.attachInternals?.() ?? null;

      this.attachShadow({ mode: "open" });

      this.reRender();
    }

    /**
     * Called when observed attributes change
     * @param {String} name - Attribute name
     * @param {String} oldValue - Previous value
     * @param {String} newValue - New value
     */
    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue === newValue) return;

      if (name === "date") {
        this.date = newValue;
        return;
      }

      if (name === "compact") {
        this.reRender();
      }

      if (name === "disabled") {
        this.toggleAttribute("aria-disabled", this.disabled);
      }

      this.updateFormState();
    }

    /**
     * Sets the current date for the calendar
     * @param {String|Date} value - Date string or Date object
     */
    set date(value) {
      if (value == null || value === "") {
        this.#date = new Date(Number.NaN);
        this.updateFormState();
        if (this.isRendered) this.reRender();
        return;
      }

      this.#date =
        typeof value === "string"
          ? this.dateHelper.parseDate(value)
          : new Date(value);

      this.updateFormState();

      if (this.isRendered) this.reRender();
    }

    /**
     * Gets the current date
     * @returns {Date} The current date object
     */
    get date() {
      return this.#date;
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

    get type() {
      return "pds-calendar";
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

    get compact() {
      return this.hasAttribute("compact");
    }

    set compact(value) {
      this.toggleAttribute("compact", Boolean(value));
    }

    get value() {
      return this.serializeDate();
    }

    set value(value) {
      if (value == null || value === "") {
        this.#date = new Date(Number.NaN);
        this.updateFormState();
        this.reRender();
        return;
      }

      this.date = value;
    }

    async connectedCallback() {
      const componentStyles = PDS.createStylesheet(
        /*css*/
        `
.calendar {
  display: grid;
  width: 100%;
  min-height: 400px;
  grid-template-columns: repeat(7, minmax(50px, 1fr));
  grid-template-rows: 50px;
  grid-auto-rows: 60px;
  overflow: auto;
  position: relative;
}

.calendar.compact {
  width: max-content;
  min-height: auto;
  grid-template-columns: repeat(7, var(--calendar-compact-cell-size, 2.25rem));
  grid-template-rows: var(--calendar-compact-cell-size, 2.25rem);
  grid-auto-rows: var(--calendar-compact-cell-size, 2.25rem);
  overflow: hidden;
}

.calendar-container {
  background-color: var(--surface-bg);
  margin: auto;
  overflow: visible;
  box-shadow: var(--shadow, var(--shadow-lg));
  border-radius: var(--radius-lg);
  position: relative;
}

.calendar-container.compact {
  width: max-content;
  margin: 0;
}

.calendar-header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;

  padding: var(--spacing-4) var(--spacing-4);
  border-bottom: var(--border-width-thin) solid var(--surface-border);

  .month-name {
    margin: 0;
    font-size: var(--font-size-lg);
  }

  .prev {
    justify-self: start;
  }

  .next {
    justify-self: end;
  }
}

.day-name {
  text-align: center;
  font-size: var(--font-size-sm);
}

.current-month {
  cursor: pointer;
  text-align: center;
  font-size: var(--font-size-xs);
  h3,
  h3 {
    margin: 0;
  }
}

.year {
  margin: var(--spacing-1) 0 0 0;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
}

.day {
  border-bottom: var(--border-width-thin) solid var(--surface-base-border);
  border-right: var(--border-width-thin) solid var(--surface-base-border);
  padding: var(--spacing-1);
  font-size: var(--font-size-xs);
  box-sizing: border-box;
  color: var(--surface-text-secondary);
  position: relative;
  pointer-events: all;
  z-index: 1;
  overflow: hidden;

  &:nth-of-type(7n + 7) {
    border-right: 0;
  }

  &:nth-of-type(n + 1):nth-of-type(-n + 7) {
    grid-row: 2;
  }

  &:nth-of-type(n + 8):nth-of-type(-n + 14) {
    grid-row: 3;
  }

  &:nth-of-type(n + 15):nth-of-type(-n + 21) {
    grid-row: 4;
  }

  &:nth-of-type(n + 22):nth-of-type(-n + 28) {
    grid-row: 5;
  }

  &:nth-of-type(n + 29):nth-of-type(-n + 35) {
    grid-row: 6;
  }

  &:nth-of-type(7n + 1) {
    grid-column: 1/1;
  }

  &:nth-of-type(7n + 2) {
    grid-column: 2/2;
  }

  &:nth-of-type(7n + 3) {
    grid-column: 3/3;
  }

  &:nth-of-type(7n + 4) {
    grid-column: 4/4;
  }

  &:nth-of-type(7n + 5) {
    grid-column: 5/5;
  }

  &:nth-of-type(7n + 6) {
    grid-column: 6/6;
  }

  &:nth-of-type(7n + 7) {
    grid-column: 7/7;
  }

  .nr {
    position: absolute;
    top: var(--spacing-1);
    right: var(--spacing-1);
    z-index: 2;
  }

  &.has-events {
    cursor: pointer;
    .nr {
      font-weight: var(--font-weight-bold);
      color: var(--color-primary-500);
    }
  }
}

.calendar.compact .day {
  min-height: 0;
  width: var(--calendar-compact-cell-size, 2.25rem);
  height: var(--calendar-compact-cell-size, 2.25rem);
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.calendar.compact .day .nr {
  position: static;
  font-size: var(--font-size-xs);
  line-height: 1;
}

.calendar.compact .day.day-radio {
  position: relative;
}

.day.day-radio {
  position: relative;
}

.calendar.compact .day-radio-input {
  position: absolute;
  inset: 0;
  opacity: 0;
  margin: 0;
  cursor: pointer;
}

.day-radio-input {
  position: absolute;
  inset: 0;
  opacity: 0;
  margin: 0;
  cursor: pointer;
}

.day.day-radio[data-day]:has(.day-radio-input:focus-visible) {
  outline: var(--border-width-medium) solid var(--color-secondary-500);
  outline-offset: -2px;
}

.day.day-radio[data-day]:has(.day-radio-input:focus) {
  outline: var(--border-width-medium) solid var(--color-secondary-500);
  outline-offset: -2px;
}

.calendar.compact .day-radio-input:checked + .nr {
  font-weight: var(--font-weight-bold);
  color: var(--color-accent-700);
}

.calendar.compact .task {
  display: none !important;
}

.calendar.compact .day-name {
  width: var(--calendar-compact-cell-size, 2.25rem);
  height: var(--calendar-compact-cell-size, 2.25rem);
  line-height: 1;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-xs);
}

.day.day-selected .nr {
  font-weight: var(--font-weight-bold);
  color: var(--color-accent-700);
}

.calendar.compact .day.has-events .nr {
  font-weight: var(--font-weight-bold);
}

.calendar.compact .day.has-events.event-primary .nr {
  color: var(--color-primary-500);
}

.calendar.compact .day.has-events.event-info .nr {
  color: var(--color-info-500);
}

.calendar.compact .day.has-events.event-warning .nr {
  color: var(--color-warning-500);
}

.calendar.compact .day.has-events.event-danger .nr {
  color: var(--color-danger-500);
}

.day-disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

.day-name {
    font-size: var(--font-size-xs);
    text-transform: uppercase;
    color: var(--surface-text-secondary);
    text-align: center;
    border-bottom: var(--border-width-thin) solid var(--surface-border);
    line-height: 50px;
    font-weight: var(--font-weight-medium);
  }


.day-today {
    border: var(--border-width-thick) solid var(--color-primary-500) !important;
  }


  
.task {
  border-left-width: var(--border-width-thick);
  padding: var(--spacing-1) var(--spacing-2);
  border-left-style: solid;
  font-size: var(--font-size-sm);
  position: relative;
  margin-bottom: var(--spacing-1);
  background: var(--surface-hover);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}

label {
  cursor: pointer;
}

.task--warning {
  border-left-color: var(--color-warning-500);
}

.task--danger {
  border-left-color: var(--color-danger-500);
}

.task--info {
  border-left-color: var(--color-info-500);
}

.task--primary {
  border-left-color: var(--color-primary-500);
}

.task__detail {
  color: var(--surface-text);
  box-sizing: border-box;
  z-index: 2;

  h3 {
    font-weight: var(--font-weight-normal);
    font-size: var(--font-size-xs);
    margin: 0;

    &:hover {
      + p {
        display: block;
      }
    }
  }

  p {
    display: none;
    margin-top: var(--spacing-1);
    font-size: var(--font-size-xs);
    margin-bottom: 0;
    font-weight: var(--font-weight-medium);
  }
}

      `
      );

      // Adopt primitives (buttons), components (.callout classes), and toaster-specific styles
      await PDS.adoptLayers(
        this.shadowRoot,
        ["primitives", "components", "utilities"],
        [componentStyles]
      );

      queueMicrotask(() => {
        const initialAttrDate = this.getAttribute("date");
        if (initialAttrDate != null) {
          const parsedInitialDate = this.dateHelper.parseDate(initialAttrDate);
          if (
            parsedInitialDate instanceof Date
            && !Number.isNaN(parsedInitialDate.getTime())
          ) {
            const year = parsedInitialDate.getFullYear();
            const month = String(parsedInitialDate.getMonth() + 1).padStart(2, "0");
            const day = String(parsedInitialDate.getDate()).padStart(2, "0");
            this.#initialDate = `${year}-${month}-${day}`;
          } else {
            this.#initialDate = "";
          }
        } else if (!this.#initialDate) {
          this.#initialDate = this.serializeDate();
        }
        this.setupPaging();
        this.updateFormState();
      });
    }

    formAssociatedCallback() {
      this.updateFormState();
    }

    formDisabledCallback(disabled) {
      this.disabled = disabled;
      this.updateFormState();
    }

    formResetCallback() {
      const defaultDate = this.getAttribute("date");
      if (defaultDate != null && defaultDate !== "") {
        this.date = defaultDate;
      } else if (this.#initialDate) {
        this.date = this.#initialDate;
      } else {
        this.#date = new Date(Number.NaN);
      }
      this.updateFormState();
      this.reRender();
    }

    formStateRestoreCallback(state) {
      if (typeof state === "string") {
        this.value = state;
      } else if (state == null) {
        this.value = "";
      }
      this.updateFormState();
      this.reRender();
    }

    checkValidity() {
      if (!this.#internals) return true;
      this.updateFormState();
      return this.#internals.checkValidity();
    }

    reportValidity() {
      if (!this.#internals) return true;
      this.updateFormState();
      return this.#internals.reportValidity();
    }

    focus(options) {
      const focusTarget =
        this.shadowRoot?.querySelector('.day-radio-input:checked') ||
        this.shadowRoot?.querySelector('.day-radio-input') ||
        this.shadowRoot?.querySelector("button.prev");

      if (focusTarget) {
        focusTarget.focus?.(options);
      }
    }

    serializeDate() {
      if (!(this.#date instanceof Date) || Number.isNaN(this.#date.getTime())) {
        return "";
      }

      const year = this.#date.getFullYear();
      const month = String(this.#date.getMonth() + 1).padStart(2, "0");
      const day = String(this.#date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    }

    updateFormState() {
      if (!this.#internals) return;

      if (!this.name || this.disabled) {
        this.#internals.setFormValue(null);
        this.#internals.setValidity({});
        return;
      }

      const value = this.serializeDate();
      this.#internals.setFormValue(value);

      if (this.required && !value) {
        const validationAnchor =
          this.shadowRoot?.querySelector('.day-radio-input:checked') ||
          this.shadowRoot?.querySelector('.day-radio-input') ||
          this.shadowRoot?.querySelector("button.prev");
        this.#internals.setValidity(
          { valueMissing: true },
          msg("Please select a date."),
          validationAnchor
        );
        return;
      }

      this.#internals.setValidity({});
    }

    /**
     * Attaches one or more event listeners with optional event delegation
     * @param {String} eventNames - name(s) of the event to listen to, space-separated
     * @param {Function|Object} funcOrObject - function, or object with selectors as keys and functions as values
     * @private
     */
    on(eventNames, funcOrObject) {
      eventNames.split(" ").forEach((eventName) => {
        if (typeof funcOrObject === "function")
          this.addEventListener(eventName, funcOrObject);
        else {
          this.addEventListener(eventName, (e) => {
            // Walk up the composed path to find matching elements
            const path = e.composedPath();

            Object.keys(funcOrObject).forEach((selector) => {
              // Check each element in the path for a match
              for (const element of path) {
                if (element.matches && element.matches(selector)) {
                  funcOrObject[selector].apply(this, [e]);
                  break; // Stop after first match
                }
              }
            });
          });
        }
      });
    }

    /**
     * Renders the calendar HTML structure
     * @returns {String} HTML string for the calendar
     * @private
     */
    render() {
      const hasValidDate =
        this.#date instanceof Date && !Number.isNaN(this.#date.getTime());
      const displayDate = hasValidDate ? this.#date : new Date();

      this.month = displayDate.getMonth();
      this.year = displayDate.getFullYear();
      this.daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
      this.startDay = new Date(this.year, this.month, 0).getDay();
      const compactMode = this.compact;
      const calendarA11yAttrs = `role="radiogroup" aria-label="${msg("Select a day")}"`;

      const calendarHtml = /*html*/ `
        <div class="calendar-container ${compactMode ? "compact" : ""}" part="calendar-container">
          <nav class="calendar-header" part="calendar-header">
            <button class="prev icon-only"><pds-icon icon="arrow-left" size="xs"></pds-icon></button>
            <div class="current-month">
              <h3 class="month-name">${this.#monthNames[this.month]}</h3>
              <h4 class="year">${this.year}</h4>
            </div>
            <button class="next icon-only"><pds-icon icon="arrow-right" size="xs"></pds-icon></button>
          </nav>

          <div class="calendar ${compactMode ? "compact" : ""}" part="calendar" ${calendarA11yAttrs}>
            ${this.getDayNamesHtml()}
            ${this.getDaysHtml()}
          </div>
        </div>
      `;

      clearTimeout(this.renderedTimeout);

      this.renderedTimeout = setTimeout(() => {
        this.dispatchRendered();
      }, 100);

      return calendarHtml;
    }

    /**
     * Marks the component as rendered
     * @private
     */
    rendered() {
      this.isRendered = true;
    }

    /**
     * Re-renders the calendar
     * @private
     */
    reRender() {
      const previousMonth = Number.isInteger(this.month) ? this.month : null;
      const previousYear = Number.isInteger(this.year) ? this.year : null;

      this.shadowRoot.innerHTML = this.render();
      this.isRendered = true;

      const monthChanged =
        Number.isInteger(previousMonth)
        && Number.isInteger(previousYear)
        && (previousMonth !== this.month || previousYear !== this.year);

      if (monthChanged) {
        this.dispatchEvent(
          new CustomEvent("month-change", {
            detail: {
              date: this.date,
              year: this.year,
              month: this.month,
              previousYear,
              previousMonth,
            },
            bubbles: true,
            composed: true,
          })
        );
      }

      queueMicrotask(() => {
        this.setupInteractions();
      });
    }

    /**
     * Refreshes the calendar display
     * @public
     */
    refresh() {
      this.reRender();
    }

    /**
     * Sets up month navigation with accelerating paging on hold
     * @private
     */
    setupPaging() {
      const MIN_CHANGE_MS = 2,
        logGrowth = (x, base = 10, growthRate = 4) => {
          return Math.exp((Math.log(x) / Math.log(base)) * growthRate);
        };

      let timeout,
        timeoutMs = -1,
        timeoutChangeMs = 2,
        direction,
        activeKeyboardDirection = 0;

      const getPreferredDay = () => {
          const checkedRadio = this.shadowRoot?.querySelector('.day-radio-input:checked[data-day]');
          const checkedDay = Number.parseInt(checkedRadio?.dataset?.day || '', 10);
          if (Number.isInteger(checkedDay) && checkedDay > 0) return checkedDay;

          if (this.#date instanceof Date && !Number.isNaN(this.#date.getTime())) {
            return this.#date.getDate();
          }

          return 1;
        },
        stopKeyboardPaging = () => {
          if (!activeKeyboardDirection) return;
          activeKeyboardDirection = 0;
          stopMoveDate();
          window.removeEventListener("keyup", handleWindowKeyup, true);
          window.removeEventListener("blur", handleWindowBlur, true);
        },
        handleWindowKeyup = (event) => {
          if (event.key !== "PageUp" && event.key !== "PageDown") return;
          event.preventDefault();
          stopKeyboardPaging();
        },
        handleWindowBlur = () => {
          stopKeyboardPaging();
        };

      const moveDate = () => {
          const preferredDay = getPreferredDay();
          const currentDate =
            this.#date instanceof Date && !Number.isNaN(this.#date.getTime())
              ? this.#date
              : new Date(this.year, this.month, 1);

          const targetMonthDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + direction,
            1
          );
          const maxTargetDay = new Date(
            targetMonthDate.getFullYear(),
            targetMonthDate.getMonth() + 1,
            0
          ).getDate();
          const targetDay = Math.min(preferredDay, maxTargetDay);

          this.#date = new Date(
            targetMonthDate.getFullYear(),
            targetMonthDate.getMonth(),
            targetDay
          );
          this.updateFormState();
          this.reRender();
          queueMicrotask(() => {
            this.focusDayRadio(targetDay);
          });
        },
        moveDateRecursive = () => {
          moveDate();
          timeout = setTimeout(() => {
            moveDateRecursive();

            timeoutChangeMs = logGrowth(timeoutChangeMs);
            timeoutMs -= timeoutChangeMs;
          }, timeoutMs);
        },
        startMoveDate = (newDirection) => {
          timeoutChangeMs = MIN_CHANGE_MS;
          direction = newDirection;
          timeoutMs = 200;
          timeout = setTimeout(() => {
            moveDateRecursive();
          }, timeoutMs);
        },
        stopMoveDate = () => {
          if (timeoutChangeMs === MIN_CHANGE_MS) {
            moveDate();
          }
          clearTimeout(timeout);
          timeoutMs = -1;
          timeout = null;
        };

      this.on("mousedown touchstart", {
        ".next": (e) => {
          e.preventDefault();
          startMoveDate(1);
        },
        ".prev": (e) => {
          e.preventDefault();
          startMoveDate(-1);
        },
      });

      this.on("mouseup pointerup", {
        ".next, .prev": (e) => {
          e.preventDefault();
          stopMoveDate();
        },
      });

      this.shadowRoot.addEventListener("keydown", (event) => {
        if (event.key !== "PageUp" && event.key !== "PageDown") return;

        event.preventDefault();
        const nextDirection = event.key === "PageUp" ? -1 : 1;
        if (activeKeyboardDirection === nextDirection) return;

        activeKeyboardDirection = nextDirection;
        window.addEventListener("keyup", handleWindowKeyup, true);
        window.addEventListener("blur", handleWindowBlur, true);
        startMoveDate(nextDirection);
      });

      this.shadowRoot.addEventListener("keyup", (event) => {
        if (event.key !== "PageUp" && event.key !== "PageDown") return;

        event.preventDefault();
        stopKeyboardPaging();
      });

    }

    /**
     * Sets up day interactions and keyboard support
     * @private
     */
    setupInteractions() {
      if (this.interactionSetup) return;
      this.interactionSetup = true;

      this.shadowRoot.addEventListener("click", (event) => {
        const month = event.target.closest(".current-month");
        if (!month) return;
        this.date = Date.now();
        this.reRender();
      });

      this.shadowRoot.addEventListener('change', (event) => {
        const radio = event.target?.closest?.('.day-radio-input[data-day]');
        if (!radio) return;

        const selectedDay = Number.parseInt(radio.dataset.day, 10);
        if (Number.isInteger(selectedDay) && selectedDay > 0) {
          this.selectDay(selectedDay);
        }
      });

      this.shadowRoot.addEventListener('keydown', (event) => {
        const radio = event.target?.closest?.('.day-radio-input[data-day]');
        if (!radio) return;

        let dayDelta = 0;
        if (event.key === 'ArrowLeft') dayDelta = -1;
        if (event.key === 'ArrowRight') dayDelta = 1;
        if (event.key === 'ArrowUp') dayDelta = -7;
        if (event.key === 'ArrowDown') dayDelta = 7;
        if (!dayDelta) return;

        event.preventDefault();
        const currentDay = Number.parseInt(radio.dataset.day || '', 10);
        if (!Number.isInteger(currentDay)) return;
        this.moveSelectionByDays(currentDay, dayDelta);
      });
    }

    /**
     * Moves calendar selection by a relative day offset, crossing month boundaries when needed.
     * @param {number} currentDay
     * @param {number} dayDelta
     * @private
     */
    moveSelectionByDays(currentDay, dayDelta) {
      const targetDate = new Date(this.year, this.month, currentDay + dayDelta);
      if (Number.isNaN(targetDate.getTime())) return;

      const targetDay = targetDate.getDate();
      const sameRenderedMonth =
        targetDate.getMonth() === this.month && targetDate.getFullYear() === this.year;

      if (sameRenderedMonth) {
        this.selectDay(targetDay);
        this.focusDayRadio(targetDay);
        return;
      }

      this.#date = targetDate;
      this.updateFormState();
      this.reRender();
      queueMicrotask(() => {
        this.focusDayRadio(targetDay);
      });
    }

    /**
     * Selects a day inside the currently displayed month.
     * @param {number} dayNumber
     * @private
     */
    selectDay(dayNumber) {
      const nextDate = new Date(this.year, this.month, dayNumber);
      if (Number.isNaN(nextDate.getTime())) return;

      this.#date = nextDate;
      this.updateFormState();
      this.syncSelectedDayState(dayNumber);
    }

    /**
     * Updates selected classes/checked state in-place to preserve native radio keyboard flow.
     * @param {number} dayNumber
     * @private
     */
    syncSelectedDayState(dayNumber) {
      const dayCells = this.shadowRoot?.querySelectorAll('.day[data-day]') || [];
      dayCells.forEach((cell) => {
        const cellDay = Number.parseInt(cell.dataset.day || '', 10);
        const isSelected = Number.isInteger(cellDay) && cellDay === dayNumber;
        cell.classList.toggle('day-selected', isSelected);

        const radio = cell.querySelector('.day-radio-input');
        if (radio) {
          radio.checked = isSelected;
        }
      });
    }

    /**
     * Focuses a day radio by day number in the current month view.
     * @param {number} dayNumber
     * @private
     */
    focusDayRadio(dayNumber) {
      const target = this.shadowRoot?.querySelector(`.day-radio-input[data-day="${dayNumber}"]`);
      target?.focus();
    }

    /**
     * Dispatches the month-rendered event with fill capability
     * @fires pds-calendar#month-rendered
     * @private
     */
    dispatchRendered() {
      this.dispatchEvent(
        new CustomEvent("month-rendered", {
          detail: {
            date: this.date,
            year: this.year,
            month: this.month,
            fill: (data) => {
              if (!data) return;
              for (const day of Object.keys(data)) {
                const dayNumber = Number.parseInt(day, 10);
                if (!Number.isInteger(dayNumber) || dayNumber < 1) continue;

                const dayDiv = this.shadowRoot.querySelector(
                  `.day[data-day="${dayNumber}"]`
                );
                const list = data[day];
                if (dayDiv && Array.isArray(list)) {
                  dayDiv.classList.add("has-events");
                  const firstType = String(list[0]?.type || "info").toLowerCase();
                  dayDiv.classList.add(`event-${firstType}`);

                  if (this.compact) {
                    continue;
                  }

                  for (const item of list) {
                    const html = /*html*/ `<div class="task task--${
                      item.type || "info"
                    }" part="task">
                    <div class="task__detail">
                      <h3>
                        ${item.title}
                      </h3>
                      <p>
                        Test
                      </p>
                    </div>
                  </div>`;

                    dayDiv.appendChild(parseHTML(html)[0]);
                  }
                }
              }
            },
          },

          bubbles: true          
        })
      );
    }

    /**
     * Generates HTML for day name headers
     * @returns {String} HTML string for day names
     * @private
     */
    getDayNamesHtml() {
      const html = new HTMLBuilder();
      //let n = this.startDay;
      for (let i = 0; i <= 6; i++) {
        const dayName = this.#dayNames[i].substring(0, 3);
        html.add(/*html*/ `<span class="day-name">${dayName}</span>`);
      }
      return html.toHTML();
    }

    /**
     * Generates HTML for calendar day cells
     * @returns {String} HTML string for day cells
     * @private
     */
    getDaysHtml() {
      const html = new HTMLBuilder();
      const radioGroupName = `pds-calendar-day-${this.id || 'default'}-${this.year}-${this.month}`;
      const now = new Date();
      const todayDay = now.getDate();
      const todayMonth = now.getMonth();
      const todayYear = now.getFullYear();
      const isCurrentMonth =
        this.month === todayMonth && this.year === todayYear;
      const hasValidSelection =
        this.#date instanceof Date && !Number.isNaN(this.#date.getTime());
      const selectedDay = hasValidSelection ? this.#date.getDate() : -1;
      const selectedMonth = hasValidSelection ? this.#date.getMonth() : -1;
      const selectedYear = hasValidSelection ? this.#date.getFullYear() : -1;
      const isSelectedMonth =
        this.month === selectedMonth && this.year === selectedYear;

      for (let i = 0; i < this.startDay; i++) {
        html.add(
          /*html*/ `<label class="day day-disabled" part="day" aria-hidden="true"></label>`
        );
      }
      for (let i = 1; i <= this.daysInMonth; i++) {
        const isTodayClass =
          isCurrentMonth && i === todayDay ? "day-today" : "";
        const isSelectedClass =
          isSelectedMonth && i === selectedDay ? "day-selected" : "";
        const checked = isSelectedMonth && i === selectedDay ? 'checked' : '';
        const radioId = `${radioGroupName}-day-${i}`;
        html.add(/*html*/ `
        <label data-day="${i}" class="day day-radio ${isTodayClass} ${isSelectedClass}" part="day">
          <input
            id="${radioId}"
            class="day-radio-input"
            type="radio"
            name="${radioGroupName}"
            data-day="${i}"
            aria-label="${msg(str`Select ${this.#monthNames[this.month]} ${i}, ${this.year}`)}"
            ${checked}
          />
          <span class="nr">${i}</span>
        </label>`);
      }
      const endDay =
        6 - new Date(this.year, this.month, this.daysInMonth).getDay();
      for (let i = 1; i <= endDay; i++) {
        html.add(
          /*html*/ `<label class="day day-disabled" part="day" aria-hidden="true"></label>`
        );
      }
      return html.toHTML();
    }
  }

customElements.define("pds-calendar", PdsCalendar);
