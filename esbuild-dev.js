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
    name: 'copy-readme-to-public',
    setup(build) {
      build.onEnd(async (result) => {
        if (result.errors && result.errors.length) return;
        try {
          const root = process.cwd();
          const src = path.join(root, 'readme.md');
          const dest = path.join(root, 'public', 'readme.md');
          await copyFile(src, dest);
          console.log('Copied readme.md to public/readme.md');
        } catch (err) {
          console.error('Failed to copy readme into public/:', err);
        }
      });
    },
  };

  const ctx = await esbuild.context({ ...config, plugins: [rebuildNotifyPlugin(), copyReadmePlugin] });
  await ctx.watch();
};

run();
