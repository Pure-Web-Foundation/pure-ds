import { html } from 'lit';

export default {
  title: 'Foundations/Smart Surfaces',
  parameters: {
    docs: {
      description: {
        component: 'Smart surface system that automatically adapts text, icons, shadows, and borders based on backgrounds. Maintains WCAG AA contrast ratios automatically.'
      }
    }
  }
};

export const SurfaceVariants = () => html`
  <div style="padding: var(--spacing-4);">
    <h2>Surface Variants</h2>
    <p style="margin-bottom: var(--spacing-6);">
      All surfaces automatically adjust text, icon, shadow, and border colors to maintain proper contrast.
    </p>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--spacing-4);">
      <div class="surface-base" style="padding: var(--spacing-6); border-radius: var(--radius-md);">
        <strong class="surface-title" style="display: flex; align-items: center; gap: var(--spacing-2);">
          <pds-icon icon="square"></pds-icon>
          Base Surface
        </strong>
        <p class="surface-description" style="margin-top: var(--spacing-2);">
          Default background with auto-adjusted text and icons
        </p>
        <button class="btn-primary" style="margin-top: var(--spacing-3);">
          Button
        </button>
      </div>
      
      <div class="surface-subtle" style="padding: var(--spacing-6); border-radius: var(--radius-md);">
        <strong class="surface-title" style="display: flex; align-items: center; gap: var(--spacing-2);">
          <pds-icon icon="square"></pds-icon>
          Subtle Surface
        </strong>
        <p class="surface-description" style="margin-top: var(--spacing-2);">
          Slightly different tone for visual hierarchy
        </p>
        <button class="btn-secondary" style="margin-top: var(--spacing-3);">
          Button
        </button>
      </div>
      
      <div class="surface-elevated" style="padding: var(--spacing-6); border-radius: var(--radius-md);">
        <strong class="surface-title" style="display: flex; align-items: center; gap: var(--spacing-2);">
          <pds-icon icon="arrow-up"></pds-icon>
          Elevated Surface
        </strong>
        <p class="surface-description" style="margin-top: var(--spacing-2);">
          Raised with smart shadows that adapt in dark mode
        </p>
        <button class="btn-primary" style="margin-top: var(--spacing-3);">
          Button
        </button>
      </div>
      
      <div class="surface-overlay" style="padding: var(--spacing-6); border-radius: var(--radius-md);">
        <strong class="surface-title" style="display: flex; align-items: center; gap: var(--spacing-2);">
          <pds-icon icon="desktop"></pds-icon>
          Overlay Surface
        </strong>
        <p class="surface-description" style="margin-top: var(--spacing-2);">
          Modal/dropdown backgrounds with stronger shadows
        </p>
        <button class="btn-outline" style="margin-top: var(--spacing-3);">
          Button
        </button>
      </div>
    </div>
  </div>
`;

SurfaceVariants.storyName = 'Surface Variants';

export const ContextAwareShadows = () => html`
  <div style="padding: var(--spacing-4);">
    <h2>Context-Aware Shadows</h2>
    <p style="margin-bottom: var(--spacing-6);">
      Shadows automatically invert in dark mode: dark shadows on light surfaces, light shadows on dark surfaces.
    </p>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-6);">
      <div class="shadow-sm surface-elevated" style="padding: var(--spacing-6); border-radius: var(--radius-md); text-align: center;">
        <pds-icon icon="feather" size="lg"></pds-icon>
        <strong style="display: block; margin-top: var(--spacing-2);">Small</strong>
        <p style="margin: var(--spacing-1) 0 0 0; opacity: 0.7;">--shadow-sm</p>
      </div>
      
      <div class="shadow-md surface-elevated" style="padding: var(--spacing-6); border-radius: var(--radius-md); text-align: center;">
        <pds-icon icon="grid-four" size="lg"></pds-icon>
        <strong style="display: block; margin-top: var(--spacing-2);">Medium</strong>
        <p style="margin: var(--spacing-1) 0 0 0; opacity: 0.7;">--shadow-md</p>
      </div>
      
      <div class="shadow-lg surface-elevated" style="padding: var(--spacing-6); border-radius: var(--radius-md); text-align: center;">
        <pds-icon icon="rocket" size="lg"></pds-icon>
        <strong style="display: block; margin-top: var(--spacing-2);">Large</strong>
        <p style="margin: var(--spacing-1) 0 0 0; opacity: 0.7;">--shadow-lg</p>
      </div>
    </div>
  </div>
`;

ContextAwareShadows.storyName = 'Context-Aware Shadows';

export const NestedSurfaces = () => html`
  <div style="padding: var(--spacing-4);">
    <h2>Nested Surfaces</h2>
    <p style="margin-bottom: var(--spacing-6);">
      Surfaces can be nested infinitely. Each level maintains proper contrast and visual hierarchy automatically.
    </p>
    
    <div class="surface-base" style="padding: var(--spacing-6); border-radius: var(--radius-md);">
      <h4 style="display: flex; align-items: center; gap: var(--spacing-2);">
        <pds-icon icon="circle"></pds-icon>
        Level 1: Base Surface
      </h4>
      <p>Notice how icons and text adapt at each nesting level to maintain readability.</p>

      <div class="surface-elevated" style="padding: var(--spacing-6); margin-top: var(--spacing-4); border-radius: var(--radius-md);">
        <h5 style="display: flex; align-items: center; gap: var(--spacing-2);">
          <pds-icon icon="arrow-right"></pds-icon>
          Level 2: Elevated Surface
        </h5>
        <p>Shadows and text colors automatically adjust</p>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-4); margin-top: var(--spacing-4);">
          <div class="card" style="padding: var(--spacing-4);">
            <h6 style="display: flex; align-items: center; gap: var(--spacing-2);">
              <pds-icon icon="check"></pds-icon>
              Level 3: Card
            </h6>
            <p>Perfect contrast maintained</p>

            <div class="surface-sunken" style="padding: var(--spacing-4); margin-top: var(--spacing-3); border-radius: var(--radius-sm);">
              <small style="display: flex; align-items: center; gap: var(--spacing-2);">
                <pds-icon icon="info" size="sm"></pds-icon>
                Level 4: Sunken surface inside card
              </small>
            </div>
          </div>

          <div class="card" style="padding: var(--spacing-4);">
            <h6 style="display: flex; align-items: center; gap: var(--spacing-2);">
              <pds-icon icon="star"></pds-icon>
              Another Card
            </h6>
            <p>All elements adapt automatically</p>
            <button class="btn-primary btn-sm" style="margin-top: var(--spacing-2);">
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
  <div style="padding: var(--spacing-4);">
    <h2>Surface Inversion</h2>
    <p style="margin-bottom: var(--spacing-6);">
      The smart surface system automatically inverts text and icon colors on contrasting backgrounds. Toggle dark mode to see the magic!
    </p>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--spacing-4);">
      <div class="surface-inverse" style="padding: var(--spacing-6); border-radius: var(--radius-md);">
        <h4 style="display: flex; align-items: center; gap: var(--spacing-2);">
          <pds-icon icon="moon"></pds-icon>
          Automatic Inversion
        </h4>
        <p>
          This inverted surface automatically uses contrasting text and icons for perfect readability
        </p>
        <button class="btn-primary" style="margin-top: var(--spacing-3);">
          Primary Button
        </button>
      </div>

      <div class="surface-overlay" style="padding: var(--spacing-6); border-radius: var(--radius-md);">
        <h4 style="display: flex; align-items: center; gap: var(--spacing-2);">
          <pds-icon icon="palette"></pds-icon>
          Overlay Surface
        </h4>
        <p>Text and icons auto-adapt to maintain WCAG AA contrast</p>
        <button class="btn-secondary" style="margin-top: var(--spacing-3);">
          Secondary Button
        </button>
      </div>
    </div>
  </div>
`;

SurfaceInversion.storyName = 'Surface Inversion';

export const BorderGradients = () => html`
  <div style="padding: var(--spacing-4);">
    <h2>Surface Border Effects</h2>
    <p style="margin-bottom: var(--spacing-6);">
      Advanced border gradient effects for standout surfaces. All gradients are animated and adapt to your theme.
    </p>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--spacing-6);">
      <article class="card border-gradient" style="padding: var(--spacing-6);">
        <h3>Default Gradient</h3>
        <p>A card with a subtle animated border gradient that follows your color palette.</p>
        <code style="font-size: var(--font-size-sm); opacity: 0.7;">.border-gradient</code>
      </article>

      <article class="card border-gradient-primary" style="padding: var(--spacing-6);">
        <h3>Primary Gradient</h3>
        <p>Border gradient using the primary color scheme for brand emphasis.</p>
        <code style="font-size: var(--font-size-sm); opacity: 0.7;">.border-gradient-primary</code>
      </article>

      <article class="card border-gradient-accent" style="padding: var(--spacing-6);">
        <h3>Accent Gradient</h3>
        <p>Border gradient using the accent color for highlights and attention.</p>
        <code style="font-size: var(--font-size-sm); opacity: 0.7;">.border-gradient-accent</code>
      </article>

      <article class="card border-gradient-secondary" style="padding: var(--spacing-6);">
        <h3>Secondary Gradient</h3>
        <p>Border gradient using the secondary color palette for variety.</p>
        <code style="font-size: var(--font-size-sm); opacity: 0.7;">.border-gradient-secondary</code>
      </article>

      <article class="card border-gradient-soft" style="padding: var(--spacing-6);">
        <h3>Soft Gradient</h3>
        <p>A gentle, subdued border gradient for subtle visual interest.</p>
        <code style="font-size: var(--font-size-sm); opacity: 0.7;">.border-gradient-soft</code>
      </article>

      <article class="card border-gradient-medium" style="padding: var(--spacing-6);">
        <h3>Medium Gradient</h3>
        <p>A balanced border gradient with moderate intensity and presence.</p>
        <code style="font-size: var(--font-size-sm); opacity: 0.7;">.border-gradient-medium</code>
      </article>

      <article class="card border-gradient-strong" style="padding: var(--spacing-6);">
        <h3>Strong Gradient</h3>
        <p>A bold, vibrant border gradient for maximum visual impact.</p>
        <code style="font-size: var(--font-size-sm); opacity: 0.7;">.border-gradient-strong</code>
      </article>

      <article class="card border-gradient-glow" style="padding: var(--spacing-6);">
        <h3>Glowing Border</h3>
        <p>A card with a glowing border gradient effect for emphasis and visual interest.</p>
        <code style="font-size: var(--font-size-sm); opacity: 0.7;">.border-gradient-glow</code>
      </article>
    </div>
  </div>
`;

BorderGradients.storyName = 'Border Gradients';
