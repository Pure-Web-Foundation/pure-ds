#!/usr/bin/env node

import { createPdsMcpContext, getPdsMcpTools, runPdsMcpTool } from '../lib/pds-mcp-core.js';
import { appendFileSync } from 'node:fs';
import path from 'node:path';

const SERVER_NAME = 'pure-ds';
const SERVER_VERSION = '0.1.0';
const DEFAULT_PROTOCOL_VERSION = '2024-11-05';
const SUPPORTED_PROTOCOL_VERSIONS = new Set([
  '2024-11-05',
  '2025-03-26',
  '2025-06-18',
  '2025-11-25',
]);

const ctx = createPdsMcpContext({ projectRoot: process.cwd() });
const tools = getPdsMcpTools();
const debugEnabled = process.env.PDS_MCP_DEBUG === '1' || process.env.PDS_MCP_DEBUG === 'true';
const debugLogFile = process.env.PDS_MCP_LOG_FILE
  ? path.resolve(process.cwd(), process.env.PDS_MCP_LOG_FILE)
  : '';

let inputBuffer = Buffer.alloc(0);
let outputTransportMode = 'framed';

function debugLog(message) {
  if (!debugEnabled) return;
  const line = `[pds-mcp-server][debug] ${new Date().toISOString()} ${message}`;
  process.stderr.write(`${line}\n`);
  if (debugLogFile) {
    try {
      appendFileSync(debugLogFile, `${line}\n`, 'utf8');
    } catch {
      // Never break MCP protocol flow because file logging failed.
    }
  }
}

function writeMessage(payload) {
  const body = Buffer.from(JSON.stringify(payload), 'utf8');
  if (outputTransportMode === 'raw') {
    process.stdout.write(Buffer.concat([body, Buffer.from('\n', 'utf8')]));
    return;
  }
  const header = Buffer.from(`Content-Length: ${body.length}\r\n\r\n`, 'utf8');
  process.stdout.write(Buffer.concat([header, body]));
}

function sendResponse(id, result) {
  debugLog(`response id=${String(id)} ok`);
  writeMessage({ jsonrpc: '2.0', id, result });
}

function sendError(id, code, message, data) {
  debugLog(`response id=${String(id)} error code=${String(code)} message=${String(message)}`);
  writeMessage({
    jsonrpc: '2.0',
    id,
    error: { code, message, data },
  });
}

function summarizeBufferPreview(buffer, limit = 220) {
  return buffer
    .slice(0, limit)
    .toString('latin1')
    .replace(/\r/g, '\\r')
    .replace(/\n/g, '\\n');
}

function findHeaderBoundary(buffer) {
  const raw = buffer.toString('latin1');
  const match = /\r?\n\r?\n/.exec(raw);
  if (!match || typeof match.index !== 'number') return null;
  return {
    headerEnd: match.index,
    separatorLength: match[0].length,
  };
}

function tryReadRawJsonFrame() {
  const raw = inputBuffer.toString('utf8');
  const trimmed = raw.trim();

  if (!trimmed) return false;
  if (!(trimmed.startsWith('{') || trimmed.startsWith('['))) return false;

  try {
    const parsed = JSON.parse(trimmed);
    outputTransportMode = 'raw';
    debugLog('parsed raw JSON-RPC frame (no Content-Length)');
    inputBuffer = Buffer.alloc(0);
    handleMessage(parsed);
    return true;
  } catch {
    const lines = raw
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    if (lines.length <= 1) return false;

    const firstLine = lines[0];
    if (!(firstLine.startsWith('{') || firstLine.startsWith('['))) return false;

    try {
      const parsedLine = JSON.parse(firstLine);
      const consumed = Buffer.byteLength(firstLine, 'utf8');
      const separatorMatch = raw.match(/^\s*[^\r\n]+(\r\n|\n|\r)/);
      const separatorLength = separatorMatch?.[1]?.length || 1;
      const consumeBytes = consumed + separatorLength;

      outputTransportMode = 'raw';
      debugLog('parsed raw JSON-RPC line frame (no Content-Length)');
      inputBuffer = inputBuffer.slice(Math.min(consumeBytes, inputBuffer.length));
      handleMessage(parsedLine);
      return true;
    } catch {
      return false;
    }
  }
}

async function handleMessage(message) {
  const { id, method, params } = message || {};
  debugLog(`request id=${typeof id === 'undefined' ? 'notification' : String(id)} method=${String(method || '')}`);

  try {
    if (method === 'initialize') {
      const requestedProtocolVersion = params?.protocolVersion;
      const protocolVersion = SUPPORTED_PROTOCOL_VERSIONS.has(requestedProtocolVersion)
        ? requestedProtocolVersion
        : DEFAULT_PROTOCOL_VERSION;

      return sendResponse(id, {
        protocolVersion,
        capabilities: {
          tools: {
            listChanged: false,
          },
          prompts: {
            listChanged: false,
          },
          resources: {
            subscribe: false,
            listChanged: false,
          },
          logging: {},
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
  const boundary = findHeaderBoundary(inputBuffer);
  if (!boundary) {
    const rawParsed = tryReadRawJsonFrame();
    if (rawParsed) return true;

    debugLog(`frame pending: no header boundary yet; buffered=${String(inputBuffer.length)} preview=${summarizeBufferPreview(inputBuffer)}`);
    return false;
  }

  outputTransportMode = 'framed';

  const { headerEnd, separatorLength } = boundary;

  const header = inputBuffer.slice(0, headerEnd).toString('utf8');
  const contentLengthMatch = header.match(/Content-Length:\s*(\d+)/i);
  if (!contentLengthMatch) {
    debugLog(`frame drop: missing Content-Length header; header=${header.replace(/\r/g, '\\r').replace(/\n/g, '\\n')}`);
    inputBuffer = Buffer.alloc(0);
    return false;
  }

  const contentLength = Number(contentLengthMatch[1]);
  const bodyStart = headerEnd + separatorLength;
  const bodyEnd = bodyStart + contentLength;
  if (inputBuffer.length < bodyEnd) {
    debugLog(`frame pending: incomplete body; need=${String(contentLength)} have=${String(inputBuffer.length - bodyStart)}`);
    return false;
  }

  const body = inputBuffer.slice(bodyStart, bodyEnd).toString('utf8');
  inputBuffer = inputBuffer.slice(bodyEnd);

  let message;
  try {
    message = JSON.parse(body);
  } catch {
    debugLog(`frame drop: JSON parse failed; bodyPreview=${summarizeBufferPreview(Buffer.from(body, 'utf8'))}`);
    return true;
  }

  handleMessage(message);
  return true;
}

process.stdin.on('data', (chunk) => {
  debugLog(`stdin chunk bytes=${String(chunk?.length || 0)}`);
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

process.on('unhandledRejection', (error) => {
  const text = error?.stack || error?.message || String(error);
  process.stderr.write(`[pds-mcp-server] unhandledRejection: ${text}\n`);
});
