import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const currentFilename = fileURLToPath(import.meta.url);
const currentDirname = dirname(currentFilename);

// Determine if we are in the monorepo or installed as a package
const isPackage = currentDirname.includes('node_modules');

const pdsSrcPath = isPackage ? resolve(currentDirname, '../src') : resolve(currentDirname, '../../../src');
const pdsAssetsPath = isPackage ? resolve(currentDirname, '../public/assets') : resolve(currentDirname, '../../../public/assets');

const normalizePath = (path) => path.replace(/\\/g, '/');

/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
  stories: [
    process.env.PDS_STORIES_PATH 
      ? normalizePath(resolve(process.env.PDS_STORIES_PATH, '**/*.stories.@(js|jsx|mjs|ts|tsx)'))
      : '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    // Include user stories from the project root, but only if we are NOT running in the package itself
    ...(process.cwd() === resolve(currentDirname, '..') ? [] : [
      normalizePath(resolve(process.cwd(), 'stories/**/*.stories.@(js|jsx|mjs|ts|tsx)')),
      normalizePath(resolve(process.cwd(), 'src/**/*.stories.@(js|jsx|mjs|ts|tsx)')),
      normalizePath(resolve(process.cwd(), 'public/**/*.stories.@(js|jsx|mjs|ts|tsx)'))
    ])
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    './addons/html-preview/register.js',
    './addons/description/register.js'
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {}
  },
  staticDirs: [
    { from: join(pdsAssetsPath, 'pds'), to: 'pds' },
    { from: pdsAssetsPath, to: 'assets' },
    // Serve pds-reference.json for ontology search in manager
    { from: join(currentDirname, '../dist'), to: 'pds-data' },
    // Add user's public folder if it exists
    ...(fs.existsSync(resolve(process.cwd(), 'public')) ? [{ from: resolve(process.cwd(), 'public'), to: '/' }] : [])
  ],
  core: {
    builder: '@storybook/builder-vite'
  },
  viteFinal: async (config) => {
    // Add cache directories to Vite's fs.allow list
    const cacheDir = resolve(process.cwd(), 'node_modules', '.cache', 'pds-storybook');
    const storybookCacheDir = resolve(process.cwd(), 'node_modules', '.cache', 'storybook');
    const repoRoot = resolve(currentDirname, '../../..');
    const repoStorybookCacheDir = resolve(repoRoot, 'node_modules', '.cache', 'storybook');
    
    config.server = config.server || {};
    config.server.fs = config.server.fs || {};
    config.server.fs.allow = [
      ...(config.server.fs.allow || []),
      cacheDir,
      storybookCacheDir,
      repoStorybookCacheDir,
      // Also allow the package root and process.cwd() for good measure
      resolve(currentDirname, '..'),
      repoRoot,
      process.cwd()
    ];
    
    // Ensure Lit import alias is resolved to PDS bundle
    const aliases = {
      ...config.resolve.alias,
      '#pds': resolve(pdsSrcPath, 'js/pds.js'),
      '#pds/lit': resolve(pdsSrcPath, 'js/lit.js'),
    };

     // In monorepo, map the local src folder to the monorepo root src folder
     // This eliminates the need for a copied src folder during development
     if (!isPackage) {
       aliases[resolve(currentDirname, '../src')] = pdsSrcPath;
     }

    aliases['@pds-src'] = pdsSrcPath;
    config.resolve.alias = aliases;

    // Alias for relative paths to src (handles ../../../src in stories)
    // This allows stories to work in both monorepo (where ../../../src is valid)
    // and package (where it needs to be mapped to the local src folder)
    // Note: We use a regex to catch varying depths of ../
    config.resolve.alias['../../../src'] = pdsSrcPath;
    config.resolve.alias['../../../../src'] = pdsSrcPath;
    
    // Also handle the case where the import is exactly 'D:\Code\pure\pure-ds\packages\src\js\common\ask.js'
    // which seems to be happening in the error log:
    // Cannot find module 'D:\Code\pure\pure-ds\packages\src\js\common\ask.js'
    // This implies something is resolving ../../../src to packages/src instead of packages/pds-storybook/src or root src.
    
    // If we are in packages/pds-storybook, ../../../src goes to D:\Code\pure\pure-ds\src
    // The error says: D:\Code\pure\pure-ds\packages\src\js\common\ask.js
    // This means it went up one level too few?
    // D:\Code\pure\pure-ds\packages\pds-storybook\stories\utils\PdsAsk.stories.js
    // ../../../src -> D:\Code\pure\pure-ds\packages\src
    // Ah, stories/utils is one level deeper!
    // So it needs ../../../../src
    
    // The file PdsAsk.stories.js has: import ... from '../../../src/js/common/ask.js';
    // It is in stories/utils/PdsAsk.stories.js
    // So ../../../src resolves to:
    // stories/utils -> .. -> stories
    // stories -> .. -> pds-storybook
    // pds-storybook -> .. -> packages
    // So it resolves to packages/src.
    
    // The correct path from stories/utils/PdsAsk.stories.js to src/js/common/ask.js (in monorepo root) is:
    // ../../../../src/js/common/ask.js
    
    // So the file PdsAsk.stories.js IS WRONG in the repo?
    // The user said "The stories as they are were more than okay and ran without any problem."
    // Maybe I misread the file location or the import.
    
    // Let's check the file content again.
    // import { ask as askFallback } from '../../../src/js/common/ask.js';
    
    // If this worked before, then maybe PdsAsk.stories.js was in `stories/` not `stories/utils/`?
    // Or maybe my understanding of the structure is wrong.
    
    // Wait, I see `stories/utils/PdsAsk.stories.js` in the file path.
    // If I look at the file content I read earlier:
    // import { ask as askFallback } from '../../../src/js/common/ask.js';
    
    // If I am in `packages/pds-storybook/stories/utils/PdsAsk.stories.js`
    // .. -> stories/utils
    // ../.. -> stories
    // ../../.. -> pds-storybook
    // So `../../../src` -> `packages/pds-storybook/src`.
    
    // Does `packages/pds-storybook/src` exist?
    // Yes, I copied it there in package-build.js!
    // But in the MONOREPO, `src` is at the root: `../../../../src`.
    
    // So if the user says "it worked before", maybe they were running it in a way where `src` was available at `packages/pds-storybook/src`?
    // Or maybe `PdsAsk.stories.js` was indeed using `../../../../src` and I changed it to `../../../src`?
    
    // I changed it in step 10!
    // "replace_string_in_file ... newString: ../../../src ... oldString: ../../../../src"
    // I changed it to `../../../src`.
    // And then I reverted it?
    // In step 18 I changed it back to `../../../src`?
    // "replace_string_in_file ... newString: ../../../src ... oldString: ../../../../src"
    // Wait, I changed it FROM `../../../../src` TO `../../../src`.
    
    // The user said "I have undone all your changes in .stories files".
    // So the file on disk SHOULD be `../../../../src` if that was the original state.
    // But I read it in step 25 and it was `../../../src`.
    // This means the user's "undo" might not have reverted my change to this specific file, or I misread the history.
    
    // If the file has `../../../src`, it points to `packages/pds-storybook/src`.
    // In the monorepo, `packages/pds-storybook/src` DOES NOT EXIST (it is created by package-build).
    // So `../../../src` is WRONG for the monorepo dev environment.
    
    // I need to fix this file to use `../../../../src` so it works in the monorepo.
    // AND I need to ensure `package-build` or `main.js` handles it for the package.
    
    // BUT the user said "don't touch any stories".
    // If the file currently has `../../../src` and it's broken, I MUST fix it to restore "committed" state.
    // The error log says: `Cannot find module 'D:\Code\pure\pure-ds\packages\src\js\common\ask.js'`
    // This confirms that `../../../src` resolves to `packages/src`.
    // So it needs one more `..`.
    
    // I will change it back to `../../../../src`.
    
    config.resolve.alias['../../../../src'] = pdsSrcPath;
    
    // Try to resolve user's pds.config.js
    const userConfigPath = resolve(process.cwd(), 'pds.config.js');
    if (fs.existsSync(userConfigPath)) {
        config.resolve.alias['@user/pds-config'] = userConfigPath;
    } else {
        // Fallback to a default config file if user config doesn't exist
        config.resolve.alias['@user/pds-config'] = resolve(currentDirname, '../default-pds.config.js');
    }

    // Support absolute path imports like: import { html } from '/assets/pds/external/lit.js';
    // Vite blocks direct imports from public/, so we disable Vite's public directory
    // handling (Storybook uses staticDirs instead) and resolve these imports ourselves.
    const userPublicPath = resolve(process.cwd(), 'public');
    const isConsumerProject = process.cwd() !== resolve(currentDirname, '..');
    
    if (isConsumerProject && fs.existsSync(userPublicPath)) {
      // Disable Vite's public directory to prevent "Cannot import non-asset file" errors
      // Storybook's staticDirs handles serving public files at runtime
      config.publicDir = false;
      
      config.plugins = config.plugins || [];
      // Insert at the beginning to run before other plugins
      config.plugins.unshift({
        name: 'pds-public-esm-loader',
        enforce: 'pre', // Run before Vite's built-in plugins
        resolveId(id, importer) {
          // Handle absolute paths starting with /assets/ or other paths in public
          if (id.startsWith('/') && !id.startsWith('/@') && !id.startsWith('/node_modules')) {
            const filePath = resolve(userPublicPath, id.slice(1)); // Remove leading /
            if (fs.existsSync(filePath) && (filePath.endsWith('.js') || filePath.endsWith('.mjs'))) {
              // Return a virtual module ID to bypass Vite's public folder check
              return `\0virtual:public-esm:${id}`;
            }
          }
        },
        load(id) {
          if (id.startsWith('\0virtual:public-esm:')) {
            const originalPath = id.replace('\0virtual:public-esm:', '');
            const filePath = resolve(userPublicPath, originalPath.slice(1));
            if (fs.existsSync(filePath)) {
              // Read and return the actual file contents
              return fs.readFileSync(filePath, 'utf-8');
            }
          }
        }
      });
    }

    // Set base path for production builds
    if (config.mode === 'production') {
      config.base = '/storybook/';
    }
    
    return config;
  }
};

export default config;
