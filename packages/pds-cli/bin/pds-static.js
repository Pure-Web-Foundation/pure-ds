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
import { runPdsBuildIcons } from './pds-build-icons.js';
import { generateManifest } from './generate-manifest.js';
import { generateCSSData } from './generate-css-data.js';

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

/**
 * Update or create .vscode/settings.json with IntelliSense paths
 */
async function updateVSCodeSettings(targetDir) {
  try {
    const cwd = process.cwd();
    const vscodeDir = path.join(cwd, '.vscode');
    const settingsPath = path.join(vscodeDir, 'settings.json');
    
    // Calculate relative paths from workspace root to the generated files
    const htmlCustomDataPath = path.relative(cwd, path.join(targetDir, 'vscode-custom-data.json')).replace(/\\/g, '/');
    const cssCustomDataPath = path.relative(cwd, path.join(targetDir, 'pds.css-data.json')).replace(/\\/g, '/');
    
    let settings = {};
    
    // Read existing settings if file exists
    if (existsSync(settingsPath)) {
      try {
        const content = await readFile(settingsPath, 'utf-8');
        // Remove comments from JSON (simple approach for // style comments)
        const cleanContent = content.split('\n')
          .filter(line => !line.trim().startsWith('//'))
          .join('\n');
        settings = JSON.parse(cleanContent);
      } catch (e) {
        log(`⚠️  Could not parse existing .vscode/settings.json: ${e.message}`, 'yellow');
        log('   Creating new settings file...', 'yellow');
      }
    }
    
    // Update or add the custom data paths
    if (!settings['html.customData']) {
      settings['html.customData'] = [];
    }
    if (!settings['css.customData']) {
      settings['css.customData'] = [];
    }
    
    // Remove old PDS paths and add the new one
    settings['html.customData'] = settings['html.customData'].filter(
      p => !p.includes('vscode-custom-data.json') || !p.includes('/pds/')
    );
    settings['css.customData'] = settings['css.customData'].filter(
      p => !p.includes('pds.css-data.json') || !p.includes('/pds/')
    );
    
    if (!settings['html.customData'].includes(htmlCustomDataPath)) {
      settings['html.customData'].push(htmlCustomDataPath);
    }
    if (!settings['css.customData'].includes(cssCustomDataPath)) {
      settings['css.customData'].push(cssCustomDataPath);
    }
    
    // Ensure .vscode directory exists
    await mkdir(vscodeDir, { recursive: true });
    
    // Write settings with proper formatting
    await writeFile(settingsPath, JSON.stringify(settings, null, 2), 'utf-8');
    
    log(`✅ Updated .vscode/settings.json with IntelliSense paths`, 'green');
    log(`   • html.customData: ${htmlCustomDataPath}`, 'blue');
    log(`   • css.customData: ${cssCustomDataPath}`, 'blue');
  } catch (e) {
    log(`⚠️  Failed to update .vscode/settings.json: ${e?.message || e}`, 'yellow');
    log('   You may need to manually add the IntelliSense paths to your settings.', 'yellow');
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
      try {
        const mod = await import(pathToFileURL(configPath).href);
        if (mod.config) return mod.config;
        if (mod.default) return mod.default;
        if (mod.presets?.default) return mod.presets.default;
        log(`⚠️  Could not resolve config from ${fname}; trying next/fallback`, 'yellow');
      } catch (e) {
        const msg = e?.message || String(e);
        // Helpful guidance when consumer config references browser globals
        if (/PDS is not defined/i.test(msg)) {
          log('❌ Failed to evaluate pds.config.js: PDS is not defined', 'red');
          log('   This usually means your config references the browser global "PDS".', 'yellow');
          log('   The static exporter runs in Node, so please import presets instead of using window.PDS.', 'yellow');
          log('   Example fix for pds.config.js:', 'yellow');
          log("     import { presets } from 'pure-ds/src/js/pds-core/pds-config.js'", 'blue');
          log('     export const config = { ...presets.default, static: { root: "public/assets/pds/" } }', 'blue');
        }
        throw e;
      }
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

  // 4) Copy component modules into target/components
  // Prefer new location (public/pds/components); fallback to legacy (public/auto-define)
  const compSrcCandidates = [
    path.join(repoRoot, 'public/assets/pds/components'),
    path.join(repoRoot, 'public/pds/components'),
    path.join(repoRoot, 'public/auto-define'),
  ];
  let componentsSource = compSrcCandidates.find(p => existsSync(p));
  if (!componentsSource) {
    log(`⚠️  No components source found (looked for: ${compSrcCandidates.map(p=>path.relative(repoRoot,p)).join(', ')})`, 'yellow');
    log(`   Skipping components copy. You can still use generated styles.`, 'yellow');
  } else {
    const componentsDir = path.join(targetDir, 'components');
    log(`📁 Copying components → ${path.relative(process.cwd(), componentsDir)}`,'bold');
    await copyDirectory(componentsSource, componentsDir);
  }

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

  // 5b) Build custom icon sprite when consumer config overrides defaults; otherwise copy stock sprite
  try {
    const internalConfigPath = path.join(repoRoot, 'src/js/pds-core/pds-config.js');
    const internal = await import(pathToFileURL(internalConfigPath).href);
    const defaultIcons = internal.presets?.default?.icons || {};
    const consumerIcons = config?.icons || null;

    const isDifferent = () => {
      if (!consumerIcons) return false;
      const setDiff = consumerIcons.set && consumerIcons.set !== defaultIcons.set;
      const weightDiff = consumerIcons.weight && consumerIcons.weight !== defaultIcons.weight;
      const includeDiff = JSON.stringify(consumerIcons.include || {}) !== JSON.stringify(defaultIcons.include || {});
      return Boolean(setDiff || weightDiff || includeDiff);
    };

    const iconsDir = path.join(targetDir, 'icons');
    await mkdir(iconsDir, { recursive: true });
    const iconTarget = path.join(iconsDir, 'pds-icons.svg');

    if (isDifferent()) {
      log('🛠️  Detected custom icons in consumer config — building sprite...', 'bold');
      // Pass the resolved targetDir to the builder via env override
      const prev = process.env.PDS_STATIC_ROOT;
      process.env.PDS_STATIC_ROOT = targetDir;
      try {
        await runPdsBuildIcons();
        log(`✅ Icons sprite built at ${path.relative(process.cwd(), iconTarget)}`, 'green');
      } finally {
        // restore previous env var (if any)
        if (prev === undefined) delete process.env.PDS_STATIC_ROOT; else process.env.PDS_STATIC_ROOT = prev;
      }
    } else {
      // Copy stock sprite shipped with the package
      const iconSource = path.join(repoRoot, 'public/assets/pds/icons/pds-icons.svg');
      await copyFile(iconSource, iconTarget);
      log(`✅ Icons sprite copied to ${path.relative(process.cwd(), iconTarget)}`, 'green');
    }
  } catch (e) {
    log(`⚠️  Icon sprite step encountered an issue: ${e?.message || e}`, 'yellow');
  }

  // 6) Generate Custom Elements Manifest (HTML IntelliSense)
  try {
    await generateManifest(targetDir);
  } catch (e) {
    log(`⚠️  Custom Elements Manifest generation failed: ${e?.message || e}`, 'yellow');
  }

  // 7) Generate CSS Custom Data (CSS IntelliSense)
  try {
    await generateCSSData(targetDir);
  } catch (e) {
    log(`⚠️  CSS custom data generation failed: ${e?.message || e}`, 'yellow');
  }

  // 8) Update .vscode/settings.json with IntelliSense paths
  await updateVSCodeSettings(targetDir);

  // 9) Write runtime config helper for auto-discovery
  try {
    // Calculate the web-root-relative path to the target directory
    const relativePath = path.relative(process.cwd(), targetDir).replace(/\\/g, '/');
    const urlPath = relativePath.startsWith('public/') 
      ? '/' + relativePath.substring('public/'.length)
      : '/' + relativePath;
    const normalizedUrlPath = urlPath.endsWith('/') ? urlPath : urlPath + '/';
    
    const runtimeConfig = {
      exportedAt: new Date().toISOString(),
      staticRoot: normalizedUrlPath,
      paths: {
        tokens: `${normalizedUrlPath}styles/pds-tokens.css.js`,
        primitives: `${normalizedUrlPath}styles/pds-primitives.css.js`,
        components: `${normalizedUrlPath}styles/pds-components.css.js`,
        utilities: `${normalizedUrlPath}styles/pds-utilities.css.js`,
        styles: `${normalizedUrlPath}styles/pds-styles.css.js`,
      }
    };
    
    const runtimeConfigPath = path.join(targetDir, 'pds-runtime-config.json');
    await writeFile(runtimeConfigPath, JSON.stringify(runtimeConfig, null, 2), 'utf-8');
    log(`✅ Runtime config written to ${path.relative(process.cwd(), runtimeConfigPath)}`, 'green');
    log(`💡 Use this in PDS.start(): static: { root: "${normalizedUrlPath}" }`, 'blue');
  } catch (e) {
    log(`⚠️  Failed to write runtime config: ${e?.message || e}`, 'yellow');
  }

  // 10) Summary
  log('\n────────────────────────────────────────────');
  log('✅ PDS static assets ready', 'green');
  log(`📍 Location: ${path.relative(process.cwd(), targetDir)}`);
  log('• components → components/*.js');
  log('• styles → styles/pds-*.css (+ .css.js modules)');
  log('• intellisense → custom-elements.json, vscode-custom-data.json');
  log('• intellisense → pds.css-data.json, pds-css-complete.json');
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
