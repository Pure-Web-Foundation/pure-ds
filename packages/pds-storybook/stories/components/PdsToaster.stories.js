import { html } from 'lit';

export default {
  title: 'Components/Pds Toaster',
  parameters: {
    docs: {
      description: {
        component: 'Toast notification system with auto-dismiss and stacking'
      }
    }
  }
};

export const Default = () => {
  setTimeout(() => {
    const toaster = document.getElementById('demo-toaster');
    
    document.getElementById('toast-success')?.addEventListener('click', () => {
      toaster?.toast('Success!', { type: 'success', duration: 3000 });
    });
    
    document.getElementById('toast-info')?.addEventListener('click', () => {
      toaster?.toast('Information', { type: 'info', duration: 3000 });
    });
    
    document.getElementById('toast-warning')?.addEventListener('click', () => {
      toaster?.toast('Warning!', { type: 'warning', duration: 3000 });
    });
    
    document.getElementById('toast-danger')?.addEventListener('click', () => {
      toaster?.toast('Error occurred', { type: 'danger', duration: 5000 });
    });
  }, 0);
  
  return html`
    <pds-toaster id="demo-toaster"></pds-toaster>
    
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <button id="toast-success" class="btn-primary">
        Success Toast
      </button>
      <button id="toast-info" class="btn-secondary">
        Info Toast
      </button>
      <button id="toast-warning" class="btn-outline">
        Warning Toast
      </button>
      <button id="toast-danger" class="btn-ghost">
        Error Toast
      </button>
    </div>
  `;
};

export const ViaEvents = () => {
  setTimeout(() => {
    const { PDS } = window;
    
    document.getElementById('event-success')?.addEventListener('click', () => {
      PDS?.dispatchEvent(new CustomEvent('pds:toast', {
        detail: { message: 'Operation completed', type: 'success', duration: 3000 }
      }));
    });
    
    document.getElementById('event-warning')?.addEventListener('click', () => {
      PDS?.dispatchEvent(new CustomEvent('pds:toast', {
        detail: { message: 'Please review', type: 'warning', duration: 3000 }
      }));
    });
  }, 0);
  
  return html`
    <pds-toaster id="event-toaster"></pds-toaster>
    
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <button id="event-success" class="btn-primary">
        Show Success
      </button>
      <button id="event-warning" class="btn-outline">
        Show Warning
      </button>
    </div>
  `;
};
