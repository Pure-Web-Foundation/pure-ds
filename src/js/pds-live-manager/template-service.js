import { createImportResult } from "./import-contract.js";

const CATALOG_RELATIVE_URL = "../templates/templates.json";
const CATALOG_ABSOLUTE_URL = "/assets/pds/templates/templates.json";
const NODE_CWD_CATALOG = ["public", "assets", "pds", "templates", "templates.json"];
const NODE_PACKAGE_CATALOG_RELATIVE = ["..", "..", "..", "public", "assets", "pds", "templates", "templates.json"];

let catalogCache = null;

function isNodeRuntime() {
  return Boolean(typeof process !== "undefined" && process?.versions?.node);
}

function normalizeTemplateMeta(template = {}) {
  return {
    id: String(template.id || "").trim(),
    name: String(template.name || template.id || "Template").trim(),
    description: String(template.description || "").trim(),
    icon: String(template.icon || "layout").trim(),
    file: String(template.file || "").trim(),
    tags: Array.isArray(template.tags) ? template.tags.map((item) => String(item)) : [],
  };
}

function normalizeCatalog(catalog = {}, sourceInfo = {}) {
  const templatesRaw = Array.isArray(catalog)
    ? catalog
    : Array.isArray(catalog?.templates)
      ? catalog.templates
      : [];

  const templates = templatesRaw
    .map(normalizeTemplateMeta)
    .filter((item) => item.id && item.file);

  return {
    version: catalog?.version || "1",
    templates,
    __catalogURL: sourceInfo.catalogURL || null,
    __catalogFilePath: sourceInfo.catalogFilePath || null,
  };
}

async function loadCatalogFromBrowser(options = {}) {
  const configuredUrl = options.catalogURL || globalThis?.PDS?.currentConfig?.templateCatalogURL;
  const candidates = [configuredUrl, CATALOG_RELATIVE_URL, CATALOG_ABSOLUTE_URL].filter(Boolean);

  for (const candidate of candidates) {
    try {
      const url = new URL(candidate, import.meta.url).href;
      const response = await fetch(url, { credentials: "same-origin" });
      if (!response.ok) continue;
      const json = await response.json();
      return normalizeCatalog(json, { catalogURL: url });
    } catch (error) {}
  }

  return normalizeCatalog({ templates: [] });
}

async function loadCatalogFromNode(options = {}) {
  const fsSpecifier = "node:fs/promises";
  const pathSpecifier = "node:path";
  const urlSpecifier = "node:url";
  const [{ readFile }, path, { fileURLToPath }] = await Promise.all([
    import(fsSpecifier),
    import(pathSpecifier),
    import(urlSpecifier),
  ]);

  const candidates = [];
  if (options.catalogPath) {
    candidates.push(path.resolve(options.catalogPath));
  }

  candidates.push(path.resolve(process.cwd(), ...NODE_CWD_CATALOG));

  const moduleDir = path.dirname(fileURLToPath(import.meta.url));
  candidates.push(path.resolve(moduleDir, ...NODE_PACKAGE_CATALOG_RELATIVE));

  for (const candidate of candidates) {
    try {
      const raw = await readFile(candidate, "utf8");
      const json = JSON.parse(raw);
      return normalizeCatalog(json, { catalogFilePath: candidate });
    } catch (error) {}
  }

  return normalizeCatalog({ templates: [] });
}

async function readTemplateHtml(template, catalog) {
  if (!template?.file) return "";

  if (!isNodeRuntime()) {
    const baseUrl = catalog?.__catalogURL || CATALOG_ABSOLUTE_URL;
    const templateUrl = new URL(template.file, baseUrl).href;
    const response = await fetch(templateUrl, { credentials: "same-origin" });
    if (!response.ok) {
      throw new Error(`Template file not found: ${template.file}`);
    }
    return (await response.text()).trim();
  }

  const fsSpecifier = "node:fs/promises";
  const pathSpecifier = "node:path";
  const [{ readFile }, path] = await Promise.all([
    import(fsSpecifier),
    import(pathSpecifier),
  ]);
  const baseDir = catalog?.__catalogFilePath ? path.dirname(catalog.__catalogFilePath) : path.resolve(process.cwd(), "public", "assets", "pds", "templates");
  const templatePath = path.resolve(baseDir, template.file);
  return (await readFile(templatePath, "utf8")).trim();
}

export async function loadLiveTemplateCatalog(options = {}) {
  if (catalogCache && !options.forceReload) return catalogCache;

  catalogCache = isNodeRuntime()
    ? await loadCatalogFromNode(options)
    : await loadCatalogFromBrowser(options);

  return catalogCache;
}

export async function listLiveTemplates(options = {}) {
  const catalog = await loadLiveTemplateCatalog(options);
  return catalog.templates.map(({ id, name, description, icon, file, tags }) => ({
    id,
    name,
    description,
    icon,
    file,
    tags,
  }));
}

export async function getLiveTemplateById(templateId, options = {}) {
  const catalog = await loadLiveTemplateCatalog(options);
  const template = catalog.templates.find((item) => item.id === templateId) || null;
  if (!template) return null;

  const html = await readTemplateHtml(template, catalog);
  return { ...template, html };
}

export async function buildTemplateImportResult(templateId, options = {}) {
  const template = await getLiveTemplateById(templateId, options);
  if (!template) {
    return createImportResult({
      source: "template",
      type: "template",
      confidence: 0,
      issues: [{ severity: "error", message: `Unknown template: ${templateId}` }],
    });
  }

  return createImportResult({
    source: "template",
    type: "template",
    confidence: 1,
    template: {
      id: template.id,
      name: template.name,
      html: template.html,
      icon: template.icon,
      description: template.description,
    },
  });
}
