/**
 * Font Loading Utility
 * Automatically loads fonts from Google Fonts when they're not available in the browser
 */

/**
 * Checks if a font is available in the browser
 * @param {string} fontName - The name of the font to check
 * @returns {boolean} True if the font is available
 */
function isFontAvailable(fontName) {
  // Clean up font name (remove quotes and extra spacing)
  const cleanName = fontName.replace(/['"]/g, '').trim();
  
  // System fonts that are always available
  const systemFonts = [
    'system-ui',
    '-apple-system',
    'sans-serif',
    'serif',
    'monospace',
    'cursive',
    'fantasy',
    'ui-sans-serif',
    'ui-serif',
    'ui-monospace',
    'ui-rounded'
  ];
  
  if (systemFonts.includes(cleanName.toLowerCase())) {
    return true;
  }
  
  // Use canvas-based detection
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  
  if (!context) return false;
  
  const testString = 'mmmmmmmmmmlli'; // Characters with varying widths
  const testSize = '72px';
  const baselineFont = 'monospace';
  
  // Measure with baseline font
  context.font = `${testSize} ${baselineFont}`;
  const baselineWidth = context.measureText(testString).width;
  
  // Measure with test font
  context.font = `${testSize} "${cleanName}", ${baselineFont}`;
  const testWidth = context.measureText(testString).width;
  
  return baselineWidth !== testWidth;
}

/**
 * Extracts the primary font name from a font-family string
 * @param {string} fontFamily - Font family string (e.g., "Roboto, sans-serif")
 * @returns {string} The primary font name
 */
function extractPrimaryFont(fontFamily) {
  if (!fontFamily) return null;
  
  // Split by comma and get first font
  const fonts = fontFamily.split(',').map(f => f.trim());
  const primaryFont = fonts[0];
  
  // Remove quotes
  return primaryFont.replace(/['"]/g, '').trim();
}

/**
 * Loads a Google Font dynamically
 * @param {string} fontFamily - The font family to load (can be comma-separated list)
 * @param {Object} options - Loading options
 * @param {number[]} options.weights - Font weights to load (default: [400, 500, 600, 700])
 * @param {boolean} options.italic - Whether to include italic variants (default: false)
 * @returns {Promise<void>}
 */
export async function loadGoogleFont(fontFamily, options = {}) {
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
  
  // Check if font is already available
  if (isFontAvailable(primaryFont)) {
    console.log(`Font "${primaryFont}" is already available`);
    return Promise.resolve();
  }
  
  // Check if font link already exists
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
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    
    // Build Google Fonts URL with specified weights
    const weightsParam = italic 
      ? `ital,wght@0,${weights.join(';0,')};1,${weights.join(';1,')}`
      : `wght@${weights.join(';')}`;
    
    link.href = `https://fonts.googleapis.com/css2?family=${encodedFont}:${weightsParam}&display=swap`;
    
    // Add a data attribute for easy identification
    link.setAttribute('data-font-loader', primaryFont);
    
    link.onload = () => {
      console.log(`Successfully loaded font "${primaryFont}"`);
      resolve();
    };
    
    link.onerror = () => {
      console.warn(`Failed to load font "${primaryFont}" from Google Fonts`);
      reject(new Error(`Failed to load font: ${primaryFont}`));
    };
    
    document.head.appendChild(link);
    
    // Set a timeout to prevent hanging indefinitely
    setTimeout(() => {
      if (!isFontAvailable(primaryFont)) {
        console.warn(`Font "${primaryFont}" did not load within timeout`);
      }
      resolve(); // Resolve anyway to not block the application
    }, 5000);
  });
}

/**
 * Loads fonts for all font families in a typography config
 * @param {Object} typographyConfig - Typography configuration object
 * @returns {Promise<void>}
 */
export async function loadTypographyFonts(typographyConfig) {
  if (!typographyConfig) {
    return Promise.resolve();
  }
  
  const fontFamilies = new Set();
  
  // Collect all font families from the config
  if (typographyConfig.fontFamilyHeadings) {
    fontFamilies.add(typographyConfig.fontFamilyHeadings);
  }
  if (typographyConfig.fontFamilyBody) {
    fontFamilies.add(typographyConfig.fontFamilyBody);
  }
  if (typographyConfig.fontFamilyMono) {
    fontFamilies.add(typographyConfig.fontFamilyMono);
  }
  
  // Load all fonts in parallel
  const loadPromises = Array.from(fontFamilies).map(fontFamily => 
    loadGoogleFont(fontFamily).catch(err => {
      console.warn(`Could not load font: ${fontFamily}`, err);
      // Don't fail the whole operation if one font fails
    })
  );
  
  await Promise.all(loadPromises);
}

/**
 * Removes previously loaded Google Fonts
 * @param {string} fontName - Optional font name to remove. If not specified, removes all.
 */
export function unloadGoogleFont(fontName = null) {
  const selector = fontName 
    ? `link[data-font-loader="${fontName}"]`
    : 'link[data-font-loader]';
  
  const links = document.querySelectorAll(selector);
  links.forEach(link => link.remove());
  
  if (fontName) {
    console.log(`Unloaded font "${fontName}"`);
  } else {
    console.log(`Unloaded ${links.length} font(s)`);
  }
}
