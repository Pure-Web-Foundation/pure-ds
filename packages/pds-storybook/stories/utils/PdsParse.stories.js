import { html } from "#pds/lit";
const ensureParse = () => {
  if (typeof window !== 'undefined' && window.PDS?.parse) {
    return window.PDS.parse;
  }
  return (html) => new DOMParser().parseFromString(html, "text/html").body.childNodes;
};

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
    const handleParse = (event) => {
      const parser = ensureParse();
      const container = event.currentTarget.closest('[data-parse-example]');
      const output = container?.querySelector('[data-parse-output]');
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

    return html`
      <section class="card stack-md" data-parse-example>
        <h3>PDS.parse()</h3>
        <p class="text-muted">
          Parses HTML into element nodes. This example extracts tag names from a sample string.
        </p>
        <div class="callout callout-info">
          <strong>Sample HTML</strong>
          <pre class="text-sm">${sampleHtml}</pre>
        </div>
        <button class="btn" @click=${handleParse}>Parse HTML</button>
        <pre class="text-sm" data-parse-output>Click “Parse HTML” to see the result.</pre>
      </section>
    `;
  }
};

export const PDSParse = {
  name: 'PDS.parse()',
  render: () => ParseSample.render()
};
