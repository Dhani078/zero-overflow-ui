Examples

Real-world before-and-after patterns detected and solved by `zero-overflow-ui`.

---

Example 1: Fullscreen Layout (w-screen vs w-full)

Anti-pattern
```html
<header class="w-screen bg-slate-900 text-white p-4">
  <nav class="flex justify-between">...</nav>
</header>
```
Why it fails: `100vw` (`w-screen`) includes browser scrollbar width on desktop and mobile, producing a 15px-17px horizontal overflow.

Recommended Fix
```html
<header class="w-full bg-slate-900 text-white p-4">
  <nav class="flex justify-between">...</nav>
</header>
```

---

Example 2: Hero Card Container

Anti-pattern
```jsx
export function PricingCard() {
  return (
    <div className="w-[450px] p-6 rounded-xl border">
      <h3>Enterprise Plan</h3>
    </div>
  );
}
```
Why it fails: A mobile screen with 375px width will trigger horizontal scrolling.

Recommended Fix
```jsx
export function PricingCard() {
  return (
    <div className="w-full max-w-[450px] p-6 rounded-xl border">
      <h3>Enterprise Plan</h3>
    </div>
  );
}
```

---

Example 3: Flex Avatar + Truncated Name

Anti-pattern
```html
<div class="flex items-center gap-3">
  <img src="avatar.jpg" class="h-10 w-10 rounded-full" />
  <div class="flex flex-col">
    <span class="truncate font-medium">User Long Email Address</span>
  </div>
</div>
```
Why it fails: Inner `flex-col` defaults to `min-w-auto`, preventing `truncate` from applying `text-overflow: ellipsis`.

Recommended Fix
```html
<div class="flex items-center gap-3">
  <img src="avatar.jpg" class="h-10 w-10 rounded-full shrink-0" />
  <div class="min-w-0 flex flex-col">
    <span class="truncate font-medium">User Long Email Address</span>
  </div>
</div>
```
