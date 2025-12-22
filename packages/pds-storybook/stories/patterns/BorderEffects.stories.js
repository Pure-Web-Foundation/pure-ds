import { html } from 'lit';

export default {
  title: 'Patterns/Border Effects',
  tags: ['border', 'gradient', 'glow', 'effect', 'decoration'],
  parameters: {
    pds: {
      tags: ['border', 'gradient', 'glow', 'effect', 'decoration', 'border-gradient', 'border-glow']
    },
    docs: {
      description: {
        component: 'Special border effects including gradients and glows'
      }
    }
  }
};

const borderEffectsStoryStyles = html`
  <style>
    .border-effects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(15.625rem, 1fr));
      gap: var(--spacing-4);
    }
    
    .border-effects-card-angle {
      --gradient-angle: 45deg;
    }
    .border-effects-actions {
      display: flex;
      gap: var(--spacing-2);
      margin-top: var(--spacing-4);
    }
  </style>
`;

export const BorderGradient = () => html`
  ${borderEffectsStoryStyles}
  <div class="border-effects-grid">
    <div class="card border-gradient border-effects-card">
      <h3>Gradient Border</h3>
      <p>Animated gradient border effect that follows the primary color scheme.</p>
    </div>
    <div class="card border-gradient border-effects-card border-effects-card-angle">
      <h3>Custom Angle</h3>
      <p>Use CSS variables to customize the gradient direction.</p>
    </div>
  </div>
`;

export const BorderGlow = () => html`
  <div class="grid gap-md" >
    <div class="card border-glow" >
      <h3>Glowing Border</h3>
      <p>Subtle glow effect.</p>
    </div>
    <div class="card border-glow border-gradient" >
      <h3>Glow + Gradient</h3>
      <p>Combined glow and gradient border effects.</p>
    </div>
  </div>
`;

export const Combined = () => html`
  ${borderEffectsStoryStyles}
  <article class="card border-gradient">
    <h2>Premium Feature Card</h2>
    <p>Combining card primitive with gradient border effect.</p>
    <div class="border-effects-actions">
      <button class="btn-primary">Get Started</button>
      <button class="btn-outline">Learn More</button>
    </div>
  </article>
`;
