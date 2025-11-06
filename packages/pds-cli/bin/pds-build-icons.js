#!/usr/bin/env node

/**
 * PDS Build Icons CLI
 *
 * Rebuilds the SVG sprite (pds-icons.svg) into the consumer app's configured static root.
 * Output path: [config.static.root]/icons/pds-icons.svg
 *
 * Usage: node node_modules/pure-ds/packages/pds-cli/bin/pds-build-icons.js
 */

import { readFile, writeFile, mkdir, access } from 'fs/promises';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../../../');

const COLORS = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
};
const log = (msg, color = 'reset') => console.log(`${COLORS[color]}${msg}${COLORS.reset}`);

async function loadConsumerConfig() {
  const cwd = process.cwd();
  for (const fname of ['pds.config.js', 'pds-config.js']) {
    const p = path.join(cwd, fname);
    try { await access(p); } catch { continue; }
    const mod = await import(pathToFileURL(p).href);
    return mod.config || mod.default || mod.presets?.default || null;
  }
  const internal = await import(pathToFileURL(path.join(repoRoot, 'src/js/pds-core/pds-config.js')).href);
  return internal.presets?.default || null;
}

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

async function fetchIcon(set, name, weight = 'regular', variant = 'outline') {
  switch (set) {
    case 'phosphor':
      return fetchText(`https://unpkg.com/@phosphor-icons/core@2.1.1/assets/${weight}/${name}.svg`);
    case 'lucide':
      return fetchText(`https://unpkg.com/lucide-static@latest/icons/${name}.svg`);
    case 'heroicons':
      return fetchText(`https://unpkg.com/heroicons@2.0.18/24/${variant}/${name}.svg`);
    case 'tabler':
      return fetchText(`https://unpkg.com/@tabler/icons@latest/icons/outline/${name}.svg`);
    default:
      throw new Error(`Unknown icon set: ${set}`);
  }
}

function svgToSymbol(svgContent, id) {
  const viewBox = (svgContent.match(/viewBox="([^"]+)"/) || [])[1] || '0 0 256 256';
  const inner = (svgContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/) || [])[1] || '';
  const clean = inner.replace(/fill="[^"]*"/g, 'fill="currentColor"')
                     .replace(/stroke="[^"]*"/g, 'stroke="currentColor"');
  return `  <symbol id="${id}" viewBox="${viewBox}">\n${clean.trim().split('\n').map(l=>`    ${l}`).join('\n')}\n  </symbol>`;
}

async function main() {
  try {
    log('\n🎨 PDS Build Icons • starting...', 'bold');
    const config = await loadConsumerConfig();

    // Require static.root to be configured
    const rootInput = process.env.PDS_STATIC_ROOT || config?.static?.root;
    if (!rootInput || typeof rootInput !== 'string') {
      log('⚠️  static.root is not configured in pds.config.js — skipping icon build.', 'yellow');
      log('   Set config.static.root (e.g., "public/assets/pds/") and re-run.', 'yellow');
      process.exit(0);
      return;
    }
    const staticRoot = path.isAbsolute(rootInput) ? rootInput : path.resolve(process.cwd(), rootInput);
  const outDir = path.join(staticRoot, 'icons');
  const outFile = path.join(outDir, 'pds-icons.svg');

    // Determine icon set configuration (consumer overrides internal defaults)
    const internal = await import(pathToFileURL(path.join(repoRoot, 'src/js/pds-core/pds-config.js')).href);
    const internalIcons = internal.presets?.default?.icons || {};
    const consumerIcons = config?.icons || {};
    const set = consumerIcons.set || internalIcons.set || 'phosphor';
    const weight = consumerIcons.weight || internalIcons.weight || 'regular';
    const include = consumerIcons.include || internalIcons.include || {};

    const names = Array.from(new Set(Object.values(include).flat()))
      .filter(Boolean);
    log(`📦 Icon set: ${set}`, 'blue');
    if (set === 'phosphor') log(`⚖️  Weight: ${weight}`, 'blue');
    log(`📝 Total icons: ${names.length}`, 'blue');

    const symbols = [];
    let ok = 0, fail = 0;
    for (const name of names) {
      try {
        const svg = await fetchIcon(set, name, weight);
        symbols.push(svgToSymbol(svg, name));
        ok++; log(`  ✓ ${name}`, 'green');
      } catch (e) {
        fail++; log(`  ✗ ${name}: ${e?.message || e}`, 'red');
      }
    }

    const sprite = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display:none">\n${symbols.join('\n\n')}\n</svg>\n`;

    await mkdir(outDir, { recursive: true });
    await writeFile(outFile, sprite, 'utf-8');

    log('\n────────────────────────────────────────────', 'bold');
    log('✅ Icons sprite built', 'green');
    log(`📁 Output: ${path.relative(process.cwd(), outFile)}`);
    log(`✓ ${ok} icons included${fail?`, ✗ ${fail} failed`:''}`);
    log('────────────────────────────────────────────\n', 'bold');
  } catch (err) {
    console.error('❌ pds:build-icons failed:', err?.message || err);
    process.exit(1);
  }
}

if (process.argv[1] && process.argv[1].endsWith('pds-build-icons.js')) {
  main();
}

export { main as runPdsBuildIcons };
