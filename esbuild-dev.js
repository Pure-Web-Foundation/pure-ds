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
        const pdsSrc = path.join(process.cwd(), "public", "assets", "js", "pds.js");
        const pdsCoreEntryDest = path.join(process.cwd(), "public", "assets", "pds", "core.js");
        await copyFile(pdsSrc, pdsCoreEntryDest);

        const managerSrc = path.join(process.cwd(), "public", "assets", "js", "pds-manager.js");
        const managerDest = path.join(coreDir, "pds-manager.js");
        await copyFile(managerSrc, managerDest);
        const externalDir = path.join(process.cwd(), "public", "assets", "pds", "external");
        await mkdir(externalDir, { recursive: true });
        const litSrc = path.join(process.cwd(), "public", "assets", "js", "lit.js");
        const litDest = path.join(externalDir, "lit.js");
        await copyFile(litSrc, litDest);

        const autocompleteSrc = path.join(process.cwd(), "public", "assets", "js", "pds-autocomplete.js");
        const autocompleteDest = path.join(coreDir, "pds-autocomplete.js");
        await copyFile(autocompleteSrc, autocompleteDest);

        const askSrc = path.join(process.cwd(), "public", "assets", "js", "pds-ask.js");
        const askDest = path.join(coreDir, "pds-ask.js");
        await copyFile(askSrc, askDest);

        const toastSrc = path.join(process.cwd(), "public", "assets", "js", "pds-toast.js");
        const toastDest = path.join(coreDir, "pds-toast.js");
        await copyFile(toastSrc, toastDest);

        const enhancersSrc = path.join(process.cwd(), "public", "assets", "js", "pds-enhancers.js");
        const enhancersDest = path.join(coreDir, "pds-enhancers.js");
        await copyFile(enhancersSrc, enhancersDest);

        const autoDefinerSrc = path.join(process.cwd(), "public", "assets", "js", "pds-auto-definer.js");
        const autoDefinerDest = path.join(coreDir, "pds-auto-definer.js");
        await copyFile(autoDefinerSrc, autoDefinerDest);
      } catch (err) {
        console.warn("[pds] Failed to copy PDS runtime assets to public/assets/pds:", err.message);
      }
    });
  },
};

const config = {
  entryPoints: ["src/js/lit.js", "src/js/app.js", "src/js/pds.js", "src/js/pds-manager.js", "src/js/pds-autocomplete.js", "src/js/pds-ask.js", "src/js/pds-toast.js", "src/js/pds-enhancers.js", "src/js/pds-auto-definer.js"],
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
