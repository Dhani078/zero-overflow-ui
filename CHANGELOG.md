# Changelog

All notable changes to `zero-overflow-ui` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-10-29

### Added
* Initial release of `zero-overflow-ui`.
* Zero-dependency CLI scanner (`npx zero-overflow scan [dir|file]`).
* Core rule: `viewport-width-leak` (detects and flags `w-screen` / `min-w-screen`).
* Core rule: `fixed-width-overflow` (detects hardcoded pixel widths >= 360px without responsive wrappers).
* Core rule: `flex-truncate-leak` (detects missing `min-w-0` on flex items with `truncate`).
* Core rule: `table-pre-unwrapped` (flags uncontained `<table>` and `<pre>` elements).
* Core rule: `negative-margin-leak` (detects unclipped base `-mx-*` negative margins).
* Built-in support for `.html`, `.jsx`, `.tsx`, `.vue`, `.svelte`, `.astro`, and `.blade.php`.
* Complete test suite using native `node:assert`.
* Agent skill definition in `SKILL.md`.
