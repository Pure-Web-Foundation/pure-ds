#!/usr/bin/env node

/**
 * Icon Sprite Builder
 * 
 * Downloads SVG icons from Phosphor Icons CDN and builds an SVG sprite sheet
 * based on the configuration in config.js
 * 
 * Usage: node scripts/build-icons.mjs
 */

import { readFile, writeFile, mkdir } from 'fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');

// ANSI colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Fetch icon SVG from Phosphor Icons CDN
 */
async function fetchPhosphorIcon(iconName, weight = 'regular') {
  const url = `https://unpkg.com/@phosphor-icons/core@2.1.1/assets/${weight}/${iconName}.svg`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    throw new Error(`Failed to fetch ${iconName} (${weight}): ${error.message}`);
  }
}

/**
 * Fetch icon SVG from Lucide CDN
 */
async function fetchLucideIcon(iconName) {
  const url = `https://unpkg.com/lucide-static@latest/icons/${iconName}.svg`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    throw new Error(`Failed to fetch ${iconName}: ${error.message}`);
  }
}

/**
 * Fetch icon SVG from Heroicons CDN
 */
async function fetchHeroicon(iconName, variant = 'outline') {
  const url = `https://unpkg.com/heroicons@2.0.18/24/${variant}/${iconName}.svg`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    throw new Error(`Failed to fetch ${iconName} (${variant}): ${error.message}`);
  }
}

/**
 * Fetch icon SVG from Tabler Icons CDN
 */
async function fetchTablerIcon(iconName) {
  const url = `https://unpkg.com/@tabler/icons@latest/icons/outline/${iconName}.svg`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    throw new Error(`Failed to fetch ${iconName}: ${error.message}`);
  }
}

/**
 * Convert SVG content to symbol for sprite
 */
function svgToSymbol(svgContent, id) {
  // Extract viewBox from SVG tag
  const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 256 256';
  
  // Extract inner content (everything between <svg> tags)
  const contentMatch = svgContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
  const innerContent = contentMatch ? contentMatch[1] : '';
  
  // Remove any fill attributes to allow CSS color control
  const cleanContent = innerContent
    .replace(/fill="[^"]*"/g, 'fill="currentColor"')
    .replace(/stroke="[^"]*"/g, 'stroke="currentColor"');
  
  return `  <symbol id="${id}" viewBox="${viewBox}">
${cleanContent.trim().split('\n').map(line => `    ${line}`).join('\n')}
  </symbol>`;
}

/**
 * Build icon sprite from configuration
 */
async function buildIconSprite() {
  log('\n🎨 Building Icon Sprite...', 'bright');
  
  // Load configuration
  const configPath = resolve(projectRoot, 'src/js/config.js');
  const { config } = await import(`file://${configPath}`);
  
  const iconConfig = config.design.icons;
  
  if (!iconConfig || !iconConfig.include) {
    log('❌ No icon configuration found in config.js', 'red');
    return;
  }
  
  const { set, weight = 'regular', include, spritePath } = iconConfig;
  
  log(`\n📦 Icon Set: ${set}`, 'blue');
  if (set === 'phosphor') {
    log(`⚖️  Weight: ${weight}`, 'blue');
  }
  
  // Flatten icon list from categories
  const allIcons = Object.values(include).flat();
  const uniqueIcons = [...new Set(allIcons)];
  
  log(`📝 Total icons: ${uniqueIcons.length}\n`, 'blue');
  
  // Fetch all icons
  const symbols = [];
  const errors = [];
  let successCount = 0;
  
  for (const iconName of uniqueIcons) {
    try {
      let svgContent;
      
      // Fetch based on icon set
      switch (set) {
        case 'phosphor':
          svgContent = await fetchPhosphorIcon(iconName, weight);
          break;
        case 'lucide':
          svgContent = await fetchLucideIcon(iconName);
          break;
        case 'heroicons':
          svgContent = await fetchHeroicon(iconName);
          break;
        case 'tabler':
          svgContent = await fetchTablerIcon(iconName);
          break;
        default:
          throw new Error(`Unknown icon set: ${set}`);
      }
      
      const symbol = svgToSymbol(svgContent, iconName);
      symbols.push(symbol);
      successCount++;
      log(`  ✓ ${iconName}`, 'green');
      
    } catch (error) {
      errors.push({ icon: iconName, error: error.message });
      log(`  ✗ ${iconName}: ${error.message}`, 'red');
    }
  }
  
  // Build sprite sheet
  const sprite = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display:none">
${symbols.join('\n\n')}
</svg>
`;
  
  // Ensure output directory exists
  const outputPath = resolve(projectRoot, spritePath);
  const outputDir = dirname(outputPath);
  await mkdir(outputDir, { recursive: true });
  
  // Write sprite file
  await writeFile(outputPath, sprite, 'utf-8');
  
  // Summary
  log('\n' + '='.repeat(50), 'bright');
  log(`✅ Sprite built successfully!`, 'green');
  log(`📁 Output: ${spritePath}`, 'blue');
  log(`✓ ${successCount} icons included`, 'green');
  
  if (errors.length > 0) {
    log(`✗ ${errors.length} icons failed`, 'red');
  }
  
  log('='.repeat(50) + '\n', 'bright');
  
  // Usage instructions
  log('Usage in HTML:', 'bright');
  log('  <svg-icon icon="icon-name"></svg-icon>', 'yellow');
  log('\nAvailable icons:', 'bright');
  
  // Group by category for display
  for (const [category, icons] of Object.entries(include)) {
    log(`\n  ${category}:`, 'blue');
    icons.forEach(icon => {
      const status = errors.find(e => e.icon === icon) ? '✗' : '✓';
      const color = errors.find(e => e.icon === icon) ? 'red' : 'reset';
      log(`    ${status} ${icon}`, color);
    });
  }
  
  console.log();
}

// Run the builder
buildIconSprite().catch(error => {
  log(`\n❌ Build failed: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});
