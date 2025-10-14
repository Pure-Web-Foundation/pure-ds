/**
 * Export the config as JSON for use in the browser
 * Run with: node scripts/export-config-json.mjs
 */

import { writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import the config
const { autoDesignerConfig } = await import('../auto-designer.config.js');

// Output path
const outputPath = join(__dirname, '..', 'public', 'assets', 'auto-designer.config.json');

try {
  // Write as formatted JSON
  await writeFile(outputPath, JSON.stringify(autoDesignerConfig, null, 2), 'utf-8');
  console.log('✅ Config exported to:', outputPath);
} catch (err) {
  console.error('❌ Error exporting config:', err);
  process.exit(1);
}
