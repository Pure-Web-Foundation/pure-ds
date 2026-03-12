import { html } from 'lit';

const docsParameters = {
  description: {
    component: 'Slide-out panels from any edge'
  }
};

if (typeof window !== 'undefined') {
  import('../reference/reference-docs.js')
    .then(({ createComponentDocsPage }) => {
      docsParameters.page = createComponentDocsPage('pds-drawer');
    })
    .catch((error) => {
      console.warn('storybook: docs page failed to load for pds-drawer', error);
    });
}

export default {
  title: 'Components/pds-drawer',
  tags: ['autodocs', 'drawer', 'panel', 'sidebar', 'overlay', 'navigation', 'modal'],
  parameters: {
    pds: {
      tags: ['drawer', 'panel', 'sidebar', 'overlay', 'navigation', 'modal', 'pds-drawer', 'layout', 'grouping', 'interaction']
    },
    docs: docsParameters
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Edge to slide from'
    }
  }
};

export const Default = {
  render: (args) => {
    setTimeout(() => {
      const btn = document.querySelector('#open-drawer-btn');
      const drawer = document.querySelector('#demo-drawer');
      const closeBtn = document.querySelector('#close-drawer-btn');

      if (btn && drawer) {
        btn.onclick = () => drawer.open = true;
      }
      if (closeBtn && drawer) {
        closeBtn.onclick = () => drawer.open = false;
      }
    }, 0);

    return html`
      <div>
        <header class="card surface-elevated">
          <div class="flex justify-between items-center gap-md">
            <div class="stack-xs">
              <small class="text-muted">Default Drawer Story</small>
              <h2>General Overlay Surface</h2>
            </div>
            <button id="open-drawer-btn" class="btn-primary">
              <pds-icon icon="list"></pds-icon>
              <span>Open Drawer (${args.position})</span>
            </button>
          </div>
          <p>
            The default story now includes realistic page content so drawer behavior can be evaluated with
            natural scroll depth and visual noise.
          </p>
        </header>

        <main>
          <article class="card stack-md">
            <h3>Quarterly Planning Notes</h3>
            <p>
              This panel simulates longform workspace content where users open drawers while reading updates,
              comparing decisions, and scanning summary cards.
            </p>
            <p>
              Drawers are commonly used as secondary workflows that should not disorient users from the base
              document context.
            </p>
          </article>
          <section class="grid grid-auto-md gap-md">
            <article class="card stack-sm">
              <h4>Roadmap</h4>
              <p>Initiatives grouped by impact and delivery confidence.</p>
            </article>
            <article class="card stack-sm">
              <h4>Dependencies</h4>
              <p>Cross-team blockers and contract milestones.</p>
            </article>
            <article class="card stack-sm">
              <h4>Risks</h4>
              <p>Technical debt and staffing constraints.</p>
            </article>
          </section>
        </main>

        <pds-drawer id="demo-drawer" position="${args.position}">
          <div slot="drawer-header" class="flex items-center gap-md">
            <pds-icon icon="info" size="lg"></pds-icon>
            <h2>Drawer from ${args.position}</h2>
          </div>

          <div slot="drawer-content" class="stack-md">
            <article class="card">
              <h4>About this Drawer</h4>
              <p>This drawer slides from the <strong>${args.position}</strong> edge of the screen. Drawers are perfect for:</p>
              <ul>
                <li>Navigation menus</li>
                <li>Filter panels</li>
                <li>Settings dialogs</li>
                <li>Detail views</li>
              </ul>
            </article>

            <article class="card surface-elevated">
              <h4>Quick Actions</h4>
              <nav class="stack-sm">
                <button class="btn-outline">
                  <pds-icon icon="download"></pds-icon>
                  <span>Download Report</span>
                </button>
                <button class="btn-outline">
                  <pds-icon icon="share"></pds-icon>
                  <span>Share with Team</span>
                </button>
                <button class="btn-outline">
                  <pds-icon icon="printer"></pds-icon>
                  <span>Print Document</span>
                </button>
              </nav>
            </article>

            <button id="close-drawer-btn" class="btn-primary">
              <pds-icon icon="x"></pds-icon>
              <span>Close Drawer</span>
            </button>
          </div>
        </pds-drawer>
      </div>
    `;
  },
  args: {
    position: 'right'
  }
};

export const AllPositions = () => {
  setTimeout(() => {
    ['left', 'right', 'top', 'bottom'].forEach(pos => {
      const btn = document.querySelector(`#open-drawer-${pos}`);
      const drawer = document.querySelector(`#drawer-${pos}`);
      const closeBtn = document.querySelector(`#close-drawer-${pos}`);

      if (btn && drawer) {
        btn.onclick = () => drawer.open = true;
      }
      if (closeBtn && drawer) {
        closeBtn.onclick = () => drawer.open = false;
      }
    });
  }, 0);

  return html`
    <div >
      <header class="card surface-elevated stack-md">
        <h2>Drawer Positions Playground</h2>
        <small>
          Compare each edge behavior while preserving a realistic page underneath. Open different drawers as you
          scroll through the content blocks below.
        </small>
        <div class="grid grid-auto-sm gap-md">
          <button id="open-drawer-bottom" class="btn-primary">
            <pds-icon icon="sidebar" rotate="-90" size="sm"></pds-icon>
            <span>Bottom Drawer</span>
          </button>
          <button id="open-drawer-left" class="btn-secondary">
            <pds-icon icon="sidebar" size="sm"></pds-icon>
            <span>Left Drawer</span>
          </button>
          <button id="open-drawer-right" class="btn-secondary">
            <pds-icon icon="sidebar" rotate="180" size="sm"></pds-icon>
            <span>Right Drawer</span>
          </button>
          <button id="open-drawer-top" class="btn-secondary">
            <pds-icon icon="sidebar" rotate="90" size="sm"></pds-icon>
            <span>Top Drawer</span>
          </button>
        </div>
      </header>

      <main>
        <section class="grid grid-auto-md gap-md">
          <article class="card stack-sm">
            <h4>Campaign Performance</h4>
            <p>Traffic, retention, and conversion trends for this sprint.</p>
          </article>
          <article class="card stack-sm">
            <h4>Operational Alerts</h4>
            <p>Queue health, failed jobs, and incident watchlist.</p>
          </article>
          <article class="card stack-sm">
            <h4>Upcoming Releases</h4>
            <p>Feature flags, rollout windows, and customer impact notes.</p>
          </article>
        </section>

        <article class="card">
          <h3>Scrollable Test Content</h3>
          <p>
            This extra block exists to keep the base page substantial while testing how each drawer position feels
            over longer reading surfaces and stacked data cards.
          </p>
          <p>
            You can open each drawer, close it, and continue interacting with this page context to verify expected
            behavior across left, right, top, and bottom overlays.
          </p>
        </article>
      </main>
    </div>

    <pds-drawer id="drawer-left" position="left">
      <div slot="drawer-header" class="flex items-center gap-md">
        <pds-icon icon="list" size="lg"></pds-icon>
        <h2>Main Navigation</h2>
      </div>
      <div slot="drawer-content" class="stack-md">
        <p>
          <strong>Use case:</strong> Primary navigation menu for web applications
        </p>

        <nav class="stack-sm">
          <button class="btn-outline">
            <pds-icon icon="house"></pds-icon>
            <span>Dashboard</span>
          </button>
          <button class="btn-outline">
            <pds-icon icon="folder"></pds-icon>
            <span>Projects</span>
          </button>
          <button class="btn-outline">
            <pds-icon icon="users"></pds-icon>
            <span>Team</span>
          </button>
          <button class="btn-outline">
            <pds-icon icon="calendar"></pds-icon>
            <span>Schedule</span>
          </button>
          <button class="btn-outline">
            <pds-icon icon="chart-bar"></pds-icon>
            <span>Analytics</span>
          </button>
        </nav>

        <hr>

        <button class="btn-outline">
          <pds-icon icon="gear"></pds-icon>
          <span>Settings</span>
        </button>

        <button id="close-drawer-left" class="btn-secondary">
          <pds-icon icon="x"></pds-icon>
          <span>Close</span>
        </button>
      </div>
    </pds-drawer>

    <pds-drawer id="drawer-right" position="right">
      <div slot="drawer-header" class="flex items-center justify-between">
        <h2>Filter & Sort</h2>

      </div>
      <div slot="drawer-content" class="stack-md">
        <p>
          <strong>Use case:</strong> Filters, detail panels, or property inspectors
        </p>

        <article class="card">
          <fieldset role="group">
            <legend>Filter by Status</legend>
            <label data-toggle>
              <input type="checkbox" checked>
              <span>Active</span>
            </label>
            <label data-toggle>
              <input type="checkbox" checked>
              <span>In Progress</span>
            </label>
            <label data-toggle>
              <input type="checkbox">
              <span>Completed</span>
            </label>
            <label data-toggle>
              <input type="checkbox">
              <span>Archived</span>
            </label>
          </fieldset>
        </article>

        <article class="card surface-elevated">
          <label>
            <span data-label>Sort By</span>
            <select>
              <option>Date Created (Newest)</option>
              <option>Date Created (Oldest)</option>
              <option>Name (A-Z)</option>
              <option>Name (Z-A)</option>
              <option>Priority</option>
            </select>
          </label>
        </article>

        <div class="flex gap-sm">
          <button class="btn-primary">
            <pds-icon icon="check"></pds-icon>
            <span>Apply</span>
          </button>
          <button class="btn-outline">
            <pds-icon icon="arrow-counter-clockwise"></pds-icon>
            <span>Reset</span>
          </button>
        </div>
      </div>
    </pds-drawer>

    <pds-drawer id="drawer-top" position="top">
      <div slot="drawer-header" class="flex items-center gap-md">
        <pds-icon icon="bell-ringing" size="lg"></pds-icon>
        <h2>Notifications</h2>
        <span class="badge badge-primary">3 new</span>
      </div>
      <div slot="drawer-content" class="stack-md">
        <p>
          <strong>Use case:</strong> Notification center or announcement banners
        </p>

        <div class="stack-md">
          <article class="card surface-elevated">
            <div class="flex gap-md items-start">
              <div class="badge badge-success">
                <pds-icon icon="check-circle"></pds-icon>
              </div>
              <div>
                <div class="flex justify-between items-start gap-md">
                  <strong>Deployment Successful</strong>
                  <small>2m ago</small>
                </div>
                <p>
                  Your application has been deployed to production successfully.
                </p>
              </div>
            </div>
          </article>

          <article class="card surface-elevated">
            <div class="flex gap-md items-start">
              <div class="badge badge-info">
                <pds-icon icon="user-plus"></pds-icon>
              </div>
              <div>
                <div class="flex justify-between items-start gap-md">
                  <strong>New Team Member</strong>
                  <small>1h ago</small>
                </div>
                <p>
                  Sarah Johnson joined the Design Team.
                </p>
              </div>
            </div>
          </article>

          <article class="card surface-elevated">
            <div class="flex gap-md items-start">
              <div class="badge badge-warning">
                <pds-icon icon="warning"></pds-icon>
              </div>
              <div>
                <div class="flex justify-between items-start gap-md">
                  <strong>API Rate Limit Warning</strong>
                  <small>3h ago</small>
                </div>
                <p>
                  You're approaching 80% of your API rate limit.
                </p>
              </div>
            </div>
          </article>
        </div>

        <button id="close-drawer-top" class="btn-secondary">
          <pds-icon icon="check"></pds-icon>
          <span>Mark All as Read</span>
        </button>
      </div>
    </pds-drawer>

    <pds-drawer id="drawer-bottom" position="bottom">
      <div slot="drawer-header" class="flex items-center gap-md">
        <pds-icon icon="gear" size="lg"></pds-icon>
        <h2>Quick Actions</h2>
      </div>
      <div slot="drawer-content" class="stack-md">
        <p>
          <strong>Use case:</strong> Command palette, quick actions, or contextual toolbars
        </p>

        <div class="flex gap-md flex-wrap justify-center">
          <button class="btn-primary">
            <pds-icon icon="plus"></pds-icon>
            <span>New Document</span>
          </button>
          <button class="btn-secondary">
            <pds-icon icon="upload"></pds-icon>
            <span>Upload Files</span>
          </button>
          <button class="btn-secondary">
            <pds-icon icon="folder-plus"></pds-icon>
            <span>Create Folder</span>
          </button>
          <button class="btn-outline">
            <pds-icon icon="link"></pds-icon>
            <span>Share Link</span>
          </button>
          <button class="btn-outline">
            <pds-icon icon="download"></pds-icon>
            <span>Export Data</span>
          </button>
          <button class="btn-outline">
            <pds-icon icon="printer"></pds-icon>
            <span>Print</span>
          </button>
        </div>

        <button id="close-drawer-bottom" class="btn-secondary">
          <pds-icon icon="x"></pds-icon>
          <span>Close</span>
        </button>
      </div>
    </pds-drawer>
  `;
};

export const NavigationDrawer = () => {
  setTimeout(() => {
    const btn = document.querySelector('#open-nav-drawer');
    const drawer = document.querySelector('#nav-drawer');
    const closeBtn = document.querySelector('#close-nav-drawer');

    if (btn && drawer) {
      btn.onclick = () => drawer.open = true;
    }
    if (closeBtn && drawer) {
      closeBtn.onclick = () => drawer.open = false;
    }
  }, 0);

  return html`
    <div>
      <header class="card surface-elevated stack-md">
        <div class="flex justify-between items-center gap-md">
          <div class="stack-xs">
            <small class="text-muted">Editorial Demo Surface</small>
            <h2>The Product Journal</h2>
          </div>
          <button id="open-nav-drawer" class="btn-outline icon-only" aria-label="Open site navigation">
            <pds-icon icon="list"></pds-icon>
          </button>
        </div>
        <p>
          This story places the drawer over a realistic, scrollable article page with section previews,
          longform copy, and a site header trigger in the top-right corner.
        </p>
      </header>

      <main>
        <article class="card stack-md">
          <h3>Designing Navigation That Survives Product Growth</h3>
          <p>
            Navigation systems age quickly when product scope expands. Teams often optimize for launch-day
            clarity, then struggle once roles, workflows, and content libraries multiply. A drawer-based
            model can absorb growth if the information architecture remains predictable and grouped by intent.
          </p>
          <p>
            This layout intentionally includes enough text and sections to create natural vertical scrolling,
            so the overlay behavior can be evaluated in a realistic reading context instead of a small demo stub.
          </p>
        </article>

        <section class="grid grid-auto-md gap-md">
          <article class="card stack-sm">
            <h4>Latest Stories</h4>
            <p>Case studies from teams migrating from tab-heavy layouts to progressive drawer navigation.</p>
          </article>
          <article class="card stack-sm">
            <h4>Interviews</h4>
            <p>Conversations with staff designers who maintain IA across mobile apps and web platforms.</p>
          </article>
          <article class="card stack-sm">
            <h4>Guides</h4>
            <p>Practical playbooks for drawer behavior, focus management, and onboarding discoverability.</p>
          </article>
        </section>

        <section class="grid grid-auto-md gap-md">
          <article class="card stack-sm">
            <h4>Graphic Highlight</h4>
            <figure>
              <img src="/assets/img/og.webp" alt="Abstract product journal cover art" class="img-gallery img-rounded-md">
            </figure>
          </article>
          <article class="card stack-sm">
            <h4>Brand Graphic</h4>
            <figure>
              <img src="/assets/img/pds-logo.svg" alt="PDS logo graphic" class="img-gallery img-rounded-md">
            </figure>
          </article>
          <article class="card stack-sm">
            <h4>Random Icon Art</h4>
            <figure>
              <img src="/assets/img/icons/solid-anatomy-brain-1.svg" alt="Decorative icon art" class="img-gallery img-rounded-md">
            </figure>
          </article>
        </section>

        <article class="card stack-md">
          <h3>Feature Story</h3>
          <p>
            In our field observations, teams that pair top-level destination labels with consistent iconography
            cut navigation errors during first-session onboarding. More importantly, they preserve momentum when
            users jump across account, content, and settings contexts within the same session.
          </p>
          <p>
            Overlays are most convincing in demos when they sit above authentic content density: cards, timelines,
            paragraph flow, and actionable controls. That is the purpose of this surface.
          </p>
          <p>
            Scroll further and open the menu repeatedly to verify backdrop legibility and lock behavior while
            preserving a believable reading environment.
          </p>
        </article>

        <article class="card stack-md">
          <h3>Weekly Briefing</h3>
          <p>
            Monday: IA review and route audits. Tuesday: navigation telemetry pass. Wednesday: task-flow shadowing.
            Thursday: content model updates. Friday: design QA and rollout planning.
          </p>
          <p>
            Each segment should remain reachable from a stable navigation shell. Drawers provide that shell while
            keeping the primary reading canvas uninterrupted.
          </p>
        </article>
      </main>

      <footer class="card surface-elevated">
        <p class="text-muted">End of article stream. Continue scrolling or open the menu again to test persistence.</p>
      </footer>

      <pds-drawer id="nav-drawer" position="left">
        <div slot="drawer-header" class="flex items-center gap-md">
          <pds-icon icon="compass" size="lg"></pds-icon>
          <h2>Browse Journal</h2>
        </div>

        <nav slot="drawer-content" class="stack-sm">
          <button class="btn-outline">
            <pds-icon icon="house"></pds-icon>
            <span>Homepage</span>
          </button>
          <button class="btn-outline">
            <pds-icon icon="book-open"></pds-icon>
            <span>Latest Stories</span>
          </button>
          <button class="btn-outline">
            <pds-icon icon="users"></pds-icon>
            <span>Interviews</span>
          </button>
          <button class="btn-outline">
            <pds-icon icon="chart-bar"></pds-icon>
            <span>Research Reports</span>
          </button>
          <button class="btn-outline">
            <pds-icon icon="calendar"></pds-icon>
            <span>Events</span>
          </button>

          <hr>

          <button class="btn-outline">
            <pds-icon icon="bell"></pds-icon>
            <span>Notifications</span>
          </button>
          <button class="btn-outline">
            <pds-icon icon="chat-circle"></pds-icon>
            <span>Support</span>
          </button>

          <hr>

          <button id="close-nav-drawer" class="btn-primary">
            <pds-icon icon="x"></pds-icon>
            <span>Close Menu</span>
          </button>
        </nav>
      </pds-drawer>
    </div>
  `;
};

NavigationDrawer.storyName = 'Navigation Menu';

export const SettingsDrawer = () => {
  setTimeout(() => {
    const btn = document.querySelector('#open-settings-drawer');
    const drawer = document.querySelector('#settings-drawer');
    const closeBtn = document.querySelector('#close-settings-drawer');

    if (btn && drawer) {
      btn.onclick = () => drawer.open = true;
    }
    if (closeBtn && drawer) {
      closeBtn.onclick = () => drawer.open = false;
    }
  }, 0);

  return html`
    <div>
      <header class="card surface-elevated">
        <div class="flex justify-between items-center gap-md">
          <div class="stack-xs">
            <small class="text-muted">Account Workspace</small>
            <h2>Operations Console</h2>
          </div>
          <button id="open-settings-drawer" class="btn-primary">
            <pds-icon icon="gear"></pds-icon>
            <span>Open Settings</span>
          </button>
        </div>
        <p>
          This background models a real account-management page with usage, billing, and activity data so the
          settings drawer appears in context.
        </p>
      </header>

      <main>
        <section class="grid grid-auto-md gap-md">
          <article class="card stack-sm">
            <h4>Plan</h4>
            <p><strong>Growth Annual</strong></p>
            <p class="text-muted">Renews Oct 14, 2026</p>
          </article>
          <article class="card stack-sm">
            <h4>Monthly Active Users</h4>
            <p><strong>18,420</strong></p>
            <p class="text-muted">+12.4% from last month</p>
          </article>
          <article class="card stack-sm">
            <h4>Storage Used</h4>
            <p><strong>412 GB / 1 TB</strong></p>
            <p class="text-muted">48 GB added this week</p>
          </article>
        </section>

        <article class="card stack-md">
          <h3>Recent Account Activity</h3>
          <div class="stack-sm">
            <p><strong>09:41</strong> - API key rotated for Production Environment</p>
            <p><strong>08:12</strong> - Billing contact changed to finance@acme.com</p>
            <p><strong>Yesterday</strong> - SSO policy updated for contractor role</p>
            <p><strong>Yesterday</strong> - Audit export completed and sent to archive</p>
            <p><strong>2 days ago</strong> - Team invitation accepted by 4 users</p>
            <p><strong>3 days ago</strong> - Email digest preferences changed</p>
          </div>
        </article>

        <article class="card stack-md">
          <h3>Security Notes</h3>
          <p>
            High-risk actions require both role validation and signed approval in enterprise workspaces.
            Keep this section long enough to force vertical scrolling in combination with the activity stream.
          </p>
          <p>
            Weekly policy review: password reset rates stable, phishing report responses improving,
            and conditional access blocks reduced by 7% after IP allowlist cleanup.
          </p>
          <p>
            Recommended next step: archive unused webhooks and reduce stale personal tokens older than 90 days.
          </p>
        </article>
      </main>

      <pds-drawer id="settings-drawer" position="right">
        <div slot="drawer-header" class="flex items-center gap-md">
          <pds-icon icon="gear" size="lg"></pds-icon>
          <h2>Account Settings</h2>
        </div>

        <div slot="drawer-content" class="stack-md">
          <article class="card">
            <fieldset>
              <legend>Profile Settings</legend>
              <label>
                <span data-label>Username</span>
                <div class="input-icon">
                  <pds-icon icon="user"></pds-icon>
                  <input type="text" value="john_doe" placeholder="Enter your username">
                </div>
              </label>
              <label>
                <span data-label>Email</span>
                <div class="input-icon">
                  <pds-icon icon="envelope"></pds-icon>
                  <input type="email" value="john@example.com" placeholder="your.email@example.com">
                </div>
              </label>
            </fieldset>
          </article>

          <article class="card">
            <fieldset role="group">
              <legend>Notifications</legend>
              <label data-toggle>
                <input type="checkbox" checked>
                <span>Email notifications</span>
              </label>
              <label data-toggle>
                <input type="checkbox" checked>
                <span>Push notifications</span>
              </label>
              <label data-toggle>
                <input type="checkbox">
                <span>SMS notifications</span>
              </label>
            </fieldset>
          </article>

          <article class="card surface-elevated">
            <fieldset role="group">
              <legend>Privacy</legend>
              <label data-toggle>
                <input type="checkbox" checked>
                <span>Public profile</span>
              </label>
              <label data-toggle>
                <input type="checkbox">
                <span>Show email address</span>
              </label>
            </fieldset>
          </article>

          <article class="card">
            <fieldset role="group">
              <legend>Security</legend>
              <label data-toggle>
                <input type="checkbox" checked>
                <span>Require two-factor authentication</span>
              </label>
              <label data-toggle>
                <input type="checkbox" checked>
                <span>Notify on unusual login attempts</span>
              </label>
            </fieldset>
          </article>

          <div class="flex gap-md">
            <button class="btn-primary">
              <pds-icon icon="check"></pds-icon>
              <span>Save Changes</span>
            </button>
            <button id="close-settings-drawer" class="btn-outline">
              <span>Cancel</span>
            </button>
          </div>
        </div>
      </pds-drawer>
    </div>
  `;
};

SettingsDrawer.storyName = 'Settings Panel';

export const DetailDrawer = () => {
  setTimeout(() => {
    const btn = document.querySelector('#open-detail-drawer');
    const drawer = document.querySelector('#detail-drawer');
    const closeBtn = document.querySelector('#close-detail-drawer');

    if (btn && drawer) {
      btn.onclick = () => drawer.open = true;
    }
    if (closeBtn && drawer) {
      closeBtn.onclick = () => drawer.open = false;
    }
  }, 0);

  return html`
    <div>
      <header class="card surface-elevated">
        <div class="flex justify-between items-center gap-md">
          <div class="stack-xs">
            <small class="text-muted">Portfolio Workspace</small>
            <h2>Project Pipeline</h2>
          </div>
          <button id="open-detail-drawer" class="btn-primary">
            <pds-icon icon="eye"></pds-icon>
            <span>Inspect Selected Project</span>
          </button>
        </div>
        <p>
          The detail drawer now overlays a full project-listing surface with enough density and scroll depth
          to mimic daily production use.
        </p>
      </header>

      <main>
        <section class="grid grid-auto-md gap-md">
          <article class="card stack-sm">
            <h4>In Discovery</h4>
            <p><strong>6 projects</strong></p>
            <p class="text-muted">2 blocked by dependency handoff</p>
          </article>
          <article class="card stack-sm">
            <h4>In Delivery</h4>
            <p><strong>14 projects</strong></p>
            <p class="text-muted">5 shipping this sprint</p>
          </article>
          <article class="card stack-sm">
            <h4>At Risk</h4>
            <p><strong>3 projects</strong></p>
            <p class="text-muted">Watch vendor API migration</p>
          </article>
        </section>

        <article class="card stack-md">
          <h3>Active Workstream</h3>
          <div class="stack-sm">
            <p><strong>Modern Web Dashboard</strong> - Final QA checklist in progress</p>
            <p><strong>Identity Refresh</strong> - Awaiting legal copy sign-off</p>
            <p><strong>Analytics Replatform</strong> - Data contracts under review</p>
            <p><strong>Editor Revamp</strong> - Accessibility pass scheduled Friday</p>
            <p><strong>Billing Insights</strong> - Usage anomaly detection tuning</p>
            <p><strong>Mobile Navigation</strong> - Drawer behavior parity test pending</p>
          </div>
        </article>

        <article class="card stack-md">
          <h3>Team Commentary</h3>
          <p>
            Contributors are favoring side-panel details because they keep planning context visible while
            exposing metadata, owners, and next actions. This pattern reduces context switching during standups.
          </p>
          <p>
            Add enough narrative text and activity rows to emulate a true backlog screen where the drawer is
            repeatedly opened, closed, and reopened while the user continues scrolling.
          </p>
        </article>
      </main>

      <pds-drawer id="detail-drawer" position="right">
        <div slot="drawer-header" class="flex items-center justify-between">
          <h2>Project Details</h2>
          <button id="close-detail-drawer" class="icon-only btn-outline">
            <pds-icon icon="x" label="Close"></pds-icon>
          </button>
        </div>

        <div slot="drawer-content" class="stack-md">
          <div class="card border-gradient flex items-center justify-center">
            <pds-icon icon="image" size="xl"></pds-icon>
          </div>

          <h3>Modern Web Dashboard</h3>
          <p>A comprehensive dashboard application built with modern web technologies and PDS.</p>

          <article class="card">
            <h4>Project Info</h4>
            <dl class="grid grid-cols-2 gap-sm">
              <dt>Status:</dt>
              <dd>In Progress</dd>
              <dt>Team:</dt>
              <dd>8 members</dd>
              <dt>Due Date:</dt>
              <dd>Dec 31, 2024</dd>
              <dt>Priority:</dt>
              <dd><span class="badge badge-primary">High</span></dd>
            </dl>
          </article>

          <article class="card surface-elevated">
            <h4>Recent Activity</h4>
            <div class="stack-md">
              <div class="flex gap-sm">
                <pds-icon icon="check" class="icon-primary"></pds-icon>
                <div>
                  <strong>Task completed</strong>
                  <div><small>2 hours ago</small></div>
                </div>
              </div>
              <div class="flex gap-sm">
                <pds-icon icon="chat-circle" class="icon-secondary"></pds-icon>
                <div>
                  <strong>New comment</strong>
                  <div><small>5 hours ago</small></div>
                </div>
              </div>
              <div class="flex gap-sm">
                <pds-icon icon="upload" class="icon-accent"></pds-icon>
                <div>
                  <strong>File uploaded</strong>
                  <div><small>1 day ago</small></div>
                </div>
              </div>
            </div>
          </article>

          <div class="flex gap-sm">
            <button class="btn-primary">
              <pds-icon icon="pencil"></pds-icon>
              <span>Edit Project</span>
            </button>
            <button class="btn-outline">
              <pds-icon icon="share"></pds-icon>
              <span>Share</span>
            </button>
          </div>
        </div>
      </pds-drawer>
    </div>
  `;
};

export const TallContentDrawer = () => {
  setTimeout(() => {
    const btn = document.querySelector('#open-nav-drawer');
    const drawer = document.querySelector('#nav-drawer');
    const closeBtn = document.querySelector('#close-nav-drawer');

    if (btn && drawer) {
      btn.onclick = () => drawer.open = true;
    }
    if (closeBtn && drawer) {
      closeBtn.onclick = () => drawer.open = false;
    }
  }, 0);

  return html`
    <div>
      <button id="open-nav-drawer" class="btn-outline icon-only" aria-label="Open site navigation">
        <pds-icon icon="list"></pds-icon>
      </button>

      <pds-drawer id="nav-drawer" position="bottom">
        <div slot="drawer-header" class="flex items-center gap-md">
          <pds-icon icon="compass" size="lg"></pds-icon>
          <h2>Browse Journal</h2>
        </div>

        <nav slot="drawer-content" class="stack-sm">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce imperdiet pellentesque pretium. Etiam varius quam rutrum, luctus urna vel, dictum erat. Vivamus ut dui placerat, cursus metus eu, accumsan felis. Pellentesque non tortor non urna convallis sodales ut ac nisi. Vivamus sagittis lorem sed ex placerat venenatis vel a ligula. Aenean tempus et odio vitae posuere. Sed sed accumsan orci. Sed vitae tellus ultricies, tempor magna sit amet, ultricies ante. Etiam sollicitudin mattis rhoncus. Aenean gravida, quam eu maximus eleifend, justo tortor facilisis odio, sit amet dapibus arcu lorem nec augue. Mauris egestas vehicula pharetra.</p>
          <p>Sed fringilla fermentum metus non tempor. Praesent eget finibus augue. Sed tincidunt suscipit eros vitae hendrerit. Nulla semper felis a sollicitudin ultricies. Maecenas dictum nunc diam, ac gravida dui luctus eu. Sed posuere erat a felis blandit posuere. Mauris tempus pharetra eros non molestie. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean pretium risus a sem interdum facilisis. Nullam venenatis turpis quam, in commodo enim maximus nec. Phasellus pharetra turpis neque, quis viverra ante tristique nec. Aenean tempor lorem quis lectus vulputate, quis molestie lectus convallis. Morbi ultricies iaculis euismod. Donec metus arcu, dapibus ut varius interdum, gravida eu enim.</p>
          <p>Quisque viverra ipsum id diam vulputate facilisis. Fusce eu libero sed lacus lobortis tristique. Fusce ornare dictum tempor. Nunc tortor risus, gravida at tortor ac, scelerisque pharetra justo. Aliquam erat volutpat. Donec eget quam id tortor hendrerit accumsan nec ullamcorper mi. Integer eleifend, nulla nec bibendum rhoncus, augue leo scelerisque eros, consequat consectetur lorem erat vel leo. Aenean tempor ut odio sit amet pulvinar. Mauris nulla lacus, tristique condimentum tellus ac, molestie fringilla erat.</p>
          <p>Sed facilisis nisi ac mattis dapibus. Donec interdum magna a aliquet bibendum. Morbi eu lectus nunc. Suspendisse vestibulum pulvinar consequat. Nulla varius varius lorem ut ullamcorper. Donec hendrerit ac orci commodo maximus. Suspendisse finibus lectus justo, eu imperdiet ligula lobortis eu. Fusce fermentum ipsum id sapien fermentum posuere. Morbi tellus nisl, eleifend porta purus iaculis, efficitur bibendum felis. Donec condimentum diam hendrerit, finibus ipsum interdum, luctus diam. Nunc eu vehicula erat, id dignissim magna. Donec condimentum tellus felis, ut accumsan magna pellentesque et. Sed a massa porta felis condimentum lacinia in et odio.</p>
          <p>Phasellus in tempor tellus. Suspendisse nec gravida nibh. Sed volutpat tempus est, vitae mollis arcu sodales dapibus. Phasellus mollis elementum libero non porttitor. Nulla bibendum nulla ac vulputate aliquet. Ut maximus nisi arcu, vitae tincidunt odio convallis a. Sed ornare, lacus vel pellentesque ultrices, dui lectus congue lectus, id porta nisl eros in odio. Ut ligula neque, eleifend id iaculis non, commodo sed sem. Nullam magna dui, semper et vehicula ut, laoreet sed orci. Maecenas convallis eget est non finibus. Praesent convallis urna vel vestibulum rhoncus. Pellentesque eleifend imperdiet egestas. In pretium volutpat iaculis.</p>
          <p>Nunc cursus orci nec justo lacinia, id ultrices mi consequat. Proin aliquet orci in malesuada mattis. Vestibulum tincidunt accumsan leo, eu volutpat sem facilisis sed. Mauris placerat massa felis, non commodo metus dignissim tincidunt. Nulla eleifend porttitor vulputate. Suspendisse non turpis elementum, tincidunt leo et, vulputate velit. Proin urna nisi, iaculis ac gravida eget, auctor eget magna. Nullam tempus augue at ante scelerisque, sed sagittis leo interdum. Phasellus facilisis a eros vitae condimentum. Phasellus nec porta justo. Sed felis ante, auctor eu tempus at, suscipit quis ante.</p>
          <p>Sed quam augue, elementum eget blandit et, vulputate id libero. Proin suscipit tellus ut eros lacinia, ac ultrices nulla auctor. Integer dignissim ante eu tellus ultricies, vel placerat nibh imperdiet. Donec eu orci dignissim, ornare odio ut, volutpat neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ex felis, tempus eu consectetur quis, ultrices vitae tellus. In vulputate diam ac augue aliquet sollicitudin.</p>
          <p>Mauris erat eros, gravida et iaculis at, iaculis ac turpis. Nam pellentesque ex sed turpis venenatis gravida. Duis hendrerit vehicula aliquet. Nullam sem leo, condimentum a ullamcorper ac, pretium at nisl. Vivamus suscipit odio in nibh laoreet, vel fermentum turpis porttitor. Vivamus vitae bibendum ex. Aliquam efficitur vestibulum imperdiet. Duis vulputate, enim id convallis imperdiet, felis nisl iaculis ex, quis posuere ligula metus at magna. Praesent eget nisi in massa hendrerit bibendum. Donec sed porta ligula. Morbi pretium leo id est cursus, eu porttitor arcu egestas. Fusce at nibh ac purus imperdiet dapibus.</p>
          <p>Quisque vitae quam sed nibh commodo dapibus a sit amet arcu. Nunc sed tortor efficitur sapien semper ornare. Pellentesque vel neque eget odio pulvinar pharetra. Pellentesque rutrum erat quis risus commodo fringilla. Vestibulum semper diam vel tortor aliquam lacinia. Proin ut quam efficitur, maximus purus vitae, semper sem. Duis id iaculis felis, sit amet ultricies lectus. Maecenas ut dignissim odio, sit amet dignissim elit. Nulla facilisi. Praesent ut tincidunt odio. Interdum et malesuada fames ac ante ipsum primis in faucibus. In ac aliquet arcu. Ut consectetur tortor id consequat consequat. Pellentesque sit amet imperdiet neque. Maecenas luctus ac ante eu porta.</p>
          <p>Aliquam sed blandit lorem. Proin quis blandit risus, pellentesque dapibus mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fringilla luctus euismod. Pellentesque ullamcorper, libero id placerat feugiat, arcu nisl fermentum justo, ultrices laoreet dolor neque quis odio. Praesent tincidunt mattis mattis. In egestas vestibulum est, sed congue lacus dictum sit amet. Nulla finibus aliquam velit sed pharetra. Suspendisse eget congue ligula, vitae ultricies purus. Integer pellentesque sollicitudin orci ut venenatis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;</p>
          <p>Suspendisse luctus urna massa. Suspendisse potenti. Duis blandit vel velit eget consequat. Nam eu libero orci. Mauris non viverra elit. Nam vel sem interdum, scelerisque augue a, ultrices nunc. Aenean suscipit varius turpis vel efficitur. Morbi sit amet ultricies ipsum, non gravida neque. Donec enim neque, finibus id rhoncus eu, ultricies in elit. In in ipsum nec velit tincidunt commodo. Ut non dignissim velit. Ut ut turpis est. Phasellus tempor maximus sem, ac ultrices ipsum gravida ut. Cras euismod ut nisi eu mollis. Quisque condimentum auctor vehicula.</p>
          <p>Donec venenatis non nunc et efficitur. In hac habitasse platea dictumst. Aliquam sapien libero, euismod sit amet tincidunt vel, ornare vitae urna. Morbi et pretium erat, sit amet imperdiet velit. Duis varius egestas fermentum. Duis tortor enim, rhoncus id porta sed, fermentum vitae tortor. Aenean pretium metus nunc, a venenatis dolor tristique ut. Etiam vel felis augue. Nullam vitae sem risus. Proin mattis erat enim, nec tempus justo luctus vitae. Ut hendrerit sapien non nisi faucibus, vitae suscipit odio elementum. Nulla rutrum velit a dolor egestas blandit ut vitae sem. Aenean sit amet risus nisl.</p>
          <p>Fusce condimentum viverra hendrerit. Maecenas nec risus sit amet mi lobortis euismod non sit amet elit. Cras rhoncus felis justo, quis pretium turpis aliquam sed. Nullam ultricies et urna sed iaculis. Curabitur gravida euismod lacus, id imperdiet risus lacinia nec. Donec imperdiet erat quis neque fringilla lobortis vestibulum eget dui. Nunc leo turpis, vestibulum eu ante et, ullamcorper placerat arcu. Sed dignissim mi eget arcu feugiat, at pretium felis pretium. Cras aliquet in augue ut mollis. Maecenas ornare pellentesque fermentum.</p>
          <p>Donec tortor nunc, pulvinar et sodales ac, sollicitudin quis tortor. Vestibulum blandit ipsum non placerat sagittis. Etiam sit amet massa eu dui imperdiet interdum. Quisque sed nisl id enim bibendum consequat. Nam gravida nulla orci, a ornare nibh egestas in. Aliquam pretium aliquet dictum. Ut pellentesque tristique varius. Nunc vel nisi nibh. Aenean nec purus dignissim, congue nunc ut, aliquet augue.</p>
          <p>Ut tempus odio sit amet urna egestas porttitor. Aenean ullamcorper mollis egestas. In nec vulputate felis. Integer eu elit id velit porta hendrerit. Sed pulvinar porttitor lacinia. Donec id rhoncus neque, iaculis facilisis augue. Suspendisse fringilla, orci eget dictum dignissim, odio neque varius dolor, vitae tincidunt lorem mauris quis enim.</p>
          <p>Duis id mi in eros blandit porta nec eget lacus. Praesent pellentesque, ante a dignissim sollicitudin, mi velit luctus purus, quis lobortis sem magna nec massa. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque consectetur felis interdum, lacinia felis in, malesuada arcu. In sodales tortor faucibus enim dictum dapibus. Integer placerat facilisis turpis at efficitur. Maecenas efficitur lectus ligula, at pretium tellus volutpat in. Vestibulum vitae elementum mauris, suscipit elementum nisi. Suspendisse placerat arcu tempus tempus rutrum. Donec quis egestas velit. Praesent ac nisl tristique, blandit tortor sed, eleifend tellus. Donec ullamcorper, augue sit amet pretium posuere, velit turpis rhoncus eros, in sagittis lectus odio nec lectus.</p>
          <p>Sed quis ex eget erat iaculis feugiat. Sed augue ante, molestie eu vulputate sed, mollis quis ipsum. Ut sollicitudin diam in eros convallis pharetra sit amet nec lectus. Maecenas ac felis non ante lobortis blandit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque tristique semper tortor, vitae tristique elit pellentesque eget. Cras feugiat viverra nunc ac dictum. Phasellus odio risus, fringilla sit amet bibendum ut, pulvinar ac turpis. Duis posuere accumsan felis, eget rhoncus nulla molestie vel. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum mollis enim velit, at rhoncus nibh bibendum at.</p>
          <p>Sed vestibulum mattis sapien ut sagittis. Maecenas mattis purus vitae laoreet efficitur. Nunc leo velit, pulvinar ut velit vel, fringilla vulputate leo. Fusce efficitur sit amet leo sed mattis. Aenean dictum orci a risus tempor mollis. Nunc pharetra risus vel dignissim fermentum. Cras cursus porttitor orci, nec tincidunt eros accumsan id. Quisque viverra quam sit amet est maximus elementum. Sed tempus, felis dapibus efficitur rutrum, quam metus pellentesque nulla, nec eleifend lectus elit a elit. Fusce et tincidunt mi. Praesent ultricies massa at bibendum imperdiet.</p>
          <p>Nulla venenatis ligula sed sollicitudin rutrum. Proin euismod a sem sit amet fringilla. Nunc ornare sagittis lorem non sagittis. Suspendisse magna ex, mattis a dui id, tincidunt sagittis quam. Phasellus cursus varius tellus consectetur efficitur. Praesent sed semper magna. Nullam magna mauris, scelerisque sit amet ipsum in, sollicitudin tincidunt nisi. Maecenas rhoncus ex sapien, vel luctus nunc hendrerit ut. Nunc consectetur eu eros vitae ultrices. Nullam sit amet erat vel elit accumsan pellentesque id at orci.</p>
          <p>Curabitur vitae egestas purus. Aenean cursus, massa nec dictum lobortis, lectus metus volutpat sem, in tempus sem diam eget massa. Sed sollicitudin nibh odio, finibus vehicula nibh sodales at. Nunc lacinia quam ut turpis mattis convallis. Fusce sodales lacus id ante condimentum laoreet. In scelerisque ornare eros, ut cursus enim cursus non. Curabitur suscipit congue nunc eu ultricies. Mauris ex erat, efficitur et dolor vitae, sodales placerat ante. Nulla dui lacus, bibendum nec est sit amet, tincidunt commodo lacus. Vestibulum vitae ligula ante. Pellentesque a est sit amet libero gravida euismod. Etiam sed magna nec dolor facilisis pharetra. Nullam ac tellus volutpat, porttitor urna a, consectetur mi.</p>
        </nav>
      </pds-drawer>
    </div>
  `;
};

DetailDrawer.storyName = 'Detail Panel';

