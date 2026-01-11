import { html } from "lit";

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
  title: "Patterns/Utilities",
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
  <div class="card flex items-center gap-md">
    <pds-icon icon="star" size="lg"></pds-icon>
    <header class="grow">
      <h4>Flex Item</h4>
      <small class="text-muted">Vertically centered with gap</small>
    </header>
    <button class="btn-primary">Action</button>
  </div>
`;

export const BorderUtilities = () => html`
  <div class="grid grid-auto-sm gap-md">
    <div class="card stack-md">
      <h4>Default Border</h4>
      <p>No border specified</p>
    </div>
    <div class="card border-gradient stack-md">
      <h4>Gradient Border</h4>
      <p>Using .border-gradient</p>
    </div>
    <div class="card border-glow stack-md">
      <h4>Glowing Border</h4>
      <p>Using .border-glow</p>
    </div>
  </div>
`;

export const RoundedUtilities = () => html`
  ${utilitiesStoryStyles}
  <div class="flex gap-md flex-wrap">
    <div class="card surface-inverse story-radius-sm">--radius-sm</div>
    <div class="card surface-inverse story-radius-md">--radius-md</div>
    <div class="card surface-inverse story-radius-lg">--radius-lg</div>
    <div class="card surface-inverse story-radius-full">--radius-full</div>
  </div>
`;
