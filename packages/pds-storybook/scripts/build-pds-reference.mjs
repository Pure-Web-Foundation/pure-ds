#!/usr/bin/env node

// Consolidated reference data generator for Pure Design System Storybook
// Combines metadata from custom-elements.json, the PDS ontology, and Storybook stories

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import ts from 'typescript';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Determine if we are in the monorepo or installed as a package
// If we are in node_modules, we are a package.
// OR if we are running from the package-build script, we might be in the package folder but not in node_modules yet.
// But this script is run by the user (via npm run storybook) or by the build script.

// If we are in the monorepo, ROOT_DIR is ../../..
// If we are in the package, ROOT_DIR is ..
// We can check for the existence of 'packages/pds-storybook' in the parent directories to guess.

let ROOT_DIR;
let STORIES_ROOT;
let OUTPUT_DIR;

// Check if we are in the monorepo structure
// __dirname is packages/pds-storybook/scripts, so ../../.. is the monorepo root
const potentialMonorepoRoot = path.join(__dirname, '../../..');
if (fs.existsSync(path.join(potentialMonorepoRoot, 'packages/pds-storybook'))) {
    // We are in packages/pds-storybook/scripts
    ROOT_DIR = potentialMonorepoRoot;
    STORIES_ROOT = path.join(ROOT_DIR, 'packages/pds-storybook/stories');
    OUTPUT_DIR = path.join(ROOT_DIR, 'packages/pds-storybook/dist');
} else {
    // We are likely in the package structure (node_modules/@pure-ds/storybook/scripts or just dist/scripts)
    ROOT_DIR = path.join(__dirname, '..');
    STORIES_ROOT = path.join(ROOT_DIR, 'stories');
    OUTPUT_DIR = path.join(ROOT_DIR, 'dist');
}

const CUSTOM_ELEMENTS_PATH = path.join(ROOT_DIR, 'custom-elements.json');
const ONTOLOGY_PATH = path.join(ROOT_DIR, 'src/js/pds-core/pds-ontology.js');
const ENHANCERS_PATH = path.join(ROOT_DIR, 'src/js/pds-core/pds-enhancers.js');
const ENHANCERS_SOURCE_LABEL = path.relative(ROOT_DIR, ENHANCERS_PATH);
const ONTOLOGY_SOURCE_LABEL = path.relative(ROOT_DIR, ONTOLOGY_PATH);
const OUTPUT_PATH = path.join(OUTPUT_DIR, 'pds-reference.json');

const TYPE_METADATA_CACHE = new Map();

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

function normalizeMemberName(name = '') {
  if (typeof name !== 'string') {
    return '';
  }
  return name.replace(/^['"]|['"]$/g, '');
}

function isPrivateMemberName(name) {
  const normalized = normalizeMemberName(name);
  if (!normalized) return false;
  return (
    normalized.startsWith('#') ||
    normalized.startsWith('_') ||
    normalized.includes('#private@')
  );
}

async function readJson(filePath) {
  const raw = await fs.promises.readFile(filePath, 'utf-8');
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
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
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

/**
 * Extract story metadata statically from file content when dynamic import fails
 * This is a fallback for files with non-JS dependencies (e.g., markdown imports)
 * @param {string} content - File content
 * @param {string} relPath - Relative path for logging
 * @returns {Object|null} - Extracted metadata or null
 */
function extractStaticMetadata(content, relPath) {
  // Look for: export default { title: '...', parameters: { pds: { tags: [...] } } }
  // This is a simple regex-based extraction, not a full parser
  
  // Extract title
  const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/);
  if (!titleMatch) return null;
  
  const title = titleMatch[1];
  
  // Extract pds.tags array
  // Look for: pds: { tags: ['tag1', 'tag2', ...] }
  const pdsTagsMatch = content.match(/pds:\s*\{[^}]*tags:\s*\[([\s\S]*?)\]/);
  let pdsTags = [];
  if (pdsTagsMatch) {
    // Extract individual tags from the array
    const tagsContent = pdsTagsMatch[1];
    const tagMatches = tagsContent.matchAll(/['"`]([^'"`]+)['"`]/g);
    for (const match of tagMatches) {
      pdsTags.push(match[1]);
    }
  }
  
  // Extract standard tags array
  // Look for: tags: ['tag1', 'tag2', ...] (not inside pds: {})
  const standardTagsMatch = content.match(/(?<!pds:\s*\{[^}]*)tags:\s*\[([\s\S]*?)\]/);
  let standardTags = [];
  if (standardTagsMatch && !standardTagsMatch[0].includes('pds:')) {
    const tagsContent = standardTagsMatch[1];
    const tagMatches = tagsContent.matchAll(/['"`]([^'"`]+)['"`]/g);
    for (const match of tagMatches) {
      standardTags.push(match[1]);
    }
  }
  
  // Extract description
  const descMatch = content.match(/description:\s*\{[^}]*component:\s*['"`]([^'"`]+)['"`]/);
  const description = descMatch ? descMatch[1] : null;
  
  return {
    title,
    tags: standardTags,
    parameters: {
      pds: pdsTags.length > 0 ? { tags: pdsTags } : undefined,
      docs: description ? { description: { component: description } } : undefined
    }
  };
}

async function collectStoryMetadata() {
  const storyFiles = await walkStories(STORIES_ROOT);
  const index = new Map();

  for (const file of storyFiles) {
    if (file.includes(`${path.sep}reference${path.sep}`)) continue;

    const fileUrl = pathToFileURL(file).href;
    const relPath = path.relative(ROOT_DIR, file);
    let mod;
    let meta = null;
    
    try {
      mod = await import(fileUrl);
      meta = mod.default;
    } catch (error) {
      // Import failed - try to extract metadata statically from the file
      try {
        const content = await fs.promises.readFile(file, 'utf-8');
        meta = extractStaticMetadata(content, relPath);
        if (meta) {
          console.log(`[pds-reference] Extracted static metadata from ${relPath}`);
        }
      } catch (parseError) {
        // Ignore parse errors
      }
      
      if (!meta) {
        if (error.code === 'ERR_UNKNOWN_FILE_EXTENSION') {
          console.warn(`[pds-reference] Skipped ${relPath} (non-JS dependency: ${error.message.split(' for ').pop() || error.message})`);
        } else {
          console.warn(`[pds-reference] Skipped ${relPath}: ${error.message}`);
        }
        continue;
      }
    }

    if (!meta || !meta.title) {
      continue;
    }

    const segments = meta.title.split('/');
    const nameSegment = segments[segments.length - 1] || segments[0];
    const slug = slugifySegment(nameSegment);
    if (!slug) continue;

    const idBase = slugifyTitle(meta.title);

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

    // Only iterate over exports if we have the actual module
    if (mod) {
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

function extractJsDocComment(node, sourceFile) {
  const docs = node?.jsDoc;
  if (!docs?.length) return null;
  const parts = [];
  for (const doc of docs) {
    if (typeof doc.comment === 'string') {
      parts.push(doc.comment);
    } else if (Array.isArray(doc.comment)) {
      parts.push(
        doc.comment
          .map((segment) => (typeof segment === 'string' ? segment : segment.getText(sourceFile)))
          .join('')
      );
    }
  }
  return trimOrNull(parts.join('\n\n'));
}

function resolveDtsPath(modulePath) {
  if (!modulePath) return null;
  const normalized = modulePath.replace(/\\/g, '/');
  const candidate = normalized.replace(/\.(mjs|cjs|js|ts)$/i, '.d.ts');
  return path.join(ROOT_DIR, 'dist/types', candidate);
}

async function loadTypeMetadata(modulePath) {
  if (!modulePath) return null;
  if (TYPE_METADATA_CACHE.has(modulePath)) {
    return TYPE_METADATA_CACHE.get(modulePath);
  }

  const dtsPath = resolveDtsPath(modulePath);
  if (!dtsPath) {
    TYPE_METADATA_CACHE.set(modulePath, null);
    return null;
  }

  let source;
  try {
    source = await fs.promises.readFile(dtsPath, 'utf8');
  } catch {
    TYPE_METADATA_CACHE.set(modulePath, null);
    return null;
  }

  if (!source || !source.trim()) {
    TYPE_METADATA_CACHE.set(modulePath, null);
    return null;
  }

  const sourceFile = ts.createSourceFile(dtsPath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);

  const moduleInfo = {
    classes: {}
  };

  sourceFile.forEachChild((node) => {
    if (!ts.isClassDeclaration(node) && !ts.isClassExpression(node)) return;
    const className = node.name?.text;
    if (!className) return;

    const classInfo = {
      name: className,
      description: trimOrNull(extractJsDocComment(node, sourceFile)),
      properties: {},
      methods: {}
    };

    for (const member of node.members || []) {
      const rawMemberName = member.name?.getText?.(sourceFile);
      const memberName = normalizeMemberName(rawMemberName);
      if (!memberName || isPrivateMemberName(memberName)) continue;

      if (ts.isPropertyDeclaration(member) || ts.isPropertySignature(member)) {
        classInfo.properties[memberName] = {
          type: member.type ? member.type.getText(sourceFile) : null,
          description: trimOrNull(extractJsDocComment(member, sourceFile)),
          optional: Boolean(member.questionToken),
          readonly: Boolean(member.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ReadonlyKeyword))
        };
      } else if (ts.isMethodDeclaration(member) || ts.isMethodSignature(member)) {
        classInfo.methods[memberName] = {
          description: trimOrNull(extractJsDocComment(member, sourceFile)),
          returnType: member.type ? member.type.getText(sourceFile) : 'void',
          parameters:
            member.parameters?.map((param) => ({
              name: param.name.getText(sourceFile),
              type: param.type ? param.type.getText(sourceFile) : 'any',
              optional: Boolean(param.questionToken),
              description: trimOrNull(extractJsDocComment(param, sourceFile))
            })) || []
        };
      }
    }

    moduleInfo.classes[className] = classInfo;
  });

  TYPE_METADATA_CACHE.set(modulePath, moduleInfo);
  return moduleInfo;
}

function mapCustomElement(
  declaration,
  moduleEntry,
  storyMeta = {},
  ontologyLookup = new Map(),
  explicitTag,
  tsClassInfo = null
) {
  const tag = (explicitTag || declaration.tagName || '').toLowerCase();
  if (!tag) return null;
  const ontologyEntry = ontologyLookup.get(tag) || ontologyLookup.get(declaration.name) || null;

  const attributes = (declaration.attributes || []).map((attr) => ({
    name: attr.name,
    description: trimOrNull(attr.description),
    type: attr.type?.text || null,
    default: attr.default ?? null,
    fieldName: attr.fieldName || null
  }));

  const attributeByField = new Map(attributes.map((attr) => [attr.fieldName || attr.name, attr]));

  let properties = (declaration.members || [])
    .filter((member) => member.kind === 'field' && member.privacy !== 'private' && !isPrivateMemberName(member.name || ''))
    .map((member) => ({
      name: member.name,
      attribute: member.attribute || attributeByField.get(member.name)?.name || null,
      description: trimOrNull(member.description || attributeByField.get(member.name)?.description),
      type: member.type?.text || null,
      default: member.default ?? null,
      reflects: member.reflects || false,
      privacy: member.privacy || 'public'
    }));

  let methods = (declaration.members || [])
    .filter((member) => member.kind === 'method' && member.privacy !== 'private' && !isPrivateMemberName(member.name || ''))
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

  if (tsClassInfo) {
    const propertyMap = new Map(properties.map((prop) => [prop.name, prop]));
    for (const prop of properties) {
      const tsProp = tsClassInfo.properties?.[prop.name];
      if (!tsProp) continue;
      prop.type = tsProp.type || prop.type;
      prop.description = trimOrNull([prop.description, tsProp.description].filter(Boolean).join('\n\n')) || prop.description;
      if (tsProp.optional) prop.optional = true;
      if (tsProp.readonly) prop.readonly = true;
    }

    for (const [propName, tsProp] of Object.entries(tsClassInfo.properties || {})) {
      if (isPrivateMemberName(propName) || propertyMap.has(propName)) continue;
      const entry = {
        name: propName,
        attribute: null,
        description: trimOrNull(tsProp.description),
        type: tsProp.type || null,
        default: null,
        reflects: false,
        privacy: 'public'
      };
      if (tsProp.optional) entry.optional = true;
      if (tsProp.readonly) entry.readonly = true;
      propertyMap.set(propName, entry);
    }
    properties = Array.from(propertyMap.values());

    const methodMap = new Map(methods.map((method) => [method.name, method]));
    for (const method of methods) {
      const tsMethod = tsClassInfo.methods?.[method.name];
      if (!tsMethod) continue;
      method.description = trimOrNull([method.description, tsMethod.description].filter(Boolean).join('\n\n')) || method.description;
      if ((!method.parameters || method.parameters.length === 0) && tsMethod.parameters?.length) {
        method.parameters = tsMethod.parameters.map((param) => ({
          name: param.name,
          type: param.type,
          description: param.description,
          optional: param.optional || false
        }));
      } else if (method.parameters?.length && tsMethod.parameters?.length) {
        method.parameters = method.parameters.map((param) => {
          const tsParam = tsMethod.parameters.find((p) => p.name === param.name);
          if (!tsParam) return param;
          return {
            ...param,
            type: tsParam.type || param.type,
            description: trimOrNull([param.description, tsParam.description].filter(Boolean).join('\n\n')) || param.description,
            optional: tsParam.optional || param.optional || false
          };
        });
      }
      method.return = tsMethod.returnType || method.return;
    }

    for (const [methodName, tsMethod] of Object.entries(tsClassInfo.methods || {})) {
      if (isPrivateMemberName(methodName) || methodMap.has(methodName)) continue;
      methodMap.set(methodName, {
        name: methodName,
        description: trimOrNull(tsMethod.description),
        parameters: (tsMethod.parameters || []).map((param) => ({
          name: param.name,
          type: param.type,
          description: param.description,
          optional: param.optional || false
        })),
        return: tsMethod.returnType || null
      });
    }
    methods = Array.from(methodMap.values());
  }

  const overrides = tag ? SPECIAL_COMPONENT_OVERRIDES[tag] || {} : {};

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

  const combinedDescription = trimOrNull([
    declaration.description,
    tsClassInfo?.description
  ].filter(Boolean).join('\n\n'));

  const className = tsClassInfo?.name || declaration.name;

  return {
    tag,
    className,
    displayName: overrides.title || storyMeta.name || ontologyEntry?.name || humanizeTag(tag),
    storyTitle: storyMeta.storyTitle || null,
    category: storyMeta.category || null,
    description: combinedDescription,
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

async function buildComponents(customElements, ontology, storyIndex) {
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
    const moduleTypeInfo = await loadTypeMetadata(moduleEntry.path);
    const customElementDefs = (moduleEntry.exports || []).filter((exp) => exp.kind === 'custom-element-definition');

    if (customElementDefs.length) {
      for (const definition of customElementDefs) {
        const tag = definition.name?.toLowerCase();
        if (!tag) continue;
        const declarationRefName = definition.declaration?.name;
        const declaration = (moduleEntry.declarations || []).find((decl) => decl.name === declarationRefName) ||
          (moduleEntry.declarations || []).find((decl) => decl.tagName && decl.tagName.toLowerCase() === tag) ||
          (moduleEntry.declarations || []).find((decl) => decl.customElement);
        if (!declaration) continue;

        const tagWithoutPrefix = tag.startsWith('pds-') ? tag.slice(4) : tag;
        const storyMeta =
          storyIndex[tag] ||
          storyIndex[slugifySegment(tag)] ||
          storyIndex[tagWithoutPrefix] ||
          storyIndex[slugifySegment(tagWithoutPrefix)] ||
          storyIndex[slugifySegment(declaration.name)] || {};

        const tsClassInfo = moduleTypeInfo?.classes?.[declaration.name] ||
          moduleTypeInfo?.classes?.[declarationRefName] ||
          null;

        const component = mapCustomElement(declaration, moduleEntry, storyMeta, ontologyLookup, tag, tsClassInfo);
        if (component?.tag) {
          components[component.tag] = component;
        }
      }
      continue;
    }

    for (const declaration of moduleEntry.declarations || []) {
      if (!declaration.tagName) continue;
      const tag = declaration.tagName.toLowerCase();
      const tagWithoutPrefix = tag.startsWith('pds-') ? tag.slice(4) : tag;
      const storyMeta =
        storyIndex[tag] ||
        storyIndex[slugifySegment(tag)] ||
        storyIndex[tagWithoutPrefix] ||
        storyIndex[slugifySegment(tagWithoutPrefix)] ||
        storyIndex[slugifySegment(declaration.name)] || {};
      const tsClassInfo = moduleTypeInfo?.classes?.[declaration.name] || null;
      const component = mapCustomElement(declaration, moduleEntry, storyMeta, ontologyLookup, tag, tsClassInfo);
      if (component?.tag) {
        components[component.tag] = component;
      }
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

  // Ontology enhancements can be either strings (selector) or objects with selector property
  for (const enhancement of ontology.enhancements || []) {
    // Handle object format { id, selector, description, ... }
    const selector = typeof enhancement === 'object' && enhancement !== null
      ? String(enhancement.selector || '').trim()
      : String(enhancement || '').trim();
    
    if (!selector || seen.has(selector)) continue;
    
    // Extract additional info if it's an object
    const enhancementObj = typeof enhancement === 'object' && enhancement !== null ? enhancement : {};
    
    entries.push({
      id: enhancementObj.id || slugifySegment(selector),
      selector,
      description: trimOrNull(enhancementObj.description) || null,
      demoHtml: trimOrNull(enhancementObj.demoHtml) || null,
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

/**
 * Build the ontology data that includes searchRelations and categories
 * This is the SSoT for Storybook's ontology-aware search
 */
function buildOntologyData(ontology) {
  return {
    primitives: (ontology.primitives || []).map(p => ({
      id: p.id,
      name: p.name,
      tags: p.tags || [],
      category: p.category,
      selectors: p.selectors || []
    })),
    components: (ontology.components || []).map(c => ({
      id: c.id,
      name: c.name,
      tags: c.tags || [],
      category: c.category,
      selectors: c.selectors || []
    })),
    layoutPatterns: (ontology.layoutPatterns || []).map(l => ({
      id: l.id,
      name: l.name,
      tags: l.tags || [],
      category: l.category,
      selectors: l.selectors || []
    })),
    enhancements: (ontology.enhancements || []).map(e => {
      if (typeof e === 'object' && e !== null) {
        return {
          id: e.id,
          selector: e.selector,
          tags: e.tags || [],
          description: e.description
        };
      }
      return { id: slugifySegment(String(e)), selector: String(e), tags: [] };
    }),
    utilities: ontology.utilities || {},
    categories: ontology.categories || {},
    searchRelations: ontology.searchRelations || {}
  };
}

async function main() {
  try {
    const [customElements, ontology, storyIndex, enhancerMetadata] = await Promise.all([
      readJson(CUSTOM_ELEMENTS_PATH),
      loadOntology(),
      collectStoryMetadata(),
      loadEnhancers()
    ]);

    const components = await buildComponents(customElements, ontology, storyIndex);
    const primitives = buildPrimitives(ontology);
    const enhancements = buildEnhancements(ontology, enhancerMetadata);
    const tokens = buildTokens(ontology);
    const ontologyData = buildOntologyData(ontology);

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
      tokens,
      ontologyData,
      storyIndex  // Include story metadata with pds.tags for search
    };

    await fs.promises.mkdir(OUTPUT_DIR, { recursive: true });
    await fs.promises.writeFile(OUTPUT_PATH, JSON.stringify(reference, null, 2));

    console.log(`[pds-reference] Wrote ${path.relative(ROOT_DIR, OUTPUT_PATH)}`);
  } catch (error) {
    console.error('[pds-reference] Failed to build reference data');
    console.error(error);
    process.exitCode = 1;
  }
}

main();