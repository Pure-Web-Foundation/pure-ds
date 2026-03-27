import { html } from 'lit';

export default {
  title: 'Primitives & Patterns/Border Effects',
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
  <div class="stack-md">
    <header>
      <h3>Border Gradient</h3>
      <small class="text-muted">Animated gradient border treatments for emphasis and visual hierarchy.</small>
    </header>
    <div class="grid grid-auto-sm gap-md">
      <div class="card border-gradient">
        <h4>Gradient Border</h4>
        <p>Animated gradient border effect that follows the primary color scheme.</p>
      </div>
      <div class="card border-gradient" style="--gradient-angle: 45deg;">
        <h4>Custom Angle</h4>
        <p>Use CSS variables to customize the gradient direction.</p>
      </div>
    </div>
  </div>
`;

export const BorderGlow = () => html`
  <div class="stack-md">
    <header>
      <h3>Border Glow</h3>
      <small class="text-muted">Soft glow borders that add depth to highlighted surfaces.</small>
    </header>
    <div class="grid grid-auto-sm gap-md">
      <div class="card border-glow">
        <h4>Glowing Border</h4>
        <p>Subtle glow effect.</p>
      </div>
      <div class="card border-glow border-gradient">
        <h4>Glow + Gradient</h4>
        <p>Combined glow and gradient border effects.</p>
      </div>
    </div>
  </div>
`;

