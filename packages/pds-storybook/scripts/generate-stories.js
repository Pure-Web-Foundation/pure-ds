/**
 * Story Generator for Pure Design System Storybook
 * 
 * Reads pds-ontology.js and pds-demo.js to auto-generate stories
 * organized by best-practice groups.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '../../..');
const STORIES_DIR = join(__dirname, '../stories');

// Load ontology
const ontologyPath = join(ROOT_DIR, 'src/js/pds-core/pds-ontology.js');
const ontologyContent = readFileSync(ontologyPath, 'utf-8');

// Extract ontology object (simplified parsing)
const ontologyMatch = ontologyContent.match(/export const ontology = ({[\s\S]+?});[\s\S]*export default/);
if (!ontologyMatch) {
  console.error('Failed to parse ontology');
  process.exit(1);
}

// Load demo content
const demoPath = join(ROOT_DIR, 'packages/pds-configurator/src/pds-demo.js');
const demoContent = readFileSync(demoPath, 'utf-8');

// Story groups based on design system best practices
const STORY_GROUPS = {
  foundations: {
    title: 'Foundations',
    description: 'Design tokens - colors, typography, spacing, icons',
    stories: ['Colors', 'Typography', 'Spacing', 'Icons']
  },
  primitives: {
    title: 'Primitives',
    description: 'Basic UI elements - buttons, forms, cards, badges',
    stories: ['Buttons', 'Forms', 'Cards', 'Badges', 'Alerts', 'Surfaces']
  },
  components: {
    title: 'Components',
    description: 'Web Components - rich interactive UI elements',
    stories: [
      'pds-icon',
      'pds-drawer',
      'pds-tabstrip',
      'pds-upload',
      'pds-toaster',
      'pds-richtext',
      'pds-form',
      'pds-splitpanel',
      'pds-scrollrow'
    ]
  },
  patterns: {
    title: 'Patterns',
    description: 'Layout patterns and utility classes',
    stories: ['Layout', 'Utilities', 'BorderEffects']
  },
  enhancements: {
    title: 'Enhancements',
    description: 'Progressive enhancements for semantic HTML',
    stories: ['Dropdowns', 'Toggles', 'RangeSliders', 'RequiredFields']
  }
};

/**
 * Extract HTML section from pds-demo.js
 */
function extractDemoSection(sectionId) {
  // Try matching by ID or data-section attribute
  const sectionRegex = new RegExp(`<section[^>]*(?:id|data-section)=["']${sectionId}["'][^>]*>([\\s\\S]*?)<\\/section>`, 'i');
  const match = demoContent.match(sectionRegex);
  return match ? match[1].trim() : null;
}

/**
 * Generate story template
 */
function generateStoryTemplate(group, storyName, content = '', extraCode = '') {
  const title = storyName.replace(/([A-Z])/g, ' $1').trim();
  const argTypes = `
  preset: {
    control: 'select',
    options: ['default', 'ocean-breeze', 'midnight-steel', 'sunset-vibes', 'forest-calm', 'lavender-dream'],
    description: 'Choose a design preset'
  },
  primaryColor: {
    control: 'color',
    description: 'Override primary color'
  },
  secondaryColor: {
    control: 'color',
    description: 'Override secondary color'
  }`;

  return `import { html } from 'lit';

export default {
  title: '${STORY_GROUPS[group].title}/${title}',
  parameters: {
    docs: {
      description: {
        component: '${STORY_GROUPS[group].description}'
      }
    }
  },
  argTypes: {${argTypes}
  }
};

export const Default = {
  render: (args) => {
    // Apply preset if changed
    if (args.preset) {
      import('../../../src/js/pds.js').then(({ PDS }) => {
        PDS.applyDesign({ preset: args.preset });
      });
    }
    
    // Apply color overrides
    if (args.primaryColor || args.secondaryColor) {
      import('../../../src/js/pds.js').then(({ PDS }) => {
        PDS.applyDesign({
          design: {
            colors: {
              primary: args.primaryColor,
              secondary: args.secondaryColor
            }
          }
        });
      });
    }
    
    ${extraCode}

    return html\`
      <div class="story-container" style="padding: 2rem;">
        ${content || `<p>Story content for ${title}</p>`}
      </div>
    \`;
  },
  args: {
    preset: 'default'
  }
};
`;
}

/**
 * Generate foundation stories
 */
function generateFoundationStories() {
  console.log('Generating foundation stories...');
  
  // Colors - Use custom implementation since pds-demo.js uses dynamic Lit methods
  const colorsCode = `
    const renderColorCard = (name, color) => html\`
      <div class="color-card">
        <div class="color-swatch" style="background-color: var(--color-\${color}-500);"></div>
        <div class="color-info">
          <strong>\${name}</strong>
          <code>var(--color-\${color}-500)</code>
        </div>
        <div class="color-scale" style="--scale-color: var(--color-\${color}-500);">
          \${[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(
            (shade) => html\`<div style="--value: \${shade}"></div>\`
          )}
        </div>
      </div>
    \`;
    
    const renderColorScale = (color) => html\`
      <div class="color-scale-row">
        \${[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(shade => html\`
          <div class="scale-item">
            <div class="swatch" style="background-color: var(--color-\${color}-\${shade})"></div>
            <span class="label">\${shade}</span>
          </div>
        \`)}
      </div>
    \`;
  `;

  const colorsHTML = `
    <section class="showcase-section" data-section="color-system">
      <h2><pds-icon icon="palette" size="lg" class="icon-primary"></pds-icon> Color System</h2>
      <div class="color-grid">
        \${renderColorCard("Primary", "primary")}
        \${renderColorCard("Secondary", "secondary")}
        \${renderColorCard("Accent", "accent")}
        \${renderColorCard("Success", "success")}
        \${renderColorCard("Warning", "warning")}
        \${renderColorCard("Danger", "danger")}
        \${renderColorCard("Info", "info")}
      </div>
      
      <h3>Gray Scale (from Secondary)</h3>
      <div class="gray-scale-grid">
        \${[50, 100, 200, 300, 400, 500, 600, 700, 800].map(
          (shade) => html\`
            <div class="gray-scale-item">
              <div
                class="gray-scale-swatch"
                style="background-color: var(--color-gray-\${shade});"
                title="gray-\${shade}"
              ></div>
              <div class="gray-scale-label">\${shade}</div>
            </div>
          \`
        )}
      </div>
    </section>
  `;
  
  writeStory('foundations', 'Colors', generateStoryTemplate('foundations', 'Colors', colorsHTML, colorsCode));
  
  // Typography
  const typographyHTML = extractDemoSection('typography') || `
    <h1>Heading 1</h1>

    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
    <h4>Heading 4</h4>
    <h5>Heading 5</h5>
    <h6>Heading 6</h6>
    <p>Body paragraph with <strong>bold</strong>, <em>italic</em>, and <a href="#">link</a> text.</p>
  `;
  
  writeStory('foundations', 'Typography', generateStoryTemplate('foundations', 'Typography', typographyHTML));
  
  // Spacing
  const spacingHTML = `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-2);">
      <div style="background: var(--color-primary-100); padding: var(--spacing-1);">Spacing 1</div>
      <div style="background: var(--color-primary-200); padding: var(--spacing-2);">Spacing 2</div>
      <div style="background: var(--color-primary-300); padding: var(--spacing-3);">Spacing 3</div>
      <div style="background: var(--color-primary-400); padding: var(--spacing-4);">Spacing 4</div>
      <div style="background: var(--color-primary-500); padding: var(--spacing-5); color: white;">Spacing 5</div>
    </div>
  `;
  
  writeStory('foundations', 'Spacing', generateStoryTemplate('foundations', 'Spacing', spacingHTML));
  
  // Icons
  const iconsHTML = extractDemoSection('icons') || `
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <pds-icon icon="heart" size="lg"></pds-icon>
      <pds-icon icon="star" size="lg"></pds-icon>
      <pds-icon icon="user" size="lg"></pds-icon>
      <pds-icon icon="bell" size="lg"></pds-icon>
      <pds-icon icon="magnifying-glass" size="lg"></pds-icon>
      <pds-icon icon="list" size="lg"></pds-icon>
      <pds-icon icon="x" size="lg"></pds-icon>
      <pds-icon icon="check" size="lg"></pds-icon>
    </div>
  `;
  
  writeStory('foundations', 'Icons', generateStoryTemplate('foundations', 'Icons', iconsHTML));
}

/**
 * Generate primitive stories
 */
function generatePrimitiveStories() {
  console.log('Generating primitive stories...');
  
  // Buttons
  const buttonsHTML = extractDemoSection('buttons') || `
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <button class="btn-primary">Primary</button>
      <button class="btn-secondary">Secondary</button>
      <button class="btn-outline">Outline</button>
      <button class="btn-ghost">Ghost</button>
      <button class="btn-primary" disabled>Disabled</button>
    </div>
    <br/>
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <button class="btn-primary btn-sm">Small</button>
      <button class="btn-primary">Medium</button>
      <button class="btn-primary btn-lg">Large</button>
    </div>
  `;
  
  writeStory('primitives', 'Buttons', generateStoryTemplate('primitives', 'Buttons', buttonsHTML));
  
  // Forms
  const formsHTML = extractDemoSection('forms') || `
    <form style="max-width: 400px;">
      <label>
        <span>Text Input</span>
        <input type="text" placeholder="Enter text...">
      </label>
      <label>
        <span>Email</span>
        <input type="email" required placeholder="email@example.com">
      </label>
      <label>
        <span>Select</span>
        <select>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
      </label>
      <label>
        <span>Textarea</span>
        <textarea rows="4" placeholder="Enter longer text..."></textarea>
      </label>
      <button type="submit" class="btn-primary">Submit</button>
    </form>
  `;
  
  writeStory('primitives', 'Forms', generateStoryTemplate('primitives', 'Forms', formsHTML));
  
  // Cards
  const cardsHTML = `
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem;">
      <article class="card">
        <h3>Card Title</h3>
        <p>Card content goes here. This is a basic card primitive.</p>
        <button class="btn-primary">Action</button>
      </article>
      <article class="card">
        <h3>Another Card</h3>
        <p>Cards are versatile containers for content.</p>
        <button class="btn-outline">Learn More</button>
      </article>
    </div>
  `;
  
  writeStory('primitives', 'Cards', generateStoryTemplate('primitives', 'Cards', cardsHTML));
  
  // Badges
  const badgesHTML = `
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
      <span class="badge">Default</span>
      <span class="badge badge-primary">Primary</span>
      <span class="badge badge-success">Success</span>
      <span class="badge badge-warning">Warning</span>
      <span class="badge badge-danger">Danger</span>
      <span class="pill">Pill</span>
    </div>
  `;
  
  writeStory('primitives', 'Badges', generateStoryTemplate('primitives', 'Badges', badgesHTML));
  
  // Alerts
  const alertsHTML = `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div class="alert alert-info">This is an info alert.</div>
      <div class="alert alert-success">This is a success alert.</div>
      <div class="alert alert-warning">This is a warning alert.</div>
      <div class="alert alert-danger">This is a danger alert.</div>
    </div>
  `;
  
  writeStory('primitives', 'Alerts', generateStoryTemplate('primitives', 'Alerts', alertsHTML));
}

/**
 * Generate component stories
 */
function generateComponentStories() {
  console.log('Generating component stories...');
  
  // pds-icon
  writeStory('components', 'PdsIcon', `import { html } from 'lit';

export default {
  title: 'PDS/Components/pds-icon',
  parameters: {
    docs: {
      description: {
        component: 'SVG sprite icons with fallbacks'
      }
    }
  },
  argTypes: {
    icon: {
      control: 'text',
      description: 'Icon name from sprite'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Named size'
    },
    color: {
      control: 'color',
      description: 'Icon color'
    }
  }
};

export const Default = {
  render: (args) => html\`
    <pds-icon 
      icon="\${args.icon}" 
      size="\${args.size}"
      color="\${args.color}">
    </pds-icon>
  \`,
  args: {
    icon: 'heart',
    size: 'lg',
    color: 'currentColor'
  }
};

export const AllSizes = () => html\`
  <div style="display: flex; gap: 1rem; align-items: center;">
    <pds-icon icon="star" size="xs"></pds-icon>
    <pds-icon icon="star" size="sm"></pds-icon>
    <pds-icon icon="star" size="md"></pds-icon>
    <pds-icon icon="star" size="lg"></pds-icon>
    <pds-icon icon="star" size="xl"></pds-icon>
    <pds-icon icon="star" size="2xl"></pds-icon>
  </div>
\`;

export const ColoredIcons = () => html\`
  <div style="display: flex; gap: 1rem;">
    <pds-icon icon="heart" size="lg" color="red"></pds-icon>
    <pds-icon icon="star" size="lg" color="gold"></pds-icon>
    <pds-icon icon="check" size="lg" color="green"></pds-icon>
    <pds-icon icon="x" size="lg" color="var(--color-danger-500)"></pds-icon>
  </div>
\`;
`);
  
  // pds-drawer
  writeStory('components', 'PdsDrawer', `import { html } from 'lit';

export default {
  title: 'PDS/Components/pds-drawer',
  parameters: {
    docs: {
      description: {
        component: 'Slide-out panels from any edge'
      }
    }
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Edge to slide from'
    }
  }
};

export const Default = {
  render: (args) => html\`
    <button class="btn-primary" onclick="document.getElementById('demo-drawer').open()">
      Open Drawer
    </button>
    
    <pds-drawer id="demo-drawer" position="\${args.position}">
      <h2 slot="header">Drawer Title</h2>
      <div style="padding: 1rem;">
        <p>Drawer content goes here.</p>
        <button class="btn-secondary" onclick="document.getElementById('demo-drawer').close()">
          Close
        </button>
      </div>
    </pds-drawer>
  \`,
  args: {
    position: 'right'
  }
};
`);
  
  // pds-tabstrip
  writeStory('components', 'PdsTabstrip', `import { html } from 'lit';

export default {
  title: 'PDS/Components/pds-tabstrip',
  parameters: {
    docs: {
      description: {
        component: 'Accessible tab interface with keyboard navigation'
      }
    }
  }
};

export const Default = () => html\`
  <pds-tabstrip>
    <button slot="tab">Overview</button>
    <div slot="panel">
      <h3>Overview</h3>
      <p>This is the overview panel.</p>
    </div>
    
    <button slot="tab">Details</button>
    <div slot="panel">
      <h3>Details</h3>
      <p>This is the details panel.</p>
    </div>
    
    <button slot="tab">Settings</button>
    <div slot="panel">
      <h3>Settings</h3>
      <p>This is the settings panel.</p>
    </div>
  </pds-tabstrip>
\`;
`);
}

/**
 * Write story file
 */
function writeStory(group, name, content) {
  const dir = join(STORIES_DIR, group);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  
  const filename = `${name}.stories.js`;
  const filepath = join(dir, filename);
  
  writeFileSync(filepath, content, 'utf-8');
  console.log(`  ✓ Generated ${group}/${filename}`);
}

/**
 * Main execution
 */
console.log('🎨 Generating PDS Storybook stories...\n');

generateFoundationStories();
generatePrimitiveStories();
generateComponentStories();

console.log('\n✨ Story generation complete!');
