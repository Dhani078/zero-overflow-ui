# Benchmarks: zero-overflow-ui

Comparison of static template scanning speed against traditional browser-driven visual regression testing.

## Test Environment

* **Hardware**: Intel Core i5-1135G7 @ 2.40GHz, 16GB RAM, Windows 10 x64.
* **Workload**: 250 React TSX components (~42,000 lines of template markup).

| Tool | Approach | Execution Time | Dependencies Installed |
|---|---|---|---|
| **`zero-overflow-ui`** | **Native Static Analysis** | **48 ms** | **0 (0 MB)** |
| Headless Playwright | Browser DOM Audit | 4,280 ms | ~450 MB (Chromium + driver) |
| PostCSS Linter Plugin | Full AST Parse | 610 ms | 18 packages (~25 MB) |

## Key Insights

1. **89x Faster than Headless Browsers**: Eliminates the overhead of launching headless browser instances or virtual DOM rendering for layout regression gating.
2. **Instant Pre-commit Validation**: Developers can run `npx zero-overflow scan src/` in a git pre-commit hook with zero noticeable commit latency.
