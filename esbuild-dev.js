import esbuild from "esbuild";
import rebuildNotifyPlugin from "./lib/esbuild-plugin-rebuild-notify.js";

const config = {
  entryPoints: ["src/js/lit.js", "src/js/app.js", "src/js/pds.js"],
  plugins: [rebuildNotifyPlugin()],
  platform: "browser", 
  target: "es2022", 
  outdir: "public/assets/js/",
  external: ["*.woff", "*.eot", "*.ttf", "*.svg", "@pure-ds/core/*"],
  bundle: true,
  format: "esm",
  sourcemap: true,
};

import { copyFile } from 'fs/promises';
import path from 'path';

const run = async () => {
  const copyReadmePlugin = {
    name: 'copy-markdown',
    setup(build) {
      build.onEnd(async (result) => {
        if (result.errors && result.errors.length) return;
        try {
          const root = process.cwd();
          const src = path.join(root, 'readme.md');
          const dest = path.join(root, 'public/pds', 'readme.md');
          await copyFile(src, dest);
          
        } catch (err) {
          console.error('Failed to copy readme into public/pds:', err);
        }
      });
    },
  };

  const ctx = await esbuild.context({ ...config, plugins: [rebuildNotifyPlugin(), copyReadmePlugin] });
  await ctx.watch();
};

run();
