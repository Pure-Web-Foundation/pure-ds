import { renderCodeBlock, getCurrentTheme, preloadShiki } from './shiki.js';
import { PDS } from '#pds';

const ensureParse = () => {
  if (typeof PDS?.parse === 'function') {
    return PDS.parse;
  }
  return (html) => new DOMParser().parseFromString(html, 'text/html').body.childNodes;
};

preloadShiki();

const sampleHtml = '<div class="card"><p>Hello PDS</p></div><span>World</span>';

export default {
  title: 'PDS/PDS Object',
  tags: ['runtime', 'api', 'utilities', 'reference', 'parse'],
  parameters: {
    pds: {
      tags: ['runtime', 'api', 'reference', 'pds-parse']
    },
    docs: {
      disable: true,
      description: {
        component: 'Parse HTML strings into DOM elements using the PDS helper.'
      }
    }
  }
};

const ParseSample = {
  name: 'Parse sample HTML',
  render: () => {
    const container = document.createElement('section');
    container.className = 'card stack-md';
    container.dataset.parseExample = '';
    container.innerHTML = `
      <header>
        <h3>PDS.parse()</h3>
        <small class="text-muted">
          Parses HTML into element nodes. This example extracts tag names from a sample string.
        </small>
      </header>
      <div>
        <strong>Sample HTML</strong>
        <div class="code-sample" data-parse-code>Loading highlighted sample…</div>
      </div>
      <button class="btn" type="button" data-parse-button>Parse HTML</button>
      <pre class="text-sm" data-parse-output>Click “Parse HTML” to see the result.</pre>
    `;

    const handleParse = () => {
      const parser = ensureParse();
      const output = container.querySelector('[data-parse-output]');
      const elements = parser(sampleHtml);
      const elementList = Array.from(elements || []);
      const tags = elementList.map((el) => el.tagName.toLowerCase());

      if (output) {
        output.textContent = JSON.stringify({
          count: elements.length,
          tags
        }, null, 2);
      }
    };

    const theme = getCurrentTheme();
    const codeSample = container.querySelector('[data-parse-code]');
    renderCodeBlock(codeSample, sampleHtml, 'html', theme);

    const parseButton = container.querySelector('[data-parse-button]');
    parseButton?.addEventListener('click', handleParse);

    return container;
  }
};

export const PDSParse = {
  name: 'PDS.parse()',
  render: () => ParseSample.render()
};
