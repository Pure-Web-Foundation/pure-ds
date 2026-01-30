import { html } from "#pds/lit";
import { enhancementHeader } from "./_enhancement-header.js";

export default {
  title: "Enhancements/Toggles",
  tags: ["toggle", "switch", "checkbox", "forms", "interaction"],
  parameters: {
    options: {
      selectedPanel: "html-preview/panel",
    },
    pds: {
      tags: [
        "toggle",
        "switch",
        "checkbox",
        "forms",
        "interaction",
        "data-toggle",
        "enhancement",
      ],
    },
  },
};

export const BasicToggle = () => html`
  ${enhancementHeader("toggle")}

  <label data-toggle>
    <input type="checkbox" />
    <span data-label>Enable notifications</span>
  </label>
`;

export const PreChecked = () => html`
  ${enhancementHeader("toggle")}
  <label data-toggle>
    <span data-label>Dark mode</span>
    <input type="checkbox" checked />
  </label>
`;

export const MultipleToggles = () => html`
  ${enhancementHeader("toggle")}
  <form
    class="stack-sm toggle-story-form"
    @submit="${(event) => {
      event.preventDefault();
      toastFormData(new FormData(event.target));
    }}"
  >
    <label data-toggle>
      <span data-label>Email notifications</span>
      <input type="checkbox" name="email" checked />
    </label>
    <label data-toggle>
      <span data-label>Push notifications</span>
      <input type="checkbox" name="push" />
    </label>
    <label data-toggle>
      <span data-label>SMS notifications</span>
      <input type="checkbox" name="sms" />
    </label>
    <label data-toggle>
      <span data-label>Weekly digest</span>
      <input type="checkbox" name="digest" checked />
    </label>
    <button type="submit" class="btn-primary toggle-story-form__button">
      Save Preferences
    </button>
  </form>
`;

export const TogglePositions = () => html`
  ${enhancementHeader("toggle")}
  <div class="toggle-story-layout">
    <div>
      <h3>Toggle Position Variations</h3>
      <p class="toggle-story-muted">
        Toggle knob position adapts based on label placement in DOM
      </p>
    </div>
    <div class="stack-md">
      <section class="toggle-story-section">
        <h4 class="toggle-story-subheading">Label First (Knob on Right)</h4>
        <div class="stack-sm">
          <label data-toggle>
            <span data-label>Email notifications</span>
            <input type="checkbox" checked />
          </label>
          <label data-toggle>
            <span data-label>Push notifications</span>
            <input type="checkbox" />
          </label>
        </div>
      </section>

      <section class="toggle-story-section">
        <h4 class="toggle-story-subheading">Label Last (Knob on Left)</h4>
        <div class="stack-sm">
          <label data-toggle>
            <input type="checkbox" checked />
            <span data-label>Dark mode enabled</span>
          </label>
          <label data-toggle>
            <input type="checkbox" />
            <span data-label>Auto-save changes</span>
          </label>
        </div>
      </section>
    </div>
  </div>
`;

export const InCard = () => html`
  ${enhancementHeader("toggle")}
  <article class="card toggle-story-card stack-md max-w-sm">
    <div>
      <h3>Privacy Settings</h3>
      <p class="toggle-story-muted">Control your privacy preferences</p>
    </div>
    <div class="stack-sm">
      <label data-toggle>
        <input type="checkbox" checked />
        <span data-label>Profile visibility</span>
      </label>
      <label data-toggle>
        <input type="checkbox" />
        <span data-label>Show online status</span>
      </label>
      <label data-toggle>
        <input type="checkbox" checked />
        <span data-label>Allow message requests</span>
      </label>
    </div>
  </article>
`;

export const WithIcons = () => html`
  ${enhancementHeader("toggle")}
  <div class="toggle-story-layout">
    <div>
      <h3>Toggles with Icons</h3>
      <p class="toggle-story-muted">
        Add the <code>.with-icons</code> class to show checkmark/cross icons in the toggle knob
      </p>
    </div>
    <div class="stack-md">
      <label data-toggle class="with-icons">
        <span data-label>Enable notifications</span>
        <input type="checkbox" checked />
      </label>
      <label data-toggle class="with-icons">
        <span data-label>Dark mode</span>
        <input type="checkbox" />
      </label>
      <label data-toggle class="with-icons">
        <input type="checkbox" checked />
        <span data-label>Auto-save changes</span>
      </label>
      <label data-toggle class="with-icons">
        <input type="checkbox" />
        <span data-label>Show tips</span>
      </label>
    </div>
  </div>
`;
