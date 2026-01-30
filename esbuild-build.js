#!/usr/bin/env node
import esbuild from 'esbuild';
import path from 'path';
import { mkdir, copyFile, readdir, unlink } from 'fs/promises';
import { pathToFileURL } from 'url';

// Validate all design presets at build time to ensure a11y compliance
const validatePresetsPlugin = {
  name: 'validate-presets',
  setup(build) {
    build.onStart(async () => {
      const presetsPath = path.resolve('src/js/pds-core/pds-config.js');
      const generatorPath = path.resolve('src/js/pds-core/pds-generator.js');
      const { presets } = await import(pathToFileURL(presetsPath).href);
      const { validateDesign } = await import(pathToFileURL(generatorPath).href);

      const presetList = Object.values(presets || {});
      const results = presetList.map((preset) => ({
        name: preset?.name,
        ...validateDesign(preset, { minContrast: 4.5 }),
      }));
      const ok = results.every((r) => r.ok);
      if (!ok) {
        console.error('\n❌ Preset validation failed for the following presets:');
        for (const r of results) {
          if (r.ok) continue;
          const name = r.name || 'Unnamed preset';
          console.error(`\n— ${name}`);
          for (const issue of r.issues) {
            console.error(`  • ${issue.message} [${issue.context}] (${issue.path})`);
          }
        }
        throw new Error(`Preset validation failed with ${results.filter(r => !r.ok).length} preset(s) having issues.`);
      } else {
        console.log('✅ All presets passed accessibility validation.');
      }
    });
  },
};

const outdir = path.join(process.cwd(), 'dist');

async function run() {
  try {
    await esbuild.build({
      entryPoints: ['src/js/lit.js', 'src/js/app.js', 'src/js/pds.js', 'src/js/pds-manager.js'],
      bundle: true,
      platform: 'browser',
      target: 'es2022',
      format: 'esm',
      outdir: "public/assets/js/",
      minify: true,
      sourcemap: false,
      external: ['*.woff', '*.eot', '*.ttf', '*.svg'],
      plugins: [validatePresetsPlugin],
    });

    // Copy pds-manager bundle to public/assets/pds/core for static runtime loading
    try {
      const coreDir = path.join(process.cwd(), 'public', 'assets', 'pds', 'core');
      await mkdir(coreDir, { recursive: true });
      const managerSrc = path.join(process.cwd(), 'public', 'assets', 'js', 'pds-manager.js');
      const managerDest = path.join(coreDir, 'pds-manager.js');
      await copyFile(managerSrc, managerDest);
      console.log('Copied pds-manager.js to', managerDest);
    } catch (err) {
      console.warn('Failed to copy pds-manager.js to public/assets/pds/core:', err.message);
    }

    // Copy Lit bundle to public/assets/pds/external for import-map usage
    try {
      const externalDir = path.join(process.cwd(), 'public', 'assets', 'pds', 'external');
      await mkdir(externalDir, { recursive: true });
      const litSrc = path.join(process.cwd(), 'public', 'assets', 'js', 'lit.js');
      const litDest = path.join(externalDir, 'lit.js');
      await copyFile(litSrc, litDest);
      console.log('Copied lit.js to', litDest);
    } catch (err) {
      console.warn('Failed to copy lit.js to public/assets/pds/external:', err.message);
    }

    // Ensure dist/types exists and copy declaration files
    const typesDir = path.join(outdir, 'types');
    await mkdir(typesDir, { recursive: true });

    // Copy known declaration(s)
    const declSrc = path.join(process.cwd(), 'src', 'js', 'pds.d.ts');
    const declDest = path.join(typesDir, 'pds.d.ts');
    try {
      await copyFile(declSrc, declDest);
      console.log('Copied type declaration to', declDest);
    } catch (err) {
      console.warn('No declaration file to copy:', declSrc, err.message);
    }

    // Clean up stale source maps in public assets (sourcemap is disabled for prod build)
    try {
      const jsDir = path.join(process.cwd(), 'public', 'assets', 'js');
      const files = await readdir(jsDir);
      await Promise.all(
        files
          .filter((f) => f.endsWith('.map'))
          .map((f) => unlink(path.join(jsDir, f)).catch(() => {}))
      );
    } catch {}

    console.log('Build complete — outputs in', outdir);
  } catch (err) {
    console.error('Build failed', err);
    process.exit(1);
  }
}

run();
