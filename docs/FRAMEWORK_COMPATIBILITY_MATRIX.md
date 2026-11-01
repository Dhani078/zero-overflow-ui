Framework Compatibility Matrix: zero-overflow-ui

Compatibility verification across modern web frameworks and templating languages.

| Framework / Engine | File Extensions | Supported | Verification Status | Notes |
| :--- | :--- | :--- | :--- | :--- |
| Tailwind CSS v3 & v4 | `.jsx`, `.tsx`, `.html` | Full | Verified (v1.0.1) | Supports arbitrary value syntax `w-[...px]` and default utilities. |
| Next.js (App & Pages) | `.tsx`, `.jsx`, `.js` | Full | Verified (v1.0.1) | Scans `app/`, `pages/`, `components/` trees. |
| Vite + React / Vue | `.jsx`, `.tsx`, `.vue` | Full | Verified (v1.0.1) | Scans `<template>` sections in Vue SFCs and JSX. |
| Svelte & SvelteKit | `.svelte` | Full | Verified (v1.0.1) | Parses template markup directly. |
| Astro | `.astro` | Full | Verified (v1.0.1) | Analyzes Astro frontmatter and component markup. |
| Laravel Blade | `.blade.php` | Full | Verified (v1.0.1) | Handles Blade template directives and HTML elements. |
| Plain HTML / Web Components | `.html`, `.htm` | Full | Verified (v1.0.1) | Scans static HTML pages and web component templates. |

Unsupported File Types (By Design)

- `.css`, `.scss`, `.less` (Global stylesheets without markup context).
- `.json`, `.yaml` (Configuration data).
- `.md`, `.mdx` (Markdown files without raw template markup).
