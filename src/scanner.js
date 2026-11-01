import fs from "node:fs";
import path from "node:path";
import { RULES } from "./rules.js";

const DEFAULT_EXTS = new Set([
  ".html", ".htm", ".jsx", ".tsx", ".vue", ".svelte", ".astro", ".php", ".blade.php"
]);

const DEFAULT_IGNORES = new Set([
  "node_modules", ".git", "dist", "build", ".next", ".nuxt", "coverage", "vendor"
]);

export function loadConfig(cwd = process.cwd()) {
  const configPath = path.join(cwd, ".overflowrc.json");
  if (fs.existsSync(configPath)) {
    try {
      return JSON.parse(fs.readFileSync(configPath, "utf-8"));
    } catch {
      return {};
    }
  }
  return {};
}

export function scanFile(filePath, config = {}) {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split(/\r?\n/);
  const issues = [];
  const ignoredRules = new Set(config.ignoreRules || []);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith("//") || line.trim().startsWith("/*")) continue;

    for (const rule of RULES) {
      if (ignoredRules.has(rule.id)) continue;
      const result = rule.check(line, i, lines);
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

export function scanDirectory(dirPath, config = {}) {
  const allIssues = [];
  const ignoreSet = new Set([...DEFAULT_IGNORES, ...(config.ignorePaths || [])]);

  function traverse(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      if (ignoreSet.has(entry.name)) continue;
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        traverse(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (DEFAULT_EXTS.has(ext) || entry.name.endsWith(".blade.php")) {
          allIssues.push(...scanFile(fullPath, config));
        }
      }
    }
  }

  traverse(dirPath);
  return allIssues;
}
