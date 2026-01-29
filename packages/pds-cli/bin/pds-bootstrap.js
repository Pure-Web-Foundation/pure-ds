#!/usr/bin/env node

import { readFile, writeFile, mkdir, access, rename, rm, copyFile, readdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const projectRoot = process.cwd();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const templateRoot = path.join(__dirname, 'templates', 'bootstrap');

function log(message) {
  console.log(message);
}

async function ensureDir(dirPath) {
  await mkdir(dirPath, { recursive: true });
}

async function writeFileIfMissing(filePath, content) {
  try {
    await access(filePath);
    log(`↪️  Skipping existing ${path.relative(projectRoot, filePath)}`);
    return false;
  } catch {
    await ensureDir(path.dirname(filePath));
    await writeFile(filePath, content, 'utf8');
    log(`✅ Created ${path.relative(projectRoot, filePath)}`);
    return true;
  }
}

async function copyFileIfMissing(sourcePath, targetPath) {
  try {
    await access(targetPath);
    log(`↪️  Skipping existing ${path.relative(projectRoot, targetPath)}`);
    return false;
  } catch {
    await ensureDir(path.dirname(targetPath));
    await copyFile(sourcePath, targetPath);
    log(`✅ Created ${path.relative(projectRoot, targetPath)}`);
    return true;
  }
}

function getNpmCommand() {
  return process.platform === 'win32' ? 'npm.cmd' : 'npm';
}

async function getPdsCoreVersion() {
  try {
    const pkgPath = path.join(projectRoot, 'node_modules', '@pure-ds', 'core', 'package.json');
    const raw = await readFile(pkgPath, 'utf8');
    const pkg = JSON.parse(raw);
    return pkg?.version || 'unknown';
  } catch {
    return 'unknown';
  }
}

async function readPackageJson() {
  const pkgPath = path.join(projectRoot, 'package.json');
  const raw = await readFile(pkgPath, 'utf8');
  return { pkgPath, pkg: JSON.parse(raw) };
}

async function writePackageJson(pkgPath, pkg) {
  await writeFile(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
}

async function writeIndexFromTemplate(sourcePath, targetPath, { version, generatedAt }) {
  const raw = await readFile(sourcePath, 'utf8');
  const content = raw
    .replaceAll('{{PDS_VERSION}}', version)
    .replaceAll('{{PDS_GENERATED_AT}}', generatedAt);
  await writeFileIfMissing(targetPath, content);
}

async function copyTemplateDirectory(sourceDir, targetDir, options) {
  const entries = await readdir(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);
    const relativePath = path.relative(templateRoot, sourcePath);

    if (entry.isDirectory()) {
      await ensureDir(targetPath);
      await copyTemplateDirectory(sourcePath, targetPath, options);
      continue;
    }

    if (relativePath === path.join('public', 'index.html')) {
      await writeIndexFromTemplate(sourcePath, targetPath, options);
      continue;
    }

    if (relativePath === 'esbuild-dev.cjs' || relativePath === 'esbuild-dev.mjs') {
      continue;
    }

    await copyFileIfMissing(sourcePath, targetPath);
  }
}

async function copyBootstrapTemplate({ version, generatedAt, isModule }) {
  await copyTemplateDirectory(templateRoot, projectRoot, { version, generatedAt });

  const esbuildCjsSource = path.join(templateRoot, 'esbuild-dev.cjs');
  const esbuildCjsTarget = path.join(projectRoot, 'esbuild-dev.cjs');
  await copyFileIfMissing(esbuildCjsSource, esbuildCjsTarget);

  const esbuildMjsSource = path.join(templateRoot, 'esbuild-dev.mjs');
  const esbuildMjsTarget = path.join(projectRoot, 'esbuild-dev.mjs');
  await copyFileIfMissing(esbuildMjsSource, esbuildMjsTarget);

  const esbuildJsTarget = path.join(projectRoot, 'esbuild-dev.js');
  const esbuildJsSource = isModule ? esbuildMjsSource : esbuildCjsSource;
  await copyFileIfMissing(esbuildJsSource, esbuildJsTarget);
}

async function ensurePackageScripts(pkg, pkgPath) {
  pkg.scripts = pkg.scripts || {};
  let changed = false;

  const devScript = pkg.scripts.dev;
  const devScriptMatch = typeof devScript === 'string'
    ? devScript.match(/esbuild-dev\.(mjs|cjs|js)/)
    : null;
  const devScriptFile = devScriptMatch?.[0];
  const devScriptMissing = devScriptFile
    ? !existsSync(path.join(projectRoot, devScriptFile))
    : false;

  if (!devScript || devScriptMissing) {
    const candidates = ['esbuild-dev.js', 'esbuild-dev.mjs', 'esbuild-dev.cjs'];
    const available = candidates.find((file) => existsSync(path.join(projectRoot, file)));
    pkg.scripts.dev = `node ${available || 'esbuild-dev.cjs'}`;
    changed = true;
  }

  if (!pkg.scripts['pds:bootstrap']) {
    pkg.scripts['pds:bootstrap'] = 'pds-bootstrap';
    changed = true;
  }

  if (changed) {
    await writePackageJson(pkgPath, pkg);
    log('✅ Updated package.json scripts');
  } else {
    log('↪️  package.json scripts already configured');
  }
}

async function ensureEsbuildDependency(pkg, pkgPath) {
  const version = '^0.19.0';
  const hasDev = pkg.devDependencies && pkg.devDependencies.esbuild;
  const hasDep = pkg.dependencies && pkg.dependencies.esbuild;

  if (hasDev || hasDep) {
    log('↪️  esbuild already installed');
    return false;
  }

  const npmCmd = getNpmCommand();
  log('📦 Installing esbuild...');

  await new Promise((resolve, reject) => {
    const child = spawn(npmCmd, ['install', '--save-dev', `esbuild@${version}`], {
      cwd: projectRoot,
      stdio: 'inherit',
      shell: true
    });

    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`npm install failed with code ${code}`));
    });
  });

  const updated = JSON.parse(await readFile(pkgPath, 'utf8'));
  Object.assign(pkg, updated);
  return true;
}

async function runDevServer() {
  const npmCmd = getNpmCommand();
  log('🚀 Starting dev server...');

  await new Promise((resolve, reject) => {
    const child = spawn(npmCmd, ['run', 'dev'], {
      cwd: projectRoot,
      stdio: 'inherit',
      shell: true
    });

    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`npm run dev exited with code ${code}`));
    });
  });
}

async function ensurePdsAssets() {
  const pdsAssetsDir = path.join(projectRoot, 'public', 'assets', 'pds');
  const repoAssetsDir = path.join(projectRoot, 'assets', 'pds');
  const repoAssetsRoot = path.join(projectRoot, 'assets');
  const repoInstallJson = path.join(repoAssetsRoot, '.pds-install.json');
  const publicAssetsRoot = path.join(projectRoot, 'public', 'assets');
  const publicInstallJson = path.join(publicAssetsRoot, '.pds-install.json');

  const normalizeAssetsLocation = async () => {
    if (!existsSync(repoAssetsDir)) return;

    if (!existsSync(pdsAssetsDir)) {
      await ensureDir(path.dirname(pdsAssetsDir));
      await rename(repoAssetsDir, pdsAssetsDir);
      log('✅ Moved assets/pds to public/assets/pds');
      return true;
    }

    await rm(repoAssetsDir, { recursive: true, force: true });
    log('🧹 Removed duplicate assets/pds folder');
    return false;
  };

  const moveInstallJson = async () => {
    if (!existsSync(repoInstallJson)) return;
    await ensureDir(publicAssetsRoot);
    await rename(repoInstallJson, publicInstallJson);
    log('✅ Moved assets/.pds-install.json to public/assets/.pds-install.json');
  };

  const cleanupAssetsRoot = async () => {
    if (!existsSync(repoAssetsRoot)) return;
    const remaining = ['pds', '.pds-install.json']
      .map((name) => path.join(repoAssetsRoot, name))
      .filter((target) => existsSync(target));
    if (remaining.length === 0) {
      await rm(repoAssetsRoot, { recursive: true, force: true });
      log('🧹 Removed root assets folder');
    }
  };

  const movedAssets = await normalizeAssetsLocation();
  await moveInstallJson();
  await cleanupAssetsRoot();
  if (movedAssets) {
    return;
  }

  if (existsSync(pdsAssetsDir)) {
    log('↪️  public/assets/pds already present');
    return;
  }

  const npmCmd = getNpmCommand();
  log('🎨 Building PDS static assets (pds:build)...');

  await new Promise((resolve, reject) => {
    const child = spawn(npmCmd, ['run', 'pds:build'], {
      cwd: projectRoot,
      stdio: 'inherit',
      shell: true
    });

    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`npm run pds:build exited with code ${code}`));
    });
  });

  await normalizeAssetsLocation();
  await moveInstallJson();
  await cleanupAssetsRoot();
}

async function main() {
  log('\n⚡ PDS Bootstrap\n');

  const { pkgPath, pkg } = await readPackageJson();
  const isModule = pkg.type === 'module';

  await ensureEsbuildDependency(pkg, pkgPath);

  const version = await getPdsCoreVersion();
  const generatedAt = new Date().toLocaleString();

  await copyBootstrapTemplate({ version, generatedAt, isModule });

  await ensurePackageScripts(pkg, pkgPath);

  await ensurePdsAssets();

  log('\n✅ Bootstrap files ready.\n');
  await runDevServer();
}

main().catch((err) => {
  console.error('❌ Bootstrap failed:', err?.message || err);
  process.exit(1);
});
