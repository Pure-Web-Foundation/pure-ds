import { createImportResult } from "./import-contract.js";
import tailwindRulebookJson from "./tailwind-conversion-rules.json" with { type: "json" };
import { PDS } from "../pds.js";

const RULEBOOK_JSON_PATH = "src/js/pds-live-manager/tailwind-conversion-rules.json";
const BREAKPOINT_ORDER = ["base", "sm", "md", "lg", "xl", "2xl"];

function hydrateRulebook(rawRulebook = {}) {
  const ignoredPatterns = Array.isArray(rawRulebook.ignoredPatterns)
    ? rawRulebook.ignoredPatterns.map((rule) => ({
      ...rule,
      pattern: rule?.pattern instanceof RegExp ? rule.pattern : new RegExp(String(rule?.pattern || "")),
    }))
    : [];

  const nonPdsClassPatterns = Array.isArray(rawRulebook.nonPdsClassPatterns)
    ? rawRulebook.nonPdsClassPatterns.map((pattern) => (
      pattern instanceof RegExp ? pattern : new RegExp(String(pattern || ""))
    ))
    : [];

  return {
    ...rawRulebook,
    ignoredPatterns,
    nonPdsClassPatterns,
  };
}

export const TAILWIND_TO_PDS_RULES = hydrateRulebook(tailwindRulebookJson);
const RULEBOOK_VERSION = TAILWIND_TO_PDS_RULES.version || "tw2pds-layout-v4";

const DIRECT_MAP = new Map(
  TAILWIND_TO_PDS_RULES.directMappings.map((rule) => [rule.tw, rule])
);

const GAP_MAP = new Map(Object.entries(TAILWIND_TO_PDS_RULES.gapScaleMap || {}));

const MAX_WIDTH_MAP = new Map(Object.entries(TAILWIND_TO_PDS_RULES.maxWidthMap || {}));

const NON_PDS_CLASS_PATTERNS = TAILWIND_TO_PDS_RULES.nonPdsClassPatterns || [];

const TABLE_STRICT_TAGS = new Set(TAILWIND_TO_PDS_RULES.neverFallbackTags || []);

const IMPORT_STYLE_BASE_RULES = { ...(TAILWIND_TO_PDS_RULES.importStyleRules || {}) };

const TW_SIZE_SCALE = TAILWIND_TO_PDS_RULES.tailwindSizeScale || {};

const TW_SHADE_SCALE = Array.isArray(TAILWIND_TO_PDS_RULES.tailwindShadeScale)
  ? TAILWIND_TO_PDS_RULES.tailwindShadeScale.map((value) => String(value)).filter(Boolean)
  : ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"];

const DEFAULT_TW_SHADE = TW_SHADE_SCALE.includes(String(TAILWIND_TO_PDS_RULES.defaultTailwindShade || ""))
  ? String(TAILWIND_TO_PDS_RULES.defaultTailwindShade)
  : "500";

const DEFAULT_FONT_SCALE = 1.2;

const KNOWN_TW_PREFIXES = [
  "container",
  "grid",
  "flex",
  "gap",
  "space",
  "items",
  "justify",
  "content",
  "place",
  "self",
  "col",
  "row",
  "w",
  "h",
  "min",
  "max",
  "p",
  "m",
  "rounded",
  "border",
  "ring",
  "outline",
  "shadow",
  "bg",
  "text",
  "font",
  "leading",
  "tracking",
  "uppercase",
  "lowercase",
  "capitalize",
  "overflow",
  "whitespace",
  "truncate",
  "object",
  "aspect",
  "opacity",
  "blur",
  "backdrop",
  "transition",
  "duration",
  "ease",
  "delay",
  "animate",
  "hidden",
  "block",
  "inline",
  "absolute",
  "relative",
  "fixed",
  "sticky",
  "size",
];

function removeAttributeFromTagAttributes(attrs = "", name = "") {
  if (!attrs || !name) return attrs;
  const attrRegex = new RegExp(`\\s${name}\\s*=\\s*("[^"]*"|'[^']*'|[^\\s>]+)`, "gi");
  return String(attrs).replace(attrRegex, "");
}

function applyLabelNestingRule(sourceHtml = "", summary = null) {
  let html = String(sourceHtml || "");
  let nestingCount = 0;

  html = html.replace(
    /<label([^>]*?)\sfor\s*=\s*(["'])([^"']+)\2([^>]*)>([\s\S]*?)<\/label>\s*<(input)([^>]*?)\sid\s*=\s*(["'])([^"']+)\8([^>]*?)>/gi,
    (match, labelAttrsBefore, _q1, forValue, labelAttrsAfter, labelInner, inputTag, inputAttrsBefore, _q2, inputId, inputAttrsAfter) => {
      if (forValue !== inputId) return match;
      const nextLabelAttrs = removeAttributeFromTagAttributes(`${labelAttrsBefore || ""}${labelAttrsAfter || ""}`, "for");
      const inputMarkup = `<${inputTag}${inputAttrsBefore || ""} id="${inputId}"${inputAttrsAfter || ""}>`;
      nestingCount += 1;
      return `<label${nextLabelAttrs}>${labelInner}${inputMarkup}</label>`;
    }
  );

  html = html.replace(
    /<label([^>]*?)\sfor\s*=\s*(["'])([^"']+)\2([^>]*)>([\s\S]*?)<\/label>\s*<(select|textarea)([^>]*?)\sid\s*=\s*(["'])([^"']+)\8([^>]*)>([\s\S]*?)<\/\6>/gi,
    (match, labelAttrsBefore, _q1, forValue, labelAttrsAfter, labelInner, controlTag, controlAttrsBefore, _q2, controlId, controlAttrsAfter, controlInner) => {
      if (forValue !== controlId) return match;
      const nextLabelAttrs = removeAttributeFromTagAttributes(`${labelAttrsBefore || ""}${labelAttrsAfter || ""}`, "for");
      const controlMarkup = `<${controlTag}${controlAttrsBefore || ""} id="${controlId}"${controlAttrsAfter || ""}>${controlInner}</${controlTag}>`;
      nestingCount += 1;
      return `<label${nextLabelAttrs}>${labelInner}${controlMarkup}</label>`;
    }
  );

  if (summary && nestingCount > 0) {
    summary.labelNestingCount += nestingCount;
    addNote(summary, `Nested ${nestingCount} label/control pairs.`);
    recordRule(summary, "intent.form.nested-label");
  }

  return html;
}

function toImportClassName(token = "", breakpoint = "base") {
  const normalized = String(token || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "rule";

  const bpPart = breakpoint && breakpoint !== "base" ? `${breakpoint}-` : "";
  return `import-${bpPart}${normalized}`;
}

function registerImportStyle(summary, token, declaration, breakpoint = "base", pseudo = "") {
  if (!summary || !token || !declaration) return "";
  const className = toImportClassName(token, breakpoint);
  if (pseudo) {
    const pseudoBucketKey = `${breakpoint}|${pseudo}`;
    if (!summary.importPseudoStyles.has(pseudoBucketKey)) {
      summary.importPseudoStyles.set(pseudoBucketKey, new Map());
    }
    summary.importPseudoStyles.get(pseudoBucketKey).set(className, declaration);
  } else if (breakpoint === "base") {
    summary.importBaseStyles.set(className, declaration);
  } else {
    if (!summary.importResponsiveStyles.has(breakpoint)) {
      summary.importResponsiveStyles.set(breakpoint, new Map());
    }
    summary.importResponsiveStyles.get(breakpoint).set(className, declaration);
  }
  summary.importedStyleCount += 1;
  return className;
}

function normalizeArbitraryValue(raw = "") {
  return String(raw || "").trim().replace(/_/g, " ");
}

function isSafeCssValue(value = "") {
  if (!value) return false;
  if (/[;{}]/.test(value)) return false;
  return /^[-#(),.%/\sa-zA-Z0-9]+$/.test(value);
}

function resolveTailwindSizeValue(rawToken = "") {
  const token = String(rawToken || "").trim();
  if (!token) return null;

  const arbitrary = token.match(/^\[([^\]]+)\]$/);
  if (arbitrary) {
    const value = normalizeArbitraryValue(arbitrary[1]);
    return isSafeCssValue(value) ? value : null;
  }

  return TW_SIZE_SCALE[token] || null;
}

function resolveTwShade(shade = "") {
  const parsed = Number(shade);
  if (!Number.isFinite(parsed)) return DEFAULT_TW_SHADE;

  const exact = String(parsed);
  if (TW_SHADE_SCALE.includes(exact)) return exact;

  return TW_SHADE_SCALE.reduce((closest, candidate) => {
    const closestDistance = Math.abs(Number(closest) - parsed);
    const candidateDistance = Math.abs(Number(candidate) - parsed);
    return candidateDistance < closestDistance ? candidate : closest;
  }, DEFAULT_TW_SHADE);
}

function mapTailwindColorToPdsColorVar(family = "", shade = "500") {
  const twFamily = String(family || "").toLowerCase();
  const mappedShade = resolveTwShade(shade);

  if (["blue", "sky", "indigo", "cyan"].includes(twFamily)) {
    return `var(--color-primary-${mappedShade})`;
  }
  if (["purple", "violet", "fuchsia"].includes(twFamily)) {
    return `var(--color-accent-${mappedShade})`;
  }
  if (["green", "emerald", "lime", "teal"].includes(twFamily)) {
    return `var(--color-success-${mappedShade})`;
  }
  if (["yellow", "amber", "warning"].includes(twFamily)) {
    return `var(--color-warning-${mappedShade})`;
  }
  if (["red", "rose", "pink", "orange"].includes(twFamily)) {
    return `var(--color-danger-${mappedShade})`;
  }
  if (["slate", "gray", "zinc", "neutral", "stone"].includes(twFamily)) {
    return `var(--color-gray-${mappedShade})`;
  }

  return "";
}

function resolveArbitraryColorValue(raw = "") {
  const value = normalizeArbitraryValue(raw);
  if (!isSafeCssValue(value)) return "";
  if (/^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(value)) return value;
  if (/^(?:rgb|hsl)a?\([^)]*\)$/.test(value)) return value;
  return "";
}

function parseClassTokens(value = "") {
  return String(value || "")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);
}

function withClassInAttrs(attrs = "", className = "") {
  if (!className) return attrs;
  const text = String(attrs || "");
  const classMatch = text.match(/\sclass\s*=\s*(["'])(.*?)\1/i);
  if (!classMatch) {
    return `${text} class="${className}"`;
  }

  const quote = classMatch[1] || '"';
  const values = parseClassTokens(classMatch[2]);
  if (!values.includes(className)) values.push(className);
  const next = ` class=${quote}${values.join(" ")}${quote}`;
  return text.replace(classMatch[0], next);
}

function hasAttribute(attrs = "", attr = "") {
  if (!attr) return false;
  return new RegExp(`\\s${attr}\\s*=`, "i").test(String(attrs || ""));
}

function humanizeIconName(iconName = "") {
  const text = String(iconName || "").replace(/[-_]+/g, " ").trim();
  if (!text) return "Icon button";
  return text.replace(/(^|\s)([a-z])/g, (_m, pre, ch) => `${pre}${ch.toUpperCase()}`);
}

function normalizeIconOnlyButtons(sourceHtml = "", summary = null) {
  const input = String(sourceHtml || "");
  if (!input) return input;

  return input.replace(
    /<(button|a)([^>]*)>\s*(<pds-icon\b[^>]*><\/pds-icon>)\s*<\/\1>/gi,
    (fullMatch, tagName, attrs, iconMarkup) => {
      let nextAttrs = withClassInAttrs(attrs, "icon-only");
      if (!hasAttribute(nextAttrs, "aria-label")) {
        const iconNameMatch = String(iconMarkup).match(/\sicon\s*=\s*(["'])(.*?)\1/i);
        const iconName = iconNameMatch ? String(iconNameMatch[2] || "") : "";
        const label = humanizeIconName(iconName);
        nextAttrs += ` aria-label="${label}"`;
      }

      if (summary) {
        summary.intentHits += 1;
        recordRule(summary, "intent.component.button.icon-only-markup");
      }

      return `<${tagName}${nextAttrs}>${iconMarkup}</${tagName}>`;
    }
  );
}

function normalizeMetricTextParagraphs(sourceHtml = "", summary = null) {
  const input = String(sourceHtml || "");
  if (!input) return input;

  let convertedCount = 0;

  const output = input.replace(/<p([^>]*?)>([\s\S]*?)<\/p>/gi, (fullMatch, attrs, inner) => {
    const classMatch = String(attrs || "").match(/\sclass\s*=\s*(["'])(.*?)\1/i);
    if (!classMatch) return fullMatch;

    const classTokens = parseClassTokens(classMatch[2] || "");
    const hasImportText = classTokens.some((token) => /^import-text-/.test(String(token || "")));
    const isLikelyMetricLine = classTokens.includes("text-muted") || classTokens.some((token) => /^import-font-/.test(String(token || "")));
    if (!hasImportText || !isLikelyMetricLine) return fullMatch;

    convertedCount += 1;
    return `<div${attrs}>${inner}</div>`;
  });

  if (summary && convertedCount > 0) {
    summary.intentHits += 1;
    recordRule(summary, "intent.typography.metric-paragraph-to-div");
    addNote(summary, `Normalized ${convertedCount} metric text paragraph tag(s) to div.`);
  }

  return output;
}

function removeClassFromAttrs(attrs = "", className = "") {
  if (!className) return attrs;
  const text = String(attrs || "");
  const classMatch = text.match(/\sclass\s*=\s*(["'])(.*?)\1/i);
  if (!classMatch) return text;

  const quote = classMatch[1] || '"';
  const values = parseClassTokens(classMatch[2]).filter((token) => token !== className);
  if (values.length === 0) {
    return text.replace(classMatch[0], "");
  }

  const next = ` class=${quote}${values.join(" ")}${quote}`;
  return text.replace(classMatch[0], next);
}

function updateClassTokensInAttrs(attrs = "", mapper = (tokens) => tokens) {
  const text = String(attrs || "");
  const classMatch = text.match(/\sclass\s*=\s*(["'])(.*?)\1/i);
  if (!classMatch) return text;

  const quote = classMatch[1] || '"';
  const currentTokens = parseClassTokens(classMatch[2]);
  const nextTokensRaw = mapper(Array.from(currentTokens));
  const nextTokens = Array.isArray(nextTokensRaw)
    ? nextTokensRaw.filter(Boolean)
    : currentTokens;

  if (nextTokens.length === 0) {
    return text.replace(classMatch[0], "");
  }

  const next = ` class=${quote}${nextTokens.join(" ")}${quote}`;
  return text.replace(classMatch[0], next);
}

function normalizeMetricPairStackContainers(sourceHtml = "", summary = null) {
  const input = String(sourceHtml || "");
  if (!input) return input;

  let convertedCount = 0;

  const output = input.replace(
    /<(div|section|article|aside)([^>]*)>\s*<(p|div)([^>]*)>[\s\S]*?<\/\3>\s*<(p|div)([^>]*)>[\s\S]*?<\/\5>\s*<\/\1>/gi,
    (fullMatch, tag, attrs, firstTag, firstAttrs, secondTag, secondAttrs) => {
      const classMatch = String(attrs || "").match(/\sclass\s*=\s*(["'])(.*?)\1/i);
      if (!classMatch) return fullMatch;

      const containerClasses = parseClassTokens(classMatch[2]);
      if (!containerClasses.includes("stack-sm")) return fullMatch;

      const firstClassMatch = String(firstAttrs || "").match(/\sclass\s*=\s*(["'])(.*?)\1/i);
      const secondClassMatch = String(secondAttrs || "").match(/\sclass\s*=\s*(["'])(.*?)\1/i);
      if (!firstClassMatch || !secondClassMatch) return fullMatch;

      const firstClasses = parseClassTokens(firstClassMatch[2]);
      const secondClasses = parseClassTokens(secondClassMatch[2]);
      const hasMetricTypographyPair =
        firstClasses.some((token) => /^import-text-/.test(String(token || ""))) &&
        secondClasses.some((token) => /^import-text-/.test(String(token || "")));

      if (!hasMetricTypographyPair) return fullMatch;

      const nextAttrs = removeClassFromAttrs(attrs, "stack-sm");
      convertedCount += 1;
      return fullMatch.replace(`<${tag}${attrs}>`, `<${tag}${nextAttrs}>`);
    }
  );

  if (summary && convertedCount > 0) {
    summary.intentHits += 1;
    recordRule(summary, "intent.typography.metric-pair-no-stack");
    addNote(summary, `Removed stack-sm from ${convertedCount} metric text pair container(s).`);
  }

  return output;
}

function resolveTypographyFromConfig(configInput = {}) {
  if (!configInput || typeof configInput !== "object") return {};
  const directTypography = configInput.typography;
  if (directTypography && typeof directTypography === "object") {
    return directTypography;
  }
  const nestedTypography = configInput.design?.typography;
  if (nestedTypography && typeof nestedTypography === "object") {
    return nestedTypography;
  }
  return {};
}

function resolveFontScale(configInput = {}) {
  const typography = resolveTypographyFromConfig(configInput);
  const parsed = Number(typography.fontScale);
  if (!Number.isFinite(parsed)) return DEFAULT_FONT_SCALE;
  return Math.max(1, Math.min(2, parsed));
}

function resolveSemanticHeadingTag(sizeToken = "", fontScale = DEFAULT_FONT_SCALE) {
  const baseRankBySize = {
    "4xl": 1,
    "3xl": 2,
    "2xl": 3,
    xl: 4,
  };
  const baseRank = baseRankBySize[sizeToken];
  if (!baseRank) return "";

  const normalizedScale = Number.isFinite(Number(fontScale))
    ? Math.max(1, Math.min(2, Number(fontScale)))
    : DEFAULT_FONT_SCALE;
  const rankShift = Math.max(-1, Math.min(1, Math.round((normalizedScale - DEFAULT_FONT_SCALE) / 0.25)));
  const adjustedRank = baseRank - rankShift;
  if (adjustedRank < 1) return "h1";
  if (adjustedRank > 4) return "";
  return `h${adjustedRank}`;
}

function normalizeSemanticTypography(sourceHtml = "", summary = null, options = {}) {
  const input = String(sourceHtml || "");
  if (!input) return input;

  const fontScale = resolveFontScale(options.config || {});
  let headingCount = 0;
  let strongCount = 0;

  const output = input.replace(/<(p|div|span)([^>]*)>([\s\S]*?)<\/\1>/gi, (fullMatch, tag, attrs, inner) => {
    const classMatch = String(attrs || "").match(/\sclass\s*=\s*(["'])(.*?)\1/i);
    if (!classMatch) return fullMatch;

    const classTokens = parseClassTokens(classMatch[2]);
    const hasImportBold = classTokens.includes("import-font-bold");
    if (!hasImportBold) return fullMatch;

    const textSizeToken = classTokens.find((token) => /^import-text-(?:4xl|3xl|2xl|xl)$/.test(String(token || ""))) || "";
    const sizeMatch = textSizeToken.match(/^import-text-(4xl|3xl|2xl|xl)$/);

    if (sizeMatch) {
      const headingTag = resolveSemanticHeadingTag(sizeMatch[1], fontScale);
      if (!headingTag) {
        return fullMatch;
      }
      const nextAttrs = updateClassTokensInAttrs(attrs, (tokens) => (
        tokens.filter((token) => token !== "import-font-bold" && token !== textSizeToken)
      ));
      headingCount += 1;
      return `<${headingTag}${nextAttrs}>${inner}</${headingTag}>`;
    }

    const hasNestedBlock = /<\/?(?:div|p|section|article|aside|main|header|footer|ul|ol|li|table|tr|td|th|h[1-6])\b/i.test(inner);
    const alreadyStrong = /<\/?(?:strong|b)\b/i.test(inner);
    if (hasNestedBlock || alreadyStrong) return fullMatch;

    const nextAttrs = removeClassFromAttrs(attrs, "import-font-bold");
    strongCount += 1;
    return `<${tag}${nextAttrs}><strong>${inner}</strong></${tag}>`;
  });

  if (summary) {
    if (headingCount > 0) {
      summary.intentHits += 1;
      recordRule(summary, "intent.typography.semantic-heading-from-scale");
      addNote(summary, `Converted ${headingCount} bold display text node(s) to semantic heading tags (fontScale=${Number(fontScale).toFixed(2)}).`);
    }
    if (strongCount > 0) {
      summary.intentHits += 1;
      recordRule(summary, "intent.typography.bold-to-strong");
      addNote(summary, `Wrapped ${strongCount} bold text node(s) in strong tags.`);
    }
  }

  return output;
}

function resolvePseudoVariant(variants = []) {
  if (!Array.isArray(variants) || variants.length === 0) return "";
  const nonBreakpoint = variants.filter((variant) => !BREAKPOINT_ORDER.includes(variant));
  if (nonBreakpoint.length === 0) return "";
  if (nonBreakpoint.length > 1) return "";
  const candidate = nonBreakpoint[0];
  if (["hover", "focus", "active"].includes(candidate)) return candidate;
  return "";
}

function resolveImportStyleToken(baseToken, breakpoint = "base", variants = []) {
  const pseudo = resolvePseudoVariant(variants);
  const declaration = IMPORT_STYLE_BASE_RULES[baseToken];
  if (declaration) {
    return {
      declaration,
      breakpoint,
      pseudo,
      ruleId: "fallback.import-style",
    };
  }

  const gapMatch = String(baseToken).match(/^gap-(\d+)$/);
  if (gapMatch) {
    const gapScale = {
      0: "var(--spacing-0)",
      1: "var(--spacing-1)",
      2: "var(--spacing-2)",
      3: "var(--spacing-3)",
      4: "var(--spacing-4)",
      5: "var(--spacing-5)",
      6: "var(--spacing-6)",
      7: "var(--spacing-7)",
      8: "var(--spacing-8)",
      10: "var(--spacing-10)",
      12: "var(--spacing-12)",
    };
    const size = Number(gapMatch[1]);
    if (gapScale[size]) {
      return {
        declaration: `gap:${gapScale[size]}`,
        breakpoint,
        pseudo,
        ruleId: "fallback.import-style.gap-scale",
      };
    }
  }

  const marginMatch = String(baseToken).match(/^(mt|mb|my)-(.+)$/);
  if (marginMatch) {
    const axis = marginMatch[1];
    const rawValue = marginMatch[2];
    const value = resolveTailwindSizeValue(rawValue);
    if (value) {
      let marginDeclaration = "";
      if (axis === "mt") {
        marginDeclaration = `margin-top:${value}`;
      } else if (axis === "mb") {
        marginDeclaration = `margin-bottom:${value}`;
      } else {
        marginDeclaration = `margin-top:${value};margin-bottom:${value}`;
      }

      return {
        declaration: marginDeclaration,
        breakpoint,
        pseudo,
        ruleId: "fallback.import-style.margin-scale",
      };
    }
  }

  const minWidthArbitrary = String(baseToken).match(/^min-w-\[([^\]]+)\]$/);
  if (minWidthArbitrary) {
    const value = normalizeArbitraryValue(minWidthArbitrary[1]);
    if (isSafeCssValue(value)) {
      return {
        declaration: `min-width:${value}`,
        breakpoint,
        pseudo,
        ruleId: "fallback.import-style.min-width-arbitrary",
      };
    }
  }

  const maxWidthArbitrary = String(baseToken).match(/^max-w-\[([^\]]+)\]$/);
  if (maxWidthArbitrary) {
    const value = normalizeArbitraryValue(maxWidthArbitrary[1]);
    if (isSafeCssValue(value)) {
      return {
        declaration: `max-width:${value}`,
        breakpoint,
        pseudo,
        ruleId: "fallback.import-style.max-width-arbitrary",
      };
    }
  }

  const minHeightArbitrary = String(baseToken).match(/^min-h-\[([^\]]+)\]$/);
  if (minHeightArbitrary) {
    const value = normalizeArbitraryValue(minHeightArbitrary[1]);
    if (isSafeCssValue(value)) {
      return {
        declaration: `min-height:${value}`,
        breakpoint,
        pseudo,
        ruleId: "fallback.import-style.min-height-arbitrary",
      };
    }
  }

  const gridRowsArbitrary = String(baseToken).match(/^grid-rows-\[([^\]]+)\]$/);
  if (gridRowsArbitrary) {
    const value = normalizeArbitraryValue(gridRowsArbitrary[1]);
    if (isSafeCssValue(value)) {
      return {
        declaration: `grid-template-rows:${value}`,
        breakpoint,
        pseudo,
        ruleId: "fallback.import-style.grid-rows-arbitrary",
      };
    }
  }

  const sizeMatch = String(baseToken).match(/^size-(.+)$/);
  if (sizeMatch) {
    const value = resolveTailwindSizeValue(sizeMatch[1]);
    if (value) {
      return {
        declaration: `width:${value};height:${value}`,
        breakpoint,
        pseudo,
        ruleId: "fallback.import-style.size-scale",
      };
    }
  }

  const widthMatch = String(baseToken).match(/^w-(.+)$/);
  if (widthMatch) {
    const value = resolveTailwindSizeValue(widthMatch[1]);
    if (value) {
      return {
        declaration: `width:${value}`,
        breakpoint,
        pseudo,
        ruleId: "fallback.import-style.width-scale",
      };
    }
  }

  const heightMatch = String(baseToken).match(/^h-(.+)$/);
  if (heightMatch) {
    const value = resolveTailwindSizeValue(heightMatch[1]);
    if (value) {
      return {
        declaration: `height:${value}`,
        breakpoint,
        pseudo,
        ruleId: "fallback.import-style.height-scale",
      };
    }
  }

  const textSizeMap = {
    xs: "var(--font-size-xs)",
    sm: "var(--font-size-sm)",
    base: "var(--font-size-md)",
    lg: "var(--font-size-lg)",
    xl: "var(--font-size-xl)",
    "2xl": "var(--font-size-2xl)",
    "3xl": "var(--font-size-3xl)",
    "4xl": "var(--font-size-4xl)",
  };
  const textSizeMatch = String(baseToken).match(/^text-(xs|sm|base|lg|xl|2xl|3xl|4xl)$/);
  if (textSizeMatch) {
    const size = textSizeMap[textSizeMatch[1]];
    return {
      declaration: `font-size:${size}`,
      breakpoint,
      pseudo,
      ruleId: "fallback.import-style.text-size",
    };
  }

  const fontWeightMap = {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  };
  const fontWeightMatch = String(baseToken).match(/^font-(normal|medium|semibold|bold|extrabold|black)$/);
  if (fontWeightMatch) {
    return {
      declaration: `font-weight:${fontWeightMap[fontWeightMatch[1]]}`,
      breakpoint,
      pseudo,
      ruleId: "fallback.import-style.font-weight",
    };
  }

  const lineHeightMap = {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  };
  const lineHeightMatch = String(baseToken).match(/^leading-(none|tight|snug|normal|relaxed|loose)$/);
  if (lineHeightMatch) {
    return {
      declaration: `line-height:${lineHeightMap[lineHeightMatch[1]]}`,
      breakpoint,
      pseudo,
      ruleId: "fallback.import-style.line-height",
    };
  }

  const trackingMap = {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  };
  const trackingMatch = String(baseToken).match(/^tracking-(tighter|tight|normal|wide|wider|widest)$/);
  if (trackingMatch) {
    return {
      declaration: `letter-spacing:${trackingMap[trackingMatch[1]]}`,
      breakpoint,
      pseudo,
      ruleId: "fallback.import-style.tracking",
    };
  }

  const bgBlackAlphaMatch = String(baseToken).match(/^bg-black\/(\d{1,3})$/);
  if (bgBlackAlphaMatch) {
    const alpha = Math.max(0, Math.min(100, Number(bgBlackAlphaMatch[1])));
    return {
      declaration: `background-color:color-mix(in srgb, var(--color-gray-900) ${alpha}%, transparent)`,
      breakpoint,
      pseudo,
      ruleId: "fallback.import-style.overlay-alpha",
    };
  }

  if (baseToken === "text-white") {
    return {
      declaration: "color:var(--color-gray-50)",
      breakpoint,
      pseudo,
      ruleId: "fallback.import-style.text-inverse",
    };
  }

  const semanticBgMatch = String(baseToken).match(/^bg-(primary|secondary|accent)$/);
  if (semanticBgMatch) {
    const semanticBgVarMap = {
      primary: "var(--color-primary-fill)",
      secondary: "var(--color-gray-500)",
      accent: "var(--color-accent-500)",
    };
    const colorVar = semanticBgVarMap[semanticBgMatch[1]];
    if (colorVar) {
      return {
        declaration: `background-color:${colorVar}`,
        breakpoint,
        pseudo,
        ruleId: "fallback.import-style.bg-semantic",
      };
    }
  }

  const bgColorMatch = String(baseToken).match(/^bg-([a-z]+)-(\d{2,3})$/);
  if (bgColorMatch) {
    const colorVar = mapTailwindColorToPdsColorVar(bgColorMatch[1], bgColorMatch[2]);
    if (colorVar) {
      return {
        declaration: `background-color:${colorVar}`,
        breakpoint,
        pseudo,
        ruleId: "fallback.import-style.bg-tokenized",
      };
    }
  }

  const bgArbitraryMatch = String(baseToken).match(/^bg-\[([^\]]+)\]$/);
  if (bgArbitraryMatch) {
    const colorValue = resolveArbitraryColorValue(bgArbitraryMatch[1]);
    if (colorValue) {
      return {
        declaration: `background-color:${colorValue}`,
        breakpoint,
        pseudo,
        ruleId: "fallback.import-style.bg-arbitrary",
      };
    }
  }

  const textColorMatch = String(baseToken).match(/^text-([a-z]+)-(\d{2,3})$/);
  if (textColorMatch) {
    const colorVar = mapTailwindColorToPdsColorVar(textColorMatch[1], textColorMatch[2]);
    if (colorVar) {
      return {
        declaration: `color:${colorVar}`,
        breakpoint,
        pseudo,
        ruleId: "fallback.import-style.text-tokenized",
      };
    }
  }

  const textArbitraryMatch = String(baseToken).match(/^text-\[([^\]]+)\]$/);
  if (textArbitraryMatch) {
    const colorValue = resolveArbitraryColorValue(textArbitraryMatch[1]);
    if (colorValue) {
      return {
        declaration: `color:${colorValue}`,
        breakpoint,
        pseudo,
        ruleId: "fallback.import-style.text-arbitrary",
      };
    }
  }

  const roundedMatch = String(baseToken).match(/^rounded(?:-([trbl]{1,2}))?(?:-(none|xs|sm|md|lg|xl|2xl|3xl|full))?$/);
  if (roundedMatch) {
    const corner = roundedMatch[1] || "";
    const size = roundedMatch[2] || "sm";
    const radiusValue = size === "none" ? "0" : `var(--radius-${size})`;
    const cornerMap = {
      t: ["top-left", "top-right"],
      b: ["bottom-left", "bottom-right"],
      l: ["top-left", "bottom-left"],
      r: ["top-right", "bottom-right"],
      tl: ["top-left"],
      tr: ["top-right"],
      bl: ["bottom-left"],
      br: ["bottom-right"],
    };

    if (!corner) {
      return {
        declaration: `border-radius:${radiusValue}`,
        breakpoint,
        pseudo,
        ruleId: "fallback.import-style.rounded",
      };
    }

    const targets = cornerMap[corner] || [];
    const declarationText = targets
      .map((targetCorner) => `border-${targetCorner}-radius:${radiusValue}`)
      .join(";");

    if (declarationText) {
      return {
        declaration: declarationText,
        breakpoint,
        pseudo,
        ruleId: "fallback.import-style.rounded",
      };
    }
  }

  return null;
}

function formatBreakpointLength(value, fallbackPx) {
  if (typeof value === "number" && Number.isFinite(value)) return `${value}px`;
  if (typeof value === "string" && value.trim()) return value.trim();
  return `${fallbackPx}px`;
}

function resolveBreakpoints(configInput = {}) {
  const config = configInput?.design && typeof configInput.design === "object"
    ? configInput.design
    : configInput;

  const bp = config?.layout?.breakpoints || {};
  return {
    sm: formatBreakpointLength(bp.sm, 640),
    md: formatBreakpointLength(bp.md, 768),
    lg: formatBreakpointLength(bp.lg, 1024),
    xl: formatBreakpointLength(bp.xl, 1280),
  };
}

function generateImportStyleSheetText(summary, breakpoints) {
  const baseRules = Array.from(summary.importBaseStyles.entries()).map(
    ([className, declaration]) => `.${className}{${declaration};}`
  );

  const responsiveRules = [];
  for (const [bp, map] of summary.importResponsiveStyles.entries()) {
    const minWidth = breakpoints?.[bp];
    if (!minWidth || !map?.size) continue;
    const body = Array.from(map.entries())
      .map(([className, declaration]) => `.${className}{${declaration};}`)
      .join("\n");
    responsiveRules.push(`@media (min-width: ${minWidth}) {\n${body}\n}`);
  }

  for (const [bucketKey, map] of summary.importPseudoStyles.entries()) {
    const [bp, pseudo] = String(bucketKey).split("|");
    if (!pseudo || !map?.size) continue;
    const body = Array.from(map.entries())
      .map(([className, declaration]) => `.${className}:${pseudo}{${declaration};}`)
      .join("\n");
    if (!body) continue;
    if (bp === "base") {
      responsiveRules.push(body);
      continue;
    }
    const minWidth = breakpoints?.[bp];
    if (!minWidth) continue;
    responsiveRules.push(`@media (min-width: ${minWidth}) {\n${body}\n}`);
  }

  const allRules = [...baseRules, ...responsiveRules].filter(Boolean).join("\n");
  if (!allRules.trim()) return "";

  return [
    "/* pds-import: generated fallback styles for unmapped Tailwind utilities */",
    allRules,
  ].join("\n");
}

function injectImportStyleBlock(html = "", cssText = "") {
  if (!cssText || !cssText.trim()) return html;
  const styleBlock = `<style data-pds-import="tailwind-fallback">\n${cssText}\n</style>`;

  if (/<head[^>]*>/i.test(html)) {
    return html.replace(/<head([^>]*)>/i, `<head$1>\n${styleBlock}`);
  }

  return `${styleBlock}\n${html}`;
}

function isTailwindLike(token = "") {
  if (!token) return false;
  if (token.includes(":")) return true;
  if (token.includes("[")) return true;
  const firstSegment = token.split("-")[0];
  return KNOWN_TW_PREFIXES.includes(firstSegment);
}

function parseVariantToken(token = "") {
  const parts = String(token).split(":");
  if (parts.length === 1) {
    return { breakpoint: "base", base: parts[0], variants: [] };
  }
  const base = parts[parts.length - 1];
  const variants = parts.slice(0, -1);
  const breakpoint = variants.find((variant) => BREAKPOINT_ORDER.includes(variant)) || "base";
  return { breakpoint, base, variants };
}

function createConversionSummary() {
  return {
    totalTailwind: 0,
    mapped: 0,
    ignored: 0,
    policySkipped: 0,
    unknown: 0,
    intentHits: 0,
    unknownTokens: new Map(),
    notes: [],
    appliedRules: new Set(),
    importBaseStyles: new Map(),
    importResponsiveStyles: new Map(),
    importPseudoStyles: new Map(),
    importedStyleCount: 0,
    labelNestingCount: 0,
    removedAtomicSpacingCount: 0,
    removedAtomicPositioningCount: 0,
  };
}

function parseTailwindRuntimePreflightHints(cssText = "") {
  const compact = String(cssText || "")
    .toLowerCase()
    .replace(/\s+/g, "");

  const hasListReset =
    compact.includes("menu,ol,ul{list-style:none") ||
    compact.includes("ol,ul,menu{list-style:none") ||
    compact.includes("ul,ol,menu{list-style:none");

  const hasAnchorReset = compact.includes("a{color:inherit;text-decoration:inherit");

  return {
    listReset: hasListReset,
    anchorReset: hasAnchorReset,
  };
}

function parseTailwindRuntimeScriptHints(scriptSrc = "") {
  const src = String(scriptSrc || "").toLowerCase();
  const isTailwindCdn = src.includes("cdn.tailwindcss.com");
  if (!isTailwindCdn) {
    return {
      listReset: false,
      anchorReset: false,
    };
  }

  return {
    listReset: true,
    anchorReset: true,
  };
}

function extractTailwindRuntimeContext(sourceHtml = "", summary = null) {
  let html = String(sourceHtml || "");
  const hints = {
    listReset: false,
    anchorReset: false,
    strippedRuntimeCssBlocks: 0,
    strippedRuntimeScripts: 0,
  };

  html = html.replace(/<style([^>]*)>([\s\S]*?)<\/style>/gi, (fullMatch, attrs, cssBody) => {
    const cssText = String(cssBody || "");
    const isTailwindRuntime = /tailwindcss\s+v\d/i.test(cssText) || /\*\s*!\s*tailwindcss/i.test(cssText);
    if (!isTailwindRuntime) return fullMatch;

    const parsedHints = parseTailwindRuntimePreflightHints(cssText);
    hints.listReset = hints.listReset || parsedHints.listReset;
    hints.anchorReset = hints.anchorReset || parsedHints.anchorReset;
    hints.strippedRuntimeCssBlocks += 1;
    return "";
  });

  html = html.replace(
    /<script([^>]*?)src\s*=\s*(?:(['"])([^"']*cdn\.tailwindcss\.com[^"']*)\2|([^\s>]*cdn\.tailwindcss\.com[^\s>]*))([^>]*)><\/script>/gi,
    (_match, _before, _quote, quotedSrc, unquotedSrc) => {
      const scriptSrc = quotedSrc || unquotedSrc || "";
    const scriptHints = parseTailwindRuntimeScriptHints(scriptSrc);
    hints.listReset = hints.listReset || scriptHints.listReset;
    hints.anchorReset = hints.anchorReset || scriptHints.anchorReset;
    hints.strippedRuntimeScripts += 1;
    return "";
    }
  );

  if (summary && (hints.strippedRuntimeCssBlocks > 0 || hints.strippedRuntimeScripts > 0)) {
    recordRule(summary, "intent.preflight.tailwind-runtime-detected");
    if (hints.strippedRuntimeCssBlocks > 0) {
      addNote(
        summary,
        `Detected and stripped ${hints.strippedRuntimeCssBlocks} Tailwind runtime style block(s).`
      );
    }
  }

  if (summary && hints.strippedRuntimeScripts > 0) {
    addNote(
      summary,
      `Removed ${hints.strippedRuntimeScripts} Tailwind CDN script reference(s).`
    );
  }

  return { html, hints };
}

function addNote(summary, message) {
  if (!summary || !message) return;
  if (!summary.notes.includes(message)) {
    summary.notes.push(message);
  }
}

function addUnknownToken(summary, token) {
  const current = summary.unknownTokens.get(token) || 0;
  summary.unknownTokens.set(token, current + 1);
}

function resolveConversionPolicy(configInput = {}) {
  const config = configInput?.design && typeof configInput.design === "object"
    ? configInput.design
    : configInput;

  const utilities = config?.layout?.utilities || {};
  return {
    grid: utilities.grid !== false,
    flex: utilities.flex !== false,
    spacing: utilities.spacing !== false,
    container: utilities.container !== false,
  };
}

function allowsRule(policy, gate) {
  if (!gate) return true;
  return policy?.[gate] !== false;
}

function parseGridColumns(base) {
  const match = String(base).match(/^grid-cols-(\d+)$/);
  if (!match) return null;
  return Number(match[1]);
}

function chooseGridAutoClass(gridByBreakpoint = {}) {
  const values = BREAKPOINT_ORDER
    .map((bp) => ({ bp, cols: gridByBreakpoint[bp] }))
    .filter((entry) => Number.isFinite(entry.cols));

  if (values.length < 2) return null;

  if (values.length === 2) {
    const [first, second] = values;
    const isClassicOneToTwo = first.bp === "base" && first.cols === 1 && second.cols === 2;
    if (isClassicOneToTwo) return "grid-auto-lg";

    const isBaseSingleToExplicitBreakpoint =
      first.bp === "base" && first.cols === 1 && second.cols >= 3;
    if (isBaseSingleToExplicitBreakpoint) return null;

    if (first.cols < second.cols) {
      if (second.cols >= 4) return "grid-auto-md";
      if (second.cols >= 2) return "grid-auto-lg";
    }

    return null;
  }

  let strictlyIncreasing = true;
  for (let index = 1; index < values.length; index += 1) {
    if (values[index].cols <= values[index - 1].cols) {
      strictlyIncreasing = false;
      break;
    }
  }

  if (!strictlyIncreasing) return null;

  const largest = values[values.length - 1]?.cols || 0;
  if (largest >= 4) return "grid-auto-md";
  if (largest >= 3) return "grid-auto-sm";
  return null;
}

function mapNeutralTextColorToSemanticClass(baseToken = "") {
  const match = String(baseToken).match(/^text-(gray|slate|zinc|neutral|stone)-(\d{2,3})$/);
  if (!match) return "";
  const shade = Number(match[2]);
  if (!Number.isFinite(shade)) return "";
  if (shade >= 400 && shade <= 600) return "text-muted";
  return "";
}

function resolveResponsiveGridUtilityClass(breakpoint = "", cols = 0) {
  if (!breakpoint || !Number.isFinite(cols)) return "";
  const map = {
    sm: {
      2: "sm:grid-cols-2",
    },
    md: {
      3: "md:grid-cols-3",
    },
    lg: {
      4: "lg:grid-cols-4",
    },
  };
  return map?.[breakpoint]?.[cols] || "";
}

function mapSpaceYTokenToStackClass(token = "") {
  const parsed = parseVariantToken(token);
  const base = String(parsed?.base || "");
  const sizeMatch = base.match(/^space-y-(\d+)$/);
  if (!sizeMatch) return "stack-md";

  const step = Number(sizeMatch[1]);
  if (!Number.isFinite(step)) return "stack-md";
  if (step <= 1) return "stack-xs";
  if (step <= 2) return "stack-sm";
  if (step <= 4) return "stack-md";
  return "stack-lg";
}

function hasGapUtilityClass(mapped = new Set()) {
  return Array.from(mapped).some((className) => {
    const value = String(className || "");
    return (
      /^gap-(?:xs|sm|md|lg|xl)$/.test(value) ||
      /^gap-[0-9]+$/.test(value) ||
      /^import-(?:sm-|md-|lg-|xl-)?gap-/.test(value)
    );
  });
}

function hasStackUtilityClass(mapped = new Set()) {
  return Array.from(mapped).some((className) => /^stack-(?:xs|sm|md|lg|xl)$/.test(String(className || "")));
}

function hasGridSizingClass(mapped = new Set()) {
  return Array.from(mapped).some((className) => {
    const value = String(className || "");
    return (
      /^grid-cols-\d+$/.test(value) ||
      /^grid-auto-(?:sm|md|lg|xl)$/.test(value) ||
      /^(?:sm|md|lg|xl):grid-cols-\d+$/.test(value) ||
      /^import-(?:sm-|md-|lg-|xl-)?grid-cols-\d+$/.test(value)
    );
  });
}

function listTopUnknownTokens(summary, limit = 12) {
  return Array.from(summary.unknownTokens.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([token]) => token);
}

function recordRule(summary, ruleId) {
  if (!summary || !ruleId) return;
  summary.appliedRules.add(ruleId);
}

function hasToken(sourceTokens = [], pattern) {
  if (!Array.isArray(sourceTokens) || !pattern) return false;
  return sourceTokens.some((token) => pattern.test(String(token)));
}

function parseTailwindButtonHeight(sourceTokens = []) {
  for (const token of sourceTokens) {
    const parsed = parseVariantToken(token);
    if (parsed.breakpoint !== "base") continue;
    const match = String(parsed.base).match(/^h-(.+)$/);
    if (!match) continue;
    const value = resolveTailwindSizeValue(match[1]);
    if (!value || value === "auto") continue;
    const pxMatch = String(value).match(/^(-?\d+(?:\.\d+)?)rem$/);
    if (pxMatch) {
      const rem = Number(pxMatch[1]);
      if (Number.isFinite(rem)) return rem * 16;
    }
  }
  return null;
}

function detectButtonIntent(sourceTokens = [], tagName = "") {
  const isNativeButton = tagName === "button";
  const hasBgSignal = hasToken(sourceTokens, /^bg-/);
  const hasHoverBgSignal = hasToken(sourceTokens, /^hover:bg-/);
  const hasBorderSignal = hasToken(sourceTokens, /^border/);
  const hasShadowSignal = hasToken(sourceTokens, /^shadow/);
  const hasCursorPointer = sourceTokens.includes("cursor-pointer");
  const hasRoundedSignal = hasToken(sourceTokens, /^rounded/);
  const hasWidthSignal = hasToken(sourceTokens, /^(?:min-w|max-w|w)-/);
  const hasTextColorSignal = hasToken(sourceTokens, /^text-(?:white|black|\[[^\]]+\]|[a-z]+-\d{2,3})$/);
  const hasCtaSignal = hasBgSignal || hasHoverBgSignal || hasShadowSignal;
  const isAnchorButtonLike =
    tagName === "a" &&
    (hasCtaSignal || hasBorderSignal || hasCursorPointer || (hasRoundedSignal && hasWidthSignal));

  const shouldNormalize = isNativeButton || isAnchorButtonLike;
  if (!shouldNormalize) {
    return {
      shouldNormalize: false,
      variant: "none",
      size: "base",
      iconOnly: false,
    };
  }

  let variant = "none";
  if (hasBorderSignal && !hasBgSignal && !hasHoverBgSignal) {
    variant = "outline";
  } else if (hasCtaSignal || (hasBgSignal && hasTextColorSignal)) {
    variant = "primary";
  }

  const hasCompactIconSignal =
    sourceTokens.includes("rounded-full") &&
    (sourceTokens.includes("p-2") || sourceTokens.includes("p-1") || sourceTokens.includes("p-2.5"));
  const hasIconSizeSignal = hasToken(sourceTokens, /^size-(?:6|7|8|9|10|11|12)$/);
  const iconOnly = hasCompactIconSignal || hasIconSizeSignal;

  const buttonHeightPx = parseTailwindButtonHeight(sourceTokens);
  const hasSmallText = sourceTokens.includes("text-sm") || sourceTokens.includes("text-xs");
  const hasLargeText = sourceTokens.includes("text-lg") || sourceTokens.includes("text-xl");

  let size = "base";
  if ((buttonHeightPx && buttonHeightPx <= 40) || hasSmallText) {
    size = "sm";
  } else if ((buttonHeightPx && buttonHeightPx >= 48) || hasLargeText) {
    size = "lg";
  }

  return {
    shouldNormalize: true,
    variant,
    size,
    iconOnly,
  };
}

function mapBadgeVariantFromColorFamily(family = "") {
  const key = String(family || "").toLowerCase();
  if (["green", "emerald", "lime", "teal"].includes(key)) return "badge-success";
  if (["blue", "sky", "cyan", "indigo"].includes(key)) return "badge-info";
  if (["yellow", "amber", "orange"].includes(key)) return "badge-warning";
  if (["red", "rose", "pink"].includes(key)) return "badge-danger";
  if (["gray", "slate", "zinc", "neutral", "stone"].includes(key)) return "badge-secondary";
  if (["purple", "violet", "fuchsia", "primary", "accent"].includes(key)) return "badge-primary";
  return "badge-secondary";
}

function detectBadgeIntent(sourceTokens = [], tagName = "", buttonIntent = { shouldNormalize: false }) {
  if (buttonIntent?.shouldNormalize) {
    return {
      shouldNormalize: false,
      variantClass: "",
      outline: false,
      sizeClass: "",
      pastel: null,
    };
  }

  if (["button", "a", "input", "select", "textarea"].includes(tagName)) {
    return {
      shouldNormalize: false,
      variantClass: "",
      outline: false,
      sizeClass: "",
      pastel: null,
    };
  }

  if (sourceTokens.some((token) => /^badge(?:-|$)/.test(String(token)))) {
    return {
      shouldNormalize: false,
      variantClass: "",
      outline: false,
      sizeClass: "",
      pastel: null,
    };
  }

  const baseTokens = sourceTokens
    .map((token) => parseVariantToken(token))
    .filter((parsed) => parsed.breakpoint === "base")
    .map((parsed) => String(parsed.base));

  const hasRounded = baseTokens.some((token) => /^rounded(?:-|$)/.test(token));
  const hasPx = baseTokens.some((token) => /^px-/.test(token));
  const hasPy = baseTokens.some((token) => /^py-/.test(token));
  const hasCompactPadding = hasPx && hasPy;
  const hasSmallText = baseTokens.includes("text-xs") || baseTokens.includes("text-sm");
  const hasLargeText = baseTokens.includes("text-lg") || baseTokens.includes("text-xl");

  const bgMatch = baseTokens
    .map((token) => token.match(/^bg-([a-z]+)-(\d{2,3})(?:\/\d{1,3})?$/))
    .find(Boolean);
  const textMatch = baseTokens
    .map((token) => token.match(/^text-([a-z]+)-(\d{2,3})(?:\/\d{1,3})?$/))
    .find(Boolean);
  const borderMatch = baseTokens
    .map((token) => token.match(/^border-([a-z]+)-(\d{2,3})$/))
    .find(Boolean);

  const bgShade = Number(bgMatch?.[2]);
  const textShade = Number(textMatch?.[2]);
  const hasBgTone = Boolean(bgMatch && Number.isFinite(bgShade) && bgShade <= 300);
  const hasBorder = baseTokens.some((token) => /^border(?:-|$)/.test(token));
  const hasStatusColorSignal = Boolean(bgMatch || textMatch || borderMatch);

  const confidenceSignals = [hasRounded, hasCompactPadding, hasSmallText, hasBgTone || hasBorder].filter(Boolean).length;
  const shouldNormalize = hasStatusColorSignal && confidenceSignals >= 3;
  if (!shouldNormalize) {
    return {
      shouldNormalize: false,
      variantClass: "",
      outline: false,
      sizeClass: "",
      pastel: null,
    };
  }

  const family = (bgMatch && bgMatch[1]) || (textMatch && textMatch[1]) || (borderMatch && borderMatch[1]) || "";
  const mappedVariantClass = mapBadgeVariantFromColorFamily(family);
  const outline = hasBorder && !hasBgTone;
  const sizeClass = hasSmallText ? "badge-sm" : hasLargeText ? "badge-lg" : "";
  const pastel = hasBgTone
    ? {
        family,
        bgShade: Number.isFinite(bgShade) ? bgShade : 200,
        textShade: Number.isFinite(textShade) ? textShade : 700,
      }
    : null;
  const variantClass = pastel ? "" : mappedVariantClass;

  return {
    shouldNormalize: true,
    variantClass,
    outline,
    sizeClass,
    pastel,
  };
}

function mapTailwindBgFamilyToSurfaceClass(family = "", shade = 0) {
  const key = String(family || "").toLowerCase();
  const numericShade = Number(shade);

  if (key === "white") return "surface-base";
  if (["gray", "slate", "zinc", "neutral", "stone"].includes(key)) {
    if (Number.isFinite(numericShade) && numericShade <= 100) return "surface-base";
    return "surface-subtle";
  }
  if (["blue", "sky", "cyan", "indigo", "primary", "info"].includes(key)) return "surface-info";
  if (["purple", "violet", "fuchsia", "accent"].includes(key)) return "surface-primary";
  if (["green", "emerald", "lime", "teal", "success"].includes(key)) return "surface-success";
  if (["yellow", "amber", "orange", "warning"].includes(key)) return "surface-warning";
  if (["red", "rose", "pink", "danger"].includes(key)) return "surface-danger";
  return "surface-base";
}

function detectCardIntent(sourceTokens = [], tagName = "", buttonIntent = { shouldNormalize: false }, badgeIntent = { shouldNormalize: false }) {
  if (buttonIntent?.shouldNormalize || badgeIntent?.shouldNormalize) {
    return {
      shouldNormalize: false,
      cardVariantClass: "",
      surfaceClass: "",
    };
  }

  const validTags = new Set(["div", "section", "article", "aside", "li"]);
  if (!validTags.has(tagName)) {
    return {
      shouldNormalize: false,
      cardVariantClass: "",
      surfaceClass: "",
    };
  }

  if (sourceTokens.some((token) => /^card(?:-|$)/.test(String(token)))) {
    return {
      shouldNormalize: false,
      cardVariantClass: "",
      surfaceClass: "",
    };
  }

  const baseTokens = sourceTokens
    .map((token) => parseVariantToken(token))
    .filter((parsed) => parsed.breakpoint === "base")
    .map((parsed) => String(parsed.base));

  const hasRounded = baseTokens.some((token) => /^rounded(?:-|$)/.test(token));
  const hasBorder = baseTokens.some((token) => /^border(?:$|-)/.test(token));
  const hasShadow = baseTokens.some((token) => /^shadow(?:$|-)/.test(token));
  const hasPadding = baseTokens.some((token) => /^(?:p|px|py|pt|pb|pl|pr)-/.test(token));
  const bgMatch = baseTokens
    .map((token) => token.match(/^bg-([a-z]+)-?(\d{2,3})?$/))
    .find(Boolean);
  const hasBackground = baseTokens.includes("bg-white") || Boolean(bgMatch);

  const confidenceSignals = [hasRounded, hasBorder || hasShadow, hasBackground, hasPadding].filter(Boolean).length;
  const shouldNormalize = confidenceSignals >= 3;
  if (!shouldNormalize) {
    return {
      shouldNormalize: false,
      cardVariantClass: "",
      surfaceClass: "",
    };
  }

  let cardVariantClass = "card-basic";
  if (hasShadow) {
    cardVariantClass = "card-elevated";
  } else if (hasBorder) {
    cardVariantClass = "card-outlined";
  }

  let surfaceClass = "";
  if (hasShadow) {
    surfaceClass = "surface-elevated";
  } else if (bgMatch) {
    surfaceClass = mapTailwindBgFamilyToSurfaceClass(bgMatch[1], bgMatch[2]);
  } else if (hasBackground) {
    surfaceClass = "surface-base";
  }

  return {
    shouldNormalize: true,
    cardVariantClass,
    surfaceClass,
  };
}

function buildClassReplacement({
  tagName,
  originalClassValue,
  policy,
  summary,
  preflightHints = {},
}) {
  if (TABLE_STRICT_TAGS.has(tagName)) {
    recordRule(summary, "table.strict-tags.no-classes");
    return "";
  }

  const sourceTokens = String(originalClassValue)
    .split(/\s+/)
    .filter(Boolean);

  const buttonIntent = detectButtonIntent(sourceTokens, tagName);
  const badgeIntent = detectBadgeIntent(sourceTokens, tagName, buttonIntent);
  const cardIntent = detectCardIntent(sourceTokens, tagName, buttonIntent, badgeIntent);
  const isHeadingTag = /^h[1-6]$/.test(tagName);
  const isIconLikeElement =
    ["i", "svg"].includes(tagName) ||
    sourceTokens.some((token) => /^fa(?:[a-z-]+)?$/i.test(String(token || "")) || /^fa-/.test(String(token || "")));

  const mapped = new Set();
  const gridByBreakpoint = {};
  const flexByBreakpoint = {};
  let sawSpaceY = false;
  let firstSpaceYToken = "";
  let firstSpaceYStackClass = "";
  let sawSpaceX = false;
  let firstSpaceXToken = "";

  sourceTokens.forEach((token) => {
    const parsed = parseVariantToken(token);
    const base = parsed.base;

    if (NON_PDS_CLASS_PATTERNS.some((pattern) => pattern.test(base))) {
      summary.ignored += 1;
      recordRule(summary, "cleanup.non-pds-class");
      return;
    }

    const isTwToken = isTailwindLike(token) || isTailwindLike(base);

    if (isTwToken) {
      summary.totalTailwind += 1;
    }

    if (/^space-y-/.test(base)) {
      sawSpaceY = true;
      firstSpaceYToken = firstSpaceYToken || token;
      firstSpaceYStackClass = firstSpaceYStackClass || mapSpaceYTokenToStackClass(token);
      summary.ignored += 1;
      recordRule(summary, "layout.spacing.space-y-to-stack");
      return;
    }

    if (/^space-x-/.test(base)) {
      const sizeMatch = String(base).match(/^space-x-(\d+)$/);
      if (sizeMatch) {
        const twGapToken = `gap-${sizeMatch[1]}`;
        const mappedGap = GAP_MAP.get(twGapToken);
        if (mappedGap && allowsRule(policy, "spacing")) {
          mapped.add(mappedGap);
          sawSpaceX = true;
          firstSpaceXToken = firstSpaceXToken || token;
          summary.mapped += 1;
          summary.intentHits += 1;
          recordRule(summary, "layout.spacing.space-x-to-gap");
          return;
        }
      }
      summary.ignored += 1;
      recordRule(summary, "style.spacing.atomic");
      return;
    }

    if (/^grid-cols-\d+$/.test(base) && parsed.breakpoint !== "base") {
      const cols = parseGridColumns(base);
      if (Number.isFinite(cols) && allowsRule(policy, "grid")) {
        gridByBreakpoint[parsed.breakpoint] = cols;
        summary.mapped += 1;
        recordRule(summary, "intent.layout.responsive-grid-to-auto");
        return;
      }
      if (!allowsRule(policy, "grid")) {
        summary.policySkipped += 1;
        addNote(summary, "Skipped responsive grid mapping because layout.utilities.grid=false.");
        return;
      }
    }

    if (/^flex-(?:row|col)$/.test(base) && parsed.breakpoint !== "base") {
      if (allowsRule(policy, "flex")) {
        flexByBreakpoint[parsed.breakpoint] = base;
        summary.mapped += 1;
        recordRule(summary, "intent.layout.mobile-stack");
        return;
      }
      summary.policySkipped += 1;
      addNote(summary, "Skipped responsive flex mapping because layout.utilities.flex=false.");
      return;
    }

    if (/^grid-cols-\d+$/.test(base) && parsed.breakpoint === "base") {
      const cols = parseGridColumns(base);
      if (Number.isFinite(cols) && allowsRule(policy, "grid")) {
        gridByBreakpoint.base = cols;
      }
    }

    const directRule = DIRECT_MAP.get(base);
    if (directRule && parsed.breakpoint === "base") {
      if (!allowsRule(policy, directRule.gate)) {
        summary.policySkipped += 1;
        addNote(summary, `Skipped ${base} because layout.utilities.${directRule.gate}=false.`);
        return;
      }
      directRule.pds.forEach((nextClass) => {
        if (nextClass) mapped.add(nextClass);
      });
      summary.mapped += 1;
      recordRule(summary, directRule.id);
      return;
    }

    if (GAP_MAP.has(base) && parsed.breakpoint === "base") {
      if (!allowsRule(policy, "spacing")) {
        summary.policySkipped += 1;
        addNote(summary, "Skipped gap utility because layout.utilities.spacing=false.");
        return;
      }
      mapped.add(GAP_MAP.get(base));
      summary.mapped += 1;
      recordRule(summary, "layout.spacing.gap-scale");
      return;
    }

    if (MAX_WIDTH_MAP.has(base) && parsed.breakpoint === "base") {
      if (!allowsRule(policy, "container")) {
        summary.policySkipped += 1;
        addNote(summary, "Skipped max-width utility because layout.utilities.container=false.");
        return;
      }
      mapped.add(MAX_WIDTH_MAP.get(base));
      summary.mapped += 1;
      recordRule(summary, "layout.container.max-width");
      return;
    }

    if (buttonIntent.shouldNormalize && isTwToken) {
      const parsedBase = String(base || "");

      if (parsed.breakpoint === "base" && ["flex-1", "grow", "flex-grow"].includes(parsedBase)) {
        mapped.add("grow");
        summary.mapped += 1;
        summary.intentHits += 1;
        recordRule(summary, "intent.component.button.layout-grow");
        return;
      }

      const buttonStyleTokenPattern =
        /^(?:bg-|text-(?!center$|left$|right$)|font-|leading-|tracking-|rounded|ring|border|shadow|outline|transition|duration|ease|delay|animate|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|w-|h-|min-|max-|size-|overflow)/;
      const skipNonStructuralButtonToken =
        buttonStyleTokenPattern.test(parsedBase) || parsedBase.startsWith("hover:");

      if (skipNonStructuralButtonToken) {
        summary.ignored += 1;
        recordRule(summary, "intent.component.button.normalize");
        return;
      }
    }

    if (isHeadingTag) {
      const headingTypographyOrColorPattern =
        /^(?:text-(?:xs|sm|base|lg|xl|\dxl|white|black|\[[^\]]+\]|[a-z]+-\d{2,3})|font-|leading-|tracking-|uppercase|lowercase|capitalize)/;
      if (headingTypographyOrColorPattern.test(base)) {
        summary.ignored += 1;
        summary.intentHits += 1;
        recordRule(summary, "intent.typography.heading-semantic");
        return;
      }
    }

    if (badgeIntent.shouldNormalize && isTwToken) {
      const parsedBase = String(base || "");
      const badgeStyleTokenPattern =
        /^(?:bg-|text-(?!center$|left$|right$)|font-|leading-|tracking-|rounded|ring|border|shadow|outline|transition|duration|ease|delay|animate|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|w-|h-|min-|max-|size-|overflow)/;
      if (badgeStyleTokenPattern.test(parsedBase) || parsedBase.startsWith("hover:")) {
        summary.ignored += 1;
        recordRule(summary, "intent.component.badge.normalize");
        return;
      }
    }

    if (cardIntent.shouldNormalize && isTwToken) {
      const parsedBase = String(base || "");
      const cardStyleTokenPattern =
        /^(?:bg-|text-(?!center$|left$|right$)|font-|leading-|tracking-|rounded|ring|border|shadow|outline|transition|duration|ease|delay|animate|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr)/;
      if (cardStyleTokenPattern.test(parsedBase) || parsedBase.startsWith("hover:")) {
        summary.ignored += 1;
        recordRule(summary, "intent.component.card.normalize");
        return;
      }
    }

    const neutralTextSemanticClass = mapNeutralTextColorToSemanticClass(base);
    if (neutralTextSemanticClass && parsed.breakpoint === "base") {
      mapped.add(neutralTextSemanticClass);
      summary.mapped += 1;
      summary.intentHits += 1;
      recordRule(summary, "intent.typography.text-neutral-to-muted");
      return;
    }

    const isTextColorToken = /^text-(?:white|black|[a-z]+-\d{2,3}|\[[^\]]+\])$/.test(base);
    if (isTextColorToken) {
      const shouldPreserveColorUtility =
        isIconLikeElement ||
        (tagName === "a" && !buttonIntent.shouldNormalize);

      if (shouldPreserveColorUtility) {
        const iconColorImportStyle = resolveImportStyleToken(base, parsed.breakpoint, parsed.variants);
        if (iconColorImportStyle) {
          const className = registerImportStyle(
            summary,
            `${tagName}-color-${base}`,
            iconColorImportStyle.declaration,
            iconColorImportStyle.breakpoint,
            iconColorImportStyle.pseudo
          );
          if (className) {
            mapped.add(className);
            summary.mapped += 1;
            summary.intentHits += 1;
            recordRule(summary, isIconLikeElement ? "intent.icon.color-preserve" : "intent.typography.link-active-preserve");
            return;
          }
        }
      }

      summary.ignored += 1;
      recordRule(summary, "style.color");
      return;
    }

    const importStyle = resolveImportStyleToken(base, parsed.breakpoint, parsed.variants);
    if (importStyle) {
      const className = registerImportStyle(
        summary,
        base,
        importStyle.declaration,
        importStyle.breakpoint,
        importStyle.pseudo
      );
      if (className) {
        mapped.add(className);
        summary.mapped += 1;
        summary.intentHits += 1;
        recordRule(summary, importStyle.ruleId);
        if (parsed.breakpoint !== "base") {
          addNote(summary, `Generated responsive import fallback for ${token}.`);
        }
        return;
      }
    }

    for (const ignoreRule of TAILWIND_TO_PDS_RULES.ignoredPatterns) {
      if (ignoreRule.pattern.test(base)) {
        summary.ignored += 1;
        recordRule(summary, ignoreRule.id);
        if (ignoreRule.id === "style.spacing.atomic") {
          summary.removedAtomicSpacingCount += 1;
        }
        if (ignoreRule.id === "style.positioning.atomic") {
          summary.removedAtomicPositioningCount += 1;
        }
        return;
      }
    }

    if (isTwToken) {
      summary.unknown += 1;
      addUnknownToken(summary, token);
      return;
    }

    mapped.add(token);
  });

  if (sawSpaceY && allowsRule(policy, "spacing")) {
    mapped.add(firstSpaceYStackClass || "stack-md");
    summary.mapped += 1;
    summary.intentHits += 1;
    addNote(summary, `Mapped ${firstSpaceYToken} to ${firstSpaceYStackClass || "stack-md"}.`);
  }

  if (sawSpaceX && allowsRule(policy, "spacing")) {
    addNote(summary, `Mapped ${firstSpaceXToken} to gap utility.`);
  }

  const responsiveAuto = chooseGridAutoClass(gridByBreakpoint);
  if (responsiveAuto && allowsRule(policy, "grid")) {
    mapped.delete("grid-cols-1");
    mapped.delete("grid-cols-2");
    mapped.delete("grid-cols-3");
    mapped.delete("grid-cols-4");
    mapped.delete("grid-cols-6");
    mapped.add("grid");
    mapped.add(responsiveAuto);
    summary.intentHits += 1;
    recordRule(summary, "intent.layout.responsive-grid-to-auto");
    addNote(summary, `Collapsed responsive grid columns to ${responsiveAuto}.`);
  } else if (allowsRule(policy, "grid")) {
    const responsiveGridBreakpoints = BREAKPOINT_ORDER.filter(
      (bp) => bp !== "base" && Number.isFinite(gridByBreakpoint[bp])
    );

    responsiveGridBreakpoints.forEach((bp) => {
      const cols = gridByBreakpoint[bp];
      const utilityClass = resolveResponsiveGridUtilityClass(bp, cols);

      if (utilityClass) {
        mapped.add("grid");
        mapped.add(utilityClass);
        summary.intentHits += 1;
        recordRule(summary, "intent.layout.responsive-grid-to-auto");
        addNote(summary, `Mapped ${bp}:grid-cols-${cols} to ${utilityClass}.`);
        return;
      }

      const fallbackClass = registerImportStyle(
        summary,
        `grid-cols-${cols}`,
        `grid-template-columns:repeat(${cols}, minmax(0, 1fr))`,
        bp
      );
      if (fallbackClass) {
        mapped.add("grid");
        mapped.add(fallbackClass);
        summary.intentHits += 1;
        recordRule(summary, "fallback.import-style.grid-cols-responsive");
        addNote(summary, `Mapped ${bp}:grid-cols-${cols} to responsive import fallback for exact columns.`);
      }
    });
  }

  if (
    allowsRule(policy, "flex") &&
    sourceTokens.includes("flex-col") &&
    (flexByBreakpoint.md === "flex-row" || flexByBreakpoint.lg === "flex-row")
  ) {
    mapped.delete("flex-col");
    mapped.delete("flex-row");
    mapped.add("mobile-stack");
    summary.intentHits += 1;
    recordRule(summary, "intent.layout.mobile-stack");
    addNote(summary, "Mapped flex-col + breakpoint flex-row to mobile-stack.");
  }

  const hasFlexLayoutClass = mapped.has("flex") || mapped.has("inline-flex");
  if (hasFlexLayoutClass && allowsRule(policy, "spacing")) {
    const hasExplicitSpacing = hasGapUtilityClass(mapped) || hasStackUtilityClass(mapped) || sawSpaceX || sawSpaceY;
    if (!hasExplicitSpacing) {
      mapped.add("gap-sm");
      summary.intentHits += 1;
      recordRule(summary, "layout.spacing.flex-min-gap");
      addNote(summary, "Added gap-sm fallback for flex container without explicit spacing.");
    }
  }

  const hadGridColsIntent = sourceTokens.some((token) => /^grid-cols-\d+$/.test(parseVariantToken(token).base));
  if (hadGridColsIntent && mapped.has("grid") && !hasGridSizingClass(mapped)) {
    const safetyAuto = chooseGridAutoClass(gridByBreakpoint);
    if (safetyAuto) {
      mapped.add(safetyAuto);
      summary.intentHits += 1;
      recordRule(summary, "intent.layout.responsive-grid-to-auto");
      addNote(summary, `Applied grid safety fallback ${safetyAuto} to avoid bare grid output.`);
    } else if (Number.isFinite(gridByBreakpoint.base) && gridByBreakpoint.base > 1) {
      mapped.add(`grid-cols-${gridByBreakpoint.base}`);
      summary.intentHits += 1;
      recordRule(summary, "intent.layout.grid-safety-fallback");
      addNote(summary, `Applied grid safety fallback grid-cols-${gridByBreakpoint.base} to preserve explicit grid intent.`);
    } else {
      mapped.add("mobile-stack");
      summary.intentHits += 1;
      recordRule(summary, "intent.layout.grid-safety-fallback.mobile-stack");
      addNote(summary, "Applied mobile-stack safety fallback to avoid bare grid output when explicit grid intent was present.");
    }
  }

  const hasSurfaceSignal = sourceTokens.some((token) => /^(?:bg-white|shadow|shadow-md|shadow-lg)$/.test(token));
  const hasCardShapeSignal = sourceTokens.some((token) => /^rounded/.test(token));
  const isContainerTag = ["div", "section", "article", "li", "aside"].includes(tagName);
  if (isContainerTag && hasSurfaceSignal && hasCardShapeSignal) {
    mapped.add("card");
    if (!mapped.has("surface-elevated") && sourceTokens.some((token) => /^shadow/.test(token))) {
      mapped.add("surface-elevated");
    }
    if (!mapped.has("surface-base") && sourceTokens.includes("bg-white")) {
      mapped.add("surface-base");
    }
    summary.intentHits += 1;
    recordRule(summary, "intent.component.card");
  }

  const isButtonLike = tagName === "button" || tagName === "a";
  if (isButtonLike) {
    const hasPrimarySignal = sourceTokens.some((token) => /^bg-(?:[a-z]+-)?[4567]00$/.test(token)) && sourceTokens.includes("text-white");
    const hasOutlineSignal = sourceTokens.some((token) => /^border/.test(token)) && !hasPrimarySignal;
    const hasCompactSignal = sourceTokens.includes("p-2") && sourceTokens.includes("rounded-full");

    if (hasPrimarySignal) {
      mapped.delete("surface-base");
      mapped.delete("surface-elevated");
      mapped.add("btn-primary");
      summary.intentHits += 1;
      recordRule(summary, "intent.component.button.primary");
    } else if (hasOutlineSignal) {
      mapped.add("btn-outline");
      summary.intentHits += 1;
      recordRule(summary, "intent.component.button.outline");
    }

    if (hasCompactSignal) {
      mapped.add("icon-only");
      recordRule(summary, "intent.component.button.icon-only");
    }
  }

  if (buttonIntent.shouldNormalize) {
    for (const className of Array.from(mapped)) {
      if (String(className).startsWith("import-")) {
        mapped.delete(className);
      }
    }

    const buttonStructuralClasses = [
      "flex",
      "inline-flex",
      "items-start",
      "items-center",
      "items-end",
      "justify-start",
      "justify-center",
      "justify-end",
      "justify-between",
      "shrink",
      "self-start",
      "self-center",
      "self-end",
      "cursor-pointer",
      "truncate",
      "overflow-hidden",
      "whitespace-nowrap",
      "surface-base",
      "surface-elevated",
      "surface-subtle",
      "card",
    ];
    buttonStructuralClasses.forEach((name) => mapped.delete(name));

    if (buttonIntent.variant === "primary") {
      mapped.add("btn-primary");
      recordRule(summary, "intent.component.button.primary");
    } else if (buttonIntent.variant === "outline") {
      mapped.add("btn-outline");
      recordRule(summary, "intent.component.button.outline");
    }

    if (buttonIntent.size === "sm") {
      mapped.add("btn-sm");
      recordRule(summary, "intent.component.button.size-sm");
    } else if (buttonIntent.size === "lg") {
      mapped.add("btn-lg");
      recordRule(summary, "intent.component.button.size-lg");
    }

    if (buttonIntent.iconOnly) {
      mapped.add("icon-only");
      recordRule(summary, "intent.component.button.icon-only");
    }

    summary.intentHits += 1;
    recordRule(summary, "intent.component.button.normalize");
  }

  if (badgeIntent.shouldNormalize) {
    for (const className of Array.from(mapped)) {
      if (String(className).startsWith("import-")) {
        mapped.delete(className);
      }
    }

    const badgeStructuralClasses = [
      "flex",
      "inline-flex",
      "items-start",
      "items-center",
      "items-end",
      "justify-start",
      "justify-center",
      "justify-end",
      "justify-between",
      "grow",
      "shrink",
      "self-start",
      "self-center",
      "self-end",
      "cursor-pointer",
      "truncate",
      "overflow-hidden",
      "whitespace-nowrap",
      "text-muted",
      "surface-base",
      "surface-elevated",
      "surface-subtle",
      "card",
    ];
    badgeStructuralClasses.forEach((name) => mapped.delete(name));

    mapped.add("badge");
    if (badgeIntent.variantClass) {
      mapped.add(badgeIntent.variantClass);
    }
    if (badgeIntent.outline) {
      mapped.add("badge-outline");
    }
    if (badgeIntent.sizeClass) {
      mapped.add(badgeIntent.sizeClass);
    }

    if (badgeIntent.pastel && badgeIntent.pastel.family) {
      const bgVar = mapTailwindColorToPdsColorVar(
        badgeIntent.pastel.family,
        String(badgeIntent.pastel.bgShade || 200)
      );
      const textVar = mapTailwindColorToPdsColorVar(
        badgeIntent.pastel.family,
        String(badgeIntent.pastel.textShade || 700)
      );

      if (bgVar && textVar) {
        const pastelToken = `badge-pastel-${badgeIntent.pastel.family}-${badgeIntent.pastel.bgShade}-${badgeIntent.pastel.textShade}`;
        const pastelClass = registerImportStyle(
          summary,
          pastelToken,
          `background-color:${bgVar};color:${textVar}`,
          "base"
        );
        if (pastelClass) {
          mapped.add(pastelClass);
          recordRule(summary, "intent.component.badge.pastel-preserve");
          addNote(summary, `Preserved pastel badge tone using ${pastelClass}.`);
        }
      }
    }

    summary.intentHits += 1;
    recordRule(summary, "intent.component.badge.normalize");
    addNote(summary, "Normalized badge/pill utility cluster to PDS badge classes.");
  }

  if (cardIntent.shouldNormalize) {
    for (const className of Array.from(mapped)) {
      if (String(className).startsWith("import-")) {
        mapped.delete(className);
      }
    }

    const cardStructuralClasses = [
      "surface-base",
      "surface-subtle",
      "surface-elevated",
      "surface-sunken",
      "surface-overlay",
      "surface-inverse",
      "surface-primary",
      "surface-secondary",
      "surface-success",
      "surface-warning",
      "surface-danger",
      "surface-info",
      "card-basic",
      "card-elevated",
      "card-outlined",
      "card-interactive",
    ];
    cardStructuralClasses.forEach((name) => mapped.delete(name));

    mapped.add("card");
    if (cardIntent.cardVariantClass) {
      mapped.add(cardIntent.cardVariantClass);
    }
    if (cardIntent.surfaceClass) {
      mapped.add(cardIntent.surfaceClass);
    }

    summary.intentHits += 1;
    recordRule(summary, "intent.component.card.normalize");
    addNote(summary, "Normalized card utility cluster to PDS card/surface classes.");
  }

  if (tagName === "a" && !buttonIntent.shouldNormalize) {
    const hasLinkSignal = sourceTokens.some(
      (token) => token.includes("hover:text") || token === "transition-colors"
    );
    if (hasLinkSignal) {
      const linkResetClass = registerImportStyle(summary, "link-reset", "text-decoration:none");
      if (linkResetClass) {
        mapped.add(linkResetClass);
      }
      summary.intentHits += 1;
      recordRule(summary, "intent.typography.link-treatment");
    }
  }

  if (tagName === "footer") {
    const hasFooterSurfaceSignal = mapped.has("surface-base") || sourceTokens.some((token) => /^bg-/.test(token));
    if (hasFooterSurfaceSignal) {
      mapped.delete("surface-base");
      mapped.delete("surface-subtle");
      mapped.add("surface-inverse");
      summary.intentHits += 1;
      recordRule(summary, "intent.surface.footer-inverse");
    }
  }

  if (preflightHints?.listReset && ["ul", "ol", "menu"].includes(tagName)) {
    const listResetClass = registerImportStyle(summary, "list-reset", "list-style:none;margin:0;padding:0");
    if (listResetClass) {
      mapped.add(listResetClass);
      summary.intentHits += 1;
      recordRule(summary, "intent.preflight.list-reset");
    }
  }

  if (preflightHints?.anchorReset && tagName === "a" && !buttonIntent.shouldNormalize) {
    const anchorResetClass = registerImportStyle(
      summary,
      "anchor-reset",
      "color:inherit;text-decoration:inherit"
    );
    if (anchorResetClass) {
      mapped.add(anchorResetClass);
      summary.intentHits += 1;
      recordRule(summary, "intent.preflight.anchor-reset");
    }
  }

  const fallbackContainerTags = new Set(["div", "section", "article", "aside", "nav", "main", "header", "footer", "form", "fieldset", "ul", "ol", "li"]);
  const hadContainerStructuralLayoutSignal = sourceTokens.some((token) => {
    const baseToken = parseVariantToken(token).base;
    return /^(?:flex|grid|container|gap-|space-[xy]-|items-|justify-|content-|place-|self-|w-|h-|min-|max-)/.test(baseToken);
  });
  if (mapped.size === 0 && fallbackContainerTags.has(tagName) && hadContainerStructuralLayoutSignal) {
    mapped.add("stack-sm");
    addNote(summary, `Added stack-sm fallback for <${tagName}> with unmapped classes.`);
  }

  return Array.from(mapped).join(" ");
}

function convertHtmlWithRules(html = "", options = {}) {
  const source = String(html || "");
  const policy = resolveConversionPolicy(options.config || {});
  const breakpoints = resolveBreakpoints(options.config || {});
  const summary = createConversionSummary();
  const extracted = extractTailwindRuntimeContext(source, summary);
  const normalizedSource = applyLabelNestingRule(extracted.html, summary);

  const convertedHtmlRaw = normalizedSource.replace(
    /<([a-zA-Z][\w:-]*)([^>]*?)\sclass\s*=\s*(["'])(.*?)\3([^>]*)>/gs,
    (fullMatch, tagName, beforeAttrs, quote, classValue, afterAttrs) => {
      const nextClassValue = buildClassReplacement({
        tagName: String(tagName || "").toLowerCase(),
        originalClassValue: classValue,
        policy,
        summary,
        preflightHints: extracted.hints,
      });

      const compact = String(nextClassValue || "").trim();
      if (!compact) {
        return `<${tagName}${beforeAttrs}${afterAttrs}>`;
      }

      return `<${tagName}${beforeAttrs} class=${quote}${compact}${quote}${afterAttrs}>`;
    }
  );

  const postProcessedHtml = normalizeSemanticTypography(
    normalizeMetricPairStackContainers(
      normalizeMetricTextParagraphs(
        normalizeIconOnlyButtons(convertedHtmlRaw, summary),
        summary
      ),
      summary
    ),
    summary,
    { config: options.config || {} }
  );
  const importCss = generateImportStyleSheetText(summary, breakpoints);
  const convertedHtml = injectImportStyleBlock(postProcessedHtml, importCss);
  if (importCss) {
    addNote(summary, `Generated ${summary.importedStyleCount} import-* fallback style mappings.`);
  }

  if (summary.removedAtomicSpacingCount > 0 || summary.removedAtomicPositioningCount > 0) {
    addNote(
      summary,
      `Removed atomic utilities by policy: spacing=${summary.removedAtomicSpacingCount}, positioning=${summary.removedAtomicPositioningCount}.`
    );
  }

  const unknownTokens = listTopUnknownTokens(summary, 16);
  const handled = summary.mapped + summary.ignored + summary.policySkipped;
  const baseCoverage = summary.totalTailwind > 0 ? handled / summary.totalTailwind : 1;
  const unknownRatio = summary.totalTailwind > 0 ? summary.unknown / summary.totalTailwind : 0;

  const confidenceRaw =
    0.42 +
    baseCoverage * 0.45 +
    Math.min(summary.intentHits, 4) * 0.025 -
    unknownRatio * 0.18;
  const confidence = Math.max(0.15, Math.min(0.96, Number(confidenceRaw.toFixed(2))));

  const commentLines = [
    `pds-import: rulebook=${RULEBOOK_VERSION} confidence=${Math.round(confidence * 100)}%`,
    `pds-import: tailwind=${summary.totalTailwind} mapped=${summary.mapped} ignored=${summary.ignored} policySkipped=${summary.policySkipped} unknown=${summary.unknown}`,
  ];

  if (unknownTokens.length) {
    commentLines.push(`pds-import: unknown-tailwind=${unknownTokens.join(", ")}`);
  }

  if (summary.notes.length) {
    commentLines.push(`pds-import: notes=${summary.notes.join(" | ")}`);
  }

  const annotatedHtml = `<!-- ${commentLines.join(" -->\n<!-- ")} -->\n${convertedHtml}`;

  const issues = [];
  if (summary.unknown > 0) {
    issues.push({
      severity: "warning",
      message: `Converted with ${summary.unknown} unknown Tailwind utilities requiring manual review.`,
    });
  }
  if (summary.policySkipped > 0) {
    issues.push({
      severity: "info",
      message: `Skipped ${summary.policySkipped} utility mappings due to PDS config policy.`,
    });
  }
  if (unknownTokens.length) {
    issues.push({
      severity: "info",
      message: `Top unknown utilities: ${unknownTokens.slice(0, 8).join(", ")}`,
    });
  }

  return {
    html: annotatedHtml,
    confidence,
    issues,
    meta: {
      rulebookVersion: RULEBOOK_VERSION,
      coverage: {
        tailwind: summary.totalTailwind,
        mapped: summary.mapped,
        ignored: summary.ignored,
        policySkipped: summary.policySkipped,
        unknown: summary.unknown,
        importedStyles: summary.importedStyleCount,
        nestedLabelPairs: summary.labelNestingCount,
      },
      unknownTailwindTokens: unknownTokens,
      notes: summary.notes,
      appliedRules: Array.from(summary.appliedRules),
      policy,
      importStyleSheetInjected: Boolean(importCss),
      breakpoints,
    },
  };
}

export function describeTailwindConversionRules() {
  return {
    rulesJsonPath: RULEBOOK_JSON_PATH,
    ...TAILWIND_TO_PDS_RULES,
    directMappings: TAILWIND_TO_PDS_RULES.directMappings.map((rule) => ({
      id: rule.id,
      tw: rule.tw,
      pds: rule.pds,
      gate: rule.gate || null,
    })),
    ignoredPatterns: TAILWIND_TO_PDS_RULES.ignoredPatterns.map((rule) => ({
      id: rule.id,
      pattern: String(rule.pattern),
      reason: rule.reason,
    })),
  };
}

function inferPrimaryColor(text) {
  const hex = String(text || "").match(/#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/);
  return hex ? hex[0] : null;
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function isLikelyHtml(value) {
  return /<\s*[a-z][^>]*>/i.test(String(value || ""));
}

function toPxNumber(value) {
  const text = String(value || "").trim().toLowerCase();
  if (!text) return null;
  const numeric = Number.parseFloat(text);
  if (!Number.isFinite(numeric)) return null;
  if (text.endsWith("rem") || text.endsWith("em")) return numeric * 16;
  if (text.endsWith("px") || /^[0-9.\-]+$/.test(text)) return numeric;
  return null;
}

function normalizeCssColor(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  const hexMatch = text.match(/#(?:[0-9a-f]{3,8})\b/i);
  if (hexMatch) return hexMatch[0].toLowerCase();
  const rgbMatch = text.match(/rgba?\([^)]*\)/i);
  if (rgbMatch) return rgbMatch[0];
  const hslMatch = text.match(/hsla?\([^)]*\)/i);
  if (hslMatch) return hslMatch[0];
  return "";
}

function resolveCssVariableValue(varName = "") {
  const name = String(varName || "").trim();
  if (!name || typeof window === "undefined" || typeof document === "undefined") return "";
  const root = document.documentElement;
  if (!root) return "";
  const computed = window.getComputedStyle(root);
  return String(computed.getPropertyValue(name) || "").trim();
}

function resolveColorFromMaybeVar(value = "") {
  const text = String(value || "").trim();
  const direct = normalizeCssColor(text);
  if (direct) return direct;

  const varMatch = text.match(/var\(\s*(--[^\s,)]+)\s*(?:,[^)]+)?\)/i);
  if (!varMatch) return "";
  const resolved = resolveCssVariableValue(varMatch[1]);
  return normalizeCssColor(resolved);
}

function resolveTailwindBackgroundTokenToColor(token = "") {
  const raw = String(token || "").trim();
  if (!raw) return "";
  const baseToken = raw.split(":").pop() || raw;

  if (baseToken === "bg-white") return "#ffffff";
  if (baseToken === "bg-black") return "#000000";

  const alphaBlack = baseToken.match(/^bg-black\/(\d{1,3})$/i);
  if (alphaBlack) {
    const alpha = Math.max(0, Math.min(100, Number(alphaBlack[1]))) / 100;
    return `rgba(0,0,0,${alpha})`;
  }

  const arbitrary = baseToken.match(/^bg-\[([^\]]+)\]$/i);
  if (arbitrary) {
    return normalizeCssColor(arbitrary[1]);
  }

  const familyShade = baseToken.match(/^bg-([a-z]+)-(\d{2,3})$/i);
  if (!familyShade) return "";

  const colorVar = mapTailwindColorToPdsColorVar(familyShade[1], familyShade[2]);
  if (!colorVar) return "";
  return resolveColorFromMaybeVar(colorVar);
}

function extractTailwindBackgroundColorsFromClass(className = "") {
  const tokens = String(className || "")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);

  return tokens
    .map((token) => resolveTailwindBackgroundTokenToColor(token))
    .filter(Boolean);
}

function parseCssRuleBlocks(cssText = "") {
  const blocks = [];
  const input = String(cssText || "");
  const regex = /([^{}]+)\{([^{}]*)\}/g;
  let match = regex.exec(input);
  while (match) {
    const selector = String(match[1] || "").trim();
    const body = String(match[2] || "").trim();
    if (selector && body) {
      blocks.push({ selector, body });
    }
    match = regex.exec(input);
  }
  return blocks;
}

function isRootLikeSelector(selector = "") {
  const text = String(selector || "").toLowerCase();
  if (!text) return false;
  return /(^|\s|,)(html|body|:root|main)(\s|,|$)|#app\b|#root\b|\.app\b|\.page\b/.test(text);
}

function parseRgbColor(value = "") {
  const match = String(value || "")
    .trim()
    .match(/rgba?\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)(?:\s*,\s*([0-9.]+))?\s*\)/i);
  if (!match) return null;
  const r = Number.parseFloat(match[1]);
  const g = Number.parseFloat(match[2]);
  const b = Number.parseFloat(match[3]);
  const a = match[4] == null ? 1 : Number.parseFloat(match[4]);
  if (![r, g, b, a].every((num) => Number.isFinite(num))) return null;
  return {
    r: Math.max(0, Math.min(255, r)),
    g: Math.max(0, Math.min(255, g)),
    b: Math.max(0, Math.min(255, b)),
    a: Math.max(0, Math.min(1, a)),
  };
}

function parseHexColor(value = "") {
  const match = String(value || "").trim().match(/^#([0-9a-f]{3,8})$/i);
  if (!match) return null;
  const raw = match[1].toLowerCase();
  if (raw.length === 3) {
    const [r, g, b] = raw.split("");
    return {
      r: Number.parseInt(`${r}${r}`, 16),
      g: Number.parseInt(`${g}${g}`, 16),
      b: Number.parseInt(`${b}${b}`, 16),
      a: 1,
    };
  }
  if (raw.length === 6 || raw.length === 8) {
    return {
      r: Number.parseInt(raw.slice(0, 2), 16),
      g: Number.parseInt(raw.slice(2, 4), 16),
      b: Number.parseInt(raw.slice(4, 6), 16),
      a: raw.length === 8 ? Number.parseInt(raw.slice(6, 8), 16) / 255 : 1,
    };
  }
  return null;
}

function colorToRgba(value = "") {
  const normalized = normalizeCssColor(value);
  if (!normalized) return null;
  if (normalized.startsWith("#")) return parseHexColor(normalized);
  if (normalized.startsWith("rgb")) return parseRgbColor(normalized);
  return null;
}

function relativeLuminance(color) {
  if (!color) return null;
  const channel = (value) => {
    const n = Number(value) / 255;
    return n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4;
  };
  const r = channel(color.r);
  const g = channel(color.g);
  const b = channel(color.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function isTransparentColor(value = "") {
  const text = String(value || "").trim().toLowerCase();
  if (!text) return true;
  if (text === "transparent") return true;
  const rgba = colorToRgba(text);
  if (rgba && Number.isFinite(rgba.a)) return rgba.a <= 0.04;
  return false;
}

function chooseBackgroundColor(rootCandidates = [], fallbackCandidates = []) {
  const normalizedRoot = rootCandidates
    .map((value) => normalizeCssColor(value))
    .filter((value) => value && !isTransparentColor(value));
  const rootWinner = pickMostFrequent(normalizedRoot);
  if (rootWinner) {
    return { color: rootWinner, source: "root" };
  }

  const normalizedFallback = fallbackCandidates
    .map((value) => normalizeCssColor(value))
    .filter((value) => value && !isTransparentColor(value));

  const brightFallback = normalizedFallback.filter((value) => {
    const rgba = colorToRgba(value);
    const lum = relativeLuminance(rgba);
    return Number.isFinite(lum) ? lum >= 0.72 : false;
  });

  const brightWinner = pickMostFrequent(brightFallback);
  if (brightWinner) {
    return { color: brightWinner, source: "fallback-bright" };
  }

  const fallbackWinner = pickMostFrequent(normalizedFallback);
  if (fallbackWinner) {
    return { color: fallbackWinner, source: "fallback" };
  }

  return { color: "", source: "none" };
}

function parseCssDeclarations(text, out = new Map()) {
  const input = String(text || "");
  const regex = /([a-z-]+)\s*:\s*([^;{}]+)/gi;
  let match = regex.exec(input);
  while (match) {
    const prop = String(match[1] || "").trim().toLowerCase();
    const value = String(match[2] || "").trim();
    if (prop && value) {
      if (!out.has(prop)) out.set(prop, []);
      out.get(prop).push(value);
    }
    match = regex.exec(input);
  }
  return out;
}

function collectHtmlSignals(rawInput = "") {
  const input = String(rawInput || "");
  const declarations = new Map();
  const colorValues = [];
  const rootBackgroundColors = [];
  const rootClassBackgroundColors = [];
  const classBackgroundColors = [];
  const buttonBackgroundColors = [];
  const classTokens = [];
  const textChunks = [];

  const colorRegex = /#(?:[0-9a-f]{3,8})\b|rgba?\([^)]*\)|hsla?\([^)]*\)/gi;
  const pushColors = (text) => {
    const matches = String(text || "").match(colorRegex) || [];
    matches.forEach((item) => {
      const normalized = normalizeCssColor(item);
      if (normalized) colorValues.push(normalized);
    });
  };

  if (typeof DOMParser !== "undefined" && isLikelyHtml(input)) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(input, "text/html");
      const styles = Array.from(doc.querySelectorAll("style")).map((node) => node.textContent || "");
      styles.forEach((styleText) => {
        parseCssDeclarations(styleText, declarations);
        pushColors(styleText);
        parseCssRuleBlocks(styleText).forEach((block) => {
          if (!isRootLikeSelector(block.selector)) return;
          const rootDeclarations = parseCssDeclarations(block.body, new Map());
          const rootValues = getDeclarationValues(rootDeclarations, ["background", "background-color"])
            .map((value) => normalizeCssColor(value))
            .filter(Boolean);
          rootBackgroundColors.push(...rootValues);
        });
      });

      const inlineNodes = Array.from(doc.querySelectorAll("[style]"));
      inlineNodes.forEach((node) => {
        const inlineStyle = node.getAttribute("style") || "";
        parseCssDeclarations(inlineStyle, declarations);
        pushColors(inlineStyle);
      });

      const rootInlineSelectors = ["html", "body", "main", "#app", "#root", ".app", ".page"];
      rootInlineSelectors.forEach((selector) => {
        const rootNode = doc.querySelector(selector);
        if (!rootNode) return;
        const inlineStyle = rootNode.getAttribute("style") || "";
        if (!inlineStyle) return;
        const rootDeclarations = parseCssDeclarations(inlineStyle, new Map());
        const rootValues = getDeclarationValues(rootDeclarations, ["background", "background-color"])
          .map((value) => normalizeCssColor(value))
          .filter(Boolean);
        rootBackgroundColors.push(...rootValues);

        const classColors = extractTailwindBackgroundColorsFromClass(rootNode.getAttribute("class") || "");
        rootClassBackgroundColors.push(...classColors);
      });

      const classNodes = Array.from(doc.querySelectorAll("[class]"));
      classNodes.forEach((node) => {
        const tokens = parseClassTokens(node.getAttribute("class") || "");
        classTokens.push(...tokens);
        const classColors = extractTailwindBackgroundColorsFromClass(node.getAttribute("class") || "");
        classBackgroundColors.push(...classColors);

        const tagName = String(node.tagName || "").toLowerCase();
        const isButtonLike = tagName === "button" || tagName === "a";
        const hasBgSignal = tokens.some((token) => /^bg-/.test(String(parseVariantToken(token).base || "")));
        if (isButtonLike && hasBgSignal && classColors.length) {
          buttonBackgroundColors.push(...classColors);
        }
      });

      const text = doc.body?.textContent || "";
      if (text.trim()) textChunks.push(text);
      pushColors(doc.documentElement?.outerHTML || input);
    } catch (error) {
      parseCssDeclarations(input, declarations);
      pushColors(input);
      textChunks.push(input);
    }
  } else {
    parseCssDeclarations(input, declarations);
    pushColors(input);
    textChunks.push(input);
  }

  return {
    declarations,
    colorValues,
    rootBackgroundColors,
    rootClassBackgroundColors,
    classBackgroundColors,
    buttonBackgroundColors,
    classTokens,
    textCorpus: textChunks.join("\n"),
  };
}

function pickMostFrequent(values = []) {
  const counts = new Map();
  values.forEach((value) => {
    const key = String(value || "").trim();
    if (!key) return;
    counts.set(key, (counts.get(key) || 0) + 1);
  });
  let winner = "";
  let winnerCount = -1;
  counts.forEach((count, key) => {
    if (count > winnerCount) {
      winner = key;
      winnerCount = count;
    }
  });
  return winner;
}

function getDeclarationValues(map, propNames = []) {
  return propNames.flatMap((name) => map.get(name) || []);
}

function getSchemaNodeByPath(schema, path) {
  if (!schema || !path) return null;
  const segments = String(path).split(".").filter(Boolean);
  let node = schema;
  for (const segment of segments) {
    if (!node || node.type !== "object" || !node.properties || typeof node.properties !== "object") {
      return null;
    }
    node = node.properties[segment];
  }
  return node || null;
}

function getInferenceContext(config = {}) {
  const design = config && typeof config === "object" ? config : {};
  const relations = PDS?.configRelations && typeof PDS.configRelations === "object"
    ? PDS.configRelations
    : {};
  const allowedPaths = new Set(Object.keys(relations));

  let schema = null;
  if (typeof PDS?.buildConfigFormSchema === "function") {
    try {
      schema = PDS.buildConfigFormSchema(design)?.schema || null;
    } catch (error) {
      schema = null;
    }
  }
  if (!schema && PDS?.configFormSchema?.schema) {
    schema = PDS.configFormSchema.schema;
  }

  return { design, schema, allowedPaths };
}

function coerceValueForNode(node, value) {
  if (!node) return value;

  if (Array.isArray(node.oneOf) && node.oneOf.length) {
    const options = node.oneOf
      .map((item) => item?.const)
      .filter((item) => item !== undefined && item !== null);
    if (options.length) {
      if (typeof value === "string") {
        const matched = options.find(
          (option) => String(option).toLowerCase() === value.toLowerCase()
        );
        if (matched !== undefined) return matched;
      }
      if (typeof value === "number") {
        const numeric = options
          .map((option) => Number(option))
          .filter((option) => Number.isFinite(option));
        if (numeric.length) {
          return numeric.reduce((best, current) => (
            Math.abs(current - value) < Math.abs(best - value) ? current : best
          ), numeric[0]);
        }
      }
      return options[0];
    }
  }

  if (node.type === "number" || node.type === "integer") {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return undefined;
    return node.type === "integer" ? Math.round(parsed) : parsed;
  }

  if (node.type === "boolean") {
    return Boolean(value);
  }

  if (node.type === "string") {
    return String(value || "").trim();
  }

  return value;
}

function setPatchPath(target, path, value) {
  const segments = String(path || "").split(".").filter(Boolean);
  if (!segments.length) return;
  let current = target;
  for (let index = 0; index < segments.length; index += 1) {
    const segment = segments[index];
    if (index === segments.length - 1) {
      current[segment] = value;
      return;
    }
    if (!current[segment] || typeof current[segment] !== "object" || Array.isArray(current[segment])) {
      current[segment] = {};
    }
    current = current[segment];
  }
}

function maybeSetInferredValue(state, path, value) {
  if (value === undefined || value === null || value === "") return;
  if (state.allowedPaths.size && !state.allowedPaths.has(path)) return;

  const node = getSchemaNodeByPath(state.schema, path);
  const nextValue = coerceValueForNode(node, value);
  if (nextValue === undefined || nextValue === null || nextValue === "") return;

  setPatchPath(state.patch, path, nextValue);
  state.inferredPaths.add(path);
}

function collectMedianPx(values = []) {
  const nums = values
    .map((item) => toPxNumber(item))
    .filter((item) => Number.isFinite(item));
  if (!nums.length) return null;
  nums.sort((a, b) => a - b);
  const middle = Math.floor(nums.length / 2);
  if (nums.length % 2) return nums[middle];
  return (nums[middle - 1] + nums[middle]) / 2;
}

function inferFontFamily(values = []) {
  const cleaned = values
    .map((item) => String(item || "").split(",")[0] || "")
    .map((item) => item.trim().replace(/^['"]|['"]$/g, ""))
    .filter(Boolean);
  return pickMostFrequent(cleaned);
}

function inferBorderWidthKeyword(pxValue) {
  const size = Number(pxValue);
  if (!Number.isFinite(size)) return "thin";
  if (size <= 0.75) return "hairline";
  if (size <= 1.5) return "thin";
  if (size <= 2.5) return "medium";
  return "thick";
}

function resolveTailwindRoundedTokenPx(token = "") {
  const baseToken = String(parseVariantToken(token).base || "").toLowerCase();
  const match = baseToken.match(/^rounded(?:-[trbl]{1,2})?(?:-(none|xs|sm|md|lg|xl|2xl|3xl|full))?$/);
  if (!match) return null;

  const size = match[1] || "DEFAULT";
  const map = {
    none: 0,
    xs: 2,
    sm: 4,
    DEFAULT: 6,
    md: 8,
    lg: 12,
    xl: 16,
    "2xl": 24,
    "3xl": 32,
  };

  if (size === "full") return null;
  return Number.isFinite(map[size]) ? map[size] : null;
}

function inferRadiusPxFromTailwindClasses(classTokens = []) {
  const radiusValues = classTokens
    .map((token) => resolveTailwindRoundedTokenPx(token))
    .filter((value) => Number.isFinite(value));
  if (!radiusValues.length) return null;
  radiusValues.sort((a, b) => a - b);
  const middle = Math.floor(radiusValues.length / 2);
  if (radiusValues.length % 2) return radiusValues[middle];
  return (radiusValues[middle - 1] + radiusValues[middle]) / 2;
}

export function inferPdsDesignFromHtml(input = {}) {
  const html = String(input.html || "");
  if (!html.trim()) {
    return createImportResult({
      source: "html-inference",
      type: String(input.sourceType || "design-inference"),
      confidence: 0,
      issues: [{ severity: "warning", message: "No HTML or guideline text provided for design extraction." }],
      designPatch: {},
      meta: {
        extractedPathCount: 0,
        extractedPaths: [],
      },
    });
  }

  const context = getInferenceContext(input.config || {});
  const signals = collectHtmlSignals(html);
  const state = {
    patch: {},
    inferredPaths: new Set(),
    allowedPaths: context.allowedPaths,
    schema: context.schema,
  };

  const textColors = getDeclarationValues(signals.declarations, ["color"])
    .map((value) => normalizeCssColor(value))
    .filter(Boolean);
  const backgroundColors = getDeclarationValues(signals.declarations, ["background", "background-color"])
    .map((value) => normalizeCssColor(value))
    .filter(Boolean);
  const allColors = [...backgroundColors, ...textColors, ...signals.colorValues].filter(Boolean);
  const uniqueColors = Array.from(new Set(allColors));
  const explicitRootBackgroundCandidates = [
    ...(signals.rootBackgroundColors || []),
  ];
  const rootClassBackgroundCandidates = [
    ...(signals.rootClassBackgroundColors || []),
  ];
  const rootBackgroundCandidates = explicitRootBackgroundCandidates.length
    ? explicitRootBackgroundCandidates
    : rootClassBackgroundCandidates;
  const fallbackBackgroundCandidates = [
    ...backgroundColors,
    ...(signals.classBackgroundColors || []),
  ];
  const backgroundPick = chooseBackgroundColor(rootBackgroundCandidates, fallbackBackgroundCandidates);
  const inferredBackground = backgroundPick.color;
  maybeSetInferredValue(state, "colors.background", inferredBackground || backgroundColors[0] || uniqueColors[0]);

  const paletteColors = uniqueColors.filter((color) => color && color !== inferredBackground);
  const buttonPrimary = pickMostFrequent(signals.buttonBackgroundColors || []);
  const inferredPrimary = buttonPrimary || paletteColors[0] || uniqueColors[0];
  const remainingPalette = paletteColors.filter((color) => color && color !== inferredPrimary);
  maybeSetInferredValue(state, "colors.primary", inferredPrimary);
  maybeSetInferredValue(state, "colors.secondary", remainingPalette[0] || inferredPrimary || uniqueColors[0]);
  maybeSetInferredValue(state, "colors.accent", remainingPalette[1] || remainingPalette[0] || inferredPrimary || uniqueColors[0]);

  const families = getDeclarationValues(signals.declarations, ["font-family"]);
  const fontFamily = inferFontFamily(families);
  maybeSetInferredValue(state, "typography.fontFamilyBody", fontFamily);
  maybeSetInferredValue(state, "typography.fontFamilyHeadings", fontFamily);
  maybeSetInferredValue(state, "typography.fontFamilyMono", /mono|code/i.test(signals.textCorpus) ? "JetBrains Mono" : "");

  const fontSizes = getDeclarationValues(signals.declarations, ["font-size"]);
  const medianFontSizePx = collectMedianPx(fontSizes);
  maybeSetInferredValue(state, "typography.baseSize", medianFontSizePx);

  const spacingValues = getDeclarationValues(signals.declarations, [
    "padding",
    "padding-top",
    "padding-right",
    "padding-bottom",
    "padding-left",
    "margin",
    "margin-top",
    "margin-right",
    "margin-bottom",
    "margin-left",
    "gap",
    "row-gap",
    "column-gap",
  ]);
  const medianSpacing = collectMedianPx(spacingValues);
  maybeSetInferredValue(state, "spatialRhythm.baseUnit", medianSpacing);
  maybeSetInferredValue(state, "spatialRhythm.inputPadding", medianSpacing);
  maybeSetInferredValue(state, "spatialRhythm.buttonPadding", medianSpacing);

  const radiusValues = getDeclarationValues(signals.declarations, ["border-radius"]);
  const borderRadius = collectMedianPx(radiusValues) || inferRadiusPxFromTailwindClasses(signals.classTokens || []);
  maybeSetInferredValue(state, "shape.radiusSize", borderRadius);

  const borderWidthValues = getDeclarationValues(signals.declarations, [
    "border-width",
    "border-top-width",
    "border-right-width",
    "border-bottom-width",
    "border-left-width",
  ]);
  const borderWidth = collectMedianPx(borderWidthValues);
  maybeSetInferredValue(state, "shape.borderWidth", inferBorderWidthKeyword(borderWidth));

  const maxWidthValues = getDeclarationValues(signals.declarations, ["max-width"]);
  const maxWidth = collectMedianPx(maxWidthValues);
  maybeSetInferredValue(state, "layout.containerMaxWidth", maxWidth);
  maybeSetInferredValue(state, "layout.maxWidth", maxWidth);

  const minHeightValues = getDeclarationValues(signals.declarations, ["min-height", "height"]);
  const minHeight = collectMedianPx(minHeightValues);
  maybeSetInferredValue(state, "layout.buttonMinHeight", minHeight);
  maybeSetInferredValue(state, "layout.inputMinHeight", minHeight);

  const transitionValues = getDeclarationValues(signals.declarations, ["transition-duration"]);
  const transitionMs = collectMedianPx(transitionValues.map((value) => {
    const text = String(value || "").trim().toLowerCase();
    const number = Number.parseFloat(text);
    if (!Number.isFinite(number)) return null;
    if (text.endsWith("ms")) return number;
    if (text.endsWith("s")) return number * 1000;
    return number;
  }));
  maybeSetInferredValue(state, "behavior.transitionSpeed", transitionMs);

  const shadowValues = getDeclarationValues(signals.declarations, ["box-shadow"]);
  const hasShadow = shadowValues.length > 0;
  maybeSetInferredValue(state, "layers.baseShadowOpacity", hasShadow ? 0.2 : 0.08);

  const extractedPaths = Array.from(state.inferredPaths);
  const categoryCoverage = extractedPaths.reduce((acc, path) => {
    const category = path.split(".")[0];
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const confidence = extractedPaths.length
    ? Math.min(0.92, 0.35 + extractedPaths.length * 0.02)
    : 0.25;

  return createImportResult({
    source: "html-inference",
    type: String(input.sourceType || "design-inference"),
    confidence,
    issues: extractedPaths.length
      ? []
      : [{ severity: "warning", message: "Could not infer enough design signals from input." }],
    designPatch: state.patch,
    meta: {
      extractedPathCount: extractedPaths.length,
      extractedPaths,
      categoryCoverage,
      colorSampleSize: uniqueColors.length,
      backgroundInference: {
        source: backgroundPick.source,
        candidates: {
          root: rootBackgroundCandidates.length,
          declaration: backgroundColors.length,
          classBased: (signals.classBackgroundColors || []).length,
        },
      },
    },
  });
}

export function convertHtmlLikeInputToPdsTemplate(input = {}) {
  const raw = String(input.input || "").trim();
  const sourceType = String(input.sourceType || "unknown");

  if (!raw) {
    return createImportResult({
      source: sourceType,
      type: sourceType,
      confidence: 0,
      issues: [{ severity: "error", message: "No input provided." }],
      meta: {
        conversionMode: "none",
      },
    });
  }

  if (isLikelyHtml(raw)) {
    const converted = convertTailwindHtmlToPds({ html: raw, config: input.config || {} });
    return createImportResult({
      source: sourceType,
      type: sourceType,
      confidence: converted.confidence,
      issues: converted.issues,
      template: converted.template,
      meta: {
        ...(converted.meta || {}),
        conversionMode: "html-to-pds",
      },
    });
  }

  return createImportResult({
    source: sourceType,
    type: sourceType,
    confidence: 0.48,
    issues: [{ severity: "info", message: "Input is not HTML; generated text-based preview template." }],
    template: {
      id: `${sourceType}-text-import`,
      name: "Imported Guideline Text",
      html: `<article class="card surface-base stack-sm"><h3>Imported Guidelines</h3><pre>${escapeHtml(raw)}</pre></article>`,
    },
    meta: {
      conversionMode: "text-preview",
    },
  });
}

export function convertTailwindHtmlToPds(input = {}) {
  const html = String(input.html || "").trim();
  if (!html) {
    return createImportResult({
      source: "tailwind",
      type: "tailwind-html",
      confidence: 0,
      issues: [{ severity: "error", message: "No HTML provided." }],
    });
  }

  const conversion = convertHtmlWithRules(html, { config: input.config || {} });

  return createImportResult({
    source: "tailwind",
    type: "tailwind-html",
    confidence: conversion.confidence,
    issues: conversion.issues,
    template: {
      id: "tailwind-import",
      name: "Converted Tailwind Markup",
      html: conversion.html,
    },
    meta: conversion.meta,
  });
}

export function convertBrandGuidelinesToPatch(input = {}) {
  const text = String(input.text || "").trim();
  if (!text) {
    return createImportResult({
      source: "brand",
      type: "brand-guidelines",
      confidence: 0,
      issues: [{ severity: "error", message: "No brand guideline text provided." }],
    });
  }

  const primary = inferPrimaryColor(text);
  const patch = {
    colors: {},
    typography: {},
  };
  const issues = [];

  if (primary) {
    patch.colors.primary = primary;
  } else {
    issues.push({
      severity: "warning",
      message: "No HEX color found; primary color was not inferred.",
    });
  }

  if (/serif/i.test(text)) patch.typography.fontFamilyBody = "Georgia, serif";
  if (/sans[-\s]?serif/i.test(text)) patch.typography.fontFamilyBody = "Inter, Arial, sans-serif";
  if (/mono|monospace/i.test(text)) patch.typography.fontFamilyMono = "JetBrains Mono, monospace";

  const confidence = primary ? 0.68 : 0.52;

  return createImportResult({
    source: "brand",
    type: "brand-guidelines",
    confidence,
    issues,
    designPatch: patch,
    meta: {
      inferred: {
        primaryColor: primary,
      },
    },
  });
}
