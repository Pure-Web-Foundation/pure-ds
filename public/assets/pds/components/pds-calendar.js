function parseHTML(html) {
  return new DOMParser().parseFromString(html, "text/html").body.childNodes;
}

const PDS = window.PDS;
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
 * @description A fully featured calendar component with month navigation, event display, and expandable day views
 *
 * @fires pds-calendar#month-rendered - Dispatched after the calendar month is rendered with event fill capability
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

    static get observedAttributes() {
      return ["date"];
    }

    constructor() {
      super();
      this.#date = new Date();

      this.dateHelper = new DateHelper();
      this.#dayNames = this.dateHelper.getDayNames();
      this.#monthNames = this.dateHelper.getMonthNames();

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
      if (name === "date") {
        this.date = newValue;
        this.reRender();
      }
    }

    /**
     * Sets the current date for the calendar
     * @param {String|Date} value - Date string or Date object
     */
    set date(value) {
      this.#date =
        typeof value === "string"
          ? this.dateHelper.parseDate(value)
          : new Date(value);

      if (this.isRendered) this.reRender();
    }

    /**
     * Gets the current date
     * @returns {Date} The current date object
     */
    get date() {
      return this.#date;
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

.calendar-container {
  background-color: var(--surface-bg);
  margin: auto;
  overflow: visible;
  box-shadow: var(--shadow-lg);
  border-radius: var(--radius-lg);
  position: relative;
}

.calendar-header {
  display: grid;
  grid-template-columns: auto 1fr auto;

  padding: var(--spacing-5) 0;
  border-bottom: var(--border-width-thin) solid var(--surface-border);

  .month-name {
    margin: 0;
    font-size: var(--font-size-lg);
  }
}

button.btn-xs {
  min-height: 0 !important;
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
  pointer-events: none;
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
    pointer-events: all;
    .nr {
      font-weight: var(--font-weight-bold);
      color: var(--color-primary-500);
    }
  }
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

/* Day expansion styles */
.calendar.day-expanded {
  .day-name {
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s;
  }
  
  .day:not(.expanded-cell) {
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s;
  }
}

.day.has-events {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.expanded-cell {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  width: auto !important;
  height: auto !important;
  grid-column: unset !important;
  grid-row: unset !important;
  z-index: 1000 !important;
  background: var(--surface-bg) !important;
  padding: 2rem !important;
  overflow-y: auto !important;
  border: none !important;
  cursor: pointer !important;
  
  .nr {
    font-size: var(--font-size-2xl) !important;
    font-weight: var(--font-weight-bold) !important;
  }
  
  .task {
    font-size: var(--font-size-base) !important;
    padding: var(--spacing-4) !important;
    margin-bottom: var(--spacing-3) !important;
    
    h3 {
      font-size: var(--font-size-lg) !important;
    }
  }
}



      `
      );

      // Adopt primitives (buttons), components (.alert classes), and toaster-specific styles
      await PDS.adoptLayers(
        this.shadowRoot,
        ["primitives", "components"],
        [componentStyles]
      );

      queueMicrotask(() => {
        this.setupPaging();
      });
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
      this.month = this.date.getMonth();
      this.year = this.date.getFullYear();
      this.daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
      this.startDay = new Date(this.year, this.month, 0).getDay();

      const calendarHtml = /*html*/ `
        <div class="calendar-container" part="calendar-container">
          <nav class="calendar-header" part="calendar-header">
            <button class="btn-outline prev btn-xs"><pds-icon icon="arrow-left" size="xs"></pds-icon></button>
            <div class="current-month">
              <h3 class="month-name">${this.#monthNames[this.month]}</h3>
              <h4 class="year">${this.year}</h4>
            </div>
            <button class="btn-outline next btn-xs"><pds-icon icon="arrow-right" size="xs"></pds-icon></button>
          </nav>

          <div class="calendar" part="calendar">
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
      this.shadowRoot.innerHTML = this.render();
      queueMicrotask(() => {
        this.setupDayExpansion();
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
        direction;

      const moveDate = () => {
          this.date.setMonth(this.date.getMonth() + direction);
          queueMicrotask(() => {
            this.reRender();
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
    }

    /**
     * Sets up day expansion functionality for viewing events
     * @private
     */
    setupDayExpansion() {
      if (this.expansionSetup) return; // Prevent multiple setups
      this.expansionSetup = true;

      let expandedDay = null;

      // Use direct event delegation on shadowRoot
      this.shadowRoot.addEventListener("click", async (e) => {
        const month = e.target.closest(".current-month");
        if (month) {
          this.date = Date.now();
          this.reRender();
          return;
        }

        const cell = e.target.closest(".day.has-events[data-day]");
        if (!cell) return;

        const day = cell.dataset.day;
        const calendar = this.shadowRoot.querySelector(".calendar");

        // Toggle if clicking same day
        if (expandedDay === day) {
          await this.collapseDay(calendar, cell);
          expandedDay = null;
        } else {
          // Collapse previous day if exists
          if (expandedDay) {
            const prevCell = this.shadowRoot.querySelector(
              `[data-day="${expandedDay}"]`
            );
            await this.collapseDay(calendar, prevCell);
          }
          await this.expandDay(calendar, cell);
          expandedDay = day;
        }
      });
    }

    /**
     * Expands a day cell to full view
     * @param {HTMLElement} calendar - The calendar container element
     * @param {HTMLElement} cell - The day cell to expand
     * @private
     */
    async expandDay(calendar, cell) {
      // Capture the cell's current position and size
      const calendarRect = calendar.getBoundingClientRect();
      const cellRect = cell.getBoundingClientRect();

      const relativeTop = cellRect.top - calendarRect.top;
      const relativeLeft = cellRect.left - calendarRect.left;

      // Set initial absolute position to match grid position
      cell.style.position = "absolute";
      cell.style.top = `${relativeTop}px`;
      cell.style.left = `${relativeLeft}px`;
      cell.style.width = `${cellRect.width}px`;
      cell.style.height = `${cellRect.height}px`;
      cell.style.gridColumn = "unset";
      cell.style.gridRow = "unset";

      // Force a reflow
      cell.offsetHeight;

      // Now add classes to trigger transition to expanded state
      calendar.classList.add("day-expanded");
      cell.classList.add("expanded-cell");
    }

    /**
     * Collapses an expanded day cell back to grid view
     * @param {HTMLElement} calendar - The calendar container element
     * @param {HTMLElement} cell - The day cell to collapse
     * @private
     */
    async collapseDay(calendar, cell) {
      if (!cell) return;

      // Remove expanded classes
      calendar.classList.remove("day-expanded");
      cell.classList.remove("expanded-cell");

      // Wait for transition to complete
      await new Promise((resolve) => setTimeout(resolve, 400));

      // Reset to grid positioning
      cell.style.position = "";
      cell.style.top = "";
      cell.style.left = "";
      cell.style.width = "";
      cell.style.height = "";
      cell.style.gridColumn = "";
      cell.style.gridRow = "";
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
              let dayDivs = this.shadowRoot.querySelectorAll(`div[data-day]`);

              for (const day of Object.keys(data)) {
                const dayDiv = dayDivs[parseInt(day)];
                const list = data[day];
                if (list) {
                  dayDiv.classList.add("has-events");
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
      const now = new Date();
      const todayDay = now.getDate();
      const todayMonth = now.getMonth();
      const todayYear = now.getFullYear();
      const isCurrentMonth =
        this.month === todayMonth && this.year === todayYear;

      for (let i = 0; i < this.startDay; i++) {
        html.add(/*html*/ `<div class="day day-disabled" part="day"></div>`);
      }
      for (let i = 1; i <= this.daysInMonth; i++) {
        const isTodayClass =
          isCurrentMonth && i === todayDay ? "day-today" : "";
        html.add(/*html*/ `
        <div data-day="${i}" class="day ${isTodayClass}" part="day">
          <span class="nr">${i}<span>
        </div>`);
      }
      const endDay =
        6 - new Date(this.year, this.month, this.daysInMonth).getDay();
      for (let i = 1; i <= endDay; i++) {
        html.add(/*html*/ `<div class="day day-disabled" part="day"></div>`);
      }
      return html.toHTML();
    }
  }
}
customElements.define("pds-calendar", PdsCalendar);
