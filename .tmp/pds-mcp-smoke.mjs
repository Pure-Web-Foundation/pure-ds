import { spawn } from 'node:child_process';

function frame(msg) {
  const body = Buffer.from(JSON.stringify(msg), 'utf8');
  return Buffer.concat([Buffer.from(`Content-Length: ${body.length}\r\n\r\n`, 'utf8'), body]);
}

function parseFrames(state, chunk, onMessage) {
  state.buf = Buffer.concat([state.buf, chunk]);
  while (true) {
    const sep = Buffer.from('\r\n\r\n', 'utf8');
    const idx = state.buf.indexOf(sep);
    if (idx === -1) return;
    const header = state.buf.slice(0, idx).toString('utf8');
    const m = header.match(/Content-Length:\s*(\d+)/i);
    if (!m) { state.buf = Buffer.alloc(0); return; }
    const len = Number(m[1]);
    const start = idx + sep.length;
    const end = start + len;
    if (state.buf.length < end) return;
    const body = state.buf.slice(start, end).toString('utf8');
    state.buf = state.buf.slice(end);
    onMessage(JSON.parse(body));
  }
}

const child = spawn(process.execPath, ['./packages/pds-cli/bin/pds-mcp-server.js'], {
  cwd: process.cwd(),
  stdio: ['pipe', 'pipe', 'pipe']
});

const state = { buf: Buffer.alloc(0) };
const seen = { init: false, tools: false };
const timer = setTimeout(() => {
  console.error('TIMEOUT waiting for MCP responses');
  child.kill();
  process.exit(2);
}, 8000);

child.stdout.on('data', (chunk) => {
  parseFrames(state, chunk, (msg) => {
    if (msg.id === 1 && msg.result?.serverInfo?.name) {
      seen.init = true;
      child.stdin.write(frame({ jsonrpc: '2.0', id: 2, method: 'tools/list', params: {} }));
      return;
    }
    if (msg.id === 2 && Array.isArray(msg.result?.tools)) {
      seen.tools = true;
      const names = msg.result.tools.map(t => t.name).sort();
      console.log('MCP_OK');
      console.log(`server=${msg.result?.serverInfo?.name || 'pds-ssoT'}`);
      console.log(`tools=${names.join(',')}`);
      clearTimeout(timer);
      child.kill();
      process.exit(0);
    }
  });
});

child.stderr.on('data', (d) => {
  const s = String(d).trim();
  if (s) console.error(s);
});

child.on('exit', (code) => {
  if (!(seen.init && seen.tools)) {
    clearTimeout(timer);
    process.exit(code || 1);
  }
});

child.stdin.write(frame({
  jsonrpc: '2.0',
  id: 1,
  method: 'initialize',
  params: {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: { name: 'pds-smoke-test', version: '1.0.0' }
  }
}));
