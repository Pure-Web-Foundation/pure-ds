import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { renderMarkdown } from './utils/markdown.js';
import markdownContent from './WhatIsPDS.md?raw';

export default {
  title: 'About PDS/What Is PDS',
  parameters: {
    layout: 'fullscreen',
    pds: {
      tags: ['what is pds', 'introduction', 'overview', 'design system', 'philosophy', 'progressive enhancements', 'web components', 'adoptedt stylesheets']
    },
    docs: {
      description: {
        component: 'Learn about Pure Design System and its revolutionary approach to design systems'
      }
    }
  }
};

export const WhatIsPDS = {
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
