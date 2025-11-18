import { html } from 'lit';

export default {
  title: 'Enhancements/Range Sliders',
  parameters: {
    docs: {
      description: {
        component: `Enhanced range inputs with two display modes:
        
**Standard Mode** (default): Floating bubble that appears on interaction.

**Inline Output Mode**: Add \`range-output\` class to the label for persistent inline value display using semantic \`<output>\` element.

Both modes automatically generate proper ARIA attributes and use the \`<output>\` tag for accessibility.`
      }
    }
  }
};

export const StandardFloatingBubble = () => html`
  <div style="max-width: 400px;">
    <p style="color: var(--color-text-secondary); font-size: 0.875rem; margin-bottom: var(--spacing-4);">
      Default behavior: A floating bubble appears when you interact with the slider.
    </p>
    <label>
      <span>Volume</span>
      <input type="range" min="0" max="100" value="50">
    </label>
  </div>
`;

StandardFloatingBubble.storyName = 'Standard (Floating Bubble)';

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

export const InlineOutputMode = () => html`
  <div style="max-width: 500px;">
    <p style="color: var(--color-text-secondary); font-size: 0.875rem; margin-bottom: var(--spacing-4);">
      Add the <code>range-output</code> class to automatically create an inline output display.
    </p>
    <div style="display: flex; flex-direction: column; gap: var(--spacing-4);">
      <label class="range-output">
        <span>Master Volume</span>
        <input type="range" min="0" max="100" value="75">
      </label>
      <label class="range-output">
        <span>Bass</span>
        <input type="range" min="0" max="100" value="50">
      </label>
      <label class="range-output">
        <span>Treble</span>
        <input type="range" min="0" max="100" value="60">
      </label>
    </div>
  </div>
`;

InlineOutputMode.storyName = 'Inline Output (range-output class)';

export const AudioControlsExample = () => html`
  <article class="card" style="max-width: 500px;">
    <h3>Audio Controls</h3>
    <p style="color: var(--color-text-secondary); font-size: 0.875rem; margin-bottom: var(--spacing-4);">
      Complete example using <code>range-output</code> class for a real-world audio control interface.
    </p>
    <div style="display: flex; flex-direction: column; gap: var(--spacing-4);">
      <label class="range-output">
        <span>Master Volume</span>
        <input type="range" min="0" max="100" value="75">
      </label>
      <label class="range-output">
        <span>Bass</span>
        <input type="range" min="0" max="100" value="50">
      </label>
      <label class="range-output">
        <span>Treble</span>
        <input type="range" min="0" max="100" value="60">
      </label>
      <label class="range-output">
        <span>Balance</span>
        <input type="range" min="-50" max="50" value="0">
      </label>
    </div>
  </article>
`;

AudioControlsExample.storyName = 'Real-world Example (Audio Controls)';

export const ComparisonView = () => html`
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-6); max-width: 1000px;">
    <article class="card">
      <h3>Standard Mode</h3>
      <p style="color: var(--color-text-secondary); font-size: 0.875rem; margin-bottom: var(--spacing-4);">
        Floating bubble appears on hover/focus. Best for simple forms.
      </p>
      <div style="display: flex; flex-direction: column; gap: var(--spacing-4);">
        <label>
          <span>Volume</span>
          <input type="range" min="0" max="100" value="75">
        </label>
        <label>
          <span>Brightness</span>
          <input type="range" min="0" max="100" value="50">
        </label>
      </div>
    </article>
    
    <article class="card">
      <h3>Inline Output Mode</h3>
      <p style="color: var(--color-text-secondary); font-size: 0.875rem; margin-bottom: var(--spacing-4);">
        Persistent value display. Best for settings and controls.
      </p>
      <div style="display: flex; flex-direction: column; gap: var(--spacing-4);">
        <label class="range-output">
          <span>Volume</span>
          <input type="range" min="0" max="100" value="75">
        </label>
        <label class="range-output">
          <span>Brightness</span>
          <input type="range" min="0" max="100" value="50">
        </label>
      </div>
    </article>
  </div>
`;

ComparisonView.storyName = 'Side-by-side Comparison';
