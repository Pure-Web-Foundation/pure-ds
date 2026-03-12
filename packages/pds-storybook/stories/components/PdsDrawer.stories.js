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

DetailDrawer.storyName = 'Detail Panel';

