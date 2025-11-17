import { html } from 'lit';

export default {
  title: 'PDS/Patterns/BorderEffects',
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
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--spacing-6); padding: var(--spacing-4); background: var(--color-gray-900);">
    <div class="border-glow" style="padding: var(--spacing-4); background: var(--color-gray-800); color: white;">
      <h3>Glowing Border</h3>
      <p>Subtle glow effect that pulses.</p>
    </div>
    <div class="border-glow" style="padding: var(--spacing-4); background: var(--color-gray-800); color: white; --glow-color: var(--color-accent-500);">
      <h3>Custom Color</h3>
      <p>Customize glow color with CSS variables.</p>
    </div>
  </div>
`;

export const Combined = () => html`
  <article class="card border-gradient" style="padding: var(--spacing-5);">
    <h2>Premium Feature Card</h2>
    <p>Combining card primitive with gradient border effect.</p>
    <div style="display: flex; gap: var(--spacing-2); margin-top: var(--spacing-4);">
      <button class="btn-primary">Get Started</button>
      <button class="btn-outline">Learn More</button>
    </div>
  </article>
`;
