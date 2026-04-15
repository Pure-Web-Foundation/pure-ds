#!/usr/bin/env node
/**
 * Copies PDS static assets from the monorepo into packages/pds-docs/public/assets/pds/
 * so the docs dev server and built site can serve them to preview iframes and the playground.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_ROOT = path.resolve(__dirname, '..');
const MONOREPO_ROOT = path.resolve(__dirname, '../../..');

const SRC = path.join(MONOREPO_ROOT, 'public', 'assets', 'pds');
const DEST = path.join(DOCS_ROOT, 'public', 'assets', 'pds');

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

if (!fs.existsSync(SRC)) {
  console.error(`❌ PDS assets not found at: ${SRC}`);
  console.error('   Run npm run pds:build in the monorepo root first.');
  process.exit(1);
}

copyDir(SRC, DEST);

const count = fs.readdirSync(DEST).length;
console.log(`✅ PDS assets copied to public/assets/pds/ (${count} entries)`);
