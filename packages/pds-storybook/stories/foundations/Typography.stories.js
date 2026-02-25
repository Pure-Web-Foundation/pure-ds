import { html } from "#pds/lit";


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
    <article>
      <header>
        <div class="text-muted story-article-meta">Design Systems</div>
        <h1>Building Scalable Design Systems for Modern Web Applications</h1>
        <small class="text-muted"
          >By Sarah Chen • November 17, 2025 • 8 min read</small
        >
      </header>

      <p>
        <strong>
        A design system is more than a component library—it's a shared language
        that bridges design and development, ensuring consistency and quality
        across your entire product ecosystem.
        </strong>
      </p>

      <p>
        In today's fast-paced development environment, maintaining visual and
        functional consistency across multiple products and teams is
        increasingly challenging. Design systems have emerged as the solution,
        providing a single source of truth for design decisions, component
        patterns, and implementation guidelines.
      </p>

      <section>
        <h2>Key Components of a Design System</h2>

        <p>
          A comprehensive design system consists of several interconnected
          layers, each serving a specific purpose in the overall architecture:
        </p>

        <ul>
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
          <p>
            A design system isn't a project. It's a product serving products.
          </p>
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
        <pre
          class="surface-base story-code-block"
        ><code>/* Design tokens in CSS */
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
          <span class="badge badge-outline badge-primary">Design Systems</span>
          <span class="badge badge-outline badge-primary">Web Components</span>
          <span class="badge badge-outline badge-primary">CSS Architecture</span>
        </div>
      </footer>
    </article>
  `,
};

export const UIComponents = {
  name: "UI Component Text",
  render: () => html`
    
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
          <span
            >Your subscription will expire in 3 days. Renew now to continue
            access.</span
          >
        </div>

        <div class="callout callout-danger">
          <b>Error</b>
          <span
            >Unable to connect to the server. Please check your connection and
            try again.</span
          >
        </div>

        <div class="callout callout-info">
          <b>Information</b>
          <span
            >New features available! Check out our latest updates in the
            changelog.</span
          >
        </div>
      </div>
    </div>
  `,
};

export const DataDisplay = {
  name: "Data Display & Lists",
  render: () => html`
    
    <div class="stack-lg">
      <h2>User List with Metadata</h2>
      <div class="card">
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
          (user, index, users) => html`
            <article class="flex flex-col gap-sm">
              <div class="flex justify-between items-start gap-md">
                <div class="stack-sm">
                  <strong>${user.name}</strong>
                  <div class="text-muted">${user.role}</div>
                </div>
                <div class="text-right stack-sm">
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
                  <div class="text-muted">${user.lastSeen}</div>
                </div>
              </div>
              ${index < users.length - 1 ? html`<hr />` : ""}
            </article>
          `,
        )}
      </div>

      <h2>Stats & Metrics</h2>
      <div class="grid grid-auto-md gap-md">
        <div class="card">
          <div class="text-muted">TOTAL REVENUE</div>
          <h2>$127,543</h2>
          <div class="text-success">
            ↑ 12.5% from last month
          </div>
        </div>

        <div class="card">
          <div class="text-muted">ACTIVE USERS</div>
          <h2>8,432</h2>
          <div class="text-success">
            ↑ 5.2% from last month
          </div>
        </div>

        <div class="card">
          <div class="text-muted">CONVERSION RATE</div>
          <h2>3.8%</h2>
          <div class="text-danger">
            ↓ 0.3% from last month
          </div>
        </div>
      </div>

      <h2>Activity Timeline</h2>
      <div class="card">
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
              <div class="flex gap-md items-start">
                <div class="text-muted">${item.time}</div>
                <div class="stack-sm grow">
                  <div>${item.action}</div>
                  <div class="text-muted">
                    by ${item.user}
                  </div>
                </div>
              </div>
            `,
          )}
        </div>
      </div>
    </div>
  `,
};
