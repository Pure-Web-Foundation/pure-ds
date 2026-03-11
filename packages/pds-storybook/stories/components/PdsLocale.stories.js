import { html } from 'lit';
import { msg } from '#pds';
import { createComponentDocsPage } from '../reference/reference-docs.js';

const componentDescription = `The \`<pds-locale>\` component renders a locale switcher for configured PDS localization locales.
It keeps selection in sync with the document language and writes canonical 5-letter locale tags (for example, \`en-US\`).

---

## Quick Reference

- Requires at least two configured locales.
- Writes canonical locale values to \`<html lang>\`.
- Supports \`mode=\"compact\"\` (default alias + title) and \`mode=\"full\"\` (full Intl label text).
- Emits \`pds-locale:ready\` with availability metadata.
`;

const docsParameters = {
  description: {
    component: componentDescription,
  },
  page: createComponentDocsPage('pds-locale'),
};

export default {
  title: 'Components/pds-locale',
  tags: ['autodocs', 'locale', 'language', 'i18n', 'pds-locale'],
  parameters: {
    pds: {
      tags: ['locale', 'language', 'i18n', 'localization', 'pds-locale'],
    },
    docs: docsParameters,
  },
};

function renderLocaleExample(mode = 'compact') {
  return html`
    <div class="stack-md">
      <label class="stack-xs">
        <span data-label>${msg("Language")}</span>
        <pds-locale data-label="Language" mode="${mode}"></pds-locale>
      </label>
      
    </div>
  `;
}

export const Playground = {
  name: 'Interactive Playground',
  parameters: {
    docs: {
      description: {
        story: 'Use with configured PDS localization. Selected values persist as canonical 5-letter locale tags. Set mode="full" to render the full Intl language name in the button text.',
      },
    },
  },
  render: () => {
    setTimeout(() => {
      const locale = document.querySelector('pds-locale');
      const output = document.getElementById('pds-locale-current-lang');
      if (!locale || !output) return;

      const sync = () => {
        output.textContent = document.documentElement.getAttribute('lang') || '';
      };

      sync();
      locale.addEventListener('change', sync);
      locale.addEventListener('pds-locale:ready', sync);
    }, 0);

    return renderLocaleExample('compact');
  },
};

export const FullMode = {
  name: 'Full Intl Labels',
  parameters: {
    docs: {
      description: {
        story: 'Renders the visible option labels using full Intl language names (`mode="full"`).',
      },
    },
  },
  render: () => renderLocaleExample('full'),
};
