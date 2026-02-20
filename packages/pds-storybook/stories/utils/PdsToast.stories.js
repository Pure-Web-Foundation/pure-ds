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

const CustomHtmlToasts = {
  name: 'Custom HTML toasts',
  render: () => {
    const showHtmlSuccess = async () => {
      const toast = ensureToast();
      await toast(
        '<strong>Profile saved.</strong><br><span class="text-muted">Your preference updates are now active.</span>',
        {
          type: 'success',
          html: true
        }
      );
    };

    const showHtmlWarning = async () => {
      const toast = ensureToast();
      await toast(
        '<strong>Action needed:</strong><br><ul><li>Verify your email address</li><li>Enable two-factor authentication</li></ul>',
        {
          type: 'warning',
          html: true,
          persistent: true
        }
      );
    };

    const showHtmlWithAction = async () => {
      const toast = ensureToast();
      await toast(
        '<strong>File archived.</strong><br><span class="text-muted">You can restore it within 30 days.</span>',
        {
          type: 'information',
          html: true,
          action: {
            label: 'Undo',
            icon: 'arrow-counter-clockwise',
            onClick: async () => {
              await toast('Archive action was undone.', { type: 'success' });
            },
            dismissOnClick: true
          }
        }
      );
    };

    return html`
      <section class="card stack-md max-w-sm">
        <h3>Custom HTML toasts</h3>
        <p class="text-muted">Render trusted rich content in toast messages with the <code>html</code> option.</p>
        <div class="flex gap-sm">
          <button class="btn" @click=${showHtmlSuccess}>Show HTML success</button>
          <button class="btn btn-outline" @click=${showHtmlWarning}>Show HTML warning</button>
          <button class="btn" @click=${showHtmlWithAction}>Show HTML + action</button>
        </div>
      </section>
    `;
  }
};

export const PDSToast = {
  name: 'PDS.toast()',
  render: () => html`
    <section class="stack-lg">
      <p>
        <a href="/?path=/story/components-pds-toaster--default" target="_top">See Components/Pds Toaster story</a>
      </p>
      ${QuickToasts.render()}
      ${PersistentToast.render()}
      ${CustomHtmlToasts.render()}
    </section>
  `
};
