import { html } from 'lit';

export default {
  title: 'Foundations/Z-Index',
  parameters: {
    docs: {
      description: {
        component: 'Z-Index tokens define the stacking order of UI elements along the z-axis. These tokens ensure consistent layering across the application, preventing z-index conflicts and establishing clear visual hierarchy for overlays, modals, dropdowns, and other elevated UI components.'
      }
    }
  }
};

export const ZIndexScale = {
  name: 'Z-Index Scale',
  render: () => html`
    <div style="padding: var(--spacing-8); max-width: 1200px;">
      <h2>Z-Index Token Scale</h2>
      <p class="text-muted">
        Tokens are organized from lowest to highest z-index values, ensuring proper stacking of UI layers.
      </p>
      
      <div class="grid grid-cols-1 gap-md">
        <div class="card surface-subtle">
          <code style="font-weight: 600;">--z-dropdown</code>
          <span style="font-family: var(--font-mono, monospace); margin-left: var(--spacing-3);">1000</span>
          <p class="text-muted">Dropdown menus and select options</p>
        </div>
        
        <div class="card surface-subtle">
          <code style="font-weight: 600;">--z-sticky</code>
          <span style="font-family: var(--font-mono, monospace); margin-left: var(--spacing-3);">1020</span>
          <p class="text-muted">Sticky headers and navigation elements</p>
        </div>
        
        <div class="card surface-subtle">
          <code style="font-weight: 600;">--z-fixed</code>
          <span style="font-family: var(--font-mono, monospace); margin-left: var(--spacing-3);">1030</span>
          <p class="text-muted">Fixed position elements</p>
        </div>
        
        <div class="card surface-subtle">
          <code style="font-weight: 600;">--z-modal</code>
          <span style="font-family: var(--font-mono, monospace); margin-left: var(--spacing-3);">1040</span>
          <p class="text-muted">Modal dialogs and overlays</p>
        </div>
        
        <div class="card surface-subtle">
          <code style="font-weight: 600;">--z-drawer</code>
          <span style="font-family: var(--font-mono, monospace); margin-left: var(--spacing-3);">1050</span>
          <p class="text-muted">Drawer panels (side sheets)</p>
        </div>
        
        <div class="card surface-subtle">
          <code style="font-weight: 600;">--z-popover</code>
          <span style="font-family: var(--font-mono, monospace); margin-left: var(--spacing-3);">1060</span>
          <p class="text-muted">Popovers and context menus</p>
        </div>
        
        <div class="card surface-subtle">
          <code style="font-weight: 600;">--z-tooltip</code>
          <span style="font-family: var(--font-mono, monospace); margin-left: var(--spacing-3);">1070</span>
          <p class="text-muted">Tooltips and helper text</p>
        </div>
        
        <div class="card surface-subtle">
          <code style="font-weight: 600;">--z-notification</code>
          <span style="font-family: var(--font-mono, monospace); margin-left: var(--spacing-3);">1080</span>
          <p class="text-muted">Toast notifications and alerts</p>
        </div>
      </div>
      
      <div class="card card-outlined" style="margin-top: var(--spacing-8); border-left-width: 4px; border-left-color: var(--color-info);">
        <h3><pds-icon icon="info"></pds-icon> Best Practices</h3>
        <ul>
          <li>Always use these tokens instead of hard-coded z-index values</li>
          <li>Tokens are spaced by 10 to allow for intermediate values if needed</li>
          <li>Higher values appear above lower values in the stacking context</li>
          <li>Notifications have the highest z-index to ensure visibility</li>
          <li>Never exceed these values unless absolutely necessary</li>
        </ul>
      </div>
    </div>
  `
};

export const VisualDemo = {
  name: 'Visual Stacking Demo',
  render: () => html`
    <div style="padding: var(--spacing-8); max-width: 1200px;">
      <h2>Interactive Stacking Example</h2>
      <p class="text-muted">
        This demo shows how different z-index tokens create proper layering. 
        Lower elements appear behind higher ones.
      </p>
      
      <div class="surface" style="position: relative; height: 600px; overflow: hidden;">
        
        <div style="padding: var(--spacing-6);">
          <h3>Base Content (z-index: auto)</h3>
          <p>This is the base layer of content with no explicit z-index.</p>
        </div>
        
        <div class="card card-elevated" style="position: absolute; top: 100px; left: 50px; z-index: var(--z-dropdown); min-width: 200px;">
          <strong>Dropdown Menu</strong>
          <p><small>z-index: var(--z-dropdown) = 1000</small></p>
        </div>
        
        <div class="card surface-elevated" style="position: absolute; top: 180px; left: 100px; z-index: var(--z-sticky); min-width: 200px;">
          <strong>Sticky Header</strong>
          <p><small>z-index: var(--z-sticky) = 1020</small></p>
        </div>
        
        <div class="card surface-elevated" style="position: absolute; top: 260px; left: 150px; z-index: var(--z-fixed); min-width: 200px;">
          <strong>Fixed Element</strong>
          <p><small>z-index: var(--z-fixed) = 1030</small></p>
        </div>
        
        <div style="position: absolute; inset: 0; z-index: var(--z-modal); background: rgba(0, 0, 0, 0.1); display: flex; align-items: center; justify-content: center;">
          <article class="card card-elevated" style="max-width: 400px;">
            <h4>Modal Dialog</h4>
            <p><small>z-index: var(--z-modal) = 1040</small></p>
            <p class="text-muted">Modal dialogs appear above most other content.</p>
          </article>
        </div>
        
        <div class="surface-inverse" style="position: absolute; top: 50px; right: 50px; z-index: var(--z-tooltip); padding: var(--spacing-2) var(--spacing-3);">
          <strong>Tooltip</strong>
          <p><small>--z-tooltip: 1070</small></p>
        </div>
        
        <div class="card" style="position: absolute; top: 20px; right: 20px; z-index: var(--z-notification); background: var(--color-success); color: white; min-width: 250px;">
          <strong>🎉 Notification Toast</strong>
          <p><small>z-index: var(--z-notification) = 1080</small></p>
          <p><small>Highest layer</small></p>
        </div>
        
      </div>
      
      <div class="card card-outlined" style="margin-top: var(--spacing-6);">
        <p>
          <strong>Note:</strong> In this demo, elements are positioned to overlap. 
          Notice how higher z-index values appear above lower ones, with notifications at the top.
        </p>
      </div>
    </div>
  `
};

export const UsageExamples = {
  name: 'Usage Examples',
  render: () => html`
    <div style="padding: var(--spacing-8); max-width: 1200px;">
      <h2>Code Examples</h2>
      <p class="text-muted">
        How to use z-index tokens in your components and styles.
      </p>
      
      <div class="grid grid-cols-1 gap-lg">
        
        <article class="card surface-subtle">
          <h3>Modal Dialog</h3>
          <pre><code>.modal {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  display: flex;
  align-items: center;
  justify-content: center;
}</code></pre>
        </article>
        
        <article class="card surface-subtle">
          <h3>Dropdown Menu</h3>
          <pre><code>.dropdown-menu {
  position: absolute;
  z-index: var(--z-dropdown);
  background: var(--color-surface-elevated);
  box-shadow: var(--shadow-lg);
  border-radius: var(--radius-md);
}</code></pre>
        </article>
        
        <article class="card surface-subtle">
          <h3>Sticky Header</h3>
          <pre><code>.sticky-header {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  background: var(--color-surface-base);
  box-shadow: var(--shadow-sm);
}</code></pre>
        </article>
        
        <article class="card surface-subtle">
          <h3>Toast Notification</h3>
          <pre><code>.toast-notification {
  position: fixed;
  top: var(--spacing-4);
  right: var(--spacing-4);
  z-index: var(--z-notification);
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-xl);
}</code></pre>
        </article>
        
        <article class="card surface-subtle">
          <h3>Tooltip</h3>
          <pre><code>.tooltip {
  position: absolute;
  z-index: var(--z-tooltip);
  padding: var(--spacing-2);
  background: var(--color-surface-inverse);
  color: var(--color-text-inverse);
  font-size: var(--font-size-sm);
  border-radius: var(--radius-sm);
}</code></pre>
        </article>
        
      </div>
      
      <aside class="card card-outlined" style="margin-top: var(--spacing-8); border-left-width: 4px; border-left-color: var(--color-warning);">
        <h3><pds-icon icon="warning"></pds-icon> Important Guidelines</h3>
        <ul>
          <li><strong>Never use magic numbers:</strong> Always reference these tokens instead of hardcoded values</li>
          <li><strong>Respect the hierarchy:</strong> Don't try to make a dropdown appear above a modal</li>
          <li><strong>Stacking context:</strong> Remember that z-index only works within the same stacking context</li>
          <li><strong>Negative values:</strong> Avoid negative z-index values; use these tokens instead</li>
          <li><strong>Component libraries:</strong> Ensure third-party components don't conflict with these ranges</li>
        </ul>
      </aside>
    </div>
  `
};
