import esbuild from "esbuild";
import rebuildNotifyPlugin from "./lib/esbuild-plugin-rebuild-notify.js";

const config = {
  entryPoints: ["src/js/lit.js", "src/js/app.js"],
  plugins: [rebuildNotifyPlugin()],
  platform: "browser", 
  target: "es2022", 
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
