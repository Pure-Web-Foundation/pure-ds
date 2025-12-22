import { html } from 'lit';

const toggleStoryStyles = html`
  <style>
    .toggle-story-form {
      max-width: 400px;
    }

    .toggle-story-form__button {
      margin-top: var(--spacing-3);
      align-self: flex-start;
    }

    .toggle-story-layout {
      max-width: 600px;
      display: grid;
      gap: var(--spacing-4);
    }

    .toggle-story-muted {
      color: var(--surface-text-secondary);
      margin-bottom: var(--spacing-4);
    }

    .toggle-story-section {
      display: grid;
      gap: var(--spacing-3);
    }

    .toggle-story-subheading {
      margin-bottom: var(--spacing-2);
    }

    .toggle-story-card {
      max-width: 500px;
      display: grid;
      gap: var(--spacing-4);
    }
  </style>
`;

export default {
  title: 'Enhancements/Toggles',
  tags: ['toggle', 'switch', 'checkbox', 'forms', 'interaction'],
  parameters: {
    pds: {
      tags: ['toggle', 'switch', 'checkbox', 'forms', 'interaction', 'data-toggle', 'enhancement']
    },
    docs: {
      description: {
        component: 'Transform checkboxes into toggle switches using data-toggle attribute'
      }
    }
  }
};

export const BasicToggle = () => html`
  ${toggleStoryStyles}
  <label data-toggle>
    <span data-label>Enable notifications</span>
    <input type="checkbox">
  </label>
`;

export const PreChecked = () => html`
  ${toggleStoryStyles}
  <label data-toggle>
    <span data-label>Dark mode</span>
    <input type="checkbox" checked>
  </label>
`;

export const MultipleToggles = () => html`
  ${toggleStoryStyles}
  <form
    class="flex flex-col gap-sm toggle-story-form"
    @submit="${(event) => {
      event.preventDefault();
      toastFormData(new FormData(event.target));
    }}"
  >
    <label data-toggle>
      <span data-label>Email notifications</span>
      <input type="checkbox" name="email" checked>
    </label>
    <label data-toggle>
      <span data-label>Push notifications</span>
      <input type="checkbox" name="push">
    </label>
    <label data-toggle>
      <span data-label>SMS notifications</span>
      <input type="checkbox" name="sms">
    </label>
    <label data-toggle>
      <span data-label>Weekly digest</span>
      <input type="checkbox" name="digest" checked>
    </label>
    <button type="submit" class="btn-primary toggle-story-form__button">Save Preferences</button>
  </form>
`;

export const TogglePositions = () => html`
  ${toggleStoryStyles}
  <div class="toggle-story-layout">
    <div>
      <h3>Toggle Position Variations</h3>
      <p class="toggle-story-muted">
        Toggle knob position adapts based on label placement in DOM
      </p>
    </div>
    <div class="flex flex-col gap-md">
      <section class="toggle-story-section">
        <h4 class="toggle-story-subheading">Label First (Knob on Right)</h4>
        <div class="flex flex-col gap-sm">
          <label data-toggle>
            <span data-label>Email notifications</span>
            <input type="checkbox" checked>
          </label>
          <label data-toggle>
            <span data-label>Push notifications</span>
            <input type="checkbox">
          </label>
        </div>
      </section>

      <section class="toggle-story-section">
        <h4 class="toggle-story-subheading">Label Last (Knob on Left)</h4>
        <div class="flex flex-col gap-sm">
          <label data-toggle>
            <input type="checkbox" checked>
            <span data-label>Dark mode enabled</span>
          </label>
          <label data-toggle>
            <input type="checkbox">
            <span data-label>Auto-save changes</span>
          </label>
        </div>
      </section>
    </div>
  </div>
`;

export const InCard = () => html`
  ${toggleStoryStyles}
  <article class="card toggle-story-card">
    <div>
      <h3>Privacy Settings</h3>
      <p class="toggle-story-muted">
        Control your privacy preferences
      </p>
    </div>
    <div class="flex flex-col gap-sm">
      <label data-toggle>
        <span data-label>Profile visibility</span>
        <input type="checkbox" checked>
      </label>
      <label data-toggle>
        <span data-label>Show online status</span>
        <input type="checkbox">
      </label>
      <label data-toggle>
        <span data-label>Allow message requests</span>
        <input type="checkbox" checked>
      </label>
    </div>
  </article>
`;
