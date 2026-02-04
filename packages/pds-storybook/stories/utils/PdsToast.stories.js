import { html } from '#pds/lit';
import { toast as toastFallback } from '@pds-src/js/common/toast.js';

const ensureToast = () => {
  if (typeof window !== 'undefined' && window.PDS?.toast) {
    return window.PDS.toast;
  }
  return toastFallback;
};

export default {
  title: 'PDS/PDS Object',
  tags: ['notifications', 'toast', 'utilities', 'feedback'],
  parameters: {
    pds: {
      tags: ['toast', 'notifications', 'feedback', 'pds-toast']
    },
    docs: {
      disable: true,
      description: {
        component: `Use <code>PDS.toast()</code> to show non-blocking notifications. The helper ensures a <code>pds-toaster</code> instance exists before displaying the message.`
      }
    }
  }
};

const QuickToasts = {
  name: 'Quick toasts',
  render: () => {
    const handleToast = (type) => async () => {
      const toast = ensureToast();
      await toast('This is a ' + type + ' toast.', { type });
    };

    return html`
      <section class="card stack-md max-w-sm">
        <h3>Quick toasts</h3>
        <p class="text-muted">Trigger basic toast types using the shared helper.</p>
        <div class="flex gap-sm">
          <button class="btn" @click=${handleToast('information')}>Info</button>
          <button class="btn" @click=${handleToast('success')}>Success</button>
          <button class="btn" @click=${handleToast('warning')}>Warning</button>
          <button class="btn" @click=${handleToast('error')}>Error</button>
        </div>
      </section>
    `;
  }
};

const PersistentToast = {
  name: 'Persistent toast',
  render: () => {
    const handlePersistent = async () => {
      const toast = ensureToast();
      await toast('Heads up! This toast stays until dismissed.', {
        type: 'warning',
        persistent: true
      });
    };

    return html`
      <section class="card stack-md max-w-sm">
        <h3>Persistent toast</h3>
        <p class="text-muted">Use persistent mode for messages that require attention.</p>
        <button class="btn btn-outline" @click=${handlePersistent}>Show persistent toast</button>
      </section>
    `;
  }
};

export const PDSToast = {
  name: 'PDS.toast()',
  render: () => html`
    <section class="stack-lg">
      ${QuickToasts.render()}
      ${PersistentToast.render()}
    </section>
  `
};
