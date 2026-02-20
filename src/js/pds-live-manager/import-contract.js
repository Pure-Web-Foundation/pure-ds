const DEFAULT_CONFIDENCE = 0.5;

function normalizeConfidence(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return DEFAULT_CONFIDENCE;
  return Math.max(0, Math.min(1, parsed));
}

function normalizeIssues(issues) {
  if (!Array.isArray(issues)) return [];
  return issues
    .map((issue) => {
      if (!issue) return null;
      const severity = String(issue.severity || "info").toLowerCase();
      return {
        severity,
        message: String(issue.message || ""),
        path: issue.path ? String(issue.path) : "",
      };
    })
    .filter((issue) => issue && issue.message);
}

export function createImportResult(input = {}) {
  const source = String(input.source || "unknown");
  const type = String(input.type || "generic");
  const confidence = normalizeConfidence(input.confidence);
  const issues = normalizeIssues(input.issues);
  const designPatch =
    input.designPatch && typeof input.designPatch === "object"
      ? input.designPatch
      : {};
  const template =
    input.template && typeof input.template === "object" ? input.template : null;

  return {
    source,
    type,
    confidence,
    issues,
    designPatch,
    template,
    meta: input.meta && typeof input.meta === "object" ? input.meta : {},
  };
}

export function isImportResult(value) {
  return Boolean(
    value &&
      typeof value === "object" &&
      "source" in value &&
      "type" in value &&
      "confidence" in value &&
      "issues" in value &&
      "designPatch" in value
  );
}
