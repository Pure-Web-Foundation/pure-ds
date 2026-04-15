import { html } from 'lit';

if (typeof document !== 'undefined' && !customElements.get?.('pds-render')) {
  const s = document.createElement('script');
  s.type = 'module';
  s.src = '/assets/pds/components/pds-render.js';
  document.head.appendChild(s);
}

const componentDescription = `Sandboxed renderer for live preview content.

## Public Contract

| API | Type | Description |
|-----|------|-------------|
| html | string property | Updates iframe body HTML. |
| css | string property | Updates user CSS stylesheet. |
| js | string property | Updates runtime JS module and reloads preview. |
| setContent(content, options?) | method | Batch update html/css/js via one call. |
| update(content, options?) | method | Alias for setContent(content, options). |
| reload() | method | Force full iframe srcdoc rebuild. |

content shape:
- html?: string
- css?: string
- js?: string

options shape:
- reload?: boolean (default false)
`;

export default {
  title: 'Components/pds-render',
  tags: ['autodocs', 'preview', 'sandbox', 'iframe', 'pds-render'],
  parameters: {
    pds: {
      tags: ['preview', 'sandbox', 'iframe', 'pds-render', 'docs', 'playground']
    },
    docs: {
      description: {
        component: componentDescription
      }
    }
  }
};

const DEMO_HTML = `<article class="card stack-sm" style="max-width:28rem;margin:0 auto">
  <h3>Live Preview</h3>
  <p>Use the public setContent() contract to update this iframe.</p>
  <button class="btn-primary">Save</button>
</article>`;

const DEMO_CSS = `button { margin-top: .5rem; }`;

export const PublicContract = {
  name: 'Public Contract',
  render: () => {
    setTimeout(() => {
      const renderer = document.getElementById('pds-render-story');
      if (!renderer) return;
      if (typeof renderer.setContent === 'function') {
        renderer.setContent({ html: DEMO_HTML, css: DEMO_CSS }, { reload: true });
        return;
      }
      renderer.html = DEMO_HTML;
      renderer.css = DEMO_CSS;
      renderer.reload();
    }, 0);

    return html`
      <div class="stack-md">
        <p>
          This story initializes <code>&lt;pds-render&gt;</code> through the public contract only.
          No underscored fields are accessed externally.
        </p>
        <pds-render
          id="pds-render-story"
          theme="light"
          preset="default"
          height="260px"
          padding="1rem"
          bordered
        ></pds-render>
      </div>
    `;
  }
};

export const BatchedJsReload = {
  name: 'Batched JS Reload',
  render: () => {
    setTimeout(() => {
      const renderer = document.getElementById('pds-render-js-story');
      if (!renderer) return;
      const js = `console.log('pds-render public contract: js loaded');`;
      if (typeof renderer.setContent === 'function') {
        renderer.setContent({ html: DEMO_HTML, css: DEMO_CSS, js }, { reload: true });
        return;
      }
      renderer.html = DEMO_HTML;
      renderer.css = DEMO_CSS;
      renderer.js = js;
    }, 0);

    return html`
      <pds-render
        id="pds-render-js-story"
        theme="light"
        preset="default"
        height="260px"
        padding="1rem"
        bordered
      ></pds-render>
    `;
  }
};
