Roadmap

Planned developments for `zero-overflow-ui`.

v1.0.0 (Current)
- Core static regex scanner.
- 5 core overflow rules (`w-screen`, `rigid-width`, `flex-truncate`, `unwrapped-pre-table`, `negative-margin`).
- Zero dependencies, Node.js native execution.
- Configurable `.overflowrc.json`.
- GitHub Action integration.

v1.1.0 (Upcoming)
- `--format=json` and `--format=sarif` CLI output options for security and code quality dashboards.
- Support for inline comment disable flags: `/* zero-overflow-disable w-screen */`.
- Auto-fix flag (`--fix`) for trivial transformations (`w-screen` -> `w-full`).

v1.2.0
- Detection for grid template columns with fixed pixel track sizes (`grid-cols-[300px_1fr]`).
- Detection for absolute/fixed positioned elements missing `left-0 right-0` or `inset-x-0` bounds.

v2.0.0
- Optional headless browser test runner using CDP/Playwright to verify live rendered layout box models at 360px viewport width.
