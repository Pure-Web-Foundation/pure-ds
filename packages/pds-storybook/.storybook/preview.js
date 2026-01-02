import { addons } from '@storybook/preview-api';
import { SELECT_STORY } from '@storybook/core-events';
import React from 'react';
import { Title, Subtitle, Description as DocsDescription, Controls } from '@storybook/blocks';
import { PDS } from '@pds-src/js/pds.js';
import { presets } from '@pds-src/js/pds-core/pds-config.js';
import { config as userConfig } from '@user/pds-config';
import './addons/pds-configurator/preview.js';
import { withHTMLExtractor } from './addons/html-preview/preview.js';
import { withDescription } from './addons/description/preview.js';
import './htmlPreview.css';
import './docs.css';
import { toastFormData } from '../stories/utils/toast-utils.js';

// Expose toastFormData globally for inline event handlers
window.toastFormData = toastFormData;

// Get initial preset from storage or URL or default
const getInitialPreset = () => {
  try {
    // Check sessionStorage first (per-session)
    const sessionPreset = sessionStorage.getItem('storybook-pds-preset');
    if (sessionPreset) return sessionPreset;
    
    // Check localStorage (persistent)
    const storedPreset = localStorage.getItem('storybook-pds-preset');
    if (storedPreset) return storedPreset;
    
    // Check URL params
    const urlParams = new URLSearchParams(window.location.search);
    const urlPreset = urlParams.get('preset');
    if (urlPreset) return urlPreset;
  } catch (e) {
    console.warn('Failed to read preset from storage:', e);
  }
  
  return 'default'; // Default preset
};

const initialPreset = getInitialPreset();
console.log('🎨 Starting PDS initialization with preset:', initialPreset);

// Wrap top-level await in IIFE for production build compatibility
(async () => {
  PDS.initializing = true;
  const pdsOptions = {
    mode: 'live',
    preset: initialPreset,
    autoDefine: {
      baseURL: '/assets/pds/components/',
      predefine: ['pds-icon'],
      scanExisting: true,
      observeShadows: true,
      patchAttachShadow: true
    },
    applyGlobalStyles: true,
    manageTheme: true
  };

  // Merge user config
  if (userConfig) {
    if (userConfig.mode) pdsOptions.mode = userConfig.mode;
    if (userConfig.autoDefine) {
        // Merge autoDefine options
        pdsOptions.autoDefine = {
            ...pdsOptions.autoDefine,
            ...userConfig.autoDefine
        };
    }
  }

  await PDS.start(pdsOptions);
  PDS.initializing = false;

  console.log('✨ PDS initialized in live mode for Storybook');
  console.log('📦 AutoDefiner active at:', PDS.autoDefiner?.config?.baseURL);

  // Store PDS designer globally for reuse
  PDS.currentPreset = initialPreset;
})();

// Set up persistent style protection - monitor and restore PDS sheets if cleared
let protectionActive = false;
function ensurePDSStyles() {
  const sheets = document.adoptedStyleSheets || [];
  const hasPDS = sheets.some(s => s._pds === true);
  
  if (!hasPDS && PDS.Generator.instance) {
    console.log('🛡️ PDS sheets missing - restoring...');
    PDS.Generator.applyStyles();
  }
}

// Check periodically
setInterval(ensurePDSStyles, 100);

/**
 * Global decorator to ensure Shadow DOM components get PDS styles and run enhancers
 */
const withPDS = (story, context) => {
  console.log('🎬 withPDS decorator called for:', context.title);
  
  // Check adoptedStyleSheets status
  const currentSheets = document.adoptedStyleSheets || [];
  const pdsSheets = currentSheets.filter(s => s._pds === true);
  console.log('📋 Current adoptedStyleSheets:', currentSheets.length, 'PDS sheets:', pdsSheets.length);
  
  // ALWAYS reapply PDS styles before each story render
  const designer = PDS.Generator.instance;
  if (designer) {
    PDS.Generator.applyStyles();
    
    // Check again after applying
    const afterSheets = document.adoptedStyleSheets || [];
    const afterPdsSheets = afterSheets.filter(s => s._pds === true);
  } else if (!PDS.initializing && PDS.isLiveMode()) {
    console.warn('⚠️ No designer found!');
  }
  
  // Render story
  const storyResult = story();
  
  // After render, ensure shadow roots get PDS styles and run enhancers
  // Use MutationObserver to continuously adopt layers when components update
  const adoptAllShadowStyles = async () => {
    const container = document.querySelector('#storybook-root');
    if (!container) return;
    
    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_ELEMENT,
      null
    );
    
    let node;
    const shadowRoots = [];
    while (node = walker.nextNode()) {
      if (node.shadowRoot) {
        shadowRoots.push({ root: node.shadowRoot, host: node.tagName });
      }
    }
    
    // if (shadowRoots.length > 0) {
    //   console.log(`🎭 Adopting PDS layers for ${shadowRoots.length} shadow components`);
    // }
    
    // Check if shadow roots need PDS styles adoption
    // DON'T re-adopt if they already have styles - this preserves component internal stylesheets
    for (const { root, host } of shadowRoots) {
      try {
        const currentSheets = root.adoptedStyleSheets || [];
        
        // Check if this shadow root already has PDS sheets
        const hasPDSSheets = currentSheets.some(sheet => {
          try {
            // Check if it's a PDS sheet by looking for PDS-specific selectors
            return Array.from(sheet.cssRules || []).some(rule => 
              rule.selectorText?.includes(':where') || 
              rule.cssText?.includes('--color-') ||
              rule.cssText?.includes('--spacing-')
            );
          } catch {
            return false;
          }
        });
        
        if (hasPDSSheets && currentSheets.length > 0) {
          //console.log(`⏭️  <${host.toLowerCase()}> already has ${currentSheets.length} sheets - skipping`);
          continue;
        }
        
        // Only adopt if the component doesn't have PDS styles yet
        // Get existing adopted sheets that aren't PDS sheets (preserve component styles)
        const existingSheets = currentSheets.filter(sheet => !sheet._pds);
        
        //console.log(`🎨 Adopting layers for <${host.toLowerCase()}> (had ${currentSheets.length} sheets, ${existingSheets.length} non-PDS)...`);
        
        // Adopt full layer stack: primitives, components, utilities
        await PDS.adoptLayers(root, ['primitives', 'components', 'utilities'], existingSheets);
        
        //console.log(`✅ Adopted layers for <${host.toLowerCase()}> (now ${root.adoptedStyleSheets.length} sheets)`);
      } catch (err) {
        console.error(`❌ Failed to adopt PDS layers for <${host.toLowerCase()}>:`, err);
        console.error(err.stack);
      }
    }
    
    // Run enhancers on newly rendered content
    if (PDS.enhancer && typeof PDS.enhancer.enhance === 'function') {
      PDS.enhancer.enhance(container);
    }
  };
  
  // Initial adoption - run multiple times to catch lazy components
  setTimeout(adoptAllShadowStyles, 0);
  setTimeout(adoptAllShadowStyles, 100);
  setTimeout(adoptAllShadowStyles, 300);
  
  // Re-adopt on any DOM changes (for re-renders) with debouncing
  let adoptTimeout;
  setTimeout(() => {
    const container = document.querySelector('#storybook-root');
    if (container && !container._pdsObserver) {
      const debouncedAdopt = () => {
        clearTimeout(adoptTimeout);
        adoptTimeout = setTimeout(() => {
          console.log('🔄 DOM changed - re-adopting primitives');
          adoptAllShadowStyles();
        }, 100); // Increased debounce to 100ms
      };
      
      const observer = new MutationObserver(debouncedAdopt);
      observer.observe(container, { 
        childList: true, 
        subtree: true,
        attributes: true,
        characterData: true // Also watch text changes
      });
      container._pdsObserver = observer;
      
      // Also re-adopt periodically as fallback (every 1 second)
      setInterval(() => {
        if (document.contains(container)) {
          adoptAllShadowStyles();
        }
      }, 1000);
    }
  }, 100);
  
  return storyResult;
};

// Add a decorator that has access to context.globals to handle preset/theme changes
const withGlobalsHandler = (story, context) => {
  const { globals } = context;
  
  // Handle preset changes via decorator (has access to globals)
  if (globals?.preset && globals.preset !== PDS.currentPreset) {
    console.log('🔄 Decorator detected preset change:', PDS.currentPreset, '→', globals.preset);
    
    // Apply preset asynchronously
    (async () => {
      try {
        PDS.currentPreset = globals.preset;
        
        // Store for persistence
        try {
          sessionStorage.setItem('storybook-pds-preset', globals.preset);
          localStorage.setItem('storybook-pds-preset', globals.preset);
        } catch (e) {}
        
        // Load and apply preset
        const { presets } = await import('../../../src/js/pds-core/pds-config.js');
        const presetConfig = presets[globals.preset];
        
        if (presetConfig) {
          console.log(`🎨 Applying preset via decorator: ${presetConfig.name || globals.preset}`);
          
          const generatorOptions = { 
            design: structuredClone(presetConfig),
            log: (...args) => console.log('🟦 [Generator]', ...args)
          };
          
          if (PDS.theme) generatorOptions.theme = PDS.theme;
          
          const newDesigner = new PDS.Generator(generatorOptions);
          await PDS.Generator.applyStyles();
          
          console.log(`✅ Preset applied via decorator: ${globals.preset}`);
        }
      } catch (err) {
        console.error('❌ Failed to apply preset via decorator:', err);
      }
    })();
  }
  
  // Handle theme changes
  if (globals?.theme && globals.theme !== document.body.getAttribute('data-theme')) {
    console.log('🌙 Decorator detected theme change:', globals.theme);
    document.body.setAttribute('data-theme', globals.theme);
    PDS.theme = globals.theme;
  }
  
  return story();
};

const DEFAULT_STORY_TAGS = new Set(['dev', 'test', 'story', 'stories', 'autodocs', 'example', 'examples']);

const TAG_SYNONYMS = new Map([
  ['padding', 'spacing', 'space'],
  ['gap', 'spacing'],
  ['grid', 'layout'],
  ['flex', 'layout'],
  ['dialogs', 'interaction'],
  ['validation', 'interaction'],
  ['confirmation', 'interaction'],
  ['surfaces', 'surface'],
  ['alert', 'alerts'],
  ['badge', 'badges'],
  ['pill', 'pills'],
  ['color', 'colors']
]);

const normalizeTag = (tag) => {
  if (typeof tag !== 'string') return null;
  const value = tag.trim().toLowerCase();
  if (!value) return null;

  const synonym = TAG_SYNONYMS.get(value);
  const normalized = synonym || value;

  if (DEFAULT_STORY_TAGS.has(normalized)) return null;

  return normalized;
};

const SEMANTIC_TAG_RELATIONS = new Map([
  // ['interaction', ['dialogs', 'buttons', 'forms']],
  // ['buttons', ['interaction', 'controls']],
  // ['forms', ['interaction', 'validation']],
  // ['spacing', ['layout', 'gap', 'padding', 'cards', 'grid']],
  // ['layout', ['spacing', 'grid', 'flex', 'cards']],
  // ['grid', ['layout', 'spacing']],
  // ['gap', ['spacing']],
  // ['cards', ['layout', 'spacing', 'surface']],
  // ['surface', ['cards', 'spacing']],
  // ['alerts', ['interaction', 'colors']],
  // ['badges', ['colors', 'pills']],
  // ['pills', ['badges', 'colors']],
  // ['colors', ['surface']],
  // ['utilities', ['spacing', 'layout']],
  // ['focus', ['interaction']],
  // ['hover', ['interaction']],
  // ['confirmation', ['dialogs', 'interaction']]
]);

const expandSemanticTags = (input) => {
  if (!input || input.size === 0) return input;
  const expanded = new Set(input);
  const queue = Array.from(input);

  while (queue.length > 0) {
    const tag = queue.pop();
    const related = SEMANTIC_TAG_RELATIONS.get(tag);
    if (!related) continue;
    related.forEach((value) => {
      const normalized = normalizeTag(value);
      if (!normalized) return;
      if (!expanded.has(normalized)) {
        expanded.add(normalized);
        queue.push(normalized);
      }
    });
  }

  return expanded;
};

const ensureRelatedStyles = (() => {
  let injected = false;
  return () => {
    if (injected || typeof document === 'undefined') return;

    const style = document.createElement('style');
    style.id = 'pds-related-footer-styles';
    style.textContent = `
      .pds-related-footer {
        margin-top: var(--spacing-8);
        padding-top: var(--spacing-5);
        border-top: 1px solid var(--color-border);
      }

      .pds-related-footer h2 {
        margin: 0 0 var(--spacing-3);
        font-size: var(--font-size-sm);
        text-transform: uppercase;
        letter-spacing: var(--letter-spacing-wide, 0.08em);
        color: var(--color-text-muted);
      }

      #pds-related-overlay {
        position: fixed;
        inset-block-end: var(--spacing-4);
        inset-inline-end: 0;
        z-index: var(--z-popover, 2147483647);
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        gap: 0;
        pointer-events: none;
        transition: inset-inline-end var(--transition-fast), gap var(--transition-fast);
      }

      #pds-related-overlay.is-expanded {
        inset-inline-end: var(--spacing-4);
        gap: var(--spacing-3);
      }

      #pds-related-overlay > * {
        pointer-events: auto;
      }

      #pds-related-overlay.is-expanded .pds-related-toggle {
        background: var(--color-primary-100);
        color: var(--color-primary-700);
        border-color: var(--color-primary-500);
      }

      #pds-related-overlay.is-collapsed .pds-related-toggle {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }

      .pds-related-toggle {
        writing-mode: vertical-rl;
        transform: rotate(180deg);
        background: var(--color-surface-overlay);
        color: var(--color-primary-text, var(--color-primary-600));
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: var(--spacing-3) var(--spacing-2);
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-semibold);
        letter-spacing: var(--letter-spacing-wide, 0.12em);
        text-transform: uppercase;
        cursor: pointer;
        box-shadow: var(--shadow-sm);
        transition: background-color var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast), transform var(--transition-fast);
      }

      .pds-related-toggle:hover,
      .pds-related-toggle:focus-visible {
        background: var(--color-primary-100);
        color: var(--color-primary-700);
        border-color: var(--color-primary-500);
        outline: none;
      }

      .pds-related-panel {
        max-width: min(360px, 90vw);
        width: clamp(260px, 32vw, 360px);
        min-width: 0;
        background: var(--color-surface-overlay);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: var(--spacing-5);
        display: grid;
        gap: var(--spacing-4);
        box-shadow: var(--shadow-lg);
        font-family: var(--font-family-body, var(--font-family-base, system-ui));
        color: var(--color-text-primary);
        backdrop-filter: var(--backdrop-filter, blur(12px));
        overflow: hidden;
        opacity: 1;
        transform: translateY(0);
        transition: opacity var(--transition-fast), transform var(--transition-fast), max-width var(--transition-fast), width var(--transition-fast), padding var(--transition-fast), border-width var(--transition-fast);
      }

      .pds-related-panel > * {
        transition: opacity var(--transition-fast);
      }

      #pds-related-overlay.is-collapsed .pds-related-panel {
        opacity: 0;
        transform: translateY(8px);
        max-width: 0;
        width: 0;
        padding: 0;
        border-width: 0;
        pointer-events: none;
        box-shadow: none;
      }

      #pds-related-overlay.is-collapsed .pds-related-panel > * {
        opacity: 0;
      }

      #pds-related-overlay.is-expanded .pds-related-panel {
        opacity: 1;
        transform: translateY(0);
      }

      #pds-related-overlay.is-expanded .pds-related-panel > * {
        opacity: 1;
      }

      .pds-related-panel-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--spacing-3);
      }

      .pds-related-panel h2 {
        margin: 0;
        font-size: var(--font-size-xs);
        text-transform: uppercase;
        letter-spacing: var(--letter-spacing-wide, 0.12em);
        color: var(--color-text-muted);
      }

      .pds-related-close {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--spacing-8);
        height: var(--spacing-8);
        border-radius: var(--radius-full);
        border: 1px solid transparent;
        background: transparent;
        color: var(--color-text-muted);
        cursor: pointer;
        transition: background-color var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast);
      }

      .pds-related-close:hover,
      .pds-related-close:focus-visible {
        background: color-mix(in oklab, var(--color-primary-500) 15%, transparent);
        color: var(--color-primary-600);
        border-color: var(--color-primary-400);
        outline: none;
      }

      .pds-related-close pds-icon {
        width: var(--icon-size-sm, 20px);
        height: var(--icon-size-sm, 20px);
      }

      .pds-related-accordion {
        display: grid;
        gap: var(--spacing-3);
      }

      .pds-related-accordion details {
        border-radius: var(--radius-md);
        overflow: hidden;
        border: 1px solid var(--color-border);
        background: var(--color-surface-base);
      }

      .pds-related-panel .pds-related-accordion details {
        background: var(--color-surface-overlay);
      }

      .pds-related-footer .pds-related-accordion details {
        background: var(--color-surface-base);
      }

      .pds-related-accordion summary {
        display: flex;
        align-items: center;
        gap: var(--spacing-2);
        padding: var(--spacing-3) var(--spacing-4);
        font-weight: var(--font-weight-semibold);
        font-size: var(--font-size-sm);
        cursor: pointer;
        list-style: none;
      }

      .pds-related-accordion summary::-webkit-details-marker {
        display: none;
      }

      .pds-related-accordion summary::after {
        content: '';
        border: solid currentColor;
        border-width: 0 2px 2px 0;
        display: inline-block;
        padding: 4px;
        transform: rotate(-45deg);
        margin-inline-start: auto;
        transition: transform var(--transition-fast);
      }

      .pds-related-accordion details[open] summary::after {
        transform: rotate(135deg);
      }

      .pds-related-tag-label {
        text-transform: uppercase;
        letter-spacing: var(--letter-spacing-wide, 0.08em);
        font-size: var(--font-size-xs);
        color: inherit;
      }

      .pds-related-count {
        background: var(--color-primary-100);
        color: var(--color-primary-700);
        border-radius: var(--radius-full, 999px);
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-semibold);
        line-height: 1;
        padding: var(--spacing-1) var(--spacing-2);
      }

      .pds-related-list {
        list-style: none;
        display: grid;
        gap: var(--spacing-2);
        padding: 0 var(--spacing-4) var(--spacing-3);
        margin: 0;
      }

      .pds-related-list-item {
        display: flex;
        flex-direction: row;
        gap: var(--spacing-3);
        align-items: baseline;
        justify-content: space-between;
      }

      .pds-related-list a {
        font-weight: var(--font-weight-semibold);
        color: var(--color-primary-text, var(--color-primary-600));
        text-decoration: none;
      }

      .pds-related-list a:hover {
        text-decoration: underline;
      }

      .pds-related-list a[aria-current="page"] {
        color: var(--color-text-muted);
        cursor: default;
        text-decoration: none;
      }

      .pds-related-tags {
        font-size: var(--font-size-xs);
        color: var(--color-text-muted);
      }

      .pds-related-footer .pds-related-tags {
        color: var(--color-text-muted);
      }

      @media (max-width: 600px) {
        #pds-related-overlay {
          inset-block-end: var(--spacing-3);
        }

        #pds-related-overlay.is-expanded {
          inset-inline-end: var(--spacing-3);
        }

        .pds-related-toggle {
          padding: var(--spacing-2) var(--spacing-1);
        }

        .pds-related-panel {
          width: min(90vw, 320px);
          max-width: min(90vw, 320px);
          padding: var(--spacing-4);
        }
      }
    `;

    document.head.appendChild(style);
    injected = true;
  };
})();

const getStorySlug = (storyId) => {
  if (typeof storyId !== 'string') return undefined;
  const [slug] = storyId.split('--');
  return slug;
};

const selectStoryById = (storyId, viewMode = 'story') => {
  if (!storyId) return false;

  try {
    const channel = addons?.getChannel?.();
    if (channel) {
      channel.emit(SELECT_STORY, { storyId, viewMode });
      return true;
    }
  } catch (err) {
    console.warn('PDS related overlay: channel navigation failed', err);
  }

  try {
    window.parent?.postMessage(
      {
        source: 'pds-related-overlay',
        type: 'pds-related:navigate',
        storyId,
        viewMode
      },
      '*'
    );
  } catch {}

  const slug = getStorySlug(storyId);
  const targetSearch = viewMode === 'docs' && slug
    ? `?path=/docs/${slug}--docs`
    : `?path=/story/${storyId}`;

  try {
    if (window.parent && window.parent !== window) {
      window.parent.location.search = targetSearch;
    } else {
      window.location.search = targetSearch;
    }
    return true;
  } catch (err) {
    console.warn('PDS related overlay: fallback navigation failed', err);
  }

  return false;
};

const defaultRelatedLinkConfigurator = (link, item, preferredViewMode = 'docs') => {
  if (!link || !item) return;

  if (preferredViewMode === 'story' && item.storyId) {
    link.href = `?path=/story/${item.storyId}`;
    return;
  }

  if (preferredViewMode === 'docs' && item.slug) {
    link.href = `?path=/docs/${item.slug}--docs`;
    return;
  }

  if (item.storyId) {
    link.href = `?path=/story/${item.storyId}`;
    return;
  }

  if (item.slug) {
    link.href = `?path=/docs/${item.slug}--docs`;
    return;
  }

  link.href = '#';
};

const groupRelatedByTag = (related, currentTags) => {
  const grouped = new Map();

  related.forEach((item) => {
    item.overlap.forEach((tag) => {
      if (!grouped.has(tag)) grouped.set(tag, []);
      grouped.get(tag).push(item);
    });
  });

  const currentTagArray = Array.isArray(currentTags)
    ? currentTags
    : Array.from(currentTags || []);

  const priority = new Map();
  currentTagArray.forEach((tag, index) => {
    if (!priority.has(tag)) priority.set(tag, index);
  });

  const orderedTags = Array.from(grouped.keys()).sort((a, b) => {
    const priorityA = priority.has(a) ? priority.get(a) : Number.MAX_SAFE_INTEGER;
    const priorityB = priority.has(b) ? priority.get(b) : Number.MAX_SAFE_INTEGER;

    if (priorityA !== priorityB) return priorityA - priorityB;

    const countDiff = grouped.get(b).length - grouped.get(a).length;
    if (countDiff !== 0) return countDiff;

    return a.localeCompare(b);
  });

  return { grouped, orderedTags };
};

const buildRelatedAccordion = (related, currentTags, options = {}) => {
  if (!related?.length) return null;

  const { grouped, orderedTags } = groupRelatedByTag(related, currentTags);
  if (!orderedTags.length) return null;

  const {
    variant = 'overlay',
    configureLink,
    openFirst = false
  } = options;

  const accordion = document.createElement('section');
  accordion.className = 'accordion pds-related-accordion';
  accordion.classList.add(
    variant === 'overlay' ? 'pds-related-accordion--overlay' : 'pds-related-accordion--docs'
  );

  orderedTags.forEach((tag, index) => {
    const stories = grouped.get(tag);
    if (!stories?.length) return;

    const details = document.createElement('details');
    if (openFirst && index === 0) {
      details.open = true;
    }

    const summary = document.createElement('summary');
    const tagLabel = document.createElement('span');
    tagLabel.className = 'pds-related-tag-label';
    tagLabel.textContent = tag;
    summary.appendChild(tagLabel);

    const count = document.createElement('span');
    count.className = 'pds-related-count';
    count.textContent = String(stories.length);
    summary.appendChild(count);

    details.appendChild(summary);

    const list = document.createElement('ul');
    list.className = 'pds-related-list';
    const seen = new Set();

    stories.forEach((item) => {
      const key = item.storyId || `${item.slug || ''}::${item.title}`;
      if (!key || seen.has(key)) return;
      seen.add(key);

      const listItem = document.createElement('li');
      listItem.className = 'pds-related-list-item';

      const link = document.createElement('a');
      link.textContent = item.title;

      if (typeof configureLink === 'function') {
        configureLink(link, item, { tag, variant });
      } else {
        defaultRelatedLinkConfigurator(link, item, variant === 'overlay' ? 'story' : 'docs');
      }

      const otherTags = item.overlap.filter((value) => value !== tag);
      const tags = document.createElement('span');
      tags.className = 'pds-related-tags';
      tags.textContent = otherTags.length ? otherTags.join('  ') : tag;

      listItem.appendChild(link);
      listItem.appendChild(tags);
      list.appendChild(listItem);
    });

    if (!list.children.length) return;

    details.appendChild(list);
    accordion.appendChild(details);
  });

  if (!accordion.children.length) return null;

  return accordion;
};

const createOverlayLinkConfigurator = (context) => (link, item) => {
  defaultRelatedLinkConfigurator(link, item, 'story');

  const currentId = context?.id || context?.storyId;
  if (item.storyId && currentId && item.storyId === currentId) {
    link.setAttribute('aria-current', 'page');
  }

  if (!item.storyId) return;

  link.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();

    const navigated = selectStoryById(item.storyId, 'story');
    if (!navigated) {
      const target = `?path=/story/${item.storyId}`;
      try {
        if (window.parent && window.parent !== window) {
          window.parent.location.search = target;
        } else {
          window.location.search = target;
        }
      } catch {
        window.location.search = target;
      }
    }
  });
};

const createDocsLinkConfigurator = (context) => (link, item) => {
  defaultRelatedLinkConfigurator(link, item, 'docs');

  const currentSlug = getStorySlug(context?.id || context?.storyId);
  if (item.slug && currentSlug && item.slug === currentSlug) {
    link.setAttribute('aria-current', 'page');
  }
};

const mergeTagSets = (...sets) => {
  const merged = new Set();
  sets.forEach((set) => {
    if (!set) return;

    if (Array.isArray(set)) {
      set.forEach((tag) => {
        const normalized = normalizeTag(tag);
        if (normalized) merged.add(normalized);
      });
      return;
    }

    if (set instanceof Set) {
      set.forEach((tag) => {
        const normalized = normalizeTag(tag);
        if (normalized) merged.add(normalized);
      });
    }
  });
  return merged;
};

const getContextTags = (context) => {
  const storyId = context.id || context.storyId;
  const initial = mergeTagSets(
    context.parameters?.tags,
    context.parameters?.pds?.tags,
    context.component?.parameters?.tags,
    context.component?.tags,
    context.tags,
    context.moduleExport?.default?.tags,
    context.moduleExport?.default?.parameters?.pds?.tags,
    context.moduleExport?.parameters?.pds?.tags,
    context.moduleExport?.pds?.tags,
    context.parameters?.pdsTags,
    context.moduleExport?.tags
  );

  if (initial.size > 0) {
    return expandSemanticTags(initial);
  }

  return expandSemanticTags(new Set());
};

const getStoryTags = (story) => {
  const collected = mergeTagSets(
    story.parameters?.tags,
    story.parameters?.pds?.tags,
    story.meta?.tags,
    story.tags,
    story.meta?.parameters?.pds?.tags,
    story.moduleExport?.default?.parameters?.pds?.tags,
    story.moduleExport?.parameters?.pds?.tags,
    story.moduleExport?.pds?.tags,
    story.parameters?.pdsTags,
    story.moduleExport?.default?.tags,
    story.moduleExport?.tags
  );

  if (collected.size > 0) {
    return expandSemanticTags(collected);
  }

  return expandSemanticTags(collected);
};

const getAllStoriesForRelated = () => {
  const stories = [];

  const clientApi = typeof window !== 'undefined' ? window.__STORYBOOK_CLIENT_API__ : null;
  if (clientApi?.raw) {
    stories.push(...clientApi.raw());
    return stories;
  }

  return stories;
};

const computeRelatedStories = (context) => {
  if (typeof window === 'undefined') return [];

  const currentTags = getContextTags(context);
  if (currentTags.size === 0) return [];

  const byTitle = new Map();

  getAllStoriesForRelated().forEach((story) => {
    const title = story?.title;
    if (!title) return;

    const tags = getStoryTags(story);
    if (tags.size === 0) return;

    const storyId = story.id;
    if (!storyId) return;
    const slug = storyId.split('--')[0];

    const existing = byTitle.get(title);
    if (existing) {
      tags.forEach((tag) => existing.tags.add(tag));
      if (!existing.slug) existing.slug = slug;
      if (!existing.storyId) existing.storyId = storyId;
      return;
    }

    byTitle.set(title, {
      title,
      tags,
      slug,
      storyId
    });
  });

  byTitle.delete(context.title);

  const related = [];

  byTitle.forEach((value) => {
    const overlap = Array.from(value.tags).filter((tag) => currentTags.has(tag));
    if (overlap.length === 0) return;

    related.push({
      title: value.title,
      slug: value.slug,
      storyId: value.storyId,
      overlap,
      score: overlap.length
    });
  });

  related.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.title.localeCompare(b.title);
  });

  return related.slice(0, 6);
};

const renderRelatedFooter = (context) => {
  if (typeof document === 'undefined') return;

  const docsRoot = document.getElementById('docs-root');
  if (!docsRoot) return;

  const content = docsRoot.querySelector('.sbdocs-content');
  if (!content) return;

  const existing = content.querySelector('.pds-related-footer');
  if (existing) existing.remove();

  const related = computeRelatedStories(context);
  if (!related.length) return;

  const currentTags = getContextTags(context);
  const accordion = buildRelatedAccordion(related, currentTags, {
    variant: 'docs',
    configureLink: createDocsLinkConfigurator(context)
  });

  if (!accordion) return;

  ensureRelatedStyles();

  const section = document.createElement('section');
  section.className = 'pds-related-footer sbdocs sbdocs-section';

  const heading = document.createElement('h2');
  heading.textContent = 'Related';
  section.appendChild(heading);

  section.appendChild(accordion);
  content.appendChild(section);
};

const removeRelatedOverlay = () => {
  if (typeof document === 'undefined') return;
  const existing = document.getElementById('pds-related-overlay');
  if (existing) existing.remove();
};

const renderRelatedOverlay = (context) => {
  if (typeof document === 'undefined') return;

  const related = computeRelatedStories(context);
  if (!related.length) {
    removeRelatedOverlay();
    return;
  }

  const currentTags = getContextTags(context);
  const accordion = buildRelatedAccordion(related, currentTags, {
    variant: 'overlay',
    configureLink: createOverlayLinkConfigurator(context)
  });

  if (!accordion) {
    removeRelatedOverlay();
    return;
  }

  ensureRelatedStyles();

  let overlay = document.getElementById('pds-related-overlay');
  const initialExpanded = overlay ? overlay.classList.contains('is-expanded') : false;

  if (!overlay) {
    overlay = document.createElement('aside');
    overlay.id = 'pds-related-overlay';
    document.body.appendChild(overlay);
  }

  overlay.className = 'pds-related-overlay';

  let toggle = overlay.querySelector('.pds-related-toggle');
  if (!toggle) {
    toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'pds-related-toggle';
    toggle.setAttribute('aria-label', 'Show related stories');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'pds-related-panel');
    toggle.textContent = 'Related';
    overlay.appendChild(toggle);
  }

  let panel = overlay.querySelector('.pds-related-panel');
  if (!panel) {
    panel = document.createElement('div');
    panel.className = 'pds-related-panel';
    panel.id = 'pds-related-panel';

    const header = document.createElement('div');
    header.className = 'pds-related-panel-header';

    const heading = document.createElement('h2');
    heading.textContent = 'Related';
    header.appendChild(heading);

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'pds-related-close icon-only';
    closeButton.setAttribute('aria-label', 'Close related stories');
    closeButton.setAttribute('title', 'Close related stories');

    const closeIcon = document.createElement('pds-icon');
    closeIcon.setAttribute('name', 'x');
    closeIcon.setAttribute('size', 'sm');
    closeButton.appendChild(closeIcon);

    header.appendChild(closeButton);

    const body = document.createElement('div');
    body.className = 'pds-related-panel-body';

    panel.appendChild(header);
    panel.appendChild(body);
    overlay.appendChild(panel);
  }

  const body = panel.querySelector('.pds-related-panel-body');
  if (!body) return;

  body.textContent = '';
  body.appendChild(accordion);

  const closeButton = panel.querySelector('.pds-related-close');

  const setExpanded = (expanded) => {
    overlay.classList.toggle('is-expanded', expanded);
    overlay.classList.toggle('is-collapsed', !expanded);
    toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    toggle.setAttribute('aria-label', expanded ? 'Hide related stories' : 'Show related stories');
    toggle.setAttribute('title', expanded ? 'Hide related stories' : 'Show related stories');
    panel.setAttribute('aria-hidden', expanded ? 'false' : 'true');
  };

  toggle.onclick = () => {
    const next = !overlay.classList.contains('is-expanded');
    setExpanded(next);
  };

  if (closeButton) {
    closeButton.onclick = (event) => {
      event.preventDefault();
      setExpanded(false);
    };
  }

  setExpanded(initialExpanded);
};

const pruneDocsStories = (() => {
  let observer;

  const run = (root) => {
    if (!root) return;

    const selectors = [
      '.docs-story',
      '.sbdocs-preview',
      '.sb-unstyled',
      '.docblock-canvas-wrapper',
      '.docblock-canvas',
      '.docblock-argstable-wrapper',
      '.docblock-argstable',
      '.docblock-source-wrapper',
      '.docblock-source',
      '.sbdocs-preview-wrapper',
      '.sb-story',
      '[id*="story--"]',
      '[class*="story-wrapper"]'
    ];

    root.querySelectorAll(selectors.join(',')).forEach((node) => {
      node.remove();
    });

    root.querySelectorAll('h2, h3').forEach((heading) => {
      if (!heading.textContent) return;
      const text = heading.textContent.trim().toLowerCase();
      if (text === 'stories' || text === 'story' || text === 'primary') {
        const section = heading.closest('section, div') || heading;
        section.remove();
      }
    });
  };

  return () => {
    const docsRoot = document.getElementById('docs-root');
    if (!docsRoot) return;

    run(docsRoot);

    if (!observer) {
      observer = new MutationObserver(() => {
        run(docsRoot);
      });
      observer.observe(docsRoot, { childList: true, subtree: true });
    }
  };
})();

const withRelatedStories = (story, context) => {
  const result = story();
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (context.viewMode === 'docs') {
        pruneDocsStories();
        renderRelatedFooter(context);
        removeRelatedOverlay();
        return;
      }

      if (context.viewMode === 'story') {
        renderRelatedOverlay(context);
        return;
      }

      removeRelatedOverlay();
    });
  });

  return result;
};

const DocsPage = () => React.createElement(
  React.Fragment,
  null,
  React.createElement(Title, null),
  React.createElement(Subtitle, null),
  React.createElement(DocsDescription, null),
  React.createElement(Controls, null)
);

/** @type { import('@storybook/web-components').Preview } */
const preview = {
  decorators: [withGlobalsHandler, withPDS, withHTMLExtractor, withDescription, withRelatedStories],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },

    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
        { name: 'surface', value: 'var(--surface-bg)' }
      ]
    },
    docs: {
      page: DocsPage
    },
    options: {
      storySort: {
        order: [
          'PDS',
          [
            'General',
            ['What is PDS', 'Getting Started'],
            'Foundations',
            ['Colors', 'Typography', 'HTML Defaults', 'Icons', 'Spacing', 'Smart Surfaces'],
            'Primitives',
            ['Buttons', 'Forms', 'Form Groups', 'Alerts', 'Badges', 'Cards', 'Tables', 'Media', 'Accordion'],
            'Layout',
            ['Overview', 'System'],
            'Utilities',
            ['Grid System'],
            'Patterns',
            ['Border Effects', 'Utilities'],
            'Enhancements',
            ['Mesh Gradients', 'Interactive States', 'Toggles', 'Dropdowns', 'Range Sliders', 'Required Fields'],
            'Components',
            ['Pds Jsonform', 'Pds Icon', 'Pds Drawer', 'Pds Toaster', 'Pds Tabstrip', 'Pds Splitpanel', 'Pds Scrollrow', 'Pds Richtext', 'Pds Upload'],
            'Reference'
          ],
          'General',
          ['What is PDS', 'Getting Started'],
          'Foundations',
          ['Colors', 'Typography', 'HTML Defaults', 'Icons', 'Spacing', 'Smart Surfaces'],
          'Primitives',
          ['Buttons', 'Forms', 'Form Groups', 'Alerts', 'Badges', 'Cards', 'Tables', 'Media', 'Accordion'],
          'Layout',
          ['Overview', 'System'],
          'Utilities',
          ['Grid System'],
          'Patterns',
          ['Border Effects', 'Utilities'],
          'Enhancements',
          ['Mesh Gradients', 'Interactive States', 'Toggles', 'Dropdowns', 'Range Sliders', 'Required Fields'],
          'Components',
          ['Pds Jsonform', 'Pds Icon', 'Pds Drawer', 'Pds Toaster', 'Pds Tabstrip', 'Pds Splitpanel', 'Pds Scrollrow', 'Pds Richtext', 'Pds Upload'],
          'Reference',
          '*'
        ]
      }
    }
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'PDS theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
          { value: 'system', title: 'System', icon: 'browser' }
        ],
        dynamicTitle: true
      }
    },
    preset: {
      name: 'Preset',
      description: 'Design preset',
      defaultValue: initialPreset, // Use the preset loaded from storage
      toolbar: {
        icon: 'paintbrush',
        items: Object.keys(presets)
          .sort((a, b) => {
            const aPreset = presets[a];
            const bPreset = presets[b];
            const aTags = aPreset.tags || [];
            const bTags = bPreset.tags || [];
            
            // Check if featured
            const aFeatured = aTags.includes('featured');
            const bFeatured = bTags.includes('featured');
            
            if (aFeatured && !bFeatured) return -1;
            if (!aFeatured && bFeatured) return 1;
            
            // Check if has any tags
            const aHasTags = aTags.length > 0;
            const bHasTags = bTags.length > 0;
            
            if (aHasTags && !bHasTags) return -1;
            if (!aHasTags && bHasTags) return 1;
            
            // Alphabetical by name
            return (aPreset.name || a).localeCompare(bPreset.name || b);
          })
          .map(key => ({
            value: key,
            title: presets[key].name || key
          })),
        dynamicTitle: true
      }
    }
  }
};

// Listen to theme and preset changes from toolbar
if (typeof window !== 'undefined') {
  console.log('👂 Setting up message listener for toolbar changes...');
  
  window.addEventListener('message', async (event) => {
    if(event.data?.type == null) return;

    console.log('📨 Message received:', event.data?.type, event.data);
    
    if (event.data?.type === 'SET_GLOBALS') {
      console.log('✅ SET_GLOBALS detected, globals:', event.data.globals);
      const { globals } = event.data;
      
      if (globals?.theme) {
        console.log('🌙 Theme change requested:', globals.theme);
        
        // Set data-theme attribute on body for PDS theme system
        document.body.setAttribute('data-theme', globals.theme);
        
        // Also use PDS.theme property
        PDS.theme = globals.theme;
        
        console.log('✅ Theme applied:', globals.theme);
      }
      
      if (globals?.preset) {
        console.log('🔔 SET_GLOBALS message received with preset:', globals.preset);
        console.log('📦 Current stored preset:', PDS.currentPreset);
        
        // Skip if already on this preset
        if (globals.preset === PDS.currentPreset) {
          console.log('⏭️ Preset unchanged, skipping');
          return;
        }
        
        try {
          console.log('📦 Preset change requested:', globals.preset);
          
          // Store preset selection for persistence
          try {
            sessionStorage.setItem('storybook-pds-preset', globals.preset);
            localStorage.setItem('storybook-pds-preset', globals.preset);
            console.log('💾 Preset stored in storage');
          } catch (e) {
            console.warn('⚠️ Failed to store preset:', e);
          }
          
          // Load preset from PDS presets and create new designer
          console.log('📥 Importing pds-config...');
          const configModule = await import('../../../src/js/pds-core/pds-config.js');
          console.log('✅ Config module loaded:', configModule);
          
          const { presets } = configModule;
          const presetId = globals.preset;
          const presetConfig = presets[presetId];
          
          console.log('📋 Available presets:', Object.keys(presets));
          console.log('🔍 Looking for preset:', presetId);
          console.log('✅ Found preset config:', presetConfig ? 'yes' : 'no');
          
          if (presetConfig) {
            console.log(`🎨 Applying preset: ${presetConfig.name || presetId}`);
            console.log('📝 Preset config:', presetConfig);
            
            // Create new designer with preset config (same as pds-config-form does)
            const generatorOptions = { 
              design: structuredClone(presetConfig),
              log: (...args) => console.log('🟦 [Generator]', ...args)
            };
            const storedTheme = PDS.theme || null;
            if (storedTheme) {
              generatorOptions.theme = storedTheme;
              console.log('🌙 Applying stored theme:', storedTheme);
            }
            
            console.log('🏗️ Creating new Generator...');
            const newDesigner = new PDS.Generator(generatorOptions);
            console.log('✅ Generator created');
            
            console.log('🎨 Applying styles to document...');
            await PDS.Generator.applyStyles();
            console.log('✅ Styles applied to document');
            
            // Update global reference
            PDS.currentPreset = presetId;
            
            console.log(`✅✅✅ Preset applied successfully: ${presetConfig.name || presetId}`);
          } else {
            console.error(`❌ Preset not found: ${presetId}`);
            console.error('❌ Available presets:', Object.keys(presets));
          }
        } catch (err) {
          console.error('❌❌❌ Failed to apply preset:', err);
          console.error('❌ Stack trace:', err.stack);
        }
      }
    }
  });
}

export default preview;
