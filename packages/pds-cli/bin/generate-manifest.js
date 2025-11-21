#!/usr/bin/env node

/**
 * Generate Custom Elements Manifest
 * Creates custom-elements.json with metadata for all PDS components
 */

import { writeFile, mkdir, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../../../');

// Colors for terminal output
const COLORS = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
};
const log = (msg, color = 'reset') => console.log(`${COLORS[color]}${msg}${COLORS.reset}`);

/**
 * Convert Custom Elements Manifest to VS Code Custom Data format
 */
async function convertToVSCodeFormat(manifest) {
  const tags = [];
  
  // Load icon configuration
  let availableIcons = [];
  try {
    const configPath = path.join(repoRoot, 'src/js/pds-core/pds-config.js');
    const { presets } = await import(pathToFileURL(configPath).href);
    
    // Get icons from default preset
    const iconConfig = presets?.default?.icons?.include || {};
    
    // Extract all icon names from all categories
    availableIcons = Array.from(new Set(
      Object.values(iconConfig).flat()
    )).filter(Boolean).sort();
    
    if (availableIcons.length > 0) {
      log(`🎨 Found ${availableIcons.length} icons in configuration`, 'blue');
    }
  } catch (error) {
    log(`⚠️  Could not load icon configuration: ${error.message}`, 'yellow');
  }
  
  manifest.modules?.forEach(module => {
    module.declarations?.forEach(declaration => {
      if (declaration.tagName && declaration.customElement) {
        const tag = {
          name: declaration.tagName,
          description: declaration.description || `${declaration.name} component`
        };
        
        // Add attributes
        if (declaration.attributes && declaration.attributes.length > 0) {
          tag.attributes = declaration.attributes.map(attr => {
            const attribute = {
              name: attr.name,
              description: attr.description || ''
            };
            
            // Special handling for pds-icon's icon attribute - add available icon names
            if (declaration.tagName === 'pds-icon' && attr.name === 'icon' && availableIcons.length > 0) {
              attribute.values = availableIcons.map(iconName => ({ 
                name: iconName,
                description: `${iconName} icon`
              }));
            }
            // Check if type indicates enum values
            else if (attr.type?.text) {
              const typeText = attr.type.text;
              // Match patterns like "bottom" | "top" | "left" | "right"
              const enumMatch = typeText.match(/"([^"]+)"/g);
              if (enumMatch && enumMatch.length > 1) {
                attribute.values = enumMatch.map(val => ({ name: val.replace(/"/g, '') }));
              }
            }
            
            // Add boolean value set for boolean types
            if (attr.type?.text === 'boolean') {
              attribute.valueSet = 'v';
            }
            
            return attribute;
          });
        }
        
        tags.push(tag);
      }
    });
  });
  
  return {
    version: 1.1,
    tags
  };
}

/**
 * Create pds.html-data.json in project root
 */
async function createHtmlDataConfig(vscodeDataPath) {
  const config = {
    "html.customData": [vscodeDataPath]
  };
  
  const configPath = path.join(repoRoot, 'pds.html-data.json');
  await writeFile(configPath, JSON.stringify(config, null, 2), 'utf-8');
  log(`✅ Created pds.html-data.json`, 'green');
  return configPath;
}

/**
 * Reload VS Code window
 */
function reloadVSCode() {
  // Note: Automatic reload would require VS Code extension API
  // For now, just inform the user to reload manually
  log('⚠️  Please reload VS Code to activate the updated custom data:', 'yellow');
  log('   Press Ctrl+Shift+P → "Developer: Reload Window"', 'blue');
}

/**
 * Analyze components and generate manifest
 */
async function generateManifest(targetDir) {
  try {
    log('📋 Generating Custom Elements Manifest...', 'bold');
    
    // Check if analyzer is installed
    const analyzerInstalled = existsSync(path.join(repoRoot, 'node_modules/@custom-elements-manifest/analyzer'));
    
    if (!analyzerInstalled) {
      log('⚠️  @custom-elements-manifest/analyzer not installed', 'yellow');
      log('   Installing analyzer...', 'blue');
      execSync('npm install --save-dev @custom-elements-manifest/analyzer', { 
        cwd: repoRoot,
        stdio: 'inherit'
      });
    }

    // Run the analyzer
    const componentsDir = path.join(repoRoot, 'public/assets/pds/components');
    const configPath = path.join(repoRoot, 'custom-elements-manifest.config.js');
    
    log('🔍 Analyzing components...', 'blue');
    
    try {
      execSync(`npx cem analyze --config ${configPath}`, {
        cwd: repoRoot,
        stdio: 'inherit'
      });
      
      // Post-process: Remove private members from the generated manifest
      const sourceManifest = path.join(repoRoot, 'custom-elements.json');
      if (existsSync(sourceManifest)) {
        log('🧹 Cleaning private members from manifest...', 'blue');
        const manifestContent = await readFile(sourceManifest, 'utf-8');
        const manifest = JSON.parse(manifestContent);
        
        // Filter out private members from all declarations
        manifest.modules?.forEach(module => {
          module.declarations?.forEach(declaration => {
            if (declaration.members) {
              declaration.members = declaration.members.filter(member => {
                // Keep only public members (exclude private and those starting with #)
                return member.privacy !== 'private' && !member.name?.startsWith('#');
              });
            }
          });
        });
        
        // Write cleaned manifest back
        await writeFile(sourceManifest, JSON.stringify(manifest, null, 2), 'utf-8');
        log('✅ Private members removed', 'green');
      }
      
      // Copy manifest to target directory if specified
      if (targetDir) {
        const targetManifest = path.join(targetDir, 'custom-elements.json');
        
        if (existsSync(sourceManifest)) {
          await mkdir(path.dirname(targetManifest), { recursive: true });
          const manifestContent = await readFile(sourceManifest, 'utf-8');
          await writeFile(targetManifest, manifestContent, 'utf-8');
          log(`✅ Manifest copied to ${path.relative(process.cwd(), targetManifest)}`, 'green');
        }
      }
      
      log('✅ Custom Elements Manifest generated', 'green');
      
      // Step 1: Generate VS Code custom data file
      log('🔧 Generating VS Code custom data...', 'blue');
      const manifestContent = await readFile(sourceManifest, 'utf-8');
      const manifest = JSON.parse(manifestContent);
      const vscodeData = await convertToVSCodeFormat(manifest);
      
      // Write to both locations
      const vscodeDataPath = path.join(repoRoot, 'public/assets/pds/vscode-custom-data.json');
      await mkdir(path.dirname(vscodeDataPath), { recursive: true });
      await writeFile(vscodeDataPath, JSON.stringify(vscodeData, null, 2), 'utf-8');
      log(`✅ VS Code custom data generated at ${path.relative(repoRoot, vscodeDataPath)}`, 'green');
      
      // Also copy to target directory if specified
      if (targetDir) {
        const targetVSCodeData = path.join(targetDir, 'vscode-custom-data.json');
        await writeFile(targetVSCodeData, JSON.stringify(vscodeData, null, 2), 'utf-8');
        log(`✅ VS Code custom data copied to ${path.relative(process.cwd(), targetVSCodeData)}`, 'green');
      }
      
      // Step 2: Create pds.html-data.json in project root
      const relativePath = 'public/assets/pds/vscode-custom-data.json';
      await createHtmlDataConfig(relativePath);
      
      // Step 3: Reload VS Code window
      log('🔄 Reloading VS Code...', 'blue');
      reloadVSCode();
      
      return true;
    } catch (error) {
      log(`❌ Manifest generation failed: ${error.message}`, 'red');
      return false;
    }
    
  } catch (error) {
    log(`❌ Error: ${error.message}`, 'red');
    return false;
  }
}

export { generateManifest };

// Run if called directly
if (process.argv[1] && process.argv[1].endsWith('generate-manifest.js')) {
  const targetDir = process.argv[2] || null;
  generateManifest(targetDir).then(success => {
    process.exit(success ? 0 : 1);
  });
}
