#!/usr/bin/env node

/**
 * NPM postinstall script for @pure-ds/core
 * Automatically copies PDS assets to the consuming app's web root
 */

import { readFile, writeFile, mkdir, copyFile, readdir, stat, access, unlink } from 'fs/promises';
import { createHash } from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Discover the web root directory using common patterns
 */
async function discoverWebRoot() {
  const cwd = process.cwd();
  
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
    const cwd = process.cwd();
    console.log('🔍 Current working directory:', cwd);
    
    // Check if we're running from within the PDS package itself (development mode)
    const packagePath = path.join(cwd, 'package.json');
    try {
      const pkg = JSON.parse(await readFile(packagePath, 'utf8'));
      console.log('📄 Package name:', pkg.name);
      if (pkg.name === '@pure-ds/core') {
        console.log('⚠️  Running from PDS package itself - skipping postinstall');
        console.log('💡 This script is designed to run when installing in consumer apps');
        return;
      }
    } catch (e) {
      console.log('❌ Failed to read package.json:', e.message);
      // package.json doesn't exist or can't be read, continue
    }
    
    console.log('📦 Proceeding with asset copying...');
    
    // Find web root
    const webRoot = await discoverWebRoot();
    
    // Find PDS package location
    const pdsRoot = path.resolve(__dirname, '../../../'); // Navigate up from packages/pds-cli/bin
    
    // Source paths
    const autoDefineSource = path.join(pdsRoot, 'public/auto-define');
    const iconsSource = path.join(pdsRoot, 'public/assets/img/icons.svg');
    
    // Target paths
    const autoDefineTarget = path.join(webRoot.path, 'auto-define');
    const iconsTarget = path.join(webRoot.path, 'assets/img/pds-icons.svg'); // Renamed to pds-icons.svg
    
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
    
    // Copy icons.svg as pds-icons.svg
    console.log(`🎨 Copying icons to ${webRoot.relative}/assets/img/pds-icons.svg`);
    await mkdir(path.dirname(iconsTarget), { recursive: true });
    await copyFile(iconsSource, iconsTarget);
    
    console.log(`✅ PDS assets synced successfully!`);
    console.log(`   📁 ${copiedCount} components → ${webRoot.relative}/auto-define/`);
    console.log(`   🎨 1 icon file → ${webRoot.relative}/assets/img/pds-icons.svg`);
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
    
  } catch (error) {
    console.error('❌ PDS postinstall failed:', error.message);
    console.log('💡 You can manually copy assets later using:');
    console.log('   node node_modules/@pure-ds/core/packages/pds-cli/bin/sync-assets.js');
    // Don't fail the npm install - just warn
  }
}

// Only run when called directly (not when imported)
if (process.argv[1].endsWith('postinstall.js')) {
  copyPdsAssets().catch(console.error);
}

export { copyPdsAssets, discoverWebRoot };