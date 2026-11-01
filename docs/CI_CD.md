**CI/CD Integration: zero-overflow-ui**

Integrate `zero-overflow-ui` into your automated workflows.

**1. GitHub Actions Workflow**

Create `.github/workflows/overflow-check.yml`:

```yaml
name: Zero Overflow Check

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  audit-viewport:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - name: Scan Layouts for Viewport Overflow
        run: npx zero-overflow scan src/
```

**2. Pre-commit Hook (Husky / lint-staged)**

Add to `.husky/pre-commit`:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx zero-overflow scan src/
```
