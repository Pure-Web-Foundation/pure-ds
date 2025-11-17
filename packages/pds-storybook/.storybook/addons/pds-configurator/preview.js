/**
 * Preview-side addon logic for PDS Configurator
 * Runs in the iframe where stories are rendered
 */

import { addons } from '@storybook/preview-api';
import { EVENTS } from './constants.js';

let drawerElement = null;
let configFormLoaded = false;

// Initialize configurator UI in preview
async function initializeConfigurator() {
  if (drawerElement) return;

  // Ensure pds-drawer is defined
  await customElements.whenDefined('pds-drawer');

  // Create drawer for configurator
  drawerElement = document.createElement('pds-drawer');
  drawerElement.id = 'storybook-pds-configurator';
  drawerElement.setAttribute('position', 'bottom');
  drawerElement.style.zIndex = '999999';
  
  // Create header
  const header = document.createElement('div');
  header.slot = 'drawer-header';
  header.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
      <h3 style="margin: 0;">PDS Configurator</h3>
      <button class="btn-ghost" id="close-configurator-btn" style="padding: 0.5rem;">
        <pds-icon icon="x" size="sm"></pds-icon>
      </button>
    </div>
  `;
  drawerElement.appendChild(header);

  // Create configurator content container
  const content = document.createElement('div');
  content.slot = 'drawer-content';
  content.id = 'configurator-content';
  content.style.height = '60vh';
  content.style.overflow = 'auto';
  content.style.padding = 'var(--spacing-4)';
  content.innerHTML = `<p style="padding: 1rem;">Loading configurator...</p>`;
  drawerElement.appendChild(content);

  document.body.appendChild(drawerElement);
  
  // Attach close button handler after drawer is in DOM
  setTimeout(() => {
    const closeBtn = document.getElementById('close-configurator-btn');
    if (closeBtn && drawerElement) {
      closeBtn.onclick = () => drawerElement.open = false;
    }
  }, 0);

  // Load pds-config-form dynamically
  loadConfigForm();
}

async function loadConfigForm() {
  if (configFormLoaded) return;

  try {
    // Import the config form component
    await import('../../../../../src/js/pds-configurator/pds-config-form.js');
    
    const content = document.getElementById('configurator-content');
    if (content) {
      content.innerHTML = '<pds-config-form id="storybook-config-form"></pds-config-form>';
      configFormLoaded = true;

      // Listen for design updates from the form
      const PDS = (await import('../../../../../src/js/pds.js')).PDS;
      PDS.addEventListener('pds:design:updated', async (e) => {
        console.log('Design updated in configurator:', e.detail);
        
        try {
          // Get the current designer from registry and regenerate styles
          const designer = PDS.registry._designer;
          if (designer && e.detail.config) {
            designer.configure(e.detail.config);
            await PDS.Generator.applyStyles(designer);
          }
          
          // Notify manager
          const channel = addons.getChannel();
          channel.emit(EVENTS.DESIGN_UPDATED, e.detail);
        } catch (error) {
          console.error('Failed to apply design update:', error);
        }
      });
    }
  } catch (error) {
    console.error('Failed to load config form:', error);
    const content = document.getElementById('configurator-content');
    if (content) {
      content.innerHTML = `<p style="padding: 1rem; color: red;">Error loading configurator: ${error.message}</p>`;
    }
  }
}

// Listen for addon events from manager
if (typeof window !== 'undefined') {
  const channel = addons.getChannel();
  
  channel.on(EVENTS.OPEN_CONFIGURATOR, async () => {
    console.log('🎯 OPEN_CONFIGURATOR event received in preview');
    console.log('Current drawerElement:', drawerElement);
    await initializeConfigurator();
    console.log('After init, drawerElement:', drawerElement);
    if (drawerElement) {
      console.log('Setting drawer.open = true');
      drawerElement.open = true;
      console.log('Drawer open attribute:', drawerElement.hasAttribute('open'));
    } else {
      console.error('❌ drawerElement is null or undefined!');
    }
  });

  channel.on(EVENTS.CLOSE_CONFIGURATOR, () => {
    console.log('🎯 CLOSE_CONFIGURATOR event received in preview');
    if (drawerElement) {
      drawerElement.open = false;
    }
  });

  channel.on(EVENTS.QUERY_EXECUTED, async ({ query }) => {
    try {
      const PDS = (await import('../../../../../src/js/pds.js')).PDS;
      const results = await PDS.query(query);
      
      // Send results back to manager
      channel.emit(EVENTS.QUERY_EXECUTED + '_RESPONSE', {
        query,
        results: results.slice(0, 10).map(r => ({
          id: r.text,
          title: r.text,
          value: r.value,
          category: r.category,
          onClick: () => {
            console.log('Query result clicked:', r);
            // Could copy to clipboard or navigate
          }
        }))
      });
    } catch (error) {
      console.error('Query execution failed:', error);
    }
  });
}
