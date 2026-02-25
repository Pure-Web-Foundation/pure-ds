import { html } from "#pds/lit";

// Story-specific styles for smart surfaces demos
const smartSurfacesStoryStyles = html`
  <style>
    .story-translucent-container {
      position: relative;
      padding: var(--spacing-8);
      border-radius: var(--radius-lg);
      overflow: hidden;
    }
    .story-translucent-bg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 0;
    }
    .story-translucent-content {
      position: relative;
      z-index: 1;
    }
    .story-border-current {
      border-color: currentColor;
    }
  </style>
`;

export default {
  title: "Foundations/Smart Surfaces",
  tags: ["surface", "background", "theming", "contrast", "elevated"],
  parameters: {
    pds: {
      tags: [
        "surface",
        "background",
        "theming",
        "contrast",
        "elevated",
        "subtle",
        "sunken",
        "overlay",
        "inverse",
        "colors",
        "layout",
      ],
    },
    docs: {
      description: {
        component:
          "Smart surface system that automatically adapts text, icons, shadows, and borders based on backgrounds. Maintains WCAG AA contrast ratios automatically.",
      },
    },
  },
};

export const SurfaceVariants = () => html`
  <div class="card">
    <h2>Surface Variants</h2>
    <p class="text-muted">
      All surfaces automatically adjust text, icon, shadow, and border colors to
      maintain proper contrast.
    </p>

    <div class="grid grid-auto-sm gap-md">
      <div class="card surface-base">
        <strong class="flex items-center gap-xs">
          <pds-icon icon="square"></pds-icon>
          Base Surface
        </strong>
        <p>Default background with auto-adjusted text and icons</p>
        <button class="btn-primary">Button</button>
      </div>

      <div class="card surface-subtle">
        <strong class="flex items-center gap-xs">
          <pds-icon icon="square"></pds-icon>
          Subtle Surface
        </strong>
        <p>Slightly different tone for visual hierarchy</p>
        <button class="btn-secondary">Button</button>
      </div>

      <div class="card surface-elevated">
        <strong class="flex items-center gap-xs">
          <pds-icon icon="arrow-up"></pds-icon>
          Elevated Surface
        </strong>
        <p>Raised with smart shadows that adapt in dark mode</p>
        <button class="btn-primary">Button</button>
      </div>

      <div class="card surface-overlay">
        <strong class="flex items-center gap-xs">
          <pds-icon icon="desktop"></pds-icon>
          Overlay Surface
        </strong>
        <p>Modal/dropdown backgrounds with stronger shadows</p>
        <button class="btn-outline">Button</button>
      </div>
    </div>
  </div>
`;

SurfaceVariants.storyName = "Surface Variants";

export const ContextAwareShadows = () => html`
  <div class="stack-md">
    <h2>Context-Aware Shadows</h2>
    <p class="text-muted">
      Shadows automatically invert in dark mode: dark shadows on light surfaces,
      light shadows on dark surfaces.
    </p>

    <div class="grid grid-auto-sm gap-lg">
      <div class="card shadow-sm surface-elevated text-center">
        <pds-icon icon="feather" size="lg"></pds-icon>
        <strong>Small</strong>
        <small class="text-muted">--shadow-sm</small>
      </div>

      <div class="card shadow-md surface-elevated text-center">
        <pds-icon icon="grid-four" size="lg"></pds-icon>
        <strong>Medium</strong>
        <small class="text-muted">--shadow-md</small>
      </div>

      <div class="card shadow-lg surface-elevated text-center">
        <pds-icon icon="rocket" size="lg"></pds-icon>
        <strong>Large</strong>
        <small class="text-muted">--shadow-lg</small>
      </div>
    </div>
  </div>
`;

ContextAwareShadows.storyName = "Context-Aware Shadows";

export const NestedSurfaces = () => html`
  <div class="card">
    <h2>Nested Surfaces</h2>
    <p class="text-muted">
      Surfaces can be nested infinitely. Each level maintains proper contrast
      and visual hierarchy automatically.
    </p>

    <div class="card surface-base">
      <h4 class="flex items-center gap-xs">
        <pds-icon icon="circle"></pds-icon>
        Level 1: Base Surface
      </h4>
      <p>
        Notice how icons and text adapt at each nesting level to maintain
        readability.
      </p>

      <div class="card surface-elevated">
        <h5 class="flex items-center gap-xs">
          <pds-icon icon="arrow-right"></pds-icon>
          Level 2: Elevated Surface
        </h5>
        <p>Shadows and text colors automatically adjust</p>

        <div class="grid grid-cols-2 gap-md">
          <div class="card">
            <h6 class="flex items-center gap-xs">
              <pds-icon icon="check"></pds-icon>
              Level 3: Card
            </h6>
            <p>Perfect contrast maintained</p>

            <div class="card surface-sunken">
              <small class="flex items-center gap-xs">
                <pds-icon icon="info" size="sm"></pds-icon>
                Level 4: Sunken surface inside card
              </small>
            </div>
          </div>

          <div class="card">
            <h6 class="flex items-center gap-xs">
              <pds-icon icon="star"></pds-icon>
              Another Card
            </h6>
            <p>All elements adapt automatically</p>
            <button class="btn-primary btn-sm">
              <pds-icon icon="heart" size="sm"></pds-icon>
              Action
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

NestedSurfaces.storyName = "Nested Surfaces";

export const SurfaceInversion = () => html`
  <div class="card">
    <h2>Surface Inversion</h2>
    <p class="text-muted">
      The smart surface system automatically inverts text and icon colors on
      contrasting backgrounds. Toggle dark mode to see the magic!
    </p>

    <div class="grid grid-auto-md gap-md">
      <div class="card surface-inverse">
        <h4 class="flex items-center gap-xs">
          <pds-icon icon="moon"></pds-icon>
          Automatic Inversion
        </h4>
        <p>
          This inverted surface automatically uses contrasting text and icons
          for perfect readability
        </p>
        <button class="btn-primary">Primary Button</button>
      </div>

      <div class="card surface-overlay">
        <h4 class="flex items-center gap-xs">
          <pds-icon icon="palette"></pds-icon>
          Overlay Surface
        </h4>
        <p>Text and icons auto-adapt to maintain WCAG AA contrast</p>
        <button class="btn-secondary">Secondary Button</button>
      </div>
    </div>
  </div>
`;

SurfaceInversion.storyName = "Surface Inversion";

export const BorderGradients = () => html`
  <div class="card">
    <h2>Surface Border Effects</h2>
    <p class="text-muted">
      Advanced border gradient effects for standout surfaces. All gradients are
      animated and adapt to your theme.
    </p>

    <div class="grid grid-auto-md gap-lg">
      <article class="card border-gradient">
        <h3>Default Gradient</h3>
        <p>
          A card with a subtle animated border gradient that follows your color
          palette.
        </p>
        <code class="text-muted">.border-gradient</code>
      </article>

      <article class="card border-gradient-primary">
        <h3>Primary Gradient</h3>
        <p>
          Border gradient using the primary color scheme for brand emphasis.
        </p>
        <code class="text-muted">.border-gradient-primary</code>
      </article>

      <article class="card border-gradient-accent">
        <h3>Accent Gradient</h3>
        <p>
          Border gradient using the accent color for highlights and attention.
        </p>
        <code class="text-muted">.border-gradient-accent</code>
      </article>

      <article class="card border-gradient-secondary">
        <h3>Secondary Gradient</h3>
        <p>Border gradient using the secondary color palette for variety.</p>
        <code class="text-muted">.border-gradient-secondary</code>
      </article>

      <article class="card border-gradient-soft">
        <h3>Soft Gradient</h3>
        <p>A gentle, subdued border gradient for subtle visual interest.</p>
        <code class="text-muted">.border-gradient-soft</code>
      </article>

      <article class="card border-gradient-medium">
        <h3>Medium Gradient</h3>
        <p>A balanced border gradient with moderate intensity and presence.</p>
        <code class="text-muted">.border-gradient-medium</code>
      </article>

      <article class="card border-gradient-strong">
        <h3>Strong Gradient</h3>
        <p>A bold, vibrant border gradient for maximum visual impact.</p>
        <code class="text-muted">.border-gradient-strong</code>
      </article>

      <article class="card border-gradient-glow">
        <h3>Glowing Border</h3>
        <p>
          A card with a glowing border gradient effect for emphasis and visual
          interest.
        </p>
        <code class="text-muted">.border-gradient-glow</code>
      </article>
    </div>
  </div>
`;

BorderGradients.storyName = "Border Gradients";

export const TranslucentSurfaces = () => html`
  ${smartSurfacesStoryStyles}
  <div class="card">
    <h2>Translucent Surfaces</h2>
    <p class="text-muted">
      Semi-transparent surfaces for glassmorphism effects and layered UI. Works
      beautifully over images and gradients.
    </p>

    <div class="story-translucent-container">
      <img
        src="https://picsum.photos/1200/600?random=10"
        alt="Background"
        class="story-translucent-bg"
      />

      <div class="grid grid-auto-md gap-lg story-translucent-content">
        <article class="card surface-translucent-25 backdrop-blur">
          <h4>.surface-translucent-25</h4>
          <p>25% opacity - very subtle, mostly transparent</p>
          <code>--color-surface-translucent-25</code>
        </article>

        <article class="card surface-translucent-50 backdrop-blur">
          <h4>.surface-translucent-50</h4>
          <p>50% opacity - balanced transparency</p>
          <code>--color-surface-translucent-50</code>
        </article>

        <article class="card surface-translucent-75 backdrop-blur">
          <h4>.surface-translucent-75</h4>
          <p>75% opacity - more solid, less see-through</p>
          <code>--color-surface-translucent-75</code>
        </article>

        <article class="card surface-translucent backdrop-blur">
          <h4>.surface-translucent</h4>
          <p>Default (50%) - alias for translucent-50</p>
          <code>Shorthand class</code>
        </article>
      </div>
    </div>
  </div>
`;

TranslucentSurfaces.storyName = "Translucent Surfaces";

export const SurfaceInverseExpanded = () => html`
  <div class="card">
    <h2>Inverse Surface Deep Dive</h2>
    <p class="text-muted">
      The <code>.surface-inverse</code> class automatically inverts all text,
      icon, and border colors for perfect contrast on dark backgrounds.
    </p>

    <div class="grid grid-auto-md gap-lg">
      <article class="card surface-inverse">
        <h3 class="flex items-center gap-xs">
          <pds-icon icon="moon"></pds-icon>
          Inverse Surface
        </h3>
        <p>All text automatically uses light colors for dark backgrounds.</p>
        <p class="text-muted">Even muted text adapts correctly.</p>
        <div class="flex gap-sm">
          <button class="btn-primary">Primary</button>
          <button class="btn-secondary">Secondary</button>
        </div>
      </article>

      <article class="card surface-inverse">
        <h4>Code on Inverse</h4>
        <p>
          Inline <code>code elements</code> also adapt their background for
          visibility.
        </p>
        <pre><code>// Code blocks work too
const example = "Hello!";</code></pre>
      </article>

      <article class="card surface-inverse">
        <h4>Icons on Inverse</h4>
        <div class="flex gap-md flex-wrap">
          <pds-icon icon="check" size="lg"></pds-icon>
          <pds-icon icon="star" size="lg"></pds-icon>
          <pds-icon icon="heart" size="lg"></pds-icon>
          <pds-icon icon="settings" size="lg"></pds-icon>
          <pds-icon icon="bell" size="lg"></pds-icon>
        </div>
        <small class="text-muted"
          >Icons inherit the correct inverse color automatically.</small
        >
      </article>

      <article class="card surface-inverse">
        <h4>Form Elements</h4>
        <label>
          <span data-label>Input Field</span>
          <input type="text" placeholder="Type here..." />
        </label>
        <button class="btn-outline story-border-current">
          Outline Button
        </button>
      </article>
    </div>

    <section class="card">
      <h3>CSS Variables Set by .surface-inverse</h3>
      <pre><code>.surface-inverse {
  background-color: var(--color-surface-inverse);
  color: var(--surface-inverse-text);
  --color-text-primary: var(--surface-inverse-text);
  --color-text-secondary: var(--surface-inverse-text-secondary);
  --color-text-muted: var(--surface-inverse-text-muted);
  --color-surface-muted: rgba(255, 255, 255, 0.08);
  --color-border: var(--surface-inverse-border);
}</code></pre>
    </section>
  </div>
`;

SurfaceInverseExpanded.storyName = "Inverse Surface Details";
