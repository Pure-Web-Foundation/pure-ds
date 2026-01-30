import { html } from "#pds/lit";

// Story-specific styles (not PDS classes - demo only)
const typographyStoryStyles = html`
  <style>
    /* Heading scale demo */
    .story-heading-container { padding: var(--spacing-8); max-width: 1200px; margin: 0 auto; }
    .story-heading-description { margin-top: calc(-1 * var(--spacing-2)); margin-bottom: var(--spacing-6); }
    .story-heading-description-last { margin-top: calc(-1 * var(--spacing-2)); margin-bottom: var(--spacing-4); }

    /* Font weight demo */
    .story-font-light { font-weight: var(--font-weight-light); }
    .story-font-normal { font-weight: var(--font-weight-normal); }
    .story-font-medium { font-weight: var(--font-weight-medium); }
    .story-font-semibold { font-weight: var(--font-weight-semibold); }
    .story-font-bold { font-weight: var(--font-weight-bold); }
    .story-weights-section { margin-bottom: var(--spacing-8); }

    /* Line height demo */
    .story-line-height-container { padding: var(--spacing-8); max-width: 64rem; margin: 0 auto; }
    .story-leading-tight { line-height: var(--font-line-height-tight); }
    .story-leading-normal { line-height: var(--font-line-height-normal); }
    .story-leading-relaxed { line-height: var(--font-line-height-relaxed); }
    .story-line-height-example { max-width: 40rem; margin-bottom: var(--spacing-6); }
    .story-tip-card { margin-top: var(--spacing-6); }

    /* Article layout demo */
    .story-article-meta { font-size: var(--font-size-sm); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--spacing-2); }
    .story-section-heading { margin-top: var(--spacing-8); margin-bottom: var(--spacing-4); }
    .story-article-list { margin: var(--spacing-6) 0; padding-left: var(--spacing-6); }
    .story-article-list li { margin-bottom: var(--spacing-3); }
    .story-impl-heading { margin-bottom: var(--spacing-3); }
    .story-code-block { padding: var(--spacing-4); border-radius: var(--radius-md); overflow-x: auto; font-size: var(--font-size-sm); }

    /* UI components demo */
    .story-form-wrapper { margin-bottom: var(--spacing-8); }
    .story-form-card { padding: var(--spacing-8); }
    .story-form-section { margin-bottom: var(--spacing-6); }
    .story-form-label { display: block; font-weight: var(--font-weight-semibold); margin-bottom: var(--spacing-2); }
    .story-help-text { font-size: var(--font-size-sm); margin-top: var(--spacing-2); }

    /* Data display demo */
    .story-user-list { margin-bottom: var(--spacing-8); }
    .story-user-item { padding: var(--spacing-5); border-bottom: 1px solid var(--color-border); }
    .story-user-item:last-child { border-bottom: none; }
    .story-user-header { margin-bottom: var(--spacing-2); }
    .story-user-name { font-weight: var(--font-weight-semibold); font-size: var(--font-size-base); margin-bottom: var(--spacing-1); }
    .story-user-role { font-size: var(--font-size-sm); }
    .story-user-meta { text-align: right; }
    .story-user-lastseen { font-size: var(--font-size-xs); margin-top: var(--spacing-1); }
    .story-stats-grid { display: grid; gap: var(--spacing-4); grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
    .story-stat-card { padding: var(--spacing-6); }
    .story-stat-label { font-size: var(--font-size-sm); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--spacing-2); }
    .story-stat-value { font-size: var(--font-size-3xl); font-weight: var(--font-weight-bold); margin-bottom: var(--spacing-1); }
    .story-stat-change { font-size: var(--font-size-sm); }
    .story-stat-positive { color: var(--color-success-600); }
    .story-stat-negative { color: var(--color-danger-600); }
    .story-timeline-heading { margin-top: var(--spacing-8); }
    .story-timeline-card { padding: var(--spacing-6); }
    .story-timeline-item { display: flex; gap: var(--spacing-4); }
    .story-timeline-time { min-width: 70px; font-size: var(--font-size-sm); font-variant-numeric: tabular-nums; }
    .story-timeline-content { flex: 1; }
    .story-timeline-action { margin-bottom: 2px; }
    .story-timeline-user { font-size: var(--font-size-sm); }

    /* Text selection demo */
    .story-selection-intro { margin-bottom: var(--spacing-6); }
    .story-selection-card { padding: var(--spacing-8); margin-bottom: var(--spacing-6); }
    .story-selection-description { margin-bottom: var(--spacing-4); }
    .story-code-pre { padding: var(--spacing-4); border-radius: var(--radius-md); overflow-x: auto; font-family: var(--font-family-mono); user-select: all; cursor: text; }
    .story-api-key { flex: 1; padding: var(--spacing-3); border-radius: var(--radius-md); font-family: var(--font-family-mono); word-break: break-all; user-select: all; }
    .story-copy-btn { white-space: nowrap; }
    .story-text-state-grid { display: grid; gap: var(--spacing-6); }
    .story-state-label { font-weight: var(--font-weight-semibold); margin-bottom: var(--spacing-2); }
    .story-no-select { user-select: none; }
    .story-select-hint { margin-top: var(--spacing-2); font-size: var(--font-size-sm); }
  </style>
`;

export default {
  title: "Foundations/Typography",
  tags: ["typography", "font", "text", "heading", "body", "size", "weight"],
  parameters: {
    pds: {
      tags: [
        "typography",
        "font",
        "text",
        "heading",
        "body",
        "size",
        "weight",
        "family",
        "tokens",
        "scale",
      ],
    },
    docs: {
      description: {
        component:
          "Typography system with scales, weights, line heights, and semantic text styles for building clear content hierarchy and readable interfaces.",
      },
    },
  },
};

export const HeadingScale = {
  name: "Heading Scale",
  render: () => html`
    ${typographyStoryStyles}
    <div class="stack-sm story-heading-container">
      <h1>Heading Level 1</h1>
      <p class="text-muted story-heading-description">
        Page title or hero heading - 2.5rem (40px) at default scale
      </p>

      <h2>Heading Level 2</h2>
      <p class="text-muted story-heading-description">
        Section heading - 2rem (32px) at default scale
      </p>

      <h3>Heading Level 3</h3>
      <p class="text-muted story-heading-description">
        Subsection heading - 1.5rem (24px) at default scale
      </p>

      <h4>Heading Level 4</h4>
      <p class="text-muted story-heading-description">
        Card or component heading - 1.25rem (20px) at default scale
      </p>

      <h5>Heading Level 5</h5>
      <p class="text-muted story-heading-description">
        Small heading - 1.125rem (18px) at default scale
      </p>

      <h6>Heading Level 6</h6>
      <p class="text-muted story-heading-description-last">
        Smallest heading - 1rem (16px) at default scale
      </p>
    </div>
  `,
};

export const TextStyles = {
  name: "Text Styles & Weights",
  render: () => html`
    ${typographyStoryStyles}
    <div class="stack-sm">
      <h2>Font Weights</h2>
      <div class="stack-sm story-weights-section">
        <p class="story-font-light">Light (300) - Subtle, delicate text</p>
        <p class="story-font-normal">Normal (400) - Default body text</p>
        <p class="story-font-medium">Medium (500) - Slightly emphasized</p>
        <p class="story-font-semibold">Semibold (600) - Strong emphasis</p>
        <p class="story-font-bold">Bold (700) - Heavy emphasis</p>
      </div>

      <h2>Text Decorations</h2>
      <div class="stack-sm">
        <p><strong>Bold text</strong> for important terms and emphasis</p>
        <p><em>Italic text</em> for subtle emphasis and citations</p>
        <p><u>Underlined text</u> - use sparingly, reserve for links</p>
        <p><del>Strikethrough text</del> for deprecated or removed content</p>
        <p>
          <mark>Highlighted text</mark> for search results or important notes
        </p>
        <p><code>Inline code</code> for technical terms and commands</p>
        <p><small>Small text</small> for fine print and disclaimers</p>
        <p class="text-muted">
          Muted text - secondary information, captions, timestamps
        </p>
      </div>
    </div>
  `,
};

export const LineHeights = {
  name: "Line Heights & Readability",
  render: () => html`
    ${typographyStoryStyles}
    <div class="stack-lg story-line-height-container">
      <h2>Tight Line Height (1.25)</h2>
      <p class="story-leading-tight story-line-height-example">
        Tight line height is best for headings and short text blocks where
        vertical space is limited. This creates a compact, dense appearance that
        works well for titles, labels, and UI components where readability of
        longer passages isn't a concern. Notice how the lines feel close
        together.
      </p>

      <h2>Normal Line Height (1.5)</h2>
      <p class="story-leading-normal story-line-height-example">
        Normal line height provides a balanced reading experience for most body
        text. This is the default for paragraphs and longer content blocks. It
        offers good readability without feeling too spacious or too cramped.
        Most interfaces use this as the standard for general content.
      </p>

      <h2>Relaxed Line Height (1.75)</h2>
      <p class="story-leading-relaxed story-line-height-example">
        Relaxed line height creates more breathing room between lines, improving
        readability for longer articles and documentation. This is ideal for
        blog posts, help content, and any text that users will spend extended
        time reading. The extra space reduces eye strain and makes it easier to
        track lines across the page.
      </p>

      <div class="card story-tip-card">
        <h3>Pro Tip: Measure (Line Length)</h3>
        <p>
          The optimal line length for readability is 50-75 characters per line
          (roughly 60ch). Lines that are too long make it difficult for readers
          to find the start of the next line. Lines that are too short cause the
          eye to travel back and forth too often.
        </p>
      </div>
    </div>
  `,
};

export const ArticleLayout = {
  name: "Article Layout",
  render: () => html`
    ${typographyStoryStyles}
    <article class="stack-md">
      <header>
        <p class="text-muted story-article-meta">Design Systems</p>
        <h1>Building Scalable Design Systems for Modern Web Applications</h1>
        <div class="flex gap-sm text-muted flex-wrap">
          <span>By Sarah Chen</span>
          <span>•</span>
          <time>November 17, 2025</time>
          <span>•</span>
          <span>8 min read</span>
        </div>
      </header>

      <section>
        <strong>
          A design system is more than a component library—it's a shared
          language that bridges design and development, ensuring consistency and
          quality across your entire product ecosystem.
        </strong>

        <p>
          In today's fast-paced development environment, maintaining visual and
          functional consistency across multiple products and teams is
          increasingly challenging. Design systems have emerged as the solution,
          providing a single source of truth for design decisions, component
          patterns, and implementation guidelines.
        </p>
      </section>

      <section>
        <h2 class="story-section-heading">Key Components of a Design System</h2>

        <p>
          A comprehensive design system consists of several interconnected
          layers, each serving a specific purpose in the overall architecture:
        </p>

        <ul class="story-article-list">
          <li>
            <strong>Design Tokens:</strong> The foundational layer defining
            colors, typography, spacing, and other atomic values
          </li>
          <li>
            <strong>Component Library:</strong> Reusable UI components built
            with consistent patterns
          </li>
          <li>
            <strong>Documentation:</strong> Clear guidelines on when and how to
            use each component
          </li>
          <li>
            <strong>Tools & Resources:</strong> Figma libraries, code templates,
            and development tools
          </li>
        </ul>

        <blockquote>
          <p>A design system isn't a project. It's a product serving products.</p>
          <cite>Nathan Curtis, Design Systems Expert</cite>
        </blockquote>
      </section>

      <h3>Getting Started with Design Tokens</h3>

      <p>
        Design tokens are the DNA of your design system. These named values
        represent design decisions that can be shared across platforms and
        technologies. For example, instead of hardcoding
        <code>#0066cc</code>, you define <code>--color-primary</code> which can
        be updated globally.
      </p>

      <section>
        <h4 class="story-impl-heading">Implementation Example</h4>
        <pre class="surface-base story-code-block"><code>/* Design tokens in CSS */
:root {
  --color-primary: #0066cc;
  --spacing-unit: 4px;
  --font-family-base: system-ui, sans-serif;
  --border-radius-md: 8px;
}</code></pre>

        <p>
          By adopting this approach, you create a flexible foundation that can
          evolve with your product needs while maintaining consistency across
          all touchpoints.
        </p>
      </section>

      <footer>
        <div class="flex gap-md flex-wrap">
          <span class="badge">Design Systems</span>
          <span class="badge">Web Components</span>
          <span class="badge">CSS Architecture</span>
        </div>
      </footer>
    </article>
  `,
};

export const UIComponents = {
  name: "UI Component Text",
  render: () => html`
    ${typographyStoryStyles}
    <div class="stack-sm">
      <h2>Form Labels & Help Text</h2>
      <div class="story-form-wrapper">
        <div class="card story-form-card">
          <div class="story-form-section">
            <label class="story-form-label">Email Address</label>
            <label class="input-icon">
              <pds-icon icon="envelope"></pds-icon>
              <input type="email" placeholder="you@example.com" />
            </label>
            <p class="text-muted story-help-text">
              We'll never share your email with anyone else.
            </p>
          </div>

          <div class="story-form-section">
            <label>
              Password
              <div class="input-icon">
                <pds-icon icon="lock"></pds-icon>
                <input type="password" placeholder="••••••••" />
              </div>
            </label>
            <p class="story-help-text">
              Password must be at least 8 characters long.
            </p>
          </div>

          <div>
            <label data-toggle>
              <input type="checkbox" />
              <span>Remember me for 30 days</span>
            </label>
          </div>
        </div>
      </div>

      <h2>Notifications & Messages</h2>
      <div class="stack-md">
        <div class="callout callout-success">
          <b>Success</b>
          <span>Your profile has been updated successfully.</span>
        </div>

        <div class="callout callout-warning">
          <b>Warning</b>
          <span>Your subscription will expire in 3 days. Renew now to continue access.</span>
        </div>

        <div class="callout callout-danger">
          <b>Error</b>
          <span>Unable to connect to the server. Please check your connection and try again.</span>
        </div>

        <div class="callout callout-info">
          <b>Information</b>
          <span>New features available! Check out our latest updates in the changelog.</span>
        </div>
      </div>
    </div>
  `,
};

export const DataDisplay = {
  name: "Data Display & Lists",
  render: () => html`
    ${typographyStoryStyles}
    <div class="stack-sm">
      <h2>User List with Metadata</h2>
      <div class="card story-user-list">
        ${[
          {
            name: "Alex Morgan",
            role: "Product Designer",
            status: "Active",
            lastSeen: "2 hours ago",
          },
          {
            name: "Jordan Lee",
            role: "Senior Developer",
            status: "Active",
            lastSeen: "Just now",
          },
          {
            name: "Sam Taylor",
            role: "UX Researcher",
            status: "Away",
            lastSeen: "1 day ago",
          },
          {
            name: "Casey Chen",
            role: "Engineering Manager",
            status: "Offline",
            lastSeen: "3 days ago",
          },
        ].map(
          (user) => html`
            <div class="story-user-item">
              <div class="flex justify-between items-start story-user-header">
                <div>
                  <div class="story-user-name">${user.name}</div>
                  <div class="text-muted story-user-role">${user.role}</div>
                </div>
                <div class="story-user-meta">
                  <span
                    class="badge ${user.status === "Active"
                      ? "badge-success"
                      : ""} ${user.status === "Away"
                      ? "badge-warning"
                      : ""} ${user.status === "Offline"
                      ? "badge-secondary"
                      : ""}"
                  >
                    ${user.status}
                  </span>
                  <div class="text-muted story-user-lastseen">${user.lastSeen}</div>
                </div>
              </div>
            </div>
          `
        )}
      </div>

      <h2>Stats & Metrics</h2>
      <div class="story-stats-grid">
        <div class="card story-stat-card">
          <div class="text-muted story-stat-label">Total Revenue</div>
          <div class="story-stat-value">$127,543</div>
          <div class="story-stat-change story-stat-positive">↑ 12.5% from last month</div>
        </div>

        <div class="card story-stat-card">
          <div class="text-muted story-stat-label">Active Users</div>
          <div class="story-stat-value">8,432</div>
          <div class="story-stat-change story-stat-positive">↑ 5.2% from last month</div>
        </div>

        <div class="card story-stat-card">
          <div class="text-muted story-stat-label">Conversion Rate</div>
          <div class="story-stat-value">3.8%</div>
          <div class="story-stat-change story-stat-negative">↓ 0.3% from last month</div>
        </div>
      </div>

      <h2 class="story-timeline-heading">Activity Timeline</h2>
      <div class="card story-timeline-card">
        <div class="stack-md">
          ${[
            {
              time: "2:34 PM",
              action: "Project deployed to production",
              user: "Jordan Lee",
            },
            {
              time: "1:15 PM",
              action: "Code review completed",
              user: "Alex Morgan",
            },
            {
              time: "11:23 AM",
              action: "New pull request opened",
              user: "Sam Taylor",
            },
            {
              time: "9:45 AM",
              action: "Design assets updated",
              user: "Casey Chen",
            },
          ].map(
            (item) => html`
              <div class="story-timeline-item">
                <div class="text-muted story-timeline-time">${item.time}</div>
                <div class="story-timeline-content">
                  <div class="story-timeline-action">${item.action}</div>
                  <div class="text-muted story-timeline-user">by ${item.user}</div>
                </div>
              </div>
            `
          )}
        </div>
      </div>
    </div>
  `,
};

export const TextSelection = {
  name: "Text Selection & Interaction",
  render: () => html`
    ${typographyStoryStyles}
    <div class="stack-sm">
      <h2>Selectable Text Examples</h2>
      <p class="text-muted story-selection-intro">
        Try selecting text in the examples below to see the selection styling.
      </p>

      <div class="card story-selection-card">
        <h3>Code Snippets</h3>
        <p class="text-muted story-selection-description">
          Monospace text for code should be easily selectable and copyable:
        </p>
        <pre class="surface-base story-code-pre"><code>npm install pure-design-system --save
pds configure --preset ocean-breeze
pds build --watch</code></pre>
      </div>

      <div class="card story-selection-card">
        <h3>API Keys & Tokens</h3>
        <p class="text-muted story-selection-description">
          Long strings that users need to copy:
        </p>
        <div class="flex items-center gap-md">
          <code class="surface-base story-api-key">
            pds_example_api_key_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p
          </code>
          <button class="btn-secondary story-copy-btn">Copy</button>
        </div>
      </div>

      <div class="card story-selection-card">
        <h3>Text with Different States</h3>
        <div class="story-text-state-grid">
          <div>
            <div class="story-state-label">Default Text</div>
            <p>
              This is normal, selectable paragraph text. You can highlight and
              copy it naturally.
            </p>
          </div>

          <div>
            <div class="story-state-label">Muted Text</div>
            <p class="text-muted">
              This is muted text, often used for secondary information. It's
              still fully selectable.
            </p>
          </div>

          <div>
            <div class="story-state-label">Non-Selectable Text (UI Labels)</div>
            <p class="story-no-select">
              This text cannot be selected - useful for UI chrome and labels
              that shouldn't be copied.
            </p>
          </div>

          <div>
            <div class="story-state-label">Pre-Selected Text</div>
            <div class="input-icon">
              <pds-icon icon="envelope"></pds-icon>
              <input
                type="text"
                value="pre-selected@example.com"
                readonly
                onclick="this.select()"
              />
            </div>
            <p class="text-muted story-select-hint">Click to select all</p>
          </div>
        </div>
      </div>
    </div>
  `,
};


