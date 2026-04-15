#!/usr/bin/env node

import path from 'path';
import { setupMcpConfig } from '../lib/setup-mcp-config.js';

const projectRoot = process.cwd();
const args = process.argv.slice(2);
const debugMode = args.includes('--debug');

async function main() {
  console.log('🔌 Setting up local PDS MCP server configuration...');

  const { vscodePath, cursorPath } = await setupMcpConfig(projectRoot, { debugMode, silent: false });

  console.log('✅ MCP configuration updated');
  console.log(`   • VS Code: ${path.relative(projectRoot, vscodePath)}`);
  console.log(`   • Cursor: ${path.relative(projectRoot, cursorPath)}`);
  if (debugMode) {
    console.log('   • Debug mode: enabled (logs to .pds-mcp.log)');
  }
  console.log('');
  console.log('ℹ️  Restart your AI extension/IDE so it re-reads MCP server config.');
}

main().catch((error) => {
  console.error('❌ Failed to set up MCP:', error?.message || error);
  process.exit(1);
});
