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
  <div style="display: flex; flex-direction: column;">
    <div class="gap-1" style="display: flex; background: var(--color-gray-100); padding: var(--spacing-2);">
      <div class="badge">Gap 1</div>
      <div class="badge">Between</div>
      <div class="badge">Items</div>
    </div>
    <div class="gap-2" style="display: flex; background: var(--color-gray-100); padding: var(--spacing-2); margin-top: var(--spacing-2);">
      <div class="badge">Gap 2</div>
      <div class="badge">Between</div>
      <div class="badge">Items</div>
    </div>
    <div class="gap-4" style="display: flex; background: var(--color-gray-100); padding: var(--spacing-2); margin-top: var(--spacing-2);">
      <div class="badge">Gap 4</div>
      <div class="badge">Between</div>
      <div class="badge">Items</div>
    </div>
  </div>
`;

export const FlexUtilities = () => html`
  <div class="flex items-center gap-4" style="padding: var(--spacing-4); background: var(--surface-bg);">
    <pds-icon icon="star" size="lg"></pds-icon>
    <div style="flex: 1;">
      <h4 style="margin: 0;">Flex Item</h4>
      <p style="margin: 0; font-size: 0.875rem; color: var(--surface-text-secondary);">Vertically centered with gap</p>
    </div>
    <button class="btn-primary">Action</button>
  </div>
`;

export const BorderUtilities = () => html`
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-4);">
    <div class="border" style="padding: var(--spacing-4);">
      <h4>Default Border</h4>
      <p>Using .border class</p>
    </div>
    <div class="border-gradient" style="padding: var(--spacing-4);">
      <h4>Gradient Border</h4>
      <p>Using .border-gradient</p>
    </div>
    <div class="border-glow" style="padding: var(--spacing-4);">
      <h4>Glowing Border</h4>
      <p>Using .border-glow</p>
    </div>
  </div>
`;

export const RoundedUtilities = () => html`
  <div style="display: flex; gap: var(--spacing-4); flex-wrap: wrap;">
    <div style="width: 100px; height: 100px; background: var(--color-primary-500); border-radius: var(--radius-sm);"></div>
    <div style="width: 100px; height: 100px; background: var(--color-secondary-500); border-radius: var(--radius-md);"></div>
    <div style="width: 100px; height: 100px; background: var(--color-accent-500); border-radius: var(--radius-lg);"></div>
    <div style="width: 100px; height: 100px; background: var(--color-primary-500); border-radius: 50%;"></div>
  </div>
`;
