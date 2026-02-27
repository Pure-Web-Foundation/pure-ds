import { html } from "#pds/lit";

export default {
  title: "Primitives/Articles",
  tags: ["typography", "content", "article", "layout", "readability"],
  parameters: {
    pds: {
      tags: ["typography", "content", "article", "layout", "readability"],
    },
    docs: {
      description: {
        component:
          "Long-form content layout pattern using semantic article markup and PDS primitives.",
      },
    },
  },
};

export const ArticleLayout = {
  name: "Article Layout",
  render: () => html`
    <article>
      <header>
        <div class="text-muted story-article-meta">Design Systems</div>
        <h1>Building Scalable Design Systems for Modern Web Applications</h1>
        <small class="text-muted"
          >By Sarah Chen • November 17, 2025 • 8 min read</small
        >
      </header>

      <p>
        <strong>
        A design system is more than a component library—it's a shared language
        that bridges design and development, ensuring consistency and quality
        across your entire product ecosystem.
        </strong>
      </p>

      <p>
        In today's fast-paced development environment, maintaining visual and
        functional consistency across multiple products and teams is
        increasingly challenging. Design systems have emerged as the solution,
        providing a single source of truth for design decisions, component
        patterns, and implementation guidelines.
      </p>

      <section>
        <h2>Key Components of a Design System</h2>

        <p>
          A comprehensive design system consists of several interconnected
          layers, each serving a specific purpose in the overall architecture:
        </p>

        <ul>
          <li>
            <strong>Design Tokens:</strong> The foundational layer defining
            colors, typography, spacing, and other atomic values
          </li>
          <li>
            <strong>Component Library:</strong> Reusable UI components built
            with consistent patterns
          </li>
          <li>
            <strong>Documentation:</strong> Clear guidelines on when and how to
            use each component
          </li>
          <li>
            <strong>Tools & Resources:</strong> Figma libraries, code templates,
            and development tools
          </li>
        </ul>

        <blockquote>
          <p>
            A design system isn't a project. It's a product serving products.
          </p>
          <cite>Nathan Curtis, Design Systems Expert</cite>
        </blockquote>
      </section>

      <h3>Getting Started with Design Tokens</h3>

      <p>
        Design tokens are the DNA of your design system. These named values
        represent design decisions that can be shared across platforms and
        technologies. For example, instead of hardcoding
        <code>#0066cc</code>, you define <code>--color-primary</code> which can
        be updated globally.
      </p>

      <section>
        <h4 class="story-impl-heading">Implementation Example</h4>
        <pre
          class="surface-base story-code-block"
        ><code>/* Design tokens in CSS */
:root {
  --color-primary: #0066cc;
  --spacing-unit: 4px;
  --font-family-base: system-ui, sans-serif;
  --border-radius-md: 8px;
}</code></pre>

        <p>
          By adopting this approach, you create a flexible foundation that can
          evolve with your product needs while maintaining consistency across
          all touchpoints.
        </p>
      </section>

      <footer>
        <div class="flex gap-md flex-wrap">
          <span class="badge badge-outline badge-primary">Design Systems</span>
          <span class="badge badge-outline badge-primary">Web Components</span>
          <span class="badge badge-outline badge-primary">CSS Architecture</span>
        </div>
      </footer>
    </article>
  `,
};
