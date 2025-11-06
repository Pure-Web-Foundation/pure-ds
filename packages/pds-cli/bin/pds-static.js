#!/usr/bin/env node

/**
 * PDS Static Export CLI
 *
 * Generates a static package of Pure Design System assets for consumer apps:
 * - Discovers the web root (reuses discoverWebRoot from postinstall)
 * - Reads pds.config.js (source of truth)
 * - Copies auto-define web components into [config.static.root]/components/
 * - Generates CSS layers into [config.static.root]/styles/ (and .css.js modules)
 *
 * Default target when config.static.root missing: <webroot>/pds
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

// (Icons generation removed for streamlined static export)

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

  // 1) Prefer repository-level pds.config.js (source of truth for both live and static)
  const repoConfigPath = path.join(repoRoot, 'pds.config.js');
  if (existsSync(repoConfigPath)) {
    log(`📋 Using repo config: ${path.relative(process.cwd(), repoConfigPath)}`,'blue');
    const mod = await import(pathToFileURL(repoConfigPath).href);
    if (mod.config) return mod.config;
    if (mod.default) return mod.default;
  }

  // 2) Fallbacks for consumer apps: pds.config.js or legacy pds-config.js in CWD
  const candidates = ['pds.config.js', 'pds-config.js'];
  for (const fname of candidates) {
    const configPath = path.join(cwd, fname);
    if (existsSync(configPath)) {
      log(`📋 Using consumer config: ${path.relative(cwd, configPath)}`,'blue');
      const mod = await import(pathToFileURL(configPath).href);
      if (mod.config) return mod.config;
      if (mod.default) return mod.default;
      if (mod.presets?.default) return mod.presets.default;
      log(`⚠️  Could not resolve config from ${fname}; trying next/fallback`, 'yellow');
    }
  }

  // 3) Final fallback to internal default preset
  log('⚠️  No pds.config found; using internal default preset', 'yellow');
  const internalConfigPath = path.join(repoRoot, 'src/js/pds-core/pds-config.js');
  const internal = await import(pathToFileURL(internalConfigPath).href);
  return internal.presets.default;
}

async function main() {
  try {
    log('\nPDS Static Export • starting...', 'bold');

  // 1) Discover web root (used if no explicit static.root is provided)
  const webRoot = await discoverWebRoot();

  // 2) Load config
  const config = await loadConsumerConfig();

  // 3) Resolve target directory: prefer config.static.root, else fall back to webRoot + base
  //    IMPORTANT: Resolve relative paths against the consumer app's CWD, not the PDS package root.
  let targetDir;
  if (config?.static?.root) {
    const rootPath = String(config.static.root);
    targetDir = path.isAbsolute(rootPath)
      ? rootPath
      : path.resolve(process.cwd(), rootPath);
  } else {
    const baseFolderName = String(config?.staticBase || 'pds').replace(/^\/+|\/+$/g, '');
    targetDir = path.join(webRoot.path, baseFolderName);
  }

  log(`📂 Web root: ${webRoot.relative}/`,'blue');
  log(`📦 Target folder: ${path.relative(process.cwd(), targetDir)}`,'blue');

  // 4) Copy auto-define components into target/components
  const autoDefineSrc = path.join(repoRoot, 'public/auto-define');
  const componentsDir = path.join(targetDir, 'components');
  log(`📁 Copying components → ${path.relative(process.cwd(), componentsDir)}`,'bold');
  await copyDirectory(autoDefineSrc, componentsDir);

  // 5) Generate CSS layers into target/styles
  log('🧬 Generating styles...', 'bold');
  const { Generator } = await loadGenerator();
  const designer = new Generator({ ...config, debug: false });
  const stylesDir = path.join(targetDir, 'styles');
  await mkdir(stylesDir, { recursive: true });
  await writeFile(path.join(stylesDir, 'pds-tokens.css'), designer.tokensCSS, 'utf-8');
  await writeFile(path.join(stylesDir, 'pds-primitives.css'), designer.primitivesCSS, 'utf-8');
  await writeFile(path.join(stylesDir, 'pds-components.css'), designer.componentsCSS, 'utf-8');
  await writeFile(path.join(stylesDir, 'pds-utilities.css'), designer.utilitiesCSS, 'utf-8');
  await writeFile(path.join(stylesDir, 'pds-styles.css'), designer.layeredCSS, 'utf-8');

  // Also emit constructable stylesheet modules for PDS.start({ mode: 'static' })
  const modules = designer.getCSSModules();
  for (const [filename, content] of Object.entries(modules)) {
    await writeFile(path.join(stylesDir, filename), content, 'utf-8');
  }
  log(`✅ Styles written to ${path.relative(process.cwd(), stylesDir)} (and CSS.js modules)`, 'green');

  // 5b) Ensure icon sprite is available at [static.root]/icons/icons.svg
  try {
    const iconSource = path.join(repoRoot, 'public/assets/img/pds-icons.svg');
    const iconsDir = path.join(targetDir, 'icons');
    await mkdir(iconsDir, { recursive: true });
    const iconTarget = path.join(iconsDir, 'icons.svg');
    await copyFile(iconSource, iconTarget);
    log(`✅ Icons sprite copied to ${path.relative(process.cwd(), iconTarget)}`, 'green');
  } catch (e) {
    log(`⚠️  Could not copy icon sprite: ${e?.message || e}`, 'yellow');
  }

  // 6) Summary
  log('\n────────────────────────────────────────────');
  log('✅ PDS static assets ready', 'green');
  log(`📍 Location: ${path.relative(process.cwd(), targetDir)}`);
  log('• components → components/*.js');
  log('• styles → styles/pds-*.css (+ .css.js modules)');
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
