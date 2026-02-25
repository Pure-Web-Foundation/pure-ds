#!/usr/bin/env node

import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serverScriptPath = path.resolve(__dirname, 'pds-mcp-server.js');

const requiredTools = [
  'get_tokens',
  'find_utility_class',
  'query_design_system',
  'get_component_api',
  'get_enhancer_metadata',
  'get_config_relations',
  'validate_pds_snippet',
];

function frame(message) {
  const body = Buffer.from(JSON.stringify(message), 'utf8');
  return Buffer.concat([
    Buffer.from(`Content-Length: ${body.length}\r\n\r\n`, 'utf8'),
    body,
  ]);
}

function parseFrames(state, chunk, onMessage) {
  state.buffer = Buffer.concat([state.buffer, chunk]);
  while (true) {
    const separator = Buffer.from('\r\n\r\n', 'utf8');
    const headerEnd = state.buffer.indexOf(separator);
    if (headerEnd === -1) return;

    const header = state.buffer.slice(0, headerEnd).toString('utf8');
    const contentLengthMatch = header.match(/Content-Length:\s*(\d+)/i);
    if (!contentLengthMatch) {
      state.buffer = Buffer.alloc(0);
      return;
    }

    const contentLength = Number(contentLengthMatch[1]);
    const bodyStart = headerEnd + separator.length;
    const bodyEnd = bodyStart + contentLength;
    if (state.buffer.length < bodyEnd) return;

    const body = state.buffer.slice(bodyStart, bodyEnd).toString('utf8');
    state.buffer = state.buffer.slice(bodyEnd);

    try {
      onMessage(JSON.parse(body));
    } catch {
      // Ignore malformed JSON frame and continue.
    }
  }
}

async function runHealthCheck() {
  const child = spawn(process.execPath, [serverScriptPath], {
    cwd: process.cwd(),
    stdio: ['pipe', 'pipe', 'pipe'],
  });

  const state = { buffer: Buffer.alloc(0) };
  let initialized = false;
  let serverName = 'pure-ds';

  const timer = setTimeout(() => {
    console.error('❌ MCP health check timed out while waiting for server responses.');
    child.kill();
    process.exit(2);
  }, 8000);

  child.stderr.on('data', (data) => {
    const text = String(data || '').trim();
    if (text) {
      console.error(`MCP server stderr: ${text}`);
    }
  });

  child.stdout.on('data', (chunk) => {
    parseFrames(state, chunk, (message) => {
      if (message.id === 1 && message.result?.serverInfo?.name) {
        initialized = true;
        serverName = message.result.serverInfo.name;
        child.stdin.write(frame({ jsonrpc: '2.0', id: 2, method: 'tools/list', params: {} }));
        return;
      }

      if (message.id === 2 && Array.isArray(message.result?.tools)) {
        const toolNames = message.result.tools.map((tool) => tool.name).filter(Boolean);
        const missingTools = requiredTools.filter((toolName) => !toolNames.includes(toolName));

        if (missingTools.length > 0) {
          console.error('❌ MCP server is reachable but missing required tools:');
          missingTools.forEach((toolName) => console.error(`   - ${toolName}`));
          clearTimeout(timer);
          child.kill();
          process.exit(3);
        }

        console.log('✅ PDS MCP health check passed');
        console.log(`   Server: ${serverName}`);
        console.log(`   Tools: ${toolNames.sort().join(', ')}`);
        clearTimeout(timer);
        child.kill();
        process.exit(0);
      }
    });
  });

  child.on('exit', (code) => {
    if (!initialized) {
      clearTimeout(timer);
      process.exit(code || 1);
    }
  });

  child.stdin.write(
    frame({
      jsonrpc: '2.0',
      id: 1,
      method: 'initialize',
      params: {
        protocolVersion: '2024-11-05',
        capabilities: {},
        clientInfo: { name: 'pds-mcp-health', version: '1.0.0' },
      },
    })
  );
}

runHealthCheck().catch((error) => {
  console.error('❌ MCP health check failed:', error?.message || error);
  process.exit(1);
});
