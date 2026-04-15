#!/usr/bin/env node
/**
 * Builds docs-data/*.json from PDS SSoT files.
 * Extends build-pds-reference.mjs logic for docs.pure-ds.com.
 *
 * Outputs:
 *   docs-data/components.json   — one entry per pds-* web component
 *   docs-data/tokens.json       — all CSS custom properties grouped by category
 *   docs-data/primitives.json   — ontology primitives with selectors + demoHtml
 *   docs-data/enhancements.json — enhancer metadata with demoHtml
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_ROOT = path.resolve(__dirname, '..');
const MONOREPO_ROOT = path.resolve(__dirname, '../../..');
const OUT_DIR = path.join(DOCS_ROOT, 'docs-data');

fs.mkdirSync(OUT_DIR, { recursive: true });

// ─── Source paths ─────────────────────────────────────────────────────────────

const CUSTOM_ELEMENTS_PATH = path.join(MONOREPO_ROOT, 'custom-elements.json');
const CSS_DATA_PATH = path.join(MONOREPO_ROOT, 'public', 'assets', 'pds', 'pds.css-data.json');
const ONTOLOGY_PATH = path.join(MONOREPO_ROOT, 'src', 'js', 'pds-core', 'pds-ontology.js');
const ENHANCERS_META_PATH = path.join(MONOREPO_ROOT, 'src', 'js', 'pds-core', 'pds-enhancers-meta.js');

// ─── Loaders ──────────────────────────────────────────────────────────────────

function loadJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

async function loadEsModule(p) {
  return import(pathToFileURL(p).href);
}

// ─── Builders ─────────────────────────────────────────────────────────────────

function buildComponents(customElements) {
  const components = [];
  for (const moduleEntry of customElements.modules || []) {
    for (const declaration of moduleEntry.declarations || []) {
      // Skip template placeholders and non-pds-* tags
      if (!declaration.customElement || !declaration.tagName) continue;
      if (!declaration.tagName.startsWith('pds-')) continue;
      components.push({
        tagName: declaration.tagName,
        description: declaration.description || '',
        attributes: (declaration.attributes || []).map((a) => ({
          name: a.name,
          type: a?.type?.text || null,
          description: a.description || '',
        })),
        events: (declaration.events || []).map((e) => ({
          name: e.name,
          type: e?.type?.text || null,
          description: e.description || '',
        })),
        cssParts: (declaration.cssParts || []).map((p) => ({
          name: p.name,
          description: p.description || '',
        })),
        cssProperties: (declaration.cssProperties || []).map((p) => ({
          name: p.name,
          description: p.description || '',
        })),
        members: (declaration.members || [])
          .filter((m) => m.privacy !== 'private')
          .map((m) => ({
            name: m.name,
            kind: m.kind,
            type: m?.type?.text || null,
            description: m.description || '',
          })),
        slots: (declaration.slots || []).map((s) => ({
          name: s.name || '',
          description: s.description || '',
        })),
        hasShadowDom: (declaration.cssParts || []).length > 0,
      });
    }
  }
  return components;
}

function buildTokens(cssData) {
  const groups = {};
  for (const property of cssData.properties || []) {
    const name = String(property.name || '');
    if (!name.startsWith('--')) continue;

    // Extract group from token name: --color-* → color, --spacing-* → spacing, etc.
    const match = name.match(/^--([a-z]+)-/);
    const group = match ? match[1] : 'other';
    if (!groups[group]) groups[group] = [];

    // Extract value from data URL reference
    let value = null;
    const valueRef = (property.references || []).find((r) => r.name === 'Value');
    if (valueRef?.url?.startsWith('data:text/plain,')) {
      try {
        value = decodeURIComponent(valueRef.url.replace('data:text/plain,', ''));
      } catch {}
    }

    groups[group].push({
      name,
      description: property.description || '',
      syntax: property.syntax || '',
      value,
    });
  }
  return groups;
}

function buildPrimitives(ontology) {
  return (ontology.primitives || []).map((item) => ({
    id: item.id || '',
    name: item.name || '',
    description: item.description || '',
    selectors: item.selectors || [],
    category: item.category || '',
    tags: item.tags || [],
  }));
}

function buildLayoutPatterns(ontology) {
  return (ontology.layoutPatterns || []).map((item) => ({
    id: item.id || '',
    name: item.name || '',
    description: item.description || '',
    selectors: item.selectors || [],
    category: item.category || '',
  }));
}

function buildEnhancements(enhancerMeta) {
  return enhancerMeta.map((item) => ({
    selector: item.selector,
    description: item.description || '',
    demoHtml: item.demoHtml || '',
    attributes: item.attributes || [],
  }));
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('📖 Building docs data from SSoT files...');

  const customElements = loadJson(CUSTOM_ELEMENTS_PATH);
  const cssData = loadJson(CSS_DATA_PATH);
  const ontologyMod = await loadEsModule(ONTOLOGY_PATH);
  const ontology = ontologyMod.ontology || {};
  const enhancersMod = await loadEsModule(ENHANCERS_META_PATH);
  const enhancerMeta = enhancersMod.defaultPDSEnhancerMetadata || [];

  const components = buildComponents(customElements);
  const tokens = buildTokens(cssData);
  const primitives = buildPrimitives(ontology);
  const layoutPatterns = buildLayoutPatterns(ontology);
  const enhancements = buildEnhancements(enhancerMeta);

  fs.writeFileSync(path.join(OUT_DIR, 'components.json'), JSON.stringify(components, null, 2));
  console.log(`  ✅ components.json (${components.length} components)`);

  fs.writeFileSync(path.join(OUT_DIR, 'tokens.json'), JSON.stringify(tokens, null, 2));
  const tokenCount = Object.values(tokens).reduce((n, arr) => n + arr.length, 0);
  console.log(`  ✅ tokens.json (${tokenCount} tokens in ${Object.keys(tokens).length} groups)`);

  fs.writeFileSync(path.join(OUT_DIR, 'primitives.json'), JSON.stringify(primitives, null, 2));
  console.log(`  ✅ primitives.json (${primitives.length} primitives)`);

  fs.writeFileSync(path.join(OUT_DIR, 'layout-patterns.json'), JSON.stringify(layoutPatterns, null, 2));
  console.log(`  ✅ layout-patterns.json (${layoutPatterns.length} patterns)`);

  fs.writeFileSync(path.join(OUT_DIR, 'enhancements.json'), JSON.stringify(enhancements, null, 2));
  console.log(`  ✅ enhancements.json (${enhancements.length} enhancers)`);

  console.log('📖 Docs data build complete.');
}

main().catch((err) => {
  console.error('❌ build-docs-data failed:', err.message);
  process.exit(1);
});
