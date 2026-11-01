**CLI Usage**

`zero-overflow-ui` can be executed directly with `npx` or as an npm script without pre-installing dependencies.

**Syntax**

```bash
npx zero-overflow [command] [target-path] [options]
```

**Commands**

- `scan [path]`: Scans a directory or specific file for viewport overflow risks. Defaults to current directory (`.`).
- `--help`, `-h`: Display command line help and usage instructions.

**Examples**

**Scan whole project**
```bash
npx zero-overflow scan src/
```

**Scan specific component**
```bash
npx zero-overflow scan src/components/HeroBanner.tsx
```

**Scan with package.json script**
Add to your `package.json`:
```json
{
  "scripts": {
    "lint:viewport": "zero-overflow scan src/"
  }
}
```
Run with:
```bash
npm run lint:viewport
```

**Exit Codes**

- `0`: No error-level issues detected (clean viewport).
- `1`: At least one error-level issue detected (breaks CI build).

**Configuration File (`.overflowrc.json`)**

Place `.overflowrc.json` in your project root to customize rule behavior:

```json
{
  "ignoreRules": [
    "negative-margin"
  ],
  "ignorePaths": [
    "src/legacy",
    "dist"
  ]
}
```

**Pre-commit Integration**

With Husky (`.husky/pre-commit`):
```bash
#!/bin/sh
npx zero-overflow scan src/
```
