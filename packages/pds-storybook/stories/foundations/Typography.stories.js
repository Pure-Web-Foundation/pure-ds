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
    <header>
      <h3>Heading Scale</h3>
      <small class="text-muted">
        Compare semantic heading levels and their default tokenized sizes.
      </small>
    </header>
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
    <header>
      <h3>Text Styles & Weights</h3>
      <small class="text-muted">
        Review font-weight and inline text semantics for UI copy.
      </small>
    </header>
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
    <header>
      <h3>Line Heights & Readability</h3>
      <small class="text-muted">
        See how leading affects scanning and long-form readability.
      </small>
    </header>
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

export const UIComponents = {
  name: "UI Component Text",
  render: () => html`
    <header>
      <h3>UI Component Text</h3>
      <small class="text-muted">
        Typical microcopy patterns for forms, labels, and status messaging.
      </small>
    </header>
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
    <header>
      <h3>Data Display & Lists</h3>
      <small class="text-muted">
        Text hierarchy patterns for lists, metrics, and timeline content.
      </small>
    </header>
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
