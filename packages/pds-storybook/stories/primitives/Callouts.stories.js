import { html } from 'lit';

export default {
  title: 'Primitives/Callouts',
  tags: ['Callouts', 'notifications', 'feedback', 'colors', 'message', 'status', 'error', 'warning', 'success', 'info', 'danger'],
  parameters: {
    pds: {
      tags: ['Callouts', 'colors', 'feedback', 'notification', 'message', 'status']
    },
    docs: {
      description: {
        component: 'Callout components for feedback messages, notifications, and status indicators. Supports icons, titles, dismissible variants, and semantic messages.'
      }
    }
  }
};

export const Default = () => html`
  <header class="card">
    <h2>Basic Callouts</h2>
    <p class="text-muted">Simple callout messages with semantic color variants.</p>
  </header>
  
  <div class="stack-md">
    <div class="callout callout-info">This is an info callout — check it out!</div>
    <div class="callout callout-success">This is a success callout — great job!</div>
    <div class="callout callout-warning">This is a warning callout — be careful!</div>
    <div class="callout callout-danger">This is a danger callout — something went wrong!</div>
  </div>
`;

Default.storyName = 'Basic Callouts';

export const CalloutsWithIcons = () => html`
  <header class="card">
    <h2>Callouts with Icons</h2>
    <p class="text-muted">Use <code>.callout-icon</code> to add visual context with icons.</p>
  </header>
  
  <div class="stack-md">
    <div class="callout callout-info">
      <span class="callout-icon">
        <pds-icon icon="info" size="md"></pds-icon>
      </span>
      <div>
        <strong>Information:</strong> Here's some helpful info you might want to know.
      </div>
    </div>
    
    <div class="callout callout-success">
      <span class="callout-icon">
        <pds-icon icon="check-circle" size="md"></pds-icon>
      </span>
      <div>
        <strong>Success!</strong> Your changes have been saved successfully.
      </div>
    </div>
    
    <div class="callout callout-warning">
      <span class="callout-icon">
        <pds-icon icon="warning" size="md"></pds-icon>
      </span>
      <div>
        <strong>Warning:</strong> Your session will expire in 5 minutes.
      </div>
    </div>
    
    <div class="callout callout-danger">
      <span class="callout-icon">
        <pds-icon icon="x-circle" size="md"></pds-icon>
      </span>
      <div>
        <strong>Error!</strong> Unable to process your request. Please try again.
      </div>
    </div>
  </div>
`;

CalloutsWithIcons.storyName = 'With Icons';

export const CalloutsWithTitles = () => html`
  <header class="card">
    <h2>Callouts with Titles</h2>
    <p class="text-muted">Use <code>.callout-title</code> on text elements for consistent title rendering across presets.</p>
  </header>
  
  <div class="stack-md">
    <div class="callout callout-info">
      <span class="callout-icon">
        <pds-icon icon="info" size="md"></pds-icon>
      </span>
      <div class="stack-xs">
        <strong class="callout-title">Did you know?</strong>
        <div>You can customize your notification preferences in Settings. This helps you stay informed about what matters most.</div>
      </div>
    </div>
    
    <div class="callout callout-success">
      <span class="callout-icon">
        <pds-icon icon="check-circle" size="md"></pds-icon>
      </span>
      <div class="stack-xs">
        <strong class="callout-title">Payment Successful</strong>
        <div>Your order #12345 has been confirmed. You&rsquo;ll receive a confirmation email shortly.</div>
      </div>
    </div>
    
    <div class="callout callout-warning">
      <span class="callout-icon">
        <pds-icon icon="warning" size="md"></pds-icon>
      </span>
      <div class="stack-xs">
        <strong class="callout-title">Action Required</strong>
        <div>Your account verification is pending. Please verify your email address to continue.</div>
      </div>
    </div>
    
    <div class="callout callout-danger">
      <span class="callout-icon">
        <pds-icon icon="x-circle" size="md"></pds-icon>
      </span>
      <div class="stack-xs">
        <strong class="callout-title">Connection Lost</strong>
        <div>Unable to connect to the server. Check your internet connection and try again.</div>
      </div>
    </div>
  </div>
`;

CalloutsWithTitles.storyName = 'With Titles';

export const DismissibleCallouts = () => html`
  <header class="card">
    <h2>Dismissible Callouts</h2>
    <p class="text-muted">
      Add <code>.callout-dismissible</code> and <code>.callout-close</code> for closeable Callouts.
      Click the × to dismiss (demo only, JS required for actual dismissal).
    </p>
  </header>
  
  <div class="stack-md">
    <div class="callout callout-info callout-dismissible">
      <span class="callout-icon">
        <pds-icon icon="info" size="md"></pds-icon>
      </span>
      <div>
        <h4 class="callout-title">New Feature Available</h4>
        <p>Check out our latest updates in the What's New section.</p>
      </div>
      <button class="callout-close" aria-label="Dismiss">×</button>
    </div>
    
    <div class="callout callout-success callout-dismissible">
      <span class="callout-icon">
        <pds-icon icon="check-circle" size="md"></pds-icon>
      </span>
      <div>This dismissible success callout can be closed by the user.</div>
      <button class="callout-close" aria-label="Dismiss">×</button>
    </div>
    
    <div class="callout callout-warning callout-dismissible">
      <span class="callout-icon">
        <pds-icon icon="warning" size="md"></pds-icon>
      </span>
      <div>Warning messages that users can acknowledge and dismiss.</div>
      <button class="callout-close" aria-label="Dismiss">×</button>
    </div>
  </div>
`;

DismissibleCallouts.storyName = 'Dismissible';

export const CalloutsReference = () => html`
  <div class="card">
    <h2>Callout Classes Reference</h2>
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
        <td><code>.callout</code></td>
        <td>Base callout container with flex layout and left border</td>
      </tr>
      <tr>
        <td><code>.callout-info</code></td>
        <td>Blue/cyan variant for informational messages</td>
      </tr>
      <tr>
        <td><code>.callout-success</code></td>
        <td>Green variant for success/confirmation messages</td>
      </tr>
      <tr>
        <td><code>.callout-warning</code></td>
        <td>Yellow/orange variant for warnings</td>
      </tr>
      <tr>
        <td><code>.callout-danger</code> / <code>.callout-error</code></td>
        <td>Red variant for errors and critical messages</td>
      </tr>
      <tr>
        <td><code>.callout-icon</code></td>
        <td>Container for callout icons (flex-shrink: 0)</td>
      </tr>
      <tr>
        <td><code>.callout-title</code></td>
        <td>Bold heading within callout content</td>
      </tr>
      <tr>
        <td><code>.callout-dismissible</code></td>
        <td>Adds right padding for close button</td>
      </tr>
      <tr>
        <td><code>.callout-close</code></td>
        <td>Absolutely positioned close button</td>
      </tr>
    </tbody>
  </table>
`;

