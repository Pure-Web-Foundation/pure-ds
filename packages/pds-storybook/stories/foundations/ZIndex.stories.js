import { html } from 'lit';

export default {
  title: 'Foundations/Z-Index',
  tags: ['z-index', 'zindex', 'stacking', 'layer', 'overlay', 'modal'],
  parameters: {
    pds: {
      tags: ['z-index', 'zindex', 'stacking', 'layer', 'overlay', 'modal', 'dropdown', 'tokens']
    },
    docs: {
      description: {
        component: 'Z-Index tokens define the stacking order of UI elements along the z-axis. These tokens ensure consistent layering across the application, preventing z-index conflicts and establishing clear visual hierarchy for overlays, modals, dropdowns, and other elevated UI components.'
      }
    }
  }
};

const zIndexStoryStyles = html`
  <style>
    .z-index-section {
      padding: var(--spacing-8);
      max-width: 75rem;
    }
    .z-index-value {
      font-weight: 600;
    }
    .z-index-number {
      font-family: var(--font-mono, monospace);
      margin-left: var(--spacing-3);
    }
    .z-index-callout {
      margin-top: var(--spacing-8);
      border-left-width: 4px;
    }
    .z-index-callout--info {
      border-left-color: var(--color-info);
    }
    .z-index-callout--warning {
      border-left-color: var(--color-warning);
    }
    .z-index-demo-wrapper {
      position: relative;
      height: 37.5rem;
      overflow: hidden;
    }
    .z-index-demo-base {
      padding: var(--spacing-6);
    }
    .z-index-demo-dropdown {
      position: absolute;
      top: 100px;
      left: 50px;
      z-index: var(--z-dropdown);
      min-width: 12.5rem;
    }
    .z-index-demo-sticky {
      position: absolute;
      top: 180px;
      left: 100px;
      z-index: var(--z-sticky);
      min-width: 12.5rem;
    }
    .z-index-demo-fixed {
      position: absolute;
      top: 260px;
      left: 150px;
      z-index: var(--z-fixed);
      min-width: 12.5rem;
    }
    .z-index-demo-modal-overlay {
      position: absolute;
      border-radius: var(--radius-md);
      inset: 0;
      z-index: var(--z-modal);
      background: rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .z-index-demo-modal-card {
      max-width: 25rem;
    }
    .z-index-demo-tooltip {
      position: absolute;
      top: 50px;
      right: 50px;
      z-index: var(--z-tooltip);
      padding: var(--spacing-2) var(--spacing-3);
    }
    .z-index-demo-toast {
      position: absolute;
      top: 20px;
      right: 20px;
      z-index: var(--z-notification);
      background: var(--color-success);
      color: var(--color-text-inverse, #ffffff);
      min-width: 15.625rem;
    }
    .z-index-note {
      margin-top: var(--spacing-6);
    }
  </style>
`;

export const ZIndexScale = {
  name: 'Z-Index Scale',
  render: () => html`
    ${zIndexStoryStyles}
    <div class="z-index-section">
      <h2>Z-Index Token Scale</h2>
      <p class="text-muted">
        Tokens are organized from lowest to highest z-index values, ensuring proper stacking of UI layers.
      </p>
      
      <div class="grid grid-cols-1 gap-md">
        <div class="card surface-translucent-50">
          <code class="z-index-value">--z-dropdown</code>
          <span class="z-index-number">1000</span>
          <p class="text-muted">Dropdown menus and select options</p>
        </div>
        
        <div class="card surface-translucent-50">
          <code class="z-index-value">--z-sticky</code>
          <span class="z-index-number">1020</span>
          <p class="text-muted">Sticky headers and navigation elements</p>
        </div>
        
        <div class="card surface-translucent-50">
          <code class="z-index-value">--z-fixed</code>
          <span class="z-index-number">1030</span>
          <p class="text-muted">Fixed position elements</p>
        </div>
        
        <div class="card surface-translucent-50">
          <code class="z-index-value">--z-modal</code>
          <span class="z-index-number">1040</span>
          <p class="text-muted">Modal dialogs and overlays</p>
        </div>
        
        <div class="card surface-translucent-50">
          <code class="z-index-value">--z-drawer</code>
          <span class="z-index-number">1050</span>
          <p class="text-muted">Drawer panels (side sheets)</p>
        </div>
        
        <div class="card surface-translucent-50">
          <code class="z-index-value">--z-popover</code>
          <span class="z-index-number">1060</span>
          <p class="text-muted">Popovers and context menus</p>
        </div>
        
        <div class="card surface-translucent-50">
          <code class="z-index-value">--z-tooltip</code>
          <span class="z-index-number">1070</span>
          <p class="text-muted">Tooltips and helper text</p>
        </div>
        
        <div class="card surface-translucent-50">
          <code class="z-index-value">--z-notification</code>
          <span class="z-index-number">1080</span>
          <p class="text-muted">Toast notifications and alerts</p>
        </div>
      </div>
      
      <div class="card card-outlined z-index-callout z-index-callout--info">
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
    ${zIndexStoryStyles}
    <div class="z-index-section">
      <h2>Interactive Stacking Example</h2>
      <p class="text-muted">
        This demo shows how different z-index tokens create proper layering. 
        Lower elements appear behind higher ones.
      </p>
      
      <div class="surface z-index-demo-wrapper">
        
        <div class="z-index-demo-base">
          <h3>Base Content (z-index: auto)</h3>
          <p>This is the base layer of content with no explicit z-index.</p>
        </div>
        
        <div class="card card-elevated z-index-demo-dropdown">
          <strong>Dropdown Menu</strong>
          <p><small>z-index: var(--z-dropdown) = 1000</small></p>
        </div>
        
        <div class="card surface-elevated z-index-demo-sticky">
          <strong>Sticky Header</strong>
          <p><small>z-index: var(--z-sticky) = 1020</small></p>
        </div>
        
        <div class="card surface-elevated z-index-demo-fixed">
          <strong>Fixed Element</strong>
          <p><small>z-index: var(--z-fixed) = 1030</small></p>
        </div>
        
        <div class="z-index-demo-modal-overlay">
          <article class="card card-elevated z-index-demo-modal-card">
            <h4>Modal Dialog</h4>
            <p><small>z-index: var(--z-modal) = 1040</small></p>
            <p class="text-muted">Modal dialogs appear above most other content.</p>
          </article>
        </div>
        
        <div class="surface-inverse z-index-demo-tooltip">
          <strong>Tooltip</strong>
          <p><small>--z-tooltip: 1070</small></p>
        </div>
        
        <div class="card z-index-demo-toast">
          <strong>🎉 Notification Toast</strong>
          <p><small>z-index: var(--z-notification) = 1080</small></p>
          <p><small>Highest layer</small></p>
        </div>
        
      </div>
      
      <div class="card card-outlined z-index-note">
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
    ${zIndexStoryStyles}
    <div class="z-index-section">
      <h2>Code Examples</h2>
      <p class="text-muted">
        How to use z-index tokens in your components and styles.
      </p>
      
      <div class="grid grid-cols-1 gap-lg">
        
        <article class="card surface-translucent-50">
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
        
        <article class="card surface-translucent-50"> 
          <h3>Dropdown Menu</h3>
          <pre><code>.dropdown-menu {
  position: absolute;
  z-index: var(--z-dropdown);
  background: var(--color-surface-elevated);
  box-shadow: var(--shadow-lg);
  border-radius: var(--radius-md);
}</code></pre>
        </article>
        
        <article class="card surface-translucent-50">
          <h3>Sticky Header</h3>
          <pre><code>.sticky-header {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  background: var(--color-surface-base);
  box-shadow: var(--shadow-sm);
}</code></pre>
        </article>
        
        <article class="card surface-translucent-50">
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
        
        <article class="card surface-translucent-50">
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
      
      <aside class="card card-outlined z-index-callout z-index-callout--warning">
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
