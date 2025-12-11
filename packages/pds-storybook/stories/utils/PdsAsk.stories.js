import { html } from 'lit';
import { ask as askFallback } from '../../../../src/js/common/ask.js';
import { toastFormData } from './toast-utils.js';

const ensureAsk = () => {
  if (typeof window !== 'undefined' && window.PDS?.ask) {
    return window.PDS.ask;
  }
  return askFallback;
};

const marketingSchema = {
  type: 'object',
  properties: {
    headline: {
      type: 'string',
      title: 'Headline',
      minLength: 10,
      examples: ['Supercharge collaboration across your org']
    },
    description: {
      type: 'string',
      title: 'Supporting copy',
      minLength: 20,
      examples: ['Surface key metrics, share insights instantly, and keep every team aligned.']
    },
    ctaLabel: {
      type: 'string',
      title: 'CTA label',
      default: 'Schedule a demo'
    },
    emphasis: {
      type: 'string',
      title: 'Visual style',
      enum: ['balanced', 'quiet', 'loud'],
      default: 'balanced'
    },
    audiences: {
      type: 'array',
      title: 'Target audiences',
      items: {
        type: 'string',
        enum: ['Design Leadership', 'Product Teams', 'Engineering', 'Marketing']
      },
      uniqueItems: true
    }
  },
  required: ['headline', 'description', 'ctaLabel']
};

const marketingUiSchema = {
  description: {
    'ui:widget': 'textarea',
    'ui:options': {
      rows: 3
    }
  },
  audiences: {
    'ui:widget': 'checkboxes'
  }
};

const marketingInitialValues = {
  headline: 'Supercharge collaboration across your org',
  description: 'Surface key metrics, share insights instantly, and keep every team aligned.',
  ctaLabel: 'Schedule a demo',
  emphasis: 'balanced',
  audiences: ['Design Leadership', 'Product Teams']
};

const formDataToObject = (formData) => {
  const entries = Object.fromEntries(formData.entries());
  return entries;
};

const askStoryStyles = html`
  <style>
    .ask-card {
      padding: var(--spacing-6, 1.5rem);
      border: 1px solid var(--surface-border, rgba(0, 0, 0, 0.08));
      border-radius: var(--radius-lg, 16px);
      background: var(--surface-base, #ffffff);
    }
    .ask-card--sm {
      max-width: 26.25rem;
    }
    .ask-card--md {
      max-width: 30rem;
    }
    .ask-card--lg {
      max-width: 32.5rem;
    }
    .ask-card--xl {
      max-width: 38.75rem;
    }
    .ask-card-heading {
      margin: 0;
    }
    .ask-card-status {
      margin: 0;
      color: var(--surface-muted-text, rgba(0, 0, 0, 0.6));
    }
    .ask-card-list {
      padding-left: var(--spacing-6, 1.5rem);
    }
    .ask-dialog-form {
      min-width: 22.5rem;
    }
    .ask-dialog-form--wide {
      min-width: 30rem;
    }
  </style>
`;

export default {
  title: 'Utilities/PDS ask',
  tags: ['interaction', 'dialogs', 'forms'],
  parameters: {
    pds: {
      tags: ['interaction', 'dialogs', 'forms', 'pds-ask']
    },
    docs: {
      description: {
        component: `The \`PDS.ask()\` helper wraps the native \`<dialog>\` element with PDS styling and a promise-based API.
Use it to collect quick confirmations or to stage entire forms before committing data back to the host application.`
      }
    }
  }
};

export const BareConfirm = {
  name: 'Are you sure?',
  render: () => {
    const handleClick = async (event) => {
      const ask = ensureAsk();
      const container = event.currentTarget.closest('[data-ask-example]');
      const status = container?.querySelector('[data-status]');

      if (status) {
        status.textContent = 'Asking…';
      }

      const confirmed = await ask('This uses the default buttons and styling.');

      if (status) {
        status.textContent = confirmed
          ? '✅ User confirmed the action.'
          : '❎ User cancelled.';
      }

      await toastFormData({ confirmed, scenario: 'bare-confirm' });
    };

    return html`
      ${askStoryStyles}
      <section
        data-ask-example
        class="ask-card ask-card--sm flex flex-col gap-md"
      >
        <h3 class="ask-card-heading">Default confirm dialog</h3>
        <p>
          No custom options supplied—just a message string. The helper wires up buttons, focus, and the promise result for you.
        </p>
        <button class="btn" @click=${handleClick}>Ask “Are you sure?”</button>
        <p data-status class="ask-card-status">Waiting…</p>
      </section>
    `;
  }
};

export const SimpleForm = {
  name: 'Mini form submission',
  render: () => {
    const handleClick = async (event) => {
      const ask = ensureAsk();
      const container = event.currentTarget.closest('[data-ask-example]');
      const status = container?.querySelector('[data-status]');

      if (status) {
        status.textContent = 'Opening form…';
      }

      const result = await ask(
        html`
          <form method="dialog" class="ask-dialog-form flex flex-col gap-sm">
            <label class="flex flex-col gap-xs">
              <span>Name</span>
              <input name="name" required placeholder="Alex Rivera" />
            </label>
            <label class="flex flex-col gap-xs">
              <span>Email</span>
              <input type="email" name="email" required placeholder="alex@example.com" />
            </label>
            <label class="flex flex-col gap-xs">
              <span>Team size</span>
              <select class="select" name="teamSize">
                <option value="1-5">1-5</option>
                <option value="6-20">6-20</option>
                <option value="21-100">21-100</option>
                <option value="101+">101+</option>
              </select>
            </label>
          </form>
        `,
        {
          title: 'Share your details',
          useForm: true,
          buttons: {
            ok: { name: 'Submit', primary: true },
            cancel: { name: 'Cancel', cancel: true }
          }
        }
      );

      if (result instanceof FormData) {
        if (status) {
          status.textContent = '✅ Submitted! (check toast for values)';
        }
        await toastFormData(result);
      } else {
        if (status) {
          status.textContent = 'Submission cancelled.';
        }
        await toastFormData({ cancelled: true, scenario: 'simple-form' });
      }
    };

    return html`
      ${askStoryStyles}
      <section
        data-ask-example
        class="ask-card ask-card--md flex flex-col gap-md"
      >
        <h3 class="ask-card-heading">Collect a few fields</h3>
        <p>
          A plain HTML form inside the dialog captures values through <code>FormData</code> when the OK button fires.
        </p>
        <button class="btn btn-primary" @click=${handleClick}>Open mini form</button>
        <p data-status class="ask-card-status">No submission yet.</p>
      </section>
    `;
  }
};

export const QuickConfirm = {
  name: 'Boolean confirm flow',
  render: () => {
    const handleClick = async (event) => {
      const ask = ensureAsk();
      const container = event.currentTarget.closest('[data-ask-example]');
      const status = container?.querySelector('[data-status]');

      if (status) {
        status.textContent = 'Waiting for a decision…';
      }

      const decision = await ask(
        html`
          <div class="flex flex-col gap-sm">
            <p>This dialog comes from <code>PDS.ask()</code> and resolves with a simple boolean.</p>
            <ul class="ask-card-list list-disc">
              <li>Handles focus trapping and ESC cancel automatically.</li>
              <li>Resolves to <code>true</code> when the primary button is pressed.</li>
              <li>Returns <code>false</code> if the user cancels or closes the dialog.</li>
            </ul>
          </div>
        `,
        {
          title: 'Archive analytics project?',
          buttons: {
            ok: { name: 'Archive project', primary: true },
            cancel: { name: 'Keep active', cancel: true }
          }
        }
      );

      if (decision) {
        if (status) {
          status.textContent = '✅ Archived via PDS.ask()';
        }
        await toastFormData({ confirmed: true, action: 'archive-project' });
      } else {
        if (status) {
          status.textContent = '✋ Cancelled — nothing changed';
        }
        await toastFormData({ confirmed: false, action: 'archive-project' });
      }
    };

    return html`
      ${askStoryStyles}
      <section
        data-ask-example
        class="ask-card ask-card--lg flex flex-col gap-md"
      >
        <h3 class="ask-card-heading">Lightweight confirmations</h3>
        <p>
          Click the button to open a fully styled modal dialog. When it resolves, the promise gives you a
          boolean — ideal for gating destructive actions without wiring any extra event listeners.
        </p>
        <button class="btn btn-primary" @click=${handleClick}>Archive project</button>
        <p data-status class="ask-card-status">No dialog shown yet.</p>
      </section>
    `;
  }
};

export const JsonformSubdialog = {
  name: 'Embed a pds-jsonform subform',
  render: () => {
    const handleClick = async (event) => {
      const ask = ensureAsk();
      const container = event.currentTarget.closest('[data-ask-example]');
      const status = container?.querySelector('[data-status]');

      if (status) {
        status.textContent = 'Opening editor…';
      }

      const dialogResult = await ask(
        html`
          <form method="dialog" class="ask-dialog-form ask-dialog-form--wide flex flex-col gap-md">
            <pds-jsonform
              id="spotlight-form"
              .jsonSchema=${marketingSchema}
              .uiSchema=${marketingUiSchema}
              .values=${marketingInitialValues}
              hide-actions
            ></pds-jsonform>
            <input type="hidden" name="spotlight" value="" />
          </form>
        `,
        {
          title: 'Marketing spotlight',
          useForm: true,
          buttons: {
            ok: { name: 'Save changes', primary: true },
            cancel: { name: 'Cancel', cancel: true }
          },
          rendered(dialog) {
            const form = dialog.querySelector('form');
            const subform = dialog.querySelector('#spotlight-form');
            const hidden = dialog.querySelector('input[name="spotlight"]');

            const syncHidden = (payload) => {
              if (!hidden) return;
              const nextValue =
                payload?.json ??
                payload?.value ??
                (() => {
                  if (!subform?.serialize) return undefined;
                  try {
                    const { json } = subform.serialize();
                    return json;
                  } catch (error) {
                    return { error: error?.message || 'Failed to serialize' };
                  }
                })();

              hidden.value = JSON.stringify(nextValue ?? {});
            };

            if (subform) {
              const handleValueChange = (evt) => syncHidden(evt.detail);
              subform.addEventListener('pw:value-change', handleValueChange);
              subform.addEventListener('pw:submit', (evt) => {
                evt.preventDefault();
                syncHidden(evt.detail);
                const submitter = form?.querySelector('button[value="ok"]') || undefined;
                form?.requestSubmit(submitter);
              });

              if (typeof customElements?.whenDefined === 'function') {
                customElements.whenDefined('pds-jsonform').then(() => syncHidden());
              } else {
                syncHidden();
              }
            }
          }
        }
      );

      if (dialogResult instanceof FormData) {
        await toastFormData(dialogResult);
        const asObject = formDataToObject(dialogResult);
        let parsed;
        try {
          parsed = asObject.spotlight ? JSON.parse(asObject.spotlight) : null;
        } catch (error) {
          parsed = null;
        }

        if (status) {
          const headline = parsed?.headline || 'Draft saved';
          status.textContent = `✅ Saved: ${headline}`;
        }
      } else {
        if (status) {
          status.textContent = 'Dialog cancelled — existing content preserved';
        }
      }
    };

    return html`
      ${askStoryStyles}
      <section
        data-ask-example
        class="ask-card ask-card--xl flex flex-col gap-md"
      >
        <h3 class="ask-card-heading">Deep editing workflows</h3>
        <p>
          Use <code>PDS.ask()</code> with <code>useForm: true</code> to mount an entire <code>&lt;pds-jsonform&gt;</code>
          inside the dialog. The promise resolves with the form data, letting you merge the changes into the parent flow.
        </p>
        <button class="btn btn-outline" @click=${handleClick}>Edit spotlight copy</button>
        <p data-status class="ask-card-status">No edits made yet.</p>
      </section>
    `;
  }
};
