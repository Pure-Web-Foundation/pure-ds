import { html } from 'lit';
import { enhancementHeader } from './_enhancement-header.js';

export default {
  title: "Enhancements/button, a[class*='btn-']",
  tags: ['button', 'loading', 'working', 'spinner', 'enhancement'],
  parameters: {
    options: {
      selectedPanel: 'html-preview/panel'
    },
    pds: {
      tags: ['button', 'loading', 'working', 'spinner', 'interaction', 'feedback', 'enhancement']
    }
  }
};

const toggleWorking = (btn) => {
  btn.classList.add('btn-working');
  setTimeout(() => {
    btn.classList.remove('btn-working');
  }, 2000);
};

export const BasicWorkingState = () => html`
  ${enhancementHeader('buttonWorking')}
  <div class="stack-lg">
    <p class="text-muted">Click any button to see the enhancement in action.</p>

    <div class="stack-md">
      <h3>Buttons Without Icons</h3>
      <small class="text-muted">Enhancer automatically adds spinner icon</small>
      <div class="flex flex-wrap gap-sm">
        <button class="btn-primary" @click=${(e) => toggleWorking(e.target)}>
          Save
        </button>
        <button class="btn-secondary" @click=${(e) => toggleWorking(e.target)}>
          Upload
        </button>
        <button class="btn-outline" @click=${(e) => toggleWorking(e.target)}>
          Download
        </button>
      </div>
    </div>

    <div class="stack-md">
      <h3>Buttons With Icons</h3>
      <small class="text-muted">Enhancer swaps icon to spinner, restores original when complete</small>
      <div class="flex flex-wrap gap-sm">
        <button class="btn-primary" @click=${(e) => toggleWorking(e.target)}>
          <pds-icon icon="floppy-disk" size="sm"></pds-icon>
          Save
        </button>
        <button class="btn-secondary" @click=${(e) => toggleWorking(e.target)}>
          <pds-icon icon="upload" size="sm"></pds-icon>
          Upload
        </button>
        <button class="btn-outline" @click=${(e) => toggleWorking(e.target)}>
          <pds-icon icon="download" size="sm"></pds-icon>
          Download
        </button>
      </div>
    </div>

    <div class="stack-md">
      <h3>Icon-Only Buttons</h3>
      <div class="flex flex-wrap gap-sm">
        <button class="btn-primary icon-only" @click=${(e) => toggleWorking(e.target)} aria-label="Refresh">
          <pds-icon icon="arrow-counter-clockwise"></pds-icon>
        </button>
        <button class="btn-secondary icon-only" @click=${(e) => toggleWorking(e.target)} aria-label="Sync">
          <pds-icon icon="arrows-clockwise"></pds-icon>
        </button>
        <button class="btn-outline icon-only" @click=${(e) => toggleWorking(e.target)} aria-label="Process">
          <pds-icon icon="gear"></pds-icon>
        </button>
      </div>
    </div>
  </div>
`;

BasicWorkingState.storyName = 'Basic Working State';

export const PermanentWorkingState = () => html`
  ${enhancementHeader('buttonWorking')}
  <div class="stack-md">
    <p class="text-muted">Buttons in continuous working state for demonstration</p>
    <div class="flex flex-wrap gap-sm">
      <button class="btn-primary btn-working">
        <pds-icon icon="circle-notch" size="sm"></pds-icon>
        Loading...
      </button>
      <button class="btn-secondary btn-working">
        <pds-icon icon="circle-notch" size="sm"></pds-icon>
        Processing...
      </button>
      <button class="btn-outline icon-only btn-working" aria-label="Loading">
        <pds-icon icon="circle-notch"></pds-icon>
      </button>
    </div>
  </div>
`;

PermanentWorkingState.storyName = 'Permanent Working State';

export const UsageExample = () => html`
  ${enhancementHeader('buttonWorking')}
  <div class="card max-w-lg">
    <h3>Usage</h3>
    <pre class="surface-subtle radius-md overflow-auto"><code>// Simply toggle the class - PDS handles the rest
button.classList.add('btn-working');

// After async operation completes
button.classList.remove('btn-working');

// Example with async operation
async function handleSubmit(button) {
  button.classList.add('btn-working');
  try {
    await saveData();
  } finally {
    button.classList.remove('btn-working');
  }
}</code></pre>
  </div>
`;

UsageExample.storyName = 'Usage Example';
