import { html } from 'lit';

export default {
  title: 'PDS/Components/pds-drawer',
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
        Open Drawer (${args.position})
      </button>
      
      <pds-drawer id="demo-drawer" position="${args.position}">
        <h2 slot="header">Drawer from ${args.position}</h2>
        <div style="padding: 1rem;">
          <p>This drawer slides from the <strong>${args.position}</strong> edge.</p>
          <p>Change the position control above to see different positions.</p>
          <button id="close-drawer-btn" class="btn-secondary">
            Close
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
      <h2 slot="header">Left Drawer</h2>
      <div style="padding: 1rem;">
        <p>Slides from the left</p>
        <button id="close-drawer-left" class="btn-secondary">Close</button>
      </div>
    </pds-drawer>
    
    <pds-drawer id="drawer-right" position="right">
      <h2 slot="header">Right Drawer</h2>
      <div style="padding: 1rem;">
        <p>Slides from the right</p>
        <button id="close-drawer-right" class="btn-secondary">Close</button>
      </div>
    </pds-drawer>
    
    <pds-drawer id="drawer-top" position="top">
      <h2 slot="header">Top Drawer</h2>
      <div style="padding: 1rem;">
        <p>Slides from the top</p>
        <button id="close-drawer-top" class="btn-secondary">Close</button>
      </div>
    </pds-drawer>
    
    <pds-drawer id="drawer-bottom" position="bottom">
      <h2 slot="header">Bottom Drawer</h2>
      <div style="padding: 1rem;">
        <p>Slides from the bottom</p>
        <button id="close-drawer-bottom" class="btn-secondary">Close</button>
      </div>
    </pds-drawer>
  `;
};
