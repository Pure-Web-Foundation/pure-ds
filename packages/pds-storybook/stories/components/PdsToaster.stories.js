import { html } from 'lit';

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
    const toaster = document.getElementById('demo-toaster');
    
    document.getElementById('toast-success')?.addEventListener('click', () => {
      toaster?.toast('Your changes have been saved successfully!', { 
        type: 'success'
      });
    });
    
    document.getElementById('toast-info')?.addEventListener('click', () => {
      toaster?.toast('This is an informational message with helpful context.', { 
        type: 'info'
      });
    });
    
    document.getElementById('toast-warning')?.addEventListener('click', () => {
      toaster?.toast('Warning: This action cannot be undone!', { 
        type: 'warning'
      });
    });
    
    document.getElementById('toast-error')?.addEventListener('click', () => {
      toaster?.toast('Error: Something went wrong. Please try again.', { 
        type: 'error'
      });
    });
    
    document.getElementById('toast-long')?.addEventListener('click', () => {
      toaster?.toast(
        'This is a longer toast notification message that demonstrates how the duration is automatically calculated based on the message length. The toast will stay visible longer to give you enough time to read the entire message.',
        { type: 'info' }
      );
    });
    
    document.getElementById('toast-persistent')?.addEventListener('click', () => {
      toaster?.toast(
        'This is a persistent toast that won\'t auto-dismiss. Click the × to close it.',
        { type: 'info', persistent: true }
      );
    });
  }, 0);
  
  return html`
    <pds-toaster id="demo-toaster"></pds-toaster>
    
    <div class="stack-md">
      <p class="text-muted">
        Toast notifications appear in the top-right corner and auto-dismiss after a few seconds. Click the buttons below to see them in action:
      </p>
      <p>
        <a href="/?path=/story/pds-pds-object--pds-toast" target="_top">See PDS Object/PDS.toast() utility story</a>
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
    </div>
  `;
};

export const ViaEvents = () => {
  setTimeout(() => {
    const { PDS } = window;
    
    document.getElementById('event-success')?.addEventListener('click', () => {
      PDS?.dispatchEvent(new CustomEvent('pds:toast', {
        detail: { 
          message: 'Operation completed successfully!', 
          type: 'success'
        }
      }));
    });
    
    document.getElementById('event-info')?.addEventListener('click', () => {
      PDS?.dispatchEvent(new CustomEvent('pds:toast', {
        detail: { 
          message: 'New updates are available for your application.', 
          type: 'info'
        }
      }));
    });
    
    document.getElementById('event-warning')?.addEventListener('click', () => {
      PDS?.dispatchEvent(new CustomEvent('pds:toast', {
        detail: { 
          message: 'Please review your changes before continuing.', 
          type: 'warning'
        }
      }));
    });
    
    document.getElementById('event-error')?.addEventListener('click', () => {
      PDS?.dispatchEvent(new CustomEvent('pds:toast', {
        detail: { 
          message: 'Failed to connect to server. Check your network connection.', 
          type: 'error'
        }
      }));
    });
  }, 0);
  
  return html`
    <pds-toaster id="event-toaster"></pds-toaster>
    
    <p class="toaster-story-description">
      Toast notifications can also be triggered via PDS events. This is useful for global notifications from anywhere in your application.
    </p>

    <p>
      <a href="/?path=/story/pds-pds-object--pds-toast" target="_top">See PDS Object/PDS.toast() utility story</a>
    </p>
    
    <div class="flex flex-wrap gap-md">
      <button id="event-success" class="btn-primary btn-sm">
        <pds-icon icon="check-circle" size="sm"></pds-icon>
        Success Event
      </button>
      <button id="event-info" class="btn-secondary btn-sm">
        <pds-icon icon="info" size="sm"></pds-icon>
        Info Event
      </button>
      <button id="event-warning" class="btn-warning btn-sm">
        <pds-icon icon="warning" size="sm"></pds-icon>
        Warning Event
      </button>
      <button id="event-error" class="btn-danger btn-sm">
        <pds-icon icon="x-circle" size="sm"></pds-icon>
        Error Event
      </button>
    </div>
  `;
};
