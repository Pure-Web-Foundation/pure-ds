import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { renderMarkdown } from './utils/markdown.js';
import markdownContent from './getting-started.md?raw';

export default {
  title: 'About PDS/Getting Started',
  parameters: {
    layout: 'fullscreen',
    pds: {
      tags: ['getting started', 'introduction', 'cli', 'npm', 'cdn', 'overview', 'guide', 'themes', 'dark mode', 'light mode']
    },
    docs: {
      description: {
        component: 'Complete beginner guide: installation, philosophy, configuration, enhancements, components, and console API'
      }
    }
  }
};

export const GettingStarted = {
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
