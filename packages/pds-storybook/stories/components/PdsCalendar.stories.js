import { html } from "lit";
import { PDS } from "#pds";

const docsParameters = {
  description: {
    component:
      "A fully featured calendar component with month navigation, event display, and keyboard-accessible date selection",
  },
};

if (typeof window !== "undefined") {
  import("../reference/reference-docs.js")
    .then(({ createComponentDocsPage }) => {
      docsParameters.page = createComponentDocsPage("pds-calendar");
    })
    .catch((error) => {
      console.warn(
        "storybook: docs page failed to load for pds-calendar",
        error,
      );
    });
}

export default {
  title: "Components/pds-calendar",
  tags: ["autodocs", "calendar", "date", "datepicker", "event", "schedule"],
  parameters: {
    pds: {
      tags: [
        "calendar",
        "date",
        "datepicker",
        "event",
        "schedule",
        "pds-calendar",
      ],
    },
    docs: docsParameters,
  },
  argTypes: {
    date: {
      control: "text",
      description:
        "The date to display (defaults to current date). Accepts any valid date string",
    },
  },
};

// Sample event data generator
const getEventData = () => ({
  5: [
    { title: "Team Standup", type: "primary" },
    { title: "Code Review Session", type: "info" },
  ],
  12: [{ title: "Sprint Planning", type: "primary" }],
  15: [
    { title: "Client Meeting", type: "warning" },
    { title: "Design Review", type: "info" },
  ],
  18: [{ title: "Deployment Window", type: "danger" }],
  20: [
    { title: "Team Retrospective", type: "primary" },
    { title: "Documentation Review", type: "info" },
  ],
  25: [{ title: "Holiday Event", type: "warning" }],
  28: [
    { title: "Release Candidate Review", type: "danger" },
    { title: "Performance Testing", type: "info" },
  ],
});

export const Default = {
  render: (args) => {
    setTimeout(() => {
      const calendar = document.querySelector("#default-calendar");
      if (calendar) {
        calendar.addEventListener("month-rendered", (e) => {
          e.detail.fill(getEventData());
        });
      }
    }, 0);

    return html` <pds-calendar id="default-calendar"></pds-calendar> `;
  },
  args: {
    date: "",
  },
};

export const WithSpecificDate = {
  render: () => {
    setTimeout(() => {
      const calendar = document.querySelector("#specific-date-calendar");
      if (calendar) {
        calendar.addEventListener("month-rendered", (e) => {
          e.detail.fill({
            10: [{ title: "Important Meeting", type: "danger" }],
            15: [{ title: "Project Kickoff", type: "primary" }],
            25: [{ title: "Holiday", type: "warning" }],
          });
        });
      }
    }, 0);

    return html`
      <pds-calendar
        id="specific-date-calendar"
        date="2024-12-01"
      ></pds-calendar>
    `;
  },
};

export const WithManyEvents = {
  render: () => {
    setTimeout(() => {
      const calendar = document.querySelector("#many-events-calendar");
      if (calendar) {
        calendar.addEventListener("month-rendered", (e) => {
          const events = {};

          // Generate events for every other day
          for (let i = 1; i <= 30; i += 2) {
            const types = ["primary", "info", "warning", "danger"];
            const eventCount = Math.floor(Math.random() * 3) + 1;
            events[i] = [];

            for (let j = 0; j < eventCount; j++) {
              events[i].push({
                title: `Event ${j + 1} on Day ${i}`,
                type: types[Math.floor(Math.random() * types.length)],
              });
            }
          }

          e.detail.fill(events);
        });
      }
    }, 0);

    return html` <pds-calendar id="many-events-calendar"></pds-calendar> `;
  },
};

export const EventTypes = {
  render: () => {
    setTimeout(() => {
      const calendar = document.querySelector("#event-types-calendar");
      if (calendar) {
        calendar.addEventListener("month-rendered", (e) => {
          e.detail.fill({
            5: [{ title: "Primary Event", type: "primary" }],
            10: [{ title: "Info Event", type: "info" }],
            15: [{ title: "Warning Event", type: "warning" }],
            20: [{ title: "Danger Event", type: "danger" }],
            25: [
              { title: "Primary Event", type: "primary" },
              { title: "Info Event", type: "info" },
              { title: "Warning Event", type: "warning" },
              { title: "Danger Event", type: "danger" },
            ],
          });
        });
      }
    }, 0);

    return html`
      <div class="stack-lg">
        <pds-calendar id="event-types-calendar"></pds-calendar>

        <div class="card">
          <h3>Event Types</h3>
          <ul>
            <li>
              <strong>Primary:</strong> Blue - Main events and important tasks
            </li>
            <li>
              <strong>Info:</strong> Light blue - Informational items and notes
            </li>
            <li><strong>Warning:</strong> Yellow - Attention required items</li>
            <li>
              <strong>Danger:</strong> Red - Critical deadlines and alerts
            </li>
          </ul>
        </div>
      </div>
    `;
  },
};

export const DynamicEvents = {
  render: () => {
    setTimeout(async () => {
      if (typeof customElements?.whenDefined === "function") {
        await customElements.whenDefined("pds-calendar");
      }

      const resolveCalendar = async () => {
        for (let attempt = 0; attempt < 20; attempt += 1) {
          const candidate = document.querySelector("#dynamic-calendar");
          if (candidate?.shadowRoot) return candidate;
          await new Promise((resolve) => requestAnimationFrame(resolve));
        }
        return document.querySelector("#dynamic-calendar");
      };

      const calendar = await resolveCalendar();
      if (!calendar || calendar.__dynamicEventSetup) return;
      calendar.__dynamicEventSetup = true;

      let currentEvents = {
        10: [
          {
            title: "Existing Event",
            type: "primary",
            time: "09:00",
            duration: 30,
          },
        ],
      };

      const eventTypes = ["primary", "info", "warning", "danger"];

      const normalizeEvent = (event = {}) => {
        const rawTitle = String(event.title || "").trim();
        const rawTime = String(event.time || "").trim();
        const parsedDuration = Number(event.duration);
        const normalizedDuration =
          Number.isFinite(parsedDuration) && parsedDuration > 0
            ? Math.round(parsedDuration)
            : null;
        const rawType = String(event.type || "info").trim().toLowerCase();
        const normalizedType = eventTypes.includes(rawType) ? rawType : "info";

        return {
          title: rawTitle,
          time: rawTime,
          duration: normalizedDuration,
          type: normalizedType,
        };
      };

      const toCalendarEvent = (event = {}) => {
        const normalized = normalizeEvent(event);
        const hasDuration =
          Number.isFinite(normalized.duration) && normalized.duration > 0;
        const titlePrefix = normalized.time
          ? hasDuration
            ? `${normalized.time} (${normalized.duration}m) · `
            : `${normalized.time} · `
          : "";

        return {
          title: `${titlePrefix}${normalized.title || "Untitled"}`,
          type: normalized.type,
        };
      };

      const getDayEvents = (day) => {
        if (!currentEvents[day]) {
          currentEvents[day] = [];
        }
        return currentEvents[day];
      };

      const getTaskContextFromEvent = (event) => {
        const task = event.target?.closest?.(".task");
        if (!task) return null;

        const dayCell = task.closest(".day[data-day]");
        const day = Number.parseInt(dayCell?.dataset?.day || "", 10);
        if (!Number.isInteger(day) || day < 1) return null;

        const taskItems = [...dayCell.querySelectorAll(".task")];
        const eventIndex = taskItems.indexOf(task);
        if (eventIndex < 0) return null;

        return { day, eventIndex };
      };

      const getDayFromEvent = (event) => {
        const path = event.composedPath?.() || [];
        for (const node of path) {
          const dayValue = node?.dataset?.day;
          const dayNumber = Number.parseInt(dayValue || "", 10);
          if (Number.isInteger(dayNumber) && dayNumber > 0) return dayNumber;
        }
        return null;
      };

      const openEventDialog = async ({ day, eventIndex = null }) => {
        const existingEvents = getDayEvents(day);
        const hasExistingEvent =
          Number.isInteger(eventIndex)
          && eventIndex >= 0
          && eventIndex < existingEvents.length;
        const existingEvent = hasExistingEvent
          ? normalizeEvent(existingEvents[eventIndex])
          : null;

        const selectedDate = new Date(calendar.year, calendar.month, day);
        const selectedDateLabel = selectedDate.toLocaleDateString(undefined, {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        });

        const buttons = hasExistingEvent
          ? {
            delete: { name: "Delete event" },
            ok: {
              name: "Save changes",
              primary: true,
            },
            cancel: { name: "Cancel", cancel: true },
          }
          : {
            ok: {
              name: "Add event",
              primary: true,
            },
            cancel: { name: "Cancel", cancel: true },
          };

        const result = await PDS.ask(
          html`
            <form method="dialog" class="stack-md min-w-sm">
              <pds-form id="calendar-event-form" data-required hide-actions></pds-form>
              <input type="hidden" name="eventPayload" value="" />
              <input type="hidden" name="eventAction" value="upsert" />
            </form>
          `,
          {
            title: hasExistingEvent
              ? `Edit event for ${selectedDateLabel}`
              : `Add event for ${selectedDateLabel}`,
            useForm: true,
            buttons,
            rendered(dialog) {
              const hostForm = dialog.querySelector("form");
              const pdsForm = dialog.querySelector("#calendar-event-form");
              const hidden = dialog.querySelector('input[name="eventPayload"]');
              const actionField = dialog.querySelector('input[name="eventAction"]');
              const deleteButton = dialog.querySelector('button[value="delete"]');

              if (!pdsForm || !hidden) return;

              pdsForm.jsonSchema = {
                type: "object",
                required: ["title"],
                properties: {
                  title: {
                    type: "string",
                    title: "Title",
                    minLength: 1,
                    examples: ["Sprint planning"],
                  },
                  time: {
                    type: "string",
                    format: "time",
                    title: "Time",
                    examples: ["09:30"],
                  },
                  duration: {
                    type: "number",
                    title: "Duration (minutes)",
                    minimum: 1,
                    examples: ["30"],
                  },
                  type: {
                    type: "string",
                    title: "Type",
                    oneOf: [
                      { const: "primary", title: "Primary" },
                      { const: "info", title: "Info" },
                      { const: "warning", title: "Warning" },
                      { const: "danger", title: "Danger" },
                    ],
                  },
                },
              };

              pdsForm.uiSchema = {
                "/title": { "ui:icon": "calendar" },
                "/time": { "ui:autocomplete": "off" },
                "/duration": { "ui:icon": "timer" },
                "/type": { "ui:widget": "radio", "ui:class": "buttons" },
              };

              pdsForm.values = {
                title: existingEvent?.title || "",
                time: existingEvent?.time || "",
                duration: existingEvent?.duration ?? null,
                type: existingEvent?.type || "info",
              };

              const syncHidden = (detail) => {
                let payload = detail?.json;
                if (!payload && typeof pdsForm.serialize === "function") {
                  payload = pdsForm.serialize()?.json;
                }
                hidden.value = JSON.stringify(payload || {});
              };

              if (deleteButton && hostForm) {
                deleteButton.className = "btn-danger btn-outline btn-sm";
                deleteButton.addEventListener("click", (event) => {
                  event.preventDefault();
                  if (actionField) {
                    actionField.value = "delete";
                  }
                  const submitter =
                    hostForm.querySelector('button[value="ok"]') || undefined;
                  hostForm.requestSubmit(submitter);
                });
              }

              pdsForm.addEventListener("pw:value-change", (event) => {
                syncHidden(event.detail);
              });

              pdsForm.addEventListener("pw:submit", (event) => {
                event.preventDefault();
                if (actionField) {
                  actionField.value = "upsert";
                }
                syncHidden(event.detail);
                const submitter =
                  hostForm?.querySelector('button[value="ok"]') || undefined;
                hostForm?.requestSubmit(submitter);
              });

              hostForm?.addEventListener(
                "submit",
                (event) => {
                  if (event.submitter?.value === "ok") {
                    syncHidden();
                  }
                },
                true
              );

              customElements.whenDefined("pds-form").then(() => {
                if (typeof pdsForm.serialize === "function") {
                  const initial = pdsForm.serialize()?.json || {};
                  hidden.value = JSON.stringify(initial);
                }
              });
            },
          }
        );

        if (!(result instanceof FormData)) return;

        const action = String(result.get("eventAction") || "upsert");

        if (action === "delete" && hasExistingEvent) {
          const eventsForDay = getDayEvents(day);
          eventsForDay.splice(eventIndex, 1);
          if (!eventsForDay.length) {
            delete currentEvents[day];
          }
          calendar.refresh();
          await PDS.toast(`Deleted event on ${selectedDateLabel}.`, {
            type: "warning",
          });
          return;
        }

        const raw = result.get("eventPayload");
        let payload = null;
        try {
          payload = raw ? JSON.parse(String(raw)) : null;
        } catch {
          payload = null;
        }

        const normalized = normalizeEvent(payload || {});

        if (hasExistingEvent) {
          currentEvents[day][eventIndex] = normalized;
        } else {
          getDayEvents(day).push(normalized);
        }

        calendar.refresh();
        await PDS.toast(
          hasExistingEvent
            ? `Updated event on ${selectedDateLabel}.`
            : `Added event on ${selectedDateLabel}.`,
          {
          type: "success",
          }
        );
      };

      calendar.addEventListener("month-rendered", (e) => {
        const filledEvents = Object.fromEntries(
          Object.entries(currentEvents).map(([day, events]) => [
            day,
            events.map((item) => toCalendarEvent(item)),
          ])
        );
        e.detail.fill(filledEvents);
      });

      const bindInteractions = () => {
        if (!calendar.isConnected) return;

        const shadow = calendar.shadowRoot;
        if (!shadow) {
          requestAnimationFrame(bindInteractions);
          return;
        }

        if (shadow.__dynamicEventInteractionsSetup) return;
        shadow.__dynamicEventInteractionsSetup = true;

        shadow.addEventListener("dblclick", (event) => {
          const taskContext = getTaskContextFromEvent(event);
          if (taskContext) {
            openEventDialog(taskContext);
            return;
          }

          const day = getDayFromEvent(event);
          if (!day) return;
          openEventDialog({ day });
        });

        let longPressTimer = null;
        const clearLongPress = () => {
          clearTimeout(longPressTimer);
          longPressTimer = null;
        };

        shadow.addEventListener("pointerdown", (event) => {
          const taskContext = getTaskContextFromEvent(event);
          const day = taskContext?.day || getDayFromEvent(event);
          if (!day) return;
          clearLongPress();
          longPressTimer = setTimeout(() => {
            if (taskContext) {
              openEventDialog(taskContext);
            } else {
              openEventDialog({ day });
            }
            clearLongPress();
          }, 550);
        });

        shadow.addEventListener("pointerup", clearLongPress);
        shadow.addEventListener("pointercancel", clearLongPress);
        shadow.addEventListener("pointerleave", clearLongPress);
      };

      bindInteractions();
    }, 0);

    return html`
      <div class="stack-lg">
        <div class="card">
          <h3>Add Events Dynamically</h3>
          <p class="text-muted">
            Double-click a day (or long-press on touch) to add an event.
            Double-click an existing event to edit or delete it.
          </p>
        </div>

        <pds-calendar id="dynamic-calendar"></pds-calendar>
      </div>
    `;
  },
};


export const FormParticipation = {
  render: () => {
    setTimeout(() => {
      const form = document.querySelector("#calendar-form-example");
      const calendar = document.querySelector("#form-calendar");
      const output = document.querySelector("#calendar-form-output");

      if (!form || !calendar || !output) return;

      const writeOutput = (value) => {
        output.textContent = value;
      };

      calendar.addEventListener("month-rendered", (event) => {
        event.detail.fill({
          4: [{ title: "Planning", type: "primary" }],
          9: [{ title: "Architecture", type: "info" }],
          16: [{ title: "Review", type: "warning" }],
          24: [{ title: "Deadline", type: "danger" }],
        });
      });

      calendar.value = "";

      form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!form.reportValidity()) {
          writeOutput("Form invalid: pds-calendar requires a date.");
          return;
        }

        const formData = new FormData(form);
        const payload = Object.fromEntries(formData.entries());
        writeOutput(JSON.stringify(payload, null, 2));
      });

      form.addEventListener("reset", () => {
        setTimeout(() => {
          calendar.value = "";
          writeOutput("Form reset complete.");
        }, 0);
      });
    }, 0);

    return html`
      <section class="stack-lg card">
        <h3>Form Participation</h3>
        <p class="text-muted">
          Pick a meeting date directly in <code>&lt;pds-calendar&gt;</code>.
          This compact mode shows only day numbers; event days are color-coded
          and no event text is rendered.
        </p>

        <form id="calendar-form-example">
          <pds-calendar
            id="form-calendar"
            compact
            required
            name="meetingDate"
            date=""
          ></pds-calendar>

          <div class="flex gap-sm">
            <button type="submit" class="btn-primary">Submit Form</button>
            <button type="reset" class="btn-secondary">Reset</button>
          </div>
        </form>

        <pre id="calendar-form-output" class="card surface-subtle">
Submit the form to inspect payload.</pre
        >
      </section>
    `;
  },
};

export const EventDetailsPanel = {
  render: () => {
    setTimeout(() => {
      const calendar = document.querySelector("#details-panel-calendar");
      const detailsHost = document.querySelector("#event-details-panel");
      if (!calendar || !detailsHost) return;

      const eventsByDay = {
        3: [
          {
            title: "Sprint Planning",
            type: "primary",
            time: "09:00",
            description: "Plan sprint scope and assign owners.",
          },
          {
            title: "Design Sync",
            type: "info",
            time: "14:00",
            description: "Review UI updates and interaction details.",
          },
        ],
        8: [
          {
            title: "Dependency Audit",
            type: "warning",
            time: "11:00",
            description: "Audit package updates and pending migrations.",
          },
        ],
        12: [
          {
            title: "Release Gate",
            type: "danger",
            time: "16:30",
            description: "Final go/no-go check for release readiness.",
          },
        ],
        19: [
          {
            title: "Customer Feedback Review",
            type: "info",
            time: "10:30",
            description: "Prioritize recent feature requests and defects.",
          },
        ],
      };

      const renderDetails = (entry, day) => {
        if (!entry) {
          detailsHost.innerHTML = "";
          return;
        }

        const selectedDate = new Date(calendar.year, calendar.month, day);
        const selectedDateLabel = selectedDate.toLocaleDateString(undefined, {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        });

        detailsHost.innerHTML = `
          <div class="stack-sm">
            <p>${selectedDateLabel}</p>
            <h3>${entry.title}</h3>
            <p class="text-muted">${entry.time}</p>
            <p>${entry.description}</p>
          </div>
        `;
      };

      const renderDayDetails = (day) => {
        const selectedDate = new Date(calendar.year, calendar.month, day);
        const selectedDateLabel = selectedDate.toLocaleDateString(undefined, {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        });

        const list = eventsByDay[day] || [];
        if (!list.length) {
          detailsHost.innerHTML = `
           <section class="flex flex-col items-center">
            
              <h5>No events on ${selectedDateLabel}.</h5>
              <small class="text-muted">Select another day in the celndar.
              </small>
            
          </section>`;
          return;
        }

        detailsHost.innerHTML = `
          <div class="stack-sm">
            <p>${selectedDateLabel}</p>
            ${list
              .map(
                (entry) => `
                  <article>
                    <header>
                      <h4>${entry.title}</h4>
                      <small class="text-muted">${entry.time}</small>
                    </header>
                    <p>${entry.description}</p>
                  </article>
                `,
              )
              .join("")}
          </div>
        `;
      };

      calendar.addEventListener("month-rendered", (event) => {
        event.detail.fill(eventsByDay);
      });

      if (!calendar.dataset.detailsClickBound) {
        calendar.dataset.detailsClickBound = "true";

        calendar.shadowRoot?.addEventListener("change", (event) => {
          const radio = event.target?.closest?.(".day-radio-input[data-day]");
          if (!radio) return;

          const day = Number.parseInt(radio.dataset.day || "", 10);
          if (!Number.isInteger(day)) return;

          renderDayDetails(day);
        });

        calendar.shadowRoot?.addEventListener("click", (event) => {
          const task = event.target?.closest?.(".task");
          if (!task) return;

          const dayCell = task.closest(".day[data-day]");
          const day = Number.parseInt(dayCell?.dataset?.day || "", 10);
          if (!Number.isInteger(day)) return;

          const taskItems = [...dayCell.querySelectorAll(".task")];
          const taskIndex = taskItems.indexOf(task);
          if (taskIndex < 0) return;

          const details = eventsByDay[day]?.[taskIndex] || null;
          renderDetails(details, day);
        });
      }

      renderDetails(null);
    }, 0);

    return html`
      <section>
      <header>
        <h3>Event Calendar</h3>
          <small class="text-muted"
            >Click calendar to show event details.</small
          >
      </header>
        <article class="flex gap-lg flex-wrap card max-w-md">
          <pds-calendar id="details-panel-calendar" compact></pds-calendar>
          <article id="event-details-panel"></article>
        </article>
        
      </section>
    `;
  },
};
