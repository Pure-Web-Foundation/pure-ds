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
          >By Sarah Chen • <time datetime="2025-11-17">November 17, 2025</time>
          • 8 min read</small
        >
      </header>

      <p>
        <strong>
        A design system is more than a component library—it's a shared language
        that bridges design and development, ensuring consistency and quality
        across your entire product ecosystem.
        </strong>
      </p>

      <figure class="flex flex-col items-center gap-sm">
        <img
          src="/assets/img/og.webp"
          alt="Pure Design System logo"
          loading="lazy"
        />
        <figcaption class="text-muted">
          Keep brand assets semantic and documented alongside implementation
          guidance.
        </figcaption>
      </figure>

      <p>
        In today's fast-paced development environment, maintaining visual and
        functional consistency across multiple products and teams is
        increasingly challenging. Design systems have emerged as the solution,
        providing a single source of truth for design decisions, component
        patterns, and implementation guidelines.
      </p>

      <nav aria-label="Article sections">
        <h2 class="h4">In this article</h2>
        <ol>
          <li><a href="#components">Key components</a></li>
          <li><a href="#tokens">Design tokens</a></li>
          <li><a href="#rollout">Rollout checklist</a></li>
        </ol>
      </nav>

      <section id="components">
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

      <section id="tokens">
        <h3>Getting Started with Design Tokens</h3>

        <p>
          Design tokens are the DNA of your design system. These named values
          represent design decisions that can be shared across platforms and
          technologies. Instead of repeating one-off values in many places, you
          define reusable variables like <code>--color-primary</code> that can be
          updated globally.
        </p>

        <figure>
          <pre
            class="surface-base story-code-block"
          ><code>/* Design tokens in CSS */
:root {
  --color-primary: var(--color-brand-500);
  --spacing-unit: var(--spacing-1x);
  --font-family-base: var(--font-family-sans);
  --border-radius-md: var(--radius-md);
}</code></pre>
          <figcaption class="text-muted">
            Token-first foundation: define semantic aliases once and consume them
            throughout components and layouts.
          </figcaption>
        </figure>
      </section>

      <aside class="callout callout-info" aria-label="Editorial note">
        <h4>Editorial note</h4>
        <p>
          Teams that publish token naming conventions early usually reduce
          handoff friction. Keep terminology consistent between design files and
          code.
        </p>
      </aside>

      
      
        <h4 class="story-impl-heading">Rollout Checklist</h4>
        <ul>
          <li>Document token categories and ownership</li>
          <li>Ship a pilot component set with usage guidance</li>
          <li>Track adoption with a lightweight release cadence</li>
        </ul>
      
  
          <p>
            By adopting this approach, you create a flexible foundation that can
            evolve with your product needs while maintaining consistency across
            all touchpoints.
          </p>
  
      </section>
      

      <footer>

        <div class="flex gap-sm flex-wrap">
          <span class="badge badge-outline badge-primary">Design Systems</span>
          <span class="badge badge-outline badge-primary">Web Components</span>
          <span class="badge badge-outline badge-primary">CSS Architecture</span>
        </div>

        <hr/>
        
        <address class="text-muted">
          <small>Written for the PDS documentation team.</small>
        </address>
      </footer>
    </article>
  `,
};
