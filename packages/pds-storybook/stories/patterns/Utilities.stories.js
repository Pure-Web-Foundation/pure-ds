import { html } from 'lit';

export default {
  title: 'Patterns/Utilities',
  parameters: {
    docs: {
      description: {
        component: 'Utility classes for spacing, sizing, and common patterns'
      }
    }
  }
};

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
  <div class="card flex items-center gap-md" >
    <pds-icon icon="star" size="lg"></pds-icon>
    <div style="flex: 1;">
      <h4 style="margin: 0;">Flex Item</h4>
      <p style="margin: 0; font-size: 0.875rem; color: var(--surface-text-secondary);">Vertically centered with gap</p>
    </div>
    <button class="btn-primary">Action</button>
  </div>
`;

export const BorderUtilities = () => html`
  <div class="grid gap-md" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
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
  <div class="flex gap-md flex-wrap">
    <div class="card" style="background: var(--color-secondary-400); width: 100px; height: 100px; border-radius: var(--radius-sm);">--radius-sm</div>
    <div class="card" style="background: var(--color-secondary-400); width: 100px; height: 100px; border-radius: var(--radius-md);">--radius-md</div>
    <div class="card" style="background: var(--color-secondary-400); width: 100px; height: 100px; border-radius: var(--radius-lg);">--radius-lg</div>
    <div class="card" style="background: var(--color-secondary-400); width: 100px; height: 100px; border-radius: var(--radius-full);">--radius-full</div>
  </div>
`;
