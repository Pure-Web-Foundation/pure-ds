#!/usr/bin/env node

import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { runLiveImport, listLiveTemplates, getLiveImportSources } from '../../../src/js/pds-live-manager/import-service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function help() {
  console.log(`pds-import — Import and convert external design inputs for PDS

Usage:
  pds-import --type tailwind-html --source ./input.html --out ./pds-import.json
  pds-import --type brand-guidelines --source ./brand.txt --out ./brand-import.json
  pds-import --type template --template marketing-hero --out ./template-import.json

Options:
  --type <value>       Import type: tailwind-html | brand-guidelines | template
  --source <path>      Source file path for tailwind-html or brand-guidelines
  --text <value>       Inline input text instead of source file
  --template <id>      Template id when --type=template
  --config <path>      Optional PDS config file (.json/.js/.mjs) to govern conversion rules
  --describe-rules     Print Tailwind→PDS conversion rulebook and exit
  --out <path>         Output JSON file path (required)
  --list               List available sources and templates
  --help               Show this help message
`);
}

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 2; i < argv.length; i += 1) {
    const current = argv[i];
    if (current.startsWith('--')) {
      const key = current.slice(2);
      const next = argv[i + 1];
      if (!next || next.startsWith('--')) {
        args[key] = true;
      } else {
        args[key] = next;
        i += 1;
      }
    } else {
      args._.push(current);
    }
  }
  return args;
}

async function loadInput(args) {
  if (typeof args.text === 'string') return args.text;
  if (typeof args.source === 'string') {
    const sourcePath = path.resolve(process.cwd(), args.source);
    return readFile(sourcePath, 'utf8');
  }
  return '';
}

async function loadConfig(args) {
  if (typeof args.config !== 'string' || !args.config.trim()) return null;

  const configPath = path.resolve(process.cwd(), args.config);
  const ext = path.extname(configPath).toLowerCase();

  if (ext === '.json') {
    const raw = await readFile(configPath, 'utf8');
    return JSON.parse(raw);
  }

  if (ext === '.js' || ext === '.mjs' || ext === '.cjs') {
    const mod = await import(pathToFileURL(configPath).href);
    return mod?.config || mod?.default || null;
  }

  throw new Error('Unsupported --config format. Use .json, .js, .mjs, or .cjs');
}

async function main() {
  const args = parseArgs(process.argv);

  if (args.help) {
    help();
    return;
  }

  if (args.list) {
    console.log('Sources:');
    getLiveImportSources().forEach((source) => {
      console.log(`- ${source.id}: ${source.name}`);
    });
    console.log('Templates:');
    (await listLiveTemplates()).forEach((template) => {
      console.log(`- ${template.id}: ${template.name} [${template.icon || 'layout'}]`);
      if (template.description) {
        console.log(`  ${template.description}`);
      }
    });
    return;
  }

  if (args['describe-rules']) {
    const rulesPath = path.resolve(__dirname, '../../../src/js/pds-live-manager/tailwind-conversion-rules.json');
    const rulesJson = await readFile(rulesPath, 'utf8');
    console.log(rulesJson);
    return;
  }

  const type = String(args.type || '').trim();
  const outPath = String(args.out || '').trim();

  if (!type || !outPath) {
    console.error('❌ Missing required arguments --type and --out');
    help();
    process.exitCode = 2;
    return;
  }

  const request = {
    sourceType: type,
    templateId: args.template,
    input: await loadInput(args),
    config: await loadConfig(args),
    cwd: process.cwd(),
    caller: path.relative(process.cwd(), __dirname),
  };

  const result = await runLiveImport(request);
  const absOutPath = path.resolve(process.cwd(), outPath);

  await writeFile(absOutPath, JSON.stringify(result, null, 2) + '\n', 'utf8');
  console.log(`✅ Wrote import result to ${absOutPath}`);

  const issueCount = Array.isArray(result?.issues) ? result.issues.length : 0;
  console.log(`ℹ️ confidence=${Math.round((result?.confidence || 0) * 100)}% issues=${issueCount}`);
}

main().catch((error) => {
  console.error('❌ pds-import failed:', error?.message || error);
  process.exit(1);
});
