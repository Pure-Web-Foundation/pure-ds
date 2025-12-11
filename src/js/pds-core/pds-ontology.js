// Pure Design System Ontology (PDS)
// This file is the single source-of-truth metadata for primitives, components, tokens, themes and enhancements.

export const ontology = {
  meta: { name: "Pure Design System Ontology", version: "0.1" },

  tokens: {
    colors: ["primary", "secondary", "accent", "success", "warning", "danger", "info"],
    spacing: ["xs", "sm", "md", "lg", "xl"],
    typography: ["heading", "body", "mono"],
    themes: ["light", "dark"],
  },

  
  primitives: [
    { id: "badge", name: "Badge / Pill", selectors: [".badge", ".pill", ".tag", ".chip"] },
    { id: "card", name: "Card", selectors: [".card", ".card-basic", ".card-elevated", ".card-outlined", ".card-interactive"] },
    { id: "surface", name: "Surface", selectors: [".surface", ".surface-base", ".surface-raised", ".surface-overlay", ".surface-subtle", ".surface-elevated", ".surface-sunken"] },
    { id: "alert", name: "Alert", selectors: [".alert", ".alert-info", ".alert-success", ".alert-warning", ".alert-danger"] },
    { id: "dialog", name: "Dialog", selectors: ["dialog", ".dialog"] },
    { id: "table", name: "Table", selectors: ["table", ".table-responsive", ".data-table"] },
    { id: "button", name: "Button", selectors: ["button", "[class^='btn-']", ".icon-only"] },
    { id: "fieldset", name: "Fieldset Group", selectors: ["fieldset[role='group']", "fieldset[role='radiogroup']"] },
    { id: "label-field", name: "Label+Input", selectors: ["label"] },
    { id: "accordion", name: "Accordion", selectors: [".accordion", ".accordion-item", "details"] },
    { id: "icon", name: "Icon", selectors: ["pds-icon", ".icon", ".icon-*"] },
    { id: "figure", name: "Figure/Media", selectors: ["figure", "figure.media"] },
    { id: "gallery", name: "Gallery", selectors: [".gallery", ".gallery-grid"] },
  ],

  components: [
    { id: "pds-tabstrip", name: "Tab Strip", selectors: ["pds-tabstrip"] },
    { id: "pds-drawer", name: "Drawer", selectors: ["pds-drawer"] },
    { id: "pds-upload", name: "Upload", selectors: ["pds-upload"] },
  ],

  // Layout utilities - patterns for structuring content
  layoutPatterns: [
    { id: "grid", name: "Grid Container", selectors: [".grid", ".demo-grid"], description: "CSS Grid layout container" },
    { id: "grid-auto", name: "Auto-fit Grid", selectors: [".grid-auto-sm", ".grid-auto-md", ".grid-auto-lg", ".grid-auto-xl"], description: "Responsive auto-fit grid" },
    { id: "grid-cols", name: "Grid Columns", selectors: [".grid-cols-1", ".grid-cols-2", ".grid-cols-3", ".grid-cols-4", ".grid-cols-6"], description: "Fixed column grid" },
    { id: "flex", name: "Flex Container", selectors: [".flex", ".flex-wrap"], description: "Flexbox layout container" },
    { id: "container", name: "Container", selectors: [".container"], description: "Centered max-width container" },
    { id: "media-grid", name: "Media Grid", selectors: [".media-grid"], description: "Grid for media elements" },
  ],

  utilities: [
    ".btn-group", 
    ".demo-grid", 
    ".color-scale", 
    ".gap-*", 
    ".items-*", 
    ".justify-*",
    ".border-gradient",
    ".border-gradient-primary",
    ".border-gradient-accent",
    ".border-gradient-secondary",
    ".border-gradient-soft",
    ".border-gradient-medium",
    ".border-gradient-strong",
    ".border-glow",
    ".border-glow-sm",
    ".border-glow-lg",
    ".border-gradient-glow",
    ".border-glow-*"
  ],

  styles: {
    typography: ["headings", "body", "code"],
    icons: { source: "svg", sets: ["core", "brand"] },
    interactive: ["focus", "hover", "active"],
  },
};

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

// Find component for an element using the ontology
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
    for (const sel of PDS.ontology.enhancements) {
      if (tryMatches(current, sel)) {
        return { element: current, componentType: 'enhanced-component', displayName: sel };
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
              return { element: current, componentType: 'pds-primitive', displayName: prim.name || prim.id };
            }
            // Also try to find an ancestor with such a class (but do not use closest with wildcard)
            let ancestor = current.parentElement;
            let levels = 0;
            while (ancestor && levels < maxDepth) {
              if (ancestor.classList && Array.from(ancestor.classList).some((c) => c.startsWith(prefix)) && ancestor.tagName !== 'DS-SHOWCASE') {
                return { element: ancestor, componentType: 'pds-primitive', displayName: prim.name || prim.id };
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
          return { element: current, componentType: 'pds-primitive', displayName: prim.name || prim.id };
        }
        const ancestor = safeClosest(current, s);
        if (ancestor && ancestor.tagName !== 'DS-SHOWCASE') {
          return { element: ancestor, componentType: 'pds-primitive', displayName: prim.name || prim.id };
        }
      }

      // class prefix fallback for selectors that are like .icon-* written differently
      if (current.classList) {
        const clsList = Array.from(current.classList);
        for (const s of prim.selectors || []) {
          if (typeof s === 'string' && s.includes('*') && s.startsWith('.')) {
            const prefix = s.slice(1).replace(/\*/g, '');
            if (clsList.some((c) => c.startsWith(prefix))) {
              return { element: current, componentType: 'pds-primitive', displayName: prim.name || prim.id };
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
              return { element: current, componentType: 'layout-pattern', displayName: layout.name || layout.id };
            }
          }
          continue;
        }
        
        // Normal selector
        if (tryMatches(current, s)) {
          return { element: current, componentType: 'layout-pattern', displayName: layout.name || layout.id };
        }
        const ancestor = safeClosest(current, s);
        if (ancestor && ancestor.tagName !== 'DS-SHOWCASE') {
          return { element: ancestor, componentType: 'layout-pattern', displayName: layout.name || layout.id };
        }
      }
    }

    // 5) web components
    if (current.tagName && current.tagName.includes('-')) {
      return { element: current, componentType: 'web-component', displayName: current.tagName.toLowerCase() };
    }

    // 6) button/icon
    if (current.tagName === 'BUTTON') {
      const hasIcon = current.querySelector && current.querySelector('pds-icon');
      return { element: current, componentType: 'button', displayName: hasIcon ? 'button with icon' : 'button' };
    }
    if (tryMatches(current, 'pds-icon') || (current.closest && current.closest('pds-icon'))) {
      const el = tryMatches(current, 'pds-icon') ? current : current.closest('pds-icon');
      return { element: el, componentType: 'icon', displayName: `pds-icon (${el.getAttribute && el.getAttribute('icon') || 'unknown'})` };
    }

    // 7) nav dropdown
    if (tryMatches(current, 'nav[data-dropdown]') || (current.closest && current.closest('nav[data-dropdown]'))) {
      const el = tryMatches(current, 'nav[data-dropdown]') ? current : current.closest('nav[data-dropdown]');
      return { element: el, componentType: 'navigation', displayName: 'dropdown menu' };
    }

    // climb
    current = current.parentElement;
  }

  return null;
}

export function getAllSelectors() {
  const s = [];
  for (const p of PDS.ontology.primitives) s.push(...(p.selectors || []));
  for (const c of PDS.ontology.components) s.push(...(c.selectors || []));
  return Array.from(new Set(s));
}

export default ontology;
