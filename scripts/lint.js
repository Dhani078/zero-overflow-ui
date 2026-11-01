#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(".");
const DIRS_TO_CHECK = ["src", "bin", "tests", "docs"];
const MAX_LOC = 200;
const FORBIDDEN_WORDS = ["claude", "gemini", "chatgpt", "hermes"];

let errors = 0;

function checkFile(filePath) {
  const relPath = path.relative(ROOT, filePath);
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split(/\r?\n/);

  // 1. Syntax check on JS
  if (filePath.endsWith(".js")) {
    try {
      execFileSync(process.execPath, ["--check", filePath], { stdio: "pipe" });
    } catch (e) {
      console.error(`[SYNTAX ERROR] ${relPath}`);
      errors++;
    }

    // 2. LOC check on source & bin
    if ((relPath.startsWith("src") || relPath.startsWith("bin")) && lines.length > MAX_LOC) {
      console.error(`[LOC EXCEEDED] ${relPath}: ${lines.length} lines > ${MAX_LOC} limit`);
      errors++;
    }
  }

  // 3. Em-dash check
  if (content.includes("—")) {
    console.error(`[EM-DASH DETECTED] ${relPath} contains em-dash`);
    errors++;
  }

  // 4. Forbidden keywords check
  const lower = content.toLowerCase();
  for (const word of FORBIDDEN_WORDS) {
    if (lower.includes(word)) {
      console.error(`[FORBIDDEN KEYWORD] ${relPath} contains '${word}'`);
      errors++;
    }
  }
}

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.isFile()) {
      checkFile(full);
    }
  }
}

for (const dir of DIRS_TO_CHECK) {
  walk(path.join(ROOT, dir));
}

if (errors > 0) {
  console.error(`\nLint failed with ${errors} violation(s).`);
  process.exit(1);
} else {
  console.log("✔ All files pass quality standards (0 syntax errors, <=200 LOC, 0 em-dash, 0 forbidden keywords).");
  process.exit(0);
}
