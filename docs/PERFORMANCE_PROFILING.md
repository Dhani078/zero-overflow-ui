Performance Profiling: zero-overflow-ui

Benchmarks and V8 JIT performance profile data.

1. Throughput Benchmarks

Tested on ASUS TUF Gaming (AMD Ryzen 5 3550H, 4 Cores / 8 Threads, Node.js v22 LTS):

| File Count | Total Lines Scanned | Execution Time | Lines / Second | Memory RSS |
| :--- | :--- | :--- | :--- | :--- |
| 10 Files | 1,200 | 14 ms | 85,714 lines/s | 12.4 MB |
| 50 Files | 6,500 | 28 ms | 232,142 lines/s | 14.1 MB |
| 200 Files | 32,000 | 79 ms | 405,063 lines/s | 18.2 MB |
| 1,000 Files | 165,000 | 290 ms | 568,965 lines/s | 26.8 MB |

2. V8 JIT Optimizations

- String Splitting: Uses `split(/\r?\n/)` to preserve linear contiguous string arrays.
- Set Lookup: `DEFAULT_EXTS` and `DEFAULT_IGNORES` use native `Set.prototype.has()`, executing in $O(1)$ constant time.
- Zero Object Allocation per Non-Violating Line: When a line produces no violations, the rule functions return `null` immediately without allocating intermediate objects.
