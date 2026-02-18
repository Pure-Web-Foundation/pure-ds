const PDS = globalThis.PDS;

const EDITOR_TAG = "pds-live-edit";
const STYLE_ID = "pds-live-editor-styles";
const TARGET_ATTR = "data-pds-live-target";
const DROPDOWN_CLASS = "pds-live-editor-dropdown";
const MARKER_CLASS = "pds-live-editor-marker";

const CATEGORY_ICONS = {
  colors: "palette",
  typography: "text-aa",
  spatialRhythm: "grid-four",
  shape: "circle",
  layout: "grid-four",
  behavior: "sparkle",
  layers: "squares-four",
  icons: "sparkle",
};

const QUICK_RULES = [
  {
    selector: "button, .btn-primary, .btn-secondary, .btn-outline, .btn-sm, .btn-xs, .btn-lg",
    paths: [
      "colors.primary",
      "shape.radiusSize",
      "spatialRhythm.buttonPadding",
      "layout.buttonMinHeight",
      "behavior.transitionSpeed",
    ],
  },
  {
    selector: "input, textarea, select, label",
    paths: [
      "colors.secondary",
      "shape.radiusSize",
      "shape.borderWidth",
      "spatialRhythm.inputPadding",
      "layout.inputMinHeight",
      "typography.fontFamilyBody",
    ],
  },
  {
    selector: ".card, .surface-base, .surface-elevated, .surface-sunken, .surface-subtle",
    paths: [
      "colors.background",
      "shape.radiusSize",
      "layers.baseShadowOpacity",
    ],
  },
  {
    selector: "nav, menu",
    paths: ["colors.background", "typography.fontFamilyBody", "spatialRhythm.baseUnit"],
  },
  {
    selector: "pds-icon",
    paths: ["icons.defaultSize", "icons.weight"],
  },
];

const DEFAULT_QUICK_PATHS = [
  "colors.primary",
  "typography.fontFamilyBody",
  "shape.radiusSize",
];

const QUICK_STYLE_PROPERTIES = [
  "background-color",
  "color",
  "border-color",
  "border-top-color",
  "border-right-color",
  "border-bottom-color",
  "border-left-color",
  "outline-color",
  "box-shadow",
  "text-shadow",
  "fill",
  "stroke",
  "font-family",
  "font-size",
  "font-weight",
  "letter-spacing",
  "line-height",
  "border-radius",
  "padding",
  "padding-top",
  "padding-right",
  "padding-bottom",
  "padding-left",
  "gap",
  "row-gap",
  "column-gap",
  "min-height",
  "min-width",
  "height",
  "width",
];

const INLINE_VAR_REGEX = /var\(\s*(--[^)\s,]+)\s*/g;
const CUSTOM_PROP_REGEX = /--.+/;
const COLOR_VALUE_REGEX = /#(?:[0-9a-f]{3,8})\b|rgba?\([^)]*\)|hsla?\([^)]*\)/gi;

const ENUM_FIELD_OPTIONS = {
  "shape.borderWidth": ["hairline", "thin", "medium", "thick"],
};

let cachedTokenIndex = null;
let cachedTokenIndexMeta = null;
let colorNormalizer = null;

const GLOBAL_LAYOUT_PATHS = new Set([
  "layout.maxWidth",
  "layout.maxWidths",
  "layout.breakpoints",
  "layout.containerMaxWidth",
  "layout.containerPadding",
  "layout.gridColumns",
  "layout.gridGutter",
  "layout.densityCompact",
  "layout.densityNormal",
  "layout.densityComfortable",
]);

const FORM_CONTEXT_PATHS = new Set([
  "spatialRhythm.inputPadding",
  "layout.inputMinHeight",
  "behavior.focusRingWidth",
  "behavior.focusRingOpacity",
]);

const SURFACE_CONTEXT_PATHS = new Set([
  "colors.background",
  "layers.baseShadowOpacity",
  "layout.baseShadowOpacity",
]);

const DARK_MODE_PATH_MARKER = ".darkMode.";
const QUICK_EDIT_LIMIT = 4;
const DROPDOWN_VIEWPORT_PADDING = 8;
const FONT_FAMILY_PATH_REGEX = /^typography\.fontFamily/i;

function isHoverCapable() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function ensureStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
${EDITOR_TAG} {
  display: contents;
}
[${TARGET_ATTR}] {
  position: relative;
  outline: 2px solid var(--color-primary-500);
  outline-offset: -2px;
}
[${TARGET_ATTR}]::after {
  content: '';
  position: absolute;
  inset: 0;
  background-color: var(--color-primary-500);
  opacity: 0.08;
  pointer-events: none;
  z-index: var(--z-base);
}
.${DROPDOWN_CLASS} {
  position: fixed;
  top: var(--pds-live-edit-top, auto);
  right: var(--pds-live-edit-right, auto);
  bottom: var(--pds-live-edit-bottom, auto);
  left: var(--pds-live-edit-left, auto);
  z-index: var(--z-popover);
}
.${MARKER_CLASS} {
  pointer-events: auto;
}
.context-edit {
  min-width: 0;
  min-height: 0;
  width: var(--spacing-6);
  height: var(--spacing-6);
  padding: 0;
}
.${DROPDOWN_CLASS} menu {
  min-width: max-content;
  max-width: 350px;
}
.${DROPDOWN_CLASS} .pds-live-editor-menu {
  padding: var(--spacing-1);
  max-width: 350px;
  padding-bottom: 0;
}
.${DROPDOWN_CLASS} .pds-live-editor-form-container {
  padding-bottom: var(--spacing-2);
}
.${DROPDOWN_CLASS} .pds-live-editor-title {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-2);
}
.${DROPDOWN_CLASS} .pds-live-editor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-2);
}
.${DROPDOWN_CLASS} .pds-live-editor-debug {
  font-size: var(--font-size-xs);
  opacity: 0.7;
  white-space: pre-wrap;
  margin-top: var(--spacing-2);
}
.${DROPDOWN_CLASS} .pds-live-editor-menu input[type="color"] {
  height: var(--spacing-6);
  min-width: var(--spacing-9);
  max-width: unset;
  padding: 0;
  border-radius: var(--radius-sm);
}
.${DROPDOWN_CLASS} .pds-live-editor-footer {
  display: flex;
  gap: var(--spacing-2);
  padding: var(--spacing-2);
  border-top: 1px solid var(--color-border);
  background: var(--color-surface-base);
  position: sticky;
  justify-content: space-between;
  bottom: 0;
  z-index: 1;
}
`;
  document.head.appendChild(style);
}

function isSelectorSupported(selector) {
  if (typeof selector !== "string" || !selector.trim()) return false;
  if (typeof CSS !== "undefined" && typeof CSS.supports === "function") {
    try {
      return CSS.supports(`selector(${selector})`);
    } catch (e) {
      return false;
    }
  }
  if (typeof document === "undefined") return false;
  try {
    document.querySelector(selector);
    return true;
  } catch (e) {
    return false;
  }
}

function collectSelectors() {
  const ontology = PDS?.ontology;
  const selectors = new Set();
  if (!ontology) return { selector: "", list: [] };

  const addSelector = (selector) => {
    if (typeof selector !== "string" || !selector.trim()) return;
    if (isSelectorSupported(selector)) selectors.add(selector);
  };

  const addSelectorList = (list) => {
    (list || []).forEach((selector) => addSelector(selector));
  };

  const sections = [ontology.primitives, ontology.components, ontology.layoutPatterns];
  sections.forEach((items) => {
    if (!Array.isArray(items)) return;
    items.forEach((item) => {
      addSelectorList(item?.selectors || []);
    });
  });

  Object.values(ontology.utilities || {}).forEach((group) => {
    if (!group || typeof group !== "object") return;
    Object.values(group).forEach((list) => addSelectorList(list));
  });

  (ontology.enhancements || []).forEach((enhancer) => {
    addSelector(enhancer?.selector);
  });

  addSelector("body");
  addSelector("[data-dropdown]");
  addSelector("*");

  return { selector: Array.from(selectors).join(", "), list: Array.from(selectors) };
}

function shallowClone(value) {
  if (!value || typeof value !== "object") return value;
  return Array.isArray(value) ? [...value] : { ...value };
}

function deepMerge(target = {}, source = {}) {
  if (!source || typeof source !== "object") return target;
  const out = Array.isArray(target) ? [...target] : { ...target };
  for (const [key, value] of Object.entries(source)) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      out[key] = deepMerge(out[key] && typeof out[key] === "object" ? out[key] : {}, value);
    } else {
      out[key] = value;
    }
  }
  return out;
}

function titleize(value) {
  return String(value)
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (char) => char.toUpperCase());
}

function getValueAtPath(obj, pathSegments) {
  let current = obj;
  for (const segment of pathSegments) {
    if (!current || typeof current !== "object") return undefined;
    current = current[segment];
  }
  return current;
}

function setValueAtPath(target, pathSegments, value) {
  let current = target;
  for (let i = 0; i < pathSegments.length; i += 1) {
    const segment = pathSegments[i];
    if (i === pathSegments.length - 1) {
      current[segment] = value;
      return;
    }
    if (!current[segment] || typeof current[segment] !== "object") {
      current[segment] = {};
    }
    current = current[segment];
  }
}

function setValueAtJsonPath(target, jsonPath, value) {
  if (!jsonPath || typeof jsonPath !== "string") return;
  const parts = jsonPath.replace(/^\//, "").split("/").filter(Boolean);
  if (!parts.length) return;
  let current = target;
  parts.forEach((segment, index) => {
    if (index === parts.length - 1) {
      current[segment] = value;
      return;
    }
    if (!current[segment] || typeof current[segment] !== "object") {
      current[segment] = {};
    }
    current = current[segment];
  });
}

function getEnumOptions(path) {
  if (path === "shape.borderWidth") {
    const enumKeys = Object.keys(PDS?.enums?.BorderWidths || {});
    if (enumKeys.length) return enumKeys;
  }
  return ENUM_FIELD_OPTIONS[path] || null;
}

function normalizeEnumValue(path, value) {
  const options = getEnumOptions(path);
  if (!options || !options.length) return value;
  if (typeof value === "string" && options.includes(value)) return value;

  if (path === "shape.borderWidth" && typeof value === "number") {
    const source = PDS?.enums?.BorderWidths || {
      hairline: 0.5,
      thin: 1,
      medium: 2,
      thick: 3,
    };
    const found = Object.entries(source).find(([, num]) => Number(num) === Number(value));
    if (found) return found[0];
  }

  return value;
}

function normalizePaths(paths) {
  const relations = PDS?.configRelations || {};
  const seen = new Set();
  const filtered = [];
  (paths || []).forEach((path) => {
    if (!relations[path]) return;
    if (seen.has(path)) return;
    seen.add(path);
    filtered.push(path);
  });
  return filtered;
}

function collectRelationPathsByCategory() {
  const relations = PDS?.configRelations || {};
  const result = {};
  Object.keys(relations).forEach((path) => {
    const [category] = path.split(".");
    if (!category) return;
    if (!result[category]) result[category] = [];
    result[category].push(path);
  });
  return result;
}

function collectPathsFromRelations(target) {
  const relations = PDS?.configRelations || {};
  const paths = [];
  Object.entries(relations).forEach(([path, relation]) => {
    const rules = relation?.rules || [];
    if (!Array.isArray(rules) || !rules.length) return;
    const matches = rules.some((rule) => {
      const selectors = rule?.selectors || [];
      return selectors.some((selector) => {
        try {
          return target.matches(selector) || Boolean(target.querySelector(selector));
        } catch (e) {
          return false;
        }
      });
    });
    if (matches) paths.push(path);
  });
  return paths;
}

function collectQuickRulePaths(target) {
  return QUICK_RULES.filter((rule) => {
    try {
      return target.matches(rule.selector);
    } catch (e) {
      return false;
    }
  }).flatMap((rule) => rule.paths);
}

function isHeadingElement(target) {
  if (!target || !(target instanceof Element)) return false;
  const tag = target.tagName?.toLowerCase?.() || "";
  if (/^h[1-6]$/.test(tag)) return true;
  if (target.getAttribute("role") === "heading") return true;
  return false;
}

function hasMeaningfulText(target) {
  if (!target || !(target instanceof Element)) return false;
  const tag = target.tagName?.toLowerCase?.() || "";
  if (["script", "style", "svg", "path", "defs", "symbol"].includes(tag)) return false;
  const text = target.textContent || "";
  return text.trim().length > 0;
}

function collectTypographyPathsForTarget(target) {
  if (!target || !(target instanceof Element)) return [];
  if (isHeadingElement(target)) {
    return ["typography.fontFamilyHeadings"];
  }
  if (hasMeaningfulText(target)) {
    return ["typography.fontFamilyBody"];
  }
  return [];
}

function pathExistsInDesign(path, design) {
  if (!path || !design) return false;
  const segments = path.split(".");
  let current = design;
  for (const segment of segments) {
    if (!current || typeof current !== "object") return false;
    if (!(segment in current)) return false;
    current = current[segment];
  }
  return true;
}

function filterPathsByContext(target, paths, alwaysAllow = new Set()) {
  if (!target || !paths.length) return paths;
  const isGlobal = target.matches("body, main");
  const isInForm = Boolean(target.closest("form, pds-form"));
  const isOnSurface = Boolean(
    target.closest(
      ".card, .surface-base, .surface-elevated, .surface-sunken, .surface-subtle"
    )
  );
  const theme = getActiveTheme();
  const design = PDS?.currentConfig?.design || {};

  return paths.filter((path) => {
    if (alwaysAllow.has(path)) return true;
    if (!theme.isDark && path.includes(DARK_MODE_PATH_MARKER)) return false;
    if (path.startsWith("typography.") && !isGlobal) return false;
    if (GLOBAL_LAYOUT_PATHS.has(path) && !isGlobal) return false;
    if (FORM_CONTEXT_PATHS.has(path) && !isInForm) return false;
    if (SURFACE_CONTEXT_PATHS.has(path) && !(isOnSurface || isGlobal)) return false;
    // Opacity fields should never be under colors category
    if (path.startsWith("colors.") && path.toLowerCase().includes("opacity")) return false;
    // Always allow borderWidth in quick edit (design may be partial/override-only)
    if (path === "shape.borderWidth") return true;
    // Filter out paths that don't exist in the current design config
    if (!pathExistsInDesign(path, design)) return false;
    return true;
  });
}

function getActiveTheme() {
  if (typeof document === "undefined") return { value: "light", isDark: false };
  const attr = document.documentElement?.getAttribute("data-theme");
  const value = attr === "dark" ? "dark" : "light";
  return { value, isDark: value === "dark" };
}

function getSpacingOffset() {
  if (typeof window === "undefined" || typeof document === "undefined") return 8;
  const value = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--spacing-2")
    .trim();
  const parsed = Number.parseFloat(value);
  if (Number.isNaN(parsed)) return 8;
  return parsed;
}

function ensureColorNormalizer() {
  if (typeof document === "undefined") return null;
  if (colorNormalizer && document.contains(colorNormalizer)) return colorNormalizer;
  if (!document.body) return null;
  const probe = document.createElement("span");
  probe.setAttribute("data-pds-color-normalizer", "");
  probe.style.position = "fixed";
  probe.style.left = "-9999px";
  probe.style.top = "0";
  probe.style.opacity = "0";
  probe.style.pointerEvents = "none";
  document.body.appendChild(probe);
  colorNormalizer = probe;
  return colorNormalizer;
}

function normalizeCssColor(value) {
  if (!value || typeof window === "undefined") return null;
  const probe = ensureColorNormalizer();
  if (!probe) return null;
  probe.style.color = "";
  probe.style.color = value;
  return window.getComputedStyle(probe).color || null;
}

function rgbToHex(value) {
  if (!value) return null;
  const match = value.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (!match) return null;
  const [r, g, b] = match.slice(1, 4).map((num) => {
    const parsed = Number.parseInt(num, 10);
    if (Number.isNaN(parsed)) return 0;
    return Math.max(0, Math.min(255, parsed));
  });
  const hex = (channel) => channel.toString(16).padStart(2, "0");
  return `#${hex(r)}${hex(g)}${hex(b)}`;
}

function normalizeHexColor(value) {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed.startsWith("#")) return null;
  if (trimmed.length === 4) {
    const [r, g, b] = trimmed.slice(1).split("");
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }
  if (trimmed.length === 7) return trimmed.toLowerCase();
  return null;
}

function toColorInputValue(value) {
  if (!value) return value;
  const normalizedHex = normalizeHexColor(value);
  if (normalizedHex) return normalizedHex;
  const normalized = normalizeCssColor(value) || value;
  const hexValue = normalizeHexColor(normalized) || rgbToHex(normalized);
  return hexValue || value;
}

function getCustomPropertyNames(style) {
  const names = [];
  if (!style) return names;
  for (let i = 0; i < style.length; i += 1) {
    const name = style[i];
    if (name && name.startsWith("--")) names.push(name);
  }
  return names;
}

function makeTokenMatchers(relations) {
  const matchers = [];
  Object.entries(relations || {}).forEach(([path, relation]) => {
    const tokens = relation?.tokens || [];
    if (!Array.isArray(tokens)) return;
    tokens.forEach((pattern) => {
      if (!pattern || typeof pattern !== "string") return;
      const escaped = pattern
        .replace(/[-/\\^$+?.()|[\]{}]/g, "\\$&")
        .replace(/\*/g, ".*");
      const regex = new RegExp(`^${escaped}$`);
      matchers.push({ path, regex });
    });
  });
  return matchers;
}

function addToValueMap(map, key, value) {
  if (!key) return;
  const entry = map.get(key);
  if (entry) {
    entry.add(value);
  } else {
    map.set(key, new Set([value]));
  }
}

function getTokenIndex() {
  if (typeof window === "undefined" || typeof document === "undefined") return null;
  const relations = PDS?.configRelations || {};
  const relationCount = Object.keys(relations).length;
  const root = document.documentElement;
  if (!root) return null;
  const rootStyle = window.getComputedStyle(root);
  const bodyStyle = document.body ? window.getComputedStyle(document.body) : null;
  const customProps = Array.from(
    new Set([...
      getCustomPropertyNames(rootStyle),
      ...getCustomPropertyNames(bodyStyle),
    ])
  );
  const meta = { relationCount, propCount: customProps.length };
  if (cachedTokenIndex && cachedTokenIndexMeta) {
    if (
      cachedTokenIndexMeta.relationCount === meta.relationCount &&
      cachedTokenIndexMeta.propCount === meta.propCount
    ) {
      return cachedTokenIndex;
    }
  }

  const matchers = makeTokenMatchers(relations);
  const varToPaths = new Map();
  const valueToVars = new Map();
  const colorToVars = new Map();

  const getVarValue = (varName) => {
    const rootValue = rootStyle.getPropertyValue(varName).trim();
    if (rootValue) return rootValue;
    if (!bodyStyle) return "";
    return bodyStyle.getPropertyValue(varName).trim();
  };

  customProps.forEach((varName) => {
    const varValue = getVarValue(varName);
    if (varValue) {
      addToValueMap(valueToVars, varValue, varName);
      const normalizedColor = normalizeCssColor(varValue);
      if (normalizedColor) addToValueMap(colorToVars, normalizedColor, varName);
    }
    matchers.forEach(({ path, regex }) => {
      if (regex.test(varName)) {
        addToValueMap(varToPaths, varName, path);
      }
    });
  });

  cachedTokenIndex = { varToPaths, valueToVars, colorToVars, matchers, getVarValue };
  cachedTokenIndexMeta = meta;
  return cachedTokenIndex;
}

function extractAllVarRefs(text) {
  const vars = new Set();
  if (!text) return vars;
  // Extract all custom property names (--*) from text, including nested var() fallbacks
  const customPropMatches = text.matchAll(/--[a-zA-Z0-9_-]+/g);
  for (const match of customPropMatches) {
    vars.add(match[0]);
  }
  return vars;
}

function collectVarRefsFromInline(element) {
  const vars = new Set();
  if (!element || typeof element.getAttribute !== "function") return vars;
  const styleAttr = element.getAttribute("style") || "";
  if (!styleAttr) return vars;
  return extractAllVarRefs(styleAttr);
}

function collectScanTargets(target, limit = 120) {
  const nodes = [target];
  if (!target || typeof target.querySelectorAll !== "function") return nodes;
  const descendants = Array.from(target.querySelectorAll("*"));
  if (descendants.length <= limit) return nodes.concat(descendants);
  return nodes.concat(descendants.slice(0, limit));
}

function collectVarRefsFromMatchingRules(element) {
  const vars = new Set();
  if (!element || typeof window === "undefined") return vars;
  
  try {
    // Scan all stylesheets for rules that match this element
    const sheets = Array.from(document.styleSheets);
    
    for (const sheet of sheets) {
      try {
        // Skip external sheets due to CORS
        const rules = sheet.cssRules || sheet.rules;
        if (!rules) continue;
        
        for (const rule of rules) {
          // Check CSSStyleRule (ignoring @media, @keyframes, etc for now)
          if (rule.type === CSSRule.STYLE_RULE) {
            try {
              if (element.matches(rule.selectorText)) {
                // Extract var refs from all properties in this rule
                const cssText = rule.style.cssText;
                if (cssText) {
                  const extracted = extractAllVarRefs(cssText);
                  extracted.forEach(v => vars.add(v));
                }
              }
            } catch (e) {
              // Invalid selector or matching error
            }
          }
        }
      } catch (e) {
        // CORS or other sheet access error
      }
    }
  } catch (e) {
    // Fallback silently
  }
  
  return vars;
}

function collectPathsFromComputedStyles(target) {
  const index = getTokenIndex();
  if (!index || !target || typeof window === "undefined") return [];
  const { varToPaths, valueToVars, colorToVars, matchers, getVarValue } = index;
  const varsSeen = new Set();
  const varsOrdered = [];
  const scanTargets = collectScanTargets(target);
  const addVarName = (name) => {
    if (!name || varsSeen.has(name)) return;
    varsSeen.add(name);
    varsOrdered.push(name);
  };
  const addVarSet = (set) => {
    set.forEach((name) => addVarName(name));
  };

  scanTargets.forEach((node) => {
    addVarSet(collectVarRefsFromInline(node));
    addVarSet(collectVarRefsFromMatchingRules(node));

    let style = null;
    try {
      style = window.getComputedStyle(node);
    } catch (e) {
      style = null;
    }
    if (!style) return;

    // Extract var refs from all properties (custom AND standard)
    // We scan custom properties to find nested var() chains
    // We scan standard properties to find var() usage
    // We do NOT add custom property names themselves - those are definitions, not usage
    for (let i = 0; i < style.length; i += 1) {
      const propName = style[i];
      const propValue = style.getPropertyValue(propName);
      if (propValue) {
        // Extract all var() references including nested fallbacks
        addVarSet(extractAllVarRefs(propValue));
      }
    }

    QUICK_STYLE_PROPERTIES.forEach((prop) => {
      const value = style.getPropertyValue(prop);
      if (!value) return;
      const trimmed = value.trim();
      
      // Extract var refs from the value (handles var() with fallbacks)
      const directVarRefs = extractAllVarRefs(trimmed);
      addVarSet(directVarRefs);
      const hasDirectVarRefs = directVarRefs.size > 0;
      if (hasDirectVarRefs) return;
      
      if (trimmed && valueToVars.has(trimmed)) {
        valueToVars.get(trimmed).forEach((varName) => addVarName(varName));
      }

      const colors = trimmed.match(COLOR_VALUE_REGEX) || [];
      colors.forEach((color) => {
        const normalized = normalizeCssColor(color) || color;
        if (colorToVars.has(normalized)) {
          colorToVars.get(normalized).forEach((varName) => addVarName(varName));
        }
      });
    });
  });

  const paths = [];
  const seenPaths = new Set();
  const hints = {};
  const addPath = (path) => {
    if (!path || seenPaths.has(path)) return;
    seenPaths.add(path);
    paths.push(path);
  };
  const addHint = (path, varName) => {
    if (!path || !varName) return;
    if (!path.startsWith("colors.")) return;
    if (path.includes(DARK_MODE_PATH_MARKER) && !getActiveTheme().isDark) return;
    if (hints[path]) return;
    const rawValue = getVarValue ? getVarValue(varName) : "";
    if (!rawValue) return;
    const normalized = toColorInputValue(rawValue);
    hints[path] = normalized;
  };
  const matchVarName = (varName) => {
    const direct = varToPaths.get(varName);
    if (direct) {
      direct.forEach((path) => {
        addPath(path);
        addHint(path, varName);
      });
      return;
    }
    (matchers || []).forEach(({ path, regex }) => {
      if (regex.test(varName)) {
        addPath(path);
        addHint(path, varName);
      }
    });
  };

  varsOrdered.forEach((varName) => matchVarName(varName));

  return { paths: normalizePaths(paths), hints, debug: { vars: varsOrdered, paths } };
}

function collectQuickContext(target) {
  const computed = collectPathsFromComputedStyles(target);
  const byComputed = computed?.paths || [];
  const byRelations = collectPathsFromRelations(target);
  const byQuickRules = collectQuickRulePaths(target);
  const byTypographyContext = collectTypographyPathsForTarget(target);
  const hints = computed?.hints || {};
  const debug = computed?.debug || { vars: [], paths: [] };
  const alwaysAllow = new Set(byTypographyContext);

  // Prioritize quick rule paths first (selector-based), then computed/relations
  const filtered = filterPathsByContext(target, [
    ...byTypographyContext,
    ...byQuickRules,
    ...byComputed,
    ...byRelations,
  ], alwaysAllow);
  if (!filtered.length) {
    return {
      paths: normalizePaths(DEFAULT_QUICK_PATHS),
      hints: {},
      debug: { vars: [], paths: [] },
    };
  }
  return { paths: normalizePaths(filtered), hints, debug };
}

function collectDrawerPaths(quickPaths) {
  const categories = new Set();
  quickPaths.forEach((path) => categories.add(path.split(".")[0]));
  const expanded = [];
  const relationMap = collectRelationPathsByCategory();
  categories.forEach((category) => {
    const fields = relationMap[category] || [];
    expanded.push(...fields);
  });
  return normalizePaths([...quickPaths, ...expanded]);
}

function splitFontFamilyStack(value) {
  if (typeof value !== "string") return [];
  const input = value.trim();
  if (!input) return [];
  const parts = [];
  let buffer = "";
  let quote = null;
  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];
    if (quote) {
      buffer += char;
      if (char === quote && input[i - 1] !== "\\") {
        quote = null;
      }
      continue;
    }
    if (char === '"' || char === "'") {
      quote = char;
      buffer += char;
      continue;
    }
    if (char === ",") {
      const token = buffer.trim();
      if (token) parts.push(token);
      buffer = "";
      continue;
    }
    buffer += char;
  }
  const last = buffer.trim();
  if (last) parts.push(last);
  return parts;
}

function getPresetFontFamilyVariations() {
  const presets = Object.values(PDS?.presets || {});
  const seen = new Set();
  const items = [];
  const addItem = (fontFamily) => {
    const normalized = String(fontFamily || "").trim().replace(/\s+/g, " ");
    if (!normalized || seen.has(normalized)) return;
    seen.add(normalized);
    items.push({
      id: normalized,
      text: normalized,
      style: `font-family: ${normalized}`,
    });
  };

  presets.forEach((preset) => {
    const typography = preset?.typography || {};
    ["fontFamilyHeadings", "fontFamilyBody"].forEach((key) => {
      const stack = typography[key];
      if (typeof stack !== "string" || !stack.trim()) return;

      addItem(stack);
      const parts = splitFontFamilyStack(stack);
      parts.forEach((part) => addItem(part));
      for (let i = 1; i < parts.length; i += 1) {
        addItem(parts.slice(i).join(", "));
      }
    });
  });

  return items;
}

function buildFontFamilyOmniboxSettings() {
  const allItems = getPresetFontFamilyVariations();
  const filterItems = (search) => {
    const query = String(search || "").trim().toLowerCase();
    if (!query) return allItems;
    return allItems.filter((item) => item.text.toLowerCase().includes(query));
  };

  return {    
    hideCategory: true,
    iconHandler: (item) => {
      
      return "";
    },
    categories: {
      FontFamilies: {
        trigger: () => true,
        getItems: (options) => filterItems(options?.search),
        action: (options, ev) => {
          const input = document.querySelector("[name='/typography/fontFamilyHeadings']");
          
          if (input && input.tagName === "PDS-OMNIBOX") {
            input.value = options?.text || "";
            
          }
          return options?.text || options?.id;
        },
      },
    },
  };
}

function buildSchemaFromPaths(paths, design, hints = {}) {
  const schema = { type: "object", properties: {} };
  const uiSchema = {};

  const getStepFromValue = (value) => {
    if (typeof value !== "number" || Number.isNaN(value)) return null;
    const parts = String(value).split(".");
    if (parts.length < 2) return 1;
    const decimals = parts[1].length;
    return Number(`0.${"1".padStart(decimals, "0")}`);
  };

  const inferRangeBounds = (path, value) => {
    const hint = String(path || "").toLowerCase();
    if (hint.includes("opacity")) return { min: 0, max: 1, step: 0.01 };
    if (hint.includes("scale") || hint.includes("ratio")) {
      return { min: 1, max: 2, step: 0.01 };
    }
    if (
      hint.includes("size") ||
      hint.includes("radius") ||
      hint.includes("padding") ||
      hint.includes("gap") ||
      hint.includes("spacing") ||
      hint.includes("width") ||
      hint.includes("height") ||
      hint.includes("shadow")
    ) {
      return { min: 0, max: 64, step: 1 };
    }
    if (typeof value === "number") {
      if (value >= 0 && value <= 1) return { min: 0, max: 1, step: 0.01 };
      const magnitude = Math.max(1, Math.abs(value));
      const upper = Math.max(10, Math.ceil(magnitude * 4));
      return { min: 0, max: upper, step: getStepFromValue(value) || 1 };
    }
    return { min: 0, max: 100, step: 1 };
  };

  const isColorValue = (value, path) => {
    if (String(path || "").toLowerCase().startsWith("colors.")) return true;
    if (typeof value !== "string") return false;
    return /^#([0-9a-f]{3,8})$/i.test(value) || /^rgba?\(/i.test(value) || /^hsla?\(/i.test(value);
  };

  paths.forEach((path) => {
    const segments = path.split(".");
    const [category, ...rest] = segments;
    if (!category || !rest.length) return;

    let parent = schema.properties[category];
    if (!parent) {
      parent = { type: "object", title: titleize(category), properties: {} };
      schema.properties[category] = parent;

      if (category === "colors") {
        uiSchema[`/${category}`] = {
          "ui:layout": "flex",
          "ui:layoutOptions": { wrap: true, gap: "sm" },
        };
      }
    }

    let current = parent;
    for (let i = 0; i < rest.length; i += 1) {
      const segment = rest[i];
      if (i === rest.length - 1) {
        const value = getValueAtPath(design, [category, ...rest]);
        const hintValue = hints[path];
        const enumOptions = getEnumOptions(path);
        const normalizedValue = normalizeEnumValue(path, value);
        const normalizedHint = normalizeEnumValue(path, hintValue);
        const inferredType = Array.isArray(value)
          ? "array"
          : value === null
            ? "string"
            : typeof value;
        const schemaType = enumOptions?.length
          ? "string"
          : inferredType === "number" || inferredType === "boolean"
            ? inferredType
            : "string";
        current.properties[segment] = {
          type: schemaType,
          title: titleize(segment),
          ...(enumOptions?.length
            ? {
                oneOf: enumOptions.map((option) => ({
                  const: option,
                  title: titleize(option),
                })),
              }
            : {}),
          examples:
            normalizedValue !== undefined && normalizedValue !== null
              ? [normalizedValue]
              : normalizedHint !== undefined
                ? [normalizedHint]
                : undefined,
        };

        const pointer = `/${[category, ...rest].join("/")}`;
        const uiEntry = {};

        if (enumOptions?.length) {
          uiEntry["ui:widget"] = "select";
        }

        // Check for opacity/numeric fields BEFORE color check
        const pathLower = String(path || "").toLowerCase();
        const isOpacityField = pathLower.includes("opacity");
        
        if (isOpacityField || (schemaType === "number" && !isColorValue(value, path))) {
          const bounds = inferRangeBounds(path, value);
          uiEntry["ui:widget"] = "input-range";
          uiEntry["ui:min"] = bounds.min;
          uiEntry["ui:max"] = bounds.max;
          uiEntry["ui:step"] = bounds.step;
        } else if (isColorValue(value, path)) {
          uiEntry["ui:widget"] = "input-color";
        } else if (FONT_FAMILY_PATH_REGEX.test(path) && schemaType === "string") {
          uiEntry["ui:widget"] = "font-family-omnibox";
        }

        const isTextOrNumberInput =
          (schemaType === "string" || schemaType === "number") &&
          !uiEntry["ui:widget"];
        if (isTextOrNumberInput) {
          uiEntry["ui:icon"] = CATEGORY_ICONS[category] || "sparkle";
        }

        uiSchema[pointer] = uiEntry;
        return;
      }

      if (!current.properties[segment]) {
        current.properties[segment] = { type: "object", properties: {} };
      }
      current = current.properties[segment];
    }
  });

  return { schema, uiSchema };
}

async function getGeneratorClass() {
  if (!PDS?.getGenerator) return null;
  try {
    return await PDS.getGenerator();
  } catch (e) {
    return null;
  }
}

async function applyDesignPatch(patch) {
  if (!patch || typeof patch !== "object") return;
  const Generator = await getGeneratorClass();
  const generator = Generator?.instance;
  if (!generator || !generator.options) return;

  const presetKeyMatches = (key, compareTo) => {
    if (!key || !compareTo) return false;
    return slugifyPreset(key) === slugifyPreset(compareTo);
  };

  const slugifyPreset = (value) =>
    String(value || "")
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const resolvePresetBase = (presetId) => {
    const presets = PDS?.presets || {};
    if (!presetId) return { id: null, preset: null };
    if (presets[presetId]) {
      return { id: presetId, preset: presets[presetId] };
    }
    const presetKeys = Object.keys(presets || {});
    const matchedKey = presetKeys.find((key) => presetKeyMatches(key, presetId));
    if (matchedKey) {
      return { id: matchedKey, preset: presets[matchedKey] };
    }
    const found = Object.values(presets).find((preset) => {
      const name = preset?.name || preset?.id || "";
      return presetKeyMatches(name, presetId);
    });
    if (found) {
      const foundId = found.id || found.name || presetId;
      return { id: foundId, preset: found };
    }
    return { id: presetId, preset: null };
  };

  const currentOptions = generator.options;
  let storedConfig = null;
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const raw = window.localStorage.getItem("pure-ds-config");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && ("preset" in parsed || "design" in parsed)) {
          storedConfig = parsed;
        }
      }
    } catch (e) {
      storedConfig = null;
    }
  }

  const storedPreset = storedConfig?.preset;
  const hasStoredPreset = Boolean(storedPreset);
  const storedOverrides =
    storedConfig && storedConfig.design && typeof storedConfig.design === "object"
      ? storedConfig.design
      : {};
  let presetId = storedPreset || currentOptions.preset || PDS?.currentConfig?.preset || null;
  const inferredPreset = currentOptions.design?.id || currentOptions.design?.name || null;
  if (!presetId && inferredPreset && !hasStoredPreset) {
    const inferredMatch = resolvePresetBase(inferredPreset);
    if (inferredMatch?.preset) presetId = inferredMatch.id;
  }
  if (String(presetId || "").toLowerCase() === "default" && inferredPreset && !hasStoredPreset) {
    const inferredMatch = resolvePresetBase(inferredPreset);
    if (inferredMatch?.preset) presetId = inferredMatch.id;
  }

  const resolvedPreset = resolvePresetBase(presetId);
  const resolvedPresetId = resolvedPreset.id || presetId || null;
  const presetBase = resolvedPreset.preset || null;

  const baseDesign = presetBase
    ? deepMerge(shallowClone(presetBase), storedOverrides)
    : shallowClone(currentOptions.design || {});
  const nextDesign = deepMerge(shallowClone(baseDesign), patch);
  const nextOptions = { ...currentOptions, design: nextDesign };
  if (resolvedPresetId) nextOptions.preset = resolvedPresetId;

  const nextGenerator = new Generator(nextOptions);
  if (PDS?.applyStyles) {
    await PDS.applyStyles(nextGenerator);
  }

  if (PDS) {
    try {
      PDS.currentConfig = Object.freeze({
        ...(PDS.currentConfig || {}),
        design: structuredClone(nextDesign),
        preset: resolvedPresetId || PDS.currentConfig?.preset,
      });
    } catch (e) {
      PDS.currentConfig = {
        ...(PDS.currentConfig || {}),
        design: nextDesign,
        preset: resolvedPresetId || PDS.currentConfig?.preset,
      };
    }

    try {
      const event = new CustomEvent("design-updated", {
        detail: { config: nextDesign },
      });
      PDS.dispatchEvent(event);
    } catch (e) {}
  }

  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const nextStored = {
        preset: resolvedPresetId || null,
        design: shallowClone(nextDesign),
      };
      window.localStorage.setItem("pure-ds-config", JSON.stringify(nextStored));
    } catch (e) {}
  }
}

function getStoredConfig() {
  if (typeof window === "undefined" || !window.localStorage) return null;
  try {
    const raw = window.localStorage.getItem("pure-ds-config");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && ("preset" in parsed || "design" in parsed)) return parsed;
  } catch (e) {
    return null;
  }
  return null;
}

function setStoredConfig(nextConfig) {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    window.localStorage.setItem("pure-ds-config", JSON.stringify(nextConfig));
  } catch (e) {}
}

function getPresetOptions() {
  const presets = PDS?.presets || {};
  return Object.values(presets)
    .map((preset) => ({
      id: preset?.id || preset?.name,
      name: preset?.name || preset?.id || "Unnamed",
    }))
    .filter((preset) => preset.id)
    .sort((a, b) => String(a.name).localeCompare(String(b.name)));
}

function getActivePresetId() {
  const stored = getStoredConfig();
  return stored?.preset || PDS?.currentConfig?.preset || PDS?.currentPreset || null;
}

async function applyPresetSelection(presetId) {
  if (!presetId) return;
  setStoredConfig({
    preset: presetId,
    design: {},
  });
  await applyDesignPatch({});
}

function figmafyTokens(rawTokens) {
  const isPlainObject = (value) =>
    value !== null && typeof value === "object" && !Array.isArray(value);

  const detectType = (path, key, value) => {
    const root = path[0];

    if (root === "colors") {
      if (key === "scheme") return "string";
      return "color";
    }

    if (root === "spacing" || root === "radius" || root === "borderWidths") {
      return "dimension";
    }

    if (root === "typography") {
      const group = path[1];
      if (group === "fontFamily") return "fontFamily";
      if (group === "fontSize") return "fontSize";
      if (group === "fontWeight") return "fontWeight";
      if (group === "lineHeight") return "lineHeight";
      return "string";
    }

    if (root === "shadows") return "shadow";
    if (root === "layout") return "dimension";
    if (root === "transitions") return "duration";
    if (root === "zIndex") return "number";

    if (root === "icons") {
      if (key === "defaultSize" || path.includes("sizes")) {
        return "dimension";
      }
      return "string";
    }

    if (typeof value === "number") {
      return "number";
    }

    if (typeof value === "string") {
      if (/^\d+(\.\d+)?ms$/.test(value)) return "duration";
      if (/^\d+(\.\d+)?(px|rem|em|vh|vw|%)$/.test(value)) return "dimension";

      if (
        /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(value) ||
        /^(rgb|rgba|hsl|hsla|oklab|lab)\(/.test(value)
      ) {
        return "color";
      }
    }

    return undefined;
  };

  const walk = (node, path = []) => {
    if (node == null) return node;

    if (Array.isArray(node)) {
      return node.map((item, index) => walk(item, path.concat(String(index))));
    }

    if (isPlainObject(node)) {
      if (
        Object.prototype.hasOwnProperty.call(node, "value") &&
        (Object.prototype.hasOwnProperty.call(node, "type") ||
          Object.keys(node).length === 1)
      ) {
        return node;
      }

      const result = {};
      for (const [key, value] of Object.entries(node)) {
        result[key] = walk(value, path.concat(key));
      }
      return result;
    }

    const key = path[path.length - 1] ?? "";
    const type = detectType(path, key, node);
    let value = node;

    if (type === "number" && typeof value === "string") {
      const num = Number(value);
      if (!Number.isNaN(num)) value = num;
    }

    return type ? { value, type } : { value };
  };

  return walk(rawTokens, []);
}

function downloadTextFile(content, filename, mimeType) {
  if (typeof document === "undefined") return;
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function getLiveEditExportConfig() {
  const stored = getStoredConfig();
  const design = shallowClone(PDS?.currentConfig?.design || stored?.design || {});
  const preset = stored?.preset || PDS?.currentConfig?.preset || PDS?.currentPreset || null;
  return {
    preset,
    design,
  };
}

function buildConfigModuleContent(config) {
  return `export const pdsConfig = ${JSON.stringify(config, null, 2)};\n\nexport default pdsConfig;\n`;
}

async function exportFromLiveEdit(format) {
  try {
    if (format === "config") {
      const config = getLiveEditExportConfig();
      const content = buildConfigModuleContent(config);
      downloadTextFile(content, "pds.config.js", "text/javascript");
      await PDS?.toast?.("Exported config file", { type: "success" });
      return;
    }

    if (format === "figma") {
      const Generator = await getGeneratorClass();
      const generator = Generator?.instance;
      if (!generator || typeof generator.generateTokens !== "function") {
        throw new Error("Token generator unavailable");
      }

      const rawTokens = generator.generateTokens();
      const figmaTokens = figmafyTokens(rawTokens);
      const content = JSON.stringify(figmaTokens, null, 2);
      downloadTextFile(content, "design-tokens.figma.json", "application/json");
      await PDS?.toast?.("Exported Figma tokens", { type: "success" });
      return;
    }
  } catch (error) {
    console.warn("[pds-live-edit] Export failed", error);
    await PDS?.toast?.("Export failed", { type: "error" });
  }
}

function setFormSchemas(form, schema, uiSchema, design) {
  form.jsonSchema = schema;
  form.uiSchema = uiSchema;
  form.values = shallowClone(design);
}

async function buildForm(paths, design, onSubmit, onUndo, hints = {}) {
  const { schema, uiSchema } = buildSchemaFromPaths(paths, design, hints);

  if (!customElements.get("pds-form")) {
    await customElements.whenDefined("pds-form");
  }

  const form = document.createElement("pds-form");
  const fontFamilyOmniboxSettings = buildFontFamilyOmniboxSettings();
  form.setAttribute("hide-actions", "");
  form.options = {
    layouts: {
      arrays: "compact",
    },
    enhancements: {
      rangeOutput: true,
    },
  };
  form.defineRenderer(
    "font-family-omnibox",
    ({ id, path, value, attrs, set }) => {
      const resolveSelectedValue = (options, actionResult) => {
        if (typeof actionResult === "string" && actionResult.trim()) {
          return actionResult;
        }
        const fromText = String(options?.text || "").trim();
        if (fromText) return fromText;
        return String(options?.id || "").trim();
      };

      const categories = Object.fromEntries(
        Object.entries(fontFamilyOmniboxSettings.categories || {}).map(
          ([categoryName, categoryConfig]) => {
            const originalAction = categoryConfig?.action;
            return [
              categoryName,
              {
                ...categoryConfig,
                action: (options) => {                  
                  const actionResult =
                    typeof originalAction === "function"
                      ? originalAction(options)
                      : undefined;
                  const selected = resolveSelectedValue(options, actionResult);
                  if (selected) {
                    set(selected);
                  }
                  return actionResult;
                },
              },
            ];
          }
        )
      );

      const omnibox = document.createElement("pds-omnibox");
      omnibox.id = id;
      omnibox.setAttribute("name", path);
      omnibox.setAttribute("item-grid", "0 1fr");
      omnibox.setAttribute("placeholder", attrs?.placeholder || "Select a font family");           
      omnibox.value = value ?? "";
      omnibox.settings = {
        ...fontFamilyOmniboxSettings,
        categories,
      };
      omnibox.addEventListener("input", (event) => {
        set(event?.target?.value ?? omnibox.value ?? "");
      });
      omnibox.addEventListener("change", (event) => {
        set(event?.target?.value ?? omnibox.value ?? "");
      });
      return omnibox;
    }
  );
  form.addEventListener("pw:submit", onSubmit);
  const values = shallowClone(design || {});
  Object.keys(ENUM_FIELD_OPTIONS).forEach((path) => {
    const normalized = normalizeEnumValue(path, getValueAtPath(values, path.split(".")));
    if (normalized !== undefined) {
      setValueAtPath(values, path.split("."), normalized);
    }
  });
  Object.entries(hints || {}).forEach(([path, hintValue]) => {
    const segments = path.split(".");
    const currentValue = getValueAtPath(values, segments);
    if (currentValue === undefined || currentValue === null) {
      setValueAtPath(values, segments, hintValue);
    }
  });
  setFormSchemas(form, schema, uiSchema, values);

  // Apply button (will trigger form submit programmatically)
  const applyBtn = document.createElement("button");
  applyBtn.className = "btn-primary btn-sm";
  applyBtn.type = "button";
  applyBtn.textContent = "Apply";
  applyBtn.addEventListener("click", async () => {
    // Manually trigger pw:submit event for pds-form
    if (typeof form.getValuesFlat === "function") {
      // Wait for form to be ready if it's still loading
      if (!customElements.get("pds-form")) {
        await customElements.whenDefined("pds-form");
      }
      
      const flatValues = form.getValuesFlat();
      const event = new CustomEvent("pw:submit", {
        detail: {
          json: flatValues,
          formData: new FormData(),
          valid: true,
          issues: []
        },
        bubbles: true,
        cancelable: true
      });
      form.dispatchEvent(event);
    }
  });

  // Undo button
  const undoBtn = document.createElement("button");
  undoBtn.className = "btn-secondary btn-sm";
  undoBtn.type = "button";
  undoBtn.textContent = "Undo";
  undoBtn.addEventListener("click", onUndo);

  return { form, applyBtn, undoBtn };
}

class PdsLiveEdit extends HTMLElement {
  constructor() {
    super();
    this._boundMouseOver = this._handleMouseOver.bind(this);
    this._boundMouseOut = this._handleMouseOut.bind(this);
    this._boundMouseMove = this._handleMouseMove.bind(this);
    this._boundReposition = this._repositionDropdown.bind(this);
    this._activeTarget = null;
    this._activeDropdown = null;
    this._holdOpen = false;
    this._closeTimer = null;
    this._drawer = null;
    this._selectors = null;
    this._lastPointer = null;
    this._boundDocKeydown = this._handleDocumentKeydown.bind(this);
    this._connected = false;
    this._undoStack = [];
    this._dropdownMenuOpen = false;
    this._dropdownObserver = null;
  }

  connectedCallback() {
    if (this._connected) return;
    if (PdsLiveEdit._activeInstance && PdsLiveEdit._activeInstance !== this) {
      PdsLiveEdit._activeInstance._teardown();
    }
    PdsLiveEdit._activeInstance = this;
    this._connected = true;
    if (!isHoverCapable()) return;

    ensureStyles();
    this._selectors = collectSelectors();
    document.addEventListener("mouseover", this._boundMouseOver, true);
    document.addEventListener("mouseout", this._boundMouseOut, true);
    document.addEventListener("mousemove", this._boundMouseMove, true);
  }

  disconnectedCallback() {
    this._teardown();
  }

  _teardown() {
    if (this._connected) {
      document.removeEventListener("mouseover", this._boundMouseOver, true);
      document.removeEventListener("mouseout", this._boundMouseOut, true);
      document.removeEventListener("mousemove", this._boundMouseMove, true);
    }
    this._removeRepositionListeners();
    this._clearCloseTimer();
    this._removeActiveUI();
    this._connected = false;
    if (PdsLiveEdit._activeInstance === this) {
      PdsLiveEdit._activeInstance = null;
    }
  }

  _handleMouseOver(event) {
    if (!event?.target || !(event.target instanceof Element)) return;
    
    // Check if we're hovering over the dropdown (including Shadow DOM elements)
    if (this._activeDropdown) {
      const path = event.composedPath ? event.composedPath() : [event.target];
      const isOverDropdown = path.some(node => node === this._activeDropdown);
      if (isOverDropdown) {
        this._clearCloseTimer();
        return;
      }
    }
    
    const target = this._findEditableTarget(event.target);
    
    // If hovering over the same active target, just clear timer
    if (target && target === this._activeTarget) {
      this._clearCloseTimer();
      return;
    }
    
    // If hovering over a new target, show its editor
    if (target && target !== this._activeTarget) {
      this._removeActiveUI();
      this._showForTarget(target);
    }
  }

  _handleMouseOut(event) {
    if (!this._activeTarget) return;
    
    // Schedule a delayed close - the safe zone logic will determine if we actually close
    this._scheduleClose();
  }

  _findEditableTarget(node) {
    const tag = node.tagName?.toLowerCase?.();
    if (tag && ["html", "head", "meta", "link", "style", "script", "title"].includes(tag)) {
      return null;
    }
    if (!this._selectors?.selector) return null;
    if (node.closest(EDITOR_TAG)) return null;
    if (node.closest(`.${DROPDOWN_CLASS}`)) return null;
    if (node.closest("pds-drawer")) return null;

    try {
      return node.closest(this._selectors.selector);
    } catch (e) {
      return null;
    }
  }

  _showForTarget(target) {
    const quickContext = collectQuickContext(target);
    const quickPaths = quickContext.paths;
    if (!quickPaths.length) return;

    this._holdOpen = true;

    target.setAttribute(TARGET_ATTR, "true");
    const dropdown = this._buildDropdown(
      target,
      quickPaths,
      quickContext.hints,
      quickContext.debug
    );
    document.body.appendChild(dropdown);
    this._positionDropdown(target, dropdown);
    this._addRepositionListeners();
    this._addDocumentListeners();
    this._addMouseMoveListener();

    this._activeTarget = target;
    this._activeDropdown = dropdown;
    
    // Watch for dropdown menu opening/closing
    this._watchDropdownState();
  }

  _removeActiveUI() {
    this._clearCloseTimer();
    this._removeRepositionListeners();
    this._removeDocumentListeners();
    this._removeMouseMoveListener();
    this._unwatchDropdownState();
    if (this._activeDropdown && this._activeDropdown.parentNode) {
      this._activeDropdown.parentNode.removeChild(this._activeDropdown);
    }
    if (this._activeTarget) {
      this._activeTarget.removeAttribute(TARGET_ATTR);
    }
    this._activeTarget = null;
    this._activeDropdown = null;
    this._holdOpen = false;
    this._lastPointer = null;
    this._dropdownMenuOpen = false;
    
    // Always re-enable mouseover when UI is removed
    this._addMouseOverListener();
  }

  _addDocumentListeners() {
    if (typeof document === "undefined") return;
    document.addEventListener("keydown", this._boundDocKeydown, true);
  }

  _removeDocumentListeners() {
    if (typeof document === "undefined") return;
    document.removeEventListener("keydown", this._boundDocKeydown, true);
  }

  _handleDocumentKeydown(event) {
    if (!event || event.key !== "Escape") return;
    if (this._activeDropdown || this._activeTarget) {
      event.preventDefault();
      this._removeActiveUI();
    }
  }

  _scheduleClose() {
    if (typeof window === "undefined") return;
    this._clearCloseTimer();
    this._closeTimer = window.setTimeout(() => {
      if (this._holdOpen) return;
      if (this._activeDropdown && this._activeDropdown.matches(":hover")) return;
      if (this._activeTarget && this._activeTarget.matches(":hover")) return;
      if (this._isPointerWithinSafeZone()) {
        // Still in safe zone, check again soon
        this._scheduleClose();
        return;
      }
      this._removeActiveUI();
    }, 300);
  }

  _clearCloseTimer() {
    if (this._closeTimer) {
      clearTimeout(this._closeTimer);
      this._closeTimer = null;
    }
  }

  _addRepositionListeners() {
    if (typeof window === "undefined") return;
    window.addEventListener("scroll", this._boundReposition, true);
    window.addEventListener("resize", this._boundReposition);
  }

  _removeRepositionListeners() {
    if (typeof window === "undefined") return;
    window.removeEventListener("scroll", this._boundReposition, true);
    window.removeEventListener("resize", this._boundReposition);
  }

  _repositionDropdown() {
    if (!this._activeTarget || !this._activeDropdown) return;
    if (!document.contains(this._activeTarget)) {
      this._removeActiveUI();
      return;
    }
    this._positionDropdown(this._activeTarget, this._activeDropdown);
  }

  _positionDropdown(target, dropdown) {
    if (!target || !dropdown) return;
    const rect = target.getBoundingClientRect();
    const spacing = getSpacingOffset();
    const width = Math.max(dropdown.offsetWidth || 0, 160);
    const height = Math.max(dropdown.offsetHeight || 0, 120);
    const spaceRight = Math.max(0, window.innerWidth - rect.right);
    const spaceLeft = Math.max(0, rect.left);
    const spaceBelow = Math.max(0, window.innerHeight - rect.bottom);
    const spaceAbove = Math.max(0, rect.top);

    const alignRight = spaceRight >= width || spaceRight >= spaceLeft;
    const alignBottom = spaceBelow >= height || spaceBelow >= spaceAbove;

    const rightOffset = Math.max(0, window.innerWidth - rect.right);
    const bottomOffset = Math.max(0, window.innerHeight - rect.bottom);

    dropdown.style.setProperty(
      "--pds-live-edit-left",
      alignRight ? `${rect.left + spacing}px` : "auto"
    );
    dropdown.style.setProperty(
      "--pds-live-edit-right",
      alignRight ? "auto" : `${rightOffset + spacing}px`
    );
    dropdown.style.setProperty(
      "--pds-live-edit-top",
      alignBottom ? `${rect.top + spacing}px` : "auto"
    );
    dropdown.style.setProperty(
      "--pds-live-edit-bottom",
      alignBottom ? "auto" : `${bottomOffset + spacing}px`
    );

    const adjusted = dropdown.getBoundingClientRect();
    let shiftX = 0;
    let shiftY = 0;
    if (adjusted.left < DROPDOWN_VIEWPORT_PADDING) {
      shiftX = DROPDOWN_VIEWPORT_PADDING - adjusted.left;
    } else if (adjusted.right > window.innerWidth - DROPDOWN_VIEWPORT_PADDING) {
      shiftX = window.innerWidth - DROPDOWN_VIEWPORT_PADDING - adjusted.right;
    }
    if (adjusted.top < DROPDOWN_VIEWPORT_PADDING) {
      shiftY = DROPDOWN_VIEWPORT_PADDING - adjusted.top;
    } else if (adjusted.bottom > window.innerHeight - DROPDOWN_VIEWPORT_PADDING) {
      shiftY = window.innerHeight - DROPDOWN_VIEWPORT_PADDING - adjusted.bottom;
    }
    if (shiftX || shiftY) {
      const currentLeft = parseFloat(dropdown.style.getPropertyValue("--pds-live-edit-left"));
      const currentTop = parseFloat(dropdown.style.getPropertyValue("--pds-live-edit-top"));
      const currentRight = parseFloat(dropdown.style.getPropertyValue("--pds-live-edit-right"));
      const currentBottom = parseFloat(dropdown.style.getPropertyValue("--pds-live-edit-bottom"));
      if (!Number.isNaN(currentLeft)) {
        dropdown.style.setProperty("--pds-live-edit-left", `${currentLeft + shiftX}px`);
      } else if (!Number.isNaN(currentRight)) {
        dropdown.style.setProperty("--pds-live-edit-right", `${currentRight - shiftX}px`);
      }
      if (!Number.isNaN(currentTop)) {
        dropdown.style.setProperty("--pds-live-edit-top", `${currentTop + shiftY}px`);
      } else if (!Number.isNaN(currentBottom)) {
        dropdown.style.setProperty("--pds-live-edit-bottom", `${currentBottom - shiftY}px`);
      }
    }
  }

  _handleMouseMove(event) {
    if (!event) return;
    this._lastPointer = { x: event.clientX, y: event.clientY };
  }

  _addMouseMoveListener() {
    if (typeof document === "undefined") return;
    document.addEventListener("mousemove", this._boundMouseMove, true);
  }

  _removeMouseMoveListener() {
    if (typeof document === "undefined") return;
    document.removeEventListener("mousemove", this._boundMouseMove, true);
  }

  _addMouseOverListener() {
    if (typeof document === "undefined") return;
    document.addEventListener("mouseover", this._boundMouseOver, true);
  }

  _removeMouseOverListener() {
    if (typeof document === "undefined") return;
    document.removeEventListener("mouseover", this._boundMouseOver, true);
  }

  _watchDropdownState() {
    if (!this._activeDropdown) return;
    
    const menu = this._activeDropdown.querySelector("menu");
    if (!menu) return;
    
    // Create a MutationObserver to watch for aria-hidden changes
    this._dropdownObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "aria-hidden") {
          const isOpen = menu.getAttribute("aria-hidden") === "false";
          
          if (isOpen && !this._dropdownMenuOpen) {
            // Dropdown just opened - pause mouseover
            this._dropdownMenuOpen = true;
            this._removeMouseOverListener();
          } else if (!isOpen && this._dropdownMenuOpen) {
            // Dropdown just closed - resume mouseover
            this._dropdownMenuOpen = false;
            this._addMouseOverListener();
          }
        }
      });
    });
    
    this._dropdownObserver.observe(menu, {
      attributes: true,
      attributeFilter: ["aria-hidden"]
    });
  }

  _unwatchDropdownState() {
    if (this._dropdownObserver) {
      this._dropdownObserver.disconnect();
      this._dropdownObserver = null;
    }
  }

  _watchDropdownState() {
    if (!this._activeDropdown) return;
    
    const menu = this._activeDropdown.querySelector("menu");
    if (!menu) return;
    
    // Create a MutationObserver to watch for aria-hidden changes
    this._dropdownObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "aria-hidden") {
          const isOpen = menu.getAttribute("aria-hidden") === "false";
          
          if (isOpen && !this._dropdownMenuOpen) {
            // Dropdown just opened - pause mouseover
            this._dropdownMenuOpen = true;
            this._removeMouseOverListener();
          } else if (!isOpen && this._dropdownMenuOpen) {
            // Dropdown just closed - resume mouseover
            this._dropdownMenuOpen = false;
            this._addMouseOverListener();
          }
        }
      });
    });
    
    this._dropdownObserver.observe(menu, {
      attributes: true,
      attributeFilter: ["aria-hidden"]
    });
  }

  _unwatchDropdownState() {
    if (this._dropdownObserver) {
      this._dropdownObserver.disconnect();
      this._dropdownObserver = null;
    }
  }

  _isPointerWithinSafeZone() {
    if (!this._lastPointer || !this._activeTarget || !this._activeDropdown) return false;
    const targetRect = this._activeTarget.getBoundingClientRect();
    const dropdownRect = this._activeDropdown.getBoundingClientRect();
    const padding = 12;
    const left = Math.min(targetRect.left, dropdownRect.left) - padding;
    const right = Math.max(targetRect.right, dropdownRect.right) + padding;
    const top = Math.min(targetRect.top, dropdownRect.top) - padding;
    const bottom = Math.max(targetRect.bottom, dropdownRect.bottom) + padding;
    const { x, y } = this._lastPointer;
    return x >= left && x <= right && y >= top && y <= bottom;
  }

  _buildDropdown(target, quickPaths, hints, debug) {
    const nav = document.createElement("nav");
    nav.className = DROPDOWN_CLASS;
    nav.setAttribute("data-dropdown", "");
    nav.setAttribute("data-direction", "auto");
    nav.setAttribute("data-mode", "auto");

    const button = document.createElement("button");
    button.className = `context-edit btn-primary btn-xs icon-only ${MARKER_CLASS}`;
    button.setAttribute("type", "button");
    button.setAttribute("data-direction", "auto");
    button.setAttribute("aria-label", "Edit design settings");

    const icon = document.createElement("pds-icon");
    icon.setAttribute("icon", "pencil");
    icon.setAttribute("size", "sm");
    button.appendChild(icon);

    const menu = document.createElement("menu");
    const quickItem = document.createElement("li");
    quickItem.className = "pds-live-editor-menu";

    const header = document.createElement("div");
    header.className = "pds-live-editor-header";

    const title = document.createElement("span");
    title.className = "pds-live-editor-title";
    title.textContent = "Quick edit";
    header.appendChild(title);

    quickItem.appendChild(header);

    const design = shallowClone(PDS?.currentConfig?.design || {});
    const formContainer = document.createElement("div");
    formContainer.className = "pds-live-editor-form-container";
    quickItem.appendChild(formContainer);

    // Create footer with Apply/Undo/Gear buttons
    const footer = document.createElement("div");
    footer.className = "pds-live-editor-footer";
    quickItem.appendChild(footer);

    menu.appendChild(quickItem);

    nav.appendChild(button);
    nav.appendChild(menu);

    const limitedPaths = quickPaths.slice(0, QUICK_EDIT_LIMIT);
    this._renderQuickForm(formContainer, footer, limitedPaths, design, hints, target, quickPaths);

    // Log debug info to console instead of rendering
    if (debug && (debug.vars?.length || debug.paths?.length)) {
      const debugVars = (debug.vars || []).slice(0, 8).join(", ");
      const debugPaths = (debug.paths || []).slice(0, 8).join(", ");
      console.log(`[PDS Live Edit] vars: ${debugVars}`);
      console.log(`[PDS Live Edit] paths: ${debugPaths}`);
    }

    return nav;
  }

  async _renderQuickForm(container, footer, paths, design, hints, target, quickPaths) {
    container.replaceChildren();
    footer.replaceChildren();
    
    const { form, applyBtn, undoBtn } = await buildForm(
      paths,
      design,
      (event) => this._handleFormSubmit(event, form),
      () => this._handleUndo(),
      hints
    );
    
    // Store reference to undo button for enabling/disabling
    form._undoBtn = undoBtn;
    
    // Disable undo initially if no history
    undoBtn.disabled = this._undoStack.length === 0;
    
    // Add form to container
    container.appendChild(form);
    
    // Create gear button for footer
    const gearBtn = document.createElement("button");
    gearBtn.className = "btn-outline btn-sm icon-only";
    gearBtn.type = "button";
    gearBtn.setAttribute("aria-label", "More settings");
    const gearIcon = document.createElement("pds-icon");
    gearIcon.setAttribute("icon", "caret-right");
    gearIcon.setAttribute("size", "sm");
    gearBtn.appendChild(gearIcon);
    gearBtn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      this._openDrawer(target, quickPaths);
      this._removeActiveUI();
    });
    
    // Add buttons to footer
    footer.appendChild(applyBtn);
    footer.appendChild(undoBtn);
    footer.appendChild(gearBtn);
  }

  async _openDrawer(target, quickPaths) {
    if (!this._drawer) {
      this._drawer = document.createElement("pds-drawer");
      this._drawer.setAttribute("position", "right");
      this._drawer.setAttribute("show-close", "");
      this.appendChild(this._drawer);
    }

    if (!customElements.get("pds-drawer")) {
      await customElements.whenDefined("pds-drawer");
    }

    const header = document.createElement("div");
    header.setAttribute("slot", "drawer-header");
    header.className = "flex items-center justify-between";
    header.textContent = "Design settings";

    const content = document.createElement("div");
    content.setAttribute("slot", "drawer-content");
    content.className = "stack-md";

    const presetCard = document.createElement("section");
    presetCard.className = "card surface-elevated stack-sm";

    const presetTitle = document.createElement("h4");
    presetTitle.textContent = "Preset";
    presetCard.appendChild(presetTitle);

    const presetLabel = document.createElement("label");
    presetLabel.className = "stack-xs";

    const presetText = document.createElement("span");
    presetText.textContent = "Choose a base style";
    presetLabel.appendChild(presetText);

    const presetSelect = document.createElement("select");
    const presetOptions = getPresetOptions();
    const activePreset = getActivePresetId();

    presetOptions.forEach((preset) => {
      const option = document.createElement("option");
      option.value = preset.id;
      option.textContent = preset.name;
      if (String(preset.id) === String(activePreset)) {
        option.selected = true;
      }
      presetSelect.appendChild(option);
    });

    presetSelect.addEventListener("change", async (event) => {
      const nextPreset = event.target?.value;
      await applyPresetSelection(nextPreset);
    });

    presetLabel.appendChild(presetSelect);
    presetCard.appendChild(presetLabel);

    const themeCard = document.createElement("section");
    themeCard.className = "card surface-elevated stack-sm";

    const themeTitle = document.createElement("h4");
    themeTitle.textContent = "Theme";
    themeCard.appendChild(themeTitle);

    const themeToggle = document.createElement("pds-theme");
    themeCard.appendChild(themeToggle);

    const exportCard = document.createElement("section");
    exportCard.className = "card surface-elevated stack-sm";

    const exportTitle = document.createElement("h4");
    exportTitle.textContent = "Export";
    exportCard.appendChild(exportTitle);

    const exportNav = document.createElement("nav");
    exportNav.setAttribute("data-dropdown", "");
    exportNav.setAttribute("data-mode", "auto");

    const exportButton = document.createElement("button");
    exportButton.className = "btn-primary";
    const exportIcon = document.createElement("pds-icon");
    exportIcon.setAttribute("icon", "download");
    exportIcon.setAttribute("size", "sm");
    const exportLabel = document.createElement("span");
    exportLabel.textContent = "Download";
    const exportCaret = document.createElement("pds-icon");
    exportCaret.setAttribute("icon", "caret-down");
    exportCaret.setAttribute("size", "sm");
    exportButton.append(exportIcon, exportLabel, exportCaret);

    const exportMenu = document.createElement("menu");

    const configItem = document.createElement("li");
    const configLink = document.createElement("a");
    configLink.href = "#";
    configLink.addEventListener("click", async (event) => {
      event.preventDefault();
      await this._handleExport("config");
    });
    const configIcon = document.createElement("pds-icon");
    configIcon.setAttribute("icon", "file-js");
    configIcon.setAttribute("size", "sm");
    const configLabel = document.createElement("span");
    configLabel.textContent = "Config File";
    configLink.append(configIcon, configLabel);
    configItem.appendChild(configLink);

    const figmaItem = document.createElement("li");
    const figmaLink = document.createElement("a");
    figmaLink.href = "#";
    figmaLink.addEventListener("click", async (event) => {
      event.preventDefault();
      await this._handleExport("figma");
    });
    const figmaIcon = document.createElement("pds-icon");
    figmaIcon.setAttribute("icon", "brackets-curly");
    figmaIcon.setAttribute("size", "sm");
    const figmaLabel = document.createElement("span");
    figmaLabel.textContent = "Figma Tokens (JSON)";
    figmaLink.append(figmaIcon, figmaLabel);
    figmaItem.appendChild(figmaLink);

    exportMenu.append(configItem, figmaItem);
    exportNav.append(exportButton, exportMenu);
    exportCard.appendChild(exportNav);

    const searchCard = document.createElement("section");
    searchCard.className = "card surface-elevated stack-sm";

    const searchTitle = document.createElement("h4");
    searchTitle.textContent = "Search PDS";
    searchCard.appendChild(searchTitle);

    const omnibox = document.createElement("pds-omnibox");
    omnibox.setAttribute("placeholder", "Search tokens, utilities, components...");
    omnibox.settings = {
      iconHandler: (item) => {
        return item.icon ? `<pds-icon icon="${item.icon}"></pds-icon>` : null;
      },
      categories: {
        Query: {
          trigger: (options) => options.search.length >= 2,
          getItems: async (options) => {
            const query = (options.search || "").trim();
            if (!query) return [];
            try {
              const results = await PDS.query(query);
              return (results || []).map((result) => ({
                text: result.text,
                id: result.value,
                icon: result.icon || "magnifying-glass",
                category: result.category,
                code: result.code,
              }));
            } catch (error) {
              console.warn("Omnibox query failed:", error);
              return [];
            }
          },
          action: async (options) => {
            if (options?.code && navigator.clipboard) {
              await navigator.clipboard.writeText(options.code);
              await PDS.toast("Copied token to clipboard", { type: "success" });
            }
          },
        },
      },
    };
    searchCard.appendChild(omnibox);

    content.appendChild(presetCard);
    content.appendChild(themeCard);
    content.appendChild(exportCard);
    content.appendChild(searchCard);

    this._drawer.replaceChildren(header, content);

    if (typeof this._drawer.openDrawer === "function") {
      this._drawer.openDrawer();
    } else {
      this._drawer.setAttribute("open", "");
    }
  }

  async _handleExport(format) {
    await exportFromLiveEdit(format);
  }

  async _handleFormSubmit(event, form) {
    if (!form || typeof form.getValuesFlat !== "function") return;
    
    // Save current STORED config (preset + overrides) to undo stack before applying
    const storedConfig = getStoredConfig() || { preset: null, design: {} };
    try {
      this._undoStack.push(structuredClone(storedConfig));
    } catch (e) {
      // Fallback for environments without structuredClone
      this._undoStack.push(JSON.parse(JSON.stringify(storedConfig)));
    }
    
    // Limit undo stack size
    if (this._undoStack.length > 10) {
      this._undoStack.shift();
    }
    
    // Apply the changes
    const flatValues = form.getValuesFlat();
    const patch = {};
    Object.entries(flatValues || {}).forEach(([path, value]) => {
      setValueAtJsonPath(patch, path, value);
    });
    await applyDesignPatch(patch);
    
    // Enable undo button
    if (form._undoBtn) {
      form._undoBtn.disabled = false;
    }
  }

  async _handleUndo() {
    if (this._undoStack.length === 0) return;
    
    // Get the previous stored config (preset + overrides)
    const previousConfig = this._undoStack.pop();
    
    // Update localStorage to fully replace with previous config
    setStoredConfig(previousConfig);
    
    // Apply an empty patch to trigger regeneration with the restored design
    await applyDesignPatch({});
    
    // Re-render the form with the current dropdown's form container
    if (this._activeDropdown) {
      const formContainer = this._activeDropdown.querySelector('.pds-live-editor-form-container');
      const footer = this._activeDropdown.querySelector('.pds-live-editor-footer');
      if (formContainer && footer) {
        // Get the actual current design after applyDesignPatch has run
        const currentDesign = shallowClone(PDS?.currentConfig?.design || {});
        const quickContext = collectQuickContext(this._activeTarget);
        const limitedPaths = quickContext.paths.slice(0, QUICK_EDIT_LIMIT);
        const quickPaths = quickContext.paths;
        await this._renderQuickForm(formContainer, footer, limitedPaths, currentDesign, quickContext.hints, this._activeTarget, quickPaths);
      }
    }
  }
}

customElements.define(EDITOR_TAG, PdsLiveEdit);