#!/usr/bin/env node

/**
 * NPM postinstall script for pure-ds
 * Automatically copies PDS assets to the consuming app's web root
 */

import { readFile, writeFile, mkdir, copyFile, readdir, stat, access, unlink } from 'fs/promises';
import { createHash } from 'crypto';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../../');

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
  console.log('📦 PDS postinstall: Copying assets...');
  
  try {
    const consumerRoot = await findConsumerRoot();
    console.log('� Consumer root:', consumerRoot);
    
  console.log('📦 Proceeding with asset copying...');

    // Proactively add export scripts to consumer package.json
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
      } else {
        console.log(`🔧 Script "${buildIconsName}" already present in consumer package.json`);
      }
    } catch (e) {
      console.warn('⚠️  Could not ensure pds:build-icons script in consumer package.json:', e?.message || e);
    }
    
    // Find web root
  const webRoot = await discoverWebRoot(consumerRoot);

    // Load consumer config to determine static.root if available
    async function loadConsumerConfig() {
      const cwd = process.cwd();
      // Prefer consumer app config
      for (const fname of ['pds.config.js', 'pds-config.js']) {
        const candidate = path.join(cwd, fname);
        if (await access(candidate).then(() => true).catch(() => false)) {
          try {
            const mod = await import(pathToFileURL(candidate).href);
            return mod.config || mod.default || mod.presets?.default || null;
          } catch(e) {
            console.warn('⚠️  Failed to load consumer config:', e?.message || e);
          }
        }
      }
      // Fallback to internal default preset
      try {
        const internalPath = path.join(repoRoot, 'src/js/pds-core/pds-config.js');
        const internal = await import(pathToFileURL(internalPath).href);
        return internal.presets?.default || null;
      } catch {
        return null;
      }
    }

    const config = await loadConsumerConfig();
    
  // Find PDS package location
  const pdsRoot = repoRoot; // Navigate up from packages/pds-cli/bin
    
    // Source paths
    // Prefer new packaged location; fallback to legacy path
    let autoDefineSource = path.join(pdsRoot, 'public/assets/pds/components');
    try {
      await access(autoDefineSource);
    } catch {
      try {
        autoDefineSource = path.join(pdsRoot, 'public/pds/components');
        await access(autoDefineSource);
      } catch {
        autoDefineSource = path.join(pdsRoot, 'public/auto-define');
      }
    }
  const iconsSource = path.join(pdsRoot, 'public/assets/img/pds-icons.svg');
    
    // Target paths
  const autoDefineTarget = path.join(webRoot.path, 'auto-define');
    // Determine icons target: prefer [static.root]/icons/icons.svg if configured
    let iconsTarget = null;
    if (config?.static?.root) {
      const rootPath = String(config.static.root);
      const staticRoot = path.isAbsolute(rootPath)
        ? rootPath
        : path.resolve(process.cwd(), rootPath);
      iconsTarget = path.join(staticRoot, 'icons', 'icons.svg');
      console.log(`🎨 Icons target (from static.root): ${path.relative(process.cwd(), iconsTarget)}`);
    } else {
      // Fallback to prior location under web root
      iconsTarget = path.join(webRoot.path, 'assets/img/pds-icons.svg');
      console.log(`🎨 Icons target (fallback): ${path.relative(process.cwd(), iconsTarget)}`);
    }
    
    // Sync PDS components (conservative approach - preserve non-PDS files)
  console.log(`📁 Syncing PDS components to ${webRoot.relative}/auto-define/`);
    await mkdir(autoDefineTarget, { recursive: true });
    
    // Get existing files in target directory
    let existingFiles = [];
    try {
      existingFiles = await readdir(autoDefineTarget);
    } catch (e) {
      // Directory doesn't exist yet, that's fine
    }
    
    // Remove only existing PDS files (pds-*.js) to ensure clean sync
    const pdsFilesToRemove = existingFiles.filter(file => 
      file.startsWith('pds-') && file.endsWith('.js')
    );
    
    if (pdsFilesToRemove.length > 0) {
      console.log(`🧹 Cleaning up existing PDS components...`);
      for (const file of pdsFilesToRemove) {
        try {
          await unlink(path.join(autoDefineTarget, file));
          console.log(`   🗑️  Removed ${file}`);
        } catch (error) {
          console.warn(`   ⚠️  Failed to remove ${file}:`, error.message);
        }
      }
    }
    
    const files = await readdir(autoDefineSource);
    let copiedCount = 0;
    
    for (const file of files) {
      const sourcePath = path.join(autoDefineSource, file);
      const targetPath = path.join(autoDefineTarget, file);
      
      try {
        await copyFile(sourcePath, targetPath);
        copiedCount++;
        console.log(`   ✅ ${file}`);
      } catch (error) {
        console.warn(`   ⚠️  Failed to copy ${file}:`, error.message);
      }
    }
    
    // Copy icon sprite to resolved target
    try {
      await mkdir(path.dirname(iconsTarget), { recursive: true });
      await copyFile(iconsSource, iconsTarget);
      console.log(`🎨 Copied icon sprite → ${path.relative(process.cwd(), iconsTarget)}`);
    } catch (e) {
      console.warn('⚠️  Failed to copy icon sprite:', e?.message || e);
    }
    
    console.log(`✅ PDS assets synced successfully!`);
    console.log(`   📁 ${copiedCount} components → ${webRoot.relative}/auto-define/`);
  console.log(`   🎨 1 icon file → ${path.relative(process.cwd(), iconsTarget)}`);
    console.log('   🔒 Non-PDS files in auto-define/ were preserved');
    console.log('');
    console.log('🎉 You can now use PDS components like <pds-icon>, <pds-drawer>, etc.');
    console.log('   They will be auto-defined when used in your HTML/templates.');
    
    // Create a simple tracking file for debugging
  const trackingFile = path.join(webRoot.path, '.pds-install.json');
    const tracking = {
      version: '0.1.0',
      installDate: new Date().toISOString(),
      webRoot: webRoot.relative,
      components: copiedCount,
      assets: ['pds-icons.svg'],
      approach: 'conservative-sync'
    };
    await writeFile(trackingFile, JSON.stringify(tracking, null, 2));

    // (Export script already ensured earlier)
    
  } catch (error) {
    console.error('❌ PDS postinstall failed:', error.message);
  console.log('💡 You can manually copy assets later using:');
  console.log('   node node_modules/pure-ds/packages/pds-cli/bin/sync-assets.js');
    // Don't fail the npm install - just warn
  }
}

// Only run when called directly (not when imported)
if (process.argv[1].endsWith('postinstall.js')) {
  copyPdsAssets().catch(console.error);
}

export { copyPdsAssets, discoverWebRoot };