**Rules Reference: zero-overflow-ui**

Detailed technical reference for all rules enforced by `zero-overflow-ui`.

---

**1. `viewport-width-leak`**
* **Severity**: `ERROR`
* **Category**: Viewport Calculation
* **Target Tokens**: `w-screen`, `min-w-screen`

**Why It Fails**
In CSS, `100vw` (which `w-screen` maps to) includes the width of the vertical scrollbar. On browsers with visible scrollbars, `100vw` is wider than the document `clientWidth`, instantly inducing a 15px - 17px horizontal overflow.

**Anti-Pattern**
```html
<header class="w-screen bg-slate-900 px-4">
  <!-- Causes page horizontal scrollbar -->
</header>
```

**Remediation**
```html
<header class="w-full bg-slate-900 px-4">
  <!-- Constrained strictly to body width -->
</header>
```

---

**2. `fixed-width-overflow`**
* **Severity**: `ERROR`
* **Category**: Mobile Responsiveness
* **Target Tokens**: `w-[360px]` and higher, `w-96` (384px), `w-80` (320px) without responsive prefix

**Why It Fails**
Base mobile viewports range from 320px (iPhone SE 1st gen) to 360px - 390px (modern Android / iPhone 14/15). Hardcoding arbitrary widths wider than or equal to 360px without a responsive constraint prevents the element from shrinking on mobile screens.

**Anti-Pattern**
```html
<div class="w-[450px] p-6 bg-white rounded-lg shadow">
  <!-- Bleeds off-screen on devices < 450px -->
</div>
```

**Remediation**
```html
<!-- Pattern A: Fluid with max constraint -->
<div class="w-full max-w-[450px] p-6 bg-white rounded-lg shadow"></div>

<!-- Pattern B: Responsive breakpoint -->
<div class="w-full md:w-[450px] p-6 bg-white rounded-lg shadow"></div>
```

---

**3. `flex-truncate-leak`**
* **Severity**: `WARNING`
* **Category**: Flexbox Layout
* **Target Tokens**: `truncate` on `flex-1` / `grow` elements missing `min-w-0`

**Why It Fails**
CSS flex items default to `min-width: auto`. This means a flex child will refuse to shrink smaller than the intrinsic width of its text content, rendering `text-overflow: ellipsis` (`truncate`) completely ineffective and blowing out the container width.

**Anti-Pattern**
```html
<div class="flex items-center gap-2">
  <span class="flex-1 truncate">Very long dynamic title text that refuses to shrink</span>
</div>
```

**Remediation**
```html
<div class="flex items-center gap-2">
  <span class="flex-1 min-w-0 truncate">Properly ellipsized text without container overflow</span>
</div>
```

---

**4. `table-pre-unwrapped`**
* **Severity**: `WARNING`
* **Category**: Unwrapped Rigid Containers
* **Target Tokens**: `<table>`, `<pre>`

**Why It Fails**
Tables and code blocks have minimum intrinsic content dimensions based on column count and code line length. Rendering them directly without an overflow container forces the entire viewport to stretch.

**Anti-Pattern**
```html
<table class="w-full border-collapse">
  <!-- Wide columns blow out layout -->
</table>
```

**Remediation**
```html
<div class="w-full overflow-x-auto">
  <table class="w-full border-collapse">
    <!-- Horizontally scrolls internally without breaking the page -->
  </table>
</div>
```

---

**5. `negative-margin-leak`**
* **Severity**: `WARNING`
* **Category**: Box Model Outset
* **Target Tokens**: `-mx-4`, `-mx-6`, `-mx-8` without parent clipping

**Why It Fails**
Negative horizontal margins expand an element outside its parent padding. If the parent is flush with the viewport edge, negative margins push children beyond the viewport boundary.

**Remediation**
Ensure the outer container explicitly clips bounds with `overflow-hidden`, or restrict negative margins to tablet/desktop breakpoints (`md:-mx-6`).
