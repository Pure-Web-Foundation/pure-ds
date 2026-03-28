import { PDS, html, State, createReactiveComponent, bindState } from '#pds';

const basicStateExample = `import { html, State } from '#pds';

// Create a reactive state container
const state = new State({ count: 0, saving: false });

// Listen for changes
state.on('change:count', (e) => {
  console.log('Count changed to:', e.detail.value);
});

// Mutations automatically fire events
state.count++;  // Fires both 'change' and 'change:count' events`;

const manualRenderExample = `import { html, State } from '#pds';

const state = new State({ count: 0, saving: false, showTips: false });

const save = async () => {
  if (state.saving) return;
  state.saving = true; 
  render(); // Re-render on each change
  
  await new Promise(r => setTimeout(r, 900));
  state.saving = false;
  state.count++;
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
        <div class="card"><p>Manual render on every state change.</p></div>
      </details>
    </article>
  \`);
}

render();
// OR: set up auto-render on state changes
state.on('change', render);`;

const autoRenderExample = `import { html, createReactiveComponent } from '#pds';

const state = createReactiveComponent(
  { count: 0, saving: false, showTips: false },
  (state) => html\`
    <article class="card stack-sm" data-saves=\${state.count}>
      <h3>Draft saves: \${state.count}</h3>
      <div class="flex gap-sm">
        <button class="btn-primary"
          ?disabled=\${state.saving}
          @click=\${async () => {
            state.saving = true;
            await new Promise(r => setTimeout(r, 900));
            state.saving = false; state.count++;
          }}>
          \${state.saving ? 'Saving...' : 'Save Draft'}
        </button>
        <button class="btn-ghost"
          @click=\${() => { state.showTips = !state.showTips; }}>
          Toggle tips
        </button>
      </div>
      <details .open=\${state.showTips}>
        <summary>Tips</summary>
        <div class="card"><p>Automatically re-renders on state changes!</p></div>
      </details>
    </article>
  \`,
  document.body  // Container
);

// Every state mutation automatically updates the DOM
setInterval(() => { state.count++; }, 3000);`;

const bindStateExample = `import { html, State, bindState } from '#pds';

const state = new State({ count: 0, saving: false });

// Create the initial HTML
const article = document.createElement('article');
article.className = 'card stack-sm';
document.body.appendChild(article);

// Bind state properties to update handlers
const unbind = bindState(article, state, {
  count: (el, value) => {
    el.dataset.saves = value;
    const h3 = el.querySelector('h3');
    if (h3) h3.textContent = \`Draft saves: \${value}\`;
  },
  saving: (el, value) => {
    const btn = el.querySelector('button');
    if (btn) {
      btn.disabled = value;
      btn.textContent = value ? 'Saving...' : 'Save Draft';
    }
  }
});

// Mutations trigger the bound handlers
state.count++;   // Updates el.dataset.saves and h3 text
state.saving++;  // Updates button state

// Later: clean up listeners
// unbind();`;

export default {
  title: 'PDS/State Management',
  tags: ['utilities', 'reactive', 'state', 'experimental'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Experimental API. Reactive state helpers for manual render loops, automatic re-rendering, partial binding updates, and state change events.'
      }
    },
  },
};

export const BasicStatePattern = {
  render: () => {
    const div = document.createElement('div');
    div.className = 'stack-lg';

    div.appendChild(html`
      <div class="stack-sm text-muted">
        <div class="flex gap-sm items-center">
          <span class="badge badge-warning">Experimental</span>
          <small class="text-muted">State APIs are still evolving and may change.</small>
        </div>
        <p><strong>State Class:</strong> A reactive proxy wrapper that fires custom events on property mutations.</p>
        <p><code>state.on('change:propertyName', handler)</code> listens for specific property changes.</p>
        <p><code>state.on('change', handler)</code> listens for any property change.</p>
      </div>
      <pds-code lang="javascript">${basicStateExample}</pds-code>
    `);

    return div;
  },
};

export const ManualRenderApproach = {
  render: () => {
    const div = document.createElement('div');
    div.className = 'stack-lg';

    div.appendChild(html`
      <div class="stack-sm text-muted">
        <div class="flex gap-sm items-center">
          <span class="badge badge-warning">Experimental</span>
          <small class="text-muted">State APIs are still evolving and may change.</small>
        </div>
        <p><strong>Manual Render Approach:</strong> You call <code>render()</code> when state changes, or use <code>state.on('change', render)</code>.</p>
        <p>This gives you full control over when and what gets re-rendered.</p>
      </div>
    `);

    // Live demo
    const demoContainer = document.createElement('div');
    const demo = document.createElement('article');
    demo.className = 'card stack-sm';
    demoContainer.appendChild(demo);
    div.appendChild(demoContainer);

    const state = new State({ count: 0, saving: false, showTips: false });

    const save = async () => {
      if (state.saving) return;
      state.saving = true;
      render();
      await new Promise(r => setTimeout(r, 900));
      state.saving = false;
      state.count++;
      render();
    };

    function render() {
      demo.replaceChildren();
      demo.appendChild(html`
        <article class="card stack-sm" data-saves=${state.count}>
          <h3>Draft saves: ${state.count}</h3>
          <div class="flex gap-sm">
            <button class="btn-primary"
              ?disabled=${state.saving}
              @click=${save}>
              ${state.saving ? 'Saving...' : 'Save Draft'}
            </button>
            <button class="btn-ghost"
              @click=${() => { state.showTips = !state.showTips; render(); }}>
              Toggle tips
            </button>
          </div>
          <details .open=${state.showTips}>
            <summary>Tips</summary>
            <div class="card"><p>Works perfectly — you control the render timing.</p></div>
          </details>
        </article>
      `);
    }

    render();
    
    div.appendChild(html`
      <pds-code lang="javascript">${manualRenderExample}</pds-code>
    `);

    return div;
  },
};

export const AutomaticRenderApproach = {
  render: () => {
    const div = document.createElement('div');
    div.className = 'stack-lg';

    div.appendChild(html`
      <div class="stack-sm text-muted">
        <div class="flex gap-sm items-center">
          <span class="badge badge-warning">Experimental</span>
          <small class="text-muted">State APIs are still evolving and may change.</small>
        </div>
        <p><strong>Automatic Render Approach:</strong> Use <code>createReactiveComponent()</code> to auto-render on state changes.</p>
        <p>Every state mutation triggers a re-render — no manual <code>render()</code> calls needed!</p>
      </div>
    `);

    // Live demo
    const demoContainer = document.createElement('div');
    demoContainer.className = 'stack-sm';
    div.appendChild(demoContainer);

    const state = createReactiveComponent(
      { count: 0, saving: false, showTips: false },
      (state) => html`
        <article class="card stack-sm" data-saves=${state.count}>
          <h3>Draft saves: ${state.count}</h3>
          <div class="flex gap-sm">
            <button class="btn-primary"
              ?disabled=${state.saving}
              @click=${async () => {
                if (state.saving) return;
                state.saving = true;
                await new Promise(r => setTimeout(r, 900));
                state.saving = false;
                state.count++;
              }}>
              ${state.saving ? 'Saving...' : 'Save Draft'}
            </button>
            <button class="btn-ghost"
              @click=${() => { state.showTips = !state.showTips; }}>
              Toggle tips
            </button>
          </div>
          <details .open=${state.showTips}>
            <summary>Tips</summary>
            <div class="card"><p>Auto-updates — mutations trigger re-renders automatically!</p></div>
          </details>
        </article>
      `,
      demoContainer
    );
    
    div.appendChild(html`
      <pds-code lang="javascript">${autoRenderExample}</pds-code>
    `);

    return div;
  },
};

export const BindStatePartialUpdates = {
  render: () => {
    const div = document.createElement('div');
    div.className = 'stack-lg';

    div.appendChild(html`
      <div class="stack-sm text-muted">
        <div class="flex gap-sm items-center">
          <span class="badge badge-warning">Experimental</span>
          <small class="text-muted">State APIs are still evolving and may change.</small>
        </div>
        <p><strong>Bind State Approach:</strong> Use <code>bindState()</code> for partial, surgery updates without full re-renders.</p>
        <p>Perfect when you want to update specific elements without re-rendering the entire component.</p>
      </div>
    `);

    // Live demo
    const demoContainer = document.createElement('div');
    const demo = document.createElement('article');
    demo.className = 'card stack-sm';
    demo.appendChild(html`
      <h3>Draft saves: <span id="save-count">0</span></h3>
      <div class="flex gap-sm">
        <button class="btn-primary" id="save-btn">Save Draft</button>
        <button class="btn-ghost" id="tips-btn">Toggle tips</button>
      </div>
      <details id="tips">
        <summary>Tips</summary>
        <div class="card"><p>Partial updates — only changed elements re-render.</p></div>
      </details>
    `);
    demoContainer.appendChild(demo);
    div.appendChild(demoContainer);

    const state = new State({ count: 0, saving: false, showTips: false });

    const unbind = bindState(demo, state, {
      count: (el, value) => {
        el.dataset.saves = value;
        const span = el.querySelector('#save-count');
        if (span) span.textContent = value;
      },
      saving: (el, value) => {
        const btn = el.querySelector('#save-btn');
        if (btn) {
          btn.disabled = value;
          btn.textContent = value ? 'Saving...' : 'Save Draft';
        }
      },
      showTips: (el, value) => {
        const details = el.querySelector('#tips');
        if (details) details.open = value;
      },
    });

    const saveBtn = demo.querySelector('#save-btn');
    const tipsBtn = demo.querySelector('#tips-btn');

    saveBtn?.addEventListener('click', async () => {
      if (state.saving) return;
      state.saving = true;
      await new Promise(r => setTimeout(r, 900));
      state.saving = false;
      state.count++;
    });

    tipsBtn?.addEventListener('click', () => {
      state.showTips = !state.showTips;
    });
    
    div.appendChild(html`
      <pds-code lang="javascript">${bindStateExample}</pds-code>
    `);

    return div;
  },
};

export const EventListeningPattern = {
  render: () => {
    const div = document.createElement('div');
    div.className = 'stack-lg';

    div.appendChild(html`
      <div class="stack-sm text-muted">
        <div class="flex gap-sm items-center">
          <span class="badge badge-warning">Experimental</span>
          <small class="text-muted">State APIs are still evolving and may change.</small>
        </div>
        <p><strong>Event Listening:</strong> State emits two types of custom events:</p>
        <ul class="stack-xs">
          <li><code>'change'</code> — Fired for any property change. Detail: { property, value, oldValue, state }</li>
          <li><code>'change:propertyName'</code> — Fired when a specific property changes. Detail: { property, value, oldValue }</li>
        </ul>
        <p>Use <code>.on()</code>, <code>.once()</code>, and <code>.off()</code> to manage listeners.</p>
      </div>
    `);

    // Live demo
    const demo = document.createElement('article');
    demo.className = 'card stack-sm';

    const state = new State({ count: 0, email: '', debug: false });

    const output = document.createElement('div');
    output.className = 'card surface-secondary text-sm';
    output.style.fontFamily = 'monospace';
    output.style.whiteSpace = 'pre-wrap';
    output.style.wordBreak = 'break-word';

    const addLog = (msg) => {
      const timestamp = new Date().toLocaleTimeString();
      output.textContent = `[${timestamp}] ${msg}\n` + output.textContent;
    };

    // Listen to all changes
    state.on('change', (e) => {
      addLog(`All changes: ${e.detail.property} = ${JSON.stringify(e.detail.value)}`);
    });

    // Listen to specific property
    state.on('change:count', (e) => {
      addLog(`count changed: ${e.detail.oldValue} → ${e.detail.value}`);
    });

    state.on('change:email', (e) => {
      addLog(`email changed to: ${e.detail.value}`);
    });

    const controls = html`
      <div class="stack-sm">
        <div class="flex gap-sm">
          <button class="btn-sm btn-primary" @click=${() => { state.count++; }}>
            Increment count
          </button>
          <button class="btn-sm btn-secondary" @click=${() => { state.count--; }}>
            Decrement count
          </button>
        </div>
        <input 
          type="email" 
          placeholder="Change email"
          @change=${(e) => { state.email = e.target.value; }} />
      </div>
      <div class="flex gap-sm">
        <button class="btn-sm btn-outline" @click=${() => { 
          state.once('change', (e) => addLog('One-time listener triggered!'));
          state.count++;
        }}>
          Trigger once() listener
        </button>
      </div>
    `;

    demo.appendChild(controls);
    demo.appendChild(document.createElement('hr'));
    demo.appendChild(output);

    div.appendChild(demo);

    return div;
  },
};
