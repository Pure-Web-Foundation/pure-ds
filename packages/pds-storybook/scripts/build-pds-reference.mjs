#!/usr/bin/env node

// Consolidated reference data generator for Pure Design System Storybook
// Combines metadata from custom-elements.json, the PDS ontology, and Storybook stories

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '../../..');

const CUSTOM_ELEMENTS_PATH = path.join(ROOT_DIR, 'custom-elements.json');
const ONTOLOGY_PATH = path.join(ROOT_DIR, 'src/js/pds-core/pds-ontology.js');
const ENHANCERS_PATH = path.join(ROOT_DIR, 'src/js/pds-core/pds-enhancers.js');
const ENHANCERS_SOURCE_LABEL = path.relative(ROOT_DIR, ENHANCERS_PATH);
const ONTOLOGY_SOURCE_LABEL = path.relative(ROOT_DIR, ONTOLOGY_PATH);
const STORIES_ROOT = path.join(ROOT_DIR, 'packages/pds-storybook/stories');
const OUTPUT_DIR = path.join(ROOT_DIR, 'packages/pds-storybook/dist');
const OUTPUT_PATH = path.join(OUTPUT_DIR, 'pds-reference.json');

const SPECIAL_COMPONENT_OVERRIDES = {
  'pds-jsonform': {
    title: 'PDS JSON Schema Form',
    notes: [
      'Typed interfaces for `JsonFormOptions`, `UISchema`, and related events live in `src/js/pds.d.ts`.',
      'The form accepts standard JSON Schema (Draft 7) documents via the `jsonSchema` property. `uiSchema` and `options` fine-tune layout, widgets, and behaviors.'
    ],
    properties: {
      jsonSchema: {
        type: 'JSONSchema7 (object)',
        description: 'Primary schema input. Provide a JSON Schema object to generate the form layout and validation rules.'
      },
      uiSchema: {
        type: 'UISchema',
        description: 'Optional UI overrides keyed by JSON Pointer. Controls layout, widgets, surfaces, dialogs, and per-field hints.'
      },
      options: {
        type: 'JsonFormOptions',
        description: 'Toolkit-level options that adjust widget families, layouts, and validation behavior. Supports path-specific overrides.'
      },
      values: {
        type: 'Record<string, any>',
        description: 'Initial data that pre-populates the generated form. Shape must match the JSON Schema.'
      }
    },
    events: [
      {
        name: 'pw:submit',
        detail: 'JsonFormSubmitDetail',
        description: 'Emitted after submission. `detail` includes `{ json, formData, valid, issues }` for server hand-off or additional processing.'
      },
      {
        name: 'pw:value-change',
        detail: 'JsonFormValueChangeDetail',
        description: 'Live value updates whenever a field changes. `detail.name` contains the JSON Pointer-compatible path.'
      },
      {
        name: 'pw:array-add',
        detail: 'JsonFormArrayEventDetail',
        description: 'Triggered when an array item is appended. Carries the path and index metadata.'
      },
      {
        name: 'pw:array-remove',
        detail: 'JsonFormArrayEventDetail',
        description: 'Triggered when an array item is removed.'
      },
      {
        name: 'pw:array-reorder',
        detail: 'JsonFormArrayEventDetail',
        description: 'Triggered when array items are reordered (drag & drop scenarios).' 
      },
      {
        name: 'pw:dialog-open',
        detail: 'JsonFormDialogEventDetail',
        description: 'Fires before a dialog-driven field opens (e.g. complex editors).' 
      },
      {
        name: 'pw:dialog-submit',
        detail: 'JsonFormDialogEventDetail',
        description: 'Fires when a dialog-driven field is saved.'
      }
    ]
  }
};

function slugifySegment(input = '') {
  return input
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

function slugifyTitle(input = '') {
  return slugifySegment(input.replace(/\//g, '-'));
}

function humanizeTag(tag = '') {
  if (!tag) return '';
  return tag
    .replace(/^pds-/, 'PDS ')
    .replace(/-/g, ' ')
    .replace(/\b([a-z])/g, (m) => m.toUpperCase());
}

function dedupe(values = []) {
  return Array.from(new Set(values.filter(Boolean)));
}

function trimOrNull(value) {
  if (typeof value !== 'string') {
    return value ?? null;
  }
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

async function readJson(filePath) {
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw);
}

async function loadOntology() {
  const mod = await import(pathToFileURL(ONTOLOGY_PATH).href);
  return mod.ontology || mod.default || {};
}

function normalizeEnhancerDemo(demo) {
  if (!demo) return null;
  let markup = demo;
  if (typeof markup === 'function') {
    try {
      markup = markup();
    } catch (error) {
      console.warn('[pds-reference] Failed to evaluate enhancer demo', error);
      return null;
    }
  }
  if (typeof markup !== 'string') return null;
  const trimmed = markup.trim();
  return trimmed.length ? trimmed : null;
}

async function loadEnhancers() {
  try {
    const mod = await import(pathToFileURL(ENHANCERS_PATH).href);
    if (Array.isArray(mod.defaultPDSEnhancerMetadata)) {
      return mod.defaultPDSEnhancerMetadata;
    }
    if (Array.isArray(mod.defaultPDSEnhancers)) {
      return mod.defaultPDSEnhancers.map((enhancer) => ({
        selector: enhancer.selector,
        description: enhancer.description || null,
        demoHtml: normalizeEnhancerDemo(enhancer.demoHtml)
      }));
    }
    if (Array.isArray(mod.default)) {
      return mod.default;
    }
  } catch (error) {
    console.warn(`[pds-reference] Unable to import enhancers metadata: ${error.message}`);
  }
  return [];
}

async function walkStories(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walkStories(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.stories.js')) {
      files.push(fullPath);
    }
  }
  return files;
}

async function collectStoryMetadata() {
  const storyFiles = await walkStories(STORIES_ROOT);
  const index = new Map();

  for (const file of storyFiles) {
    if (file.includes(`${path.sep}reference${path.sep}`)) continue;

    const fileUrl = pathToFileURL(file).href;
    let mod;
    try {
      mod = await import(fileUrl);
    } catch (error) {
      const rel = path.relative(ROOT_DIR, file);
      if (error.code === 'ERR_UNKNOWN_FILE_EXTENSION') {
        console.warn(`[pds-reference] Skipped ${rel} (non-JS dependency: ${error.message.split(' for ').pop() || error.message})`);
      } else {
        console.warn(`[pds-reference] Skipped ${rel}: ${error.message}`);
      }
      continue;
    }

    const meta = mod.default;
    if (!meta || !meta.title) {
      continue;
    }

    const segments = meta.title.split('/');
    const nameSegment = segments[segments.length - 1] || segments[0];
    const slug = slugifySegment(nameSegment);
    if (!slug) continue;

    const idBase = slugifyTitle(meta.title);
    const relPath = path.relative(ROOT_DIR, file);

    const entry = index.get(slug) || {
      slug,
      storyTitle: meta.title,
      category: segments.slice(0, -1).join('/') || null,
      name: nameSegment,
      description: null,
      tags: new Set(),
      pdsParameters: {},
      stories: [],
      files: new Set()
    };

    entry.files.add(relPath);

    if (Array.isArray(meta.tags)) {
      meta.tags.forEach((tag) => tag && entry.tags.add(tag));
    }
    if (Array.isArray(meta.parameters?.pds?.tags)) {
      meta.parameters.pds.tags.forEach((tag) => tag && entry.tags.add(tag));
    }

    if (meta.parameters?.pds) {
      entry.pdsParameters = { ...entry.pdsParameters, ...meta.parameters.pds };
    }

    if (meta.parameters?.docs?.description?.component) {
      entry.description = meta.parameters.docs.description.component;
    }

    for (const [exportName, story] of Object.entries(mod)) {
      if (exportName === 'default' || exportName === '__namedExportsOrder') continue;

      const storyItem = typeof story === 'object' ? story : null;
      if (!storyItem) continue;

      const storyTags = [];
      if (Array.isArray(storyItem.tags)) storyTags.push(...storyItem.tags);
      if (Array.isArray(storyItem.parameters?.pds?.tags)) storyTags.push(...storyItem.parameters.pds.tags);

      entry.stories.push({
        exportName,
        name: storyItem.storyName || storyItem.name || exportName,
        id: `${idBase}--${slugifySegment(exportName)}`,
        tags: dedupe(storyTags),
        description: trimOrNull(storyItem.parameters?.docs?.description?.story || storyItem.parameters?.docs?.description?.component),
        source: relPath
      });
    }

    index.set(slug, entry);
  }

  const result = {};
  for (const [slug, entry] of index.entries()) {
    result[slug] = {
      slug,
      storyTitle: entry.storyTitle,
      category: entry.category,
      name: entry.name,
      description: trimOrNull(entry.description),
      tags: Array.from(entry.tags).sort(),
      pdsParameters: entry.pdsParameters,
      stories: entry.stories.sort((a, b) => a.name.localeCompare(b.name)),
      files: Array.from(entry.files)
    };
  }
  return result;
}

function mapCustomElement(declaration, moduleEntry, storyMeta = {}, ontologyLookup = new Map()) {
  const tag = declaration.tagName?.toLowerCase();
  const ontologyEntry = ontologyLookup.get(tag) || ontologyLookup.get(declaration.name) || null;

  const attributes = (declaration.attributes || []).map((attr) => ({
    name: attr.name,
    description: trimOrNull(attr.description),
    type: attr.type?.text || null,
    default: attr.default ?? null,
    fieldName: attr.fieldName || null
  }));

  const attributeByField = new Map(attributes.map((attr) => [attr.fieldName || attr.name, attr]));

  const properties = (declaration.members || [])
    .filter((member) => member.kind === 'field' && member.privacy !== 'private' && !(member.name || '').startsWith('_'))
    .map((member) => ({
      name: member.name,
      attribute: member.attribute || attributeByField.get(member.name)?.name || null,
      description: trimOrNull(member.description || attributeByField.get(member.name)?.description),
      type: member.type?.text || null,
      default: member.default ?? null,
      reflects: member.reflects || false,
      privacy: member.privacy || 'public'
    }));

  const methods = (declaration.members || [])
    .filter((member) => member.kind === 'method' && member.privacy !== 'private' && !(member.name || '').startsWith('_'))
    .map((member) => ({
      name: member.name,
      description: trimOrNull(member.description),
      parameters: (member.parameters || []).map((param) => ({
        name: param.name,
        type: param.type?.text || null,
        description: param.description || null
      })),
      return: member.return?.type?.text || null
    }));

  const events = (declaration.events || [])
    .filter((event) => event.name && event.name !== 'name')
    .map((event) => ({
      name: event.name,
      description: trimOrNull(event.description),
      type: event.type?.text || null
    }));

  const slots = (declaration.slots || []).map((slot) => ({
    name: slot.name,
    description: trimOrNull(slot.description)
  }));

  const cssParts = (declaration.cssParts || []).map((part) => ({
    name: part.name,
    description: trimOrNull(part.description)
  }));

  const overrides = SPECIAL_COMPONENT_OVERRIDES[tag] || {};

  if (overrides.properties) {
    for (const [propName, override] of Object.entries(overrides.properties)) {
      const property = properties.find((prop) => prop.name === propName);
      if (property) {
        property.type = override.type || property.type;
        property.description = trimOrNull([override.description, property.description].filter(Boolean).join('\n\n'));
      } else {
        properties.push({
          name: propName,
          attribute: null,
          description: trimOrNull(override.description),
          type: override.type || null,
          default: null,
          reflects: false,
          privacy: 'public'
        });
      }
    }
  }

  if (overrides.events) {
    for (const event of overrides.events) {
      const existing = events.find((item) => item.name === event.name);
      if (existing) {
        existing.type = event.detail ? `CustomEvent<${event.detail}>` : existing.type;
        existing.description = trimOrNull([existing.description, event.description].filter(Boolean).join('\n\n'));
      } else {
        events.push({
          name: event.name,
          type: event.detail ? `CustomEvent<${event.detail}>` : null,
          description: trimOrNull(event.description)
        });
      }
    }
  }

  return {
    tag,
    className: declaration.name,
    displayName: overrides.title || storyMeta.name || ontologyEntry?.name || humanizeTag(tag),
    storyTitle: storyMeta.storyTitle || null,
    category: storyMeta.category || null,
    description: trimOrNull(declaration.description),
    docsDescription: storyMeta.description || null,
    pdsTags: storyMeta.tags || [],
    ontology: ontologyEntry ? { ...ontologyEntry } : null,
    stories: storyMeta.stories || [],
    sourceModule: moduleEntry.path,
    superclass: declaration.superclass?.name || null,
    attributes,
    properties: properties.sort((a, b) => a.name.localeCompare(b.name)),
    methods: methods.sort((a, b) => a.name.localeCompare(b.name)),
    events: events.sort((a, b) => a.name.localeCompare(b.name)),
    slots,
    cssParts,
    notes: overrides.notes || []
  };
}

function buildComponents(customElements, ontology, storyIndex) {
  const ontologyLookup = new Map();
  for (const item of ontology.components || []) {
    ontologyLookup.set(item.id?.toLowerCase(), item);
    if (item.selectors) {
      item.selectors.forEach((sel) => {
        if (sel && sel.startsWith('pds-')) {
          ontologyLookup.set(sel.toLowerCase(), item);
        }
      });
    }
  }

  const components = {};

  for (const moduleEntry of customElements.modules || []) {
    for (const declaration of moduleEntry.declarations || []) {
      if (!declaration.tagName) continue;
      const tag = declaration.tagName.toLowerCase();
      const storyMeta = storyIndex[tag] || storyIndex[slugifySegment(declaration.name)] || storyIndex[tag.replace(/^pds\-/, 'pds-')] || {};
      components[tag] = mapCustomElement(declaration, moduleEntry, storyMeta, ontologyLookup);
    }
  }

  return components;
}

function buildPrimitives(ontology) {
  return {
    primitives: (ontology.primitives || []).map((item) => ({
      id: item.id,
      name: item.name || humanizeTag(item.id),
      selectors: item.selectors || []
    })),
    layoutPatterns: (ontology.layoutPatterns || []).map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description || null,
      selectors: item.selectors || []
    })),
    utilities: Array.isArray(ontology.utilities) ? ontology.utilities : []
  };
}

function buildEnhancements(ontology, enhancerMetadata = []) {
  const entries = [];
  const seen = new Set();

  for (const meta of enhancerMetadata) {
    if (!meta || !meta.selector) continue;
    const selector = String(meta.selector).trim();
    if (!selector) continue;
    seen.add(selector);
    entries.push({
      id: slugifySegment(selector),
      selector,
      description: trimOrNull(meta.description),
      demoHtml: trimOrNull(meta.demoHtml),
      source: ENHANCERS_SOURCE_LABEL
    });
  }

  for (const selector of ontology.enhancements || []) {
    const normalized = String(selector || '').trim();
    if (!normalized || seen.has(normalized)) continue;
    entries.push({
      id: slugifySegment(normalized),
      selector: normalized,
      description: null,
      demoHtml: null,
      source: ONTOLOGY_SOURCE_LABEL
    });
  }

  return entries.sort((a, b) => a.selector.localeCompare(b.selector));
}

function buildTokens(ontology) {
  const tokens = ontology.tokens || {};
  const result = {};
  for (const [group, value] of Object.entries(tokens)) {
    if (Array.isArray(value)) {
      result[group] = value;
    } else {
      result[group] = value;
    }
  }
  return result;
}

async function main() {
  try {
    const [customElements, ontology, storyIndex, enhancerMetadata] = await Promise.all([
      readJson(CUSTOM_ELEMENTS_PATH),
      loadOntology(),
      collectStoryMetadata(),
      loadEnhancers()
    ]);

    const components = buildComponents(customElements, ontology, storyIndex);
    const primitives = buildPrimitives(ontology);
    const enhancements = buildEnhancements(ontology, enhancerMetadata);
    const tokens = buildTokens(ontology);

    const reference = {
      generatedAt: new Date().toISOString(),
      sources: {
        customElements: path.relative(ROOT_DIR, CUSTOM_ELEMENTS_PATH),
        ontology: path.relative(ROOT_DIR, ONTOLOGY_PATH),
        storiesRoot: path.relative(ROOT_DIR, STORIES_ROOT),
        enhancers: path.relative(ROOT_DIR, ENHANCERS_PATH)
      },
      components,
      primitives,
      enhancements,
      tokens
    };

    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    await fs.writeFile(OUTPUT_PATH, JSON.stringify(reference, null, 2));

    console.log(`[pds-reference] Wrote ${path.relative(ROOT_DIR, OUTPUT_PATH)}`);
  } catch (error) {
    console.error('[pds-reference] Failed to build reference data');
    console.error(error);
    process.exitCode = 1;
  }
}

main();