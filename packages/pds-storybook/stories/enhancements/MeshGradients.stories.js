import { html } from 'lit';

export default {
  title: 'Enhancements/Mesh Gradients',
  parameters: {
    docs: {
      description: {
        component: 'Beautiful mesh gradient backgrounds generated from your color palette. Automatically adapts to light and dark modes with 5 different variations.'
      }
    }
  }
};

export const AllMeshGradients = () => html`
  <div style="padding: var(--spacing-4);">
    <h2>Mesh Gradient Backgrounds</h2>
    <p style="margin-bottom: var(--spacing-6);">
      Subtle, beautiful mesh gradient backgrounds using <code>--background-mesh-01</code> through <code>--background-mesh-05</code>. Toggle dark mode to see automatic adaptation.
    </p>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--spacing-6); margin-bottom: var(--spacing-6);">
      <div style="position: relative; background: var(--background-mesh-01); padding: var(--spacing-6); border-radius: var(--radius-lg); min-height: 200px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--color-border);">
        <div style="background: var(--color-surface-base); padding: var(--spacing-4); border-radius: var(--radius-md); box-shadow: var(--shadow-md); text-align: center;">
          <h4 style="margin: 0;">Mesh 01</h4>
          <p style="margin: var(--spacing-2) 0 0 0; opacity: 0.7;">Subtle radial blend</p>
        </div>
      </div>
      
      <div style="position: relative; background: var(--background-mesh-02); padding: var(--spacing-6); border-radius: var(--radius-lg); min-height: 200px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--color-border);">
        <div style="background: var(--color-surface-base); padding: var(--spacing-4); border-radius: var(--radius-md); box-shadow: var(--shadow-md); text-align: center;">
          <h4 style="margin: 0;">Mesh 02</h4>
          <p style="margin: var(--spacing-2) 0 0 0; opacity: 0.7;">Corner accents</p>
        </div>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-4);">
      ${Array.from({ length: 3 }, (_, i) => {
        const meshNum = String(i + 3).padStart(2, '0');
        return html`
          <div style="position: relative; background: var(--background-mesh-${meshNum}); padding: var(--spacing-5); border-radius: var(--radius-md); min-height: 150px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; border: 1px solid var(--color-border);">
            <pds-icon icon="sparkle" size="xl" style="opacity: 0.9; margin-bottom: var(--spacing-2);"></pds-icon>
            <code style="font-size: 0.75rem;">mesh-${meshNum}</code>
          </div>
        `;
      })}
    </div>
  </div>
`;

AllMeshGradients.storyName = 'All Mesh Gradients';

export const MeshUsageExamples = () => html`
  <div style="padding: var(--spacing-4);">
    <h2>Usage Examples</h2>
    
    <h3 style="margin-top: var(--spacing-6);">Hero Section</h3>
    <div style="background: var(--background-mesh-01); padding: var(--spacing-8); border-radius: var(--radius-lg); text-align: center; border: 1px solid var(--color-border);">
      <h1>Welcome to Pure Design System</h1>
      <p style="font-size: 1.25rem; margin-top: var(--spacing-3);">
        Beautiful backgrounds generated from your color palette
      </p>
      <div style="display: flex; gap: var(--spacing-3); justify-content: center; margin-top: var(--spacing-4);">
        <button class="btn-primary btn-lg">Get Started</button>
        <button class="btn-secondary btn-lg">Learn More</button>
      </div>
    </div>

    <h3 style="margin-top: var(--spacing-6);">Card with Mesh Background</h3>
    <div style="background: var(--background-mesh-03); padding: var(--spacing-6); border-radius: var(--radius-lg); border: 1px solid var(--color-border);">
      <div class="card surface-elevated" style="padding: var(--spacing-6); max-width: 500px;">
        <h4>Layered Design</h4>
        <p>Mesh gradients work beautifully as backgrounds with overlaid content using surface tokens.</p>
        <button class="btn-primary" style="margin-top: var(--spacing-3);">
          <pds-icon icon="rocket"></pds-icon>
          Take Action
        </button>
      </div>
    </div>

    <h3 style="margin-top: var(--spacing-6);">Grid Layout with Mesh</h3>
    <div style="background: var(--background-mesh-05); padding: var(--spacing-6); border-radius: var(--radius-lg); border: 1px solid var(--color-border);">
      <div class="grid grid-cols-3 gap-md">
        ${Array.from({ length: 3 }, (_, i) => html`
          <div class="card surface-base" style="padding: var(--spacing-5); text-align: center;">
            <pds-icon icon="star" size="xl" class="icon-accent"></pds-icon>
            <h5 style="margin-top: var(--spacing-2);">Feature ${i + 1}</h5>
            <p>Mesh backgrounds create visual interest without overwhelming content</p>
          </div>
        `)}
      </div>
    </div>
  </div>
`;

MeshUsageExamples.storyName = 'Usage Examples';

export const CodeSamples = () => html`
  <div style="padding: var(--spacing-4);">
    <h2>Code Samples</h2>
    
    <h3>Apply as Background</h3>
    <pre style="background: var(--color-surface-subtle); padding: var(--spacing-4); border-radius: var(--radius-md); overflow-x: auto;"><code>/* Use CSS custom properties */
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

    <h3 style="margin-top: var(--spacing-6);">Available Variables</h3>
    <ul style="list-style: none; padding: 0;">
      ${Array.from({ length: 5 }, (_, i) => {
        const meshNum = String(i + 1).padStart(2, '0');
        return html`
          <li style="padding: var(--spacing-2); border-bottom: 1px solid var(--color-border);">
            <code>--background-mesh-${meshNum}</code>
          </li>
        `;
      })}
    </ul>
  </div>
`;

CodeSamples.storyName = 'Code Samples';
