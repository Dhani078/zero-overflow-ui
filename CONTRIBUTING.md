# Contributing to zero-overflow-ui

Thank you for contributing to `zero-overflow-ui`. We maintain strict architectural standards to ensure zero external runtime dependencies and sub-second execution speeds.

## Core Principles

1. **Zero Runtime Dependencies**: All features must rely solely on native Node.js standard libraries (`node:fs`, `node:path`, `node:process`). No third-party packages in `dependencies`.
2. **Maximum 200 Lines of Code Per File**: Modules must be modular, single-purpose, and maintainable.
3. **Deterministic Performance**: Static scanning must finish in under 200ms on a repository with 500 template files.
4. **Actionable Remediation**: Every rule must provide an explicit, unambiguous fix recommendation.

## Development Workflow

1. Clone and navigate to repo:
   ```bash
   git clone https://github.com/Dhani078/zero-overflow-ui.git
   cd zero-overflow-ui
   ```
2. Run test suite:
   ```bash
   npm test
   ```
3. Add or modify rules in `src/rules.js`.
4. Ensure new rules have unit test assertions in `tests/scanner.test.js`.
5. Submit a pull request.
