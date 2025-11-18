import { PDS } from '../../../src/js/pds.js';
import { presets } from '../../../src/js/pds-core/pds-config.js';
import './addons/pds-configurator/preview.js';
import { withHTMLExtractor } from './addons/html-preview/preview.js';
import { withDescription } from './addons/description/preview.js';
import './htmlPreview.css';

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
    console.log('🎨 Reapplying PDS styles...');
    PDS.Generator.applyStyles(designer);
    
    // Check again after applying
    const afterSheets = document.adoptedStyleSheets || [];
    const afterPdsSheets = afterSheets.filter(s => s._pds === true);
    console.log('✅ After reapply - Total sheets:', afterSheets.length, 'PDS sheets:', afterPdsSheets.length);
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
    
    if (shadowRoots.length > 0) {
      console.log(`🎭 Adopting PDS layers for ${shadowRoots.length} shadow components`);
    }
    
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
          console.log(`⏭️  <${host.toLowerCase()}> already has ${currentSheets.length} sheets - skipping`);
          continue;
        }
        
        // Only adopt if the component doesn't have PDS styles yet
        // Get existing adopted sheets that aren't PDS sheets (preserve component styles)
        const existingSheets = currentSheets.filter(sheet => !sheet._pds);
        
        console.log(`🎨 Adopting layers for <${host.toLowerCase()}> (had ${currentSheets.length} sheets, ${existingSheets.length} non-PDS)...`);
        
        // Adopt full layer stack: primitives, components, utilities
        await PDS.adoptLayers(root, ['primitives', 'components', 'utilities'], existingSheets);
        
        console.log(`✅ Adopted layers for <${host.toLowerCase()}> (now ${root.adoptedStyleSheets.length} sheets)`);
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

/** @type { import('@storybook/web-components').Preview } */
const preview = {
  decorators: [withGlobalsHandler, withPDS, withHTMLExtractor, withDescription],
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
