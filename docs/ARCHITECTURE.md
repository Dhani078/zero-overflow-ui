# Architecture: zero-overflow-ui

## Overview

`zero-overflow-ui` is built with a zero-dependency static analysis architecture. It parses frontend templates line-by-line, matching layout-breaking CSS declarations and Tailwind utility classes against a deterministic violation taxonomy.

## System Architecture Diagram

```mermaid
flowchart TD
    A[Frontend Source Files<br/>.html, .jsx, .tsx, .vue, .svelte, .astro, .blade.php] --> B[File Traversal Engine]
    B --> C{Directory / File?}
    C -->|Ignored Path| D[Skip node_modules, dist, etc.]
    C -->|Valid File| E[Line Tokenizer & Filter]
    E --> F[Comment Stripper<br/>//, /*, &lt;!--]
    F --> G[Rules Engine]
    
    subgraph Rules Engine
        G1[w-screen Viewport Leak]
        G2[Fixed Width >= 360px]
        G3[Flex Truncate without min-w-0]
        G4[Unwrapped Table / Pre Element]
        G5[Unconstrained Negative Margin]
    end
    
    G --> G1
    G --> G2
    G --> G3
    G --> G4
    G --> G5
    
    G1 --> H[Issue Collector]
    G2 --> H
    G3 --> H
    G4 --> H
    G5 --> H
    
    H --> I{Severity Classifier}
    I -->|ERROR| J[Exit Code 1<br/>Breaks CI]
    I -->|WARNING| K[Exit Code 0<br/>Advisory Alert]
    
    J --> L[CLI Output / JSON Reporter]
    K --> L
```

## Core Design Decisions

1. **Zero External Dependencies**:
   * Uses native `node:fs` and `node:path`.
   * No heavy dependencies like PostCSS, Babel, or AST compilers that bloat `node_modules` by 50MB+.
   * Execution completes in milliseconds, making it suitable for pre-commit hooks and CI pipelines.

2. **Stream-based Scanning**:
   * Files are processed synchronously line by line to keep memory consumption under 20MB even across enterprise projects with thousands of components.

3. **Configurable Severity**:
   * `ERROR`: Fatal layout bugs guaranteed to break horizontal scroll on mobile devices (e.g. `w-screen`, `w-[500px]`). Exits with code `1`.
   * `WARNING`: Structural risks that require parent context verification (e.g. `truncate` without `min-w-0`, uncontained tables). Exits with code `0` unless strict mode is enabled.
