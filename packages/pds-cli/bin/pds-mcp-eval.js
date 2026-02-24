#!/usr/bin/env node

import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createPdsMcpContext, runPdsMcpTool } from '../lib/pds-mcp-core.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function loadCases(filePath) {
  const raw = await readFile(filePath, 'utf8');
  const json = JSON.parse(raw);
  return Array.isArray(json) ? json : [];
}

function hasPath(objectValue, dotPath) {
  if (!dotPath) return true;
  const parts = dotPath.split('.');
  let current = objectValue;
  for (const part of parts) {
    if (!current || typeof current !== 'object' || !(part in current)) return false;
    current = current[part];
  }
  return true;
}

async function runCase(ctx, testCase) {
  const result = await runPdsMcpTool(ctx, testCase.tool, testCase.args || {});
  const checks = testCase.expect?.paths || [];
  const failures = checks.filter((checkPath) => !hasPath(result, checkPath));
  return {
    id: testCase.id,
    tool: testCase.tool,
    pass: failures.length === 0,
    failures,
  };
}

async function main() {
  const args = process.argv.slice(2);
  const caseFileArgIndex = args.findIndex((arg) => arg === '--cases');
  const caseFilePath = caseFileArgIndex > -1
    ? path.resolve(process.cwd(), args[caseFileArgIndex + 1])
    : path.resolve(__dirname, '../lib/pds-mcp-eval-cases.json');

  const ctx = createPdsMcpContext({ projectRoot: process.cwd() });
  const cases = await loadCases(caseFilePath);
  if (cases.length === 0) {
    console.error('No evaluation cases found.');
    process.exit(1);
  }

  const results = [];
  for (const testCase of cases) {
    // eslint-disable-next-line no-await-in-loop
    const outcome = await runCase(ctx, testCase);
    results.push(outcome);
  }

  const passed = results.filter((r) => r.pass).length;
  const failed = results.length - passed;

  console.log(`PDS MCP Eval (${results.length} cases)`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);

  if (failed > 0) {
    console.log('');
    for (const result of results.filter((r) => !r.pass)) {
      console.log(`- ${result.id} (${result.tool}) failed checks: ${result.failures.join(', ')}`);
    }
    process.exit(2);
  }
}

main().catch((error) => {
  console.error('MCP eval failed:', error?.message || error);
  process.exit(1);
});
