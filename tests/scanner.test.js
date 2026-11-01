import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { scanFile, scanDirectory, loadConfig } from "../src/scanner.js";

const tmpFile = path.resolve("./tests/fixture.html");
const safeFile = path.resolve("./tests/safe.html");
const bladeFile = path.resolve("./tests/component.blade.php");

const sampleCode = `
<div class="w-screen bg-black">
  <div class="w-[500px] flex">
    <span class="flex-1 truncate">Long text</span>
  </div>
  <table class="table-auto">
    <tr><td>Data</td></tr>
  </table>
  <div class="-mx-6">Overflow margin</div>
</div>
`;

const safeCode = `
<div class="w-full max-w-7xl mx-auto overflow-hidden">
  <div class="w-full md:w-[500px] flex">
    <span class="flex-1 min-w-0 truncate">Safe text</span>
  </div>
  <div class="w-full overflow-x-auto">
    <table class="table-auto"><tr><td>Data</td></tr></table>
  </div>
  <div class="overflow-hidden"><div class="-mx-4">Clipped margin</div></div>
</div>
`;

const bladeCode = `
<div class="w-screen">
  {{ $slot }}
</div>
`;

fs.writeFileSync(tmpFile, sampleCode);
fs.writeFileSync(safeFile, safeCode);
fs.writeFileSync(bladeFile, bladeCode);

try {
  // Test 1: Flag violations
  const issues = scanFile(tmpFile);
  assert.strictEqual(issues.length >= 4, true, `Expected >= 4 issues, got ${issues.length}`);
  const ruleIds = issues.map(i => i.ruleId);
  assert.ok(ruleIds.includes("viewport-width-leak"));
  assert.ok(ruleIds.includes("fixed-width-overflow"));
  assert.ok(ruleIds.includes("flex-truncate-leak"));
  assert.ok(ruleIds.includes("table-pre-unwrapped"));

  // Test 2: Safe templates must return 0 violations
  const safeIssues = scanFile(safeFile);
  assert.strictEqual(safeIssues.length, 0, `Expected 0 issues on safe markup, got ${safeIssues.length}`);

  // Test 3: Laravel Blade template scanning
  const bladeIssues = scanFile(bladeFile);
  assert.strictEqual(bladeIssues.length, 1);
  assert.strictEqual(bladeIssues[0].ruleId, "viewport-width-leak");

  // Test 4: Ignore rules via config
  const filtered = scanFile(tmpFile, { ignoreRules: ["viewport-width-leak", "fixed-width-overflow"] });
  const filteredIds = filtered.map(i => i.ruleId);
  assert.strictEqual(filteredIds.includes("viewport-width-leak"), false);
  assert.strictEqual(filteredIds.includes("fixed-width-overflow"), false);

  // Test 5: Commented lines ignored
  const commentFile = path.resolve("./tests/comment.html");
  fs.writeFileSync(commentFile, "<!-- <div class='w-screen'> -->\n// const w = 'w-screen';");
  const commentIssues = scanFile(commentFile);
  fs.unlinkSync(commentFile);
  assert.strictEqual(commentIssues.length, 0);

  console.log("All zero-overflow-ui tests passed (Positive, Negative & Edge suites)!");
} finally {
  if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
  if (fs.existsSync(safeFile)) fs.unlinkSync(safeFile);
  if (fs.existsSync(bladeFile)) fs.unlinkSync(bladeFile);
}
