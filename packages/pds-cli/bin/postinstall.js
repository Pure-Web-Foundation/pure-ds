#!/usr/bin/env node

/**
 * NPM postinstall script for pure-ds
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
 * Check if we're installing within the pure-ds repo itself (not a consumer)
 */
function isInstallingWithinPureDsRepo() {
  try {
    const cwd = process.cwd();
    const initCwd = process.env.INIT_CWD || cwd;
    
    // Check if the INIT_CWD has package.json with name "pure-ds"
    // This is more reliable than path comparison since repoRoot
    // points to node_modules/pure-ds when installed as a dependency
    try {
      const pkgPath = path.join(initCwd, 'package.json');
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
      return pkg.name === 'pure-ds';
    } catch {
      return false;
    }
  } catch (err) {
    console.log('⚠️  Error checking repo location:', err.message);
    return false;
  }
}

function isNpmLinkInvocation() {
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
    const consumerRoot = await findConsumerRoot();
    console.log('🧪 Consumer root:', consumerRoot);

    // Allow opting out explicitly (useful for local dev / linking)
    if (
      process.env.PDS_SKIP_POSTINSTALL === '1' ||
      process.env.PDS_SKIP_POSTINSTALL === 'true' ||
      process.env.npm_config_pds_skip_postinstall === 'true'
    ) {
      console.log('� Skipping PDS postinstall (PDS_SKIP_POSTINSTALL set).');
      return;
    }

    // If running inside the package repo itself (e.g., during `npm link`), skip
    const inRepo = normalizePath(consumerRoot) === normalizePath(repoRoot);
    const linkInvocation = isNpmLinkInvocation();
    const withinPureDs = isInstallingWithinPureDsRepo();
    
    if (inRepo || linkInvocation || withinPureDs) {
      const reason = inRepo
        ? 'inside the package repo'
        : linkInvocation
        ? 'detected npm link invocation'
        : 'installing within pure-ds repository';
      console.log(`🛑 Skipping PDS postinstall (${reason}).`);
      return;
    }
    
  console.log('�📦 Proceeding with asset copying...');

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
      try {
        const { runPdsStatic } = await import(pathToFileURL(path.join(__dirname, 'pds-static.js')).href);
        await runPdsStatic();
      } catch (e) {
        console.error('❌ Auto-export failed:', e?.message || e);
        console.log('💡 You can run it manually: npm run pds:export');
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
  }
}

// Only run when called directly (not when imported)
if (process.argv[1].endsWith('postinstall.js')) {
  copyPdsAssets().catch(console.error);
}

export { copyPdsAssets, discoverWebRoot };