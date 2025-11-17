import { html } from 'lit';

export default {
  title: 'Utilities/Grid System',
  parameters: {
    docs: {
      description: {
        component: 'Modern, config-driven grid system with fixed column grids and auto-fit responsive layouts. All utilities are generated from layout.gridSystem configuration.'
      }
    }
  }
};

export const FixedColumnGrids = () => html`
  <div style="padding: var(--spacing-4);">
    <h3>Two Column Grid (.grid-cols-2)</h3>
    <div class="grid grid-cols-2 gap-md" style="margin-bottom: var(--spacing-6);">
      <div class="card" style="padding: var(--spacing-4); text-align: center;">
        <pds-icon icon="square" size="lg" class="icon-primary"></pds-icon>
        <h4>Column 1</h4>
        <p>Equal width columns</p>
      </div>
      <div class="card" style="padding: var(--spacing-4); text-align: center;">
        <pds-icon icon="square" size="lg" class="icon-secondary"></pds-icon>
        <h4>Column 2</h4>
        <p>Auto responsive</p>
      </div>
    </div>

    <h3>Three Column Grid (.grid-cols-3)</h3>
    <div class="grid grid-cols-3 gap-sm" style="margin-bottom: var(--spacing-6);">
      <div class="card" style="padding: var(--spacing-4); text-align: center;">
        <pds-icon icon="circle" size="md" class="icon-success"></pds-icon>
        <p>Column 1</p>
      </div>
      <div class="card" style="padding: var(--spacing-4); text-align: center;">
        <pds-icon icon="circle" size="md" class="icon-warning"></pds-icon>
        <p>Column 2</p>
      </div>
      <div class="card" style="padding: var(--spacing-4); text-align: center;">
        <pds-icon icon="circle" size="md" class="icon-danger"></pds-icon>
        <p>Column 3</p>
      </div>
    </div>

    <h3>Four Column Grid (.grid-cols-4)</h3>
    <div class="grid grid-cols-4 gap-xs">
      ${Array.from({ length: 4 }, (_, i) => html`
        <div class="card" style="padding: var(--spacing-3); text-align: center;">
          <strong>${i + 1}</strong>
        </div>
      `)}
    </div>
  </div>
`;

FixedColumnGrids.storyName = 'Fixed Column Grids';

export const AutoFitGrids = () => html`
  <div style="padding: var(--spacing-4);">
    <h3>.grid-auto-sm (min 150px)</h3>
    <p style="margin-bottom: var(--spacing-3); opacity: 0.8;">
      <em>Resize the window to see columns automatically adjust</em>
    </p>
    <div class="grid grid-auto-sm gap-md" style="margin-bottom: var(--spacing-6);">
      <div class="card" style="padding: var(--spacing-4); text-align: center;">
        <pds-icon icon="desktop" size="lg" class="icon-info"></pds-icon>
        <h5>Responsive</h5>
        <p>Automatically wraps</p>
      </div>
      <div class="card" style="padding: var(--spacing-4); text-align: center;">
        <pds-icon icon="device-mobile" size="lg" class="icon-info"></pds-icon>
        <h5>Adaptive</h5>
        <p>Based on space</p>
      </div>
      <div class="card" style="padding: var(--spacing-4); text-align: center;">
        <pds-icon icon="globe" size="lg" class="icon-info"></pds-icon>
        <h5>Flexible</h5>
        <p>Resize the window</p>
      </div>
      <div class="card" style="padding: var(--spacing-4); text-align: center;">
        <pds-icon icon="feather" size="lg" class="icon-info"></pds-icon>
        <h5>Dynamic</h5>
        <p>No breakpoints needed</p>
      </div>
    </div>

    <h3>.grid-auto-md (min 250px)</h3>
    <div class="grid grid-auto-md gap-lg">
      <div class="card surface-elevated" style="padding: var(--spacing-5); text-align: center;">
        <pds-icon icon="rocket" size="xl" class="icon-accent"></pds-icon>
        <h5>Card 1</h5>
        <p>Larger minimum width means fewer columns on small screens</p>
      </div>
      <div class="card surface-elevated" style="padding: var(--spacing-5); text-align: center;">
        <pds-icon icon="palette" size="xl" class="icon-accent"></pds-icon>
        <h5>Card 2</h5>
        <p>Smart surface tokens apply automatically</p>
      </div>
      <div class="card surface-elevated" style="padding: var(--spacing-5); text-align: center;">
        <pds-icon icon="heart" size="xl" class="icon-accent"></pds-icon>
        <h5>Card 3</h5>
        <p>Consistent spacing with gap utilities</p>
      </div>
    </div>
  </div>
`;

AutoFitGrids.storyName = 'Auto-Fit Responsive Grids';

export const GapUtilities = () => html`
  <div style="padding: var(--spacing-4);">
    <h2>Gap Utilities</h2>
    <p style="margin-bottom: var(--spacing-6);">
      Control spacing between grid items with <code>.gap-{size}</code> classes
    </p>
    
    <div style="display: grid; gap: var(--spacing-6); grid-template-columns: 1fr 1fr;">
      <div>
        <p><strong>.gap-xs</strong> (spacing-1)</p>
        <div class="grid grid-cols-3 gap-xs">
          ${Array.from({ length: 3 }, (_, i) => html`
            <div class="card" style="padding: var(--spacing-2); text-align: center;">
              <strong>${String.fromCharCode(65 + i)}</strong>
            </div>
          `)}
        </div>
      </div>

      <div>
        <p><strong>.gap-sm</strong> (spacing-2)</p>
        <div class="grid grid-cols-3 gap-sm">
          ${Array.from({ length: 3 }, (_, i) => html`
            <div class="card" style="padding: var(--spacing-2); text-align: center;">
              <strong>${String.fromCharCode(65 + i)}</strong>
            </div>
          `)}
        </div>
      </div>

      <div>
        <p><strong>.gap-md</strong> (spacing-4)</p>
        <div class="grid grid-cols-3 gap-md">
          ${Array.from({ length: 3 }, (_, i) => html`
            <div class="card" style="padding: var(--spacing-2); text-align: center;">
              <strong>${String.fromCharCode(65 + i)}</strong>
            </div>
          `)}
        </div>
      </div>

      <div>
        <p><strong>.gap-lg</strong> (spacing-6)</p>
        <div class="grid grid-cols-3 gap-lg">
          ${Array.from({ length: 3 }, (_, i) => html`
            <div class="card" style="padding: var(--spacing-2); text-align: center;">
              <strong>${String.fromCharCode(65 + i)}</strong>
            </div>
          `)}
        </div>
      </div>
    </div>
  </div>
`;

GapUtilities.storyName = 'Gap Utilities';

export const CardGridLayouts = () => html`
  <div style="padding: var(--spacing-4);">
    <h2>Card Grid Layouts</h2>
    <p style="margin-bottom: var(--spacing-4);">
      Practical examples using grid utilities for card-based layouts
    </p>
    
    <div class="grid grid-cols-3 gap-md">
      <div class="card" style="padding: var(--spacing-5);">
        <pds-icon icon="palette" size="xl" class="icon-primary"></pds-icon>
        <h5 style="margin-top: var(--spacing-3);">Design</h5>
        <p>Smart surfaces handle theming automatically</p>
      </div>
      <div class="card" style="padding: var(--spacing-5);">
        <pds-icon icon="code" size="xl" class="icon-success"></pds-icon>
        <h5 style="margin-top: var(--spacing-3);">Development</h5>
        <p>Zero manual color overrides needed</p>
      </div>
      <div class="card" style="padding: var(--spacing-5);">
        <pds-icon icon="rocket" size="xl" class="icon-info"></pds-icon>
        <h5 style="margin-top: var(--spacing-3);">Performance</h5>
        <p>CSS custom properties are fast</p>
      </div>
    </div>
  </div>
`;

CardGridLayouts.storyName = 'Card Grid Layouts';
