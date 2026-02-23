import { createImportResult } from "./import-contract.js";
import {
  buildTemplateImportResult,
  listLiveTemplates,
  loadLiveTemplateCatalog,
} from "./template-service.js";
import {
  convertTailwindHtmlToPds,
  convertBrandGuidelinesToPatch,
  inferPdsDesignFromHtml,
  convertHtmlLikeInputToPdsTemplate,
} from "./conversion-service.js";
import { validateDesign } from "../pds-core/pds-generator.js";

const IMPORT_MODE_CONVERT_ONLY = "convert-only";
const IMPORT_MODE_ADOPT_AND_CONVERT = "adopt-design-and-convert";

function normalizeImportMode(value) {
  const normalized = String(value || "").trim().toLowerCase();
  if (normalized === IMPORT_MODE_ADOPT_AND_CONVERT) return IMPORT_MODE_ADOPT_AND_CONVERT;
  return IMPORT_MODE_CONVERT_ONLY;
}

function combineIssues(...issueLists) {
  const items = issueLists.flat().filter(Boolean);
  if (!items.length) return [];
  const seen = new Set();
  return items.filter((issue) => {
    const key = `${String(issue?.severity || "info")}::${String(issue?.path || "")}::${String(issue?.message || "")}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function combineConfidence(values = []) {
  const list = values.map((value) => Number(value)).filter((value) => Number.isFinite(value));
  if (!list.length) return 0;
  return Math.max(0, Math.min(1, list.reduce((sum, value) => sum + value, 0) / list.length));
}

function mergeMeta(base = {}, extra = {}) {
  return {
    ...(base && typeof base === "object" ? base : {}),
    ...(extra && typeof extra === "object" ? extra : {}),
  };
}

function deepMerge(target = {}, source = {}) {
  if (!source || typeof source !== "object") return target;
  const out = Array.isArray(target) ? [...target] : { ...target };
  Object.entries(source).forEach(([key, value]) => {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      out[key] = deepMerge(
        out[key] && typeof out[key] === "object" ? out[key] : {},
        value
      );
    } else {
      out[key] = value;
    }
  });
  return out;
}

function cloneValue(value) {
  if (typeof structuredClone === "function") {
    try {
      return structuredClone(value);
    } catch (error) {}
  }
  return JSON.parse(JSON.stringify(value || {}));
}

function normalizeValidationIssue(issue = {}) {
  const ratio = Number(issue?.ratio);
  const min = Number(issue?.min);
  const ratioLabel = Number.isFinite(ratio) ? ratio.toFixed(2) : "n/a";
  const minLabel = Number.isFinite(min) ? min.toFixed(2) : "n/a";
  return {
    severity: "error",
    path: String(issue?.path || "/colors"),
    message: `${String(issue?.message || "Color contrast validation failed.")} (ratio=${ratioLabel}, required=${minLabel})`,
  };
}

function validateAdoptedDesignPatch(baseDesign = {}, designPatch = {}, options = {}) {
  const patchKeys = designPatch && typeof designPatch === "object" ? Object.keys(designPatch) : [];
  if (!patchKeys.length) {
    return { ok: true, blocked: false, issues: [], report: { ok: true, issues: [] } };
  }

  const minContrast = Number(options.minContrast);
  const threshold = Number.isFinite(minContrast) ? minContrast : 4.5;
  const mergedDesign = deepMerge(cloneValue(baseDesign || {}), cloneValue(designPatch || {}));
  const report = validateDesign(mergedDesign, {
    minContrast: threshold,
    minMutedContrast: 3,
    extendedChecks: true,
  });
  const issues = Array.isArray(report?.issues)
    ? report.issues.map((issue) => normalizeValidationIssue(issue))
    : [];

  return {
    ok: Boolean(report?.ok),
    blocked: !report?.ok,
    issues,
    report: {
      ok: Boolean(report?.ok),
      minContrast: threshold,
      issues: Array.isArray(report?.issues) ? report.issues : [],
    },
  };
}

export function getLiveImportSources() {
  return [
    { id: "template", name: "Templates" },
    { id: "tailwind-html", name: "Tailwind HTML" },
    { id: "brand-guidelines", name: "Brand Guidelines" },
    { id: "figma-json", name: "Figma Tokens JSON (planned)" },
    { id: "ux-pilot", name: "UX Pilot (planned)" },
    { id: "google-stitch", name: "Google Stitch (planned)" },
  ];
}

export async function runLiveImport(request = {}) {
  const sourceType = String(request.sourceType || "");
  const importMode = normalizeImportMode(request.importMode);
  const input = String(request.input || "");
  const config = request.config || null;

  if (sourceType === "template") {
    const result = buildTemplateImportResult(request.templateId, request);
    result.meta = mergeMeta(result.meta, { importMode });
    return result;
  }

  if (sourceType === "tailwind-html") {
    const conversionResult = convertTailwindHtmlToPds({ html: input, config });
    if (importMode === IMPORT_MODE_CONVERT_ONLY) {
      conversionResult.meta = mergeMeta(conversionResult.meta, { importMode });
      return conversionResult;
    }

    const inferred = inferPdsDesignFromHtml({ html: input, config, sourceType });
    const validation = validateAdoptedDesignPatch(config || {}, inferred.designPatch || {});
    const safeDesignPatch = validation.blocked ? {} : inferred.designPatch;
    const validationIssues = validation.blocked
      ? [
          {
            severity: "error",
            path: "/colors",
            message: "Import blocked: inferred design patch failed accessibility contrast validation.",
          },
          ...validation.issues,
        ]
      : [];

    return createImportResult({
      source: conversionResult.source || "tailwind",
      type: sourceType,
      confidence: combineConfidence([conversionResult.confidence, inferred.confidence]),
      issues: combineIssues(conversionResult.issues, inferred.issues, validationIssues),
      template: conversionResult.template,
      designPatch: safeDesignPatch,
      meta: mergeMeta(conversionResult.meta, {
        importMode,
        inference: inferred.meta,
        validation: validation.report,
        validationBlocked: validation.blocked,
      }),
    });
  }

  if (sourceType === "brand-guidelines") {
    const templateResult = convertHtmlLikeInputToPdsTemplate({ input, sourceType, config });
    if (importMode === IMPORT_MODE_CONVERT_ONLY) {
      templateResult.meta = mergeMeta(templateResult.meta, { importMode });
      return templateResult;
    }

    const heuristicPatch = convertBrandGuidelinesToPatch({ text: input });
    const inferred = inferPdsDesignFromHtml({ html: input, config, sourceType });
    const designPatch = {
      ...(heuristicPatch.designPatch && typeof heuristicPatch.designPatch === "object"
        ? heuristicPatch.designPatch
        : {}),
      ...(inferred.designPatch && typeof inferred.designPatch === "object" ? inferred.designPatch : {}),
    };
    const validation = validateAdoptedDesignPatch(config || {}, designPatch || {});
    const safeDesignPatch = validation.blocked ? {} : designPatch;
    const validationIssues = validation.blocked
      ? [
          {
            severity: "error",
            path: "/colors",
            message: "Import blocked: inferred design patch failed accessibility contrast validation.",
          },
          ...validation.issues,
        ]
      : [];

    return createImportResult({
      source: "brand",
      type: sourceType,
      confidence: combineConfidence([
        templateResult.confidence,
        heuristicPatch.confidence,
        inferred.confidence,
      ]),
      issues: combineIssues(
        templateResult.issues,
        heuristicPatch.issues,
        inferred.issues,
        validationIssues
      ),
      template: templateResult.template,
      designPatch: safeDesignPatch,
      meta: mergeMeta(templateResult.meta, {
        importMode,
        inference: inferred.meta,
        brandHeuristics: heuristicPatch.meta,
        validation: validation.report,
        validationBlocked: validation.blocked,
      }),
    });
  }

  if (sourceType === "figma-json" || sourceType === "ux-pilot" || sourceType === "google-stitch") {
    return createImportResult({
      source: sourceType,
      type: sourceType,
      confidence: 0,
      issues: [
        {
          severity: "info",
          message: `${sourceType} adapter is not implemented yet in this phase.`,
        },
      ],
      meta: { importMode },
    });
  }

  return createImportResult({
    source: sourceType || "unknown",
    type: "unknown",
    confidence: 0,
    issues: [{ severity: "error", message: "Unsupported import source type." }],
    meta: { importMode },
  });
}

export { listLiveTemplates };
export { loadLiveTemplateCatalog };
