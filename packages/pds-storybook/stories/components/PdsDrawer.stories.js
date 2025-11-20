import { html } from 'lit';

export default {
  title: 'Components/Pds Drawer',
  parameters: {
    docs: {
      description: {
        component: 'Slide-out panels from any edge'
      }
    }
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
      <button id="open-drawer-btn" class="btn-primary">
        <pds-icon icon="list"></pds-icon>
        <span>Open Drawer (${args.position})</span>
      </button>
      
      <pds-drawer id="demo-drawer" position="${args.position}">
        <div slot="drawer-header" class="flex items-center gap-md">
          <pds-icon icon="info" size="lg"></pds-icon>
          <h2>Drawer from ${args.position}</h2>
        </div>
        
        <div slot="drawer-content" class="flex flex-col gap-md">
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
            <nav class="flex flex-col gap-sm">
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
    
    <pds-drawer id="drawer-left" position="left">
      <div slot="drawer-header" class="flex items-center gap-md">
        <pds-icon icon="list" size="lg"></pds-icon>
        <h2>Main Navigation</h2>
      </div>
      <div slot="drawer-content" class="flex flex-col gap-md">
        <p>
          <strong>Use case:</strong> Primary navigation menu for web applications
        </p>
        
        <nav class="flex flex-col gap-sm">
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
        <button id="close-drawer-right" class="icon-only btn-outline btn-sm">
          <pds-icon icon="x" label="Close"></pds-icon>
        </button>
      </div>
      <div slot="drawer-content" class="flex flex-col gap-md">
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
            <span>Sort By</span>
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
      <div slot="drawer-content" class="flex flex-col gap-md">
        <p>
          <strong>Use case:</strong> Notification center or announcement banners
        </p>
        
        <div class="flex flex-col gap-md">
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
        <pds-icon icon="toolbox" size="lg"></pds-icon>
        <h2>Quick Actions</h2>
      </div>
      <div slot="drawer-content" class="flex flex-col gap-md">
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
    <button id="open-nav-drawer" class="btn-primary">
      <pds-icon icon="list"></pds-icon>
      <span>Open Navigation</span>
    </button>
    
    <pds-drawer id="nav-drawer" position="left">
      <div slot="drawer-header" class="flex items-center gap-md">
        <pds-icon icon="compass" size="lg"></pds-icon>
        <h2>Navigation</h2>
      </div>
      
      <nav slot="drawer-content" class="flex flex-col gap-sm">
        <button class="btn-outline">
          <pds-icon icon="home"></pds-icon>
          <span>Home</span>
        </button>
        <button class="btn-outline">
          <pds-icon icon="user"></pds-icon>
          <span>Profile</span>
        </button>
        <button class="btn-outline">
          <pds-icon icon="bell"></pds-icon>
          <span>Notifications</span>
        </button>
        <button class="btn-outline">
          <pds-icon icon="gear"></pds-icon>
          <span>Settings</span>
        </button>
        
        <hr>
        
        <button class="btn-outline">
          <pds-icon icon="book-open"></pds-icon>
          <span>Documentation</span>
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
    <button id="open-settings-drawer" class="btn-primary">
      <pds-icon icon="gear"></pds-icon>
      <span>Open Settings</span>
    </button>
    
    <pds-drawer id="settings-drawer" position="right">
      <div slot="drawer-header" class="flex items-center gap-md">
        <pds-icon icon="gear" size="lg"></pds-icon>
        <h2>Settings</h2>
      </div>
      
      <div slot="drawer-content" class="flex flex-col gap-md">
        <article class="card">
          <fieldset>
            <legend>Profile Settings</legend>
            <label>
              <span>Username</span>
              <div class="input-icon">
                <pds-icon icon="user"></pds-icon>
                <input type="text" value="john_doe" placeholder="Enter your username">
              </div>
            </label>
            <label>
              <span>Email</span>
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
    <button id="open-detail-drawer" class="btn-primary">
      <pds-icon icon="eye"></pds-icon>
      <span>View Details</span>
    </button>
    
    <pds-drawer id="detail-drawer" position="right">
      <div slot="drawer-header" class="flex items-center justify-between">
        <h2>Project Details</h2>
        <button id="close-detail-drawer" class="icon-only btn-outline">
          <pds-icon icon="x" label="Close"></pds-icon>
        </button>
      </div>
      
      <div slot="drawer-content" class="flex flex-col gap-md">
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
          <div class="flex flex-col gap-md">
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
  `;
};

DetailDrawer.storyName = 'Detail Panel';

