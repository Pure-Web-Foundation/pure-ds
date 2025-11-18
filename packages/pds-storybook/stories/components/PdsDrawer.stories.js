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
        Open Drawer (${args.position})
      </button>
      
      <pds-drawer id="demo-drawer" position="${args.position}">
        <div slot="drawer-header" style="display: flex; align-items: center; gap: var(--spacing-3);">
          <pds-icon icon="info" size="lg"></pds-icon>
          <h2 style="margin: 0;">Drawer from ${args.position}</h2>
        </div>
        
        <div slot="drawer-content" style="padding: var(--spacing-4);">
          <article class="card" style="margin-bottom: var(--spacing-4);">
            <h4>About this Drawer</h4>
            <p>This drawer slides from the <strong>${args.position}</strong> edge of the screen. Drawers are perfect for:</p>
            <ul>
              <li>Navigation menus</li>
              <li>Filter panels</li>
              <li>Settings dialogs</li>
              <li>Detail views</li>
            </ul>
          </article>

          <article class="card surface-elevated" style="margin-bottom: var(--spacing-4);">
            <h4>Quick Actions</h4>
            <div style="display: flex; flex-direction: column; gap: var(--spacing-2); margin-top: var(--spacing-3);">
              <button class="btn-outline" style="justify-content: flex-start;">
                <pds-icon icon="download"></pds-icon>
                Download Report
              </button>
              <button class="btn-outline" style="justify-content: flex-start;">
                <pds-icon icon="share"></pds-icon>
                Share with Team
              </button>
              <button class="btn-outline" style="justify-content: flex-start;">
                <pds-icon icon="printer"></pds-icon>
                Print Document
              </button>
            </div>
          </article>

          <button id="close-drawer-btn" class="btn-primary" style="width: 100%;">
            <pds-icon icon="x"></pds-icon>
            Close Drawer
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
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
      <button id="open-drawer-left" class="btn-primary">Open Left</button>
      <button id="open-drawer-right" class="btn-primary">Open Right</button>
      <button id="open-drawer-top" class="btn-primary">Open Top</button>
      <button id="open-drawer-bottom" class="btn-primary">Open Bottom</button>
    </div>
    
    <pds-drawer id="drawer-left" position="left">
      <div slot="drawer-header" style="display: flex; align-items: center; gap: var(--spacing-2);">
        <pds-icon icon="arrow-left"></pds-icon>
        <h2 style="margin: 0;">Left Navigation</h2>
      </div>
      <div slot="drawer-content" style="padding: var(--spacing-4);">
        <p style="margin-bottom: var(--spacing-4);">Common for main navigation menus</p>
        <div style="display: flex; flex-direction: column; gap: var(--spacing-2);">
          <button class="btn-outline" style="justify-content: flex-start;">
            <pds-icon icon="home"></pds-icon>
            Dashboard
          </button>
          <button class="btn-outline" style="justify-content: flex-start;">
            <pds-icon icon="file-text"></pds-icon>
            Documents
          </button>
          <button class="btn-outline" style="justify-content: flex-start;">
            <pds-icon icon="users"></pds-icon>
            Team
          </button>
        </div>
        <button id="close-drawer-left" class="btn-secondary" style="margin-top: var(--spacing-4); width: 100%;">Close</button>
      </div>
    </pds-drawer>
    
    <pds-drawer id="drawer-right" position="right">
      <div slot="drawer-header" style="display: flex; align-items: center; justify-content: space-between;">
        <h2 style="margin: 0;">Details Panel</h2>
        <pds-icon icon="arrow-right"></pds-icon>
      </div>
      <div slot="drawer-content" style="padding: var(--spacing-4);">
        <p style="margin-bottom: var(--spacing-4);">Perfect for details, filters, or settings</p>
        <article class="card">
          <h4>Item Details</h4>
          <div style="margin-top: var(--spacing-3); font-size: 0.9rem;">
            <div style="display: grid; grid-template-columns: 80px 1fr; gap: var(--spacing-2);">
              <strong>Status:</strong> <span>Active</span>
              <strong>Created:</strong> <span>Nov 17, 2025</span>
              <strong>Modified:</strong> <span>2 hours ago</span>
            </div>
          </div>
        </article>
        <button id="close-drawer-right" class="btn-secondary" style="margin-top: var(--spacing-4); width: 100%;">Close</button>
      </div>
    </pds-drawer>
    
    <pds-drawer id="drawer-top" position="top">
      <div slot="drawer-header" style="display: flex; align-items: center; gap: var(--spacing-2);">
        <pds-icon icon="arrow-up"></pds-icon>
        <h2 style="margin: 0;">Notification Center</h2>
      </div>
      <div slot="drawer-content" style="padding: var(--spacing-4);">
        <p style="margin-bottom: var(--spacing-4);">Great for notifications and alerts</p>
        <div style="display: flex; flex-direction: column; gap: var(--spacing-2);">
          ${Array.from({ length: 3 }, (_, i) => html`
            <article class="card surface-elevated">
              <div style="display: flex; gap: var(--spacing-2); align-items: start;">
                <pds-icon icon="bell" style="color: var(--color-primary); flex-shrink: 0;"></pds-icon>
                <div style="flex: 1;">
                  <strong>Notification ${i + 1}</strong>
                  <p style="margin: var(--spacing-1) 0 0; font-size: 0.85rem; opacity: 0.8;">New activity in your account</p>
                </div>
              </div>
            </article>
          `)}
        </div>
        <button id="close-drawer-top" class="btn-secondary" style="margin-top: var(--spacing-4);">Close</button>
      </div>
    </pds-drawer>
    
    <pds-drawer id="drawer-bottom" position="bottom">
      <div slot="drawer-header" style="display: flex; align-items: center; gap: var(--spacing-2);">
        <pds-icon icon="arrow-down"></pds-icon>
        <h2 style="margin: 0;">Quick Actions</h2>
      </div>
      <div slot="drawer-content" style="padding: var(--spacing-4);">
        <p style="margin-bottom: var(--spacing-4);">Ideal for contextual actions or toolbars</p>
        <div style="display: flex; gap: var(--spacing-2); flex-wrap: wrap;">
          <button class="btn-primary">
            <pds-icon icon="plus"></pds-icon>
            New Item
          </button>
          <button class="btn-secondary">
            <pds-icon icon="upload"></pds-icon>
            Upload
          </button>
          <button class="btn-outline">
            <pds-icon icon="download"></pds-icon>
            Download
          </button>
          <button class="btn-outline">
            <pds-icon icon="share"></pds-icon>
            Share
          </button>
        </div>
        <button id="close-drawer-bottom" class="btn-secondary" style="margin-top: var(--spacing-4);">Close</button>
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
      Open Navigation
    </button>
    
    <pds-drawer id="nav-drawer" position="left">
      <div slot="drawer-header" style="display: flex; align-items: center; gap: var(--spacing-3);">
        <pds-icon icon="compass" size="lg"></pds-icon>
        <h2 style="margin: 0;">Navigation</h2>
      </div>
      
      <div slot="drawer-content" style="padding: var(--spacing-4); display: flex; flex-direction: column; gap: var(--spacing-2);">
        <button class="btn-outline" style="justify-content: flex-start;">
          <pds-icon icon="home"></pds-icon>
          Home
        </button>
        <button class="btn-outline" style="justify-content: flex-start;">
          <pds-icon icon="user"></pds-icon>
          Profile
        </button>
        <button class="btn-outline" style="justify-content: flex-start;">
          <pds-icon icon="bell"></pds-icon>
          Notifications
        </button>
        <button class="btn-outline" style="justify-content: flex-start;">
          <pds-icon icon="gear"></pds-icon>
          Settings
        </button>
        
        <hr style="margin: var(--spacing-4) 0; border: none; border-top: 1px solid var(--color-border);">
        
        <button class="btn-outline" style="justify-content: flex-start;">
          <pds-icon icon="book-open"></pds-icon>
          Documentation
        </button>
        <button class="btn-outline" style="justify-content: flex-start;">
          <pds-icon icon="message-circle"></pds-icon>
          Support
        </button>
        
        <hr style="margin: var(--spacing-4) 0; border: none; border-top: 1px solid var(--color-border);">
        
        <button id="close-nav-drawer" class="btn-primary">
          <pds-icon icon="x"></pds-icon>
          Close Menu
        </button>
      </div>
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
      Open Settings
    </button>
    
    <pds-drawer id="settings-drawer" position="right">
      <div slot="drawer-header" style="display: flex; align-items: center; gap: var(--spacing-3);">
        <pds-icon icon="gear" size="lg"></pds-icon>
        <h2 style="margin: 0;">Settings</h2>
      </div>
      
      <div slot="drawer-content" style="padding: var(--spacing-4);">
        <article class="card" style="margin-bottom: var(--spacing-4);">
          <h4>Profile Settings</h4>
          <div style="margin-top: var(--spacing-3);">
            <label for="username-input" style="display: block; margin-bottom: var(--spacing-2); font-weight: 600;">
              Username
            </label>
            <input id="username-input" type="text" value="john_doe" style="width: 100%; padding: var(--spacing-2); border: 1px solid var(--color-border); border-radius: var(--radius-sm);">
          </div>
          
          <div style="margin-top: var(--spacing-3);">
            <label for="email-input" style="display: block; margin-bottom: var(--spacing-2); font-weight: 600;">
              Email
            </label>
            <input id="email-input" type="email" value="john@example.com" style="width: 100%; padding: var(--spacing-2); border: 1px solid var(--color-border); border-radius: var(--radius-sm);">
          </div>
        </article>

        <article class="card" style="margin-bottom: var(--spacing-4);">
          <h4>Notifications</h4>
          <div style="display: flex; flex-direction: column; gap: var(--spacing-3); margin-top: var(--spacing-3);">
            <label style="display: flex; align-items: center; gap: var(--spacing-2); cursor: pointer;">
              <input type="checkbox" checked>
              <span>Email notifications</span>
            </label>
            <label style="display: flex; align-items: center; gap: var(--spacing-2); cursor: pointer;">
              <input type="checkbox" checked>
              <span>Push notifications</span>
            </label>
            <label style="display: flex; align-items: center; gap: var(--spacing-2); cursor: pointer;">
              <input type="checkbox">
              <span>SMS notifications</span>
            </label>
          </div>
        </article>

        <article class="card surface-elevated">
          <h4>Privacy</h4>
          <div style="display: flex; flex-direction: column; gap: var(--spacing-3); margin-top: var(--spacing-3);">
            <label style="display: flex; align-items: center; gap: var(--spacing-2); cursor: pointer;">
              <input type="checkbox" checked>
              <span>Public profile</span>
            </label>
            <label style="display: flex; align-items: center; gap: var(--spacing-2); cursor: pointer;">
              <input type="checkbox">
              <span>Show email address</span>
            </label>
          </div>
        </article>

        <div style="display: flex; gap: var(--spacing-3); margin-top: var(--spacing-4);">
          <button class="btn-primary">
            <pds-icon icon="check"></pds-icon>
            Save Changes
          </button>
          <button id="close-settings-drawer" class="btn-outline">Cancel</button>
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
      View Details
    </button>
    
    <pds-drawer id="detail-drawer" position="right">
      <div slot="drawer-header" style="display: flex; align-items: center; justify-content: space-between;">
        <h2 style="margin: 0;">Project Details</h2>
        <button id="close-detail-drawer" class="icon-only btn-outline">
          <pds-icon icon="x" label="Close"></pds-icon>
        </button>
      </div>
      
      <div slot="drawer-content" style="padding: var(--spacing-4);">
        <div style="height: 200px; background: linear-gradient(135deg, var(--color-primary), var(--color-secondary)); border-radius: var(--radius-md); margin-bottom: var(--spacing-4); display: flex; align-items: center; justify-content: center;">
          <pds-icon icon="image" size="xl" style="color: white; opacity: 0.4;"></pds-icon>
        </div>

        <h3>Modern Web Dashboard</h3>
        <p style="opacity: 0.8; margin-bottom: var(--spacing-4);">A comprehensive dashboard application built with modern web technologies and PDS.</p>

        <article class="card" style="margin-bottom: var(--spacing-4);">
          <h4>Project Info</h4>
          <div style="display: grid; grid-template-columns: 100px 1fr; gap: var(--spacing-2); margin-top: var(--spacing-3); font-size: 0.9rem;">
            <strong>Status:</strong>
            <span>In Progress</span>
            <strong>Team:</strong>
            <span>8 members</span>
            <strong>Due Date:</strong>
            <span>Dec 31, 2024</span>
            <strong>Priority:</strong>
            <span style="color: var(--color-primary); font-weight: 600;">High</span>
          </div>
        </article>

        <article class="card surface-elevated">
          <h4>Recent Activity</h4>
          <div style="margin-top: var(--spacing-3); display: flex; flex-direction: column; gap: var(--spacing-3);">
            <div style="display: flex; gap: var(--spacing-2); font-size: 0.85rem;">
              <pds-icon icon="check" style="color: var(--color-primary); flex-shrink: 0;"></pds-icon>
              <div>
                <strong>Task completed</strong>
                <div style="opacity: 0.7;">2 hours ago</div>
              </div>
            </div>
            <div style="display: flex; gap: var(--spacing-2); font-size: 0.85rem;">
              <pds-icon icon="message-circle" style="color: var(--color-secondary); flex-shrink: 0;"></pds-icon>
              <div>
                <strong>New comment</strong>
                <div style="opacity: 0.7;">5 hours ago</div>
              </div>
            </div>
            <div style="display: flex; gap: var(--spacing-2); font-size: 0.85rem;">
              <pds-icon icon="upload" style="color: var(--color-accent); flex-shrink: 0;"></pds-icon>
              <div>
                <strong>File uploaded</strong>
                <div style="opacity: 0.7;">1 day ago</div>
              </div>
            </div>
          </div>
        </article>

        <div style="display: flex; gap: var(--spacing-2); margin-top: var(--spacing-4);">
          <button class="btn-primary">
            <pds-icon icon="pencil"></pds-icon>
            Edit Project
          </button>
          <button class="btn-outline">
            <pds-icon icon="share"></pds-icon>
            Share
          </button>
        </div>
      </div>
    </pds-drawer>
  `;
};

DetailDrawer.storyName = 'Detail Panel';

