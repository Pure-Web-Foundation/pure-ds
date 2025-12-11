# Automatic Font Loading

## Overview

PDS now automatically loads fonts from Google Fonts when they're not available in the browser. This feature works seamlessly in "live" mode as you configure your design system.

## How It Works

When you change typography settings in the PDS configurator, the system:

1. **Checks Font Availability** - Determines if the specified font is already available in the browser
2. **Auto-loads from Google Fonts** - If not available, automatically loads it from Google Fonts
3. **Applies Changes** - Once loaded, applies the font to your design system
4. **Falls Back Gracefully** - If loading fails, falls back to system fonts

## Features

### Smart Detection

The font loader intelligently:
- Detects system fonts (system-ui, -apple-system, sans-serif, etc.) and skips loading
- Uses canvas-based detection to check font availability
- Avoids duplicate loading if a font is already loaded or loading

### Automatic Loading

When you select fonts in the configurator:
- **Headings Font** - Automatically loaded if needed
- **Body Font** - Automatically loaded if needed  
- **Monospace Font** - Automatically loaded if needed

### Font Weights

The loader automatically includes common font weights:
- 400 (Normal)
- 500 (Medium)
- 600 (Semibold)
- 700 (Bold)

### Performance Optimized

- Fonts load in parallel for faster performance
- Uses `font-display: swap` for better UX
- 5-second timeout prevents hanging
- Minimal impact on page load

## Supported Fonts

All Google Fonts are supported. The presets include:

### Modern Presets
- **Inter** - Clean, modern sans-serif
- **Space Grotesk** - Contemporary geometric sans
- **Quicksand** - Friendly rounded sans
- **Orbitron** - Futuristic tech font

### Classic Presets
- **Merriweather** - Traditional serif
- **Playfair Display** - Elegant display serif
- **Crimson Text** - Classic book font
- **Source Serif Pro** - Modern readable serif

## Usage

### In the Configurator

Simply change the font family in the typography settings:

```javascript
{
  typography: {
    fontFamilyHeadings: "Inter, sans-serif",
    fontFamilyBody: "Inter, sans-serif",
    fontFamilyMono: "Fira Code, monospace"
  }
}
```

The fonts will be automatically loaded from Google Fonts if not already available.

### Programmatic Usage

You can also use the font loader directly in your code:

```javascript
import { loadGoogleFont, loadTypographyFonts } from './common/font-loader.js';

// Load a single font
await loadGoogleFont('Roboto', { 
  weights: [400, 500, 700],
  italic: true 
});

// Load all fonts from a typography config
await loadTypographyFonts({
  fontFamilyHeadings: 'Poppins',
  fontFamilyBody: 'Open Sans',
  fontFamilyMono: 'Fira Code'
});
```

## Console Logging

The font loader provides helpful console messages:

- ✅ `Font "Inter" is already available` - Font already in browser
- 🔄 `Loading font "Inter" from Google Fonts...` - Loading started
- ✅ `Successfully loaded font "Inter"` - Loading complete
- ⚠️ `Failed to load font "Inter" from Google Fonts` - Loading failed (fallback used)

## Technical Details

### Font Detection

The loader uses canvas-based detection to check if a font is available:

1. Renders text with a baseline font (monospace)
2. Renders same text with test font + fallback
3. Compares measurements
4. Different measurements = font is available

### Google Fonts URL

Fonts are loaded using the Google Fonts API v2:

```
https://fonts.googleapis.com/css2?family=FONT_NAME:wght@400;500;600;700&display=swap
```

### Fallback Strategy

If a Google Font fails to load:
1. Console warning is shown
2. Application continues without interruption
3. System fonts in the font-family stack are used
4. No visual breaking changes occur

## Browser Support

Works in all modern browsers that support:
- Canvas API (for detection)
- Dynamic `<link>` element injection
- Google Fonts (all modern browsers)

## Limitations

- Only loads fonts from Google Fonts (not Adobe Fonts, Font Squirrel, etc.)
- Requires internet connection to load fonts
- Some custom/proprietary fonts may not be available on Google Fonts

## Future Enhancements

Potential improvements for future versions:
- Support for other font providers (Adobe Fonts, Font Squirrel)
- Font subsetting for smaller file sizes
- Offline font caching
- Font preview in configurator
- Variable font support
