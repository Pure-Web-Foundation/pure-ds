#!/usr/bin/env node

/**
 * PDS Storybook CLI
 * 
 * Integrates Pure Design System into existing Vite + Web Components Storybook instances.
 * Detects environment, exports static assets, copies stories, and patches configuration.
 */

import { program } from 'commander';
import { existsSync, readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync, statSync } from 'fs';
import { join, dirname, relative } from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import ora from 'ora';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CWD = process.cwd();
const STORYBOOK_DIR = join(CWD, '.storybook');
const STORIES_DIR = join(STORYBOOK_DIR, 'pds-stories');
const PDS_CONFIG_PATH = join(CWD, 'pds.config.js');

/**
 * Detect if current directory is a valid Vite + Web Components Storybook
 */
function detectEnvironment() {
  const spinner = ora('Detecting Storybook environment...').start();
  
  const checks = {
    hasStorybook: existsSync(STORYBOOK_DIR),
    hasViteConfig: existsSync(join(CWD, 'vite.config.js')) || existsSync(join(CWD, 'vite.config.ts')),
    hasPackageJson: existsSync(join(CWD, 'package.json')),
    hasPdsConfig: existsSync(PDS_CONFIG_PATH)
  };

  if (!checks.hasStorybook) {
    spinner.fail(chalk.red('No .storybook directory found'));
    console.log(chalk.yellow('\nThis command must be run from a Storybook project root.'));
    process.exit(1);
  }

  if (!checks.hasViteConfig) {
    spinner.warn(chalk.yellow('No vite.config.js found'));
    console.log(chalk.yellow('This tool is designed for Vite-based Storybook instances.'));
  }

  // Check Storybook framework in main.js
  const mainJsPath = join(STORYBOOK_DIR, 'main.js');
  const mainTsPath = join(STORYBOOK_DIR, 'main.ts');
  const mainConfigPath = existsSync(mainJsPath) ? mainJsPath : (existsSync(mainTsPath) ? mainTsPath : null);

  if (!mainConfigPath) {
    spinner.fail(chalk.red('No .storybook/main.js or main.ts found'));
    process.exit(1);
  }

  const mainConfig = readFileSync(mainConfigPath, 'utf-8');
  const isWebComponents = mainConfig.includes('@storybook/web-components');

  if (!isWebComponents) {
    spinner.fail(chalk.red('Not a Web Components Storybook instance'));
    console.log(chalk.yellow('\nThis CLI only supports @storybook/web-components-vite projects.'));
    console.log(chalk.dim('Detected framework should include: @storybook/web-components-vite'));
    process.exit(1);
  }

  if (!checks.hasPdsConfig) {
    spinner.warn(chalk.yellow('No pds.config.js found'));
    console.log(chalk.dim('Will use default PDS configuration'));
  }

  spinner.succeed(chalk.green('Valid Vite + Web Components Storybook detected'));
  return { mainConfigPath, checks };
}

/**
 * Export static PDS assets using pds:export
 */
async function exportPdsAssets(update = false) {
  const spinner = ora('Exporting PDS static assets...').start();

  try {
    // Find pure-ds package
    const pdsPkgPath = join(CWD, 'node_modules', 'pure-ds');
    if (!existsSync(pdsPkgPath)) {
      spinner.fail(chalk.red('pure-ds not found in node_modules'));
      console.log(chalk.yellow('\nInstall pure-ds first: npm install pure-ds'));
      process.exit(1);
    }

    // Run pds-static export
    const staticScriptPath = join(pdsPkgPath, 'packages', 'pds-cli', 'bin', 'pds-static.js');
    
    if (!existsSync(staticScriptPath)) {
      spinner.fail(chalk.red('pds-static.js not found'));
      process.exit(1);
    }

    execSync(`node "${staticScriptPath}"`, {
      cwd: CWD,
      stdio: 'pipe'
    });

    spinner.succeed(chalk.green('PDS assets exported successfully'));
    
    // Verify output
    const pdsOutputDir = join(CWD, 'public', 'assets', 'pds');
    if (!existsSync(pdsOutputDir)) {
      console.log(chalk.yellow('Warning: Expected output at public/assets/pds/ not found'));
    } else {
      console.log(chalk.dim(`  Assets: ${pdsOutputDir}`));
    }
    
  } catch (error) {
    spinner.fail(chalk.red('Failed to export PDS assets'));
    console.error(chalk.red(error.message));
    process.exit(1);
  }
}

/**
 * Copy story templates from PDS package
 */
function copyStoryTemplates(update = false) {
  const spinner = ora('Copying PDS story templates...').start();

  try {
    // Source: node_modules/pure-ds/packages/pds-storybook/stories
    const sourceDir = join(CWD, 'node_modules', '@pure-ds', 'storybook', 'stories');
    const fallbackSource = join(CWD, 'node_modules', 'pure-ds', 'packages', 'pds-storybook', 'stories');
    
    const storiesSource = existsSync(sourceDir) ? sourceDir : fallbackSource;

    if (!existsSync(storiesSource)) {
      spinner.warn(chalk.yellow('Story templates not found, will generate minimal set'));
      generateMinimalStories();
      return;
    }

    // Create target directory
    if (!existsSync(STORIES_DIR)) {
      mkdirSync(STORIES_DIR, { recursive: true });
    }

    // Copy all stories recursively
    copyDirRecursive(storiesSource, STORIES_DIR, update);

    spinner.succeed(chalk.green('Story templates copied'));
    console.log(chalk.dim(`  Stories: ${STORIES_DIR}`));

  } catch (error) {
    spinner.fail(chalk.red('Failed to copy stories'));
    console.error(chalk.red(error.message));
  }
}

/**
 * Recursively copy directory
 */
function copyDirRecursive(src, dest, updateOnly = false) {
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }

  const entries = readdirSync(src);

  for (const entry of entries) {
    const srcPath = join(src, entry);
    const destPath = join(dest, entry);
    const stat = statSync(srcPath);

    if (stat.isDirectory()) {
      copyDirRecursive(srcPath, destPath, updateOnly);
    } else {
      // Only copy if doesn't exist or if update mode and source is newer
      if (!existsSync(destPath) || !updateOnly) {
        copyFileSync(srcPath, destPath);
      } else if (updateOnly) {
        const srcStat = statSync(srcPath);
        const destStat = statSync(destPath);
        if (srcStat.mtimeMs > destStat.mtimeMs) {
          copyFileSync(srcPath, destPath);
        }
      }
    }
  }
}

/**
 * Generate minimal stories if templates not available
 */
function generateMinimalStories() {
  const minimalStory = `import { html } from 'lit';

export default {
  title: 'PDS/Getting Started',
  parameters: {
    docs: {
      description: {
        component: 'Pure Design System integrated into your Storybook'
      }
    }
  }
};

export const Welcome = () => html\`
  <div style="padding: 2rem;">
    <h1>Pure Design System</h1>
    <p>PDS has been integrated into your Storybook.</p>
    <p>Run <code>pds-storybook --update</code> to get the latest stories.</p>
  </div>
\`;
`;

  if (!existsSync(STORIES_DIR)) {
    mkdirSync(STORIES_DIR, { recursive: true });
  }

  writeFileSync(join(STORIES_DIR, 'Welcome.stories.js'), minimalStory, 'utf-8');
}

/**
 * Patch Storybook preview.js to initialize PDS in static mode
 */
function patchPreviewConfig(mainConfigPath) {
  const spinner = ora('Patching Storybook configuration...').start();

  try {
    const previewPath = join(STORYBOOK_DIR, 'preview.js');
    const previewTsPath = join(STORYBOOK_DIR, 'preview.ts');
    const previewConfigPath = existsSync(previewPath) ? previewPath : (existsSync(previewTsPath) ? previewTsPath : null);

    if (!previewConfigPath) {
      spinner.info(chalk.yellow('No preview.js found, creating one'));
      const previewContent = generatePreviewConfig();
      writeFileSync(join(STORYBOOK_DIR, 'preview.js'), previewContent, 'utf-8');
      spinner.succeed(chalk.green('Created preview.js with PDS initialization'));
      return;
    }

    let previewContent = readFileSync(previewConfigPath, 'utf-8');

    // Check if PDS is already initialized
    if (previewContent.includes('PDS.start')) {
      spinner.info(chalk.blue('PDS already initialized in preview.js'));
      return;
    }

    // Add PDS import and initialization
    const pdsInit = `
// Pure Design System initialization (added by pds-storybook CLI)
import { PDS } from 'pure-ds';

let pdsInitialized = false;

const withPDS = (story, context) => {
  if (!pdsInitialized) {
    PDS.start({
      mode: 'static',
      staticPaths: {
        tokens: '/assets/pds/styles/pds-tokens.css.js',
        primitives: '/assets/pds/styles/pds-primitives.css.js',
        components: '/assets/pds/styles/pds-components.css.js',
        utilities: '/assets/pds/styles/pds-utilities.css.js',
        styles: '/assets/pds/styles/pds-styles.css.js'
      },
      autoDefine: {
        baseURL: '/assets/pds/components/',
        predefine: ['pds-icon', 'pds-drawer'],
        scanExisting: true
      },
      applyGlobalStyles: true,
      manageTheme: true
    }).then(() => {
      console.log('✨ PDS initialized in static mode');
    });
    pdsInitialized = true;
  }
  
  return story();
};
`;

    // Insert before export default or at the beginning
    if (previewContent.includes('export default')) {
      previewContent = pdsInit + '\n' + previewContent;
      
      // Add withPDS decorator
      previewContent = previewContent.replace(
        /export default\s*{/,
        `export default {\n  decorators: [withPDS],`
      );
    } else {
      previewContent = pdsInit + '\n' + previewContent + '\nexport default { decorators: [withPDS] };';
    }

    writeFileSync(previewConfigPath, previewContent, 'utf-8');
    spinner.succeed(chalk.green('Patched preview.js with PDS initialization'));

  } catch (error) {
    spinner.fail(chalk.red('Failed to patch preview.js'));
    console.error(chalk.red(error.message));
  }
}

/**
 * Generate preview.js content from scratch
 */
function generatePreviewConfig() {
  return `import { PDS } from 'pure-ds';

let pdsInitialized = false;

const withPDS = (story, context) => {
  if (!pdsInitialized) {
    PDS.start({
      mode: 'static',
      staticPaths: {
        tokens: '/assets/pds/styles/pds-tokens.css.js',
        primitives: '/assets/pds/styles/pds-primitives.css.js',
        components: '/assets/pds/styles/pds-components.css.js',
        utilities: '/assets/pds/styles/pds-utilities.css.js',
        styles: '/assets/pds/styles/pds-styles.css.js'
      },
      autoDefine: {
        baseURL: '/assets/pds/components/',
        predefine: ['pds-icon', 'pds-drawer']
      },
      applyGlobalStyles: true,
      manageTheme: true
    }).then(() => {
      console.log('✨ PDS initialized in static mode');
    });
    pdsInitialized = true;
  }
  
  return story();
};

export default {
  decorators: [withPDS],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/,
        date: /Date$/
      }
    }
  }
};
`;
}

/**
 * Main init command
 */
async function init(options) {
  console.log(chalk.bold.blue('\n🎨 PDS Storybook Integration\n'));

  const { mainConfigPath } = detectEnvironment();

  console.log('');
  await exportPdsAssets(options.update);
  
  console.log('');
  copyStoryTemplates(options.update);

  console.log('');
  patchPreviewConfig(mainConfigPath);

  console.log(chalk.bold.green('\n✨ Integration complete!\n'));
  console.log(chalk.dim('Next steps:'));
  console.log(chalk.dim('  1. Run your Storybook: npm run storybook'));
  console.log(chalk.dim('  2. Check the PDS stories in the sidebar'));
  console.log(chalk.dim('  3. Update anytime: pds-storybook --update\n'));
}

/**
 * CLI setup
 */
program
  .name('pds-storybook')
  .description('Integrate Pure Design System into Storybook')
  .version('0.1.0')
  .option('-u, --update', 'Update existing integration (reentrant mode)')
  .action(init);

program.parse();
