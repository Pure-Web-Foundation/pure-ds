import { cpSync, mkdirSync, rmSync, readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageRoot = join(__dirname, '..');
const monorepoRoot = join(packageRoot, '../..');

// Paths
const srcPublicAssets = join(monorepoRoot, 'public/assets');
const destPublicAssets = join(packageRoot, 'public/assets');

const srcSource = join(monorepoRoot, 'src');
const destSource = join(packageRoot, 'src');

console.log('📦 Packaging PDS Storybook...');

// 1. Copy Assets
console.log('Copying assets...');
if (process.cwd() !== packageRoot) {
    // Safety check to ensure we are running from package root or we know where we are
}

rmSync(destPublicAssets, { recursive: true, force: true });
mkdirSync(dirname(destPublicAssets), { recursive: true });
cpSync(srcPublicAssets, destPublicAssets, { recursive: true });

// 2. Copy Source
console.log('Copying source...');
rmSync(destSource, { recursive: true, force: true });
cpSync(srcSource, destSource, { recursive: true });

// Copy pds-configurator source
console.log('Copying pds-configurator...');
const pdsConfiguratorSrc = join(monorepoRoot, 'packages/pds-configurator/src');
const destPdsConfigurator = join(destSource, 'js/pds-configurator');
mkdirSync(destPdsConfigurator, { recursive: true });
cpSync(pdsConfiguratorSrc, destPdsConfigurator, { recursive: true });

// Copy custom-elements.json
console.log('Copying custom-elements.json...');
cpSync(join(monorepoRoot, 'custom-elements.json'), join(packageRoot, 'custom-elements.json'));

// Copy getting-started.md from root to stories (SSoT in root)
console.log('Copying getting-started.md...');
const gettingStartedSrc = join(monorepoRoot, 'getting-started.md');
const gettingStartedDest = join(packageRoot, 'stories/getting-started.md');
cpSync(gettingStartedSrc, gettingStartedDest);

// 3. Run Generation Scripts
// console.log('Generating stories...');
// execSync('node scripts/generate-stories.js', { cwd: packageRoot, stdio: 'inherit' });

console.log('Building reference...');
execSync('node scripts/build-pds-reference.mjs', { cwd: packageRoot, stdio: 'inherit' });

// 4. Patch Generated Stories
// The generated stories might contain `../../../src`. We need to change it to `../../src`.
// However, we are now using Vite aliases to handle this, so we don't need to patch the source files.
// This preserves the user's source code integrity.
console.log('Skipping story patching (handled by Vite aliases)...');

/*
function replaceInDir(dir, pattern, replacement) {
    const files = readdirSync(dir);
    for (const file of files) {
        const filePath = join(dir, file);
        const stat = statSync(filePath);
        if (stat.isDirectory()) {
            replaceInDir(filePath, pattern, replacement);
        } else if (file.endsWith('.js') || file.endsWith('.mjs')) {
            let content = readFileSync(filePath, 'utf-8');
            if (content.includes(pattern)) {
                content = content.replaceAll(pattern, replacement);
                writeFileSync(filePath, content);
                console.log(`Patched ${file}`);
            }
        }
    }
}

const storiesDir = join(packageRoot, 'stories');
replaceInDir(storiesDir, '../../../../src/', '../../src/');
replaceInDir(storiesDir, '../../../src/', '../../src/'); // Keep this just in case
*/

// 5. Copy static markdown files and utils
console.log('Copying static story assets...');
// These files are imported by stories but not generated, so we need to ensure they are present
// if they are not already in the stories folder (which they are, because they are source files).
// However, we need to make sure we didn't delete them if we cleaned the folder.
// But wait, `stories` folder is part of the package source, we only generate INTO it.
// So we don't need to copy them.

console.log('✅ Package build complete.');
