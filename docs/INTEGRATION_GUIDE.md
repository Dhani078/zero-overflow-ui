**Integration Guide**

How to integrate `zero-overflow-ui` into modern web development stacks.

**1. Next.js (App Router / Pages Router)**

Add check to pre-build script in `package.json`:

```json
{
  "scripts": {
    "lint": "next lint && zero-overflow scan app/ components/",
    "build": "zero-overflow scan app/ components/ && next build"
  }
}
```

**2. Vite / React / Vue / Svelte**

Run scanner during development linting:

```json
{
  "scripts": {
    "dev": "vite",
    "check:viewport": "zero-overflow scan src/",
    "build": "zero-overflow scan src/ && tsc && vite build"
  }
}
```

**3. Astro**

Ensure all `.astro` and markdown components respect viewport rules:

```bash
npx zero-overflow scan src/pages/ src/components/
```

**4. Laravel Blade**

Inspect all Blade template views for accidental rigid layout overflow:

```bash
npx zero-overflow scan resources/views/
```

**5. GitHub Actions Workflow**

Add `.github/workflows/viewport-guard.yml`:

```yaml
name: Viewport Overflow Guard

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  viewport-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - name: Scan Viewport Leaks
        run: npx zero-overflow scan src/
```

**6. GitLab CI**

Add to `.gitlab-ci.yml`:

```yaml
viewport_lint:
  image: node:22-alpine
  stage: test
  script:
    - npx zero-overflow scan src/
```
