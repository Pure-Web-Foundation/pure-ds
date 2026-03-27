import { html } from "#pds/lit";

// Story-specific styles (not PDS classes - demo only)
const utilitiesStoryStyles = html`
  <style>
    /* Radius demo */
    .story-radius-sm { border-radius: var(--radius-sm); }
    .story-radius-md { border-radius: var(--radius-md); }
    .story-radius-lg { border-radius: var(--radius-lg); }
    .story-radius-full { border-radius: var(--radius-full); }
  </style>
`;

export default {
  title: "Primitives & Patterns/Utilities",
  tags: ["utilities", "spacing", "layout", "gap"],
  parameters: {
    pds: {
      tags: ["utilities", "layout", "spacing", "gap"],
    },
    docs: {
      description: {
        component: "Utility classes for spacing, sizing, and common patterns",
      },
    },
  },
};

export const SpacingUtilities = () => html`
  <div class="stack-md">
    <header>
      <h3>Spacing Utilities</h3>
      <small class="text-muted">Gap utilities for consistent spacing between flex and grid items.</small>
    </header>
    <div class="gap-xs flex">
      <div class="badge">Gap 1</div>
      <div class="badge">Between</div>
      <div class="badge">Items</div>
    </div>
    <div class="gap-sm flex">
      <div class="badge">Gap 2</div>
      <div class="badge">Between</div>
      <div class="badge">Items</div>
    </div>
    <div class="gap-md flex">
      <div class="badge">Gap 4</div>
      <div class="badge">Between</div>
      <div class="badge">Items</div>
    </div>
  </div>
`;

export const FlexUtilities = () => html`
  <div class="card">
    <header>
      <h3>Flex Utilities</h3>
      <small class="text-muted">Align and distribute content with composable flex helpers.</small>
    </header>
    <div class="flex items-center gap-md">
      <pds-icon icon="star" size="lg"></pds-icon>
      <header class="grow">
        <h4>Flex Item</h4>
        <small class="text-muted">Vertically centered with gap</small>
      </header>
      <button class="btn-primary">Action</button>
    </div>
  </div>
`;

export const BorderUtilities = () => html`
  <div class="stack-md">
    <header>
      <h3>Border Utilities</h3>
      <small class="text-muted">Apply border effects for emphasis, depth, and visual accents.</small>
    </header>
    <div class="grid grid-auto-sm gap-md">
      <div class="card">
        <h4>Default Border</h4>
        <p>No border specified</p>
      </div>
      <div class="card border-gradient">
        <h4>Gradient Border</h4>
        <p>Using .border-gradient</p>
      </div>
      <div class="card border-glow">
        <h4>Glowing Border</h4>
        <p>Using .border-glow</p>
      </div>
    </div>
  </div>
`;

export const RoundedUtilities = () => html`
  ${utilitiesStoryStyles}
  <div class="stack-md">
    <header>
      <h3>Rounded Utilities</h3>
      <small class="text-muted">Border-radius utilities mapped to PDS radius tokens.</small>
    </header>
    <div class="flex gap-md flex-wrap">
      <div class="card surface-inverse story-radius-sm">--radius-sm</div>
      <div class="card surface-inverse story-radius-md">--radius-md</div>
      <div class="card surface-inverse story-radius-lg">--radius-lg</div>
      <div class="card surface-inverse story-radius-full">--radius-full</div>
    </div>
  </div>
`;
