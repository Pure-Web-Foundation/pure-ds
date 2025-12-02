import { html } from 'lit';

export default {
  title: 'Foundations/Smart Surfaces',
  parameters: {
    pds: {
      tags: ['surface', 'colors', 'layout']
    },
    docs: {
      description: {
        component: 'Smart surface system that automatically adapts text, icons, shadows, and borders based on backgrounds. Maintains WCAG AA contrast ratios automatically.'
      }
    }
  }
};

const smartSurfacesStoryStyles = html`
  <style>
    .smart-surfaces-section {
      padding: var(--spacing-4);
    }
    .smart-surfaces-subtitle {
      margin-bottom: var(--spacing-6);
    }
    .smart-surfaces-grid--variants {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(15.625rem, 1fr));
      gap: var(--spacing-4);
    }
    .smart-surfaces-grid--shadows {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(12.5rem, 1fr));
      gap: var(--spacing-6);
    }
    .smart-surfaces-grid--inversion {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(18.75rem, 1fr));
      gap: var(--spacing-4);
    }
    .smart-surfaces-grid--borders {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(18.75rem, 1fr));
      gap: var(--spacing-6);
    }
    .smart-surfaces-surface {
      padding: var(--spacing-6);
      border-radius: var(--radius-md);
    }
    .smart-surfaces-title {
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
    }
    .smart-surfaces-description {
      margin-top: var(--spacing-2);
    }
    .smart-surfaces-button-spacing {
      margin-top: var(--spacing-3);
    }
    .smart-surfaces-button-spacing-sm {
      margin-top: var(--spacing-2);
    }
    .smart-surfaces-shadow-card {
      padding: var(--spacing-6);
      border-radius: var(--radius-md);
      text-align: center;
    }
    .smart-surfaces-shadow-label {
      display: block;
      margin-top: var(--spacing-2);
    }
    .smart-surfaces-shadow-token {
      margin: var(--spacing-1) 0 0 0;
      opacity: 0.7;
    }
    .smart-surfaces-nested {
      padding: var(--spacing-6);
      border-radius: var(--radius-md);
    }
    .smart-surfaces-nested-inner {
      padding: var(--spacing-6);
      margin-top: var(--spacing-4);
      border-radius: var(--radius-md);
    }
    .smart-surfaces-nested-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--spacing-4);
      margin-top: var(--spacing-4);
    }
    .smart-surfaces-card {
      padding: var(--spacing-4);
    }
    .smart-surfaces-sunken {
      padding: var(--spacing-4);
      margin-top: var(--spacing-3);
      border-radius: var(--radius-sm);
    }
    .smart-surfaces-inline {
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
    }
    .smart-surfaces-border-card {
      padding: var(--spacing-6);
    }
    .smart-surfaces-border-code {
      font-size: var(--font-size-sm);
      opacity: 0.7;
    }
  </style>
`;

export const SurfaceVariants = () => html`
  ${smartSurfacesStoryStyles}
  <div class="smart-surfaces-section">
    <h2>Surface Variants</h2>
    <p class="smart-surfaces-subtitle">
      All surfaces automatically adjust text, icon, shadow, and border colors to maintain proper contrast.
    </p>
    
    <div class="smart-surfaces-grid--variants">
      <div class="surface-base smart-surfaces-surface">
        <strong class="surface-title smart-surfaces-title">
          <pds-icon icon="square"></pds-icon>
          Base Surface
        </strong>
        <p class="surface-description smart-surfaces-description">
          Default background with auto-adjusted text and icons
        </p>
        <button class="btn-primary smart-surfaces-button-spacing">
          Button
        </button>
      </div>
      
      <div class="surface-subtle smart-surfaces-surface">
        <strong class="surface-title smart-surfaces-title">
          <pds-icon icon="square"></pds-icon>
          Subtle Surface
        </strong>
        <p class="surface-description smart-surfaces-description">
          Slightly different tone for visual hierarchy
        </p>
        <button class="btn-secondary smart-surfaces-button-spacing">
          Button
        </button>
      </div>
      
      <div class="surface-elevated smart-surfaces-surface">
        <strong class="surface-title smart-surfaces-title">
          <pds-icon icon="arrow-up"></pds-icon>
          Elevated Surface
        </strong>
        <p class="surface-description smart-surfaces-description">
          Raised with smart shadows that adapt in dark mode
        </p>
        <button class="btn-primary smart-surfaces-button-spacing">
          Button
        </button>
      </div>
      
      <div class="surface-overlay smart-surfaces-surface">
        <strong class="surface-title smart-surfaces-title">
          <pds-icon icon="desktop"></pds-icon>
          Overlay Surface
        </strong>
        <p class="surface-description smart-surfaces-description">
          Modal/dropdown backgrounds with stronger shadows
        </p>
        <button class="btn-outline smart-surfaces-button-spacing">
          Button
        </button>
      </div>
    </div>
  </div>
`;

SurfaceVariants.storyName = 'Surface Variants';

export const ContextAwareShadows = () => html`
  ${smartSurfacesStoryStyles}
  <div class="smart-surfaces-section">
    <h2>Context-Aware Shadows</h2>
    <p class="smart-surfaces-subtitle">
      Shadows automatically invert in dark mode: dark shadows on light surfaces, light shadows on dark surfaces.
    </p>
    
    <div class="smart-surfaces-grid--shadows">
      <div class="shadow-sm surface-elevated smart-surfaces-shadow-card">
        <pds-icon icon="feather" size="lg"></pds-icon>
        <strong class="smart-surfaces-shadow-label">Small</strong>
        <p class="smart-surfaces-shadow-token">--shadow-sm</p>
      </div>
      
      <div class="shadow-md surface-elevated smart-surfaces-shadow-card">
        <pds-icon icon="grid-four" size="lg"></pds-icon>
        <strong class="smart-surfaces-shadow-label">Medium</strong>
        <p class="smart-surfaces-shadow-token">--shadow-md</p>
      </div>
      
      <div class="shadow-lg surface-elevated smart-surfaces-shadow-card">
        <pds-icon icon="rocket" size="lg"></pds-icon>
        <strong class="smart-surfaces-shadow-label">Large</strong>
        <p class="smart-surfaces-shadow-token">--shadow-lg</p>
      </div>
    </div>
  </div>
`;

ContextAwareShadows.storyName = 'Context-Aware Shadows';

export const NestedSurfaces = () => html`
  ${smartSurfacesStoryStyles}
  <div class="smart-surfaces-section">
    <h2>Nested Surfaces</h2>
    <p class="smart-surfaces-subtitle">
      Surfaces can be nested infinitely. Each level maintains proper contrast and visual hierarchy automatically.
    </p>
    
    <div class="surface-base smart-surfaces-nested">
      <h4 class="smart-surfaces-title">
        <pds-icon icon="circle"></pds-icon>
        Level 1: Base Surface
      </h4>
      <p>Notice how icons and text adapt at each nesting level to maintain readability.</p>

      <div class="surface-elevated smart-surfaces-nested-inner">
        <h5 class="smart-surfaces-title">
          <pds-icon icon="arrow-right"></pds-icon>
          Level 2: Elevated Surface
        </h5>
        <p>Shadows and text colors automatically adjust</p>

        <div class="smart-surfaces-nested-grid">
          <div class="card smart-surfaces-card">
            <h6 class="smart-surfaces-title">
              <pds-icon icon="check"></pds-icon>
              Level 3: Card
            </h6>
            <p>Perfect contrast maintained</p>

            <div class="surface-sunken smart-surfaces-sunken">
              <small class="smart-surfaces-inline">
                <pds-icon icon="info" size="sm"></pds-icon>
                Level 4: Sunken surface inside card
              </small>
            </div>
          </div>

          <div class="card smart-surfaces-card">
            <h6 class="smart-surfaces-title">
              <pds-icon icon="star"></pds-icon>
              Another Card
            </h6>
            <p>All elements adapt automatically</p>
            <button class="btn-primary btn-sm smart-surfaces-button-spacing-sm">
              <pds-icon icon="heart" size="sm"></pds-icon>
              Action
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

NestedSurfaces.storyName = 'Nested Surfaces';

export const SurfaceInversion = () => html`
  ${smartSurfacesStoryStyles}
  <div class="smart-surfaces-section">
    <h2>Surface Inversion</h2>
    <p class="smart-surfaces-subtitle">
      The smart surface system automatically inverts text and icon colors on contrasting backgrounds. Toggle dark mode to see the magic!
    </p>
    
    <div class="smart-surfaces-grid--inversion">
      <div class="surface-inverse smart-surfaces-surface">
        <h4 class="smart-surfaces-title">
          <pds-icon icon="moon"></pds-icon>
          Automatic Inversion
        </h4>
        <p>
          This inverted surface automatically uses contrasting text and icons for perfect readability
        </p>
        <button class="btn-primary smart-surfaces-button-spacing">
          Primary Button
        </button>
      </div>

      <div class="surface-overlay smart-surfaces-surface">
        <h4 class="smart-surfaces-title">
          <pds-icon icon="palette"></pds-icon>
          Overlay Surface
        </h4>
        <p>Text and icons auto-adapt to maintain WCAG AA contrast</p>
        <button class="btn-secondary smart-surfaces-button-spacing">
          Secondary Button
        </button>
      </div>
    </div>
  </div>
`;

SurfaceInversion.storyName = 'Surface Inversion';

export const BorderGradients = () => html`
  ${smartSurfacesStoryStyles}
  <div class="smart-surfaces-section">
    <h2>Surface Border Effects</h2>
    <p class="smart-surfaces-subtitle">
      Advanced border gradient effects for standout surfaces. All gradients are animated and adapt to your theme.
    </p>
    
    <div class="smart-surfaces-grid--borders">
      <article class="card border-gradient smart-surfaces-border-card">
        <h3>Default Gradient</h3>
        <p>A card with a subtle animated border gradient that follows your color palette.</p>
        <code class="smart-surfaces-border-code">.border-gradient</code>
      </article>

      <article class="card border-gradient-primary smart-surfaces-border-card">
        <h3>Primary Gradient</h3>
        <p>Border gradient using the primary color scheme for brand emphasis.</p>
        <code class="smart-surfaces-border-code">.border-gradient-primary</code>
      </article>

      <article class="card border-gradient-accent smart-surfaces-border-card">
        <h3>Accent Gradient</h3>
        <p>Border gradient using the accent color for highlights and attention.</p>
        <code class="smart-surfaces-border-code">.border-gradient-accent</code>
      </article>

      <article class="card border-gradient-secondary smart-surfaces-border-card">
        <h3>Secondary Gradient</h3>
        <p>Border gradient using the secondary color palette for variety.</p>
        <code class="smart-surfaces-border-code">.border-gradient-secondary</code>
      </article>

      <article class="card border-gradient-soft smart-surfaces-border-card">
        <h3>Soft Gradient</h3>
        <p>A gentle, subdued border gradient for subtle visual interest.</p>
        <code class="smart-surfaces-border-code">.border-gradient-soft</code>
      </article>

      <article class="card border-gradient-medium smart-surfaces-border-card">
        <h3>Medium Gradient</h3>
        <p>A balanced border gradient with moderate intensity and presence.</p>
        <code class="smart-surfaces-border-code">.border-gradient-medium</code>
      </article>

      <article class="card border-gradient-strong smart-surfaces-border-card">
        <h3>Strong Gradient</h3>
        <p>A bold, vibrant border gradient for maximum visual impact.</p>
        <code class="smart-surfaces-border-code">.border-gradient-strong</code>
      </article>

      <article class="card border-gradient-glow smart-surfaces-border-card">
        <h3>Glowing Border</h3>
        <p>A card with a glowing border gradient effect for emphasis and visual interest.</p>
        <code class="smart-surfaces-border-code">.border-gradient-glow</code>
      </article>
    </div>
  </div>
`;

BorderGradients.storyName = 'Border Gradients';
