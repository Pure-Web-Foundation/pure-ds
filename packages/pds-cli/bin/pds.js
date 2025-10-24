#!/usr/bin/env node
import { generateFromFile, generate, watch as watchConfig } from '../../../src/pds-core/pds-api.js';
import { writeFilesAtomic } from '../../../src/lib/fs-writer.js';
import fs from 'fs';
import path from 'path';

function help() {
  console.log(`pds-cli — generate and watch PDS artifacts

Usage:
  pds-cli generate --config ./pds.config.json --out ./public/pds
  pds-cli watch --config ./pds.config.json --out ./public/pds

Options:
  --config <path>   Path to pds.config.json (required)
  --out <dir>       Output directory to write generated files (required)
  --clean           Remove stale files from the output directory
  --help            Show this help
`);
}

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (!next || next.startsWith('--')) {
        args[key] = true;
      } else {
        args[key] = next;
        i++;
      }
    } else {
      args._.push(a);
    }
  }
  return args;
}

async function runGenerate(configPath, outDir, opts = {}) {
  if (!configPath || !outDir) {
    console.error('generate requires --config and --out');
    process.exitCode = 2;
    return;
  }

  try {
    const { modules, meta } = await generateFromFile(configPath);
    // write modules to outDir (atomically). If clean is set, stale files will be removed.
    const res = await writeFilesAtomic(outDir, modules, { clean: !!opts.clean });
    console.log('PDS: generated', Object.keys(modules).length, 'files to', outDir);
    if (res && Array.isArray(res.removed) && res.removed.length) {
      console.log(`PDS: removed ${res.removed.length} stale files`);
      if (opts.verbose) {
        for (const f of res.removed) console.log('  -', f);
      }
    }
    console.log('meta:', meta);
  } catch (err) {
    console.error('PDS generate failed:', err.message || err);
    process.exitCode = 1;
  }
}

async function runWatch(configPath, outDir, opts = {}) {
  if (!configPath || !outDir) {
    console.error('watch requires --config and --out');
    process.exitCode = 2;
    return;
  }

  console.log('PDS watch starting — config:', configPath, 'out:', outDir);

  const watcher = watchConfig(configPath, outDir, {
    onWrite: async (modules, out, meta) => {
      try {
        const res = await writeFilesAtomic(outDir, modules, { clean: !!opts.clean });
        console.log('PDS: wrote', Object.keys(modules).length, 'files at', new Date().toISOString());
        if (res && Array.isArray(res.removed) && res.removed.length) {
          console.log(`PDS: removed ${res.removed.length} stale files`);
          if (opts.verbose) for (const f of res.removed) console.log('  -', f);
        }
      } catch (err) {
        console.error('PDS write failed', err);
      }
    },
    onError: (err) => {
      console.error('PDS watch error', err);
    }
  });

  process.on('SIGINT', () => {
    watcher.close();
    console.log('PDS watch stopped');
    process.exit(0);
  });
}

async function main() {
  const args = parseArgs(process.argv);
  const cmd = args._[0];
  if (!cmd || args.help) {
    help();
    return;
  }

  const configPath = args.config || args.c;
  const outDir = args.out || args.o;

  if (cmd === 'generate') {
    await runGenerate(configPath, outDir, { clean: args.clean });
    return;
  }

  if (cmd === 'watch') {
    await runWatch(configPath, outDir, { clean: args.clean });
    return;
  }

  console.error('Unknown command:', cmd);
  help();
  process.exitCode = 2;
}

main();
