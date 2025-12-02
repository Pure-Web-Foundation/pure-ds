import { html } from 'lit';

export default {
  title: 'Patterns/Layout',
  tags: ['grouping'],
  parameters: {
    pds: {
      tags: ['layout', 'grid', 'flex', 'grouping']
    },
    docs: {
      description: {
        component: 'Layout patterns using grid, flex, and container utilities'
      }
    }
  }
};

const layoutStoryStyles = html`
  <style>
    .layout-auto-grid {
      grid-template-columns: repeat(auto-fill, minmax(12.5rem, 1fr));
      gap: var(--spacing-4);
    }
    .layout-flex-item {
      flex: 1;
      min-width: 12.5rem;
    }
    .layout-container {
      max-width: 75rem;
      margin: 0 auto;
      padding: var(--spacing-4);
    }
    .layout-section-spacing {
      margin-top: var(--spacing-4);
    }
    .layout-grid-card {
      padding: var(--spacing-4);
      text-align: center;
    }
  </style>
`;

export const GridLayout = () => html`
  ${layoutStoryStyles}
  <div class="grid layout-auto-grid">
    ${Array.from({ length: 6 }, (_, i) => html`
      <div class="card">
        <h4>Grid Item ${i + 1}</h4>
        <p>Content in grid cell</p>
      </div>
    `)}
  </div>
`;

export const FlexLayout = () => html`
  ${layoutStoryStyles}
  <div class="flex gap-sm flex-wrap">
    <div class="card layout-flex-item">
      <h4>Flexible Box 1</h4>
      <p>Grows to fill space</p>
    </div>
    <div class="card layout-flex-item">
      <h4>Flexible Box 2</h4>
      <p>Equal flex basis</p>
    </div>
    <div class="card layout-flex-item">
      <h4>Flexible Box 3</h4>
      <p>Responsive wrapping</p>
    </div>
  </div>
`;

export const ContainerLayout = () => html`
  ${layoutStoryStyles}
  <div class="layout-container">
    <h2>Centered Container</h2>
    <p>Content is constrained to a maximum width and centered.</p>
    <div class="grid grid-cols-3 gap-md layout-section-spacing">
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
  ${layoutStoryStyles}
  <div class="grid grid-auto-md gap-md">
    ${Array.from({ length: 12 }, (_, i) => html`
      <div class="card layout-grid-card">
        <h4>Item ${i + 1}</h4>
        <p>Auto-responsive grid cell</p>
      </div>
    `)}
  </div>
`;
