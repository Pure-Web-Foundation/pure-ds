/**
 * Simple local server to enable saving config from the visual editor
 * Run with: node scripts/config-server.mjs
 */

import { createServer } from 'http';
import { writeFile, readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const CONFIG_FILE = join(__dirname, '..', 'auto-designer.config.js');
const PORT = 3001;

const server = createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // GET - Read current config
  if (req.method === 'GET' && req.url === '/api/config') {
    try {
      const content = await readFile(CONFIG_FILE, 'utf-8');
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(content);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // POST - Save config
  if (req.method === 'POST' && req.url === '/api/config') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const config = JSON.parse(body);
        
        // Format the config as a JS module
        const jsContent = `// Generator Configuration
// This file is used by the Node.js script to generate CSS

export const autoDesignerConfig = ${JSON.stringify(config, null, 2)};
`;

        await writeFile(CONFIG_FILE, jsContent, 'utf-8');
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          success: true, 
          message: 'Config saved successfully!',
          file: CONFIG_FILE
        }));
        
        console.log('✅ Config saved to:', CONFIG_FILE);
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
        console.error('❌ Error saving config:', err.message);
      }
    });
    return;
  }

  // Not found
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log('\n🎨 Generator Config Server');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📡 Server running at: http://localhost:${PORT}`);
  console.log(`📝 Config file: ${CONFIG_FILE}`);
  console.log('\nEndpoints:');
  console.log(`  GET  /api/config - Read current config`);
  console.log(`  POST /api/config - Save new config`);
  console.log('\n💡 Open auto-designer-editor.html to edit visually');
  console.log('Press Ctrl+C to stop\n');
});
