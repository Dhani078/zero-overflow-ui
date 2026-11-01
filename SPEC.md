**Specification: zero-overflow-ui**

**1. Scope & Objective**

`zero-overflow-ui` is a zero-dependency static analysis tool designed to detect and eliminate horizontal overflow bugs in responsive web templates before deployment. 

The primary target viewport is small mobile devices (320px – 375px), where unwanted horizontal scrolling ruins user experience, breaks layout bounds, and degrades Core Web Vitals (CLS).

**2. Target File Formats**

The engine analyzes templates statically across:
* HTML / HTM (`.html`, `.htm`)
* React (`.jsx`, `.tsx`)
* Vue (`.vue`)
* Svelte (`.svelte`)
* Astro (`.astro`)
* PHP / Laravel Blade (`.php`, `.blade.php`)

**3. Violation Taxonomy**

**3.1. `viewport-width-leak` (Severity: ERROR)**
* **Trigger**: Usage of `w-screen` or `min-w-screen`.
* **Root Cause**: `100vw` calculates viewport width including desktop scrollbars and ignores root container paddings, causing an automatic 15px - 17px horizontal overflow on desktop and layout breaking on mobile webviews.
* **Remediation**: Use `w-full` or `max-w-full`.

**3.2. `fixed-width-overflow` (Severity: ERROR)**
* **Trigger**: Hardcoded pixel widths >= 360px (e.g. `w-[400px]`, `w-[500px]`, `w-96`) without responsive constraint (`max-w-full`, `overflow-x-auto`, or responsive prefix `md:`/`lg:`).
* **Root Cause**: Mobile viewports start at 320px (iPhone SE) and 360px (standard Android). Fixed pixel widths wider than 360px force the viewport to horizontally scroll.
* **Remediation**: Convert to fluid widths: `w-full max-w-[400px]` or responsive overrides `w-full md:w-[400px]`.

**3.3. `flex-truncate-leak` (Severity: WARNING)**
* **Trigger**: `truncate` on an element that is a child of a flex container (`flex-1`, `grow`) missing `min-w-0`.
* **Root Cause**: In CSS Flexbox, flex children default to `min-width: auto`. This prevents `text-overflow: ellipsis` (`truncate`) from shrinking below text intrinsic width, blowing out container boundaries.
* **Remediation**: Add `min-w-0` to the flex child.

**3.4. `table-pre-unwrapped` (Severity: WARNING)**
* **Trigger**: `<table>` or `<pre>` tags not enclosed in an `overflow-x-auto` wrapper.
* **Root Cause**: Tabular data and preformatted code blocks do not wrap by default. Without an isolated scrollable parent, they expand the entire page horizontally.
* **Remediation**: Enclose in `<div class="w-full overflow-x-auto">`.

**3.5. `negative-margin-leak` (Severity: WARNING)**
* **Trigger**: Negative horizontal margins (e.g. `-mx-4`, `-mx-6`, `-mx-8`) active at base mobile size without parent clipping (`overflow-hidden`).
* **Root Cause**: Negative margins pull elements outside parent container bounds, creating invisible overflow margins.
* **Remediation**: Ensure parent container has `overflow-hidden` or restrict negative margins to responsive breakpoints (e.g. `md:-mx-4`).

**4. Exit Codes & CI Behavior**

* `0`: Clean scan, 0 errors.
* `1`: One or more errors found (blocks CI / pre-commit).
