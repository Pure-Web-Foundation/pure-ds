import esbuild from "esbuild";
import path from "path";
import { copyFile, mkdir } from "fs/promises";
import rebuildNotifyPlugin from "./lib/esbuild-plugin-rebuild-notify.js";

const copyManagerToCorePlugin = {
  name: "copy-pds-manager-to-core",
  setup(build) {
    build.onEnd(async (result) => {
      if (result.errors?.length) return;
      try {
        const coreDir = path.join(process.cwd(), "public", "assets", "pds", "core");
        await mkdir(coreDir, { recursive: true });
        const managerSrc = path.join(process.cwd(), "public", "assets", "js", "pds-manager.js");
        const managerDest = path.join(coreDir, "pds-manager.js");
        await copyFile(managerSrc, managerDest);
      } catch (err) {
        console.warn("[pds] Failed to copy pds-manager.js to public/assets/pds/core:", err.message);
      }
    });
  },
};

const config = {
  entryPoints: ["src/js/lit.js", "src/js/app.js", "src/js/pds.js", "src/js/pds-manager.js"],
  plugins: [rebuildNotifyPlugin(), copyManagerToCorePlugin],
  platform: "browser", 
  target: "es2022", 
  outdir: "public/assets/js/",
  external: ["*.woff", "*.eot", "*.ttf", "*.svg", "pure-ds/*"],
  bundle: true,
  format: "esm",
  sourcemap: true,
};

const run = async () => {
  // Dev context with rebuild notify and core bundle sync.
  const ctx = await esbuild.context({ ...config });
  await ctx.watch();
};

run();
