import { html } from 'lit';
import { presets } from '../../../../src/js/pds-core/pds-config.js';

const iconStoryStyles = html`
  <style>
    .icon-story-section {
      padding: var(--spacing-4);
      display: grid;
      gap: var(--spacing-4);
    }

    .icon-story-description {
      margin-bottom: var(--spacing-4);
      opacity: 0.8;
      max-width: 60ch;
    }

    .icon-story-grid {
      display: flex;
      gap: var(--spacing-3);
      flex-wrap: wrap;
      align-items: center;
    }

    .icon-story-size-grid {
      display: grid;
      gap: var(--spacing-4);
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    }

    .icon-story-size-item {
      display: grid;
      gap: var(--spacing-2);
      text-align: center;
      justify-items: center;
    }

    .icon-story-filter {
      display: grid;
      justify-items: center;
      gap: var(--spacing-2);
      margin-bottom: var(--spacing-6);
    }

    .icon-story-filter__label {
      font-weight: 600;
    }

    .icon-story-filter__input {
      width: 100%;
      max-width: 400px;
      padding: var(--spacing-3);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      font-size: 1rem;
      text-align: center;
      background: var(--color-surface);
    }

    .icon-category {
      display: grid;
      gap: var(--spacing-4);
    }

    .icon-category__title {
      text-transform: capitalize;
      display: flex;
      align-items: baseline;
      gap: var(--spacing-2);
      flex-wrap: wrap;
    }

    .icon-category__count {
      font-size: 0.85rem;
      font-weight: normal;
      opacity: 0.6;
    }

    .icon-category__grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: var(--spacing-3);
    }

    .icon-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-2);
      padding: var(--spacing-3);
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: background-color 0.2s ease, color 0.2s ease;
    }

    .icon-item:hover {
      background: var(--surface-elevated);
    }

    .icon-item--copied {
      animation: iconItemCopied 0.4s ease;
      background: var(--color-primary);
      color: var(--color-surface);
    }

    .icon-item__label {
      font-size: 0.75rem;
      text-align: center;
      word-break: break-word;
      opacity: 0.8;
    }

    .icon-story-usage {
      margin-top: var(--spacing-6);
      display: grid;
      gap: var(--spacing-3);
    }

    .icon-story-usage__code {
      margin: 0;
      padding: var(--spacing-3);
      background: var(--surface-bg);
      border-radius: var(--radius-sm);
      overflow-x: auto;
    }

    @keyframes iconItemCopied {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(0.98);
      }
      100% {
        transform: scale(1);
      }
    }
  </style>
`;

export default {
  title: 'Foundations/Icons',
  parameters: {
    docs: {
      description: {
        component: 'Icon system using Phosphor icons with configurable sets per category'
      }
    }
  }
};

export const CommonIcons = () => html`
  ${iconStoryStyles}
  <section class="icon-story-section">
    <div>
      <h3>Common Icons</h3>
      <p class="icon-story-description">
        Frequently used icons for everyday UI needs
      </p>
    </div>
    <div class="icon-story-grid">
      <pds-icon icon="heart" size="lg"></pds-icon>
      <pds-icon icon="star" size="lg"></pds-icon>
      <pds-icon icon="user" size="lg"></pds-icon>
      <pds-icon icon="bell" size="lg"></pds-icon>
      <pds-icon icon="magnifying-glass" size="lg"></pds-icon>
      <pds-icon icon="list" size="lg"></pds-icon>
      <pds-icon icon="x" size="lg"></pds-icon>
      <pds-icon icon="check" size="lg"></pds-icon>
      <pds-icon icon="gear" size="lg"></pds-icon>
      <pds-icon icon="download" size="lg"></pds-icon>
    </div>
  </section>
`;

CommonIcons.storyName = 'Common Icons';

export const IconSizes = () => html`
  ${iconStoryStyles}
  <section class="icon-story-section">
    <div>
      <h3>Icon Sizes</h3>
      <p class="icon-story-description">
        Built-in sizing scale keeps visual hierarchy consistent across the UI.
      </p>
    </div>
    <div class="icon-story-size-grid">
      <div class="icon-story-size-item">
        <pds-icon icon="heart" size="xs"></pds-icon>
        <small class="text-muted">xs (16px)</small>
      </div>
      <div class="icon-story-size-item">
        <pds-icon icon="heart" size="sm"></pds-icon>
        <small class="text-muted">sm (20px)</small>
      </div>
      <div class="icon-story-size-item">
        <pds-icon icon="heart" size="md"></pds-icon>
        <small class="text-muted">md (24px)</small>
      </div>
      <div class="icon-story-size-item">
        <pds-icon icon="heart" size="lg"></pds-icon>
        <small class="text-muted">lg (32px)</small>
      </div>
      <div class="icon-story-size-item">
        <pds-icon icon="heart" size="xl"></pds-icon>
        <small class="text-muted">xl (48px)</small>
      </div>
      <div class="icon-story-size-item">
        <pds-icon icon="heart" size="2xl"></pds-icon>
        <small class="text-muted">2xl (64px)</small>
      </div>
    </div>
  </section>
`;

IconSizes.storyName = 'Icon Sizes';

export const AllIcons = () => {
  const iconConfig = presets.default.icons.include;

  return html`
    ${iconStoryStyles}
    <section class="icon-story-section">
      <div>
        <h2>All Available Icons</h2>
        <p class="icon-story-description">
          Complete icon set from Phosphor Icons, organized by category. Click any icon name to copy it to clipboard.
        </p>
      </div>

      <div class="icon-story-filter">
        <span class="icon-story-filter__label" data-label>Filter icons</span>
        <input
          class="icon-story-filter__input"
          type="search"
          placeholder="Type to filter..."
          @input="${(event) => {
            const searchTerm = event.target.value.toLowerCase();
            const storyRoot = event.target.closest('.icon-story-section');
            const categories = storyRoot?.querySelectorAll('.icon-category');

            categories?.forEach((category) => {
              const items = category.querySelectorAll('.icon-item');
              let visibleCount = 0;

              items.forEach((item) => {
                const iconName = item.dataset.iconName ?? '';
                if (iconName.includes(searchTerm)) {
                  item.style.display = 'flex';
                  visibleCount += 1;
                } else {
                  item.style.display = 'none';
                }
              });

              category.style.display = visibleCount > 0 ? 'grid' : 'none';
            });
          }}"
        />
      </div>

      ${Object.entries(iconConfig).map(
        ([category, icons]) => html`
          <article class="card icon-category">
            <h3 class="icon-category__title">
              ${category.replace(/([A-Z])/g, ' $1').trim()}
              <span class="icon-category__count">(${icons.length} icons)</span>
            </h3>

            <div class="icon-category__grid">
              ${icons.map(
                (icon) => html`
                  <div
                    class="icon-item"
                    data-icon-name="${icon}"
                    @click="${(event) => {
                      navigator.clipboard.writeText(icon);
                      const target = event.currentTarget;
                      target.classList.add('icon-item--copied');
                      setTimeout(() => {
                        target.classList.remove('icon-item--copied');
                      }, 200);
                    }}"
                  >
                    <pds-icon icon="${icon}" size="lg"></pds-icon>
                    <span class="icon-item__label">${icon}</span>
                  </div>
                `
              )}
            </div>
          </article>
        `
      )}

      <article class="card surface-elevated icon-story-usage">
        <h4>Usage</h4>
        <pre class="icon-story-usage__code"><code>&lt;pds-icon icon="heart" size="lg"&gt;&lt;/pds-icon&gt;
&lt;pds-icon icon="star" size="md"&gt;&lt;/pds-icon&gt;
&lt;pds-icon icon="user" size="sm"&gt;&lt;/pds-icon&gt;</code></pre>
      </article>
    </section>
  `;
};

AllIcons.storyName = 'All Icons';
