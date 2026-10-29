import fs from "node:fs";
import path from "node:path";
import { RULES } from "./rules.js";

const VALID_EXTS = new Set([
  ".html", ".htm", ".jsx", ".tsx", ".vue", ".svelte", ".astro", ".php", ".blade.php"
]);

const IGNORE_DIRS = new Set([
  "node_modules", ".git", "dist", "build", ".next", ".nuxt", "coverage", "vendor"
]);

export function scanFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split(/\r?\n/);
  const issues = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith("//") || line.trim().startsWith("/*")) continue;

    for (const rule of RULES) {
      const result = rule.check(line);
      if (result) {
        issues.push({
          file: filePath,
          line: i + 1,
          ruleId: rule.id,
          severity: rule.severity,
          name: rule.name,
          token: result.token,
          detail: result.detail || rule.description,
          fix: rule.fix,
          snippet: line.trim()
        });
      }
    }
  }

  return issues;
}

export function scanDirectory(dirPath) {
  const allIssues = [];
  function traverse(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        if (!IGNORE_DIRS.has(entry.name)) {
          traverse(fullPath);
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (VALID_EXTS.has(ext) || entry.name.endsWith(".blade.php")) {
          allIssues.push(...scanFile(fullPath));
        }
      }
    }
  }

  traverse(dirPath);
  return allIssues;
}
