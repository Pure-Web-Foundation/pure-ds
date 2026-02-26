import React from 'react';
import { Title, Subtitle, Description, Primary, Controls, Stories } from '@storybook/blocks';
import { LitElement, html, nothing } from 'lit';
import referenceData from '../../dist/pds-reference.json' assert { type: 'json' };
import {
  renderMarkdown,
  renderCode,
  renderDefault,
  renderChipList,
  renderTable,
  navigateToStory
} from './reference-helpers.js';

const DOC_STYLE_ID = 'pds-reference-component-docs-styles';
const DOC_STYLE_CONTENT = `
  /* Minimal styles for docs pages - uses Storybook defaults, no PDS tokens */
  .pds-reference-docs-wrapper {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .pds-reference-docs-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .pds-reference-docs-reset {
    margin: 0;
  }

  .pds-reference-docs-pre {
    margin: 0;
    padding: 12px;
    background: #f5f5f5;
    border-radius: 4px;
    overflow: auto;
    font-size: 13px;
  }

  .pds-reference-docs-section {
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .pds-reference-docs-section h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
  }

  .pds-reference-docs-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }

  .pds-reference-docs-table th,
  .pds-reference-docs-table td {
    padding: 8px 12px;
    text-align: left;
    border: 1px solid #e0e0e0;
    vertical-align: top;
  }

  .pds-reference-docs-table th {
    background: #f5f5f5;
    font-weight: 600;
    white-space: nowrap;
  }

  .pds-reference-docs-table td:first-child {
    font-family: monospace;
    white-space: nowrap;
  }

  .pds-reference-docs-table code {
    background: #f0f0f0;
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 13px;
  }

  .pds-reference-docs-badge {
    display: inline-block;
    background: #e8e8e8;
    color: #333;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 12px;
    margin-right: 4px;
    margin-bottom: 4px;
  }

  .pds-reference-docs-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .pds-reference-docs-muted {
    color: #666;
    font-size: 14px;
  }

  .pds-reference-docs-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    color: #666;
    font-size: 13px;
  }

  .pds-reference-docs-subsection {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .pds-reference-docs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
  }

  .pds-reference-docs-story-card {
    background: #fafafa;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .pds-reference-docs-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .pds-reference-docs-header {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  /* Additional content section styling */
  .pds-reference-additional-content {
    margin-top: 24px;
    padding: 20px;
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
  }

  .pds-reference-additional-content h1,
  .pds-reference-additional-content h2,
  .pds-reference-additional-content h3,
  .pds-reference-additional-content h4 {
    margin-top: 24px;
    margin-bottom: 12px;
  }

  .pds-reference-additional-content h1:first-child {
    margin-top: 0;
  }

  .pds-reference-additional-content p {
    margin-bottom: 12px;
    line-height: 1.6;
  }

  .pds-reference-additional-content code {
    background: #f0f0f0;
    padding: 2px 6px;
    border-radius: 3px;
    font-family: monospace;
    font-size: 13px;
  }

  .pds-reference-additional-content table {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0;
  }

  .pds-reference-additional-content th,
  .pds-reference-additional-content td {
    padding: 8px 12px;
    text-align: left;
    border: 1px solid #e0e0e0;
  }

  .pds-reference-additional-content th {
    background: #f5f5f5;
    font-weight: 600;
  }

  .pds-reference-additional-content hr {
    border: none;
    border-top: 1px solid #e0e0e0;
    margin: 24px 0;
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
        <div class="pds-reference-docs-section">
          <p class="pds-reference-docs-muted pds-reference-docs-reset">
            No reference metadata found for <code>${this.component || '(unknown component)'}</code>.
            Run <code>npm run build-reference</code> to refresh docs.
          </p>
        </div>
      `;
    }

    return html`
      <div class="pds-reference-docs-content">
        ${this.renderHeader(component)}
        ${component.pdsTags?.length ? this.renderTags(component.pdsTags) : nothing}
        ${component.description ? this.renderManifestNotes(component.description) : nothing}
        ${component.notes?.length ? this.renderImplementationNotes(component.notes) : nothing}
        ${component.ontology ? this.renderOntology(component.ontology) : nothing}
        ${component.stories?.length ? this.renderStories(component.stories) : nothing}
        ${this.renderTableSection('Attributes', component.attributes, [
          { key: 'name', label: 'Attribute', render: (value) => renderCode(value) },
          { key: 'property', label: 'Property', render: (value) => renderCode(value) },
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
                return html`<span class="pds-reference-docs-muted">&#8212;</span>`;
              }
              return html`
                <ul class="pds-reference-docs-list">
                  ${value.map((param) => html`
                    <li>
                      <code>${param.name}${param.type ? `: ${param.type}` : ''}</code>
                      ${param.description ? html`<span class="pds-reference-docs-muted"> - ${param.description}</span>` : nothing}
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
      <section class="pds-reference-docs-section">
        <div class="pds-reference-docs-badges">
          <span class="pds-reference-docs-badge">Web Component</span>
          ${component.ontology?.id ? html`<span class="pds-reference-docs-badge">${component.ontology.id}</span>` : nothing}
          ${component.superclass ? html`<span class="pds-reference-docs-badge">extends ${component.superclass}</span>` : nothing}
        </div>
        <h2 class="pds-reference-docs-reset">${component.displayName}</h2>
        <div class="pds-reference-docs-meta">
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
      <section class="pds-reference-docs-section">
        <h3 class="pds-reference-docs-reset">Experience Tags</h3>
        ${renderChipList(tags)}
      </section>
    `;
  }

  renderManifestNotes(description) {
    return html`
      <section class="pds-reference-docs-section">
        <h3 id="manifest-notes" class="pds-reference-docs-reset">Manifest Notes</h3>
        <pre class="pds-reference-docs-pre">${description}</pre>
      </section>
    `;
  }

  renderImplementationNotes(notes) {
    return html`
      <section class="pds-reference-docs-section">
        <h3 id="implementation-notes" class="pds-reference-docs-reset">Implementation Notes</h3>
        ${notes.map((note) => html`<p class="pds-reference-docs-muted pds-reference-docs-reset">${note}</p>`)}
      </section>
    `;
  }

  renderOntology(ontology) {
    return html`
      <section class="pds-reference-docs-section">
        <h3 id="ontology" class="pds-reference-docs-reset">Ontology</h3>
        <div class="pds-reference-docs-badges">
          <span class="pds-reference-docs-badge">${ontology.id}</span>
          ${ontology.name ? html`<span class="pds-reference-docs-badge">${ontology.name}</span>` : nothing}
        </div>
        ${ontology.selectors?.length ? html`
          <div class="pds-reference-docs-subsection">
            <span class="pds-reference-docs-muted">Selectors</span>
            ${renderChipList(ontology.selectors)}
          </div>
        ` : nothing}
      </section>
    `;
  }

  renderStories(stories) {
    return html`
      <section class="pds-reference-docs-section">
        <h3 class="pds-reference-docs-reset">Storybook Coverage</h3>
        <div class="pds-reference-docs-grid">
          ${stories.map((story) => html`
            <div class="pds-reference-docs-story-card">
              <a
                href="/?path=/story/${story.id}"
                @click=${(event) => this.handleStoryNavigation(event, story.id)}
              >${story.name}</a>
              <div class="pds-reference-docs-meta">
                <span>${story.id}</span>
              </div>
              ${story.description ? html`<p class="pds-reference-docs-muted pds-reference-docs-reset">${story.description}</p>` : nothing}
              ${story.tags?.length ? renderChipList(story.tags) : nothing}
            </div>
          `)}
        </div>
      </section>
    `;
  }

  handleStoryNavigation(event, storyId) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    navigateToStory(storyId, 'story');
  }

  renderTableSection(title, items, columns) {
    if (!items || !items.length) return nothing;
    const id = title.toLowerCase().replace(/\s+/g, '-');
    return html`
      <section class="pds-reference-docs-section">
        <h3 id="${id}" class="pds-reference-docs-reset">${title}</h3>
        ${renderTable(items, columns)}
      </section>
    `;
  }
}

// Guard for Node.js environment (Storybook static analysis)
if (typeof customElements !== 'undefined' && !customElements.get('pds-reference-component-docs')) {
  customElements.define('pds-reference-component-docs', PdsReferenceComponentDocs);
}

export function createComponentDocsPage(tag, options = {}) {
  const { hideStories = false, additionalContent = null } = options;
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
          className: 'pds-reference-docs-wrapper'
        },
        React.createElement('pds-reference-component-docs', { component: tag })
      ),
      additionalContent ? React.createElement(
        'div',
        {
          className: 'pds-reference-additional-content',
          dangerouslySetInnerHTML: { __html: additionalContent }
        }
      ) : null,
      hideStories ? null : React.createElement(Stories, { includePrimary: false })
    );
  };
}

export function createComponentDocsPageNoStories(tag) {
  return createComponentDocsPage(tag, { hideStories: true });
}
