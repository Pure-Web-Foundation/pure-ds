#!/usr/bin/env node

import { mkdir, readFile, writeFile, access } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const serverCommand = 'node';

function resolveServerScriptPath() {
  const candidatePaths = [
    './node_modules/@pure-ds/core/packages/pds-cli/bin/pds-mcp-server.js',
    './packages/pds-cli/bin/pds-mcp-server.js',
  ];

  for (const relativePath of candidatePaths) {
    const absolutePath = path.join(projectRoot, relativePath);
    if (existsSync(absolutePath)) {
      return relativePath;
    }
  }

  return candidatePaths[0];
}

const serverArgs = [resolveServerScriptPath()];

async function readJsonIfExists(filePath) {
  try {
    await access(filePath);
    const text = await readFile(filePath, 'utf8');
    return JSON.parse(text);
  } catch {
    return null;
  }
}

async function writeJson(filePath, value) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

async function setupVSCodeConfig() {
  const configPath = path.join(projectRoot, '.vscode', 'mcp.json');
  const current = (await readJsonIfExists(configPath)) || {};

  const servers = current.servers && typeof current.servers === 'object' ? current.servers : {};
  servers['pure-ds'] = {
    type: 'stdio',
    command: serverCommand,
    args: serverArgs,
  };

  await writeJson(configPath, { ...current, servers });
  return configPath;
}

async function setupCursorConfig() {
  const configPath = path.join(projectRoot, '.cursor', 'mcp.json');
  const current = (await readJsonIfExists(configPath)) || {};

  const mcpServers = current.mcpServers && typeof current.mcpServers === 'object' ? current.mcpServers : {};
  mcpServers['pure-ds'] = {
    command: serverCommand,
    args: serverArgs,
  };

  await writeJson(configPath, { ...current, mcpServers });
  return configPath;
}

async function main() {
  console.log('🔌 Setting up local PDS MCP server configuration...');

  const [vscodePath, cursorPath] = await Promise.all([
    setupVSCodeConfig(),
    setupCursorConfig(),
  ]);

  console.log('✅ MCP configuration updated');
  console.log(`   • VS Code: ${path.relative(projectRoot, vscodePath)}`);
  console.log(`   • Cursor: ${path.relative(projectRoot, cursorPath)}`);
  console.log('');
  console.log('ℹ️  Restart your AI extension/IDE so it re-reads MCP server config.');
}

main().catch((error) => {
  console.error('❌ Failed to set up MCP:', error?.message || error);
  process.exit(1);
});
