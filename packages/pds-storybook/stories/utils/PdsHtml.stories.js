import { PDS, html } from '#pds';
import { getCurrentTheme, preloadShiki, renderCodeBlock } from './shiki.js';

preloadShiki();

const experimentalBadgeHTML = '<span class="badge badge-warning">Experimental</span>';

const verboseVanillaCode = `const state = { count: 0, saving: false, showTips: false };

const save = async () => {
  if (state.saving) return;
  state.saving = true; render();
  await new Promise(r => setTimeout(r, 900));
  state.saving = false; state.count++;
  render();
};

function render() {
  host.replaceChildren();

  const article = document.createElement('article');
  article.className = 'card stack-sm';
  article.dataset.saves = String(state.count);   // attribute

  const h3 = document.createElement('h3');
  h3.textContent = \`Draft saves: \${state.count}\`;
  article.append(h3);

  const actions = document.createElement('div');
  actions.className = 'flex gap-sm';

  const saveBtn = document.createElement('button');
  saveBtn.className = 'btn-primary';
  saveBtn.textContent = state.saving ? 'Saving...' : 'Save Draft';
  saveBtn.disabled = state.saving;           // property binding
  saveBtn.addEventListener('click', save);   // named fn reference

  const tipsBtn = document.createElement('button');
  tipsBtn.className = 'btn-ghost';
  tipsBtn.textContent = 'Toggle tips';
  tipsBtn.addEventListener('click', () => {  // inline handler
    state.showTips = !state.showTips;
    render();
  });

  actions.append(saveBtn, tipsBtn);
  article.append(actions);

  const details = document.createElement('details');
  details.open = state.showTips;             // boolean property
  const summary = document.createElement('summary');
  summary.textContent = 'Tips';
  const body = document.createElement('div');
  body.className = 'card';
  body.textContent = 'Works perfectly — just a lot of ceremony.';
  details.append(summary, body);
  article.append(details);

  host.append(article);
}

render();`;

const htmlMarkerCode = `import { html } from '#pds';

const state = { count: 0, saving: false, showTips: false };

const save = async () => {
  if (state.saving) return;
  state.saving = true; render();
  await new Promise(r => setTimeout(r, 900));
  state.saving = false; state.count++;
  render();
};

function render() {
  host.replaceChildren();
  host.appendChild(html\`
    <article class="card stack-sm" data-saves=\${state.count}>
      <h3>Draft saves: \${state.count}</h3>
      <div class="flex gap-sm">
        <button class="btn-primary"
          ?disabled=\${state.saving}
          @click=\${save}>
          \${state.saving ? 'Saving...' : 'Save Draft'}
        </button>
        <button class="btn-ghost"
          @click=\${() => { state.showTips = !state.showTips; render(); }}>
          Toggle tips
        </button>
      </div>
      <details .open=\${state.showTips}>
        <summary>Tips</summary>
        <div class="card"><p>Same output, a fraction of the code.</p></div>
      </details>
    </article>
  \`);
}

render();`;

const bootstrapTemplateCode = `import { PDS, html } from '@pure-ds/core';
import { config } from '../pds.config.js';

await PDS.start(config);

const openSettingsDrawer = () => {
  const drawer = document.getElementById('settings-drawer');
  if (drawer) drawer.open = true;
};

document.body.appendChild(html\`
  <button class="icon-only btn-xs btn-outline" @click=\${openSettingsDrawer}>
    <pds-icon icon="gear"></pds-icon>
  </button>

  <pds-drawer id="settings-drawer" position="right" .open=\${false}>
    <div slot="drawer-header">Settings</div>
    <div slot="drawer-content"><pds-theme></pds-theme></div>
  </pds-drawer>
\`);`;

const makeLiveVerbose = (host) => {
  const state = { count: 0, saving: false, showTips: false };

  const save = async () => {
    if (state.saving) return;
    state.saving = true;
    render();
    await new Promise((resolve) => setTimeout(resolve, 900));
    state.saving = false;
    state.count += 1;
    render();
    await PDS.toast(`Draft saved (${state.count})`, { type: 'success', duration: 1400 });
  };

  const render = () => {
    host.replaceChildren();

    const article = document.createElement('article');
    article.className = 'card stack-sm';
    article.dataset.saves = String(state.count);

    const h3 = document.createElement('h3');
    h3.textContent = `Draft saves: ${state.count}`;
    article.append(h3);

    const actions = document.createElement('div');
    actions.className = 'flex gap-sm';

    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn-primary';
    saveBtn.textContent = state.saving ? 'Saving...' : 'Save Draft';
    saveBtn.disabled = state.saving;
    saveBtn.addEventListener('click', save);

    const tipsBtn = document.createElement('button');
    tipsBtn.className = 'btn-ghost';
    tipsBtn.textContent = 'Toggle tips';
    tipsBtn.addEventListener('click', () => {
      state.showTips = !state.showTips;
      render();
    });

    actions.append(saveBtn, tipsBtn);
    article.append(actions);

    const details = document.createElement('details');
    details.open = state.showTips;
    const summary = document.createElement('summary');
    summary.textContent = 'Tips';
    const body = document.createElement('div');
    body.className = 'card';
    body.textContent = 'Works perfectly — just a lot of ceremony.';
    details.append(summary, body);
    article.append(details);

    host.append(article);
  };

  render();
};

const makeLiveHtmlMarker = (host) => {
  const state = { count: 0, saving: false, showTips: false };

  const save = async () => {
    if (state.saving) return;
    state.saving = true;
    render();
    await new Promise((resolve) => setTimeout(resolve, 900));
    state.saving = false;
    state.count += 1;
    render();
    await PDS.toast(`Draft saved (${state.count})`, { type: 'success', duration: 1400 });
  };

  const render = () => {
    host.replaceChildren();
    host.appendChild(html`
      <article class="card stack-sm" data-saves=${state.count}>
        <h3>Draft saves: ${state.count}</h3>
        <div class="flex gap-sm">
          <button class="btn-primary" ?disabled=${state.saving} @click=${save}>
            ${state.saving ? 'Saving...' : 'Save Draft'}
          </button>
          <button class="btn-ghost"
            @click=${() => { state.showTips = !state.showTips; render(); }}>
            Toggle tips
          </button>
        </div>
        <details .open=${state.showTips}>
          <summary>Tips</summary>
          <div class="card"><p>Same output, a fraction of the code.</p></div>
        </details>
      </article>
    `);
  };

  render();
};

const createMergedCard = () => {
  const section = document.createElement('section');
  section.className = 'card stack-md max-w-4xl';
  section.innerHTML = `
    <header>
      <h3>html template marker</h3>
      <div class="flex gap-sm items-center">
        ${experimentalBadgeHTML}
        <small class="text-muted">API shape and binding semantics may evolve while we validate the pattern.</small>
      </div>
      <small class="text-muted">
        Build Lit-style templates in plain JavaScript — no Lit dependency required.
      </small>
    </header>
    <div class="callout callout-info stack-xs">      
      <div>
        Use <code>html\`...\`</code> for view fragments where <code>createElement()</code> would be noisy.        
      </div>
    </div>
    <div class="grid grid-cols-2 gap-md">
      <section class="card stack-sm">
        <strong>Verbose vanilla DOM</strong>
        <small class="text-muted">Property assignment + addEventListener — named fn &amp; inline handler</small>
        <div data-verbose-code>Loading code sample...</div>
        <div data-verbose-live class="stack-sm"></div>
      </section>
      <section class="card stack-sm">
        <strong>Concise with html marker</strong>
        <small class="text-muted">@event, ?boolean, .property — same logic, declarative bindings</small>
        <div data-marker-code>Loading code sample...</div>
        <div data-marker-live class="stack-sm"></div>
      </section>
    </div>
    <div class="stack-sm">
      <strong>Bootstrap template usage</strong>
      <div data-bootstrap-code>Loading code sample...</div>
    </div>
  `;

  const theme = getCurrentTheme();
  renderCodeBlock(section.querySelector('[data-verbose-code]'), verboseVanillaCode, 'javascript', theme);
  renderCodeBlock(section.querySelector('[data-marker-code]'), htmlMarkerCode, 'javascript', theme);
  renderCodeBlock(section.querySelector('[data-bootstrap-code]'), bootstrapTemplateCode, 'javascript', theme);

  makeLiveVerbose(section.querySelector('[data-verbose-live]'));
  makeLiveHtmlMarker(section.querySelector('[data-marker-live]'));

  return section;
};

export default {
  title: 'PDS/DOM Building',
  tags: ['autodocs', 'runtime', 'api', 'reference', 'utilities', 'pds-object', 'pds-html'],
  parameters: {
    pds: {
      tags: ['runtime', 'api', 'reference', 'pds-object', 'pds-start', 'pds-compiled', 'pds-enums', 'pds-ask', 'pds-toast', 'pds-parse', 'pds-html']
    },
    docs: {
      description: {
        component: 'Experimental API. Build DOM with the html template marker using vanilla JavaScript, including Lit-style bindings without a Lit dependency.'
      }
    }
  }
};

export const PDSHtml = {
  name: 'Using the html template marker',
  render: () => createMergedCard()
};