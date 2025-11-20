import { html } from 'lit';

export default {
  title: 'Foundations/Typography',
  parameters: {
    docs: {
      description: {
        component: 'Typography system with scales, weights, line heights, and semantic text styles for building clear content hierarchy and readable interfaces.'
      }
    }
  }
};

export const HeadingScale = {
  name: 'Heading Scale',
  render: () => html`
    <div style="padding: 2rem; max-width: 1200px;">
      <h1>Heading Level 1</h1>
      <p class="text-muted" style="margin-top: -0.5rem; margin-bottom: 2rem;">
        Page title or hero heading - 2.5rem (40px) at default scale
      </p>
      
      <h2>Heading Level 2</h2>
      <p class="text-muted" style="margin-top: -0.5rem; margin-bottom: 2rem;">
        Section heading - 2rem (32px) at default scale
      </p>
      
      <h3>Heading Level 3</h3>
      <p class="text-muted" style="margin-top: -0.5rem; margin-bottom: 2rem;">
        Subsection heading - 1.5rem (24px) at default scale
      </p>
      
      <h4>Heading Level 4</h4>
      <p class="text-muted" style="margin-top: -0.5rem; margin-bottom: 2rem;">
        Card or component heading - 1.25rem (20px) at default scale
      </p>
      
      <h5>Heading Level 5</h5>
      <p class="text-muted" style="margin-top: -0.5rem; margin-bottom: 2rem;">
        Small heading - 1.125rem (18px) at default scale
      </p>
      
      <h6>Heading Level 6</h6>
      <p class="text-muted" style="margin-top: -0.5rem; margin-bottom: 1rem;">
        Smallest heading - 1rem (16px) at default scale
      </p>
    </div>
  `
};

export const TextStyles = {
  name: 'Text Styles & Weights',
  render: () => html`
    <div style="padding: 2rem; max-width: 1200px;">
      <h2>Font Weights</h2>
      <div style="margin-bottom: 3rem;">
        <p style="font-weight: 300;">Light (300) - Subtle, delicate text</p>
        <p style="font-weight: 400;">Normal (400) - Default body text</p>
        <p style="font-weight: 500;">Medium (500) - Slightly emphasized</p>
        <p style="font-weight: 600;">Semibold (600) - Strong emphasis</p>
        <p style="font-weight: 700;">Bold (700) - Heavy emphasis</p>
      </div>
      
      <h2>Text Decorations</h2>
      <div style="margin-bottom: 3rem;">
        <p><strong>Bold text</strong> for important terms and emphasis</p>
        <p><em>Italic text</em> for subtle emphasis and citations</p>
        <p><u>Underlined text</u> - use sparingly, reserve for links</p>
        <p><del>Strikethrough text</del> for deprecated or removed content</p>
        <p><mark>Highlighted text</mark> for search results or important notes</p>
        <p><code>Inline code</code> for technical terms and commands</p>
        <p><small>Small text</small> for fine print and disclaimers</p>
      </div>
      
      <h2>Semantic Text Colors</h2>
      <div style="display: grid; gap: 0.5rem;">
        <p>Normal text - default color for body content</p>
        <p class="text-muted">Muted text - secondary information, captions, timestamps</p>
        <p style="color: var(--color-primary);">Primary colored text - brand accent, links</p>
        <p style="color: var(--color-success);">Success text - positive feedback, completed states</p>
        <p style="color: var(--color-warning);">Warning text - caution messages, pending states</p>
        <p style="color: var(--color-danger);">Danger text - errors, critical alerts, destructive actions</p>
      </div>
    </div>
  `
};

export const LineHeights = {
  name: 'Line Heights & Readability',
  render: () => html`
    <div style="padding: 2rem; max-width: 1200px;">
      <h2>Tight Line Height (1.2)</h2>
      <p style="line-height: 1.2; max-width: 60ch; margin-bottom: 2rem;">
        Tight line height is best for headings and short text blocks where vertical space is limited. 
        This creates a compact, dense appearance that works well for titles, labels, and UI components 
        where readability of longer passages isn't a concern. Notice how the lines feel close together.
      </p>
      
      <h2>Normal Line Height (1.5)</h2>
      <p style="line-height: 1.5; max-width: 60ch; margin-bottom: 2rem;">
        Normal line height provides a balanced reading experience for most body text. This is the default 
        for paragraphs and longer content blocks. It offers good readability without feeling too spacious 
        or too cramped. Most interfaces use this as the standard for general content.
      </p>
      
      <h2>Relaxed Line Height (1.8)</h2>
      <p style="line-height: 1.8; max-width: 60ch; margin-bottom: 2rem;">
        Relaxed line height creates more breathing room between lines, improving readability for longer 
        articles and documentation. This is ideal for blog posts, help content, and any text that users 
        will spend extended time reading. The extra space reduces eye strain and makes it easier to 
        track lines across the page.
      </p>
      
      <div class="card" style="margin-top: 2rem; padding: 1.5rem;">
        <h3>Pro Tip: Measure (Line Length)</h3>
        <p class="text-muted">
          The optimal line length for readability is 50-75 characters per line (roughly 60ch). 
          Lines that are too long make it difficult for readers to find the start of the next line. 
          Lines that are too short cause the eye to travel back and forth too often.
        </p>
      </div>
    </div>
  `
};

export const ArticleLayout = {
  name: 'Article Layout',
  render: () => html`
    <article style="padding: 2rem; max-width: 800px; margin: 0 auto;">
      <header style="margin-bottom: 2rem; padding-bottom: 2rem; border-bottom: 1px solid var(--color-border-subtle);">
        <p class="text-muted" style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">
          Design Systems
        </p>
        <h1 style="margin-bottom: 1rem;">Building Scalable Design Systems for Modern Web Applications</h1>
        <div style="display: flex; gap: 1rem; align-items: center; color: var(--color-text-subtle);">
          <span>By Sarah Chen</span>
          <span>•</span>
          <time>November 17, 2025</time>
          <span>•</span>
          <span>8 min read</span>
        </div>
      </header>
      
      <div style="line-height: 1.7; font-size: 1.0625rem;">
        <p style="font-size: 1.25rem; line-height: 1.6; color: var(--color-text-subtle); margin-bottom: 2rem;">
          A design system is more than a component library—it's a shared language that bridges design 
          and development, ensuring consistency and quality across your entire product ecosystem.
        </p>
        
        <p>
          In today's fast-paced development environment, maintaining visual and functional consistency 
          across multiple products and teams is increasingly challenging. Design systems have emerged 
          as the solution, providing a single source of truth for design decisions, component patterns, 
          and implementation guidelines.
        </p>
        
        <h2 style="margin-top: 2rem; margin-bottom: 1rem;">Key Components of a Design System</h2>
        
        <p>
          A comprehensive design system consists of several interconnected layers, each serving a 
          specific purpose in the overall architecture:
        </p>
        
        <ul style="margin: 1.5rem 0; padding-left: 1.5rem;">
          <li style="margin-bottom: 0.75rem;">
            <strong>Design Tokens:</strong> The foundational layer defining colors, typography, spacing, and other atomic values
          </li>
          <li style="margin-bottom: 0.75rem;">
            <strong>Component Library:</strong> Reusable UI components built with consistent patterns
          </li>
          <li style="margin-bottom: 0.75rem;">
            <strong>Documentation:</strong> Clear guidelines on when and how to use each component
          </li>
          <li style="margin-bottom: 0.75rem;">
            <strong>Tools & Resources:</strong> Figma libraries, code templates, and development tools
          </li>
        </ul>
        
        <blockquote style="margin: 2rem 0; padding-left: 1.5rem; border-left: 4px solid var(--color-primary); font-style: italic; color: var(--color-text-subtle);">
          "A design system isn't a project. It's a product serving products."
          <footer style="margin-top: 0.5rem; font-style: normal; font-size: 0.875rem;">
            — Nathan Curtis, Design Systems Expert
          </footer>
        </blockquote>
        
        <h3 style="margin-top: 2rem; margin-bottom: 1rem;">Getting Started with Design Tokens</h3>
        
        <p>
          Design tokens are the DNA of your design system. These named values represent design decisions 
          that can be shared across platforms and technologies. For example, instead of hardcoding 
          <code>#0066cc</code>, you define <code>--color-primary</code> which can be updated globally.
        </p>
        
        <div class="card" style="margin: 2rem 0; padding: 1.5rem; background: var(--color-surface-elevated);">
          <h4 style="margin-bottom: 0.75rem;">Implementation Example</h4>
          <pre style="background: var(--color-surface); padding: 1rem; border-radius: 8px; overflow-x: auto; font-size: 0.875rem;"><code>/* Design tokens in CSS */
:root {
  --color-primary: #0066cc;
  --spacing-unit: 4px;
  --font-family-base: system-ui, sans-serif;
  --border-radius-md: 8px;
}</code></pre>
        </div>
        
        <p>
          By adopting this approach, you create a flexible foundation that can evolve with your 
          product needs while maintaining consistency across all touchpoints.
        </p>
      </div>
      
      <footer style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--color-border-subtle);">
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; font-size: 0.875rem;">
          <span style="padding: 0.25rem 0.75rem; background: var(--color-surface-elevated); border-radius: 16px;">
            Design Systems
          </span>
          <span style="padding: 0.25rem 0.75rem; background: var(--color-surface-elevated); border-radius: 16px;">
            Web Components
          </span>
          <span style="padding: 0.25rem 0.75rem; background: var(--color-surface-elevated); border-radius: 16px;">
            CSS Architecture
          </span>
        </div>
      </footer>
    </article>
  `
};

export const UIComponents = {
  name: 'UI Component Text',
  render: () => html`
    <div style="padding: 2rem; max-width: 1200px;">
      <h2>Form Labels & Help Text</h2>
      <div style="margin-bottom: 3rem;">
        <div class="card" style="padding: 2rem;">
          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; font-weight: 600; margin-bottom: 0.5rem;">
              Email Address
            </label>
            <div class="input-icon">
              <pds-icon icon="envelope"></pds-icon>
              <input type="email" placeholder="you@example.com" style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: 8px;">
            </div>
            <p class="text-muted" style="font-size: 0.875rem; margin-top: 0.5rem;">
              We'll never share your email with anyone else.
            </p>
          </div>
          
          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; font-weight: 600; margin-bottom: 0.5rem;">
              Password
            </label>
            <div class="input-icon">
              <pds-icon icon="lock"></pds-icon>
              <input type="password" placeholder="••••••••" style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: 8px;">
            </div>
            <p style="font-size: 0.875rem; margin-top: 0.5rem; color: var(--color-danger);">
              Password must be at least 8 characters long.
            </p>
          </div>
          
          <div>
            <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
              <input type="checkbox">
              <span>Remember me for 30 days</span>
            </label>
          </div>
        </div>
      </div>
      
      <h2>Notifications & Messages</h2>
      <div style="display: grid; gap: 1rem;">
        <div class="card" style="padding: 1rem; border-left: 4px solid var(--color-success);">
          <div style="font-weight: 600; margin-bottom: 0.25rem;">Success</div>
          <p class="text-muted" style="margin: 0;">Your profile has been updated successfully.</p>
        </div>
        
        <div class="card" style="padding: 1rem; border-left: 4px solid var(--color-warning);">
          <div style="font-weight: 600; margin-bottom: 0.25rem;">Warning</div>
          <p class="text-muted" style="margin: 0;">Your subscription will expire in 3 days. Renew now to continue access.</p>
        </div>
        
        <div class="card" style="padding: 1rem; border-left: 4px solid var(--color-danger);">
          <div style="font-weight: 600; margin-bottom: 0.25rem;">Error</div>
          <p class="text-muted" style="margin: 0;">Unable to connect to the server. Please check your connection and try again.</p>
        </div>
        
        <div class="card" style="padding: 1rem; border-left: 4px solid var(--color-primary);">
          <div style="font-weight: 600; margin-bottom: 0.25rem;">Information</div>
          <p class="text-muted" style="margin: 0;">New features available! Check out our latest updates in the changelog.</p>
        </div>
      </div>
    </div>
  `
};

export const DataDisplay = {
  name: 'Data Display & Lists',
  render: () => html`
    <div style="padding: 2rem; max-width: 1200px;">
      <h2>User List with Metadata</h2>
      <div class="card" style="margin-bottom: 3rem;">
        ${[
          { name: 'Alex Morgan', role: 'Product Designer', status: 'Active', lastSeen: '2 hours ago' },
          { name: 'Jordan Lee', role: 'Senior Developer', status: 'Active', lastSeen: 'Just now' },
          { name: 'Sam Taylor', role: 'UX Researcher', status: 'Away', lastSeen: '1 day ago' },
          { name: 'Casey Chen', role: 'Engineering Manager', status: 'Offline', lastSeen: '3 days ago' }
        ].map((user, index, arr) => html`
          <div style="padding: 1.25rem; ${index < arr.length - 1 ? 'border-bottom: 1px solid var(--color-border-subtle);' : ''}">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
              <div>
                <div style="font-weight: 600; font-size: 1.0625rem; margin-bottom: 0.25rem;">
                  ${user.name}
                </div>
                <div class="text-muted" style="font-size: 0.875rem;">
                  ${user.role}
                </div>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; 
                           padding: 0.25rem 0.5rem; border-radius: 12px; display: inline-block;
                           ${user.status === 'Active' ? 'background: var(--color-success-bg); color: var(--color-success);' : ''}
                           ${user.status === 'Away' ? 'background: var(--color-warning-bg); color: var(--color-warning);' : ''}
                           ${user.status === 'Offline' ? 'background: var(--color-surface-elevated); color: var(--color-text-subtle);' : ''}">
                  ${user.status}
                </div>
                <div class="text-muted" style="font-size: 0.8125rem; margin-top: 0.25rem;">
                  ${user.lastSeen}
                </div>
              </div>
            </div>
          </div>
        `)}
      </div>
      
      <h2>Stats & Metrics</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
        <div class="card" style="padding: 1.5rem;">
          <div class="text-muted" style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">
            Total Revenue
          </div>
          <div style="font-size: 2rem; font-weight: 700; margin-bottom: 0.25rem;">
            $127,543
          </div>
          <div style="font-size: 0.875rem; color: var(--color-success);">
            ↑ 12.5% from last month
          </div>
        </div>
        
        <div class="card" style="padding: 1.5rem;">
          <div class="text-muted" style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">
            Active Users
          </div>
          <div style="font-size: 2rem; font-weight: 700; margin-bottom: 0.25rem;">
            8,432
          </div>
          <div style="font-size: 0.875rem; color: var(--color-success);">
            ↑ 5.2% from last month
          </div>
        </div>
        
        <div class="card" style="padding: 1.5rem;">
          <div class="text-muted" style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">
            Conversion Rate
          </div>
          <div style="font-size: 2rem; font-weight: 700; margin-bottom: 0.25rem;">
            3.8%
          </div>
          <div style="font-size: 0.875rem; color: var(--color-danger);">
            ↓ 0.3% from last month
          </div>
        </div>
      </div>
      
      <h2 style="margin-top: 3rem;">Activity Timeline</h2>
      <div class="card" style="padding: 1.5rem;">
        ${[
          { time: '2:34 PM', action: 'Project deployed to production', user: 'Jordan Lee' },
          { time: '1:15 PM', action: 'Code review completed', user: 'Alex Morgan' },
          { time: '11:23 AM', action: 'New pull request opened', user: 'Sam Taylor' },
          { time: '9:45 AM', action: 'Design assets updated', user: 'Casey Chen' }
        ].map((item, index) => html`
          <div style="display: flex; gap: 1rem; ${index > 0 ? 'margin-top: 1.25rem;' : ''}">
            <div class="text-muted" style="font-size: 0.875rem; min-width: 70px; font-variant-numeric: tabular-nums;">
              ${item.time}
            </div>
            <div style="flex: 1;">
              <div style="margin-bottom: 0.125rem;">
                ${item.action}
              </div>
              <div class="text-muted" style="font-size: 0.875rem;">
                by ${item.user}
              </div>
            </div>
          </div>
        `)}
      </div>
    </div>
  `
};

export const TextSelection = {
  name: 'Text Selection & Interaction',
  render: () => html`
    <div style="padding: 2rem; max-width: 1200px;">
      <h2>Selectable Text Examples</h2>
      <p class="text-muted" style="margin-bottom: 2rem;">
        Try selecting text in the examples below to see the selection styling.
      </p>
      
      <div class="card" style="padding: 2rem; margin-bottom: 2rem;">
        <h3>Code Snippets</h3>
        <p class="text-muted" style="margin-bottom: 1rem;">
          Monospace text for code should be easily selectable and copyable:
        </p>
        <pre style="background: var(--color-surface); padding: 1rem; border-radius: 8px; overflow-x: auto; font-family: var(--font-family-mono); user-select: all; cursor: text;"><code>npm install pure-design-system --save
pds configure --preset ocean-breeze
pds build --watch</code></pre>
      </div>
      
      <div class="card" style="padding: 2rem; margin-bottom: 2rem;">
        <h3>API Keys & Tokens</h3>
        <p class="text-muted" style="margin-bottom: 1rem;">
          Long strings that users need to copy:
        </p>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <code style="flex: 1; background: var(--color-surface); padding: 0.75rem; border-radius: 8px; font-family: var(--font-family-mono); user-select: all;">
            pds_example_api_key_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p
          </code>
          <button class="button-secondary" style="white-space: nowrap;">Copy</button>
        </div>
      </div>
      
      <div class="card" style="padding: 2rem;">
        <h3>Text with Different States</h3>
        <div style="display: grid; gap: 1.5rem;">
          <div>
            <div style="font-weight: 600; margin-bottom: 0.5rem;">Default Text</div>
            <p>This is normal, selectable paragraph text. You can highlight and copy it naturally.</p>
          </div>
          
          <div>
            <div style="font-weight: 600; margin-bottom: 0.5rem;">Muted Text</div>
            <p class="text-muted">This is muted text, often used for secondary information. It's still fully selectable.</p>
          </div>
          
          <div>
            <div style="font-weight: 600; margin-bottom: 0.5rem;">Non-Selectable Text (UI Labels)</div>
            <p style="user-select: none;">This text cannot be selected - useful for UI chrome and labels that shouldn't be copied.</p>
          </div>
          
          <div>
            <div style="font-weight: 600; margin-bottom: 0.5rem;">Pre-Selected Text</div>
            <div class="input-icon">
              <pds-icon icon="envelope"></pds-icon>
              <input type="text" value="pre-selected@example.com" readonly style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: 8px; font-family: var(--font-family-mono);" onclick="this.select()">
            </div>
            <p class="text-muted" style="font-size: 0.875rem; margin-top: 0.5rem;">Click to select all</p>
          </div>
        </div>
      </div>
    </div>
  `
};
