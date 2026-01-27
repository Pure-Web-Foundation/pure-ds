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

export const BorderGradient = () => html`
  <div class="grid grid-auto-sm gap-md">
    <div class="card border-gradient stack-md">
      <h3>Gradient Border</h3>
      <p>Animated gradient border effect that follows the primary color scheme.</p>
    </div>
    <div class="card border-gradient stack-md" style="--gradient-angle: 45deg;">
      <h3>Custom Angle</h3>
      <p>Use CSS variables to customize the gradient direction.</p>
    </div>
  </div>
`;

export const BorderGlow = () => html`
  <div class="grid grid-auto-sm gap-md">
    <div class="card border-glow stack-md">
      <h3>Glowing Border</h3>
      <p>Subtle glow effect.</p>
    </div>
    <div class="card border-glow border-gradient stack-md">
      <h3>Glow + Gradient</h3>
      <p>Combined glow and gradient border effects.</p>
    </div>
  </div>
`;

