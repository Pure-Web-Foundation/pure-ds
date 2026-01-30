import { html } from "#pds/lit";

const layoutSystemStyles = html`
  <style>
    .story-demo-area { padding: var(--spacing-4); border-radius: var(--radius-md); }
    .story-demo-area-sm { padding: var(--spacing-2); border-radius: var(--radius-md); }
    .story-demo-area-md { padding: var(--spacing-3); border-radius: var(--radius-md); }
    .story-demo-item { padding: var(--spacing-2); }
    .story-demo-item-lg { padding: var(--spacing-4); }
    .story-demo-height { height: 100px; }
    .story-fixed-width { width: 100px; }
    .story-min-width { min-width: 120px; }
    .story-margin-top { margin-block-start: var(--spacing-2); }
    .story-max-width-box {
      border: 1px dashed var(--color-border);
      background-color: var(--color-surface-overlay);
      margin-inline: auto;
    }
  </style>
`;

export default {
  title: "Foundations/Layout",
  tags: ["layout", "flex", "grid", "container", "utilities", "text", "truncate", "spacing", "gap", "alignment"],
  parameters: {
    docs: {
      description: {
        component:
          "Complete layout system: Container, Grid, Flex, Stack, and Gap utilities.",
      },
    },
  },
};

// ─────────────────────────────────────────────────────────────
// CONTAINER
// ─────────────────────────────────────────────────────────────

export const Container = () => html`
  ${layoutSystemStyles}
  <div class="card surface-subtle story-demo-area-sm">
    <p class="text-muted text-center">
      Gray background shows viewport width. Container centers content with
      max-width.
    </p>

    <div class="container surface-base story-demo-area">
      <h2>Container</h2>
      <p>
        <code>.container</code> centers content with a max-width (default
        1400px) and consistent horizontal padding. Foundation for page layouts.
      </p>
      <div class="flex gap-md flex-wrap">
        <button class="btn-primary">Primary</button>
        <button class="btn-secondary">Secondary</button>
      </div>
    </div>
  </div>

  <h3>Full-Width Section Pattern</h3>
  <div class="card surface-subtle">
    <div class="container">
      <p>Content before full-width section</p>
    </div>

    <div class="card surface-inverse">
      <div class="container">
        <h4>Full-Width Background, Contained Content</h4>
        <p>Common for hero sections, CTAs, and feature highlights.</p>
      </div>
    </div>

    <div class="container">
      <p>Content continues within container.</p>
    </div>
  </div>
`;

Container.storyName = "Container";

// ─────────────────────────────────────────────────────────────
// GRID SYSTEM
// ─────────────────────────────────────────────────────────────

export const GridFixed = () => html`
  ${layoutSystemStyles}
  <header>
    <h2>Fixed Column Grids</h2>
    <p class="text-muted">Explicit column counts for predictable layouts.</p>
  </header>

  <div class="stack-md">
    <div class="card">
      <h3>.grid-cols-2</h3>
      <div class="grid grid-cols-2 gap-md">
        <div class="card surface-elevated text-center">Column 1</div>
        <div class="card surface-elevated text-center">Column 2</div>
      </div>
    </div>

    <div class="card">
      <h3>.grid-cols-3</h3>
      <div class="grid grid-cols-3 gap-md">
        <div class="card surface-elevated text-center">1</div>
        <div class="card surface-elevated text-center">2</div>
        <div class="card surface-elevated text-center">3</div>
      </div>
    </div>

    <div class="card">
      <h3>.grid-cols-4</h3>
      <div class="grid grid-cols-4 gap-sm">
        ${Array.from(
          { length: 4 },
          (_, i) => html`
            <div class="card surface-elevated text-center">
              <strong>${i + 1}</strong>
            </div>
          `
        )}
      </div>
    </div>

    <div class="card">
      <h3>.grid-cols-6</h3>
      <div class="grid grid-cols-6 gap-xs">
        ${Array.from(
          { length: 6 },
          (_, i) => html`
            <div class="card surface-elevated text-center">
              <strong>${i + 1}</strong>
            </div>
          `
        )}
      </div>
    </div>
  </div>
`;

GridFixed.storyName = "Grid: Fixed Columns";

export const GridAuto = () => html`
  ${layoutSystemStyles}
  <header class="card">
    <h2>Auto-Fit Responsive Grids</h2>
    <p class="text-muted">
      Automatically adjust columns based on available space. Resize the browser
      to see the effect.
    </p>
  </header>

  <div class="card">
    <h3>.grid-auto-sm (min 150px)</h3>
    <div class="grid grid-auto-sm gap-md">
      ${Array.from(
        { length: 6 },
        (_, i) => html`
          <div class="card surface-elevated text-center">
            <pds-icon icon="square" size="md" class="icon-primary"></pds-icon>
            <p>Item ${i + 1}</p>
          </div>
        `
      )}
    </div>
  </div>

  <div class="card">
    <h3>.grid-auto-md (min 250px)</h3>
    <div class="grid grid-auto-md gap-lg">
      ${Array.from(
        { length: 4 },
        (_, i) => html`
          <div class="card surface-elevated text-center">
            <pds-icon icon="circle" size="lg" class="icon-success"></pds-icon>
            <h4>Card ${i + 1}</h4>
            <p>Larger min-width = fewer columns on small screens</p>
          </div>
        `
      )}
    </div>
  </div>

  <div class="card">
    <h3>.grid-auto-lg (min 350px)</h3>
    <div class="grid grid-auto-lg gap-lg">
      ${Array.from(
        { length: 3 },
        (_, i) => html`
          <div class="card surface-elevated text-center">
            <pds-icon icon="diamond" size="xl" class="icon-accent"></pds-icon>
            <h4>Feature ${i + 1}</h4>
            <p>Wide cards for feature sections</p>
          </div>
        `
      )}
    </div>
  </div>
`;

GridAuto.storyName = "Grid: Auto-Fit";

// ─────────────────────────────────────────────────────────────
// FLEXBOX
// ─────────────────────────────────────────────────────────────

export const FlexBasics = () => html`
  ${layoutSystemStyles}
  <header class="card">
    <h2>Flexbox Utilities</h2>
    <p class="text-muted">
      Compose layouts with <code>.flex</code> + modifiers.
    </p>
  </header>

  <div class="card">
    <h3>.flex (row by default)</h3>
    <div class="flex gap-md surface-subtle story-demo-area">
      <div class="card">Item 1</div>
      <div class="card">Item 2</div>
      <div class="card">Item 3</div>
    </div>
  </div>

  <div class="card">
    <h3>.stack-sm (vertical)</h3>
    <div class="stack-sm surface-subtle story-demo-area">
      <div class="card">Item 1</div>
      <div class="card">Item 2</div>
      <div class="card">Item 3</div>
    </div>
  </div>

  <div class="card">
    <h3>.flex .flex-wrap</h3>
    <div class="flex flex-wrap gap-sm surface-subtle story-demo-area">
      ${Array.from(
        { length: 8 },
        (_, i) => html`
          <div class="card story-min-width">Item ${i + 1}</div>
        `
      )}
    </div>
  </div>

  <div class="card">
    <h3>.grow (fill remaining space)</h3>
    <div class="flex gap-md surface-subtle story-demo-area">
      <div class="card story-fixed-width">Fixed</div>
      <div class="card grow">This item grows to fill available space</div>
      <div class="card story-fixed-width">Fixed</div>
    </div>
  </div>
`;

FlexBasics.storyName = "Flex: Basics";

export const FlexAlignment = () => html`
  ${layoutSystemStyles}
  <header class="card">
    <h2>Alignment Utilities</h2>
    <p class="text-muted">
      Cross-axis: <code>.items-*</code> | Main-axis: <code>.justify-*</code>
    </p>
  </header>

  <div class="card">
    <h3>Items Alignment (Cross-Axis)</h3>
    <div class="grid grid-cols-3 gap-md">
      <div>
        <code>.items-start</code>
        <div class="flex items-start gap-sm surface-subtle story-demo-area-sm story-demo-height">
          <div class="card story-demo-item">A</div>
          <div class="card story-demo-item-lg">B</div>
        </div>
      </div>
      <div>
        <code>.items-center</code>
        <div class="flex items-center gap-sm surface-subtle story-demo-area-sm story-demo-height">
          <div class="card story-demo-item">A</div>
          <div class="card story-demo-item-lg">B</div>
        </div>
      </div>
      <div>
        <code>.items-end</code>
        <div class="flex items-end gap-sm surface-subtle story-demo-area-sm story-demo-height">
          <div class="card story-demo-item">A</div>
          <div class="card story-demo-item-lg">B</div>
        </div>
      </div>
    </div>
  </div>

  <div class="card">
    <h3>Justify Content (Main-Axis)</h3>
    <div class="stack-md">
      ${["start", "center", "end", "between", "around", "evenly"].map(
        (justify) => html`
          <div>
            <code>.justify-${justify}</code>
            <div class="flex justify-${justify} gap-sm surface-subtle story-demo-area-sm">
              <div class="card story-demo-item">A</div>
              <div class="card story-demo-item">B</div>
              <div class="card story-demo-item">C</div>
            </div>
          </div>
        `
      )}
    </div>
  </div>
`;

FlexAlignment.storyName = "Flex: Alignment";

// ─────────────────────────────────────────────────────────────
// STACK
// ─────────────────────────────────────────────────────────────

export const Stack = () => html`
  ${layoutSystemStyles}
  <header>
    <h2>Stack Utilities</h2>
    <p class="text-muted">
      Vertical layouts with consistent spacing.
      <code>.stack-*</code> = <code>.flex .flex-col .gap-*</code> in one class.
    </p>
  </header>

  <div class="stack-md">
    <div class="card grid grid-cols-2 gap-lg">
      ${["sm", "md", "lg", "xl"].map(
        (size) => html`
          <div class="card">
            <h3>.stack-${size}</h3>
            <div class="stack-${size} surface-subtle story-demo-area-md">
              <div class="card story-demo-item">Item 1</div>
              <div class="card story-demo-item">Item 2</div>
              <div class="card story-demo-item">Item 3</div>
            </div>
          </div>
        `
      )}
    </div>

    <div class="card">
      <h3>Practical: Form Layout</h3>
      <form class="stack-md max-w-md">
        <label>
          <span data-label>Name</span>
          <input type="text" placeholder="John Doe" />
        </label>
        <label>
          <span data-label>Email</span>
          <input type="email" placeholder="john@example.com" />
        </label>
        <label>
          <span data-label>Message</span>
          <textarea rows="3" placeholder="Your message..."></textarea>
        </label>
        <div class="flex gap-sm justify-end">
          <button type="button" class="btn-secondary">Cancel</button>
          <button type="submit" class="btn-primary">Submit</button>
        </div>
      </form>
    </div>
  </div>
`;

Stack.storyName = "Stack";

// ─────────────────────────────────────────────────────────────
// GAP
// ─────────────────────────────────────────────────────────────

export const Gap = () => html`
  ${layoutSystemStyles}
  <header>
    <h2>Gap Utilities</h2>
    <p class="text-muted">Control spacing between flex/grid children.</p>
  </header>

  <div class="stack-md">
    ${[
      { cls: "gap-0", label: "0" },
      { cls: "gap-xs", label: "var(--spacing-1)" },
      { cls: "gap-sm", label: "var(--spacing-2)" },
      { cls: "gap-md", label: "var(--spacing-4)" },
      { cls: "gap-lg", label: "var(--spacing-6)" },
      { cls: "gap-xl", label: "var(--spacing-8)" },
    ].map(
      ({ cls, label }) => html`
        <div class="card">
          <code>.${cls}</code> <span class="text-muted">(${label})</span>
          <div class="grid grid-cols-4 ${cls} story-margin-top">
            ${Array.from(
              { length: 4 },
              (_, i) => html`
                <div class="card surface-elevated text-center story-demo-item">
                  ${i + 1}
                </div>
              `
            )}
          </div>
        </div>
      `
    )}
  </div>
`;

Gap.storyName = "Gap";

// ─────────────────────────────────────────────────────────────
// MAX-WIDTH
// ─────────────────────────────────────────────────────────────

export const MaxWidth = () => html`
  ${layoutSystemStyles}
  <header class="card stack-sm">
    <h2>Max-Width Utilities</h2>
    <p class="text-muted">
      Each utility maps to a <code>--layout-max-width-*</code> token that is paired with the
      matching breakpoint token (for example <code>--breakpoint-sm</code>). Updating
      <code>layout.maxWidths</code> or <code>layout.breakpoints</code> in config keeps the
      clamp width and responsive snap point aligned.
    </p>
  </header>

  <div class="stack-lg">
    ${[
      {
        cls: "max-w-sm",
        token: "--layout-max-width-sm",
        breakpoint: "--breakpoint-sm",
        use: "Dialogs, login panels, onboarding cards",
      },
      {
        cls: "max-w-md",
        token: "--layout-max-width-md",
        breakpoint: "--breakpoint-md",
        use: "Marketing cards, multi-step forms",
      },
      {
        cls: "max-w-lg",
        token: "--layout-max-width-lg",
        breakpoint: "--breakpoint-lg",
        use: "Articles, documentation, knowledge base",
      },
      {
        cls: "max-w-xl",
        token: "--layout-max-width-xl",
        breakpoint: "--breakpoint-xl",
        use: "Dashboards, complex data layouts",
      },
    ].map(
      ({ cls, token, breakpoint, use }) => html`
        <article class="card surface-subtle stack-sm">
          <div class="flex items-center justify-between gap-sm flex-wrap">
            <div>
              <code>.${cls}</code>
              <p class="text-muted text-sm">${use}</p>
            </div>
            <p class="text-sm text-muted">
              <code>${token}</code>
              <span aria-hidden="true">↔</span>
              <code>${breakpoint}</code>
            </p>
          </div>

          <div class="${cls} story-demo-area story-max-width-box">
            <p>
              This block grows fluidly until it hits ${token}, which is sized just
              under ${breakpoint}. Changing either value in config keeps editorial widths
              and responsive breakpoints in lockstep.
            </p>
          </div>
        </article>
      `
    )}
  </div>
`;

MaxWidth.storyName = "Max-Width";

// ─────────────────────────────────────────────────────────────
// SECTION SPACING
// ─────────────────────────────────────────────────────────────

export const Section = () => html`
  ${layoutSystemStyles}
  <header>
    <h2>Section Spacing</h2>
    <p class="text-muted">Vertical padding for major content blocks.</p>
  </header>

  <div
    class="stack-lg"
  >
    <div class="section surface-elevated surface-translucent-50 text-center">
      <h3>.section</h3>
      <p>padding-block: var(--spacing-8)</p>
    </div>

    <div class="section-lg surface-overlay text-center">
      <h3>.section-lg</h3>
      <p>padding-block: var(--spacing-12)</p>
    </div>
  </div>
`;

Section.storyName = "Section";

// ─────────────────────────────────────────────────────────────
// RESPONSIVE
// ─────────────────────────────────────────────────────────────

export const Responsive = () => html`
  ${layoutSystemStyles}
  <div class="card">
    <h2>Responsive Utilities</h2>
  </div>

  <div class="card">
    <h3>.mobile-stack</h3>
    <p class="text-muted">
      Row on desktop, column on mobile. Resize browser to see effect.
    </p>

    <div class="flex mobile-stack gap-md">
      <article class="card surface-elevated">
        <h4>Feature One</h4>
        <p>Horizontal on desktop</p>
      </article>
      <article class="card surface-elevated">
        <h4>Feature Two</h4>
        <p>Stacks on mobile</p>
      </article>
      <article class="card surface-elevated">
        <h4>Feature Three</h4>
        <p>No custom CSS needed</p>
      </article>
    </div>
  </div>

  <div class="card">
    <h3>Practical: Form + Button</h3>
    <div class="flex mobile-stack gap-md items-end">
      <label class="grow">
        <span>Email</span>
        <input type="email" placeholder="you@example.com" />
      </label>
      <button>Subscribe</button>
    </div>
  </div>
`;

Responsive.storyName = "Responsive";

// ─────────────────────────────────────────────────────────────
// TEXT UTILITIES
// ─────────────────────────────────────────────────────────────

export const TextUtilities = () => html`
  ${layoutSystemStyles}
  <div class="card">
    <h2>Text Utilities</h2>
  </div>

  <div class="card">
    <h3>Text Alignment</h3>
    <div class="grid grid-cols-3 gap-md">
      <div class="card">
        <code>.text-left</code>
        <p class="text-left">Left-aligned (default for LTR)</p>
      </div>
      <div class="card">
        <code>.text-center</code>
        <p class="text-center">Centered text</p>
      </div>
      <div class="card">
        <code>.text-right</code>
        <p class="text-right">Right-aligned</p>
      </div>
    </div>
  </div>

  <div class="card">
    <h3>.truncate</h3>
    <p class="text-muted">Truncates text with ellipsis when overflowing.</p>
    <div class="max-w-sm surface-subtle story-demo-area-md">
      <p class="truncate">
        This is a very long piece of text that will be truncated with an
        ellipsis when it overflows its container because it has the .truncate
        class applied.
      </p>
    </div>
  </div>
`;

TextUtilities.storyName = "Text";

// ─────────────────────────────────────────────────────────────
// REFERENCE TABLE
// ─────────────────────────────────────────────────────────────

export const Reference = () => html`
  ${layoutSystemStyles}
  <div class="card">
    <h2>Complete Layout Reference</h2>
    <p class="text-muted">All layout utilities in PDS.</p>
  </div>

  <table class="table-bordered table-compact">
    <thead>
      <tr>
        <th>Category</th>
        <th>Class</th>
        <th>CSS</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colspan="3"><strong>Container</strong></td>
      </tr>
      <tr>
        <td></td>
        <td><code>.container</code></td>
        <td>max-width + padding + auto margins</td>
      </tr>

      <tr>
        <td colspan="3"><strong>Grid</strong></td>
      </tr>
      <tr>
        <td></td>
        <td><code>.grid</code></td>
        <td>display: grid</td>
      </tr>
      <tr>
        <td></td>
        <td><code>.grid-cols-1</code> to <code>.grid-cols-6</code></td>
        <td>Fixed column counts (1, 2, 3, 4, 6)</td>
      </tr>
      <tr>
        <td></td>
        <td><code>.grid-auto-sm</code></td>
        <td>auto-fit, min 150px</td>
      </tr>
      <tr>
        <td></td>
        <td><code>.grid-auto-md</code></td>
        <td>auto-fit, min 250px</td>
      </tr>
      <tr>
        <td></td>
        <td><code>.grid-auto-lg</code></td>
        <td>auto-fit, min 350px</td>
      </tr>
      <tr>
        <td></td>
        <td><code>.grid-auto-xl</code></td>
        <td>auto-fit, min 450px</td>
      </tr>

      <tr>
        <td colspan="3"><strong>Flexbox</strong></td>
      </tr>
      <tr>
        <td></td>
        <td><code>.flex</code></td>
        <td>display: flex</td>
      </tr>
      <tr>
        <td></td>
        <td><code>.flex-col</code></td>
        <td>flex-direction: column</td>
      </tr>
      <tr>
        <td></td>
        <td><code>.flex-row</code></td>
        <td>flex-direction: row</td>
      </tr>
      <tr>
        <td></td>
        <td><code>.flex-wrap</code></td>
        <td>flex-wrap: wrap</td>
      </tr>
      <tr>
        <td></td>
        <td><code>.grow</code></td>
        <td>flex: 1 1 0%</td>
      </tr>

      <tr>
        <td colspan="3"><strong>Stack (Vertical)</strong></td>
      </tr>
      <tr>
        <td></td>
        <td><code>.stack-sm</code></td>
        <td>flex column, gap: --spacing-2</td>
      </tr>
      <tr>
        <td></td>
        <td><code>.stack-md</code></td>
        <td>flex column, gap: --spacing-4</td>
      </tr>
      <tr>
        <td></td>
        <td><code>.stack-lg</code></td>
        <td>flex column, gap: --spacing-6</td>
      </tr>
      <tr>
        <td></td>
        <td><code>.stack-xl</code></td>
        <td>flex column, gap: --spacing-8</td>
      </tr>

      <tr>
        <td colspan="3"><strong>Items Align</strong></td>
      </tr>
      <tr>
        <td></td>
        <td><code>.items-start</code></td>
        <td>align-items: flex-start</td>
      </tr>
      <tr>
        <td></td>
        <td><code>.items-center</code></td>
        <td>align-items: center</td>
      </tr>
      <tr>
        <td></td>
        <td><code>.items-end</code></td>
        <td>align-items: flex-end</td>
      </tr>
      <tr>
        <td></td>
        <td><code>.items-stretch</code></td>
        <td>align-items: stretch</td>
      </tr>
      <tr>
        <td></td>
        <td><code>.items-baseline</code></td>
        <td>align-items: baseline</td>
      </tr>

      <tr>
        <td colspan="3"><strong>Justify</strong></td>
      </tr>
      <tr>
        <td></td>
        <td><code>.justify-start</code></td>
        <td>justify-content: flex-start</td>
      </tr>
      <tr>
        <td></td>
        <td><code>.justify-center</code></td>
        <td>justify-content: center</td>
      </tr>
      <tr>
        <td></td>
        <td><code>.justify-end</code></td>
        <td>justify-content: flex-end</td>
      </tr>
      <tr>
        <td></td>
        <td><code>.justify-between</code></td>
        <td>justify-content: space-between</td>
      </tr>
      <tr>
        <td></td>
        <td><code>.justify-around</code></td>
        <td>justify-content: space-around</td>
      </tr>
      <tr>
        <td></td>
        <td><code>.justify-evenly</code></td>
        <td>justify-content: space-evenly</td>
      </tr>

      <tr>
        <td colspan="3"><strong>Gap</strong></td>
      </tr>
      <tr>
        <td></td>
        <td><code>.gap-0</code></td>
        <td>gap: 0</td>
      </tr>
      <tr>
        <td></td>
        <td><code>.gap-xs</code></td>
        <td>gap: var(--spacing-1)</td>
      </tr>
      <tr>
        <td></td>
        <td><code>.gap-sm</code></td>
        <td>gap: var(--spacing-2)</td>
      </tr>
      <tr>
        <td></td>
        <td><code>.gap-md</code></td>
        <td>gap: var(--spacing-4)</td>
      </tr>
      <tr>
        <td></td>
        <td><code>.gap-lg</code></td>
        <td>gap: var(--spacing-6)</td>
      </tr>
      <tr>
        <td></td>
        <td><code>.gap-xl</code></td>
        <td>gap: var(--spacing-8)</td>
      </tr>

      <tr>
        <td colspan="3"><strong>Max-Width</strong></td>
      </tr>
      <tr>
        <td></td>
        <td><code>.max-w-sm</code></td>
        <td>max-width: 400px</td>
      </tr>
      <tr>
        <td></td>
        <td><code>.max-w-md</code></td>
        <td>max-width: 600px</td>
      </tr>
      <tr>
        <td></td>
        <td><code>.max-w-lg</code></td>
        <td>max-width: 800px</td>
      </tr>
      <tr>
        <td></td>
        <td><code>.max-w-xl</code></td>
        <td>max-width: 1200px</td>
      </tr>

      <tr>
        <td colspan="3"><strong>Section</strong></td>
      </tr>
      <tr>
        <td></td>
        <td><code>.section</code></td>
        <td>padding-block: var(--spacing-8)</td>
      </tr>
      <tr>
        <td></td>
        <td><code>.section-lg</code></td>
        <td>padding-block: var(--spacing-12)</td>
      </tr>

      <tr>
        <td colspan="3"><strong>Text</strong></td>
      </tr>
      <tr>
        <td></td>
        <td><code>.text-left</code></td>
        <td>text-align: left</td>
      </tr>
      <tr>
        <td></td>
        <td><code>.text-center</code></td>
        <td>text-align: center</td>
      </tr>
      <tr>
        <td></td>
        <td><code>.text-right</code></td>
        <td>text-align: right</td>
      </tr>
      <tr>
        <td></td>
        <td><code>.truncate</code></td>
        <td>text-overflow: ellipsis + overflow hidden</td>
      </tr>

      <tr>
        <td colspan="3"><strong>Responsive</strong></td>
      </tr>
      <tr>
        <td></td>
        <td><code>.mobile-stack</code></td>
        <td>Column on mobile, row on desktop</td>
      </tr>
    </tbody>
  </table>
`;

Reference.storyName = "Reference";
