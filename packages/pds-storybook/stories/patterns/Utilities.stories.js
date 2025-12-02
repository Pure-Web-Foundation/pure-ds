import { html } from 'lit';

export default {
  title: 'Patterns/Utilities',
  tags: ['utilities', 'spacing', 'layout', 'gap'],
  parameters: {
    pds: {
      tags: ['utilities', 'layout', 'spacing', 'gap']
    },
    docs: {
      description: {
        component: 'Utility classes for spacing, sizing, and common patterns'
      }
    }
  }
};

const utilitiesStoryStyles = html`
  <style>
    .utilities-flex-fill {
      flex: 1;
    }
    .utilities-heading-reset {
      margin: 0;
    }
    .utilities-helper-text {
      margin: 0;
      font-size: 0.875rem;
      color: var(--surface-text-secondary);
    }
    .utilities-auto-grid {
      grid-template-columns: repeat(auto-fit, minmax(12.5rem, 1fr));
    }
    .utilities-radius-sm {
      border-radius: var(--radius-sm);
    }
    .utilities-radius-md {
      border-radius: var(--radius-md);
    }
    .utilities-radius-lg {
      border-radius: var(--radius-lg);
    }
    .utilities-radius-full {
      border-radius: var(--radius-full);
    }
  </style>
`;

export const SpacingUtilities = () => html`
  <div class="flex flex-col gap-md">
    <div class="gap-xs flex" >
      <div class="badge">Gap 1</div>
      <div class="badge">Between</div>
      <div class="badge">Items</div>
    </div>
    <div class="gap-sm flex" >
      <div class="badge">Gap 2</div>
      <div class="badge">Between</div>
      <div class="badge">Items</div>
    </div>
    <div class="gap-md flex" >
      <div class="badge">Gap 4</div>
      <div class="badge">Between</div>
      <div class="badge">Items</div>
    </div>
  </div>
`;

export const FlexUtilities = () => html`
  ${utilitiesStoryStyles}
  <div class="card flex items-center gap-md" >
    <pds-icon icon="star" size="lg"></pds-icon>
    <div class="utilities-flex-fill">
      <h4 class="utilities-heading-reset">Flex Item</h4>
      <p class="utilities-helper-text">Vertically centered with gap</p>
    </div>
    <button class="btn-primary">Action</button>
  </div>
`;

export const BorderUtilities = () => html`
  ${utilitiesStoryStyles}
  <div class="grid gap-md utilities-auto-grid">
    <div class="card" >
      <h4>Default Border</h4>
      <p>No border specified</p>
    </div>
    <div class="card border-gradient" >
      <h4>Gradient Border</h4>
      <p>Using .border-gradient</p>
    </div>
    <div class="card border-glow" >
      <h4>Glowing Border</h4>
      <p>Using .border-glow</p>
    </div>
  </div>
`;

export const RoundedUtilities = () => html`
  ${utilitiesStoryStyles}
  <div class="flex gap-md flex-wrap">
    <div class="card surface-inverse utilities-radius-sm">--radius-sm</div>
    <div class="card surface-inverse utilities-radius-md">--radius-md</div>
    <div class="card surface-inverse utilities-radius-lg">--radius-lg</div>
    <div class="card surface-inverse utilities-radius-full">--radius-full</div>
  </div>
`;
