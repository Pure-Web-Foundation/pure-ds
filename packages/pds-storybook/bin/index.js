#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageRoot = join(__dirname, '..');
const configDir = join(packageRoot, '.storybook');

const args = process.argv.slice(2);
const command = args[0] || 'dev';

const storybookArgs = [
  command === 'build' ? 'build' : 'dev',
  '-c', configDir,
  ...args.slice(1)
];

// If dev, add port if not specified
if (command !== 'build' && !args.includes('-p') && !args.includes('--port')) {
  storybookArgs.push('-p', '6006');
}

console.log(`Running Storybook with config: ${configDir}`);

const child = spawn('npx', ['storybook', ...storybookArgs], {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd(), // Run in user's project root so it finds their stories
  env: {
    ...process.env,
    PDS_STORYBOOK_ROOT: packageRoot
  }
});

child.on('exit', (code) => {
  process.exit(code);
});
