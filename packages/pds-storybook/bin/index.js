#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

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

// Check if running in custom mode (consumer project)
if (process.cwd() !== packageRoot) {
  try {
    const cacheDir = join(process.cwd(), 'node_modules', '.cache', 'pds-storybook', 'stories');
    const srcStoriesDir = join(packageRoot, 'stories');
    
    console.log(`Preparing PDS stories in ${cacheDir}...`);
    
    if (fs.existsSync(cacheDir)) {
      fs.rmSync(cacheDir, { recursive: true, force: true });
    }
    fs.mkdirSync(cacheDir, { recursive: true });
    
    const copyAndTransform = (src, dest) => {
      if (!fs.existsSync(src)) return;
      
      const entries = fs.readdirSync(src, { withFileTypes: true });
      for (const entry of entries) {
        const srcPath = join(src, entry.name);
        const destPath = join(dest, entry.name);
        
        if (entry.isDirectory()) {
          fs.mkdirSync(destPath, { recursive: true });
          copyAndTransform(srcPath, destPath);
        } else if (entry.isFile()) {
          if (entry.name.endsWith('.stories.js') || entry.name.endsWith('.stories.ts') || entry.name.endsWith('.stories.mjs')) {
            let content = fs.readFileSync(srcPath, 'utf-8');
            
            // Find export default to locate the main title and avoid matching other 'title' properties defined before it
            const exportDefaultIndex = content.indexOf('export default');
            
            if (exportDefaultIndex !== -1) {
              const before = content.substring(0, exportDefaultIndex);
              const after = content.substring(exportDefaultIndex);
              
              // Replace the first title property found in the export default block
              const newAfter = after.replace(/(title:\s*['"])(.+?)(['"])/, (match, prefix, title, suffix) => {
                if (title.startsWith('PDS/')) return match;
                return `${prefix}PDS/${title}${suffix}`;
              });
              
              content = before + newAfter;
            } else {
              // Fallback if no export default found (unlikely for valid stories)
              content = content.replace(/(title:\s*['"])(.+?)(['"])/, (match, prefix, title, suffix) => {
                if (title.startsWith('PDS/')) return match;
                return `${prefix}PDS/${title}${suffix}`;
              });
            }
            
            fs.writeFileSync(destPath, content);
          } else {
            fs.copyFileSync(srcPath, destPath);
          }
        }
      }
    };
    
    copyAndTransform(srcStoriesDir, cacheDir);

    // Also copy dist folder to cache so relative imports work
    const cacheDistDir = join(process.cwd(), 'node_modules', '.cache', 'pds-storybook', 'dist');
    const srcDistDir = join(packageRoot, 'dist');

    if (fs.existsSync(srcDistDir)) {
      if (fs.existsSync(cacheDistDir)) {
        fs.rmSync(cacheDistDir, { recursive: true, force: true });
      }
      fs.mkdirSync(cacheDistDir, { recursive: true });
      
      // Simple recursive copy for dist
      const copyDir = (src, dest) => {
        const entries = fs.readdirSync(src, { withFileTypes: true });
        for (const entry of entries) {
          const srcPath = join(src, entry.name);
          const destPath = join(dest, entry.name);
          if (entry.isDirectory()) {
            fs.mkdirSync(destPath, { recursive: true });
            copyDir(srcPath, destPath);
          } else {
            fs.copyFileSync(srcPath, destPath);
          }
        }
      };
      copyDir(srcDistDir, cacheDistDir);
    }

    process.env.PDS_STORIES_PATH = cacheDir.replace(/\\/g, '/');
    
  } catch (err) {
    console.error('Error preparing PDS stories:', err);
  }
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
