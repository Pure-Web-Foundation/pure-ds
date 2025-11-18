import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import Showdown from 'showdown';
import markdownContent from './WhatIsPDS.md?raw';

const converter = new Showdown.Converter({
  tables: true,
  strikethrough: true,
  tasklists: true,
  ghCodeBlocks: true,
  simplifiedAutoLink: true,
  emoji: true
});

export default {
  title: 'General/What is PDS',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Learn about Pure Design System and its revolutionary approach to design systems'
      }
    }
  }
};

export const Default = {
  render: () => {
    const htmlContent = converter.makeHtml(markdownContent);
    
    return html`
      <style>
        .markdown-container {
          max-width: 900px;
          margin: 0 auto;
          padding: var(--spacing-8) var(--spacing-6);
          background: var(--color-surface-base);
          color: var(--color-text-primary);
          font-family: var(--font-family-base);
          line-height: var(--line-height-relaxed);
        }

        .markdown-container h1 {
          font-size: var(--font-size-4xl);
          font-weight: var(--font-weight-bold);
          color: var(--color-text-primary);
          margin: 0 0 var(--spacing-6);
          line-height: var(--line-height-tight);
          padding-bottom: var(--spacing-4);
          border-bottom: 2px solid var(--color-border-subtle);
        }

        .markdown-container h2 {
          font-size: var(--font-size-2xl);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text-primary);
          margin: var(--spacing-8) 0 var(--spacing-4);
          line-height: var(--line-height-tight);
        }

        .markdown-container h3 {
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text-primary);
          margin: var(--spacing-6) 0 var(--spacing-3);
        }

        .markdown-container p {
          margin: var(--spacing-4) 0;
          color: var(--color-text-secondary);
        }

        .markdown-container strong {
          color: var(--color-text-primary);
          font-weight: var(--font-weight-semibold);
        }

        .markdown-container code {
          background: var(--color-surface-raised);
          color: var(--color-primary-500);
          padding: var(--spacing-1) var(--spacing-2);
          border-radius: var(--radius-sm);
          font-family: var(--font-family-mono);
          font-size: 0.9em;
        }

        .markdown-container pre {
          background: var(--color-surface-raised);
          border: 1px solid var(--color-border-subtle);
          border-radius: var(--radius-md);
          padding: var(--spacing-4);
          overflow-x: auto;
          margin: var(--spacing-4) 0;
        }

        .markdown-container pre code {
          background: none;
          padding: 0;
          color: var(--color-text-primary);
          display: block;
        }

        .markdown-container ul, 
        .markdown-container ol {
          margin: var(--spacing-4) 0;
          padding-left: var(--spacing-6);
        }

        .markdown-container li {
          margin: var(--spacing-2) 0;
          color: var(--color-text-secondary);
        }

        .markdown-container hr {
          border: none;
          border-top: 1px solid var(--color-border-subtle);
          margin: var(--spacing-8) 0;
        }

        .markdown-container a {
          color: var(--color-primary-500);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .markdown-container a:hover {
          color: var(--color-primary-600);
          text-decoration: underline;
        }

        .markdown-container blockquote {
          border-left: 4px solid var(--color-primary-500);
          padding-left: var(--spacing-4);
          margin: var(--spacing-4) 0;
          color: var(--color-text-secondary);
          font-style: italic;
        }
      </style>
      <div class="markdown-container">
        ${unsafeHTML(htmlContent)}
      </div>
    `;
  }
};
