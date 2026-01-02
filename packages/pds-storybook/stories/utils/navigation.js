/**
 * Storybook navigation utilities for PDS stories
 * 
 * Use these helpers instead of plain anchor links to ensure
 * navigation works correctly within Storybook's iframe context.
 */

let navigateToStoryFn = null;

/**
 * Lazy-load the navigation function to avoid build-time import issues
 */
async function getNavigateToStory() {
  if (navigateToStoryFn) return navigateToStoryFn;
  
  try {
    const { addons } = await import('@storybook/preview-api');
    const { SELECT_STORY } = await import('@storybook/core-events');
    
    navigateToStoryFn = (storyId, viewMode = 'story') => {
      if (!storyId || typeof window === 'undefined') return false;
      
      let navigated = false;
      try {
        const channel = addons?.getChannel?.();
        if (channel?.emit) {
          channel.emit(SELECT_STORY, { storyId, viewMode });
          navigated = true;
        }
      } catch (err) {
        console.warn('PDS navigation: channel navigation failed', err);
      }
      
      // Fallback: postMessage to parent
      try {
        window.parent?.postMessage(
          { source: 'pds-stories', type: 'pds:navigate', storyId, viewMode },
          '*'
        );
      } catch (err) {
        console.warn('PDS navigation: postMessage failed', err);
      }
      
      return navigated;
    };
  } catch (err) {
    // Fallback if storybook packages not available
    navigateToStoryFn = (storyId, viewMode = 'story') => {
      try {
        window.parent?.postMessage(
          { source: 'pds-stories', type: 'pds:navigate', storyId, viewMode },
          '*'
        );
        return true;
      } catch {
        return false;
      }
    };
  }
  
  return navigateToStoryFn;
}

/**
 * Navigate to a story programmatically
 * @param {string} storyId - The story ID (e.g., 'foundations-icons--overview')
 * @param {string} viewMode - 'story' or 'docs'
 */
export async function navigateToStory(storyId, viewMode = 'story') {
  const nav = await getNavigateToStory();
  return nav(storyId, viewMode);
}

/**
 * Create a click handler for story navigation
 * @param {string} storyId - The story ID to navigate to
 * @param {string} viewMode - 'story' or 'docs'
 * @returns {function} Event handler function
 */
export function storyLinkHandler(storyId, viewMode = 'story') {
  return (event) => {
    event.preventDefault();
    event.stopPropagation();
    navigateToStory(storyId, viewMode);
  };
}

/**
 * Attach navigation handlers to all story links in a container
 * Call this after rendering DOM content with story links
 * 
 * Links should have data-story-link="story-id" attribute
 * 
 * @param {HTMLElement} container - Container element to search for links
 */
export function attachStoryLinkHandlers(container) {
  if (!container) return;
  
  const links = container.querySelectorAll('[data-story-link]');
  links.forEach(link => {
    const storyId = link.getAttribute('data-story-link');
    const viewMode = link.getAttribute('data-view-mode') || 'story';
    if (storyId) {
      link.addEventListener('click', storyLinkHandler(storyId, viewMode));
      // Keep href for accessibility/right-click, but prevent default navigation
      link.setAttribute('href', `/?path=/story/${storyId}`);
    }
  });
}
