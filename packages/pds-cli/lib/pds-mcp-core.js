import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = path.resolve(__dirname, '../../..');

function isObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value);
}

function normalize(value) {
  return String(value || '').toLowerCase();
}

function decodeDataTextUrl(url) {
  if (typeof url !== 'string' || !url.startsWith('data:text/plain,')) return null;
  try {
    return decodeURIComponent(url.replace('data:text/plain,', ''));
  } catch {
    return null;
  }
}

function normalizePath(p) {
  return p.split(path.sep).join('/');
}

function resolveSsoTRoot(projectRoot = process.cwd()) {
  const candidates = [
    PACKAGE_ROOT,
    path.join(projectRoot, 'node_modules', '@pure-ds', 'core'),
    projectRoot,
  ];

  for (const candidate of candidates) {
    const hasCustomElements = existsSync(path.join(candidate, 'custom-elements.json'));
    const hasCssData = existsSync(path.join(candidate, 'public', 'assets', 'pds', 'pds.css-data.json'));
    const hasCore = existsSync(path.join(candidate, 'src', 'js', 'pds-core'));
    if (hasCustomElements && hasCssData && hasCore) {
      return candidate;
    }
  }

  return PACKAGE_ROOT;
}

function getSelectorClasses(selector) {
  const classes = [];
  const regex = /\.([a-zA-Z][\w-]*)/g;
  let match = regex.exec(selector);
  while (match) {
    classes.push(match[1]);
    match = regex.exec(selector);
  }
  return classes;
}

function buildSuggestions(items, term, limit = 5) {
  const needle = normalize(term);
  if (!needle) return [];
  const starts = [];
  const contains = [];
  for (const item of items) {
    const n = normalize(item);
    if (n.startsWith(needle)) starts.push(item);
    else if (n.includes(needle)) contains.push(item);
  }
  return [...new Set([...starts, ...contains])].slice(0, limit);
}

function getToolSchema() {
  return [
    {
      name: 'get_tokens',
      description: 'Search PDS CSS custom property tokens from pds.css-data.json.',
      inputSchema: {
        type: 'object',
        properties: {
          contains: { type: 'string', description: 'Substring to search in token name/description.' },
          prefix: { type: 'string', description: 'Token prefix filter, e.g. --color-, --spacing-.' },
          limit: { type: 'number', minimum: 1, maximum: 200, default: 40 },
          includeValues: { type: 'boolean', default: true },
        },
      },
    },
    {
      name: 'find_utility_class',
      description: 'Find PDS selectors/classes from ontology primitives/layout/utilities metadata.',
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Class or concept, e.g. gap, surface, btn, flex.' },
          limit: { type: 'number', minimum: 1, maximum: 100, default: 30 },
          section: {
            type: 'string',
            enum: ['primitives', 'components', 'layoutPatterns', 'all'],
            default: 'all',
          },
        },
      },
    },
    {
      name: 'query_design_system',
      description: 'Run natural-language PDS design system search against SSoT-backed data.',
      inputSchema: {
        type: 'object',
        required: ['question'],
        properties: {
          question: { type: 'string', description: 'Natural language question, e.g. "focus border color on inputs".' },
        },
      },
    },
    {
      name: 'get_component_api',
      description: 'Lookup PDS custom element API from custom-elements.json.',
      inputSchema: {
        type: 'object',
        properties: {
          tagName: { type: 'string', description: 'Custom element tag, e.g. pds-form.' },
          contains: { type: 'string', description: 'Search by tag/member/attribute/event text.' },
          limit: { type: 'number', minimum: 1, maximum: 50, default: 10 },
        },
      },
    },
    {
      name: 'get_enhancer_metadata',
      description: 'Read enhancer selector descriptions and demoHtml from pds-enhancers-meta.js.',
      inputSchema: {
        type: 'object',
        properties: {
          selector: { type: 'string', description: 'Exact or partial enhancer selector.' },
          contains: { type: 'string', description: 'Search text in selector/description/demoHtml.' },
          includeDemoHtml: { type: 'boolean', default: true },
          limit: { type: 'number', minimum: 1, maximum: 100, default: 20 },
        },
      },
    },
    {
      name: 'get_config_relations',
      description: 'Read PDS_CONFIG_RELATIONS from pds-config.js for deterministic token mapping.',
      inputSchema: {
        type: 'object',
        properties: {
          pathPrefix: { type: 'string', description: 'Config path prefix, e.g. colors, layout.' },
          contains: { type: 'string', description: 'Search inside relation payload JSON.' },
          limit: { type: 'number', minimum: 1, maximum: 200, default: 60 },
        },
      },
    },
    {
      name: 'validate_pds_snippet',
      description: 'Validate HTML snippet for unknown classes, tokens, and pds-* tags against SSoT.',
      inputSchema: {
        type: 'object',
        required: ['html'],
        properties: {
          html: { type: 'string', description: 'HTML snippet to validate.' },
        },
      },
    },
  ];
}

async function loadJson(filePath) {
  const raw = await readFile(filePath, 'utf-8');
  return JSON.parse(raw);
}

async function importModule(filePath) {
  return import(pathToFileURL(filePath).href);
}

export function createPdsMcpContext({ projectRoot = process.cwd() } = {}) {
  const ssoTRoot = resolveSsoTRoot(projectRoot);
  return {
    projectRoot,
    ssoTRoot,
    files: {
      cssData: path.join(ssoTRoot, 'public', 'assets', 'pds', 'pds.css-data.json'),
      customElements: path.join(ssoTRoot, 'custom-elements.json'),
      ontology: path.join(ssoTRoot, 'src', 'js', 'pds-core', 'pds-ontology.js'),
      queryEngine: path.join(ssoTRoot, 'src', 'js', 'pds-core', 'pds-query.js'),
      enhancersMeta: path.join(ssoTRoot, 'src', 'js', 'pds-core', 'pds-enhancers-meta.js'),
      config: path.join(ssoTRoot, 'src', 'js', 'pds-core', 'pds-config.js'),
    },
    cache: new Map(),
  };
}

async function getCssData(ctx) {
  if (!ctx.cache.has('cssData')) {
    ctx.cache.set('cssData', await loadJson(ctx.files.cssData));
  }
  return ctx.cache.get('cssData');
}

async function getCustomElements(ctx) {
  if (!ctx.cache.has('customElements')) {
    ctx.cache.set('customElements', await loadJson(ctx.files.customElements));
  }
  return ctx.cache.get('customElements');
}

async function getOntology(ctx) {
  if (!ctx.cache.has('ontology')) {
    const mod = await importModule(ctx.files.ontology);
    ctx.cache.set('ontology', mod.ontology || {});
  }
  return ctx.cache.get('ontology');
}

async function getEnhancerMeta(ctx) {
  if (!ctx.cache.has('enhancersMeta')) {
    const mod = await importModule(ctx.files.enhancersMeta);
    ctx.cache.set('enhancersMeta', mod.defaultPDSEnhancerMetadata || []);
  }
  return ctx.cache.get('enhancersMeta');
}

async function getConfigRelations(ctx) {
  if (!ctx.cache.has('configRelations')) {
    const mod = await importModule(ctx.files.config);
    ctx.cache.set('configRelations', mod.PDS_CONFIG_RELATIONS || {});
  }
  return ctx.cache.get('configRelations');
}

async function getQueryEngineClass(ctx) {
  if (!ctx.cache.has('queryEngineClass')) {
    const mod = await importModule(ctx.files.queryEngine);
    const queryEngineClass = mod?.PDSQuery || mod?.default || null;
    ctx.cache.set('queryEngineClass', queryEngineClass);
  }
  return ctx.cache.get('queryEngineClass');
}

function getPropertyValue(property) {
  return decodeDataTextUrl(property?.references?.find((r) => r.name === 'Value')?.url);
}

function buildCompiledFromCssData(cssData) {
  const compiled = {
    tokens: {
      colors: {},
      spacing: {},
      typography: {},
    },
  };

  for (const property of cssData.properties || []) {
    const name = String(property?.name || '');
    const value = getPropertyValue(property);
    if (!name) continue;

    if (name.startsWith('--color-')) {
      compiled.tokens.colors[name] = value;
    }

    if (name.startsWith('--spacing-')) {
      const key = name.replace('--spacing-', '').trim();
      if (key) compiled.tokens.spacing[key] = value || '';
    }

    if (name.startsWith('--font-')) {
      compiled.tokens.typography[name] = value;
    }
  }

  return compiled;
}

function shapeComponentDeclaration(declaration) {
  const pick = (items = [], mapper) => items.map(mapper).slice(0, 80);
  return {
    tagName: declaration.tagName,
    className: declaration.name,
    description: declaration.description || '',
    attributes: pick(declaration.attributes, (a) => ({
      name: a.name,
      type: a?.type?.text || null,
      description: a.description || '',
    })),
    events: pick(declaration.events, (e) => ({
      name: e.name,
      type: e?.type?.text || null,
      description: e.description || '',
    })),
    cssParts: pick(declaration.cssParts, (p) => ({ name: p.name, description: p.description || '' })),
    cssProperties: pick(declaration.cssProperties, (p) => ({ name: p.name, description: p.description || '' })),
    members: pick(declaration.members, (m) => ({
      name: m.name,
      kind: m.kind,
      type: m?.type?.text || null,
      description: m.description || '',
    })),
    slots: pick(declaration.slots, (s) => ({ name: s.name || '', description: s.description || '' })),
  };
}

async function handleGetTokens(ctx, args = {}) {
  const { contains = '', prefix = '', includeValues = true } = args;
  const limit = Math.min(Math.max(Number(args.limit || 40), 1), 200);
  const cssData = await getCssData(ctx);
  const needle = normalize(contains);
  const prefixNeedle = normalize(prefix);

  const matches = (cssData.properties || [])
    .filter((property) => {
      const name = normalize(property.name);
      const description = normalize(property.description);
      const prefixOk = !prefixNeedle || name.startsWith(prefixNeedle);
      const containsOk = !needle || name.includes(needle) || description.includes(needle);
      return prefixOk && containsOk;
    })
    .slice(0, limit)
    .map((property) => {
      const value = includeValues ? getPropertyValue(property) : null;
      return {
        name: property.name,
        description: property.description || '',
        syntax: property.syntax || '',
        value,
      };
    });

  return {
    ssoTRoot: normalizePath(ctx.ssoTRoot),
    source: normalizePath(path.relative(ctx.ssoTRoot, ctx.files.cssData)),
    totalMatches: matches.length,
    tokens: matches,
  };
}

async function handleFindUtilityClass(ctx, args = {}) {
  const { query = '', section = 'all' } = args;
  const limit = Math.min(Math.max(Number(args.limit || 30), 1), 100);
  const ontology = await getOntology(ctx);
  const needle = normalize(query);

  const buckets = [];
  if (section === 'all' || section === 'primitives') buckets.push(...(ontology.primitives || []));
  if (section === 'all' || section === 'components') buckets.push(...(ontology.components || []));
  if (section === 'all' || section === 'layoutPatterns') buckets.push(...(ontology.layoutPatterns || []));

  const matches = [];
  const classSet = new Set();

  for (const item of buckets) {
    const selectors = item.selectors || [];
    for (const selector of selectors) {
      const selectorText = String(selector);
      const matchTarget = `${item.name || ''} ${item.description || ''} ${selectorText}`.toLowerCase();
      if (needle && !matchTarget.includes(needle)) continue;
      matches.push({
        selector: selectorText,
        name: item.name || '',
        description: item.description || '',
        category: item.category || '',
        id: item.id || '',
      });

      const classes = getSelectorClasses(selectorText);
      for (const className of classes) classSet.add(className);
    }
  }

  return {
    ssoTRoot: normalizePath(ctx.ssoTRoot),
    source: normalizePath(path.relative(ctx.ssoTRoot, ctx.files.ontology)),
    totalMatches: matches.length,
    matches: matches.slice(0, limit),
    extractedClassesSample: [...classSet].slice(0, 80),
  };
}

async function handleQueryDesignSystem(ctx, args = {}) {
  const question = String(args.question || '').trim();
  if (!question) {
    throw new Error('The "question" argument is required.');
  }

  const [PDSQuery, ontology, cssData] = await Promise.all([
    getQueryEngineClass(ctx),
    getOntology(ctx),
    getCssData(ctx),
  ]);

  if (!PDSQuery) {
    throw new Error('Unable to load PDS query engine.');
  }

  const pseudoPds = {
    ontology,
    compiled: buildCompiledFromCssData(cssData),
  };

  const engine = new PDSQuery(pseudoPds);
  const results = await engine.search(question);

  return {
    ssoTRoot: normalizePath(ctx.ssoTRoot),
    source: {
      ontology: normalizePath(path.relative(ctx.ssoTRoot, ctx.files.ontology)),
      cssData: normalizePath(path.relative(ctx.ssoTRoot, ctx.files.cssData)),
      queryEngine: normalizePath(path.relative(ctx.ssoTRoot, ctx.files.queryEngine)),
    },
    question,
    totalMatches: results.length,
    results,
  };
}

async function handleGetComponentApi(ctx, args = {}) {
  const { tagName = '', contains = '' } = args;
  const limit = Math.min(Math.max(Number(args.limit || 10), 1), 50);
  const customElements = await getCustomElements(ctx);
  const tagNeedle = normalize(tagName);
  const textNeedle = normalize(contains);

  const declarations = [];
  for (const moduleEntry of customElements.modules || []) {
    for (const declaration of moduleEntry.declarations || []) {
      if (!declaration.customElement || !declaration.tagName) continue;
      const shaped = shapeComponentDeclaration(declaration);
      const hay = normalize(JSON.stringify(shaped));
      const tagOk = !tagNeedle || normalize(shaped.tagName) === tagNeedle || normalize(shaped.tagName).includes(tagNeedle);
      const textOk = !textNeedle || hay.includes(textNeedle);
      if (tagOk && textOk) declarations.push(shaped);
    }
  }

  return {
    ssoTRoot: normalizePath(ctx.ssoTRoot),
    source: normalizePath(path.relative(ctx.ssoTRoot, ctx.files.customElements)),
    totalMatches: declarations.length,
    components: declarations.slice(0, limit),
  };
}

async function handleGetEnhancerMetadata(ctx, args = {}) {
  const { selector = '', contains = '', includeDemoHtml = true } = args;
  const limit = Math.min(Math.max(Number(args.limit || 20), 1), 100);
  const list = await getEnhancerMeta(ctx);
  const selectorNeedle = normalize(selector);
  const textNeedle = normalize(contains);

  const matches = list
    .filter((item) => {
      const sel = normalize(item.selector);
      const hay = normalize(`${item.selector} ${item.description || ''} ${item.demoHtml || ''}`);
      const selectorOk = !selectorNeedle || sel.includes(selectorNeedle);
      const textOk = !textNeedle || hay.includes(textNeedle);
      return selectorOk && textOk;
    })
    .slice(0, limit)
    .map((item) => ({
      selector: item.selector,
      description: item.description || '',
      demoHtml: includeDemoHtml ? item.demoHtml || '' : undefined,
    }));

  return {
    ssoTRoot: normalizePath(ctx.ssoTRoot),
    source: normalizePath(path.relative(ctx.ssoTRoot, ctx.files.enhancersMeta)),
    totalMatches: matches.length,
    enhancers: matches,
  };
}

async function handleGetConfigRelations(ctx, args = {}) {
  const { pathPrefix = '', contains = '' } = args;
  const limit = Math.min(Math.max(Number(args.limit || 60), 1), 200);
  const relations = await getConfigRelations(ctx);
  const pathNeedle = normalize(pathPrefix);
  const textNeedle = normalize(contains);

  const entries = Object.entries(relations)
    .filter(([relationPath, payload]) => {
      const pathOk = !pathNeedle || normalize(relationPath).startsWith(pathNeedle);
      const textOk = !textNeedle || normalize(JSON.stringify(payload)).includes(textNeedle);
      return pathOk && textOk;
    })
    .slice(0, limit)
    .map(([relationPath, payload]) => ({ path: relationPath, relations: payload }));

  return {
    ssoTRoot: normalizePath(ctx.ssoTRoot),
    source: normalizePath(path.relative(ctx.ssoTRoot, ctx.files.config)),
    totalMatches: entries.length,
    relations: entries,
  };
}

async function handleValidateSnippet(ctx, args = {}) {
  const html = String(args.html || '');
  if (!html.trim()) {
    throw new Error('The "html" argument is required.');
  }

  const [ontology, cssData, customElements] = await Promise.all([
    getOntology(ctx),
    getCssData(ctx),
    getCustomElements(ctx),
  ]);

  const knownTokens = new Set((cssData.properties || []).map((p) => p.name));
  const knownComponents = new Set();
  for (const moduleEntry of customElements.modules || []) {
    for (const declaration of moduleEntry.declarations || []) {
      if (declaration.customElement && declaration.tagName) knownComponents.add(declaration.tagName);
    }
  }

  const knownClasses = new Set();
  for (const group of [ontology.primitives || [], ontology.layoutPatterns || [], ontology.components || []]) {
    for (const item of group) {
      for (const selector of item.selectors || []) {
        for (const className of getSelectorClasses(String(selector))) knownClasses.add(className);
      }
    }
  }

  const usedClasses = new Set();
  const classRegex = /class\s*=\s*['\"]([^'\"]+)['\"]/g;
  let classMatch = classRegex.exec(html);
  while (classMatch) {
    for (const className of classMatch[1].split(/\s+/).filter(Boolean)) {
      usedClasses.add(className.trim());
    }
    classMatch = classRegex.exec(html);
  }

  const usedTokens = new Set(html.match(/--[a-zA-Z0-9-]+/g) || []);

  const componentRegex = /<\s*(pds-[a-z0-9-]+)/gi;
  const usedComponents = new Set();
  let componentMatch = componentRegex.exec(html);
  while (componentMatch) {
    usedComponents.add(componentMatch[1].toLowerCase());
    componentMatch = componentRegex.exec(html);
  }

  const unknownClasses = [...usedClasses].filter((className) => !knownClasses.has(className));
  const unknownTokens = [...usedTokens].filter((token) => !knownTokens.has(token));
  const unknownComponents = [...usedComponents].filter((tag) => !knownComponents.has(tag));

  return {
    ssoTRoot: normalizePath(ctx.ssoTRoot),
    valid: unknownClasses.length === 0 && unknownTokens.length === 0 && unknownComponents.length === 0,
    unknown: {
      classes: unknownClasses.map((className) => ({
        name: className,
        suggestions: buildSuggestions([...knownClasses], className),
      })),
      tokens: unknownTokens.map((token) => ({
        name: token,
        suggestions: buildSuggestions([...knownTokens], token),
      })),
      components: unknownComponents.map((tag) => ({
        name: tag,
        suggestions: buildSuggestions([...knownComponents], tag),
      })),
    },
  };
}

const TOOL_HANDLERS = {
  get_tokens: handleGetTokens,
  find_utility_class: handleFindUtilityClass,
  query_design_system: handleQueryDesignSystem,
  get_component_api: handleGetComponentApi,
  get_enhancer_metadata: handleGetEnhancerMetadata,
  get_config_relations: handleGetConfigRelations,
  validate_pds_snippet: handleValidateSnippet,
};

export function getPdsMcpTools() {
  return getToolSchema();
}

export async function runPdsMcpTool(ctx, name, args = {}) {
  const handler = TOOL_HANDLERS[name];
  if (!handler) {
    throw new Error(`Unknown tool: ${name}`);
  }
  return handler(ctx, isObject(args) ? args : {});
}
