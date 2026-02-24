#!/usr/bin/env node

import { createPdsMcpContext, getPdsMcpTools, runPdsMcpTool } from '../lib/pds-mcp-core.js';

const SERVER_NAME = 'pds-ssoT';
const SERVER_VERSION = '0.1.0';
const PROTOCOL_VERSION = '2024-11-05';

const ctx = createPdsMcpContext({ projectRoot: process.cwd() });
const tools = getPdsMcpTools();

let inputBuffer = Buffer.alloc(0);

function writeMessage(payload) {
  const body = Buffer.from(JSON.stringify(payload), 'utf8');
  const header = Buffer.from(`Content-Length: ${body.length}\r\n\r\n`, 'utf8');
  process.stdout.write(Buffer.concat([header, body]));
}

function sendResponse(id, result) {
  writeMessage({ jsonrpc: '2.0', id, result });
}

function sendError(id, code, message, data) {
  writeMessage({
    jsonrpc: '2.0',
    id,
    error: { code, message, data },
  });
}

async function handleMessage(message) {
  const { id, method, params } = message || {};

  try {
    if (method === 'initialize') {
      return sendResponse(id, {
        protocolVersion: PROTOCOL_VERSION,
        capabilities: {
          tools: {},
        },
        serverInfo: {
          name: SERVER_NAME,
          version: SERVER_VERSION,
        },
      });
    }

    if (method === 'notifications/initialized' || method === 'initialized') {
      return;
    }

    if (method === 'ping') {
      return sendResponse(id, {});
    }

    if (method === 'tools/list') {
      return sendResponse(id, { tools });
    }

    if (method === 'tools/call') {
      const toolName = params?.name;
      const args = params?.arguments || {};
      const data = await runPdsMcpTool(ctx, toolName, args);
      return sendResponse(id, {
        content: [
          {
            type: 'text',
            text: JSON.stringify(data, null, 2),
          },
        ],
      });
    }

    if (method === 'prompts/list') {
      return sendResponse(id, { prompts: [] });
    }

    if (method === 'resources/list') {
      return sendResponse(id, { resources: [] });
    }

    if (typeof id !== 'undefined') {
      return sendError(id, -32601, `Method not found: ${method}`);
    }
  } catch (error) {
    if (typeof id !== 'undefined') {
      return sendError(id, -32000, error?.message || 'Unhandled server error', {
        stack: error?.stack || '',
      });
    }
  }
}

function tryReadFrame() {
  const separator = Buffer.from('\r\n\r\n', 'utf8');
  const headerEnd = inputBuffer.indexOf(separator);
  if (headerEnd === -1) return false;

  const header = inputBuffer.slice(0, headerEnd).toString('utf8');
  const contentLengthMatch = header.match(/Content-Length:\s*(\d+)/i);
  if (!contentLengthMatch) {
    inputBuffer = Buffer.alloc(0);
    return false;
  }

  const contentLength = Number(contentLengthMatch[1]);
  const bodyStart = headerEnd + separator.length;
  const bodyEnd = bodyStart + contentLength;
  if (inputBuffer.length < bodyEnd) return false;

  const body = inputBuffer.slice(bodyStart, bodyEnd).toString('utf8');
  inputBuffer = inputBuffer.slice(bodyEnd);

  let message;
  try {
    message = JSON.parse(body);
  } catch {
    return true;
  }

  handleMessage(message);
  return true;
}

process.stdin.on('data', (chunk) => {
  inputBuffer = Buffer.concat([inputBuffer, chunk]);
  while (tryReadFrame()) {
    // Parse all complete frames currently in the input buffer.
  }
});

process.stdin.on('error', () => {
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  const text = error?.stack || error?.message || String(error);
  process.stderr.write(`[pds-mcp-server] uncaughtException: ${text}\n`);
});
