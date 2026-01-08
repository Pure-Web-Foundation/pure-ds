import { html } from 'lit';
import { enhancementHeader } from './_enhancement-header.js';

export default {
  title: 'Enhancements/Range Sliders',
  tags: ['range', 'slider', 'input', 'forms', 'interaction'],
  parameters: {
    options: {
      selectedPanel: 'html-preview/panel'
    },
    pds: {
      tags: ['range', 'slider', 'input', 'forms', 'interaction', 'enhancement']
    }
  }
};

export const StandardFloatingBubble = () => html`
  ${enhancementHeader('range')}
  <section class="card stack-md max-w-sm">
    <small class="text-muted">
      Default behavior: A floating bubble appears when you interact with the slider.
    </small>
    <label>
      <span>Volume</span>
      <input type="range" min="0" max="100" value="50">
    </label>
  </section>
`;

StandardFloatingBubble.storyName = 'Standard (Floating Bubble)';

export const MultipleRanges = () => html`
  ${enhancementHeader('range')}
  <form
    class="card stack-md max-w-sm"
    @submit="${(event) => {
      event.preventDefault();
      toastFormData(new FormData(event.target));
    }}"
  >
    <label>
      <span>Brightness</span>
      <input type="range" name="brightness" min="0" max="100" value="75">
    </label>
    <label>
      <span>Contrast</span>
      <input type="range" name="contrast" min="0" max="100" value="50">
    </label>
    <label>
      <span>Saturation</span>
      <input type="range" name="saturation" min="0" max="100" value="60">
    </label>
    <label>
      <span>Temperature</span>
      <input type="range" name="temperature" min="-100" max="100" value="0">
    </label>
    <button type="submit" class="btn-primary">Apply Settings</button>
  </form>
`;

export const CustomSteps = () => html`
  ${enhancementHeader('range')}
  <form
    class="card stack-md max-w-sm"
    @submit="${(event) => {
      event.preventDefault();
      toastFormData(new FormData(event.target));
    }}"
  >
    <label>
      <span>Opacity (10% steps)</span>
      <input type="range" name="opacity" min="0" max="100" value="100" step="10">
    </label>
    <label>
      <span>Font Size (0.25rem steps)</span>
      <input type="range" name="fontSize" min="0.5" max="3" value="1" step="0.25">
    </label>
    <button type="submit" class="btn-primary">Apply Settings</button>
  </form>
`;

export const InlineOutputMode = () => html`
  ${enhancementHeader('range')}
  <section class="card stack-md max-w-md">
    <small class="text-muted">
      Add the <code>range-output</code> class to automatically create an inline output display.
    </small>
    <div class="stack-md">
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
  </section>
`;

InlineOutputMode.storyName = 'Inline Output (range-output class)';

export const AudioControlsExample = () => html`
  ${enhancementHeader('range')}
  <article class="card stack-md max-w-md">
    <header>
      <h3>Audio Controls</h3>
      <small class="text-muted">
        Complete example using <code>range-output</code> class for a real-world audio control interface.
      </small>
    </header>
    <div class="stack-md">
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
  ${enhancementHeader('range')}
  <div class="grid grid-auto-md gap-lg max-w-3xl">
    <article class="card stack-md">
      <header>
        <h3>Standard Mode</h3>
        <small class="text-muted">
          Floating bubble appears on hover/focus. Best for simple forms.
        </small>
      </header>
      <div class="stack-md">
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

    <article class="card stack-md">
      <header>
        <h3>Inline Output Mode</h3>
        <small class="text-muted">
          Persistent value display. Best for settings and controls.
        </small>
      </header>
      <div class="stack-md">
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
