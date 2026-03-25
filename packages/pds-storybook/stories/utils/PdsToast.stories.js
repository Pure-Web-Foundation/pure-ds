import { html } from '#pds/lit';
import { toast as toastFallback } from '@pds-src/js/common/toast.js';
import { pdsObjectDocsParameters } from './pds-object-meta.js';

const ensureToast = () => {
  return toastFallback;
};

const toastQuickSource = `await PDS.toast('This is a success toast.', {
  type: 'success'
});`;

const toastPersistentSource = `await PDS.toast('Heads up! This toast stays until dismissed.', {
  type: 'warning',
  persistent: true
});`;

const toastCustomTitleSource = `await PDS.toast('Feature coming soon...', {
  type: 'information',
  title: 'Qogni'
});

await PDS.toast('Default title fallback when title is empty.', {
  type: 'success',
  title: '   '
});`;

const toastHtmlActionSource = `await PDS.toast(
  '<strong>File archived.</strong><br><span class="text-muted">You can restore it within 30 days.</span>',
  {
    type: 'information',
    html: true,
    action: {
      label: 'Undo',
      icon: 'arrow-counter-clockwise',
      onClick: async () => {
        await PDS.toast('Archive action was undone.', { type: 'success' });
      },
      dismissOnClick: true
    }
  }
);`;

const toastPersistentLiveUpdateSource = `const toastEl = await PDS.toast('Syncing draft... 0%', {
  type: 'information',
  title: 'Saving draft',
  persistent: true,
  returnToastElement: true
});

if (!toastEl) return;

for (const percent of [20, 45, 70, 90, 100]) {
  await new Promise((resolve) => setTimeout(resolve, 450));
  const title = toastEl.querySelector('.callout-title');
  const msg = toastEl.querySelector('.toast-content p');
  if (title) title.textContent = 'Saving draft';
  if (msg) msg.textContent = 'Syncing draft... ' + percent + '%';
}

const done = toastEl;
done?.classList.remove('callout-info');
done?.classList.add('callout-success');
done?.querySelector('.callout-icon')?.setAttribute('icon', 'check-circle');
done?.querySelector('.callout-title') && (done.querySelector('.callout-title').textContent = 'Draft saved');
done?.querySelector('.toast-content p') && (done.querySelector('.toast-content p').textContent = 'All changes were synced successfully.');

await new Promise((resolve) => setTimeout(resolve, 1200));
done?.querySelector('.callout-close')?.click();`;

export default {
  title: 'PDS/PDS Object',
  tags: ['autodocs', 'runtime', 'api', 'reference', 'utilities', 'pds-object', 'notifications', 'toast', 'feedback'],
  parameters: {
    pds: {
      tags: ['runtime', 'api', 'reference', 'pds-object', 'pds-start', 'pds-compiled', 'pds-enums', 'pds-ask', 'pds-toast', 'pds-parse', 'toast', 'notifications', 'feedback']
    },
    docs: pdsObjectDocsParameters
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
      <section
        class="card max-w-sm"
        .pdsCodeHeading=${'PDS.toast()'}
        .pdsCodeLabel=${'Quick toasts'}
        .pdsCodeSource=${toastQuickSource}
      >
        <header>
          <h3>Quick toasts</h3>
          <small class="text-muted">Trigger basic toast types using the shared helper.</small>
        </header>
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
      <section
        class="card max-w-sm"
        .pdsCodeHeading=${'PDS.toast()'}
        .pdsCodeLabel=${'Persistent toast'}
        .pdsCodeSource=${toastPersistentSource}
      >
        <header>
          <h3>Persistent toast</h3>
          <small class="text-muted">Use persistent mode for messages that require attention.</small>
        </header>
        <button class="btn btn-outline" @click=${handlePersistent}>Show persistent toast</button>
      </section>
    `;
  }
};

const CustomTitleToast = {
  name: 'Custom title toast',
  render: () => {
    const showCustomTitle = async () => {
      const toast = ensureToast();
      await toast('Feature coming soon...', {
        type: 'information',
        title: 'Qogni'
      });
    };

    const showDefaultFallback = async () => {
      const toast = ensureToast();
      await toast('This uses the default Success! title.', {
        type: 'success'
      });
    };

    const showBlankTitleFallback = async () => {
      const toast = ensureToast();
      await toast('Blank custom title falls back to Information.', {
        type: 'information',
        title: '   '
      });
    };

    return html`
      <section
        class="card max-w-sm"
        .pdsCodeHeading=${'PDS.toast()'}
        .pdsCodeLabel=${'Custom title toast'}
        .pdsCodeSource=${toastCustomTitleSource}
      >
        <header>
          <h3>Custom title toast</h3>
          <small class="text-muted">Set <code>title</code> to override the default heading or omit it to use type-based labels.</small>
        </header>
        <div class="flex gap-sm">
          <button class="btn" @click=${showCustomTitle}>Show custom title</button>
          <button class="btn btn-outline" @click=${showDefaultFallback}>Show default fallback</button>
          <button class="btn btn-outline" @click=${showBlankTitleFallback}>Show blank-title fallback</button>
        </div>
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
      <section
        class="card max-w-sm"
        .pdsCodeHeading=${'PDS.toast()'}
        .pdsCodeLabel=${'Custom HTML toasts'}
        .pdsCodeSource=${toastHtmlActionSource}
      >
        <header>
          <h3>Custom HTML toasts</h3>
          <small class="text-muted">Render trusted rich content in toast messages with the <code>html</code> option.</small>
        </header>
        <div class="flex gap-sm">
          <button class="btn" @click=${showHtmlSuccess}>Show HTML success</button>
          <button class="btn btn-outline" @click=${showHtmlWarning}>Show HTML warning</button>
          <button class="btn" @click=${showHtmlWithAction}>Show HTML + action</button>
        </div>
      </section>
    `;
  }
};

const PersistentToastLiveUpdate = {
  name: 'Persistent toast live updates',
  render: () => {
    const showLiveUpdateToast = async () => {
      const toast = ensureToast();
      const toastElement = await toast('Syncing draft... 0%', {
        type: 'information',
        title: 'Saving draft',
        persistent: true,
        returnToastElement: true
      });

      if (!toastElement) {
        return;
      }

      for (const percent of [20, 45, 70, 90, 100]) {
        await new Promise((resolve) => setTimeout(resolve, 450));
        const titleElement = toastElement.querySelector('.callout-title');
        const messageElement = toastElement.querySelector('.toast-content p');

        if (titleElement) {
          titleElement.textContent = 'Saving draft';
        }
        if (messageElement) {
          messageElement.textContent = `Syncing draft... ${percent}%`;
        }
      }

      toastElement.classList.remove('callout-info');
      toastElement.classList.add('callout-success');

      const iconElement = toastElement.querySelector('.callout-icon');
      const titleElement = toastElement.querySelector('.callout-title');
      const messageElement = toastElement.querySelector('.toast-content p');

      if (iconElement) {
        iconElement.setAttribute('icon', 'check-circle');
      }
      if (titleElement) {
        titleElement.textContent = 'Draft saved';
      }
      if (messageElement) {
        messageElement.textContent = 'All changes were synced successfully.';
      }

      await new Promise((resolve) => setTimeout(resolve, 1200));
      const closeButton = toastElement.querySelector('.callout-close');
      if (closeButton instanceof HTMLButtonElement) {
        closeButton.click();
      }
    };

    return html`
      <section
        class="card max-w-sm"
        .pdsCodeHeading=${'PDS.toast()'}
        .pdsCodeLabel=${'Persistent toast live updates'}
        .pdsCodeSource=${toastPersistentLiveUpdateSource}
      >
        <header>
          <h3>Persistent toast live updates</h3>
          <small class="text-muted">Set <code>returnToastElement: true</code> to get the live toast element directly and update it while visible.</small>
        </header>
        <button class="btn btn-outline" @click=${showLiveUpdateToast}>Run live update demo</button>
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
      ${PersistentToastLiveUpdate.render()}
      ${CustomTitleToast.render()}
      ${CustomHtmlToasts.render()}
      <div class="callout callout-info">
        <span class="callout-icon">
          <pds-icon icon="info" size="md"></pds-icon>
        </span>
        <div class="stack-xs">
          <strong class="callout-title">Title precedence</strong>
          <small>
            <code>options.title</code> is used when non-empty. Missing or whitespace-only values fall back to type-based labels (<em>Information</em>, <em>Success!</em>, etc.).
          </small>
          <div>
            <a href="/?path=/story/components-pds-toaster--default" target="_top">See Components/Pds Toaster story</a>
          </div>
        </div>
      </div>
    </section>
  `
};
