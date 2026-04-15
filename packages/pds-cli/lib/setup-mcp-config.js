/**
 * Shared MCP configuration helper — used by both pds-setup-mcp.js (CLI) and postinstall.mjs.
 */

import { mkdir, readFile, writeFile, access } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export function getServerScriptCandidates() {
  return [
    'node_modules/@pure-ds/core/packages/pds-cli/bin/pds-mcp-server.js',
    'node_modules/pure-ds/packages/pds-cli/bin/pds-mcp-server.js',
    'packages/pds-cli/bin/pds-mcp-server.js',
  ];
}

export function resolveServerScriptPath(projectRoot) {
  const candidatePaths = getServerScriptCandidates();
  for (const candidate of candidatePaths) {
    const absolutePath = path.join(projectRoot, candidate);
    if (existsSync(absolutePath)) {
      return absolutePath;
    }
  }
  return path.join(projectRoot, candidatePaths[0]);
}

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

/**
 * Write .vscode/mcp.json and .cursor/mcp.json in the given project root.
 * @param {string} projectRoot
 * @param {{ debugMode?: boolean, silent?: boolean }} options
 * @returns {{ vscodePath: string, cursorPath: string }}
 */
export async function setupMcpConfig(projectRoot, { debugMode = false, silent = false } = {}) {
  const serverCommand = process.execPath;
  const serverArgs = [resolveServerScriptPath(projectRoot)];
  const log = silent ? () => {} : (msg) => console.log(msg);
  const envBlock = debugMode ? { env: { PDS_MCP_DEBUG: '1', PDS_MCP_LOG_FILE: './.pds-mcp.log' } } : {};

  // VS Code
  const vscodePath = path.join(projectRoot, '.vscode', 'mcp.json');
  const vscodeConfig = (await readJsonIfExists(vscodePath)) || {};
  const vscodeServers = (vscodeConfig.servers && typeof vscodeConfig.servers === 'object') ? vscodeConfig.servers : {};
  vscodeServers['pure-ds'] = { type: 'stdio', command: serverCommand, args: serverArgs, ...envBlock };
  await writeJson(vscodePath, { ...vscodeConfig, servers: vscodeServers });
  log(`🔌 MCP: .vscode/mcp.json configured`);

  // Cursor
  const cursorPath = path.join(projectRoot, '.cursor', 'mcp.json');
  const cursorConfig = (await readJsonIfExists(cursorPath)) || {};
  const cursorServers = (cursorConfig.mcpServers && typeof cursorConfig.mcpServers === 'object') ? cursorConfig.mcpServers : {};
  cursorServers['pure-ds'] = { command: serverCommand, args: serverArgs, ...envBlock };
  await writeJson(cursorPath, { ...cursorConfig, mcpServers: cursorServers });
  log(`🔌 MCP: .cursor/mcp.json configured`);

  return { vscodePath, cursorPath };
}
