import { html } from 'lit';

const docsParameters = {
  description: {
    component: 'Split panels divide content areas with a draggable divider for resizable layouts.'
  }
};

if (typeof window !== 'undefined') {
  import('../reference/reference-docs.js')
    .then(({ createComponentDocsPage }) => {
      docsParameters.page = createComponentDocsPage('pds-splitpanel');
    })
    .catch((error) => {
      console.warn('storybook: docs page failed to load for pds-splitpanel', error);
    });
}

// Story-specific styles for split panel demos
const splitpanelStoryStyles = html`
  <style>
    pds-splitpanel.card {
      padding: 0;
    }
    [slot="left"], [slot="right"] { padding: var(--spacing-2); }
    .story-splitpanel-console { 
      background: var(--color-gray-900); 
      color: var(--color-gray-200);
      & .story-cmd { color: var(--color-primary-400); }
      & .story-meta { color: var(--color-success-500); }
    }
    .story-splitpanel-stat { 
      font-size: 2.5rem; 
      font-weight: 700; 
      margin: var(--spacing-2) 0;
    }
    /* Violations fixed */
    .story-label-uppercase {
      font-size: var(--font-size-xs);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .story-label-sm {
      font-size: var(--font-size-sm);
    }
    .story-code-block {
      padding: var(--spacing-3);
      border-radius: var(--radius-md);
      font-family: var(--font-family-mono);
      font-size: 0.875rem;
      overflow: auto;
      background: var(--surface-bg-secondary);
    }
    .story-console {
      padding: var(--spacing-3);
      border-radius: var(--radius-md);
      font-family: var(--font-family-mono);
    }
    .story-nav-btn {
      justify-content: flex-start;
    }
    .story-activity-item {
      padding: var(--spacing-2);
      border-radius: var(--radius-sm);
    }
    .story-callout-list {
      margin-top: var(--spacing-2);
    }
    .story-callout-margin {
      margin-bottom: var(--spacing-4);
    }
  </style>
`;

export default {
  title: 'Components/pds-splitpanel',
  tags: ['autodocs', 'splitpanel', 'split', 'resizable', 'panel', 'layout'],
  parameters: {
    pds: {
      tags: ['splitpanel', 'split', 'resizable', 'panel', 'layout', 'sizing', 'interaction', 'pds-splitpanel']
    },
    docs: docsParameters
  }
};

export const Default = () => html`
  ${splitpanelStoryStyles}
  <pds-splitpanel class="card" orientation="horizontal" default-split="360px">
    <div slot="left" class="stack-md">
      <div class="stack-sm">
        <div>
          <p class="text-muted story-label-uppercase">Leadership Sync</p>
          <h3>Q4 Roadmap Planning</h3>
          <p class="text-muted">Monday, 2:00 PM • Conference Room Aurora</p>
        </div>

        <div class="flex flex-wrap gap-sm">
          <button class="btn-primary btn-sm">
            <pds-icon icon="video"></pds-icon>
            Join Meeting
          </button>
          <button class="btn-outline btn-sm">
            <pds-icon icon="calendar"></pds-icon>
            Add to Calendar
          </button>
        </div>

        <div>
          <h4>Agenda</h4>
          <ul class="stack-sm">
            <li>Roadmap alignment and blockers</li>
            <li>Department resource updates</li>
            <li>Upcoming launch dependencies</li>
          </ul>
        </div>
      </div>

      <div class="stack-sm">
        <h4>Attachments (2)</h4>
        <div class="stack-sm">
          <div class="flex gap-md items-center justify-between">
            <span class="flex gap-sm items-center">
              <pds-icon icon="file-text"></pds-icon>
              meeting-agenda.pdf
            </span>
            <button class="icon-only btn-outline btn-sm">
              <pds-icon icon="download" size="sm" label="Download"></pds-icon>
            </button>
          </div>
          <div class="flex gap-md items-center justify-between">
            <span class="flex gap-sm items-center">
              <pds-icon icon="file-text"></pds-icon>
              q4-report.xlsx
            </span>
            <button class="icon-only btn-outline btn-sm">
              <pds-icon icon="download" size="sm" label="Download"></pds-icon>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div slot="right" class="stack-md">
      <div class="stack-sm">
        <h3>Discussion Topics</h3>
        <ul class="stack-sm">
          <li>Prioritize customer feedback integration for the Q4 release.</li>
          <li>Finalize facility budget for new team hires.</li>
          <li>Review outstanding action items from last sprint review.</li>
        </ul>
      </div>

      <div class="stack-sm">
        <h4>Notes</h4>
        <p>
          Please come prepared with your updates and any questions you might have. Looking forward to seeing everyone there!
        </p>
        <div class="stack-xs">
          <strong>Sarah Johnson</strong>
          <span class="text-muted">Team Lead</span>
        </div>
      </div>
    </div>
  </pds-splitpanel>
`;

Default.storyName = 'Project Workspace';

export const CodeEditorLayout = () => html`
  ${splitpanelStoryStyles}
  <pds-splitpanel class="card" orientation="horizontal" default-split="50%">
    <div slot="left" class="stack-md">
      <h3>Code Editor</h3>

      <pre class="story-code-block"><code>function greet(name) {
  console.log('Hello, ' + name + '!');
}

greet('World');</code></pre>

      <div class="flex flex-wrap gap-sm">
        <button class="btn-primary">
          <pds-icon icon="play"></pds-icon>
          Run Code
        </button>
        <button class="btn-outline">
          <pds-icon icon="copy"></pds-icon>
          Copy
        </button>
      </div>
    </div>

    <div slot="right" class="stack-md">
      <h3>Output Console</h3>

      <div class="story-splitpanel-console stack-xs story-console">
        <div class="story-cmd">$ node script.js</div>
        <div>Hello, World!</div>
        <div class="story-meta">// Execution completed in 0.23s</div>
      </div>
    </div>
  </pds-splitpanel>
`;

CodeEditorLayout.storyName = 'Code Editor Layout';

export const DashboardLayout = () => html`
  ${splitpanelStoryStyles}
  <pds-splitpanel class="card" orientation="horizontal" default-split="250px">
    <div slot="left" class="stack-md">
      <h3>Navigation</h3>

      <nav class="stack-sm">
        <button class="btn-outline story-nav-btn">
          <pds-icon icon="house"></pds-icon>
          Dashboard
        </button>
        <button class="btn-outline story-nav-btn">
          <pds-icon icon="bar-chart"></pds-icon>
          Analytics
        </button>
        <button class="btn-outline story-nav-btn">
          <pds-icon icon="users"></pds-icon>
          Users
        </button>
        <button class="btn-outline story-nav-btn">
          <pds-icon icon="gear"></pds-icon>
          Settings
        </button>
      </nav>
    </div>

    <div slot="right" class="stack-md">
      <h2>Dashboard Overview</h2>

      <div class="grid grid-auto-sm gap-md">
        <div>
          <h4>Total Users</h4>
          <div class="story-splitpanel-stat text-primary">1,284</div>
          <p class="text-muted story-label-sm">↑ 12% from last month</p>
        </div>

        <div>
          <h4>Revenue</h4>
          <div class="story-splitpanel-stat text-secondary">$42.5K</div>
          <p class="text-muted story-label-sm">↑ 8% from last month</p>
        </div>

        <div>
          <h4>Active Now</h4>
          <div class="story-splitpanel-stat text-accent">127</div>
          <p class="text-muted story-label-sm">Current active users</p>
        </div>
      </div>

      <div class="stack-sm">
        <h3>Recent Activity</h3>
        <div class="stack-sm">
          ${Array.from({ length: 5 }, (_, i) => html`
            <div class="flex items-center gap-md story-activity-item">
              <pds-icon icon="user"></pds-icon>
              <div class="grow stack-xs">
                <strong>User ${i + 1}</strong>
                <span class="text-muted story-label-sm">Completed an action</span>
              </div>
              <span class="text-muted story-label-sm">${i + 1}h ago</span>
            </div>
          `)}
        </div>
      </div>
    </div>
  </pds-splitpanel>
`;

DashboardLayout.storyName = 'Dashboard Layout';

export const StyledToggle = () => html`
  ${splitpanelStoryStyles}
  <style>
    .styled-toggle-panel::part(toggle) {
      top: auto;
      bottom: var(--spacing-4);
      right: var(--spacing-4);
    }
  </style>

  <div class="callout callout-info story-callout-margin">
    <div class="callout-icon">
      <pds-icon icon="info" class="icon-info" size="lg"></pds-icon>
    </div>
    <div>
      <div class="callout-title">Styled Toggle</div>
      <p>The custom styled toggle button below is only visible when the viewport width is less than the breakpoint (default 1024px). Resize your browser to see it.</p>
    </div>
  </div>

  <pds-splitpanel class="card styled-toggle-panel" layout="horizontal" defaultsplit="360px">
    <div slot="left" class="stack-md">
      <h3>Mobile Menu</h3>
      <nav class="stack-sm">
        <button class="btn-outline story-nav-btn">
          <pds-icon icon="house"></pds-icon>
          Home
        </button>
        <button class="btn-outline story-nav-btn">
          <pds-icon icon="user"></pds-icon>
          Profile
        </button>
        <button class="btn-outline story-nav-btn">
          <pds-icon icon="gear"></pds-icon>
          Settings
        </button>
      </nav>
    </div>
    <div slot="right" class="stack-md">
      <h3>Main Content</h3>
      <p>This is the main content area. In mobile view, use the floating toggle button at the bottom right to access the menu.</p>
      <div class="stack-sm">
        <h4>Content Section</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
    </div>
  </pds-splitpanel>
`;

StyledToggle.storyName = 'Styled Mobile Toggle';

export const StyledSplitter = () => html`
  ${splitpanelStoryStyles}
  <style>
    .primary-splitter::part(splitter) {
      background-color: var(--color-primary-500);
      width: 6px;
      transition: background-color 0.15s ease;
      &:hover { background-color: var(--color-primary-400); }
    }
    .wide-splitter::part(splitter) {
      background-color: var(--color-accent-500);
      width: 10px;
      transition: background-color 0.15s ease;
      &:hover { background-color: var(--color-accent-400); }
    }
    .subtle-splitter::part(splitter) {
      background-color: var(--surface-elevated-bg);
      transition: background-color 0.15s ease, box-shadow 0.15s ease;
    }
    .subtle-splitter::part(splitter):hover { 
      background-color: var(--color-primary-500); 
      box-shadow: var(--shadow-md);
    }
    .gradient-splitter::part(splitter) {
      background: linear-gradient(180deg, var(--color-secondary-400), var(--color-accent-500));
      width: 8px;
      transition: opacity 0.15s ease;
      &:hover { opacity: 0.8; }
    }
  </style>

  <div class="stack-lg">
    <div class="callout callout-info">
      <div class="callout-icon">
        <pds-icon icon="info" class="icon-info" size="lg"></pds-icon>
      </div>
      <div>
        <div class="callout-title">Styling the Splitter with ::part()</div>
        <p>The splitter bar can be fully customized using the <code>::part(splitter)</code> CSS selector. This allows you to style:</p>
        <ul class="stack-xs story-callout-list">
          <li><code>background-color</code> or <code>background</code> (for gradients)</li>
          <li><code>width</code> (horizontal) or <code>height</code> (vertical)</li>
          <li><code>:hover</code> state styling</li>
          <li><code>border-radius</code>, <code>box-shadow</code>, and more</li>
        </ul>
      </div>
    </div>

    <h4>Primary Colored Splitter</h4>
    <pds-splitpanel class="card primary-splitter" orientation="horizontal" default-split="50%">
      <div slot="left" class="stack-sm">
        <h4>Left Panel</h4>
        <p>Uses primary color with hover effect.</p>
      </div>
      <div slot="right" class="stack-sm">
        <h4>Right Panel</h4>
        <p>Hover over the splitter to see the effect.</p>
      </div>
    </pds-splitpanel>

    <h4>Wide Accent Splitter (10px)</h4>
    <pds-splitpanel class="card wide-splitter" orientation="horizontal" default-split="40%">
      <div slot="left" class="stack-sm">
        <h4>Navigation</h4>
        <p>Wider splitters are easier to grab.</p>
      </div>
      <div slot="right" class="stack-sm">
        <h4>Content</h4>
        <p>10px width set via <code>::part(splitter)</code>.</p>
      </div>
    </pds-splitpanel>

    <h4>Subtle Splitter (highlights on hover)</h4>
    <pds-splitpanel class="card subtle-splitter" orientation="horizontal" default-split="60%">
      <div slot="left" class="stack-sm">
        <h4>Editor</h4>
        <p>Subtle by default, primary on hover.</p>
      </div>
      <div slot="right" class="stack-sm">
        <h4>Preview</h4>
        <p>Hover over the divider to see the effect.</p>
      </div>
    </pds-splitpanel>

    <h4>Gradient Splitter</h4>
    <pds-splitpanel class="card gradient-splitter" orientation="horizontal" default-split="50%">
      <div slot="left" class="stack-sm">
        <h4>Left Panel</h4>
        <p>Gradient background via <code>::part(splitter)</code>.</p>
      </div>
      <div slot="right" class="stack-sm">
        <h4>Right Panel</h4>
        <p>CSS parts enable any styling.</p>
      </div>
    </pds-splitpanel>
  </div>
`;

StyledSplitter.storyName = 'Styled Splitter';

