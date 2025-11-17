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
  <form style="display: flex; flex-direction: column; gap: var(--spacing-3); max-width: 400px;">
    <label data-toggle>
      <span data-label>Email notifications</span>
      <input type="checkbox" checked>
    </label>
    <label data-toggle>
      <span data-label>Push notifications</span>
      <input type="checkbox">
    </label>
    <label data-toggle>
      <span data-label>SMS notifications</span>
      <input type="checkbox">
    </label>
    <label data-toggle>
      <span data-label>Weekly digest</span>
      <input type="checkbox" checked>
    </label>
  </form>
`;

export const InCard = () => html`
  <article class="card" style="max-width: 500px;">
    <h3>Privacy Settings</h3>
    <p style="color: var(--surface-text-secondary); margin-bottom: var(--spacing-4);">
      Control your privacy preferences
    </p>
    <div style="display: flex; flex-direction: column; gap: var(--spacing-3);">
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
