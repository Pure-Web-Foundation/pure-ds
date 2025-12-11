#!/usr/bin/env node

import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const generatedEntry = path.join(projectRoot, "dist", "types", "src", "js", "pds.d.ts");
const legacyEntry = path.join(projectRoot, "dist", "types", "pds.d.ts");
const indexEntry = path.join(projectRoot, "dist", "types", "index.d.ts");

async function ensureGeneratedEntry() {
  try {
    await fs.access(generatedEntry);
    return true;
  } catch {
    return false;
  }
}

async function syncLegacyEntry() {
  const exists = await ensureGeneratedEntry();
  if (!exists) {
    console.error(`[types] Expected declaration not found at ${path.relative(projectRoot, generatedEntry)}. Did tsc run?`);
    process.exitCode = 1;
    return;
  }

  await fs.mkdir(path.dirname(legacyEntry), { recursive: true });
  await fs.copyFile(generatedEntry, legacyEntry);

  const indexContent = [
    "export * from \"./src/js/pds.js\";",
    "export { default } from \"./src/js/pds.js\";",
    ""
  ].join("\n");
  await fs.writeFile(indexEntry, indexContent, "utf8");

  console.log(`[types] Synced declarations to ${path.relative(projectRoot, legacyEntry)}`);
}

syncLegacyEntry().catch((error) => {
  console.error("[types] Failed to sync generated declarations", error);
  process.exitCode = 1;
});
