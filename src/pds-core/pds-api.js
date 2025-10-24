import fs from 'fs/promises';
import crypto from 'crypto';
import path from 'path';
import { Generator } from '../js/pds-core/pds-generator.js';

/**
 * Generate modules map and metadata from a config object.
 * @param {object} config
 * @param {object} [opts]
 * @returns {Promise<{modules: Record<string,string>, meta: object}>}
 */
export async function generate(config, opts = {}) {
  const gen = new Generator(config || {});

  // generator produces tokens and css during construction in this repo
  const tokens = gen.tokens || {};
  const css = gen.css || '';

  const modules = {};

  // Raw CSS outputs
  modules['pds-tokens.css'] = Object.keys(tokens).length ? toTokensCSS(tokens) : '';
  modules['pds-styles.css'] = css;

  // JS modules that export the CSS as default string (consumable by import)
  modules['pds-tokens.css.js'] = `export default ${JSON.stringify(modules['pds-tokens.css'])};`;
  modules['pds-styles.css.js'] = `export default ${JSON.stringify(css)};`;

  // A minimal story module placeholder (consumers/Storybook adapter can replace)
  modules['pds-stories.js'] = `// PDS generated stories placeholder\nexport const meta = { generatedAt: ${JSON.stringify(new Date().toISOString())} };`;

  const rawConfig = typeof config === 'string' ? config : JSON.stringify(config);
  const hash = crypto.createHash('sha1').update(rawConfig).digest('hex');

  const meta = {
    generatedAt: new Date().toISOString(),
    configHash: hash,
    files: Object.keys(modules),
  };

  return { modules, meta };
}

function toTokensCSS(tokens) {
  // Very small helper: flatten top-level token groups into :root custom properties
  const parts = [':root {'];
  for (const [group, obj] of Object.entries(tokens)) {
    if (typeof obj === 'object') {
      for (const [k, v] of Object.entries(obj)) {
        const name = `--pds-${group}-${k}`.replace(/[^a-z0-9-_]/gi, '-').toLowerCase();
        parts.push(`  ${name}: ${v};`);
      }
    }
  }
  parts.push('}');
  return parts.join('\n');
}

/**
 * Read config from file and generate modules.
 * @param {string} configPath
 * @param {object} [opts]
 */
export async function generateFromFile(configPath, opts = {}) {
  const txt = await fs.readFile(configPath, 'utf8');
  let cfg;
  try {
    cfg = JSON.parse(txt);
  } catch (e) {
    throw new Error(`Failed to parse config JSON: ${e.message}`);
  }
  return generate(cfg, opts);
}

/**
 * Watch a config file and call the writer on changes.
 * @param {string} configPath
 * @param {string} outDir
 * @param {{onWrite?:Function}} opts
 */
export function watch(configPath, outDir, opts = {}) {
  let timeout = null;
  const onChange = async () => {
    try {
      const result = await generateFromFile(configPath);
      if (opts.onWrite) await opts.onWrite(result.modules, outDir, result.meta);
    } catch (err) {
      console.error('pds watch: generation error', err);
      if (opts.onError) opts.onError(err);
    }
  };

  const watcher = fs.watch(configPath, { persistent: true }, () => {
    if (timeout) clearTimeout(timeout);
    // debounce
    timeout = setTimeout(onChange, 150);
  });

  // initial run
  (async () => { await onChange(); })();

  return {
    close() { watcher.close(); }
  };
}
