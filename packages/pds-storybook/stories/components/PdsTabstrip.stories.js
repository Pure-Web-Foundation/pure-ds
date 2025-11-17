import { html } from 'lit';

export default {
  title: 'PDS/Components/pds-tabstrip',
  parameters: {
    docs: {
      description: {
        component: 'Accessible tab interface with keyboard navigation'
      }
    }
  }
};

export const Default = () => html`
  <pds-tabstrip label="Example Tabs">
    <pds-tabpanel id="overview" label="Overview">
      <h3>Overview</h3>
      <p>This is the overview panel. Tab strips provide organized navigation between related content.</p>
    </pds-tabpanel>
    
    <pds-tabpanel id="details" label="Details">
      <h3>Details</h3>
      <p>This is the details panel with more information.</p>
      <ul>
        <li>Deep linking with URL hashes</li>
        <li>Keyboard navigation</li>
        <li>Accessible ARIA attributes</li>
      </ul>
    </pds-tabpanel>
    
    <pds-tabpanel id="settings" label="Settings">
      <h3>Settings</h3>
      <p>This is the settings panel.</p>
    </pds-tabpanel>
  </pds-tabstrip>
`;
