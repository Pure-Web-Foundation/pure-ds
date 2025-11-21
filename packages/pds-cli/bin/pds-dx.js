#!/usr/bin/env node

/**
 * PDS Developer Experience (DX) Script
 * Runs all IntelliSense and tooling generation:
 * - Custom Elements Manifest (HTML IntelliSense)
 * - CSS Custom Data (CSS IntelliSense)
 * 
 * This provides complete IDE support for consuming projects
 */

import { generateManifest } from './generate-manifest.js';
import { generateCSSData } from './generate-css-data.js';

// Colors for terminal output
const COLORS = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};
const log = (msg, color = 'reset') => console.log(`${COLORS[color]}${msg}${COLORS.reset}`);

/**
 * Run all DX tooling generation
 */
async function generateDXTools(targetDir) {
  try {
    log('\n╔════════════════════════════════════════════════════════════╗', 'cyan');
    log('║  🚀 PDS Developer Experience (DX) Tool Generator          ║', 'cyan');
    log('╚════════════════════════════════════════════════════════════╝\n', 'cyan');

    let allSuccess = true;

    // Step 1: Generate Custom Elements Manifest (HTML IntelliSense)
    log('┌─────────────────────────────────────────────────────────┐', 'blue');
    log('│ Step 1: HTML IntelliSense (Custom Elements Manifest)   │', 'blue');
    log('└─────────────────────────────────────────────────────────┘\n', 'blue');
    
    const manifestSuccess = await generateManifest(targetDir);
    if (!manifestSuccess) {
      log('⚠️  Custom Elements Manifest generation had issues', 'yellow');
      allSuccess = false;
    }

    log('\n'); // Spacing between steps

    // Step 2: Generate CSS Custom Data (CSS IntelliSense)
    log('┌─────────────────────────────────────────────────────────┐', 'blue');
    log('│ Step 2: CSS IntelliSense (CSS Custom Data)             │', 'blue');
    log('└─────────────────────────────────────────────────────────┘\n', 'blue');
    
    const cssDataSuccess = await generateCSSData(targetDir);
    if (!cssDataSuccess) {
      log('⚠️  CSS custom data generation had issues', 'yellow');
      allSuccess = false;
    }

    // Summary
    log('\n╔════════════════════════════════════════════════════════════╗', allSuccess ? 'green' : 'yellow');
    log(`║  ${allSuccess ? '✅ All DX Tools Generated Successfully!' : '⚠️  DX Tools Generated with Warnings'}              ║`, allSuccess ? 'green' : 'yellow');
    log('╚════════════════════════════════════════════════════════════╝\n', allSuccess ? 'green' : 'yellow');

    if (allSuccess) {
      log('📦 Generated files:', 'bold');
      log('   HTML: custom-elements.json, vscode-custom-data.json', 'cyan');
      log('   CSS:  pds.css-data.json, pds-css-complete.json', 'cyan');
      log('\n💡 VS Code Setup:', 'bold');
      log('   Add to .vscode/settings.json:', 'blue');
      log('   {', 'cyan');
      log('     "html.customData": ["./pds.html-data.json"],', 'cyan');
      log('     "css.customData": ["./pds.css-data.json"]', 'cyan');
      log('   }', 'cyan');
      log('\n🔄 Reload VS Code:', 'bold');
      log('   Press Ctrl+Shift+P → "Developer: Reload Window"', 'blue');
    }

    return allSuccess;
  } catch (error) {
    log(`\n❌ Fatal error in DX tool generation: ${error.message}`, 'red');
    console.error(error);
    return false;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const targetDir = process.argv[2] || null;
  
  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    log('PDS Developer Experience Tool Generator', 'bold');
    log('\nUsage:', 'cyan');
    log('  pds-dx [target-directory]', 'blue');
    log('\nDescription:', 'cyan');
    log('  Generates all IntelliSense data for IDE support:', 'blue');
    log('  - Custom Elements Manifest (HTML autocomplete)', 'blue');
    log('  - CSS Custom Data (CSS tokens & classes)', 'blue');
    log('\nExamples:', 'cyan');
    log('  pds-dx                          # Generate in default location', 'blue');
    log('  pds-dx public/assets/pds        # Generate in specific directory', 'blue');
    log('  npm run pds:dx                  # Run via npm script', 'blue');
    process.exit(0);
  }

  generateDXTools(targetDir).then(success => {
    process.exit(success ? 0 : 1);
  });
}

export { generateDXTools };
