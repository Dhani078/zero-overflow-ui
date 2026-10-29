#!/usr/bin/env node

import path from "node:path";
import fs from "node:fs";
import { scanFile, scanDirectory } from "../src/scanner.js";

const args = process.argv.slice(2);
const command = args[0] || "scan";
const targetPath = args[1] || ".";

function printUsage() {
  console.log(`
zero-overflow-ui - Static scanner preventing mobile horizontal overflow.

Usage:
  npx zero-overflow scan [dir|file]
  npx zero-overflow --help
`);
}

if (args.includes("-h") || args.includes("--help")) {
  printUsage();
  process.exit(0);
}

const resolvedPath = path.resolve(process.cwd(), targetPath);

if (!fs.existsSync(resolvedPath)) {
  console.error(`Error: Path '${resolvedPath}' does not exist.`);
  process.exit(1);
}

const stat = fs.statSync(resolvedPath);
console.log(`\nScanning for viewport overflow in: ${resolvedPath}`);

const issues = stat.isDirectory()
  ? scanDirectory(resolvedPath)
  : scanFile(resolvedPath);

if (issues.length === 0) {
  console.log("\x1b[32m✔ 0 horizontal overflow issues detected. Clean viewport.\x1b[0m\n");
  process.exit(0);
}

console.log(`\x1b[31mFound ${issues.length} potential overflow issue(s):\x1b[0m\n`);

let errorsCount = 0;
for (const issue of issues) {
  if (issue.severity === "error") errorsCount++;
  const color = issue.severity === "error" ? "\x1b[31m" : "\x1b[33m";
  console.log(`${color}[${issue.severity.toUpperCase()}]\x1b[0m ${issue.file}:${issue.line}`);
  console.log(`  Rule   : ${issue.name} (${issue.ruleId})`);
  console.log(`  Token  : \x1b[4m${issue.token}\x1b[0m`);
  console.log(`  Detail : ${issue.detail}`);
  console.log(`  Fix    : \x1b[36m${issue.fix}\x1b[0m`);
  console.log(`  Code   : ${issue.snippet}\n`);
}

console.log(`Summary: ${errorsCount} error(s), ${issues.length - errorsCount} warning(s).`);
process.exit(errorsCount > 0 ? 1 : 0);
