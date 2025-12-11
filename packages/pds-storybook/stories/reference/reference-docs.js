import React from 'react';
import { Title, Subtitle, Description, Primary, Controls, Stories } from '@storybook/blocks';
import { LitElement, html, nothing } from 'lit';
import referenceData from '../../dist/pds-reference.json' assert { type: 'json' };
import {
  renderMarkdown,
  renderCode,
  renderDefault,
  renderChipList,
  renderTable
} from './reference-helpers.js';

const DOC_STYLE_ID = 'pds-reference-component-docs-styles';
const DOC_STYLE_CONTENT = `
  .pds-reference-docs-wrapper {
    padding: var(--spacing-5);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-5);
  }

  .pds-reference-docs-content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-5);
  }

  .pds-reference-docs-reset {
    margin: 0;
  }

  .pds-reference-docs-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .pds-reference-docs-pre {
    margin: 0;
    padding: var(--spacing-3);
  }

  .pds-reference-docs-content code {
    white-space: normal;
    word-break: break-word;
  }

  /* Override Storybook autodocs token styles that force nowrap chips */
  .css-qa4clq :where(li:not(.sb-anchor, .sb-unstyled, .sb-unstyled li)) code {
    line-height: inherit;
    margin: 0;
    padding: 0;
    white-space: normal !important;
    border-radius: 0;
    font-size: inherit;
    border: none;
    color: inherit;
    background-color: transparent;
  }
`;

function ensureDocStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(DOC_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = DOC_STYLE_ID;
  style.textContent = DOC_STYLE_CONTENT;
  document.head.append(style);
}

if (typeof document !== 'undefined') {
  ensureDocStyles();
}

class PdsReferenceComponentDocs extends LitElement {
  static properties = {
    component: { type: String },
    data: { type: Object }
  };

  constructor() {
    super();
    this.component = '';
    this.data = referenceData;

    ensureDocStyles();
  }

  createRenderRoot() {
    return this; // Use light DOM so existing design system styles apply.
  }

  get componentData() {
    if (!this.component) return null;
    return this.data?.components?.[this.component] ?? null;
  }

  render() {
    const component = this.componentData;

    if (!component) {
      return html`
        <article class="card surface-base">
          <p class="text-muted pds-reference-docs-reset">
            No reference metadata found for <code>${this.component || '(unknown component)'}</code>.
            Run <code>npm run build-reference</code> to refresh docs.
          </p>
        </article>
      `;
    }

    return html`
      <div class="flex flex-col gap-lg pds-reference-docs-content">
        ${this.renderHeader(component)}
        ${component.pdsTags?.length ? this.renderTags(component.pdsTags) : nothing}
        ${component.description ? this.renderManifestNotes(component.description) : nothing}
        ${component.notes?.length ? this.renderImplementationNotes(component.notes) : nothing}
        ${component.ontology ? this.renderOntology(component.ontology) : nothing}
        ${component.stories?.length ? this.renderStories(component.stories) : nothing}
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
              if (!value || !value.length) {
                return html`<span class="text-muted">&#8212;</span>`;
              }
              return html`
                <ul class="pds-reference-docs-list flex flex-col gap-xs">
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
      </div>
    `;
  }

  renderHeader(component) {
    return html`
      <section class="card surface-base flex flex-col gap-sm">
        <div class="flex flex-wrap gap-xs">
          <span class="badge">Web Component</span>
          ${component.ontology?.id ? html`<span class="badge">${component.ontology.id}</span>` : nothing}
          ${component.superclass ? html`<span class="badge">extends ${component.superclass}</span>` : nothing}
        </div>
        <h2 class="pds-reference-docs-reset">${component.displayName}</h2>
        <div class="flex flex-wrap gap-sm text-muted text-sm">
          <span><code>${component.tag}</code></span>
          ${component.className ? html`<span>class <code>${component.className}</code></span>` : nothing}
          ${component.sourceModule ? html`<span>${component.sourceModule}</span>` : nothing}
        </div>
        ${component.docsDescription ? html`<div>${renderMarkdown(component.docsDescription)}</div>` : nothing}
      </section>
    `;
  }

  renderTags(tags) {
    return html`
      <section class="card surface-base flex flex-col gap-sm">
        <h3 class="pds-reference-docs-reset">Experience Tags</h3>
        ${renderChipList(tags)}
      </section>
    `;
  }

  renderManifestNotes(description) {
    return html`
      <section class="card surface-base flex flex-col gap-sm">
        <h3 class="pds-reference-docs-reset">Manifest Notes</h3>
        <pre class="surface-subtle radius-lg text-sm overflow-auto pds-reference-docs-pre">${description}</pre>
      </section>
    `;
  }

  renderImplementationNotes(notes) {
    return html`
      <section class="card surface-base flex flex-col gap-xs">
        <h3 class="pds-reference-docs-reset">Implementation Notes</h3>
        ${notes.map((note) => html`<p class="text-muted pds-reference-docs-reset">${note}</p>`)}
      </section>
    `;
  }

  renderOntology(ontology) {
    return html`
      <section class="card surface-base flex flex-col gap-sm">
        <h3 class="pds-reference-docs-reset">Ontology</h3>
        <div class="flex flex-wrap gap-xs items-center">
          <span class="badge">${ontology.id}</span>
          ${ontology.name ? html`<span class="badge">${ontology.name}</span>` : nothing}
        </div>
        ${ontology.selectors?.length ? html`
          <div class="flex flex-col gap-xs">
            <span class="text-muted text-sm">Selectors</span>
            ${renderChipList(ontology.selectors)}
          </div>
        ` : nothing}
      </section>
    `;
  }

  renderStories(stories) {
    return html`
      <section class="card surface-base flex flex-col gap-md">
        <h3 class="pds-reference-docs-reset">Storybook Coverage</h3>
        <div class="grid grid-auto-md gap-md">
          ${stories.map((story) => html`
            <div class="card surface-elevated flex flex-col gap-xs">
              <a href="/?path=/story/${story.id}" target="_blank" rel="noopener">${story.name}</a>
              <div class="flex flex-wrap gap-sm text-muted text-sm">
                <span>${story.id}</span>
                ${story.source ? html`<span>${story.source}</span>` : nothing}
              </div>
              ${story.description ? html`<p class="text-muted pds-reference-docs-reset">${story.description}</p>` : nothing}
              ${story.tags?.length ? renderChipList(story.tags) : nothing}
            </div>
          `)}
        </div>
      </section>
    `;
  }

  renderTableSection(title, items, columns) {
    if (!items || !items.length) return nothing;
    return html`
      <section class="card surface-base flex flex-col gap-sm">
        <h3 class="pds-reference-docs-reset">${title}</h3>
        ${renderTable(items, columns)}
      </section>
    `;
  }
}

if (!customElements.get('pds-reference-component-docs')) {
  customElements.define('pds-reference-component-docs', PdsReferenceComponentDocs);
}

export function createComponentDocsPage(tag) {
  return function ComponentDocsPage() {
    return React.createElement(
      React.Fragment,
      null,
      React.createElement(Title, null),
      React.createElement(Subtitle, null),
      React.createElement(Description, null),
      React.createElement(Primary, null),
      React.createElement(Controls, null),
      React.createElement(
        'div',
        {
          className: 'card surface-elevated pds-reference-docs-wrapper'
        },
        React.createElement('pds-reference-component-docs', { component: tag })
      ),
      React.createElement(Stories, { includePrimary: false })
    );
  };
}
