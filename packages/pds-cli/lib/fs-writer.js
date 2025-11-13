import fs from 'fs/promises';
import path from 'path';

/**
 * Write a map of files to disk atomically.
 * filesMap keys are relative paths (posix) and values are string contents.
 * @param {string} outDir
 * @param {Record<string,string>} filesMap
 * @param {{clean?:boolean}} [opts]
 */
export async function writeFilesAtomic(outDir, filesMap, opts = {}) {
  // returns { written: Array<{path,size}>, removed: Array<string> }
  const written = [];
  const removed = [];
  await fs.mkdir(outDir, { recursive: true });

  // Normalize expected paths set
  const expected = new Set();
  for (const relPath of Object.keys(filesMap)) {
    const dest = path.join(outDir, relPath.replace(/\//g, path.sep));
    expected.add(path.resolve(dest));
  }

  // Write files atomically
  for (const [relPath, content] of Object.entries(filesMap)) {
    const dest = path.join(outDir, relPath.replace(/\//g, path.sep));
    await fs.mkdir(path.dirname(dest), { recursive: true });
    const tmp = dest + `.tmp-${Date.now()}`;
    await fs.writeFile(tmp, content, 'utf8');
    // On Windows rename to existing file will replace it
    await fs.rename(tmp, dest);
    written.push({ path: path.resolve(dest), size: Buffer.byteLength(content, 'utf8') });
  }

  if (opts.clean) {
    // Walk outDir recursively and remove files not present in expected
    async function walk(dir) {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const ent of entries) {
        const abs = path.join(dir, ent.name);
        if (ent.isDirectory()) {
          await walk(abs);
          // attempt to remove directory if empty
          try {
            const after = await fs.readdir(abs);
            if (after.length === 0) {
              await fs.rmdir(abs);
            }
          } catch (e) {
            // ignore
          }
        } else if (ent.isFile()) {
          const resolved = path.resolve(abs);
          if (!expected.has(resolved)) {
            try {
              await fs.unlink(abs);
              removed.push(resolved);
            } catch (e) {
              // ignore unlink errors but continue
            }
          }
        }
      }
    }

    try {
      await walk(outDir);
    } catch (e) {
      // if walk fails, we still return what we wrote; do not throw to avoid breaking CLI
      console.error('writeFilesAtomic: clean error', e && e.message ? e.message : e);
    }
  }

  return { written, removed };
}
