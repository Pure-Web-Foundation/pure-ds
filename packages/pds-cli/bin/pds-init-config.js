#!/usr/bin/env node

/**
 * PDS Init Config - Create a default pds.config.js file
 * Usage: npx pds-init-config [--force]
 */

import { ensurePdsConfig } from './postinstall.js';
import { resolve } from 'path';

const args = process.argv.slice(2);
const force = args.includes('--force') || args.includes('-f');
const targetDir = args.find(arg => !arg.startsWith('-')) || process.cwd();

async function main() {
  console.log('🎨 PDS Config Initialization\n');
  
  const targetPath = resolve(targetDir);
  console.log(`📁 Target directory: ${targetPath}\n`);
  
  if (force) {
    console.log('⚠️  Force mode enabled - will overwrite existing config\n');
  }
  
  await ensurePdsConfig(targetPath, force);
  
  console.log('\n✨ Done! Edit pds.config.js to customize your design system.');
  console.log('📚 Learn more: https://github.com/pure-ds/core#configuration\n');
}

main().catch((error) => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
