#!/usr/bin/env node

/**
 * Verify that browser and Node.js configs generate identical CSS
 */

import { AutoDesigner } from '../src/js/auto-designer.js';

async function main() {
  console.log('🔍 Verifying config synchronization...\n');

  // Load both configs
  const { autoDesignerConfig } = await import('../auto-designer.config.js');
  const { config } = await import('../src/js/config.js');

  // Generate CSS from both
  const nodeDesigner = new AutoDesigner(autoDesignerConfig);
  const browserDesigner = new AutoDesigner(config.design);

  const nodeCSS = nodeDesigner.exportCSS();
  const browserCSS = browserDesigner.exportCSS();

  // Compare
  if (nodeCSS === browserCSS) {
    console.log('✅ SUCCESS: Both configs generate identical CSS!');
    console.log(`   Size: ${(nodeCSS.length / 1024).toFixed(2)} KB\n`);
    process.exit(0);
  } else {
    console.log('❌ FAILURE: Configs generate different CSS!');
    console.log(`   Node.js CSS:  ${(nodeCSS.length / 1024).toFixed(2)} KB`);
    console.log(`   Browser CSS:  ${(browserCSS.length / 1024).toFixed(2)} KB`);
    console.log(`   Difference:   ${Math.abs(nodeCSS.length - browserCSS.length)} bytes\n`);
    
    // Find first difference
    for (let i = 0; i < Math.min(nodeCSS.length, browserCSS.length); i++) {
      if (nodeCSS[i] !== browserCSS[i]) {
        const start = Math.max(0, i - 50);
        const end = Math.min(nodeCSS.length, i + 50);
        console.log('First difference at position', i);
        console.log('Node.js:  ', nodeCSS.substring(start, end).replace(/\n/g, '\\n'));
        console.log('Browser:  ', browserCSS.substring(start, end).replace(/\n/g, '\\n'));
        break;
      }
    }
    
    process.exit(1);
  }
}

main().catch(console.error);
