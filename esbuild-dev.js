import esbuild from "esbuild";
import rebuildNotifyPlugin from "./lib/esbuild-plugin-rebuild-notify.js";

const config = {
  entryPoints: [
    "src/js/app.js",
    "src/js/lit.js"
  ],
  plugins: [
    rebuildNotifyPlugin(),    
  ],
  platform: "browser",  // Changed from "node" to "browser" to properly support private class fields
  target: "es2022",     // Ensure modern JS features are supported
  outdir: "public/assets/js/",
  external: ["*.woff", "*.eot", "*.ttf", "*.svg"],
  bundle: true,
  format: "esm",
  sourcemap: true,
  
};

const run = async () => {
  const ctx = await esbuild.context(config);
  await ctx.watch();
};

run();
