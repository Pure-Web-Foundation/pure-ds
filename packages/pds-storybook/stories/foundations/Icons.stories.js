import { html } from 'lit';
import { presets } from '../../../../src/js/pds-core/pds-config.js';
import { renderCodeBlock, getCurrentTheme, preloadShiki } from '../utils/shiki.js';
import { attachStoryLinkHandlers } from '../utils/navigation.js';
import { PDS } from "#pds";

// Pre-load Shiki
preloadShiki();

// Story-specific styles (not PDS classes - demo only)
const iconStoryStyles = html`
  <style>
    /* Icon grid for AllIcons */
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
    .icon-item:hover { background: var(--surface-elevated); }
    .icon-item--copied {
      animation: iconItemCopied 0.4s ease;
      background: var(--color-primary);
      color: var(--color-surface);
    }
    @keyframes iconItemCopied {
      0% { transform: scale(1); }
      50% { transform: scale(0.98); }
      100% { transform: scale(1); }
    }
    /* Layout & sections */
    .story-section { padding: var(--spacing-4); }
    .story-intro { font-size: var(--font-size-lg); }
    .story-desc { font-size: var(--font-size-sm); }
    /* Navigation grid */
    .story-nav-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: var(--spacing-4); }
    /* Icon preview cards */
    .story-icon-card { min-width: 80px; }
    .story-icon-demo { max-width: 400px; text-align: center; margin: 0 auto; }
    /* Category header */
    .story-cat-header { margin-top: var(--spacing-4); }
    /* Icon name display */
    .story-icon-name { font-size: var(--font-size-xs); word-break: break-all; text-align: center; }
    /* Status display */
    .story-cache-status { max-height: 200px; overflow: auto; }
  </style>
`;

// Alias for backwards compatibility
const iconGridStyles = iconStoryStyles;

export default {
  title: 'Foundations/Icons',
  tags: ['icon', 'icons', 'svg', 'phosphor', 'graphic', 'symbol'],
  parameters: {
    pds: {
      tags: ['icon', 'icons', 'svg', 'phosphor', 'graphic', 'symbol', 'pds-icon', 'sprite']
    },
    docs: {
      description: {
        component: 'Icon system using Phosphor icons with configurable sets per category'
      }
    }
  }
};

// ============================================================================
// Overview - First story
// ============================================================================

export const Overview = () => {
  const container = document.createElement('article');
  container.className = 'stack gap-lg story-section';
  
  container.innerHTML = /*html*/`
    <header>
      <h2>PDS Icon System</h2>
      <p class="story-intro">PDS ships a simple, sprite-based icon solution and a lightweight <code>&lt;pds-icon&gt;</code> web component.</p>
    </header>

    <section class="card">
      <h3>Quick Start</h3>
      <p>The <code>&lt;pds-icon&gt;</code> element is registered by the Auto-Define system when it appears in the DOM (lazily, unless registered in the <code>autoDefine.predefine</code> array).</p>
      <div class="code-quickstart"></div>
    </section>

    <section class="card">
      <h3>Attributes</h3>
      <table class="table">
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>icon</code></td>
            <td>string</td>
            <td><code>"missing"</code></td>
            <td>Symbol id from sprite (e.g., <code>house</code>, <code>gear</code>)</td>
          </tr>
          <tr>
            <td><code>size</code></td>
            <td>string | number</td>
            <td><code>"md"</code> (24px)</td>
            <td>Size in px or named: <code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>, <code>2xl</code></td>
          </tr>
          <tr>
            <td><code>color</code></td>
            <td>string</td>
            <td><code>currentColor</code></td>
            <td>Any CSS color value or design token</td>
          </tr>
          <tr>
            <td><code>label</code></td>
            <td>string</td>
            <td>—</td>
            <td>Accessible name. Adds <code>role="img"</code>; otherwise <code>aria-hidden</code></td>
          </tr>
          <tr>
            <td><code>rotate</code></td>
            <td>number</td>
            <td><code>0</code></td>
            <td>Rotation angle in degrees</td>
          </tr>
          <tr>
            <td><code>sprite</code></td>
            <td>string</td>
            <td>—</td>
            <td>Override sprite sheet path</td>
          </tr>
          <tr>
            <td><code>no-sprite</code></td>
            <td>boolean</td>
            <td><code>false</code></td>
            <td>Force fallback rendering</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="card">
      <h3>Icon Configuration</h3>
      <p>PDS provides sensible defaults for icons in <code>design.icons</code>. You can override any part in your <code>pds.config.js</code>:</p>
      <div class="code-full-config"></div>
      
      <h4>Configuration Options</h4>
      <table class="table">
        <thead>
          <tr>
            <th>Option</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>set</code></td>
            <td><code>"phosphor"</code></td>
            <td>Icon set to use (currently Phosphor icons)</td>
          </tr>
          <tr>
            <td><code>weight</code></td>
            <td><code>"regular"</code></td>
            <td>Icon weight variant</td>
          </tr>
          <tr>
            <td><code>defaultSize</code></td>
            <td><code>24</code></td>
            <td>Default icon size in pixels</td>
          </tr>
          <tr>
            <td><code>externalPath</code></td>
            <td><code>"/assets/img/icons/"</code></td>
            <td>Path for on-demand external SVG icons</td>
          </tr>
          <tr>
            <td><code>sizes</code></td>
            <td><code>{ xs: 16, sm: 20, md: 24, lg: 32, xl: 48, "2xl": 64 }</code></td>
            <td>Named size mappings</td>
          </tr>
          <tr>
            <td><code>include</code></td>
            <td><em>(see below)</em></td>
            <td>Categorized icon lists to include in sprite</td>
          </tr>
          <tr>
            <td><code>spritePath</code></td>
            <td><code>"public/assets/pds/icons/pds-icons.svg"</code></td>
            <td>Output path for generated sprite</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="card">
      <h3>Customizing Icons</h3>
      <p>Extend or override the default icon categories in your <code>pds.config.js</code>:</p>
      <div class="code-customize"></div>
      <p class="text-muted story-desc">
        The <code>include</code> object defines which icons are bundled into the sprite. Categories are: 
        <code>navigation</code>, <code>actions</code>, <code>communication</code>, <code>content</code>, 
        <code>status</code>, <code>time</code>, <code>commerce</code>, <code>formatting</code>, <code>system</code>.
      </p>
    </section>

    <section class="card">
      <h3>CLI Tools</h3>
      
      <h4><code>pds:build-icons</code></h4>
      <p>Regenerate the sprite after changing your icon selection:</p>
      <div class="code-build-icons"></div>
      <p class="text-muted story-desc">Reads <code>design.icons.include</code> from config and generates the sprite at <code>spritePath</code>.</p>
      
      <h4><code>pds:build</code></h4>
      <p>Build PDS assets (including icons) to your project's static folder:</p>
      <div class="code-build"></div>
      <p class="text-muted story-desc">Copies the sprite to <code>[config.static.root]/icons/pds-icons.svg</code> for production use.</p>
    </section>

    <section class="card">
      <h3>Files</h3>
      <ul>
        <li><code>public/assets/pds/icons/pds-icons.svg</code> — SVG sprite sheet consumed at runtime</li>
        <li><code>public/auto-define/pds-icon.js</code> — auto-defined component that renders icons</li>
        <li><code>packages/pds-cli/bin/pds-build-icons.js</code> — CLI tool to regenerate the sprite</li>
      </ul>
    </section>

    <section class="card">
      <h3>External Icon Fallback (On-Demand Loading)</h3>
      <p>For icons not in the sprite sheet, <code>&lt;pds-icon&gt;</code> can automatically fetch individual SVG files on demand:</p>
      <ul>
        <li><strong>Core icons:</strong> Bundled in the cached sprite sheet for optimal performance</li>
        <li><strong>'Exotic' icons:</strong> Fetched individually on first use, then cached in memory</li>
      </ul>

      <h4>How It Works</h4>
      <ol>
        <li>Component first checks the sprite sheet</li>
        <li>If not found, checks the in-memory external icon cache</li>
        <li>If not cached, fetches from <code>{externalPath}/{icon-name}.svg</code></li>
        <li>Once fetched, the icon is cached and all instances re-render</li>
        <li>If the fetch fails, the fallback "missing" icon is shown</li>
      </ol>

      <h4>External Icon Requirements</h4>
      <p>External SVG files should:</p>
      <ul>
        <li>Be standalone SVG files (not symbols)</li>
        <li>Have a <code>viewBox</code> attribute (defaults to <code>0 0 24 24</code> if missing)</li>
        <li>Use <code>currentColor</code> for fills/strokes for color inheritance</li>
      </ul>
    </section>

    <section class="card">
      <h3>Notes</h3>
      <ul>
        <li>The component includes minimal inline fallbacks for critical icons so UIs remain usable if the sprite fails to load</li>
        <li>Colors inherit from text color via <code>currentColor</code> unless overridden</li>
        <li>For different sprite placement or CDN path, you can fork the component or serve a redirect</li>
      </ul>
    </section>

    <section>
      <h3>Explore</h3>
      <div class="grid grid-auto-sm gap-md">
        <a data-story-link="foundations-icons--common-icons" class="card card-interactive">
          <h4>Common Icons</h4>
          <p class="text-muted story-desc">Most frequently used icons</p>
        </a>
        <a data-story-link="foundations-icons--icon-sizes" class="card card-interactive">
          <h4>Icon Sizes</h4>
          <p class="text-muted story-desc">Size scale from xs to 2xl</p>
        </a>
        <a data-story-link="foundations-icons--colored-icons" class="card card-interactive">
          <h4>Colored Icons</h4>
          <p class="text-muted story-desc">Color customization options</p>
        </a>
        <a data-story-link="foundations-icons--all-icons" class="card card-interactive">
          <h4>All Icons</h4>
          <p class="text-muted story-desc">Browse full icon library</p>
        </a>
        <a data-story-link="foundations-icons--external-icons" class="card card-interactive">
          <h4>External Icons</h4>
          <p class="text-muted story-desc">On-demand loading demo</p>
        </a>
      </div>
    </section>
  `;

  // Add Shiki-highlighted code blocks
  const quickstartCode = `<pds-icon icon="house"></pds-icon>
<pds-icon icon="gear" size="lg"></pds-icon>
<pds-icon icon="heart" size="32"></pds-icon>
<pds-icon icon="list" label="Open menu"></pds-icon>`;

  const fullConfigCode = `// PDS default icon configuration (from pds-config.js)
design: {
  icons: {
    set: "phosphor",                              // Icon set
    weight: "regular",                            // Icon weight
    defaultSize: 24,                              // Default size in px
    externalPath: "/assets/img/icons/",           // External SVG path
    sizes: {
      xs: 16, sm: 20, md: 24, lg: 32, xl: 48, "2xl": 64
    },
    include: {
      navigation: ["arrow-left", "arrow-right", "house", "gear", ...],
      actions: ["plus", "minus", "check", "trash", "pencil", ...],
      communication: ["envelope", "bell", "chat-circle", "user", ...],
      content: ["image", "file", "folder", "book-open", ...],
      status: ["info", "warning", "check-circle", "x-circle", ...],
      time: ["calendar", "clock", "timer", "hourglass"],
      commerce: ["shopping-cart", "credit-card", "tag", ...],
      formatting: ["text-align-left", "text-b", "list-bullets", ...],
      system: ["cloud", "desktop", "globe", "sun", "moon", ...]
    },
    spritePath: "/assets/pds/icons/pds-icons.svg"
  }
}`;

  const customizeCode = `// pds.config.js - Customize your icon set
export const config = {
  design: {
    icons: {
      // Add custom icons to existing categories
      include: {
        actions: [
          ...PDS.defaults.design.icons.include.actions,  // Keep defaults
          "my-custom-action"                              // Add your own
        ],
        // Or replace a category entirely
        commerce: ["cart", "wallet", "receipt"]
      },
      // Or add a completely new category
      include: {
        ...PDS.defaults.design.icons.include,
        myBrand: ["logo", "brand-icon", "mascot"]
      }
    }
  }
};`;

  const buildIconsCode = `# Rebuild sprite from config
npm run pds:build-icons

# Or via npx
npx pds build-icons`;

  const buildCode = `# Build all PDS assets including icons
npm run pds:build

# Icons are copied to: [static.root]/icons/pds-icons.svg`;

  const theme = getCurrentTheme();
  
  renderCodeBlock(container.querySelector('.code-quickstart'), quickstartCode, 'html', theme);
  renderCodeBlock(container.querySelector('.code-full-config'), fullConfigCode, 'javascript', theme);
  renderCodeBlock(container.querySelector('.code-customize'), customizeCode, 'javascript', theme);
  renderCodeBlock(container.querySelector('.code-build-icons'), buildIconsCode, 'bash', theme);
  renderCodeBlock(container.querySelector('.code-build'), buildCode, 'bash', theme);

  // Attach navigation handlers to story links
  attachStoryLinkHandlers(container);

  return container;
};

Overview.storyName = 'Overview';

// ============================================================================
// Common Icons
// ============================================================================

export const CommonIcons = () => html`
  <section class="stack-lg story-section">
    <header>
      <h3>Common Icons</h3>
      <small class="text-muted">Frequently used icons for everyday UI needs</small>
    </header>
    <div class="flex gap-md flex-wrap items-center">
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
  <section class="stack-lg story-section">
    <header>
      <h3>Icon Sizes</h3>
      <small class="text-muted">Built-in sizing scale keeps visual hierarchy consistent across the UI.</small>
    </header>
    <div class="grid grid-auto-sm gap-lg">
      <div class="stack-sm text-center items-center">
        <pds-icon icon="heart" size="xs"></pds-icon>
        <small class="text-muted">xs (16px)</small>
      </div>
      <div class="stack-sm text-center items-center">
        <pds-icon icon="heart" size="sm"></pds-icon>
        <small class="text-muted">sm (20px)</small>
      </div>
      <div class="stack-sm text-center items-center">
        <pds-icon icon="heart" size="md"></pds-icon>
        <small class="text-muted">md (24px)</small>
      </div>
      <div class="stack-sm text-center items-center">
        <pds-icon icon="heart" size="lg"></pds-icon>
        <small class="text-muted">lg (32px)</small>
      </div>
      <div class="stack-sm text-center items-center">
        <pds-icon icon="heart" size="xl"></pds-icon>
        <small class="text-muted">xl (48px)</small>
      </div>
      <div class="stack-sm text-center items-center">
        <pds-icon icon="heart" size="2xl"></pds-icon>
        <small class="text-muted">2xl (64px)</small>
      </div>
      <div class="stack-sm text-center items-center">
        <pds-icon icon="heart" size="3xl"></pds-icon>
        <small class="text-muted">3xl (${PDS.enums.IconSizes["3xl"]}px)</small>
      </div>
    </div>
  </section>
`;

IconSizes.storyName = 'Icon Sizes';

export const ColoredIcons = () => html`
  <section class="stack-lg story-section">
    <header>
      <h3>Colored Icons</h3>
      <small class="text-muted">Icons inherit <code>currentColor</code> by default, or can be explicitly colored using the <code>color</code> attribute.</small>
    </header>
    
    <article class="card">
      <h4>Using Design Tokens (Explicit)</h4>
      <div class="flex gap-md flex-wrap items-center">
        <pds-icon icon="heart" size="lg" color="var(--color-danger-500)"></pds-icon>
        <pds-icon icon="star" size="lg" color="var(--color-warning-500)"></pds-icon>
        <pds-icon icon="check" size="lg" color="var(--color-success-500)"></pds-icon>
        <pds-icon icon="x" size="lg" color="var(--color-danger-600)"></pds-icon>
        <pds-icon icon="info" size="lg" color="var(--color-info-500)"></pds-icon>
      </div>
    </article>

    <article class="card">
      <h4>Using Design Tokens</h4>
      <p class="text-muted story-desc">Recommended approach for consistent theming.</p>
      <div class="flex gap-md flex-wrap items-center">
        <pds-icon icon="heart" size="lg" color="var(--color-primary-500)"></pds-icon>
        <pds-icon icon="star" size="lg" color="var(--color-accent-500)"></pds-icon>
        <pds-icon icon="check-circle" size="lg" color="var(--color-success-500)"></pds-icon>
        <pds-icon icon="warning" size="lg" color="var(--color-warning-500)"></pds-icon>
        <pds-icon icon="x-circle" size="lg" color="var(--color-error-500)"></pds-icon>
      </div>
    </article>

    <article class="card">
      <h4>Inheriting from Parent</h4>
      <p class="text-muted story-desc">Icons use <code>currentColor</code> by default, inheriting text color.</p>
      <div class="flex gap-md flex-wrap items-center">
        <span class="flex gap-sm items-center text-primary">
          <pds-icon icon="envelope" size="lg"></pds-icon>
          Primary text with icon
        </span>
        <span class="flex gap-sm items-center text-success">
          <pds-icon icon="check" size="lg"></pds-icon>
          Success message
        </span>
        <span class="flex gap-sm items-center text-danger">
          <pds-icon icon="warning" size="lg"></pds-icon>
          Error state
        </span>
      </div>
    </article>

    <article class="card surface-elevated">
      <h4>Usage</h4>
      <pre><code>&lt;!-- Design token (recommended) --&gt;
    &lt;pds-icon icon="heart" color="var(--color-danger-500)"&gt;&lt;/pds-icon&gt;

&lt;!-- Design token (recommended) --&gt;
&lt;pds-icon icon="check" color="var(--color-success-500)"&gt;&lt;/pds-icon&gt;

&lt;!-- Inherit from parent --&gt;
&lt;span class="text-primary"&gt;
  &lt;pds-icon icon="star"&gt;&lt;/pds-icon&gt; Rating
&lt;/span&gt;</code></pre>
    </article>
  </section>
`;

ColoredIcons.storyName = 'Colored Icons';

export const AllIcons = () => {
  const iconConfig = presets.default.icons.include;

  return html`
    ${iconGridStyles}
    <section class="stack-lg story-section">
      <header>
        <h2>All Available Icons</h2>
        <small class="text-muted">Complete icon set from Phosphor Icons, organized by category. Click any icon name to copy it to clipboard.</small>
      </header>

      <label class="stack-sm text-center">
        <span class="text-semibold">Filter icons</span>
        <input
          type="search"
          placeholder="Type to filter..."
          class="story-icon-demo"
          @input="${(event) => {
            const searchTerm = event.target.value.toLowerCase();
            const storyRoot = event.target.closest('section');
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
      </label>

      ${Object.entries(iconConfig).map(
        ([category, icons]) => html`
          <article class="card icon-category">
            <h3 class="flex items-baseline gap-sm flex-wrap story-cat-header">
              ${category.replace(/([A-Z])/g, ' $1').trim()}
              <span class="text-muted story-desc">(${icons.length} icons)</span>
            </h3>

            <div class="grid grid-auto-sm gap-md">
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
                    <small class="text-muted story-icon-name">${icon}</small>
                  </div>
                `
              )}
            </div>
          </article>
        `
      )}

      <article class="card surface-elevated">
        <h4>Usage</h4>
        <pre><code>&lt;pds-icon icon="heart" size="lg"&gt;&lt;/pds-icon&gt;
&lt;pds-icon icon="star" size="md"&gt;&lt;/pds-icon&gt;
&lt;pds-icon icon="user" size="sm"&gt;&lt;/pds-icon&gt;</code></pre>
      </article>
    </section>
  `;
};

AllIcons.storyName = 'All Icons';

/**
 * External Icons - On-demand SVG loading
 * 
 * When an icon is not found in the sprite sheet, pds-icon can automatically
 * fetch individual SVG files from a configurable external path.
 */
export const ExternalIcons = () => html`
  <section class="stack-lg story-section">
    <header>
      <h2>External Icons (On-Demand Loading)</h2>
      <small class="text-muted">
        Icons not in the sprite sheet are automatically fetched from an external path.
        This provides the best of both worlds: core icons load instantly from the cached 
        sprite, while more 'exotic' icons are fetched on-demand and cached in memory.
      </small>
    </header>

    <article class="card">
      <h3>How It Works</h3>
      <div class="grid grid-auto-md gap-lg">
        <article class="card surface-elevated">
          <h4 class="flex items-center gap-sm"><pds-icon icon="lightning" size="sm"></pds-icon> Sprite Icons (Fast)</h4>
          <small class="text-muted">Core icons bundled in the sprite sheet load instantly with a single HTTP request.</small>
          <div class="flex gap-lg flex-wrap items-center">
            <pds-icon icon="house" size="lg"></pds-icon>
            <pds-icon icon="gear" size="lg"></pds-icon>
            <pds-icon icon="heart" size="lg"></pds-icon>
            <pds-icon icon="star" size="lg"></pds-icon>
          </div>
        </article>
        
        <article class="card surface-elevated">
          <h4 class="flex items-center gap-sm"><pds-icon icon="cloud-arrow-down" size="sm"></pds-icon> External Icons (On-Demand)</h4>
          <small class="text-muted">More 'exotic' icons are fetched individually, then cached for subsequent use.</small>
          <div class="flex gap-lg flex-wrap items-center">
            <pds-icon icon="solid-anatomy-brain-1" size="lg" color="var(--color-primary-500)"></pds-icon>
            <pds-icon icon="solid-anatomy-hand-bones" size="lg" color="var(--color-accent-500)"></pds-icon>
            <pds-icon icon="solid-conditions-lung-condition-2" size="lg" color="var(--color-success-500)"></pds-icon>
          </div>
        </article>
      </div>
    </article>

    <article class="card">
      <h3>External Icon Sizes</h3>
      <small class="text-muted">External icons respect all standard size tokens.</small>
      <div class="grid grid-auto-sm gap-lg">
        <div class="stack-sm text-center items-center">
          <pds-icon icon="solid-anatomy-brain-1" size="xs"></pds-icon>
          <small class="text-muted">xs (16px)</small>
        </div>
        <div class="stack-sm text-center items-center">
          <pds-icon icon="solid-anatomy-brain-1" size="sm"></pds-icon>
          <small class="text-muted">sm (20px)</small>
        </div>
        <div class="stack-sm text-center items-center">
          <pds-icon icon="solid-anatomy-brain-1" size="md"></pds-icon>
          <small class="text-muted">md (24px)</small>
        </div>
        <div class="stack-sm text-center items-center">
          <pds-icon icon="solid-anatomy-brain-1" size="lg"></pds-icon>
          <small class="text-muted">lg (32px)</small>
        </div>
        <div class="stack-sm text-center items-center">
          <pds-icon icon="solid-anatomy-brain-1" size="xl"></pds-icon>
          <small class="text-muted">xl (48px)</small>
        </div>
        <div class="stack-sm text-center items-center">
          <pds-icon icon="solid-anatomy-brain-1" size="2xl"></pds-icon>
          <small class="text-muted">2xl (64px)</small>
        </div>
      </div>
    </article>

    <article class="card">
      <h3>Color Inheritance</h3>
      <small class="text-muted">External icons support color customization just like sprite icons.</small>
      <div class="flex gap-lg flex-wrap items-center">
        <div class="card surface-elevated text-center items-center story-icon-card">
          <pds-icon icon="solid-anatomy-brain-1" size="xl" color="var(--color-primary-500)"></pds-icon>
          <small class="text-muted">Primary</small>
        </div>
        <div class="card surface-elevated text-center items-center story-icon-card">
          <pds-icon icon="solid-anatomy-hand-bones" size="xl" color="var(--color-accent-500)"></pds-icon>
          <small class="text-muted">Accent</small>
        </div>
        <div class="card surface-elevated text-center items-center story-icon-card">
          <pds-icon icon="solid-conditions-lung-condition-2" size="xl" color="var(--color-success-500)"></pds-icon>
          <small class="text-muted">Success</small>
        </div>
        <div class="card surface-elevated text-center items-center story-icon-card">
          <pds-icon icon="solid-anatomy-brain-1" size="xl" color="var(--color-warning-500)"></pds-icon>
          <small class="text-muted">Warning</small>
        </div>
        <div class="card surface-elevated text-center items-center story-icon-card">
          <pds-icon icon="solid-anatomy-hand-bones" size="xl" color="var(--color-error-500)"></pds-icon>
          <small class="text-muted">Error</small>
        </div>
      </div>
    </article>

    <article class="card">
      <h3>Fallback Behavior</h3>
      <small class="text-muted">
        When an icon isn't found in the sprite <em>or</em> the external path, 
        a fallback "missing" icon is shown.
      </small>
      <div class="flex gap-lg">
        <div class="card surface-elevated text-center items-center story-icon-card">
          <pds-icon icon="this-icon-does-not-exist" size="xl"></pds-icon>
          <small class="text-muted">Missing icon</small>
        </div>
      </div>
    </article>

    <article class="card">
      <h3>Cache Inspector</h3>
      <small class="text-muted">Click the button to inspect the current external icon cache state.</small>
      <button class="btn-secondary" id="check-cache-btn">Check External Icon Cache</button>
      <pre id="cache-status" class="story-cache-status">Click the button to see cache contents...</pre>
    </article>

    <article class="card surface-elevated">
      <h4>Configuration</h4>
      <small class="text-muted">Configure the external icons path in <code>pds.config.js</code>:</small>
      <pre><code>export const config = {
  design: {
    icons: {
      externalPath: "/assets/img/icons/", // Path for on-demand SVG icons
    }
  }
};</code></pre>
    </article>

    <article class="card surface-elevated">
      <h4>Usage</h4>
      <pre><code>&lt;!-- Sprite icon (instant from cache) --&gt;
&lt;pds-icon icon="house" size="lg"&gt;&lt;/pds-icon&gt;

&lt;!-- External icon (fetched from /assets/img/icons/my-custom-icon.svg) --&gt;
&lt;pds-icon icon="my-custom-icon" size="lg"&gt;&lt;/pds-icon&gt;</code></pre>
    </article>
  </section>
`;

ExternalIcons.storyName = 'External Icons';
ExternalIcons.play = async ({ canvasElement }) => {
  // Set up cache inspector button
  const btn = canvasElement.querySelector('#check-cache-btn');
  const status = canvasElement.querySelector('#cache-status');
  
  if (btn && status) {
    btn.addEventListener('click', () => {
      const SvgIcon = customElements.get('pds-icon');
      if (SvgIcon && SvgIcon.externalIconCache) {
        const cacheEntries = Array.from(SvgIcon.externalIconCache.entries()).map(([name, data]) => ({
          name,
          loaded: data.loaded,
          error: data.error,
          hasContent: !!data.content,
          viewBox: data.viewBox
        }));
        status.textContent = cacheEntries.length 
          ? JSON.stringify(cacheEntries, null, 2)
          : 'Cache is empty (no external icons fetched yet)';
      } else {
        status.textContent = 'pds-icon component not registered or cache not available';
      }
    });
  }
};
