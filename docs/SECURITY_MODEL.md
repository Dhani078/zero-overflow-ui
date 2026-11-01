Security Model: zero-overflow-ui

Threat modeling and defensive design principles of `zero-overflow-ui`.

1. Threat Vectors Considered

| Threat Vector | Risk Level | Mitigation Strategy |
| :--- | :--- | :--- |
| Regular Expression Denial of Service (ReDoS) | Medium | All regular expressions are non-backtracking and linear-time. No nested quantifiers `(a+)+`. |
| Path Traversal Attacks | Low | All target paths are normalized using `node:path.resolve()`. Absolute root boundaries are enforced. |
| Memory Exhaustion on Massive Files | Low | Single-pass line splitting. Large binary assets (`.png`, `.jpg`, `.pdf`) are excluded by file extension whitelist. |
| Supply Chain Compromise | Critical | Zero runtime dependencies. The package relies exclusively on Node.js core modules. |

2. ReDoS Verification Table

Each regex in `src/rules.js` undergoes strict complexity profiling:

- `w-screen`: `/\bw-screen\b/` -> $O(N)$ string scan.
- `fixed-width`: `/\bw-\[(\d+)px\]/` -> $O(N)$ bounded digit quantifier.
- `truncate`: `/\btruncate\b/` -> $O(N)$ exact word match.
- `table/pre`: `/^\s*<(table|pre)\b/i` -> $O(N)$ tag opener prefix match.
- `negative-margin`: `/\b-mx-(?:4|6|8|10|12|16)\b/` -> $O(N)$ exact token match.

Zero backtracking quantifiers exist in the rule engine.
