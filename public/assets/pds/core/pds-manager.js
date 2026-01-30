var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/js/pds-core/pds-enums.js
var pds_enums_exports = {};
__export(pds_enums_exports, {
  enums: () => enums
});
var enums;
var init_pds_enums = __esm({
  "src/js/pds-core/pds-enums.js"() {
    enums = {
      FontWeights: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700
      },
      LineHeights: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75
      },
      BorderWidths: {
        hairline: 0.5,
        thin: 1,
        medium: 2,
        thick: 3
      },
      RadiusSizes: {
        none: 0,
        small: 4,
        medium: 8,
        large: 16,
        xlarge: 24,
        xxlarge: 32
      },
      ShadowDepths: {
        none: "none",
        light: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        medium: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        deep: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        extreme: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      },
      TransitionSpeeds: {
        fast: 150,
        normal: 250,
        slow: 350
      },
      AnimationEasings: {
        linear: "linear",
        ease: "ease",
        "ease-in": "ease-in",
        "ease-out": "ease-out",
        "ease-in-out": "ease-in-out",
        bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
      },
      TouchTargetSizes: {
        compact: 36,
        standard: 44,
        // iOS/Android accessibility standard
        comfortable: 48,
        spacious: 56
      },
      LinkStyles: {
        inline: "inline",
        // Normal inline text links
        block: "block",
        // Block-level links
        button: "button"
        // Button-like links (flex with touch target)
      },
      FocusStyles: {
        ring: "ring",
        // Box-shadow ring (default)
        outline: "outline",
        // Browser outline
        border: "border",
        // Border change
        glow: "glow"
        // Subtle glow effect
      },
      TabSizes: {
        compact: 2,
        standard: 4,
        wide: 8
      },
      SelectIcons: {
        chevron: "chevron",
        // Standard chevron down
        arrow: "arrow",
        // Simple arrow
        caret: "caret",
        // Triangle caret
        none: "none"
        // No icon
      },
      IconSizes: {
        xs: 16,
        sm: 20,
        md: 24,
        lg: 32,
        xl: 48,
        "2xl": 64,
        "3xl": 96
      }
    };
  }
});

// src/js/pds-core/pds-ontology.js
var pds_ontology_exports = {};
__export(pds_ontology_exports, {
  default: () => pds_ontology_default,
  findComponentForElement: () => findComponentForElement,
  getAllSelectors: () => getAllSelectors,
  getAllTags: () => getAllTags,
  getByCategory: () => getByCategory,
  ontology: () => ontology,
  searchOntology: () => searchOntology
});
function tryMatches(el, selector) {
  if (!el || !selector)
    return false;
  try {
    return el.matches(selector);
  } catch (e) {
    return false;
  }
}
function safeClosest(el, selector) {
  if (!el || !selector || !el.closest)
    return null;
  try {
    return el.closest(selector);
  } catch (e) {
    return null;
  }
}
function findComponentForElement(startEl, { maxDepth = 5 } = {}) {
  if (!startEl)
    return null;
  if (startEl.closest && startEl.closest(".showcase-toc"))
    return null;
  let current = startEl;
  let depth = 0;
  while (current && depth < maxDepth) {
    depth++;
    if (current.tagName === "DS-SHOWCASE")
      return null;
    if (current.classList && current.classList.contains("showcase-section")) {
      current = current.parentElement;
      continue;
    }
    for (const enh of PDS.ontology.enhancements) {
      const sel = enh.selector || enh;
      if (tryMatches(current, sel)) {
        return { element: current, componentType: "enhanced-component", displayName: enh.description || sel, id: enh.id };
      }
    }
    if (current.tagName === "FIELDSET") {
      const role = current.getAttribute("role");
      if (role === "group" || role === "radiogroup") {
        return { element: current, componentType: "form-group", displayName: role === "radiogroup" ? "radio group" : "form group" };
      }
    }
    if (current.tagName === "LABEL") {
      if (current.querySelector && current.querySelector("input,select,textarea")) {
        return { element: current, componentType: "form-control", displayName: "label with input" };
      }
    }
    const labelAncestor = current.closest ? current.closest("label") : null;
    if (labelAncestor && labelAncestor.querySelector && labelAncestor.querySelector("input,select,textarea")) {
      return { element: labelAncestor, componentType: "form-control", displayName: "label with input" };
    }
    for (const prim of PDS.ontology.primitives) {
      for (const sel of prim.selectors || []) {
        const s = String(sel || "").trim();
        if (s.includes("*")) {
          if (s.startsWith(".")) {
            const prefix = s.slice(1).replace(/\*/g, "");
            if (current.classList && Array.from(current.classList).some((c) => c.startsWith(prefix))) {
              return { element: current, componentType: "pds-primitive", displayName: prim.name || prim.id, id: prim.id, tags: prim.tags };
            }
            let ancestor2 = current.parentElement;
            let levels = 0;
            while (ancestor2 && levels < maxDepth) {
              if (ancestor2.classList && Array.from(ancestor2.classList).some((c) => c.startsWith(prefix)) && ancestor2.tagName !== "DS-SHOWCASE") {
                return { element: ancestor2, componentType: "pds-primitive", displayName: prim.name || prim.id, id: prim.id, tags: prim.tags };
              }
              ancestor2 = ancestor2.parentElement;
              levels++;
            }
            continue;
          }
          continue;
        }
        if (tryMatches(current, s)) {
          return { element: current, componentType: "pds-primitive", displayName: prim.name || prim.id, id: prim.id, tags: prim.tags };
        }
        const ancestor = safeClosest(current, s);
        if (ancestor && ancestor.tagName !== "DS-SHOWCASE") {
          return { element: ancestor, componentType: "pds-primitive", displayName: prim.name || prim.id, id: prim.id, tags: prim.tags };
        }
      }
      if (current.classList) {
        const clsList = Array.from(current.classList);
        for (const s of prim.selectors || []) {
          if (typeof s === "string" && s.includes("*") && s.startsWith(".")) {
            const prefix = s.slice(1).replace(/\*/g, "");
            if (clsList.some((c) => c.startsWith(prefix))) {
              return { element: current, componentType: "pds-primitive", displayName: prim.name || prim.id, id: prim.id, tags: prim.tags };
            }
          }
        }
      }
    }
    for (const layout of PDS.ontology.layoutPatterns || []) {
      for (const sel of layout.selectors || []) {
        const s = String(sel || "").trim();
        if (s.includes("*")) {
          if (s.startsWith(".")) {
            const prefix = s.slice(1).replace(/\*/g, "");
            if (current.classList && Array.from(current.classList).some((c) => c.startsWith(prefix))) {
              return { element: current, componentType: "layout-pattern", displayName: layout.name || layout.id, id: layout.id, tags: layout.tags };
            }
          }
          continue;
        }
        if (tryMatches(current, s)) {
          return { element: current, componentType: "layout-pattern", displayName: layout.name || layout.id, id: layout.id, tags: layout.tags };
        }
        const ancestor = safeClosest(current, s);
        if (ancestor && ancestor.tagName !== "DS-SHOWCASE") {
          return { element: ancestor, componentType: "layout-pattern", displayName: layout.name || layout.id, id: layout.id, tags: layout.tags };
        }
      }
    }
    if (current.tagName && current.tagName.includes("-")) {
      const tagName = current.tagName.toLowerCase();
      const comp = PDS.ontology.components.find((c) => c.selectors.includes(tagName));
      return {
        element: current,
        componentType: "web-component",
        displayName: comp?.name || tagName,
        id: comp?.id || tagName,
        tags: comp?.tags
      };
    }
    if (current.tagName === "BUTTON") {
      const hasIcon = current.querySelector && current.querySelector("pds-icon");
      return { element: current, componentType: "button", displayName: hasIcon ? "button with icon" : "button", id: "button" };
    }
    if (tryMatches(current, "pds-icon") || current.closest && current.closest("pds-icon")) {
      const el = tryMatches(current, "pds-icon") ? current : current.closest("pds-icon");
      return { element: el, componentType: "icon", displayName: `pds-icon (${el.getAttribute && el.getAttribute("icon") || "unknown"})`, id: "pds-icon" };
    }
    if (tryMatches(current, "nav[data-dropdown]") || current.closest && current.closest("nav[data-dropdown]")) {
      const el = tryMatches(current, "nav[data-dropdown]") ? current : current.closest("nav[data-dropdown]");
      return { element: el, componentType: "navigation", displayName: "dropdown menu", id: "dropdown" };
    }
    current = current.parentElement;
  }
  return null;
}
function getAllSelectors() {
  const s = [];
  for (const p of PDS.ontology.primitives)
    s.push(...p.selectors || []);
  for (const c of PDS.ontology.components)
    s.push(...c.selectors || []);
  for (const l of PDS.ontology.layoutPatterns || [])
    s.push(...l.selectors || []);
  return Array.from(new Set(s));
}
function searchOntology(query, options = {}) {
  const q = query.toLowerCase();
  const results = [];
  const searchIn = (items, type) => {
    for (const item of items) {
      const matches = item.id?.toLowerCase().includes(q) || item.name?.toLowerCase().includes(q) || item.description?.toLowerCase().includes(q) || item.tags?.some((t) => t.toLowerCase().includes(q)) || item.category?.toLowerCase().includes(q) || item.selectors?.some((s) => s.toLowerCase().includes(q));
      if (matches) {
        results.push({ ...item, type });
      }
    }
  };
  if (!options.type || options.type === "primitive") {
    searchIn(ontology.primitives, "primitive");
  }
  if (!options.type || options.type === "component") {
    searchIn(ontology.components, "component");
  }
  if (!options.type || options.type === "layout") {
    searchIn(ontology.layoutPatterns, "layout");
  }
  if (!options.type || options.type === "enhancement") {
    searchIn(ontology.enhancements, "enhancement");
  }
  return results;
}
function getByCategory(category) {
  const cat = category.toLowerCase();
  return {
    primitives: ontology.primitives.filter((p) => p.category === cat),
    components: ontology.components.filter((c) => c.category === cat),
    layouts: ontology.layoutPatterns.filter((l) => l.category === cat)
  };
}
function getAllTags() {
  const tags = /* @__PURE__ */ new Set();
  ontology.primitives.forEach((p) => p.tags?.forEach((t) => tags.add(t)));
  ontology.components.forEach((c) => c.tags?.forEach((t) => tags.add(t)));
  ontology.layoutPatterns.forEach((l) => l.tags?.forEach((t) => tags.add(t)));
  ontology.enhancements.forEach((e) => e.tags?.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}
var ontology, pds_ontology_default;
var init_pds_ontology = __esm({
  "src/js/pds-core/pds-ontology.js"() {
    ontology = {
      meta: {
        name: "Pure Design System Ontology",
        version: "1.0.0",
        description: "Complete metadata registry for PDS primitives, components, utilities, and tokens"
      },
      // ═══════════════════════════════════════════════════════════════════════════
      // DESIGN TOKENS
      // ═══════════════════════════════════════════════════════════════════════════
      tokens: {
        colors: {
          semantic: ["primary", "secondary", "accent", "success", "warning", "danger", "info"],
          neutral: ["gray"],
          shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
          surface: ["base", "subtle", "elevated", "sunken", "overlay", "inverse", "translucent"],
          text: ["default", "muted", "subtle", "inverse", "primary", "success", "warning", "danger", "info"]
        },
        spacing: {
          scale: ["1", "2", "3", "4", "5", "6", "8", "10", "12", "16", "20", "24"],
          semantic: ["xs", "sm", "md", "lg", "xl"]
        },
        typography: {
          families: ["heading", "body", "mono"],
          sizes: ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl"],
          weights: ["light", "normal", "medium", "semibold", "bold"]
        },
        radius: {
          scale: ["none", "sm", "base", "md", "lg", "xl", "2xl", "full"]
        },
        shadows: {
          scale: ["none", "sm", "base", "md", "lg", "xl", "inner"]
        },
        themes: ["light", "dark"],
        breakpoints: {
          sm: 640,
          md: 768,
          lg: 1024,
          xl: 1280
        }
      },
      // ═══════════════════════════════════════════════════════════════════════════
      // PRIMITIVES (Single-class styled components)
      // ═══════════════════════════════════════════════════════════════════════════
      primitives: [
        {
          id: "badge",
          name: "Badge / Pill",
          description: "Inline status indicators and labels",
          selectors: [".badge", ".badge-primary", ".badge-secondary", ".badge-success", ".badge-info", ".badge-warning", ".badge-danger", ".badge-outline", ".badge-sm", ".badge-lg", ".pill", ".tag", ".chip"],
          tags: ["status", "label", "indicator", "inline"],
          category: "feedback"
        },
        {
          id: "card",
          name: "Card",
          description: "Content container with padding, border-radius, and optional shadow",
          selectors: [".card", ".card-basic", ".card-elevated", ".card-outlined", ".card-interactive"],
          tags: ["container", "content", "grouping"],
          category: "container"
        },
        {
          id: "surface",
          name: "Surface",
          description: "Smart surface classes with automatic text/background color handling",
          selectors: [".surface-base", ".surface-subtle", ".surface-elevated", ".surface-sunken", ".surface-overlay", ".surface-inverse", ".surface-translucent", ".surface-translucent-25", ".surface-translucent-50", ".surface-translucent-75", ".surface-primary", ".surface-secondary", ".surface-success", ".surface-warning", ".surface-danger", ".surface-info"],
          tags: ["background", "theming", "color", "container"],
          category: "theming"
        },
        {
          id: "callout",
          name: "Callout",
          description: "Contextual information and notification messages",
          selectors: [".callout", ".callout-info", ".callout-success", ".callout-warning", ".callout-danger", ".callout-error", ".callout-dismissible"],
          tags: ["feedback", "message", "notification", "status", "information"],
          category: "feedback"
        },
        {
          id: "empty-state",
          name: "Empty State",
          description: "Empty state layout for missing data or onboarding",
          selectors: [".empty-state"],
          tags: ["empty", "no-data", "zero", "placeholder", "onboarding", "state"],
          category: "feedback"
        },
        {
          id: "dialog",
          name: "Dialog",
          description: "Modal dialog element",
          selectors: ["dialog", ".dialog"],
          tags: ["modal", "overlay", "popup", "modal"],
          category: "overlay"
        },
        {
          id: "divider",
          name: "Divider",
          description: "Horizontal rule with optional label",
          selectors: ["hr", "hr[data-content]"],
          tags: ["separator", "line", "content-divider"],
          category: "layout"
        },
        {
          id: "table",
          name: "Table",
          description: "Data tables with responsive and styling variants",
          selectors: ["table", ".table-responsive", ".table-striped", ".table-bordered", ".table-compact", ".data-table"],
          tags: ["data", "grid", "tabular", "responsive"],
          category: "data"
        },
        {
          id: "button",
          name: "Button",
          description: "Interactive button element with variants",
          selectors: ["button", ".btn-primary", ".btn-secondary", ".btn-outline", ".btn-sm", ".btn-xs", ".btn-lg", ".btn-working", ".icon-only"],
          tags: ["interactive", "action", "cta", "form"],
          category: "action"
        },
        {
          id: "fieldset",
          name: "Fieldset Group",
          description: "Form field grouping for radio/checkbox groups",
          selectors: ["fieldset[role='group']", "fieldset[role='radiogroup']", "fieldset.buttons"],
          tags: ["form", "grouping", "radio", "checkbox"],
          category: "form"
        },
        {
          id: "label-field",
          name: "Label+Input",
          description: "Semantic label wrapping form input",
          selectors: ["label", "label:has(input)", "label:has(select)", "label:has(textarea)"],
          tags: ["form", "input", "accessibility"],
          category: "form"
        },
        {
          id: "accordion",
          name: "Accordion",
          description: "Collapsible content sections",
          selectors: [".accordion", ".accordion-item", "details", "details > summary"],
          tags: ["expandable", "collapsible", "disclosure"],
          category: "disclosure"
        },
        {
          id: "icon",
          name: "Icon",
          description: "SVG icon element with size and color variants",
          selectors: ["pds-icon", ".icon-xs", ".icon-sm", ".icon-md", ".icon-lg", ".icon-xl", ".icon-primary", ".icon-secondary", ".icon-accent", ".icon-success", ".icon-warning", ".icon-danger", ".icon-info", ".icon-muted", ".icon-subtle", ".icon-text", ".icon-text-start", ".icon-text-end"],
          tags: ["graphic", "symbol", "visual"],
          category: "media"
        },
        {
          id: "figure",
          name: "Figure/Media",
          description: "Figure element for images with captions",
          selectors: ["figure", "figure.media", "figcaption"],
          tags: ["image", "media", "caption"],
          category: "media"
        },
        {
          id: "gallery",
          name: "Gallery",
          description: "Image gallery grid",
          selectors: [".gallery", ".gallery-grid", ".img-gallery"],
          tags: ["images", "grid", "collection"],
          category: "media"
        },
        {
          id: "form",
          name: "Form Container",
          description: "Form styling and layout",
          selectors: ["form", ".form-container", ".form-actions", ".field-description"],
          tags: ["form", "input", "submission"],
          category: "form"
        },
        {
          id: "navigation",
          name: "Navigation",
          description: "Navigation elements and menus",
          selectors: ["nav", "nav[data-dropdown]", "menu", "nav menu li"],
          tags: ["menu", "links", "routing"],
          category: "navigation"
        }
      ],
      // ═══════════════════════════════════════════════════════════════════════════
      // WEB COMPONENTS
      // ═══════════════════════════════════════════════════════════════════════════
      components: [
        {
          id: "pds-tabstrip",
          name: "Tab Strip",
          description: "Tabbed interface component",
          selectors: ["pds-tabstrip"],
          tags: ["tabs", "navigation", "panels"],
          category: "navigation"
        },
        {
          id: "pds-drawer",
          name: "Drawer",
          description: "Slide-out panel overlay",
          selectors: ["pds-drawer"],
          tags: ["panel", "overlay", "sidebar"],
          category: "overlay"
        },
        {
          id: "pds-fab",
          name: "FAB",
          description: "Floating Action Button with expandable satellite actions",
          selectors: ["pds-fab"],
          tags: ["button", "action", "floating", "interactive"],
          category: "action"
        },
        {
          id: "pds-upload",
          name: "Upload",
          description: "File upload component with drag-and-drop",
          selectors: ["pds-upload"],
          tags: ["file", "upload", "drag-drop", "form"],
          category: "form"
        },
        {
          id: "pds-icon",
          name: "Icon",
          description: "SVG icon web component",
          selectors: ["pds-icon"],
          tags: ["icon", "graphic", "svg"],
          category: "media"
        },
        {
          id: "pds-toaster",
          name: "Toaster",
          description: "Toast notification container",
          selectors: ["pds-toaster"],
          tags: ["notification", "toast", "feedback"],
          category: "feedback"
        },
        {
          id: "pds-form",
          name: "JSON Form",
          description: "Auto-generated form from JSON Schema",
          selectors: ["pds-form"],
          tags: ["form", "schema", "auto-generate"],
          category: "form"
        },
        {
          id: "pds-splitpanel",
          name: "Split Panel",
          description: "Resizable split pane layout",
          selectors: ["pds-splitpanel"],
          tags: ["layout", "resize", "panels"],
          category: "layout"
        },
        {
          id: "pds-scrollrow",
          name: "Scroll Row",
          description: "Horizontal scrolling row with snap points",
          selectors: ["pds-scrollrow"],
          tags: ["scroll", "horizontal", "carousel"],
          category: "layout"
        },
        {
          id: "pds-richtext",
          name: "Rich Text",
          description: "Rich text editor component",
          selectors: ["pds-richtext"],
          tags: ["editor", "wysiwyg", "text"],
          category: "form"
        },
        {
          id: "pds-calendar",
          name: "Calendar",
          description: "Date picker calendar component",
          selectors: ["pds-calendar"],
          tags: ["date", "picker", "calendar"],
          category: "form"
        }
      ],
      // ═══════════════════════════════════════════════════════════════════════════
      // LAYOUT PATTERNS
      // ═══════════════════════════════════════════════════════════════════════════
      layoutPatterns: [
        {
          id: "container",
          name: "Container",
          description: "Centered max-width wrapper with padding",
          selectors: [".container"],
          tags: ["wrapper", "centered", "max-width", "page"],
          category: "structure"
        },
        {
          id: "grid",
          name: "Grid",
          description: "CSS Grid layout container",
          selectors: [".grid"],
          tags: ["layout", "columns", "css-grid"],
          category: "layout"
        },
        {
          id: "grid-cols",
          name: "Grid Columns",
          description: "Fixed column count grids",
          selectors: [".grid-cols-1", ".grid-cols-2", ".grid-cols-3", ".grid-cols-4", ".grid-cols-6"],
          tags: ["columns", "fixed", "grid"],
          category: "layout"
        },
        {
          id: "grid-auto",
          name: "Auto-fit Grid",
          description: "Responsive auto-fit grid with minimum widths",
          selectors: [".grid-auto-sm", ".grid-auto-md", ".grid-auto-lg", ".grid-auto-xl"],
          tags: ["responsive", "auto-fit", "fluid"],
          category: "layout"
        },
        {
          id: "flex",
          name: "Flex Container",
          description: "Flexbox layout with direction and wrap modifiers",
          selectors: [".flex", ".flex-wrap", ".flex-col", ".flex-row"],
          tags: ["flexbox", "layout", "alignment"],
          category: "layout"
        },
        {
          id: "grow",
          name: "Flex Grow",
          description: "Fill remaining flex space",
          selectors: [".grow"],
          tags: ["flex", "expand", "fill"],
          category: "layout"
        },
        {
          id: "stack",
          name: "Stack",
          description: "Vertical flex layout with predefined gaps",
          selectors: [".stack-sm", ".stack-md", ".stack-lg", ".stack-xl"],
          tags: ["vertical", "spacing", "column"],
          category: "layout"
        },
        {
          id: "gap",
          name: "Gap",
          description: "Spacing between flex/grid children",
          selectors: [".gap-0", ".gap-xs", ".gap-sm", ".gap-md", ".gap-lg", ".gap-xl"],
          tags: ["spacing", "margin", "gutters"],
          category: "spacing"
        },
        {
          id: "items",
          name: "Items Alignment",
          description: "Cross-axis alignment for flex/grid",
          selectors: [".items-start", ".items-center", ".items-end", ".items-stretch", ".items-baseline"],
          tags: ["alignment", "vertical", "cross-axis"],
          category: "alignment"
        },
        {
          id: "justify",
          name: "Justify Content",
          description: "Main-axis alignment for flex/grid",
          selectors: [".justify-start", ".justify-center", ".justify-end", ".justify-between", ".justify-around", ".justify-evenly"],
          tags: ["alignment", "horizontal", "main-axis"],
          category: "alignment"
        },
        {
          id: "max-width",
          name: "Max-Width",
          description: "Content width constraints",
          selectors: [".max-w-sm", ".max-w-md", ".max-w-lg", ".max-w-xl"],
          tags: ["width", "constraint", "readable"],
          category: "sizing"
        },
        {
          id: "section",
          name: "Section Spacing",
          description: "Vertical padding for content sections",
          selectors: [".section", ".section-lg"],
          tags: ["spacing", "vertical", "padding"],
          category: "spacing"
        },
        {
          id: "mobile-stack",
          name: "Mobile Stack",
          description: "Stack on mobile, row on desktop",
          selectors: [".mobile-stack"],
          tags: ["responsive", "mobile", "breakpoint"],
          category: "responsive"
        }
      ],
      // ═══════════════════════════════════════════════════════════════════════════
      // UTILITIES (Low-level single-purpose classes)
      // ═══════════════════════════════════════════════════════════════════════════
      utilities: {
        text: {
          alignment: [".text-left", ".text-center", ".text-right"],
          color: [".text-muted"],
          overflow: [".truncate"]
        },
        backdrop: {
          base: [".backdrop"],
          variants: [".backdrop-light", ".backdrop-dark"],
          blur: [".backdrop-blur-sm", ".backdrop-blur-md", ".backdrop-blur-lg"]
        },
        shadow: {
          scale: [".shadow-sm", ".shadow-base", ".shadow-md", ".shadow-lg", ".shadow-xl", ".shadow-inner", ".shadow-none"]
        },
        border: {
          gradient: [".border-gradient", ".border-gradient-primary", ".border-gradient-accent", ".border-gradient-secondary", ".border-gradient-soft", ".border-gradient-medium", ".border-gradient-strong"],
          glow: [".border-glow", ".border-glow-sm", ".border-glow-lg", ".border-glow-primary", ".border-glow-accent", ".border-glow-success", ".border-glow-warning", ".border-glow-danger"],
          combined: [".border-gradient-glow"]
        },
        media: {
          image: [".img-gallery", ".img-rounded-sm", ".img-rounded-md", ".img-rounded-lg", ".img-rounded-xl", ".img-rounded-full", ".img-inline"],
          video: [".video-responsive"],
          figure: [".figure-responsive"]
        },
        effects: {
          glass: [".liquid-glass"]
        }
      },
      // ═══════════════════════════════════════════════════════════════════════════
      // RESPONSIVE UTILITIES (Breakpoint-prefixed)
      // ═══════════════════════════════════════════════════════════════════════════
      responsive: {
        prefixes: ["sm", "md", "lg"],
        utilities: {
          grid: [":grid-cols-2", ":grid-cols-3", ":grid-cols-4"],
          flex: [":flex-row"],
          text: [":text-sm", ":text-lg", ":text-xl"],
          spacing: [":p-6", ":p-8", ":p-12", ":gap-6", ":gap-8", ":gap-12"],
          width: [":w-1/2", ":w-1/3", ":w-1/4"],
          display: [":hidden", ":block"]
        }
      },
      // ═══════════════════════════════════════════════════════════════════════════
      // ENHANCEMENTS (Progressive enhancement selectors)
      // ═══════════════════════════════════════════════════════════════════════════
      enhancements: [
        {
          id: "dropdown",
          selector: "nav[data-dropdown]",
          description: "Dropdown menu from nav element",
          tags: ["menu", "interactive", "navigation"]
        },
        {
          id: "toggle",
          selector: "label[data-toggle]",
          description: "Toggle switch from checkbox",
          tags: ["switch", "boolean", "form"]
        },
        {
          id: "range",
          selector: 'input[type="range"]',
          description: "Enhanced range slider with output",
          tags: ["slider", "input", "form"]
        },
        {
          id: "required",
          selector: "form [required]",
          description: "Required field asterisk indicator",
          tags: ["validation", "form", "accessibility"]
        },
        {
          id: "open-group",
          selector: "fieldset[role=group][data-open]",
          description: "Editable checkbox/radio group",
          tags: ["form", "dynamic", "editable"]
        },
        {
          id: "working-button",
          selector: "button.btn-working, a.btn-working",
          description: "Button with loading spinner",
          tags: ["loading", "async", "feedback"]
        },
        {
          id: "labeled-divider",
          selector: "hr[data-content]",
          description: "Horizontal rule with centered label",
          tags: ["divider", "separator", "text"]
        }
      ],
      // ═══════════════════════════════════════════════════════════════════════════
      // SEMANTIC CATEGORIES (For correlation and search)
      // ═══════════════════════════════════════════════════════════════════════════
      categories: {
        feedback: {
          description: "User feedback and status indicators",
          primitives: ["callout", "badge", "empty-state"],
          components: ["pds-toaster"]
        },
        form: {
          description: "Form inputs and controls",
          primitives: ["button", "fieldset", "label-field", "form"],
          components: ["pds-upload", "pds-form", "pds-richtext", "pds-calendar"]
        },
        layout: {
          description: "Page structure and content arrangement",
          patterns: ["container", "grid", "flex", "stack", "section"],
          components: ["pds-splitpanel", "pds-scrollrow"]
        },
        navigation: {
          description: "Navigation and routing",
          primitives: ["navigation"],
          components: ["pds-tabstrip", "pds-drawer"]
        },
        media: {
          description: "Images, icons, and visual content",
          primitives: ["icon", "figure", "gallery"],
          components: ["pds-icon"]
        },
        overlay: {
          description: "Modal and overlay content",
          primitives: ["dialog"],
          components: ["pds-drawer"]
        },
        data: {
          description: "Data display and tables",
          primitives: ["table"]
        },
        theming: {
          description: "Colors, surfaces, and visual theming",
          primitives: ["surface"]
        },
        action: {
          description: "Interactive actions and buttons",
          primitives: ["button"],
          components: ["pds-fab"]
        }
      },
      // ═══════════════════════════════════════════════════════════════════════════
      // STYLE METADATA
      // ═══════════════════════════════════════════════════════════════════════════
      styles: {
        typography: ["headings", "body", "code", "links"],
        icons: { source: "svg", sets: ["core", "brand"] },
        interactive: ["focus", "hover", "active", "disabled"],
        states: ["success", "warning", "danger", "info", "muted"]
      },
      // ═══════════════════════════════════════════════════════════════════════════
      // SEARCH RELATIONS (Cross-concept mappings for intelligent search)
      // Used by PDS.query() and Storybook ontology search to expand user queries
      // ═══════════════════════════════════════════════════════════════════════════
      searchRelations: {
        // Typography & Text
        text: ["typography", "truncate", "text-muted", "text-primary", "text-left", "text-center", "text-right", "pds-richtext", "heading", "font", "label", "paragraph", "content", "ellipsis", "overflow", "input"],
        font: ["typography", "text", "heading", "font-size", "font-weight", "font-family"],
        type: ["typography", "text", "font"],
        typography: ["text", "font", "heading", "truncate", "text-muted"],
        heading: ["typography", "text", "font-size", "h1", "h2", "h3"],
        truncate: ["text", "overflow", "ellipsis", "clamp", "nowrap", "typography"],
        ellipsis: ["truncate", "text", "overflow", "clamp"],
        overflow: ["truncate", "scroll", "hidden", "text"],
        paragraph: ["text", "typography", "content", "body"],
        content: ["text", "typography", "body", "article"],
        empty: ["empty-state", "placeholder", "zero", "no-data", "onboarding", "callout", "card", "icon", "button"],
        "empty state": ["empty-state", "empty", "no-data", "zero", "onboarding"],
        "no data": ["empty-state", "empty", "zero", "placeholder"],
        // Forms & Inputs
        form: ["input", "field", "label", "button", "fieldset", "pds-form", "pds-upload", "pds-richtext", "pds-calendar", "required", "validation", "submit"],
        input: ["form", "field", "text", "label", "required", "validation"],
        field: ["form", "input", "label", "required"],
        button: ["btn", "interactive", "action", "submit", "form", "btn-primary", "btn-secondary", "btn-working", "pds-fab", "floating"],
        btn: ["button", "interactive", "action", "pds-fab"],
        fab: ["pds-fab", "floating", "button", "action", "menu"],
        floating: ["fab", "pds-fab", "button", "action"],
        toggle: ["switch", "checkbox", "boolean", "form", "interactive"],
        switch: ["toggle", "checkbox", "boolean"],
        slider: ["range", "input", "form"],
        range: ["slider", "input", "form"],
        checkbox: ["toggle", "form", "fieldset", "boolean"],
        radio: ["fieldset", "form", "group"],
        select: ["dropdown", "form", "input", "menu"],
        upload: ["file", "pds-upload", "form", "drag-drop"],
        file: ["upload", "pds-upload", "form"],
        // Modals & Overlays
        modal: ["dialog", "pds-ask", "overlay", "popup", "backdrop", "pds-drawer", "alert", "confirm", "prompt", "lightbox"],
        dialog: ["modal", "pds-ask", "overlay", "popup", "backdrop", "alert", "confirm", "prompt"],
        popup: ["modal", "dialog", "dropdown", "popover", "overlay", "tooltip"],
        popover: ["popup", "tooltip", "overlay"],
        overlay: ["modal", "dialog", "backdrop", "drawer", "popup"],
        drawer: ["pds-drawer", "sidebar", "panel", "overlay", "modal"],
        backdrop: ["overlay", "modal", "dialog", "blur"],
        confirm: ["pds-ask", "dialog", "modal"],
        prompt: ["pds-ask", "dialog", "modal", "input"],
        ask: ["pds-ask", "dialog", "confirm", "prompt", "modal"],
        // Navigation & Menus
        dropdown: ["menu", "nav-dropdown", "select", "popover"],
        menu: ["dropdown", "navigation", "nav", "list"],
        nav: ["navigation", "menu", "dropdown", "tabs", "links"],
        navigation: ["nav", "menu", "tabs", "pds-tabstrip", "links", "routing"],
        tabs: ["pds-tabstrip", "navigation", "panels"],
        tab: ["tabs", "pds-tabstrip", "panel"],
        link: ["navigation", "anchor", "href", "routing"],
        // Feedback & Notifications (callout is the primary term, alert is kept as alias for backwards compatibility)
        callout: ["notification", "feedback", "message", "status", "toast", "information", "alert", "warning", "error", "info", "success", "danger"],
        alert: ["callout", "notification", "feedback", "message", "status", "toast", "modal", "dialog", "pds-ask", "confirm", "warning", "error", "info", "success", "danger"],
        notification: ["callout", "toast", "pds-toaster", "feedback", "message", "popup", "alert"],
        toast: ["pds-toaster", "notification", "callout", "feedback", "popup", "snackbar", "alert"],
        feedback: ["callout", "notification", "toast", "status", "badge", "validation", "error", "success", "alert"],
        message: ["callout", "notification", "feedback", "dialog", "toast", "alert"],
        status: ["badge", "callout", "indicator", "feedback", "state", "alert"],
        error: ["callout", "danger", "validation", "feedback", "warning", "alert"],
        success: ["callout", "feedback", "badge", "status", "check", "alert"],
        warning: ["callout", "caution", "feedback", "status", "alert"],
        info: ["callout", "information", "feedback", "status", "alert"],
        danger: ["callout", "error", "feedback", "destructive", "delete", "alert"],
        badge: ["status", "pill", "tag", "chip", "indicator", "label"],
        pill: ["badge", "tag", "chip"],
        tag: ["badge", "pill", "chip", "label"],
        chip: ["badge", "pill", "tag"],
        // Layout & Structure
        layout: ["grid", "flex", "stack", "container", "gap", "spacing", "pds-splitpanel", "section"],
        grid: ["layout", "columns", "css-grid", "table", "gallery"],
        flex: ["layout", "flexbox", "alignment", "row", "column"],
        stack: ["layout", "vertical", "spacing", "column", "gap"],
        container: ["wrapper", "layout", "max-width", "centered"],
        gap: ["spacing", "margin", "padding", "layout"],
        spacing: ["gap", "margin", "padding", "section"],
        section: ["spacing", "layout", "container", "page"],
        split: ["pds-splitpanel", "resizable", "panels", "layout"],
        panel: ["pds-splitpanel", "drawer", "sidebar", "section"],
        // Cards & Surfaces
        card: ["surface", "container", "elevated", "content"],
        surface: ["card", "background", "elevated", "theming", "color"],
        box: ["card", "container", "surface"],
        elevated: ["surface", "shadow", "card"],
        // Colors & Theming
        color: ["palette", "theme", "surface", "primary", "secondary", "accent"],
        colours: ["color", "palette", "theme"],
        palette: ["color", "theme", "tokens"],
        theme: ["color", "palette", "dark", "light", "surface"],
        primary: ["color", "button", "badge", "surface"],
        secondary: ["color", "button", "badge", "surface"],
        accent: ["color", "highlight", "surface"],
        // Borders & Effects
        border: ["border-gradient", "border-glow", "outline", "radius"],
        effect: ["border-gradient", "border-glow", "shadow", "glass", "animation"],
        gradient: ["border-gradient", "color", "background"],
        glow: ["border-glow", "effect", "shadow"],
        shadow: ["elevated", "effect", "depth", "card"],
        radius: ["rounded", "border", "corner"],
        rounded: ["radius", "border", "corner"],
        glass: ["liquid-glass", "backdrop", "blur", "effect"],
        // Media & Icons
        icon: ["pds-icon", "graphic", "symbol", "svg", "phosphor"],
        image: ["img", "figure", "gallery", "media", "picture"],
        img: ["image", "figure", "gallery", "media"],
        figure: ["image", "media", "caption"],
        gallery: ["images", "grid", "collection", "media"],
        media: ["image", "icon", "figure", "gallery", "video"],
        // Tables & Data
        table: ["data", "grid", "tabular", "rows", "columns"],
        data: ["table", "json", "form", "display"],
        // Editors & Rich Content
        editor: ["pds-richtext", "wysiwyg", "text", "content"],
        wysiwyg: ["editor", "pds-richtext", "richtext"],
        richtext: ["pds-richtext", "editor", "wysiwyg", "text"],
        // Calendar & Dates
        calendar: ["pds-calendar", "date", "picker", "datepicker"],
        date: ["calendar", "pds-calendar", "picker", "input"],
        datepicker: ["calendar", "date", "pds-calendar"],
        // Scroll & Carousel
        scroll: ["pds-scrollrow", "carousel", "horizontal", "overflow"],
        carousel: ["scroll", "pds-scrollrow", "slider", "gallery"],
        // Accordion & Disclosure
        accordion: ["details", "collapsible", "expandable", "disclosure"],
        collapsible: ["accordion", "details", "expandable"],
        expandable: ["accordion", "collapsible", "disclosure"],
        details: ["accordion", "summary", "disclosure"],
        // Divider & Separator
        divider: ["hr", "separator", "line", "rule"],
        separator: ["divider", "hr", "line"],
        hr: ["divider", "separator", "horizontal-rule"],
        // Interactive States
        interactive: ["hover", "focus", "active", "disabled", "button", "link"],
        hover: ["interactive", "effect", "state"],
        focus: ["interactive", "accessibility", "state", "outline"],
        disabled: ["interactive", "state", "muted"],
        loading: ["btn-working", "spinner", "async", "progress"],
        spinner: ["loading", "btn-working", "progress"],
        // Accessibility
        accessibility: ["a11y", "aria", "focus", "label", "required"],
        a11y: ["accessibility", "aria", "semantic"],
        aria: ["accessibility", "a11y", "role"],
        required: ["form", "validation", "asterisk", "input"],
        validation: ["form", "required", "error", "feedback"],
        // Documentation & Getting Started
        start: ["getting-started", "intro", "overview", "whatispds"],
        intro: ["getting-started", "overview", "start", "docs"],
        getting: ["getting-started", "start", "intro"],
        overview: ["intro", "start", "summary", "layout-overview"],
        docs: ["documentation", "reference", "guide"],
        // Category keywords (for searching by category name - ONE-WAY only, not bidirectional)
        // These should NOT list individual items - that causes pollution when reversed
        primitive: ["primitives"],
        component: ["components"],
        enhancement: ["enhancements"],
        foundation: ["foundations", "color", "icon", "typography", "spacing", "tokens"],
        utility: ["utilities", "text", "backdrop", "shadow", "border", "helper"],
        pattern: ["patterns", "layout", "responsive", "mobile-stack"]
      }
    };
    pds_ontology_default = ontology;
  }
});

// node_modules/pure-web/src/js/auto-definer.js
var auto_definer_exports = {};
__export(auto_definer_exports, {
  AutoDefiner: () => AutoDefiner
});
async function defineWebComponents(...args) {
  let opts = {};
  if (args.length && typeof args[args.length - 1] === "object") {
    opts = args.pop() || {};
  }
  const tags = args;
  const {
    baseURL,
    mapper = (tag) => `${tag}.js`,
    onError = (tag, err) => console.error(`[defineWebComponents] ${tag}:`, err)
  } = opts;
  const base = baseURL ? new URL(
    baseURL,
    typeof location !== "undefined" ? location.href : import.meta.url
  ) : new URL("./", import.meta.url);
  const toPascal = (tag) => tag.toLowerCase().replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase());
  const loadOne = async (tag) => {
    try {
      if (customElements.get(tag))
        return { tag, status: "already-defined" };
      const spec = mapper(tag);
      const href = spec instanceof URL ? spec.href : new URL(spec, base).href;
      const mod = await import(href);
      const Named = mod?.default ?? mod?.[toPascal(tag)];
      if (!Named) {
        if (customElements.get(tag))
          return { tag, status: "self-defined" };
        throw new Error(
          `No export found for ${tag}. Expected default export or named export "${toPascal(
            tag
          )}".`
        );
      }
      if (!customElements.get(tag)) {
        customElements.define(tag, Named);
        return { tag, status: "defined" };
      }
      return { tag, status: "race-already-defined" };
    } catch (err) {
      onError(tag, err);
      throw err;
    }
  };
  return Promise.all(tags.map(loadOne));
}
var AutoDefiner;
var init_auto_definer = __esm({
  "node_modules/pure-web/src/js/auto-definer.js"() {
    AutoDefiner = class {
      constructor(options = {}) {
        const {
          baseURL,
          mapper,
          onError,
          predicate = () => true,
          attributeModule = "data-module",
          root = document,
          scanExisting = true,
          debounceMs = 16,
          observeShadows = true,
          enhancers = [],
          // [{String selector, Function run(elem)}]
          patchAttachShadow = true
        } = options;
        const pending = /* @__PURE__ */ new Set();
        const inFlight = /* @__PURE__ */ new Set();
        const knownMissing = /* @__PURE__ */ new Set();
        const perTagModulePath = /* @__PURE__ */ new Map();
        const shadowObservers = /* @__PURE__ */ new WeakMap();
        const enhancerApplied = /* @__PURE__ */ new WeakMap();
        let timer = 0;
        let stopped = false;
        let restoreAttachShadow = null;
        const applyEnhancers = (element) => {
          if (!element || !enhancers.length)
            return;
          let appliedEnhancers = enhancerApplied.get(element);
          if (!appliedEnhancers) {
            appliedEnhancers = /* @__PURE__ */ new Set();
            enhancerApplied.set(element, appliedEnhancers);
          }
          for (const enhancer of enhancers) {
            if (!enhancer.selector || !enhancer.run)
              continue;
            if (appliedEnhancers.has(enhancer.selector))
              continue;
            try {
              if (element.matches && element.matches(enhancer.selector)) {
                enhancer.run(element);
                appliedEnhancers.add(enhancer.selector);
              }
            } catch (err) {
              console.warn(
                `[AutoDefiner] Error applying enhancer for selector "${enhancer.selector}":`,
                err
              );
            }
          }
        };
        const queueTag = (tag, el) => {
          if (stopped)
            return;
          if (!tag || !tag.includes("-"))
            return;
          if (customElements.get(tag))
            return;
          if (inFlight.has(tag))
            return;
          if (knownMissing.has(tag))
            return;
          if (el && el.getAttribute) {
            const override = el.getAttribute(attributeModule);
            if (override && !perTagModulePath.has(tag)) {
              perTagModulePath.set(tag, override);
            }
          }
          pending.add(tag);
          schedule();
        };
        const schedule = () => {
          if (timer)
            return;
          timer = setTimeout(flush, debounceMs);
        };
        const crawlTree = (rootNode) => {
          if (!rootNode)
            return;
          if (rootNode.nodeType === 1) {
            const el = (
              /** @type {Element} */
              rootNode
            );
            const tag = el.tagName?.toLowerCase();
            if (tag && tag.includes("-") && !customElements.get(tag) && predicate(tag, el)) {
              queueTag(tag, el);
            }
            applyEnhancers(el);
            if (observeShadows && el.shadowRoot) {
              observeShadowRoot(el.shadowRoot);
            }
          }
          if (rootNode.querySelectorAll) {
            rootNode.querySelectorAll("*").forEach((e) => {
              const t = e.tagName?.toLowerCase();
              if (t && t.includes("-") && !customElements.get(t) && predicate(t, e)) {
                queueTag(t, e);
              }
              applyEnhancers(e);
              if (observeShadows && e.shadowRoot) {
                observeShadowRoot(e.shadowRoot);
              }
            });
          }
        };
        const observeShadowRoot = (sr) => {
          if (!sr || shadowObservers.has(sr))
            return;
          crawlTree(sr);
          const mo = new MutationObserver((mutations) => {
            for (const m of mutations) {
              m.addedNodes?.forEach((n) => {
                crawlTree(n);
              });
              if (m.type === "attributes" && m.target) {
                crawlTree(m.target);
              }
            }
          });
          mo.observe(sr, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: [
              attributeModule,
              ...enhancers.map((e) => e.selector).filter((s) => s.startsWith("data-"))
            ]
          });
          shadowObservers.set(sr, mo);
        };
        async function flush() {
          clearTimeout(timer);
          timer = 0;
          if (!pending.size)
            return;
          const tags = Array.from(pending);
          pending.clear();
          tags.forEach((t) => inFlight.add(t));
          try {
            const effectiveMapper = (tag) => perTagModulePath.get(tag) ?? (mapper ? mapper(tag) : `${tag}.js`);
            await defineWebComponents(...tags, {
              baseURL,
              mapper: effectiveMapper,
              onError: (tag, err) => {
                knownMissing.add(tag);
                onError?.(tag, err);
              }
            });
          } catch {
          } finally {
            tags.forEach((t) => inFlight.delete(t));
          }
        }
        const mountNode = root === document ? document.documentElement : root;
        const obs = new MutationObserver((mutations) => {
          for (const m of mutations) {
            m.addedNodes?.forEach((n) => {
              crawlTree(n);
            });
            if (m.type === "attributes" && m.target) {
              crawlTree(m.target);
            }
          }
        });
        obs.observe(mountNode, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: [
            attributeModule,
            ...enhancers.map((e) => e.selector).filter((s) => s.startsWith("data-"))
          ]
        });
        if (observeShadows && patchAttachShadow && Element.prototype.attachShadow) {
          const orig = Element.prototype.attachShadow;
          Element.prototype.attachShadow = function patchedAttachShadow(init) {
            const sr = orig.call(this, init);
            if (init && init.mode === "open") {
              observeShadowRoot(sr);
              const tag = this.tagName?.toLowerCase();
              if (tag && tag.includes("-") && !customElements.get(tag)) {
                queueTag(tag, this);
              }
            }
            return sr;
          };
          restoreAttachShadow = () => Element.prototype.attachShadow = orig;
        }
        if (scanExisting) {
          crawlTree(mountNode);
        }
        return {
          stop() {
            stopped = true;
            obs.disconnect();
            if (restoreAttachShadow)
              restoreAttachShadow();
            if (timer) {
              clearTimeout(timer);
              timer = 0;
            }
            shadowObservers.forEach((mo) => mo.disconnect());
          },
          flush
        };
      }
      /**
       * Dynamically load and (idempotently) define a set of web components by tag name.
       */
      static async define(...args) {
        let opts = {};
        if (args.length && typeof args[args.length - 1] === "object") {
          opts = args.pop() || {};
        }
        const tags = args;
        const {
          baseURL,
          mapper = (tag) => `${tag}.js`,
          onError = (tag, err) => console.error(`[defineWebComponents] ${tag}:`, err)
        } = opts;
        const base = baseURL ? new URL(
          baseURL,
          typeof location !== "undefined" ? location.href : import.meta.url
        ) : new URL("./", import.meta.url);
        const toPascal = (tag) => tag.toLowerCase().replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase());
        const loadOne = async (tag) => {
          try {
            if (customElements.get(tag))
              return { tag, status: "already-defined" };
            const spec = mapper(tag);
            const href = spec instanceof URL ? spec.href : new URL(spec, base).href;
            const mod = await import(href);
            const Named = mod?.default ?? mod?.[toPascal(tag)];
            if (!Named) {
              if (customElements.get(tag))
                return { tag, status: "self-defined" };
              throw new Error(
                `No export found for ${tag}. Expected default export or named export "${toPascal(
                  tag
                )}".`
              );
            }
            if (!customElements.get(tag)) {
              customElements.define(tag, Named);
              return { tag, status: "defined" };
            }
            return { tag, status: "race-already-defined" };
          } catch (err) {
            onError(tag, err);
            throw err;
          }
        };
        return Promise.all(tags.map(loadOne));
      }
    };
  }
});

// src/js/pds-core/pds-query.js
var pds_query_exports = {};
__export(pds_query_exports, {
  PDSQuery: () => PDSQuery
});
var PDSQuery;
var init_pds_query = __esm({
  "src/js/pds-core/pds-query.js"() {
    PDSQuery = class {
      constructor(pds) {
        this.pds = pds;
        this.intents = {
          color: ["color", "colours", "shade", "tint", "hue", "foreground", "background", "text", "fill", "bg", "fg"],
          spacing: ["spacing", "space", "gap", "padding", "margin", "distance", "rhythm"],
          typography: ["font", "text", "type", "typography", "heading", "body", "size", "weight", "family"],
          border: ["border", "outline", "stroke", "edge", "frame"],
          radius: ["radius", "rounded", "corner", "curve", "round"],
          shadow: ["shadow", "elevation", "depth", "glow", "drop-shadow"],
          component: ["component", "element", "widget"],
          utility: ["utility", "class", "helper", "css"],
          layout: ["layout", "container", "grid", "flex", "group", "arrange", "organize"],
          pattern: ["pattern", "example", "template", "structure"],
          interaction: ["hover", "focus", "active", "disabled", "pressed", "selected", "checked"]
        };
        this.entities = {
          button: ["button", "btn", "cta"],
          input: ["input", "field", "textbox", "text-field", "form-control"],
          card: ["card", "panel"],
          badge: ["badge", "pill", "tag", "chip"],
          surface: ["surface", "background", "layer", "container"],
          icon: ["icon", "svg", "glyph", "symbol"],
          link: ["link", "anchor", "hyperlink"],
          nav: ["nav", "navigation", "menu"],
          modal: ["modal", "dialog", "popup", "overlay"],
          drawer: ["drawer", "sidebar", "panel"],
          tab: ["tab", "tabstrip"],
          toast: ["toast", "notification", "callout", "message", "alert"]
        };
        this.questionWords = ["what", "which", "how", "where", "when", "show", "find", "get", "give", "tell"];
      }
      /**
       * Main search entry point
       * @param {string} query - Natural language question
       * @returns {Promise<Array>} Array of results with text, value, icon, category, score
       */
      async search(query) {
        if (!query || query.length < 2)
          return [];
        const normalized = query.toLowerCase().trim();
        const tokens = this.tokenize(normalized);
        const context = this.analyzeQuery(tokens, normalized);
        const results = [];
        if (context.intents.has("color")) {
          results.push(...this.queryColors(context, normalized));
        }
        if (context.intents.has("utility") || context.intents.has("border") || context.intents.has("layout") || normalized.includes("class")) {
          results.push(...this.queryUtilities(context, normalized));
        }
        if (context.intents.has("component") || context.entities.size > 0) {
          results.push(...this.queryComponents(context, normalized));
        }
        if (context.intents.has("layout") || context.intents.has("pattern")) {
          results.push(...this.queryPatterns(context, normalized));
        }
        if (context.intents.has("typography")) {
          results.push(...this.queryTypography(context, normalized));
        }
        if (context.intents.has("spacing")) {
          results.push(...this.querySpacing(context, normalized));
        }
        const seen = /* @__PURE__ */ new Map();
        for (const result of results) {
          const key = result.value;
          if (!seen.has(key) || seen.get(key).score < result.score) {
            seen.set(key, result);
          }
        }
        return Array.from(seen.values()).sort((a, b) => b.score - a.score).slice(0, 10);
      }
      /**
       * Tokenize and normalize query string
       */
      tokenize(text) {
        return text.toLowerCase().replace(/[?!.]/g, "").split(/\s+/).filter((t) => t.length > 0);
      }
      /**
       * Analyze query to extract intents and entities
       */
      analyzeQuery(tokens, fullText) {
        const context = {
          intents: /* @__PURE__ */ new Set(),
          entities: /* @__PURE__ */ new Set(),
          modifiers: /* @__PURE__ */ new Set(),
          isQuestion: false,
          tokens,
          fullText
        };
        context.isQuestion = this.questionWords.some((qw) => tokens.includes(qw));
        for (const [intent, keywords] of Object.entries(this.intents)) {
          if (keywords.some((kw) => tokens.includes(kw) || fullText.includes(kw))) {
            context.intents.add(intent);
          }
        }
        for (const [entity, keywords] of Object.entries(this.entities)) {
          if (keywords.some((kw) => tokens.includes(kw) || fullText.includes(kw))) {
            context.entities.add(entity);
          }
        }
        if (tokens.includes("hover") || fullText.includes("hover"))
          context.modifiers.add("hover");
        if (tokens.includes("focus") || fullText.includes("focus"))
          context.modifiers.add("focus");
        if (tokens.includes("active") || fullText.includes("active"))
          context.modifiers.add("active");
        if (tokens.includes("disabled") || fullText.includes("disabled"))
          context.modifiers.add("disabled");
        return context;
      }
      /**
       * Query color tokens and surfaces
       */
      queryColors(context, query) {
        const results = [];
        const compiled = this.pds.compiled;
        if (!compiled?.tokens?.colors)
          return results;
        const colors = compiled.tokens.colors;
        const entities = Array.from(context.entities);
        const modifiers = Array.from(context.modifiers);
        if (modifiers.includes("focus") && context.intents.has("border") && entities.includes("input")) {
          results.push({
            text: "Focus border color: var(--color-primary-500)",
            value: "--color-primary-500",
            icon: "palette",
            category: "Color Token",
            score: 100,
            cssVar: "var(--color-primary-500)",
            description: "Primary color used for focus states on form inputs"
          });
        }
        if ((query.includes("foreground") || query.includes("text")) && (query.includes("surface") || context.entities.has("surface"))) {
          results.push({
            text: "Text on surface: var(--surface-text)",
            value: "--surface-text",
            icon: "palette",
            category: "Surface Token",
            score: 95,
            cssVar: "var(--surface-text)",
            description: "Default text color for current surface"
          });
          results.push({
            text: "Secondary text: var(--surface-text-secondary)",
            value: "--surface-text-secondary",
            icon: "palette",
            category: "Surface Token",
            score: 90,
            cssVar: "var(--surface-text-secondary)",
            description: "Secondary/muted text on surface"
          });
        }
        if (query.includes("primary") || query.includes("accent") || query.includes("secondary")) {
          const scale = query.includes("primary") ? "primary" : query.includes("accent") ? "accent" : "secondary";
          for (const shade of [500, 600, 700]) {
            const varName = `--color-${scale}-${shade}`;
            results.push({
              text: `${scale.charAt(0).toUpperCase() + scale.slice(1)} ${shade}: var(${varName})`,
              value: varName,
              icon: "palette",
              category: "Color Scale",
              score: 80 - (shade - 500) / 100,
              cssVar: `var(${varName})`,
              description: `${scale} color scale shade ${shade}`
            });
          }
        }
        if (entities.includes("button") && context.intents.has("color")) {
          const modifier = modifiers[0];
          if (modifier) {
            results.push({
              text: `Button ${modifier} fill: var(--${modifier === "hover" ? "primary" : "primary"}-fill-${modifier})`,
              value: `--primary-fill-${modifier}`,
              icon: "palette",
              category: "Interactive Token",
              score: 92,
              description: `Button background color in ${modifier} state`
            });
          } else {
            results.push({
              text: "Button fill: var(--primary-fill)",
              value: "--primary-fill",
              icon: "palette",
              category: "Interactive Token",
              score: 88,
              description: "Default button background color"
            });
          }
        }
        return results;
      }
      /**
       * Query utility classes
       */
      queryUtilities(context, query) {
        const results = [];
        const ontology2 = this.pds.ontology;
        if (!ontology2?.utilities)
          return results;
        const utilitiesObj = ontology2.utilities;
        const utilities = [];
        for (const category of Object.values(utilitiesObj)) {
          if (typeof category === "object") {
            for (const value of Object.values(category)) {
              if (Array.isArray(value)) {
                utilities.push(...value);
              }
            }
          }
        }
        if (context.intents.has("border")) {
          const borderUtils = utilities.filter(
            (u) => u.includes("border") || u.includes("outline")
          );
          borderUtils.forEach((util) => {
            let score = 80;
            if (query.includes("gradient") && util.includes("gradient"))
              score = 95;
            if (query.includes("glow") && util.includes("glow"))
              score = 95;
            results.push({
              text: `${util} - Border utility class`,
              value: util,
              icon: "code",
              category: "Utility Class",
              score,
              code: `<div class="${util}">...</div>`,
              description: this.describeUtility(util)
            });
          });
        }
        if (context.intents.has("layout")) {
          const layoutUtils = utilities.filter(
            (u) => u.includes("flex") || u.includes("grid") || u.includes("items-") || u.includes("justify-") || u.includes("gap-")
          );
          layoutUtils.forEach((util) => {
            results.push({
              text: `${util} - Layout utility`,
              value: util,
              icon: "layout",
              category: "Utility Class",
              score: 85,
              code: `<div class="${util}">...</div>`,
              description: this.describeUtility(util)
            });
          });
        }
        if (query.includes("group") && context.entities.has("button")) {
          results.push({
            text: ".btn-group - Group buttons together",
            value: ".btn-group",
            icon: "code",
            category: "Utility Class",
            score: 90,
            code: `<div class="btn-group">
  <button class="btn-primary">One</button>
  <button class="btn-primary">Two</button>
</div>`,
            description: "Container for grouped buttons with connected styling"
          });
        }
        return results;
      }
      /**
       * Query components
       */
      queryComponents(context, query) {
        const results = [];
        const ontology2 = this.pds.ontology;
        if (!ontology2?.components && !ontology2?.primitives)
          return results;
        if (ontology2.components) {
          ontology2.components.forEach((comp) => {
            const matchScore = this.scoreMatch(query, comp.name + " " + comp.id);
            if (matchScore > 50) {
              results.push({
                text: `<${comp.id}> - ${comp.name}`,
                value: comp.id,
                icon: "brackets-curly",
                category: "Web Component",
                score: matchScore,
                code: `<${comp.id}></${comp.id}>`,
                description: comp.description || `${comp.name} web component`
              });
            }
          });
        }
        if (ontology2.primitives) {
          ontology2.primitives.forEach((prim) => {
            const matchScore = this.scoreMatch(query, prim.name + " " + prim.id);
            if (matchScore > 50) {
              const selector = prim.selectors?.[0] || prim.id;
              results.push({
                text: `${selector} - ${prim.name}`,
                value: prim.id,
                icon: "tag",
                category: "Primitive",
                score: matchScore - 5,
                code: this.generatePrimitiveExample(prim),
                description: prim.description || `${prim.name} primitive element`
              });
            }
          });
        }
        if (query.includes("icon") && (query.includes("only") || query.includes("button"))) {
          results.push({
            text: 'Icon-only button: <button class="btn-icon">',
            value: "btn-icon",
            icon: "star",
            category: "Pattern",
            score: 95,
            code: `<button class="btn-icon btn-primary">
  <pds-icon icon="heart"></pds-icon>
</button>`,
            description: "Button with only an icon, no text label"
          });
        }
        return results;
      }
      /**
       * Query layout patterns
       */
      queryPatterns(context, query) {
        const results = [];
        const ontology2 = this.pds.ontology;
        if (!ontology2?.layoutPatterns)
          return results;
        ontology2.layoutPatterns.forEach((pattern) => {
          const matchScore = this.scoreMatch(query, pattern.name + " " + pattern.id + " " + (pattern.description || ""));
          if (matchScore > 50) {
            const selector = pattern.selectors?.[0] || `.${pattern.id}`;
            results.push({
              text: `${pattern.name} - ${pattern.description || "Layout pattern"}`,
              value: pattern.id,
              icon: "layout",
              category: "Layout Pattern",
              score: matchScore,
              code: `<div class="${selector.replace(".", "")}">
  <!-- content -->
</div>`,
              description: pattern.description || pattern.name
            });
          }
        });
        if (query.includes("container") || query.includes("group")) {
          results.push({
            text: "Card - Container for grouping content",
            value: "card",
            icon: "layout",
            category: "Primitive",
            score: 88,
            code: `<article class="card">
  <header>
    <h3>Title</h3>
  </header>
  <p>Content...</p>
</article>`,
            description: "Card container with optional header, body, and footer"
          });
          results.push({
            text: "Section - Semantic container for grouping",
            value: "section",
            icon: "layout",
            category: "Pattern",
            score: 85,
            code: `<section>
  <h2>Section Title</h2>
  <!-- content -->
</section>`,
            description: "Semantic section element for content grouping"
          });
        }
        return results;
      }
      /**
       * Query typography tokens
       */
      queryTypography(context, query) {
        const results = [];
        const compiled = this.pds.compiled;
        if (!compiled?.tokens?.typography)
          return results;
        const typo = compiled.tokens.typography;
        if (query.includes("heading") || query.includes("title")) {
          results.push({
            text: "Heading font: var(--font-family-heading)",
            value: "--font-family-heading",
            icon: "text-aa",
            category: "Typography Token",
            score: 85,
            cssVar: "var(--font-family-heading)",
            description: "Font family for headings"
          });
        }
        if (query.includes("body") || query.includes("text")) {
          results.push({
            text: "Body font: var(--font-family-body)",
            value: "--font-family-body",
            icon: "text-aa",
            category: "Typography Token",
            score: 85,
            cssVar: "var(--font-family-body)",
            description: "Font family for body text"
          });
        }
        return results;
      }
      /**
       * Query spacing tokens
       */
      querySpacing(context, query) {
        const results = [];
        const compiled = this.pds.compiled;
        if (!compiled?.tokens?.spacing)
          return results;
        const spacing = compiled.tokens.spacing;
        for (const [key, value] of Object.entries(spacing)) {
          if (["2", "4", "6", "8"].includes(key)) {
            results.push({
              text: `Spacing ${key}: var(--spacing-${key})`,
              value: `--spacing-${key}`,
              icon: "ruler",
              category: "Spacing Token",
              score: 75,
              cssVar: `var(--spacing-${key})`,
              description: `Spacing value: ${value}`
            });
          }
        }
        return results;
      }
      /**
       * Calculate match score between query and target text
       */
      scoreMatch(query, target) {
        const queryLower = query.toLowerCase();
        const targetLower = target.toLowerCase();
        let score = 0;
        if (queryLower === targetLower)
          return 100;
        if (targetLower.includes(queryLower))
          score += 80;
        const queryWords = this.tokenize(queryLower);
        const targetWords = this.tokenize(targetLower);
        const overlap = queryWords.filter((w) => targetWords.includes(w)).length;
        score += overlap / queryWords.length * 40;
        if (targetLower.startsWith(queryLower))
          score += 20;
        return Math.min(100, score);
      }
      /**
       * Generate example code for a primitive
       */
      generatePrimitiveExample(primitive) {
        const selector = primitive.selectors?.[0] || primitive.id;
        if (selector.includes("button") || primitive.id === "button") {
          return '<button class="btn-primary">Click me</button>';
        }
        if (selector.includes("card") || primitive.id === "card") {
          return '<article class="card">\n  <h3>Title</h3>\n  <p>Content</p>\n</article>';
        }
        if (selector.includes("badge") || primitive.id === "badge") {
          return '<span class="badge">New</span>';
        }
        return `<${selector}>Content</${selector}>`;
      }
      /**
       * Describe utility class purpose
       */
      describeUtility(utilClass) {
        if (utilClass.includes("border-gradient"))
          return "Apply animated gradient border effect";
        if (utilClass.includes("border-glow"))
          return "Apply glowing border effect";
        if (utilClass.includes("flex"))
          return "Flexbox container utility";
        if (utilClass.includes("grid"))
          return "Grid container utility";
        if (utilClass.includes("gap-"))
          return "Set gap between flex/grid children";
        if (utilClass.includes("items-"))
          return "Align items in flex container";
        if (utilClass.includes("justify-"))
          return "Justify content in flex container";
        if (utilClass === ".btn-group")
          return "Group buttons with connected styling";
        return "Utility class for styling";
      }
    };
  }
});

// src/js/common/common.js
var common_exports = {};
__export(common_exports, {
  deepMerge: () => deepMerge,
  fragmentFromTemplateLike: () => fragmentFromTemplateLike,
  isObject: () => isObject
});
function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}
function deepMerge(target, source) {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target))
          Object.assign(output, { [key]: source[key] });
        else
          output[key] = deepMerge(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}
function fragmentFromTemplateLike(templateLike) {
  const strings = Array.isArray(templateLike?.strings) ? templateLike.strings : [];
  const values = Array.isArray(templateLike?.values) ? templateLike.values : [];
  const consumedValues = /* @__PURE__ */ new Set();
  const htmlParts = [];
  const propBindingPattern = /(\s)(\.[\w-]+)=\s*$/;
  for (let i = 0; i < strings.length; i += 1) {
    let chunk = strings[i] ?? "";
    const match = chunk.match(propBindingPattern);
    if (match && i < values.length) {
      const propToken = match[2];
      const propName = propToken.slice(1);
      const marker = `pds-val-${i}`;
      chunk = chunk.replace(
        propBindingPattern,
        `$1data-pds-prop="${propName}:${marker}"`
      );
      consumedValues.add(i);
    }
    htmlParts.push(chunk);
    if (i < values.length && !consumedValues.has(i)) {
      htmlParts.push(`<!--pds-val-${i}-->`);
    }
  }
  const tpl = document.createElement("template");
  tpl.innerHTML = htmlParts.join("");
  const replaceValueAtMarker = (markerNode, value) => {
    const parent = markerNode.parentNode;
    if (!parent)
      return;
    if (value == null) {
      parent.removeChild(markerNode);
      return;
    }
    const insertValue = (val) => {
      if (val == null)
        return;
      if (val instanceof Node) {
        parent.insertBefore(val, markerNode);
        return;
      }
      if (Array.isArray(val)) {
        val.forEach((item) => insertValue(item));
        return;
      }
      parent.insertBefore(document.createTextNode(String(val)), markerNode);
    };
    insertValue(value);
    parent.removeChild(markerNode);
  };
  const walker = document.createTreeWalker(tpl.content, NodeFilter.SHOW_COMMENT);
  const markers = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node?.nodeValue?.startsWith("pds-val-")) {
      markers.push(node);
    }
  }
  markers.forEach((node) => {
    const index = Number(node.nodeValue.replace("pds-val-", ""));
    replaceValueAtMarker(node, values[index]);
  });
  const elements = tpl.content.querySelectorAll("*");
  elements.forEach((el) => {
    const propAttr = el.getAttribute("data-pds-prop");
    if (!propAttr)
      return;
    const [propName, markerValue] = propAttr.split(":");
    const index = Number(String(markerValue).replace("pds-val-", ""));
    if (propName && Number.isInteger(index)) {
      el[propName] = values[index];
    }
    el.removeAttribute("data-pds-prop");
  });
  return tpl.content;
}
var init_common = __esm({
  "src/js/common/common.js"() {
  }
});

// src/js/pds-core/pds-config.js
init_pds_enums();
var presets = {
  "ocean-breeze": {
    id: "ocean-breeze",
    name: "Ocean Breeze",
    tags: ["playful"],
    description: "Fresh and calming ocean-inspired palette with professional undertones",
    options: {
      liquidGlassEffects: true,
      backgroundMesh: 3
    },
    colors: {
      primary: "#0891b2",
      secondary: "#64748b",
      accent: "#06b6d4",
      background: "#f0f9ff",
      darkMode: {
        background: "#0c1821",
        secondary: "#94a3b8",
        primary: "#0891b2"
        // cyan-600 as base - generates darker 600 shade
      }
    },
    typography: {
      baseFontSize: 17,
      fontScale: 1.5,
      // More dramatic scale for breathing room
      fontFamilyHeadings: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      fontFamilyBody: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'
    },
    spatialRhythm: {
      baseUnit: 6,
      // More spacious
      scaleRatio: 1.2
    },
    shape: {
      radiusSize: enums.RadiusSizes.xxlarge
      // Soft, flowing
    }
  },
  "midnight-steel": {
    id: "midnight-steel",
    name: "Midnight Steel",
    description: "Bold industrial aesthetic with sharp contrasts and urban edge",
    colors: {
      primary: "#3b82f6",
      secondary: "#52525b",
      accent: "#f59e0b",
      background: "#fafaf9",
      darkMode: {
        background: "#18181b",
        secondary: "#71717a",
        primary: "#3b82f6"
        // blue-500 - optimized mid-tone
      }
    },
    typography: {
      baseFontSize: 16,
      fontScale: 1.333,
      fontFamilyHeadings: "'IBM Plex Sans', system-ui, -apple-system, sans-serif",
      fontFamilyBody: "'Inter', system-ui, -apple-system, sans-serif",
      fontWeightSemibold: 600
    },
    spatialRhythm: {
      baseUnit: 4,
      scaleRatio: 1.25
    },
    shape: {
      radiusSize: enums.RadiusSizes.small,
      // Crisp corporate edges
      borderWidth: enums.BorderWidths.thin
    }
  },
  "neural-glow": {
    id: "neural-glow",
    name: "Neural Glow",
    description: "AI-inspired with vibrant purple-blue gradients and futuristic vibes",
    colors: {
      primary: "#8b5cf6",
      secondary: "#6366f1",
      accent: "#ec4899",
      background: "#faf5ff",
      darkMode: {
        background: "#0f0a1a",
        secondary: "#818cf8",
        primary: "#8b5cf6"
        // violet-500 - optimized mid-tone
      }
    },
    typography: {
      baseFontSize: 16,
      fontScale: 1.618,
      // Golden ratio for futuristic feel
      fontFamilyHeadings: "'Space Grotesk', system-ui, sans-serif",
      fontFamilyBody: "'Space Grotesk', system-ui, sans-serif"
    },
    spatialRhythm: {
      baseUnit: 4,
      scaleRatio: 1.5
    },
    shape: {
      radiusSize: enums.RadiusSizes.xlarge,
      // Smooth, modern
      borderWidth: enums.BorderWidths.medium
    },
    behavior: {
      transitionSpeed: enums.TransitionSpeeds.fast
    }
  },
  "paper-and-ink": {
    id: "paper-and-ink",
    name: "Paper & Ink",
    tags: ["app", "featured"],
    description: "Ultra-minimal design with focus on typography and whitespace",
    colors: {
      primary: "#171717",
      secondary: "#737373",
      accent: "#525252",
      background: "#ffffff",
      darkMode: {
        background: "#0a0a0a",
        secondary: "#a3a3a3",
        primary: "#737373"
        // gray-500 - optimized mid-tone
      }
    },
    typography: {
      baseFontSize: 18,
      // Readable, print-like
      fontScale: 1.333,
      // Perfect fourth
      fontFamilyHeadings: "'Helvetica Neue', 'Arial', sans-serif",
      fontFamilyBody: "'Georgia', 'Times New Roman', serif",
      fontWeightNormal: 400,
      fontWeightBold: 700
    },
    spatialRhythm: {
      baseUnit: 4,
      // Tight, compact
      scaleRatio: 1.2
    },
    shape: {
      radiusSize: enums.RadiusSizes.none,
      // Sharp editorial
      borderWidth: enums.BorderWidths.thin
    }
  },
  "sunset-paradise": {
    id: "sunset-paradise",
    name: "Sunset Paradise",
    description: "Warm tropical colors evoking golden hour by the beach",
    options: {
      liquidGlassEffects: true,
      backgroundMesh: 2
    },
    colors: {
      primary: "#ea580c",
      // Darker orange for better light mode contrast
      secondary: "#d4a373",
      accent: "#fb923c",
      background: "#fffbeb",
      darkMode: {
        background: "#1a0f0a",
        secondary: "#c9a482",
        // Ensure sufficient contrast for primary-filled components with white text in dark mode
        primary: "#f97316"
        // orange-500 - optimized mid-tone
      }
    },
    typography: {
      baseFontSize: 16,
      fontScale: 1.5,
      fontFamilyHeadings: "'Quicksand', 'Comfortaa', sans-serif",
      fontFamilyBody: "'Quicksand', 'Comfortaa', sans-serif"
    },
    spatialRhythm: {
      baseUnit: 6,
      // Relaxed, vacation vibes
      scaleRatio: 1.5
    },
    shape: {
      radiusSize: enums.RadiusSizes.xxlarge,
      // Playful, rounded
      borderWidth: enums.BorderWidths.medium
    }
  },
  "retro-wave": {
    id: "retro-wave",
    name: "Retro Wave",
    description: "Nostalgic 80s-inspired palette with neon undertones",
    colors: {
      primary: "#c026d3",
      // Darker fuchsia for better light mode contrast
      secondary: "#a78bfa",
      accent: "#22d3ee",
      background: "#fef3ff",
      darkMode: {
        background: "#1a0a1f",
        secondary: "#c4b5fd",
        // Deepen primary for dark mode to meet AA contrast with white text
        primary: "#d946ef"
        // fuchsia-500 - optimized mid-tone
      }
    },
    typography: {
      baseFontSize: 15,
      fontScale: 1.5,
      fontFamilyHeadings: "'Orbitron', 'Impact', monospace",
      fontFamilyBody: "'Courier New', 'Courier', monospace",
      fontWeightBold: 700
    },
    spatialRhythm: {
      baseUnit: 4,
      scaleRatio: 1.25
    },
    shape: {
      radiusSize: enums.RadiusSizes.none,
      // Sharp geometric 80s
      borderWidth: enums.BorderWidths.thick
      // Bold borders
    },
    behavior: {
      transitionSpeed: enums.TransitionSpeeds.instant
      // Snappy retro feel
    }
  },
  "forest-canopy": {
    id: "forest-canopy",
    name: "Forest Canopy",
    description: "Natural earth tones with organic, calming green hues",
    colors: {
      primary: "#059669",
      secondary: "#78716c",
      accent: "#84cc16",
      background: "#f0fdf4",
      darkMode: {
        background: "#0a1410",
        secondary: "#a8a29e",
        primary: "#10b981"
        // emerald-500 - optimized mid-tone
      }
    },
    typography: {
      baseFontSize: 16,
      fontScale: 1.414,
      // Square root of 2, organic growth
      fontFamilyHeadings: "'Merriweather Sans', 'Arial', sans-serif",
      fontFamilyBody: "'Merriweather', 'Georgia', serif"
    },
    spatialRhythm: {
      baseUnit: 6,
      scaleRatio: 1.3
    },
    shape: {
      radiusSize: enums.RadiusSizes.medium,
      // Natural, organic curves
      borderWidth: enums.BorderWidths.thin
    }
  },
  "ruby-elegance": {
    id: "ruby-elegance",
    name: "Ruby Elegance",
    description: "Sophisticated palette with rich ruby reds and warm accents",
    colors: {
      primary: "#dc2626",
      secondary: "#9ca3af",
      accent: "#be123c",
      background: "#fef2f2",
      darkMode: {
        background: "#1b0808",
        secondary: "#d1d5db",
        primary: "#ef4444"
        // red-500 - optimized mid-tone
      }
    },
    typography: {
      baseFontSize: 17,
      fontScale: 1.5,
      fontFamilyHeadings: "'Playfair Display', 'Georgia', serif",
      fontFamilyBody: "'Crimson Text', 'Garamond', serif",
      fontWeightNormal: 400,
      fontWeightSemibold: 600
    },
    spatialRhythm: {
      baseUnit: 4,
      scaleRatio: 1.333
    },
    shape: {
      radiusSize: enums.RadiusSizes.small,
      // Subtle elegance
      borderWidth: enums.BorderWidths.thin
    }
  },
  "desert-dawn": {
    id: "desert-dawn",
    name: "Desert Dawn",
    description: "Sun-baked neutrals with grounded terracotta and cool oasis accents",
    colors: {
      primary: "#b45309",
      // terracotta
      secondary: "#a8a29e",
      // warm gray
      accent: "#0ea5a8",
      // oasis teal
      background: "#fcf6ef",
      darkMode: {
        background: "#12100e",
        secondary: "#d1d5db",
        // Deepen primary in dark to keep white text AA-compliant
        primary: "#f59e0b"
        // amber-500 - optimized mid-tone
      }
    },
    typography: {
      baseFontSize: 16,
      fontScale: 1.414,
      fontFamilyHeadings: "'Source Sans Pro', system-ui, -apple-system, sans-serif",
      fontFamilyBody: "'Source Serif Pro', Georgia, serif"
    },
    spatialRhythm: {
      baseUnit: 6,
      scaleRatio: 1.3
    },
    shape: {
      radiusSize: enums.RadiusSizes.medium,
      borderWidth: enums.BorderWidths.medium
    }
  },
  "contrast-pro": {
    id: "contrast-pro",
    name: "Contrast Pro",
    description: "Accessibility-first, high-contrast UI with assertive clarity",
    colors: {
      primary: "#1f2937",
      // slate-800
      secondary: "#111827",
      // gray-900
      accent: "#eab308",
      // amber-500
      background: "#ffffff",
      darkMode: {
        background: "#0b0f14",
        secondary: "#9ca3af",
        // Use a lighter primary in dark mode to ensure outline/link text
        // has strong contrast against the very-dark surface. The generator
        // will still pick appropriate darker fill shades for buttons so
        // white-on-fill contrast is preserved.
        primary: "#9ca3af"
        // gray-400 - optimized mid-tone
      }
    },
    typography: {
      baseFontSize: 17,
      fontScale: 1.2,
      fontFamilyHeadings: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
      fontFamilyBody: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
      fontWeightBold: 700
    },
    spatialRhythm: {
      baseUnit: 3,
      // compact, data-dense
      scaleRatio: 1.2
    },
    shape: {
      radiusSize: enums.RadiusSizes.small,
      borderWidth: enums.BorderWidths.thick
    },
    behavior: {
      transitionSpeed: enums.TransitionSpeeds.fast,
      focusRingWidth: 4
    }
  },
  "pastel-play": {
    id: "pastel-play",
    name: "Pastel Play",
    description: "Playful pastels with soft surfaces and friendly rounded shapes",
    colors: {
      primary: "#db2777",
      // raspberry
      secondary: "#a78bfa",
      // lavender
      accent: "#34d399",
      // mint
      background: "#fff7fa",
      darkMode: {
        background: "#1a1016",
        secondary: "#c4b5fd",
        primary: "#ec4899"
        // pink-500 - optimized mid-tone
      }
    },
    typography: {
      baseFontSize: 16,
      fontScale: 1.333,
      fontFamilyHeadings: "'Nunito', system-ui, -apple-system, sans-serif",
      fontFamilyBody: "'Nunito', system-ui, -apple-system, sans-serif",
      lineHeightRelaxed: enums.LineHeights.relaxed
    },
    spatialRhythm: {
      baseUnit: 6,
      // comfy
      scaleRatio: 1.4
    },
    shape: {
      radiusSize: enums.RadiusSizes.xxlarge,
      borderWidth: enums.BorderWidths.thin
    },
    behavior: {
      transitionSpeed: enums.TransitionSpeeds.slow,
      animationEasing: enums.AnimationEasings["ease-out"]
    }
  },
  "brutalist-tech": {
    id: "brutalist-tech",
    name: "Brutalist Tech",
    description: "Stark grayscale with engineered accents and unapologetically bold structure",
    colors: {
      primary: "#111111",
      secondary: "#4b5563",
      accent: "#06b6d4",
      // cyan signal
      background: "#f8fafc",
      darkMode: {
        background: "#0b0b0b",
        secondary: "#9ca3af",
        // Set a chromatic primary in dark mode to ensure both:
        // - outline/link contrast on dark surface, and
        // - sufficient button fill contrast against white text.
        // Cyan signal aligns with preset accent and produces high-contrast dark fills.
        primary: "#06b6d4"
        // cyan-500 - optimized mid-tone
      }
    },
    typography: {
      baseFontSize: 15,
      fontScale: 1.25,
      fontFamilyHeadings: "'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace",
      fontFamilyBody: "'Inter', system-ui, -apple-system, sans-serif",
      letterSpacingTight: -0.02
    },
    spatialRhythm: {
      baseUnit: 4,
      scaleRatio: 1.25
    },
    shape: {
      radiusSize: enums.RadiusSizes.none,
      borderWidth: enums.BorderWidths.thick
    },
    behavior: {
      transitionSpeed: enums.TransitionSpeeds.instant
    }
  },
  "zen-garden": {
    id: "zen-garden",
    name: "Zen Garden",
    description: "Soft botanicals with contemplative spacing and balanced motion",
    colors: {
      primary: "#3f6212",
      // deep olive
      secondary: "#6b7280",
      // neutral leaf shadow
      accent: "#7c3aed",
      // iris bloom
      background: "#f7fbef",
      darkMode: {
        background: "#0d130a",
        secondary: "#a3a3a3",
        primary: "#84cc16"
        // lime-500 - optimized mid-tone
      }
    },
    typography: {
      baseFontSize: 17,
      fontScale: 1.414,
      fontFamilyHeadings: "'Merriweather', Georgia, serif",
      fontFamilyBody: "'Noto Sans', system-ui, -apple-system, sans-serif"
    },
    spatialRhythm: {
      baseUnit: 6,
      // airy
      scaleRatio: 1.35
    },
    shape: {
      radiusSize: enums.RadiusSizes.large,
      borderWidth: enums.BorderWidths.medium
    },
    behavior: {
      transitionSpeed: enums.TransitionSpeeds.normal,
      animationEasing: enums.AnimationEasings.ease
    }
  },
  "fitness-pro": {
    id: "fitness-pro",
    name: "Fitness Pro",
    tags: ["app", "featured"],
    description: "Health and fitness tracking aesthetic with data-driven dark surfaces and vibrant accent rings",
    options: {
      liquidGlassEffects: true,
      backgroundMesh: 2
    },
    colors: {
      primary: "#e91e63",
      // vibrant pink-magenta for data highlights
      secondary: "#78909c",
      // cool gray for secondary data
      accent: "#ab47bc",
      // purple accent for premium features
      background: "#fafafa",
      darkMode: {
        background: "#1a1d21",
        // deep charcoal like WHOOP
        secondary: "#78909c",
        primary: "#0a4ca4"
      }
    },
    typography: {
      baseFontSize: 15,
      fontScale: 1.25,
      fontFamilyHeadings: "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
      fontFamilyBody: "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
      fontWeightNormal: 400,
      fontWeightMedium: 500,
      fontWeightSemibold: 600,
      fontWeightBold: 700,
      lineHeightNormal: enums.LineHeights.tight
    },
    spatialRhythm: {
      baseUnit: 4,
      scaleRatio: 1.25,
      containerPadding: 1.25,
      sectionSpacing: 2.5
    },
    shape: {
      radiusSize: enums.RadiusSizes.large,
      // smooth cards and buttons
      borderWidth: enums.BorderWidths.thin
    },
    layers: {
      shadowDepth: "medium",
      blurMedium: 12
    },
    behavior: {
      transitionSpeed: enums.TransitionSpeeds.fast,
      animationEasing: enums.AnimationEasings["ease-out"],
      focusRingWidth: 2
    }
  },
  "travel-market": {
    id: "travel-market",
    name: "Travel Market",
    description: "Hospitality marketplace design with clean cards, subtle shadows, and trust-building neutrals",
    options: {
      liquidGlassEffects: true,
      backgroundMesh: 3
    },
    colors: {
      primary: "#d93251",
      // Darker coral red for better contrast (was #ff385c)
      secondary: "#717171",
      // neutral gray for text
      accent: "#144990",
      // teal for experiences/verified
      background: "#ffffff",
      darkMode: {
        background: "#222222",
        secondary: "#b0b0b0",
        primary: "#ff5a7a"
        // Lighter for dark mode
      }
    },
    typography: {
      baseFontSize: 16,
      fontScale: 1.2,
      fontFamilyHeadings: "'Circular', system-ui, -apple-system, 'Segoe UI', sans-serif",
      fontFamilyBody: "'Circular', system-ui, -apple-system, 'Segoe UI', sans-serif",
      fontWeightNormal: 400,
      fontWeightMedium: 500,
      fontWeightSemibold: 600,
      fontWeightBold: 700,
      lineHeightRelaxed: enums.LineHeights.relaxed
    },
    spatialRhythm: {
      baseUnit: 4,
      scaleRatio: 1.25,
      containerMaxWidth: 1440,
      containerPadding: 1.5,
      sectionSpacing: 3
    },
    shape: {
      radiusSize: enums.RadiusSizes.medium,
      borderWidth: enums.BorderWidths.thin
    },
    layers: {
      shadowDepth: "light",
      blurLight: 8
    },
    behavior: {
      transitionSpeed: enums.TransitionSpeeds.normal,
      animationEasing: enums.AnimationEasings["ease-in-out"],
      hoverOpacity: 0.9
    }
  },
  "mobility-app": {
    id: "mobility-app",
    name: "Mobility App",
    tags: ["app", "featured"],
    description: "On-demand service platform with bold typography, map-ready colors, and action-driven UI",
    options: {
      liquidGlassEffects: true,
      backgroundMesh: 0
    },
    colors: {
      primary: "#000000",
      // Uber-inspired black for trust and sophistication
      secondary: "#545454",
      // mid-gray for secondary elements
      accent: "#06c167",
      // green for success/confirmation
      background: "#f6f6f6",
      darkMode: {
        background: "#0f0f0f",
        secondary: "#8a8a8a",
        primary: "#06c167"
        // Use bright green for dark mode buttons (was white)
      }
    },
    typography: {
      baseFontSize: 16,
      fontScale: 1.3,
      fontFamilyHeadings: "'UberMove', system-ui, -apple-system, 'Segoe UI', sans-serif",
      fontFamilyBody: "'UberMove', system-ui, -apple-system, 'Segoe UI', sans-serif",
      fontWeightNormal: 400,
      fontWeightMedium: 500,
      fontWeightSemibold: 600,
      fontWeightBold: 700
    },
    spatialRhythm: {
      baseUnit: 4,
      scaleRatio: 1.25,
      buttonPadding: 1.25,
      inputPadding: 1
    },
    shape: {
      radiusSize: enums.RadiusSizes.small,
      // subtle, professional
      borderWidth: enums.BorderWidths.medium
    },
    behavior: {
      transitionSpeed: enums.TransitionSpeeds.fast,
      animationEasing: enums.AnimationEasings["ease-out"],
      focusRingWidth: 3
    },
    a11y: {
      minTouchTarget: enums.TouchTargetSizes.comfortable,
      focusStyle: enums.FocusStyles.ring
    }
  },
  "fintech-secure": {
    id: "fintech-secure",
    name: "Fintech Secure",
    description: "Financial services app UI with trust-building blues, precise spacing, and security-first design",
    options: {
      liquidGlassEffects: false,
      backgroundMesh: 0
    },
    colors: {
      primary: "#0a2540",
      // deep navy for trust and security
      secondary: "#425466",
      // slate for secondary content
      accent: "#00d4ff",
      // bright cyan for CTAs
      background: "#f7fafc",
      darkMode: {
        background: "#0a1929",
        secondary: "#8796a5",
        primary: "#00d4ff"
      }
    },
    typography: {
      baseFontSize: 16,
      fontScale: 1.25,
      fontFamilyHeadings: "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
      fontFamilyBody: "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
      fontFamilyMono: "'JetBrains Mono', ui-monospace, 'Cascadia Code', monospace",
      fontWeightNormal: 400,
      fontWeightMedium: 500,
      fontWeightSemibold: 600,
      fontWeightBold: 700
    },
    spatialRhythm: {
      baseUnit: 4,
      scaleRatio: 1.25,
      containerMaxWidth: 1280,
      sectionSpacing: 2.5
    },
    shape: {
      radiusSize: enums.RadiusSizes.medium,
      borderWidth: enums.BorderWidths.thin
    },
    layers: {
      shadowDepth: "light",
      blurLight: 6
    },
    behavior: {
      transitionSpeed: enums.TransitionSpeeds.fast,
      animationEasing: enums.AnimationEasings["ease-in-out"],
      focusRingWidth: 3,
      focusRingOpacity: 0.4
    },
    a11y: {
      minTouchTarget: enums.TouchTargetSizes.standard,
      focusStyle: enums.FocusStyles.ring
    }
  },
  "social-feed": {
    id: "social-feed",
    name: "Social Feed",
    tags: ["app", "featured"],
    description: "Content-first social platform with minimal chrome, bold actions, and vibrant media presentation",
    options: {
      liquidGlassEffects: true,
      backgroundMesh: 4
    },
    colors: {
      primary: "#1877f2",
      // social blue for links and primary actions
      secondary: "#65676b",
      // neutral gray for secondary text
      accent: "#fe2c55",
      // vibrant pink-red for likes/hearts
      background: "#ffffff",
      darkMode: {
        background: "#18191a",
        secondary: "#b0b3b8",
        primary: "#2d88ff"
      }
    },
    typography: {
      baseFontSize: 15,
      fontScale: 1.2,
      fontFamilyHeadings: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
      fontFamilyBody: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
      fontWeightNormal: 400,
      fontWeightMedium: 500,
      fontWeightSemibold: 600,
      fontWeightBold: 700,
      lineHeightNormal: enums.LineHeights.relaxed
    },
    spatialRhythm: {
      baseUnit: 4,
      scaleRatio: 1.25,
      containerMaxWidth: 680,
      sectionSpacing: 1.5
    },
    shape: {
      radiusSize: enums.RadiusSizes.medium,
      borderWidth: enums.BorderWidths.thin
    },
    behavior: {
      transitionSpeed: enums.TransitionSpeeds.fast,
      animationEasing: enums.AnimationEasings["ease-out"],
      hoverOpacity: 0.85
    }
  },
  "enterprise-dash": {
    id: "enterprise-dash",
    tags: ["app", "featured"],
    name: "Enterprise Dashboard",
    description: "Data-dense business intelligence app interface with organized hierarchy and professional polish",
    options: {
      liquidGlassEffects: false
    },
    colors: {
      primary: "#0066cc",
      // corporate blue for primary actions
      secondary: "#5f6368",
      // neutral gray for text and chrome
      accent: "#1a73e8",
      // bright blue for highlights
      background: "#ffffff",
      success: "#34a853",
      warning: "#fbbc04",
      danger: "#ea4335",
      darkMode: {
        background: "#202124",
        secondary: "#9aa0a6",
        primary: "#8ab4f8"
      }
    },
    typography: {
      baseFontSize: 14,
      fontScale: 1.2,
      fontFamilyHeadings: "'Roboto', system-ui, -apple-system, 'Segoe UI', sans-serif",
      fontFamilyBody: "'Roboto', system-ui, -apple-system, 'Segoe UI', sans-serif",
      fontFamilyMono: "'Roboto Mono', ui-monospace, Consolas, monospace",
      fontWeightNormal: 400,
      fontWeightMedium: 500,
      fontWeightSemibold: 600,
      fontWeightBold: 700,
      lineHeightNormal: enums.LineHeights.tight
    },
    spatialRhythm: {
      baseUnit: 4,
      scaleRatio: 1.2,
      containerMaxWidth: 1600,
      containerPadding: 1.5,
      sectionSpacing: 2
    },
    shape: {
      radiusSize: enums.RadiusSizes.small,
      borderWidth: enums.BorderWidths.thin
    },
    layers: {
      shadowDepth: "light",
      blurLight: 4
    },
    behavior: {
      transitionSpeed: enums.TransitionSpeeds.fast,
      animationEasing: enums.AnimationEasings["ease-in-out"],
      focusRingWidth: 2
    },
    layout: {
      densityCompact: 0.85,
      gridColumns: 12
    }
  }
};
presets.default = {
  id: "default",
  name: "Default",
  tags: ["app", "featured"],
  description: "Fresh and modern design system with balanced aesthetics and usability",
  options: {
    liquidGlassEffects: true,
    backgroundMesh: 4
  },
  form: {
    options: {
      widgets: {
        booleans: "toggle",
        // 'toggle' | 'toggle-with-icons' | 'checkbox'
        numbers: "input",
        // 'input' | 'range'
        selects: "standard"
        // 'standard' | 'dropdown'
      },
      layouts: {
        fieldsets: "default",
        // 'default' | 'flex' | 'grid' | 'accordion' | 'tabs' | 'card'
        arrays: "default"
        // 'default' | 'compact'
      },
      enhancements: {
        icons: true,
        // Enable icon-enhanced inputs
        datalists: true,
        // Enable datalist autocomplete
        rangeOutput: true
        // Use .range-output for ranges
      },
      validation: {
        showErrors: true,
        // Show validation errors inline
        validateOnChange: false
        // Validate on every change vs on submit
      }
    }
  },
  colors: {
    // Palette - base colors that generate entire color palettes
    primary: "#0e7490",
    // Darker cyan for better contrast
    secondary: "#a99b95",
    // REQUIRED: Secondary/neutral color for gray scale generation
    accent: "#e54271",
    // Accent color (pink red)
    background: "#e7e6de",
    // Base background color for light mode
    // Dark mode overrides - specify custom dark theme colors
    darkMode: {
      background: "#16171a",
      // Custom dark mode background (cool blue-gray)
      secondary: "#8b9199",
      // Optional: custom dark grays (uses light secondary if omitted)
      primary: "#06b6d4"
      // cyan-500 - optimized mid-tone
      // accent: null,       // Optional: override accent color for dark mode
    },
    // Semantic colors (auto-generated from primary if not specified)
    success: null,
    // Auto-generated green from primary if null
    warning: "#B38600",
    // Warning color (defaults to accent if null)
    danger: null,
    // Auto-generated red from primary if null
    info: null,
    // Defaults to primary color if null
    // Advanced color options
    gradientStops: 3,
    elevationOpacity: 0.05
  },
  typography: {
    // Essential typography settings (exposed in simple form)
    baseFontSize: 16,
    fontScale: 1.2,
    // Multiplier for heading size generation (1.2 = minor third)
    fontFamilyHeadings: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    fontFamilyBody: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    fontFamilyMono: 'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace',
    // Advanced typography options (exposed in advanced form)
    fontWeightLight: enums.FontWeights.light,
    fontWeightNormal: enums.FontWeights.normal,
    fontWeightMedium: enums.FontWeights.medium,
    fontWeightSemibold: enums.FontWeights.semibold,
    fontWeightBold: enums.FontWeights.bold,
    lineHeightTight: enums.LineHeights.tight,
    lineHeightNormal: enums.LineHeights.normal,
    lineHeightRelaxed: enums.LineHeights.relaxed,
    letterSpacingTight: -0.025,
    letterSpacingNormal: 0,
    letterSpacingWide: 0.025
  },
  spatialRhythm: {
    // Essential spacing setting (exposed in simple form)
    baseUnit: 4,
    // Base spacing unit in pixels (typically 16 = 1rem)
    // Advanced spacing options
    scaleRatio: 1.25,
    maxSpacingSteps: 32,
    containerMaxWidth: 1200,
    containerPadding: 1,
    inputPadding: 0.75,
    buttonPadding: 1,
    sectionSpacing: 2
  },
  layers: {
    shadowDepth: "medium",
    blurLight: 4,
    blurMedium: 8,
    blurHeavy: 16,
    zIndexBase: 0,
    zIndexDropdown: 1e3,
    zIndexSticky: 1020,
    zIndexFixed: 1030,
    zIndexModal: 1040,
    zIndexPopover: 1050,
    zIndexTooltip: 1060,
    zIndexNotification: 1070
  },
  shape: {
    radiusSize: enums.RadiusSizes.large,
    borderWidth: enums.BorderWidths.medium,
    customRadius: null
  },
  behavior: {
    transitionSpeed: enums.TransitionSpeeds.normal,
    animationEasing: enums.AnimationEasings["ease-out"],
    customTransitionSpeed: null,
    customEasing: null,
    focusRingWidth: 3,
    focusRingOpacity: 0.3,
    hoverOpacity: 0.8
  },
  layout: {
    gridColumns: 12,
    gridGutter: 1,
    breakpoints: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280
    },
    densityCompact: 0.8,
    densityNormal: 1,
    densityComfortable: 1.2,
    buttonMinHeight: enums.TouchTargetSizes.standard,
    inputMinHeight: 40,
    // Layout utility system
    utilities: {
      grid: true,
      flex: true,
      spacing: true,
      container: true
    },
    gridSystem: {
      columns: [1, 2, 3, 4, 6],
      autoFitBreakpoints: {
        sm: "150px",
        md: "250px",
        lg: "350px",
        xl: "450px"
      },
      enableGapUtilities: true
    },
    containerMaxWidth: "1400px",
    containerPadding: "var(--spacing-6)"
  },
  advanced: {
    linkStyle: enums.LinkStyles.inline,
    colorDerivation: "hsl"
  },
  a11y: {
    minTouchTarget: enums.TouchTargetSizes.standard,
    prefersReducedMotion: true,
    focusStyle: enums.FocusStyles.ring
  },
  icons: {
    set: "phosphor",
    // https://phosphoricons.com/
    weight: "regular",
    defaultSize: 24,
    externalPath: "/assets/img/icons/",
    // Path for on-demand external SVG icons
    sizes: enums.IconSizes,
    include: {
      navigation: [
        "arrow-left",
        "arrow-right",
        "arrow-up",
        "arrow-down",
        "arrow-counter-clockwise",
        "caret-left",
        "caret-right",
        "caret-down",
        "caret-up",
        "x",
        "list",
        "list-dashes",
        "dots-three-vertical",
        "dots-three",
        "house",
        "gear",
        "magnifying-glass",
        "funnel",
        "tabs",
        "sidebar"
      ],
      actions: [
        "plus",
        "minus",
        "check",
        "trash",
        "pencil",
        "floppy-disk",
        "copy",
        "download",
        "upload",
        "share",
        "link",
        "eye",
        "eye-slash",
        "heart",
        "star",
        "bookmark",
        "note-pencil",
        "cursor-click",
        "clipboard",
        "magic-wand",
        "sparkle"
      ],
      communication: [
        "envelope",
        "bell",
        "bell-ringing",
        "bell-simple",
        "chat-circle",
        "phone",
        "paper-plane-tilt",
        "user",
        "users",
        "user-gear",
        "at"
      ],
      content: [
        "image",
        "file",
        "file-text",
        "file-css",
        "file-js",
        "folder",
        "folder-open",
        "book-open",
        "camera",
        "video-camera",
        "play",
        "pause",
        "microphone",
        "brackets-curly",
        "code",
        "folder-simple",
        "grid-four",
        "briefcase",
        "chart-line",
        "chart-bar",
        "database",
        "map-pin"
      ],
      status: [
        "info",
        "warning",
        "check-circle",
        "x-circle",
        "question",
        "shield",
        "shield-check",
        "shield-warning",
        "lock",
        "lock-open",
        "fingerprint",
        "circle-notch"
      ],
      time: ["calendar", "clock", "timer", "hourglass"],
      commerce: [
        "shopping-cart",
        "credit-card",
        "currency-dollar",
        "tag",
        "receipt",
        "storefront"
      ],
      formatting: [
        "text-align-left",
        "text-align-center",
        "text-align-right",
        "text-b",
        "text-italic",
        "text-underline",
        "list-bullets",
        "list-numbers",
        "text-aa"
      ],
      system: [
        "cloud",
        "cloud-arrow-up",
        "cloud-arrow-down",
        "desktop",
        "device-mobile",
        "globe",
        "wifi-high",
        "battery-charging",
        "sun",
        "moon",
        "moon-stars",
        "palette",
        "rocket",
        "feather",
        "square",
        "circle",
        "squares-four",
        "lightning",
        "wrench"
      ]
    },
    // Default sprite path for internal/dev use. For consumer apps, icons are exported to
    // [config.static.root]/icons/pds-icons.svg and components should consume from there.
    spritePath: "public/assets/pds/icons/pds-icons.svg"
  },
  gap: 4,
  debug: false
};
function defaultLog(level = "log", message, ...data) {
  const debug = this?.debug || this?.design?.debug || false;
  if (debug || level === "error" || level === "warn") {
    const method = console[level] || console.log;
    if (data.length > 0) {
      method(message, ...data);
    } else {
      method(message);
    }
  }
}

// src/js/pds-core/pds-generator.js
init_pds_enums();
init_pds_ontology();
var Generator = class _Generator {
  // Singleton instance
  static #instance;
  static get instance() {
    return this.#instance;
  }
  // Private internal fields
  #layers;
  #stylesheets;
  //#blobURLs;
  constructor(options = {}) {
    this.options = {
      // All defaults should come from config, no hardcoded values
      debug: false,
      ...options
    };
    if (!this.options.design) {
      this.options.design = {};
    }
    if (this.options.debug) {
      this.options.log?.("debug", "Generator options:", this.options);
    }
    _Generator.#instance = this;
    this.tokens = this.generateTokens();
    if (this.options.debug) {
      this.options.log?.("debug", "Generated tokens:", this.tokens);
    }
    this.#generateLayers();
    if (typeof CSSStyleSheet !== "undefined") {
      this.#createConstructableStylesheets();
    } else {
      if (this.options.debug) {
        this.options.log?.(
          "debug",
          "[Generator] Skipping browser features (CSSStyleSheet not available)"
        );
      }
    }
  }
  generateTokens() {
    const config = this.options.design || {};
    return {
      colors: this.#generateColorTokens(config.colors || {}),
      spacing: this.generateSpacingTokens(config.spatialRhythm || {}),
      radius: this.#generateRadiusTokens(config.shape || {}),
      borderWidths: this.#generateBorderWidthTokens(config.shape || {}),
      typography: this.generateTypographyTokens(config.typography || {}),
      shadows: this.#generateShadowTokens(config.layers || {}),
      layout: this.#generateLayoutTokens(config.layout || {}),
      transitions: this.#generateTransitionTokens(config.behavior || {}),
      zIndex: this.#generateZIndexTokens(config.layers || {}),
      icons: this.#generateIconTokens(config.icons || {})
    };
  }
  #generateColorTokens(colorConfig) {
    const {
      primary = "#3b82f6",
      secondary = "#64748b",
      // REQUIRED for gray scale generation
      accent = "#ec4899",
      background = "#ffffff",
      success = null,
      warning = "#FFBF00",
      danger = null,
      info = null,
      darkMode = {}
      // Extract dark mode overrides
    } = colorConfig;
    const colors = {
      // Generate color scales
      primary: this.#generateColorScale(primary),
      secondary: this.#generateColorScale(secondary),
      accent: this.#generateColorScale(accent),
      // Semantic colors - use provided or derive from primary/accent
      success: this.#generateColorScale(
        success || this.#deriveSuccessColor(primary)
      ),
      warning: this.#generateColorScale(warning || accent),
      danger: this.#generateColorScale(
        danger || this.#deriveDangerColor(primary)
      ),
      info: this.#generateColorScale(info || primary),
      // Neutral grays derived from secondary color
      gray: this.#generateGrayScale(secondary),
      // Background-based surface colors for tasteful variations
      surface: this.#generateBackgroundShades(background)
    };
    colors.surface.fieldset = this.#generateFieldsetAdaptiveColors(
      colors.surface
    );
    colors.surfaceSmart = this.#generateSmartSurfaceTokens(colors.surface);
    colors.dark = this.#generateDarkModeColors(
      colors,
      background,
      darkMode
      // Pass the darkMode object directly
    );
    if (colors.dark && colors.dark.surface) {
      colors.dark.surfaceSmart = this.#generateSmartSurfaceTokens(
        colors.dark.surface
      );
    }
    colors.interactive = {
      light: {
        fill: this.#pickFillShadeForWhite(colors.primary, 4.5),
        // For button fills with white text
        text: colors.primary[600]
        // For links/outlines on light backgrounds
      },
      dark: {
        fill: this.#pickFillShadeForWhite(colors.dark.primary, 4.5),
        // For button fills with white text
        text: this.#pickReadablePrimaryOnSurface(
          colors.dark.primary,
          colors.dark.surface.base,
          4.5
        )
        // For links/outlines on dark backgrounds
      }
    };
    return colors;
  }
  #generateColorScale(baseColor) {
    const hsl = this.#hexToHsl(baseColor);
    return {
      50: this.#hslToHex(
        hsl.h,
        Math.max(hsl.s - 10, 10),
        Math.min(hsl.l + 45, 95)
      ),
      100: this.#hslToHex(
        hsl.h,
        Math.max(hsl.s - 5, 15),
        Math.min(hsl.l + 35, 90)
      ),
      200: this.#hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 25, 85)),
      300: this.#hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 15, 75)),
      400: this.#hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 5, 65)),
      500: baseColor,
      // Base color
      600: this.#hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 10, 25)),
      700: this.#hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 20, 20)),
      800: this.#hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 30, 15)),
      900: this.#hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 40, 10))
    };
  }
  #deriveSuccessColor(mainColor) {
    const hsl = this.#hexToHsl(mainColor);
    return this.#hslToHex(120, Math.max(hsl.s, 60), 45);
  }
  #deriveDangerColor(mainColor) {
    const hsl = this.#hexToHsl(mainColor);
    return this.#hslToHex(0, Math.max(hsl.s, 70), 50);
  }
  #generateGrayScale(supportingColor) {
    const hsl = this.#hexToHsl(supportingColor);
    const baseHue = hsl.h;
    const baseSat = Math.min(hsl.s, 10);
    return {
      50: this.#hslToHex(baseHue, baseSat, 98),
      100: this.#hslToHex(baseHue, baseSat, 95),
      200: this.#hslToHex(baseHue, baseSat, 88),
      300: this.#hslToHex(baseHue, baseSat, 78),
      400: this.#hslToHex(baseHue, baseSat, 60),
      500: supportingColor,
      // Use the actual supporting color
      600: this.#hslToHex(baseHue, Math.min(baseSat + 5, 15), 45),
      700: this.#hslToHex(baseHue, Math.min(baseSat + 8, 18), 35),
      800: this.#hslToHex(baseHue, Math.min(baseSat + 10, 20), 20),
      900: this.#hslToHex(baseHue, Math.min(baseSat + 12, 22), 10)
    };
  }
  #generateBackgroundShades(backgroundBase) {
    const hsl = this.#hexToHsl(backgroundBase);
    return {
      base: backgroundBase,
      subtle: this.#hslToHex(hsl.h, Math.max(hsl.s, 2), Math.max(hsl.l - 2, 2)),
      // Very subtle darker
      elevated: this.#hslToHex(
        hsl.h,
        Math.max(hsl.s, 3),
        Math.max(hsl.l - 4, 5)
      ),
      // Slightly darker for elevated surfaces
      sunken: this.#hslToHex(hsl.h, Math.max(hsl.s, 4), Math.max(hsl.l - 6, 8)),
      // For input fields, subtle depth
      overlay: this.#hslToHex(
        hsl.h,
        Math.max(hsl.s, 2),
        Math.min(hsl.l + 2, 98)
      ),
      // Slightly lighter for overlays
      inverse: this.#generateSmartDarkBackground(backgroundBase),
      // Smart dark background
      hover: `color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%);`
    };
  }
  #generateFieldsetAdaptiveColors(backgroundShades) {
    return {
      base: backgroundShades.subtle,
      // Subtle darker than base
      subtle: backgroundShades.elevated,
      // Elevated from subtle
      elevated: backgroundShades.sunken,
      // Sunken from elevated (creates contrast)
      sunken: this.#darkenColor(backgroundShades.sunken, 0.05),
      // Slightly darker than sunken
      overlay: backgroundShades.elevated
      // Elevated from overlay
    };
  }
  #darkenColor(hexColor, factor = 0.05) {
    const hsl = this.#hexToHsl(hexColor);
    const darkerLightness = Math.max(hsl.l - hsl.l * factor, 5);
    return this.#hslToHex(hsl.h, hsl.s, darkerLightness);
  }
  #generateSmartDarkBackground(lightBackground) {
    const hsl = this.#hexToHsl(lightBackground);
    if (hsl.l > 50) {
      const darkSaturation = Math.min(hsl.s + 5, 25);
      const darkLightness = Math.max(12 - (hsl.l - 50) * 0.1, 8);
      return this.#hslToHex(hsl.h, darkSaturation, darkLightness);
    } else {
      const lightSaturation = Math.max(hsl.s - 10, 5);
      const lightLightness = Math.min(85 + (50 - hsl.l) * 0.3, 95);
      return this.#hslToHex(hsl.h, lightSaturation, lightLightness);
    }
  }
  #generateDarkModeColors(lightColors, backgroundBase = "#ffffff", overrides = {}) {
    const darkBackgroundBase = overrides.background ? overrides.background : this.#generateSmartDarkBackground(backgroundBase);
    const darkSurface = this.#generateBackgroundShades(darkBackgroundBase);
    const derivedPrimaryScale = overrides.primary ? this.#generateColorScale(overrides.primary) : this.#adjustColorsForDarkMode(lightColors.primary);
    return {
      surface: {
        ...darkSurface,
        fieldset: this.#generateDarkModeFieldsetColors(darkSurface)
      },
      // For primary colors, use override, or adjust light colors for dark mode (dimmed for accessibility)
      primary: derivedPrimaryScale,
      // Adjust other colors for dark mode, with optional overrides
      secondary: overrides.secondary ? this.#generateColorScale(overrides.secondary) : this.#adjustColorsForDarkMode(lightColors.secondary),
      accent: overrides.accent ? this.#generateColorScale(overrides.accent) : this.#adjustColorsForDarkMode(lightColors.accent),
      // Regenerate grays if secondary override is provided (grays are derived from secondary)
      gray: overrides.secondary ? this.#generateGrayScale(overrides.secondary) : lightColors.gray,
      // Adjust semantic colors for dark mode
      success: this.#adjustColorsForDarkMode(lightColors.success),
      info: this.#adjustColorsForDarkMode(lightColors.info),
      warning: this.#adjustColorsForDarkMode(lightColors.warning),
      danger: this.#adjustColorsForDarkMode(lightColors.danger)
    };
  }
  // -------------------------
  // Color contrast helpers
  // -------------------------
  #hexToRgb(hex) {
    const h = String(hex || "").replace("#", "");
    const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
    const num = parseInt(full, 16);
    return { r: num >> 16 & 255, g: num >> 8 & 255, b: num & 255 };
  }
  #luminance(hex) {
    const { r, g, b } = this.#hexToRgb(hex);
    const srgb = [r / 255, g / 255, b / 255].map(
      (v) => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    );
    return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
  }
  #contrastRatio(aHex, bHex) {
    const L1 = this.#luminance(aHex);
    const L2 = this.#luminance(bHex);
    const lighter = Math.max(L1, L2);
    const darker = Math.min(L1, L2);
    return (lighter + 0.05) / (darker + 0.05);
  }
  // Choose a readable 'on' color for a background: prefer white or black if they meet contrast target
  #findReadableOnColor(bgHex, target = 4.5) {
    if (!bgHex)
      return "#000000";
    const white = "#ffffff";
    const black = "#000000";
    const cw = this.#contrastRatio(bgHex, white);
    if (cw >= target)
      return white;
    const cb = this.#contrastRatio(bgHex, black);
    if (cb >= target)
      return black;
    return cb > cw ? black : white;
  }
  // Convert hex color to rgba string
  #rgbaFromHex(hex, alpha = 1) {
    const { r, g, b } = this.#hexToRgb(hex);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  // Mix color toward target by a given factor (0 = original, 1 = target)
  #mixTowards(sourceHex, targetHex, factor = 0.5) {
    const src = this.#hexToRgb(sourceHex);
    const tgt = this.#hexToRgb(targetHex);
    const r = Math.round(src.r + (tgt.r - src.r) * factor);
    const g = Math.round(src.g + (tgt.g - src.g) * factor);
    const b = Math.round(src.b + (tgt.b - src.b) * factor);
    return this.#rgbToHex(r, g, b);
  }
  // Convert RGB to hex
  #rgbToHex(r, g, b) {
    const toHex = (n) => {
      const hex = Math.max(0, Math.min(255, Math.round(n))).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }
  #generateDarkModeFieldsetColors(darkSurface) {
    return {
      base: darkSurface.elevated,
      // Elevated from dark base
      subtle: darkSurface.overlay,
      // Overlay from dark subtle
      elevated: this.#lightenColor(darkSurface.elevated, 0.08),
      // Slightly lighter than elevated
      sunken: darkSurface.elevated,
      // Elevated from sunken
      overlay: this.#lightenColor(darkSurface.overlay, 0.05)
      // Slightly lighter than overlay
    };
  }
  /**
   * Pick a readable primary shade on a given surface background, targeting AA contrast.
   * Returns the first shade that meets target from a preferred order; falls back to the best ratio.
   */
  #pickReadablePrimaryOnSurface(primaryScale = {}, surfaceBg = "#000000", target = 4.5) {
    const order = ["600", "700", "800", "500", "400", "900", "300", "200"];
    let best = { shade: null, color: null, ratio: 0 };
    for (const key of order) {
      const hex = primaryScale?.[key];
      if (!hex || typeof hex !== "string")
        continue;
      const r = this.#contrastRatio(hex, surfaceBg);
      if (r > best.ratio)
        best = { shade: key, color: hex, ratio: r };
      if (r >= target)
        return hex;
    }
    return best.color || primaryScale?.["600"] || primaryScale?.["500"];
  }
  // Pick a color scale shade that supports white text at AA
  #pickFillShadeForWhite(scale = {}, target = 4.5) {
    const order = ["600", "700", "800", "500", "400", "900"];
    let best = { shade: null, color: null, ratio: 0 };
    for (const key of order) {
      const hex = scale?.[key];
      if (!hex || typeof hex !== "string")
        continue;
      const r = this.#contrastRatio(hex, "#ffffff");
      if (r > best.ratio)
        best = { shade: key, color: hex, ratio: r };
      if (r >= target)
        return hex;
    }
    return best.color || scale?.["600"] || scale?.["500"];
  }
  /**
   * Generate smart surface tokens with context-aware colors for text, icons, shadows, and borders.
   * Each surface variant gets its own semantic tokens that automatically adapt to the surface's luminance.
   *
   * @param {Object} surfaceShades - Object with surface color variants (base, subtle, elevated, etc.)
   * @returns {Object} Smart tokens for each surface with text, icon, shadow, and border colors
   */
  #generateSmartSurfaceTokens(surfaceShades) {
    const tokens = {};
    Object.entries(surfaceShades).forEach(([key, bgColor]) => {
      if (!bgColor || typeof bgColor !== "string" || !bgColor.startsWith("#")) {
        return;
      }
      const isDark = this.#luminance(bgColor) < 0.5;
      const textPrimary = this.#findReadableOnColor(bgColor, 4.5);
      const textSecondary = this.#findReadableOnColor(bgColor, 3);
      const textMuted = this.#mixTowards(textPrimary, bgColor, 0.4);
      const icon = textPrimary;
      const iconSubtle = textMuted;
      const shadowBase = isDark ? "#ffffff" : "#000000";
      const shadowOpacity = isDark ? 0.25 : 0.1;
      const shadowColor = this.#rgbaFromHex(shadowBase, shadowOpacity);
      const borderBase = isDark ? "#ffffff" : "#000000";
      const borderOpacity = isDark ? 0.15 : 0.1;
      const border = this.#rgbaFromHex(borderBase, borderOpacity);
      tokens[key] = {
        bg: bgColor,
        text: textPrimary,
        textSecondary,
        textMuted,
        icon,
        iconSubtle,
        shadow: shadowColor,
        border,
        scheme: isDark ? "dark" : "light"
        // CSS color-scheme value
      };
    });
    return tokens;
  }
  #lightenColor(hexColor, factor = 0.05) {
    const hsl = this.#hexToHsl(hexColor);
    const lighterLightness = Math.min(hsl.l + (100 - hsl.l) * factor, 95);
    return this.#hslToHex(hsl.h, hsl.s, lighterLightness);
  }
  #adjustColorsForDarkMode(colorScale) {
    const dimmedScale = {};
    const mapping = {
      50: { source: "900", dimFactor: 0.8 },
      100: { source: "800", dimFactor: 0.8 },
      200: { source: "700", dimFactor: 0.8 },
      // Increased dimming
      300: { source: "600", dimFactor: 0.8 },
      // Increased dimming
      400: { source: "500", dimFactor: 0.85 },
      // Increased dimming
      500: { source: "400", dimFactor: 0.85 },
      // Increased dimming
      600: { source: "300", dimFactor: 0.85 },
      // Increased dimming (buttons use this!)
      700: { source: "200", dimFactor: 0.85 },
      // Increased dimming (button hover)
      800: { source: "100", dimFactor: 0.95 },
      // Less dimming for text
      900: { source: "50", dimFactor: 0.95 }
      // Less dimming for text
    };
    Object.entries(mapping).forEach(([key, config]) => {
      const sourceColor = colorScale[config.source];
      dimmedScale[key] = this.#dimColorForDarkMode(
        sourceColor,
        config.dimFactor
      );
    });
    return dimmedScale;
  }
  #dimColorForDarkMode(hexColor, dimFactor = 0.8) {
    const hsl = this.#hexToHsl(hexColor);
    const dimmedSaturation = Math.max(hsl.s * dimFactor, 5);
    const dimmedLightness = Math.max(hsl.l * dimFactor, 5);
    return this.#hslToHex(hsl.h, dimmedSaturation, dimmedLightness);
  }
  /**
   * Generate spacing tokens based on the provided configuration.
   * @param {Object} spatialConfig
   * @returns { String } CSS spacing tokens
   */
  generateSpacingTokens(spatialConfig) {
    const {
      baseUnit = 4,
      scaleRatio = 1.25,
      maxSpacingSteps = 12
      // Trim to realistic range
    } = spatialConfig;
    const validBaseUnit = Number.isFinite(Number(baseUnit)) ? Number(baseUnit) : 4;
    const validMaxSpacingSteps = Math.min(
      Number.isFinite(Number(maxSpacingSteps)) ? Number(maxSpacingSteps) : 12,
      12
    );
    const spacing = { 0: "0" };
    for (let i = 1; i <= validMaxSpacingSteps; i++) {
      spacing[i] = `${validBaseUnit * i}px`;
    }
    return spacing;
  }
  #generateRadiusTokens(shapeConfig) {
    const { radiusSize = "medium", customRadius = null } = shapeConfig;
    let baseRadius;
    if (customRadius !== null && customRadius !== void 0) {
      baseRadius = customRadius;
    } else if (typeof radiusSize === "number") {
      baseRadius = radiusSize;
    } else if (typeof radiusSize === "string") {
      baseRadius = enums.RadiusSizes[radiusSize] ?? enums.RadiusSizes.medium;
    } else {
      baseRadius = enums.RadiusSizes.medium;
    }
    const validBaseRadius = Number.isFinite(Number(baseRadius)) ? Number(baseRadius) : enums.RadiusSizes.medium;
    return {
      none: "0",
      xs: `${Number.isFinite(validBaseRadius * 0.25) ? Math.round(validBaseRadius * 0.25) : 0}px`,
      sm: `${Number.isFinite(validBaseRadius * 0.5) ? Math.round(validBaseRadius * 0.5) : 0}px`,
      md: `${validBaseRadius}px`,
      lg: `${Number.isFinite(validBaseRadius * 1.5) ? Math.round(validBaseRadius * 1.5) : 0}px`,
      xl: `${Number.isFinite(validBaseRadius * 2) ? Math.round(validBaseRadius * 2) : 0}px`,
      full: "9999px"
    };
  }
  #generateBorderWidthTokens(shapeConfig) {
    const { borderWidth = "medium" } = shapeConfig;
    let baseBorderWidth;
    if (typeof borderWidth === "number") {
      baseBorderWidth = borderWidth;
    } else if (typeof borderWidth === "string") {
      baseBorderWidth = enums.BorderWidths[borderWidth] ?? enums.BorderWidths.medium;
    } else {
      baseBorderWidth = enums.BorderWidths.medium;
    }
    return {
      hairline: `${enums.BorderWidths.hairline}px`,
      thin: `${enums.BorderWidths.thin}px`,
      medium: `${enums.BorderWidths.medium}px`,
      thick: `${enums.BorderWidths.thick}px`
    };
  }
  generateTypographyTokens(typographyConfig) {
    const {
      fontFamilyHeadings = "system-ui, -apple-system, sans-serif",
      fontFamilyBody = "system-ui, -apple-system, sans-serif",
      fontFamilyMono = 'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace',
      baseFontSize = 16,
      fontScale = 1.25,
      // Use consistent 1.25x minor third ratio
      fontWeightLight = enums.FontWeights.light,
      fontWeightNormal = enums.FontWeights.normal,
      fontWeightMedium = enums.FontWeights.medium,
      fontWeightSemibold = enums.FontWeights.semibold,
      fontWeightBold = enums.FontWeights.bold,
      lineHeightTight = enums.LineHeights.tight,
      lineHeightNormal = enums.LineHeights.normal,
      lineHeightRelaxed = enums.LineHeights.relaxed
    } = typographyConfig;
    const validBaseFontSize = Number.isFinite(Number(baseFontSize)) ? Number(baseFontSize) : 16;
    const validFontScale = Number.isFinite(Number(fontScale)) ? Number(fontScale) : 1.25;
    return {
      fontFamily: {
        headings: fontFamilyHeadings,
        body: fontFamilyBody,
        mono: fontFamilyMono
      },
      fontSize: {
        // Consistent modular scale using 1.25 ratio (minor third)
        xs: `${Math.round(validBaseFontSize / Math.pow(validFontScale, 2))}px`,
        // 16 / 1.25² = 10px
        sm: `${Math.round(validBaseFontSize / validFontScale)}px`,
        // 16 / 1.25 = 13px
        base: `${validBaseFontSize}px`,
        // 16px
        lg: `${Math.round(validBaseFontSize * validFontScale)}px`,
        // 16 × 1.25 = 20px
        xl: `${Math.round(validBaseFontSize * Math.pow(validFontScale, 2))}px`,
        // 16 × 1.25² = 25px
        "2xl": `${Math.round(
          validBaseFontSize * Math.pow(validFontScale, 3)
        )}px`,
        // 16 × 1.25³ = 31px
        "3xl": `${Math.round(
          validBaseFontSize * Math.pow(validFontScale, 4)
        )}px`,
        // 16 × 1.25⁴ = 39px
        "4xl": `${Math.round(
          validBaseFontSize * Math.pow(validFontScale, 5)
        )}px`
        // 16 × 1.25⁵ = 49px
      },
      fontWeight: {
        light: fontWeightLight?.toString() || "300",
        normal: fontWeightNormal?.toString() || "400",
        medium: fontWeightMedium?.toString() || "500",
        semibold: fontWeightSemibold?.toString() || "600",
        bold: fontWeightBold?.toString() || "700"
      },
      lineHeight: {
        tight: lineHeightTight?.toString() || "1.25",
        normal: lineHeightNormal?.toString() || "1.5",
        relaxed: lineHeightRelaxed?.toString() || "1.75"
      }
    };
  }
  #generateShadowTokens(layersConfig) {
    const {
      baseShadowOpacity = 0.1,
      shadowBlurMultiplier = 1,
      shadowOffsetMultiplier = 1
    } = layersConfig;
    const shadowColor = `rgba(0, 0, 0, ${baseShadowOpacity})`;
    const lightShadowColor = `rgba(0, 0, 0, ${baseShadowOpacity * 0.5})`;
    return {
      sm: `0 ${1 * shadowOffsetMultiplier}px ${2 * shadowBlurMultiplier}px 0 ${lightShadowColor}`,
      base: `0 ${1 * shadowOffsetMultiplier}px ${3 * shadowBlurMultiplier}px 0 ${shadowColor}, 0 ${1 * shadowOffsetMultiplier}px ${2 * shadowBlurMultiplier}px 0 ${lightShadowColor}`,
      md: `0 ${4 * shadowOffsetMultiplier}px ${6 * shadowBlurMultiplier}px ${-1 * shadowOffsetMultiplier}px ${shadowColor}, 0 ${2 * shadowOffsetMultiplier}px ${4 * shadowBlurMultiplier}px ${-1 * shadowOffsetMultiplier}px ${lightShadowColor}`,
      lg: `0 ${10 * shadowOffsetMultiplier}px ${15 * shadowBlurMultiplier}px ${-3 * shadowOffsetMultiplier}px ${shadowColor}, 0 ${4 * shadowOffsetMultiplier}px ${6 * shadowBlurMultiplier}px ${-2 * shadowOffsetMultiplier}px ${lightShadowColor}`,
      xl: `0 ${20 * shadowOffsetMultiplier}px ${25 * shadowBlurMultiplier}px ${-5 * shadowOffsetMultiplier}px ${shadowColor}, 0 ${10 * shadowOffsetMultiplier}px ${10 * shadowBlurMultiplier}px ${-5 * shadowOffsetMultiplier}px ${lightShadowColor}`,
      inner: `inset 0 ${2 * shadowOffsetMultiplier}px ${4 * shadowBlurMultiplier}px 0 ${lightShadowColor}`
    };
  }
  #generateLayoutTokens(layoutConfig) {
    const {
      maxWidth = 1200,
      containerPadding = 16,
      breakpoints = {
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280
      }
    } = layoutConfig;
    const resolvedMaxWidths = this.#resolveLayoutMaxWidths(layoutConfig);
    return {
      maxWidth: this.#formatLength(maxWidth, "1200px"),
      maxWidthSm: resolvedMaxWidths.sm,
      maxWidthMd: resolvedMaxWidths.md,
      maxWidthLg: resolvedMaxWidths.lg,
      maxWidthXl: resolvedMaxWidths.xl,
      minHeight: "100vh",
      containerPadding: this.#formatLength(containerPadding, "16px"),
      breakpoints: {
        sm: this.#formatLength(breakpoints.sm, "640px"),
        md: this.#formatLength(breakpoints.md, "768px"),
        lg: this.#formatLength(breakpoints.lg, "1024px"),
        xl: this.#formatLength(breakpoints.xl, "1280px")
      },
      // Semantic spacing tokens for large layouts
      // Use these instead of numbered spacing beyond --spacing-12
      pageMargin: "120px",
      // For page-level margins
      sectionGap: "160px",
      // Between major page sections
      containerGap: "200px",
      // Between container blocks
      heroSpacing: "240px",
      // For hero/banner areas
      footerSpacing: "160px"
      // Before footer sections
    };
  }
  #resolveLayoutMaxWidths(layoutConfig = {}) {
    const defaultBreakpoints = {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280
    };
    const {
      maxWidths = {},
      maxWidth = 1200,
      containerPadding = 16,
      breakpoints = defaultBreakpoints
    } = layoutConfig || {};
    const paddingValue = this.#toNumber(containerPadding, 16);
    const baseMaxWidth = this.#toNumber(maxWidth, defaultBreakpoints.xl);
    const resolvedBreakpoints = {
      sm: this.#toNumber(breakpoints.sm, defaultBreakpoints.sm),
      md: this.#toNumber(breakpoints.md, defaultBreakpoints.md),
      lg: this.#toNumber(breakpoints.lg, defaultBreakpoints.lg),
      xl: this.#toNumber(breakpoints.xl, defaultBreakpoints.xl)
    };
    const deriveWidth = (bp) => {
      if (!bp) {
        return baseMaxWidth;
      }
      return Math.max(320, bp - paddingValue * 2);
    };
    const fallbackWidths = {
      sm: Math.min(baseMaxWidth, deriveWidth(resolvedBreakpoints.sm)),
      md: Math.min(baseMaxWidth, deriveWidth(resolvedBreakpoints.md)),
      lg: Math.min(baseMaxWidth, deriveWidth(resolvedBreakpoints.lg)),
      xl: Math.max(320, baseMaxWidth)
    };
    return {
      sm: this.#formatLength(maxWidths.sm, `${fallbackWidths.sm}px`),
      md: this.#formatLength(maxWidths.md, `${fallbackWidths.md}px`),
      lg: this.#formatLength(maxWidths.lg, `${fallbackWidths.lg}px`),
      xl: this.#formatLength(maxWidths.xl, `${fallbackWidths.xl}px`)
    };
  }
  #formatLength(value, fallback) {
    if (typeof value === "number" && Number.isFinite(value)) {
      return `${value}px`;
    }
    if (typeof value === "string" && value.trim().length > 0) {
      return value;
    }
    return fallback;
  }
  #toNumber(value, fallback) {
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }
    if (typeof value === "string") {
      const parsed = parseFloat(value);
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
    return fallback;
  }
  #generateTransitionTokens(behaviorConfig) {
    const {
      transitionSpeed = enums.TransitionSpeeds.normal,
      animationEasing = enums.AnimationEasings["ease-out"]
    } = behaviorConfig;
    let baseSpeed;
    if (typeof transitionSpeed === "number") {
      baseSpeed = transitionSpeed;
    } else if (typeof transitionSpeed === "string" && enums.TransitionSpeeds[transitionSpeed]) {
      baseSpeed = enums.TransitionSpeeds[transitionSpeed];
    } else {
      baseSpeed = enums.TransitionSpeeds.normal;
    }
    return {
      fast: `${Math.round(baseSpeed * 0.6)}ms`,
      normal: `${baseSpeed}ms`,
      slow: `${Math.round(baseSpeed * 1.4)}ms`
    };
  }
  #generateZIndexTokens(layersConfig) {
    const { baseZIndex = 1e3, zIndexStep = 10 } = layersConfig;
    return {
      dropdown: baseZIndex.toString(),
      sticky: (baseZIndex + zIndexStep * 2).toString(),
      fixed: (baseZIndex + zIndexStep * 3).toString(),
      modal: (baseZIndex + zIndexStep * 4).toString(),
      drawer: (baseZIndex + zIndexStep * 5).toString(),
      // Added drawer token
      popover: (baseZIndex + zIndexStep * 6).toString(),
      tooltip: (baseZIndex + zIndexStep * 7).toString(),
      notification: (baseZIndex + zIndexStep * 8).toString()
    };
  }
  #generateIconTokens(iconConfig) {
    const {
      set = "phosphor",
      weight = "regular",
      defaultSize = 24,
      sizes = {
        xs: 16,
        sm: 20,
        md: 24,
        lg: 32,
        xl: 48,
        "2xl": 64
      },
      // Default path for dev/demo; static export places it at [static.root]/icons/pds-icons.svg
      spritePath = "/assets/pds/icons/pds-icons.svg",
      // Path for on-demand external SVG icons
      externalPath = "/assets/img/icons/"
    } = iconConfig;
    return {
      set,
      weight,
      defaultSize: `${defaultSize}px`,
      sizes: Object.fromEntries(
        Object.entries(sizes).map(([key, value]) => [key, `${value}px`])
      ),
      spritePath,
      externalPath
    };
  }
  #generateColorVariables(colors) {
    const chunks = [];
    chunks.push(`  /* Colors */
`);
    const generateNestedColors = (obj, prefix = "") => {
      Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          generateNestedColors(value, `${prefix}${key}-`);
        } else if (typeof value === "string") {
          chunks.push(`  --color-${prefix}${key}: ${value};
`);
        }
      });
    };
    Object.entries(colors).forEach(([category, values]) => {
      if (category === "dark")
        return;
      if (category === "surfaceSmart")
        return;
      if (category === "interactive")
        return;
      if (typeof values === "object" && values !== null) {
        generateNestedColors(values, `${category}-`);
      }
    });
    if (colors.surfaceSmart) {
      chunks.push(`  /* Smart Surface Tokens (context-aware) */
`);
      Object.entries(colors.surfaceSmart).forEach(([surfaceKey, tokens]) => {
        chunks.push(`  --surface-${surfaceKey}-bg: ${tokens.bg};
`);
        chunks.push(`  --surface-${surfaceKey}-text: ${tokens.text};
`);
        chunks.push(
          `  --surface-${surfaceKey}-text-secondary: ${tokens.textSecondary};
`
        );
        chunks.push(
          `  --surface-${surfaceKey}-text-muted: ${tokens.textMuted};
`
        );
        chunks.push(`  --surface-${surfaceKey}-icon: ${tokens.icon};
`);
        chunks.push(
          `  --surface-${surfaceKey}-icon-subtle: ${tokens.iconSubtle};
`
        );
        chunks.push(`  --surface-${surfaceKey}-shadow: ${tokens.shadow};
`);
        chunks.push(`  --surface-${surfaceKey}-border: ${tokens.border};
`);
      });
      chunks.push(`
`);
    }
    chunks.push(`  /* Semantic Text Colors */
`);
    chunks.push(`  --color-text-primary: var(--color-gray-900);
`);
    chunks.push(`  --color-text-secondary: var(--color-gray-600);
`);
    chunks.push(`  --color-text-muted: var(--color-gray-600);
`);
    chunks.push(`  --color-border: var(--color-gray-300);
`);
    chunks.push(`  --color-input-bg: var(--color-surface-base);
`);
    chunks.push(`  --color-input-disabled-bg: var(--color-gray-50);
`);
    chunks.push(`  --color-input-disabled-text: var(--color-gray-500);
`);
    chunks.push(`  --color-code-bg: var(--color-gray-100);
`);
    if (colors.interactive && colors.interactive.light) {
      chunks.push(
        `  /* Interactive Colors - optimized for specific use cases */
`
      );
      chunks.push(
        `  --color-primary-fill: ${colors.interactive.light.fill}; /* For button backgrounds with white text */
`
      );
      chunks.push(
        `  --color-primary-text: ${colors.interactive.light.text}; /* For links and outline buttons on light surfaces */
`
      );
    }
    chunks.push(`  /* Translucent Surface Tokens */
`);
    chunks.push(
      `  --color-surface-translucent-25: color-mix(in oklab, var(--color-surface-subtle) 25%, transparent 75%);
`
    );
    chunks.push(
      `  --color-surface-translucent-50: color-mix(in oklab, var(--color-surface-subtle) 50%, transparent 50%);
`
    );
    chunks.push(
      `  --color-surface-translucent-75: color-mix(in oklab, var(--color-surface-subtle) 75%, transparent 25%);
`
    );
    chunks.push(
      `   /* Backdrop tokens - used for modal dialogs, drawers, overlays */

    --backdrop-bg: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.2),
        rgba(255, 255, 255, 0.1)
      );
    --backdrop-blur: 10px;
    --backdrop-saturate: 150%;
    --backdrop-brightness: 0.9;
    --backdrop-filter: blur(var(--backdrop-blur)) saturate(var(--backdrop-saturate)) brightness(var(--backdrop-brightness));
    --backdrop-opacity: 1;
    
    /* Legacy alias for backwards compatibility */
    --backdrop-background: var(--backdrop-bg);
    `
    );
    chunks.push(this.#generateMeshGradients(colors));
    return `${chunks.join("")}
`;
  }
  #generateMeshGradients(colors) {
    const primary = colors.primary?.[500] || "#3b82f6";
    const secondary = colors.secondary?.[500] || "#8b5cf6";
    const accent = colors.accent?.[500] || "#f59e0b";
    return (
      /*css*/
      `
  /* Mesh Gradient Backgrounds */
  --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, ${primary} 25%, transparent) 0px, transparent 50%),
    radial-gradient(at 97% 21%, color-mix(in oklab, ${secondary} 22%, transparent) 0px, transparent 50%),
    radial-gradient(at 52% 99%, color-mix(in oklab, ${accent} 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 29%, color-mix(in oklab, ${primary} 15%, transparent) 0px, transparent 50%);
  
  --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, ${secondary} 24%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 0%, color-mix(in oklab, ${primary} 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 0% 50%, color-mix(in oklab, ${accent} 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 100%, color-mix(in oklab, ${secondary} 15%, transparent) 0px, transparent 50%);
  
  --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, ${accent} 21%, transparent) 0px, transparent 50%),
    radial-gradient(at 85% 30%, color-mix(in oklab, ${primary} 23%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 80%, color-mix(in oklab, ${secondary} 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 90%, color-mix(in oklab, ${accent} 16%, transparent) 0px, transparent 50%);
  
  --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, ${primary} 19%, transparent) 0px, transparent 50%),
    radial-gradient(at 20% 80%, color-mix(in oklab, ${secondary} 22%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 60%, color-mix(in oklab, ${accent} 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 30% 40%, color-mix(in oklab, ${primary} 16%, transparent) 0px, transparent 50%);
  
  --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, ${primary} 23%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 10%, color-mix(in oklab, ${accent} 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 10%, color-mix(in oklab, ${secondary} 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 90%, color-mix(in oklab, ${accent} 15%, transparent) 0px, transparent 50%);
    `
    );
  }
  #generateSpacingVariables(spacing) {
    const lines = ["  /* Spacing */\n"];
    Object.entries(spacing).forEach(([key, value]) => {
      if (key !== null && key !== void 0 && key !== "NaN" && value !== void 0 && !value.includes("NaN")) {
        lines.push(`  --spacing-${key}: ${value};
`);
      }
    });
    return `${lines.join("")}
`;
  }
  #generateRadiusVariables(radius) {
    const lines = ["  /* Border Radius */\n"];
    Object.entries(radius).forEach(([key, value]) => {
      lines.push(`  --radius-${key}: ${value};
`);
    });
    return `${lines.join("")}
`;
  }
  #generateBorderWidthVariables(borderWidths) {
    const lines = ["  /* Border Widths */\n"];
    Object.entries(borderWidths).forEach(([key, value]) => {
      lines.push(`  --border-width-${key}: ${value};
`);
    });
    return `${lines.join("")}
`;
  }
  #generateTypographyVariables(typography) {
    const lines = ["  /* Typography */\n"];
    Object.entries(typography).forEach(([category, values]) => {
      const cleanCategory = category.replace(/^font/, "").replace(/^(.)/, (m) => m.toLowerCase()).replace(/([A-Z])/g, "-$1").toLowerCase();
      Object.entries(values).forEach(([key, value]) => {
        const kebabKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
        lines.push(`  --font-${cleanCategory}-${kebabKey}: ${value};
`);
      });
    });
    return `${lines.join("")}
`;
  }
  #generateShadowVariables(shadows) {
    const lines = ["  /* Shadows */\n"];
    Object.entries(shadows).forEach(([key, value]) => {
      lines.push(`  --shadow-${key}: ${value};
`);
    });
    return `${lines.join("")}
`;
  }
  #generateLayoutVariables(layout) {
    const lines = ["  /* Layout */\n"];
    Object.entries(layout).forEach(([key, value]) => {
      const kebabKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      if (key === "breakpoints") {
        return;
      }
      lines.push(`  --layout-${kebabKey}: ${value};
`);
    });
    return `${lines.join("")}
`;
  }
  #generateTransitionVariables(transitions) {
    const lines = ["  /* Transitions */\n"];
    Object.entries(transitions).forEach(([key, value]) => {
      lines.push(`  --transition-${key}: ${value};
`);
    });
    return `${lines.join("")}
`;
  }
  #generateZIndexVariables(zIndex) {
    const lines = ["  /* Z-Index */\n"];
    Object.entries(zIndex).forEach(([key, value]) => {
      lines.push(`  --z-${key}: ${value};
`);
    });
    return `${lines.join("")}
`;
  }
  #generateIconVariables(icons) {
    const lines = ["  /* Icon System */\n"];
    lines.push(`  --icon-set: ${icons.set};
`);
    lines.push(`  --icon-weight: ${icons.weight};
`);
    lines.push(`  --icon-size: ${icons.defaultSize};
`);
    Object.entries(icons.sizes).forEach(([key, value]) => {
      lines.push(`  --icon-size-${key}: ${value};
`);
    });
    return `${lines.join("")}
`;
  }
  #generateDarkVariablesOnly(colors) {
    if (!colors?.dark)
      return "";
    const varLines = [];
    const generateNested = (obj, prefix = "") => {
      Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          generateNested(value, `${prefix}${key}-`);
        } else if (typeof value === "string") {
          varLines.push(`  --color-${prefix}${key}: ${value};
`);
        }
      });
    };
    Object.entries(colors.dark).forEach(([category, values]) => {
      if (category === "surfaceSmart")
        return;
      if (typeof values === "object" && values !== null) {
        generateNested(values, `${category}-`);
      }
    });
    const smartLines = [];
    if (colors.dark.surfaceSmart) {
      smartLines.push(
        `  /* Smart Surface Tokens (dark mode, context-aware) */
`
      );
      Object.entries(colors.dark.surfaceSmart).forEach(
        ([surfaceKey, tokens]) => {
          smartLines.push(`  --surface-${surfaceKey}-bg: ${tokens.bg};
`);
          smartLines.push(`  --surface-${surfaceKey}-text: ${tokens.text};
`);
          smartLines.push(
            `  --surface-${surfaceKey}-text-secondary: ${tokens.textSecondary};
`
          );
          smartLines.push(
            `  --surface-${surfaceKey}-text-muted: ${tokens.textMuted};
`
          );
          smartLines.push(`  --surface-${surfaceKey}-icon: ${tokens.icon};
`);
          smartLines.push(
            `  --surface-${surfaceKey}-icon-subtle: ${tokens.iconSubtle};
`
          );
          smartLines.push(
            `  --surface-${surfaceKey}-shadow: ${tokens.shadow};
`
          );
          smartLines.push(
            `  --surface-${surfaceKey}-border: ${tokens.border};
`
          );
        }
      );
      smartLines.push(`
`);
    }
    const semantic = `  --color-text-primary: var(--color-gray-100);
  --color-text-secondary: var(--color-gray-300);
  --color-text-muted: var(--color-gray-400);
  --color-border: var(--color-gray-700);
  --color-input-bg: var(--color-gray-800);
  --color-input-disabled-bg: var(--color-gray-900);
  --color-input-disabled-text: var(--color-gray-600);
  --color-code-bg: var(--color-gray-800);
`;
    const backdrop = `  /* Backdrop tokens - dark mode */
  --backdrop-bg: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.4)
    );
  --backdrop-blur: 10px;
  --backdrop-saturate: 120%;
  --backdrop-brightness: 0.7;
  --backdrop-filter: blur(var(--backdrop-blur)) saturate(var(--backdrop-saturate)) brightness(var(--backdrop-brightness));
  --backdrop-opacity: 1;
  
  /* Legacy alias for backwards compatibility */
  --backdrop-background: var(--backdrop-bg);
`;
    const mesh = this.#generateMeshGradientsDark(colors);
    const body = [...varLines, ...smartLines, semantic, backdrop, mesh].join(
      ""
    );
    return `html[data-theme="dark"] {
${body}}
`;
  }
  // Generate ONLY dark mode variables for the tokens layer (no wrapper, no component rules)
  #generateDarkVariablesForTokensLayer(colors) {
    if (!colors?.dark)
      return "";
    const varLines = [];
    const generateNested = (obj, prefix = "") => {
      Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          generateNested(value, `${prefix}${key}-`);
        } else if (typeof value === "string") {
          varLines.push(`    --color-${prefix}${key}: ${value};
`);
        }
      });
    };
    Object.entries(colors.dark).forEach(([category, values]) => {
      if (category === "surfaceSmart")
        return;
      if (typeof values === "object" && values !== null) {
        generateNested(values, `${category}-`);
      }
    });
    const smartLines = [];
    if (colors.dark.surfaceSmart) {
      smartLines.push(
        `    /* Smart Surface Tokens (dark mode, context-aware) */
`
      );
      Object.entries(colors.dark.surfaceSmart).forEach(
        ([surfaceKey, tokens]) => {
          smartLines.push(`    --surface-${surfaceKey}-bg: ${tokens.bg};
`);
          smartLines.push(
            `    --surface-${surfaceKey}-text: ${tokens.text};
`
          );
          smartLines.push(
            `    --surface-${surfaceKey}-text-secondary: ${tokens.textSecondary};
`
          );
          smartLines.push(
            `    --surface-${surfaceKey}-text-muted: ${tokens.textMuted};
`
          );
          smartLines.push(
            `    --surface-${surfaceKey}-icon: ${tokens.icon};
`
          );
          smartLines.push(
            `    --surface-${surfaceKey}-icon-subtle: ${tokens.iconSubtle};
`
          );
          smartLines.push(
            `    --surface-${surfaceKey}-shadow: ${tokens.shadow};
`
          );
          smartLines.push(
            `    --surface-${surfaceKey}-border: ${tokens.border};
`
          );
        }
      );
      smartLines.push(`
`);
    }
    const interactiveLines = [];
    if (colors.interactive && colors.interactive.dark) {
      interactiveLines.push(
        `    /* Interactive Colors - optimized for specific use cases (dark mode) */
`
      );
      interactiveLines.push(
        `    --color-primary-fill: ${colors.interactive.dark.fill}; /* For button backgrounds with white text */
`
      );
      interactiveLines.push(
        `    --color-primary-text: ${colors.interactive.dark.text}; /* For links and outline buttons on dark surfaces */
`
      );
    }
    const semantic = [
      `    --color-text-primary: var(--color-gray-100);
`,
      `    --color-text-secondary: var(--color-gray-300);
`,
      `    --color-text-muted: var(--color-gray-400);
`,
      `    --color-border: var(--color-gray-700);
`,
      `    --color-input-bg: var(--color-gray-800);
`,
      `    --color-input-disabled-bg: var(--color-gray-900);
`,
      `    --color-input-disabled-text: var(--color-gray-600);
`,
      `    --color-code-bg: var(--color-gray-800);
`,
      ...interactiveLines
    ].join("");
    const backdrop = `    /* Backdrop tokens - dark mode */
    --backdrop-bg: linear-gradient(
        135deg,
        rgba(0, 0, 0, 0.6),
        rgba(0, 0, 0, 0.4)
      );
    --backdrop-blur: 10px;
    --backdrop-saturate: 120%;
    --backdrop-brightness: 0.7;
    --backdrop-filter: blur(var(--backdrop-blur)) saturate(var(--backdrop-saturate)) brightness(var(--backdrop-brightness));
    --backdrop-opacity: 1;
    
    /* Legacy alias for backwards compatibility */
    --backdrop-background: var(--backdrop-bg);
`;
    const mesh = this.#generateMeshGradientsDarkVariablesOnly(colors);
    const content = [...varLines, ...smartLines, semantic, backdrop, mesh].join(
      ""
    );
    return `
       html[data-theme="dark"] {
${content}       }
`;
  }
  // Generate only mesh gradient variables for dark mode (for tokens layer)
  #generateMeshGradientsDarkVariablesOnly(colors) {
    const dark = colors.dark || colors;
    const primary = dark.primary?.[400] || "#60a5fa";
    const secondary = dark.secondary?.[400] || "#a78bfa";
    const accent = dark.accent?.[400] || "#fbbf24";
    return (
      /*css*/
      `    /* Mesh Gradient Variables (Dark Mode) */
    --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, ${primary} 20%, transparent) 0px, transparent 50%),
      radial-gradient(at 97% 21%, color-mix(in oklab, ${secondary} 16%, transparent) 0px, transparent 50%),
      radial-gradient(at 52% 99%, color-mix(in oklab, ${accent} 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 10% 29%, color-mix(in oklab, ${primary} 10%, transparent) 0px, transparent 50%);
    
    --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, ${secondary} 18%, transparent) 0px, transparent 50%),
      radial-gradient(at 80% 0%, color-mix(in oklab, ${primary} 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 0% 50%, color-mix(in oklab, ${accent} 12%, transparent) 0px, transparent 50%),
      radial-gradient(at 80% 100%, color-mix(in oklab, ${secondary} 10%, transparent) 0px, transparent 50%);
    
    --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, ${accent} 15%, transparent) 0px, transparent 50%),
      radial-gradient(at 85% 30%, color-mix(in oklab, ${primary} 17%, transparent) 0px, transparent 50%),
      radial-gradient(at 50% 80%, color-mix(in oklab, ${secondary} 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 90%, color-mix(in oklab, ${accent} 11%, transparent) 0px, transparent 50%);
    
    --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, ${primary} 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 20% 80%, color-mix(in oklab, ${secondary} 16%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 60%, color-mix(in oklab, ${accent} 12%, transparent) 0px, transparent 50%),
      radial-gradient(at 30% 40%, color-mix(in oklab, ${primary} 11%, transparent) 0px, transparent 50%);
    
    --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, ${primary} 17%, transparent) 0px, transparent 50%),
      radial-gradient(at 10% 10%, color-mix(in oklab, ${accent} 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 10%, color-mix(in oklab, ${secondary} 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 50% 90%, color-mix(in oklab, ${accent} 10%, transparent) 0px, transparent 50%);
      `
    );
  }
  #generateMeshGradientsDark(colors) {
    const dark = colors.dark || colors;
    const primary = dark.primary?.[400] || "#60a5fa";
    const secondary = dark.secondary?.[400] || "#a78bfa";
    const accent = dark.accent?.[400] || "#fbbf24";
    return (
      /*css*/
      `
  /* Mesh Gradient Backgrounds (Dark Mode) */
  --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, ${primary} 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 97% 21%, color-mix(in oklab, ${secondary} 16%, transparent) 0px, transparent 50%),
    radial-gradient(at 52% 99%, color-mix(in oklab, ${accent} 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 29%, color-mix(in oklab, ${primary} 10%, transparent) 0px, transparent 50%);
  
  --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, ${secondary} 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 0%, color-mix(in oklab, ${primary} 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 0% 50%, color-mix(in oklab, ${accent} 12%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 100%, color-mix(in oklab, ${secondary} 10%, transparent) 0px, transparent 50%);
  
  --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, ${accent} 15%, transparent) 0px, transparent 50%),
    radial-gradient(at 85% 30%, color-mix(in oklab, ${primary} 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 80%, color-mix(in oklab, ${secondary} 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 90%, color-mix(in oklab, ${accent} 11%, transparent) 0px, transparent 50%);
  
  --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, ${primary} 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 20% 80%, color-mix(in oklab, ${secondary} 16%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 60%, color-mix(in oklab, ${accent} 12%, transparent) 0px, transparent 50%),
    radial-gradient(at 30% 40%, color-mix(in oklab, ${primary} 11%, transparent) 0px, transparent 50%);
  
  --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, ${primary} 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 10%, color-mix(in oklab, ${accent} 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 10%, color-mix(in oklab, ${secondary} 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 90%, color-mix(in oklab, ${accent} 10%, transparent) 0px, transparent 50%);
    `
    );
  }
  // Generate dark mode component adjustments (for components layer)
  #generateDarkModeComponentRules() {
    const rules = (
      /*css*/
      `/* Callout dark mode adjustments */
html[data-theme="dark"] {
  .callout-success { background-color: var(--color-success-50); border-color: var(--color-success-500); color: var(--color-success-900); }
  .callout-info { background-color: var(--color-info-50); border-color: var(--color-info-500); color: var(--color-info-900); }
  .callout-warning { background-color: var(--color-warning-50); border-color: var(--color-warning-500); color: var(--color-warning-900); }
  .callout-danger, .callout-error { background-color: var(--color-danger-50); border-color: var(--color-danger-500); color: var(--color-danger-900); }
  img, video { opacity: 0.8; transition: opacity var(--transition-normal); }
  img:hover, video:hover { opacity: 1; }
}`
    );
    return rules;
  }
  // If the config specifies options.backgroundMesh (1-5), apply the mesh to body.
  // Mesh variables are always generated above; this just opts-in the body background.
  #generateBodyBackgroundMeshRule() {
    try {
      const meshOption = this.options?.design?.options?.backgroundMesh;
      if (this.options.debug) {
        this.options.log?.(
          "debug",
          "backgroundMesh check:",
          meshOption
        );
      }
      const num = Number(meshOption);
      if (!Number.isFinite(num) || num === 0)
        return "";
      const idx = Math.max(1, Math.min(5, Math.floor(num)));
      return `/* Optional background mesh applied from config */
body {
  background: var(--background-mesh-0${idx});
  background-attachment: fixed;
}`;
    } catch (e) {
      if (this.options.debug) {
        this.options.log?.(
          "error",
          "Error in generateBodyBackgroundMeshRule:",
          e
        );
      }
      return "";
    }
  }
  // Conditionally generate a lightweight ".liquid-glass" utility for frosted glass cards.
  // Inspired by the referenced article, using gradients, borders, shadows, and backdrop-filter.
  #generateLiquidGlassUtility() {
    try {
      if (!this.options?.design?.options?.liquidGlassEffects)
        return "";
      return (
        /*css*/
        `/* Liquid glass utility (opt-in via options.liquidGlassEffects) */
.liquid-glass {
  border-radius: var(--radius-lg);
  /* Subtle translucent fill blended with surface */
  background: color-mix(in oklab, var(--color-surface-subtle) 45%, transparent);

  background-image: linear-gradient(
    135deg,
    rgba(255,255,255,0.35),
    rgba(255,255,255,0.12)
  );
  /* Frosted glass blur + saturation */
  -webkit-backdrop-filter: blur(12px) saturate(140%);
  backdrop-filter: blur(12px) saturate(140%);
  /* Soft inner highlight and outer depth */
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.6),
    inset 0 -40px 80px rgba(255,255,255,0.12),
    0 10px 30px rgba(0,0,0,0.10);
  /* Glossy border with slight light and dark edges */
  border: 1px solid color-mix(in oklab, var(--color-primary-500) 22%, transparent);
  outline: 1px solid color-mix(in oklab, #ffffff 18%, transparent);
  outline-offset: -1px;
}

html[data-theme="dark"] .liquid-glass {
  background: color-mix(in oklab, var(--color-surface-inverse) 45%, transparent);
  background-image: linear-gradient(
    135deg,
    color-mix(in oklab, var(--color-primary-300) 40%, transparent),
    color-mix(in oklab, var(--color-surface-overlay) 48%, transparent)
  );
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.12),
    inset 0 -40px 80px rgba(0,0,0,0.55),
    0 18px 38px rgba(0,0,0,0.65);
  border: 1px solid color-mix(in oklab, var(--color-primary-300) 26%, transparent);
  outline: 1px solid color-mix(in oklab, #ffffff 16%, transparent);
}

/* Fallback when backdrop-filter isn't supported */
@supports not ((-webkit-backdrop-filter: blur(1px)) or (backdrop-filter: blur(1px))) {
  .liquid-glass {
    /* Strengthen fill a bit to compensate for lack of blur */
    background: color-mix(in oklab, var(--color-surface-subtle) 70%, rgba(255,255,255,0.4));
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.6),
      0 10px 24px rgba(0,0,0,0.08);
  }

  html[data-theme="dark"] .liquid-glass {
    background: color-mix(in oklab, var(--color-surface-inverse) 70%, transparent);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.1),
      0 18px 32px rgba(0,0,0,0.58);
  }
}
`
      );
    } catch {
      return "";
    }
  }
  // Generate border gradient utilities for WHOOP-style card outlines
  // Creates reusable utilities for standard cards, gradient borders, and glow effects
  #generateBorderGradientUtilities() {
    return (
      /*css*/
      `/* ============================================================================
   Border Gradient Utilities
   Card outlines with gradient borders and glow effects
   ============================================================================ */


/* Gradient border utility - premium/promo card style */
.border-gradient {
  border: var(--border-width-medium) solid transparent;
  background:
    linear-gradient(var(--color-surface-base), var(--color-surface-base)) padding-box,
    linear-gradient(var(--gradient-angle, 135deg),
      var(--color-primary-400),
      var(--color-accent-400)
    ) border-box;
}

/* Gradient border variants - different color combinations */
.border-gradient-primary {
  border: var(--border-width-medium) solid transparent;
  background:
    linear-gradient(var(--color-surface-base), var(--color-surface-base)) padding-box,
    linear-gradient(var(--gradient-angle, 135deg),
      var(--color-primary-300),
      var(--color-primary-600)
    ) border-box;
}

.border-gradient-accent {
  border: var(--border-width-medium) solid transparent;
  background:
    linear-gradient(var(--color-surface-base), var(--color-surface-base)) padding-box,
    linear-gradient(var(--gradient-angle, 135deg),
      var(--color-accent-300),
      var(--color-accent-600)
    ) border-box;
}

.border-gradient-secondary {
  border: var(--border-width-medium) solid transparent;
  background:
    linear-gradient(var(--color-surface-base), var(--color-surface-base)) padding-box,
    linear-gradient(var(--gradient-angle, 135deg),
      var(--color-secondary-300),
      var(--color-secondary-600)
    ) border-box;
}

/* Gradient border with different strengths/thickness */
.border-gradient-soft {
  border: 1px solid transparent;
  background:
    linear-gradient(var(--color-surface-base), var(--color-surface-base)) padding-box,
    linear-gradient(var(--gradient-angle, 135deg),
      var(--color-primary-400),
      var(--color-accent-400)
    ) border-box;
}

.border-gradient-medium {
  border: 2px solid transparent;
  background:
    linear-gradient(var(--color-surface-base), var(--color-surface-base)) padding-box,
    linear-gradient(var(--gradient-angle, 135deg),
      var(--color-primary-400),
      var(--color-accent-400)
    ) border-box;
}

.border-gradient-strong {
  border: 3px solid transparent;
  background:
    linear-gradient(var(--color-surface-base), var(--color-surface-base)) padding-box,
    linear-gradient(var(--gradient-angle, 135deg),
      var(--color-primary-400),
      var(--color-accent-400)
    ) border-box;
}

/* Glow effect utility - for callouts and active states */
.border-glow {
  box-shadow: 0 0 12px var(--color-primary-500);
}

.border-glow-sm {
  box-shadow: 0 0 6px var(--color-primary-500);
}

.border-glow-lg {
  box-shadow: 0 0 20px var(--color-primary-500);
}

/* Combined gradient + glow for premium effects */
.border-gradient-glow {
  border: var(--border-width-medium) solid transparent;
  background:
    linear-gradient(var(--color-surface-base), var(--color-surface-base)) padding-box,
    linear-gradient(135deg,
      var(--color-primary-400),
      var(--color-accent-400)
    ) border-box;
  box-shadow: 0 0 12px var(--color-primary-500);
}

/* Semantic glow variants */
.border-glow-primary {
  box-shadow: 0 0 12px var(--color-primary-500);
}

.border-glow-accent {
  box-shadow: 0 0 12px var(--color-accent-500);
}

.border-glow-success {
  box-shadow: 0 0 12px var(--color-success-500);
}

.border-glow-warning {
  box-shadow: 0 0 12px var(--color-warning-500);
}

.border-glow-danger {
  box-shadow: 0 0 12px var(--color-danger-500);
}

`
    );
  }
  // #generateLightModeCSS(colors) {
  //   // Emit an explicit light theme block scoped to html[data-theme="light"].
  //   // We reuse the same color variable generation used for :root so consumers
  //   // can rely on attribute-scoped tokens for both themes.
  //   try {
  //     const colorBlock = this.#generateColorVariables(colors || {});
  //     return `html[data-theme="light"] {\n${colorBlock}}\n\n`;
  //   } catch (ex) {
  //     return "";
  //   }
  // }
  // Legacy #generateBaseStyles() removed - all content moved to #generatePrimitivesLayer()
  #generateSemanticHTMLStyles() {
    const { layout = {} } = this.options.design;
    const breakpoints = layout.breakpoints || {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280
    };
    return (
      /*css*/
      `/* Semantic HTML Elements (low-specificity via :where()) */

:where(blockquote) {
  margin: 0 0 var(--spacing-4) 0;
  padding: var(--spacing-6) var(--spacing-8);
  border-left: 4px solid var(--color-primary-500);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-none);
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-primary);
  
  :where(p):last-child {
    margin-bottom: 0;
  }
  
  :where(cite) {
    display: block;
    margin-top: var(--spacing-4);
    font-size: var(--font-size-base);
    font-style: normal;
    color: var(--color-primary-500);
  }
}

:where(hr) {
  margin: var(--spacing-8) 0;
  border: none;
  border-top: 1px solid var(--color-border);
  height: 0;
}

/* Labeled horizontal rule: <hr data-content="OR"> */
:where(hr[data-content]) {
  position: relative;
  border: none;
  text-align: center;
  height: auto;
  overflow: visible;
  
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--color-border), transparent);
  }
  
  &::after {
    content: attr(data-content);
    position: relative;
    display: inline-block;
    padding: 0 var(--spacing-3);
    background-color: var(--color-surface-base);
    color: var(--color-text-muted);
    font-size: var(--font-size-sm);
    line-height: var(--font-line-height-normal);
  }
}

:where(dl) {
  margin: 0 0 var(--spacing-4) 0;
}

:where(dt) {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-top: var(--spacing-3);
  
  &:first-child {
    margin-top: 0;
  }
}

:where(dd) {
  margin: var(--spacing-1) 0 var(--spacing-3) var(--spacing-6);
  color: var(--color-text-secondary);
}

:where(nav), :where(header), :where(footer) {
  display: block;
}

:where(header), :where(footer) {
  width: 100%;
}

/* Headings within header elements have tight spacing for intro content */
:where(header) > :where(h1, h2, h3, h4, h5, h6) {
  margin: 0;
}

:where(article), :where(section), :where(aside) {
  display: block;
  margin-bottom: var(--spacing-6);
  
  & > *:last-child {
    margin-bottom: 0;
  }
}

:where(mark) {
  background-color: var(--color-warning-200);
  color: var(--color-warning-900);
  padding: 0 var(--spacing-1);
  border-radius: var(--radius-sm);
}

:where(kbd) {
  display: inline-block;
  padding: var(--spacing-1) var(--spacing-2);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  background-color: var(--color-surface-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  box-shadow: 0 2px 0 0 var(--color-border);
}

:where(abbr[title]) {
  text-decoration: underline dotted;
  cursor: help;
  text-decoration-thickness: 1px;
}

:where(time) {
  font-variant-numeric: tabular-nums;
}

:where(address) {
  font-style: normal;
  line-height: var(--font-line-height-relaxed);
  margin: 0 0 var(--spacing-4) 0;
}

:where(details):not(.accordion *) {
  margin: 0 0 var(--spacing-2) 0;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface-base);
  
  &[open] :where(summary) {
    border-bottom: 1px solid var(--color-border);
    background-color: var(--color-surface-subtle);
    
    &::after {
      transform: rotate(270deg);
    }
  }
  
  & > *:not(:where(summary)) {
    padding: var(--spacing-4);
  }
}

:where(summary) {
  padding: var(--spacing-3) var(--spacing-4);
  cursor: pointer;
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-medium);
  user-select: none;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color var(--transition-fast);
  
  &::-webkit-details-marker {
    display: none;
  }
  
  &::after {
    content: "\u203A";
    display: inline-block;
    transform: rotate(90deg);
    transition: transform var(--transition-fast);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-secondary);
  }
  
  &:hover {
    background-color: var(--color-surface-subtle);
  }
}

/* Dialog styles moved to #generateDialogStyles() */

`
    );
  }
  #generateFormStyles() {
    const {
      gap,
      inputPadding,
      buttonPadding,
      focusRingWidth,
      focusRingOpacity,
      borderWidthThin,
      sectionSpacing,
      buttonMinHeight,
      inputMinHeight
    } = this.options.design;
    const inputPaddingValue = inputPadding || 0.75;
    const buttonPaddingValue = buttonPadding || 1;
    const focusWidth = focusRingWidth || 3;
    const borderWidth = borderWidthThin || 1;
    const gapValue = gap || 1;
    const sectionSpacingValue = sectionSpacing || 2;
    const minButtonHeight = buttonMinHeight || 44;
    const minInputHeight = inputMinHeight || 40;
    return (
      /*css*/
      `/* Mobile-First Form Styles - Generated from Design Config */
form {
  margin: 0;
  width: 100%;
}

fieldset {
  margin: 0;  
  width: 100%;
  
  /* Unified styling for radio groups and checkbox groups */
  &[role="radiogroup"],
  &[role="group"] {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
    padding: 0;
    background-color: transparent;
    
    label {
      display: flex;
      align-items: center;
      gap: var(--spacing-3);
      padding: var(--spacing-1) 0;
      cursor: pointer;
      min-height: auto;
      border: none;
      background: none;
      font-weight: var(--font-weight-normal);
      margin-bottom: 0;
      
      &:hover {
        color: var(--color-primary-700);
      }
    }

    input[type="checkbox"]{
      border-radius: var(--radius-xs);
    }
    
    input[type="radio"],
    input[type="checkbox"] {
      position: static;
      opacity: 1;
      width: var(--spacing-5);
      height: var(--spacing-5);
      min-height: var(--spacing-5);
      padding: var(--spacing-2);
      margin: 0;
      cursor: pointer;
      flex-shrink: 0;
      accent-color: var(--color-primary-600);

      &:focus-visible {
        outline: none;

        box-shadow:
          0 0 0 2px var(--color-primary-500),
          0 0 0 4px color-mix(in srgb,
            var(--color-primary-500) 40%,
            transparent
          );
      }

      &:checked {
        background-color: var(--color-primary-600);
      }
      
    }
  }
  
}



/* Nested legend scaling: reduce font-size for deeper sub-forms */
fieldset > legend { font-size: var(--font-size-lg); }
fieldset fieldset > legend { font-size: var(--font-size-base); }
fieldset fieldset fieldset > legend { font-size: var(--font-size-sm); }

.form-container {
  display: grid;
  gap: var(--spacing-6);
  width: 100%;
}

.fields {
  display: grid;
  gap: var(--spacing-4);
}

label {
  display: block;
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  line-height: var(--font-line-height-normal);
}

[data-label] {
  display: block;
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-2);
}

[data-open]{
  [data-label]{
    margin-bottom: 0;
  }
}

.field-description {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin-top: var(--spacing-1);
  line-height: var(--font-line-height-relaxed);
}

input, textarea, select {
  &:focus {
    outline: none;
  }
}

input, textarea, select {
  width: 100%;
  min-height: ${minInputHeight}px;
  padding: calc(var(--spacing-1) * ${inputPaddingValue}) var(--spacing-4);
  border: ${borderWidth}px solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  line-height: var(--font-line-height-normal);
  background-color: var(--color-input-bg);
  color: var(--color-text-primary);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast), background-color var(--transition-fast);
  touch-action: manipulation;
  appearance: none;
  -webkit-appearance: none;
  
  &:focus {
    border-color: var(--color-primary-500);
    background-color: var(--color-surface-base);
  }
  
  &:disabled {
    background-color: var(--color-input-disabled-bg);
    color: var(--color-input-disabled-text);
    border-color: var(--color-border);
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  &:invalid {
    border-color: var(--color-danger-500);
    
    &:focus {
      box-shadow: 0 0 0 ${focusWidth}px color-mix(in oklab, var(--color-danger-500) ${Math.round(
        (focusRingOpacity || 0.3) * 100
      )}%, transparent);
    }
  }
}

input[type="range"] {
  padding: 0;
  background: transparent;
  min-height: auto;
}

/* Make range visually match other inputs */
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  height: var(--input-min-height, 40px); /* align control height with inputs */
  width: 100%;
}

/* Track and thumb styling - using CSS nesting to reduce repetition */
input[type="range"] {
  /* WebKit track */
  &::-webkit-slider-runnable-track {
    height: var(--range-track-height, 8px);
    background: var(--color-input-bg);
    border-radius: var(--radius-full);
  }

  /* WebKit thumb */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: var(--range-thumb-size, 28px);
    height: var(--range-thumb-size, 28px);
    margin-top: calc((var(--range-track-height, 8px) - var(--range-thumb-size, 28px)) / 2);
    background: color-mix(in srgb, var(--color-primary-500) 15%, var(--color-surface-base));
    border-radius: 50%;
    box-shadow: var(--shadow-sm);
    cursor: grab;
    border: 1px solid color-mix(in srgb, var(--color-primary-500) 30%, var(--color-border));
  }

  /* Mozilla track */
  &::-moz-range-track {
    height: var(--range-track-height, 8px);
    background: var(--color-input-bg);
    border-radius: var(--radius-full);
  }

  /* Mozilla thumb */
  &::-moz-range-thumb {
    width: var(--range-thumb-size, 28px);
    height: var(--range-thumb-size, 28px);
    background: color-mix(in srgb, var(--color-primary-500) 15%, var(--color-surface-base));
    border-radius: 50%;
    box-shadow: var(--shadow-sm);
    border: 1px solid color-mix(in srgb, var(--color-primary-500) 30%, var(--color-border));
    transform: translateY(calc((var(--range-track-height, 8px) - var(--range-thumb-size, 28px)) / 2));
  }

  /* Hover and focus states for WebKit */
  &:hover::-webkit-slider-thumb,
  &:focus-visible::-webkit-slider-thumb {
    cursor: grabbing;
    background: var(--color-primary-500);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    border-color: var(--color-primary-600);
  }

  /* Active state for WebKit */
  &:active::-webkit-slider-thumb {
    background: var(--color-primary-600);
  }

  /* Hover and focus states for Mozilla */
  &:hover::-moz-range-thumb,
  &:focus-visible::-moz-range-thumb {
    background: var(--color-primary-500);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    border-color: var(--color-primary-600);
    cursor: grabbing;
  }

  /* Active state for Mozilla */
  &:active::-moz-range-thumb {
    background: var(--color-primary-600);
  }
}

/* Focus style for container to match input focus */
.range-container:focus-within {
  border-color: var(--color-primary-500);  
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary-500) 30%, transparent);
}

input[type="range"]:active::-moz-range-thumb {
  background: var(--color-primary-600);
}

input[type="color"] {
  -webkit-appearance: none;
  padding: 0;
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem; /* your radius */
  overflow: hidden; /* important */
  cursor: pointer;

  /* The wrapper */
  &::-webkit-color-swatch-wrapper {
    padding: 0;
    border-radius: inherit;
  }

  /* The swatch (the actual color box) */
  &::-webkit-color-swatch {
    border: none;
    border-radius: inherit;
  }
}

/* Button-style checkbox inputs outside of fieldsets */
.checkbox-container input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
  pointer-events: none;
}

label:has(input[type="checkbox"]):not(fieldset label):not(label[data-toggle]),
input[type="checkbox"] + label:not(fieldset label):not(label[data-toggle]) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: calc(${minButtonHeight}px * 0.75);
  padding: calc(var(--spacing-1) * ${buttonPaddingValue * 0.6}) calc(var(--spacing-4) * 0.85);
  border: ${borderWidth}px solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: var(--font-family-body);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: 1.2;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-decoration: none;
  touch-action: manipulation;
  user-select: none;
  background-color: transparent;
  color: var(--color-text-primary);
  margin: 0;
  flex: 0 1 auto;
  white-space: nowrap;
  
  &:hover {
    background-color: var(--color-surface-subtle);
    border-color: var(--color-primary-500);
  }
}

label:has(input[type="checkbox"]:checked):not(fieldset label):not(label[data-toggle]),
input[type="checkbox"]:checked + label:not(fieldset label):not(label[data-toggle]) {
  background-color: color-mix(in oklab, var(--color-primary-500) 8%, transparent);
  color: var(--color-primary-700);
  border-color: var(--color-primary-500);
  border-width: 2px;
  font-weight: var(--font-weight-semibold);
  
  &:hover {
    background-color: color-mix(in oklab, var(--color-primary-500) 15%, transparent);
    border-color: var(--color-primary-600);
  }
}

label:has(input[type="checkbox"]:focus):not(fieldset label):not(label[data-toggle]),
input[type="checkbox"]:focus + label:not(fieldset label):not(label[data-toggle]) {
  outline: none;
  box-shadow: 0 0 0 ${focusWidth}px color-mix(in oklab, var(--color-primary-500) ${Math.round(
        (focusRingOpacity || 0.3) * 100
      )}%, transparent);
}

label:has(input[type="checkbox"]:disabled):not(fieldset label):not(label[data-toggle]),
input[type="checkbox"]:disabled + label:not(fieldset label):not(label[data-toggle]) {
  background-color: var(--color-input-disabled-bg);
  color: var(--color-input-disabled-text);
  border-color: var(--color-border);
  cursor: not-allowed;
  opacity: 0.6;
}

label:has(input[type="checkbox"]:checked:disabled):not(fieldset label):not(label[data-toggle]),
input[type="checkbox"]:checked:disabled + label:not(fieldset label):not(label[data-toggle]) {
  background-color: var(--color-input-disabled-bg);
  color: var(--color-input-disabled-text);
  border-color: var(--color-border);
}

/* Keep default checkbox/radio for inputs NOT in special containers */
input[type="checkbox"]:not(fieldset input[type="checkbox"]):not(.checkbox-container input[type="checkbox"]),
input[type="radio"]:not(fieldset input[type="radio"]) {
  width: var(--spacing-5);
  height: var(--spacing-5);
  min-height: var(--spacing-5);
  margin-right: var(--spacing-2);
  cursor: pointer;
  position: static;
  opacity: 1;
  appearance: auto;
  -webkit-appearance: auto;

  &:disabled {
    cursor: not-allowed;
  }
}

/* Button-style radio and checkbox groups with .buttons class */
fieldset[role="radiogroup"].buttons,
fieldset[role="group"].buttons {
  flex-direction: row;
  flex-wrap: wrap;
  gap: var(--spacing-3);
  
  input[type="radio"],
  input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
    pointer-events: none;
  }
  
  label {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: calc(${minButtonHeight}px * 0.75);
    padding: calc(var(--spacing-1) * ${buttonPaddingValue * 0.6}) calc(var(--spacing-4) * 0.85);
    border: 2px solid var(--color-border);
    border-radius: var(--radius-md);
    font-family: var(--font-family-body);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    line-height: 1.2;
    cursor: pointer;
    transition: all var(--transition-fast);
    text-decoration: none;
    touch-action: manipulation;
    user-select: none;
    background-color: transparent;
    color: var(--color-text-primary);
    margin: 0;
    flex: 0 1 auto;
    white-space: nowrap;
    
    &:hover {
      background-color: var(--color-surface-subtle);
      border-color: var(--color-primary-500);
      color: var(--color-text-primary);
    }

    &:has([disabled]){
      pointer-events: none;
    }
  }
  
  label:has(input[type="radio"]:checked),
  label:has(input[type="checkbox"]:checked) {
    background-color: color-mix(in oklab, var(--color-primary-500) 8%, transparent);
    border-color: var(--color-primary-500);
    border-width: 2px;
    font-weight: var(--font-weight-semibold);
    
    &:hover {
      background-color: color-mix(in oklab, var(--color-primary-500) 15%, transparent);
      border-color: var(--color-primary-600);
    }
  }
  
  label:has(input[type="radio"]:focus),
  label:has(input[type="checkbox"]:focus) {
    outline: none;
    box-shadow: 0 0 0 ${focusWidth}px color-mix(in oklab, var(--color-primary-500) ${Math.round(
        (focusRingOpacity || 0.3) * 100
      )}%, transparent);
  }
  
  label:has(input[type="radio"]:disabled),
  label:has(input[type="checkbox"]:disabled) {
    background-color: var(--color-input-disabled-bg);
    color: var(--color-input-disabled-text);
    border-color: var(--color-border);
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  label:has(input[type="radio"]:checked:disabled),
  label:has(input[type="checkbox"]:checked:disabled) {
    background-color: var(--color-input-disabled-bg);
    color: var(--color-input-disabled-text);
    border-color: var(--color-border);
  }
}

/* Toggle switches - enhanced checkboxes with data-toggle attribute */
label[data-toggle] {
  display: inline-flex;
  align-items: normal;
  gap: var(--spacing-3);
  cursor: pointer;
  user-select: none;
  padding: 0;
  background: transparent;
  border: none;
  min-height: auto;
  font-weight: var(--font-weight-normal);

  /* Hide the original checkbox in toggle switches */
  input[type="checkbox"] {
    display: none;
  }

  /* Toggle switch container */
  .toggle-switch {
    position: relative;
    display: inline-block;
    width: 44px;
    height: 24px;
    background-color: var(--color-gray-300);
    border-radius: var(--radius-full);
    transition: background-color 200ms ease;
    cursor: pointer;
    flex-shrink: 0;
  }

  /* Toggle switch knob */
  .toggle-knob {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    background-color: #ffffff;
    border-radius: 50%;
    transition: left 200ms ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  /* Icons in toggle knob (opt-in via .with-icons class) */
  &.with-icons .toggle-knob::before {
    content: "\u2715";
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
    color: var(--color-gray-600);
    transition: opacity 200ms ease;
  }

  &.with-icons:has(input[type="checkbox"]:checked) .toggle-knob::before {
    content: "\u2713";
    color: var(--color-primary-600);
  }

  /* Toggle switch when checked - using :has() selector */
  &:has(input[type="checkbox"]:checked) .toggle-switch {
    background-color: var(--color-primary-fill);
  }
  

  /* Toggle knob when checked - always moves to the right */
  &:has(input[type="checkbox"]:checked) .toggle-knob {
    left: 22px;
  }

  /* Focus state for toggle switch */
  &:has(input[type="checkbox"]:focus) .toggle-switch {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }

  /* Focus visible state when label is focused via keyboard */
  &:focus-visible .toggle-switch {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }

  /* Remove default outline on label itself */
  &:focus {
    outline: none;
  }

  /* Disabled state */
  &:has(input[type="checkbox"]:disabled) {
    cursor: not-allowed;
    opacity: 0.6;

    .toggle-switch {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}

input[type="file"] {
  padding: var(--spacing-2) var(--spacing-4);
  cursor: pointer;
}

/* Textareas */
textarea {
  min-height: calc(var(--spacing-4) * 5);
  padding: var(--spacing-3) var(--spacing-4);
  resize: vertical;
  line-height: var(--font-line-height-relaxed);
}

/* Select dropdowns */
select {
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right var(--spacing-2) center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: var(--spacing-8);
}

/* Button styling */
button, .btn, input[type="submit"], input[type="button"], input[type="reset"] {
  display: inline-flex;
  gap: var(--spacing-1);
  align-items: center;
  justify-content: center;
  min-height: ${minButtonHeight}px;
  padding: calc(var(--spacing-1) * ${buttonPaddingValue}) var(--spacing-6);
  border: ${borderWidth}px solid transparent;
  border-radius: var(--radius-md);
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  line-height: 1;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-decoration: none;
  touch-action: manipulation;
  user-select: none;
  background-color: var(--color-surface-base);
  color: var(--color-text-primary);
  border-color: var(--color-border);
  
  /* Only apply generic hover to non-variant buttons */
  &:hover:not(.btn-primary):not(.btn-secondary):not(.btn-outline) {
    background-color: var(--color-surface-elevated);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 ${focusWidth}px color-mix(in oklab, var(--color-primary-500) ${Math.round(
        (focusRingOpacity || 0.3) * 100
      )}%, transparent);
  }
  
  &:disabled {
    background-color: var(--color-input-disabled-bg);
    color: var(--color-input-disabled-text);
    border-color: var(--color-input-disabled-bg);
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.btn-primary {
  background-color: var(--color-primary-fill);
  color: white;
  border-color: var(--color-primary-fill);
  
  &:hover {
    background-color: color-mix(in oklab, var(--color-primary-fill) 90%, black 10%);
    border-color: color-mix(in oklab, var(--color-primary-fill) 90%, black 10%);
    color: white;
  }

  &:active {
    background-color: color-mix(in oklab, var(--color-primary-fill) 80%, black 20%);
    border-color: color-mix(in oklab, var(--color-primary-fill) 80%, black 20%);
    color: white;
  }
  
  &:focus {
    box-shadow: 0 0 0 ${focusWidth}px color-mix(in oklab, var(--color-primary-500) ${Math.round(
        (focusRingOpacity || 0.3) * 100
      )}%, transparent);
  }
  
  &:disabled {
    background-color: var(--color-input-disabled-bg);
    color: var(--color-input-disabled-text);
    border-color: var(--color-input-disabled-bg);
  }
}

.btn-secondary {
  background-color: var(--color-surface-base);
  color: var(--color-text-primary);
  border-color: var(--color-border);
  
  &:hover {
    background-color: var(--color-surface-elevated);
  }
}

.btn-outline {
  background-color: transparent;
  color: var(--color-primary-500);
  border-color: var(--color-primary-500);
  
  &:hover {
    background-color: var(--color-primary-500);
    color: var(--color-primary-contrast, #ffffff);
    border-color: var(--color-primary-500);

    pds-icon {
      color: var(--color-primary-contrast, #ffffff);
    }
  }

  &:active {
    background-color: color-mix(in oklab, var(--color-primary-500) 80%, black 20%);
    border-color: color-mix(in oklab, var(--color-primary-500) 80%, black 20%);
    color: var(--color-primary-contrast, #ffffff);

    pds-icon {
      color: var(--color-primary-contrast, #ffffff);
    }
  }
  
  &:disabled {
    background-color: transparent;
    color: var(--color-input-disabled-text);
    border-color: var(--color-input-disabled-bg);
  }
}

.btn-sm {
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--font-size-sm);
  min-height: calc(${minButtonHeight}px * 0.8);
}

.btn-xs {
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--font-size-xs);
  min-height: calc(${minButtonHeight}px * 0.6);
}


.btn-lg {
  padding: var(--spacing-4) var(--spacing-8);
  font-size: var(--font-size-lg);
  min-height: calc(${minButtonHeight}px * 1.2);
}

/* Working/loading state for buttons */
button.btn-working,
a.btn-working {
  cursor: wait;
  pointer-events: none;
  opacity: 0.6;
  
  pds-icon:first-child {
    animation: pds-spin 0.8s linear infinite;
  }
}

@keyframes pds-spin {
  to { transform: rotate(360deg); }
}

/* Skeleton loading animation */
.skeleton {
  background: linear-gradient(
    90deg,
    color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%) 0%,
    color-mix(in oklab, var(--color-surface-base) 85%, var(--color-text-primary) 15%) 50%,
    color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%) 100%
  );
  background-size: 200% 100%;
  animation: pds-skeleton 1.5s ease-in-out infinite;
  border-radius: var(--radius-sm);
  
  &::before {
    content: '\\00a0';
  }
}

@keyframes pds-skeleton {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Empty State */
.empty-state {
  margin: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-4);
  color: var(--color-text-secondary);
  padding: var(--spacing-6) var(--spacing-4);
  background-color: var(--color-surface-subtle);
  max-width: var(--layout-max-width-md);
  border-radius: var(--radius-md);
  nav {
    margin-top: var(--spacing-4);
    display: flex;
    gap: var(--spacing-3);
  }
  pds-icon {    
    color: var(--color-text-muted);
  }
}

/* clip lines */

[data-clip] {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: attr(data-clip number, 3);
  line-clamp: attr(data-clip number, 3);
  position: relative;
  padding-inline-end: var(--spacing-6);
  --clip-more-bg: var(--color-surface-base);
  max-height: var(--clip-max-height-closed, calc(var(--spacing-12) * 3));
  transition: max-height var(--transition-fast), padding-inline-end var(--transition-fast);
  overflow: hidden;

  /* optional visual \u201Cmore\u201D hint*/
  &:not([data-clip-open="true"])[data-clip-more]::after{
    content: attr(data-clip-more);
  }

  &:not([data-clip-open="true"]):not([data-clip-more])::after{
    content: "more...";
  }

  /* optional visual \u201Cless\u201D hint*/
  &[data-clip-open="true"][data-clip-less]::after{
    content: attr(data-clip-less);
  }

  &[data-clip-open="true"]:not([data-clip-less])::after{
    content: "less...";
  }

  &::after{
    position: absolute;
    inset-block-end: 0;
    inset-inline-end: 0;
    display: inline-flex;
    align-items: center;
    padding: var
    padding-inline-start: var(--spacing-2);
    cursor: pointer;
    opacity: .7;
    transition: opacity var(--transition-fast), transform var(--transition-fast);
  }

  &[data-clip-open="true"] {
    -webkit-line-clamp: unset;
    line-clamp: unset;
    max-height: var(--clip-max-height-open, calc(var(--spacing-12) * 20));
    padding-inline-end: var(--spacing-6);
  }

  &[data-clip-open="true"]::after{
    opacity: .9;
    transform: translateY(calc(var(--spacing-1) * -1));
  }

}



/* Form utility classes */
.range-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  width: 100%;
  background: var(--color-input-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  min-height: var(--input-min-height, 40px);
  position: relative;

  input[type="range"] {
    border: none;
  }
}

.range-bubble {
  position: absolute;
  top: calc(-1 * (var(--range-thumb-size, 28px) + var(--spacing-2)));
  transform: translateX(-50%);
  min-width: calc(var(--range-thumb-size, 28px) * 0.8);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-md);
  background: var(--color-surface-base);
  color: var(--color-text-primary);
  text-align: center;
  font-size: var(--font-size-sm);
  box-shadow: var(--shadow-md);
  opacity: 0;
  pointer-events: none;
  transition: opacity 150ms ease, transform 150ms ease;

  &.visible {
    opacity: 1;
  }
}

/* Anchor bubble to the thumb position using left (set by enhancer)
   and center with translateX(-50%). */

/* Array field styling */
.array-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-4);
}

.array-item {
  position: relative;
  padding: var(--spacing-4);
  border: ${borderWidth}px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface-base);
  
  .array-controls {
    padding-top: var(--spacing-3);
    border-top: ${borderWidth}px solid var(--color-border);
    margin-top: var(--spacing-4);
  }
}

.array-controls {
  display: flex;
  gap: var(--spacing-2);
  margin-top: var(--spacing-3);
  flex-wrap: wrap;

  button {
    padding: var(--spacing-2) var(--spacing-3);
    font-size: var(--font-size-sm);
    min-height: auto;
  }
}

.range-value {
  min-width: var(--spacing-16);
  text-align: right;
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
}

.checkbox-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-2);
  flex-wrap: wrap;

  input[type="checkbox"],
  input[type="radio"] {
    position: absolute;
    opacity: 0;
  }
}

`
    );
  }
  #generateTableStyles() {
    const { layout = {} } = this.options.design;
    const breakpoints = layout.breakpoints || {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280
    };
    return (
      /*css*/
      `/* Table Styles - Mobile First */

table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 0 var(--spacing-6) 0;
  background-color: var(--color-surface-base);
  border-radius: var(--radius-md);
  overflow: hidden;
  font-size: var(--font-size-sm);
  
  @media (min-width: ${breakpoints.sm}px) {
    font-size: var(--font-size-base);
  }
}

.table-responsive {
  @media (max-width: ${breakpoints.sm - 1}px) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin: 0 0 var(--spacing-6) 0;
    
    table {
      min-width: 600px;
      margin: 0;
    }
  }
}

thead {
  background-color: var(--color-surface-subtle);
}

th {
  padding: var(--spacing-3) var(--spacing-4);
  text-align: left;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  border-bottom: 2px solid var(--color-border);
}

td {
  padding: var(--spacing-3) var(--spacing-4);
  color: var(--color-text-secondary);
  border-bottom: 1px solid var(--color-border);
}

tbody {
  tr {
    transition: background-color var(--transition-fast);
    
    &:hover {
      background-color: var(--color-surface-subtle);
    }
    
    &:last-child td {
      border-bottom: none;
    }
  }
}

.table-striped {
  tbody tr:nth-child(even) {
    background-color: var(--color-surface-subtle);
  }
}

.table-bordered {
  border: 1px solid var(--color-border);
  
  th, td {
    border: 1px solid var(--color-border);
  }
}

.table-compact {
  th, td {
    padding: var(--spacing-2) var(--spacing-3);
  }
}

`
    );
  }
  #generateCalloutStyles() {
    return (
      /*css*/
      `/* Callout/Notification Styles */

.callout {
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
  margin: 0 0 var(--spacing-4) 0;
  border-left: 4px solid;
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3);
  font-size: var(--font-size-sm);
  line-height: var(--font-line-height-relaxed);
  background-color: red;
  
  & > *:last-child {
    margin-bottom: 0;
  }
}
/* Variants: success/info/warning/danger mapped to tokens */
.callout-success {
  background-color: var(--color-success-50);
  border-color: var(--color-success-600);
  color: var(--color-success-900);
}
.callout-info {
  background-color: var(--color-info-50);
  border-color: var(--color-info-600);
  color: var(--color-info-900);
}
.callout-warning {
  background-color: var(--color-warning-50);
  border-color: var(--color-warning-600);
  color: var(--color-warning-900);
}
.callout-danger,
.callout-error {
  background-color: var(--color-danger-50);
  border-color: var(--color-danger-600);
  color: var(--color-danger-900);
}

.callout-title {
  font-weight: var(--font-weight-semibold);
  margin: 0 0 var(--spacing-2) 0;
  font-size: var(--font-size-base);
}

.callout-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  pds-icon {
    flex-shrink: 0;
  }
}

.callout-dismissible {
  padding-right: var(--spacing-12);
  position: relative;
}

.callout-close {
  position: absolute;
  top: var(--spacing-3);
  right: var(--spacing-3);
  background: none;
  border: none;
  font-size: var(--font-size-xl);
  line-height: 1;
  opacity: 0.6;
  cursor: pointer;
  padding: var(--spacing-1);
  transition: opacity var(--transition-fast);
  
  &:hover {
    opacity: 1;
  }
}

`
    );
  }
  #generateAccordionStyles() {
    return (
      /*css*/
      `/* Accordion (details/summary) */

:where(.accordion details) {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface-base);
  margin: 0 0 var(--spacing-3) 0;
  overflow: hidden;

  &[open] {
    & > summary::after {
      transform: rotate(45deg);
    }

    &::details-content {
      block-size: auto;
    }
  }

  /* Modern approach: animate block-size with ::details-content */
  &::details-content {
    block-size: 0;
    overflow: hidden;
    transition: block-size var(--transition-normal) ease, content-visibility var(--transition-normal);
    transition-behavior: allow-discrete;
  }

  /* Content padding (works for both approaches) */
  & > :not(summary) > * {
    padding-inline: var(--spacing-4);
    padding-block: var(--spacing-3);
  }
}

:where(.accordion summary) {
  cursor: pointer;
  padding: var(--spacing-3) var(--spacing-4);
  list-style: none;
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  border-radius: inherit;
  transition: background-color var(--transition-fast), box-shadow var(--transition-fast);

  &::-webkit-details-marker {
    display: none;
  }

  &:hover {
    background-color: var(--color-surface-subtle);
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-primary-500) 30%, transparent);
  }

  /* Chevron indicator */
  &::after {
    content: "";
    margin-inline-start: auto;
    inline-size: 0.7em;
    block-size: 0.7em;
    border-inline-end: 2px solid currentColor;
    border-block-end: 2px solid currentColor;
    transform: rotate(-45deg);
    transition: transform var(--transition-normal);
  }
}

/* Fallback: grid trick for browsers without ::details-content support */
@supports not selector(::details-content) {
  :where(.accordion details) {
    & > :not(summary) {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows var(--transition-normal) ease;
      overflow: hidden;

      & > * {
        min-block-size: 0;
      }
    }

    &[open] > :not(summary) {
      grid-template-rows: 1fr;
    }
  }
}
`
    );
  }
  // Legacy #generateToastStyles() removed - was empty/unused
  #generateBadgeStyles() {
    return (
      /*css*/
      `/* Badge/Pill Styles */

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  line-height: 1;
  border-radius: var(--radius-full);
  white-space: nowrap;
  vertical-align: middle;
  background-color: var(--color-gray-200);
  color: var(--color-gray-800);
}

.badge-primary, .badge-secondary, .badge-success, .badge-info, .badge-warning, .badge-danger { color: white; }
.badge-primary { background-color: var(--color-primary-600); }
.badge-secondary { background-color: var(--color-secondary-600); }
.badge-success { background-color: var(--color-success-600); }
.badge-info { background-color: var(--color-info-600); }
.badge-warning { background-color: var(--color-warning-600); }
.badge-danger { background-color: var(--color-danger-600); }

.badge-outline {
  background-color: transparent;
  border: 1px solid currentColor;
  &.badge-primary { color: var(--color-text-primary); }
  &.badge-secondary { color: var(--color-secondary-600); }
  &.badge-success { color: var(--color-success-600); }
  &.badge-info { color: var(--color-info-600); }
  &.badge-warning { color: var(--color-warning-600); }
  &.badge-danger { color: var(--color-danger-600); }
}

.badge-sm { padding: 2px var(--spacing-1); font-size: 10px; }
.badge-lg { padding: var(--spacing-2) var(--spacing-3); font-size: var(--font-size-sm); }
.pill { padding: var(--spacing-1) var(--spacing-3); border-radius: var(--radius-full); }

`
    );
  }
  #generateDialogStyles() {
    const { layout = {}, behavior = {} } = this.options.design;
    const breakpoints = layout.breakpoints || {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280
    };
    return (
      /*css*/
      `/* ============================================================================
   Dialog Primitive
   Native <dialog> element with PDS integration
   ============================================================================ */

/* Dialog base styles */
dialog {
  position: fixed;
  inset: 0;
  max-width: min(600px, calc(100vw - var(--spacing-8)));
  max-height: calc(100vh - var(--spacing-8));
  margin: auto;
  padding: 0;
  border: none;
  border-radius: var(--radius-lg);
  
  /* Surface styling - elevated overlay */
  background-color: var(--surface-overlay-bg);
  color: var(--surface-overlay-text);
  box-shadow: 0 8px 32px var(--surface-overlay-shadow);
  
  /* Smooth transitions */
  opacity: 0;
  scale: 0.95;
  transition: 
    opacity 0.2s ease,
    scale 0.2s ease,
    overlay 0.2s ease allow-discrete,
    display 0.2s ease allow-discrete;
  
  
}

/* Open state */
dialog[open] {
  opacity: 1;
  scale: 1;
}

/* Starting style for smooth open animation */
@starting-style {
  dialog[open] {
    opacity: 0;
    scale: 0.95;
  }
}

/* Backdrop styling */
dialog::backdrop {
  background: var(--backdrop-bg);
  backdrop-filter: var(--backdrop-filter);
  opacity: 0;
  transition: 
    opacity 0.2s ease,
    overlay 0.2s ease allow-discrete,
    display 0.2s ease allow-discrete;
}

dialog[open]::backdrop {
  opacity: var(--backdrop-opacity, 1);
}

@starting-style {
  dialog[open]::backdrop {
    opacity: 0;
  }
}

/* Dialog - constrain max height to 90vh, support custom maxHeight via CSS variable */
dialog {
  max-height: var(--dialog-max-height, 90vh);
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Prevent dialog itself from scrolling - let .dialog-body handle it */
}

/* Form structure - use flexbox instead of contents */
dialog form {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0; /* Allow flex child to shrink */
  margin: 0;
}

/* Dialog fields - to open pds-form subforms */
.dialog-field {
    margin-top: var(--spacing-3);
}

/* Dialog header */
dialog {
  header,
  form > header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-4);
    padding: var(--spacing-6);
    border-bottom: 1px solid var(--surface-overlay-border);
    flex-shrink: 0;   

    h2,
    h3 {
      margin: 0;
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-semibold);
      color: var(--surface-overlay-text);
      flex: 1;
    }

    /* Close button in header */
    button[value="cancel"],
    .dialog-close {
      background: none;
      border: none;
      padding: var(--spacing-2);
      border-radius: var(--radius-sm);
      cursor: pointer;
      color: var(--surface-overlay-icon);
      transition: background-color var(--transition-fast);
      display: inline-flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background-color: var(--color-surface-subtle);
      }

      &:focus-visible {
        outline: 2px solid var(--color-focus-ring);
        outline-offset: 2px;
      }
    }
  }

  /* Dialog body - scrollable content */
  article,
  form > article,
  .dialog-body {
    flex: 1 1 auto;
    min-height: 0; /* Critical: allow flex child to shrink and scroll */
    padding: var(--spacing-3) var(--spacing-6);
    overflow-y: auto;
    overflow-x: hidden;
  }

  /* Dialog footer - actions */
  footer,
  form > footer {
    display: flex;
    flex-direction: row;
    gap: var(--spacing-3);
    justify-content: flex-end;
    align-items: center;
    padding: var(--spacing-6);
    border-top: 1px solid var(--surface-overlay-border);
    flex-shrink: 0;
  }
}

/* Dialog size modifiers */
dialog.dialog-sm { max-width: min(400px, calc(100vw - var(--spacing-8))); }
dialog.dialog-lg { max-width: min(800px, calc(100vw - var(--spacing-8))); }
dialog.dialog-xl { max-width: min(1200px, calc(100vw - var(--spacing-8))); }
dialog.dialog-full { max-width: calc(100vw - var(--spacing-8)); max-height: calc(100vh - var(--spacing-8)); }

/* Mobile responsiveness - maximize on mobile */
@media (max-width: ${breakpoints.sm - 1}px) {
  dialog { 
    max-width: 100vw; 
    max-height: 100vh; 
    --dialog-max-height: 100vh; /* Override custom maxHeight on mobile */
    border-radius: 0; 
    top: 50%; 
    transform: translateY(-50%); 
    margin: 0; 
  }
  dialog header, dialog form > header, dialog article, dialog form > article, dialog footer, dialog form > footer { padding: var(--spacing-4); }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  dialog, dialog::backdrop { transition-duration: 0.01s !important; }
}

`
    );
  }
  #generateTabStripStyles() {
    const { layout = {} } = this.options.design;
    const breakpoints = layout.breakpoints || {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280
    };
    return (
      /*css*/
      `/* Tab Strip Component */

/* Tab navigation */

pds-tabstrip {
  margin-top: var(--spacing-6);

  & > nav {
    display: flex;
    gap: var(--spacing-1);
    border-bottom: 2px solid var(--color-border);
    margin-bottom: var(--spacing-6);
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE/Edge */

    &::-webkit-scrollbar {
      display: none; /* Chrome/Safari */
    }

    /* Tab links */
    & > a {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-2);
      padding: var(--spacing-3) var(--spacing-4);
      font-family: var(--font-family-body);
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-medium);
      color: var(--color-text-secondary);
      text-decoration: none;
      white-space: nowrap;
      border: none;
      background: transparent;
      cursor: pointer;
      transition: color var(--transition-fast);
      border-bottom: 2px solid transparent;
      margin-bottom: -2px; /* Overlap the nav border */

      &:hover {
        color: var(--color-text-primary);
        background-color: var(--color-surface-hover);
      }

      &:focus-visible {
        outline: var(--focus-ring-width, 2px) solid var(--color-primary-500);
        outline-offset: -2px;
        border-radius: var(--radius-sm);
        z-index: 1;
      }

      /* Active tab */
      &[aria-current="page"] {
        color: var(--color-primary-600);
        font-weight: var(--font-weight-semibold);
        border-bottom-color: var(--color-primary-600);

        &:hover {
          color: var(--color-primary-700);
          border-bottom-color: var(--color-primary-700);
          background-color: var(--color-primary-50);
        }
      }
    }
  }

  /* Tab panel */
  & > pds-tabpanel {
    display: block;
    margin-top: var(--spacing-4);

    &[data-tabpanel] {
      animation: tabFadeIn var(--transition-normal) ease-out;
      padding: var(--spacing-4) 0;

      &[hidden] {
        display: none;
      }
    }
  }
}

@keyframes tabFadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Mobile responsive */
@media (max-width: ${breakpoints.sm - 1}px) {
  pds-tabstrip > nav { gap: var(--spacing-1); }
  pds-tabstrip > nav > a { padding: var(--spacing-2) var(--spacing-3); font-size: var(--font-size-sm); }
  pds-tabstrip > pds-tabpanel[data-tabpanel] { padding: var(--spacing-3) 0; }
}

`
    );
  }
  #generateScrollbarStyles() {
    return (
      /*css*/
      `/* Custom Scrollbars */
::-webkit-scrollbar { width: 12px; height: 12px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb {
  background: var(--color-secondary-300);
  border-radius: var(--radius-full);
  border: 3px solid transparent;
  background-clip: padding-box;
  transition: background-color var(--transition-fast);
  &:hover { background: var(--color-secondary-400); border: 2px solid transparent; background-clip: padding-box; }
  &:active { background: var(--color-secondary-500); border: 2px solid transparent; background-clip: padding-box; }
  @media (prefers-color-scheme: dark) {
    background: var(--color-secondary-600);
    &:hover { background: var(--color-secondary-500); }
    &:active { background: var(--color-secondary-400); }
  }
}

* {
  scrollbar-width: thin;
  scrollbar-color: var(--color-secondary-300) transparent;
  @media (prefers-color-scheme: dark) { scrollbar-color: var(--color-secondary-600) transparent; }
}
*:hover { scrollbar-color: var(--color-secondary-400) transparent; }
@media (prefers-color-scheme: dark) { *:hover { scrollbar-color: var(--color-secondary-500) transparent; } }

`
    );
  }
  #generateIconStyles() {
    const { a11y = {} } = this.options.design;
    const minTouchTarget = a11y.minTouchTarget || enums.TouchTargetSizes.standard;
    return (
      /*css*/
      `/* Icon System */

pds-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  vertical-align: middle;
  pointer-events: none;
}

/* Icon size utilities */
.icon-xs, pds-icon[size="xs"] { width: var(--icon-size-xs); height: var(--icon-size-xs); }
.icon-sm, pds-icon[size="sm"] { width: var(--icon-size-sm); height: var(--icon-size-sm); }
.icon-md, pds-icon[size="md"] { width: var(--icon-size-md); height: var(--icon-size-md); }
.icon-lg, pds-icon[size="lg"] { width: var(--icon-size-lg); height: var(--icon-size-lg); }
.icon-xl, pds-icon[size="xl"] { width: var(--icon-size-xl); height: var(--icon-size-xl); }
.icon-2xl, pds-icon[size="2xl"] { width: var(--icon-size-2xl); height: var(--icon-size-2xl); }
.icon-32xl, pds-icon[size="3xl"] { width: var(--icon-size-3xl); height: var(--icon-size-3xl); }


/* Icon color utilities */
.icon-primary, pds-icon.primary { color: var(--color-primary-600); }
.icon-secondary, pds-icon.secondary { color: var(--color-secondary-600); }
.icon-accent, pds-icon.accent { color: var(--color-accent-600); }
.icon-success, pds-icon.success { color: var(--color-success-600); }
.icon-warning, pds-icon.warning { color: var(--color-warning-600); }
.icon-danger, pds-icon.danger { color: var(--color-danger-600); }
.icon-info, pds-icon.info { color: var(--color-info-600); }
.icon-muted, pds-icon.muted { color: var(--color-text-muted); }
.icon-subtle, pds-icon.subtle { color: var(--color-text-subtle); }

/* Icon with text combinations */
.icon-text { display: inline-flex; align-items: center; gap: var(--spacing-2); }
.icon-text-start { flex-direction: row; }
.icon-text-end { flex-direction: row-reverse; }

/* Button icon utilities */
button, a {
  pds-icon {
    flex-shrink: 0;
  }

  &.icon-only {
    padding: var(--spacing-2);
    min-width: ${minTouchTarget}px;
    width: ${minTouchTarget}px;
    height: ${minTouchTarget}px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
}

/* Icon in inputs */
.input-icon, .input-icon-end {
  position: relative;
  display: flex;
  align-items: center;
  pds-icon { position: absolute; color: var(--color-text-muted); pointer-events: none; width: var(--icon-size-md); height: var(--icon-size-md); }
}
.input-icon {
  pds-icon { left: var(--spacing-3); }
  input { padding-left: calc(var(--icon-size-md) + var(--spacing-6)); width: 100%; }
}
.input-icon-end {
  pds-icon { left: unset; right: var(--spacing-3); }
  input { padding-left: var(--spacing-4); padding-right: calc(var(--icon-size-md) + var(--spacing-6)); width: 100%; }
}

`
    );
  }
  #generateDropdownStyles() {
    return (
      /*css*/
      `/* Dropdown Component */

/* Basic dropdown host */
nav[data-dropdown] {
  position: relative;
  display: inline-block;
  padding: 0;

  & > :last-child {
    position: absolute;
    padding: var(--spacing-2);
    margin: 0;
    background: var(--color-surface-overlay);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    top: 100%;
    bottom: auto;
    left: 0;
    right: auto;
    margin-top: var(--spacing-2);
    --dropdown-transition-duration: var(--transition-fast, 160ms);
    min-width: var(--dropdown-min-width, 12rem);
    width: max-content;
    inline-size: max-content;
    max-width: none;
    max-inline-size: none;
    opacity: 0;
    scale: 0.95;
    visibility: hidden;
    display: none;
    pointer-events: none;
    transform-origin: top center;
    z-index: var(--z-dropdown, 1050);
    max-height: min(60vh, 24rem);
    overflow-y: auto;
    transition:
      opacity var(--dropdown-transition-duration) ease,
      scale var(--dropdown-transition-duration) ease,
      visibility 0s linear var(--dropdown-transition-duration),
      display 0s linear var(--dropdown-transition-duration);
    transition-behavior: allow-discrete;
  }

  & > :last-child[aria-hidden="false"] {
    display: inline-block;
    opacity: 1;
    scale: 1;
    visibility: visible;
    pointer-events: auto;
    transition:
      opacity var(--dropdown-transition-duration) ease,
      scale var(--dropdown-transition-duration) ease,
      visibility 0s linear 0s,
      display 0s linear 0s;
  }

  menu {
    list-style: none;
  }

  menu li {
    padding: var(--spacing-1) 0;

    & + li {
      border-top: 1px solid var(--color-border);
      margin-top: var(--spacing-2);
    }

    &:has(> hr) {
      border-top: none;
      margin-top: 0;
      padding: 0;

      & + li {
        border-top: none;
        margin-top: 0;
      }
    }

    & > hr {
      border: none;
      border-top: 3px solid var(--color-border);
      margin: var(--spacing-2) 0;
    }
  }

  menu a {
    display: flex;
    color: var(--color-text-primary);
    text-decoration: none;
    align-items: center;
    gap: var(--spacing-2);

    &.danger {
      color: var(--color-danger-600);
    }
  }

  &.align-right,
  &[data-align="right"],
  &[data-align="end"],
  &[data-dropdown-align="right"],
  &[data-dropdown-align="end"] {
    & > :last-child {
      left: auto;
      right: 0;
    }
  }

  &[data-mode="up"],
  &[data-dropdown-direction="up"] {
    & > :last-child {
      top: auto;
      bottom: 100%;
      margin-top: 0;
      margin-bottom: var(--spacing-2);
      transform-origin: bottom center;
    }
  }

  &[data-mode="down"],
  &[data-dropdown-direction="down"] {
    & > :last-child {
      top: 100%;
      bottom: auto;
      margin-top: var(--spacing-2);
      margin-bottom: 0;
      transform-origin: top center;
    }
  }

  &[data-mode="auto"] > :last-child {
    top: 100%;
    bottom: auto;
  }

  @media (prefers-reduced-motion: reduce) {
    & > :last-child {
      transition-duration: 0.01s !important;
    }
  }
}

@starting-style {
  nav[data-dropdown] > :last-child[aria-hidden="false"] {
    opacity: 0;
    scale: 0.95;
  }
}
`
    );
  }
  #generateLayoutUtilities() {
    const { layout = {} } = this.options.design;
    const breakpoints = layout.breakpoints || {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280
    };
    const gridSystem = layout.gridSystem || {};
    const columns = gridSystem.columns || [1, 2, 3, 4, 6];
    const autoFitBreakpoints = gridSystem.autoFitBreakpoints || {
      sm: "150px",
      md: "250px",
      lg: "350px",
      xl: "450px"
    };
    const layoutMaxWidths = this.#resolveLayoutMaxWidths(layout);
    const sections = [
      /*css*/
      `
/* ============================================================================
   Layout Utilities
   Modern grid and flex system for building responsive layouts
   ============================================================================ */

/* Container */
.container {
  display: block;
  width: 100%;
  max-width: ${layout.containerMaxWidth || "1400px"};
  margin: 0 auto;
  padding: ${layout.containerPadding || "var(--spacing-6)"};
}

/* Grid System */
.grid {
  display: grid;
  gap: var(--spacing-4);
}

`
    ];
    for (const col of columns) {
      sections.push(
        `.grid-cols-${col} { grid-template-columns: repeat(${col}, 1fr); }
`
      );
    }
    sections.push("\n/* Auto-fit grids (responsive) */\n");
    for (const [name, minWidth] of Object.entries(autoFitBreakpoints)) {
      sections.push(
        `.grid-auto-${name} { grid-template-columns: repeat(auto-fit, minmax(${minWidth}, 1fr)); }
`
      );
    }
    sections.push(
      /*css*/
      `
/* Gap utilities */
.gap-0 { gap: 0; } .gap-xs { gap: var(--spacing-1); } .gap-sm { gap: var(--spacing-2); } .gap-md { gap: var(--spacing-4); } .gap-lg { gap: var(--spacing-6); } .gap-xl { gap: var(--spacing-8); }

`
    );
    sections.push(
      /*css*/
      `
/* Flexbox System */
.flex { display: flex; }
.flex-wrap { flex-wrap: wrap; }
.flex-col { flex-direction: column; }
.flex-row { flex-direction: row; }
.grow { flex: 1 1 0%; }

/* Alignment utilities */
.items-start { align-items: flex-start; } .items-center { align-items: center; } .items-end { align-items: flex-end; } .items-stretch { align-items: stretch; } .items-baseline { align-items: baseline; }
.justify-start { justify-content: flex-start; } .justify-center { justify-content: center; } .justify-end { justify-content: flex-end; } .justify-between { justify-content: space-between; } .justify-around { justify-content: space-around; } .justify-evenly { justify-content: space-evenly; }
.text-left { text-align: left; } .text-center { text-align: center; } .text-right { text-align: right; }

/* Text overflow utility */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Required Legend Utility */
:where(.required-legend) {
  display: block;
  margin: var(--spacing-3) 0;
  color: var(--color-text-muted);
}

/* Max-width utilities */
.max-w-sm { max-width: var(--layout-max-width-sm, ${layoutMaxWidths.sm}); } .max-w-md { max-width: var(--layout-max-width-md, ${layoutMaxWidths.md}); } .max-w-lg { max-width: var(--layout-max-width-lg, ${layoutMaxWidths.lg}); } .max-w-xl { max-width: var(--layout-max-width-xl, ${layoutMaxWidths.xl}); }

/* Stack utilities - vertical rhythm for stacked elements */
[class^="stack-"], [class*=" stack-"] {
  display: flex;
  flex-direction: column;
}
.stack-xs { gap: var(--spacing-1); }
.stack-sm { gap: var(--spacing-2); }
.stack-md { gap: var(--spacing-4); }
.stack-lg { gap: var(--spacing-6); }
.stack-xl { gap: var(--spacing-8); }

/* Section spacing - for major content blocks */
.section { padding-block: var(--spacing-8); }
.section-lg { padding-block: var(--spacing-12); }

/* Responsive helpers */
@media (max-width: ${breakpoints.md - 1}px) {
  .mobile-stack { flex-direction: column; }
  .mobile-stack > * { width: 100%; }
}

/* ============================================================================
   Backdrop Utilities
   Reusable backdrop layer for modal components (dialogs, drawers, overlays)
   ============================================================================ */

/* Base backdrop class for modal overlays */
.backdrop {
  position: fixed;
  inset: 0;
  background: var(--backdrop-bg);
  backdrop-filter: var(--backdrop-filter);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
  z-index: var(--z-modal, 1040);

  &.active {
    opacity: var(--backdrop-opacity, 1);
    pointer-events: auto;
  }
}

/* Backdrop variants */
.backdrop-light { --backdrop-bg: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2)); --backdrop-brightness: 1.1; }
.backdrop-dark { --backdrop-bg: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)); --backdrop-brightness: 0.6; }
.backdrop-blur-sm { --backdrop-blur: 5px; } .backdrop-blur-md { --backdrop-blur: 10px; } .backdrop-blur-lg { --backdrop-blur: 20px; }
`
    );
    return sections.join("");
  }
  #generateMediaUtilities() {
    return (
      /*css*/
      `/* Media Element Utilities */

/* Gallery images */
.img-gallery {
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: var(--radius-sm);
}

/* Responsive images with different radius sizes */
.img-rounded-sm { border-radius: var(--radius-sm); } .img-rounded-md { border-radius: var(--radius-md); } .img-rounded-lg { border-radius: var(--radius-lg); } .img-rounded-xl { border-radius: var(--radius-xl); } .img-rounded-full { border-radius: var(--radius-full); }

/* Inline images */
.img-inline {
  display: inline;
  vertical-align: middle;
  border-radius: var(--radius-xs);
  margin: 0 var(--spacing-1);
  max-width: 60px;
  height: auto;
}

/* Video specific utilities */
.video-responsive {
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: var(--radius-md);
}

/* Figure utilities */
.figure-responsive {
  width: 100%;
  height: auto;
}

`
    );
  }
  #generateMediaQueries() {
    const { layout = {}, a11y = {} } = this.options.design;
    const breakpoints = layout.breakpoints || {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280
    };
    const minTouchTarget = a11y.minTouchTarget || enums.TouchTargetSizes.standard;
    return (
      /*css*/
      `/* Mobile-First Responsive Design */

/* Small devices (${breakpoints.sm}px and up) */
@media (min-width: ${breakpoints.sm}px) {
  .sm\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); } .sm\\:flex-row { flex-direction: row; } .sm\\:text-sm { font-size: var(--font-size-sm); } .sm\\:p-6 { padding: var(--spacing-6); } .sm\\:gap-6 { gap: var(--spacing-6); } .sm\\:hidden { display: none; } .sm\\:block { display: block; }
}

/* Medium devices (${breakpoints.md}px and up) */
@media (min-width: ${breakpoints.md}px) {
  .md\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); } .md\\:text-lg { font-size: var(--font-size-lg); } .md\\:p-8 { padding: var(--spacing-8); } .md\\:gap-8 { gap: var(--spacing-8); } .md\\:flex-row { flex-direction: row; } .md\\:w-1\\/2 { width: 50%; } .md\\:w-1\\/3 { width: 33.333333%; } .md\\:hidden { display: none; } .md\\:block { display: block; }
}

/* Large devices (${breakpoints.lg}px and up) */
@media (min-width: ${breakpoints.lg}px) {
  .lg\\:grid-cols-4 { grid-template-columns: repeat(4, 1fr); } .lg\\:text-xl { font-size: var(--font-size-xl); } .lg\\:p-12 { padding: var(--spacing-12); } .lg\\:gap-12 { gap: var(--spacing-12); } .lg\\:w-1\\/4 { width: 25%; } .lg\\:hidden { display: none; } .lg\\:block { display: block; }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  /* Touch devices - larger touch targets for interactive elements */
  button, a, select, textarea,
  input:not([type="radio"]):not([type="checkbox"]) {
    min-height: ${minTouchTarget}px;
    min-width: ${minTouchTarget}px;
  }
  
  /* Radio and checkbox inputs: keep reasonable size but ensure label tap area is large */
  input[type="radio"],
  input[type="checkbox"] {
    /* Keep native size - labels provide the touch target */
    min-height: unset;
    min-width: unset;
  }
  
  /* Ensure labels with radio/checkbox have adequate touch targets */
  /* Exclude button-style fieldsets which already have proper sizing */
  label:has(input[type="radio"]):not(fieldset.buttons label),
  label:has(input[type="checkbox"]):not(fieldset.buttons label),
  fieldset[role="radiogroup"]:not(.buttons) label,
  fieldset[role="group"]:not(.buttons) label {
    min-height: ${minTouchTarget}px;
    display: inline-flex;
    align-items: center;
    padding: var(--spacing-2) 0;
  }
  
  /* Disable hover effects
   on touch devices */
  .card {
    &:hover {
      box-shadow: var(--shadow-base);
    }
  }
  
  a {
    &:hover {
      color: var(--color-primary-600);
    }
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  :root {
    --color-primary-600: #0000ff;
    --color-primary-700: #0000cc;
  }
  
  button, input, textarea, select {
    border-width: 2px;
  }
}

/* Print styles */
@media print {
  *, *::before, *::after {
    background: transparent !important;
    color: black !important;
    box-shadow: none !important;
  }
  
  a, a:visited {
    text-decoration: underline;
  }
  
  button {
    display: none;
  }
  
  .mobile-hidden, .desktop-hidden {
    display: block !important;
  }
}

`
    );
  }
  // Utility methods for color manipulation
  #hexToHsl(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
  }
  #hslToHex(h, s, l) {
    h = h / 360;
    s = s / 100;
    l = l / 100;
    const hue2rgb = (p, q, t) => {
      if (t < 0)
        t += 1;
      if (t > 1)
        t -= 1;
      if (t < 1 / 6)
        return p + (q - p) * 6 * t;
      if (t < 1 / 2)
        return q;
      if (t < 2 / 3)
        return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = (c) => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }
  // Method to get current tokens (useful for debugging)
  getTokens() {
    return this.tokens;
  }
  // Method to export CSS (useful for build processes)
  exportCSS() {
    return this.layeredCSS;
  }
  // ========================================================================
  // LAYER SEPARATION ARCHITECTURE (Best Practices 2025)
  // ========================================================================
  /**
   * Generate separate CSS layers: tokens, primitives, components, utilities
   * Following the cascade layers pattern from the best practices document
   */
  #generateLayers() {
    this.#layers = {
      tokens: this.#generateTokensLayer(),
      primitives: this.#generatePrimitivesLayer(),
      components: this.#generateComponentsLayer(),
      utilities: this.#generateUtilitiesLayer()
    };
    if (this.options.debug) {
      this.options.log?.("debug", "[Generator] Layer sizes:", {
        tokens: `${(this.#layers.tokens.length / 1024).toFixed(2)} KB`,
        primitives: `${(this.#layers.primitives.length / 1024).toFixed(2)} KB`,
        components: `${(this.#layers.components.length / 1024).toFixed(2)} KB`,
        utilities: `${(this.#layers.utilities.length / 1024).toFixed(2)} KB`
      });
    }
  }
  #generateTokensLayer() {
    const {
      colors,
      spacing,
      radius,
      borderWidths,
      typography,
      shadows,
      layout,
      transitions,
      zIndex,
      icons
    } = this.tokens;
    const sections = [
      /*css*/
      `@layer tokens {
       :root {
          ${this.#generateColorVariables(colors)}
          ${this.#generateSpacingVariables(spacing)}
          ${this.#generateRadiusVariables(radius)}
          ${this.#generateBorderWidthVariables(borderWidths)}
          ${this.#generateTypographyVariables(typography)}
          ${this.#generateShadowVariables(shadows)}
          ${this.#generateLayoutVariables(layout)}
          ${this.#generateTransitionVariables(transitions)}
          ${this.#generateZIndexVariables(zIndex)}
          ${this.#generateIconVariables(icons)}
       }
       ${this.#generateDarkVariablesForTokensLayer(colors)}
    }`
    ];
    sections.push(
      `
/* Non-layered dark variables fallback (ensures attribute wins) */
`
    );
    sections.push(this.#generateDarkVariablesOnly(colors));
    return sections.join("");
  }
  #generatePrimitivesLayer() {
    const { advanced = {}, a11y = {}, layout = {} } = this.options.design;
    const tabSize = advanced.tabSize || enums.TabSizes.standard;
    const minTouchTarget = a11y.minTouchTarget || enums.TouchTargetSizes.standard;
    const breakpoints = layout.breakpoints || {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280
    };
    return (
      /*css*/
      `@layer primitives {
  /* Base HTML reset */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  :where(html) {
    interpolate-size: allow-keywords;
    font-family: var(--font-family-body);
    font-size: var(--font-size-base);
    line-height: var(--font-line-height-normal);
    color: var(--color-text-primary);
    background-color: var(--color-surface-base);
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    tab-size: ${tabSize};
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
  }

  :where(dialog){
    background-color: transparent;
    min-width: 320px;
    border: none;
  }

  :where(body) {
    margin: 0;
    padding: 0;
    scroll-behavior: smooth;
    min-height: 100vh;
    min-height: var(--layout-min-height, 100vh);
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }

  :where(body.drawer-open) {
    /* overflow: hidden; */
    /* scrollbar-gutter: stable; */
  }

  /* Button primitives */
  :where(button) {
    all: unset;
    box-sizing: border-box;
    font: inherit;
    color: var(--color-primary-contrast, white);
    background: var(--color-primary-600);
    padding: var(--spacing-2) var(--spacing-4);
    border: 0;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: opacity var(--transition-fast), background-color var(--transition-fast);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-2);
    font-weight: var(--font-weight-medium);
    line-height: 1.5;
    min-height: ${minTouchTarget}px;
    touch-action: manipulation;
    user-select: none;
  }

  :where(button):hover:not(:disabled) {
    opacity: 0.9;
    background-color: var(--color-primary-700);
  }

  :where(button):focus-visible {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }

  :where(button):disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  :where(button):active:not(:disabled) {
    transform: scale(0.98);
  }

  /* Input primitives */
  :where(input:not([type="radio"]):not([type="checkbox"]):not([type="range"]):not([type="color"])),
  :where(select),
  :where(textarea) {
    font: inherit;
    color: var(--color-text-primary);
    background: var(--color-input-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--spacing-2) var(--spacing-3);
    min-height: 40px;
    width: 100%;
    transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
    appearance: none;
  }

  :where(input):focus-visible,
  :where(select):focus-visible,
  :where(textarea):focus-visible {
    outline: none;
    border-color: var(--color-primary-500);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary-500) 30%, transparent);
  }

  :where(input):disabled,
  :where(select):disabled,
  :where(textarea):disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: var(--color-input-disabled-bg);
  }

  /* Harmonized placeholder styling */
  :where(input)::placeholder,
  :where(textarea)::placeholder,
  :where(pds-richtext)::placeholder {
    color: var(--color-text-muted);
    opacity: 1;
    font-weight: var(--font-weight-normal);
  }

  :where(textarea) {
    min-height: 80px;
    resize: vertical;
  }

  /* Link primitives */
  :where(a) {
    color: var(--color-primary-text, var(--color-primary-600));
    text-decoration: underline;
    text-underline-offset: 0.2em;
    transition: opacity var(--transition-fast);
  }

  :where(a):hover {
    opacity: 0.8;
  }

  :where(a):focus-visible {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }

  /* Form primitives */
  :where(label) {
    display: block;
    font-weight: var(--font-weight-medium);
    margin-bottom: var(--spacing-2);
    color: var(--color-text-primary);
    font-size: var(--font-size-sm);
  }

  /* Checkbox enhancement - visually hide native input but keep accessible
     Excludes button-style checkboxes in fieldsets and special containers */
  :where(label:not(fieldset label, .checkbox-container label, [data-toggle]):has(input[type="checkbox"]) input[type="checkbox"]) {
    position: absolute;
    opacity: 0;
    width: 1px;
    height: 1px;
  }

  /* Style label container for checkbox */
  :where(label:not(fieldset label, .checkbox-container label, [data-toggle]):has(input[type="checkbox"])) {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-2);
    cursor: pointer;
    user-select: none;
    position: relative;
    padding-left: calc(var(--spacing-5) + var(--spacing-3));
  }

  /* Custom checkbox box using PDS tokens - works with or without span wrapper */
  :where(label:not(fieldset label, .checkbox-container label, [data-toggle]):has(input[type="checkbox"])::before) {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: var(--spacing-5);
    height: var(--spacing-5);
    border: var(--border-width-md) solid var(--color-border);
    border-radius: var(--radius-sm);
    background: var(--color-surface-base);
    transition: all var(--transition-fast);
    flex-shrink: 0;
  }

  /* Checkmark */
  :where(label:not(fieldset label, .checkbox-container label, [data-toggle]):has(input[type="checkbox"]:checked)::after) {
    content: "";
    position: absolute;
    left: var(--spacing-2);
    top: 50%;
    transform: translateY(-60%) rotate(45deg);
    width: var(--spacing-1-5);
    height: var(--spacing-3);
    border: solid var(--color-primary-contrast, white);
    border-width: 0 2px 2px 0;
  }

  /* Checked state */
  :where(label:not(fieldset label, .checkbox-container label, [data-toggle]):has(input[type="checkbox"]:checked)::before) {
    background: var(--color-primary-600);
    border-color: var(--color-primary-600);
  }

  /* Focus styles for accessibility */
  :where(label:not(fieldset label, .checkbox-container label, [data-toggle]):has(input[type="checkbox"]:focus)::before) {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }

  /* Hover effects */
  :where(label:not(fieldset label, .checkbox-container label, [data-toggle]):has(input[type="checkbox"]:not(:disabled)):hover::before) {
    border-color: var(--color-primary-600);
    background: var(--color-surface-subtle);
  }

  :where(label:not(fieldset label, .checkbox-container label, [data-toggle]):has(input[type="checkbox"]:checked:not(:disabled)):hover::before) {
    background: var(--color-primary-700);
    border-color: var(--color-primary-700);
  }

  /* Disabled state */
  :where(label:not(fieldset label, .checkbox-container label, [data-toggle]):has(input[type="checkbox"]:disabled)) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  :where(fieldset) {
    border: none;
  }

  :where(legend) {
    display: block;
    font-weight: var(--font-weight-semibold);
    padding: 0;
    color: var(--color-text-primary);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    margin: 0 0 var(--spacing-3) 0;
    border: none;
    line-height: var(--font-line-height-tight);
    font-size: var(--font-size-lg);
    background: transparent; /* avoid browser default notch behavior */
    width: auto;
    box-sizing: border-box;
  }

  
  /* List primitives */
  :where(ul, ol) {
    padding-left: var(--spacing-6);
    margin: var(--spacing-3) 0;
  }

  :where(li) {
    margin: var(--spacing-1) 0;
  }

  /* Typography primitives */
  :where(h1, h2, h3, h4, h5, h6) {
    font-family: var(--font-family-headings);
    font-weight: var(--font-weight-bold);
    line-height: var(--font-line-height-tight);
    margin: var(--spacing-4) 0 var(--spacing-3) 0;
    color: var(--color-text-primary);
    word-wrap: break-word;
    hyphens: auto;
    overflow-wrap: break-word;
  }

  /* Mobile-first heading sizes */
  :where(h1) { font-size: var(--font-size-2xl); }
  :where(h2) { font-size: var(--font-size-xl); }
  :where(h3) { font-size: var(--font-size-lg); }
  :where(h4) { font-size: var(--font-size-base); }
  :where(h5) { font-size: var(--font-size-sm); }
  :where(h6) { font-size: var(--font-size-xs); }

  /* Scale up on larger screens */
  @media (min-width: ${breakpoints.sm}px) {
    :where(h1) { font-size: var(--font-size-3xl); }
    :where(h2) { font-size: var(--font-size-2xl); }
    :where(h3) { font-size: var(--font-size-xl); }
    :where(h4) { font-size: var(--font-size-lg); }
    :where(h5) { font-size: var(--font-size-base); }
    :where(h6) { font-size: var(--font-size-sm); }
  }

  :where(p) {
    margin: var(--spacing-3) 0;
    line-height: var(--font-line-height-relaxed);
    color: var(--color-text-primary);
  }

  /* Code primitives */
  :where(code) {
    font-family: var(--font-family-mono, monospace);
    font-size: 0.9em;
    background: var(--color-surface-muted);
    padding: 0.2em 0.4em;
    border-radius: var(--radius-sm);
    color: var(--color-text-primary);
  }

  :where(pre) {
    font-family: var(--font-family-mono, monospace);
    background: var(--color-surface-muted);
    padding: var(--spacing-4);
    border-radius: var(--radius-md);
    overflow-x: auto;
    margin: var(--spacing-4) 0;
  }

  :where(pre code) {
    background: none;
    padding: 0;
  }

  /* Media primitives */
  :where(img, video) {
    max-width: 100%;
    height: auto;
    border-radius: var(--radius-sm);
  }

  :where(figure) {
    margin: 0 0 var(--spacing-6) 0;
  }

  :where(figcaption) {
    margin-top: var(--spacing-3);
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    line-height: var(--font-line-height-relaxed);
  }

  
  :where([hidden]) {
    display: none !important;
  }
}

`
    );
  }
  #generateComponentsLayer() {
    return (
      /*css*/
      `@layer components {

${this.#generateSemanticHTMLStyles()}

${this.#generateFormStyles()}

${this.#generateCalloutStyles()}

${this.#generateBadgeStyles()}

${this.#generateDialogStyles()}

${this.#generateAccordionStyles()}

${this.#generateDropdownStyles()}

${this.#generateTabStripStyles()}

${this.#generateTableStyles()}

/* Card component */

.card {
  background: var(--color-surface-base);
  border-radius: var(--radius-md);
  padding: var(--spacing-4);
}

:where(.card:has(> header):has(> footer)) {
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: var(--spacing-4);
}

:where(.card > footer) {
  display: flex;
  justify-content: space-evenly;
}

:where(.card > header > :last-child:not(:first-child)) {
  color: var(--color-text-muted);
}

.card-elevated {
  background: var(--color-surface-elevated);
  box-shadow: var(--shadow-md);
}

.card-outlined,
.card-basic {
  background: var(--color-surface-base);
  border: 1px solid var(--color-border);
}

.card-interactive:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

${this.#generateScrollbarStyles()}

${this.#generateDarkModeComponentRules()}

}
`
    );
  }
  #generateUtilitiesLayer() {
    return (
      /*css*/
      `@layer utilities {

${this.#generateIconStyles()}

${this.#generateLayoutUtilities()}

/* Optional utilities/features controlled by config options */
/* - Body background mesh rule (applies one of the generated mesh vars) */
/* - Liquid glass utility class */
${this.#generateBodyBackgroundMeshRule()}
${this.#generateLiquidGlassUtility()}

${this.#generateBorderGradientUtilities()}

/* Surface utilities */

.surface {
  background-color: var(--color-surface-base);
}

.surface-subtle {
  background-color: var(--color-surface-subtle);
}

.surface-elevated {
  background-color: var(--color-surface-elevated);
}

.surface-sunken {
  background-color: var(--color-surface-sunken);
}

.surface-overlay {
  background-color: var(--color-surface-overlay);
}

/* Translucent semantic variants */
.surface-translucent {
  background-color: var(--color-surface-translucent-50);
}

.surface-translucent-25 {
  background-color: var(--color-surface-translucent-25);
}

.surface-translucent-50 {
  background-color: var(--color-surface-translucent-50);
}

.surface-translucent-75 {
  background-color: var(--color-surface-translucent-75);
}

/* Legacy utility retained for backwards compatibility (opinionated overlay) */
.surface-overlay {
  padding: var(--spacing-4);
  background-color: var(--color-surface-overlay);
  box-shadow: var(--shadow-lg);
  border-radius: var(--radius-md);
}


/* 
 * SURFACE-INVERSE: Local Theme Context Flip
 * 
 * We can't simply add .surface-inverse to the dark mode selector because that would
 * also apply the dark color PALETTE (grays, surfaces, etc.), which would override
 * --color-surface-inverse itself. Instead, we duplicate only the SEMANTIC tokens.
 * 
 * Light theme .surface-inverse \u2192 dark semantic tokens
 * Dark theme .surface-inverse  \u2192 light semantic tokens (flip back)
 */

/* Surface-inverse visual properties (shared, uses smart surface tokens) */
.surface-inverse {
  background-color: var(--color-surface-inverse);
  color: var(--surface-inverse-text);

  pds-icon {
    color: var(--surface-inverse-icon);
  }
  
  /* btn-primary stays vibrant in any context */
  & .btn-primary {
    background-color: var(--color-primary-500);
    border-color: var(--color-primary-500);
    color: var(--color-primary-contrast, #ffffff);
    
    &:hover {
      background-color: var(--color-primary-400);
      border-color: var(--color-primary-400);
    }
  }
}

/* Light-mode inverse: apply dark semantic tokens */
html:not([data-theme="dark"]) .surface-inverse {
  --color-text-primary: var(--color-gray-100);
  --color-text-secondary: var(--color-gray-300);
  --color-text-muted: var(--color-gray-400);
  --color-border: var(--color-gray-700);
  --color-input-bg: var(--color-gray-800);
  --color-input-disabled-bg: var(--color-gray-900);
  --color-input-disabled-text: var(--color-gray-600);
  --color-code-bg: var(--color-gray-800);
  --color-surface-muted: rgba(255, 255, 255, 0.08);
  
  & button:not(.btn-primary):not(.btn-outline):not(.btn-danger):not(.btn-success):not(.btn-warning),
  & .btn-secondary {
    background-color: rgba(255, 255, 255, 0.12);
    color: var(--surface-inverse-text);
    border-color: rgba(255, 255, 255, 0.25);
    
    &:hover { background-color: rgba(255, 255, 255, 0.2); }
    &:active { background-color: rgba(255, 255, 255, 0.28); }
  }
  
  & select {
    background-color: rgba(255, 255, 255, 0.1);
    color: var(--surface-inverse-text);
  }
  
  & a:not([class*="btn"]) {
    color: var(--color-primary-300, #7dd3fc);
  }
}

/* Dark-mode inverse: flip back to light semantic tokens */
html[data-theme="dark"] .surface-inverse {
  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-600);
  --color-text-muted: var(--color-gray-600);
  --color-border: var(--color-gray-300);
  --color-input-bg: var(--color-surface-base);
  --color-input-disabled-bg: var(--color-gray-50);
  --color-input-disabled-text: var(--color-gray-500);
  --color-code-bg: var(--color-gray-100);
  --color-surface-muted: var(--color-gray-100);
  
  & button:not(.btn-primary):not(.btn-outline):not(.btn-danger):not(.btn-success):not(.btn-warning),
  & .btn-secondary {
    background-color: rgba(0, 0, 0, 0.06);
    color: var(--surface-inverse-text);
    border-color: rgba(0, 0, 0, 0.15);
    
    &:hover { background-color: rgba(0, 0, 0, 0.1); }
    &:active { background-color: rgba(0, 0, 0, 0.15); }
  }
  
  & select {
    background-color: #ffffff;
    color: var(--surface-inverse-text);
  }
  
  & a:not([class*="btn"]) {
    color: var(--color-primary-600, #0284c7);
  }
}

/* Shadow utilities */
.shadow-sm {
  box-shadow: var(--shadow-sm);
}

.shadow-base, .shadow {
  box-shadow: var(--shadow-base);
}

.shadow-md {
  box-shadow: var(--shadow-md);
}

.shadow-lg {
  box-shadow: var(--shadow-lg);
}

.shadow-xl {
  box-shadow: var(--shadow-xl);
}

.shadow-inner {
  box-shadow: var(--shadow-inner);
}

.shadow-none {
  box-shadow: none;
}

.text-muted {
  color: var(--color-text-muted);
}


${this.#generateMediaUtilities()}

${this.#generateMediaQueries()}

}
`
    );
  }
  /**
   * Create constructable stylesheets for each layer
   */
  #createConstructableStylesheets() {
    this.#stylesheets = {
      tokens: new CSSStyleSheet(),
      primitives: new CSSStyleSheet(),
      components: new CSSStyleSheet(),
      utilities: new CSSStyleSheet()
    };
    this.#updateConstructableStylesheets();
  }
  #updateConstructableStylesheets() {
    this.#stylesheets.tokens.replaceSync(this.#layers.tokens);
    this.#stylesheets.primitives.replaceSync(this.#layers.primitives);
    this.#stylesheets.components.replaceSync(this.#layers.components);
    this.#stylesheets.utilities.replaceSync(this.#layers.utilities);
  }
  // /**
  //  * Create BLOB URLs for live injection
  //  */
  // #createBlobURLs() {
  //   this.#blobURLs = {};
  //   this.#recreateBlobURLs();
  // }
  // #recreateBlobURLs() {
  //   // Safety check
  //   if (!this.#layers) {
  //     this.options.log?.(
  //       "error",
  //       "[Generator] Cannot create BLOB URLs: layers not generated"
  //     );
  //     return;
  //   }
  //   // Revoke old URLs
  //   if (this.#blobURLs) {
  //     Object.values(this.#blobURLs).forEach((url) => {
  //       if (url) URL.revokeObjectURL(url);
  //     });
  //   }
  //   // Create new BLOB URLs for each layer
  //   this.#blobURLs.tokens = this.#createBlobURL(this.#layers.tokens);
  //   this.#blobURLs.primitives = this.#createBlobURL(this.#layers.primitives);
  //   this.#blobURLs.components = this.#createBlobURL(this.#layers.components);
  //   this.#blobURLs.utilities = this.#createBlobURL(this.#layers.utilities);
  //   // Combined styles (layers already have @layer wrappers, just concatenate)
  //   const combined = `${this.#layers.tokens}\n${this.#layers.primitives}\n${
  //     this.#layers.components
  //   }\n${this.#layers.utilities}`;
  //   this.#blobURLs.styles = this.#createBlobURL(combined);
  //   if (this.options.debug) {
  //     this.options.log?.(
  //       "debug",
  //       "[Generator] Created BLOB URL for combined styles:",
  //       this.#blobURLs.styles
  //     );
  //   }
  // }
  // #createBlobURL(css) {
  //   const blob = new Blob([css], { type: "text/css" });
  //   return URL.createObjectURL(blob);
  // }
  // ========================================================================
  // PUBLIC GETTERS FOR LAYER ACCESS
  // ========================================================================
  // CSS strings (raw)
  get tokensCSS() {
    return this.#layers?.tokens || "";
  }
  get primitivesCSS() {
    return this.#layers?.primitives || "";
  }
  get componentsCSS() {
    return this.#layers?.components || "";
  }
  get utilitiesCSS() {
    return this.#layers?.utilities || "";
  }
  get layeredCSS() {
    if (!this.#layers)
      return "";
    return `${this.#layers.tokens}
${this.#layers.primitives}
${this.#layers.components}
${this.#layers.utilities}`;
  }
  /**
   * Get a complete compiled representation of the design system state.
   * This provides structured access to all generated tokens, scales, layers, and metadata.
   * Linked to ontology and enums for introspection and tooling.
   *
   * @returns {Object} Compiled design system state with tokens, layers, metadata, and references
   */
  get compiled() {
    return {
      // Core token groups - the source data used to generate CSS
      tokens: {
        colors: this.tokens.colors,
        spacing: this.tokens.spacing,
        radius: this.tokens.radius,
        borderWidths: this.tokens.borderWidths,
        typography: this.tokens.typography,
        shadows: this.tokens.shadows,
        layout: this.tokens.layout,
        transitions: this.tokens.transitions,
        zIndex: this.tokens.zIndex,
        icons: this.tokens.icons
      },
      // Layer information - CSS content and metadata
      layers: {
        tokens: {
          css: this.#layers?.tokens || "",
          size: this.#layers?.tokens?.length || 0,
          sizeKB: ((this.#layers?.tokens?.length || 0) / 1024).toFixed(2)
        },
        primitives: {
          css: this.#layers?.primitives || "",
          size: this.#layers?.primitives?.length || 0,
          sizeKB: ((this.#layers?.primitives?.length || 0) / 1024).toFixed(2)
        },
        components: {
          css: this.#layers?.components || "",
          size: this.#layers?.components?.length || 0,
          sizeKB: ((this.#layers?.components?.length || 0) / 1024).toFixed(2)
        },
        utilities: {
          css: this.#layers?.utilities || "",
          size: this.#layers?.utilities?.length || 0,
          sizeKB: ((this.#layers?.utilities?.length || 0) / 1024).toFixed(2)
        },
        combined: {
          css: this.layeredCSS,
          size: this.layeredCSS?.length || 0,
          sizeKB: ((this.layeredCSS?.length || 0) / 1024).toFixed(2)
        }
      },
      // Configuration snapshot - what was used to generate this state
      config: {
        design: this.options.design || {},
        preset: this.options.preset || null,
        debug: this.options.debug || false
      },
      // Runtime capabilities and environment
      capabilities: {
        constructableStylesheets: typeof CSSStyleSheet !== "undefined",
        blobURLs: typeof Blob !== "undefined" && typeof URL !== "undefined",
        shadowDOM: typeof ShadowRoot !== "undefined"
      },
      // References to design system metadata
      references: {
        // Link to ontology for component/primitive definitions
        ontology: typeof ontology !== "undefined" ? ontology : null,
        // Link to enums for valid values
        enums: typeof enums !== "undefined" ? enums : null
      },
      // Computed metadata about the generated design system
      meta: {
        generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
        totalSize: (this.#layers?.tokens?.length || 0) + (this.#layers?.primitives?.length || 0) + (this.#layers?.components?.length || 0) + (this.#layers?.utilities?.length || 0),
        totalSizeKB: (((this.#layers?.tokens?.length || 0) + (this.#layers?.primitives?.length || 0) + (this.#layers?.components?.length || 0) + (this.#layers?.utilities?.length || 0)) / 1024).toFixed(2),
        layerCount: 4,
        tokenGroups: Object.keys(this.tokens).length
      },
      // Introspection helpers - methods to query the compiled state
      helpers: {
        /**
         * Get all color scales as a flat array
         */
        getColorScales: () => {
          const scales = [];
          const colors = this.tokens.colors;
          for (const [name, scale] of Object.entries(colors)) {
            if (typeof scale === "object" && scale !== null) {
              scales.push({ name, scale });
            }
          }
          return scales;
        },
        /**
         * Get a specific color scale by name
         */
        getColorScale: (name) => {
          return this.tokens.colors[name] || null;
        },
        /**
         * Get all spacing values as an array
         */
        getSpacingValues: () => {
          return Object.entries(this.tokens.spacing).map(([key, value]) => ({
            key,
            value
          }));
        },
        /**
         * Get typography configuration
         */
        getTypography: () => {
          return this.tokens.typography;
        },
        /**
         * Get the CSS for a specific layer
         */
        getLayerCSS: (layer) => {
          const validLayers = [
            "tokens",
            "primitives",
            "components",
            "utilities"
          ];
          if (!validLayers.includes(layer)) {
            throw new Error(
              `Invalid layer: ${layer}. Must be one of ${validLayers.join(
                ", "
              )}`
            );
          }
          return this.#layers?.[layer] || "";
        },
        /**
         * Check if a specific enum value is used in the current configuration
         */
        usesEnumValue: (enumGroup, value) => {
          const config = this.options.design || {};
          const configStr = JSON.stringify(config);
          return configStr.includes(value);
        }
      }
    };
  }
  // Constructable stylesheets (browser only)
  get tokensStylesheet() {
    return this.#stylesheets?.tokens;
  }
  get primitivesStylesheet() {
    return this.#stylesheets?.primitives;
  }
  get componentsStylesheet() {
    return this.#stylesheets?.components;
  }
  get utilitiesStylesheet() {
    return this.#stylesheets?.utilities;
  }
  // // BLOB URLs (browser only)
  // get tokensBlobURL() {
  //   return this.#blobURLs?.tokens;
  // }
  // get primitivesBlobURL() {
  //   return this.#blobURLs?.primitives;
  // }
  // get componentsBlobURL() {
  //   return this.#blobURLs?.components;
  // }
  // get utilitiesBlobURL() {
  //   return this.#blobURLs?.utilities;
  // }
  // get stylesBlobURL() {
  //   return this.#blobURLs?.styles;
  // }
  /**
   * Generate CSS module files for export
   * Returns object with filename => content
   */
  getCSSModules() {
    return {
      "pds-tokens.css.js": this.#generateCSSModule(
        "tokens",
        this.#layers.tokens
      ),
      "pds-primitives.css.js": this.#generateCSSModule(
        "primitives",
        this.#layers.primitives
      ),
      "pds-components.css.js": this.#generateCSSModule(
        "components",
        this.#layers.components
      ),
      "pds-utilities.css.js": this.#generateCSSModule(
        "utilities",
        this.#layers.utilities
      ),
      "pds-styles.css.js": this.#generateCSSModule("styles", this.layeredCSS)
    };
  }
  #generateCSSModule(name, css) {
    const escapedCSS = css.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
    return `// Pure Design System - ${name}
// Auto-generated - do not edit directly

export const ${name} = new CSSStyleSheet();
${name}.replaceSync(\`${escapedCSS}\`);

export const ${name}CSS = \`${escapedCSS}\`;
`;
  }
};

// src/js/pds-core/pds-registry.js
var PDSRegistry = class {
  constructor() {
    this._mode = "static";
    this._staticPaths = {
      tokens: "/assets/pds/styles/pds-tokens.css.js",
      primitives: "/assets/pds/styles/pds-primitives.css.js",
      components: "/assets/pds/styles/pds-components.css.js",
      utilities: "/assets/pds/styles/pds-utilities.css.js",
      styles: "/assets/pds/styles/pds-styles.css.js"
    };
  }
  /**
   * Switch to live mode
   */
  setLiveMode() {
    this._mode = "live";
  }
  /**
   * Switch to static mode with custom paths
   * Called by consumers who want to use static CSS files
   */
  setStaticMode(paths = {}) {
    this._mode = "static";
    this._staticPaths = { ...this._staticPaths, ...paths };
  }
  /**
   * Get stylesheet for adoption in shadow DOM
   * Returns CSSStyleSheet object (constructable stylesheet)
   */
  async getStylesheet(layer) {
    if (this._mode === "live") {
      return null;
    } else {
      try {
        const module = await import(
          /* @vite-ignore */
          this._staticPaths[layer]
        );
        return module[layer];
      } catch (error) {
        console.error(`[PDS Registry] Failed to load static ${layer}:`, error);
        console.error(`[PDS Registry] Looking for: ${this._staticPaths[layer]}`);
        console.error(`[PDS Registry] Make sure you've run 'npm run pds:build' and configured PDS.start() with the correct static.root path`);
        const fallback = new CSSStyleSheet();
        fallback.replaceSync("/* Failed to load " + layer + " */");
        return fallback;
      }
    }
  }
  /**
   * Get current mode
   */
  get mode() {
    return this._mode;
  }
  /**
   * Check if in live mode
   */
  get isLive() {
    return this._mode === "live";
  }
};
var registry = new PDSRegistry();

// src/js/pds-core/pds-runtime.js
function installRuntimeStyles(cssText) {
  try {
    if (typeof document === "undefined")
      return;
    if (typeof CSSStyleSheet !== "undefined" && "adoptedStyleSheets" in Document.prototype) {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(cssText);
      sheet._pds = true;
      const others = (document.adoptedStyleSheets || []).filter(
        (s) => s._pds !== true
      );
      document.adoptedStyleSheets = [...others, sheet];
      return;
    }
    const styleId = "pds-runtime-stylesheet";
    let el = document.getElementById(styleId);
    if (!el) {
      el = document.createElement("style");
      el.id = styleId;
      el.type = "text/css";
      const head = document.head || document.getElementsByTagName("head")[0];
      if (head)
        head.appendChild(el);
      else
        document.documentElement.appendChild(el);
    }
    el.textContent = cssText;
  } catch (err) {
    console.warn("installRuntimeStyles failed:", err);
  }
}
function applyStyles(generator) {
  const target = generator;
  if (!target || typeof target !== "object") {
    console.error(
      "[Runtime] applyStyles requires an explicit generator instance in live mode"
    );
    return;
  }
  const cssText = target.layeredCSS || target.css || "";
  if (!cssText) {
    target.options?.log?.(
      "warn",
      "[Runtime] No CSS available on generator to apply"
    );
    return;
  }
  installRuntimeStyles(cssText);
}
async function adoptPrimitives(shadowRoot, additionalSheets = [], generator = null) {
  try {
    const primitives = generator?.primitivesStylesheet ? generator.primitivesStylesheet : await registry.getStylesheet("primitives");
    shadowRoot.adoptedStyleSheets = [primitives, ...additionalSheets];
  } catch (error) {
    const componentName = shadowRoot.host?.tagName?.toLowerCase() || "unknown";
    console.error(
      `[PDS Adopter] <${componentName}> failed to adopt primitives:`,
      error
    );
    shadowRoot.adoptedStyleSheets = additionalSheets;
  }
}
async function adoptLayers(shadowRoot, layers = ["primitives"], additionalSheets = [], generator = null) {
  try {
    const stylesheets = await Promise.all(
      layers.map(async (layer) => {
        if (generator) {
          switch (layer) {
            case "tokens":
              return generator.tokensStylesheet;
            case "primitives":
              return generator.primitivesStylesheet;
            case "components":
              return generator.componentsStylesheet;
            case "utilities":
              return generator.utilitiesStylesheet;
            default:
              break;
          }
        }
        return registry.getStylesheet(layer);
      })
    );
    const validStylesheets = stylesheets.filter((sheet) => sheet !== null);
    shadowRoot.adoptedStyleSheets = [...validStylesheets, ...additionalSheets];
  } catch (error) {
    const componentName = shadowRoot.host?.tagName?.toLowerCase() || "unknown";
    console.error(
      `[PDS Adopter] <${componentName}> failed to adopt layers:`,
      error
    );
    shadowRoot.adoptedStyleSheets = additionalSheets;
  }
}

// src/js/pds-core/pds-enhancers.js
var enhancerDefinitions = [
  { selector: ".accordion" },
  { selector: "nav[data-dropdown]" },
  { selector: "label[data-toggle]" },
  { selector: 'input[type="range"]' },
  { selector: "form[data-required]" },
  { selector: "fieldset[role=group][data-open]" },
  { selector: "[data-clip]" },
  { selector: "button, a[class*='btn-']" }
];
function enhanceAccordion(elem) {
  if (elem.dataset.enhancedAccordion)
    return;
  elem.dataset.enhancedAccordion = "true";
  elem.addEventListener("toggle", (event) => {
    if (event.target.open && event.target.parentElement === elem) {
      elem.querySelectorAll(":scope > details[open]").forEach((details) => {
        if (details !== event.target) {
          details.open = false;
        }
      });
    }
  }, true);
}
function enhanceDropdown(elem) {
  if (elem.dataset.enhancedDropdown)
    return;
  elem.dataset.enhancedDropdown = "true";
  const menu = elem.lastElementChild;
  if (!menu)
    return;
  const trigger = elem.querySelector("[data-dropdown-toggle]") || elem.querySelector("button");
  if (trigger && !trigger.hasAttribute("type")) {
    trigger.setAttribute("type", "button");
  }
  if (!menu.id) {
    menu.id = `dropdown-${Math.random().toString(36).slice(2, 9)}`;
  }
  const isMenu = menu.tagName?.toLowerCase() === "menu";
  if (isMenu && !menu.hasAttribute("role")) {
    menu.setAttribute("role", "menu");
  }
  if (!menu.hasAttribute("aria-hidden")) {
    menu.setAttribute("aria-hidden", "true");
  }
  if (trigger) {
    trigger.setAttribute("aria-haspopup", "true");
    trigger.setAttribute("aria-controls", menu.id);
    trigger.setAttribute("aria-expanded", "false");
  }
  const resolveDirection = () => {
    const mode = (elem.getAttribute("data-mode") || "auto").toLowerCase();
    if (mode === "up" || mode === "down")
      return mode;
    const rect = elem.getBoundingClientRect();
    const spaceBelow = Math.max(0, window.innerHeight - rect.bottom);
    const spaceAbove = Math.max(0, rect.top);
    return spaceAbove > spaceBelow ? "up" : "down";
  };
  const openMenu = () => {
    elem.dataset.dropdownDirection = resolveDirection();
    menu.setAttribute("aria-hidden", "false");
    trigger?.setAttribute("aria-expanded", "true");
  };
  const closeMenu = () => {
    menu.setAttribute("aria-hidden", "true");
    trigger?.setAttribute("aria-expanded", "false");
  };
  const toggleMenu = () => {
    if (menu.getAttribute("aria-hidden") === "false") {
      closeMenu();
    } else {
      openMenu();
    }
  };
  trigger?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleMenu();
  });
  document.addEventListener("click", (event) => {
    if (!elem.contains(event.target)) {
      closeMenu();
    }
  });
  elem.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      trigger?.focus();
    }
  });
  elem.addEventListener("focusout", (event) => {
    if (!event.relatedTarget || !elem.contains(event.relatedTarget)) {
      closeMenu();
    }
  });
}
function enhanceToggle(elem) {
  if (elem.dataset.enhancedToggle)
    return;
  elem.dataset.enhancedToggle = "true";
  const checkbox = elem.querySelector('input[type="checkbox"]');
  if (!checkbox)
    return;
  if (!elem.hasAttribute("tabindex")) {
    elem.setAttribute("tabindex", "0");
  }
  elem.setAttribute("role", "switch");
  elem.setAttribute("aria-checked", checkbox.checked ? "true" : "false");
  const toggleSwitch = document.createElement("span");
  toggleSwitch.className = "toggle-switch";
  toggleSwitch.setAttribute("role", "presentation");
  toggleSwitch.setAttribute("aria-hidden", "true");
  const knob = document.createElement("span");
  knob.className = "toggle-knob";
  toggleSwitch.appendChild(knob);
  elem.insertBefore(toggleSwitch, checkbox.nextSibling);
  const updateAria = () => {
    elem.setAttribute("aria-checked", checkbox.checked ? "true" : "false");
  };
  const toggle = () => {
    if (checkbox.disabled)
      return;
    checkbox.checked = !checkbox.checked;
    updateAria();
    checkbox.dispatchEvent(new Event("change", { bubbles: true }));
  };
  elem.addEventListener("click", (event) => {
    event.preventDefault();
    toggle();
  });
  elem.addEventListener("keydown", (event) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      toggle();
    }
  });
  checkbox.addEventListener("change", updateAria);
}
function enhanceRange(elem) {
  if (elem.dataset.enhancedRange)
    return;
  const label = elem.closest("label");
  const hasRangeOutputClass = label?.classList.contains("range-output");
  const inputId = elem.id || `range-${Math.random().toString(36).substring(2, 11)}`;
  const outputId = `${inputId}-output`;
  elem.id = inputId;
  if (hasRangeOutputClass) {
    const labelSpan = label.querySelector("span");
    if (labelSpan && !labelSpan.classList.contains("range-output-wrapper")) {
      const wrapper = document.createElement("span");
      wrapper.className = "range-output-wrapper";
      wrapper.style.display = "flex";
      wrapper.style.justifyContent = "space-between";
      wrapper.style.alignItems = "center";
      const textSpan = document.createElement("span");
      textSpan.textContent = labelSpan.textContent;
      wrapper.appendChild(textSpan);
      const output = document.createElement("output");
      output.id = outputId;
      output.setAttribute("for", inputId);
      output.style.color = "var(--surface-text-secondary, var(--color-text-secondary))";
      output.style.fontSize = "0.875rem";
      output.textContent = elem.value;
      wrapper.appendChild(output);
      labelSpan.textContent = "";
      labelSpan.appendChild(wrapper);
      const updateOutput = () => {
        output.textContent = elem.value;
      };
      elem.addEventListener("input", updateOutput);
    }
  } else {
    let container = elem.closest(".range-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "range-container";
      elem.parentNode?.insertBefore(container, elem);
      container.appendChild(elem);
    }
    container.style.position = "relative";
    const bubble = document.createElement("output");
    bubble.id = outputId;
    bubble.setAttribute("for", inputId);
    bubble.className = "range-bubble";
    bubble.setAttribute("aria-live", "polite");
    container.appendChild(bubble);
    const updateBubble = () => {
      const min = parseFloat(elem.min) || 0;
      const max = parseFloat(elem.max) || 100;
      const value = parseFloat(elem.value);
      const pct = (value - min) / (max - min);
      bubble.style.left = `calc(${pct * 100}% )`;
      bubble.textContent = String(value);
    };
    const show = () => bubble.classList.add("visible");
    const hide = () => bubble.classList.remove("visible");
    elem.addEventListener("input", updateBubble);
    elem.addEventListener("pointerdown", show);
    elem.addEventListener("pointerup", hide);
    elem.addEventListener("pointerleave", hide);
    elem.addEventListener("focus", show);
    elem.addEventListener("blur", hide);
    updateBubble();
  }
  elem.dataset.enhancedRange = "1";
}
function enhanceRequired(elem) {
  if (elem.dataset.enhancedRequired)
    return;
  elem.dataset.enhancedRequired = "true";
  const enhanceRequiredField = (input) => {
    const label = input.closest("label");
    if (!label)
      return;
    if (label.querySelector(".required-asterisk"))
      return;
    const asterisk = document.createElement("span");
    asterisk.classList.add("required-asterisk");
    asterisk.textContent = "*";
    asterisk.style.marginLeft = "4px";
    label.querySelector("span").appendChild(asterisk);
    const form = input.closest("form");
    if (form && !form.querySelector(".required-legend")) {
      const legend = document.createElement("small");
      legend.classList.add("required-legend");
      legend.textContent = "* Required fields";
      form.insertBefore(
        legend,
        form.querySelector(".form-actions") || form.lastElementChild
      );
    }
  };
  elem.querySelectorAll("[required]").forEach((input) => {
    enhanceRequiredField(input);
  });
}
function enhanceOpenGroup(elem) {
  if (elem.dataset.enhancedOpenGroup)
    return;
  elem.dataset.enhancedOpenGroup = "true";
  elem.classList.add("flex", "flex-wrap", "buttons");
  const addInput = document.createElement("input");
  addInput.type = "text";
  addInput.placeholder = "Add item...";
  addInput.classList.add("input-text", "input-sm");
  addInput.style.width = "auto";
  const firstInput = elem.querySelector(
    'input[type="radio"], input[type="checkbox"]'
  );
  elem.appendChild(addInput);
  addInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === "Tab") {
      const value = addInput.value.trim();
      if (value) {
        event.preventDefault();
        const type = firstInput.type === "radio" ? "radio" : "checkbox";
        const id = `open-group-${Math.random().toString(36).substring(2, 11)}`;
        const label = document.createElement("label");
        const span = document.createElement("span");
        span.setAttribute("data-label", "");
        span.textContent = value;
        const input = document.createElement("input");
        input.type = type;
        input.name = firstInput.name || elem.getAttribute("data-name") || "open-group";
        input.value = value;
        input.id = id;
        label.appendChild(span);
        label.appendChild(input);
        elem.insertBefore(label, addInput);
        addInput.value = "";
      }
    } else if (event.key === "Backspace" && addInput.value === "") {
      event.preventDefault();
      const labels = elem.querySelectorAll("label");
      if (labels.length > 0) {
        const lastLabel = labels[labels.length - 1];
        lastLabel.remove();
      }
    }
  });
}
function enhanceClip(elem) {
  if (elem.dataset.enhancedClip)
    return;
  elem.dataset.enhancedClip = "true";
  if (!elem.hasAttribute("tabindex")) {
    elem.setAttribute("tabindex", "0");
  }
  if (!elem.hasAttribute("role")) {
    elem.setAttribute("role", "button");
  }
  const syncAria = () => {
    const isOpen = elem.getAttribute("data-clip-open") === "true";
    elem.setAttribute("aria-expanded", isOpen ? "true" : "false");
  };
  const toggleOpen = () => {
    const isOpen = elem.getAttribute("data-clip-open") === "true";
    elem.setAttribute("data-clip-open", isOpen ? "false" : "true");
    syncAria();
  };
  elem.addEventListener("click", (event) => {
    if (event.defaultPrevented)
      return;
    toggleOpen();
  });
  elem.addEventListener("keydown", (event) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      toggleOpen();
    }
  });
  syncAria();
}
function enhanceButtonWorking(elem) {
  if (elem.dataset.enhancedBtnWorking)
    return;
  elem.dataset.enhancedBtnWorking = "true";
  let originalIcon = null;
  let addedIcon = false;
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === "class") {
        const hasWorking = elem.classList.contains("btn-working");
        const icon = elem.querySelector("pds-icon");
        if (hasWorking) {
          if (icon) {
            if (!originalIcon) {
              originalIcon = icon.getAttribute("icon");
            }
            icon.setAttribute("icon", "circle-notch");
          } else {
            const newIcon = document.createElement("pds-icon");
            newIcon.setAttribute("icon", "circle-notch");
            newIcon.setAttribute("size", "sm");
            elem.insertBefore(newIcon, elem.firstChild);
            addedIcon = true;
          }
        } else if (mutation.oldValue?.includes("btn-working")) {
          if (icon) {
            if (addedIcon) {
              icon.remove();
              addedIcon = false;
            } else if (originalIcon) {
              icon.setAttribute("icon", originalIcon);
              originalIcon = null;
            }
          }
        }
      }
    });
  });
  observer.observe(elem, {
    attributes: true,
    attributeFilter: ["class"],
    attributeOldValue: true
  });
}
var enhancerRunners = /* @__PURE__ */ new Map([
  [".accordion", enhanceAccordion],
  ["nav[data-dropdown]", enhanceDropdown],
  ["label[data-toggle]", enhanceToggle],
  ['input[type="range"]', enhanceRange],
  ["form[data-required]", enhanceRequired],
  ["fieldset[role=group][data-open]", enhanceOpenGroup],
  ["[data-clip]", enhanceClip],
  ["button, a[class*='btn-']", enhanceButtonWorking]
]);
var defaultPDSEnhancers = enhancerDefinitions.map((meta) => ({
  ...meta,
  run: enhancerRunners.get(meta.selector) || (() => {
  })
}));

// src/js/pds-core/pds-enhancers-meta.js
var defaultPDSEnhancerMetadata = [
  {
    selector: ".accordion",
    description: "Ensures only one <details> element can be open at a time within the accordion.",
    demoHtml: `
      <div class="accordion">
        <details>
          <summary>Section 1</summary>
          <p>Content for section 1</p>
        </details>
        <details>
          <summary>Section 2</summary>
          <p>Content for section 2</p>
        </details>
        <details>
          <summary>Section 3</summary>
          <p>Content for section 3</p>
        </details>
      </div>
    `.trim()
  },
  {
    selector: "nav[data-dropdown]",
    description: "Enhances a nav element with data-dropdown to toggle its last child as a dropdown panel (menu, card, form, etc.).",
    demoHtml: `
      <nav data-dropdown>
        <button class="btn-primary">Menu</button>
        <div class="card surface-overlay stack-sm">
          <strong>Quick actions</strong>
          <div class="flex gap-sm">
            <button class="btn-primary btn-sm">Ship now</button>
            <button class="btn-outline btn-sm">Schedule</button>
          </div>
        </div>
      </nav>
    `.trim()
  },
  {
    selector: "label[data-toggle]",
    description: "Creates a toggle switch element from a checkbox.",
    demoHtml: `
      <label data-toggle>
        <input type="checkbox">
        <span data-label>Enable notifications</span>
      </label>
    `.trim()
  },
  {
    selector: 'input[type="range"]',
    description: "Enhances range inputs with an attached <output>.",
    demoHtml: `
      <label class="range-output">
        <span data-label>Volume</span>
        <input type="range" min="0" max="100" value="40">
      </label>
    `.trim()
  },
  {
    selector: "form[data-required]",
    description: "Enhances required form fields using an asterisk in the label.",
    demoHtml: `
      <form data-required action="#" method="post">
      <label>
        <span>Field Label</span>
        <input type="text" required>
      </label>
        <nav class="form-actions">
          <button type="submit" class="btn-primary">Submit</button>
        </nav>
      </form>
    `.trim()
  },
  {
    selector: "fieldset[role=group][data-open]",
    description: "Enhances a checkbox/radio group to be open (have a way to add and remove items).",
    demoHtml: `
      <fieldset role="group" data-open>
        <label>
          <span data-label>Test</span>
          <input value="lala" name="test1" type="radio" />
        </label>
      </fieldset>
    `.trim()
  },
  {
    selector: "[data-clip]",
    description: "Enables click/keyboard toggling for line-clamped content blocks.",
    demoHtml: `
      <div data-clip="2" data-clip-more="more...">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse.</p>
      </div>
    `.trim()
  },
  {
    selector: "button, a[class*='btn-']",
    description: "Automatically manages spinner icon for buttons with .btn-working class",
    demoHtml: `
      <button class="btn-primary btn-working">
        <span>Saving</span>
      </button>
    `.trim()
  }
];

// src/js/pds-core/pds-paths.js
var DEFAULT_SEGMENT = "pds";
var URL_PATTERN = /^([a-z][a-z0-9+\-.]*:)?\/\//i;
var DRIVE_PATTERN = /^[a-z]:/i;
function ensureTrailingSlash(value = "") {
  return value.endsWith("/") ? value : `${value}/`;
}
function appendSegmentIfMissing(input = "", segment = DEFAULT_SEGMENT) {
  const trimmed = input.replace(/\/+$/, "");
  const regex = new RegExp(`(?:^|/)${segment}$`, "i");
  if (regex.test(trimmed)) {
    return trimmed;
  }
  return `${trimmed}/${segment}`;
}
function stripLeadingDotSlash(value) {
  return value.replace(/^\.\/+/, "");
}
function stripDriveLetter(value) {
  if (DRIVE_PATTERN.test(value)) {
    return value.replace(DRIVE_PATTERN, "").replace(/^\/+/, "");
  }
  return value;
}
function stripPublicPrefix(value) {
  if (value.startsWith("public/")) {
    return value.substring("public/".length);
  }
  return value;
}
function resolvePublicAssetURL(config, options = {}) {
  const segment = options.segment || DEFAULT_SEGMENT;
  const defaultRoot = options.defaultRoot || `/assets/${segment}/`;
  const candidate = config?.public && config.public?.root || config?.static && config.static?.root || null;
  if (!candidate || typeof candidate !== "string") {
    return ensureTrailingSlash(defaultRoot);
  }
  let normalized = candidate.trim();
  if (!normalized) {
    return ensureTrailingSlash(defaultRoot);
  }
  normalized = normalized.replace(/\\/g, "/");
  normalized = appendSegmentIfMissing(normalized, segment);
  normalized = ensureTrailingSlash(normalized);
  if (URL_PATTERN.test(normalized)) {
    return normalized;
  }
  normalized = stripLeadingDotSlash(normalized);
  normalized = stripDriveLetter(normalized);
  if (normalized.startsWith("/")) {
    return ensureTrailingSlash(normalized);
  }
  normalized = stripPublicPrefix(normalized);
  if (!normalized.startsWith("/")) {
    normalized = `/${normalized}`;
  }
  normalized = normalized.replace(
    /\/+/g,
    (match, offset) => offset === 0 ? match : "/"
  );
  return ensureTrailingSlash(normalized);
}

// src/js/common/font-loader.js
function isFontAvailable(fontName) {
  const cleanName = fontName.replace(/['"]/g, "").trim();
  const systemFonts = [
    "system-ui",
    "-apple-system",
    "sans-serif",
    "serif",
    "monospace",
    "cursive",
    "fantasy",
    "ui-sans-serif",
    "ui-serif",
    "ui-monospace",
    "ui-rounded"
  ];
  if (systemFonts.includes(cleanName.toLowerCase())) {
    return true;
  }
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context)
    return false;
  const testString = "mmmmmmmmmmlli";
  const testSize = "72px";
  const baselineFont = "monospace";
  context.font = `${testSize} ${baselineFont}`;
  const baselineWidth = context.measureText(testString).width;
  context.font = `${testSize} "${cleanName}", ${baselineFont}`;
  const testWidth = context.measureText(testString).width;
  return baselineWidth !== testWidth;
}
function extractPrimaryFont(fontFamily) {
  if (!fontFamily)
    return null;
  const fonts = fontFamily.split(",").map((f) => f.trim());
  const primaryFont = fonts[0];
  return primaryFont.replace(/['"]/g, "").trim();
}
async function loadGoogleFont(fontFamily, options = {}) {
  if (!fontFamily) {
    return Promise.resolve();
  }
  const {
    weights = [400, 500, 600, 700],
    italic = false
  } = options;
  const primaryFont = extractPrimaryFont(fontFamily);
  if (!primaryFont) {
    return Promise.resolve();
  }
  if (isFontAvailable(primaryFont)) {
    return Promise.resolve();
  }
  const encodedFont = encodeURIComponent(primaryFont);
  const existingLink = document.querySelector(
    `link[href*="fonts.googleapis.com"][href*="${encodedFont}"]`
  );
  if (existingLink) {
    console.log(`Font "${primaryFont}" is already loading or loaded`);
    return Promise.resolve();
  }
  console.log(`Loading font "${primaryFont}" from Google Fonts...`);
  return new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    const weightsParam = italic ? `ital,wght@0,${weights.join(";0,")};1,${weights.join(";1,")}` : `wght@${weights.join(";")}`;
    link.href = `https://fonts.googleapis.com/css2?family=${encodedFont}:${weightsParam}&display=swap`;
    link.setAttribute("data-font-loader", primaryFont);
    link.onload = () => {
      console.log(`Successfully loaded font "${primaryFont}"`);
      resolve();
    };
    link.onerror = () => {
      console.warn(`Failed to load font "${primaryFont}" from Google Fonts`);
      reject(new Error(`Failed to load font: ${primaryFont}`));
    };
    document.head.appendChild(link);
    setTimeout(() => {
      if (!isFontAvailable(primaryFont)) {
        console.warn(`Font "${primaryFont}" did not load within timeout`);
      }
      resolve();
    }, 5e3);
  });
}
async function loadTypographyFonts(typographyConfig) {
  if (!typographyConfig) {
    return Promise.resolve();
  }
  const fontFamilies = /* @__PURE__ */ new Set();
  if (typographyConfig.fontFamilyHeadings) {
    fontFamilies.add(typographyConfig.fontFamilyHeadings);
  }
  if (typographyConfig.fontFamilyBody) {
    fontFamilies.add(typographyConfig.fontFamilyBody);
  }
  if (typographyConfig.fontFamilyMono) {
    fontFamilies.add(typographyConfig.fontFamilyMono);
  }
  const loadPromises = Array.from(fontFamilies).map(
    (fontFamily) => loadGoogleFont(fontFamily).catch((err) => {
      console.warn(`Could not load font: ${fontFamily}`, err);
    })
  );
  await Promise.all(loadPromises);
}

// src/js/pds-core/pds-start-helpers.js
var __ABSOLUTE_URL_PATTERN__ = /^[a-z][a-z0-9+\-.]*:\/\//i;
var __MODULE_URL__ = (() => {
  try {
    return import.meta.url;
  } catch (e) {
    return void 0;
  }
})();
var ensureTrailingSlash2 = (value) => typeof value === "string" && value.length && !value.endsWith("/") ? `${value}/` : value;
function ensureAbsoluteAssetURL(value, options = {}) {
  if (!value || __ABSOLUTE_URL_PATTERN__.test(value)) {
    return value;
  }
  const { preferModule = true } = options;
  const tryModule = () => {
    if (!__MODULE_URL__)
      return null;
    try {
      return new URL(value, __MODULE_URL__).href;
    } catch (e) {
      return null;
    }
  };
  const tryWindow = () => {
    if (typeof window === "undefined" || !window.location?.origin) {
      return null;
    }
    try {
      return new URL(value, window.location.origin).href;
    } catch (e) {
      return null;
    }
  };
  const resolved = preferModule ? tryModule() || tryWindow() : tryWindow() || tryModule();
  return resolved || value;
}
var __MODULE_DEFAULT_ASSET_ROOT__ = (() => {
  if (!__MODULE_URL__)
    return void 0;
  try {
    const parsed = new URL(__MODULE_URL__);
    if (/\/public\/assets\/js\//.test(parsed.pathname)) {
      return new URL("../pds/", __MODULE_URL__).href;
    }
  } catch (e) {
    return void 0;
  }
  return void 0;
})();
var __foucListenerAttached = false;
function attachFoucListener(PDS2) {
  if (__foucListenerAttached || typeof document === "undefined")
    return;
  __foucListenerAttached = true;
  PDS2.addEventListener("pds:ready", (event) => {
    const mode = event.detail?.mode;
    if (mode) {
      document.documentElement.classList.add(`pds-${mode}`, "pds-ready");
    }
  });
}
function __deepMerge(target = {}, source = {}) {
  if (!source || typeof source !== "object")
    return target;
  const out = Array.isArray(target) ? [...target] : { ...target };
  for (const [key, value] of Object.entries(source)) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      out[key] = __deepMerge(
        out[key] && typeof out[key] === "object" ? out[key] : {},
        value
      );
    } else {
      out[key] = value;
    }
  }
  return out;
}
function __slugify(str = "") {
  return String(str).toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function stripFunctions(obj) {
  if (obj === null || obj === void 0)
    return obj;
  if (typeof obj === "function")
    return void 0;
  if (typeof obj !== "object")
    return obj;
  if (Array.isArray(obj)) {
    return obj.map((item) => stripFunctions(item)).filter((item) => item !== void 0);
  }
  const result = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (typeof value !== "function") {
        const stripped = stripFunctions(value);
        if (stripped !== void 0) {
          result[key] = stripped;
        }
      }
    }
  }
  return result;
}
function normalizeInitConfig(inputConfig = {}, options = {}, { presets: presets2, defaultLog: defaultLog2 }) {
  const hasDesignKeys = typeof inputConfig === "object" && ("colors" in inputConfig || "typography" in inputConfig || "spatialRhythm" in inputConfig || "shape" in inputConfig || "behavior" in inputConfig || "layout" in inputConfig || "advanced" in inputConfig || "a11y" in inputConfig || "components" in inputConfig || "icons" in inputConfig);
  let inlineEnhancers = inputConfig && inputConfig.enhancers;
  if (inlineEnhancers && !Array.isArray(inlineEnhancers)) {
    inlineEnhancers = Object.values(inlineEnhancers);
  }
  const enhancers = inlineEnhancers ?? options.enhancers ?? [];
  const presetId = inputConfig && inputConfig.preset;
  const designOverrides = inputConfig && inputConfig.design;
  const iconOverrides = inputConfig && inputConfig.icons && typeof inputConfig.icons === "object" ? inputConfig.icons : null;
  const hasNewShape = "preset" in (inputConfig || {}) || "design" in (inputConfig || {}) || "enhancers" in (inputConfig || {});
  let generatorConfig;
  let presetInfo = null;
  if (hasNewShape) {
    const effectivePreset = String(presetId || "default").toLowerCase();
    const found = presets2?.[effectivePreset] || Object.values(presets2 || {}).find(
      (p) => __slugify(p.name) === effectivePreset || String(p.name || "").toLowerCase() === effectivePreset
    );
    if (!found)
      throw new Error(`PDS preset not found: "${presetId || "default"}"`);
    presetInfo = {
      id: found.id || __slugify(found.name),
      name: found.name || found.id || String(effectivePreset)
    };
    let mergedDesign = structuredClone(found);
    if (designOverrides && typeof designOverrides === "object" || iconOverrides) {
      const cloneableDesign = designOverrides ? stripFunctions(designOverrides) : {};
      const cloneableIcons = iconOverrides ? stripFunctions(iconOverrides) : null;
      const mergedOverrides = cloneableIcons ? __deepMerge(cloneableDesign, { icons: cloneableIcons }) : cloneableDesign;
      mergedDesign = __deepMerge(
        mergedDesign,
        structuredClone(mergedOverrides)
      );
    }
    const {
      mode,
      autoDefine,
      applyGlobalStyles,
      manageTheme,
      themeStorageKey,
      preloadStyles,
      criticalLayers,
      managerURL,
      manager,
      preset: _preset,
      design: _design,
      enhancers: _enhancers,
      log: userLog,
      ...otherProps
    } = inputConfig;
    generatorConfig = {
      ...otherProps,
      design: mergedDesign,
      preset: presetInfo.name,
      log: userLog || defaultLog2
    };
  } else if (hasDesignKeys) {
    const { log: userLog, ...designConfig } = inputConfig;
    generatorConfig = {
      design: structuredClone(designConfig),
      log: userLog || defaultLog2
    };
  } else {
    const foundDefault = presets2?.["default"] || Object.values(presets2 || {}).find((p) => __slugify(p.name) === "default");
    if (!foundDefault)
      throw new Error("PDS default preset not available");
    presetInfo = {
      id: foundDefault.id || "default",
      name: foundDefault.name || "Default"
    };
    generatorConfig = {
      design: structuredClone(foundDefault),
      preset: presetInfo.name,
      log: defaultLog2
    };
  }
  return { generatorConfig, enhancers, presetInfo };
}
function resolveThemeAndApply({ manageTheme, themeStorageKey, applyResolvedTheme, setupSystemListenerIfNeeded }) {
  let resolvedTheme = "light";
  let storedTheme = null;
  if (manageTheme && typeof window !== "undefined") {
    try {
      storedTheme = localStorage.getItem(themeStorageKey) || null;
    } catch (e) {
      storedTheme = null;
    }
    try {
      applyResolvedTheme?.(storedTheme);
      setupSystemListenerIfNeeded?.(storedTheme);
    } catch (e) {
    }
    if (storedTheme) {
      if (storedTheme === "system") {
        const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        resolvedTheme = prefersDark ? "dark" : "light";
      } else {
        resolvedTheme = storedTheme;
      }
    } else {
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      resolvedTheme = prefersDark ? "dark" : "light";
    }
  }
  return { resolvedTheme, storedTheme };
}
function resolveRuntimeAssetRoot(config, { resolvePublicAssetURL: resolvePublicAssetURL2 }) {
  const hasCustomRoot = Boolean(config?.public?.root || config?.static?.root);
  let candidate = resolvePublicAssetURL2(config);
  if (!hasCustomRoot && __MODULE_DEFAULT_ASSET_ROOT__) {
    candidate = __MODULE_DEFAULT_ASSET_ROOT__;
  }
  return ensureTrailingSlash2(ensureAbsoluteAssetURL(candidate));
}
async function setupAutoDefinerAndEnhancers(options, { baseEnhancers = [] } = {}) {
  const {
    autoDefineBaseURL = "/auto-define/",
    autoDefinePreload = [],
    autoDefineMapper = null,
    enhancers = [],
    autoDefineOverrides = null,
    autoDefinePreferModule = true
  } = options;
  const mergedEnhancers = (() => {
    const map = /* @__PURE__ */ new Map();
    (baseEnhancers || []).forEach((e) => map.set(e.selector, e));
    (enhancers || []).forEach((e) => map.set(e.selector, e));
    return Array.from(map.values());
  })();
  let autoDefiner = null;
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    let AutoDefinerCtor = null;
    try {
      const mod = await Promise.resolve().then(() => (init_auto_definer(), auto_definer_exports));
      AutoDefinerCtor = mod?.AutoDefiner || mod?.default?.AutoDefiner || mod?.default || null;
    } catch (e) {
      console.warn("AutoDefiner not available:", e?.message || e);
    }
    const defaultMapper = (tag) => {
      switch (tag) {
        case "pds-tabpanel":
          return "pds-tabstrip.js";
        default:
          return `${tag}.js`;
      }
    };
    const { mapper: _overrideMapperIgnored, ...restAutoDefineOverrides } = autoDefineOverrides && typeof autoDefineOverrides === "object" ? autoDefineOverrides : {};
    const normalizedBaseURL = autoDefineBaseURL ? ensureTrailingSlash2(
      ensureAbsoluteAssetURL(autoDefineBaseURL, {
        preferModule: autoDefinePreferModule
      })
    ) : autoDefineBaseURL;
    const autoDefineConfig = {
      baseURL: normalizedBaseURL,
      predefine: autoDefinePreload,
      scanExisting: true,
      observeShadows: true,
      patchAttachShadow: true,
      debounceMs: 16,
      enhancers: mergedEnhancers,
      onError: (tag, err) => {
        if (typeof tag === "string" && tag.startsWith("pds-")) {
          const litDependentComponents = ["pds-form", "pds-drawer"];
          const isLitComponent = litDependentComponents.includes(tag);
          const isMissingLitError = err?.message?.includes("#pds/lit") || err?.message?.includes("Failed to resolve module specifier");
          if (isLitComponent && isMissingLitError) {
            console.error(
              `\u274C PDS component <${tag}> requires Lit but #pds/lit is not in import map.
              See: https://github.com/Pure-Web-Foundation/pure-ds/blob/main/readme.md#lit-components-not-working`
            );
          } else {
            console.warn(
              `\u26A0\uFE0F PDS component <${tag}> not found. Assets may not be installed.`
            );
          }
        } else {
          console.error(`\u274C Auto-define error for <${tag}>:`, err);
        }
      },
      // Apply all user overrides except mapper so we can still wrap it
      ...restAutoDefineOverrides,
      mapper: (tag) => {
        if (customElements.get(tag))
          return null;
        if (typeof autoDefineMapper === "function") {
          try {
            const mapped = autoDefineMapper(tag);
            if (mapped === void 0) {
              return defaultMapper(tag);
            }
            return mapped;
          } catch (e) {
            console.warn(
              "Custom autoDefine.mapper error; falling back to default:",
              e?.message || e
            );
            return defaultMapper(tag);
          }
        }
        return defaultMapper(tag);
      }
    };
    if (AutoDefinerCtor) {
      autoDefiner = new AutoDefinerCtor(autoDefineConfig);
      if (autoDefinePreload.length > 0 && typeof AutoDefinerCtor.define === "function") {
        await AutoDefinerCtor.define(...autoDefinePreload, {
          baseURL: autoDefineBaseURL,
          mapper: autoDefineConfig.mapper,
          onError: autoDefineConfig.onError
        });
      }
    }
  }
  return { autoDefiner, mergedEnhancers };
}

// src/js/pds-core/pds-live.js
var __liveApiReady = false;
var __queryClass = null;
async function __attachLiveAPIs(PDS2, { applyResolvedTheme, setupSystemListenerIfNeeded }) {
  if (__liveApiReady)
    return;
  const [ontologyModule, enumsModule, queryModule, commonModule] = await Promise.all([
    Promise.resolve().then(() => (init_pds_ontology(), pds_ontology_exports)),
    Promise.resolve().then(() => (init_pds_enums(), pds_enums_exports)),
    Promise.resolve().then(() => (init_pds_query(), pds_query_exports)),
    Promise.resolve().then(() => (init_common(), common_exports))
  ]);
  const ontology2 = ontologyModule?.default || ontologyModule?.ontology;
  const findComponentForElement2 = ontologyModule?.findComponentForElement;
  const enums2 = enumsModule?.enums;
  __queryClass = queryModule?.PDSQuery || queryModule?.default || null;
  PDS2.ontology = ontology2;
  PDS2.findComponentForElement = findComponentForElement2;
  PDS2.enums = enums2;
  PDS2.common = commonModule || {};
  PDS2.presets = presets;
  PDS2.enhancerMetadata = defaultPDSEnhancerMetadata;
  PDS2.applyStyles = function(generator) {
    return applyStyles(generator || Generator.instance);
  };
  PDS2.adoptLayers = function(shadowRoot, layers, additionalSheets) {
    return adoptLayers(
      shadowRoot,
      layers,
      additionalSheets,
      Generator.instance
    );
  };
  PDS2.adoptPrimitives = function(shadowRoot, additionalSheets) {
    return adoptPrimitives(shadowRoot, additionalSheets, Generator.instance);
  };
  PDS2.getGenerator = async function() {
    return Generator;
  };
  PDS2.query = async function(question) {
    if (!__queryClass) {
      const mod = await Promise.resolve().then(() => (init_pds_query(), pds_query_exports));
      __queryClass = mod?.PDSQuery || mod?.default || null;
    }
    if (!__queryClass)
      return [];
    const queryEngine = new __queryClass(PDS2);
    return await queryEngine.search(question);
  };
  if (!Object.getOwnPropertyDescriptor(PDS2, "compiled")) {
    Object.defineProperty(PDS2, "compiled", {
      get() {
        if (PDS2.registry?.isLive && Generator.instance) {
          return Generator.instance.compiled;
        }
        return null;
      },
      enumerable: true,
      configurable: false
    });
  }
  PDS2.preloadCritical = function(config, options = {}) {
    if (typeof window === "undefined" || !document.head || !config) {
      return;
    }
    const { theme, layers = ["tokens"] } = options;
    try {
      let resolvedTheme = theme || "light";
      if (theme === "system" || !theme) {
        const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        resolvedTheme = prefersDark ? "dark" : "light";
      }
      document.documentElement.setAttribute("data-theme", resolvedTheme);
      const tempConfig = config.design ? { ...config, theme: resolvedTheme } : { design: config, theme: resolvedTheme };
      const tempGenerator = new Generator(tempConfig);
      const criticalCSS = layers.map((layer) => {
        try {
          return tempGenerator.css?.[layer] || "";
        } catch (e) {
          return "";
        }
      }).filter((css) => css.trim()).join("\n");
      if (criticalCSS) {
        const existing = document.head.querySelector("style[data-pds-preload]");
        if (existing)
          existing.remove();
        const styleEl = document.createElement("style");
        styleEl.setAttribute("data-pds-preload", "");
        styleEl.textContent = criticalCSS;
        document.head.insertBefore(styleEl, document.head.firstChild);
      }
    } catch (error) {
      console.warn("PDS preload failed:", error);
    }
  };
  __liveApiReady = true;
}
async function startLive(PDS2, config, { emitReady, applyResolvedTheme, setupSystemListenerIfNeeded }) {
  if (!config || typeof config !== "object") {
    throw new Error(
      "PDS.start({ mode: 'live', ... }) requires a valid configuration object"
    );
  }
  await __attachLiveAPIs(PDS2, { applyResolvedTheme, setupSystemListenerIfNeeded });
  attachFoucListener(PDS2);
  if (typeof document !== "undefined" && document.adoptedStyleSheets) {
    const css = (
      /*css*/
      `
          html { opacity: 0; }
          html.pds-ready { opacity: 1; transition: opacity 0.3s ease-in; }
        `
    );
    try {
      const hasFoucSheet = document.adoptedStyleSheets.some((sheet) => sheet._pdsFouc);
      if (!hasFoucSheet) {
        const foucSheet = new CSSStyleSheet();
        foucSheet.replaceSync(css);
        foucSheet._pdsFouc = true;
        document.adoptedStyleSheets = [foucSheet, ...document.adoptedStyleSheets];
      }
    } catch (e) {
      console.warn("Constructable stylesheets not supported, using <style> tag fallback:", e);
      const existingFoucStyle = document.head.querySelector("style[data-pds-fouc]");
      if (!existingFoucStyle) {
        const foucStyle = document.createElement("style");
        foucStyle.setAttribute("data-pds-fouc", "");
        foucStyle.textContent = css;
        document.head.insertBefore(foucStyle, document.head.firstChild);
      }
    }
  }
  let applyGlobalStyles = config.applyGlobalStyles ?? true;
  let manageTheme = config.manageTheme ?? true;
  let themeStorageKey = config.themeStorageKey ?? "pure-ds-theme";
  let preloadStyles = config.preloadStyles ?? false;
  let criticalLayers = config.criticalLayers ?? ["tokens", "primitives"];
  const cfgAuto = config && config.autoDefine || null;
  try {
    const { resolvedTheme } = resolveThemeAndApply({
      manageTheme,
      themeStorageKey,
      applyResolvedTheme,
      setupSystemListenerIfNeeded
    });
    const normalized = normalizeInitConfig(config, {}, { presets, defaultLog });
    const userEnhancers = normalized.enhancers;
    const { log: logFn, ...configToClone } = normalized.generatorConfig;
    const generatorConfig = structuredClone(configToClone);
    generatorConfig.log = logFn;
    if (manageTheme) {
      generatorConfig.theme = resolvedTheme;
    }
    const generator = new Generator(generatorConfig);
    if (generatorConfig.design?.typography) {
      try {
        await loadTypographyFonts(generatorConfig.design.typography);
      } catch (ex) {
        generatorConfig?.log?.("warn", "Failed to load some fonts from Google Fonts:", ex);
      }
    }
    if (preloadStyles && typeof window !== "undefined" && document.head) {
      try {
        const criticalCSS = criticalLayers.map((layer) => {
          try {
            return generator.css?.[layer] || "";
          } catch (e) {
            generatorConfig?.log?.(
              "warn",
              `Failed to generate critical CSS for layer "${layer}":`,
              e
            );
            return "";
          }
        }).filter((css) => css.trim()).join("\n");
        if (criticalCSS) {
          const existingCritical = document.head.querySelector(
            "style[data-pds-critical]"
          );
          if (existingCritical) {
            existingCritical.remove();
          }
          const styleEl = document.createElement("style");
          styleEl.setAttribute("data-pds-critical", "");
          styleEl.textContent = criticalCSS;
          const insertAfter = document.head.querySelector(
            'meta[charset], meta[name="viewport"]'
          );
          if (insertAfter) {
            insertAfter.parentNode.insertBefore(
              styleEl,
              insertAfter.nextSibling
            );
          } else {
            document.head.insertBefore(styleEl, document.head.firstChild);
          }
        }
      } catch (error) {
        generatorConfig?.log?.("warn", "Failed to preload critical styles:", error);
      }
    }
    PDS2.registry.setLiveMode();
    if (normalized.presetInfo?.name) {
      generatorConfig?.log?.("log", `PDS live with preset "${normalized.presetInfo.name}"`);
    } else {
      generatorConfig?.log?.("log", "PDS live with custom config");
    }
    if (applyGlobalStyles) {
      await applyStyles(Generator.instance);
      if (typeof window !== "undefined") {
        setTimeout(() => {
          const criticalStyle = document.head.querySelector(
            "style[data-pds-critical]"
          );
          if (criticalStyle)
            criticalStyle.remove();
          const preloadStyle = document.head.querySelector(
            "style[data-pds-preload]"
          );
          if (preloadStyle)
            preloadStyle.remove();
          const legacyRuntime = document.getElementById(
            "pds-runtime-stylesheet"
          );
          if (legacyRuntime)
            legacyRuntime.remove();
        }, 100);
      }
    }
    const assetRootURL = resolveRuntimeAssetRoot(config, { resolvePublicAssetURL });
    let derivedAutoDefineBaseURL;
    if (cfgAuto && cfgAuto.baseURL) {
      derivedAutoDefineBaseURL = ensureTrailingSlash2(
        ensureAbsoluteAssetURL(cfgAuto.baseURL, { preferModule: false })
      );
    } else {
      derivedAutoDefineBaseURL = `${assetRootURL}components/`;
    }
    let autoDefiner = null;
    let mergedEnhancers = [];
    try {
      const res = await setupAutoDefinerAndEnhancers({
        autoDefineBaseURL: derivedAutoDefineBaseURL,
        autoDefinePreload: cfgAuto && Array.isArray(cfgAuto.predefine) && cfgAuto.predefine || [],
        autoDefineMapper: cfgAuto && typeof cfgAuto.mapper === "function" && cfgAuto.mapper || null,
        enhancers: userEnhancers,
        autoDefineOverrides: cfgAuto || null,
        autoDefinePreferModule: !(cfgAuto && cfgAuto.baseURL)
      }, { baseEnhancers: defaultPDSEnhancers });
      autoDefiner = res.autoDefiner;
      mergedEnhancers = res.mergedEnhancers || [];
    } catch (error) {
      generatorConfig?.log?.("error", "\u274C Failed to initialize AutoDefiner/Enhancers:", error);
    }
    const resolvedConfig = generator?.options || generatorConfig;
    const cloneableConfig = stripFunctions(config);
    PDS2.currentConfig = Object.freeze({
      mode: "live",
      ...structuredClone(cloneableConfig),
      design: structuredClone(normalized.generatorConfig.design),
      preset: normalized.generatorConfig.preset,
      theme: resolvedTheme,
      enhancers: mergedEnhancers
    });
    emitReady({
      mode: "live",
      generator,
      config: resolvedConfig,
      theme: resolvedTheme,
      autoDefiner
    });
    return {
      generator,
      config: resolvedConfig,
      theme: resolvedTheme,
      autoDefiner
    };
  } catch (error) {
    PDS2.dispatchEvent(new CustomEvent("pds:error", { detail: { error } }));
    throw error;
  }
}
export {
  startLive
};
//# sourceMappingURL=pds-manager.js.map
