import { LitElement, html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import {
  renderMarkdown,
  renderCode,
  renderDefault,
  formatTimestamp,
  formatDemoHtml,
  renderChipList,
  renderTable,
  navigateToStory
} from './reference-helpers.js';
import { escapeHtml as shikiEscapeHtml } from '../utils/shiki.js';

export class PdsReferenceCatalog extends LitElement {
  static properties = {
    data: { type: Object },
    view: { state: true }
  };

  constructor() {
    super();
    this.data = null;
    this.view = 'ref-components';
    this.__buttonRefreshScheduled = false;
  }

  createRenderRoot() {
    return this; // Light DOM to inherit design system utilities.
  }

  onTabChange(event) {
    if (!event?.detail?.newTab) return;
    this.view = event.detail.newTab;
  }

  render() {
    if (!this.data) {
      return html`
        <article class="card surface-base flex flex-col gap-sm items-center text-center">
          <p class="text-muted">
            Reference data is missing. Run <code>npm run build-reference</code> before launching Storybook.
          </p>
        </article>
      `;
    }

    const componentTotal = Object.keys(this.data.components || {}).length;
    const tokenGroups = Object.keys(this.data.tokens || {}).length;

    return html`
      <section class="card surface-elevated flex flex-col gap-xl">
        <header class="flex flex-wrap items-start justify-between gap-md">
          <div class="flex flex-col gap-xs">
            <h1 style="margin: 0;">PDS Reference</h1>
            <p class="text-muted" style="margin: 0; max-width: 60ch;">
              Living metadata for components, primitives, tokens, and enhancements sourced from the manifest, ontology, and Storybook docs.
            </p>
          </div>
          <div class="flex flex-wrap gap-sm items-center">
            <span class="badge">Components ${componentTotal}</span>
            <span class="badge">Token Groups ${tokenGroups}</span>
            <span class="badge">Generated ${formatTimestamp(this.data.generatedAt)}</span>
          </div>
        </header>

        <pds-tabstrip label="PDS reference views" selected=${this.view} @tabchange=${this.onTabChange}>
          <pds-tabpanel id="ref-components" label="Components">
            <div class="flex flex-col gap-lg" style="margin-top: var(--spacing-3);">
              ${this.renderComponentsView()}
            </div>
          </pds-tabpanel>
          <pds-tabpanel id="ref-primitives" label="Primitives">
            <div class="flex flex-col gap-lg" style="margin-top: var(--spacing-3);">
              ${this.renderPrimitivesView()}
            </div>
          </pds-tabpanel>
          <pds-tabpanel id="ref-tokens" label="Tokens">
            <div class="flex flex-col gap-lg" style="margin-top: var(--spacing-3);">
              ${this.renderTokensView()}
            </div>
          </pds-tabpanel>
          <pds-tabpanel id="ref-enhancements" label="Enhancements">
            <div class="flex flex-col gap-lg" style="margin-top: var(--spacing-3);">
              ${this.renderEnhancementsView()}
            </div>
          </pds-tabpanel>
        </pds-tabstrip>
      </section>
    `;
  }


  renderComponentsView() {
    const components = Object.values(this.data.components || {}).sort((a, b) => a.displayName.localeCompare(b.displayName));
    if (!components.length) {
      return html`<article class="card surface-base flex flex-col gap-sm"><p class="text-muted" style="margin: 0;">No component metadata was generated.</p></article>`;
    }

    return html`
      <section class="card surface-base flex flex-col gap-md">
        <div class="flex items-center justify-end">
          <span class="badge">${components.length} components</span>
        </div>
        <section class="accordion" aria-label="Component reference list">
          ${components.map((component, index) => this.renderComponentAccordionItem(component, index === 0))}
        </section>
      </section>
    `;
  }

  renderComponentAccordionItem(component, open = false) {
    const summaryId = `component-${component.tag}`;
    return html`
      <details ?open=${open}>
        <summary id=${summaryId}>
          <div class="flex items-center justify-between gap-sm">
            <span class="flex items-center gap-sm">
              <code>&lt;${component.tag}&gt;</code>
            </span>
            <span class="flex items-center gap-xs">
              ${component.stories?.length ? html`<span class="badge">${component.stories.length} stories</span>` : nothing}
            </span>
          </div>
        </summary>
        <div role="region" aria-labelledby=${summaryId} class="flex flex-col gap-lg" style="padding: var(--spacing-4) 0;">
          ${this.renderComponentDetail(component)}
        </div>
      </details>
    `;
  }

  renderComponentDetail(component) {
    if (!component) {
      return html`<p class="text-muted" style="margin: 0;">Select a component to inspect its API.</p>`;
    }

    return html`
      <section class="card surface-base flex flex-col gap-sm">
        ${component.ontology?.id ? html`<div class="flex flex-wrap gap-xs"><span class="badge">${component.ontology.id}</span></div>` : nothing}
        <h2 style="margin: 0;"><code>${component.tag}</code></h2>
        ${component.docsDescription ? html`<div>${renderMarkdown(component.docsDescription)}</div>` : nothing}
      </section>

      ${component.description ? html`
        <section class="card surface-base flex flex-col gap-sm">
          <h3 style="margin: 0;">Manifest Notes</h3>
          <pre class="surface-subtle radius-lg text-sm overflow-auto" style="margin: 0; padding: var(--spacing-3);">${component.description}</pre>
        </section>
      ` : nothing}

      ${component.notes?.length ? html`
        <section class="card surface-base flex flex-col gap-xs">
          <h3 style="margin: 0;">Implementation Notes</h3>
          ${component.notes.map((note) => html`<p class="text-muted" style="margin: 0;">${note}</p>`)}
        </section>
      ` : nothing}

      ${component.ontology ? html`
        <section class="card surface-base flex flex-col gap-sm">
          <h3 style="margin: 0;">Ontology</h3>
          <div class="flex flex-wrap gap-xs items-center">
            <span class="badge">${component.ontology.id}</span>
            ${component.ontology.name ? html`<span class="badge">${component.ontology.name}</span>` : nothing}
          </div>
          ${component.ontology.selectors?.length ? html`
            <div class="flex flex-col gap-xs">
              <span class="text-muted text-sm">Selectors</span>
              ${renderChipList(component.ontology.selectors)}
            </div>
          ` : nothing}
        </section>
      ` : nothing}

      ${component.stories?.length ? html`
        <section class="card surface-base flex flex-col gap-md">
          <h3 style="margin: 0;">Storybook Coverage</h3>
          <div class="grid grid-auto-md gap-md">
            ${component.stories.map((story) => html`
              <div class="card surface-elevated flex flex-col gap-xs">
                <a
                  href="/?path=/story/${story.id}"
                  @click=${(event) => this.handleStoryNavigation(event, story.id)}
                >${story.name}</a>
                <div class="flex flex-wrap gap-sm text-muted text-sm">
                  <span>${story.id}</span>
                </div>
                ${story.description ? html`<p class="text-muted" style="margin: 0;">${story.description}</p>` : nothing}
                ${story.tags?.length ? renderChipList(story.tags) : nothing}
              </div>
            `)}
          </div>
        </section>
      ` : nothing}

      ${this.renderTableSection('Attributes', component.attributes, [
        { key: 'name', label: 'Attribute', render: (value) => renderCode(value) },
        { key: 'description', label: 'Description' },
        { key: 'type', label: 'Type', render: (value) => renderCode(value) },
        { key: 'default', label: 'Default', render: (value) => renderDefault(value) }
      ])}

      ${this.renderTableSection('Properties', component.properties, [
        { key: 'name', label: 'Property', render: (value) => renderCode(value) },
        { key: 'type', label: 'Type', render: (value) => renderCode(value) },
        { key: 'description', label: 'Description' },
        { key: 'default', label: 'Default', render: (value) => renderDefault(value) }
      ])}

      ${this.renderTableSection('Events', component.events, [
        { key: 'name', label: 'Event', render: (value) => renderCode(value) },
        { key: 'type', label: 'Type', render: (value) => renderCode(value) },
        { key: 'description', label: 'Description' }
      ])}

      ${this.renderTableSection('Methods', component.methods, [
        { key: 'name', label: 'Method', render: (value) => renderCode(value) },
        { key: 'description', label: 'Description' },
        {
          key: 'parameters',
          label: 'Parameters',
          render: (value) => {
            if (!value || !value.length) return html`<span class="text-muted">&#8212;</span>`;
            return html`
              <ul class="flex flex-col gap-xs" style="list-style: none; margin: 0; padding: 0;">
                ${value.map((param) => html`
                  <li class="flex flex-wrap gap-xs items-baseline">
                    <code>${param.name}${param.type ? `: ${param.type}` : ''}</code>
                    ${param.description ? html`<span class="text-muted text-sm">- ${param.description}</span>` : nothing}
                  </li>
                `)}
              </ul>
            `;
          }
        },
        { key: 'return', label: 'Returns', render: (value) => renderCode(value) }
      ])}

      ${this.renderTableSection('Slots', component.slots, [
        { key: 'name', label: 'Slot' },
        { key: 'description', label: 'Description' }
      ])}

      ${this.renderTableSection('CSS Parts', component.cssParts, [
        { key: 'name', label: 'CSS Part' },
        { key: 'description', label: 'Description' }
      ])}
    `;
  }

  handleStoryNavigation(event, storyId) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    navigateToStory(storyId, 'story');
  }

  renderTableSection(title, items, columns) {
    if (!items || !items.length) return nothing;
    return html`
      <section class="card surface-base flex flex-col gap-sm">
        <h3 style="margin: 0;">${title}</h3>
        ${renderTable(items, columns)}
      </section>
    `;
  }

  renderPrimitivesView() {
    const primitives = this.data.primitives || {};
    const primitiveCards = (primitives.primitives || []).map((primitive) => html`
      <article class="card surface-base flex flex-col gap-sm">
        <div class="flex items-center gap-sm flex-wrap">
          <h3 style="margin: 0;">${primitive.name}</h3>
          <span class="badge">${primitive.id}</span>
        </div>
        ${primitive.selectors?.length ? html`
          <div class="flex flex-col gap-xs">
            <span class="text-muted text-sm">Selectors</span>
            ${renderChipList(primitive.selectors)}
          </div>
        ` : nothing}
      </article>
    `);

    const layoutCards = (primitives.layoutPatterns || []).map((pattern) => html`
      <article class="card surface-base flex flex-col gap-sm">
        <div class="flex items-center gap-sm flex-wrap">
          <h3 style="margin: 0;">${pattern.name}</h3>
          <span class="badge">${pattern.id}</span>
        </div>
        ${pattern.description ? html`<p class="text-muted" style="margin: 0;">${pattern.description}</p>` : nothing}
        ${pattern.selectors?.length ? html`
          <div class="flex flex-col gap-xs">
            <span class="text-muted text-sm">Selectors</span>
            ${renderChipList(pattern.selectors)}
          </div>
        ` : nothing}
      </article>
    `);

    const utilities = primitives.utilities || [];

    return html`
      <div class="grid grid-auto-md gap-lg">
        ${primitiveCards.length ? primitiveCards : html`
          <article class="card surface-base flex flex-col gap-sm">
            <p class="text-muted" style="margin: 0;">No primitives registered in the ontology.</p>
          </article>
        `}
      </div>

      ${layoutCards.length ? html`
        <section class="card surface-base flex flex-col gap-md">
          <h3 style="margin: 0;">Layout Patterns</h3>
          <div class="grid grid-auto-md gap-md">${layoutCards}</div>
        </section>
      ` : nothing}

      ${utilities.length ? html`
        <section class="card surface-base flex flex-col gap-sm">
          <h3 style="margin: 0;">Utility Classes</h3>
          <pre class="surface-subtle radius-lg text-sm overflow-auto" style="margin: 0; padding: var(--spacing-3);">${utilities.join('\n')}</pre>
        </section>
      ` : nothing}
    `;
  }

  renderTokensView() {
    const tokenGroups = Object.entries(this.data.tokens || {});
    if (!tokenGroups.length) {
      return html`<article class="card surface-base flex flex-col gap-sm"><p class="text-muted" style="margin: 0;">No token metadata was generated.</p></article>`;
    }

    return html`
      <div class="grid grid-auto-md gap-lg">
        ${tokenGroups.map(([group, values]) => html`
          <article class="card surface-base flex flex-col gap-sm">
            <h3 style="margin: 0;">${group}</h3>
            ${this.renderTokenValue(values)}
          </article>
        `)}
      </div>
    `;
  }

  renderTokenValue(values) {
    // Handle arrays - render as chip list
    if (Array.isArray(values)) {
      return renderChipList(values);
    }
    
    // Handle nested objects - render each key as a subsection
    if (values && typeof values === 'object') {
      return html`
        <div class="flex flex-col gap-md">
          ${Object.entries(values).map(([key, subValues]) => html`
            <div class="flex flex-col gap-xs">
              <span class="text-muted text-sm">${key}</span>
              ${Array.isArray(subValues)
                ? renderChipList(subValues)
                : html`<code>${String(subValues)}</code>`}
            </div>
          `)}
        </div>
      `;
    }
    
    // Handle primitives
    return html`<code>${String(values)}</code>`;
  }

  renderEnhancementsView() {
    const enhancements = this.data.enhancements || [];
    if (!enhancements.length) {
      return html`<article class="card surface-base flex flex-col gap-sm"><p class="text-muted" style="margin: 0;">No progressive enhancements registered.</p></article>`;
    }

    return html`
      <div class="flex flex-col gap-md">
        ${enhancements.map((enhancement) => this.renderEnhancementCard(enhancement))}
      </div>
    `;
  }

  renderEnhancementCard(enhancement) {
    if (!enhancement) return nothing;
    const { selector, description, demoHtml, source, name, id } = enhancement;
    // Handle selector being an object or string
    const safeSelector = typeof selector === 'string' 
      ? selector 
      : (name || id || (selector?.toString?.() !== '[object Object]' ? String(selector) : '(unknown selector)'));
    const demoMarkup = typeof demoHtml === 'string' ? demoHtml.trim() : '';
    const formattedDemoHtml = demoMarkup ? formatDemoHtml(demoMarkup) : '';
    // Use sync escaping instead of async shiki highlighting to avoid Promise in template
    const highlightedDemoHtml = formattedDemoHtml ? shikiEscapeHtml(formattedDemoHtml) : '';
    const hasDetails = Boolean(description || demoMarkup);

    if (demoMarkup) {
      this.scheduleButtonWorkingRefresh();
    }

    return html`
      <article class="card surface-base flex flex-col gap-sm">
        <div class="flex flex-wrap items-center justify-between gap-sm">
          <h3 style="margin: 0;"><code>${safeSelector}</code></h3>
          ${source ? html`<span class="badge text-sm">${source}</span>` : nothing}
        </div>
        ${description ? html`<p class="text-muted" style="margin: 0;">${description}</p>` : nothing}
        ${demoMarkup && typeof demoMarkup === 'string' ? html`
          <div class="flex flex-col gap-xs">
            <span class="text-muted text-sm">Demo</span>
            <div class="surface-subtle radius-lg pds-ref-demo" style="padding: var(--spacing-3);">
              ${unsafeHTML(demoMarkup)}
            </div>
            ${highlightedDemoHtml && typeof highlightedDemoHtml === 'string' ? html`
              <pre class="html-source-pre radius-lg text-sm overflow-auto" style="margin: 0;"><code class="html-source-code">${unsafeHTML(highlightedDemoHtml)}</code></pre>
            ` : nothing}
          </div>
        ` : nothing}
        ${!hasDetails ? html`<p class="text-muted text-sm" style="margin: 0;">Documentation pending.</p>` : nothing}
      </article>
    `;
  }

  scheduleButtonWorkingRefresh() {
    if (this.__buttonRefreshScheduled) return;
    this.__buttonRefreshScheduled = true;
    requestAnimationFrame(() => {
      this.__buttonRefreshScheduled = false;
      const workingTargets = this.querySelectorAll('.pds-ref-demo button.btn-working, .pds-ref-demo a.btn-working');
      workingTargets.forEach((target) => {
        if (!target.classList.contains('btn-working')) {
          return;
        }
        target.classList.remove('btn-working');
        void target.offsetWidth; // Force reflow so the re-add triggers MutationObserver
        target.classList.add('btn-working');
      });
    });
  }
}

customElements.define('pds-reference-catalog', PdsReferenceCatalog);
