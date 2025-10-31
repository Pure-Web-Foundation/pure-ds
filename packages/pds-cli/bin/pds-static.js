#!/usr/bin/env node

/**
 * PDS Static Export CLI
 *
 * Generates a static package of Pure Design System assets for consumer apps:
 * - Discovers the web root (reuses discoverWebRoot from postinstall)
 * - Reads pds-config.js from consumer project root (fallback to internal default)
 * - Builds pds-icons.svg into target folder
 * - Copies auto-define web components into target folder
 * - Generates CSS layers into target folder
 *
 * Default target: <webroot>/pds
 *
 * Usage:
 *   node packages/pds-cli/bin/pds-static.js
 *   (or via npm script: npm run pds:static)
 */

import { readFile, writeFile, mkdir, readdir, copyFile, stat } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

import { discoverWebRoot } from './postinstall.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../../../');

// Lazy imports to avoid circular/packaging issues
async function loadGenerator() {
  const genPath = path.join(repoRoot, 'src/js/pds-core/pds-generator.js');
  return import(pathToFileURL(genPath).href);
}

// Colors for terminal output
const COLORS = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  red: '\x1b[31m',
};
const log = (msg, color = 'reset') => console.log(`${COLORS[color]}${msg}${COLORS.reset}`);

// --- Icon sprite helpers (adapted from scripts/build-icons.mjs) ---
async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

async function fetchIconFromSet(set, name, weight = 'regular', variant = 'outline') {
  switch (set) {
    case 'phosphor':
      return fetchText(`https://unpkg.com/@phosphor-icons/core@2.1.1/assets/${weight}/${name}.svg`);
    case 'lucide':
      return fetchText(`https://unpkg.com/lucide-static@latest/icons/${name}.svg`);
    case 'heroicons':
      return fetchText(`https://unpkg.com/heroicons@2.0.18/24/${variant}/${name}.svg`);
    case 'tabler':
      return fetchText(`https://unpkg.com/@tabler/icons@latest/icons/outline/${name}.svg`);
    default:
      throw new Error(`Unknown icon set: ${set}`);
  }
}

function svgToSymbol(svgContent, id) {
  const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 256 256';
  const contentMatch = svgContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
  const inner = contentMatch ? contentMatch[1] : '';
  const cleaned = inner
    .replace(/fill="[^"]*"/g, 'fill="currentColor"')
    .replace(/stroke="[^"]*"/g, 'stroke="currentColor"');
  const indented = cleaned.trim().split('\n').map(l => `    ${l}`).join('\n');
  return `  <symbol id="${id}" viewBox="${viewBox}">\n${indented}\n  </symbol>`;
}

async function buildIconSprite(iconConfig, outputPath) {
  if (!iconConfig || !iconConfig.include) {
    log('⚠️  No icons configuration found; skipping sprite build', 'yellow');
    return false;
  }
  const { set = 'phosphor', weight = 'regular', include } = iconConfig;
  const all = Object.values(include).flat();
  const unique = [...new Set(all)];

  log(`🎨 Building icon sprite (${set}) - ${unique.length} icons`,'bold');
  const symbols = [];
  const errors = [];
  for (const name of unique) {
    try {
      const svg = await fetchIconFromSet(set, name, weight);
      symbols.push(svgToSymbol(svg, name));
      log(`  ✓ ${name}`, 'green');
    } catch (e) {
      errors.push({ name, error: e.message });
      log(`  ✗ ${name}: ${e.message}`, 'red');
    }
  }

  const sprite = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display:none">\n${symbols.join('\n\n')}\n</svg>\n`;
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, sprite, 'utf-8');
  log(`✅ Icons sprite written: ${path.relative(process.cwd(), outputPath)}`, 'green');
  if (errors.length) log(`⚠️  ${errors.length} icons failed`, 'yellow');
  return true;
}

// Copy entire directory recursively (conservative: overwrite same-name files only)
async function copyDirectory(srcDir, dstDir) {
  await mkdir(dstDir, { recursive: true });
  const entries = await readdir(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const src = path.join(srcDir, entry.name);
    const dst = path.join(dstDir, entry.name);
    if (entry.isDirectory()) {
      await copyDirectory(src, dst);
    } else {
      await mkdir(path.dirname(dst), { recursive: true });
      await copyFile(src, dst);
      log(`   • ${path.relative(dstDir, dst)}`, 'blue');
    }
  }
}

async function loadConsumerConfig() {
  const cwd = process.cwd();
  const configPath = path.join(cwd, 'pds-config.js');

  if (existsSync(configPath)) {
    log(`📋 Using consumer config: ${path.relative(cwd, configPath)}`,'blue');
    const mod = await import(pathToFileURL(configPath).href);
    // Support default export or named export 'config' or 'presets'
    if (mod.default) return mod.default;
    if (mod.config) return mod.config;
    if (mod.presets?.default) return mod.presets.default;
    log('⚠️  Could not resolve config from pds-config.js; falling back to internal default', 'yellow');
  } else {
    log('⚠️  pds-config.js not found in project root; using internal default preset', 'yellow');
  }

  // Fallback to internal default preset
  const internalConfigPath = path.join(repoRoot, 'src/js/pds-core/pds-config.js');
  const internal = await import(pathToFileURL(internalConfigPath).href);
  return internal.presets.default;
}

async function main() {
  try {
    log('\nPDS Static Export • starting...', 'bold');

  // 1) Discover web root
  const webRoot = await discoverWebRoot();

    // 2) Load consumer config
  const config = await loadConsumerConfig();
  const baseFolderName = String(config?.staticBase || 'pds').replace(/^\/+|\/+$/g, '');
  const targetDir = path.join(webRoot.path, baseFolderName);
  log(`📂 Web root: ${webRoot.relative}/`,'blue');
  log(`📦 Target folder: ${path.relative(process.cwd(), targetDir)}`,'blue');

    // 3) Build icons sprite into target/assets/img/pds-icons.svg
  const iconsOut = path.join(targetDir, 'assets/img/pds-icons.svg');
    await buildIconSprite(config.icons || {}, iconsOut);

    // 4) Copy auto-define components into target/auto-define
    const autoDefineSrc = path.join(repoRoot, 'public/auto-define');
    const autoDefineDst = path.join(targetDir, 'auto-define');
    log(`📁 Copying auto-define components → ${path.relative(process.cwd(), autoDefineDst)}`,'bold');
    await copyDirectory(autoDefineSrc, autoDefineDst);

  // 5) Generate CSS layers into target/css
    log('🧬 Generating CSS layers...', 'bold');
    const { Generator } = await loadGenerator();
    const designer = new Generator({ ...config, debug: false });
    const cssDir = path.join(targetDir, 'css');
    await mkdir(cssDir, { recursive: true });
    await writeFile(path.join(cssDir, 'pds-tokens.css'), designer.tokensCSS, 'utf-8');
    await writeFile(path.join(cssDir, 'pds-primitives.css'), designer.primitivesCSS, 'utf-8');
    await writeFile(path.join(cssDir, 'pds-components.css'), designer.componentsCSS, 'utf-8');
    await writeFile(path.join(cssDir, 'pds-utilities.css'), designer.utilitiesCSS, 'utf-8');
    await writeFile(path.join(cssDir, 'pds-styles.css'), designer.layeredCSS, 'utf-8');

    // Also emit constructable stylesheet modules for PDS.static()
    const modules = designer.getCSSModules();
    for (const [filename, content] of Object.entries(modules)) {
      await writeFile(path.join(cssDir, filename), content, 'utf-8');
    }
    log(`✅ CSS written to ${path.relative(process.cwd(), cssDir)} (and CSS.js modules)`, 'green');

    // 6) Copy documentation markdown files into base folder
    log('📚 Copying PDS markdown docs...', 'bold');
    const mdTargets = [];
    const rootEntries = await readdir(repoRoot);
    for (const n of rootEntries) {
      if (/\.md$/i.test(n)) {
        mdTargets.push({ src: path.join(repoRoot, n), dst: path.join(targetDir, n) });
      }
    }
    // docs/*.md if present
    const docsDir = path.join(repoRoot, 'docs');
    try {
      const docsEntries = await readdir(docsDir, { withFileTypes: true });
      for (const de of docsEntries) {
        if (de.isFile() && /\.md$/i.test(de.name)) {
          mdTargets.push({ src: path.join(docsDir, de.name), dst: path.join(targetDir, de.name) });
        }
      }
    } catch {}
    for (const { src, dst } of mdTargets) {
      try { await copyFile(src, dst); log(`   • ${path.basename(dst)}`, 'blue'); } catch {}
    }

  // 7) Summary
    log('\n────────────────────────────────────────────');
    log('✅ PDS static assets ready', 'green');
    log(`📍 Location: ${path.relative(process.cwd(), targetDir)}`);
    log('• icons → assets/img/pds-icons.svg');
    log('• components → auto-define/*.js');
  log('• styles → css/pds-*.css (+ .css.js modules)');
  log('• docs → *.md in base folder');
    log('────────────────────────────────────────────\n');

  } catch (err) {
    console.error('❌ pds:static failed:', err?.message || err);
    process.exit(1);
  }
}

// Execute when run directly from Node
if (process.argv[1] && process.argv[1].endsWith('pds-static.js')) {
  main();
}

export { main as runPdsStatic };
