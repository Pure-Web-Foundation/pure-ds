import { cpSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageRoot = join(__dirname, '..');
const monorepoRoot = join(packageRoot, '../..');

// Copy getting-started.md from root to stories (SSoT in root)
const gettingStartedSrc = join(monorepoRoot, 'getting-started.md');
const gettingStartedDest = join(packageRoot, 'stories/getting-started.md');

console.log('📄 Copying getting-started.md...');
cpSync(gettingStartedSrc, gettingStartedDest);
console.log('✅ Getting started copied.');
