#!/usr/bin/env node
import esbuild from 'esbuild';
import path from 'path';
import { mkdir, copyFile } from 'fs/promises';
import { pathToFileURL } from 'url';

// Validate all design presets at build time to ensure a11y compliance
const validatePresetsPlugin = {
  name: 'validate-presets',
  setup(build) {
    build.onStart(async () => {
      const presetsPath = path.resolve('src/js/pds-core/pds-config.js');
      const pdsPath = path.resolve('src/js/pds.js');
      const { presets } = await import(pathToFileURL(presetsPath).href);
      const { PDS } = await import(pathToFileURL(pdsPath).href);

      const { ok, results } = PDS.validateDesigns(presets, { minContrast: 4.5 });
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
      entryPoints: ['src/js/lit.js', 'src/js/app.js'],
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

    console.log('Build complete — outputs in', outdir);
  } catch (err) {
    console.error('Build failed', err);
    process.exit(1);
  }
}

run();
