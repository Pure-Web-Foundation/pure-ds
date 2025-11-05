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

const run = async () => {
  // Dev context with rebuild notify only. Avoid creating or writing to public/pds.
  const ctx = await esbuild.context({ ...config, plugins: [rebuildNotifyPlugin()] });
  await ctx.watch();
};

run();
