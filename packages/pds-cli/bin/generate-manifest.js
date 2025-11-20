#!/usr/bin/env node

/**
 * Generate Custom Elements Manifest
 * Creates custom-elements.json with metadata for all PDS components
 */

import { writeFile, mkdir, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../../../');

// Colors for terminal output
const COLORS = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
};
const log = (msg, color = 'reset') => console.log(`${COLORS[color]}${msg}${COLORS.reset}`);

/**
 * Analyze components and generate manifest
 */
async function generateManifest(targetDir) {
  try {
    log('📋 Generating Custom Elements Manifest...', 'bold');
    
    // Check if analyzer is installed
    const analyzerInstalled = existsSync(path.join(repoRoot, 'node_modules/@custom-elements-manifest/analyzer'));
    
    if (!analyzerInstalled) {
      log('⚠️  @custom-elements-manifest/analyzer not installed', 'yellow');
      log('   Installing analyzer...', 'blue');
      execSync('npm install --save-dev @custom-elements-manifest/analyzer', { 
        cwd: repoRoot,
        stdio: 'inherit'
      });
    }

    // Run the analyzer
    const componentsDir = path.join(repoRoot, 'public/assets/pds/components');
    const configPath = path.join(repoRoot, 'custom-elements-manifest.config.js');
    
    log('🔍 Analyzing components...', 'blue');
    
    try {
      execSync(`npx cem analyze --config ${configPath}`, {
        cwd: repoRoot,
        stdio: 'inherit'
      });
      
      // Post-process: Remove private members from the generated manifest
      const sourceManifest = path.join(repoRoot, 'custom-elements.json');
      if (existsSync(sourceManifest)) {
        log('🧹 Cleaning private members from manifest...', 'blue');
        const manifestContent = await readFile(sourceManifest, 'utf-8');
        const manifest = JSON.parse(manifestContent);
        
        // Filter out private members from all declarations
        manifest.modules?.forEach(module => {
          module.declarations?.forEach(declaration => {
            if (declaration.members) {
              declaration.members = declaration.members.filter(member => {
                // Keep only public members (exclude private and those starting with #)
                return member.privacy !== 'private' && !member.name?.startsWith('#');
              });
            }
          });
        });
        
        // Write cleaned manifest back
        await writeFile(sourceManifest, JSON.stringify(manifest, null, 2), 'utf-8');
        log('✅ Private members removed', 'green');
      }
      
      // Copy manifest to target directory if specified
      if (targetDir) {
        const targetManifest = path.join(targetDir, 'custom-elements.json');
        
        if (existsSync(sourceManifest)) {
          await mkdir(path.dirname(targetManifest), { recursive: true });
          const manifestContent = await readFile(sourceManifest, 'utf-8');
          await writeFile(targetManifest, manifestContent, 'utf-8');
          log(`✅ Manifest copied to ${path.relative(process.cwd(), targetManifest)}`, 'green');
        }
      }
      
      log('✅ Custom Elements Manifest generated', 'green');
      return true;
    } catch (error) {
      log(`❌ Manifest generation failed: ${error.message}`, 'red');
      return false;
    }
    
  } catch (error) {
    log(`❌ Error: ${error.message}`, 'red');
    return false;
  }
}

export { generateManifest };

// Run if called directly
if (process.argv[1] && process.argv[1].endsWith('generate-manifest.js')) {
  const targetDir = process.argv[2] || null;
  generateManifest(targetDir).then(success => {
    process.exit(success ? 0 : 1);
  });
}
