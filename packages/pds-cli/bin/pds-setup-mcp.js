#!/usr/bin/env node

import { mkdir, readFile, writeFile, access } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const serverCommand = 'node';
const args = process.argv.slice(2);
const debugMode = args.includes('--debug');

function getServerScriptCandidates() {
  return [
    'node_modules/@pure-ds/core/packages/pds-cli/bin/pds-mcp-server.js',
    'node_modules/pure-ds/packages/pds-cli/bin/pds-mcp-server.js',
    'packages/pds-cli/bin/pds-mcp-server.js',
  ];
}

function resolveServerScriptPath() {
  const candidatePaths = getServerScriptCandidates();

  for (const candidate of candidatePaths) {
    const absolutePath = path.join(projectRoot, candidate);
    if (existsSync(absolutePath)) {
      return `./${candidate.replace(/\\/g, '/')}`;
    }
  }

  return `./${candidatePaths[0].replace(/\\/g, '/')}`;
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
    ...(debugMode
      ? {
          env: {
            PDS_MCP_DEBUG: '1',
            PDS_MCP_LOG_FILE: './.pds-mcp.log',
          },
        }
      : {}),
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
    ...(debugMode
      ? {
          env: {
            PDS_MCP_DEBUG: '1',
            PDS_MCP_LOG_FILE: './.pds-mcp.log',
          },
        }
      : {}),
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
