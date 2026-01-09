import { html } from "lit";

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
    <div
      class="stack-sm"
      style="padding: var(--spacing-8); max-width: 1200px; margin: 0 auto;"
    >
      <h1>Heading Level 1</h1>
      <p
        class="text-muted"
        style="margin-top: calc(-1 * var(--spacing-2)); margin-bottom: var(--spacing-6);"
      >
        Page title or hero heading - 2.5rem (40px) at default scale
      </p>

      <h2>Heading Level 2</h2>
      <p
        class="text-muted"
        style="margin-top: calc(-1 * var(--spacing-2)); margin-bottom: var(--spacing-6);"
      >
        Section heading - 2rem (32px) at default scale
      </p>

      <h3>Heading Level 3</h3>
      <p
        class="text-muted"
        style="margin-top: calc(-1 * var(--spacing-2)); margin-bottom: var(--spacing-6);"
      >
        Subsection heading - 1.5rem (24px) at default scale
      </p>

      <h4>Heading Level 4</h4>
      <p
        class="text-muted"
        style="margin-top: calc(-1 * var(--spacing-2)); margin-bottom: var(--spacing-6);"
      >
        Card or component heading - 1.25rem (20px) at default scale
      </p>

      <h5>Heading Level 5</h5>
      <p
        class="text-muted"
        style="margin-top: calc(-1 * var(--spacing-2)); margin-bottom: var(--spacing-6);"
      >
        Small heading - 1.125rem (18px) at default scale
      </p>

      <h6>Heading Level 6</h6>
      <p
        class="text-muted"
        style="margin-top: calc(-1 * var(--spacing-2)); margin-bottom: var(--spacing-4);"
      >
        Smallest heading - 1rem (16px) at default scale
      </p>
    </div>
  `,
};

export const TextStyles = {
  name: "Text Styles & Weights",
  render: () => html`
    <div class="stack gap-lg p-8 max-w-5xl mx-auto">
      <h2>Font Weights</h2>
      <div class="stack gap-2 mb-8">
        <p class="font-light">Light (300) - Subtle, delicate text</p>
        <p class="font-normal">Normal (400) - Default body text</p>
        <p class="font-medium">Medium (500) - Slightly emphasized</p>
        <p class="font-semibold">Semibold (600) - Strong emphasis</p>
        <p class="font-bold">Bold (700) - Heavy emphasis</p>
      </div>

      <h2>Text Decorations</h2>
      <div class="stack gap-2">
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
    <style>
      .leading-tight {
        line-height: var(--font-line-height-tight);
      }
      .leading-normal {
        line-height: var(--font-line-height-normal);
      }
      .leading-relaxed {
        line-height: var(--font-line-height-relaxed);
      }
    </style>
    <div
      class="stack gap-lg"
      style="padding: var(--spacing-8); max-width: var(--max-w-5xl); margin: 0 auto;"
    >
      <h2>Tight Line Height (1.25)</h2>
      <p
        class="leading-tight"
        style="max-width: var(--max-w-lg); margin-bottom: var(--spacing-6);"
      >
        Tight line height is best for headings and short text blocks where
        vertical space is limited. This creates a compact, dense appearance that
        works well for titles, labels, and UI components where readability of
        longer passages isn't a concern. Notice how the lines feel close
        together.
      </p>

      <h2>Normal Line Height (1.5)</h2>
      <p
        class="leading-normal"
        style="max-width: var(--max-w-lg); margin-bottom: var(--spacing-6);"
      >
        Normal line height provides a balanced reading experience for most body
        text. This is the default for paragraphs and longer content blocks. It
        offers good readability without feeling too spacious or too cramped.
        Most interfaces use this as the standard for general content.
      </p>

      <h2>Relaxed Line Height (1.75)</h2>
      <p
        class="leading-relaxed"
        style="max-width: var(--max-w-lg); margin-bottom: var(--spacing-6);"
      >
        Relaxed line height creates more breathing room between lines, improving
        readability for longer articles and documentation. This is ideal for
        blog posts, help content, and any text that users will spend extended
        time reading. The extra space reduces eye strain and makes it easier to
        track lines across the page.
      </p>

      <div
        class="card"
        style="padding: var(--spacing-6); margin-top: var(--spacing-6);"
      >
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
    <article class="stack-md">
      <header>
        <p class="text-muted text-sm uppercase tracking-wide mb-2">
          Design Systems
        </p>
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
          A design system is more than a component library—it's a shared language that bridges design
          and development, ensuring consistency and quality across your entire product ecosystem.
        </strong>

        <p>
          In today's fast-paced development environment, maintaining visual and functional consistency
          across multiple products and teams is increasingly challenging. Design systems have emerged
          as the solution, providing a single source of truth for design decisions, component patterns,
          and implementation guidelines.
        </p>

      </section>

      <section>
        <h2 class="mt-8 mb-4">Key Components of a Design System</h2>

        <p>
          A comprehensive design system consists of several interconnected layers, each serving a
          specific purpose in the overall architecture:
        </p>

        <ul class="my-6 pl-6">
          <li class="mb-3">
            <strong>Design Tokens:</strong> The foundational layer defining colors, typography, spacing, and other atomic values
          </li>
          <li class="mb-3">
            <strong>Component Library:</strong> Reusable UI components built with consistent patterns
          </li>
          <li class="mb-3">
            <strong>Documentation:</strong> Clear guidelines on when and how to use each component
          </li>
          <li class="mb-3">
            <strong>Tools & Resources:</strong> Figma libraries, code templates, and development tools
          </li>
        </ul>

        <blockquote>
          "A design system isn't a project. It's a product serving products."
          <footer class="mt-2 not-italic text-sm">
            — Nathan Curtis, Design Systems Expert
          </footer>
        </blockquote>

        </section>

        <section>
        <h3>Getting Started with Design Tokens</h3>

        <p>
          Design tokens are the DNA of your design system. These named values represent design decisions
          that can be shared across platforms and technologies. For example, instead of hardcoding
          <code>#0066cc</code>, you define <code>--color-primary</code> which can be updated globally.
        </p>

        <section>
          <h4 class="mb-3">Implementation Example</h4>
          <pre class="surface-base p-4 rounded-md overflow-x-auto text-sm"><code>/* Design tokens in CSS */
:root {
  --color-primary: #0066cc;
  --spacing-unit: 4px;
  --font-family-base: system-ui, sans-serif;
  --border-radius-md: 8px;
}</code></pre>
        

        <p>
          By adopting this approach, you create a flexible foundation that can evolve with your
          product needs while maintaining consistency across all touchpoints.
        </p>
      </section>

      <footer>
        <div class="flex gap-4 flex-wrap text-sm">
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
    <div class="stack gap-lg p-8 max-w-5xl mx-auto">
      <h2>Form Labels & Help Text</h2>
      <div class="mb-8">
        <div class="card p-8">
          <div class="mb-6">
            <label class="block font-semibold mb-2"> Email Address </label>
            <label class="input-icon">
              <pds-icon icon="envelope"></pds-icon>
              <input type="email" placeholder="you@example.com" />
            </label>
            <p class="text-muted text-sm mt-2">
              We'll never share your email with anyone else.
            </p>
          </div>

          <div class="mb-6">
            <label>
              Password

              <div class="input-icon">
                <pds-icon icon="lock"></pds-icon>
                <input type="password" placeholder="••••••••" />
              </div>
            </label>
            <p class="text-sm mt-2">
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
      <div class="flex flex-col gap-md">
        <div class="card alert alert-success">
          <b>Success</b>
          <span>Your profile has been updated successfully.</span>
        </div>

        <div class="card alert alert-warning">
          <b>Warning</b>
          <span
            >Your subscription will expire in 3 days. Renew now to continue
            access.</span
          >
        </div>

        <div class="alert alert-danger card">
          <b>Error</b>
          <span
            >Unable to connect to the server. Please check your connection and
            try again.</span
          >
        </div>

        <div class="card alert alert-info">
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
    <div class="stack gap-lg p-8 max-w-5xl mx-auto">
      <h2>User List with Metadata</h2>
      <div class="card mb-8">
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
            <div class="p-5 border-b border-border-subtle last:border-b-0">
              <div class="flex justify-between items-start gap-4 mb-2">
                <div>
                  <div class="font-semibold text-base mb-1">${user.name}</div>
                  <div class="text-muted text-sm">${user.role}</div>
                </div>
                <div class="text-right">
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
                  <div class="text-muted text-xs mt-1">${user.lastSeen}</div>
                </div>
              </div>
            </div>
          `
        )}
      </div>

      <h2>Stats & Metrics</h2>
      <div
        class="grid gap-md"
        style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));"
      >
        <div class="card p-6">
          <div class="text-muted text-sm uppercase tracking-wide mb-2">
            Total Revenue
          </div>
          <div class="text-3xl font-bold mb-1">$127,543</div>
          <div class="text-sm text-success">↑ 12.5% from last month</div>
        </div>

        <div class="card p-6">
          <div class="text-muted text-sm uppercase tracking-wide mb-2">
            Active Users
          </div>
          <div class="text-3xl font-bold mb-1">8,432</div>
          <div class="text-sm text-success">↑ 5.2% from last month</div>
        </div>

        <div class="card p-6">
          <div class="text-muted text-sm uppercase tracking-wide mb-2">
            Conversion Rate
          </div>
          <div class="text-3xl font-bold mb-1">3.8%</div>
          <div class="text-sm text-danger">↓ 0.3% from last month</div>
        </div>
      </div>

      <h2 class="mt-8">Activity Timeline</h2>
      <div class="card p-6">
        <div class="stack gap-5">
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
              <div class="flex gap-4">
                <div
                  class="text-muted text-sm tabular-nums"
                  style="min-width: 70px;"
                >
                  ${item.time}
                </div>
                <div class="flex-1">
                  <div class="mb-0.5">${item.action}</div>
                  <div class="text-muted text-sm">by ${item.user}</div>
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
    <div class="stack gap-lg p-8 max-w-5xl mx-auto">
      <h2>Selectable Text Examples</h2>
      <p class="text-muted mb-6">
        Try selecting text in the examples below to see the selection styling.
      </p>

      <div class="card p-8 mb-6">
        <h3>Code Snippets</h3>
        <p class="text-muted mb-4">
          Monospace text for code should be easily selectable and copyable:
        </p>
        <pre
          class="surface-base p-4 rounded-md overflow-x-auto font-mono"
          style="user-select: all; cursor: text;"
        ><code>npm install pure-design-system --save
pds configure --preset ocean-breeze
pds build --watch</code></pre>
      </div>

      <div class="card p-8 mb-6">
        <h3>API Keys & Tokens</h3>
        <p class="text-muted mb-4">Long strings that users need to copy:</p>
        <div class="flex items-center gap-4">
          <code
            class="flex-1 surface-base p-3 rounded-md font-mono break-all"
            style="user-select: all;"
          >
            pds_example_api_key_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p
          </code>
          <button class="btn-secondary whitespace-nowrap">Copy</button>
        </div>
      </div>

      <div class="card p-8">
        <h3>Text with Different States</h3>
        <div class="grid gap-6">
          <div>
            <div class="font-semibold mb-2">Default Text</div>
            <p>
              This is normal, selectable paragraph text. You can highlight and
              copy it naturally.
            </p>
          </div>

          <div>
            <div class="font-semibold mb-2">Muted Text</div>
            <p class="text-muted">
              This is muted text, often used for secondary information. It's
              still fully selectable.
            </p>
          </div>

          <div>
            <div class="font-semibold mb-2">
              Non-Selectable Text (UI Labels)
            </div>
            <p style="user-select: none;">
              This text cannot be selected - useful for UI chrome and labels
              that shouldn't be copied.
            </p>
          </div>

          <div>
            <div class="font-semibold mb-2">Pre-Selected Text</div>
            <div class="input-icon">
              <pds-icon icon="envelope"></pds-icon>
              <input
                type="text"
                value="pre-selected@example.com"
                readonly
                onclick="this.select()"
              />
            </div>
            <p class="text-muted text-sm mt-2">Click to select all</p>
          </div>
        </div>
      </div>
    </div>
  `,
};
