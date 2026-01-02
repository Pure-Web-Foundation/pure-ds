import { html } from 'lit';
import { highlight, getCurrentTheme, preloadShiki } from '../utils/shiki.js';
import { attachStoryLinkHandlers } from '../utils/navigation.js';

// Pre-load Shiki
preloadShiki();

export default {
  title: 'Foundations/HTML Defaults',
  parameters: {
    docs: {
      description: {
        component: 'PDS provides opinionated default styles for semantic HTML elements, creating a modern look & feel without requiring classes.'
      }
    }
  }
};

export const Overview = {
  render: () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <header >
        <h1>HTML Defaults</h1>
        <p class="text-muted">
          PDS applies an opinionated reset to semantic HTML elements using low-specificity 
          <code>:where()</code> selectors. This means you get a polished, modern look out of the box, 
          while retaining full ability to override styles without specificity battles.
        </p>
      </header>

      <article class="card">
        <h2>The Philosophy</h2>
        <p>
          Unlike traditional CSS resets that strip all styling, PDS takes an <strong>opinionated defaults</strong> 
          approach. Semantic HTML elements receive sensible, design-token-based styling automatically.
        </p>
        
        <div class="grid grid-cols-2 gap-lg" style="margin: var(--spacing-4) 0;">
          <div class="card surface-subtle">
            <h3>Traditional Reset</h3>
            <div class="code-traditional"></div>
            <p class="text-muted">You rebuild from scratch.</p>
          </div>
          
          <div class="card surface-elevated">
            <h3>PDS Defaults</h3>
            <div class="code-pds"></div>
            <p class="text-muted">Ready to use, easy to override.</p>
          </div>
        </div>
      </article>

      <article class="card">
        <h2>Why <code>:where()</code>?</h2>
        <p>
          All semantic element styles use the <code>:where()</code> pseudo-class, which has 
          <strong>zero specificity</strong>. This means:
        </p>
        <ul>
          <li>Any class you add will automatically win</li>
          <li>No need for <code>!important</code> to override defaults</li>
          <li>Component styles cleanly take precedence</li>
          <li>Your custom CSS integrates seamlessly</li>
        </ul>
        <div class="code-specificity"></div>
      </article>

      <article class="card">
        <h2>What's Covered</h2>
        <p>PDS provides automatic styling for these semantic elements:</p>
        
        <table class="table-bordered">
          <thead>
            <tr>
              <th>Category</th>
              <th>Elements</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Structural</strong></td>
              <td><code>&lt;header&gt;</code>, <code>&lt;footer&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;aside&gt;</code></td>
              <td>Layout flow, full-width headers/footers</td>
            </tr>
            <tr>
              <td><strong>Typography</strong></td>
              <td><code>&lt;h1&gt;</code>-<code>&lt;h6&gt;</code>, <code>&lt;p&gt;</code>, <code>&lt;small&gt;</code>, <code>&lt;strong&gt;</code></td>
              <td>See <a data-story-link="foundations-typography--heading-scale">Typography</a></td>
            </tr>
            <tr>
              <td><strong>Quotations</strong></td>
              <td><code>&lt;blockquote&gt;</code>, <code>&lt;cite&gt;</code></td>
              <td>Styled quotes with attribution</td>
            </tr>
            <tr>
              <td><strong>Lists</strong></td>
              <td><code>&lt;dl&gt;</code>, <code>&lt;dt&gt;</code>, <code>&lt;dd&gt;</code></td>
              <td>Definition lists with proper spacing</td>
            </tr>
            <tr>
              <td><strong>Dividers</strong></td>
              <td><code>&lt;hr&gt;</code></td>
              <td>Clean dividers, labeled variants</td>
            </tr>
            <tr>
              <td><strong>Inline</strong></td>
              <td><code>&lt;mark&gt;</code>, <code>&lt;kbd&gt;</code>, <code>&lt;abbr&gt;</code>, <code>&lt;time&gt;</code>, <code>&lt;code&gt;</code></td>
              <td>Highlighted text, keyboard keys, abbreviations</td>
            </tr>
            <tr>
              <td><strong>Interactive</strong></td>
              <td><code>&lt;details&gt;</code>, <code>&lt;summary&gt;</code></td>
              <td>Collapsible sections</td>
            </tr>
            <tr>
              <td><strong>Forms</strong></td>
              <td><code>&lt;button&gt;</code>, <code>&lt;input&gt;</code>, <code>&lt;label&gt;</code>, <code>&lt;fieldset&gt;</code></td>
              <td>See <a data-story-link="primitives-forms--default">Forms</a></td>
            </tr>
            <tr>
              <td><strong>Tables</strong></td>
              <td><code>&lt;table&gt;</code>, <code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code>, <code>&lt;th&gt;</code>, <code>&lt;td&gt;</code></td>
              <td>See <a data-story-link="primitives-tables--default-table">Tables</a></td>
            </tr>
          </tbody>
        </table>
      </article>
    `;
    
    // Add code blocks with Shiki
    const traditionalCode = `/* Strips everything */
blockquote { margin: 0; }
h1 { font-size: inherit; }
button { all: unset; }`;

    const pdsCode = `/* Provides sensible styles */
:where(blockquote) {
  border-left: 4px solid 
    var(--color-primary-500);
  background: var(--surface-subtle);
}`;

    const specificityCode = `/* PDS default (specificity: 0,0,0) */
:where(blockquote) { border-left-color: var(--color-primary-500); }

/* Your override wins automatically (specificity: 0,1,0) */
.my-quote { border-left-color: var(--color-accent-500); }`;

    highlight(traditionalCode, 'css', getCurrentTheme()).then(h => {
      container.querySelector('.code-traditional').innerHTML = h;
    });
    highlight(pdsCode, 'css', getCurrentTheme()).then(h => {
      container.querySelector('.code-pds').innerHTML = h;
    });
    highlight(specificityCode, 'css', getCurrentTheme()).then(h => {
      container.querySelector('.code-specificity').innerHTML = h;
    });
    
    attachStoryLinkHandlers(container);
    return container;
  }
};

Overview.storyName = 'Overview';

export const StructuralElements = {
  render: () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <header class="card">
        <h2>Structural Elements</h2>
        <small class="text-muted">
          Semantic containers that organize page content
        </small>
      </header>

      <article class="card">
        <h3><code>&lt;header&gt;</code></h3>
        <p>
          Headers are full-width and have special heading behavior: direct child headings 
          get <code>margin: 0</code> for tight title/subtitle patterns.
        </p>
        
        <div class="card surface-subtle">
          <header>
            <h4>Page Title</h4>
            <small class="text-muted">A subtitle or description with no awkward gap</small>
          </header>
        </div>
        
        <div class="code-header"></div>
      </article>

      <article class="card">
        <h3><code>&lt;article&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;aside&gt;</code></h3>
        <p>
          Content containers with automatic bottom margin and last-child margin removal.
        </p>
        
        <div class="card surface-subtle">
          <article>
            <h4>Article Title</h4>
            <p>This is article content. Note the spacing between elements.</p>
            <p>Last paragraph has no bottom margin.</p>
          </article>
        </div>
      </article>

      <article class="card">
        <h3><code>&lt;nav&gt;</code></h3>
        <p>
          Navigation containers reset list styling and work with the dropdown enhancement.
          See <a data-story-link="enhancements-dropdowns--basic-dropdown">Dropdown Menus</a> for details.
        </p>
      </article>
    `;
    
    const headerCode = `<header>
  <h4>Page Title</h4>
  <small class="text-muted">A subtitle or description</small>
</header>`;

    highlight(headerCode, 'html', getCurrentTheme()).then(h => {
      container.querySelector('.code-header').innerHTML = h;
    });
    
    attachStoryLinkHandlers(container);
    return container;
  }
};

StructuralElements.storyName = 'Structural Elements';

export const TextElements = {
  render: () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <header class="card">
        <h2>Text & Quotation Elements</h2>
        <small class="text-muted">
          Semantic text elements with automatic styling
        </small>
      </header>

      <article class="card">
        <h3><code>&lt;blockquote&gt;</code></h3>
        <p>Styled with a left border, subtle background, and optional citation.</p>
        
        <blockquote>
          <p>The browser is the framework. Every line of JavaScript you write is technical debt against the platform itself.</p>
          <cite>Pure Web Manifesto</cite>
        </blockquote>
        
        <div class="code-blockquote"></div>
      </article>

      <article class="card">
        <h3><code>&lt;hr&gt;</code> — Horizontal Rules</h3>
        <p>Simple divider:</p>
        <hr>
        
        <p>Labeled divider with <code>data-content</code>:</p>
        <hr data-content="OR">
        
        <div class="code-hr"></div>
      </article>

      <article class="card">
        <h3>Definition Lists</h3>
        <p>Semantic key-value pairs with <code>&lt;dl&gt;</code>, <code>&lt;dt&gt;</code>, <code>&lt;dd&gt;</code>:</p>
        
        <dl>
          <dt>Term One</dt>
          <dd>Definition of the first term with supporting details.</dd>
          
          <dt>Term Two</dt>
          <dd>Definition of the second term.</dd>
        </dl>
      </article>
    `;
    
    const blockquoteCode = `<blockquote>
  <p>Quote text here...</p>
  <cite>Attribution</cite>
</blockquote>`;

    const hrCode = `<hr>
<hr data-content="OR">`;

    highlight(blockquoteCode, 'html', getCurrentTheme()).then(h => {
      container.querySelector('.code-blockquote').innerHTML = h;
    });
    highlight(hrCode, 'html', getCurrentTheme()).then(h => {
      container.querySelector('.code-hr').innerHTML = h;
    });
    
    return container;
  }
};

TextElements.storyName = 'Text Elements';

export const InlineElements = () => html`
  <header class="card">
    <h2>Inline Elements</h2>
    <small class="text-muted">
      Small semantic elements for inline content
    </small>
  </header>

  <article class="card">
    <h3>Examples</h3>
    
    <table class="table-bordered">
      <thead>
        <tr>
          <th>Element</th>
          <th>Example</th>
          <th>Use Case</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>&lt;mark&gt;</code></td>
          <td>This is <mark>highlighted</mark> text</td>
          <td>Search results, emphasis</td>
        </tr>
        <tr>
          <td><code>&lt;kbd&gt;</code></td>
          <td>Press <kbd>Ctrl</kbd> + <kbd>S</kbd></td>
          <td>Keyboard shortcuts</td>
        </tr>
        <tr>
          <td><code>&lt;abbr&gt;</code></td>
          <td><abbr title="Pure Design System">PDS</abbr> is great</td>
          <td>Abbreviations with tooltips</td>
        </tr>
        <tr>
          <td><code>&lt;time&gt;</code></td>
          <td><time datetime="2026-01-02">January 2, 2026</time></td>
          <td>Dates and times</td>
        </tr>
        <tr>
          <td><code>&lt;code&gt;</code></td>
          <td>Use <code>var(--spacing-4)</code></td>
          <td>Inline code</td>
        </tr>
      </tbody>
    </table>
  </article>
`;

InlineElements.storyName = 'Inline Elements';

export const DetailsAndSummary = {
  render: () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <header class="card">
        <h2>Details & Summary</h2>
        <small class="text-muted">
          Native collapsible content without JavaScript
        </small>
      </header>

      <article class="card">
        <p>
          The <code>&lt;details&gt;</code> and <code>&lt;summary&gt;</code> elements provide 
          native disclosure widgets. PDS styles them with proper borders, padding, and 
          a rotating chevron indicator.
        </p>
        
        <details>
          <summary>Click to expand</summary>
          <p>This content is hidden by default and revealed when the user clicks the summary.</p>
          <p>No JavaScript required — this is native browser behavior.</p>
        </details>
        
        <details>
          <summary>Another section</summary>
          <p>Each details element operates independently.</p>
        </details>
        
        <details open>
          <summary>Open by default</summary>
          <p>Add the <code>open</code> attribute to start expanded.</p>
        </details>
        
        <div class="code-details"></div>
        
        <div class="alert alert-info" style="margin-top: var(--spacing-4);">
          <strong>Note:</strong> For grouped accordion behavior (animated, and where only one item opens at a time), 
          see the <a data-story-link="primitives-accordion--basic-accordion">Accordion primitive</a>.
        </div>
      </article>
    `;
    
    const detailsCode = `<details>
  <summary>Click to expand</summary>
  <p>Hidden content here...</p>
</details>

<details open>
  <summary>Open by default</summary>
  <p>Visible immediately</p>
</details>`;

    highlight(detailsCode, 'html', getCurrentTheme()).then(h => {
      container.querySelector('.code-details').innerHTML = h;
    });
    
    attachStoryLinkHandlers(container);
    return container;
  }
};

DetailsAndSummary.storyName = 'Details & Summary';

export const RelatedDocumentation = () => {
  const container = document.createElement('div');
  container.className = 'stack gap-md';
  container.innerHTML = `
    <header class="card">
      <h2>Related Documentation</h2>
      <small class="text-muted">
        Detailed coverage of specific element categories
      </small>
    </header>

    <div class="grid grid-auto-md gap-md">
      <a data-story-link="foundations-typography--heading-scale" class="card card-interactive">
        <h3>Typography</h3>
        <p class="text-muted">Headings, paragraphs, text utilities, and font scales</p>
      </a>
      
      <a data-story-link="primitives-forms--default" class="card card-interactive">
        <h3>Forms</h3>
        <p class="text-muted">Inputs, labels, validation, and form layout patterns</p>
      </a>
      
      <a data-story-link="primitives-buttons--button-variants" class="card card-interactive">
        <h3>Buttons</h3>
        <p class="text-muted">Button variants, states, and icon buttons</p>
      </a>
      
      <a data-story-link="primitives-tables--default-table" class="card card-interactive">
        <h3>Tables</h3>
        <p class="text-muted">Table styling, variants, and responsive patterns</p>
      </a>
      
      <a data-story-link="primitives-accordion--basic-accordion" class="card card-interactive">
        <h3>Accordion</h3>
        <p class="text-muted">Grouped collapsible sections with single-expand behavior</p>
      </a>
      
      <a data-story-link="enhancements-dropdowns--basic-dropdown" class="card card-interactive">
        <h3>Dropdown Menus</h3>
        <p class="text-muted">Navigation dropdowns using semantic HTML</p>
      </a>
    </div>
  `;
  
  attachStoryLinkHandlers(container);
  return container;
};

RelatedDocumentation.storyName = 'Related Documentation';
