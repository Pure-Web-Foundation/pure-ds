#!/usr/bin/env node
import esbuild from 'esbuild';
import path from 'path';
import { mkdir, copyFile } from 'fs/promises';

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
