import { addons } from '@storybook/preview-api';
import { SELECT_STORY } from '@storybook/core-events';
import { PDS } from '../../../src/js/pds.js';
import { presets } from '../../../src/js/pds-core/pds-config.js';
import './addons/pds-configurator/preview.js';
import { withHTMLExtractor } from './addons/html-preview/preview.js';
import { withDescription } from './addons/description/preview.js';
import './htmlPreview.css';
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
  await PDS.start({
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
  });

  console.log('✨ PDS initialized in live mode for Storybook');
  console.log('📦 AutoDefiner active at:', PDS.autoDefiner?.config?.baseURL);

  // Store PDS designer globally for reuse
  window.__pdsDesigner = PDS.registry._designer;
  window.__pdsCurrentPreset = initialPreset;
})();

// Set up persistent style protection - monitor and restore PDS sheets if cleared
let protectionActive = false;
function ensurePDSStyles() {
  const sheets = document.adoptedStyleSheets || [];
  const hasPDS = sheets.some(s => s._pds === true);
  
  if (!hasPDS && window.__pdsDesigner) {
    console.log('🛡️ PDS sheets missing - restoring...');
    PDS.Generator.applyStyles(window.__pdsDesigner);
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
  const designer = window.__pdsDesigner || PDS.registry._designer;
  if (designer) {
    PDS.Generator.applyStyles(designer);
    
    // Check again after applying
    const afterSheets = document.adoptedStyleSheets || [];
    const afterPdsSheets = afterSheets.filter(s => s._pds === true);
  } else {
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
  if (globals?.preset && globals.preset !== window.__pdsCurrentPreset) {
    console.log('🔄 Decorator detected preset change:', window.__pdsCurrentPreset, '→', globals.preset);
    
    // Apply preset asynchronously
    (async () => {
      try {
        window.__pdsCurrentPreset = globals.preset;
        
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
          await PDS.Generator.applyStyles(newDesigner);
          
          PDS.registry._designer = newDesigner;
          window.__pdsDesigner = newDesigner;
          
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
  ['padding', 'spacing'],
  ['gap', 'spacing'],
  ['grid', 'layout'],
  ['flex', 'layout'],
  ['pds-ask', 'interaction'],
  ['dialogs', 'interaction'],
  ['validation', 'interaction'],
  ['confirmation', 'interaction']
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
  ['interaction', ['dialogs', 'buttons', 'forms']],
  ['dialogs', ['interaction', 'pds-ask', 'confirmation', 'forms']],
  ['pds-ask', ['dialogs', 'interaction', 'forms']],
  ['buttons', ['interaction', 'controls']],
  ['forms', ['interaction', 'validation']],
  ['spacing', ['layout', 'gap', 'padding', 'cards', 'grid']],
  ['layout', ['spacing', 'grid', 'flex', 'cards']],
  ['grid', ['layout', 'spacing']],
  ['gap', ['spacing']],
  ['cards', ['layout', 'spacing', 'surface']],
  ['surface', ['cards', 'spacing']],
  ['utilities', ['spacing', 'layout']],
  ['focus', ['interaction']],
  ['hover', ['interaction']],
  ['confirmation', ['dialogs', 'interaction']]
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

const getStoryStore = () => {
  if (typeof window === 'undefined') return null;
  return window.__STORYBOOK_STORY_STORE__ || null;
};

const collectStoryIndexTags = (storyId) => {
  if (!storyId) return undefined;
  const storyStore = getStoryStore();
  const index = storyStore?.storyIndex;
  if (!index) return undefined;

  const entries = index.entries || index;
  const entry = entries?.[storyId];
  return entry?.tags;
};

const collectStoryStoreEntryTags = (storyId) => {
  const storyStore = getStoryStore();
  if (!storyStore?.fromId || !storyId) return undefined;

  try {
    const entry = storyStore.fromId(storyId);
    if (!entry) return undefined;

    return mergeTagSets(
      entry.meta?.tags,
      entry.parameters?.tags,
      entry.moduleExport?.default?.tags,
      entry.moduleExport?.tags
    );
  } catch {
    return undefined;
  }
};

const ensureRelatedStyles = (() => {
  let injected = false;
  return () => {
    if (injected || typeof document === 'undefined') return;

    const style = document.createElement('style');
    style.id = 'pds-related-footer-styles';
    style.textContent = `
      .pds-related-footer {
        margin-top: 2.5rem;
        padding-top: 1.5rem;
        border-top: 1px solid var(--sb-border-color, rgba(0, 0, 0, 0.08));
      }

      .pds-related-footer h2 {
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--sbdocs-color-secondary, #5c5f62);
        margin: 0 0 0.75rem;
      }

      #pds-related-overlay {
        position: fixed;
        inset-block-end: 24px;
        inset-inline-end: 24px;
        z-index: 2147483647;
        max-width: min(360px, 90vw);
        box-shadow: 0 12px 32px rgba(15, 33, 62, 0.18);
        border-radius: 16px;
        background: color-mix(in srgb, var(--color-surface-raised, #ffffff) 92%, transparent);
        border: 1px solid color-mix(in srgb, var(--color-border-subtle, rgba(15, 33, 62, 0.1)) 80%, transparent);
        padding: 20px;
        display: grid;
        gap: 12px;
        font-family: var(--font-family-base, system-ui);
        backdrop-filter: blur(18px);
      }

      #pds-related-overlay h2 {
        margin: 0;
        font-size: 0.78rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: var(--surface-text-secondary, rgba(26, 32, 44, 0.62));
      }

      .pds-related-accordion {
        display: grid;
        gap: 0.75rem;
      }

      .pds-related-accordion details {
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid var(--pds-related-border, rgba(0, 0, 0, 0.08));
        background: var(--pds-related-bg, transparent);
      }

      #pds-related-overlay .pds-related-accordion details {
        --pds-related-border: color-mix(in srgb, var(--color-border-subtle, rgba(15, 33, 62, 0.12)) 80%, transparent);
        --pds-related-bg: color-mix(in srgb, var(--color-surface-raised, #ffffff) 92%, transparent);
      }

      .pds-related-footer .pds-related-accordion details {
        --pds-related-border: var(--sb-border-color, rgba(0, 0, 0, 0.08));
        --pds-related-bg: color-mix(in srgb, var(--sbdocs-color-background, #ffffff) 96%, transparent);
      }

      .pds-related-accordion summary {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.5rem 0.75rem;
        font-weight: 600;
        font-size: 0.78rem;
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
        padding: 3px;
        transform: rotate(-45deg);
        margin-inline-start: auto;
        transition: transform 0.2s ease;
      }

      .pds-related-accordion details[open] summary::after {
        transform: rotate(135deg);
      }

      .pds-related-tag-label {
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 0.72rem;
        color: inherit;
      }

      .pds-related-count {
        background: color-mix(in srgb, var(--color-primary, #3f6df6) 18%, transparent);
        color: var(--color-primary, #3f6df6);
        border-radius: 999px;
        font-size: 0.68rem;
        font-weight: 600;
        line-height: 1;
        padding: 0.15rem 0.4rem;
      }

      .pds-related-list {
        list-style: none;
        display: grid;
        gap: 0.4rem;
        padding: 0 0.75rem 0.55rem;
        margin: 0;
      }

      .pds-related-list-item {
        padding-block: unset!important;
        display: flex;
        flex-direction: row;
        gap: var(--spacing-2, 0.35rem);
        align-items: baseline;
        justify-content: space-between;
      }

      .pds-related-list a {
        font-weight: 600;
        color: var(--color-primary, #3f6df6);
        text-decoration: none;
      }

      .pds-related-list a:hover {
        text-decoration: underline;
      }

      .pds-related-list a[aria-current="page"] {
        color: var(--surface-text-secondary, rgba(26, 32, 44, 0.55));
        cursor: default;
        text-decoration: none;
      }

      .pds-related-tags {
        font-size: 0.78rem;
        color: var(--surface-text-secondary, rgba(26, 32, 44, 0.55));
      }

      .pds-related-footer .pds-related-tags {
        color: var(--sbdocs-color, rgba(60, 60, 60, 0.7));
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
    context.moduleExport?.tags,
    collectStoryIndexTags(storyId),
    collectStoryStoreEntryTags(storyId)
  );

  if (initial.size > 0) {
    return expandSemanticTags(initial);
  }

  const fallback = new Set();
  const clientApi = typeof window !== 'undefined' ? window.__STORYBOOK_CLIENT_API__ : null;
  if (!clientApi?.raw) return fallback;

  clientApi
    .raw()
    .filter((story) => story?.title === context.title)
    .forEach((story) => {
      getStoryTags(story).forEach((tag) => fallback.add(tag));
    });

  return expandSemanticTags(fallback);
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
    story.moduleExport?.tags,
    collectStoryIndexTags(story.id),
    collectStoryStoreEntryTags(story.id)
  );

  if (collected.size > 0) {
    return expandSemanticTags(collected);
  }

  const storyStore = getStoryStore();
  const storyIndex = storyStore?.storyIndex;
  if (storyIndex?.entries) {
    const entry = storyIndex.entries[story.id];
    if (entry?.tags) {
      return expandSemanticTags(mergeTagSets(entry.tags));
    }
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

  const storyStore = getStoryStore();
  const indexEntries = storyStore?.storyIndex?.entries;
  if (!indexEntries) return stories;

  Object.entries(indexEntries).forEach(([storyId, entry]) => {
    if (!entry || entry.type !== 'story') return;

    let storeEntry;
    if (storyStore?.fromId) {
      try {
        storeEntry = storyStore.fromId(storyId);
      } catch {}
    }

    const parameters = storeEntry?.parameters || storeEntry?.story?.parameters || entry.parameters || {};
    const meta = storeEntry?.meta || { title: entry.title };
    const moduleExport = storeEntry?.moduleExport;
    const tags = mergeTagSets(entry.tags, storeEntry?.tags);

    stories.push({
      id: storyId,
      title: storeEntry?.story?.title || entry.title,
      name: entry.name,
      importPath: entry.importPath,
      parameters,
      meta,
      moduleExport,
      tags
    });
  });

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
  if (!overlay) {
    overlay = document.createElement('aside');
    overlay.id = 'pds-related-overlay';
    document.body.appendChild(overlay);
  }

  overlay.textContent = '';

  const heading = document.createElement('h2');
  heading.textContent = 'Related';
  overlay.appendChild(heading);
  overlay.appendChild(accordion);
};

const withRelatedStories = (story, context) => {
  const result = story();
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (context.viewMode === 'docs') {
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
    options: {
      storySort: {
        order: [
          'General',
          ['What is PDS', 'Getting Started'],
          'Foundations',
          ['Colors', 'Typography', 'Icons', 'Spacing', 'Smart Surfaces'],
          'Primitives',
          ['Buttons', 'Forms', 'Form Groups', 'Alerts', 'Badges', 'Cards', 'Tables', 'Media', 'Accordion'],
          'Utilities',
          ['Grid System'],
          'Patterns',
          ['Layout', 'Border Effects', 'Utilities'],
          'Enhancements',
          ['Mesh Gradients', 'Interactive States', 'Toggles', 'Dropdowns', 'Range Sliders', 'Required Fields'],
          'Components',
          ['Pds Jsonform', 'Pds Icon', 'Pds Drawer', 'Pds Toaster', 'Pds Tabstrip', 'Pds Splitpanel', 'Pds Scrollrow', 'Pds Richtext', 'Pds Upload'],
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
        console.log('📦 Current stored preset:', window.__pdsCurrentPreset);
        
        // Skip if already on this preset
        if (globals.preset === window.__pdsCurrentPreset) {
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
            await PDS.Generator.applyStyles(newDesigner);
            console.log('✅ Styles applied to document');
            
            // Update BOTH registry designer AND global reference
            PDS.registry._designer = newDesigner;
            window.__pdsDesigner = newDesigner;
            window.__pdsCurrentPreset = presetId;
            
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
