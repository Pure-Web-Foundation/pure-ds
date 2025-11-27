import { html } from 'lit';

export default {
  title: 'Enhancements/Toggles',
  parameters: {
    docs: {
      description: {
        component: 'Transform checkboxes into toggle switches using data-toggle attribute'
      }
    }
  }
};

export const BasicToggle = () => html`
  <label data-toggle>
    <span data-label>Enable notifications</span>
    <input type="checkbox">
  </label>
`;

export const PreChecked = () => html`
  <label data-toggle>
    <span data-label>Dark mode</span>
    <input type="checkbox" checked>
  </label>
`;

export const MultipleToggles = () => html`
  <form class="flex flex-col gap-sm" style="max-width: 400px;" onsubmit="event.preventDefault(); toastFormData(new FormData(event.target));">
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
    <button type="submit" class="btn-primary" style="margin-top: var(--spacing-3);">Save Preferences</button>
  </form>
`;

export const TogglePositions = () => html`
  <div style="max-width: 600px;">
    <h3>Toggle Position Variations</h3>
    <p style="color: var(--surface-text-secondary); margin-bottom: var(--spacing-4);">
      Toggle knob position adapts based on label placement in DOM
    </p>
    <div class="flex flex-col gap-md">
      <div>
        <h4 style="margin-bottom: var(--spacing-2);">Label First (Knob on Right)</h4>
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
      </div>
      
      <div>
        <h4 style="margin-bottom: var(--spacing-2);">Label Last (Knob on Left)</h4>
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
      </div>
    </div>
  </div>
`;

export const InCard = () => html`
  <article class="card" style="max-width: 500px;">
    <h3>Privacy Settings</h3>
    <p style="color: var(--surface-text-secondary); margin-bottom: var(--spacing-4);">
      Control your privacy preferences
    </p>
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
