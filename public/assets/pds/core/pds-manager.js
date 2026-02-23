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
          id: "pds-live-edit",
          name: "Live Edit",
          description: "Contextual live editing for PDS design settings",
          selectors: ["pds-live-edit"],
          tags: ["editor", "live", "config", "tooling"],
          category: "tooling"
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
          id: "color-input",
          selector: "label[data-color]",
          description: "Enhanced color input with swatch shell and hex output",
          tags: ["color", "input", "form"]
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
  isObject: () => isObject,
  parseHTML: () => parseHTML
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
function parseHTML(html) {
  return new DOMParser().parseFromString(html, "text/html").body.childNodes;
}
var init_common = __esm({
  "src/js/common/common.js"() {
  }
});

// src/js/pds-core/pds-config.js
init_pds_enums();
var __ANY_TYPE__ = "any";
var __DESIGN_CONFIG_SPEC__ = {
  type: "object",
  allowUnknown: false,
  properties: {
    id: { type: "string", minLength: 1, maxLength: 64 },
    name: { type: "string", minLength: 1, maxLength: 80 },
    tags: { type: "array", uniqueItems: true, items: { type: "string" } },
    themes: {
      type: "array",
      uniqueItems: true,
      items: {
        type: "string",
        oneOf: [
          { const: "light", title: "Light" },
          { const: "dark", title: "Dark" },
          { const: "system", title: "System" }
        ]
      }
    },
    description: { type: "string", maxLength: 500 },
    options: {
      type: "object",
      allowUnknown: true,
      properties: {
        liquidGlassEffects: { type: "boolean" },
        backgroundMesh: { type: "number" }
      }
    },
    form: {
      type: "object",
      allowUnknown: true,
      properties: {
        options: {
          type: "object",
          allowUnknown: true,
          properties: {
            widgets: {
              type: "object",
              allowUnknown: false,
              properties: {
                booleans: { type: "string" },
                numbers: { type: "string" },
                selects: { type: "string" }
              }
            },
            layouts: {
              type: "object",
              allowUnknown: false,
              properties: {
                fieldsets: { type: "string" },
                arrays: { type: "string" }
              }
            },
            enhancements: {
              type: "object",
              allowUnknown: false,
              properties: {
                icons: { type: "boolean" },
                datalists: { type: "boolean" },
                rangeOutput: { type: "boolean" },
                colorInput: { type: "boolean" }
              }
            },
            validation: {
              type: "object",
              allowUnknown: false,
              properties: {
                showErrors: { type: "boolean" },
                validateOnChange: { type: "boolean" }
              }
            }
          }
        }
      }
    },
    colors: {
      type: "object",
      allowUnknown: false,
      properties: {
        primary: {
          type: "string",
          relations: {
            tokens: [
              "--color-primary-*",
              "--color-primary-fill",
              "--color-primary-text",
              "--background-mesh-*"
            ]
          }
        },
        secondary: {
          type: "string",
          relations: {
            tokens: ["--color-secondary-*", "--color-gray-*", "--background-mesh-*"]
          }
        },
        accent: {
          type: "string",
          relations: {
            tokens: ["--color-accent-*", "--background-mesh-*"]
          }
        },
        background: {
          type: "string",
          relations: {
            tokens: [
              "--color-surface-*",
              "--color-surface-translucent-*",
              "--surface-*-bg",
              "--surface-*-text",
              "--surface-*-text-secondary",
              "--surface-*-text-muted",
              "--surface-*-icon",
              "--surface-*-icon-subtle",
              "--surface-*-shadow",
              "--surface-*-border"
            ]
          }
        },
        success: {
          type: ["string", "null"],
          relations: { tokens: ["--color-success-*"] }
        },
        warning: {
          type: ["string", "null"],
          relations: { tokens: ["--color-warning-*"] }
        },
        danger: {
          type: ["string", "null"],
          relations: { tokens: ["--color-danger-*"] }
        },
        info: {
          type: ["string", "null"],
          relations: { tokens: ["--color-info-*"] }
        },
        gradientStops: { type: "number" },
        elevationOpacity: {
          type: "number",
          relations: { tokens: ["--surface-*-shadow"] }
        },
        darkMode: {
          type: "object",
          allowUnknown: false,
          properties: {
            background: {
              type: "string",
              relations: {
                theme: "dark",
                tokens: [
                  "--color-surface-*",
                  "--color-surface-translucent-*",
                  "--surface-*-bg",
                  "--surface-*-text",
                  "--surface-*-text-secondary",
                  "--surface-*-text-muted",
                  "--surface-*-icon",
                  "--surface-*-icon-subtle",
                  "--surface-*-shadow",
                  "--surface-*-border"
                ]
              }
            },
            primary: {
              type: "string",
              relations: {
                theme: "dark",
                tokens: ["--color-primary-*", "--color-primary-fill", "--color-primary-text"]
              }
            },
            secondary: {
              type: "string",
              relations: {
                theme: "dark",
                tokens: ["--color-secondary-*", "--color-gray-*"]
              }
            },
            accent: {
              type: "string",
              relations: { theme: "dark", tokens: ["--color-accent-*"] }
            }
          }
        }
      }
    },
    typography: {
      type: "object",
      allowUnknown: false,
      properties: {
        fontFamilyHeadings: {
          type: "string",
          relations: { tokens: ["--font-family-headings"] }
        },
        fontFamilyBody: {
          type: "string",
          relations: { tokens: ["--font-family-body"] }
        },
        fontFamilyMono: {
          type: "string",
          relations: { tokens: ["--font-family-mono"] }
        },
        baseFontSize: {
          type: "number",
          relations: { tokens: ["--font-size-*"] }
        },
        fontScale: {
          type: "number",
          relations: { tokens: ["--font-size-*"] }
        },
        fontWeightLight: {
          type: ["string", "number"],
          relations: { tokens: ["--font-weight-light"] }
        },
        fontWeightNormal: {
          type: ["string", "number"],
          relations: { tokens: ["--font-weight-normal"] }
        },
        fontWeightMedium: {
          type: ["string", "number"],
          relations: { tokens: ["--font-weight-medium"] }
        },
        fontWeightSemibold: {
          type: ["string", "number"],
          relations: { tokens: ["--font-weight-semibold"] }
        },
        fontWeightBold: {
          type: ["string", "number"],
          relations: { tokens: ["--font-weight-bold"] }
        },
        lineHeightTight: {
          type: ["string", "number"],
          relations: { tokens: ["--font-line-height-tight"] }
        },
        lineHeightNormal: {
          type: ["string", "number"],
          relations: { tokens: ["--font-line-height-normal"] }
        },
        lineHeightRelaxed: {
          type: ["string", "number"],
          relations: { tokens: ["--font-line-height-relaxed"] }
        },
        letterSpacingTight: { type: "number" },
        letterSpacingNormal: { type: "number" },
        letterSpacingWide: { type: "number" }
      }
    },
    spatialRhythm: {
      type: "object",
      allowUnknown: false,
      properties: {
        baseUnit: {
          type: "number",
          relations: { tokens: ["--spacing-*"] }
        },
        scaleRatio: { type: "number" },
        maxSpacingSteps: {
          type: "number",
          relations: { tokens: ["--spacing-*"] }
        },
        containerPadding: { type: "number" },
        inputPadding: {
          type: "number",
          relations: {
            rules: [{ selectors: ["input", "textarea", "select"], properties: ["padding"] }]
          }
        },
        buttonPadding: {
          type: "number",
          relations: {
            rules: [{ selectors: ["button", ".btn"], properties: ["padding"] }]
          }
        },
        sectionSpacing: {
          type: "number",
          relations: {
            rules: [{ selectors: ["section"], properties: ["margin", "padding"] }]
          }
        }
      }
    },
    shape: {
      type: "object",
      allowUnknown: false,
      properties: {
        radiusSize: {
          type: ["string", "number"],
          relations: { tokens: ["--radius-*"] }
        },
        customRadius: { type: ["string", "number", "null"] },
        borderWidth: {
          type: ["string", "number"],
          relations: { tokens: ["--border-width-*"] }
        }
      }
    },
    behavior: {
      type: "object",
      allowUnknown: false,
      properties: {
        transitionSpeed: {
          type: ["string", "number"],
          relations: { tokens: ["--transition-*"] }
        },
        animationEasing: { type: "string" },
        customTransitionSpeed: { type: ["number", "null"] },
        customEasing: { type: ["string", "null"] },
        focusRingWidth: {
          type: "number",
          relations: { rules: [{ selectors: [":focus-visible"], properties: ["outline-width", "box-shadow"] }] }
        },
        focusRingOpacity: {
          type: "number",
          relations: { rules: [{ selectors: [":focus-visible"], properties: ["box-shadow", "outline-color"] }] }
        },
        hoverOpacity: { type: "number" }
      }
    },
    layout: {
      type: "object",
      allowUnknown: false,
      properties: {
        maxWidth: {
          type: ["number", "string"],
          relations: { tokens: ["--layout-max-width", "--layout-max-width-*"] }
        },
        maxWidths: {
          type: "object",
          allowUnknown: false,
          properties: {
            sm: { type: ["number", "string"], relations: { tokens: ["--layout-max-width-sm"] } },
            md: { type: ["number", "string"], relations: { tokens: ["--layout-max-width-md"] } },
            lg: { type: ["number", "string"], relations: { tokens: ["--layout-max-width-lg"] } },
            xl: { type: ["number", "string"], relations: { tokens: ["--layout-max-width-xl"] } }
          }
        },
        containerPadding: {
          type: ["number", "string"],
          relations: { tokens: ["--layout-container-padding"] }
        },
        breakpoints: {
          type: "object",
          allowUnknown: false,
          properties: {
            sm: { type: "number" },
            md: { type: "number" },
            lg: { type: "number" },
            xl: { type: "number" }
          }
        },
        gridColumns: { type: "number" },
        gridGutter: { type: "number" },
        densityCompact: { type: "number" },
        densityNormal: { type: "number" },
        densityComfortable: { type: "number" },
        buttonMinHeight: { type: "number" },
        inputMinHeight: { type: "number" },
        baseShadowOpacity: {
          type: "number",
          relations: { tokens: ["--shadow-*"] }
        },
        darkMode: {
          type: "object",
          allowUnknown: false,
          properties: {
            baseShadowOpacity: { type: "number", relations: { theme: "dark", tokens: ["--shadow-*"] } }
          }
        },
        utilities: {
          type: "object",
          allowUnknown: true,
          properties: {
            grid: { type: "boolean" },
            flex: { type: "boolean" },
            spacing: { type: "boolean" },
            container: { type: "boolean" }
          }
        },
        gridSystem: {
          type: "object",
          allowUnknown: true,
          properties: {
            columns: { type: "array", items: { type: "number" } },
            autoFitBreakpoints: {
              type: "object",
              allowUnknown: false,
              properties: {
                sm: { type: "string" },
                md: { type: "string" },
                lg: { type: "string" },
                xl: { type: "string" }
              }
            },
            enableGapUtilities: { type: "boolean" }
          }
        },
        containerMaxWidth: { type: ["number", "string"] }
      }
    },
    layers: {
      type: "object",
      allowUnknown: false,
      properties: {
        baseShadowOpacity: {
          type: "number",
          relations: { tokens: ["--shadow-*"] }
        },
        shadowBlurMultiplier: {
          type: "number",
          relations: { tokens: ["--shadow-*"] }
        },
        shadowOffsetMultiplier: {
          type: "number",
          relations: { tokens: ["--shadow-*"] }
        },
        shadowDepth: { type: "string" },
        blurLight: { type: "number" },
        blurMedium: { type: "number" },
        blurHeavy: { type: "number" },
        baseZIndex: { type: "number", relations: { tokens: ["--z-*"] } },
        zIndexStep: { type: "number", relations: { tokens: ["--z-*"] } },
        zIndexBase: { type: "number" },
        zIndexDropdown: { type: "number" },
        zIndexSticky: { type: "number" },
        zIndexFixed: { type: "number" },
        zIndexModal: { type: "number" },
        zIndexPopover: { type: "number" },
        zIndexTooltip: { type: "number" },
        zIndexNotification: { type: "number" },
        darkMode: {
          type: "object",
          allowUnknown: false,
          properties: {
            baseShadowOpacity: { type: "number", relations: { theme: "dark", tokens: ["--shadow-*"] } }
          }
        }
      }
    },
    advanced: {
      type: "object",
      allowUnknown: true,
      properties: {
        linkStyle: { type: "string" },
        colorDerivation: { type: "string" }
      }
    },
    a11y: {
      type: "object",
      allowUnknown: true,
      properties: {
        minTouchTarget: { type: ["string", "number"] },
        prefersReducedMotion: { type: "boolean" },
        focusStyle: { type: "string" }
      }
    },
    icons: {
      type: "object",
      allowUnknown: false,
      properties: {
        set: { type: "string" },
        weight: { type: "string" },
        defaultSize: { type: "number", relations: { tokens: ["--icon-size"] } },
        sizes: {
          type: "object",
          allowUnknown: true,
          properties: {
            xs: { type: ["number", "string"] },
            sm: { type: ["number", "string"] },
            md: { type: ["number", "string"] },
            lg: { type: ["number", "string"] },
            xl: { type: ["number", "string"] },
            "2xl": { type: ["number", "string"] }
          }
        },
        spritePath: { type: "string" },
        externalPath: { type: "string" },
        include: {
          type: "object",
          allowUnknown: true,
          properties: {
            navigation: { type: "array", items: { type: "string" } },
            actions: { type: "array", items: { type: "string" } },
            communication: { type: "array", items: { type: "string" } },
            content: { type: "array", items: { type: "string" } },
            status: { type: "array", items: { type: "string" } },
            time: { type: "array", items: { type: "string" } },
            commerce: { type: "array", items: { type: "string" } },
            formatting: { type: "array", items: { type: "string" } },
            system: { type: "array", items: { type: "string" } }
          }
        }
      }
    },
    components: { type: "object", allowUnknown: true },
    debug: { type: "boolean" }
  }
};
var __INIT_CONFIG_SPEC__ = {
  type: "object",
  allowUnknown: true,
  properties: {
    mode: { type: "string" },
    preset: { type: "string" },
    design: __DESIGN_CONFIG_SPEC__,
    enhancers: { type: ["object", "array"] },
    applyGlobalStyles: { type: "boolean" },
    manageTheme: { type: "boolean" },
    themeStorageKey: { type: "string" },
    preloadStyles: { type: "boolean" },
    criticalLayers: { type: "array", items: { type: "string" } },
    autoDefine: {
      type: "object",
      allowUnknown: false,
      properties: {
        predefine: { type: "array", items: { type: "string" } },
        mapper: { type: __ANY_TYPE__ },
        enhancers: { type: ["object", "array"] },
        scanExisting: { type: "boolean" },
        observeShadows: { type: "boolean" },
        patchAttachShadow: { type: "boolean" },
        debounceMs: { type: "number" },
        onError: { type: __ANY_TYPE__ },
        baseURL: { type: "string" }
      }
    },
    managerURL: { type: "string" },
    manager: { type: __ANY_TYPE__ },
    liveEdit: { type: "boolean" },
    log: { type: __ANY_TYPE__ }
  }
};
function __getValueType(value) {
  if (value === null)
    return "null";
  if (Array.isArray(value))
    return "array";
  return typeof value;
}
function __matchesExpectedType(value, expected) {
  if (expected === __ANY_TYPE__)
    return true;
  const actual = __getValueType(value);
  if (Array.isArray(expected)) {
    return expected.includes(actual);
  }
  return actual === expected;
}
function __validateAgainstSpec(value, spec, path, issues) {
  if (!spec)
    return;
  const expectedType = spec.type || __ANY_TYPE__;
  if (!__matchesExpectedType(value, expectedType)) {
    issues.push({
      path,
      expected: expectedType,
      actual: __getValueType(value),
      message: `Expected ${expectedType} but got ${__getValueType(value)}`
    });
    return;
  }
  if (expectedType === "array" && spec.items && Array.isArray(value)) {
    value.forEach((item, index) => {
      __validateAgainstSpec(item, spec.items, `${path}[${index}]`, issues);
    });
  }
  if (expectedType === "object" && value && typeof value === "object") {
    const props = spec.properties || {};
    for (const [key, val] of Object.entries(value)) {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        if (!spec.allowUnknown) {
          issues.push({
            path: `${path}.${key}`,
            expected: "known property",
            actual: "unknown",
            message: `Unknown property "${key}"`
          });
        }
        continue;
      }
      __validateAgainstSpec(val, props[key], `${path}.${key}`, issues);
    }
  }
}
function __collectRelations(spec, basePath = "", out = {}) {
  if (!spec || typeof spec !== "object")
    return out;
  if (spec.relations && basePath) {
    out[basePath] = spec.relations;
  }
  if (spec.type === "object" && spec.properties) {
    Object.entries(spec.properties).forEach(([key, value]) => {
      const nextPath = basePath ? `${basePath}.${key}` : key;
      __collectRelations(value, nextPath, out);
    });
  }
  if (spec.type === "array" && spec.items) {
    const nextPath = `${basePath}[]`;
    __collectRelations(spec.items, nextPath, out);
  }
  return out;
}
var PDS_CONFIG_RELATIONS = __collectRelations(
  __DESIGN_CONFIG_SPEC__,
  ""
);
var PDS_DESIGN_CONFIG_SPEC = __DESIGN_CONFIG_SPEC__;
var __CONFIG_EDITOR_METADATA_OVERRIDES__ = {
  "colors.primary": { widget: "input-color" },
  "colors.secondary": { widget: "input-color" },
  "colors.accent": { widget: "input-color" },
  "colors.background": { widget: "input-color" },
  "colors.success": { widget: "input-color" },
  "colors.warning": { widget: "input-color" },
  "colors.danger": { widget: "input-color" },
  "colors.info": { widget: "input-color" },
  "colors.gradientStops": { min: 2, max: 8, step: 1, widget: "range" },
  "colors.elevationOpacity": { min: 0, max: 1, step: 0.01, widget: "range" },
  "colors.darkMode.background": { widget: "input-color" },
  "colors.darkMode.primary": { widget: "input-color" },
  "colors.darkMode.secondary": { widget: "input-color" },
  "colors.darkMode.accent": { widget: "input-color" },
  "description": {
    widget: "textarea",
    maxLength: 500,
    rows: 4,
    placeholder: "Summarize the visual and interaction intent"
  },
  "typography.fontFamilyHeadings": {
    widget: "font-family-omnibox",
    icon: "text-aa",
    placeholder: "Heading font stack"
  },
  "typography.fontFamilyBody": {
    widget: "font-family-omnibox",
    icon: "text-aa",
    placeholder: "Body font stack"
  },
  "typography.fontFamilyMono": {
    widget: "font-family-omnibox",
    icon: "text-aa",
    placeholder: "Monospace font stack"
  },
  "typography.baseFontSize": { min: 8, max: 32, step: 1, widget: "input-range" },
  "typography.fontScale": { min: 1, max: 2, step: 0.01, widget: "range" },
  "typography.fontWeightLight": { min: 100, max: 800, step: 100, widget: "input-range" },
  "typography.fontWeightNormal": { min: 100, max: 800, step: 100, widget: "input-range" },
  "typography.fontWeightMedium": { min: 100, max: 800, step: 100, widget: "input-range" },
  "typography.fontWeightSemibold": { min: 100, max: 800, step: 100, widget: "input-range" },
  "typography.fontWeightBold": { min: 100, max: 800, step: 100, widget: "input-range" },
  "typography.lineHeightTight": { min: 0.75, max: 3, step: 1e-3, widget: "input-range" },
  "typography.lineHeightNormal": { min: 0.75, max: 3, step: 1e-3, widget: "input-range" },
  "typography.lineHeightRelaxed": { min: 0.75, max: 3, step: 1e-3, widget: "input-range" },
  "typography.letterSpacingTight": { min: -0.1, max: 0.1, step: 1e-3, widget: "range" },
  "typography.letterSpacingNormal": { min: -0.1, max: 0.1, step: 1e-3, widget: "range" },
  "typography.letterSpacingWide": { min: -0.1, max: 0.1, step: 1e-3, widget: "range" },
  "spatialRhythm.baseUnit": { min: 1, max: 16, step: 1, widget: "range" },
  "spatialRhythm.scaleRatio": { min: 1, max: 2, step: 0.01, widget: "range" },
  "spatialRhythm.maxSpacingSteps": { min: 4, max: 64, step: 1, widget: "range" },
  "spatialRhythm.containerPadding": { min: 0, max: 8, step: 0.05, widget: "range" },
  "spatialRhythm.inputPadding": { min: 0, max: 4, step: 0.05, widget: "range" },
  "spatialRhythm.buttonPadding": { min: 0, max: 4, step: 0.05, widget: "range" },
  "spatialRhythm.sectionSpacing": { min: 0, max: 8, step: 0.05, widget: "range" },
  "shape.radiusSize": {
    oneOf: Object.entries(enums.RadiusSizes).map(([name, value]) => ({
      const: value,
      title: name
    }))
  },
  "shape.borderWidth": {
    widget: "select",
    oneOf: Object.entries(enums.BorderWidths).map(([name, value]) => ({
      const: value,
      title: name
    }))
  },
  "shape.customRadius": { min: 0, max: 64, step: 1, widget: "range" },
  "behavior.transitionSpeed": {
    oneOf: Object.entries(enums.TransitionSpeeds).map(([name, value]) => ({
      const: value,
      title: name
    }))
  },
  "behavior.animationEasing": {
    enum: Object.values(enums.AnimationEasings)
  },
  "behavior.customTransitionSpeed": { min: 0, max: 1e3, step: 10, widget: "range" },
  "behavior.focusRingWidth": { min: 0, max: 8, step: 1, widget: "range" },
  "behavior.focusRingOpacity": { min: 0, max: 1, step: 0.01, widget: "range" },
  "behavior.hoverOpacity": { min: 0, max: 1, step: 0.01, widget: "range" },
  "layout.gridColumns": { min: 1, max: 24, step: 1, widget: "range" },
  "layout.gridGutter": { min: 0, max: 8, step: 0.05, widget: "range" },
  "layout.maxWidth": { widget: "input-text", placeholder: "e.g. 1200 or 1200px" },
  "layout.maxWidths.sm": { widget: "input-text", placeholder: "e.g. 640 or 640px" },
  "layout.maxWidths.md": { widget: "input-text", placeholder: "e.g. 768 or 768px" },
  "layout.maxWidths.lg": { widget: "input-text", placeholder: "e.g. 1024 or 1024px" },
  "layout.maxWidths.xl": { widget: "input-text", placeholder: "e.g. 1280 or 1280px" },
  "layout.containerMaxWidth": { widget: "input-text", placeholder: "e.g. 1400px" },
  "layout.containerPadding": { widget: "input-text", placeholder: "e.g. var(--spacing-6)" },
  "layout.breakpoints.sm": { min: 320, max: 2560, step: 1, widget: "input-number" },
  "layout.breakpoints.md": { min: 480, max: 3200, step: 1, widget: "input-number" },
  "layout.breakpoints.lg": { min: 640, max: 3840, step: 1, widget: "input-number" },
  "layout.breakpoints.xl": { min: 768, max: 5120, step: 1, widget: "input-number" },
  "layout.baseShadowOpacity": { min: 0, max: 1, step: 0.01, widget: "range" },
  "layout.darkMode.baseShadowOpacity": { min: 0, max: 1, step: 0.01, widget: "range" },
  "layout.densityCompact": { min: 0.5, max: 2, step: 0.05, widget: "range" },
  "layout.densityNormal": { min: 0.5, max: 2, step: 0.05, widget: "range" },
  "layout.densityComfortable": { min: 0.5, max: 2, step: 0.05, widget: "range" },
  "layout.buttonMinHeight": { min: 24, max: 96, step: 1, widget: "range" },
  "layout.inputMinHeight": { min: 24, max: 96, step: 1, widget: "range" },
  "layers.baseShadowOpacity": { min: 0, max: 1, step: 0.01, widget: "range" },
  "layers.shadowBlurMultiplier": { min: 0, max: 8, step: 0.1, widget: "range" },
  "layers.shadowOffsetMultiplier": { min: 0, max: 8, step: 0.1, widget: "range" },
  "layers.blurLight": { min: 0, max: 48, step: 1, widget: "range" },
  "layers.blurMedium": { min: 0, max: 64, step: 1, widget: "range" },
  "layers.blurHeavy": { min: 0, max: 96, step: 1, widget: "range" },
  "layers.baseZIndex": { min: 0, max: 1e4, step: 10, widget: "range" },
  "layers.zIndexStep": { min: 1, max: 100, step: 1, widget: "range" },
  "layers.darkMode.baseShadowOpacity": { min: 0, max: 1, step: 0.01, widget: "range" },
  "advanced.linkStyle": { enum: Object.values(enums.LinkStyles) },
  "a11y.minTouchTarget": {
    oneOf: Object.entries(enums.TouchTargetSizes).map(([name, value]) => ({
      const: value,
      title: name
    }))
  },
  "a11y.focusStyle": { enum: Object.values(enums.FocusStyles) },
  "icons.defaultSize": { min: 8, max: 128, step: 1, widget: "range", icon: "sparkle" }
};
function __toConfigPath(pathSegments = []) {
  return pathSegments.join(".");
}
function __toJsonPointer(pathSegments = []) {
  return `/${pathSegments.join("/")}`;
}
function __getValueAtPath(source, pathSegments = []) {
  if (!source || typeof source !== "object")
    return void 0;
  return pathSegments.reduce((current, segment) => {
    if (current === null || current === void 0)
      return void 0;
    if (typeof current !== "object")
      return void 0;
    return current[segment];
  }, source);
}
function __resolveExampleValue(value, fallbackSource, pathSegments = []) {
  if (value !== void 0 && value !== null)
    return value;
  const fallback = __getValueAtPath(fallbackSource, pathSegments);
  return fallback !== void 0 && fallback !== null ? fallback : void 0;
}
function __toTitleCase(value = "") {
  return String(value).replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim().replace(/^./, (char) => char.toUpperCase());
}
function __resolveExpectedType(spec, value) {
  if (!spec)
    return "string";
  const expected = spec.type || "string";
  if (Array.isArray(expected)) {
    const actual = __getValueType(value);
    if (actual !== "undefined" && expected.includes(actual))
      return actual;
    if (expected.includes("string"))
      return "string";
    return expected.find((item) => item !== "null") || expected[0] || "string";
  }
  return expected;
}
function __copySchemaConstraints(target, spec, keys = []) {
  if (!target || !spec || !Array.isArray(keys))
    return target;
  keys.forEach((key) => {
    if (spec[key] !== void 0) {
      target[key] = spec[key];
    }
  });
  return target;
}
function __buildSchemaChoices(spec, metadata) {
  if (Array.isArray(metadata?.oneOf) && metadata.oneOf.length) {
    return metadata.oneOf;
  }
  if (Array.isArray(metadata?.enum) && metadata.enum.length) {
    return metadata.enum.map((option) => ({
      const: option,
      title: __toTitleCase(option)
    }));
  }
  if (Array.isArray(spec?.oneOf) && spec.oneOf.length) {
    return spec.oneOf;
  }
  if (Array.isArray(spec?.enum) && spec.enum.length) {
    return spec.enum.map((option) => ({
      const: option,
      title: __toTitleCase(option)
    }));
  }
  return null;
}
function __normalizeEditorWidget(widget) {
  if (!widget)
    return widget;
  if (widget === "range")
    return "input-range";
  return widget;
}
function __resolveSchemaTypeFromChoices(schemaType, choices) {
  if (!Array.isArray(choices) || !choices.length)
    return schemaType;
  const choiceTypes = /* @__PURE__ */ new Set();
  for (const option of choices) {
    if (!option || option.const === void 0)
      continue;
    choiceTypes.add(__getValueType(option.const));
  }
  if (!choiceTypes.size)
    return schemaType;
  if (choiceTypes.size === 1) {
    const only = Array.from(choiceTypes)[0];
    if (only === "number")
      return "number";
    if (only === "string")
      return "string";
    if (only === "boolean")
      return "boolean";
  }
  return schemaType;
}
function __inferEditorMetadata(path, spec, value) {
  const type = __resolveExpectedType(spec, value);
  const lowerPath = path.toLowerCase();
  const base = {
    label: __toTitleCase(path.split(".").slice(-1)[0] || path)
  };
  if (type === "boolean") {
    base.widget = "toggle";
  }
  if (type === "number") {
    base.widget = "range";
    if (lowerPath.includes("opacity")) {
      base.min = 0;
      base.max = 1;
      base.step = 0.01;
    } else if (lowerPath.includes("lineheight")) {
      base.min = 0.75;
      base.max = 3;
      base.step = 1e-3;
      base.widget = "input-range";
    } else if (lowerPath.includes("fontweight")) {
      base.min = 100;
      base.max = 800;
      base.step = 100;
      base.widget = "input-range";
    } else if (lowerPath.endsWith("basefontsize")) {
      base.min = 8;
      base.max = 32;
      base.step = 1;
      base.widget = "input-range";
    } else if (lowerPath.includes("scale") || lowerPath.includes("ratio")) {
      base.min = 1;
      base.max = 2;
      base.step = 0.01;
    } else {
      base.min = 0;
      base.max = Math.max(10, Number.isFinite(Number(value)) ? Number(value) * 4 : 100);
      base.step = 1;
    }
  }
  if (type === "string" && path.startsWith("colors.")) {
    base.widget = "input-color";
  }
  if (type === "string" && lowerPath === "description") {
    base.widget = "textarea";
    base.maxLength = 500;
    base.rows = 4;
  }
  const override = __CONFIG_EDITOR_METADATA_OVERRIDES__[path] || {};
  const merged = { ...base, ...override };
  if (merged.widget) {
    merged.widget = __normalizeEditorWidget(merged.widget);
  }
  return merged;
}
function __buildConfigSchemaNode(spec, value, pathSegments, uiSchema, metadataOut, fallbackSource) {
  if (!spec || typeof spec !== "object")
    return null;
  const resolvedValueForType = __resolveExampleValue(
    value,
    fallbackSource,
    pathSegments
  );
  const expectedType = __resolveExpectedType(spec, resolvedValueForType);
  if (expectedType === "object" && spec.properties) {
    const schemaNode2 = { type: "object", properties: {} };
    if (pathSegments.length > 0) {
      schemaNode2.title = __toTitleCase(pathSegments[pathSegments.length - 1]);
    }
    const valueNode = {};
    for (const [key, childSpec] of Object.entries(spec.properties)) {
      const childValue = value && typeof value === "object" && !Array.isArray(value) ? value[key] : void 0;
      const child = __buildConfigSchemaNode(
        childSpec,
        childValue,
        [...pathSegments, key],
        uiSchema,
        metadataOut,
        fallbackSource
      );
      if (!child)
        continue;
      schemaNode2.properties[key] = child.schema;
      if (child.hasValue) {
        valueNode[key] = child.value;
      }
    }
    if (!Object.keys(schemaNode2.properties).length)
      return null;
    return {
      schema: schemaNode2,
      value: valueNode,
      hasValue: Object.keys(valueNode).length > 0
    };
  }
  if (expectedType === "array") {
    const path2 = __toConfigPath(pathSegments);
    const metadata2 = __inferEditorMetadata(path2, spec, value);
    metadataOut[path2] = metadata2;
    const resolvedArrayExample = __resolveExampleValue(
      value,
      fallbackSource,
      pathSegments
    );
    const itemType = spec.items?.type || "string";
    const normalizedItemType = Array.isArray(itemType) ? itemType[0] : itemType;
    const itemSchema = {
      type: normalizedItemType
    };
    const itemChoices = __buildSchemaChoices(spec?.items, null);
    if (itemChoices) {
      itemSchema.oneOf = itemChoices;
    }
    if (normalizedItemType === "string" && Array.isArray(resolvedArrayExample) && resolvedArrayExample.length > 0) {
      const firstString = resolvedArrayExample.find(
        (entry) => typeof entry === "string" && entry.trim().length > 0
      );
      if (firstString) {
        itemSchema.examples = [firstString];
      }
    }
    __copySchemaConstraints(itemSchema, spec?.items, [
      "minimum",
      "maximum",
      "exclusiveMinimum",
      "exclusiveMaximum",
      "multipleOf",
      "minLength",
      "maxLength",
      "pattern",
      "format",
      "minItems",
      "maxItems",
      "uniqueItems",
      "description",
      "default"
    ]);
    const schemaNode2 = {
      type: "array",
      items: itemSchema
    };
    __copySchemaConstraints(schemaNode2, spec, [
      "minItems",
      "maxItems",
      "uniqueItems",
      "description",
      "default"
    ]);
    const pointer2 = __toJsonPointer(pathSegments);
    const uiEntry2 = {};
    const itemHasChoices = Array.isArray(itemSchema.oneOf) && itemSchema.oneOf.length > 0;
    if (normalizedItemType === "string" && itemHasChoices) {
      uiEntry2["ui:widget"] = schemaNode2.maxItems === 1 ? "radio" : "checkbox-group";
    }
    if (normalizedItemType === "string" && Array.isArray(resolvedArrayExample) && resolvedArrayExample.length > 0) {
      const placeholderPreview = resolvedArrayExample.filter((entry) => typeof entry === "string" && entry.trim().length > 0).slice(0, 5).join(", ");
      if (placeholderPreview) {
        uiEntry2["ui:placeholder"] = placeholderPreview;
      }
    }
    if (Object.keys(uiEntry2).length) {
      uiSchema[pointer2] = {
        ...uiSchema[pointer2] || {},
        ...uiEntry2
      };
    }
    return {
      schema: schemaNode2,
      value: Array.isArray(value) ? value : [],
      hasValue: Array.isArray(value)
    };
  }
  const path = __toConfigPath(pathSegments);
  const metadata = __inferEditorMetadata(path, spec, resolvedValueForType);
  metadataOut[path] = metadata;
  const choices = __buildSchemaChoices(spec, metadata);
  const schemaType = expectedType === "null" ? "string" : expectedType;
  const normalizedSchemaType = __resolveSchemaTypeFromChoices(schemaType, choices);
  const schemaNode = {
    type: normalizedSchemaType,
    title: metadata.label || __toTitleCase(pathSegments[pathSegments.length - 1] || path)
  };
  if (choices) {
    schemaNode.oneOf = choices;
  }
  __copySchemaConstraints(schemaNode, spec, [
    "minimum",
    "maximum",
    "exclusiveMinimum",
    "exclusiveMaximum",
    "multipleOf",
    "minLength",
    "maxLength",
    "pattern",
    "format",
    "description",
    "default"
  ]);
  if (typeof metadata.maxLength === "number" && schemaNode.maxLength === void 0) {
    schemaNode.maxLength = metadata.maxLength;
  }
  if ((schemaNode.type === "number" || schemaNode.type === "integer") && typeof metadata.min === "number" && schemaNode.minimum === void 0) {
    schemaNode.minimum = metadata.min;
  }
  if ((schemaNode.type === "number" || schemaNode.type === "integer") && typeof metadata.max === "number" && schemaNode.maximum === void 0) {
    schemaNode.maximum = metadata.max;
  }
  if ((schemaNode.type === "number" || schemaNode.type === "integer") && typeof metadata.step === "number" && schemaNode.multipleOf === void 0) {
    schemaNode.multipleOf = metadata.step;
  }
  const exampleValue = resolvedValueForType;
  if (exampleValue !== void 0) {
    schemaNode.examples = [exampleValue];
  }
  const pointer = __toJsonPointer(pathSegments);
  const uiEntry = {};
  if (metadata.widget)
    uiEntry["ui:widget"] = metadata.widget;
  if (metadata.icon)
    uiEntry["ui:icon"] = metadata.icon;
  if (typeof metadata.min === "number")
    uiEntry["ui:min"] = metadata.min;
  if (typeof metadata.max === "number")
    uiEntry["ui:max"] = metadata.max;
  if (typeof metadata.step === "number")
    uiEntry["ui:step"] = metadata.step;
  if (metadata.placeholder)
    uiEntry["ui:placeholder"] = metadata.placeholder;
  if (typeof metadata.rows === "number") {
    uiEntry["ui:options"] = {
      ...uiEntry["ui:options"] || {},
      rows: metadata.rows
    };
  }
  if (metadata.widget === "input-range" && exampleValue !== void 0) {
    uiEntry["ui:allowUnset"] = true;
  }
  if (typeof metadata.min === "number" || typeof metadata.max === "number" || typeof metadata.step === "number") {
    uiEntry["ui:options"] = {
      ...uiEntry["ui:options"] || {},
      ...typeof metadata.min === "number" ? { min: metadata.min } : {},
      ...typeof metadata.max === "number" ? { max: metadata.max } : {},
      ...typeof metadata.step === "number" ? { step: metadata.step } : {}
    };
  }
  if (Object.keys(uiEntry).length) {
    uiSchema[pointer] = uiEntry;
  }
  return {
    schema: schemaNode,
    value,
    hasValue: value !== void 0
  };
}
function buildDesignConfigFormSchema(designConfig = {}) {
  const metadata = {};
  const uiSchema = {
    "/colors": {
      "ui:layout": "flex",
      "ui:layoutOptions": { wrap: true, gap: "sm" }
    },
    "/colors/darkMode": {
      "ui:layout": "flex",
      "ui:layoutOptions": { wrap: true, gap: "sm" }
    }
  };
  const fallbackSource = presets?.default && typeof presets.default === "object" ? presets.default : null;
  const root = __buildConfigSchemaNode(
    __DESIGN_CONFIG_SPEC__,
    designConfig,
    [],
    uiSchema,
    metadata,
    fallbackSource
  );
  return {
    schema: root?.schema || { type: "object", properties: {} },
    uiSchema,
    values: root?.value || {},
    metadata
  };
}
function getDesignConfigEditorMetadata(designConfig = {}) {
  return buildDesignConfigFormSchema(designConfig).metadata;
}
function validateDesignConfig(designConfig, { log, context = "PDS config" } = {}) {
  if (!designConfig || typeof designConfig !== "object")
    return [];
  const issues = [];
  __validateAgainstSpec(designConfig, __DESIGN_CONFIG_SPEC__, "design", issues);
  if (issues.length && typeof log === "function") {
    issues.forEach((issue) => {
      log("warn", `[${context}] ${issue.message} at ${issue.path}`);
    });
  }
  return issues;
}
function validateInitConfig(initConfig, { log, context = "PDS config" } = {}) {
  if (!initConfig || typeof initConfig !== "object")
    return [];
  const issues = [];
  __validateAgainstSpec(initConfig, __INIT_CONFIG_SPEC__, "config", issues);
  if (issues.length && typeof log === "function") {
    issues.forEach((issue) => {
      log("warn", `[${context}] ${issue.message} at ${issue.path}`);
    });
  }
  return issues;
}
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
      fontScale: 1.35,
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
      fontScale: 1.318,
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
    themes: ["light"],
    // Not optimized for dark mode 
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
      fontScale: 1.3,
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
      fontScale: 1.3,
      fontFamilyHeadings: "'Playfair Display', 'Georgia', serif",
      fontFamilyBody: "'Crimson Text', 'Garamond', serif",
      fontWeightNormal: 400,
      fontWeightSemibold: 600
    },
    spatialRhythm: {
      baseUnit: 4,
      scaleRatio: 1.3
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
    themes: ["light"],
    // Not optimized for dark mode due to pastel contrast challenges
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
        background: "#0c0c0c",
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
      fontScale: 1.35,
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
    liquidGlassEffects: false,
    backgroundMesh: 0
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
        rangeOutput: true,
        // Use .range-output for ranges
        colorInput: true
        // Use label[data-color] for color inputs
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
    containerPadding: 1,
    inputPadding: 0.75,
    buttonPadding: 1,
    sectionSpacing: 2
  },
  layers: {
    baseShadowOpacity: 0.1,
    darkMode: {
      baseShadowOpacity: 0.25
    },
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
    baseShadowOpacity: 0.1,
    darkMode: {
      baseShadowOpacity: 0.25
    },
    breakpoints: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280
    },
    densityCompact: 0.8,
    densityNormal: 1,
    densityComfortable: 1.2,
    buttonMinHeight: 30,
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
    spritePath: "/assets/pds/icons/pds-icons.svg"
  },
  debug: false
};
var PDS_DEFAULT_CONFIG_EDITOR_METADATA = getDesignConfigEditorMetadata(
  presets.default
);
var PDS_DEFAULT_CONFIG_FORM_SCHEMA = buildDesignConfigFormSchema(
  presets.default
);
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
    const shadowOpacityConfig = this.#resolveShadowOpacityConfig(config);
    const layersConfig = config.layers || {};
    const shadowConfig = this.#mergeShadowConfig(
      layersConfig,
      shadowOpacityConfig.light
    );
    const shadows = this.#generateShadowTokens(shadowConfig);
    const darkShadows = shadowOpacityConfig.dark != null ? this.#generateShadowTokens(
      this.#mergeShadowConfig(layersConfig, shadowOpacityConfig.dark)
    ) : null;
    return {
      colors: this.#generateColorTokens(
        config.colors || {},
        shadowOpacityConfig
      ),
      spacing: this.generateSpacingTokens(config.spatialRhythm || {}),
      radius: this.#generateRadiusTokens(config.shape || {}),
      borderWidths: this.#generateBorderWidthTokens(config.shape || {}),
      typography: this.generateTypographyTokens(config.typography || {}),
      shadows,
      darkShadows,
      layout: this.#generateLayoutTokens(config.layout || {}),
      transitions: this.#generateTransitionTokens(config.behavior || {}),
      zIndex: this.#generateZIndexTokens(config.layers || {}),
      icons: this.#generateIconTokens(config.icons || {})
    };
  }
  #resolveShadowOpacityConfig(config = {}) {
    const layout = config.layout || {};
    const layers = config.layers || {};
    return {
      light: this.#normalizeOpacity(
        layout.baseShadowOpacity ?? layers.baseShadowOpacity
      ),
      dark: this.#normalizeOpacity(
        layout.darkMode?.baseShadowOpacity ?? layers.darkMode?.baseShadowOpacity
      )
    };
  }
  #normalizeOpacity(value) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric))
      return void 0;
    return Math.min(Math.max(numeric, 0), 1);
  }
  #mergeShadowConfig(layersConfig = {}, baseShadowOpacity) {
    const merged = { ...layersConfig };
    if (baseShadowOpacity != null) {
      merged.baseShadowOpacity = baseShadowOpacity;
    }
    return merged;
  }
  #generateColorTokens(colorConfig, shadowOpacityConfig = {}) {
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
    colors.surfaceSmart = this.#generateSmartSurfaceTokens(
      colors.surface,
      shadowOpacityConfig
    );
    colors.dark = this.#generateDarkModeColors(
      colors,
      background,
      darkMode
      // Pass the darkMode object directly
    );
    if (colors.dark && colors.dark.surface) {
      colors.dark.surfaceSmart = this.#generateSmartSurfaceTokens(
        colors.dark.surface,
        shadowOpacityConfig
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
  #generateSmartSurfaceTokens(surfaceShades, shadowOpacityConfig = {}) {
    const tokens = {};
    const lightShadowOpacity = shadowOpacityConfig.light ?? 0.1;
    const darkShadowOpacity = shadowOpacityConfig.dark ?? 0.25;
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
      const shadowOpacity = isDark ? darkShadowOpacity : lightShadowOpacity;
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
    const validBase = Number.isFinite(Number(baseBorderWidth)) ? Number(baseBorderWidth) : enums.BorderWidths.medium;
    const toRenderablePx = (value) => `${Math.max(1, Math.ceil(value))}px`;
    return {
      hairline: toRenderablePx(validBase * 0.25),
      thin: toRenderablePx(validBase * 0.5),
      medium: toRenderablePx(validBase),
      thick: toRenderablePx(validBase * 1.5)
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
      containerPadding = 16,
      breakpoints = {
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280
      }
    } = layoutConfig;
    const hasExplicitMaxWidth = this.#hasDefinedConfigValue(layoutConfig, "maxWidth");
    const explicitMaxWidthValue = layoutConfig.maxWidth;
    const resolvedMaxWidths = this.#resolveLayoutMaxWidths(layoutConfig, {
      emitFallbacks: false
    });
    return {
      maxWidth: hasExplicitMaxWidth ? this.#formatLength(explicitMaxWidthValue, "1200px") : void 0,
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
  #resolveLayoutMaxWidths(layoutConfig = {}, options = {}) {
    const { emitFallbacks = true } = options;
    const defaultBreakpoints = {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280
    };
    const { maxWidths = {}, containerPadding = 16, breakpoints = defaultBreakpoints } = layoutConfig || {};
    const hasExplicitMaxWidth = this.#hasDefinedConfigValue(layoutConfig, "maxWidth");
    const hasExplicitMaxWidths = ["sm", "md", "lg", "xl"].some(
      (key) => this.#hasDefinedConfigValue(maxWidths, key)
    );
    if (!emitFallbacks && !hasExplicitMaxWidth && !hasExplicitMaxWidths) {
      return {
        sm: void 0,
        md: void 0,
        lg: void 0,
        xl: void 0
      };
    }
    const maxWidthValue = layoutConfig?.maxWidth;
    const paddingValue = this.#toNumber(containerPadding, 16);
    const baseMaxWidth = this.#toNumber(maxWidthValue, defaultBreakpoints.xl);
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
  #hasDefinedConfigValue(source, key) {
    if (!source || typeof source !== "object")
      return false;
    if (!Object.prototype.hasOwnProperty.call(source, key))
      return false;
    const value = source[key];
    if (value === void 0 || value === null)
      return false;
    if (typeof value === "string" && value.trim().length === 0)
      return false;
    return true;
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
      if (value === void 0 || value === null) {
        return;
      }
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
  #generateDarkVariablesOnly(colors, darkShadows) {
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
  --color-text-muted: var(--color-gray-600);
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
    const shadowLines = darkShadows ? [this.#generateShadowVariables(darkShadows)] : [];
    const body = [
      ...varLines,
      ...smartLines,
      ...shadowLines,
      semantic,
      backdrop,
      mesh
    ].join("");
    return `html[data-theme="dark"] {
${body}}
`;
  }
  // Generate ONLY dark mode variables for the tokens layer (no wrapper, no component rules)
  #generateDarkVariablesForTokensLayer(colors, darkShadows) {
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
      `    --color-text-muted: var(--color-gray-600);
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
    const shadowLines = darkShadows ? [this.#generateShadowVariables(darkShadows)] : [];
    const content = [
      ...varLines,
      ...smartLines,
      ...shadowLines,
      semantic,
      backdrop,
      mesh
    ].join("");
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
  border: var(--border-width-thin) solid color-mix(in oklab, var(--color-primary-500) 22%, transparent);
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
  border: var(--border-width-thin) solid color-mix(in oklab, var(--color-primary-300) 26%, transparent);
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
    linear-gradient(var(--border-gradient-fill, var(--color-surface-base)), var(--border-gradient-fill, var(--color-surface-base))) padding-box,
    linear-gradient(var(--gradient-angle, 135deg),
      var(--color-primary-400),
      var(--color-accent-400)
    ) border-box;
}

/* Gradient border variants - different color combinations */
.border-gradient-primary {
  border: var(--border-width-medium) solid transparent;
  background:
    linear-gradient(var(--border-gradient-fill, var(--color-surface-base)), var(--border-gradient-fill, var(--color-surface-base))) padding-box,
    linear-gradient(var(--gradient-angle, 135deg),
      var(--color-primary-300),
      var(--color-primary-600)
    ) border-box;
}

.border-gradient-accent {
  border: var(--border-width-medium) solid transparent;
  background:
    linear-gradient(var(--border-gradient-fill, var(--color-surface-base)), var(--border-gradient-fill, var(--color-surface-base))) padding-box,
    linear-gradient(var(--gradient-angle, 135deg),
      var(--color-accent-300),
      var(--color-accent-600)
    ) border-box;
}

.border-gradient-secondary {
  border: var(--border-width-medium) solid transparent;
  background:
    linear-gradient(var(--border-gradient-fill, var(--color-surface-base)), var(--border-gradient-fill, var(--color-surface-base))) padding-box,
    linear-gradient(var(--gradient-angle, 135deg),
      var(--color-secondary-300),
      var(--color-secondary-600)
    ) border-box;
}

/* Gradient border with different strengths/thickness */
.border-gradient-soft {
  border: var(--border-width-thin) solid transparent;
  background:
    linear-gradient(var(--border-gradient-fill, var(--color-surface-base)), var(--border-gradient-fill, var(--color-surface-base))) padding-box,
    linear-gradient(var(--gradient-angle, 135deg),
      var(--color-primary-400),
      var(--color-accent-400)
    ) border-box;
}

.border-gradient-medium {
  border: var(--border-width-medium) solid transparent;
  background:
    linear-gradient(var(--border-gradient-fill, var(--color-surface-base)), var(--border-gradient-fill, var(--color-surface-base))) padding-box,
    linear-gradient(var(--gradient-angle, 135deg),
      var(--color-primary-400),
      var(--color-accent-400)
    ) border-box;
}

.border-gradient-strong {
  border: var(--border-width-thick) solid transparent;
  background:
    linear-gradient(var(--border-gradient-fill, var(--color-surface-base)), var(--border-gradient-fill, var(--color-surface-base))) padding-box,
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
    linear-gradient(var(--border-gradient-fill, var(--color-surface-base)), var(--border-gradient-fill, var(--color-surface-base))) padding-box,
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
  border-left: calc(var(--border-width-thick) + var(--border-width-thin)) solid var(--color-primary-500);
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
  border-top: var(--border-width-thin) solid var(--color-border);
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
  border: var(--border-width-thin) solid var(--color-border);
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
  border: var(--border-width-thin) solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface-base);
  
  &[open] :where(summary) {
    border-bottom: var(--border-width-thin) solid var(--color-border);
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
      shape = {},
      spatialRhythm = {},
      inputPadding,
      buttonPadding,
      focusRingWidth,
      focusRingOpacity,
      borderWidthThin,
      sectionSpacing,
      buttonMinHeight,
      inputMinHeight
    } = this.options.design;
    const shapeBorderWidth = typeof shape.borderWidth === "number" ? shape.borderWidth : typeof shape.borderWidth === "string" ? enums.BorderWidths[shape.borderWidth] ?? null : null;
    const inputPaddingValue = spatialRhythm.inputPadding ?? inputPadding ?? 0.75;
    const buttonPaddingValue = spatialRhythm.buttonPadding ?? buttonPadding ?? 1;
    const focusWidth = focusRingWidth || 3;
    const borderWidth = borderWidthThin || shapeBorderWidth || enums.BorderWidths.thin;
    const sectionSpacingValue = spatialRhythm.sectionSpacing ?? sectionSpacing ?? 2;
    const minButtonHeight = buttonMinHeight || 30;
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
  border: var(--border-width-medium) solid var(--color-border);
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
    border: var(--border-width-thin) solid color-mix(in srgb, var(--color-primary-500) 30%, var(--color-border));
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
    border: var(--border-width-thin) solid color-mix(in srgb, var(--color-primary-500) 30%, var(--color-border));
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
  appearance: none;
  padding: 0;
  width: calc(var(--spacing-8) + var(--spacing-1));
  height: calc(var(--spacing-8) + var(--spacing-1));
  min-height: auto;
  border-radius: var(--radius-sm);
  border: var(--border-width-thin) solid var(--color-border);
  overflow: hidden;
  cursor: pointer;
  background: transparent;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
    border-radius: inherit;
  }

  &::-webkit-color-swatch {
    border: none;
    border-radius: inherit;
  }

  &::-moz-color-swatch {
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
  border: var(--border-width-medium) solid var(--color-border);
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
  border-width: var(--border-width-medium);
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
    border: var(--border-width-medium) solid var(--color-border);
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
    border-width: var(--border-width-medium);
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

/* Color input enhancement shell - applied by enhanceColorInput on label[data-color] */
label[data-color] {
  display: grid;
  gap: var(--spacing-2);

  .color-control {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-3);
    width: fit-content;
    min-height: var(--input-min-height, 40px);
    padding: var(--spacing-2) var(--spacing-3);
    border: var(--border-width-thin) solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface-base);
    color: var(--color-text-primary);
    transition: border-color var(--transition-fast), box-shadow var(--transition-fast), background-color var(--transition-fast);
  }

  .color-control .color-swatch {
    position: relative;
    display: inline-flex;
    width: calc(var(--spacing-8) + var(--spacing-1));
    height: calc(var(--spacing-8) + var(--spacing-1));
    border-radius: var(--radius-sm);
  }

  .color-control output {
    margin: 0;
    min-width: 8ch;
    font-family: var(--font-family-mono);
    font-size: var(--font-size-sm);
    line-height: var(--font-line-height-tight);
    color: var(--color-text-secondary);
    text-transform: lowercase;
  }

  .color-control[data-unset="1"] output {
    font-style: italic;
    color: var(--color-text-muted);
  }

  .color-control input[type="color"] {
    width: calc(var(--spacing-8) + var(--spacing-1));
    height: calc(var(--spacing-8) + var(--spacing-1));
    border-radius: var(--radius-sm);
    border: var(--border-width-thin) solid var(--color-border);
    background: transparent;
    padding: 0;
  }

  .color-control input[type="color"]::-webkit-color-swatch {
    border: none;
    border-radius: calc(var(--radius-sm) - var(--border-width-thin));
  }

  .color-control input[type="color"]::-moz-color-swatch {
    border: none;
    border-radius: calc(var(--radius-sm) - var(--border-width-thin));
  }

  .color-control .color-swatch[data-unset="1"]::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: var(--radius-sm);
    border: var(--border-width-thin) solid var(--color-border);
    background-color: color-mix(in oklab, var(--color-surface-subtle) 78%, var(--color-text-primary) 22%);
    background-image:
      linear-gradient(
        45deg,
        color-mix(in oklab, var(--color-surface-base) 88%, var(--color-text-primary) 12%) 25%,
        transparent 25%,
        transparent 75%,
        color-mix(in oklab, var(--color-surface-base) 88%, var(--color-text-primary) 12%) 75%,
        color-mix(in oklab, var(--color-surface-base) 88%, var(--color-text-primary) 12%)
      ),
      linear-gradient(
        45deg,
        color-mix(in oklab, var(--color-surface-base) 88%, var(--color-text-primary) 12%) 25%,
        transparent 25%,
        transparent 75%,
        color-mix(in oklab, var(--color-surface-base) 88%, var(--color-text-primary) 12%) 75%,
        color-mix(in oklab, var(--color-surface-base) 88%, var(--color-text-primary) 12%)
      );
    background-size: calc(var(--spacing-2) * 1.25) calc(var(--spacing-2) * 1.25);
    background-position:
      0 0,
      calc(var(--spacing-2) * 0.625) calc(var(--spacing-2) * 0.625);
    pointer-events: none;
  }

  .color-control .color-swatch[data-unset="1"] input[type="color"] {
    opacity: 0;
  }

  &:focus-within .color-control {
    border-color: var(--color-primary-500);
    box-shadow: 0 0 0 ${focusWidth}px color-mix(in oklab, var(--color-primary-500) ${Math.round(
        (focusRingOpacity || 0.3) * 100
      )}%, transparent);
  }

  &:has(input[type="color"]:disabled) .color-control {
    background: var(--color-input-disabled-bg);
    color: var(--color-input-disabled-text);
    cursor: not-allowed;
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
  border: var(--border-width-medium) solid transparent;
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
  max-width: var(--layout-max-width-md, 736px);
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
  border: var(--border-width-thin) solid var(--color-border);
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
  border: var(--border-width-medium) solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface-base);
  
  .array-controls {
    padding-top: var(--spacing-3);
    border-top: var(--border-width-medium) solid var(--color-border);
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
  border-bottom: var(--border-width-medium) solid var(--color-border);
}

td {
  padding: var(--spacing-3) var(--spacing-4);
  color: var(--color-text-secondary);
  border-bottom: var(--border-width-thin) solid var(--color-border);
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
  border: var(--border-width-thin) solid var(--color-border);
  
  th, td {
    border: var(--border-width-thin) solid var(--color-border);
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
  border-left: calc(var(--border-width-thick) + var(--border-width-thin)) solid;
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
  border: var(--border-width-thin) solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface-base);
  margin: 0 0 var(--spacing-3) 0;
  overflow: hidden;

  &[open] {
    overflow: visible;

    & > summary::after {
      transform: rotate(45deg);
    }

    &::details-content {
      block-size: auto;
      overflow: visible;
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
      overflow: visible;
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
  border: var(--border-width-thin) solid currentColor;
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
  left: 50%;
  top: 50%;
  width: min(600px, calc(100vw - var(--spacing-8)));
  max-width: min(600px, calc(100vw - var(--spacing-8)));
  max-height: calc(100dvh - var(--spacing-8));
  margin: 0;
  padding: 0;
  border: none;
  border-radius: var(--radius-lg);
  
  /* Surface styling - elevated overlay */
  background-color: var(--surface-overlay-bg);
  color: var(--surface-overlay-text);
  box-shadow: 0 8px 32px var(--surface-overlay-shadow);
  
  /* Smooth transitions */
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.95);
  transition: 
    opacity var(--transition-normal) ease,
    transform var(--transition-normal) ease;
  
  
}

/* Open state */
dialog[open] {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
  animation: pds-dialog-enter var(--transition-normal) ease;
}

@keyframes pds-dialog-enter {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

/* Safari fallback: disable scale animation to avoid dialog clipping bugs */
dialog.dialog-no-scale-animation {
  transform: translate(-50%, -50%);
  transition: opacity var(--transition-normal) ease;
}

dialog.dialog-no-scale-animation[open] {
  transform: translate(-50%, -50%);
  animation: pds-dialog-fade-enter var(--transition-normal) ease;
}

@keyframes pds-dialog-fade-enter {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Backdrop styling */
dialog::backdrop {
  background: var(--backdrop-bg);
  backdrop-filter: var(--backdrop-filter);
  opacity: 0;
  transition: opacity var(--transition-normal) ease;
}

dialog[open]::backdrop {
  opacity: var(--backdrop-opacity, 1);
  animation: pds-dialog-backdrop-enter var(--transition-normal) ease;
}

@keyframes pds-dialog-backdrop-enter {
  from { opacity: 0; }
  to { opacity: var(--backdrop-opacity, 1); }
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
    border-bottom: var(--border-width-thin) solid var(--surface-overlay-border);
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
    border-top: var(--border-width-thin) solid var(--surface-overlay-border);
    flex-shrink: 0;
  }
}

/* Dialog size modifiers */
dialog.dialog-sm { width: min(400px, calc(100vw - var(--spacing-8))); max-width: min(400px, calc(100vw - var(--spacing-8))); }
dialog.dialog-lg { width: min(800px, calc(100vw - var(--spacing-8))); max-width: min(800px, calc(100vw - var(--spacing-8))); }
dialog.dialog-xl { width: min(1200px, calc(100vw - var(--spacing-8))); max-width: min(1200px, calc(100vw - var(--spacing-8))); }
dialog.dialog-full { width: calc(100vw - var(--spacing-8)); max-width: calc(100vw - var(--spacing-8)); max-height: calc(100dvh - var(--spacing-8)); }

/* Mobile responsiveness - maximize on mobile */
@media (max-width: ${breakpoints.sm - 1}px) {
  dialog,
  dialog.dialog-no-scale-animation,
  dialog.dialog-no-scale-animation[open] {
    left: 0 !important;
    top: 0 !important;
  }

  dialog.dialog-no-scale-animation,
  dialog.dialog-no-scale-animation[open] {
    transform: none !important;
  }

  dialog[open] {
    left: 0 !important;
    top: 0 !important;
  }

  dialog { 
    max-width: 100vw; 
    width: 100vw;
    height: 100dvh;
    max-height: 100dvh; 
    --dialog-max-height: 100dvh; /* Override custom maxHeight on mobile */
    border-radius: 0; 
    margin: 0;
    transform: scale(0.98);
  }
  dialog[open] {
    transform: scale(1);
    animation: pds-dialog-enter-mobile var(--transition-normal) ease;
  }

  dialog.dialog-no-scale-animation {
    transition: opacity var(--transition-normal) ease;
  }
  dialog.dialog-no-scale-animation[open] {
    animation: pds-dialog-fade-enter var(--transition-normal) ease;
  }
  @keyframes pds-dialog-enter-mobile {
    from {
      opacity: 0;
      transform: scale(0.98);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  dialog header, dialog form > header, dialog article, dialog form > article, dialog footer, dialog form > footer { padding: var(--spacing-4); }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  dialog, dialog::backdrop { transition-duration: 0.01s !important; }
}

html:has(dialog[open]:modal) {
 overflow: hidden;
 scrollbar-gutter: stable;
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
    border-bottom: var(--border-width-medium) solid var(--color-border);
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
      border-bottom: var(--border-width-medium) solid transparent;
      margin-bottom: calc(-1 * var(--border-width-medium)); /* Overlap the nav border */

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
  border: var(--border-width-thick) solid transparent;
  background-clip: padding-box;
  transition: background-color var(--transition-fast);
  &:hover { background: var(--color-secondary-400); border: var(--border-width-medium) solid transparent; background-clip: padding-box; }
  &:active { background: var(--color-secondary-500); border: var(--border-width-medium) solid transparent; background-clip: padding-box; }
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
    const { layout = {} } = this.options.design;
    const iconOnlySize = layout.buttonMinHeight || 30;
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
    min-width: ${iconOnlySize}px;
    width: ${iconOnlySize}px;
    height: ${iconOnlySize}px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &.btn-sm.icon-only {
    min-width: calc(${iconOnlySize}px * 0.8);
    width: calc(${iconOnlySize}px * 0.8);
    height: calc(${iconOnlySize}px * 0.8);
  }

  &.btn-xs.icon-only {
    min-width: calc(${iconOnlySize}px * 0.6);
    width: calc(${iconOnlySize}px * 0.6);
    height: calc(${iconOnlySize}px * 0.6);
  }

  &.btn-lg.icon-only {
    min-width: calc(${iconOnlySize}px * 1.2);
    width: calc(${iconOnlySize}px * 1.2);
    height: calc(${iconOnlySize}px * 1.2);
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
    border: var(--border-width-thin) solid var(--color-border);
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
    visibility: hidden;
    display: none;
    pointer-events: none;
    transform-origin: top center;
    z-index: var(--z-dropdown, 1050);
    max-height: min(60vh, 24rem);
    overflow-x: hidden;
    overflow-y: auto;
    transition:
      opacity var(--dropdown-transition-duration) ease,
      visibility 0s linear var(--dropdown-transition-duration),
      display 0s linear var(--dropdown-transition-duration);
    transition-behavior: allow-discrete;
  }

  & > :last-child[aria-hidden="false"] {
    display: inline-block;
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transition:
      opacity var(--dropdown-transition-duration) ease,
      visibility 0s linear 0s,
      display 0s linear 0s;
  }

  menu {
    list-style: none;
  }

  menu li {
    padding: var(--spacing-1) 0;

    & + li {
      border-top: var(--border-width-thin) solid var(--color-border);
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
      border-top: var(--border-width-thick) solid var(--color-border);
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

  &[data-mode="auto"]:not([data-dropdown-direction]) > :last-child {
    top: 100%;
    bottom: auto;
    margin-top: var(--spacing-2);
    margin-bottom: 0;
    transform-origin: top center;
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
  button:not(.icon-only), a:not(.icon-only), select, textarea,
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
    border-width: var(--border-width-medium);
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
      darkShadows,
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
       ${this.#generateDarkVariablesForTokensLayer(colors, darkShadows)}
    }`
    ];
    sections.push(
      `
/* Non-layered dark variables fallback (ensures attribute wins) */
`
    );
    sections.push(this.#generateDarkVariablesOnly(colors, darkShadows));
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
    border: var(--border-width-thin) solid var(--color-border);
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
    border: var(--border-width-medium) solid var(--color-border);
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
  border: var(--border-width-thin) solid var(--color-border);
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
  --border-gradient-fill: var(--color-surface-base);
}

.surface-subtle {
  background-color: var(--color-surface-subtle);
  --border-gradient-fill: var(--color-surface-subtle);
}

.surface-elevated {
  background-color: var(--color-surface-elevated);
  --border-gradient-fill: var(--color-surface-elevated);
}

.surface-sunken {
  background-color: var(--color-surface-sunken);
  --border-gradient-fill: var(--color-surface-sunken);
}

.surface-overlay {
  background-color: var(--color-surface-overlay);
  --border-gradient-fill: var(--color-surface-overlay);
}

/* Translucent semantic variants */
.surface-translucent {
  background-color: var(--color-surface-translucent-50);
  --border-gradient-fill: var(--color-surface-translucent-50);
}

.surface-translucent-25 {
  background-color: var(--color-surface-translucent-25);
  --border-gradient-fill: var(--color-surface-translucent-25);
}

.surface-translucent-50 {
  background-color: var(--color-surface-translucent-50);
  --border-gradient-fill: var(--color-surface-translucent-50);
}

.surface-translucent-75 {
  background-color: var(--color-surface-translucent-75);
  --border-gradient-fill: var(--color-surface-translucent-75);
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
  --border-gradient-fill: var(--color-surface-inverse);
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
  --color-text-muted: var(--color-gray-600);
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
function validateDesign(designConfig = {}, options = {}) {
  const MIN = Number(options.minContrast || 4.5);
  const MIN_MUTED = Number(options.minMutedContrast || 3);
  const EXTENDED = Boolean(options.extendedChecks);
  const hexToRgb = (hex) => {
    const h = String(hex || "").replace("#", "");
    const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
    const num = parseInt(full || "0", 16);
    return { r: num >> 16 & 255, g: num >> 8 & 255, b: num & 255 };
  };
  const luminance = (hex) => {
    const { r, g, b } = hexToRgb(hex);
    const srgb = [r / 255, g / 255, b / 255].map(
      (v) => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    );
    return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
  };
  const contrast = (a, b) => {
    if (!a || !b)
      return 0;
    const L1 = luminance(a);
    const L2 = luminance(b);
    const lighter = Math.max(L1, L2);
    const darker = Math.min(L1, L2);
    return (lighter + 0.05) / (darker + 0.05);
  };
  const issues = [];
  try {
    const gen = new Generator({ design: structuredClone(designConfig) });
    const c = gen.tokens.colors;
    const light = {
      surfaceBg: c.surface?.base,
      surfaceText: c.gray?.[900] || "#000000",
      surfaceTextSecondary: c.gray?.[700] || c.gray?.[800] || c.gray?.[900],
      surfaceTextMuted: c.gray?.[500] || c.gray?.[600] || c.gray?.[700],
      surfaceElevated: c.surface?.elevated || c.surface?.base,
      primaryFill: c.interactive?.light?.fill || c.primary?.[600],
      primaryText: c.interactive?.light?.text || c.primary?.[600],
      accentFill: c.accent?.[600] || c.accent?.[500],
      successFill: c.success?.[600] || c.success?.[500],
      warningFill: c.warning?.[600] || c.warning?.[500],
      dangerFill: c.danger?.[600] || c.danger?.[500],
      infoFill: c.info?.[600] || c.info?.[500]
    };
    const bestTextContrast = (bg) => Math.max(contrast(bg, "#ffffff"), contrast(bg, "#000000"));
    const lightBtnRatio = contrast(light.primaryFill, "#ffffff");
    if (lightBtnRatio < MIN) {
      issues.push({
        path: "/colors/primary",
        message: `Primary button contrast too low in light theme (${lightBtnRatio.toFixed(
          2
        )} < ${MIN}). Choose a darker primary.`,
        ratio: lightBtnRatio,
        min: MIN,
        context: "light/btn-primary"
      });
    }
    const lightTextRatio = contrast(light.surfaceBg, light.surfaceText);
    if (lightTextRatio < MIN) {
      issues.push({
        path: "/colors/background",
        message: `Base text contrast on surface (light) is too low (${lightTextRatio.toFixed(
          2
        )} < ${MIN}). Adjust background or secondary (gray).`,
        ratio: lightTextRatio,
        min: MIN,
        context: "light/surface-text"
      });
    }
    if (EXTENDED) {
      const lightSecondaryRatio = contrast(light.surfaceBg, light.surfaceTextSecondary);
      if (lightSecondaryRatio < MIN) {
        issues.push({
          path: "/colors/secondary",
          message: `Secondary text contrast on base surface (light) is too low (${lightSecondaryRatio.toFixed(
            2
          )} < ${MIN}).`,
          ratio: lightSecondaryRatio,
          min: MIN,
          context: "light/surface-text-secondary"
        });
      }
      const lightMutedRatio = contrast(light.surfaceBg, light.surfaceTextMuted);
      if (lightMutedRatio < MIN_MUTED) {
        issues.push({
          path: "/colors/secondary",
          message: `Muted text contrast on base surface (light) is too low (${lightMutedRatio.toFixed(
            2
          )} < ${MIN_MUTED}).`,
          ratio: lightMutedRatio,
          min: MIN_MUTED,
          context: "light/surface-text-muted"
        });
      }
      const elevatedTextRatio = contrast(light.surfaceElevated, light.surfaceText);
      if (elevatedTextRatio < MIN) {
        issues.push({
          path: "/colors/background",
          message: `Elevated surface text contrast (light) is too low (${elevatedTextRatio.toFixed(
            2
          )} < ${MIN}).`,
          ratio: elevatedTextRatio,
          min: MIN,
          context: "light/surface-elevated-text"
        });
      }
    }
    const lightOutlineRatio = contrast(light.primaryText, light.surfaceBg);
    if (lightOutlineRatio < MIN) {
      issues.push({
        path: "/colors/primary",
        message: `Primary text on surface is too low for outline/link styles (light) (${lightOutlineRatio.toFixed(
          2
        )} < ${MIN}). Choose a darker primary or lighter surface.`,
        ratio: lightOutlineRatio,
        min: MIN,
        context: "light/outline"
      });
    }
    if (EXTENDED) {
      const semanticFills = [
        { path: "/colors/accent", key: "accent", value: light.accentFill },
        { path: "/colors/success", key: "success", value: light.successFill },
        { path: "/colors/warning", key: "warning", value: light.warningFill },
        { path: "/colors/danger", key: "danger", value: light.dangerFill },
        { path: "/colors/info", key: "info", value: light.infoFill }
      ];
      semanticFills.forEach((entry) => {
        if (!entry?.value)
          return;
        const ratio = bestTextContrast(entry.value);
        if (ratio < MIN) {
          issues.push({
            path: entry.path,
            message: `${entry.key} fill color cannot achieve accessible text contrast (${ratio.toFixed(
              2
            )} < ${MIN}) with either white or black text.`,
            ratio,
            min: MIN,
            context: `light/${entry.key}-fill`
          });
        }
      });
    }
    const d = c.dark;
    if (d) {
      const dark = {
        surfaceBg: d.surface?.base || c.surface?.inverse,
        surfaceText: d.gray?.[50] || d.gray?.[100] || "#ffffff",
        surfaceTextMuted: d.gray?.[300] || d.gray?.[400] || d.gray?.[500],
        primaryFill: c.interactive?.dark?.fill || d.primary?.[600],
        primaryText: c.interactive?.dark?.text || d.primary?.[600]
      };
      const darkBtnRatio = contrast(dark.primaryFill, "#ffffff");
      if (darkBtnRatio < MIN) {
        issues.push({
          path: "/colors/darkMode/primary",
          message: `Primary button contrast too low in dark theme (${darkBtnRatio.toFixed(
            2
          )} < ${MIN}). Override darkMode.primary or pick a brighter hue.`,
          ratio: darkBtnRatio,
          min: MIN,
          context: "dark/btn-primary"
        });
      }
      const darkOutlineRatio = contrast(dark.primaryText, dark.surfaceBg);
      if (darkOutlineRatio < MIN) {
        issues.push({
          path: "/colors/darkMode/primary",
          message: `Primary text on surface is too low for outline/link styles (dark) (${darkOutlineRatio.toFixed(
            2
          )} < ${MIN}). Override darkMode.primary/background.`,
          ratio: darkOutlineRatio,
          min: MIN,
          context: "dark/outline"
        });
      }
      if (EXTENDED) {
        const darkTextRatio = contrast(dark.surfaceBg, dark.surfaceText);
        if (darkTextRatio < MIN) {
          issues.push({
            path: "/colors/darkMode/background",
            message: `Base text contrast on surface (dark) is too low (${darkTextRatio.toFixed(
              2
            )} < ${MIN}).`,
            ratio: darkTextRatio,
            min: MIN,
            context: "dark/surface-text"
          });
        }
        const darkMutedRatio = contrast(dark.surfaceBg, dark.surfaceTextMuted);
        if (darkMutedRatio < MIN_MUTED) {
          issues.push({
            path: "/colors/darkMode/secondary",
            message: `Muted text contrast on surface (dark) is too low (${darkMutedRatio.toFixed(
              2
            )} < ${MIN_MUTED}).`,
            ratio: darkMutedRatio,
            min: MIN_MUTED,
            context: "dark/surface-text-muted"
          });
        }
      }
    }
  } catch (err) {
    issues.push({
      path: "/",
      message: `Validation failed: ${String(err?.message || err)}`,
      ratio: 0,
      min: 0
    });
  }
  return { ok: issues.length === 0, issues };
}

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
  { selector: "label[data-color]" },
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
  elem.addEventListener(
    "toggle",
    (event) => {
      if (event.target.open && event.target.parentElement === elem) {
        elem.querySelectorAll(":scope > details[open]").forEach((details) => {
          if (details !== event.target) {
            details.open = false;
          }
        });
      }
    },
    true
  );
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
  const VIEWPORT_PADDING = 8;
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
  const measureMenuSize = () => {
    const previousStyle = menu.getAttribute("style");
    menu.style.visibility = "hidden";
    menu.style.display = "inline-block";
    menu.style.pointerEvents = "none";
    const rect = menu.getBoundingClientRect();
    const width = Math.max(menu.offsetWidth || 0, menu.scrollWidth || 0, rect.width || 0, 1);
    const height = Math.max(
      menu.offsetHeight || 0,
      menu.scrollHeight || 0,
      rect.height || 0,
      1
    );
    if (previousStyle === null) {
      menu.removeAttribute("style");
    } else {
      menu.setAttribute("style", previousStyle);
    }
    return { width, height };
  };
  const resolveDirection = () => {
    const mode = (elem.getAttribute("data-direction") || elem.getAttribute("data-dropdown-direction") || elem.getAttribute("data-mode") || "auto").toLowerCase();
    if (mode === "up" || mode === "down")
      return mode;
    const anchorRect = (trigger || elem).getBoundingClientRect();
    const { height: menuHeight } = measureMenuSize();
    const spaceBelow = Math.max(0, window.innerHeight - anchorRect.bottom);
    const spaceAbove = Math.max(0, anchorRect.top);
    const fitsDown = spaceBelow >= menuHeight;
    const fitsUp = spaceAbove >= menuHeight;
    if (fitsDown && !fitsUp)
      return "down";
    if (fitsUp && !fitsDown)
      return "up";
    if (fitsDown && fitsUp)
      return "down";
    return spaceAbove > spaceBelow ? "up" : "down";
  };
  const resolveAlign = () => {
    const align = (elem.getAttribute("data-align") || elem.getAttribute("data-dropdown-align") || "auto").toLowerCase();
    if (align === "left" || align === "right" || align === "start" || align === "end") {
      return align === "start" ? "left" : align === "end" ? "right" : align;
    }
    const anchorRect = (trigger || elem).getBoundingClientRect();
    const { width: menuWidth } = measureMenuSize();
    const spaceForLeftAligned = Math.max(0, window.innerWidth - anchorRect.left);
    const spaceForRightAligned = Math.max(0, anchorRect.right);
    const fitsLeft = spaceForLeftAligned >= menuWidth;
    const fitsRight = spaceForRightAligned >= menuWidth;
    if (fitsLeft && !fitsRight)
      return "left";
    if (fitsRight && !fitsLeft)
      return "right";
    if (fitsLeft && fitsRight)
      return "left";
    return spaceForRightAligned > spaceForLeftAligned ? "right" : "left";
  };
  const readLengthToken = (tokenName, fallback = 8) => {
    const raw = getComputedStyle(elem).getPropertyValue(tokenName).trim();
    if (!raw)
      return fallback;
    const probe = document.createElement("span");
    probe.style.position = "fixed";
    probe.style.visibility = "hidden";
    probe.style.pointerEvents = "none";
    probe.style.height = raw;
    document.body.appendChild(probe);
    const parsed = Number.parseFloat(getComputedStyle(probe).height);
    probe.remove();
    return Number.isFinite(parsed) ? parsed : fallback;
  };
  const clearFloatingMenuPosition = () => {
    menu.style.removeProperty("position");
    menu.style.removeProperty("left");
    menu.style.removeProperty("top");
    menu.style.removeProperty("right");
    menu.style.removeProperty("bottom");
    menu.style.removeProperty("margin-top");
    menu.style.removeProperty("margin-bottom");
    menu.style.removeProperty("max-width");
    menu.style.removeProperty("max-inline-size");
    menu.style.removeProperty("max-height");
    menu.style.removeProperty("overflow");
  };
  const reattachFloatingMenu = () => {
    if (menu.getAttribute("aria-hidden") !== "false")
      return;
    clearFloatingMenuPosition();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        positionFloatingMenu();
      });
    });
  };
  const positionFloatingMenu = () => {
    if (menu.getAttribute("aria-hidden") !== "false")
      return;
    const anchorRect = (trigger || elem).getBoundingClientRect();
    const viewport = window.visualViewport;
    const viewportWidth = viewport?.width || document.documentElement?.clientWidth || window.innerWidth;
    const viewportHeight = viewport?.height || document.documentElement?.clientHeight || window.innerHeight;
    const viewportOffsetLeft = viewport?.offsetLeft || 0;
    const viewportOffsetTop = viewport?.offsetTop || 0;
    const maxMenuWidth = Math.max(1, viewportWidth - VIEWPORT_PADDING * 2);
    const maxMenuHeight = Math.max(1, viewportHeight - VIEWPORT_PADDING * 2);
    menu.style.maxWidth = `${Math.round(maxMenuWidth)}px`;
    menu.style.maxInlineSize = `${Math.round(maxMenuWidth)}px`;
    menu.style.maxHeight = `${Math.round(maxMenuHeight)}px`;
    menu.style.overflow = "auto";
    const { width: menuWidth, height: menuHeight } = measureMenuSize();
    const spacing = readLengthToken("--spacing-2", 8);
    const direction = resolveDirection();
    const align = resolveAlign();
    elem.dataset.dropdownDirection = direction;
    elem.dataset.dropdownAlign = align;
    let left = align === "right" ? anchorRect.right - menuWidth : anchorRect.left;
    if (menuWidth >= maxMenuWidth - 1) {
      left = viewportOffsetLeft + VIEWPORT_PADDING;
    } else {
      left = Math.max(
        viewportOffsetLeft + VIEWPORT_PADDING,
        Math.min(
          left,
          viewportOffsetLeft + viewportWidth - menuWidth - VIEWPORT_PADDING
        )
      );
    }
    let top = direction === "up" ? anchorRect.top - spacing - menuHeight : anchorRect.bottom + spacing;
    top = Math.max(
      viewportOffsetTop + VIEWPORT_PADDING,
      Math.min(
        top,
        viewportOffsetTop + viewportHeight - menuHeight - VIEWPORT_PADDING
      )
    );
    menu.style.position = "fixed";
    menu.style.left = `${Math.round(left)}px`;
    menu.style.top = `${Math.round(top)}px`;
    menu.style.right = "auto";
    menu.style.bottom = "auto";
    menu.style.marginTop = "0";
    menu.style.marginBottom = "0";
  };
  let repositionHandler = null;
  const bindReposition = () => {
    if (repositionHandler)
      return;
    repositionHandler = () => positionFloatingMenu();
    window.addEventListener("resize", repositionHandler);
    window.addEventListener("scroll", repositionHandler, true);
  };
  const unbindReposition = () => {
    if (!repositionHandler)
      return;
    window.removeEventListener("resize", repositionHandler);
    window.removeEventListener("scroll", repositionHandler, true);
    repositionHandler = null;
  };
  let configChangedHandler = null;
  const bindConfigChanged = () => {
    if (configChangedHandler || typeof document === "undefined")
      return;
    configChangedHandler = () => {
      if (menu.getAttribute("aria-hidden") !== "false")
        return;
      elem.dataset.dropdownDirection = resolveDirection();
      elem.dataset.dropdownAlign = resolveAlign();
      reattachFloatingMenu();
      setTimeout(() => {
        if (menu.getAttribute("aria-hidden") !== "false")
          return;
        reattachFloatingMenu();
      }, 50);
      setTimeout(() => {
        if (menu.getAttribute("aria-hidden") !== "false")
          return;
        reattachFloatingMenu();
      }, 150);
    };
    document.addEventListener("pds:config-changed", configChangedHandler);
  };
  const unbindConfigChanged = () => {
    if (!configChangedHandler || typeof document === "undefined")
      return;
    document.removeEventListener("pds:config-changed", configChangedHandler);
    configChangedHandler = null;
  };
  let clickHandler = null;
  const openMenu = () => {
    elem.dataset.dropdownDirection = resolveDirection();
    elem.dataset.dropdownAlign = resolveAlign();
    menu.setAttribute("aria-hidden", "false");
    trigger?.setAttribute("aria-expanded", "true");
    bindReposition();
    bindConfigChanged();
    reattachFloatingMenu();
    if (!clickHandler) {
      clickHandler = (event) => {
        const path = event.composedPath ? event.composedPath() : [event.target];
        const clickedInside = path.some((node) => node === elem);
        if (!clickedInside) {
          closeMenu();
        }
      };
      setTimeout(() => {
        document.addEventListener("click", clickHandler);
      }, 0);
    }
  };
  const closeMenu = () => {
    menu.setAttribute("aria-hidden", "true");
    trigger?.setAttribute("aria-expanded", "false");
    unbindReposition();
    unbindConfigChanged();
    clearFloatingMenuPosition();
    if (clickHandler) {
      document.removeEventListener("click", clickHandler);
      clickHandler = null;
    }
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
  elem.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      trigger?.focus();
    }
  });
  elem.addEventListener("focusout", (event) => {
    if (event.relatedTarget) {
      const path = event.composedPath ? event.composedPath() : [event.relatedTarget];
      const focusedInside = path.some((node) => node === elem);
      if (!focusedInside) {
        closeMenu();
      }
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
function enhanceColorInput(elem) {
  if (elem.dataset.enhancedColorInput)
    return;
  const input = elem.querySelector('input[type="color"]');
  if (!input)
    return;
  elem.dataset.enhancedColorInput = "true";
  let control = elem.querySelector(":scope > .color-control");
  let swatch = elem.querySelector(":scope > .color-control > .color-swatch");
  let output = elem.querySelector(":scope > .color-control > output");
  if (!control) {
    control = document.createElement("span");
    control.className = "color-control";
    input.before(control);
  }
  if (!swatch) {
    swatch = document.createElement("span");
    swatch.className = "color-swatch";
    control.appendChild(swatch);
  }
  if (input.parentElement !== swatch) {
    swatch.appendChild(input);
  }
  if (!output) {
    output = document.createElement("output");
    control.appendChild(output);
  }
  const sync = () => {
    const isUnset = input.dataset.colorUnset === "1";
    if (isUnset) {
      output.value = "";
      output.textContent = "not set";
      control.dataset.value = "";
      control.dataset.unset = "1";
      swatch.dataset.unset = "1";
      return;
    }
    output.value = input.value;
    output.textContent = input.value;
    control.dataset.value = input.value;
    delete control.dataset.unset;
    delete swatch.dataset.unset;
  };
  sync();
  const setResolved = () => {
    if (input.dataset.colorUnset === "1") {
      input.dataset.colorUnset = "0";
    }
    sync();
  };
  input.addEventListener("input", setResolved, { passive: true });
  input.addEventListener("change", setResolved, { passive: true });
}
function enhanceRange(elem) {
  if (elem.dataset.enhancedRange)
    return;
  const wireProgrammaticUpdates = (updateFn) => {
    if (elem.dataset.enhancedRangeProgrammatic)
      return;
    elem.dataset.enhancedRangeProgrammatic = "1";
    const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(elem), "value") || Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");
    if (descriptor?.get && descriptor?.set) {
      Object.defineProperty(elem, "value", {
        configurable: true,
        enumerable: descriptor.enumerable,
        get() {
          return descriptor.get.call(this);
        },
        set(nextValue) {
          descriptor.set.call(this, nextValue);
          updateFn();
        }
      });
    }
    const attrObserver = new MutationObserver((mutations) => {
      const shouldUpdate = mutations.some((mutation) => {
        const attr = mutation.attributeName;
        return attr === "value" || attr === "min" || attr === "max";
      });
      if (shouldUpdate)
        updateFn();
    });
    attrObserver.observe(elem, {
      attributes: true,
      attributeFilter: ["value", "min", "max"]
    });
  };
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
      elem.addEventListener("change", updateOutput);
      wireProgrammaticUpdates(updateOutput);
      updateOutput();
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
    elem.addEventListener("change", updateBubble);
    wireProgrammaticUpdates(updateBubble);
    updateBubble();
  }
  elem.dataset.enhancedRange = "1";
}
function enhanceRequired(elem) {
  if (elem.dataset.enhancedRequired)
    return;
  elem.dataset.enhancedRequired = "true";
  const enhanceRequiredField = (input) => {
    let label;
    if (input.closest("[role$=group]")) {
      label = input.closest("[role$=group]").querySelector("legend");
    } else {
      label = input.closest("label");
    }
    if (!label)
      return;
    if (label.querySelector(".required-asterisk"))
      return;
    const asterisk = document.createElement("span");
    asterisk.classList.add("required-asterisk");
    asterisk.textContent = "*";
    asterisk.style.marginLeft = "4px";
    const labelText = label.querySelector("span, [data-label]");
    if (labelText) {
      labelText.appendChild(asterisk);
    } else {
      const field = label.querySelector("input, select, textarea");
      if (field) {
        label.insertBefore(asterisk, field);
      } else {
        label.appendChild(asterisk);
      }
    }
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
  const getFirstInput = () => elem.querySelector('input[type="radio"], input[type="checkbox"]');
  elem.appendChild(addInput);
  addInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === "Tab") {
      const value = addInput.value.trim();
      if (value) {
        event.preventDefault();
        const firstInput = getFirstInput();
        const type = firstInput?.type === "radio" ? "radio" : "checkbox";
        const id = `open-group-${Math.random().toString(36).substring(2, 11)}`;
        const label = document.createElement("label");
        const span = document.createElement("span");
        span.setAttribute("data-label", "");
        span.textContent = value;
        const input = document.createElement("input");
        input.type = type;
        input.name = firstInput?.name || elem.getAttribute("data-name") || "open-group";
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
  ["label[data-color]", enhanceColorInput],
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
    selector: "label[data-color]",
    description: "Wraps color inputs with a styled control shell and synced hex output while keeping the native picker.",
    demoHtml: `
      <label data-color>
        <span>Brand color</span>
        <input type="color" value="#7c3aed">
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
function attachFoucListener(PDS3) {
  if (__foucListenerAttached || typeof document === "undefined")
    return;
  __foucListenerAttached = true;
  PDS3.addEventListener("pds:ready", (event) => {
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
function normalizeInitConfig(inputConfig = {}, options = {}, { presets: presets2, defaultLog: defaultLog2, validateDesignConfig: validateDesignConfig2, validateInitConfig: validateInitConfig2 } = {}) {
  const logFn = inputConfig && typeof inputConfig.log === "function" ? inputConfig.log : defaultLog2;
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
  if (inputConfig && typeof inputConfig === "object" && typeof validateInitConfig2 === "function") {
    validateInitConfig2(inputConfig, { log: logFn, context: "PDS.start" });
  }
  let generatorConfig;
  let presetInfo = null;
  if (hasNewShape) {
    if (designOverrides && typeof designOverrides === "object" && typeof validateDesignConfig2 === "function") {
      validateDesignConfig2(designOverrides, { log: logFn, context: "PDS.start" });
    }
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
    if (typeof validateDesignConfig2 === "function") {
      validateDesignConfig2(inputConfig, { log: logFn, context: "PDS.start" });
    }
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

// src/js/pds-core/pds-theme-utils.js
var DEFAULT_THEMES = ["light", "dark"];
var VALID_THEMES = new Set(DEFAULT_THEMES);
function normalizePresetThemes(preset) {
  const themes = Array.isArray(preset?.themes) ? preset.themes.map((theme) => String(theme).toLowerCase()) : DEFAULT_THEMES;
  const normalized = themes.filter((theme) => VALID_THEMES.has(theme));
  return normalized.length ? normalized : DEFAULT_THEMES;
}
function resolveThemePreference(preference, { preferDocument = true } = {}) {
  const normalized = String(preference || "").toLowerCase();
  if (VALID_THEMES.has(normalized))
    return normalized;
  if (preferDocument && typeof document !== "undefined") {
    const applied = document.documentElement?.getAttribute("data-theme");
    if (VALID_THEMES.has(applied))
      return applied;
  }
  if (typeof window !== "undefined" && window.matchMedia) {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  }
  return "light";
}
function isPresetThemeCompatible(preset, themePreference) {
  const resolvedTheme = resolveThemePreference(themePreference);
  const themes = normalizePresetThemes(preset);
  return themes.includes(resolvedTheme);
}

// src/js/pds-core/pds-live.js
var __liveApiReady = false;
var __queryClass = null;
var LIVE_EDIT_TOGGLE_ID = "pds-live-edit-toggle";
var LIVE_EDIT_TOGGLE_STYLE_ID = "pds-live-edit-toggle-style";
function whenDocumentBodyReady(callback) {
  if (typeof document === "undefined" || typeof callback !== "function")
    return;
  if (document.body) {
    callback();
    return;
  }
  const onReady = () => {
    if (!document.body)
      return;
    document.removeEventListener("DOMContentLoaded", onReady);
    callback();
  };
  document.addEventListener("DOMContentLoaded", onReady, { once: true });
}
function mountLiveEdit(options = {}) {
  const interactive = options?.interactive !== false;
  if (typeof document === "undefined")
    return;
  whenDocumentBodyReady(() => {
    if (!document.querySelector("pds-live-edit")) {
      const liveEditor = document.createElement("pds-live-edit");
      if (!interactive) {
        liveEditor.setAttribute("data-pds-live-settings-only", "true");
      }
      document.body.appendChild(liveEditor);
    } else if (!interactive) {
      const existing = document.querySelector("pds-live-edit");
      if (existing) {
        existing.setAttribute("data-pds-live-settings-only", "true");
      }
    }
  });
}
function waitFor(ms = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, Math.max(0, Number(ms) || 0));
  });
}
async function ensureLiveEditInstance(options = {}) {
  const mountIfMissing = options?.mountIfMissing !== false;
  const interactive = options?.interactive !== false;
  const requiredMethod = typeof options?.requiredMethod === "string" && options.requiredMethod.trim() ? options.requiredMethod.trim() : "openDesignSettings";
  const timeoutMs = Number.isFinite(Number(options?.timeoutMs)) ? Number(options.timeoutMs) : 2400;
  if (typeof document === "undefined")
    return null;
  if (!mountIfMissing && !document.querySelector("pds-live-edit")) {
    return null;
  }
  if (mountIfMissing) {
    mountLiveEdit({ interactive });
  }
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    const liveEditor = document.querySelector("pds-live-edit");
    if (!liveEditor) {
      await waitFor(40);
      continue;
    }
    if (typeof liveEditor?.[requiredMethod] === "function") {
      return liveEditor;
    }
    if (typeof customElements !== "undefined" && typeof customElements.whenDefined === "function") {
      try {
        await Promise.race([customElements.whenDefined("pds-live-edit"), waitFor(80)]);
      } catch (error) {
        await waitFor(40);
      }
      continue;
    }
    await waitFor(40);
  }
  const fallback = document.querySelector("pds-live-edit");
  if (fallback && typeof fallback?.[requiredMethod] === "function") {
    return fallback;
  }
  return null;
}
function unmountLiveEdit() {
  if (typeof document === "undefined")
    return;
  const editors = document.querySelectorAll("pds-live-edit");
  editors.forEach((editor) => {
    if (typeof editor?.setInteractiveEditingEnabled === "function") {
      editor.setInteractiveEditingEnabled(false);
    }
    editor.remove();
  });
}
function getLiveEditInteractiveState(liveEditor) {
  if (!liveEditor)
    return false;
  if (typeof liveEditor.isInteractiveEditingEnabled === "function") {
    return Boolean(liveEditor.isInteractiveEditingEnabled());
  }
  return true;
}
function ensureLiveEditToggleStyles() {
  if (typeof document === "undefined")
    return;
  if (document.getElementById(LIVE_EDIT_TOGGLE_STYLE_ID))
    return;
  const style = document.createElement("style");
  style.id = LIVE_EDIT_TOGGLE_STYLE_ID;
  style.textContent = /*css*/
  `
    :where(.pds-live-edit-toggle-nav) {
      position: fixed;
      top: var(--spacing-3);
      right: var(--spacing-3);
      z-index: var(--z-dropdown, 1050);
    }

    :where(.pds-live-edit-toggle-nav menu) {
      min-width: 220px;
    }

    :where(.pds-live-edit-toggle-nav menu a[data-pds-live-action]) {
      cursor: pointer;
    }

    :where(.pds-live-edit-toggle-nav menu li.pds-live-shared-quick-mode-item) {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    :where(.pds-live-edit-toggle-nav menu li.pds-live-shared-quick-mode-item .pds-live-editor-menu) {
      display: grid;
      gap: var(--spacing-2);
      padding: var(--spacing-2);
      border-bottom: var(--border-width-thin) solid var(--color-border);
    }

    :where(.pds-live-edit-toggle-nav menu li.pds-live-shared-quick-mode-item label) {
      display: grid;
      gap: var(--spacing-1);
      margin: 0;
    }

    :where(.pds-live-edit-toggle-nav menu li.pds-live-shared-quick-mode-item label > span) {
      font-size: var(--font-size-xs);
      color: var(--color-text-muted);
    }

    :where(.pds-live-edit-toggle-nav menu li > hr) {
      border: 0;
      border-top: var(--border-width-thin) solid var(--color-border);
      margin: var(--spacing-2) 0 var(--spacing-1) 0;
    }

    :where(.pds-live-edit-toggle-nav menu li:has(> hr)) {
      padding: 0;
      margin: 0;
      list-style: none;
      pointer-events: none;
    }

    :where(.pds-live-edit-toggle-nav menu a[data-pds-live-action="reset-config"]) {
      color: var(--color-danger-700);
    }

    :where(.pds-live-edit-toggle-nav menu a[data-pds-live-action="reset-config"] pds-icon) {
      color: var(--color-danger-700);
    }
  `;
  document.head.appendChild(style);
}
function updateLiveEditToggleState(button, isEnabled) {
  if (!button)
    return;
  button.classList.toggle("btn-primary", isEnabled);
  button.classList.toggle("btn-secondary", !isEnabled);
  button.setAttribute("aria-pressed", isEnabled ? "true" : "false");
  const label = "PDS Manager";
  button.setAttribute("aria-label", label);
  button.setAttribute("title", label);
}
async function ensureLiveEditToggleButton() {
  if (typeof document === "undefined")
    return null;
  ensureLiveEditToggleStyles();
  let button = document.getElementById(LIVE_EDIT_TOGGLE_ID);
  if (!button) {
    const nav = document.createElement("nav");
    nav.className = "pds-live-edit-toggle-nav";
    nav.setAttribute("data-dropdown", "");
    nav.setAttribute("data-mode", "auto");
    nav.setAttribute("data-pds-live-edit-ignore", "true");
    button = document.createElement("button");
    button.id = LIVE_EDIT_TOGGLE_ID;
    button.type = "button";
    button.className = "icon-only btn-secondary";
    button.setAttribute("data-pds-live-edit-ignore", "true");
    button.innerHTML = '<pds-icon icon="cursor-click" size="sm"></pds-icon>';
    const menu = document.createElement("menu");
    menu.setAttribute("data-pds-live-edit-ignore", "true");
    const createItem = (action, label, icon) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = "#";
      link.dataset.pdsLiveAction = action;
      link.setAttribute("data-pds-live-edit-ignore", "true");
      const iconEl = document.createElement("pds-icon");
      iconEl.setAttribute("icon", icon);
      iconEl.setAttribute("size", "sm");
      link.append(iconEl, document.createTextNode(` ${label}`));
      li.appendChild(link);
      return li;
    };
    const createSeparator = () => {
      const li = document.createElement("li");
      li.setAttribute("data-pds-live-edit-ignore", "true");
      const hr = document.createElement("hr");
      hr.setAttribute("aria-hidden", "true");
      li.appendChild(hr);
      return li;
    };
    menu.appendChild(createItem("toggle", "Toggle live editing", "pencil"));
    menu.appendChild(createItem("open-settings", "Open Settings", "gear"));
    menu.appendChild(createSeparator());
    menu.appendChild(createItem("reset-config", "Reset Config", "arrow-counter-clockwise"));
    await ensureSharedQuickModeToggleMenuItem(menu);
    nav.append(button, menu);
    whenDocumentBodyReady(() => {
      if (!document.getElementById(LIVE_EDIT_TOGGLE_ID)) {
        document.body.appendChild(nav);
      }
    });
  }
  return button;
}
async function ensureSharedQuickModeToggleMenuItem(menu) {
  if (!(menu instanceof Element))
    return;
  if (menu.__pdsLiveSharedMenuItemInFlight) {
    return menu.__pdsLiveSharedMenuItemInFlight;
  }
  menu.__pdsLiveSharedMenuItemInFlight = (async () => {
    menu.querySelectorAll("li.pds-live-shared-quick-mode-item").forEach((node) => node.remove());
    const liveEditor = await ensureLiveEditInstance({
      mountIfMissing: true,
      interactive: false,
      requiredMethod: "createSharedQuickModeMenuItem",
      timeoutMs: 7e3
    });
    if (!liveEditor || typeof liveEditor.createSharedQuickModeMenuItem !== "function") {
      return;
    }
    const sharedItem = await liveEditor.createSharedQuickModeMenuItem();
    if (!(sharedItem instanceof Element))
      return;
    sharedItem.classList.add("pds-live-shared-quick-mode-item");
    const resetLink = menu.querySelector('a[data-pds-live-action="reset-config"]');
    const resetItem = resetLink?.closest("li") || null;
    const previousItem = resetItem?.previousElementSibling || null;
    const separatorBeforeReset = previousItem && previousItem.querySelector?.(":scope > hr") ? previousItem : null;
    if (separatorBeforeReset) {
      menu.insertBefore(sharedItem, separatorBeforeReset);
      return;
    }
    if (resetItem) {
      menu.insertBefore(sharedItem, resetItem);
      return;
    }
    menu.appendChild(sharedItem);
  })();
  try {
    await menu.__pdsLiveSharedMenuItemInFlight;
  } finally {
    menu.__pdsLiveSharedMenuItemInFlight = null;
  }
}
function teardownLiveEditToggle() {
  if (typeof document === "undefined")
    return;
  const button = document.getElementById(LIVE_EDIT_TOGGLE_ID);
  if (button) {
    const nav = button.closest(".pds-live-edit-toggle-nav");
    if (nav) {
      nav.remove();
    } else {
      button.remove();
    }
  }
  const style = document.getElementById(LIVE_EDIT_TOGGLE_STYLE_ID);
  if (style)
    style.remove();
  unmountLiveEdit();
}
async function initializeLiveEditToggle() {
  if (typeof document === "undefined")
    return;
  const toggleButton = await ensureLiveEditToggleButton();
  if (!toggleButton)
    return;
  const setLiveEditEnabled = async (enabled) => {
    if (enabled) {
      const liveEditor = await ensureLiveEditInstance({ mountIfMissing: true });
      if (liveEditor && typeof liveEditor.setInteractiveEditingEnabled === "function") {
        liveEditor.setInteractiveEditingEnabled(true);
      }
    } else {
      unmountLiveEdit();
    }
    updateLiveEditToggleState(toggleButton, enabled);
  };
  void setLiveEditEnabled(false);
  const actionHost = toggleButton.closest(".pds-live-edit-toggle-nav") || toggleButton;
  if (toggleButton.__pdsLiveEditActionHandler) {
    actionHost.removeEventListener("click", toggleButton.__pdsLiveEditActionHandler);
  }
  const actionHandler = async (event) => {
    const actionElement = event.target?.closest?.("[data-pds-live-action]");
    if (!actionElement)
      return;
    event.preventDefault();
    const action = String(actionElement.dataset.pdsLiveAction || "");
    if (action === "toggle") {
      const liveEditor = await ensureLiveEditInstance({ mountIfMissing: false });
      const isEnabled = getLiveEditInteractiveState(liveEditor);
      await setLiveEditEnabled(!isEnabled);
      return;
    }
    if (action === "open-settings") {
      const liveEditor = await ensureLiveEditInstance({
        mountIfMissing: true,
        requiredMethod: "openDesignSettings",
        interactive: false
      });
      if (liveEditor && typeof liveEditor.setInteractiveEditingEnabled === "function") {
        liveEditor.setInteractiveEditingEnabled(false);
      }
      if (liveEditor && typeof liveEditor.openDesignSettings === "function") {
        updateLiveEditToggleState(toggleButton, false);
        await liveEditor.openDesignSettings();
      }
      return;
    }
    if (action === "reset-config") {
      const liveEditor = await ensureLiveEditInstance({
        mountIfMissing: true,
        requiredMethod: "resetConfig",
        interactive: false
      });
      updateLiveEditToggleState(toggleButton, false);
      if (liveEditor && typeof liveEditor.resetConfig === "function") {
        await liveEditor.resetConfig();
      }
      return;
    }
  };
  toggleButton.__pdsLiveEditActionHandler = actionHandler;
  actionHost.addEventListener("click", actionHandler);
  if (toggleButton.__pdsLiveEditDisableHandler) {
    document.removeEventListener("pds:live-edit:disable", toggleButton.__pdsLiveEditDisableHandler);
  }
  if (toggleButton.__pdsLiveEditEnableHandler) {
    document.removeEventListener("pds:live-edit:enable", toggleButton.__pdsLiveEditEnableHandler);
  }
  const disableHandler = () => {
    void setLiveEditEnabled(false);
  };
  const enableHandler = () => {
    void setLiveEditEnabled(true);
  };
  toggleButton.__pdsLiveEditDisableHandler = disableHandler;
  document.addEventListener("pds:live-edit:disable", disableHandler);
  toggleButton.__pdsLiveEditEnableHandler = enableHandler;
  document.addEventListener("pds:live-edit:enable", enableHandler);
}
function getStoredLiveConfig() {
  if (typeof window === "undefined" || !window.localStorage)
    return null;
  try {
    const raw = window.localStorage.getItem("pure-ds-config");
    if (!raw)
      return null;
    const parsed = JSON.parse(raw);
    if (parsed && ("preset" in parsed || "design" in parsed))
      return parsed;
  } catch (e) {
    return null;
  }
  return null;
}
function deepMergeConfig(target = {}, source = {}) {
  if (!source || typeof source !== "object")
    return target;
  const out = Array.isArray(target) ? [...target] : { ...target };
  for (const [key, value] of Object.entries(source)) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      out[key] = deepMergeConfig(
        out[key] && typeof out[key] === "object" ? out[key] : {},
        value
      );
    } else {
      out[key] = value;
    }
  }
  return out;
}
function applyStoredConfigOverrides(baseConfig) {
  const stored = getStoredLiveConfig();
  if (!stored || !baseConfig || typeof baseConfig !== "object")
    return baseConfig;
  const storedPreset = stored.preset;
  const storedDesign = stored.design && typeof stored.design === "object" ? stored.design : null;
  if (!storedPreset && !storedDesign)
    return baseConfig;
  const hasNewShape = "preset" in baseConfig || "design" in baseConfig || "enhancers" in baseConfig;
  let nextConfig = { ...baseConfig };
  if (storedPreset) {
    nextConfig.preset = storedPreset;
  }
  if (storedDesign) {
    if (hasNewShape) {
      const baseDesign = baseConfig.design && typeof baseConfig.design === "object" ? baseConfig.design : {};
      nextConfig.design = deepMergeConfig(baseDesign, storedDesign);
    } else {
      nextConfig = deepMergeConfig(baseConfig, storedDesign);
    }
  }
  return nextConfig;
}
function buildPresetOmniboxSettings(PDS3, options = {}) {
  const {
    hideCategory = true,
    itemGrid = "45px 1fr",
    includeIncompatible = true,
    disableIncompatible = true,
    categoryName = "Presets",
    theme,
    onSelect,
    iconHandler
  } = options || {};
  const resolvedTheme = resolveThemePreference(theme ?? PDS3?.theme);
  const defaultIconHandler = (item) => {
    const preset = findPresetById(item?.id);
    const colors = preset?.colors || {};
    const primary = colors?.primary;
    const secondary = colors?.secondary;
    const accent = colors?.accent;
    if (primary && secondary && accent) {
      return `<span style="display:flex;gap:1px;flex-shrink:0;" aria-hidden="true">
        <span style="display:inline-block;width:10px;height:20px;background-color:${primary};">&nbsp;</span>
        <span style="display:inline-block;width:10px;height:20px;background-color:${secondary};">&nbsp;</span>
        <span style="display:inline-block;width:10px;height:20px;background-color:${accent};">&nbsp;</span>
      </span>`;
    }
    if (item?.icon) {
      return `<pds-icon icon="${item.icon}" size="sm"></pds-icon>`;
    }
    return "";
  };
  const getPresetEntries = () => {
    const source = PDS3?.presets || {};
    return Object.values(source || {}).filter((preset) => {
      const presetId = preset?.id || preset?.name;
      return Boolean(presetId);
    });
  };
  const findPresetById = (presetId) => {
    if (!presetId)
      return null;
    const entries = getPresetEntries();
    return entries.find((preset) => String(preset?.id || preset?.name) === String(presetId)) || null;
  };
  return {
    hideCategory,
    itemGrid,
    iconHandler: typeof iconHandler === "function" ? iconHandler : defaultIconHandler,
    categories: {
      [categoryName]: {
        trigger: () => true,
        getItems: (context = {}) => {
          const query = String(context?.search || "").toLowerCase().trim();
          const entries = getPresetEntries();
          return entries.filter((preset) => {
            const name = String(preset?.name || preset?.id || "").toLowerCase();
            const description = String(preset?.description || "").toLowerCase();
            const tags = Array.isArray(preset?.tags) ? preset.tags.map((tag) => String(tag).toLowerCase()) : [];
            if (query) {
              const matchesQuery = name.includes(query) || description.includes(query) || tags.some((tag) => tag.includes(query));
              if (!matchesQuery)
                return false;
            }
            const compatible = isPresetThemeCompatible(preset, resolvedTheme);
            if (!includeIncompatible && !compatible)
              return false;
            return true;
          }).map((preset) => {
            const presetId = preset?.id || preset?.name;
            const compatible = isPresetThemeCompatible(preset, resolvedTheme);
            const supportedThemes = normalizePresetThemes(preset);
            const themeHint = supportedThemes.length === 1 ? `${supportedThemes[0]} only` : `Not available in ${resolvedTheme} mode`;
            const baseDescription = String(preset?.description || "").trim();
            const description = compatible ? baseDescription : baseDescription ? `${baseDescription} - ${themeHint}` : themeHint;
            return {
              id: presetId,
              text: preset?.name || String(presetId),
              description,
              icon: "palette",
              class: !compatible && disableIncompatible ? "disabled" : "",
              disabled: !compatible && disableIncompatible,
              tooltip: !compatible ? themeHint : ""
            };
          }).sort(
            (a, b) => String(a.text || "").localeCompare(String(b.text || ""))
          );
        },
        action: async (selection) => {
          if (!selection?.id)
            return selection?.id;
          if (selection?.disabled)
            return selection?.id;
          const preset = findPresetById(selection.id);
          if (!preset)
            return selection?.id;
          if (typeof onSelect === "function") {
            return await onSelect({ preset, selection, resolvedTheme });
          }
          if (typeof PDS3?.applyLivePreset === "function") {
            await PDS3.applyLivePreset(preset.id || selection.id);
          }
          return preset.id || selection.id;
        }
      }
    }
  };
}
async function __attachLiveAPIs(PDS3, { applyResolvedTheme, setupSystemListenerIfNeeded, emitConfigChanged }) {
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
  PDS3.ontology = ontology2;
  PDS3.findComponentForElement = findComponentForElement2;
  PDS3.enums = enums2;
  PDS3.common = commonModule || {};
  PDS3.presets = presets;
  PDS3.configRelations = PDS_CONFIG_RELATIONS;
  PDS3.configSpec = PDS_DESIGN_CONFIG_SPEC;
  PDS3.configEditorMetadata = PDS_DEFAULT_CONFIG_EDITOR_METADATA;
  PDS3.configFormSchema = PDS_DEFAULT_CONFIG_FORM_SCHEMA;
  PDS3.buildConfigFormSchema = buildDesignConfigFormSchema;
  PDS3.getConfigEditorMetadata = getDesignConfigEditorMetadata;
  PDS3.enhancerMetadata = defaultPDSEnhancerMetadata;
  PDS3.applyStyles = function(generator) {
    const targetGenerator = generator || Generator.instance;
    applyStyles(targetGenerator);
    if (typeof emitConfigChanged === "function") {
      emitConfigChanged({
        mode: "live",
        source: "live:styles-applied"
      });
    }
  };
  PDS3.adoptLayers = function(shadowRoot, layers, additionalSheets) {
    return adoptLayers(
      shadowRoot,
      layers,
      additionalSheets,
      Generator.instance
    );
  };
  PDS3.adoptPrimitives = function(shadowRoot, additionalSheets) {
    return adoptPrimitives(shadowRoot, additionalSheets, Generator.instance);
  };
  PDS3.getGenerator = async function() {
    return Generator;
  };
  PDS3.query = async function(question) {
    if (!__queryClass) {
      const mod = await Promise.resolve().then(() => (init_pds_query(), pds_query_exports));
      __queryClass = mod?.PDSQuery || mod?.default || null;
    }
    if (!__queryClass)
      return [];
    const queryEngine = new __queryClass(PDS3);
    return await queryEngine.search(question);
  };
  PDS3.buildPresetOmniboxSettings = function(options = {}) {
    return buildPresetOmniboxSettings(PDS3, options);
  };
  PDS3.applyLivePreset = async function(presetId, options = {}) {
    if (!presetId)
      return false;
    if (!PDS3.registry?.isLive) {
      console.warn("PDS.applyLivePreset is only available in live mode.");
      return false;
    }
    const baseConfig = PDS3.currentConfig || {};
    const { design: _design, preset: _preset, ...rest } = baseConfig;
    const inputConfig = {
      ...structuredClone(stripFunctions(rest)),
      preset: presetId
    };
    const normalized = normalizeInitConfig(inputConfig, {}, {
      presets,
      defaultLog,
      validateDesignConfig,
      validateInitConfig
    });
    const resolvedTheme = resolveThemePreference(PDS3.theme);
    if (!isPresetThemeCompatible(normalized.generatorConfig.design, resolvedTheme)) {
      const presetName = normalized.presetInfo?.name || normalized.generatorConfig?.design?.name || presetId;
      console.warn(
        `PDS theme "${resolvedTheme}" not supported by preset "${presetName}".`
      );
    }
    if (baseConfig.theme && !normalized.generatorConfig.theme) {
      normalized.generatorConfig.theme = baseConfig.theme;
    }
    const generator = new Generator(normalized.generatorConfig);
    if (normalized.generatorConfig.design?.typography) {
      try {
        await loadTypographyFonts(normalized.generatorConfig.design.typography);
      } catch (error) {
        normalized.generatorConfig?.log?.(
          "warn",
          "Failed to load some fonts from Google Fonts:",
          error
        );
      }
    }
    PDS3.applyStyles?.(generator);
    const presetInfo = normalized.presetInfo || { id: presetId, name: presetId };
    PDS3.currentPreset = presetInfo;
    PDS3.currentConfig = Object.freeze({
      ...baseConfig,
      preset: normalized.generatorConfig.preset,
      design: structuredClone(normalized.generatorConfig.design),
      theme: normalized.generatorConfig.theme || baseConfig.theme
    });
    PDS3.configEditorMetadata = getDesignConfigEditorMetadata(
      normalized.generatorConfig.design
    );
    PDS3.configFormSchema = buildDesignConfigFormSchema(
      normalized.generatorConfig.design
    );
    const persist = options?.persist !== false;
    if (persist && typeof window !== "undefined") {
      const storageKey = "pure-ds-config";
      try {
        const storedRaw = localStorage.getItem(storageKey);
        const storedParsed = storedRaw ? JSON.parse(storedRaw) : null;
        const nextStored = {
          ...storedParsed && typeof storedParsed === "object" ? storedParsed : {},
          preset: presetInfo.id || presetId,
          design: structuredClone(normalized.generatorConfig.design || {})
        };
        localStorage.setItem(storageKey, JSON.stringify(nextStored));
      } catch (error) {
        normalized.generatorConfig?.log?.(
          "warn",
          "Failed to store preset:",
          error
        );
      }
    }
    return true;
  };
  if (!Object.getOwnPropertyDescriptor(PDS3, "compiled")) {
    Object.defineProperty(PDS3, "compiled", {
      get() {
        if (PDS3.registry?.isLive && Generator.instance) {
          return Generator.instance.compiled;
        }
        return null;
      },
      enumerable: true,
      configurable: false
    });
  }
  PDS3.preloadCritical = function(config, options = {}) {
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
async function startLive(PDS3, config, { emitReady, emitConfigChanged, applyResolvedTheme, setupSystemListenerIfNeeded }) {
  if (!config || typeof config !== "object") {
    throw new Error(
      "PDS.start({ mode: 'live', ... }) requires a valid configuration object"
    );
  }
  config = applyStoredConfigOverrides(config);
  await __attachLiveAPIs(PDS3, { applyResolvedTheme, setupSystemListenerIfNeeded, emitConfigChanged });
  attachFoucListener(PDS3);
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
    const normalized = normalizeInitConfig(config, {}, {
      presets,
      defaultLog,
      validateDesignConfig,
      validateInitConfig
    });
    if (manageTheme && !isPresetThemeCompatible(normalized.generatorConfig.design, resolvedTheme)) {
      const presetName = normalized.presetInfo?.name || normalized.generatorConfig?.design?.name || normalized.generatorConfig?.preset || "current preset";
      console.warn(
        `PDS theme "${resolvedTheme}" not supported by preset "${presetName}".`
      );
    }
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
    PDS3.registry.setLiveMode();
    if (normalized.presetInfo?.name) {
      generatorConfig?.log?.("log", `PDS live with preset "${normalized.presetInfo.name}"`);
    } else {
      generatorConfig?.log?.("log", "PDS live with custom config");
    }
    if (applyGlobalStyles) {
      PDS3.applyStyles?.(Generator.instance);
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
    PDS3.currentConfig = Object.freeze({
      mode: "live",
      ...structuredClone(cloneableConfig),
      design: structuredClone(normalized.generatorConfig.design),
      preset: normalized.generatorConfig.preset,
      theme: resolvedTheme,
      enhancers: mergedEnhancers
    });
    PDS3.configEditorMetadata = getDesignConfigEditorMetadata(
      normalized.generatorConfig.design
    );
    PDS3.configFormSchema = buildDesignConfigFormSchema(
      normalized.generatorConfig.design
    );
    if (typeof emitConfigChanged === "function") {
      emitConfigChanged({
        mode: "live",
        source: "live:config-applied",
        preset: normalized.generatorConfig.preset
      });
    }
    if (typeof document !== "undefined") {
      try {
        if (config?.liveEdit) {
          setTimeout(() => {
            void initializeLiveEditToggle();
          }, 0);
        } else {
          teardownLiveEditToggle();
        }
      } catch (error) {
        generatorConfig?.log?.("warn", "Live editor toggle failed to start:", error);
      }
    }
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
    PDS3.dispatchEvent(new CustomEvent("pds:error", { detail: { error } }));
    throw error;
  }
}

// src/js/pds-live-manager/import-contract.js
var DEFAULT_CONFIDENCE = 0.5;
function normalizeConfidence(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed))
    return DEFAULT_CONFIDENCE;
  return Math.max(0, Math.min(1, parsed));
}
function normalizeIssues(issues) {
  if (!Array.isArray(issues))
    return [];
  return issues.map((issue) => {
    if (!issue)
      return null;
    const severity = String(issue.severity || "info").toLowerCase();
    return {
      severity,
      message: String(issue.message || ""),
      path: issue.path ? String(issue.path) : ""
    };
  }).filter((issue) => issue && issue.message);
}
function createImportResult(input = {}) {
  const source = String(input.source || "unknown");
  const type = String(input.type || "generic");
  const confidence = normalizeConfidence(input.confidence);
  const issues = normalizeIssues(input.issues);
  const designPatch = input.designPatch && typeof input.designPatch === "object" ? input.designPatch : {};
  const template = input.template && typeof input.template === "object" ? input.template : null;
  return {
    source,
    type,
    confidence,
    issues,
    designPatch,
    template,
    meta: input.meta && typeof input.meta === "object" ? input.meta : {}
  };
}
function isImportResult(value) {
  return Boolean(
    value && typeof value === "object" && "source" in value && "type" in value && "confidence" in value && "issues" in value && "designPatch" in value
  );
}

// src/js/pds-live-manager/template-service.js
var CATALOG_RELATIVE_URL = "../templates/templates.json";
var CATALOG_ABSOLUTE_URL = "/assets/pds/templates/templates.json";
var NODE_CWD_CATALOG = ["public", "assets", "pds", "templates", "templates.json"];
var NODE_PACKAGE_CATALOG_RELATIVE = ["..", "..", "..", "public", "assets", "pds", "templates", "templates.json"];
var catalogCache = null;
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
    tags: Array.isArray(template.tags) ? template.tags.map((item) => String(item)) : []
  };
}
function normalizeCatalog(catalog = {}, sourceInfo = {}) {
  const templatesRaw = Array.isArray(catalog) ? catalog : Array.isArray(catalog?.templates) ? catalog.templates : [];
  const templates = templatesRaw.map(normalizeTemplateMeta).filter((item) => item.id && item.file);
  return {
    version: catalog?.version || "1",
    templates,
    __catalogURL: sourceInfo.catalogURL || null,
    __catalogFilePath: sourceInfo.catalogFilePath || null
  };
}
async function loadCatalogFromBrowser(options = {}) {
  const configuredUrl = options.catalogURL || globalThis?.PDS?.currentConfig?.templateCatalogURL;
  const candidates = [configuredUrl, CATALOG_RELATIVE_URL, CATALOG_ABSOLUTE_URL].filter(Boolean);
  for (const candidate of candidates) {
    try {
      const url = new URL(candidate, import.meta.url).href;
      const response = await fetch(url, { credentials: "same-origin" });
      if (!response.ok)
        continue;
      const json = await response.json();
      return normalizeCatalog(json, { catalogURL: url });
    } catch (error) {
    }
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
    import(urlSpecifier)
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
    } catch (error) {
    }
  }
  return normalizeCatalog({ templates: [] });
}
async function readTemplateHtml(template, catalog) {
  if (!template?.file)
    return "";
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
    import(pathSpecifier)
  ]);
  const baseDir = catalog?.__catalogFilePath ? path.dirname(catalog.__catalogFilePath) : path.resolve(process.cwd(), "public", "assets", "pds", "templates");
  const templatePath = path.resolve(baseDir, template.file);
  return (await readFile(templatePath, "utf8")).trim();
}
async function loadLiveTemplateCatalog(options = {}) {
  if (catalogCache && !options.forceReload)
    return catalogCache;
  catalogCache = isNodeRuntime() ? await loadCatalogFromNode(options) : await loadCatalogFromBrowser(options);
  return catalogCache;
}
async function listLiveTemplates(options = {}) {
  const catalog = await loadLiveTemplateCatalog(options);
  return catalog.templates.map(({ id, name, description, icon, file, tags }) => ({
    id,
    name,
    description,
    icon,
    file,
    tags
  }));
}
async function getLiveTemplateById(templateId, options = {}) {
  const catalog = await loadLiveTemplateCatalog(options);
  const template = catalog.templates.find((item) => item.id === templateId) || null;
  if (!template)
    return null;
  const html = await readTemplateHtml(template, catalog);
  return { ...template, html };
}
async function buildTemplateImportResult(templateId, options = {}) {
  const template = await getLiveTemplateById(templateId, options);
  if (!template) {
    return createImportResult({
      source: "template",
      type: "template",
      confidence: 0,
      issues: [{ severity: "error", message: `Unknown template: ${templateId}` }]
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
      description: template.description
    }
  });
}

// src/js/pds-live-manager/tailwind-conversion-rules.json
var tailwind_conversion_rules_default = {
  version: "tw2pds-layout-v4",
  summary: "Deterministic Tailwind\u2192PDS conversion rules focused on layout intent, semantic primitive mapping, and richer import-* fallback coverage.",
  governance: [
    {
      id: "layout.utilities.grid",
      controls: ["grid", "grid-cols-*", "grid-auto-*"],
      note: "When false, grid mappings are skipped."
    },
    {
      id: "layout.utilities.flex",
      controls: ["flex", "flex-*", "items-*", "justify-*", "grow"],
      note: "When false, flex mappings are skipped."
    },
    {
      id: "layout.utilities.spacing",
      controls: ["gap-*", "stack-*"],
      note: "When false, spacing mappings are skipped."
    },
    {
      id: "layout.utilities.container",
      controls: ["container", "max-w-*"],
      note: "When false, container mappings are skipped."
    }
  ],
  nonPdsClassPatterns: ["^group(?:[/:].*)?$", "^layout-container$"],
  neverFallbackTags: ["table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption", "colgroup", "col"],
  directMappings: [
    { id: "layout.flex.base", tw: "flex", pds: ["flex"], gate: "flex" },
    { id: "layout.flex.inline", tw: "inline-flex", pds: ["flex"], gate: "flex" },
    { id: "layout.flex.row", tw: "flex-row", pds: ["flex-row"], gate: "flex" },
    { id: "layout.flex.col", tw: "flex-col", pds: ["flex-col"], gate: "flex" },
    { id: "layout.flex.wrap", tw: "flex-wrap", pds: ["flex-wrap"], gate: "flex" },
    { id: "layout.flex.grow", tw: "grow", pds: ["grow"], gate: "flex" },
    { id: "layout.flex.grow.tw", tw: "flex-grow", pds: ["grow"], gate: "flex" },
    { id: "layout.flex.grow1", tw: "flex-1", pds: ["grow"], gate: "flex" },
    { id: "layout.items.start", tw: "items-start", pds: ["items-start"], gate: "flex" },
    { id: "layout.items.center", tw: "items-center", pds: ["items-center"], gate: "flex" },
    { id: "layout.items.end", tw: "items-end", pds: ["items-end"], gate: "flex" },
    { id: "layout.items.stretch", tw: "items-stretch", pds: ["items-stretch"], gate: "flex" },
    { id: "layout.items.baseline", tw: "items-baseline", pds: ["items-baseline"], gate: "flex" },
    { id: "layout.justify.start", tw: "justify-start", pds: ["justify-start"], gate: "flex" },
    { id: "layout.justify.center", tw: "justify-center", pds: ["justify-center"], gate: "flex" },
    { id: "layout.justify.end", tw: "justify-end", pds: ["justify-end"], gate: "flex" },
    { id: "layout.justify.between", tw: "justify-between", pds: ["justify-between"], gate: "flex" },
    { id: "layout.justify.around", tw: "justify-around", pds: ["justify-around"], gate: "flex" },
    { id: "layout.justify.evenly", tw: "justify-evenly", pds: ["justify-evenly"], gate: "flex" },
    { id: "layout.grid.base", tw: "grid", pds: ["grid"], gate: "grid" },
    { id: "layout.grid.cols.1", tw: "grid-cols-1", pds: ["grid-cols-1"], gate: "grid" },
    { id: "layout.grid.cols.2", tw: "grid-cols-2", pds: ["grid-cols-2"], gate: "grid" },
    { id: "layout.grid.cols.3", tw: "grid-cols-3", pds: ["grid-cols-3"], gate: "grid" },
    { id: "layout.grid.cols.4", tw: "grid-cols-4", pds: ["grid-cols-4"], gate: "grid" },
    { id: "layout.grid.cols.6", tw: "grid-cols-6", pds: ["grid-cols-6"], gate: "grid" },
    { id: "layout.container", tw: "container", pds: ["container"], gate: "container" },
    { id: "intent.surface.shadow", tw: "shadow", pds: ["surface-elevated"] },
    { id: "intent.surface.shadow-md", tw: "shadow-md", pds: ["surface-elevated"] },
    { id: "intent.surface.shadow-lg", tw: "shadow-lg", pds: ["surface-elevated"] },
    { id: "intent.surface.base", tw: "bg-white", pds: ["surface-base"] },
    { id: "typography.align.center", tw: "text-center", pds: ["text-center"] },
    { id: "typography.align.left", tw: "text-left", pds: ["text-left"] },
    { id: "typography.align.right", tw: "text-right", pds: ["text-right"] },
    { id: "typography.text.muted.gray500", tw: "text-gray-500", pds: ["text-muted"] },
    { id: "typography.text.muted.slate500", tw: "text-slate-500", pds: ["text-muted"] }
  ],
  ignoredPatterns: [
    {
      id: "style.color",
      pattern: "^(?:text|from|to|via|decoration|accent|caret)-|^bg-(?!cover$|center$|no-repeat$)",
      reason: "Visual style token skipped in favor of semantic PDS styling."
    },
    {
      id: "style.radius-border-shadow",
      pattern: "^(?:rounded|ring|border|shadow|outline)-?",
      reason: "Surface/shape inferred at primitive level."
    },
    {
      id: "style.typography",
      pattern: "^(?:font|leading|tracking|uppercase|lowercase|capitalize)-?",
      reason: "Typography atomic utilities are skipped."
    },
    {
      id: "style.effects",
      pattern: "^(?:opacity|blur|backdrop|drop-shadow|mix-blend|filter)-",
      reason: "Visual effects skipped unless mapped to a PDS utility."
    },
    {
      id: "style.transitions",
      pattern: "^(?:transition|duration|ease|delay|animate)-",
      reason: "Motion is system-defined in PDS."
    },
    {
      id: "style.spacing.atomic",
      pattern: "^(?:p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr)-",
      reason: "Atomic spacing skipped; structural spacing intent is mapped."
    },
    {
      id: "style.positioning.atomic",
      pattern: "^(?:absolute|relative|fixed|sticky|inset(?:-[xy])?|top|right|bottom|left|z|translate(?:-[xy])?|-translate-[xy])(?:-|$)",
      reason: "Atomic positioning/offset utilities are skipped so PDS primitives and layout utilities control placement."
    }
  ],
  intentRules: [
    {
      id: "intent.layout.responsive-grid-to-auto",
      summary: "Collapse responsive grid-cols patterns (including base+md two-step patterns) to best-fit grid-auto-*"
    },
    {
      id: "intent.layout.mobile-stack",
      summary: "Map flex-col + md/lg:flex-row to mobile-stack"
    },
    {
      id: "intent.component.card",
      summary: "Infer card/surface classes from rounded+shadow+surface signals"
    },
    {
      id: "intent.component.card.normalize",
      summary: "Detect Tailwind card utility clusters and normalize them to PDS card and surface variants."
    },
    {
      id: "intent.component.button",
      summary: "Infer btn-primary / btn-outline / icon-only from CTA patterns"
    },
    {
      id: "intent.component.button.normalize",
      summary: "Prevents import-* style classes on button-like elements and applies PDS button variants/sizes."
    },
    {
      id: "intent.component.button.layout-grow",
      summary: "Preserve CTA row width intent on button-like elements by mapping w-full/flex-1 to grow."
    },
    {
      id: "intent.icon.color-preserve",
      summary: "Preserve icon color intent by mapping Tailwind text color utilities on icon-like elements to tokenized import-* classes."
    },
    {
      id: "intent.component.badge.normalize",
      summary: "Detects Tailwind badge/pill utility clusters and normalizes them to PDS badge primitives/variants."
    },
    {
      id: "intent.typography.heading-semantic",
      summary: "Removes Tailwind heading typography/color utilities so heading semantics and PDS defaults control typography."
    },
    {
      id: "intent.surface.footer-inverse",
      summary: "Use surface-inverse for footers with explicit background intent"
    },
    {
      id: "intent.typography.link-treatment",
      summary: "Apply minimal link treatment for hover/transition-tailwind anchors"
    },
    {
      id: "intent.typography.link-active-preserve",
      summary: "Preserve anchor text color intent (including active menu states) by mapping Tailwind text utilities to tokenized import-* classes."
    },
    {
      id: "intent.typography.metric-paragraph-to-div",
      summary: "Normalize metric display lines from paragraph tags to div tags to avoid default paragraph margins in compact stat layouts."
    },
    {
      id: "intent.typography.metric-pair-no-stack",
      summary: "When a compact metric container has two consecutive typography lines, remove stack-sm so spacing follows Tailwind preflight no-margin assumptions."
    },
    {
      id: "intent.typography.semantic-heading-from-scale",
      summary: "Map large bold typography scales (text-2xl/text-3xl/text-4xl) to semantic heading tags when possible."
    },
    {
      id: "intent.typography.bold-to-strong",
      summary: "Prefer semantic strong tags for bold inline text intent instead of utility-only font-weight classes."
    },
    {
      id: "intent.preflight.tailwind-runtime-detected",
      summary: "Detect Tailwind runtime CSS injection and translate key preflight intent"
    },
    {
      id: "intent.preflight.list-reset",
      summary: "Preserve Tailwind list-reset preflight behavior via scoped fallback class"
    },
    {
      id: "intent.preflight.anchor-reset",
      summary: "Preserve Tailwind anchor reset preflight behavior via scoped fallback class"
    },
    {
      id: "table.strict-tags.no-classes",
      summary: "Never emit classes for semantic table tags (table/thead/tbody/tfoot/tr/th/td/caption/colgroup/col)"
    },
    {
      id: "intent.form.nested-label",
      summary: "Convert sibling label+control pairs into nested labels"
    },
    {
      id: "fallback.import-style",
      summary: "Generate import-* classes + local style block for unmapped utility styles"
    }
  ],
  gapScaleMap: {
    "gap-0": "gap-0",
    "gap-1": "gap-xs",
    "gap-2": "gap-sm",
    "gap-3": "gap-sm",
    "gap-4": "gap-md",
    "gap-5": "gap-md",
    "gap-6": "gap-lg",
    "gap-7": "gap-lg",
    "gap-8": "gap-xl",
    "gap-10": "gap-xl",
    "gap-12": "gap-xl"
  },
  maxWidthMap: {
    "max-w-xs": "max-w-sm",
    "max-w-sm": "max-w-sm",
    "max-w-md": "max-w-md",
    "max-w-lg": "max-w-lg",
    "max-w-xl": "max-w-xl",
    "max-w-2xl": "max-w-xl",
    "max-w-3xl": "max-w-xl",
    "max-w-4xl": "max-w-xl",
    "max-w-5xl": "max-w-xl",
    "max-w-6xl": "max-w-xl",
    "max-w-7xl": "max-w-xl"
  },
  tailwindSizeScale: {
    "0": "var(--spacing-0)",
    "0.5": "0.125rem",
    "1": "var(--spacing-1)",
    "1.5": "0.375rem",
    "2": "var(--spacing-2)",
    "2.5": "0.625rem",
    "3": "var(--spacing-3)",
    "3.5": "0.875rem",
    "4": "var(--spacing-4)",
    "5": "var(--spacing-5)",
    "6": "var(--spacing-6)",
    "7": "var(--spacing-7)",
    "8": "var(--spacing-8)",
    "9": "var(--spacing-9)",
    "10": "var(--spacing-10)",
    "11": "var(--spacing-11)",
    "12": "var(--spacing-12)",
    "14": "3.5rem",
    "16": "4rem",
    "20": "5rem",
    "24": "6rem",
    "28": "7rem",
    "32": "8rem",
    "36": "9rem",
    "40": "10rem",
    "48": "12rem"
  },
  tailwindShadeScale: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"],
  defaultTailwindShade: "500",
  importStyleRules: {
    "mx-auto": "margin-left:auto;margin-right:auto",
    "ml-auto": "margin-left:auto",
    "mr-auto": "margin-right:auto",
    "w-full": "width:100%",
    "w-auto": "width:auto",
    "h-full": "height:100%",
    "h-48": "height:12rem",
    "h-2.5": "height:0.625rem",
    "h-10": "height:var(--spacing-10)",
    "h-2": "height:var(--spacing-2)",
    "w-2": "width:var(--spacing-2)",
    "size-8": "width:var(--spacing-8);height:var(--spacing-8)",
    "size-10": "width:var(--spacing-10);height:var(--spacing-10)",
    "size-full": "width:100%;height:100%",
    "min-h-screen": "min-height:100vh",
    "overflow-hidden": "overflow:hidden",
    "overflow-x-hidden": "overflow-x:hidden",
    "overflow-x-auto": "overflow-x:auto",
    "whitespace-nowrap": "white-space:nowrap",
    hidden: "display:none",
    block: "display:block",
    truncate: "overflow:hidden;text-overflow:ellipsis;white-space:nowrap",
    "justify-items-center": "justify-items:center",
    "justify-items-start": "justify-items:start",
    "justify-items-end": "justify-items:end",
    "justify-items-stretch": "justify-items:stretch",
    "grid-flow-col": "grid-auto-flow:column",
    "aspect-square": "aspect-ratio:1 / 1",
    "bg-center": "background-position:center",
    "bg-cover": "background-size:cover",
    "bg-no-repeat": "background-repeat:no-repeat",
    "transition-colors": "transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-duration:150ms"
  },
  importStyleDynamicRules: [
    {
      id: "fallback.import-style.gap-scale",
      pattern: "^gap-(\\d+)$",
      summary: "Converts gap scale utilities (including responsive variants like md:gap-6) to generated import-* fallback classes."
    },
    {
      id: "fallback.import-style.min-width-arbitrary",
      pattern: "^min-w-\\[[^\\]]+\\]$",
      summary: "Converts arbitrary min-width utilities (e.g. min-w-[600px]) to generated import-* fallback classes."
    },
    {
      id: "fallback.import-style.max-width-arbitrary",
      pattern: "^max-w-\\[[^\\]]+\\]$",
      summary: "Converts arbitrary max-width utilities (e.g. max-w-[480px]) to generated import-* fallback classes."
    },
    {
      id: "fallback.import-style.min-height-arbitrary",
      pattern: "^min-h-\\[[^\\]]+\\]$",
      summary: "Converts arbitrary min-height utilities (e.g. min-h-[180px]) to generated import-* fallback classes."
    },
    {
      id: "fallback.import-style.grid-rows-arbitrary",
      pattern: "^grid-rows-\\[[^\\]]+\\]$",
      summary: "Converts arbitrary grid template row utilities (e.g. grid-rows-[1fr_auto]) to generated import-* fallback classes."
    },
    {
      id: "fallback.import-style.size-scale",
      pattern: "^size-(\\[[^\\]]+\\]|[0-9.]+)$",
      summary: "Converts size scale/arbitrary utilities into width+height fallback declarations."
    },
    {
      id: "fallback.import-style.width-height-scale",
      pattern: "^[wh]-(\\[[^\\]]+\\]|[0-9.]+)$",
      summary: "Converts width/height scale and arbitrary utilities to import-* classes."
    },
    {
      id: "fallback.import-style.spacing",
      pattern: "^-?(?:p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr)-(.+)$",
      summary: "Converts spacing utilities to directional padding/margin fallback declarations, including responsive variants."
    },
    {
      id: "fallback.import-style.text-size",
      pattern: "^text-(xs|sm|base|lg|xl|2xl|3xl|4xl)$",
      summary: "Converts common text size utilities to import-* font-size declarations."
    },
    {
      id: "fallback.import-style.font-weight",
      pattern: "^font-(normal|medium|semibold|bold|extrabold|black)$",
      summary: "Converts common font weight utilities to import-* font-weight declarations."
    },
    {
      id: "fallback.import-style.leading-tracking",
      pattern: "^(leading|tracking)-(none|tight|snug|normal|relaxed|loose|tighter|wide|wider|widest)$",
      summary: "Converts line-height and letter-spacing utilities to import-* declarations for typography fidelity."
    },
    {
      id: "fallback.import-style.bg-tokenized",
      pattern: "^bg-([a-z]+)-(\\d{2,3})$",
      summary: "Safeguards Tailwind background color utilities by mapping families like blue/purple/green/red to PDS semantic tokens."
    },
    {
      id: "fallback.import-style.bg-semantic",
      pattern: "^bg-(primary|secondary|accent)$",
      summary: "Safeguards semantic background utilities by mapping bg-primary/bg-secondary/bg-accent to PDS color tokens."
    },
    {
      id: "fallback.import-style.text-tokenized",
      pattern: "^text-([a-z]+)-(\\d{2,3})$",
      summary: "Safeguards Tailwind text color utilities by mapping common families to PDS semantic tokens."
    },
    {
      id: "fallback.import-style.rounded",
      pattern: "^rounded(?:-[trbl]{1,2})?(?:-(none|xs|sm|md|lg|xl|2xl|3xl|full))?$",
      summary: "Safeguards rounded utilities (including rounded-t-sm) by mapping to PDS radius tokens."
    },
    {
      id: "fallback.import-style.overlay-alpha",
      pattern: "^bg-black\\/(\\d{1,3})$",
      summary: "Converts alpha black overlay classes (e.g. bg-black/50) to tokenized color-mix background overlays."
    },
    {
      id: "fallback.import-style.text-inverse",
      pattern: "^text-white$",
      summary: "Preserves white foreground intent for text-on-image use cases using inverse-compatible tokens."
    },
    {
      id: "fallback.import-style.bg-arbitrary",
      pattern: "^bg-\\[[^\\]]+\\]$",
      summary: "Converts arbitrary background colors to import-* fallback classes when values are CSS-safe."
    },
    {
      id: "fallback.import-style.text-arbitrary",
      pattern: "^text-\\[[^\\]]+\\]$",
      summary: "Converts arbitrary text colors to import-* fallback classes when values are CSS-safe."
    }
  ]
};

// src/js/pds-live-manager/conversion-service.js
var PDS2 = globalThis.PDS;
var RULEBOOK_JSON_PATH = "src/js/pds-live-manager/tailwind-conversion-rules.json";
var BREAKPOINT_ORDER = ["base", "sm", "md", "lg", "xl", "2xl"];
function hydrateRulebook(rawRulebook = {}) {
  const ignoredPatterns = Array.isArray(rawRulebook.ignoredPatterns) ? rawRulebook.ignoredPatterns.map((rule) => ({
    ...rule,
    pattern: rule?.pattern instanceof RegExp ? rule.pattern : new RegExp(String(rule?.pattern || ""))
  })) : [];
  const nonPdsClassPatterns = Array.isArray(rawRulebook.nonPdsClassPatterns) ? rawRulebook.nonPdsClassPatterns.map((pattern) => pattern instanceof RegExp ? pattern : new RegExp(String(pattern || ""))) : [];
  return {
    ...rawRulebook,
    ignoredPatterns,
    nonPdsClassPatterns
  };
}
var TAILWIND_TO_PDS_RULES = hydrateRulebook(tailwind_conversion_rules_default);
var RULEBOOK_VERSION = TAILWIND_TO_PDS_RULES.version || "tw2pds-layout-v4";
var DIRECT_MAP = new Map(
  TAILWIND_TO_PDS_RULES.directMappings.map((rule) => [rule.tw, rule])
);
var GAP_MAP = new Map(Object.entries(TAILWIND_TO_PDS_RULES.gapScaleMap || {}));
var MAX_WIDTH_MAP = new Map(Object.entries(TAILWIND_TO_PDS_RULES.maxWidthMap || {}));
var NON_PDS_CLASS_PATTERNS = TAILWIND_TO_PDS_RULES.nonPdsClassPatterns || [];
var TABLE_STRICT_TAGS = new Set(TAILWIND_TO_PDS_RULES.neverFallbackTags || []);
var IMPORT_STYLE_BASE_RULES = { ...TAILWIND_TO_PDS_RULES.importStyleRules || {} };
var TW_SIZE_SCALE = TAILWIND_TO_PDS_RULES.tailwindSizeScale || {};
var TW_SHADE_SCALE = Array.isArray(TAILWIND_TO_PDS_RULES.tailwindShadeScale) ? TAILWIND_TO_PDS_RULES.tailwindShadeScale.map((value) => String(value)).filter(Boolean) : ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"];
var DEFAULT_TW_SHADE = TW_SHADE_SCALE.includes(String(TAILWIND_TO_PDS_RULES.defaultTailwindShade || "")) ? String(TAILWIND_TO_PDS_RULES.defaultTailwindShade) : "500";
var DEFAULT_FONT_SCALE = 1.2;
var KNOWN_TW_PREFIXES = [
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
  "size"
];
function removeAttributeFromTagAttributes(attrs = "", name = "") {
  if (!attrs || !name)
    return attrs;
  const attrRegex = new RegExp(`\\s${name}\\s*=\\s*("[^"]*"|'[^']*'|[^\\s>]+)`, "gi");
  return String(attrs).replace(attrRegex, "");
}
function applyLabelNestingRule(sourceHtml = "", summary = null) {
  let html = String(sourceHtml || "");
  let nestingCount = 0;
  html = html.replace(
    /<label([^>]*?)\sfor\s*=\s*(["'])([^"']+)\2([^>]*)>([\s\S]*?)<\/label>\s*<(input)([^>]*?)\sid\s*=\s*(["'])([^"']+)\8([^>]*?)>/gi,
    (match, labelAttrsBefore, _q1, forValue, labelAttrsAfter, labelInner, inputTag, inputAttrsBefore, _q2, inputId, inputAttrsAfter) => {
      if (forValue !== inputId)
        return match;
      const nextLabelAttrs = removeAttributeFromTagAttributes(`${labelAttrsBefore || ""}${labelAttrsAfter || ""}`, "for");
      const inputMarkup = `<${inputTag}${inputAttrsBefore || ""} id="${inputId}"${inputAttrsAfter || ""}>`;
      nestingCount += 1;
      return `<label${nextLabelAttrs}>${labelInner}${inputMarkup}</label>`;
    }
  );
  html = html.replace(
    /<label([^>]*?)\sfor\s*=\s*(["'])([^"']+)\2([^>]*)>([\s\S]*?)<\/label>\s*<(select|textarea)([^>]*?)\sid\s*=\s*(["'])([^"']+)\8([^>]*)>([\s\S]*?)<\/\6>/gi,
    (match, labelAttrsBefore, _q1, forValue, labelAttrsAfter, labelInner, controlTag, controlAttrsBefore, _q2, controlId, controlAttrsAfter, controlInner) => {
      if (forValue !== controlId)
        return match;
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
  const normalized = String(token || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "rule";
  const bpPart = breakpoint && breakpoint !== "base" ? `${breakpoint}-` : "";
  return `import-${bpPart}${normalized}`;
}
function registerImportStyle(summary, token, declaration, breakpoint = "base", pseudo = "") {
  if (!summary || !token || !declaration)
    return "";
  const className = toImportClassName(token, breakpoint);
  if (pseudo) {
    const pseudoBucketKey = `${breakpoint}|${pseudo}`;
    if (!summary.importPseudoStyles.has(pseudoBucketKey)) {
      summary.importPseudoStyles.set(pseudoBucketKey, /* @__PURE__ */ new Map());
    }
    summary.importPseudoStyles.get(pseudoBucketKey).set(className, declaration);
  } else if (breakpoint === "base") {
    summary.importBaseStyles.set(className, declaration);
  } else {
    if (!summary.importResponsiveStyles.has(breakpoint)) {
      summary.importResponsiveStyles.set(breakpoint, /* @__PURE__ */ new Map());
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
  if (!value)
    return false;
  if (/[;{}]/.test(value))
    return false;
  return /^[-#(),.%/\sa-zA-Z0-9]+$/.test(value);
}
function resolveTailwindSizeValue(rawToken = "") {
  const token = String(rawToken || "").trim();
  if (!token)
    return null;
  const arbitrary = token.match(/^\[([^\]]+)\]$/);
  if (arbitrary) {
    const value = normalizeArbitraryValue(arbitrary[1]);
    return isSafeCssValue(value) ? value : null;
  }
  return TW_SIZE_SCALE[token] || null;
}
function resolveTwShade(shade = "") {
  const parsed = Number(shade);
  if (!Number.isFinite(parsed))
    return DEFAULT_TW_SHADE;
  const exact = String(parsed);
  if (TW_SHADE_SCALE.includes(exact))
    return exact;
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
  if (!isSafeCssValue(value))
    return "";
  if (/^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(value))
    return value;
  if (/^(?:rgb|hsl)a?\([^)]*\)$/.test(value))
    return value;
  return "";
}
function parseClassTokens(value = "") {
  return String(value || "").split(/\s+/).map((token) => token.trim()).filter(Boolean);
}
function withClassInAttrs(attrs = "", className = "") {
  if (!className)
    return attrs;
  const text = String(attrs || "");
  const classMatch = text.match(/\sclass\s*=\s*(["'])(.*?)\1/i);
  if (!classMatch) {
    return `${text} class="${className}"`;
  }
  const quote = classMatch[1] || '"';
  const values = parseClassTokens(classMatch[2]);
  if (!values.includes(className))
    values.push(className);
  const next = ` class=${quote}${values.join(" ")}${quote}`;
  return text.replace(classMatch[0], next);
}
function hasAttribute(attrs = "", attr = "") {
  if (!attr)
    return false;
  return new RegExp(`\\s${attr}\\s*=`, "i").test(String(attrs || ""));
}
function humanizeIconName(iconName = "") {
  const text = String(iconName || "").replace(/[-_]+/g, " ").trim();
  if (!text)
    return "Icon button";
  return text.replace(/(^|\s)([a-z])/g, (_m, pre, ch) => `${pre}${ch.toUpperCase()}`);
}
function normalizeIconOnlyButtons(sourceHtml = "", summary = null) {
  const input = String(sourceHtml || "");
  if (!input)
    return input;
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
  if (!input)
    return input;
  let convertedCount = 0;
  const output = input.replace(/<p([^>]*?)>([\s\S]*?)<\/p>/gi, (fullMatch, attrs, inner) => {
    const classMatch = String(attrs || "").match(/\sclass\s*=\s*(["'])(.*?)\1/i);
    if (!classMatch)
      return fullMatch;
    const classTokens = parseClassTokens(classMatch[2] || "");
    const hasImportText = classTokens.some((token) => /^import-text-/.test(String(token || "")));
    const isLikelyMetricLine = classTokens.includes("text-muted") || classTokens.some((token) => /^import-font-/.test(String(token || "")));
    if (!hasImportText || !isLikelyMetricLine)
      return fullMatch;
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
  if (!className)
    return attrs;
  const text = String(attrs || "");
  const classMatch = text.match(/\sclass\s*=\s*(["'])(.*?)\1/i);
  if (!classMatch)
    return text;
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
  if (!classMatch)
    return text;
  const quote = classMatch[1] || '"';
  const currentTokens = parseClassTokens(classMatch[2]);
  const nextTokensRaw = mapper(Array.from(currentTokens));
  const nextTokens = Array.isArray(nextTokensRaw) ? nextTokensRaw.filter(Boolean) : currentTokens;
  if (nextTokens.length === 0) {
    return text.replace(classMatch[0], "");
  }
  const next = ` class=${quote}${nextTokens.join(" ")}${quote}`;
  return text.replace(classMatch[0], next);
}
function normalizeMetricPairStackContainers(sourceHtml = "", summary = null) {
  const input = String(sourceHtml || "");
  if (!input)
    return input;
  let convertedCount = 0;
  const output = input.replace(
    /<(div|section|article|aside)([^>]*)>\s*<(p|div)([^>]*)>[\s\S]*?<\/\3>\s*<(p|div)([^>]*)>[\s\S]*?<\/\5>\s*<\/\1>/gi,
    (fullMatch, tag, attrs, firstTag, firstAttrs, secondTag, secondAttrs) => {
      const classMatch = String(attrs || "").match(/\sclass\s*=\s*(["'])(.*?)\1/i);
      if (!classMatch)
        return fullMatch;
      const containerClasses = parseClassTokens(classMatch[2]);
      if (!containerClasses.includes("stack-sm"))
        return fullMatch;
      const firstClassMatch = String(firstAttrs || "").match(/\sclass\s*=\s*(["'])(.*?)\1/i);
      const secondClassMatch = String(secondAttrs || "").match(/\sclass\s*=\s*(["'])(.*?)\1/i);
      if (!firstClassMatch || !secondClassMatch)
        return fullMatch;
      const firstClasses = parseClassTokens(firstClassMatch[2]);
      const secondClasses = parseClassTokens(secondClassMatch[2]);
      const hasMetricTypographyPair = firstClasses.some((token) => /^import-text-/.test(String(token || ""))) && secondClasses.some((token) => /^import-text-/.test(String(token || "")));
      if (!hasMetricTypographyPair)
        return fullMatch;
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
  if (!configInput || typeof configInput !== "object")
    return {};
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
  if (!Number.isFinite(parsed))
    return DEFAULT_FONT_SCALE;
  return Math.max(1, Math.min(2, parsed));
}
function resolveSemanticHeadingTag(sizeToken = "", fontScale = DEFAULT_FONT_SCALE) {
  const baseRankBySize = {
    "4xl": 1,
    "3xl": 2,
    "2xl": 3,
    xl: 4
  };
  const baseRank = baseRankBySize[sizeToken];
  if (!baseRank)
    return "";
  const normalizedScale = Number.isFinite(Number(fontScale)) ? Math.max(1, Math.min(2, Number(fontScale))) : DEFAULT_FONT_SCALE;
  const rankShift = Math.max(-1, Math.min(1, Math.round((normalizedScale - DEFAULT_FONT_SCALE) / 0.25)));
  const adjustedRank = baseRank - rankShift;
  if (adjustedRank < 1)
    return "h1";
  if (adjustedRank > 4)
    return "";
  return `h${adjustedRank}`;
}
function normalizeSemanticTypography(sourceHtml = "", summary = null, options = {}) {
  const input = String(sourceHtml || "");
  if (!input)
    return input;
  const fontScale = resolveFontScale(options.config || {});
  let headingCount = 0;
  let strongCount = 0;
  const output = input.replace(/<(p|div|span)([^>]*)>([\s\S]*?)<\/\1>/gi, (fullMatch, tag, attrs, inner) => {
    const classMatch = String(attrs || "").match(/\sclass\s*=\s*(["'])(.*?)\1/i);
    if (!classMatch)
      return fullMatch;
    const classTokens = parseClassTokens(classMatch[2]);
    const hasImportBold = classTokens.includes("import-font-bold");
    if (!hasImportBold)
      return fullMatch;
    const textSizeToken = classTokens.find((token) => /^import-text-(?:4xl|3xl|2xl|xl)$/.test(String(token || ""))) || "";
    const sizeMatch = textSizeToken.match(/^import-text-(4xl|3xl|2xl|xl)$/);
    if (sizeMatch) {
      const headingTag = resolveSemanticHeadingTag(sizeMatch[1], fontScale);
      if (!headingTag) {
        return fullMatch;
      }
      const nextAttrs2 = updateClassTokensInAttrs(attrs, (tokens) => tokens.filter((token) => token !== "import-font-bold" && token !== textSizeToken));
      headingCount += 1;
      return `<${headingTag}${nextAttrs2}>${inner}</${headingTag}>`;
    }
    const hasNestedBlock = /<\/?(?:div|p|section|article|aside|main|header|footer|ul|ol|li|table|tr|td|th|h[1-6])\b/i.test(inner);
    const alreadyStrong = /<\/?(?:strong|b)\b/i.test(inner);
    if (hasNestedBlock || alreadyStrong)
      return fullMatch;
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
  if (!Array.isArray(variants) || variants.length === 0)
    return "";
  const nonBreakpoint = variants.filter((variant) => !BREAKPOINT_ORDER.includes(variant));
  if (nonBreakpoint.length === 0)
    return "";
  if (nonBreakpoint.length > 1)
    return "";
  const candidate = nonBreakpoint[0];
  if (["hover", "focus", "active"].includes(candidate))
    return candidate;
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
      ruleId: "fallback.import-style"
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
      12: "var(--spacing-12)"
    };
    const size = Number(gapMatch[1]);
    if (gapScale[size]) {
      return {
        declaration: `gap:${gapScale[size]}`,
        breakpoint,
        pseudo,
        ruleId: "fallback.import-style.gap-scale"
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
        ruleId: "fallback.import-style.margin-scale"
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
        ruleId: "fallback.import-style.min-width-arbitrary"
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
        ruleId: "fallback.import-style.max-width-arbitrary"
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
        ruleId: "fallback.import-style.min-height-arbitrary"
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
        ruleId: "fallback.import-style.grid-rows-arbitrary"
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
        ruleId: "fallback.import-style.size-scale"
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
        ruleId: "fallback.import-style.width-scale"
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
        ruleId: "fallback.import-style.height-scale"
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
    "4xl": "var(--font-size-4xl)"
  };
  const textSizeMatch = String(baseToken).match(/^text-(xs|sm|base|lg|xl|2xl|3xl|4xl)$/);
  if (textSizeMatch) {
    const size = textSizeMap[textSizeMatch[1]];
    return {
      declaration: `font-size:${size}`,
      breakpoint,
      pseudo,
      ruleId: "fallback.import-style.text-size"
    };
  }
  const fontWeightMap = {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900"
  };
  const fontWeightMatch = String(baseToken).match(/^font-(normal|medium|semibold|bold|extrabold|black)$/);
  if (fontWeightMatch) {
    return {
      declaration: `font-weight:${fontWeightMap[fontWeightMatch[1]]}`,
      breakpoint,
      pseudo,
      ruleId: "fallback.import-style.font-weight"
    };
  }
  const lineHeightMap = {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2"
  };
  const lineHeightMatch = String(baseToken).match(/^leading-(none|tight|snug|normal|relaxed|loose)$/);
  if (lineHeightMatch) {
    return {
      declaration: `line-height:${lineHeightMap[lineHeightMatch[1]]}`,
      breakpoint,
      pseudo,
      ruleId: "fallback.import-style.line-height"
    };
  }
  const trackingMap = {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em"
  };
  const trackingMatch = String(baseToken).match(/^tracking-(tighter|tight|normal|wide|wider|widest)$/);
  if (trackingMatch) {
    return {
      declaration: `letter-spacing:${trackingMap[trackingMatch[1]]}`,
      breakpoint,
      pseudo,
      ruleId: "fallback.import-style.tracking"
    };
  }
  const bgBlackAlphaMatch = String(baseToken).match(/^bg-black\/(\d{1,3})$/);
  if (bgBlackAlphaMatch) {
    const alpha = Math.max(0, Math.min(100, Number(bgBlackAlphaMatch[1])));
    return {
      declaration: `background-color:color-mix(in srgb, var(--color-gray-900) ${alpha}%, transparent)`,
      breakpoint,
      pseudo,
      ruleId: "fallback.import-style.overlay-alpha"
    };
  }
  if (baseToken === "text-white") {
    return {
      declaration: "color:var(--color-gray-50)",
      breakpoint,
      pseudo,
      ruleId: "fallback.import-style.text-inverse"
    };
  }
  const semanticBgMatch = String(baseToken).match(/^bg-(primary|secondary|accent)$/);
  if (semanticBgMatch) {
    const semanticBgVarMap = {
      primary: "var(--color-primary-fill)",
      secondary: "var(--color-gray-500)",
      accent: "var(--color-accent-500)"
    };
    const colorVar = semanticBgVarMap[semanticBgMatch[1]];
    if (colorVar) {
      return {
        declaration: `background-color:${colorVar}`,
        breakpoint,
        pseudo,
        ruleId: "fallback.import-style.bg-semantic"
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
        ruleId: "fallback.import-style.bg-tokenized"
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
        ruleId: "fallback.import-style.bg-arbitrary"
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
        ruleId: "fallback.import-style.text-tokenized"
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
        ruleId: "fallback.import-style.text-arbitrary"
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
      br: ["bottom-right"]
    };
    if (!corner) {
      return {
        declaration: `border-radius:${radiusValue}`,
        breakpoint,
        pseudo,
        ruleId: "fallback.import-style.rounded"
      };
    }
    const targets = cornerMap[corner] || [];
    const declarationText = targets.map((targetCorner) => `border-${targetCorner}-radius:${radiusValue}`).join(";");
    if (declarationText) {
      return {
        declaration: declarationText,
        breakpoint,
        pseudo,
        ruleId: "fallback.import-style.rounded"
      };
    }
  }
  return null;
}
function formatBreakpointLength(value, fallbackPx) {
  if (typeof value === "number" && Number.isFinite(value))
    return `${value}px`;
  if (typeof value === "string" && value.trim())
    return value.trim();
  return `${fallbackPx}px`;
}
function resolveBreakpoints(configInput = {}) {
  const config = configInput?.design && typeof configInput.design === "object" ? configInput.design : configInput;
  const bp = config?.layout?.breakpoints || {};
  return {
    sm: formatBreakpointLength(bp.sm, 640),
    md: formatBreakpointLength(bp.md, 768),
    lg: formatBreakpointLength(bp.lg, 1024),
    xl: formatBreakpointLength(bp.xl, 1280)
  };
}
function generateImportStyleSheetText(summary, breakpoints) {
  const baseRules = Array.from(summary.importBaseStyles.entries()).map(
    ([className, declaration]) => `.${className}{${declaration};}`
  );
  const responsiveRules = [];
  for (const [bp, map] of summary.importResponsiveStyles.entries()) {
    const minWidth = breakpoints?.[bp];
    if (!minWidth || !map?.size)
      continue;
    const body = Array.from(map.entries()).map(([className, declaration]) => `.${className}{${declaration};}`).join("\n");
    responsiveRules.push(`@media (min-width: ${minWidth}) {
${body}
}`);
  }
  for (const [bucketKey, map] of summary.importPseudoStyles.entries()) {
    const [bp, pseudo] = String(bucketKey).split("|");
    if (!pseudo || !map?.size)
      continue;
    const body = Array.from(map.entries()).map(([className, declaration]) => `.${className}:${pseudo}{${declaration};}`).join("\n");
    if (!body)
      continue;
    if (bp === "base") {
      responsiveRules.push(body);
      continue;
    }
    const minWidth = breakpoints?.[bp];
    if (!minWidth)
      continue;
    responsiveRules.push(`@media (min-width: ${minWidth}) {
${body}
}`);
  }
  const allRules = [...baseRules, ...responsiveRules].filter(Boolean).join("\n");
  if (!allRules.trim())
    return "";
  return [
    "/* pds-import: generated fallback styles for unmapped Tailwind utilities */",
    allRules
  ].join("\n");
}
function injectImportStyleBlock(html = "", cssText = "") {
  if (!cssText || !cssText.trim())
    return html;
  const styleBlock = `<style data-pds-import="tailwind-fallback">
${cssText}
</style>`;
  if (/<head[^>]*>/i.test(html)) {
    return html.replace(/<head([^>]*)>/i, `<head$1>
${styleBlock}`);
  }
  return `${styleBlock}
${html}`;
}
function isTailwindLike(token = "") {
  if (!token)
    return false;
  if (token.includes(":"))
    return true;
  if (token.includes("["))
    return true;
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
    unknownTokens: /* @__PURE__ */ new Map(),
    notes: [],
    appliedRules: /* @__PURE__ */ new Set(),
    importBaseStyles: /* @__PURE__ */ new Map(),
    importResponsiveStyles: /* @__PURE__ */ new Map(),
    importPseudoStyles: /* @__PURE__ */ new Map(),
    importedStyleCount: 0,
    labelNestingCount: 0,
    removedAtomicSpacingCount: 0,
    removedAtomicPositioningCount: 0
  };
}
function parseTailwindRuntimePreflightHints(cssText = "") {
  const compact = String(cssText || "").toLowerCase().replace(/\s+/g, "");
  const hasListReset = compact.includes("menu,ol,ul{list-style:none") || compact.includes("ol,ul,menu{list-style:none") || compact.includes("ul,ol,menu{list-style:none");
  const hasAnchorReset = compact.includes("a{color:inherit;text-decoration:inherit");
  return {
    listReset: hasListReset,
    anchorReset: hasAnchorReset
  };
}
function parseTailwindRuntimeScriptHints(scriptSrc = "") {
  const src = String(scriptSrc || "").toLowerCase();
  const isTailwindCdn = src.includes("cdn.tailwindcss.com");
  if (!isTailwindCdn) {
    return {
      listReset: false,
      anchorReset: false
    };
  }
  return {
    listReset: true,
    anchorReset: true
  };
}
function extractTailwindRuntimeContext(sourceHtml = "", summary = null) {
  let html = String(sourceHtml || "");
  const hints = {
    listReset: false,
    anchorReset: false,
    strippedRuntimeCssBlocks: 0,
    strippedRuntimeScripts: 0
  };
  html = html.replace(/<style([^>]*)>([\s\S]*?)<\/style>/gi, (fullMatch, attrs, cssBody) => {
    const cssText = String(cssBody || "");
    const isTailwindRuntime = /tailwindcss\s+v\d/i.test(cssText) || /\*\s*!\s*tailwindcss/i.test(cssText);
    if (!isTailwindRuntime)
      return fullMatch;
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
  if (!summary || !message)
    return;
  if (!summary.notes.includes(message)) {
    summary.notes.push(message);
  }
}
function addUnknownToken(summary, token) {
  const current = summary.unknownTokens.get(token) || 0;
  summary.unknownTokens.set(token, current + 1);
}
function resolveConversionPolicy(configInput = {}) {
  const config = configInput?.design && typeof configInput.design === "object" ? configInput.design : configInput;
  const utilities = config?.layout?.utilities || {};
  return {
    grid: utilities.grid !== false,
    flex: utilities.flex !== false,
    spacing: utilities.spacing !== false,
    container: utilities.container !== false
  };
}
function allowsRule(policy, gate) {
  if (!gate)
    return true;
  return policy?.[gate] !== false;
}
function parseGridColumns(base) {
  const match = String(base).match(/^grid-cols-(\d+)$/);
  if (!match)
    return null;
  return Number(match[1]);
}
function chooseGridAutoClass(gridByBreakpoint = {}) {
  const values = BREAKPOINT_ORDER.map((bp) => ({ bp, cols: gridByBreakpoint[bp] })).filter((entry) => Number.isFinite(entry.cols));
  if (values.length < 2)
    return null;
  if (values.length === 2) {
    const [first, second] = values;
    const isClassicOneToTwo = first.bp === "base" && first.cols === 1 && second.cols === 2;
    if (isClassicOneToTwo)
      return "grid-auto-lg";
    const isBaseSingleToExplicitBreakpoint = first.bp === "base" && first.cols === 1 && second.cols >= 3;
    if (isBaseSingleToExplicitBreakpoint)
      return null;
    if (first.cols < second.cols) {
      if (second.cols >= 4)
        return "grid-auto-md";
      if (second.cols >= 2)
        return "grid-auto-lg";
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
  if (!strictlyIncreasing)
    return null;
  const largest = values[values.length - 1]?.cols || 0;
  if (largest >= 4)
    return "grid-auto-md";
  if (largest >= 3)
    return "grid-auto-sm";
  return null;
}
function mapNeutralTextColorToSemanticClass(baseToken = "") {
  const match = String(baseToken).match(/^text-(gray|slate|zinc|neutral|stone)-(\d{2,3})$/);
  if (!match)
    return "";
  const shade = Number(match[2]);
  if (!Number.isFinite(shade))
    return "";
  if (shade >= 400 && shade <= 600)
    return "text-muted";
  return "";
}
function resolveResponsiveGridUtilityClass(breakpoint = "", cols = 0) {
  if (!breakpoint || !Number.isFinite(cols))
    return "";
  const map = {
    sm: {
      2: "sm:grid-cols-2"
    },
    md: {
      3: "md:grid-cols-3"
    },
    lg: {
      4: "lg:grid-cols-4"
    }
  };
  return map?.[breakpoint]?.[cols] || "";
}
function mapSpaceYTokenToStackClass(token = "") {
  const parsed = parseVariantToken(token);
  const base = String(parsed?.base || "");
  const sizeMatch = base.match(/^space-y-(\d+)$/);
  if (!sizeMatch)
    return "stack-md";
  const step = Number(sizeMatch[1]);
  if (!Number.isFinite(step))
    return "stack-md";
  if (step <= 1)
    return "stack-xs";
  if (step <= 2)
    return "stack-sm";
  if (step <= 4)
    return "stack-md";
  return "stack-lg";
}
function hasGapUtilityClass(mapped = /* @__PURE__ */ new Set()) {
  return Array.from(mapped).some((className) => {
    const value = String(className || "");
    return /^gap-(?:xs|sm|md|lg|xl)$/.test(value) || /^gap-[0-9]+$/.test(value) || /^import-(?:sm-|md-|lg-|xl-)?gap-/.test(value);
  });
}
function hasStackUtilityClass(mapped = /* @__PURE__ */ new Set()) {
  return Array.from(mapped).some((className) => /^stack-(?:xs|sm|md|lg|xl)$/.test(String(className || "")));
}
function hasGridSizingClass(mapped = /* @__PURE__ */ new Set()) {
  return Array.from(mapped).some((className) => {
    const value = String(className || "");
    return /^grid-cols-\d+$/.test(value) || /^grid-auto-(?:sm|md|lg|xl)$/.test(value) || /^(?:sm|md|lg|xl):grid-cols-\d+$/.test(value) || /^import-(?:sm-|md-|lg-|xl-)?grid-cols-\d+$/.test(value);
  });
}
function listTopUnknownTokens(summary, limit = 12) {
  return Array.from(summary.unknownTokens.entries()).sort((a, b) => b[1] - a[1]).slice(0, limit).map(([token]) => token);
}
function recordRule(summary, ruleId) {
  if (!summary || !ruleId)
    return;
  summary.appliedRules.add(ruleId);
}
function hasToken(sourceTokens = [], pattern) {
  if (!Array.isArray(sourceTokens) || !pattern)
    return false;
  return sourceTokens.some((token) => pattern.test(String(token)));
}
function parseTailwindButtonHeight(sourceTokens = []) {
  for (const token of sourceTokens) {
    const parsed = parseVariantToken(token);
    if (parsed.breakpoint !== "base")
      continue;
    const match = String(parsed.base).match(/^h-(.+)$/);
    if (!match)
      continue;
    const value = resolveTailwindSizeValue(match[1]);
    if (!value || value === "auto")
      continue;
    const pxMatch = String(value).match(/^(-?\d+(?:\.\d+)?)rem$/);
    if (pxMatch) {
      const rem = Number(pxMatch[1]);
      if (Number.isFinite(rem))
        return rem * 16;
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
  const isAnchorButtonLike = tagName === "a" && (hasCtaSignal || hasBorderSignal || hasCursorPointer || hasRoundedSignal && hasWidthSignal);
  const shouldNormalize = isNativeButton || isAnchorButtonLike;
  if (!shouldNormalize) {
    return {
      shouldNormalize: false,
      variant: "none",
      size: "base",
      iconOnly: false
    };
  }
  let variant = "none";
  if (hasBorderSignal && !hasBgSignal && !hasHoverBgSignal) {
    variant = "outline";
  } else if (hasCtaSignal || hasBgSignal && hasTextColorSignal) {
    variant = "primary";
  }
  const hasCompactIconSignal = sourceTokens.includes("rounded-full") && (sourceTokens.includes("p-2") || sourceTokens.includes("p-1") || sourceTokens.includes("p-2.5"));
  const hasIconSizeSignal = hasToken(sourceTokens, /^size-(?:6|7|8|9|10|11|12)$/);
  const iconOnly = hasCompactIconSignal || hasIconSizeSignal;
  const buttonHeightPx = parseTailwindButtonHeight(sourceTokens);
  const hasSmallText = sourceTokens.includes("text-sm") || sourceTokens.includes("text-xs");
  const hasLargeText = sourceTokens.includes("text-lg") || sourceTokens.includes("text-xl");
  let size = "base";
  if (buttonHeightPx && buttonHeightPx <= 40 || hasSmallText) {
    size = "sm";
  } else if (buttonHeightPx && buttonHeightPx >= 48 || hasLargeText) {
    size = "lg";
  }
  return {
    shouldNormalize: true,
    variant,
    size,
    iconOnly
  };
}
function mapBadgeVariantFromColorFamily(family = "") {
  const key = String(family || "").toLowerCase();
  if (["green", "emerald", "lime", "teal"].includes(key))
    return "badge-success";
  if (["blue", "sky", "cyan", "indigo"].includes(key))
    return "badge-info";
  if (["yellow", "amber", "orange"].includes(key))
    return "badge-warning";
  if (["red", "rose", "pink"].includes(key))
    return "badge-danger";
  if (["gray", "slate", "zinc", "neutral", "stone"].includes(key))
    return "badge-secondary";
  if (["purple", "violet", "fuchsia", "primary", "accent"].includes(key))
    return "badge-primary";
  return "badge-secondary";
}
function detectBadgeIntent(sourceTokens = [], tagName = "", buttonIntent = { shouldNormalize: false }) {
  if (buttonIntent?.shouldNormalize) {
    return {
      shouldNormalize: false,
      variantClass: "",
      outline: false,
      sizeClass: "",
      pastel: null
    };
  }
  if (["button", "a", "input", "select", "textarea"].includes(tagName)) {
    return {
      shouldNormalize: false,
      variantClass: "",
      outline: false,
      sizeClass: "",
      pastel: null
    };
  }
  if (sourceTokens.some((token) => /^badge(?:-|$)/.test(String(token)))) {
    return {
      shouldNormalize: false,
      variantClass: "",
      outline: false,
      sizeClass: "",
      pastel: null
    };
  }
  const baseTokens = sourceTokens.map((token) => parseVariantToken(token)).filter((parsed) => parsed.breakpoint === "base").map((parsed) => String(parsed.base));
  const hasRounded = baseTokens.some((token) => /^rounded(?:-|$)/.test(token));
  const hasPx = baseTokens.some((token) => /^px-/.test(token));
  const hasPy = baseTokens.some((token) => /^py-/.test(token));
  const hasCompactPadding = hasPx && hasPy;
  const hasSmallText = baseTokens.includes("text-xs") || baseTokens.includes("text-sm");
  const hasLargeText = baseTokens.includes("text-lg") || baseTokens.includes("text-xl");
  const bgMatch = baseTokens.map((token) => token.match(/^bg-([a-z]+)-(\d{2,3})(?:\/\d{1,3})?$/)).find(Boolean);
  const textMatch = baseTokens.map((token) => token.match(/^text-([a-z]+)-(\d{2,3})(?:\/\d{1,3})?$/)).find(Boolean);
  const borderMatch = baseTokens.map((token) => token.match(/^border-([a-z]+)-(\d{2,3})$/)).find(Boolean);
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
      pastel: null
    };
  }
  const family = bgMatch && bgMatch[1] || textMatch && textMatch[1] || borderMatch && borderMatch[1] || "";
  const mappedVariantClass = mapBadgeVariantFromColorFamily(family);
  const outline = hasBorder && !hasBgTone;
  const sizeClass = hasSmallText ? "badge-sm" : hasLargeText ? "badge-lg" : "";
  const pastel = hasBgTone ? {
    family,
    bgShade: Number.isFinite(bgShade) ? bgShade : 200,
    textShade: Number.isFinite(textShade) ? textShade : 700
  } : null;
  const variantClass = pastel ? "" : mappedVariantClass;
  return {
    shouldNormalize: true,
    variantClass,
    outline,
    sizeClass,
    pastel
  };
}
function mapTailwindBgFamilyToSurfaceClass(family = "", shade = 0) {
  const key = String(family || "").toLowerCase();
  const numericShade = Number(shade);
  if (key === "white")
    return "surface-base";
  if (["gray", "slate", "zinc", "neutral", "stone"].includes(key)) {
    if (Number.isFinite(numericShade) && numericShade <= 100)
      return "surface-base";
    return "surface-subtle";
  }
  if (["blue", "sky", "cyan", "indigo", "primary", "info"].includes(key))
    return "surface-info";
  if (["purple", "violet", "fuchsia", "accent"].includes(key))
    return "surface-primary";
  if (["green", "emerald", "lime", "teal", "success"].includes(key))
    return "surface-success";
  if (["yellow", "amber", "orange", "warning"].includes(key))
    return "surface-warning";
  if (["red", "rose", "pink", "danger"].includes(key))
    return "surface-danger";
  return "surface-base";
}
function detectCardIntent(sourceTokens = [], tagName = "", buttonIntent = { shouldNormalize: false }, badgeIntent = { shouldNormalize: false }) {
  if (buttonIntent?.shouldNormalize || badgeIntent?.shouldNormalize) {
    return {
      shouldNormalize: false,
      cardVariantClass: "",
      surfaceClass: ""
    };
  }
  const validTags = /* @__PURE__ */ new Set(["div", "section", "article", "aside", "li"]);
  if (!validTags.has(tagName)) {
    return {
      shouldNormalize: false,
      cardVariantClass: "",
      surfaceClass: ""
    };
  }
  if (sourceTokens.some((token) => /^card(?:-|$)/.test(String(token)))) {
    return {
      shouldNormalize: false,
      cardVariantClass: "",
      surfaceClass: ""
    };
  }
  const baseTokens = sourceTokens.map((token) => parseVariantToken(token)).filter((parsed) => parsed.breakpoint === "base").map((parsed) => String(parsed.base));
  const hasRounded = baseTokens.some((token) => /^rounded(?:-|$)/.test(token));
  const hasBorder = baseTokens.some((token) => /^border(?:$|-)/.test(token));
  const hasShadow = baseTokens.some((token) => /^shadow(?:$|-)/.test(token));
  const hasPadding = baseTokens.some((token) => /^(?:p|px|py|pt|pb|pl|pr)-/.test(token));
  const bgMatch = baseTokens.map((token) => token.match(/^bg-([a-z]+)-?(\d{2,3})?$/)).find(Boolean);
  const hasBackground = baseTokens.includes("bg-white") || Boolean(bgMatch);
  const confidenceSignals = [hasRounded, hasBorder || hasShadow, hasBackground, hasPadding].filter(Boolean).length;
  const shouldNormalize = confidenceSignals >= 3;
  if (!shouldNormalize) {
    return {
      shouldNormalize: false,
      cardVariantClass: "",
      surfaceClass: ""
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
    surfaceClass
  };
}
function buildClassReplacement({
  tagName,
  originalClassValue,
  policy,
  summary,
  preflightHints = {}
}) {
  if (TABLE_STRICT_TAGS.has(tagName)) {
    recordRule(summary, "table.strict-tags.no-classes");
    return "";
  }
  const sourceTokens = String(originalClassValue).split(/\s+/).filter(Boolean);
  const buttonIntent = detectButtonIntent(sourceTokens, tagName);
  const badgeIntent = detectBadgeIntent(sourceTokens, tagName, buttonIntent);
  const cardIntent = detectCardIntent(sourceTokens, tagName, buttonIntent, badgeIntent);
  const isHeadingTag = /^h[1-6]$/.test(tagName);
  const isIconLikeElement = ["i", "svg"].includes(tagName) || sourceTokens.some((token) => /^fa(?:[a-z-]+)?$/i.test(String(token || "")) || /^fa-/.test(String(token || "")));
  const mapped = /* @__PURE__ */ new Set();
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
        if (nextClass)
          mapped.add(nextClass);
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
      const buttonStyleTokenPattern = /^(?:bg-|text-(?!center$|left$|right$)|font-|leading-|tracking-|rounded|ring|border|shadow|outline|transition|duration|ease|delay|animate|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|w-|h-|min-|max-|size-|overflow)/;
      const skipNonStructuralButtonToken = buttonStyleTokenPattern.test(parsedBase) || parsedBase.startsWith("hover:");
      if (skipNonStructuralButtonToken) {
        summary.ignored += 1;
        recordRule(summary, "intent.component.button.normalize");
        return;
      }
    }
    if (isHeadingTag) {
      const headingTypographyOrColorPattern = /^(?:text-(?:xs|sm|base|lg|xl|\dxl|white|black|\[[^\]]+\]|[a-z]+-\d{2,3})|font-|leading-|tracking-|uppercase|lowercase|capitalize)/;
      if (headingTypographyOrColorPattern.test(base)) {
        summary.ignored += 1;
        summary.intentHits += 1;
        recordRule(summary, "intent.typography.heading-semantic");
        return;
      }
    }
    if (badgeIntent.shouldNormalize && isTwToken) {
      const parsedBase = String(base || "");
      const badgeStyleTokenPattern = /^(?:bg-|text-(?!center$|left$|right$)|font-|leading-|tracking-|rounded|ring|border|shadow|outline|transition|duration|ease|delay|animate|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|w-|h-|min-|max-|size-|overflow)/;
      if (badgeStyleTokenPattern.test(parsedBase) || parsedBase.startsWith("hover:")) {
        summary.ignored += 1;
        recordRule(summary, "intent.component.badge.normalize");
        return;
      }
    }
    if (cardIntent.shouldNormalize && isTwToken) {
      const parsedBase = String(base || "");
      const cardStyleTokenPattern = /^(?:bg-|text-(?!center$|left$|right$)|font-|leading-|tracking-|rounded|ring|border|shadow|outline|transition|duration|ease|delay|animate|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr)/;
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
      const shouldPreserveColorUtility = isIconLikeElement || tagName === "a" && !buttonIntent.shouldNormalize;
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
  if (allowsRule(policy, "flex") && sourceTokens.includes("flex-col") && (flexByBreakpoint.md === "flex-row" || flexByBreakpoint.lg === "flex-row")) {
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
      "card"
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
      "card"
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
      "card-interactive"
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
  const fallbackContainerTags = /* @__PURE__ */ new Set(["div", "section", "article", "aside", "nav", "main", "header", "footer", "form", "fieldset", "ul", "ol", "li"]);
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
        preflightHints: extracted.hints
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
  const confidenceRaw = 0.42 + baseCoverage * 0.45 + Math.min(summary.intentHits, 4) * 0.025 - unknownRatio * 0.18;
  const confidence = Math.max(0.15, Math.min(0.96, Number(confidenceRaw.toFixed(2))));
  const commentLines = [
    `pds-import: rulebook=${RULEBOOK_VERSION} confidence=${Math.round(confidence * 100)}%`,
    `pds-import: tailwind=${summary.totalTailwind} mapped=${summary.mapped} ignored=${summary.ignored} policySkipped=${summary.policySkipped} unknown=${summary.unknown}`
  ];
  if (unknownTokens.length) {
    commentLines.push(`pds-import: unknown-tailwind=${unknownTokens.join(", ")}`);
  }
  if (summary.notes.length) {
    commentLines.push(`pds-import: notes=${summary.notes.join(" | ")}`);
  }
  const annotatedHtml = `<!-- ${commentLines.join(" -->\n<!-- ")} -->
${convertedHtml}`;
  const issues = [];
  if (summary.unknown > 0) {
    issues.push({
      severity: "warning",
      message: `Converted with ${summary.unknown} unknown Tailwind utilities requiring manual review.`
    });
  }
  if (summary.policySkipped > 0) {
    issues.push({
      severity: "info",
      message: `Skipped ${summary.policySkipped} utility mappings due to PDS config policy.`
    });
  }
  if (unknownTokens.length) {
    issues.push({
      severity: "info",
      message: `Top unknown utilities: ${unknownTokens.slice(0, 8).join(", ")}`
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
        nestedLabelPairs: summary.labelNestingCount
      },
      unknownTailwindTokens: unknownTokens,
      notes: summary.notes,
      appliedRules: Array.from(summary.appliedRules),
      policy,
      importStyleSheetInjected: Boolean(importCss),
      breakpoints
    }
  };
}
function describeTailwindConversionRules() {
  return {
    rulesJsonPath: RULEBOOK_JSON_PATH,
    ...TAILWIND_TO_PDS_RULES,
    directMappings: TAILWIND_TO_PDS_RULES.directMappings.map((rule) => ({
      id: rule.id,
      tw: rule.tw,
      pds: rule.pds,
      gate: rule.gate || null
    })),
    ignoredPatterns: TAILWIND_TO_PDS_RULES.ignoredPatterns.map((rule) => ({
      id: rule.id,
      pattern: String(rule.pattern),
      reason: rule.reason
    }))
  };
}
function inferPrimaryColor(text) {
  const hex = String(text || "").match(/#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/);
  return hex ? hex[0] : null;
}
function escapeHtml(value) {
  return String(value || "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
function isLikelyHtml(value) {
  return /<\s*[a-z][^>]*>/i.test(String(value || ""));
}
function toPxNumber(value) {
  const text = String(value || "").trim().toLowerCase();
  if (!text)
    return null;
  const numeric = Number.parseFloat(text);
  if (!Number.isFinite(numeric))
    return null;
  if (text.endsWith("rem") || text.endsWith("em"))
    return numeric * 16;
  if (text.endsWith("px") || /^[0-9.\-]+$/.test(text))
    return numeric;
  return null;
}
function normalizeCssColor(value) {
  const text = String(value || "").trim();
  if (!text)
    return "";
  const hexMatch = text.match(/#(?:[0-9a-f]{3,8})\b/i);
  if (hexMatch)
    return hexMatch[0].toLowerCase();
  const rgbMatch = text.match(/rgba?\([^)]*\)/i);
  if (rgbMatch)
    return rgbMatch[0];
  const hslMatch = text.match(/hsla?\([^)]*\)/i);
  if (hslMatch)
    return hslMatch[0];
  return "";
}
function resolveCssVariableValue(varName = "") {
  const name = String(varName || "").trim();
  if (!name || typeof window === "undefined" || typeof document === "undefined")
    return "";
  const root = document.documentElement;
  if (!root)
    return "";
  const computed = window.getComputedStyle(root);
  return String(computed.getPropertyValue(name) || "").trim();
}
function resolveColorFromMaybeVar(value = "") {
  const text = String(value || "").trim();
  const direct = normalizeCssColor(text);
  if (direct)
    return direct;
  const varMatch = text.match(/var\(\s*(--[^\s,)]+)\s*(?:,[^)]+)?\)/i);
  if (!varMatch)
    return "";
  const resolved = resolveCssVariableValue(varMatch[1]);
  return normalizeCssColor(resolved);
}
function resolveTailwindBackgroundTokenToColor(token = "") {
  const raw = String(token || "").trim();
  if (!raw)
    return "";
  const baseToken = raw.split(":").pop() || raw;
  if (baseToken === "bg-white")
    return "#ffffff";
  if (baseToken === "bg-black")
    return "#000000";
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
  if (!familyShade)
    return "";
  const colorVar = mapTailwindColorToPdsColorVar(familyShade[1], familyShade[2]);
  if (!colorVar)
    return "";
  return resolveColorFromMaybeVar(colorVar);
}
function extractTailwindBackgroundColorsFromClass(className = "") {
  const tokens = String(className || "").split(/\s+/).map((token) => token.trim()).filter(Boolean);
  return tokens.map((token) => resolveTailwindBackgroundTokenToColor(token)).filter(Boolean);
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
  if (!text)
    return false;
  return /(^|\s|,)(html|body|:root|main)(\s|,|$)|#app\b|#root\b|\.app\b|\.page\b/.test(text);
}
function parseRgbColor(value = "") {
  const match = String(value || "").trim().match(/rgba?\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)(?:\s*,\s*([0-9.]+))?\s*\)/i);
  if (!match)
    return null;
  const r = Number.parseFloat(match[1]);
  const g = Number.parseFloat(match[2]);
  const b = Number.parseFloat(match[3]);
  const a = match[4] == null ? 1 : Number.parseFloat(match[4]);
  if (![r, g, b, a].every((num) => Number.isFinite(num)))
    return null;
  return {
    r: Math.max(0, Math.min(255, r)),
    g: Math.max(0, Math.min(255, g)),
    b: Math.max(0, Math.min(255, b)),
    a: Math.max(0, Math.min(1, a))
  };
}
function parseHexColor(value = "") {
  const match = String(value || "").trim().match(/^#([0-9a-f]{3,8})$/i);
  if (!match)
    return null;
  const raw = match[1].toLowerCase();
  if (raw.length === 3) {
    const [r, g, b] = raw.split("");
    return {
      r: Number.parseInt(`${r}${r}`, 16),
      g: Number.parseInt(`${g}${g}`, 16),
      b: Number.parseInt(`${b}${b}`, 16),
      a: 1
    };
  }
  if (raw.length === 6 || raw.length === 8) {
    return {
      r: Number.parseInt(raw.slice(0, 2), 16),
      g: Number.parseInt(raw.slice(2, 4), 16),
      b: Number.parseInt(raw.slice(4, 6), 16),
      a: raw.length === 8 ? Number.parseInt(raw.slice(6, 8), 16) / 255 : 1
    };
  }
  return null;
}
function colorToRgba(value = "") {
  const normalized = normalizeCssColor(value);
  if (!normalized)
    return null;
  if (normalized.startsWith("#"))
    return parseHexColor(normalized);
  if (normalized.startsWith("rgb"))
    return parseRgbColor(normalized);
  return null;
}
function relativeLuminance(color) {
  if (!color)
    return null;
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
  if (!text)
    return true;
  if (text === "transparent")
    return true;
  const rgba = colorToRgba(text);
  if (rgba && Number.isFinite(rgba.a))
    return rgba.a <= 0.04;
  return false;
}
function chooseBackgroundColor(rootCandidates = [], fallbackCandidates = []) {
  const normalizedRoot = rootCandidates.map((value) => normalizeCssColor(value)).filter((value) => value && !isTransparentColor(value));
  const rootWinner = pickMostFrequent(normalizedRoot);
  if (rootWinner) {
    return { color: rootWinner, source: "root" };
  }
  const normalizedFallback = fallbackCandidates.map((value) => normalizeCssColor(value)).filter((value) => value && !isTransparentColor(value));
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
function parseCssDeclarations(text, out = /* @__PURE__ */ new Map()) {
  const input = String(text || "");
  const regex = /([a-z-]+)\s*:\s*([^;{}]+)/gi;
  let match = regex.exec(input);
  while (match) {
    const prop = String(match[1] || "").trim().toLowerCase();
    const value = String(match[2] || "").trim();
    if (prop && value) {
      if (!out.has(prop))
        out.set(prop, []);
      out.get(prop).push(value);
    }
    match = regex.exec(input);
  }
  return out;
}
function collectHtmlSignals(rawInput = "") {
  const input = String(rawInput || "");
  const declarations = /* @__PURE__ */ new Map();
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
      if (normalized)
        colorValues.push(normalized);
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
          if (!isRootLikeSelector(block.selector))
            return;
          const rootDeclarations = parseCssDeclarations(block.body, /* @__PURE__ */ new Map());
          const rootValues = getDeclarationValues(rootDeclarations, ["background", "background-color"]).map((value) => normalizeCssColor(value)).filter(Boolean);
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
        if (!rootNode)
          return;
        const inlineStyle = rootNode.getAttribute("style") || "";
        if (!inlineStyle)
          return;
        const rootDeclarations = parseCssDeclarations(inlineStyle, /* @__PURE__ */ new Map());
        const rootValues = getDeclarationValues(rootDeclarations, ["background", "background-color"]).map((value) => normalizeCssColor(value)).filter(Boolean);
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
      if (text.trim())
        textChunks.push(text);
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
    textCorpus: textChunks.join("\n")
  };
}
function pickMostFrequent(values = []) {
  const counts = /* @__PURE__ */ new Map();
  values.forEach((value) => {
    const key = String(value || "").trim();
    if (!key)
      return;
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
  if (!schema || !path)
    return null;
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
  const relations = PDS2?.configRelations && typeof PDS2.configRelations === "object" ? PDS2.configRelations : {};
  const allowedPaths = new Set(Object.keys(relations));
  let schema = null;
  if (typeof PDS2?.buildConfigFormSchema === "function") {
    try {
      schema = PDS2.buildConfigFormSchema(design)?.schema || null;
    } catch (error) {
      schema = null;
    }
  }
  if (!schema && PDS2?.configFormSchema?.schema) {
    schema = PDS2.configFormSchema.schema;
  }
  return { design, schema, allowedPaths };
}
function coerceValueForNode(node, value) {
  if (!node)
    return value;
  if (Array.isArray(node.oneOf) && node.oneOf.length) {
    const options = node.oneOf.map((item) => item?.const).filter((item) => item !== void 0 && item !== null);
    if (options.length) {
      if (typeof value === "string") {
        const matched = options.find(
          (option) => String(option).toLowerCase() === value.toLowerCase()
        );
        if (matched !== void 0)
          return matched;
      }
      if (typeof value === "number") {
        const numeric = options.map((option) => Number(option)).filter((option) => Number.isFinite(option));
        if (numeric.length) {
          return numeric.reduce((best, current) => Math.abs(current - value) < Math.abs(best - value) ? current : best, numeric[0]);
        }
      }
      return options[0];
    }
  }
  if (node.type === "number" || node.type === "integer") {
    const parsed = Number(value);
    if (!Number.isFinite(parsed))
      return void 0;
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
  if (!segments.length)
    return;
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
  if (value === void 0 || value === null || value === "")
    return;
  if (state.allowedPaths.size && !state.allowedPaths.has(path))
    return;
  const node = getSchemaNodeByPath(state.schema, path);
  const nextValue = coerceValueForNode(node, value);
  if (nextValue === void 0 || nextValue === null || nextValue === "")
    return;
  setPatchPath(state.patch, path, nextValue);
  state.inferredPaths.add(path);
}
function collectMedianPx(values = []) {
  const nums = values.map((item) => toPxNumber(item)).filter((item) => Number.isFinite(item));
  if (!nums.length)
    return null;
  nums.sort((a, b) => a - b);
  const middle = Math.floor(nums.length / 2);
  if (nums.length % 2)
    return nums[middle];
  return (nums[middle - 1] + nums[middle]) / 2;
}
function inferFontFamily(values = []) {
  const cleaned = values.map((item) => String(item || "").split(",")[0] || "").map((item) => item.trim().replace(/^['"]|['"]$/g, "")).filter(Boolean);
  return pickMostFrequent(cleaned);
}
function inferBorderWidthKeyword(pxValue) {
  const size = Number(pxValue);
  if (!Number.isFinite(size))
    return "thin";
  if (size <= 0.75)
    return "hairline";
  if (size <= 1.5)
    return "thin";
  if (size <= 2.5)
    return "medium";
  return "thick";
}
function resolveTailwindRoundedTokenPx(token = "") {
  const baseToken = String(parseVariantToken(token).base || "").toLowerCase();
  const match = baseToken.match(/^rounded(?:-[trbl]{1,2})?(?:-(none|xs|sm|md|lg|xl|2xl|3xl|full))?$/);
  if (!match)
    return null;
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
    "3xl": 32
  };
  if (size === "full")
    return null;
  return Number.isFinite(map[size]) ? map[size] : null;
}
function inferRadiusPxFromTailwindClasses(classTokens = []) {
  const radiusValues = classTokens.map((token) => resolveTailwindRoundedTokenPx(token)).filter((value) => Number.isFinite(value));
  if (!radiusValues.length)
    return null;
  radiusValues.sort((a, b) => a - b);
  const middle = Math.floor(radiusValues.length / 2);
  if (radiusValues.length % 2)
    return radiusValues[middle];
  return (radiusValues[middle - 1] + radiusValues[middle]) / 2;
}
function inferPdsDesignFromHtml(input = {}) {
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
        extractedPaths: []
      }
    });
  }
  const context = getInferenceContext(input.config || {});
  const signals = collectHtmlSignals(html);
  const state = {
    patch: {},
    inferredPaths: /* @__PURE__ */ new Set(),
    allowedPaths: context.allowedPaths,
    schema: context.schema
  };
  const textColors = getDeclarationValues(signals.declarations, ["color"]).map((value) => normalizeCssColor(value)).filter(Boolean);
  const backgroundColors = getDeclarationValues(signals.declarations, ["background", "background-color"]).map((value) => normalizeCssColor(value)).filter(Boolean);
  const allColors = [...backgroundColors, ...textColors, ...signals.colorValues].filter(Boolean);
  const uniqueColors = Array.from(new Set(allColors));
  const explicitRootBackgroundCandidates = [
    ...signals.rootBackgroundColors || []
  ];
  const rootClassBackgroundCandidates = [
    ...signals.rootClassBackgroundColors || []
  ];
  const rootBackgroundCandidates = explicitRootBackgroundCandidates.length ? explicitRootBackgroundCandidates : rootClassBackgroundCandidates;
  const fallbackBackgroundCandidates = [
    ...backgroundColors,
    ...signals.classBackgroundColors || []
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
    "column-gap"
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
    "border-left-width"
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
    if (!Number.isFinite(number))
      return null;
    if (text.endsWith("ms"))
      return number;
    if (text.endsWith("s"))
      return number * 1e3;
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
  const confidence = extractedPaths.length ? Math.min(0.92, 0.35 + extractedPaths.length * 0.02) : 0.25;
  return createImportResult({
    source: "html-inference",
    type: String(input.sourceType || "design-inference"),
    confidence,
    issues: extractedPaths.length ? [] : [{ severity: "warning", message: "Could not infer enough design signals from input." }],
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
          classBased: (signals.classBackgroundColors || []).length
        }
      }
    }
  });
}
function convertHtmlLikeInputToPdsTemplate(input = {}) {
  const raw = String(input.input || "").trim();
  const sourceType = String(input.sourceType || "unknown");
  if (!raw) {
    return createImportResult({
      source: sourceType,
      type: sourceType,
      confidence: 0,
      issues: [{ severity: "error", message: "No input provided." }],
      meta: {
        conversionMode: "none"
      }
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
        ...converted.meta || {},
        conversionMode: "html-to-pds"
      }
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
      html: `<article class="card surface-base stack-sm"><h3>Imported Guidelines</h3><pre>${escapeHtml(raw)}</pre></article>`
    },
    meta: {
      conversionMode: "text-preview"
    }
  });
}
function convertTailwindHtmlToPds(input = {}) {
  const html = String(input.html || "").trim();
  if (!html) {
    return createImportResult({
      source: "tailwind",
      type: "tailwind-html",
      confidence: 0,
      issues: [{ severity: "error", message: "No HTML provided." }]
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
      html: conversion.html
    },
    meta: conversion.meta
  });
}
function convertBrandGuidelinesToPatch(input = {}) {
  const text = String(input.text || "").trim();
  if (!text) {
    return createImportResult({
      source: "brand",
      type: "brand-guidelines",
      confidence: 0,
      issues: [{ severity: "error", message: "No brand guideline text provided." }]
    });
  }
  const primary = inferPrimaryColor(text);
  const patch = {
    colors: {},
    typography: {}
  };
  const issues = [];
  if (primary) {
    patch.colors.primary = primary;
  } else {
    issues.push({
      severity: "warning",
      message: "No HEX color found; primary color was not inferred."
    });
  }
  if (/serif/i.test(text))
    patch.typography.fontFamilyBody = "Georgia, serif";
  if (/sans[-\s]?serif/i.test(text))
    patch.typography.fontFamilyBody = "Inter, Arial, sans-serif";
  if (/mono|monospace/i.test(text))
    patch.typography.fontFamilyMono = "JetBrains Mono, monospace";
  const confidence = primary ? 0.68 : 0.52;
  return createImportResult({
    source: "brand",
    type: "brand-guidelines",
    confidence,
    issues,
    designPatch: patch,
    meta: {
      inferred: {
        primaryColor: primary
      }
    }
  });
}

// src/js/pds-live-manager/import-service.js
var IMPORT_MODE_CONVERT_ONLY = "convert-only";
var IMPORT_MODE_ADOPT_AND_CONVERT = "adopt-design-and-convert";
function normalizeImportMode(value) {
  const normalized = String(value || "").trim().toLowerCase();
  if (normalized === IMPORT_MODE_ADOPT_AND_CONVERT)
    return IMPORT_MODE_ADOPT_AND_CONVERT;
  return IMPORT_MODE_CONVERT_ONLY;
}
function combineIssues(...issueLists) {
  const items = issueLists.flat().filter(Boolean);
  if (!items.length)
    return [];
  const seen = /* @__PURE__ */ new Set();
  return items.filter((issue) => {
    const key = `${String(issue?.severity || "info")}::${String(issue?.path || "")}::${String(issue?.message || "")}`;
    if (seen.has(key))
      return false;
    seen.add(key);
    return true;
  });
}
function combineConfidence(values = []) {
  const list = values.map((value) => Number(value)).filter((value) => Number.isFinite(value));
  if (!list.length)
    return 0;
  return Math.max(0, Math.min(1, list.reduce((sum, value) => sum + value, 0) / list.length));
}
function mergeMeta(base = {}, extra = {}) {
  return {
    ...base && typeof base === "object" ? base : {},
    ...extra && typeof extra === "object" ? extra : {}
  };
}
function deepMerge2(target = {}, source = {}) {
  if (!source || typeof source !== "object")
    return target;
  const out = Array.isArray(target) ? [...target] : { ...target };
  Object.entries(source).forEach(([key, value]) => {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      out[key] = deepMerge2(
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
    } catch (error) {
    }
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
    message: `${String(issue?.message || "Color contrast validation failed.")} (ratio=${ratioLabel}, required=${minLabel})`
  };
}
function validateAdoptedDesignPatch(baseDesign = {}, designPatch = {}, options = {}) {
  const patchKeys = designPatch && typeof designPatch === "object" ? Object.keys(designPatch) : [];
  if (!patchKeys.length) {
    return { ok: true, blocked: false, issues: [], report: { ok: true, issues: [] } };
  }
  const minContrast = Number(options.minContrast);
  const threshold = Number.isFinite(minContrast) ? minContrast : 4.5;
  const mergedDesign = deepMerge2(cloneValue(baseDesign || {}), cloneValue(designPatch || {}));
  const report = validateDesign(mergedDesign, {
    minContrast: threshold,
    minMutedContrast: 3,
    extendedChecks: true
  });
  const issues = Array.isArray(report?.issues) ? report.issues.map((issue) => normalizeValidationIssue(issue)) : [];
  return {
    ok: Boolean(report?.ok),
    blocked: !report?.ok,
    issues,
    report: {
      ok: Boolean(report?.ok),
      minContrast: threshold,
      issues: Array.isArray(report?.issues) ? report.issues : []
    }
  };
}
function getLiveImportSources() {
  return [
    { id: "template", name: "Templates" },
    { id: "tailwind-html", name: "Tailwind HTML" },
    { id: "brand-guidelines", name: "Brand Guidelines" },
    { id: "figma-json", name: "Figma Tokens JSON (planned)" },
    { id: "ux-pilot", name: "UX Pilot (planned)" },
    { id: "google-stitch", name: "Google Stitch (planned)" }
  ];
}
async function runLiveImport(request = {}) {
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
    const validationIssues = validation.blocked ? [
      {
        severity: "error",
        path: "/colors",
        message: "Import blocked: inferred design patch failed accessibility contrast validation."
      },
      ...validation.issues
    ] : [];
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
        validationBlocked: validation.blocked
      })
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
      ...heuristicPatch.designPatch && typeof heuristicPatch.designPatch === "object" ? heuristicPatch.designPatch : {},
      ...inferred.designPatch && typeof inferred.designPatch === "object" ? inferred.designPatch : {}
    };
    const validation = validateAdoptedDesignPatch(config || {}, designPatch || {});
    const safeDesignPatch = validation.blocked ? {} : designPatch;
    const validationIssues = validation.blocked ? [
      {
        severity: "error",
        path: "/colors",
        message: "Import blocked: inferred design patch failed accessibility contrast validation."
      },
      ...validation.issues
    ] : [];
    return createImportResult({
      source: "brand",
      type: sourceType,
      confidence: combineConfidence([
        templateResult.confidence,
        heuristicPatch.confidence,
        inferred.confidence
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
        validationBlocked: validation.blocked
      })
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
          message: `${sourceType} adapter is not implemented yet in this phase.`
        }
      ],
      meta: { importMode }
    });
  }
  return createImportResult({
    source: sourceType || "unknown",
    type: "unknown",
    confidence: 0,
    issues: [{ severity: "error", message: "Unsupported import source type." }],
    meta: { importMode }
  });
}

// src/js/pds-live-manager/import-history-service.js
var IMPORT_HISTORY_DB_NAME = "pds-live-import-history";
var IMPORT_HISTORY_DB_VERSION = 1;
var IMPORT_HISTORY_STORE = "imports";
var dbPromise = null;
function supportsIndexedDb() {
  return typeof globalThis !== "undefined" && typeof globalThis.indexedDB !== "undefined";
}
function sanitizeText(value) {
  return typeof value === "string" ? value : "";
}
function sanitizeArray(value) {
  return Array.isArray(value) ? value : [];
}
function sanitizeObject(value) {
  return value && typeof value === "object" ? value : {};
}
function openDb() {
  if (!supportsIndexedDb())
    return Promise.resolve(null);
  if (dbPromise)
    return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const request = globalThis.indexedDB.open(IMPORT_HISTORY_DB_NAME, IMPORT_HISTORY_DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(IMPORT_HISTORY_STORE)) {
        const store = db.createObjectStore(IMPORT_HISTORY_STORE, {
          keyPath: "id",
          autoIncrement: true
        });
        store.createIndex("createdAt", "createdAt", { unique: false });
        store.createIndex("sourceType", "sourceType", { unique: false });
        store.createIndex("fileName", "fileName", { unique: false });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("Failed to open import history database."));
  });
  return dbPromise;
}
function requestToPromise(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("IndexedDB operation failed."));
  });
}
function normalizeHistoryEntry(input = {}) {
  const now = Date.now();
  const createdAt = Number.isFinite(Number(input.createdAt)) ? Number(input.createdAt) : now;
  const createdAtIso = new Date(createdAt).toISOString();
  const issues = sanitizeArray(input.issues).map((issue) => ({
    severity: sanitizeText(issue?.severity || "info"),
    message: sanitizeText(issue?.message || "")
  }));
  const notes = sanitizeArray(input.notes).filter((note) => typeof note === "string");
  const unknownTailwindTokens = sanitizeArray(input.unknownTailwindTokens).filter(
    (token) => typeof token === "string"
  );
  const appliedRules = sanitizeArray(input.appliedRules).filter((rule) => typeof rule === "string");
  return {
    createdAt,
    createdAtIso,
    sourceType: sanitizeText(input.sourceType || "unknown"),
    importMode: sanitizeText(input.importMode || "convert-only"),
    source: sanitizeText(input.source || "unknown"),
    type: sanitizeText(input.type || "unknown"),
    fileName: sanitizeText(input.fileName || ""),
    fileSize: Number.isFinite(Number(input.fileSize)) ? Number(input.fileSize) : 0,
    mimeType: sanitizeText(input.mimeType || ""),
    fileContents: sanitizeText(input.fileContents || ""),
    convertedHtml: sanitizeText(input.convertedHtml || ""),
    confidence: Number.isFinite(Number(input.confidence)) ? Number(input.confidence) : 0,
    notes,
    issues,
    coverage: sanitizeObject(input.coverage),
    unknownTailwindTokens,
    appliedRules,
    importStyleSheetInjected: Boolean(input.importStyleSheetInjected),
    templateName: sanitizeText(input.templateName || ""),
    designPatch: sanitizeObject(input.designPatch),
    meta: sanitizeObject(input.meta),
    resultSnapshot: sanitizeObject(input.resultSnapshot)
  };
}
async function saveLiveImportHistory(input = {}) {
  const db = await openDb();
  if (!db)
    return null;
  const entry = normalizeHistoryEntry(input);
  const tx = db.transaction(IMPORT_HISTORY_STORE, "readwrite");
  const store = tx.objectStore(IMPORT_HISTORY_STORE);
  const id = await requestToPromise(store.add(entry));
  return { id, ...entry };
}
async function listLiveImportHistory(options = {}) {
  const db = await openDb();
  if (!db)
    return [];
  const limit = Number.isFinite(Number(options.limit)) ? Math.max(1, Number(options.limit)) : 30;
  const tx = db.transaction(IMPORT_HISTORY_STORE, "readonly");
  const store = tx.objectStore(IMPORT_HISTORY_STORE);
  const items = await requestToPromise(store.getAll()) || [];
  return items.sort((a, b) => Number(b?.createdAt || 0) - Number(a?.createdAt || 0)).slice(0, limit);
}
async function getLiveImportHistoryEntry(id) {
  const db = await openDb();
  if (!db)
    return null;
  const parsedId = Number(id);
  if (!Number.isFinite(parsedId))
    return null;
  const tx = db.transaction(IMPORT_HISTORY_STORE, "readonly");
  const store = tx.objectStore(IMPORT_HISTORY_STORE);
  const entry = await requestToPromise(store.get(parsedId));
  return entry || null;
}
async function clearLiveImportHistory() {
  const db = await openDb();
  if (!db)
    return;
  const tx = db.transaction(IMPORT_HISTORY_STORE, "readwrite");
  const store = tx.objectStore(IMPORT_HISTORY_STORE);
  await requestToPromise(store.clear());
}
export {
  clearLiveImportHistory,
  convertBrandGuidelinesToPatch,
  convertTailwindHtmlToPds,
  createImportResult,
  describeTailwindConversionRules,
  getLiveImportHistoryEntry,
  getLiveImportSources,
  isImportResult,
  listLiveImportHistory,
  listLiveTemplates,
  loadGoogleFont,
  loadLiveTemplateCatalog,
  runLiveImport,
  saveLiveImportHistory,
  startLive
};
//# sourceMappingURL=pds-manager.js.map
