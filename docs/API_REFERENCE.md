**API Reference**

`zero-overflow-ui` provides a clean, zero-dependency Node.js API for programmatic scanning and viewport verification.

**Installation**

```bash
npm install --save-dev zero-overflow-ui
```

**Import**

```javascript
import { scanFile, scanDirectory, loadConfig } from "zero-overflow-ui";
```

**Functions**

**`loadConfig(cwd?: string): Config`**
Loads `.overflowrc.json` from the specified working directory if present.

- **Parameters**: `cwd` (string, optional, defaults to `process.cwd()`)
- **Returns**: `Config` object

```javascript
const config = loadConfig();
// { ignoreRules: ["w-screen"], ignorePaths: ["legacy/"] }
```

**`scanFile(filePath: string, config?: Config): IssueResult[]`**
Scans a single file against all active overflow rules.

- **Parameters**:
  - `filePath` (string): Absolute or relative path to target file
  - `config` (Config, optional): Configuration overrides
- **Returns**: Array of `IssueResult` objects

```javascript
const issues = scanFile("src/components/Header.jsx");
console.log(issues);
```

**`scanDirectory(dirPath: string, config?: Config): IssueResult[]`**
Recursively traverses a directory and scans all supported frontend files (`.html`, `.jsx`, `.tsx`, `.vue`, `.svelte`, `.astro`, `.php`, `.blade.php`).

- **Parameters**:
  - `dirPath` (string): Path to root directory
  - `config` (Config, optional): Configuration overrides
- **Returns**: Array of `IssueResult` objects

```javascript
const issues = scanDirectory("src/", {
  ignoreRules: ["negative-margin"],
  ignorePaths: ["src/vendor/"]
});
```

**Types**

**`IssueResult`**
```typescript
interface IssueResult {
  file: string;
  line: number;
  ruleId: string;
  name: string;
  severity: "error" | "warning";
  token: string;
  detail: string;
  fix: string;
  snippet: string;
}
```

**`Config`**
```typescript
interface Config {
  ignoreRules?: string[];
  ignorePaths?: string[];
}
```
