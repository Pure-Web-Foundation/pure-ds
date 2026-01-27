import { html } from "lit";
import { highlight, getCurrentTheme, preloadShiki } from "../utils/shiki.js";

// Pre-load Shiki
preloadShiki();

const layoutOverviewStyles = html`
  <style>
    .story-compare-grid {
      margin-block: var(--spacing-6);
    }
    .story-code-block {
      font-size: var(--font-size-sm);
      max-width: 600px;
      overflow: auto;
    }
    .story-note {
      margin-block-start: var(--spacing-3);
    }
    .story-list {
      margin-block: var(--spacing-4);
    }
    .story-checkmark {
      font-size: var(--font-size-xl);
    }
  </style>
`;

// Code samples for comparison
const tailwindCode = /*html*/ `<section class="rounded-lg bg-white p-6 shadow-md grid gap-3">
  <header>
    <h3 class="text-xl font-semibold leading-tight">
      A Nice Box With a Title
    </h3>
    <p class="text-sm text-slate-500">
      The subtitle of the item
    </p>
  </header>

  <p class="text-sm leading-relaxed text-slate-700">
    The body of the item with some descriptive text.
  </p>

  <footer class="flex justify-center gap-6 pt-2">
    <button class="inline-flex items-center justify-center rounded-full bg-pink-600 px-8 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-pink-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 transition">
      Primary
    </button>

    <button class="inline-flex items-center justify-center rounded-full border border-pink-600 bg-white px-8 py-2.5 text-sm font-medium text-pink-600 hover:bg-pink-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 transition">
      Secondary
    </button>
  </footer>
</section>`;

const pdsCode = /*html*/ `<section class="card surface-overlay">
  <header>
    <h3>A Nice Box With a Title</h3>
    <small>
      The subtitle of the item
    </small>
  </header>
  <p>
    The body of the item with some descriptive text.
  </p>
  <footer>
    <button class="btn-primary">Primary</button>
    <button class="btn-outline">Secondary</button>
  </footer>
</section>`;

export default {
  title: "Foundations/Layout",
  parameters: {
    docs: {
      description: {
        component:
          "Understanding PDS layout philosophy and why semantic patterns beat atomic utilities.",
      },
    },
  },
};

export const LayoutIntroduction = () => {
  const container = document.createElement("div");
  container.classList.add("stack-lg");

  container.innerHTML = `
    <style>
      .story-render-result {
        display: flex;
        justify-content: center;
        
        margin: var(--spacing-4) 0;
        padding: var(--spacing-4);

        > .card {
          width: 400px
          ;}
      }
    </style>
    ${layoutOverviewStyles.strings[0]}
    <header>
      <h1>Layout in PDS</h1>
      <h4 class="text-muted">
        Power through composition of high-level concepts, not atomic control.
      </h4>
    </header>

    <article class="card surface-translucent-75">
      <h2>Why PDS Avoids Low-Level Utilities</h2>

      <p>
        Frameworks like Tailwind offer atomic utilities for every CSS property:
        <code>.p-4</code>, <code>.mt-2</code>, <code>.text-sm</code>,
        <code>.relative</code>. 
      </p>

      <p>
        While this approach offers maximum flexibility, it comes at a steep cost:
        bloated HTML, poor maintainability, and a lack of semantic meaning.
      </p>

      <header>
        <h3>Let's compare Tailwind and PDS styling</h3>
        <small>Look at the box below</small>
      </header>

      <div class="story-render-result">
        ${pdsCode}
      </div>   

      <div class="grid grid-auto-lg gap-lg surface-translucent-50 story-compare-grid">
        <div class="card surface-subtle">
          <header>
            <h3>❌ Tailwind Approach</h3>
            <small class="text-muted">Atomic utilities for everything</small>
          </header>
          <div class="story-code-block code-tailwind"></div>
          <p class="text-muted story-note">
            53 utility classes
          </p>
        </div>

        <div class="card surface-elevated">
          <header>
            <h3>✅ PDS Approach</h3>
            <small class="text-muted">Semantic HTML + primitives</small>
          </header>
          <div class="story-code-block code-pds"></div>
          <p class="text-muted story-note">
            4 primitive classes.
          </p>
        </div>
      </div>
    </article>


     <blockquote class="stack-md">
        <header class="flex flex-row items-start gap-md">
          <pds-icon icon="info" size="xl"></pds-icon>
          <h2>The verdict</h2>
        </header>
        <div>
          <p>Both approaches render identical output—but only one is maintainable.</p>
          <p>
           Tailwind optimizes for local convenience.
          </p>
          <p>
            PDS optimizes for system integrity.
          </p>
          <p>
            And at scale, that difference compounds fast.
          </p>
        </div>
      </blockquote>

    <article class="card">
      <h2>The PDS Layout Hierarchy</h2>

      <table class="table-bordered">
        <thead>
          <tr>
            <th>Level</th>
            <th>What</th>
            <th>Examples</th>
            <th>Use When</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1. Semantic HTML</strong></td>
            <td>Native elements with built-in styling</td>
            <td>
              <code>&lt;article&gt;</code>, <code>&lt;nav&gt;</code>,
              <code>&lt;section&gt;</code>, <code>&lt;header&gt;</code>
            </td>
            <td>Always start here</td>
          </tr>
          <tr>
            <td><strong>2. Primitives</strong></td>
            <td>Single-class components with full styling</td>
            <td><code>.card</code>, <code>.callout</code>, <code>.badge</code></td>
            <td>Common UI patterns</td>
          </tr>
          <tr>
            <td><strong>3. Layout Patterns</strong></td>
            <td>High-level structural utilities</td>
            <td>
              <code>.container</code>, <code>.grid-auto-md</code>,
              <code>.stack-md</code>
            </td>
            <td>Page structure</td>
          </tr>
          <tr>
            <td><strong>4. Composable Utilities</strong></td>
            <td>Minimal, purposeful utilities</td>
            <td><code>.flex</code>, <code>.gap-md</code>, <code>.grow</code></td>
            <td>Custom compositions</td>
          </tr>
          <tr>
            <td><strong>5. Inline Styles</strong></td>
            <td>One-off values using tokens</td>
            <td><code>style="margin-top: var(--spacing-4)"</code></td>
            <td>Rare exceptions</td>
          </tr>
        </tbody>
      </table>
    </article>

    <article class="card">
      <h2>Why PDS Has <em>Some</em> Utilities</h2>

      <p>
        PDS isn't anti-utility. It's anti-<em>atomic</em>. We include utilities
        that:
      </p>

      <div class="stack-md story-list">
        <div class="flex gap-md items-start">
          <span class="story-checkmark">✓</span>
          <div>
            <strong>Solve common layout problems</strong>
            <p class="text-muted">
              <code>.flex</code>, <code>.grid</code>, <code>.gap-*</code> —
              fundamental building blocks
            </p>
          </div>
        </div>

        <div class="flex gap-md items-start">
          <span class="story-checkmark">✓</span>
          <div>
            <strong>Encode complete patterns</strong>
            <p class="text-muted">
              <code>.stack-md</code> = flex + column + gap (one class instead of
              three)
            </p>
          </div>
        </div>

        <div class="flex gap-md items-start">
          <span class="story-checkmark">✓</span>
          <div>
            <strong>Can't be achieved with primitives</strong>
            <p class="text-muted">
              <code>.truncate</code>, <code>.grow</code> — no semantic element
              provides this
            </p>
          </div>
        </div>
      </div>

      <h3>What PDS Does NOT Include</h3>

      <div class="stack-md story-list">
        <div class="flex gap-md items-start">
          <span class="story-checkmark">✗</span>
          <div>
            <strong>Spacing utilities</strong> (<code>.p-4</code>,
            <code>.mt-2</code>, <code>.mx-auto</code>)
            <p class="text-muted">
              Primitives handle padding. Use <code>.section</code> or inline
              styles with tokens.
            </p>
          </div>
        </div>

        <div class="flex gap-md items-start">
          <span class="story-checkmark">✗</span>
          <div>
            <strong>Typography scale</strong> (<code>.text-sm</code>,
            <code>.text-2xl</code>)
            <p class="text-muted">
              Use semantic elements:
              <code>&lt;h1&gt;</code>-<code>&lt;h6&gt;</code>,
              <code>&lt;small&gt;</code>, <code>&lt;strong&gt;</code>
            </p>
          </div>
        </div>

        <div class="flex gap-md items-start">
          <span class="story-checkmark">✗</span>
          <div>
            <strong>Position/display</strong> (<code>.relative</code>,
            <code>.block</code>, <code>.hidden</code>)
            <p class="text-muted">
              Component-internal concerns. Components handle their own
              positioning.
            </p>
          </div>
        </div>
      </div>
    </article>

    <article class="card">
      <h2>Quick Reference: Layout Utilities</h2>

      <table class="table-bordered">
        <thead>
          <tr>
            <th>Category</th>
            <th>Classes</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Container</strong></td>
            <td><code>.container</code></td>
            <td>Centered max-width wrapper with padding</td>
          </tr>
          <tr>
            <td><strong>Grid</strong></td>
            <td>
              <code>.grid</code>, <code>.grid-cols-*</code>,
              <code>.grid-auto-*</code>
            </td>
            <td>CSS Grid layouts</td>
          </tr>
          <tr>
            <td><strong>Flex</strong></td>
            <td>
              <code>.flex</code>, <code>.flex-col</code>, <code>.flex-wrap</code>,
              <code>.grow</code>
            </td>
            <td>Flexbox layouts</td>
          </tr>
          <tr>
            <td><strong>Stack</strong></td>
            <td>
              <code>.stack-sm</code>, <code>.stack-md</code>,
              <code>.stack-lg</code>, <code>.stack-xl</code>
            </td>
            <td>Vertical rhythm (flex + column + gap)</td>
          </tr>
          <tr>
            <td><strong>Gap</strong></td>
            <td>
              <code>.gap-xs</code>, <code>.gap-sm</code>, <code>.gap-md</code>,
              <code>.gap-lg</code>, <code>.gap-xl</code>
            </td>
            <td>Spacing between flex/grid children</td>
          </tr>
          <tr>
            <td><strong>Alignment</strong></td>
            <td><code>.items-*</code>, <code>.justify-*</code></td>
            <td>Cross-axis and main-axis alignment</td>
          </tr>
          <tr>
            <td><strong>Width</strong></td>
            <td>
              <code>.max-w-sm</code>, <code>.max-w-md</code>,
              <code>.max-w-lg</code>, <code>.max-w-xl</code>
            </td>
            <td>Content width constraints</td>
          </tr>
          <tr>
            <td><strong>Section</strong></td>
            <td><code>.section</code>, <code>.section-lg</code></td>
            <td>Vertical padding for content blocks</td>
          </tr>
          <tr>
            <td><strong>Responsive</strong></td>
            <td><code>.mobile-stack</code></td>
            <td>Stack on mobile, row on desktop</td>
          </tr>
        </tbody>
      </table>
    </article>
  `;

  const theme = getCurrentTheme();

  highlight(tailwindCode, "html", theme).then((h) => {
    container.querySelector(".code-tailwind").innerHTML = h;
  });

  highlight(pdsCode, "html", theme).then((h) => {
    container.querySelector(".code-pds").innerHTML = h;
  });

  return container;
};

LayoutIntroduction.storyName = "Introduction";
