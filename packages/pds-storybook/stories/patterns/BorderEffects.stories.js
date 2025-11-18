import { html } from 'lit';

export default {
  title: 'Patterns/Border Effects',
  parameters: {
    docs: {
      description: {
        component: 'Special border effects including gradients and glows'
      }
    }
  }
};

export const BorderGradient = () => html`
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--spacing-4);">
    <div class="border-gradient" style="padding: var(--spacing-4);">
      <h3>Gradient Border</h3>
      <p>Animated gradient border effect that follows the primary color scheme.</p>
    </div>
    <div class="border-gradient" style="padding: var(--spacing-4); --gradient-angle: 45deg;">
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
  <article class="card border-gradient">
    <h2>Premium Feature Card</h2>
    <p>Combining card primitive with gradient border effect.</p>
    <div class="flex gap-sm" style="margin-top: var(--spacing-4);">
      <button class="btn-primary">Get Started</button>
      <button class="btn-outline">Learn More</button>
    </div>
  </article>
`;
