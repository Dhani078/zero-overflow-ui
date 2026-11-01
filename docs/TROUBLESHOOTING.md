**Troubleshooting**

Common viewport overflow causes and step-by-step remedies.

**1. False Positive on Negative Margin (`-mx-4`)**

**Problem**: You deliberately use negative margin to break a child out of a container with padding.
**Solution**:
1. Wrap parent container with `overflow-hidden` or `overflow-x-clip`.
2. Or add `"negative-margin"` to `ignoreRules` in `.overflowrc.json`.

**2. Fixed Width in Modals or Cards (`w-[400px]`)**

**Problem**: Desktop modal or dialog requires 400px width, causing horizontal scroll on mobile screens (360px).
**Solution**:
Change `w-[400px]` to `w-full max-w-[400px]`.
This guarantees 100% width on smaller mobile screens while constraining to 400px on larger displays.

**3. Flex Container Child Truncation Not Working**

**Problem**: Text with `truncate` expands beyond screen boundary inside a flex container.
**Solution**:
Flex items default to `min-width: auto`. Add `min-w-0` to the flex child containing the truncated text:
```html
<!-- Broken -->
<div class="flex items-center">
  <span class="truncate">Very long text string...</span>
</div>

<!-- Fixed -->
<div class="flex items-center">
  <span class="min-w-0 truncate">Very long text string...</span>
</div>
```

**4. Complex Data Tables and Code Blocks**

**Problem**: Wide HTML `<table>` or `<pre>` blocks force page layout wider than viewport.
**Solution**:
Enclose element in a dedicated scrolling wrapper:
```html
<div class="w-full overflow-x-auto">
  <table class="w-full">
    <!-- Table content -->
  </table>
</div>
```
