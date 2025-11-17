import { html } from 'lit';
import { presets } from '../../../../src/js/pds-core/pds-config.js';

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
  <div style="padding: var(--spacing-4);">
    <h3>Common Icons</h3>
    <p style="margin-bottom: var(--spacing-4); opacity: 0.8;">
      Frequently used icons for everyday UI needs
    </p>
    <div style="display: flex; gap: var(--spacing-3); flex-wrap: wrap;">
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
  </div>
`;

CommonIcons.storyName = 'Common Icons';

export const IconSizes = () => html`
  <div style="padding: var(--spacing-4);">
    <h3>Icon Sizes</h3>
    <div style="display: flex; gap: var(--spacing-6); align-items: center; flex-wrap: wrap;">
      <div style="text-align: center;">
        <pds-icon icon="heart" size="xs"></pds-icon>
        <div style="font-size: 0.75rem; margin-top: var(--spacing-1); opacity: 0.7;">xs (16px)</div>
      </div>
      <div style="text-align: center;">
        <pds-icon icon="heart" size="sm"></pds-icon>
        <div style="font-size: 0.75rem; margin-top: var(--spacing-1); opacity: 0.7;">sm (20px)</div>
      </div>
      <div style="text-align: center;">
        <pds-icon icon="heart" size="md"></pds-icon>
        <div style="font-size: 0.75rem; margin-top: var(--spacing-1); opacity: 0.7;">md (24px)</div>
      </div>
      <div style="text-align: center;">
        <pds-icon icon="heart" size="lg"></pds-icon>
        <div style="font-size: 0.75rem; margin-top: var(--spacing-1); opacity: 0.7;">lg (32px)</div>
      </div>
      <div style="text-align: center;">
        <pds-icon icon="heart" size="xl"></pds-icon>
        <div style="font-size: 0.75rem; margin-top: var(--spacing-1); opacity: 0.7;">xl (48px)</div>
      </div>
      <div style="text-align: center;">
        <pds-icon icon="heart" size="2xl"></pds-icon>
        <div style="font-size: 0.75rem; margin-top: var(--spacing-1); opacity: 0.7;">2xl (64px)</div>
      </div>
    </div>
  </div>
`;

IconSizes.storyName = 'Icon Sizes';

export const AllIcons = () => {
  const iconConfig = presets.default.icons.include;
  
  return html`
    <div style="padding: var(--spacing-4);">
      <h2>All Available Icons</h2>
      <p style="margin-bottom: var(--spacing-6); opacity: 0.8;">
        Complete icon set from Phosphor Icons, organized by category. 
        Click any icon name to copy it to clipboard.
      </p>
      
      ${Object.entries(iconConfig).map(([category, icons]) => html`
        <article class="card" style="margin-bottom: var(--spacing-6);">
          <h3 style="text-transform: capitalize; margin-bottom: var(--spacing-4);">
            ${category.replace(/([A-Z])/g, ' $1').trim()}
            <span style="font-size: 0.85rem; font-weight: normal; opacity: 0.6; margin-left: var(--spacing-2);">
              (${icons.length} icons)
            </span>
          </h3>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: var(--spacing-3);">
            ${icons.map(icon => html`
              <div 
                class="icon-item"
                style="
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  gap: var(--spacing-2);
                  padding: var(--spacing-3);
                  border-radius: var(--radius-sm);
                  cursor: pointer;
                  transition: background-color 0.2s;
                "
                @click="${(e) => {
                  navigator.clipboard.writeText(icon);
                  const target = e.currentTarget;
                  const originalBg = target.style.backgroundColor;
                  target.style.backgroundColor = 'var(--color-primary)';
                  target.style.color = 'white';
                  setTimeout(() => {
                    target.style.backgroundColor = originalBg;
                    target.style.color = '';
                  }, 200);
                }}"
                @mouseenter="${(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--surface-elevated)';
                }}"
                @mouseleave="${(e) => {
                  e.currentTarget.style.backgroundColor = '';
                }}"
              >
                <pds-icon icon="${icon}" size="lg"></pds-icon>
                <span style="font-size: 0.75rem; text-align: center; word-break: break-word; opacity: 0.8;">
                  ${icon}
                </span>
              </div>
            `)}
          </div>
        </article>
      `)}
      
      <article class="card surface-elevated" style="margin-top: var(--spacing-6);">
        <h4>Usage</h4>
        <pre style="margin-top: var(--spacing-3); padding: var(--spacing-3); background: var(--surface-bg); border-radius: var(--radius-sm); overflow-x: auto;"><code>&lt;pds-icon icon="heart" size="lg"&gt;&lt;/pds-icon&gt;
&lt;pds-icon icon="star" size="md"&gt;&lt;/pds-icon&gt;
&lt;pds-icon icon="user" size="sm"&gt;&lt;/pds-icon&gt;</code></pre>
      </article>
    </div>
  `;
};

AllIcons.storyName = 'All Icons';
