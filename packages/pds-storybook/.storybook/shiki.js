/**
 * Shared Shiki syntax highlighter for PDS Storybook
 * Provides consistent code highlighting across all stories and previews
 * 
 * Re-exports from stories/utils/shiki.js to maintain a single source of truth
 */

export { 
  loadShiki, 
  highlight, 
  getCurrentTheme, 
  escapeHtml, 
  preloadShiki 
} from '../stories/utils/shiki.js';
