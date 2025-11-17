import { html } from 'lit';

export default {
  title: 'Components/Pds Splitpanel',
  parameters: {
    docs: {
      description: {
        component: 'Resizable split panes with drag handle'
      }
    }
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Split direction'
    },
    defaultSplit: {
      control: 'text',
      description: 'Initial split position (px or %)'
    }
  }
};

export const Horizontal = {
  render: (args) => html`
    <pds-splitpanel orientation="${args.orientation}" default-split="${args.defaultSplit}" style="height: 500px;">
      <div slot="left" style="padding: var(--spacing-4); background: var(--surface-bg); overflow: auto;">
        <h3>File Browser</h3>
        <p style="opacity: 0.8; margin-bottom: var(--spacing-4);">Resize by dragging the handle</p>
        
        <div style="display: flex; flex-direction: column; gap: var(--spacing-2);">
          <div style="padding: var(--spacing-2); border-radius: var(--radius-sm); cursor: pointer; display: flex; align-items: center; gap: var(--spacing-2); background: var(--surface-elevated);">
            <pds-icon icon="folder" style="color: var(--color-primary);"></pds-icon>
            <strong>Documents</strong>
          </div>
          <div style="padding: var(--spacing-2); padding-left: var(--spacing-5); display: flex; align-items: center; gap: var(--spacing-2); cursor: pointer;">
            <pds-icon icon="file-text" size="sm"></pds-icon>
            <span>Report.pdf</span>
          </div>
          <div style="padding: var(--spacing-2); padding-left: var(--spacing-5); display: flex; align-items: center; gap: var(--spacing-2); cursor: pointer;">
            <pds-icon icon="file-text" size="sm"></pds-icon>
            <span>Notes.txt</span>
          </div>
          <div style="padding: var(--spacing-2); border-radius: var(--radius-sm); cursor: pointer; display: flex; align-items: center; gap: var(--spacing-2);">
            <pds-icon icon="folder" style="color: var(--color-primary);"></pds-icon>
            <span>Images</span>
          </div>
          <div style="padding: var(--spacing-2); border-radius: var(--radius-sm); cursor: pointer; display: flex; align-items: center; gap: var(--spacing-2);">
            <pds-icon icon="folder" style="color: var(--color-primary);"></pds-icon>
            <span>Projects</span>
          </div>
        </div>
      </div>
      
      <div slot="right" style="padding: var(--spacing-4); background: var(--surface-bg-secondary); overflow: auto;">
        <div style="display: flex; align-items: center; gap: var(--spacing-3); margin-bottom: var(--spacing-4);">
          <pds-icon icon="file-text" size="lg" style="color: var(--color-primary);"></pds-icon>
          <div>
            <h3 style="margin: 0;">Report.pdf</h3>
            <p style="margin: 0; font-size: 0.85rem; opacity: 0.7;">Modified 2 hours ago • 2.4 MB</p>
          </div>
        </div>
        
        <article class="card" style="margin-bottom: var(--spacing-4);">
          <h4>File Details</h4>
          <div style="display: grid; grid-template-columns: 100px 1fr; gap: var(--spacing-2); margin-top: var(--spacing-3); font-size: 0.9rem;">
            <strong>Type:</strong> <span>PDF Document</span>
            <strong>Size:</strong> <span>2.4 MB</span>
            <strong>Created:</strong> <span>Nov 15, 2025</span>
            <strong>Modified:</strong> <span>Nov 17, 2025</span>
            <strong>Owner:</strong> <span>John Doe</span>
          </div>
        </article>
        
        <article class="card surface-elevated">
          <h4>Quick Actions</h4>
          <div style="display: flex; gap: var(--spacing-2); margin-top: var(--spacing-3); flex-wrap: wrap;">
            <button class="btn-primary btn-sm">
              <pds-icon icon="download" size="sm"></pds-icon>
              Download
            </button>
            <button class="btn-secondary btn-sm">
              <pds-icon icon="share" size="sm"></pds-icon>
              Share
            </button>
            <button class="btn-outline btn-sm">
              <pds-icon icon="pencil" size="sm"></pds-icon>
              Rename
            </button>
            <button class="btn-outline btn-sm">
              <pds-icon icon="trash" size="sm"></pds-icon>
              Delete
            </button>
          </div>
        </article>
      </div>
    </pds-splitpanel>
  `,
  args: {
    orientation: 'horizontal',
    defaultSplit: '300px'
  }
};

export const Vertical = () => html`
  <pds-splitpanel orientation="vertical" default-split="250px" style="height: 600px;">
    <div slot="left" style="padding: var(--spacing-4); overflow: auto;">
      <h3>Email Preview</h3>
      
      <article class="card" style="margin-top: var(--spacing-3);">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: var(--spacing-3);">
          <div>
            <strong style="display: block;">Team Meeting Tomorrow</strong>
            <span style="font-size: 0.85rem; opacity: 0.7;">From: sarah@company.com</span>
          </div>
          <span style="font-size: 0.75rem; opacity: 0.6;">10:30 AM</span>
        </div>
        <p style="font-size: 0.9rem; opacity: 0.9; margin: 0;">Hi team, just a reminder about our meeting tomorrow at 2 PM. Please review the agenda...</p>
      </article>
      
      <div style="display: flex; gap: var(--spacing-2); margin-top: var(--spacing-3);">
        <button class="btn-primary btn-sm">
          <pds-icon icon="mail" size="sm"></pds-icon>
          Reply
        </button>
        <button class="btn-outline btn-sm">
          <pds-icon icon="arrow-right" size="sm"></pds-icon>
          Forward
        </button>
        <button class="btn-outline btn-sm">
          <pds-icon icon="trash" size="sm"></pds-icon>
          Delete
        </button>
      </div>
    </div>
    
    <div slot="right" style="padding: var(--spacing-4); overflow: auto; background: var(--surface-bg-secondary);">
      <h3>Full Email Content</h3>
      
      <article class="card" style="margin-top: var(--spacing-3);">
        <div style="margin-bottom: var(--spacing-4); padding-bottom: var(--spacing-3); border-bottom: 1px solid var(--color-border);">
          <h4 style="margin-bottom: var(--spacing-2);">Team Meeting Tomorrow</h4>
          <div style="font-size: 0.85rem; opacity: 0.7;">
            <div><strong>From:</strong> Sarah Johnson (sarah@company.com)</div>
            <div><strong>To:</strong> Team Members</div>
            <div><strong>Date:</strong> November 17, 2025 10:30 AM</div>
          </div>
        </div>
        
        <div style="line-height: 1.6;">
          <p>Hi team,</p>
          <p>Just a reminder about our team meeting tomorrow at 2 PM in Conference Room B. Please make sure to review the agenda beforehand.</p>
          
          <h5>Agenda Items:</h5>
          <ul>
            <li>Q4 Progress Review</li>
            <li>Upcoming Project Deadlines</li>
            <li>Resource Allocation</li>
            <li>Team Building Event Planning</li>
          </ul>
          
          <p>Please come prepared with your updates and any questions you might have. Looking forward to seeing everyone there!</p>
          
          <p>Best regards,<br>
          <strong>Sarah Johnson</strong><br>
          Team Lead</p>
        </div>
      </article>
      
      <article class="card surface-elevated" style="margin-top: var(--spacing-4);">
        <h4>Attachments (2)</h4>
        <div style="display: flex; flex-direction: column; gap: var(--spacing-2); margin-top: var(--spacing-3);">
          <div style="display: flex; align-items: center; gap: var(--spacing-2); padding: var(--spacing-2); border-radius: var(--radius-sm); background: var(--surface-bg);">
            <pds-icon icon="file-text"></pds-icon>
            <span style="flex: 1;">meeting-agenda.pdf</span>
            <button class="icon-only btn-outline btn-sm">
              <pds-icon icon="download" size="sm" label="Download"></pds-icon>
            </button>
          </div>
          <div style="display: flex; align-items: center; gap: var(--spacing-2); padding: var(--spacing-2); border-radius: var(--radius-sm); background: var(--surface-bg);">
            <pds-icon icon="file-text"></pds-icon>
            <span style="flex: 1;">q4-report.xlsx</span>
            <button class="icon-only btn-outline btn-sm">
              <pds-icon icon="download" size="sm" label="Download"></pds-icon>
            </button>
          </div>
        </div>
      </article>
    </div>
  </pds-splitpanel>
`;

export const CodeEditorLayout = () => html`
  <pds-splitpanel orientation="horizontal" default-split="50%" style="height: 600px;">
    <div slot="left" style="padding: var(--spacing-4); background: var(--surface-bg); overflow: auto;">
      <h3>Code Editor</h3>
      <article class="card surface-elevated" style="margin-top: var(--spacing-3);">
        <pre style="margin: 0; overflow: auto;"><code>function greet(name) {
  console.log('Hello, ' + name + '!');
}

greet('World');</code></pre>
      </article>
      
      <div style="margin-top: var(--spacing-4);">
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
    
    <div slot="right" style="padding: var(--spacing-4); background: var(--surface-bg-secondary); overflow: auto;">
      <h3>Output Console</h3>
      <article class="card" style="margin-top: var(--spacing-3); font-family: monospace; background: #1e1e1e; color: #d4d4d4; padding: var(--spacing-3);">
        <div style="color: #4ec9b0;">$ node script.js</div>
        <div>Hello, World!</div>
        <div style="color: #6a9955;">// Execution completed in 0.23s</div>
      </article>
    </div>
  </pds-splitpanel>
`;

CodeEditorLayout.storyName = 'Code Editor Layout';

export const DashboardLayout = () => html`
  <pds-splitpanel orientation="horizontal" default-split="250px" style="height: 700px;">
    <div slot="left" style="padding: var(--spacing-4); background: var(--surface-bg); overflow: auto;">
      <h3 style="margin-bottom: var(--spacing-4);">Navigation</h3>
      
      <div style="display: flex; flex-direction: column; gap: var(--spacing-2);">
        <button class="btn-outline" style="justify-content: flex-start;">
          <pds-icon icon="home"></pds-icon>
          Dashboard
        </button>
        <button class="btn-outline" style="justify-content: flex-start;">
          <pds-icon icon="bar-chart"></pds-icon>
          Analytics
        </button>
        <button class="btn-outline" style="justify-content: flex-start;">
          <pds-icon icon="users"></pds-icon>
          Users
        </button>
        <button class="btn-outline" style="justify-content: flex-start;">
          <pds-icon icon="gear"></pds-icon>
          Settings
        </button>
      </div>
    </div>
    
    <div slot="right" style="padding: var(--spacing-4); overflow: auto;">
      <h2>Dashboard Overview</h2>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-4); margin-top: var(--spacing-4);">
        <article class="card surface-elevated">
          <h4>Total Users</h4>
          <div style="font-size: 2.5rem; font-weight: 700; color: var(--color-primary); margin: var(--spacing-2) 0;">1,284</div>
          <p style="font-size: 0.85rem; opacity: 0.7;">↑ 12% from last month</p>
        </article>
        
        <article class="card surface-elevated">
          <h4>Revenue</h4>
          <div style="font-size: 2.5rem; font-weight: 700; color: var(--color-secondary); margin: var(--spacing-2) 0;">$42.5K</div>
          <p style="font-size: 0.85rem; opacity: 0.7;">↑ 8% from last month</p>
        </article>
        
        <article class="card surface-elevated">
          <h4>Active Now</h4>
          <div style="font-size: 2.5rem; font-weight: 700; color: var(--color-accent); margin: var(--spacing-2) 0;">127</div>
          <p style="font-size: 0.85rem; opacity: 0.7;">Current active users</p>
        </article>
      </div>
      
      <article class="card" style="margin-top: var(--spacing-6);">
        <h3>Recent Activity</h3>
        <div style="margin-top: var(--spacing-3); display: flex; flex-direction: column; gap: var(--spacing-3);">
          ${Array.from({ length: 5 }, (_, i) => html`
            <div style="display: flex; gap: var(--spacing-3); align-items: center; padding: var(--spacing-2); border-radius: var(--radius-sm);">
              <div style="width: 40px; height: 40px; background: var(--color-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white;">
                <pds-icon icon="user"></pds-icon>
              </div>
              <div style="flex: 1;">
                <strong>User ${i + 1}</strong>
                <div style="font-size: 0.85rem; opacity: 0.7;">Completed an action</div>
              </div>
              <div style="font-size: 0.85rem; opacity: 0.6;">${i + 1}h ago</div>
            </div>
          `)}
        </div>
      </article>
    </div>
  </pds-splitpanel>
`;

DashboardLayout.storyName = 'Dashboard Layout';

