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
const COLOR_VALUE_REGEX = /#(?:[0-9a-f]{3,8})\b|rgba?\([^)]*\)|hsla?\([^)]*\)/gi;

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
  width: var(--spacing-9);
  height: var(--spacing-6);
  max-width: var(--spacing-9);
  min-width: var(--spacing-9);
  padding: 0;
  border-radius: var(--radius-sm);
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

function filterPathsByContext(target, paths) {
  if (!target || !paths.length) return paths;
  const isGlobal = target.matches("body, main");
  const isInForm = Boolean(target.closest("form, pds-form"));
  const isOnSurface = Boolean(
    target.closest(
      ".card, .surface-base, .surface-elevated, .surface-sunken, .surface-subtle"
    )
  );
  const theme = getActiveTheme();

  return paths.filter((path) => {
    if (!theme.isDark && path.includes(DARK_MODE_PATH_MARKER)) return false;
    if (path.startsWith("typography.") && !isGlobal) return false;
    if (GLOBAL_LAYOUT_PATHS.has(path) && !isGlobal) return false;
    if (FORM_CONTEXT_PATHS.has(path) && !isInForm) return false;
    if (SURFACE_CONTEXT_PATHS.has(path) && !(isOnSurface || isGlobal)) return false;
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

function collectVarRefsFromInline(element) {
  const vars = new Set();
  if (!element || typeof element.getAttribute !== "function") return vars;
  const styleAttr = element.getAttribute("style") || "";
  if (!styleAttr) return vars;
  INLINE_VAR_REGEX.lastIndex = 0;
  let match = INLINE_VAR_REGEX.exec(styleAttr);
  while (match) {
    if (match[1]) vars.add(match[1]);
    match = INLINE_VAR_REGEX.exec(styleAttr);
  }
  return vars;
}

function collectScanTargets(target, limit = 120) {
  const nodes = [target];
  if (!target || typeof target.querySelectorAll !== "function") return nodes;
  const descendants = Array.from(target.querySelectorAll("*"));
  if (descendants.length <= limit) return nodes.concat(descendants);
  return nodes.concat(descendants.slice(0, limit));
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

    let style = null;
    try {
      style = window.getComputedStyle(node);
    } catch (e) {
      style = null;
    }
    if (!style) return;

    QUICK_STYLE_PROPERTIES.forEach((prop) => {
      const value = style.getPropertyValue(prop);
      if (!value) return;
      const trimmed = value.trim();
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
  const hints = computed?.hints || {};
  const debug = computed?.debug || { vars: [], paths: [] };

  const filtered = filterPathsByContext(target, [
    ...byComputed,
    ...byRelations,
    ...byQuickRules,
  ]);
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
    }

    let current = parent;
    for (let i = 0; i < rest.length; i += 1) {
      const segment = rest[i];
      if (i === rest.length - 1) {
        const value = getValueAtPath(design, [category, ...rest]);
        const hintValue = hints[path];
        const inferredType = Array.isArray(value)
          ? "array"
          : value === null
            ? "string"
            : typeof value;
        const schemaType = inferredType === "number" || inferredType === "boolean"
          ? inferredType
          : "string";
        current.properties[segment] = {
          type: schemaType,
          title: titleize(segment),
          examples:
            value !== undefined && value !== null
              ? [value]
              : hintValue !== undefined
                ? [hintValue]
                : undefined,
        };

        const pointer = `/${[category, ...rest].join("/")}`;
        const uiEntry = {
          "ui:icon": CATEGORY_ICONS[category] || "sparkle",
        };

        if (isColorValue(value, path)) {
          uiEntry["ui:widget"] = "input-color";
        } else if (schemaType === "number") {
          const bounds = inferRangeBounds(path, value);
          uiEntry["ui:widget"] = "input-range";
          uiEntry["ui:min"] = bounds.min;
          uiEntry["ui:max"] = bounds.max;
          uiEntry["ui:step"] = bounds.step;
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
        design: deepMerge(shallowClone(storedOverrides), patch),
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

function setFormSchemas(form, schema, uiSchema, design) {
  form.jsonSchema = schema;
  form.uiSchema = uiSchema;
  form.values = shallowClone(design);
}

async function buildForm(paths, design, onChange, hints = {}) {
  const { schema, uiSchema } = buildSchemaFromPaths(paths, design, hints);
  const form = document.createElement("pds-form");
  form.setAttribute("hide-actions", "");
  form.options = {
    layouts: {
      arrays: "compact",
    },
    enhancements: {
      rangeOutput: true,
    },
  };
  form.addEventListener("pw:value-change", onChange);
  const values = shallowClone(design || {});
  Object.entries(hints || {}).forEach(([path, hintValue]) => {
    const segments = path.split(".");
    const currentValue = getValueAtPath(values, segments);
    if (currentValue === undefined || currentValue === null) {
      setValueAtPath(values, segments, hintValue);
    }
  });
  setFormSchemas(form, schema, uiSchema, values);

  if (!customElements.get("pds-form")) {
    customElements.whenDefined("pds-form").then(() => {
      setFormSchemas(form, schema, uiSchema, values);
    });
  }

  return form;
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
    this._pendingPatch = null;
    this._applyTimer = null;
    this._selectors = null;
    this._lastPointer = null;
    this._boundDocPointer = this._handleDocumentPointer.bind(this);
    this._boundDocKeydown = this._handleDocumentKeydown.bind(this);
    this._connected = false;
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
    this._clearCloseTimer();
    if (this._activeDropdown && this._activeDropdown.contains(event.target)) return;
    const target = this._findEditableTarget(event.target);
    if (!target || target === this._activeTarget) return;

    this._removeActiveUI();
    this._showForTarget(target);
  }

  _handleMouseOut(event) {
    if (!this._activeTarget) return;
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

    this._activeTarget = target;
    this._activeDropdown = dropdown;
  }

  _removeActiveUI() {
    this._clearCloseTimer();
    this._removeRepositionListeners();
    this._removeDocumentListeners();
    if (this._activeDropdown && this._activeDropdown.parentNode) {
      this._activeDropdown.parentNode.removeChild(this._activeDropdown);
    }
    if (this._activeTarget) {
      this._activeTarget.removeAttribute(TARGET_ATTR);
    }
    this._activeTarget = null;
    this._activeDropdown = null;
    this._holdOpen = false;
  }

  _addDocumentListeners() {
    if (typeof document === "undefined") return;
    document.addEventListener("pointerdown", this._boundDocPointer, true);
    document.addEventListener("keydown", this._boundDocKeydown, true);
  }

  _removeDocumentListeners() {
    if (typeof document === "undefined") return;
    document.removeEventListener("pointerdown", this._boundDocPointer, true);
    document.removeEventListener("keydown", this._boundDocKeydown, true);
  }

  _handleDocumentPointer(event) {
    if (!this._activeDropdown || !this._activeTarget) return;
    const target = event?.target;
    if (!(target instanceof Element)) return;
    if (this._activeDropdown.contains(target)) return;
    if (this._activeTarget.contains(target)) return;
    this._removeActiveUI();
  }

  _handleDocumentKeydown(event) {
    if (!event) return;
    if (event.key !== "Escape") return;
    event.preventDefault();
    this._removeActiveUI();
  }

  _scheduleClose() {
    if (typeof window === "undefined") return;
    this._clearCloseTimer();
    this._closeTimer = window.setTimeout(() => {
      if (this._holdOpen) return;
      if (this._activeDropdown && this._activeDropdown.matches(":hover")) return;
      if (this._activeTarget && this._activeTarget.matches(":hover")) return;
      if (this._isPointerWithinSafeZone()) {
        this._scheduleClose();
        return;
      }
      this._removeActiveUI();
    }, 500);
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

    const openButton = document.createElement("button");
    openButton.className = "btn-outline btn-xs icon-only";
    openButton.setAttribute("type", "button");
    openButton.setAttribute("aria-label", "More settings");
    const openIcon = document.createElement("pds-icon");
    openIcon.setAttribute("icon", "gear");
    openIcon.setAttribute("size", "sm");
    openButton.appendChild(openIcon);
    openButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      this._openDrawer(target, quickPaths);
    });
    header.appendChild(openButton);

    quickItem.appendChild(header);

    const design = shallowClone(PDS?.currentConfig?.design || {});
    const formContainer = document.createElement("div");
    quickItem.appendChild(formContainer);

    menu.appendChild(quickItem);

    nav.appendChild(button);
    nav.appendChild(menu);

    const limitedPaths = quickPaths.slice(0, QUICK_EDIT_LIMIT);
    this._renderQuickForm(formContainer, limitedPaths, design, hints);

    if (debug && (debug.vars?.length || debug.paths?.length)) {
      const debugBlock = document.createElement("div");
      debugBlock.className = "pds-live-editor-debug";
      const debugVars = (debug.vars || []).slice(0, 8).join(", ");
      const debugPaths = (debug.paths || []).slice(0, 8).join(", ");
      debugBlock.textContent = `vars: ${debugVars}\npaths: ${debugPaths}`;
      quickItem.appendChild(debugBlock);
    }

    return nav;
  }

  async _renderQuickForm(container, paths, design, hints) {
    container.replaceChildren();
    const form = await buildForm(paths, design, (event) =>
      this._handleValueChange(event),
      hints
    );
    container.appendChild(form);
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
    content.appendChild(searchCard);

    this._drawer.replaceChildren(header, content);

    if (typeof this._drawer.openDrawer === "function") {
      this._drawer.openDrawer();
    } else {
      this._drawer.setAttribute("open", "");
    }
  }

  _handleValueChange(event) {
    const form = event?.currentTarget;
    if (!form || typeof form.getValuesFlat !== "function") return;
    const flatValues = form.getValuesFlat();
    const patch = {};
    Object.entries(flatValues || {}).forEach(([path, value]) => {
      setValueAtJsonPath(patch, path, value);
    });
    this._schedulePatch(patch);
  }

  _schedulePatch(patch) {
    this._pendingPatch = this._pendingPatch
      ? deepMerge(this._pendingPatch, patch)
      : patch;

    if (this._applyTimer) return;
    this._applyTimer = window.setTimeout(async () => {
      const nextPatch = this._pendingPatch;
      this._pendingPatch = null;
      this._applyTimer = null;
      await applyDesignPatch(nextPatch);
    }, 50);
  }
}

customElements.define(EDITOR_TAG, PdsLiveEdit);