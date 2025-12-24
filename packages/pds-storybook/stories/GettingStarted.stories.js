import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { renderMarkdown } from './utils/markdown.js';
import markdownContent from './GettingStarted.md?raw';

export default {
  title: 'General/Getting Started',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Quick start guide to using PDS Storybook and exploring components'
      }
    }
  }
};

export const Default = {
  render: () => {
    // Create container and render async with Shiki highlighting
    const container = document.createElement('article');
    container.className = 'container';
    container.innerHTML = '<p class="text-muted">Loading...</p>';
    
    renderMarkdown(markdownContent).then(htmlContent => {
      container.innerHTML = htmlContent;
    });
    
    return container;
  }
};
