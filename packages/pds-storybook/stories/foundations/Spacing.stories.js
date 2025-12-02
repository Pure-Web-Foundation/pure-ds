import { html } from 'lit';

const spacingStoryStyles = html`
  <style>
    .spacing-story-container {
      padding: var(--spacing-8);
      display: grid;
      gap: var(--spacing-6);
    }

    .spacing-story-description {
      max-width: 64ch;
      color: var(--surface-text-secondary);
    }

    .spacing-token-grid {
      display: grid;
      gap: var(--spacing-4);
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }

    .spacing-token-card {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-2);
    }

    .spacing-token-swatch {
      border: 1px solid var(--color-border-subtle);
      border-radius: var(--radius-md);
      background: var(--color-surface);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
    }

    .spacing-usage-examples {
      display: grid;
      gap: var(--spacing-4);
    }

    .spacing-stack-example {
      display: grid;
      gap: var(--spacing-3);
    }

    .spacing-inline-example {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-3);
      align-items: flex-start;
    }

    .spacing-inline-chip {
      padding: var(--spacing-2) var(--spacing-3);
      border-radius: var(--radius-full);
      background: var(--surface-bg);
      border: 1px solid var(--color-border-subtle);
      font-size: 0.875rem;
    }

    .spacing-demo-card {
      border: 1px dashed var(--color-border-subtle);
      border-radius: var(--radius-md);
      background: var(--surface-bg);
      padding: var(--spacing-4);
    }

    .spacing-demo-card__stack {
      display: grid;
      gap: var(--spacing-2);
    }

    .spacing-demo-card__bar {
      height: 8px;
      border-radius: var(--radius-full);
      background: var(--color-primary-quiet);
    }

    .spacing-card-spacing-1 {
      padding: var(--spacing-1);
    }

    .spacing-card-spacing-2 {
      padding: var(--spacing-2);
    }

    .spacing-card-spacing-3 {
      padding: var(--spacing-3);
    }

    .spacing-card-spacing-4 {
      padding: var(--spacing-4);
    }

    .spacing-card-spacing-5 {
      padding: var(--spacing-5);
    }
  </style>
`;

const spacingTokens = [
  { token: '--spacing-1', description: 'Tight spacing for badges, chips, dense UI', className: 'spacing-card-spacing-1' },
  { token: '--spacing-2', description: 'Compact spacing for form controls and lists', className: 'spacing-card-spacing-2' },
  { token: '--spacing-3', description: 'Standard spacing for cards and content blocks', className: 'spacing-card-spacing-3' },
  { token: '--spacing-4', description: 'Generous spacing for sections and panels', className: 'spacing-card-spacing-4' },
  { token: '--spacing-5', description: 'Hero spacing for feature areas and layouts', className: 'spacing-card-spacing-5' }
];

export default {
  title: 'Foundations/Spacing',
  parameters: {
    docs: {
      description: {
        component: 'Spacing tokens ensure consistent rhythm, balance, and hierarchy across layouts.'
      }
    }
  }
};

export const SpacingScale = {
  name: 'Spacing Scale',
  render: () => html`
    ${spacingStoryStyles}
    <div class="story-container spacing-story-container">
      <div class="spacing-story-description">
        Spacing tokens provide a consistent, modular scale for layout, component padding, and visual rhythm.
        Each increment scales proportionally so vertical and horizontal spacing feels balanced throughout the UI.
      </div>

      <section class="spacing-token-grid">
        ${spacingTokens.map(
          (token) => html`
            <article class="card spacing-token-card">
              <div class="spacing-token-swatch ${token.className}">
                ${token.token}
              </div>
              <div>
                <strong>${token.token.replace('--', '')}</strong>
                <p class="text-muted">${token.description}</p>
              </div>
            </article>
          `
        )}
      </section>

      <section class="spacing-usage-examples">
        <div class="spacing-stack-example">
          <h3>Vertical Stacks</h3>
          <article class="card spacing-demo-card">
            <div class="spacing-demo-card__stack">
              <div class="spacing-demo-card__bar spacing-card-spacing-1"></div>
              <div class="spacing-demo-card__bar spacing-card-spacing-2"></div>
              <div class="spacing-demo-card__bar spacing-card-spacing-3"></div>
              <div class="spacing-demo-card__bar spacing-card-spacing-4"></div>
              <div class="spacing-demo-card__bar spacing-card-spacing-5"></div>
            </div>
          </article>
        </div>

        <div>
          <h3>Inline Layout</h3>
          <div class="spacing-inline-example">
            ${spacingTokens.map(
              (token) => html`
                <span class="spacing-inline-chip">${token.token}</span>
              `
            )}
          </div>
        </div>
      </section>
    </div>
  `
};
