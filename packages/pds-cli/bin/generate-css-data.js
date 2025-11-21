#!/usr/bin/env node

/**
 * Generate CSS Custom Data for IntelliSense
 * Creates VS Code CSS custom data and standard CSS data formats
 * Provides autocomplete for CSS tokens, classes, and custom properties
 */

import { writeFile, mkdir, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../../../');

// Colors for terminal output
const COLORS = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};
const log = (msg, color = 'reset') => console.log(`${COLORS[color]}${msg}${COLORS.reset}`);

/**
 * Extract CSS custom properties from generated tokens
 */
function extractCSSProperties(generator) {
  const properties = [];
  const compiled = generator.compiled;
  
  if (!compiled?.tokens) {
    log('⚠️  No tokens found in generator', 'yellow');
    return properties;
  }

  // Extract color tokens
  if (compiled.tokens.colors) {
    for (const [colorName, colorScale] of Object.entries(compiled.tokens.colors)) {
      if (typeof colorScale === 'object' && colorScale !== null) {
        // Color scales (50-900)
        for (const [shade, value] of Object.entries(colorScale)) {
          properties.push({
            name: `--color-${colorName}-${shade}`,
            description: `${colorName} color scale - shade ${shade}`,
            syntax: '<color>',
            value: value,
            category: 'Color Tokens'
          });
        }
      } else if (typeof colorScale === 'string') {
        // Single color value
        properties.push({
          name: `--color-${colorName}`,
          description: `${colorName} color`,
          syntax: '<color>',
          value: colorScale,
          category: 'Color Tokens'
        });
      }
    }
  }

  // Extract spacing tokens
  if (compiled.tokens.spacing) {
    for (const [key, value] of Object.entries(compiled.tokens.spacing)) {
      properties.push({
        name: `--spacing-${key}`,
        description: `Spacing scale value ${key}`,
        syntax: '<length>',
        value: value,
        category: 'Spacing Tokens'
      });
    }
  }

  // Extract typography tokens
  if (compiled.tokens.typography) {
    const typo = compiled.tokens.typography;
    
    // Font families
    if (typo.families) {
      for (const [key, value] of Object.entries(typo.families)) {
        properties.push({
          name: `--font-family-${key}`,
          description: `Font family for ${key}`,
          syntax: '<custom-ident>',
          value: value,
          category: 'Typography Tokens'
        });
      }
    }
    
    // Font sizes
    if (typo.sizes) {
      for (const [key, value] of Object.entries(typo.sizes)) {
        properties.push({
          name: `--font-size-${key}`,
          description: `Font size ${key}`,
          syntax: '<length>',
          value: value,
          category: 'Typography Tokens'
        });
      }
    }
    
    // Font weights
    if (typo.weights) {
      for (const [key, value] of Object.entries(typo.weights)) {
        properties.push({
          name: `--font-weight-${key}`,
          description: `Font weight ${key}`,
          syntax: '<number>',
          value: value,
          category: 'Typography Tokens'
        });
      }
    }
    
    // Line heights
    if (typo.lineHeights) {
      for (const [key, value] of Object.entries(typo.lineHeights)) {
        properties.push({
          name: `--line-height-${key}`,
          description: `Line height ${key}`,
          syntax: '<number> | <length>',
          value: value,
          category: 'Typography Tokens'
        });
      }
    }
  }

  // Extract border radius tokens
  if (compiled.tokens.radius) {
    for (const [key, value] of Object.entries(compiled.tokens.radius)) {
      properties.push({
        name: `--radius-${key}`,
        description: `Border radius ${key}`,
        syntax: '<length>',
        value: value,
        category: 'Border Tokens'
      });
    }
  }

  // Extract border width tokens
  if (compiled.tokens.borderWidths) {
    for (const [key, value] of Object.entries(compiled.tokens.borderWidths)) {
      properties.push({
        name: `--border-width-${key}`,
        description: `Border width ${key}`,
        syntax: '<length>',
        value: value,
        category: 'Border Tokens'
      });
    }
  }

  // Extract shadow tokens
  if (compiled.tokens.shadows) {
    for (const [key, value] of Object.entries(compiled.tokens.shadows)) {
      properties.push({
        name: `--shadow-${key}`,
        description: `Shadow ${key}`,
        syntax: '<shadow>',
        value: value,
        category: 'Shadow Tokens'
      });
    }
  }

  // Extract transition tokens
  if (compiled.tokens.transitions) {
    for (const [key, value] of Object.entries(compiled.tokens.transitions)) {
      properties.push({
        name: `--transition-${key}`,
        description: `Transition ${key}`,
        syntax: '<time>',
        value: value,
        category: 'Transition Tokens'
      });
    }
  }

  // Extract z-index tokens
  if (compiled.tokens.zIndex) {
    for (const [key, value] of Object.entries(compiled.tokens.zIndex)) {
      properties.push({
        name: `--z-${key}`,
        description: `Z-index ${key}`,
        syntax: '<integer>',
        value: value,
        category: 'Layout Tokens'
      });
    }
  }

  // Extract layout tokens
  if (compiled.tokens.layout) {
    for (const [key, value] of Object.entries(compiled.tokens.layout)) {
      if (key === 'breakpoints') {
        for (const [bp, bpValue] of Object.entries(value)) {
          properties.push({
            name: `--breakpoint-${bp}`,
            description: `Breakpoint ${bp}`,
            syntax: '<length>',
            value: bpValue,
            category: 'Layout Tokens'
          });
        }
      } else {
        properties.push({
          name: `--layout-${key}`,
          description: `Layout ${key}`,
          syntax: '<length>',
          value: value,
          category: 'Layout Tokens'
        });
      }
    }
  }

  // Surface tokens (semantic)
  const surfaceTokens = [
    { name: '--surface-bg', description: 'Surface background color', category: 'Surface Tokens' },
    { name: '--surface-text', description: 'Surface text color', category: 'Surface Tokens' },
    { name: '--surface-text-secondary', description: 'Surface secondary text color', category: 'Surface Tokens' },
    { name: '--surface-border', description: 'Surface border color', category: 'Surface Tokens' },
    { name: '--surface-shadow', description: 'Surface shadow', category: 'Surface Tokens' },
    { name: '--surface-hover', description: 'Surface hover state', category: 'Surface Tokens' },
  ];

  for (const token of surfaceTokens) {
    properties.push({
      name: token.name,
      description: token.description,
      syntax: '<color>',
      category: token.category
    });
  }

  return properties;
}

/**
 * Extract CSS classes from ontology and utilities
 */
async function extractCSSClasses(ontology) {
  const classes = [];

  // Primitives
  if (ontology.primitives) {
    for (const primitive of ontology.primitives) {
      for (const selector of primitive.selectors) {
        // Only add class selectors
        if (selector.startsWith('.')) {
          const className = selector.slice(1);
          classes.push({
            name: className,
            description: `${primitive.name} primitive component`,
            category: 'Primitives'
          });
        }
      }
    }
  }

  // Components
  if (ontology.components) {
    for (const component of ontology.components) {
      for (const selector of component.selectors) {
        if (selector.startsWith('.')) {
          const className = selector.slice(1);
          classes.push({
            name: className,
            description: `${component.name} component`,
            category: 'Components'
          });
        }
      }
    }
  }

  // Layout patterns
  if (ontology.layoutPatterns) {
    for (const pattern of ontology.layoutPatterns) {
      for (const selector of pattern.selectors) {
        if (selector.startsWith('.')) {
          const className = selector.slice(1);
          classes.push({
            name: className,
            description: pattern.description || `${pattern.name} layout pattern`,
            category: 'Layout Utilities'
          });
        }
      }
    }
  }

  // Utilities
  if (ontology.utilities) {
    for (const utility of ontology.utilities) {
      if (utility.startsWith('.')) {
        const className = utility.slice(1);
        
        // Handle wildcard utilities
        if (className.includes('*')) {
          const baseClass = className.replace('*', '');
          const variants = generateUtilityVariants(baseClass);
          for (const variant of variants) {
            classes.push({
              name: variant.name,
              description: variant.description,
              category: 'Utilities'
            });
          }
        } else {
          classes.push({
            name: className,
            description: `${className} utility class`,
            category: 'Utilities'
          });
        }
      }
    }
  }

  return classes;
}

/**
 * Generate common variants for wildcard utilities
 */
function generateUtilityVariants(baseClass) {
  const variants = [];

  if (baseClass.includes('gap-')) {
    // Gap utilities (0-12)
    for (let i = 0; i <= 12; i++) {
      variants.push({
        name: `gap-${i}`,
        description: `Gap spacing of ${i} units`
      });
    }
  } else if (baseClass.includes('items-')) {
    // Flexbox align-items
    const alignments = ['start', 'end', 'center', 'baseline', 'stretch'];
    for (const align of alignments) {
      variants.push({
        name: `items-${align}`,
        description: `Align items: ${align}`
      });
    }
  } else if (baseClass.includes('justify-')) {
    // Flexbox justify-content
    const justifications = ['start', 'end', 'center', 'between', 'around', 'evenly'];
    for (const justify of justifications) {
      variants.push({
        name: `justify-${justify}`,
        description: `Justify content: ${justify}`
      });
    }
  } else if (baseClass.includes('border-glow-')) {
    // Border glow variants
    const colors = ['primary', 'secondary', 'accent', 'success', 'warning', 'danger', 'info'];
    for (const color of colors) {
      variants.push({
        name: `border-glow-${color}`,
        description: `Border glow effect with ${color} color`
      });
    }
  }

  return variants;
}

/**
 * Extract data attributes from enhancements
 */
function extractDataAttributes(ontology) {
  const attributes = [];

  if (ontology.enhancements) {
    for (const enhancement of ontology.enhancements) {
      // Extract data attributes from selectors like "[data-dropdown]"
      const matches = enhancement.match(/\[data-([^\]]+)\]/g);
      if (matches) {
        for (const match of matches) {
          const attrName = match.slice(1, -1); // Remove [ and ]
          attributes.push({
            name: attrName,
            description: `Enhancement: ${enhancement}`,
            category: 'Data Enhancements'
          });
        }
      }
    }
  }

  return attributes;
}

/**
 * Convert to VS Code CSS custom data format
 */
function toVSCodeFormat(properties, classes) {
  return {
    version: 1.1,
    properties: properties.map(prop => ({
      name: prop.name,
      description: prop.description,
      syntax: prop.syntax || '<custom-ident>',
      ...(prop.value && { references: [{ name: 'Value', url: `data:text/plain,${encodeURIComponent(prop.value)}` }] })
    })),
    atDirectives: [],
    pseudoClasses: classes.map(cls => ({
      name: cls.name,
      description: cls.description
    })).slice(0, 100), // Limit for performance
    pseudoElements: []
  };
}

/**
 * Convert to standard CSS data format (for other editors)
 */
function toStandardFormat(properties, classes, attributes) {
  return {
    version: '1.1',
    cssProperties: properties.map(prop => ({
      name: prop.name,
      description: prop.description,
      syntax: prop.syntax || '<custom-ident>',
      value: prop.value || undefined,
      category: prop.category
    })),
    cssClasses: classes.map(cls => ({
      name: cls.name,
      description: cls.description,
      category: cls.category
    })),
    dataAttributes: attributes.map(attr => ({
      name: attr.name,
      description: attr.description,
      category: attr.category
    })),
    metadata: {
      generator: 'PDS CSS Data Generator',
      generatedAt: new Date().toISOString(),
      totalProperties: properties.length,
      totalClasses: classes.length,
      totalAttributes: attributes.length
    }
  };
}

/**
 * Generate CSS IntelliSense data files
 */
async function generateCSSData(targetDir) {
  try {
    log('🎨 Generating CSS IntelliSense data...', 'bold');

    // Import Generator and ontology
    const generatorPath = path.join(repoRoot, 'src/js/pds-core/pds-generator.js');
    const ontologyPath = path.join(repoRoot, 'src/js/pds-core/pds-ontology.js');
    const configPath = path.join(repoRoot, 'src/js/pds-core/pds-config.js');

    log('📦 Loading PDS modules...', 'blue');
    const { Generator } = await import(pathToFileURL(generatorPath).href);
    const { ontology } = await import(pathToFileURL(ontologyPath).href);
    const { presets } = await import(pathToFileURL(configPath).href);

    // Generate design system with default preset
    log('⚙️  Generating design system...', 'blue');
    const generator = new Generator({ preset: 'default', design: presets.default });

    // Extract data
    log('🔍 Extracting CSS properties...', 'blue');
    const properties = extractCSSProperties(generator);
    log(`   Found ${properties.length} CSS custom properties`, 'cyan');

    log('🔍 Extracting CSS classes...', 'blue');
    const classes = await extractCSSClasses(ontology);
    log(`   Found ${classes.length} CSS classes`, 'cyan');

    log('🔍 Extracting data attributes...', 'blue');
    const attributes = extractDataAttributes(ontology);
    log(`   Found ${attributes.length} data attributes`, 'cyan');

    // Generate VS Code format
    log('📝 Generating VS Code CSS custom data...', 'blue');
    const vscodeData = toVSCodeFormat(properties, classes);

    // Generate standard format
    log('📝 Generating standard CSS data...', 'blue');
    const standardData = toStandardFormat(properties, classes, attributes);

    // Write files to repository
    const vscodeOutputPath = path.join(repoRoot, 'public/assets/pds/pds.css-data.json');
    const standardOutputPath = path.join(repoRoot, 'public/assets/pds/pds-css-complete.json');

    await mkdir(path.dirname(vscodeOutputPath), { recursive: true });
    await writeFile(vscodeOutputPath, JSON.stringify(vscodeData, null, 2), 'utf-8');
    log(`✅ VS Code CSS data: ${path.relative(repoRoot, vscodeOutputPath)}`, 'green');

    await writeFile(standardOutputPath, JSON.stringify(standardData, null, 2), 'utf-8');
    log(`✅ Standard CSS data: ${path.relative(repoRoot, standardOutputPath)}`, 'green');

    // Copy to target directory if specified
    if (targetDir) {
      const targetVSCodePath = path.join(targetDir, 'pds.css-data.json');
      const targetStandardPath = path.join(targetDir, 'pds-css-complete.json');

      await mkdir(targetDir, { recursive: true });
      await writeFile(targetVSCodePath, JSON.stringify(vscodeData, null, 2), 'utf-8');
      await writeFile(targetStandardPath, JSON.stringify(standardData, null, 2), 'utf-8');

      log(`✅ Copied to ${path.relative(process.cwd(), targetDir)}`, 'green');
    }

    // Create workspace settings reference
    const settingsRef = {
      "css.customData": ["public/assets/pds/pds.css-data.json"]
    };
    const settingsPath = path.join(repoRoot, 'pds.css-data.json');
    await writeFile(settingsPath, JSON.stringify(settingsRef, null, 2), 'utf-8');
    log(`✅ Created settings reference: pds.css-data.json`, 'green');

    log('\n✨ CSS IntelliSense data generation complete!', 'bold');
    log('📚 To enable in VS Code, add to .vscode/settings.json:', 'cyan');
    log('   "css.customData": ["node_modules/pure-ds/public/assets/pds/pds.css-data.json"]', 'blue');

    return true;
  } catch (error) {
    log(`❌ Error generating CSS data: ${error.message}`, 'red');
    console.error(error);
    return false;
  }
}

export { generateCSSData };

// Run if called directly
if (process.argv[1] && process.argv[1].endsWith('generate-css-data.js')) {
  const targetDir = process.argv[2] || null;
  generateCSSData(targetDir).then(success => {
    process.exit(success ? 0 : 1);
  });
}
