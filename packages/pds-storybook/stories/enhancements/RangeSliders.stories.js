import { html } from 'lit';

export default {
  title: 'PDS/Enhancements/RangeSliders',
  parameters: {
    docs: {
      description: {
        component: 'Enhanced range inputs with value bubbles that appear on interaction'
      }
    }
  }
};

export const BasicRange = () => html`
  <label>
    <span>Volume</span>
    <input type="range" min="0" max="100" value="50">
  </label>
`;

export const MultipleRanges = () => html`
  <form style="display: flex; flex-direction: column; gap: var(--spacing-4); max-width: 400px;">
    <label>
      <span>Brightness</span>
      <input type="range" min="0" max="100" value="75">
    </label>
    <label>
      <span>Contrast</span>
      <input type="range" min="0" max="100" value="50">
    </label>
    <label>
      <span>Saturation</span>
      <input type="range" min="0" max="100" value="60">
    </label>
    <label>
      <span>Temperature</span>
      <input type="range" min="-100" max="100" value="0">
    </label>
  </form>
`;

export const CustomSteps = () => html`
  <form style="display: flex; flex-direction: column; gap: var(--spacing-4); max-width: 400px;">
    <label>
      <span>Opacity (10% steps)</span>
      <input type="range" min="0" max="100" value="100" step="10">
    </label>
    <label>
      <span>Font Size (0.25rem steps)</span>
      <input type="range" min="0.5" max="3" value="1" step="0.25">
    </label>
  </form>
`;

export const InCard = () => html`
  <article class="card" style="max-width: 500px;">
    <h3>Audio Controls</h3>
    <div style="display: flex; flex-direction: column; gap: var(--spacing-4); margin-top: var(--spacing-4);">
      <label>
        <span style="display: flex; justify-content: space-between;">
          <span>Master Volume</span>
          <span style="color: var(--surface-text-secondary); font-size: 0.875rem;">75%</span>
        </span>
        <input type="range" min="0" max="100" value="75">
      </label>
      <label>
        <span style="display: flex; justify-content: space-between;">
          <span>Bass</span>
          <span style="color: var(--surface-text-secondary); font-size: 0.875rem;">50%</span>
        </span>
        <input type="range" min="0" max="100" value="50">
      </label>
      <label>
        <span style="display: flex; justify-content: space-between;">
          <span>Treble</span>
          <span style="color: var(--surface-text-secondary); font-size: 0.875rem;">60%</span>
        </span>
        <input type="range" min="0" max="100" value="60">
      </label>
    </div>
  </article>
`;
