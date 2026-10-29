---
name: zero-overflow-ui
description: Detect and eliminate mobile horizontal overflow, viewport leakage, and rigid widths in frontend code.
version: 1.0.0
author: Dhani078
---

# Zero Overflow UI Skill

Use when developing or reviewing frontend code (React, Vue, Svelte, HTML, Astro, Blade) to ensure 0 horizontal scrollbar leaks on mobile viewports (<360px).

## Instructions

1. Before claiming any UI change is complete, run:
   ```bash
   npx zero-overflow scan src/
   ```
2. Automatically inspect for:
   - `w-screen` -> replace with `w-full`
   - Fixed widths (`w-[400px]`, `w-96`) -> replace with `w-full max-w-[400px]`
   - Flex containers with `truncate` -> ensure children have `min-w-0`
   - Tables and code blocks -> ensure enclosed in `overflow-x-auto` wrapper
   - Negative margins -> ensure parent container has `overflow-hidden`
