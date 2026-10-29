import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { scanFile } from "../src/scanner.js";

const tmpFile = path.resolve("./tests/fixture.html");
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

fs.writeFileSync(tmpFile, sampleCode);

try {
  const issues = scanFile(tmpFile);
  assert.strictEqual(issues.length >= 4, true, `Expected >= 4 issues, got ${issues.length}`);
  const ruleIds = issues.map(i => i.ruleId);
  assert.ok(ruleIds.includes("viewport-width-leak"));
  assert.ok(ruleIds.includes("fixed-width-overflow"));
  assert.ok(ruleIds.includes("flex-truncate-leak"));
  assert.ok(ruleIds.includes("table-pre-unwrapped"));
  console.log("All zero-overflow-ui tests passed!");
} finally {
  if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
}
