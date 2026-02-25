// Pure Design System Ontology (PDS)
// This file is the single source-of-truth metadata for primitives, components, tokens, themes and enhancements.
// Used by MCP/query tooling for searching and correlating concepts.

export const ontology = {
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
  // Used by MCP tools and Storybook ontology search to expand user queries
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

// ═══════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

// Safe matches with try/catch for invalid selectors or environments without .matches
function tryMatches(el, selector) {
  if (!el || !selector) return false;
  try {
    return el.matches(selector);
  } catch (e) {
    return false;
  }
}

function safeClosest(el, selector) {
  if (!el || !selector || !el.closest) return null;
  try {
    return el.closest(selector);
  } catch (e) {
    return null;
  }
}

/**
 * Find component for an element using the ontology
 * @param {HTMLElement} startEl - Starting element to search from
 * @param {Object} options - Search options
 * @param {number} options.maxDepth - Maximum depth to traverse (default: 5)
 * @returns {Object|null} Component info or null
 */
export function findComponentForElement(startEl, { maxDepth = 5 } = {}) {
  if (!startEl) return null;
  if (startEl.closest && startEl.closest('.showcase-toc')) return null;

  let current = startEl;
  let depth = 0;

  while (current && depth < maxDepth) {
    depth++;

    // never traverse past the showcase
    if (current.tagName === 'DS-SHOWCASE') return null;

    // skip the section wrapper and continue climbing
    if (current.classList && current.classList.contains('showcase-section')) {
      current = current.parentElement;
      continue;
    }

    // 1) progressive enhancements
    for (const enh of PDS.ontology.enhancements) {
      const sel = enh.selector || enh;
      if (tryMatches(current, sel)) {
        return { element: current, componentType: 'enhanced-component', displayName: enh.description || sel, id: enh.id };
      }
    }

    // 2) Fieldset role groups
    if (current.tagName === 'FIELDSET') {
      const role = current.getAttribute('role');
      if (role === 'group' || role === 'radiogroup') {
        return { element: current, componentType: 'form-group', displayName: role === 'radiogroup' ? 'radio group' : 'form group' };
      }
    }

    // 3) label+input
    if (current.tagName === 'LABEL') {
      if (current.querySelector && current.querySelector('input,select,textarea')) {
        return { element: current, componentType: 'form-control', displayName: 'label with input' };
      }
    }
    const labelAncestor = current.closest ? current.closest('label') : null;
    if (labelAncestor && labelAncestor.querySelector && labelAncestor.querySelector('input,select,textarea')) {
      return { element: labelAncestor, componentType: 'form-control', displayName: 'label with input' };
    }

    // 4) primitives
    for (const prim of PDS.ontology.primitives) {
      // handle each selector safely, support wildcard class prefix like .icon-*
      for (const sel of prim.selectors || []) {
        const s = String(sel || '').trim();

        // Wildcard class prefix handling (e.g., .icon-*)
        if (s.includes('*')) {
          // Only support simple class wildcard like .prefix-*
          if (s.startsWith('.')) {
            const prefix = s.slice(1).replace(/\*/g, '');
            if (current.classList && Array.from(current.classList).some((c) => c.startsWith(prefix))) {
              return { element: current, componentType: 'pds-primitive', displayName: prim.name || prim.id, id: prim.id, tags: prim.tags };
            }
            // Also try to find an ancestor with such a class (but do not use closest with wildcard)
            let ancestor = current.parentElement;
            let levels = 0;
            while (ancestor && levels < maxDepth) {
              if (ancestor.classList && Array.from(ancestor.classList).some((c) => c.startsWith(prefix)) && ancestor.tagName !== 'DS-SHOWCASE') {
                return { element: ancestor, componentType: 'pds-primitive', displayName: prim.name || prim.id, id: prim.id, tags: prim.tags };
              }
              ancestor = ancestor.parentElement;
              levels++;
            }
            continue;
          }
          // unsupported wildcard pattern - skip
          continue;
        }

        // Normal selector: try matches, then safeClosest
        if (tryMatches(current, s)) {
          return { element: current, componentType: 'pds-primitive', displayName: prim.name || prim.id, id: prim.id, tags: prim.tags };
        }
        const ancestor = safeClosest(current, s);
        if (ancestor && ancestor.tagName !== 'DS-SHOWCASE') {
          return { element: ancestor, componentType: 'pds-primitive', displayName: prim.name || prim.id, id: prim.id, tags: prim.tags };
        }
      }

      // class prefix fallback for selectors that are like .icon-* written differently
      if (current.classList) {
        const clsList = Array.from(current.classList);
        for (const s of prim.selectors || []) {
          if (typeof s === 'string' && s.includes('*') && s.startsWith('.')) {
            const prefix = s.slice(1).replace(/\*/g, '');
            if (clsList.some((c) => c.startsWith(prefix))) {
              return { element: current, componentType: 'pds-primitive', displayName: prim.name || prim.id, id: prim.id, tags: prim.tags };
            }
          }
        }
      }
    }

    // 4.5) layout patterns - check before going higher in tree
    for (const layout of PDS.ontology.layoutPatterns || []) {
      for (const sel of layout.selectors || []) {
        const s = String(sel || '').trim();
        
        // Wildcard handling for gap-*, items-*, etc.
        if (s.includes('*')) {
          if (s.startsWith('.')) {
            const prefix = s.slice(1).replace(/\*/g, '');
            if (current.classList && Array.from(current.classList).some((c) => c.startsWith(prefix))) {
              return { element: current, componentType: 'layout-pattern', displayName: layout.name || layout.id, id: layout.id, tags: layout.tags };
            }
          }
          continue;
        }
        
        // Normal selector
        if (tryMatches(current, s)) {
          return { element: current, componentType: 'layout-pattern', displayName: layout.name || layout.id, id: layout.id, tags: layout.tags };
        }
        const ancestor = safeClosest(current, s);
        if (ancestor && ancestor.tagName !== 'DS-SHOWCASE') {
          return { element: ancestor, componentType: 'layout-pattern', displayName: layout.name || layout.id, id: layout.id, tags: layout.tags };
        }
      }
    }

    // 5) web components
    if (current.tagName && current.tagName.includes('-')) {
      const tagName = current.tagName.toLowerCase();
      const comp = PDS.ontology.components.find(c => c.selectors.includes(tagName));
      return { 
        element: current, 
        componentType: 'web-component', 
        displayName: comp?.name || tagName,
        id: comp?.id || tagName,
        tags: comp?.tags
      };
    }

    // 6) button/icon
    if (current.tagName === 'BUTTON') {
      const hasIcon = current.querySelector && current.querySelector('pds-icon');
      return { element: current, componentType: 'button', displayName: hasIcon ? 'button with icon' : 'button', id: 'button' };
    }
    if (tryMatches(current, 'pds-icon') || (current.closest && current.closest('pds-icon'))) {
      const el = tryMatches(current, 'pds-icon') ? current : current.closest('pds-icon');
      return { element: el, componentType: 'icon', displayName: `pds-icon (${el.getAttribute && el.getAttribute('icon') || 'unknown'})`, id: 'pds-icon' };
    }

    // 7) nav dropdown
    if (tryMatches(current, 'nav[data-dropdown]') || (current.closest && current.closest('nav[data-dropdown]'))) {
      const el = tryMatches(current, 'nav[data-dropdown]') ? current : current.closest('nav[data-dropdown]');
      return { element: el, componentType: 'navigation', displayName: 'dropdown menu', id: 'dropdown' };
    }

    // climb
    current = current.parentElement;
  }

  return null;
}

/**
 * Get all CSS selectors from the ontology
 * @returns {string[]} Array of all selectors
 */
export function getAllSelectors() {
  const s = [];
  for (const p of PDS.ontology.primitives) s.push(...(p.selectors || []));
  for (const c of PDS.ontology.components) s.push(...(c.selectors || []));
  for (const l of PDS.ontology.layoutPatterns || []) s.push(...(l.selectors || []));
  return Array.from(new Set(s));
}

/**
 * Search the ontology by tag, name, or category
 * @param {string} query - Search term
 * @param {Object} options - Search options
 * @returns {Object[]} Matching items
 */
export function searchOntology(query, options = {}) {
  const q = query.toLowerCase();
  const results = [];
  
  const searchIn = (items, type) => {
    for (const item of items) {
      const matches = 
        item.id?.toLowerCase().includes(q) ||
        item.name?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.tags?.some(t => t.toLowerCase().includes(q)) ||
        item.category?.toLowerCase().includes(q) ||
        item.selectors?.some(s => s.toLowerCase().includes(q));
      
      if (matches) {
        results.push({ ...item, type });
      }
    }
  };
  
  if (!options.type || options.type === 'primitive') {
    searchIn(ontology.primitives, 'primitive');
  }
  if (!options.type || options.type === 'component') {
    searchIn(ontology.components, 'component');
  }
  if (!options.type || options.type === 'layout') {
    searchIn(ontology.layoutPatterns, 'layout');
  }
  if (!options.type || options.type === 'enhancement') {
    searchIn(ontology.enhancements, 'enhancement');
  }
  
  return results;
}

/**
 * Get items by category
 * @param {string} category - Category name
 * @returns {Object} Items grouped by type
 */
export function getByCategory(category) {
  const cat = category.toLowerCase();
  return {
    primitives: ontology.primitives.filter(p => p.category === cat),
    components: ontology.components.filter(c => c.category === cat),
    layouts: ontology.layoutPatterns.filter(l => l.category === cat)
  };
}

/**
 * Get all available tags
 * @returns {string[]} Sorted unique tags
 */
export function getAllTags() {
  const tags = new Set();
  
  ontology.primitives.forEach(p => p.tags?.forEach(t => tags.add(t)));
  ontology.components.forEach(c => c.tags?.forEach(t => tags.add(t)));
  ontology.layoutPatterns.forEach(l => l.tags?.forEach(t => tags.add(t)));
  ontology.enhancements.forEach(e => e.tags?.forEach(t => tags.add(t)));
  
  return Array.from(tags).sort();
}

export default ontology;
