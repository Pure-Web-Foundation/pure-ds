import {LitElement, html, css, nothing} from '/assets/js/lit.js';

class TabPanel extends LitElement {
  static properties = {
    label: {type: String, reflect: true},
    id: {type: String, reflect: true}
  };

  // Render into light DOM so #hash targets and page CSS work naturally
  createRenderRoot() { return this; }

  render() {
    // The host <tab-panel> becomes a semantic section with the given id.
    // Consumers can style [data-tabpanel] or section[hidden] as needed.
    return html`
      <section
        id=${this.id}
        role="region"
        aria-label=${this.label ?? this.id ?? 'Tab panel'}
        data-tabpanel
      >
        <slot></slot>
      </section>
    `;
  }
}
customElements.define('tab-panel', TabPanel);

class TabStrip extends LitElement {
  static properties = {
    // currently selected panel id (derived from location.hash or first panel)
    selected: {type: String},
    // optional label for the nav (improves a11y)
    label: {type: String, reflect: true}
  };

  static styles = css`
    :host { display: block; }
    nav { display: flex; gap: .5rem; align-items: center; }
    a[aria-current="page"] { font-weight: 600; text-decoration: underline; }
    [hidden] { display: none !important; }
  `;

  #mo;
  #panels = [];

  createRenderRoot() { return this; } // light DOM so anchors/ids just work

  connectedCallback() {
    super.connectedCallback();
    this.#collectPanels();
    this.#mo = new MutationObserver(() => this.#collectPanels());
    this.#mo.observe(this, { childList: true, subtree: true, attributes: true, attributeFilter: ['id','label'] });
    addEventListener('hashchange', this.#onHashChange, { passive: true });
    queueMicrotask(() => this.#syncFromHash(true));
  }

  disconnectedCallback() {
    this.#mo?.disconnect();
    removeEventListener('hashchange', this.#onHashChange);
    super.disconnectedCallback();
  }

  #onHashChange = () => this.#syncFromHash(false);

  #collectPanels() {
    // Only direct or nested <tab-panel> children under this tab-strip
    this.#panels = Array.from(this.querySelectorAll('tab-panel'));
    // Ensure each panel has an id; generate if missing
    this.#panels.forEach((p, i) => { if (!p.id) p.id = `tab-${i+1}`; });
    this.requestUpdate();
    this.#syncFromHash(true);
  }

  #syncFromHash(initial = false) {
    const hashId = (location.hash || '').slice(1);
    const exist = this.#panels.some(p => p.id === hashId);
    const next = exist ? hashId : (this.selected || this.#panels[0]?.id);
    if (!next) return;
    this.selected = next;
    // Hide/show panels
    for (const p of this.#panels) {
      const section = p.querySelector('[data-tabpanel]');
      if (!section) continue;
      const active = (p.id === next);
      section.toggleAttribute('hidden', !active);
      section.setAttribute('aria-hidden', String(!active));
      if (active) section.setAttribute('tabindex', '0'); else section.removeAttribute('tabindex');
    }
    // Optionally update hash on initial load if nothing targeted (keeps deep-linkability consistent)
    if (initial && (!hashId || !exist)) {
      // Avoid pushing history entries repeatedly
      history.replaceState(null, '', `#${next}`);
    }
    // Update nav link states
    const links = this.querySelectorAll('nav a[href^="#"]');
    links.forEach(a => {
      const target = a.getAttribute('href')?.slice(1);
      a.toggleAttribute('aria-current', target === next ? 'page' : false);
    });
  }

  // Basic keyboard nicety: when focus is on a link inside this nav,
  // Left/Right arrow moves between links (anchors keep native Enter/Space behavior).
  #onNavKeydown(e) {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    const links = Array.from(this.renderRoot.querySelectorAll('nav a'));
    const i = links.indexOf(document.activeElement);
    if (i === -1) return;
    e.preventDefault();
    const next = e.key === 'ArrowRight'
      ? links[(i + 1) % links.length]
      : links[(i - 1 + links.length) % links.length];
    next?.focus();
  }

  render() {
    // Build tabs from child <tab-panel> attributes
    const items = this.#panels.map(p => ({
      id: p.id,
      label: p.getAttribute('label') ?? p.id
    }));

    return html`
      <nav aria-label=${this.label ?? 'Tabs'} @keydown=${this.#onNavKeydown}>
        ${items.map(it => html`
          <a href=${`#${it.id}`} aria-controls=${it.id}
             aria-current=${this.selected === it.id ? 'page' : nothing}>
            ${it.label}
          </a>
        `)}
      </nav>
      <slot></slot>
    `;
  }
}
customElements.define('tab-strip', TabStrip);
