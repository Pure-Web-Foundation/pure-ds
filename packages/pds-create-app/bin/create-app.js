#!/usr/bin/env node

import { mkdir, writeFile, access } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { spawn } from 'child_process';

const CWD = process.cwd();

function log(message) {
  console.log(message);
}

function getNpmCommand() {
  return process.platform === 'win32' ? 'npm.cmd' : 'npm';
}

async function ensureDir(dirPath) {
  await mkdir(dirPath, { recursive: true });
}

function resolveTargetDir() {
  const arg = process.argv[2];
  if (!arg || arg === '.' || arg === './') {
    return CWD;
  }
  return path.resolve(CWD, arg);
}

function getProjectName(targetDir) {
  return path.basename(targetDir).replace(/[^a-z0-9-]/gi, '-').toLowerCase() || 'pds-app';
}

async function writePackageJson(targetDir) {
  const pkgPath = path.join(targetDir, 'package.json');
  try {
    await access(pkgPath);
    throw new Error('package.json already exists');
  } catch (err) {
    if (err?.message === 'package.json already exists') {
      throw err;
    }
  }

  const pkg = {
    name: getProjectName(targetDir),
    private: true,
    scripts: {
      dev: 'node esbuild-dev.js',
      'pds:bootstrap': 'pds-bootstrap'
    }
  };

  await writeFile(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
  log(`✅ Created ${path.relative(CWD, pkgPath)}`);
}

async function runCommand(command, args, cwd) {
  await new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: 'inherit',
      shell: true
    });

    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(' ')} failed (${code})`));
    });
  });
}

async function main() {
  log('\n✨ Create Pure Design System App\n');

  const targetDir = resolveTargetDir();
  if (!existsSync(targetDir)) {
    await ensureDir(targetDir);
  }

  await ensureDir(path.join(targetDir, 'public'));
  await ensureDir(path.join(targetDir, 'public', 'assets'));

  await writePackageJson(targetDir);

  const npmCmd = getNpmCommand();

  log('\n📦 Installing @pure-ds/core...');
  await runCommand(npmCmd, ['install', '@pure-ds/core@latest'], targetDir);

  log('\n⚡ Bootstrapping project...');
  await runCommand(npmCmd, ['run', 'pds:bootstrap'], targetDir);
}

main().catch((err) => {
  console.error('❌ Create app failed:', err?.message || err);
  process.exit(1);
});
