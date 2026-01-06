#!/usr/bin/env node

/**
 * PDS Setup Copilot Instructions
 * 
 * Copies PDS Copilot instructions to the consuming project's .github folder.
 * Run: npx pds-setup-copilot
 * 
 * Options:
 *   --force    Overwrite existing copilot-instructions.md even if it's not a PDS file
 */

import { copyFile, mkdir, readFile, access } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../../');

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes('--force') || args.includes('-f');
  const projectRoot = process.cwd();
  
  console.log('📋 PDS Copilot Instructions Setup\n');
  
  const sourceFile = path.join(repoRoot, '.github', 'copilot-instructions.md');
  const targetDir = path.join(projectRoot, '.github');
  const targetFile = path.join(targetDir, 'copilot-instructions.md');
  
  // Verify source exists
  try {
    await access(sourceFile);
  } catch {
    console.error('❌ Could not find PDS copilot-instructions.md');
    console.log('   Make sure @pure-ds/core is properly installed.');
    process.exit(1);
  }
  
  // Create .github directory if it doesn't exist
  await mkdir(targetDir, { recursive: true });
  
  // Check if file already exists
  try {
    await access(targetFile);
    const existingContent = await readFile(targetFile, 'utf8');
    
    if (!force && !existingContent.includes('Pure Design System (PDS)')) {
      console.log('⚠️  Existing .github/copilot-instructions.md found (not PDS)');
      console.log('   Use --force to overwrite: npx pds-setup-copilot --force');
      process.exit(0);
    }
    
    if (!force) {
      console.log('📝 Updating existing PDS Copilot instructions...');
    } else {
      console.log('📝 Overwriting existing Copilot instructions (--force)...');
    }
  } catch {
    console.log('📝 Creating new Copilot instructions...');
  }
  
  await copyFile(sourceFile, targetFile);
  
  console.log('\n✅ PDS Copilot instructions installed at .github/copilot-instructions.md');
  
  // Also copy .cursorrules for Cursor IDE
  try {
    const cursorSource = path.join(repoRoot, '.cursorrules');
    const cursorTarget = path.join(projectRoot, '.cursorrules');
    
    try {
      await access(cursorSource);
      
      // Check existing .cursorrules
      try {
        await access(cursorTarget);
        const existingCursor = await readFile(cursorTarget, 'utf8');
        if (!force && !existingCursor.includes('Pure Design System (PDS)')) {
          console.log('⚠️  Existing .cursorrules found (not PDS), skipping...');
        } else {
          await copyFile(cursorSource, cursorTarget);
          console.log('✅ PDS instructions also installed at .cursorrules (for Cursor IDE)');
        }
      } catch {
        await copyFile(cursorSource, cursorTarget);
        console.log('✅ PDS instructions also installed at .cursorrules (for Cursor IDE)');
      }
    } catch {
      // .cursorrules source doesn't exist, skip
    }
  } catch {
    // Optional, don't fail
  }
  
  console.log('\n📚 SSoT files available at node_modules/@pure-ds/core/:');
  console.log('   • custom-elements.json         (Web Component APIs)');
  console.log('   • public/assets/pds/pds.css-data.json  (CSS tokens)');
  console.log('   • src/js/pds-core/pds-ontology.js      (Primitives & utilities)');
  console.log('   • src/js/pds-core/pds-enhancer-metadata.js (Enhancements)');
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
