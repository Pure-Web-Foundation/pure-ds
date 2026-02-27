import { html } from 'lit';
import { PDS } from '#pds';

const docsParameters = {
  description: {
    component: 'Toast notification system with auto-dismiss and stacking. Toast notifications appear in the top-right corner and auto-dismiss after a few seconds based on message length.'
  }
};

if (typeof window !== 'undefined') {
  import('../reference/reference-docs.js')
    .then(({ createComponentDocsPage }) => {
      docsParameters.page = createComponentDocsPage('pds-toaster');
    })
    .catch((error) => {
      console.warn('storybook: docs page failed to load for pds-toaster', error);
    });
}

export default {
  title: 'Components/pds-toaster',
  tags: ['autodocs', 'toast', 'toaster', 'notification', 'alert', 'message', 'feedback'],
  parameters: {
    pds: {
      tags: ['toast', 'toaster', 'notification', 'alert', 'message', 'feedback', 'pds-toaster', 'interaction']
    },
    docs: docsParameters
  }
};

export const Default = () => {
  setTimeout(() => {
    const wireToastButton = (buttonId, message, options) => {
      const button = document.getElementById(buttonId);
      if (!button) return;

      button.onclick = async () => {
        await PDS.toast(message, options);
      };
    };

    wireToastButton('toast-success', 'Your changes have been saved successfully!', { type: 'success' });
    wireToastButton('toast-info', 'This is an informational message with helpful context.', { type: 'info' });
    wireToastButton('toast-warning', 'Warning: This action cannot be undone!', { type: 'warning' });
    wireToastButton('toast-error', 'Error: Something went wrong. Please try again.', { type: 'error' });
    wireToastButton(
      'toast-long',
      'This is a longer toast notification message that demonstrates how the duration is automatically calculated based on the message length. The toast will stay visible longer to give you enough time to read the entire message.',
      { type: 'info' }
    );
    wireToastButton(
      'toast-persistent',
      'This is a persistent toast that won\'t auto-dismiss. Click the × to close it.',
      { type: 'info', persistent: true }
    );
  }, 0);
  
  return html`
    <div class="stack-md">
      <p class="text-muted">
        Toast notifications appear in the top-right corner and auto-dismiss after a few seconds. Click the buttons below to see them in action:
      </p>
      
      <div class="flex flex-wrap gap-md">
      <button id="toast-success" class="btn-primary btn-sm">
        <pds-icon icon="check-circle" size="sm"></pds-icon>
        Success
      </button>
      <button id="toast-info" class="btn-secondary btn-sm">
        <pds-icon icon="info" size="sm"></pds-icon>
        Info
      </button>
      <button id="toast-warning" class="btn-warning btn-sm">
        <pds-icon icon="warning" size="sm"></pds-icon>
        Warning
      </button>
      <button id="toast-error" class="btn-danger btn-sm">
        <pds-icon icon="x-circle" size="sm"></pds-icon>
        Error
      </button>
      <button id="toast-long" class="btn-outline btn-sm">
        <pds-icon icon="clock" size="sm"></pds-icon>
        Long
      </button>
      <button id="toast-persistent" class="btn-outline btn-sm">
        <pds-icon icon="bell" size="sm"></pds-icon>
        Persistent
      </button>
      </div>

      <div class="callout callout-info">
        <span class="callout-icon">
          <pds-icon icon="info" size="md"></pds-icon>
        </span>
        <div class="stack-xs">
          <strong class="callout-title">More info on PDS toasters</strong>
          <div>
            <a href="/?path=/story/pds-pds-object--pds-toast" target="_top">See PDS Object/PDS.toast() utility story</a>
          </div>
        </div>
      </div>
    </div>
  `;
};

