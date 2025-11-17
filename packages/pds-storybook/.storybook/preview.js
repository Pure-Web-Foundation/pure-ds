import { PDS } from '../../../src/js/pds.js';
import './addons/pds-configurator/preview.js';

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

await PDS.start({
  mode: 'live',
  preset: initialPreset,
  autoDefine: {
    baseURL: '/pds/components/',
    predefine: ['pds-icon', 'pds-drawer', 'pds-toaster', 'pds-jsonform', 'pds-scrollrow', 'pds-tabstrip', 'pds-splitpanel', 'pds-richtext', 'pds-upload'],
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
  // Use MutationObserver to continuously adopt primitives when components update
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
        shadowRoots.push(node.shadowRoot);
      }
    }
    
    // Adopt primitives into each shadow root
    for (const shadowRoot of shadowRoots) {
      try {
        await PDS.adoptPrimitives(shadowRoot);
      } catch (err) {
        console.warn('Failed to adopt PDS styles:', err);
      }
    }
    
    // Run enhancers on newly rendered content
    if (PDS.enhancer && typeof PDS.enhancer.enhance === 'function') {
      PDS.enhancer.enhance(container);
    }
  };
  
  // Initial adoption
  setTimeout(adoptAllShadowStyles, 0);
  
  // Re-adopt on any DOM changes (for re-renders) with debouncing
  let adoptTimeout;
  setTimeout(() => {
    const container = document.querySelector('#storybook-root');
    if (container && !container._pdsObserver) {
      const debouncedAdopt = () => {
        clearTimeout(adoptTimeout);
        adoptTimeout = setTimeout(adoptAllShadowStyles, 50);
      };
      
      const observer = new MutationObserver(debouncedAdopt);
      observer.observe(container, { 
        childList: true, 
        subtree: true,
        attributes: true,
        characterData: true // Also watch text changes
      });
      container._pdsObserver = observer;
      
      // Also re-adopt periodically as fallback (every 2 seconds)
      setInterval(() => {
        if (document.contains(container)) {
          adoptAllShadowStyles();
        }
      }, 2000);
    }
  }, 100);
  
  return storyResult;
};

/** @type { import('@storybook/web-components').Preview } */
const preview = {
  decorators: [withPDS],
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
        items: [
          { value: 'default', title: 'Default' },
          { value: 'ocean-breeze', title: 'Ocean Breeze' },
          { value: 'midnight-steel', title: 'Midnight Steel' },
          { value: 'neural-glow', title: 'Neural Glow' },
          { value: 'paper-and-ink', title: 'Paper & Ink' },
          { value: 'sunset-paradise', title: 'Sunset Paradise' },
          { value: 'retro-wave', title: 'Retro Wave' },
          { value: 'forest-canopy', title: 'Forest Canopy' },
          { value: 'ruby-elegance', title: 'Ruby Elegance' },
          { value: 'desert-dawn', title: 'Desert Dawn' },
          { value: 'contrast-pro', title: 'Contrast Pro' },
          { value: 'pastel-play', title: 'Pastel Play' },
          { value: 'brutalist-tech', title: 'Brutalist Tech' },
          { value: 'zen-garden', title: 'Zen Garden' }
        ],
        dynamicTitle: true
      }
    }
  }
};

// Listen to theme and preset changes from toolbar
if (typeof window !== 'undefined') {
  window.addEventListener('message', async (event) => {
    if (event.data?.type === 'SET_GLOBALS') {
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
        try {
          console.log('📦 Preset change requested:', globals.preset);
          
          // Store preset selection for persistence
          try {
            sessionStorage.setItem('storybook-pds-preset', globals.preset);
            localStorage.setItem('storybook-pds-preset', globals.preset);
          } catch (e) {
            console.warn('Failed to store preset:', e);
          }
          
          // Load preset from PDS presets and create new designer
          const { presets } = await import('../../../src/js/pds-core/pds-config.js');
          const presetId = globals.preset;
          const presetConfig = presets[presetId];
          
          console.log('📋 Available presets:', Object.keys(presets));
          console.log('🔍 Looking for preset:', presetId);
          console.log('✅ Found preset config:', presetConfig ? 'yes' : 'no');
          
          if (presetConfig) {
            console.log(`🎨 Applying preset: ${presetConfig.name || presetId}`);
            
            // Create new designer with preset config (same as pds-config-form does)
            const generatorOptions = { 
              design: structuredClone(presetConfig),
              log: console.log
            };
            const storedTheme = PDS.theme || null;
            if (storedTheme) generatorOptions.theme = storedTheme;
            
            console.log('🏗️ Creating new Generator with options:', generatorOptions);
            const newDesigner = new PDS.Generator(generatorOptions);
            
            console.log('🎨 Applying styles to document...');
            await PDS.Generator.applyStyles(newDesigner);
            
            // Update BOTH registry designer AND global reference
            PDS.registry._designer = newDesigner;
            window.__pdsDesigner = newDesigner;
            window.__pdsCurrentPreset = presetId;
            
            console.log(`✅ Preset applied successfully: ${presetConfig.name || presetId}`);
          } else {
            console.warn(`⚠️ Preset not found: ${presetId}`);
          }
        } catch (err) {
          console.error('❌ Failed to apply preset:', err, err.stack);
        }
      }
    }
  });
}

export default preview;
