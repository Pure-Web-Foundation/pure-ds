import { html } from 'lit';

const splitpanelStoryStyles = html`
  <style>
    .splitpanel-story {
      width: 100%;
      height: 560px;
    }

    .splitpanel-story--tall {
      height: 600px;
    }

    .splitpanel-story--xl {
      height: 700px;
    }

    .splitpanel-pane {
      box-sizing: border-box;
      padding: var(--spacing-4);
      overflow: auto;
      background: transparent;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-4);
    }

    .splitpanel-pane--surface {
      background: var(--surface-bg);
    }

    .splitpanel-pane--surface-alt {
      background: var(--surface-bg-secondary);
    }

    .splitpanel-pane--stacked {
      gap: var(--spacing-3);
    }

    .splitpanel-card {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-3);
    }

    .splitpanel-card--tight {
      gap: var(--spacing-2);
    }

    .splitpanel-eyebrow {
      margin: 0;
      text-transform: uppercase;
      font-size: 0.75rem;
      letter-spacing: 0.08em;
      color: var(--text-subtle, rgba(0, 0, 0, 0.6));
    }

    .splitpanel-heading {
      margin: 0;
    }

    .splitpanel-section-title {
      margin: 0;
    }

    .splitpanel-meta {
      margin: 0;
      font-size: 0.9rem;
      color: var(--text-muted, rgba(0, 0, 0, 0.65));
    }

    .splitpanel-action-group {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-2);
    }

    .splitpanel-stack {
      margin: 0;
      padding-left: var(--spacing-5);
    }

    .splitpanel-stack li + li {
      margin-top: var(--spacing-2);
    }

    .splitpanel-attachments {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-2);
    }

    .splitpanel-attachment {
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
      padding: var(--spacing-2);
      border-radius: var(--radius-sm);
      background: var(--surface-bg-secondary);
    }

    .splitpanel-attachment__label {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .splitpanel-message {
      margin: 0;
      line-height: 1.6;
    }

    .splitpanel-signoff {
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-1);
    }

    .splitpanel-code-block {
      margin: 0;
      padding: var(--spacing-3);
      border-radius: var(--radius-md);
      background: var(--surface-bg-secondary);
      font-family: var(--font-family-mono, 'Fira Code', 'Courier New', monospace);
      font-size: 0.875rem;
      overflow: auto;
    }

    .splitpanel-console {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-1);
      padding: var(--spacing-3);
      border-radius: var(--radius-md);
      background: #1e1e1e;
      color: #d4d4d4;
      font-family: var(--font-family-mono, 'Fira Code', 'Courier New', monospace);
    }

    .splitpanel-console__cmd {
      color: #4ec9b0;
    }

    .splitpanel-console__meta {
      color: #6a9955;
    }

    .splitpanel-dashboard-heading {
      margin: 0 0 var(--spacing-4);
    }

    .splitpanel-nav {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-2);
    }

    .splitpanel-nav .btn-outline {
      justify-content: flex-start;
    }

    .splitpanel-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--spacing-4);
    }

    .splitpanel-stat {
      font-size: 2.5rem;
      font-weight: 700;
      margin: var(--spacing-2) 0;
    }

    .splitpanel-stat--primary {
      color: var(--color-primary);
    }

    .splitpanel-stat--secondary {
      color: var(--color-secondary);
    }

    .splitpanel-stat--accent {
      color: var(--color-accent);
    }

    .splitpanel-stat-note {
      margin: 0;
      font-size: 0.85rem;
      opacity: 0.7;
    }

    .splitpanel-activity-card {
      gap: var(--spacing-3);
    }

    .splitpanel-activity-list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-3);
    }

    .splitpanel-activity-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-3);
      padding: var(--spacing-2);
      border-radius: var(--radius-sm);
      background: var(--surface-bg-secondary);
    }

    .splitpanel-activity-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-primary);
      color: #ffffff;
    }

    .splitpanel-activity-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-1);
    }

    .splitpanel-activity-sub {
      font-size: 0.85rem;
      opacity: 0.7;
    }

    .splitpanel-activity-time {
      font-size: 0.85rem;
      opacity: 0.6;
    }
  </style>
`;

export default {
  title: 'Components/Pds Splitpanel',
  parameters: {
    pds: {
      tags: ['layout', 'sizing', 'interaction']
    },
    docs: {
      description: {
        component: 'Split panels divide content areas with a draggable divider for resizable layouts.'
      }
    }
  }
};

export const Default = () => html`
  ${splitpanelStoryStyles}
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
          <ul class="splitpanel-stack">
            <li>Roadmap alignment and blockers</li>
            <li>Department resource updates</li>
            <li>Upcoming launch dependencies</li>
          </ul>
        </div>
      </article>

      <article class="card surface-elevated splitpanel-card splitpanel-card--tight">
        <h4 class="splitpanel-section-title">Attachments (2)</h4>
        <div class="splitpanel-attachments">
          <div class="splitpanel-attachment">
            <pds-icon icon="file-text"></pds-icon>
            <span class="splitpanel-attachment__label">meeting-agenda.pdf</span>
            <button class="icon-only btn-outline btn-sm">
              <pds-icon icon="download" size="sm" label="Download"></pds-icon>
            </button>
          </div>
          <div class="splitpanel-attachment">
            <pds-icon icon="file-text"></pds-icon>
            <span class="splitpanel-attachment__label">q4-report.xlsx</span>
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
        <ul class="splitpanel-stack">
          <li>Prioritize customer feedback integration for the Q4 release.</li>
          <li>Finalize facility budget for new team hires.</li>
          <li>Review outstanding action items from last sprint review.</li>
        </ul>
      </article>

      <article class="card surface-elevated splitpanel-card">
        <h4 class="splitpanel-section-title">Notes</h4>
        <p class="splitpanel-message">
          Please come prepared with your updates and any questions you might have. Looking forward to seeing everyone there!
        </p>
        <p class="splitpanel-signoff">
          <strong>Sarah Johnson</strong>
          <span>Team Lead</span>
        </p>
      </article>
    </div>
  </pds-splitpanel>
`;

Default.storyName = 'Project Workspace';

export const CodeEditorLayout = () => html`
  ${splitpanelStoryStyles}
  <pds-splitpanel class="splitpanel-story splitpanel-story--tall" orientation="horizontal" default-split="50%">
    <div slot="left" class="splitpanel-pane splitpanel-pane--surface splitpanel-pane--stacked">
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
  ${splitpanelStoryStyles}
  <pds-splitpanel class="splitpanel-story splitpanel-story--xl" orientation="horizontal" default-split="250px">
    <div slot="left" class="splitpanel-pane splitpanel-pane--surface splitpanel-pane--stacked">
      <h3 class="splitpanel-heading splitpanel-dashboard-heading">Navigation</h3>

      <nav class="splitpanel-nav">
        <button class="btn-outline">
          <pds-icon icon="home"></pds-icon>
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

