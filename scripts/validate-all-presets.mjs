import { validateDesign } from '../src/js/pds.js';
import { presets } from '../src/js/pds-core/pds-config.js';

async function run() {
  console.log('Validating all presets for contrast...\n');
  
  let failedCount = 0;
  const failedPresets = [];
  
  for (const [id, preset] of Object.entries(presets)) {
    if (!preset || !preset.colors) continue;
    
    const config = JSON.parse(JSON.stringify(preset));
    const result = validateDesign(config, { minContrast: 4.5 });
    
    console.log(`\n[${result.ok ? '✓' : '✗'}] ${preset.name || id}`);
    
    if (!result.ok) {
      failedCount++;
      failedPresets.push({ id, name: preset.name, issues: result.issues });
      
      if (result.issues && result.issues.length) {
        for (const it of result.issues) {
          console.log(`    ${it.context || ''}: ${it.message}`);
          if (it.ratio) {
            console.log(`    Ratio: ${it.ratio.toFixed(2)} (min: ${it.min})`);
          }
        }
      }
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log(`Total: ${Object.keys(presets).length} presets`);
  console.log(`Passed: ${Object.keys(presets).length - failedCount}`);
  console.log(`Failed: ${failedCount}`);
  
  if (failedCount > 0) {
    console.log('\nFailed presets:', failedPresets.map(p => p.name || p.id).join(', '));
    process.exit(1);
  }
  
  console.log('\n✓ All presets pass contrast validation!');
  process.exit(0);
}

run();
