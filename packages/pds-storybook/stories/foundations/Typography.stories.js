import { html } from 'lit';

const typographyStoryStyles = html`
  <style>
    .typography-heading-scale,
    .typography-text-styles,
    .typography-line-heights,
    .typography-ui-components,
    .typography-data-display,
    .typography-text-selection {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .typography-heading-scale__description {
      margin-top: -0.5rem;
      margin-bottom: 2rem;
    }

    .typography-heading-scale__description--compact {
      margin-bottom: 1rem;
    }

    .typography-text-styles__section {
      margin-bottom: 3rem;
    }

    .typography-text-styles__weights p {
      margin: 0.5rem 0;
    }

    .typography-text-styles__weight--light {
      font-weight: 300;
    }

    .typography-text-styles__weight--normal {
      font-weight: 400;
    }

    .typography-text-styles__weight--medium {
      font-weight: 500;
    }

    .typography-text-styles__weight--semibold {
      font-weight: 600;
    }

    .typography-text-styles__weight--bold {
      font-weight: 700;
    }

    .typography-text-styles__colors {
      display: grid;
      gap: 0.5rem;
    }

    .typography-text-styles__color--primary {
      color: var(--color-primary);
    }

    .typography-text-styles__color--success {
      color: var(--color-success);
    }

    .typography-text-styles__color--warning {
      color: var(--color-warning);
    }

    .typography-text-styles__color--danger {
      color: var(--color-danger);
    }

    .typography-line-heights__paragraph {
      max-width: 60ch;
      margin-bottom: 2rem;
    }

    .typography-line-heights__paragraph--tight {
      line-height: 1.2;
    }

    .typography-line-heights__paragraph--normal {
      line-height: 1.5;
    }

    .typography-line-heights__paragraph--relaxed {
      line-height: 1.8;
    }

    .typography-line-heights__card {
      margin-top: 2rem;
      padding: 1.5rem;
    }

    .typography-article {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .typography-article__header {
      margin-bottom: 2rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid var(--color-border-subtle);
    }

    .typography-article__eyebrow {
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.5rem;
    }

    .typography-article__title {
      margin-bottom: 1rem;
    }

    .typography-article__meta {
      display: flex;
      gap: 1rem;
      align-items: center;
      color: var(--color-text-subtle);
      flex-wrap: wrap;
    }

    .typography-article__content {
      line-height: 1.7;
      font-size: 1.0625rem;
    }

    .typography-article__intro {
      font-size: 1.25rem;
      line-height: 1.6;
      color: var(--color-text-subtle);
      margin-bottom: 2rem;
    }

    .typography-article__section-heading {
      margin-top: 2rem;
      margin-bottom: 1rem;
    }

    .typography-article__list {
      margin: 1.5rem 0;
      padding-left: 1.5rem;
    }

    .typography-article__list-item {
      margin-bottom: 0.75rem;
    }

    .typography-article__blockquote {
      margin: 2rem 0;
      padding-left: 1.5rem;
      border-left: 4px solid var(--color-primary);
      font-style: italic;
      color: var(--color-text-subtle);
    }

    .typography-article__blockquote footer {
      margin-top: 0.5rem;
      font-style: normal;
      font-size: 0.875rem;
    }

    .typography-article__card {
      margin: 2rem 0;
      padding: 1.5rem;
      background: var(--color-surface-elevated);
    }

    .typography-article__card-title {
      margin-bottom: 0.75rem;
    }

    .typography-article__code {
      background: var(--color-surface);
      padding: 1rem;
      border-radius: 8px;
      overflow-x: auto;
      font-size: 0.875rem;
    }

    .typography-article__footer {
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 1px solid var(--color-border-subtle);
    }

    .typography-article__tag-list {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      font-size: 0.875rem;
    }

    .typography-article__tag {
      padding: 0.25rem 0.75rem;
      background: var(--color-surface-elevated);
      border-radius: 16px;
    }

    .typography-ui-components__section {
      margin-bottom: 3rem;
    }

    .typography-ui-components__card {
      padding: 2rem;
    }

    .typography-ui-components__field {
      margin-bottom: 1.5rem;
    }

    .typography-ui-components__label {
      display: block;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .typography-ui-components__input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid var(--color-border);
      border-radius: 8px;
    }

    .typography-ui-components__help {
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }

    .typography-ui-components__error {
      font-size: 0.875rem;
      margin-top: 0.5rem;
      color: var(--color-danger);
    }

    .typography-ui-components__checkbox {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }

    .typography-ui-components__notifications {
      display: grid;
      gap: 1rem;
    }

    .typography-ui-components__notification {
      padding: 1rem;
      border-left: 4px solid transparent;
    }

    .typography-ui-components__notification--success {
      border-color: var(--color-success);
    }

    .typography-ui-components__notification--warning {
      border-color: var(--color-warning);
    }

    .typography-ui-components__notification--danger {
      border-color: var(--color-danger);
    }

    .typography-ui-components__notification--info {
      border-color: var(--color-primary);
    }

    .typography-ui-components__notification-title {
      font-weight: 600;
      margin-bottom: 0.25rem;
    }

    .typography-ui-components__notification-text {
      margin: 0;
    }

    .typography-data-display__card {
      margin-bottom: 3rem;
    }

    .typography-data-display__list-item {
      padding: 1.25rem;
      border-bottom: 1px solid var(--color-border-subtle);
    }

    .typography-data-display__list-item:last-child {
      border-bottom: none;
    }

    .typography-data-display__list-content {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 0.5rem;
    }

    .typography-data-display__user-name {
      font-weight: 600;
      font-size: 1.0625rem;
      margin-bottom: 0.25rem;
    }

    .typography-data-display__user-role {
      font-size: 0.875rem;
    }

    .typography-data-display__status {
      text-align: right;
    }

    .typography-data-display__status-badge {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 0.25rem 0.5rem;
      border-radius: 12px;
      display: inline-block;
    }

    .typography-data-display__status-badge--active {
      background: var(--color-success-bg);
      color: var(--color-success);
    }

    .typography-data-display__status-badge--away {
      background: var(--color-warning-bg);
      color: var(--color-warning);
    }

    .typography-data-display__status-badge--offline {
      background: var(--color-surface-elevated);
      color: var(--color-text-subtle);
    }

    .typography-data-display__status-meta {
      font-size: 0.8125rem;
      margin-top: 0.25rem;
    }

    .typography-data-display__stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .typography-data-display__stat-card {
      padding: 1.5rem;
    }

    .typography-data-display__stat-label {
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.5rem;
    }

    .typography-data-display__stat-value {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.25rem;
    }

    .typography-data-display__stat-trend {
      font-size: 0.875rem;
    }

    .typography-data-display__stat-trend--positive {
      color: var(--color-success);
    }

    .typography-data-display__stat-trend--negative {
      color: var(--color-danger);
    }

    .typography-data-display__timeline-title {
      margin-top: 3rem;
    }

    .typography-data-display__timeline-card {
      padding: 1.5rem;
    }

    .typography-data-display__timeline-entry {
      display: flex;
      gap: 1rem;
    }

    .typography-data-display__timeline-entry + .typography-data-display__timeline-entry {
      margin-top: 1.25rem;
    }

    .typography-data-display__timeline-time {
      font-size: 0.875rem;
      min-width: 70px;
      font-variant-numeric: tabular-nums;
    }

    .typography-data-display__timeline-content {
      flex: 1;
    }

    .typography-data-display__timeline-action {
      margin-bottom: 0.125rem;
    }

    .typography-data-display__timeline-meta {
      font-size: 0.875rem;
    }

    .typography-text-selection__intro {
      margin-bottom: 2rem;
    }

    .typography-text-selection__card {
      padding: 2rem;
      margin-bottom: 2rem;
    }

    .typography-text-selection__description {
      margin-bottom: 1rem;
    }

    .typography-text-selection__code {
      background: var(--color-surface);
      padding: 1rem;
      border-radius: 8px;
      overflow-x: auto;
      font-family: var(--font-family-mono);
      user-select: all;
      cursor: text;
    }

    .typography-text-selection__api-row {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .typography-text-selection__api-code {
      flex: 1;
      background: var(--color-surface);
      padding: 0.75rem;
      border-radius: 8px;
      font-family: var(--font-family-mono);
      user-select: all;
      word-break: break-all;
      text-overflow: ellipsis;
    }

    .typography-text-selection__api-button {
      white-space: nowrap;
    }

    .typography-text-selection__grid {
      display: grid;
      gap: 1.5rem;
    }

    .typography-text-selection__subheading {
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .typography-text-selection__non-selectable {
      user-select: none;
    }

    .typography-text-selection__input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid var(--color-border);
      border-radius: 8px;
      font-family: var(--font-family-mono);
    }

    .typography-text-selection__note {
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }
  </style>
`;

export default {
  title: 'Foundations/Typography',
  parameters: {
    docs: {
      description: {
        component: 'Typography system with scales, weights, line heights, and semantic text styles for building clear content hierarchy and readable interfaces.'
      }
    }
  }
};

export const HeadingScale = {
  name: 'Heading Scale',
  render: () => html`
    ${typographyStoryStyles}
    <div class="typography-heading-scale">
      <h1>Heading Level 1</h1>
      <p class="typography-heading-scale__description">
        Page title or hero heading - 2.5rem (40px) at default scale
      </p>

      <h2>Heading Level 2</h2>
      <p class="typography-heading-scale__description">
        Section heading - 2rem (32px) at default scale
      </p>

      <h3>Heading Level 3</h3>
      <p class="typography-heading-scale__description">
        Subsection heading - 1.5rem (24px) at default scale
      </p>

      <h4>Heading Level 4</h4>
      <p class="typography-heading-scale__description">
        Card or component heading - 1.25rem (20px) at default scale
      </p>

      <h5>Heading Level 5</h5>
      <p class="typography-heading-scale__description">
        Small heading - 1.125rem (18px) at default scale
      </p>

      <h6>Heading Level 6</h6>
      <p class="typography-heading-scale__description typography-heading-scale__description--compact">
        Smallest heading - 1rem (16px) at default scale
      </p>
    </div>
  `
};

export const TextStyles = {
  name: 'Text Styles & Weights',
  render: () => html`
    ${typographyStoryStyles}
    <div class="typography-text-styles">
      <h2>Font Weights</h2>
      <div class="typography-text-styles__section typography-text-styles__weights">
        <p class="typography-text-styles__weight typography-text-styles__weight--light">Light (300) - Subtle, delicate text</p>
        <p class="typography-text-styles__weight typography-text-styles__weight--normal">Normal (400) - Default body text</p>
        <p class="typography-text-styles__weight typography-text-styles__weight--medium">Medium (500) - Slightly emphasized</p>
        <p class="typography-text-styles__weight typography-text-styles__weight--semibold">Semibold (600) - Strong emphasis</p>
        <p class="typography-text-styles__weight typography-text-styles__weight--bold">Bold (700) - Heavy emphasis</p>
      </div>

      <h2>Text Decorations</h2>
      <div class="typography-text-styles__section">
        <p><strong>Bold text</strong> for important terms and emphasis</p>
        <p><em>Italic text</em> for subtle emphasis and citations</p>
        <p><u>Underlined text</u> - use sparingly, reserve for links</p>
        <p><del>Strikethrough text</del> for deprecated or removed content</p>
        <p><mark>Highlighted text</mark> for search results or important notes</p>
        <p><code>Inline code</code> for technical terms and commands</p>
        <p><small>Small text</small> for fine print and disclaimers</p>
      </div>

      <h2>Semantic Text Colors</h2>
      <div class="typography-text-styles__colors">
        <p>Normal text - default color for body content</p>
        <p class="text-muted">Muted text - secondary information, captions, timestamps</p>
        <p class="typography-text-styles__color typography-text-styles__color--primary">Primary colored text - brand accent, links</p>
        <p class="typography-text-styles__color typography-text-styles__color--success">Success text - positive feedback, completed states</p>
        <p class="typography-text-styles__color typography-text-styles__color--warning">Warning text - caution messages, pending states</p>
        <p class="typography-text-styles__color typography-text-styles__color--danger">Danger text - errors, critical alerts, destructive actions</p>
      </div>
    </div>
  `
};

export const LineHeights = {
  name: 'Line Heights & Readability',
  render: () => html`
    ${typographyStoryStyles}
    <div class="typography-line-heights">
      <h2>Tight Line Height (1.2)</h2>
      <p class="typography-line-heights__paragraph typography-line-heights__paragraph--tight">
        Tight line height is best for headings and short text blocks where vertical space is limited.
        This creates a compact, dense appearance that works well for titles, labels, and UI components
        where readability of longer passages isn't a concern. Notice how the lines feel close together.
      </p>

      <h2>Normal Line Height (1.5)</h2>
      <p class="typography-line-heights__paragraph typography-line-heights__paragraph--normal">
        Normal line height provides a balanced reading experience for most body text. This is the default
        for paragraphs and longer content blocks. It offers good readability without feeling too spacious
        or too cramped. Most interfaces use this as the standard for general content.
      </p>

      <h2>Relaxed Line Height (1.8)</h2>
      <p class="typography-line-heights__paragraph typography-line-heights__paragraph--relaxed">
        Relaxed line height creates more breathing room between lines, improving readability for longer
        articles and documentation. This is ideal for blog posts, help content, and any text that users
        will spend extended time reading. The extra space reduces eye strain and makes it easier to
        track lines across the page.
      </p>

      <div class="card typography-line-heights__card">
        <h3>Pro Tip: Measure (Line Length)</h3>
        <p>
          The optimal line length for readability is 50-75 characters per line (roughly 60ch).
          Lines that are too long make it difficult for readers to find the start of the next line.
          Lines that are too short cause the eye to travel back and forth too often.
        </p>
      </div>
    </div>
  `
};

export const ArticleLayout = {
  name: 'Article Layout',
  render: () => html`
    ${typographyStoryStyles}
    <article class="typography-article">
      <header class="typography-article__header">
        <p class="text-muted typography-article__eyebrow">
          Design Systems
        </p>
        <h1 class="typography-article__title">Building Scalable Design Systems for Modern Web Applications</h1>
        <div class="typography-article__meta">
          <span>By Sarah Chen</span>
          <span>•</span>
          <time>November 17, 2025</time>
          <span>•</span>
          <span>8 min read</span>
        </div>
      </header>

      <div class="typography-article__content">
        <p class="typography-article__intro">
          A design system is more than a component library—it's a shared language that bridges design
          and development, ensuring consistency and quality across your entire product ecosystem.
        </p>

        <p>
          In today's fast-paced development environment, maintaining visual and functional consistency
          across multiple products and teams is increasingly challenging. Design systems have emerged
          as the solution, providing a single source of truth for design decisions, component patterns,
          and implementation guidelines.
        </p>

        <h2 class="typography-article__section-heading">Key Components of a Design System</h2>

        <p>
          A comprehensive design system consists of several interconnected layers, each serving a
          specific purpose in the overall architecture:
        </p>

        <ul class="typography-article__list">
          <li class="typography-article__list-item">
            <strong>Design Tokens:</strong> The foundational layer defining colors, typography, spacing, and other atomic values
          </li>
          <li class="typography-article__list-item">
            <strong>Component Library:</strong> Reusable UI components built with consistent patterns
          </li>
          <li class="typography-article__list-item">
            <strong>Documentation:</strong> Clear guidelines on when and how to use each component
          </li>
          <li class="typography-article__list-item">
            <strong>Tools & Resources:</strong> Figma libraries, code templates, and development tools
          </li>
        </ul>

        <blockquote class="typography-article__blockquote">
          "A design system isn't a project. It's a product serving products."
          <footer>
            — Nathan Curtis, Design Systems Expert
          </footer>
        </blockquote>

        <h3 class="typography-article__section-heading">Getting Started with Design Tokens</h3>

        <p>
          Design tokens are the DNA of your design system. These named values represent design decisions
          that can be shared across platforms and technologies. For example, instead of hardcoding
          <code>#0066cc</code>, you define <code>--color-primary</code> which can be updated globally.
        </p>

        <div class="card typography-article__card">
          <h4 class="typography-article__card-title">Implementation Example</h4>
          <pre class="typography-article__code"><code>/* Design tokens in CSS */
:root {
  --color-primary: #0066cc;
  --spacing-unit: 4px;
  --font-family-base: system-ui, sans-serif;
  --border-radius-md: 8px;
}</code></pre>
        </div>

        <p>
          By adopting this approach, you create a flexible foundation that can evolve with your
          product needs while maintaining consistency across all touchpoints.
        </p>
      </div>

      <footer class="typography-article__footer">
        <div class="typography-article__tag-list">
          <span class="typography-article__tag">
            Design Systems
          </span>
          <span class="typography-article__tag">
            Web Components
          </span>
          <span class="typography-article__tag">
            CSS Architecture
          </span>
        </div>
      </footer>
    </article>
  `
};

export const UIComponents = {
  name: 'UI Component Text',
  render: () => html`
    ${typographyStoryStyles}
    <div class="typography-ui-components">
      <h2>Form Labels & Help Text</h2>
      <div class="typography-ui-components__section">
        <div class="card typography-ui-components__card">
          <div class="typography-ui-components__field">
            <label class="typography-ui-components__label">
              Email Address
            </label>
            <label class="input-icon">
              <pds-icon icon="envelope"></pds-icon>
              <input type="email" placeholder="you@example.com">
            </label>
            <p class="text-muted typography-ui-components__help">
              We'll never share your email with anyone else.
            </p>
          </div>

          <div class="typography-ui-components__field">
            <label>
              Password
            
              <div class="input-icon">
                <pds-icon icon="lock"></pds-icon>
                <input type="password" placeholder="••••••••">
              </div>
            </label>
            <p>
              Password must be at least 8 characters long.
            </p>
          </div>

          <div>
            <label data-toggle>
              <input type="checkbox">
              <span>Remember me for 30 days</span>
            </label>
          </div>
        </div>
      </div>

      <h2>Notifications & Messages</h2>
      <div class="flex flex-col gap-md">
        <div class="card alert alert-success">
          <b>Success</b>
          <span>Your profile has been updated successfully.</span>
        </div>

        <div class="card alert alert-warning">
          <b>Warning</b>
          <span>Your subscription will expire in 3 days. Renew now to continue access.</span>
        </div>

        <div class="alert alert-danger card">
          <b>Error</b>
          <span>Unable to connect to the server. Please check your connection and try again.</span>
        </div>

        <div class="card alert alert-info">
          <b>Information</b>
          <span>New features available! Check out our latest updates in the changelog.</span>
        </div>
      </div>
    </div>
  `
};

export const DataDisplay = {
  name: 'Data Display & Lists',
  render: () => html`
    ${typographyStoryStyles}
    <div class="typography-data-display">
      <h2>User List with Metadata</h2>
      <div class="card typography-data-display__card">
        ${[
          { name: 'Alex Morgan', role: 'Product Designer', status: 'Active', lastSeen: '2 hours ago' },
          { name: 'Jordan Lee', role: 'Senior Developer', status: 'Active', lastSeen: 'Just now' },
          { name: 'Sam Taylor', role: 'UX Researcher', status: 'Away', lastSeen: '1 day ago' },
          { name: 'Casey Chen', role: 'Engineering Manager', status: 'Offline', lastSeen: '3 days ago' }
        ].map((user) => html`
          <div class="typography-data-display__list-item">
            <div class="typography-data-display__list-content">
              <div>
                <div class="typography-data-display__user-name">
                  ${user.name}
                </div>
                <div class="text-muted typography-data-display__user-role">
                  ${user.role}
                </div>
              </div>
              <div class="typography-data-display__status">
                <div
                  class="typography-data-display__status-badge ${user.status === 'Active' ? 'typography-data-display__status-badge--active' : ''} ${user.status === 'Away' ? 'typography-data-display__status-badge--away' : ''} ${user.status === 'Offline' ? 'typography-data-display__status-badge--offline' : ''}"
                >
                  ${user.status}
                </div>
                <div class="text-muted typography-data-display__status-meta">
                  ${user.lastSeen}
                </div>
              </div>
            </div>
          </div>
        `)}
      </div>

      <h2>Stats & Metrics</h2>
      <div class="typography-data-display__stats">
        <div class="card typography-data-display__stat-card">
          <div class="text-muted typography-data-display__stat-label">
            Total Revenue
          </div>
          <div class="typography-data-display__stat-value">
            $127,543
          </div>
          <div class="typography-data-display__stat-trend typography-data-display__stat-trend--positive">
            ↑ 12.5% from last month
          </div>
        </div>

        <div class="card typography-data-display__stat-card">
          <div class="text-muted typography-data-display__stat-label">
            Active Users
          </div>
          <div class="typography-data-display__stat-value">
            8,432
          </div>
          <div class="typography-data-display__stat-trend typography-data-display__stat-trend--positive">
            ↑ 5.2% from last month
          </div>
        </div>

        <div class="card typography-data-display__stat-card">
          <div class="text-muted typography-data-display__stat-label">
            Conversion Rate
          </div>
          <div class="typography-data-display__stat-value">
            3.8%
          </div>
          <div class="typography-data-display__stat-trend typography-data-display__stat-trend--negative">
            ↓ 0.3% from last month
          </div>
        </div>
      </div>

      <h2 class="typography-data-display__timeline-title">Activity Timeline</h2>
      <div class="card typography-data-display__timeline-card">
        ${[
          { time: '2:34 PM', action: 'Project deployed to production', user: 'Jordan Lee' },
          { time: '1:15 PM', action: 'Code review completed', user: 'Alex Morgan' },
          { time: '11:23 AM', action: 'New pull request opened', user: 'Sam Taylor' },
          { time: '9:45 AM', action: 'Design assets updated', user: 'Casey Chen' }
        ].map((item) => html`
          <div class="typography-data-display__timeline-entry">
            <div class="text-muted typography-data-display__timeline-time">
              ${item.time}
            </div>
            <div class="typography-data-display__timeline-content">
              <div class="typography-data-display__timeline-action">
                ${item.action}
              </div>
              <div class="text-muted typography-data-display__timeline-meta">
                by ${item.user}
              </div>
            </div>
          </div>
        `)}
      </div>
    </div>
  `
};

export const TextSelection = {
  name: 'Text Selection & Interaction',
  render: () => html`
    ${typographyStoryStyles}
    <div class="typography-text-selection">
      <h2>Selectable Text Examples</h2>
      <p class="text-muted typography-text-selection__intro">
        Try selecting text in the examples below to see the selection styling.
      </p>

      <div class="card typography-text-selection__card">
        <h3>Code Snippets</h3>
        <p class="text-muted typography-text-selection__description">
          Monospace text for code should be easily selectable and copyable:
        </p>
        <pre class="typography-text-selection__code"><code>npm install pure-design-system --save
pds configure --preset ocean-breeze
pds build --watch</code></pre>
      </div>

      <div class="card typography-text-selection__card">
        <h3>API Keys & Tokens</h3>
        <p class="text-muted typography-text-selection__description">
          Long strings that users need to copy:
        </p>
        <div class="typography-text-selection__api-row">
          <code class="typography-text-selection__api-code">
            pds_example_api_key_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p
          </code>
          <button class="button-secondary typography-text-selection__api-button">Copy</button>
        </div>
      </div>

      <div class="card typography-text-selection__card">
        <h3>Text with Different States</h3>
        <div class="typography-text-selection__grid">
          <div>
            <div class="typography-text-selection__subheading">Default Text</div>
            <p>This is normal, selectable paragraph text. You can highlight and copy it naturally.</p>
          </div>

          <div>
            <div class="typography-text-selection__subheading">Muted Text</div>
            <p class="text-muted">This is muted text, often used for secondary information. It's still fully selectable.</p>
          </div>

          <div>
            <div class="typography-text-selection__subheading">Non-Selectable Text (UI Labels)</div>
            <p class="typography-text-selection__non-selectable">This text cannot be selected - useful for UI chrome and labels that shouldn't be copied.</p>
          </div>

          <div>
            <div class="typography-text-selection__subheading">Pre-Selected Text</div>
            <div class="input-icon">
              <pds-icon icon="envelope"></pds-icon>
              <input
                type="text"
                value="pre-selected@example.com"
                readonly
                onclick="this.select()"
              >
            </div>
            <p class="text-muted"><small>Click to select all</small></p>
          </div>
        </div>
      </div>
    </div>
  `
};
