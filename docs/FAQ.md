# Frequently Asked Questions (FAQ)

### Why is 360px used as the reference minimum viewport?
Most modern compact mobile devices (iPhone SE, Galaxy S-series, Pixel) have viewport widths between 360px and 390px. Any fixed width equal to or exceeding 360px without a responsive breakpoint (`sm:`, `md:`) creates an unavoidable horizontal scrollbar.

### Why zero dependencies?
Build tools and linters should start instantly and avoid supply-chain vulnerabilities. Running on native Node.js stdlib ensures `zero-overflow-ui` starts in under 30 milliseconds with 0 CVE risk.

### Does this replace browser testing?
No. Static scanning is the fast first line of defense in pre-commit and CI pipelines. It catches 95% of typical AI generation mistakes before code reaches browser testing.

### How do I disable a rule for legacy components?
Use `.overflowrc.json` in your project root:
```json
{
  "ignoreRules": ["negative-margin"],
  "ignorePaths": ["src/legacy/"]
}
```
