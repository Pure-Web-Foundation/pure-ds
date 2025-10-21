/**
 * Export Pure Design System - Generate static CSS files for distribution
 * 
 * This script generates:
 * - pds-tokens.css / pds-tokens.css.js
 * - pds-primitives.css / pds-primitives.css.js  
 * - pds-components.css / pds-components.css.js
 * - pds-utilities.css / pds-utilities.css.js
 * - pds-styles.css / pds-styles.css.js (complete combined)
 * 
 * Usage: node scripts/export-pds.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

// ES Module equivalents of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the design system
// Note: We need to load config and AutoDesigner
const projectRoot = path.join(__dirname, '..');
const srcPath = path.join(projectRoot, 'src', 'js');

// Dynamic import of the design system modules
async function generatePDSExports() {
  console.log('🎨 Pure Design System - Export Generator\n');

  try {
    // Import config and AutoDesigner (convert Windows paths to file:// URLs)
    const configModule = await import(pathToFileURL(path.join(srcPath, 'config.js')).href);
    const autoDesignerModule = await import(pathToFileURL(path.join(srcPath, 'auto-designer.js')).href);
    
    const { config } = configModule;
    const { AutoDesigner } = autoDesignerModule;

    console.log('✓ Loaded design system configuration');

    // Create designer instance
    const designer = new AutoDesigner(config.design);
    console.log('✓ Generated design system tokens and styles');

    // Create exports directory
    const exportsDir = path.join(projectRoot, 'public', 'exports');
    const cssDir = path.join(projectRoot, 'public', 'css');
    
    fs.mkdirSync(exportsDir, { recursive: true });
    fs.mkdirSync(cssDir, { recursive: true });
    console.log('✓ Created export directories');

    // Export pure CSS files
    console.log('\n📄 Exporting CSS files...');
    
    fs.writeFileSync(
      path.join(exportsDir, 'pds-tokens.css'),
      designer.tokensCSS
    );
    console.log('  ✓ pds-tokens.css');

    fs.writeFileSync(
      path.join(exportsDir, 'pds-primitives.css'),
      designer.primitivesCSS
    );
    console.log('  ✓ pds-primitives.css');

    fs.writeFileSync(
      path.join(exportsDir, 'pds-components.css'),
      designer.componentsCSS
    );
    console.log('  ✓ pds-components.css');

    fs.writeFileSync(
      path.join(exportsDir, 'pds-utilities.css'),
      designer.utilitiesCSS
    );
    console.log('  ✓ pds-utilities.css');

    fs.writeFileSync(
      path.join(exportsDir, 'pds-styles.css'),
      designer.layeredCSS
    );
    console.log('  ✓ pds-styles.css (complete)');

    // Export CSS.js modules
    console.log('\n📦 Exporting CSS.js modules...');
    
    const cssModules = designer.getCSSModules();
    
    for (const [filename, content] of Object.entries(cssModules)) {
      fs.writeFileSync(path.join(exportsDir, filename), content);
      fs.writeFileSync(path.join(cssDir, filename), content); // Also put in /css for live mode
      console.log(`  ✓ ${filename}`);
    }

    // Generate README
    const readme = `# Pure Design System - Exported Files

Generated on: ${new Date().toISOString()}

## Files

### CSS Files (for static import)
- \`pds-tokens.css\` - Design tokens (CSS custom properties)
- \`pds-primitives.css\` - Native element baseline styles
- \`pds-components.css\` - Component styles
- \`pds-utilities.css\` - Utility classes
- \`pds-styles.css\` - Complete design system (all layers)

### CSS Modules (for web components)
- \`pds-tokens.css.js\` - Constructable stylesheet for tokens
- \`pds-primitives.css.js\` - Constructable stylesheet for primitives
- \`pds-components.css.js\` - Constructable stylesheet for components
- \`pds-utilities.css.js\` - Constructable stylesheet for utilities
- \`pds-styles.css.js\` - Complete design system as constructable stylesheet

## Usage

### For global styles
\`\`\`html
<link rel="stylesheet" href="pds-styles.css">
\`\`\`

### For web components (Shadow DOM)
\`\`\`javascript
import { primitives } from './pds-primitives.css.js';

class MyComponent extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    
    const componentStyles = new CSSStyleSheet();
    componentStyles.replaceSync(\`/* your styles */\`);
    
    this.shadowRoot.adoptedStyleSheets = [primitives, componentStyles];
  }
}
\`\`\`

### Layer Architecture

The design system uses CSS Cascade Layers for predictable specificity:

\`\`\`css
@layer tokens, primitives, components, utilities;
\`\`\`

- **tokens**: Design tokens (CSS custom properties only)
- **primitives**: Native element baseline styles (button, input, etc.)
- **components**: Component styles (alerts, badges, etc.)
- **utilities**: Utility classes (lowest priority)

## Best Practices

1. **Import primitives in web components** to ensure consistent native element styling
2. **Use tokens** for all design values (colors, spacing, etc.)
3. **Layer your styles** to maintain the cascade hierarchy
4. **Adopt stylesheets** instead of inline styles for better performance

For more information, see the [Pure Design System documentation](https://github.com/mvneerven/pure-ds).
`;

    fs.writeFileSync(path.join(exportsDir, 'README.md'), readme);
    console.log('\n  ✓ README.md');

    // Generate stats
    const stats = {
      tokensSize: Buffer.byteLength(designer.tokensCSS, 'utf8'),
      primitivesSize: Buffer.byteLength(designer.primitivesCSS, 'utf8'),
      componentsSize: Buffer.byteLength(designer.componentsCSS, 'utf8'),
      utilitiesSize: Buffer.byteLength(designer.utilitiesCSS, 'utf8'),
      totalSize: Buffer.byteLength(designer.layeredCSS, 'utf8')
    };

    console.log('\n📊 Export Statistics:');
    console.log(`  Tokens:     ${(stats.tokensSize / 1024).toFixed(2)} KB`);
    console.log(`  Primitives: ${(stats.primitivesSize / 1024).toFixed(2)} KB`);
    console.log(`  Components: ${(stats.componentsSize / 1024).toFixed(2)} KB`);
    console.log(`  Utilities:  ${(stats.utilitiesSize / 1024).toFixed(2)} KB`);
    console.log(`  ────────────────────────────`);
    console.log(`  Total:      ${(stats.totalSize / 1024).toFixed(2)} KB\n`);

    console.log('✅ Pure Design System exported successfully!\n');
    console.log(`📁 Output directory: ${exportsDir}\n`);

  } catch (error) {
    console.error('❌ Export failed:', error);
    process.exit(1);
  }
}

// Run the export
generatePDSExports();
