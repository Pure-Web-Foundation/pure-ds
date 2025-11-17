import { html } from 'lit';

export default {
  title: 'Patterns/Layout',
  parameters: {
    docs: {
      description: {
        component: 'Layout patterns using grid, flex, and container utilities'
      }
    }
  }
};

export const GridLayout = () => html`
  <div class="grid" style="grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: var(--spacing-4);">
    ${Array.from({ length: 6 }, (_, i) => html`
      <div class="card">
        <h4>Grid Item ${i + 1}</h4>
        <p>Content in grid cell</p>
      </div>
    `)}
  </div>
`;

export const FlexLayout = () => html`
  <div class="flex gap-4 flex-wrap">
    <div class="card" style="flex: 1; min-width: 200px;">
      <h4>Flexible Box 1</h4>
      <p>Grows to fill space</p>
    </div>
    <div class="card" style="flex: 1; min-width: 200px;">
      <h4>Flexible Box 2</h4>
      <p>Equal flex basis</p>
    </div>
    <div class="card" style="flex: 1; min-width: 200px;">
      <h4>Flexible Box 3</h4>
      <p>Responsive wrapping</p>
    </div>
  </div>
`;

export const ContainerLayout = () => html`
  <div style="max-width: 1200px; margin: 0 auto; padding: var(--spacing-4);">
    <h2>Centered Container</h2>
    <p>Content is constrained to a maximum width and centered.</p>
    <div class="grid" style="grid-template-columns: repeat(3, 1fr); gap: var(--spacing-4); margin-top: var(--spacing-4);">
      ${Array.from({ length: 3 }, (_, i) => html`
        <div class="card">
          <h4>Column ${i + 1}</h4>
          <p>Three equal columns</p>
        </div>
      `)}
    </div>
  </div>
`;

export const ResponsiveGrid = () => html`
  <div class="demo-grid">
    ${Array.from({ length: 12 }, (_, i) => html`
      <div style="background: var(--color-primary-500); color: white; padding: var(--spacing-3); border-radius: var(--radius-sm); text-align: center;">
        ${i + 1}
      </div>
    `)}
  </div>
`;
