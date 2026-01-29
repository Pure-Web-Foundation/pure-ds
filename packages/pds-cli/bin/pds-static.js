#!/usr/bin/env node

/**
 * PDS Static Export CLI
 *
 * Generates a static package of Pure Design System assets for consumer apps:
 * - Discovers the web root (reuses discoverWebRoot from postinstall)
 * - Reads pds.config.js (source of truth)
 * - Copies auto-define web components into [public.root]/components/
 * - Generates CSS layers into [public.root]/styles/ (and .css.js modules)

 * Default target when no public/static root provided: <webroot>/assets/pds
 *
 * Usage:
 *   node packages/pds-cli/bin/pds-static.js
 *   (or via npm script: npm run pds:static)
 */

import { readFile, writeFile, mkdir, readdir, copyFile, stat } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

import { discoverWebRoot } from './postinstall.mjs';
import { runPdsBuildIcons } from './pds-build-icons.js';
import { generateManifest } from './generate-manifest.js';
import { generateCSSData } from './generate-css-data.js';
import {
  resolvePublicAssetDirectory,
  resolvePublicAssetURL,
  isUrlLike,
  getPublicRootCandidate,
  ensurePdsPath,
} from '../lib/asset-roots.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../../../');

// Lazy imports to avoid circular/packaging issues
async function loadGenerator() {
  const genPath = path.join(repoRoot, 'src/js/pds-core/pds-generator.js');
  return import(pathToFileURL(genPath).href);
}

let cachedPdsConfigModule = null;
async function loadPdsConfigModule() {
  if (!cachedPdsConfigModule) {
    const cfgPath = path.join(repoRoot, 'src/js/pds-core/pds-config.js');
    cachedPdsConfigModule = await import(pathToFileURL(cfgPath).href);
  }
  return cachedPdsConfigModule;
}

const DESIGN_KEYS = new Set([
  'colors',
  'typography',
  'spatialRhythm',
  'shape',
  'behavior',
  'layout',
  'advanced',
  'a11y',
  'components',
  'icons',
]);

const clone = (value) => {
  if (value === undefined || value === null) return value;
  if (typeof value !== 'object') return value;
  if (typeof globalThis.structuredClone === 'function') {
    return globalThis.structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
};

const deepMerge = (target = {}, source = {}) => {
  const out = Array.isArray(target) ? [...target] : { ...target };
  if (!source || typeof source !== 'object') return out;
  for (const [key, value] of Object.entries(source)) {
    if (Array.isArray(value)) {
      out[key] = value.map((item) => clone(item));
    } else if (value && typeof value === 'object') {
      const base = out[key] && typeof out[key] === 'object' ? out[key] : {};
      out[key] = deepMerge(base, value);
    } else {
      out[key] = value;
    }
  }
  return out;
};

const slugify = (str = '') =>
  String(str)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const stripFunctions = (obj) => {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === 'function') return undefined;
  if (typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj
      .map((item) => stripFunctions(item))
      .filter((item) => item !== undefined);
  }

  const result = {};
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    if (typeof value === 'function') continue;
    const stripped = stripFunctions(value);
    if (stripped !== undefined) {
      result[key] = stripped;
    }
  }
  return result;
};

const looksLikeDesignConfig = (config) => {
  if (!config || typeof config !== 'object') return false;
  return Array.from(DESIGN_KEYS).some((key) => key in config);
};

async function resolveGeneratorOptions(rawConfig = {}) {
  const module = await loadPdsConfigModule();
  const presets = module?.presets || {};
  const defaultLog = module?.defaultLog || ((level, message, ...data) => {
    const method = console[level] || console.log;
    method(message, ...data);
  });

  const config = rawConfig && typeof rawConfig === 'object' ? rawConfig : {};
  const hasNewShape =
    'preset' in config || 'design' in config || 'enhancers' in config;

  if (hasNewShape) {
    const presetId = config?.preset;
    const effectivePreset = String(presetId || 'default').toLowerCase();
    const presetFromMap = presets[effectivePreset];
    const presetList = Object.values(presets || {});
    const matchedPreset =
      presetFromMap ||
      presetList.find((preset) => {
        const idMatch = String(preset?.id || '').toLowerCase() === effectivePreset;
        const nameMatch = slugify(preset?.name || '') === effectivePreset;
        return idMatch || nameMatch;
      });

    if (!matchedPreset) {
      throw new Error(`PDS preset not found: "${presetId || 'default'}"`);
    }

    let mergedDesign = clone(matchedPreset);
    const designOverrides =
      config.design && typeof config.design === 'object'
        ? clone(stripFunctions(config.design))
        : null;
    const iconOverrides =
      config.icons && typeof config.icons === 'object'
        ? clone(stripFunctions(config.icons))
        : null;
    if (designOverrides || iconOverrides) {
      const mergedOverrides = iconOverrides
        ? deepMerge(designOverrides || {}, { icons: iconOverrides })
        : designOverrides;
      mergedDesign = deepMerge(mergedDesign, mergedOverrides || {});
    }

    const {
      mode,
      autoDefine,
      applyGlobalStyles,
      manageTheme,
      themeStorageKey,
      preloadStyles,
      criticalLayers,
      preset: _preset,
      design: _design,
      enhancers: _enhancers,
      log: userLog,
      ...otherProps
    } = config;

    return {
      ...otherProps,
      design: mergedDesign,
      preset: matchedPreset.name || matchedPreset.id || 'default',
      log: userLog || defaultLog,
    };
  }

  if (looksLikeDesignConfig(config)) {
    const { log: userLog, ...designConfig } = config;
    const cleanDesign = stripFunctions(designConfig);
    return {
      design: clone(cleanDesign),
      log: userLog || defaultLog,
    };
  }

  const fallbackPreset = presets?.default || Object.values(presets || {})[0] || {};
  return {
    design: clone(fallbackPreset),
    preset: fallbackPreset.name || fallbackPreset.id || 'default',
    log: defaultLog,
  };
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

const shouldLogToStderr = () => process.env.PDS_LOG_STREAM === 'stderr' || process.env.PDS_POSTINSTALL === '1';
const log = (msg, color = 'reset') => {
  const colorCode = COLORS[color] || '';
  const text = `${colorCode}${msg}${COLORS.reset}`;
  if (shouldLogToStderr()) {
    process.stderr.write(`${text}\n`);
  } else {
    console.log(text);
  }
};

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

async function main(options = {}) {
  const desiredCwd = options.cwd || process.env.PDS_CONSUMER_ROOT || null;
  const originalCwd = process.cwd();
  let cwdChanged = false;

  if (desiredCwd && desiredCwd !== originalCwd) {
    try {
      process.chdir(desiredCwd);
      cwdChanged = true;
    } catch (err) {
      log(`⚠️  Could not change working directory to ${desiredCwd}: ${err?.message || err}`, 'yellow');
    }
  }

  try {
    log('\nPDS Static Export • starting...', 'bold');

  // 1) Discover web root (used if no explicit static.root is provided)
  const webRoot = await discoverWebRoot();

  // 2) Load config
  const config = await loadConsumerConfig();

  // 3) Resolve target directory using normalized public/static root
  const rootCandidate = getPublicRootCandidate(config);
  let targetDir;
  let assetUrlRoot;

  if (!rootCandidate && config?.staticBase) {
    const baseFolderName = String(config.staticBase || '').trim().replace(/^\/+|\/+$/g, '') || 'assets';
    targetDir = ensurePdsPath(path.join(webRoot.path, baseFolderName));
    assetUrlRoot = resolvePublicAssetURL({ public: { root: baseFolderName } });
  } else {
    targetDir = resolvePublicAssetDirectory(config, { webRootPath: webRoot.path });
    assetUrlRoot = resolvePublicAssetURL(config);
  }

  log(`📂 Web root: ${webRoot.relative}/`,'blue');
  const relativeTarget = path.relative(process.cwd(), targetDir) || '.';
  log(`📦 Target folder: ${relativeTarget}`,'blue');
  log(`🌐 Public URL: ${assetUrlRoot}`,'blue');

  if (rootCandidate && isUrlLike(rootCandidate)) {
    log('⚠️  public/static root looks like a URL. Exporting assets under the discovered web root instead.', 'yellow');
  }

  await mkdir(targetDir, { recursive: true });

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

  // 4b) Copy live manager bundle into target/core for dynamic import fallback
  try {
    const managerSource = path.join(repoRoot, 'public/assets/js/pds-manager.js');
    if (!existsSync(managerSource)) {
      log('⚠️  pds-manager.js not found in package assets; skipping copy', 'yellow');
    } else {
      const coreDir = path.join(targetDir, 'core');
      await mkdir(coreDir, { recursive: true });
      const managerTarget = path.join(coreDir, 'pds-manager.js');
      await copyFile(managerSource, managerTarget);
      log(`✅ Copied live manager → ${path.relative(process.cwd(), managerTarget)}`, 'green');
    }
  } catch (e) {
    log(`⚠️  Failed to copy pds-manager.js: ${e?.message || e}`, 'yellow');
  }

  // 5) Generate CSS layers into target/styles
  log('🧬 Generating styles...', 'bold');
  const { Generator } = await loadGenerator();
  const generatorOptions = await resolveGeneratorOptions(config);
  const designer = new Generator(generatorOptions);
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

  // 9) Copy LLM instruction files from pds.llm.md source of truth
  try {
    const llmSourcePath = path.join(repoRoot, 'pds.llm.md');
    if (existsSync(llmSourcePath)) {
      const llmContent = await readFile(llmSourcePath, 'utf-8');
      
      // Copy to .github/copilot-instructions.md
      const copilotDir = path.join(repoRoot, '.github');
      await mkdir(copilotDir, { recursive: true });
      const copilotPath = path.join(copilotDir, 'copilot-instructions.md');
      await writeFile(copilotPath, llmContent, 'utf-8');
      log(`✅ Copied LLM instructions → ${path.relative(process.cwd(), copilotPath)}`, 'green');
      
      // Copy to .cursorrules
      const cursorPath = path.join(repoRoot, '.cursorrules');
      await writeFile(cursorPath, llmContent, 'utf-8');
      log(`✅ Copied LLM instructions → ${path.relative(process.cwd(), cursorPath)}`, 'green');
    } else {
      log(`⚠️  pds.llm.md not found, skipping LLM instruction file generation`, 'yellow');
    }
  } catch (e) {
    log(`⚠️  Failed to copy LLM instruction files: ${e?.message || e}`, 'yellow');
  }

  // 10) Write runtime config helper for auto-discovery
  try {
    const runtimePresetLabel =
      (generatorOptions && generatorOptions.preset) ||
      (config && config.preset) ||
      'default';
    const runtimePresetId = slugify(runtimePresetLabel || 'default') || 'default';
    const runtimeDesign = clone(stripFunctions(generatorOptions?.design || {}));
    const runtimeConfig = {
      exportedAt: new Date().toISOString(),
      staticRoot: assetUrlRoot,
      presetId: runtimePresetId,
      preset: runtimePresetLabel,
      config: {
        preset: runtimePresetLabel,
        design: runtimeDesign,
      },
      paths: {
        tokens: `${assetUrlRoot}styles/pds-tokens.css.js`,
        primitives: `${assetUrlRoot}styles/pds-primitives.css.js`,
        components: `${assetUrlRoot}styles/pds-components.css.js`,
        utilities: `${assetUrlRoot}styles/pds-utilities.css.js`,
        styles: `${assetUrlRoot}styles/pds-styles.css.js`,
      }
    };
    
    const runtimeConfigPath = path.join(targetDir, 'pds-runtime-config.json');
    await writeFile(runtimeConfigPath, JSON.stringify(runtimeConfig, null, 2), 'utf-8');
    log(`✅ Runtime config written to ${path.relative(process.cwd(), runtimeConfigPath)}`, 'green');
    log(`💡 Use this in PDS.start(): static: { root: "${assetUrlRoot}" }`, 'blue');
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
  log('• llm-instructions → .github/copilot-instructions.md, .cursorrules');
  log('────────────────────────────────────────────\n');

  } catch (err) {
    console.error('❌ pds:static failed:', err?.message || err);
    process.exit(1);
  } finally {
    if (cwdChanged) {
      try {
        process.chdir(originalCwd);
      } catch {}
    }
  }
}

// Execute when run directly from Node or via bin entry (including symlinks on macOS/Linux)
if (process.argv[1]) {
  const scriptPath = fileURLToPath(import.meta.url);
  const argPath = process.argv[1];
  // Check if this is the main module being executed
  if (argPath === scriptPath || argPath.endsWith('pds-static.js') || argPath.endsWith('pds-build')) {
    main();
  }
}

export { main as runPdsStatic };
