import { validateDesign } from '../src/js/pds.js';
import { presets } from '../src/js/pds-core/pds-config.js';

async function run() {
  try {
    const preset = presets['contrast-pro'] || Object.values(presets || {}).find(p => (p && (p.id === 'contrast-pro' || (p.name && p.name.toLowerCase() === 'contrast pro'))));
    if (!preset) {
      console.error('Preset not found: contrast-pro');
      process.exit(2);
    }

    // Use structuredClone replacement for Node <18 if necessary; fallback to JSON
    const config = JSON.parse(JSON.stringify(preset));

    const result = validateDesign(config, { minContrast: 4.5 });
    console.log('Validation result for preset:', preset.name || 'contrast-pro');
    console.log('ok:', result.ok);
    if (result.issues && result.issues.length) {
      console.log('issues:');
      for (const it of result.issues) {
        console.log('-', it.path, '|', it.context || '', '|', it.message, `(ratio=${it.ratio}, min=${it.min})`);
      }
    }
    process.exit(result.ok ? 0 : 1);
  } catch (err) {
    console.error('Validation run failed:', err);
    process.exit(2);
  }
}

run();
