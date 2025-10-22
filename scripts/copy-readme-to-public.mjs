import fs from 'fs-extra';
import path from 'path';

const root = process.cwd();
const src = path.join(root, 'readme.md');
const dest = path.join(root, 'public', 'readme.md');

(async function copy() {
  try {
    await fs.copy(src, dest, { overwrite: true });
    console.log('readme.md copied to public/readme.md');
  } catch (e) {
    console.error('Failed to copy readme.md:', e);
    process.exit(1);
  }
})();
