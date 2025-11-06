#!/usr/bin/env node

import { readFile, writeFile, mkdir, copyFile, readdir, stat } from 'fs/promises';
import { createHash } from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Find the PDS package root, whether we're running from the package itself or from node_modules
async function findPdsRoot() {
  const currentDir = __dirname;
  
  // If running from the package itself (development)
  if (currentDir.includes('packages/pds-cli/bin')) {
    return path.resolve(currentDir, '../../../');
  }
  
  // If running from node_modules (consumer app)
  // The structure would be: node_modules/pure-ds/packages/pds-cli/bin
  if (currentDir.includes('node_modules')) {
    let dir = currentDir;
    while (dir !== path.dirname(dir)) {
      // Support both legacy scoped name and new unscoped name
      // node_modules/@pure-ds/core/... OR node_modules/pure-ds/...
      const base = path.basename(dir);
      const parent = path.basename(path.dirname(dir));
      if ((base === 'core' && parent === '@pure-ds') || base === 'pure-ds') {
        return dir;
      }
      dir = path.dirname(dir);
    }
  }
  
  // Fallback - navigate up to find package.json with correct name
  let dir = currentDir;
  while (dir !== path.dirname(dir)) {
    try {
      const packagePath = path.join(dir, 'package.json');
      const pkg = JSON.parse(await readFile(packagePath, 'utf8'));
      if (pkg.name === '@pure-ds/core' || pkg.name === 'pure-ds') {
        return dir;
      }
    } catch (e) {
      // Continue searching
    }
    dir = path.dirname(dir);
  }
  
  throw new Error('Could not find PDS package root');
}

/**
 * Sync PDS assets to consuming app's public directory
 * Copies:
 * - public/pds/components/* (or legacy public/auto-define/*) -> <targetDir>/components/*
 * - (icons no longer synced; static export focuses on components and styles)
 * 
 * Usage: node node_modules/pure-ds/packages/pds-cli/bin/sync-assets.js [options]
 * Options:
 *   --target=<path>  Target directory (default: ./public)
 *   --force          Overwrite user-modified files
 *   --dry-run        Show what would be synced without copying
 *   --verbose, -v    Show detailed sync information
 */

async function syncAssets(options = {}) {
  const {
  targetDir = './public',
    force = false,
    dryRun = false,
    verbose = false
  } = options;

  console.log('🔄 Syncing PDS assets...');
  
  // Find PDS package root
  const pdsRoot = await findPdsRoot();
  
  // Prefer new location; fallback to legacy
  let autoDefineSource = path.join(pdsRoot, 'public/pds/components');
  try {
    await stat(autoDefineSource);
  } catch {
    autoDefineSource = path.join(pdsRoot, 'public/auto-define');
  }
  
  // Target directories
  const autoDefineTarget = path.join(process.cwd(), targetDir, 'components');
  
  // Load or create asset tracking file
  const trackingFile = path.join(process.cwd(), '.pds-assets.json');
  let tracking = {};
  
  try {
    const trackingData = await readFile(trackingFile, 'utf-8');
    tracking = JSON.parse(trackingData);
  } catch (e) {
    // First run or corrupted file
    tracking = {
      version: '0.1.0',
      lastSync: null,
      checksums: {},
      userModified: {}
    };
  }
  
  const newChecksums = {};
  const conflicts = [];
  const synced = [];
  
  // Helper to calculate file hash
  const getFileHash = async (filePath) => {
    try {
      const content = await readFile(filePath);
      return createHash('sha256').update(content).digest('hex');
    } catch (e) {
      return null;
    }
  };
  
  // Helper to sync a single file
  const syncFile = async (sourcePath, targetPath, relativeKey) => {
    try {
      // Ensure target directory exists
      await mkdir(path.dirname(targetPath), { recursive: true });
      
      const sourceHash = await getFileHash(sourcePath);
      const targetHash = await getFileHash(targetPath);
      const knownHash = tracking.checksums[relativeKey];
      
      newChecksums[relativeKey] = sourceHash;
      
      // Conflict detection
      if (targetHash && targetHash !== sourceHash && targetHash !== knownHash) {
        conflicts.push({
          file: relativeKey,
          path: targetPath,
          reason: 'User modified file conflicts with PDS update'
        });
        
        if (!force) {
          if (verbose) {
            console.log(`⚠️  Skipping ${relativeKey} (user modified)`);
          }
          tracking.userModified[relativeKey] = targetHash;
          return;
        }
      }
      
      // Copy file if needed
      if (!targetHash || targetHash !== sourceHash || force) {
        if (!dryRun) {
          await copyFile(sourcePath, targetPath);
        }
        synced.push(relativeKey);
        
        if (verbose) {
          console.log(`📁 ${dryRun ? '[DRY RUN] ' : ''}Synced ${relativeKey}`);
        }
      }
    } catch (e) {
      console.warn(`⚠️  Could not sync ${relativeKey}:`, e.message);
    }
  };

  // Helper to sync a directory
  const syncDirectory = async (sourceDir, targetDir, prefix = '') => {
    try {
      await mkdir(targetDir, { recursive: true });
      const files = await readdir(sourceDir);
      
      for (const file of files) {
        const sourcePath = path.join(sourceDir, file);
        const targetPath = path.join(targetDir, file);
        const relativeKey = `${prefix}${file}`;
        
        const sourceStat = await stat(sourcePath);
        if (sourceStat.isDirectory()) {
          await syncDirectory(sourcePath, targetPath, `${relativeKey}/`);
          continue;
        }
        
        await syncFile(sourcePath, targetPath, relativeKey);
      }
    } catch (e) {
      console.warn(`⚠️  Could not sync ${sourceDir}:`, e.message);
    }
  };
  
  // Sync components directory
  if (verbose) {
    console.log('📁 Syncing components...');
  }
  await syncDirectory(autoDefineSource, autoDefineTarget, 'components/');
  
  // Note: icons are not synced in this flow; use pds:export if needed
  
  // Update tracking file
  if (!dryRun) {
    tracking.checksums = { ...tracking.checksums, ...newChecksums };
    tracking.lastSync = new Date().toISOString();
    await writeFile(trackingFile, JSON.stringify(tracking, null, 2));
  }
  
  // Report results
  console.log(`✅ Sync complete: ${synced.length} files updated`);
  
  if (conflicts.length > 0) {
    console.log(`⚠️  ${conflicts.length} conflicts detected:`);
    conflicts.forEach(c => {
      console.log(`   - ${c.file}: ${c.reason}`);
    });
    console.log('   Use --force to overwrite user modifications');
  }
  
  if (verbose) {
    console.log(`📊 Tracking file: ${trackingFile}`);
    console.log(`📁 Components: ${autoDefineTarget}`);
  }
  
  return {
    synced: synced.length,
    conflicts: conflicts.length,
    tracking
  };
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const options = {
    force: args.includes('--force'),
    dryRun: args.includes('--dry-run'),
    verbose: args.includes('--verbose') || args.includes('-v'),
    targetDir: args.find(arg => arg.startsWith('--target='))?.split('=')[1] || './public'
  };
  
  try {
    await syncAssets(options);
  } catch (error) {
    console.error('❌ Sync failed:', error.message);
    process.exit(1);
  }
}

export { syncAssets };