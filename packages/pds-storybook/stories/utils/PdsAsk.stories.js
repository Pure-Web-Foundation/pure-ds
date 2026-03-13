import { html } from '#pds/lit';
import { PDS } from '#pds';
import { ask as askFallback } from '../../../../src/js/common/ask.js';
import { toastFormData } from './toast-utils.js';
import { pdsObjectDocsParameters } from './pds-object-meta.js';

const ensureAsk = () => {
  if (PDS?.ask) {
    return PDS.ask;
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
    'ui:widget': 'richtext'
  },
  emphasis: {
    'ui:class': 'buttons'
  },
  audiences: {
    'ui:class': 'buttons'
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

const askDefaultConfirmSource = `const confirmed = await PDS.ask('This uses the default buttons and styling.');`;

const askMiniFormSource = `const result = await PDS.ask(
  html\`
    <form method="dialog" class="min-w-xs">
      <label class="gap-xs">
        <span>Name</span>
        <input name="name" required placeholder="Alex Rivera" />
      </label>
      <label class="gap-xs">
        <span>Email</span>
        <input type="email" name="email" required placeholder="alex@example.com" />
      </label>
    </form>
  \`,
  {
    title: 'Share your details',
    useForm: true,
    buttons: {
      ok: { name: 'Submit', primary: true },
      cancel: { name: 'Cancel', cancel: true }
    }
  }
);`;

const askBooleanConfirmSource = `const decision = await PDS.ask('Archive analytics project?', {
  buttons: {
    ok: { name: 'Archive project', primary: true },
    cancel: { name: 'Keep active', cancel: true }
  }
});`;

const askBeforeCloseSource = `const dialogResult = await PDS.ask(formTemplate, {
  title: 'Publish release update?',
  useForm: true,
  buttons: {
    ok: { name: 'Publish', primary: true },
    cancel: { name: 'Cancel', cancel: true }
  },
  beforeClose: async ({ actionKind }) => {
    if (actionKind !== 'ok') return true;
    const response = await fetch('/api/releases/validate-close', { method: 'POST' });
    if (!response.ok) return { allow: false };
    const payload = await response.json();
    return { allow: payload.ok === true };
  }
});`;

const askPdsFormSource = `const dialogResult = await PDS.ask(
  html\`
    <form method="dialog" class="min-w-sm">
      <pds-form
        .jsonSchema=
        .uiSchema=
        .values=
        hide-actions
      ></pds-form>
      <input type="hidden" name="spotlight" value="" />
    </form>
  \`,
  {
    title: 'Marketing spotlight',
    useForm: true,
    buttons: {
      ok: { name: 'Save changes', primary: true },
      cancel: { name: 'Cancel', cancel: true }
    }
  }
);`;

const omniboxViewportItems = [
  { id: 'alpha-roadmap', text: 'Alpha roadmap review', description: 'Planning' },
  { id: 'beta-launch', text: 'Beta launch checklist', description: 'Release' },
  { id: 'calendar-sync', text: 'Calendar sync reliability', description: 'Operations' },
  { id: 'design-ops', text: 'Design ops backlog', description: 'Design' },
  { id: 'eng-incident', text: 'Engineering incident playbook', description: 'Engineering' },
  { id: 'feature-flags', text: 'Feature flag governance', description: 'Architecture' },
  { id: 'growth-kpis', text: 'Growth KPI dashboard', description: 'Analytics' },
  { id: 'help-center', text: 'Help center migration', description: 'Support' },
  { id: 'insights', text: 'Insights weekly digest', description: 'Communication' },
  { id: 'journey-map', text: 'Journey map synthesis', description: 'Research' },
  { id: 'knowledge-base', text: 'Knowledge base IA', description: 'Content' },
  { id: 'localization', text: 'Localization rollout', description: 'Globalization' }
];

const askOmniboxViewportSettings = {
  itemGrid: '0 1fr 0',
  hideCategory: true,
  iconHandler: (item) => {
    return '';
  },
  categories: {
    Suggestions: {
      trigger: () => true,
      getItems: async (options) => {
        const q = (options.search || '').trim().toLowerCase();
        if (!q) {
          return omniboxViewportItems;
        }

        return omniboxViewportItems.filter((item) => {
          const text = `${item.text} ${item.description}`.toLowerCase();
          return text.includes(q);
        });
      }
    }
  }
};

const askOmniboxViewportSource = `const omniboxSettings = {
  itemGrid: '0 1fr 0',
  hideCategory: true,
  iconHandler: (item) => {
    return '';
  },
  categories: {
    Suggestions: {
      trigger: () => true,
      getItems: async (options) => {
        const q = (options.search || '').trim().toLowerCase();
        return q ? items.filter((item) => (\`${'${item.text}'} ${'${item.description}'}\`).toLowerCase().includes(q)) : items;
      }
    }
  }
};

const result = await PDS.ask(
  html\`
    <form method="dialog" class="stack-sm min-w-sm">
      <p class="text-muted">Type to open suggestions. The list can escape dialog height constraints.</p>
      <pds-omnibox
        id="ask-omnibox"
        name="query"
        placeholder="Try: roadmap, design, launch"
      ></pds-omnibox>
    </form>
  \`,
  {
    title: 'Omnibox in ask dialog',
    useForm: true,
    maxHeight: '360px',
    buttons: {
      ok: { name: 'Select', primary: true },
      cancel: { name: 'Close', cancel: true }
    },
    rendered(dialog) {
      const applySettings = () => {
        const omnibox = dialog.querySelector('#ask-omnibox');
        if (omnibox) {
          omnibox.settings = omniboxSettings;
        }
      };

      if (typeof customElements?.whenDefined === 'function') {
        customElements.whenDefined('pds-omnibox').then(applySettings);
      } else {
        applySettings();
      }
    }
  }
);`;

export default {
  title: 'PDS/PDS Object',
  tags: ['autodocs', 'runtime', 'api', 'reference', 'utilities', 'pds-object', 'interaction', 'dialogs', 'forms', 'modal', 'dialog', 'alert', 'confirm', 'prompt', 'popup', 'overlay'],
  parameters: {
    pds: {
      tags: ['runtime', 'api', 'reference', 'pds-object', 'pds-start', 'pds-compiled', 'pds-enums', 'pds-ask', 'pds-toast', 'pds-parse', 'interaction', 'dialogs', 'forms', 'modal', 'alert', 'confirm', 'prompt']
    },
    docs: pdsObjectDocsParameters
  }
};

const AreYouSure = {
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
      <section
        data-ask-example
        class="card max-w-sm"
        .pdsCodeHeading=${'PDS.ask()'}
        .pdsCodeLabel=${'Default confirm dialog'}
        .pdsCodeSource=${askDefaultConfirmSource}
      >
        <h3>Default confirm dialog</h3>
        <p>
          No custom options supplied—just a message string. The helper wires up buttons, focus, and the promise result for you.
        </p>
        <button class="btn" @click=${handleClick}>Ask "Are you sure?"</button>
        <small data-status class="text-muted">Waiting…</small>
      </section>
    `;
  }
};

const MiniFormSubmission = {
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
          <form method="dialog" class="min-w-xs">
            <label class="gap-xs">
              <span>Name</span>
              <input name="name" required placeholder="Alex Rivera" />
            </label>
            <label class="gap-xs">
              <span>Email</span>
              <input type="email" name="email" required placeholder="alex@example.com" />
            </label>
            <label class="gap-xs">
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
      <section
        data-ask-example
        class="card max-w-sm"
        .pdsCodeHeading=${'PDS.ask()'}
        .pdsCodeLabel=${'Mini form submission'}
        .pdsCodeSource=${askMiniFormSource}
      >
        <h3>Collect a few fields</h3>
        <p>
          A plain HTML form inside the dialog captures values through <code>FormData</code> when the OK button fires.
        </p>
        <button class="btn btn-primary" @click=${handleClick}>Open mini form</button>
        <small data-status class="text-muted">No submission yet.</small>
      </section>
    `;
  }
};

const BooleanConfirmFlow = {
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
          <div class="stack-sm">
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
      <section
        data-ask-example
        class="card max-w-sm"
        .pdsCodeHeading=${'PDS.ask()'}
        .pdsCodeLabel=${'Boolean confirm flow'}
        .pdsCodeSource=${askBooleanConfirmSource}
      >
        <h3>Lightweight confirmations</h3>
        <p>
          Click the button to open a fully styled modal dialog. When it resolves, the promise gives you a
          boolean — ideal for gating destructive actions without wiring any extra event listeners.
        </p>
        <button class="btn btn-primary" @click=${handleClick}>Archive project</button>
        <small data-status class="text-muted">No dialog shown yet.</small>
      </section>
    `;
  }
};

const AsyncServerValidationGate = {
  name: 'Async server validation gate',
  render: () => {
    const handleClick = async (event) => {
      const ask = ensureAsk();
      const container = event.currentTarget.closest('[data-ask-example]');
      const status = container?.querySelector('[data-status]');
      let validationAttempts = 0;

      if (status) {
        status.textContent = 'Opening publish gate…';
      }

      const dialogResult = await ask(
        html`
          <form method="dialog" class="min-w-sm">
            <label>
              <span>Release title</span>
              <input name="releaseTitle" required placeholder="Q2 Launch Readiness" />
            </label>
            <p data-server-feedback class="text-muted">
              The first submit is rejected to simulate server-side validation.
            </p>
          </form>
        `,
        {
          title: 'Publish release update?',
          useForm: true,
          buttons: {
            ok: { name: 'Publish', primary: true },
            cancel: { name: 'Cancel', cancel: true }
          },
          beforeClose: async ({ actionKind, dialog }) => {
            if (actionKind !== 'ok') {
              return true;
            }

            const submitBtn = dialog.querySelector('button[value="ok"]');
            const feedback = dialog.querySelector('[data-server-feedback]');
            submitBtn?.classList.add('btn-working');

            try {
              if (feedback) {
                feedback.textContent = 'Validating with server…';
              }

              await new Promise((resolve) => setTimeout(resolve, 900));
              validationAttempts += 1;

              if (validationAttempts === 1) {
                if (feedback) {
                  feedback.textContent = 'Server rejected this attempt. Click Publish again to pass.';
                }

                return {
                  allow: false,
                  reason: 'simulated-server-reject'
                };
              }

              if (feedback) {
                feedback.textContent = 'Server validation passed. Closing…';
              }

              return { allow: true };
            } finally {
              submitBtn?.classList.remove('btn-working');
            }
          }
        }
      );

      if (dialogResult instanceof FormData) {
        const payload = formDataToObject(dialogResult);
        if (status) {
          status.textContent = `✅ Published: ${payload.releaseTitle || 'Untitled release'}`;
        }
        await toastFormData({
          ...payload,
          scenario: 'before-close-server-gate'
        });
      } else {
        if (status) {
          status.textContent = 'Publish flow cancelled';
        }
        await toastFormData({ cancelled: true, scenario: 'before-close-server-gate' });
      }
    };

    return html`
      <section
        data-ask-example
        class="card max-w-sm"
        .pdsCodeHeading=${'PDS.ask()'}
        .pdsCodeLabel=${'Server-side close validation'}
        .pdsCodeSource=${askBeforeCloseSource}
      >
        <h3>Server-side close validation</h3>
        <p>
          This scenario uses <code>beforeClose</code> to run an async check before the dialog can close.
          The first publish attempt is rejected and keeps the dialog open; the second attempt passes.
        </p>
        <button class="btn btn-primary" @click=${handleClick}>Open validation gate</button>
        <small data-status class="text-muted">No validation run yet.</small>
      </section>
    `;
  }
};

const OmniboxViewportBehavior = {
  name: 'Omnibox viewport behavior',
  render: () => {
    const handleClick = async (event) => {
      const ask = ensureAsk();
      const container = event.currentTarget.closest('[data-ask-example]');
      const status = container?.querySelector('[data-status]');

      if (status) {
        status.textContent = 'Opening omnibox dialog…';
      }

      const dialogResult = await ask(
        html`
          <form method="dialog" class="stack-sm min-w-sm">
            <p class="text-muted">
              Type to open suggestions. This dialog has a short max height, but the omnibox list is viewport-positioned.
            </p>
            <pds-omnibox
              id="ask-omnibox"
              name="query"
              placeholder="Try: roadmap, design, launch"
            ></pds-omnibox>
            <small class="text-muted">Move the browser viewport to see the list flip up/down as space changes.</small>
          </form>
        `,
        {
          title: 'Omnibox in ask dialog',
          useForm: true,
          maxHeight: '360px',
          buttons: {
            ok: { name: 'Select', primary: true },
            cancel: { name: 'Close', cancel: true }
          },
          rendered(dialog) {
            const applySettings = () => {
              const omnibox = dialog.querySelector('#ask-omnibox');
              if (!omnibox) return;
              omnibox.settings = askOmniboxViewportSettings;
            };

            if (typeof customElements?.whenDefined === 'function') {
              customElements.whenDefined('pds-omnibox').then(applySettings);
            } else {
              applySettings();
            }
          }
        }
      );

      if (dialogResult instanceof FormData) {
        const payload = formDataToObject(dialogResult);
        if (status) {
          status.textContent = payload.query
            ? `Selected query: ${payload.query}`
            : 'Dialog submitted with no query value';
        }
        await toastFormData({ ...payload, scenario: 'omnibox-viewport-behavior' });
      } else {
        if (status) {
          status.textContent = 'Dialog cancelled';
        }
      }
    };

    return html`
      <section
        data-ask-example
        class="card max-w-sm"
        .pdsCodeHeading=${'PDS.ask()'}
        .pdsCodeLabel=${'Omnibox escapes dialog height'}
        .pdsCodeSource=${askOmniboxViewportSource}
      >
        <h3>Omnibox in constrained dialog</h3>
        <p>
          This example mounts <code>&lt;pds-omnibox&gt;</code> inside a short-height dialog.
          Its suggestion panel is not clipped by the dialog container and repositions with viewport space.
        </p>
        <button class="btn btn-outline" @click=${handleClick}>Open omnibox dialog</button>
        <small data-status class="text-muted">No selection yet.</small>
      </section>
    `;
  }
};

const EmbedPdsFormSubform = {
  name: 'Embed a pds-form subform',
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
          <form method="dialog">
            <pds-form
              id="spotlight-form"
              .jsonSchema=${marketingSchema}
              .uiSchema=${marketingUiSchema}
              .values=${marketingInitialValues}
              hide-actions
            ></pds-form>
            <input type="hidden" name="spotlight" value="" />
          </form>
        `,
        {
          title: 'Marketing spotlight',
          useForm: true,
          maxHeight: '500px',
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
                customElements.whenDefined('pds-form').then(() => syncHidden());
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
      <section
        data-ask-example
        class="card max-w-sm"
        .pdsCodeHeading=${'PDS.ask()'}
        .pdsCodeLabel=${'Embed a pds-form subform'}
        .pdsCodeSource=${askPdsFormSource}
      >
        <h3>Deep editing workflows</h3>
        <p>
          Use <code>PDS.ask()</code> with <code>useForm: true</code> to mount an entire <code>&lt;pds-form&gt;</code>
          inside the dialog. The promise resolves with the form data, letting you merge the changes into the parent flow.
        </p>
        <button class="btn btn-outline" @click=${handleClick}>Edit spotlight copy</button>
        <small data-status class="text-muted">No edits made yet.</small>
      </section>
    `;
  }
};

export const PDSAsk = {
  name: 'PDS.ask()',
  render: () => html`
    <section class="stack-lg">
      ${AreYouSure.render()}
      ${MiniFormSubmission.render()}
      ${BooleanConfirmFlow.render()}
      ${AsyncServerValidationGate.render()}
      ${OmniboxViewportBehavior.render()}
      ${EmbedPdsFormSubform.render()}
    </section>
  `
};
