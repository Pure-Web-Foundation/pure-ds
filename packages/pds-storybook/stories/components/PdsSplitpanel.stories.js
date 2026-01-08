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


export default {
  title: 'Components/Pds Splitpanel',
  tags: ['autodocs', 'splitpanel', 'split', 'resizable', 'panel', 'layout'],
  parameters: {
    pds: {
      tags: ['splitpanel', 'split', 'resizable', 'panel', 'layout', 'sizing', 'interaction', 'pds-splitpanel']
    },
    docs: docsParameters
  }
};

export const Default = () => html`
  <pds-splitpanel class="splitpanel-story splitpanel-story--tall" orientation="horizontal" default-split="360px">
    <div slot="left" class="splitpanel-pane splitpanel-pane--surface splitpanel-pane--stacked">
      <article class="card surface-elevated splitpanel-card">
        <div>
          <p class="splitpanel-eyebrow">Leadership Sync</p>
          <h3 class="splitpanel-heading">Q4 Roadmap Planning</h3>
          <p class="splitpanel-meta">Monday, 2:00 PM • Conference Room Aurora</p>
        </div>

        <div class="splitpanel-action-group">
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
          <h4 class="splitpanel-section-title">Agenda</h4>
          <ul class="splitpanel-stack-md">
            <li>Roadmap alignment and blockers</li>
            <li>Department resource updates</li>
            <li>Upcoming launch dependencies</li>
          </ul>
        </div>
      </article>

      <article class="card surface-elevated splitpanel-card">
        <h4 class="splitpanel-section-title">Attachments (2)</h4>
        <div class="stack-sm">
          <div class="flex gap-md justify-between">
            <span>
              <pds-icon icon="file-text"></pds-icon>
              <span class="splitpanel-attachment__label">meeting-agenda.pdf</span>
            </span>
            <button class="icon-only btn-outline btn-sm">
              <pds-icon icon="download" size="sm" label="Download"></pds-icon>
            </button>
          </div>
          <div class="flex gap-md justify-between">
          <span>
            <pds-icon icon="file-text"></pds-icon>
            <span class="splitpanel-attachment__label">q4-report.xlsx</span>
            </span>
            <button class="icon-only btn-outline btn-sm">
              <pds-icon icon="download" size="sm" label="Download"></pds-icon>
            </button>
          </div>
        </div>
      </article>
    </div>

    <div slot="right" class="splitpanel-pane splitpanel-pane--stacked">
      <article class="card splitpanel-card">
        <h3 class="splitpanel-heading">Discussion Topics</h3>
        <ul class="splitpanel-stack-md">
          <li>Prioritize customer feedback integration for the Q4 release.</li>
          <li>Finalize facility budget for new team hires.</li>
          <li>Review outstanding action items from last sprint review.</li>
        </ul>
      </article>

      <article class="card surface-elevated splitpanel-card">
        <h4>Notes</h4>
        <p class="splitpanel-message">
          Please come prepared with your updates and any questions you might have. Looking forward to seeing everyone there!
        </p>
        <div class="stack-xs">
          <strong>Sarah Johnson</strong>
          <span>Team Lead</span>
        </div>
      </article>
    </div>
  </pds-splitpanel>
`;

Default.storyName = 'Project Workspace';

export const CodeEditorLayout = () => html`
  <pds-splitpanel orientation="horizontal" default-split="50%">
    <div slot="left" class="">
      <h3 class="splitpanel-heading">Code Editor</h3>

      <article class="card surface-elevated splitpanel-card">
        <pre class="splitpanel-code-block"><code>function greet(name) {
  console.log('Hello, ' + name + '!');
}

greet('World');</code></pre>
      </article>

      <div class="splitpanel-action-group">
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

    <div slot="right" class="splitpanel-pane splitpanel-pane--surface-alt splitpanel-pane--stacked">
      <h3 class="splitpanel-heading">Output Console</h3>

      <article class="card splitpanel-card splitpanel-card--tight">
        <div class="splitpanel-console">
          <div class="splitpanel-console__cmd">$ node script.js</div>
          <div>Hello, World!</div>
          <div class="splitpanel-console__meta">// Execution completed in 0.23s</div>
        </div>
      </article>
    </div>
  </pds-splitpanel>
`;

CodeEditorLayout.storyName = 'Code Editor Layout';

export const DashboardLayout = () => html`
  <pds-splitpanel orientation="horizontal" default-split="250px">
    <div slot="left" >
      <h3 class="splitpanel-heading splitpanel-dashboard-heading">Navigation</h3>

      <nav class="splitpanel-nav">
        <button class="btn-outline">
          <pds-icon icon="house"></pds-icon>
          Dashboard
        </button>
        <button class="btn-outline">
          <pds-icon icon="bar-chart"></pds-icon>
          Analytics
        </button>
        <button class="btn-outline">
          <pds-icon icon="users"></pds-icon>
          Users
        </button>
        <button class="btn-outline">
          <pds-icon icon="gear"></pds-icon>
          Settings
        </button>
      </nav>
    </div>

    <div slot="right" class="splitpanel-pane splitpanel-pane--stacked">
      <h2 class="splitpanel-heading">Dashboard Overview</h2>

      <div class="splitpanel-grid">
        <article class="card surface-elevated splitpanel-card splitpanel-card--tight">
          <h4 class="splitpanel-section-title">Total Users</h4>
          <div class="splitpanel-stat splitpanel-stat--primary">1,284</div>
          <p class="splitpanel-stat-note">↑ 12% from last month</p>
        </article>

        <article class="card surface-elevated splitpanel-card splitpanel-card--tight">
          <h4 class="splitpanel-section-title">Revenue</h4>
          <div class="splitpanel-stat splitpanel-stat--secondary">$42.5K</div>
          <p class="splitpanel-stat-note">↑ 8% from last month</p>
        </article>

        <article class="card surface-elevated splitpanel-card splitpanel-card--tight">
          <h4 class="splitpanel-section-title">Active Now</h4>
          <div class="splitpanel-stat splitpanel-stat--accent">127</div>
          <p class="splitpanel-stat-note">Current active users</p>
        </article>
      </div>

      <article class="card surface-elevated splitpanel-card splitpanel-activity-card">
        <h3 class="splitpanel-heading">Recent Activity</h3>
        <div class="splitpanel-activity-list">
          ${Array.from({ length: 5 }, (_, i) => html`
            <div class="splitpanel-activity-item">
              <div class="splitpanel-activity-avatar">
                <pds-icon icon="user"></pds-icon>
              </div>
              <div class="splitpanel-activity-body">
                <strong>User ${i + 1}</strong>
                <span class="splitpanel-activity-sub">Completed an action</span>
              </div>
              <span class="splitpanel-activity-time">${i + 1}h ago</span>
            </div>
          `)}
        </div>
      </article>
    </div>
  </pds-splitpanel>
`;

DashboardLayout.storyName = 'Dashboard Layout';

export const StyledToggle = () => html`
  <style>
    .styled-toggle-panel::part(toggle) {
      top: auto;
      bottom: var(--spacing-4);
      right: var(--spacing-4);
    }
  </style>

  <div class="alert alert-info" style="margin-bottom: var(--spacing-4);">
    <div class="alert-icon">
      <pds-icon icon="info" class="icon-info" size="lg"></pds-icon>
    </div>
    <div>
      <div class="alert-title">Styled Toggle</div>
      <p>The custom styled toggle button below is only visible when the viewport width is less than the breakpoint (default 1024px). Resize your browser to see it.</p>
    </div>
  </div>

  <pds-splitpanel class="splitpanel-story splitpanel-story--tall styled-toggle-panel" layout="horizontal" defaultsplit="360px">
    <div slot="left" class="splitpanel-pane splitpanel-pane--surface splitpanel-pane--stacked">
      <h3 class="splitpanel-heading">Mobile Menu</h3>
      <nav class="splitpanel-nav">
        <button class="btn-outline">
          <pds-icon icon="house"></pds-icon>
          Home
        </button>
        <button class="btn-outline">
          <pds-icon icon="user"></pds-icon>
          Profile
        </button>
        <button class="btn-outline">
          <pds-icon icon="gear"></pds-icon>
          Settings
        </button>
      </nav>
    </div>
    <div slot="right" class="splitpanel-pane splitpanel-pane--stacked">
      <h3 class="splitpanel-heading">Main Content</h3>
      <p>This is the main content area. In mobile view, use the floating toggle button at the bottom right to access the menu.</p>
      <article class="card surface-elevated splitpanel-card">
        <h4 class="splitpanel-section-title">Content Section</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </article>
    </div>
  </pds-splitpanel>
`;

StyledToggle.storyName = 'Styled Mobile Toggle';

