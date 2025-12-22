import { html } from 'lit';

export default {
  title: 'Primitives/Alerts',
  tags: ['alerts', 'notifications', 'feedback', 'colors'],
  parameters: {
    pds: {
      tags: ['alerts', 'colors', 'feedback']
    },
    docs: {
      description: {
        component: 'Alert components for feedback messages, notifications, and status indicators. Supports icons, titles, dismissible variants, and semantic messages.'
      }
    }
  }
};

export const Default = () => html`
  <div class="card">
    <h2>Basic Alerts</h2>
    <p class="text-muted">Simple alert messages with semantic color variants.</p>
  </div>
  
  <div class="flex flex-col gap-md">
    <div class="alert alert-info">This is an info alert — check it out!</div>
    <div class="alert alert-success">This is a success alert — great job!</div>
    <div class="alert alert-warning">This is a warning alert — be careful!</div>
    <div class="alert alert-danger">This is a danger alert — something went wrong!</div>
  </div>
`;

Default.storyName = 'Basic Alerts';

export const AlertsWithIcons = () => html`
  <div class="card">
    <h2>Alerts with Icons</h2>
    <p class="text-muted">Use <code>.alert-icon</code> to add visual context with icons.</p>
  </div>
  
  <div class="flex flex-col gap-md">
    <div class="alert alert-info">
      <span class="alert-icon">
        <pds-icon icon="info" size="md"></pds-icon>
      </span>
      <div>
        <strong>Information:</strong> Here's some helpful info you might want to know.
      </div>
    </div>
    
    <div class="alert alert-success">
      <span class="alert-icon">
        <pds-icon icon="check-circle" size="md"></pds-icon>
      </span>
      <div>
        <strong>Success!</strong> Your changes have been saved successfully.
      </div>
    </div>
    
    <div class="alert alert-warning">
      <span class="alert-icon">
        <pds-icon icon="warning" size="md"></pds-icon>
      </span>
      <div>
        <strong>Warning:</strong> Your session will expire in 5 minutes.
      </div>
    </div>
    
    <div class="alert alert-danger">
      <span class="alert-icon">
        <pds-icon icon="x-circle" size="md"></pds-icon>
      </span>
      <div>
        <strong>Error!</strong> Unable to process your request. Please try again.
      </div>
    </div>
  </div>
`;

AlertsWithIcons.storyName = 'With Icons';

export const AlertsWithTitles = () => html`
  <div class="card">
    <h2>Alerts with Titles</h2>
    <p class="text-muted">Use <code>.alert-title</code> for prominent headings within alerts.</p>
  </div>
  
  <div class="flex flex-col gap-md">
    <div class="alert alert-info">
      <span class="alert-icon">
        <pds-icon icon="info" size="md"></pds-icon>
      </span>
      <div>
        <h4 class="alert-title">Did you know?</h4>
        <p>You can customize your notification preferences in Settings. This helps you stay informed about what matters most.</p>
      </div>
    </div>
    
    <div class="alert alert-success">
      <span class="alert-icon">
        <pds-icon icon="check-circle" size="md"></pds-icon>
      </span>
      <div>
        <h4 class="alert-title">Payment Successful</h4>
        <p>Your order #12345 has been confirmed. You'll receive a confirmation email shortly.</p>
      </div>
    </div>
    
    <div class="alert alert-warning">
      <span class="alert-icon">
        <pds-icon icon="warning" size="md"></pds-icon>
      </span>
      <div>
        <h4 class="alert-title">Action Required</h4>
        <p>Your account verification is pending. Please verify your email address to continue.</p>
      </div>
    </div>
    
    <div class="alert alert-danger">
      <span class="alert-icon">
        <pds-icon icon="x-circle" size="md"></pds-icon>
      </span>
      <div>
        <h4 class="alert-title">Connection Lost</h4>
        <p>Unable to connect to the server. Check your internet connection and try again.</p>
      </div>
    </div>
  </div>
`;

AlertsWithTitles.storyName = 'With Titles';

export const DismissibleAlerts = () => html`
  <div class="card">
    <h2>Dismissible Alerts</h2>
    <p class="text-muted">
      Add <code>.alert-dismissible</code> and <code>.alert-close</code> for closeable alerts.
      Click the × to dismiss (demo only, JS required for actual dismissal).
    </p>
  </div>
  
  <div class="flex flex-col gap-md">
    <div class="alert alert-info alert-dismissible">
      <span class="alert-icon">
        <pds-icon icon="info" size="md"></pds-icon>
      </span>
      <div>
        <h4 class="alert-title">New Feature Available</h4>
        <p>Check out our latest updates in the What's New section.</p>
      </div>
      <button class="alert-close" aria-label="Dismiss">×</button>
    </div>
    
    <div class="alert alert-success alert-dismissible">
      <span class="alert-icon">
        <pds-icon icon="check-circle" size="md"></pds-icon>
      </span>
      <div>This dismissible success alert can be closed by the user.</div>
      <button class="alert-close" aria-label="Dismiss">×</button>
    </div>
    
    <div class="alert alert-warning alert-dismissible">
      <span class="alert-icon">
        <pds-icon icon="warning" size="md"></pds-icon>
      </span>
      <div>Warning messages that users can acknowledge and dismiss.</div>
      <button class="alert-close" aria-label="Dismiss">×</button>
    </div>
  </div>
`;

DismissibleAlerts.storyName = 'Dismissible';

export const SemanticMessages = () => html`
  <div class="card">
    <h2>Semantic Messages</h2>
    <p class="text-muted">
      The <code>.semantic-message</code> class is an alias for alerts with slightly different semantics.
      Useful for inline form feedback or contextual messages.
    </p>
  </div>
  
  <div class="flex flex-col gap-md">
    <div class="semantic-message info">
      <strong>Tip:</strong>
      <p>Use semantic messages for inline feedback within forms or content areas.</p>
    </div>
    
    <div class="semantic-message success">
      <strong>Saved!</strong>
      <p>Your profile has been updated successfully.</p>
    </div>
    
    <div class="semantic-message warning">
      <strong>Heads up:</strong>
      <p>This action cannot be undone. Please review before proceeding.</p>
    </div>
    
    <div class="semantic-message danger">
      <strong>Error:</strong>
      <p>Please fix the errors below before submitting the form.</p>
    </div>
  </div>
  
  <div class="card">
    <h3>In a Form Context</h3>
    <form class="max-w-md">
      <label>
        <span>Email Address</span>
        <input type="email" value="invalid-email" />
      </label>
      <div class="semantic-message danger" style="margin-top: var(--spacing-2);">
        <strong>Invalid email format</strong>
        <p>Please enter a valid email address (e.g., user@example.com)</p>
      </div>
      <div class="flex gap-sm justify-end" style="margin-top: var(--spacing-4);">
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
`;

SemanticMessages.storyName = 'Semantic Messages';

export const AlertsReference = () => html`
  <div class="card">
    <h2>Alert Classes Reference</h2>
  </div>
  
  <table class="table-bordered table-compact">
    <thead>
      <tr>
        <th>Class</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>.alert</code></td>
        <td>Base alert container with flex layout and left border</td>
      </tr>
      <tr>
        <td><code>.alert-info</code></td>
        <td>Blue/cyan variant for informational messages</td>
      </tr>
      <tr>
        <td><code>.alert-success</code></td>
        <td>Green variant for success/confirmation messages</td>
      </tr>
      <tr>
        <td><code>.alert-warning</code></td>
        <td>Yellow/orange variant for warnings</td>
      </tr>
      <tr>
        <td><code>.alert-danger</code> / <code>.alert-error</code></td>
        <td>Red variant for errors and critical messages</td>
      </tr>
      <tr>
        <td><code>.alert-icon</code></td>
        <td>Container for alert icons (flex-shrink: 0)</td>
      </tr>
      <tr>
        <td><code>.alert-title</code></td>
        <td>Bold heading within alert content</td>
      </tr>
      <tr>
        <td><code>.alert-dismissible</code></td>
        <td>Adds right padding for close button</td>
      </tr>
      <tr>
        <td><code>.alert-close</code></td>
        <td>Absolutely positioned close button</td>
      </tr>
      <tr>
        <td><code>.semantic-message</code></td>
        <td>Alias for alert with semantic variants (.info, .success, etc.)</td>
      </tr>
    </tbody>
  </table>
`;
