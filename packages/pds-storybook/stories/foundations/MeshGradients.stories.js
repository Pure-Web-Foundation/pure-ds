import { html } from 'lit';

const meshGradientStoryStyles = html`
  <style>
    .mesh-story {
      padding: var(--spacing-4);
      display: grid;
      gap: var(--spacing-6);
    }

    .mesh-story__intro {
      margin: 0 0 var(--spacing-6);
    }

    .mesh-story__grid {
      display: grid;
      gap: var(--spacing-6);
    }

    .mesh-story__grid--featured {
      grid-template-columns: repeat(auto-fit, minmax(18.75rem, 1fr));
    }

    .mesh-story__grid--tiles {
      grid-template-columns: repeat(auto-fit, minmax(12.5rem, 1fr));
      gap: var(--spacing-4);
    }

    .mesh-story__panel,
    .mesh-story__surface {
      border-radius: var(--radius-lg);
      border: 1px solid var(--color-border);
    }

    .mesh-story__panel {
      position: relative;
      padding: var(--spacing-6);
      min-height: 12.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .mesh-story__panel--mesh-01 {
      background: var(--background-mesh-01);
    }

    .mesh-story__panel--mesh-02 {
      background: var(--background-mesh-02);
    }

    .mesh-story__inner {
      background: var(--color-surface-base);
      padding: var(--spacing-4);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-md);
      text-align: center;
      display: grid;
      gap: var(--spacing-2);
    }

    .mesh-story__inner-heading {
      margin: 0;
    }

    .mesh-story__inner-subtitle {
      margin: 0;
      opacity: 0.7;
    }

    .mesh-story__tile {
      position: relative;
      padding: var(--spacing-5);
      border-radius: var(--radius-md);
      min-height: 9.375rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      border: 1px solid var(--color-border);
    }

    .mesh-story__tile--mesh-03 {
      background: var(--background-mesh-03);
    }

    .mesh-story__tile--mesh-04 {
      background: var(--background-mesh-04);
    }

    .mesh-story__tile--mesh-05 {
      background: var(--background-mesh-05);
    }

    .mesh-story__tile-icon {
      opacity: 0.9;
      margin-bottom: var(--spacing-2);
    }

    .mesh-story__tile-code {
      font-size: 0.75rem;
    }

    .mesh-story__subheading {
      margin: var(--spacing-6) 0 var(--spacing-2);
    }

    .mesh-story__hero {
      background: var(--background-mesh-01);
      padding: var(--spacing-8);
      text-align: center;
    }

    .mesh-story__hero-text {
      font-size: 1.25rem;
      margin-top: var(--spacing-3);
    }

    .mesh-story__hero-actions {
      display: flex;
      justify-content: center;
      gap: var(--spacing-3);
      margin-top: var(--spacing-4);
    }

    .mesh-story__card-surface {
      background: var(--background-mesh-03);
      padding: var(--spacing-6);
    }

    .mesh-story__card-overlay {
      padding: var(--spacing-6);
      max-width: 31.25rem;
    }

    .mesh-story__action-button {
      margin-top: var(--spacing-3);
    }

    .mesh-story__grid-surface {
      background: var(--background-mesh-05);
      padding: var(--spacing-6);
    }

    .mesh-story__feature-card {
      padding: var(--spacing-5);
      text-align: center;
    }

    .mesh-story__feature-heading {
      margin-top: var(--spacing-2);
    }

    .mesh-story__code-block {
      background: var(--color-surface-subtle);
      padding: var(--spacing-4);
      border-radius: var(--radius-md);
      overflow-x: auto;
    }

    .mesh-story__list {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .mesh-story__list-item {
      padding: var(--spacing-2);
      border-bottom: 1px solid var(--color-border);
    }

    .mesh-story__list-item:last-child {
      border-bottom: 0;
    }
  </style>
`;

const featuredMeshCards = [
  {
    key: 'mesh-01',
    title: 'Mesh 01',
    description: 'Subtle radial blend'
  },
  {
    key: 'mesh-02',
    title: 'Mesh 02',
    description: 'Corner accents'
  }
];

const meshTileBackgrounds = ['mesh-03', 'mesh-04', 'mesh-05'];

const meshVariableList = ['mesh-01', 'mesh-02', 'mesh-03', 'mesh-04', 'mesh-05'];

export default {
  title: 'Foundations/Mesh Gradients',
  tags: ['mesh', 'gradient', 'background', 'effect', 'decoration'],
  parameters: {
    pds: {
      tags: ['mesh', 'gradient', 'background', 'effect', 'decoration', 'colors', 'theming']
    },
    docs: {
      description: {
        component: 'Beautiful mesh gradient backgrounds generated from your color palette. Automatically adapts to light and dark modes with 5 different variations.'
      }
    }
  }
};

export const AllMeshGradients = () => html`
  ${meshGradientStoryStyles}
  <section class="mesh-story">
    <header>
    <h2>Mesh Gradient Backgrounds</h2>
    <small class="text-muted">
      Subtle, beautiful mesh gradient backgrounds using <code>--background-mesh-01</code> through <code>--background-mesh-05</code>. Toggle dark mode to see automatic adaptation.
    </small>
    </header>
    <div class="mesh-story__grid mesh-story__grid--featured">
      ${featuredMeshCards.map(({ key, title, description }) => html`
        <div class="mesh-story__panel mesh-story__panel--${key}">
          <div class="mesh-story__inner">
            <h4 class="mesh-story__inner-heading">${title}</h4>
            <p class="mesh-story__inner-subtitle">${description}</p>
          </div>
        </div>
      `)}
    </div>
    <div class="mesh-story__grid mesh-story__grid--tiles">
      ${meshTileBackgrounds.map((meshKey) => html`
        <div class="mesh-story__tile mesh-story__tile--${meshKey}">
          <pds-icon icon="sparkle" size="xl" class="mesh-story__tile-icon"></pds-icon>
          <code class="mesh-story__tile-code">${meshKey}</code>
        </div>
      `)}
    </div>
  </section>
`;

AllMeshGradients.storyName = 'All Mesh Gradients';

export const MeshUsageExamples = () => html`
  ${meshGradientStoryStyles}
  <section class="mesh-story">
    <h2>Usage Examples</h2>

    <h3 class="mesh-story__subheading">Hero Section</h3>
    <div class="mesh-story__surface mesh-story__hero">
      <h1>Welcome to Pure Design System</h1>
      <p class="mesh-story__hero-text">
        Beautiful backgrounds generated from your color palette
      </p>
      <div class="mesh-story__hero-actions">
        <button class="btn-primary btn-lg">Get Started</button>
        <button class="btn-secondary btn-lg">Learn More</button>
      </div>
    </div>

    <h3 class="mesh-story__subheading">Card with Mesh Background</h3>
    <div class="mesh-story__surface mesh-story__card-surface">
      <div class="card surface-elevated mesh-story__card-overlay">
        <h4>Layered Design</h4>
        <p>Mesh gradients work beautifully as backgrounds with overlaid content using surface tokens.</p>
        <button class="btn-primary mesh-story__action-button">
          <pds-icon icon="rocket"></pds-icon>
          Take Action
        </button>
      </div>
    </div>

    <h3 class="mesh-story__subheading">Grid Layout with Mesh</h3>
    <div class="mesh-story__surface mesh-story__grid-surface">
      <div class="grid grid-cols-3 gap-md">
        ${Array.from({ length: 3 }, (_, index) => html`
          <div class="card surface-base mesh-story__feature-card">
            <pds-icon icon="star" size="xl" class="icon-accent"></pds-icon>
            <h5 class="mesh-story__feature-heading">Feature ${index + 1}</h5>
            <p>Mesh backgrounds create visual interest without overwhelming content</p>
          </div>
        `)}
      </div>
    </div>
  </section>
`;

MeshUsageExamples.storyName = 'Usage Examples';

export const CodeSamples = () => html`
  ${meshGradientStoryStyles}
  <section class="mesh-story">
    <h2>Code Samples</h2>

    <h3 class="mesh-story__subheading">Apply as Background</h3>
    <pre class="mesh-story__code-block shiki github-dark"><code>/* Use CSS custom properties */
.hero-section {
  background: var(--background-mesh-01);
}

/* Combine with surface colors */
.card {
  background: var(--background-mesh-03);
  backdrop-filter: blur(10px);
}

/* Layer over solid colors */
.container {
  background-color: var(--color-surface-base);
  background-image: var(--background-mesh-02);
}</code></pre>

    <h3 class="mesh-story__subheading">Available Variables</h3>
    <ul class="mesh-story__list">
      ${meshVariableList.map((meshKey) => html`
        <li class="mesh-story__list-item">
          <code>--background-${meshKey}</code>
        </li>
      `)}
    </ul>
  </section>
`;

CodeSamples.storyName = 'Code Samples';
