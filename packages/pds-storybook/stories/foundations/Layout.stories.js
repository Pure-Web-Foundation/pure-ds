import { html } from 'lit';

export default {
  title: 'Foundations/Layout',
  parameters: {
    docs: {
      description: {
        component: 'Understanding PDS layout philosophy and why semantic patterns beat atomic utilities.'
      }
    }
  }
};

export const Introduction = {
  name: 'Introduction',
  render: () => html`
  
  <h1>Layout in PDS</h1>
  <h3 class="text-muted" style="font-size: var(--font-size-lg);">
    Power through composition of high-level concepts, not atomic control.
  </h3>


  <article class="card surface-translucent-50">
    <h2>Why PDS Avoids Low-Level Utilities</h2>
    
    <p>
      Frameworks like Tailwind offer atomic utilities for every CSS property: 
      <code>.p-4</code>, <code>.mt-2</code>, <code>.text-sm</code>, <code>.relative</code>.
      This approach has a hidden cost: <strong>DIV soup</strong>.
    </p>

    <div class="grid grid-cols-2 gap-lg surface-translucent-50" style="margin: var(--spacing-6) 0;">
      <div class="card surface-subtle">
        <h3>❌ Tailwind Approach</h3>
        <pre style="font-size: var(--font-size-sm); overflow-x: auto;"><code>&lt;div class="p-4 mt-2 rounded-lg 
  bg-white shadow-md flex 
  flex-col gap-2"&gt;
  &lt;div class="text-lg font-bold"&gt;
    Title
  &lt;/div&gt;
  &lt;div class="text-sm text-gray-500"&gt;
    Description
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
        <p class="text-muted" style="margin-top: var(--spacing-3);">
          8 utility classes, no semantic meaning, hard to maintain.
        </p>
      </div>

      <div class="card surface-elevated">
        <h3>✅ PDS Approach</h3>
        <pre style="font-size: var(--font-size-sm); overflow-x: auto;"><code>&lt;article class="card"&gt;
  &lt;h3&gt;Title&lt;/h3&gt;
  &lt;p class="text-muted"&gt;
    Description
  &lt;/p&gt;
&lt;/article&gt;</code></pre>
        <p class="text-muted" style="margin-top: var(--spacing-3);">
          Semantic HTML + 1 primitive class. Self-documenting.
        </p>
      </div>
    </div>
  </article>

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
          <td><code>&lt;article&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;header&gt;</code></td>
          <td>Always start here</td>
        </tr>
        <tr>
          <td><strong>2. Primitives</strong></td>
          <td>Single-class components with full styling</td>
          <td><code>.card</code>, <code>.alert</code>, <code>.badge</code></td>
          <td>Common UI patterns</td>
        </tr>
        <tr>
          <td><strong>3. Layout Patterns</strong></td>
          <td>High-level structural utilities</td>
          <td><code>.container</code>, <code>.grid-auto-md</code>, <code>.stack-md</code></td>
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
      PDS isn't anti-utility. It's anti-<em>atomic</em>. We include utilities that:
    </p>

    <div class="stack-md" style="margin: var(--spacing-4) 0;">
      <div class="flex gap-md items-start">
        <span style="font-size: var(--font-size-xl);">✓</span>
        <div>
          <strong>Solve common layout problems</strong>
          <p class="text-muted">
            <code>.flex</code>, <code>.grid</code>, <code>.gap-*</code> — fundamental building blocks
          </p>
        </div>
      </div>
      
      <div class="flex gap-md items-start">
        <span style="font-size: var(--font-size-xl);">✓</span>
        <div>
          <strong>Encode complete patterns</strong>
          <p class="text-muted">
            <code>.stack-md</code> = flex + column + gap (one class instead of three)
          </p>
        </div>
      </div>
      
      <div class="flex gap-md items-start">
        <span style="font-size: var(--font-size-xl);">✓</span>
        <div>
          <strong>Can't be achieved with primitives</strong>
          <p class="text-muted">
            <code>.truncate</code>, <code>.grow</code> — no semantic element provides this
          </p>
        </div>
      </div>
    </div>

    <h3>What PDS Does NOT Include</h3>
    
    <div class="stack-md" style="margin: var(--spacing-4) 0;">
      <div class="flex gap-md items-start">
        <span style="font-size: var(--font-size-xl);">✗</span>
        <div>
          <strong>Spacing utilities</strong> (<code>.p-4</code>, <code>.mt-2</code>, <code>.mx-auto</code>)
          <p class="text-muted">
            Primitives handle padding. Use <code>.section</code> or inline styles with tokens.
          </p>
        </div>
      </div>
      
      <div class="flex gap-md items-start">
        <span style="font-size: var(--font-size-xl);">✗</span>
        <div>
          <strong>Typography scale</strong> (<code>.text-sm</code>, <code>.text-2xl</code>)
          <p class="text-muted">
            Use semantic elements: <code>&lt;h1&gt;</code>-<code>&lt;h6&gt;</code>, <code>&lt;small&gt;</code>, <code>&lt;strong&gt;</code>
          </p>
        </div>
      </div>
      
      <div class="flex gap-md items-start">
        <span style="font-size: var(--font-size-xl);">✗</span>
        <div>
          <strong>Position/display</strong> (<code>.relative</code>, <code>.block</code>, <code>.hidden</code>)
          <p class="text-muted">
            Component-internal concerns. Components handle their own positioning.
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
          <td><code>.grid</code>, <code>.grid-cols-*</code>, <code>.grid-auto-*</code></td>
          <td>CSS Grid layouts</td>
        </tr>
        <tr>
          <td><strong>Flex</strong></td>
          <td><code>.flex</code>, <code>.flex-col</code>, <code>.flex-wrap</code>, <code>.grow</code></td>
          <td>Flexbox layouts</td>
        </tr>
        <tr>
          <td><strong>Stack</strong></td>
          <td><code>.stack-sm</code>, <code>.stack-md</code>, <code>.stack-lg</code>, <code>.stack-xl</code></td>
          <td>Vertical rhythm (flex + column + gap)</td>
        </tr>
        <tr>
          <td><strong>Gap</strong></td>
          <td><code>.gap-xs</code>, <code>.gap-sm</code>, <code>.gap-md</code>, <code>.gap-lg</code>, <code>.gap-xl</code></td>
          <td>Spacing between flex/grid children</td>
        </tr>
        <tr>
          <td><strong>Alignment</strong></td>
          <td><code>.items-*</code>, <code>.justify-*</code></td>
          <td>Cross-axis and main-axis alignment</td>
        </tr>
        <tr>
          <td><strong>Width</strong></td>
          <td><code>.max-w-sm</code>, <code>.max-w-md</code>, <code>.max-w-lg</code>, <code>.max-w-xl</code></td>
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
`
};
