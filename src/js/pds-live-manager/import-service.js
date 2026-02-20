import { createImportResult } from "./import-contract.js";
import {
  buildTemplateImportResult,
  listLiveTemplates,
  loadLiveTemplateCatalog,
} from "./template-service.js";
import {
  convertTailwindHtmlToPds,
  convertBrandGuidelinesToPatch,
} from "./conversion-service.js";

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

  if (sourceType === "template") {
    return buildTemplateImportResult(request.templateId, request);
  }

  if (sourceType === "tailwind-html") {
    return convertTailwindHtmlToPds({ html: request.input, config: request.config });
  }

  if (sourceType === "brand-guidelines") {
    return convertBrandGuidelinesToPatch({ text: request.input });
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
    });
  }

  return createImportResult({
    source: sourceType || "unknown",
    type: "unknown",
    confidence: 0,
    issues: [{ severity: "error", message: "Unsupported import source type." }],
  });
}

export { listLiveTemplates };
export { loadLiveTemplateCatalog };
