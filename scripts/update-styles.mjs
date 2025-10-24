#!/usr/bin/env node

/**
 * Generator Node.js Script
 * Generates CSS from auto-designer.config.js and writes to file
 */

import { readFile, writeFile, mkdir } from 'fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');

// Import Generator class
import { Generator } from '../src/js/auto-designer.js';

async function main() {
  try {
    console.log('🎨 Generator - Generating CSS...\n');
    
    // Load configuration
    console.log('📋 Loading configuration from config.js...');
    const configPath = resolve(rootDir, 'src/js/config.js');
    
    if (!existsSync(configPath)) {
      throw new Error(`Configuration file not found: ${configPath}`);
    }
    
    const { config } = await import(`file://${configPath}`);
    console.log('✓ Configuration loaded\n');
    
    // Create Generator instance
    console.log('🔧 Initializing Generator...');
    const designer = new Generator(config.design);
    console.log('✓ Generator initialized\n');
    
    // Get generated CSS
    const css = designer.exportCSS();
    console.log(`✓ CSS generated (${(css.length / 1024).toFixed(2)} KB)\n`);
    
    // Debug: Check if form styles are present
    if (css.includes('fieldset {')) {
      console.log('✓ Form styles found in generated CSS');
    } else {
      console.log('⚠️  WARNING: Form styles NOT found in generated CSS!');
      console.log('CSS includes "Mobile-First":', css.includes('Mobile-First'));
      console.log('CSS includes "input, textarea":', css.includes('input, textarea'));
    }
    
    // Determine output path
    const outputPath = resolve(rootDir, config.autoDefine?.output?.file || 'public/assets/css/auto-designer.css');
    const outputDir = dirname(outputPath);
    
    // Create output directory if it doesn't exist
    if (!existsSync(outputDir)) {
      console.log(`📁 Creating output directory: ${outputDir}`);
      await mkdir(outputDir, { recursive: true });
      console.log('✓ Directory created\n');
    }
    
    // Write CSS to file
    console.log(`💾 Writing CSS to: ${outputPath}`);
    await writeFile(outputPath, css, 'utf8');
    console.log('✓ CSS file written\n');
    
    // Print summary
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ Success!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Output: ${outputPath}`);
    console.log(`Size: ${(css.length / 1024).toFixed(2)} KB`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    // Print token summary if debug enabled
    if (config.autoDefine?.debug) {
      console.log('🔍 Debug Info:');
      const tokens = designer.getTokens();
      console.log(`  Colors: ${Object.keys(tokens.colors).length} palettes`);
      console.log(`  Spacing: ${Object.keys(tokens.spacing).length} values`);
      console.log(`  Typography: ${Object.keys(tokens.typography).length} sizes`);
      console.log(`  Shadows: ${Object.keys(tokens.shadows).length} depths`);
      console.log('');
    }
    
  } catch (error) {
    console.error('❌ Error generating CSS:', error.message);
    if (error.stack) {
      console.error('\nStack trace:');
      console.error(error.stack);
    }
    process.exit(1);
  }
}

main();
