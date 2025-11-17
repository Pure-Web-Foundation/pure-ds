import { html } from 'lit';

export default {
  title: 'PDS/Components/pds-splitpanel',
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
    <pds-splitpanel orientation="${args.orientation}" default-split="${args.defaultSplit}" style="height: 400px;">
      <div slot="start" style="padding: 1rem; background: var(--surface-bg);">
        <h3>Left Panel</h3>
        <p>Resize by dragging the handle</p>
      </div>
      <div slot="end" style="padding: 1rem; background: var(--surface-bg-secondary);">
        <h3>Right Panel</h3>
        <p>Content on the right</p>
      </div>
    </pds-splitpanel>
  `,
  args: {
    orientation: 'horizontal',
    defaultSplit: '300px'
  }
};

export const Vertical = () => html`
  <pds-splitpanel orientation="vertical" default-split="40%" style="height: 600px;">
    <div slot="start" style="padding: 1rem;">
      <h3>Top Panel</h3>
      <p>Header content</p>
    </div>
    <div slot="end" style="padding: 1rem;">
      <h3>Bottom Panel</h3>
      <p>Main content area</p>
    </div>
  </pds-splitpanel>
`;
