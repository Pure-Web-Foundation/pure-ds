#!/usr/bin/env node

/**
 * NPM postinstall script for @pure-ds/core
 * Automatically copies PDS assets to the consuming app's web root
 */

import { readFile, writeFile, mkdir, copyFile, readdir, stat, access, unlink } from 'fs/promises';
import { readFileSync } from 'fs';
import { createHash } from 'crypto';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../../');
const isWin = process.platform === 'win32';
const normalizePath = (p) => {
  if (!p) return '';
  const resolved = path.resolve(p).replace(/[\\/]+$/, '');
  return isWin ? resolved.toLowerCase() : resolved;
};

/**
 * Check if we're installing within the @pure-ds/core repo itself (not a consumer)
 */
function isInstallingWithinPureDsRepo() {
  try {
    const cwd = process.cwd();
    const initCwd = process.env.INIT_CWD || cwd;
    
    // Check if the INIT_CWD has package.json with name "@pure-ds/core"
    // This is more reliable than path comparison since repoRoot
    // points to node_modules/@pure-ds/core when installed as a dependency
    try {
      const pkgPath = path.join(initCwd, 'package.json');
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
      return pkg.name === '@pure-ds/core' || pkg.name === 'pure-ds';
    } catch {
      return false;
    }
  } catch (err) {
    console.log('⚠️  Error checking repo location:', err.message);
    return false;
  }
}

function isNpmLinkInvocation() {
  const truthy = (value) => {
    if (value === undefined || value === null) return false;
    const normalized = String(value).toLowerCase();
    return normalized === 'true' || normalized === '1';
  };

  if (truthy(process.env.npm_config_link)) return true;
  if ((process.env.npm_command || '').toLowerCase() === 'link') return true;

  try {
    const argvRaw = process.env.npm_config_argv;
    if (!argvRaw) return false;
    const argv = JSON.parse(argvRaw);
    const orig = argv && (argv.original || argv.cooked || []);
    if (!Array.isArray(orig)) return false;
    return orig.includes('link');
  } catch {
    return false;
  }
}

function isLinkedPackagePath(p) {
  return !/[\\/]+node_modules[\\/]+/i.test(p);
}

function isGlobalInstall() {
  const value = process.env.npm_config_global;
  if (!value) return false;
  const normalized = String(value).toLowerCase();
  return normalized === 'true' || normalized === '1';
}

/**
 * Find the consumer app root (directory containing the consumer's package.json)
 * Prefer INIT_CWD (npm sets this to the original cwd) and fallback by walking up from the package dir
 */
async function findConsumerRoot() {
  const tryPaths = [];
  if (process.env.INIT_CWD) tryPaths.push(process.env.INIT_CWD);
  // Walk up from the package dir until we exit node_modules
  let dir = repoRoot;
  while (dir && path.basename(dir) !== path.dirname(dir)) {
    if (path.basename(dir) === 'node_modules') {
      const candidate = path.dirname(dir);
      tryPaths.push(candidate);
      break;
    }
    dir = path.dirname(dir);
  }

  for (const p of tryPaths) {
    try {
      const pkgPath = path.join(p, 'package.json');
      const pkg = JSON.parse(await readFile(pkgPath, 'utf8'));
      if (pkg && pkg.name && pkg.name !== 'pure-ds') {
        return p;
      }
    } catch {}
  }

  // Final fallback: INIT_CWD or current working dir
  return process.env.INIT_CWD || process.cwd();
}

/**
 * Ensure consumer package.json contains a handy export script
 */
async function ensureExportScript(consumerRoot) {
  try {
    const consumerPkgPath = path.join(consumerRoot, 'package.json');
    const consumerPkgRaw = await readFile(consumerPkgPath, 'utf8');
    const consumerPkg = JSON.parse(consumerPkgRaw);

    consumerPkg.scripts = consumerPkg.scripts || {};

  const desiredScriptName = 'pds:export';
  const desiredScriptCmd = 'pds-export';

    if (!consumerPkg.scripts[desiredScriptName]) {
      consumerPkg.scripts[desiredScriptName] = desiredScriptCmd;
      await writeFile(consumerPkgPath, JSON.stringify(consumerPkg, null, 2) + '\n');
      console.log(`🧩 Added "${desiredScriptName}" script to consumer package.json`);
    } else {
      console.log(`🔧 Script "${desiredScriptName}" already present in consumer package.json`);
    }
  } catch (e) {
    console.warn('⚠️  Could not ensure pds:export script in consumer package.json:', e.message);
  }
}

/**
 * Create default pds.config.js if it doesn't exist
 * @param {string} consumerRoot - The root directory to create the config in
 * @param {boolean} force - If true, overwrite existing config
 */
async function ensurePdsConfig(consumerRoot, force = false) {
  try {
    const configPath = path.join(consumerRoot, 'pds.config.js');
    
    // Check if config already exists
    try {
      await access(configPath);
      if (!force) {
        console.log('📝 pds.config.js already exists, skipping...');
        return;
      }
      console.log('📝 Overwriting existing pds.config.js...');
    } catch {
      // File doesn't exist, create it
    }
    
    const defaultConfig = `export const config = {
  mode: "live",
  preset: "default",

  // Uncomment to override preset design tokens:
  // design: {
  //   colors: {
  //     primary: '#007acc',
  //     secondary: '#5c2d91',
  //     accent: '#ec4899'
  //   },
  //   typography: {
  //     fontFamilyHeadings: 'Inter, sans-serif',
  //     fontFamilyBody: 'Inter, sans-serif',
  //     baseFontSize: 16,
  //     fontScale: 1.25
  //   },
  //   spatialRhythm: {
  //     baseUnit: 8,
  //     scaleRatio: 1.5
  //   }
  // },

  // Uncomment to add custom progressive enhancers:
  // enhancers: [
  //   {
  //     selector: '[data-tooltip]',
  //     description: 'Adds tooltip on hover',
  //     run: (element) => {
  //       const text = element.dataset.tooltip;
  //       element.addEventListener('mouseenter', () => {
  //         // Show tooltip implementation
  //       });
  //     }
  //   }
  // ],

  // Uncomment to customize lazy-loaded web components:
  // autoDefine: {
  //   baseURL: '/pds/components/',
  //   predefine: ['pds-icon', 'pds-drawer', 'pds-toaster'],
  //   
  //   // Custom component paths
  //   mapper: (tag) => {
  //     if (tag.startsWith('my-')) {
  //       return \`/components/\${tag}.js\`;
  //     }
  //     // Return nothing to use PDS default mapping
  //   }
  // }
};
`;
    
    await writeFile(configPath, defaultConfig, 'utf8');
    console.log('📝 Created default pds.config.js');
  } catch (e) {
    console.warn('⚠️  Could not create pds.config.js:', e.message);
  }
}

/**
 * Copy PDS Copilot instructions to consumer's .github folder
 */
async function copyCopilotInstructions(consumerRoot) {
  try {
    const sourceFile = path.join(repoRoot, '.github', 'copilot-instructions.md');
    const targetDir = path.join(consumerRoot, '.github');
    const targetFile = path.join(targetDir, 'copilot-instructions.md');
    
    // Create .github directory if it doesn't exist
    await mkdir(targetDir, { recursive: true });
    
    // Check if file already exists
    try {
      await access(targetFile);
      // File exists - check if it's a PDS file by looking for our marker
      const existingContent = await readFile(targetFile, 'utf8');
      if (!existingContent.includes('Pure Design System (PDS)')) {
        // Not a PDS file, don't overwrite
        console.log('📋 Existing .github/copilot-instructions.md found (not PDS), skipping...');
        console.log('   💡 To use PDS instructions, run: npx pds-setup-copilot --force');
        return;
      }
    } catch {
      // File doesn't exist, we'll create it
    }
    
    await copyFile(sourceFile, targetFile);
    console.log('📋 Copied PDS Copilot instructions to .github/copilot-instructions.md');
    
    // Also copy .cursorrules for Cursor IDE users
    try {
      const cursorSource = path.join(repoRoot, '.cursorrules');
      const cursorTarget = path.join(consumerRoot, '.cursorrules');
      
      try {
        await access(cursorTarget);
        const existingCursor = await readFile(cursorTarget, 'utf8');
        if (!existingCursor.includes('Pure Design System (PDS)')) {
          console.log('📋 Existing .cursorrules found (not PDS), skipping...');
          return;
        }
      } catch {
        // File doesn't exist
      }
      
      await copyFile(cursorSource, cursorTarget);
      console.log('📋 Copied PDS instructions to .cursorrules (for Cursor IDE)');
    } catch (e) {
      // .cursorrules copy is optional
    }
  } catch (e) {
    console.warn('⚠️  Could not copy Copilot instructions:', e.message);
  }
}

/**
 * Discover the web root directory using common patterns
 */
async function discoverWebRoot(baseDir) {
  const cwd = baseDir || process.env.INIT_CWD || process.cwd();
  
  // Common web root patterns (in order of preference)
  const candidates = [
    'public',
    'static',
    'dist',
    'build',
    'www',
    'web',
    'assets',
    'src/assets',
    'app/public',
    '.'  // fallback to current directory
  ];
  
  console.log('🔍 Discovering web root directory...');
  
  for (const candidate of candidates) {
    const fullPath = path.resolve(cwd, candidate);
    try {
      await access(fullPath);
      const stats = await stat(fullPath);
      if (stats.isDirectory()) {
        console.log(`   ✅ Found: ${candidate}/`);
        return { path: fullPath, relative: candidate };
      }
    } catch (e) {
      // Directory doesn't exist, continue
    }
  }
  
  // Check package.json for hints
  try {
    const packagePath = path.join(cwd, 'package.json');
    const pkg = JSON.parse(await readFile(packagePath, 'utf8'));
    
    // Look for common build/output directories in scripts
    const scripts = pkg.scripts || {};
    const scriptText = JSON.stringify(scripts);
    
    if (scriptText.includes('--outdir dist') || scriptText.includes('dist/')) {
      const distPath = path.resolve(cwd, 'dist');
      console.log(`   💡 Found "dist" in scripts, using: dist/`);
      return { path: distPath, relative: 'dist' };
    }
    
    if (scriptText.includes('--outdir build') || scriptText.includes('build/')) {
      const buildPath = path.resolve(cwd, 'build');
      console.log(`   💡 Found "build" in scripts, using: build/`);
      return { path: buildPath, relative: 'build' };
    }
    
    // Check for common framework configs
    if (pkg.dependencies?.['next'] || pkg.devDependencies?.['next']) {
      const publicPath = path.resolve(cwd, 'public');
      console.log(`   🔧 Next.js detected, using: public/`);
      return { path: publicPath, relative: 'public' };
    }
    
    if (pkg.dependencies?.['vite'] || pkg.devDependencies?.['vite']) {
      const publicPath = path.resolve(cwd, 'public');
      console.log(`   ⚡ Vite detected, using: public/`);
      return { path: publicPath, relative: 'public' };
    }
    
  } catch (e) {
    // No package.json or parsing failed
  }
  
  // Ultimate fallback: create public directory
  const fallbackPath = path.resolve(cwd, 'public');
  console.log(`   📁 Creating fallback: public/`);
  await mkdir(fallbackPath, { recursive: true });
  return { path: fallbackPath, relative: 'public' };
}

/**
 * Copy PDS assets to the discovered web root
 */
async function copyPdsAssets() {
  console.log('📦 PDS postinstall running (no automatic component copy)…');
  try {
    const normalizedRepoRoot = normalizePath(repoRoot);
    const normalizedInitCwd = normalizePath(process.env.INIT_CWD || process.cwd());

    if (isLinkedPackagePath(normalizedRepoRoot)) {
      console.log('🛑 Skipping PDS postinstall (detected symlinked package path).');
      return;
    }

    if (normalizedInitCwd === normalizedRepoRoot) {
      console.log('🛑 Skipping PDS postinstall (working inside pure-ds repository root).');
      return;
    }

    if (isNpmLinkInvocation()) {
      console.log('🛑 Skipping PDS postinstall (detected npm link invocation).');
      return;
    }

    if (isGlobalInstall()) {
      console.log('🛑 Skipping PDS postinstall (global install detected).');
      return;
    }

    const consumerRoot = await findConsumerRoot();
    console.log('🧪 Consumer root:', consumerRoot);

    // Allow opting out explicitly (useful for local dev / linking)
    if (
      process.env.PDS_SKIP_POSTINSTALL === '1' ||
      process.env.PDS_SKIP_POSTINSTALL === 'true' ||
      process.env.npm_config_pds_skip_postinstall === 'true'
    ) {
      console.log('⏭️  Skipping PDS postinstall (PDS_SKIP_POSTINSTALL set).');
      return;
    }

    // If running inside the package repo itself (e.g., during `npm link`), skip
    const inRepo = normalizePath(consumerRoot) === normalizePath(repoRoot);
    const withinPureDs = isInstallingWithinPureDsRepo();

    if (inRepo || withinPureDs) {
      let reason = 'installing within pure-ds repository';
      if (inRepo) {
        reason = 'inside the package repo';
      } else if (withinPureDs) {
        reason = 'installing within pure-ds repository';
      }
      console.log(`🛑 Skipping PDS postinstall (${reason}).`);
      return;
    }
    
  console.log('📦 Proceeding with asset copying...');

    // Create default pds.config.js if it doesn't exist
    await ensurePdsConfig(consumerRoot);

    // Copy Copilot instructions to consumer project
    await copyCopilotInstructions(consumerRoot);

    // Proactively add export & build-icons scripts to consumer package.json (still helpful)
    await ensureExportScript(consumerRoot);
    try {
      const consumerPkgPath = path.join(consumerRoot, 'package.json');
      const pkgRaw = await readFile(consumerPkgPath, 'utf8');
      const pkgJson = JSON.parse(pkgRaw);
      pkgJson.scripts = pkgJson.scripts || {};
      const buildIconsName = 'pds:build-icons';
      const buildIconsCmd = 'pds-build-icons';
      if (!pkgJson.scripts[buildIconsName]) {
        pkgJson.scripts[buildIconsName] = buildIconsCmd;
        await writeFile(consumerPkgPath, JSON.stringify(pkgJson, null, 2) + '\n');
        console.log(`🧩 Added "${buildIconsName}" script to consumer package.json`);
      }
    } catch (e) {
      console.warn('⚠️  Could not ensure pds:build-icons script in consumer package.json:', e?.message || e);
    }

    // NEW BEHAVIOR: We no longer copy web components automatically to /auto-define/.
    // Reason: static export (pds:export) is now the single source of truth for placing
    // components under [static.root]/components/ (see pds.config.js). This reduces
    // side-effects during npm install and avoids stale/legacy /auto-define/ layout.
    console.log('🚫 Skipping legacy auto-copy of components to ./public/auto-define/.');
    
    // Auto-run pds:export by default (can be disabled with PDS_SKIP_EXPORT)
    if (
      process.env.PDS_SKIP_EXPORT === '1' ||
      process.env.PDS_SKIP_EXPORT === 'true' ||
      process.env.npm_config_pds_skip_export === 'true'
    ) {
      console.log('⏭️  Skipping pds:export (PDS_SKIP_EXPORT set)');
      console.log('📦 To generate static assets run:   npm run pds:export');
    } else {
      console.log('🚀 Running pds:export automatically...');
      const staticModuleUrl = pathToFileURL(path.join(__dirname, 'pds-static.js')).href;
      const previousEnv = {
        PDS_POSTINSTALL: process.env.PDS_POSTINSTALL,
        PDS_LOG_STREAM: process.env.PDS_LOG_STREAM,
        PDS_CONSUMER_ROOT: process.env.PDS_CONSUMER_ROOT,
      };

      try {
        process.env.PDS_POSTINSTALL = '1';
        process.env.PDS_LOG_STREAM = 'stderr';
        process.env.PDS_CONSUMER_ROOT = consumerRoot;

        const { runPdsStatic } = await import(staticModuleUrl);
        await runPdsStatic({ cwd: consumerRoot });
      } catch (e) {
        console.error('❌ Auto-export failed:', e?.message || e);
        console.log('💡 You can run it manually: npm run pds:export');
      } finally {
        if (previousEnv.PDS_POSTINSTALL === undefined) {
          delete process.env.PDS_POSTINSTALL;
        } else {
          process.env.PDS_POSTINSTALL = previousEnv.PDS_POSTINSTALL;
        }

        if (previousEnv.PDS_LOG_STREAM === undefined) {
          delete process.env.PDS_LOG_STREAM;
        } else {
          process.env.PDS_LOG_STREAM = previousEnv.PDS_LOG_STREAM;
        }

        if (previousEnv.PDS_CONSUMER_ROOT === undefined) {
          delete process.env.PDS_CONSUMER_ROOT;
        } else {
          process.env.PDS_CONSUMER_ROOT = previousEnv.PDS_CONSUMER_ROOT;
        }
      }
    }
    
    console.log('🎨 (Optional) Build custom icons:   npm run pds:build-icons');
    console.log('ℹ️  If you previously relied on /auto-define/, update references to the new static output.');

    // Tracking file for diagnostics (minimal)
    try {
      const webRoot = await discoverWebRoot(consumerRoot);
      const trackingFile = path.join(webRoot.path, '.pds-install.json');
      const tracking = {
        version: '0.1.0',
        installDate: new Date().toISOString(),
        webRoot: webRoot.relative,
        componentsCopied: 0,
        mode: 'no-copy-postinstall',
      };
      await writeFile(trackingFile, JSON.stringify(tracking, null, 2));
    } catch (e) {
      console.warn('⚠️  Could not write tracking file:', e?.message || e);
    }
  } catch (error) {
    console.error('❌ PDS postinstall failed (non-fatal):', error.message);
    console.log('💡 Static export still available via: npm run pds:export');
    process.exitCode = 1;
  }
}

// Only run when called directly (not when imported)
if (process.argv[1] && (process.argv[1].endsWith('postinstall.mjs') || process.argv[1].endsWith('postinstall.js'))) {
  copyPdsAssets().catch(console.error);
}

export { copyPdsAssets, discoverWebRoot, ensurePdsConfig };