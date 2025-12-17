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

  // Force-load pds-drawer by triggering AutoDefiner
  // Create a temporary element to force the component to load
  if (!customElements.get('pds-drawer')) {
    const temp = document.createElement('pds-drawer');
    temp.style.display = 'none';
    document.body.appendChild(temp);
    try {
      await customElements.whenDefined('pds-drawer');
    } finally {
      temp.remove();
    }
  }

  // Create drawer for configurator
  drawerElement = document.createElement('pds-drawer');
  drawerElement.id = 'storybook-pds-configurator';
  drawerElement.setAttribute('position', 'bottom');
  drawerElement.setAttribute('show-close', '');
  drawerElement.style.zIndex = '999999';
  
  // Create header
  //const header = document.createElement('div');
  //header.slot = 'drawer-header';
  //header.innerHTML = `
  //`;
  //drawerElement.appendChild(header);

  // Create configurator content container
  const content = document.createElement('div');
  content.slot = 'drawer-content';
  content.id = 'configurator-content';
  
  content.innerHTML = `<p style="padding: 1rem;">Loading configurator...</p>`;
  drawerElement.appendChild(content);

  document.body.appendChild(drawerElement);

  // Load pds-config-form dynamically
  loadConfigForm();
}

async function loadConfigForm() {
  if (configFormLoaded) return;

  try {
    // Import the config form component with timeout
    const importTimeout = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Config form import timeout')), 3000)
    );
    
    await Promise.race([
      import('@pds-src/js/pds-configurator/pds-config-form.js'),
      importTimeout
    ]);
    
    // Wait for component to be defined
    await customElements.whenDefined('pds-config-form');
    
    const content = document.getElementById('configurator-content');
    if (content) {
      content.innerHTML = '<pds-config-form id="storybook-config-form"></pds-config-form>';
      configFormLoaded = true;

      // Listen for design updates from the form
      const PDS = (await import('@pds-src/js/pds.js')).PDS;
      PDS.addEventListener('pds:design:updated', async (e) => {
        console.log('Design updated in configurator:', e.detail);
        
        try {
          // The event detail contains both config and designer from pds-config-form
          if (e.detail.designer) {
            // Apply the styles from the designer that was already created by pds-config-form
            await PDS.Generator.applyStyles();
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
    try {
      // Add timeout to prevent hanging forever
      const timeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Configurator initialization timeout')), 5000)
      );
      
      await Promise.race([initializeConfigurator(), timeout]);
      
      if (drawerElement) {
        console.log('✅ Opening configurator drawer');
        // Always open (no toggle)
        drawerElement.open = true;
      } else {
        throw new Error('Drawer element failed to initialize');
      }
    } catch (error) {
      console.error('❌ Failed to open configurator:', error);
      // Show user-friendly error
      alert(`Failed to open PDS Configurator: ${error.message}\n\nPlease refresh the page and try again.`);
    }
  });

  channel.on(EVENTS.QUERY_EXECUTED, async ({ query }) => {
    try {
      const PDS = (await import('@pds-src/js/pds.js')).PDS;
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
