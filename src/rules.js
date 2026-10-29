// zero-overflow-ui rules engine
// ponytail: regex-based token matching; add AST parser when CSS-in-JS complexity demands it.

export const RULES = [
  {
    id: "viewport-width-leak",
    severity: "error",
    name: "w-screen Viewport Leak",
    description: "w-screen includes scrollbar width and causes horizontal scroll on Windows/Linux desktop and mobile browsers.",
    fix: "Replace 'w-screen' with 'w-full' or 'max-w-full'.",
    check(line) {
      const match = line.match(/\b(w-screen|min-w-screen)\b/);
      return match ? { token: match[0] } : null;
    }
  },
  {
    id: "fixed-width-overflow",
    severity: "error",
    name: "Fixed Width Exceeding Mobile Breakpoint",
    description: "Fixed width >= 360px without responsive constraint overflows small mobile screens.",
    fix: "Use 'w-full max-w-[...]' or responsive prefixes like 'w-full md:w-[600px]'.",
    check(line) {
      // Matches w-[360px] or larger, or fixed non-responsive classes w-96 (384px)
      const arbitMatch = line.match(/\b(?:min-)?w-\[(\d+)(?:px|rem)?\]/);
      if (arbitMatch) {
        const val = parseInt(arbitMatch[1], 10);
        const isPx = !arbitMatch[0].includes("rem");
        const pxEquivalent = isPx ? val : val * 16;
        if (pxEquivalent >= 360 && !line.includes("max-w-") && !line.includes("overflow-x-auto")) {
          return { token: arbitMatch[0], detail: `${pxEquivalent}px >= 360px mobile viewport` };
        }
      }
      const fixedTailwind = line.match(/\b(?:min-)?w-(96|80|72)\b/);
      if (fixedTailwind && !line.includes("max-w-") && !line.includes("overflow-x-auto") && !line.includes("md:") && !line.includes("lg:")) {
        return { token: fixedTailwind[0], detail: "Fixed width > 280px without responsive breakpoint" };
      }
      return null;
    }
  },
  {
    id: "flex-truncate-leak",
    severity: "warning",
    name: "Flex Child Truncate Without min-w-0",
    description: "Flex children default to min-width: auto; truncate won't shrink without min-w-0.",
    fix: "Add 'min-w-0' to the flex item holding 'truncate'.",
    check(line) {
      if (line.includes("truncate") && !line.includes("min-w-0") && (line.includes("flex-1") || line.includes("grow"))) {
        return { token: "truncate", detail: "Missing min-w-0 on flex child" };
      }
      return null;
    }
  },
  {
    id: "table-pre-unwrapped",
    severity: "warning",
    name: "Unwrapped Table or Pre Code Block",
    description: "Raw <table> or <pre> elements overflow viewports if code/tabular data is wider than 360px.",
    fix: "Wrap with a container having 'overflow-x-auto' and 'w-full'.",
    check(line) {
      if ((/<table\b/.test(line) || /<pre\b/.test(line)) && !line.includes("overflow-x-auto") && !line.includes("overflow-auto")) {
        return { token: line.includes("<table") ? "<table" : "<pre", detail: "Table or pre tag not marked with horizontal scroll wrapper" };
      }
      return null;
    }
  },
  {
    id: "negative-margin-leak",
    severity: "warning",
    name: "Negative Margin Without Clipping",
    description: "Negative horizontal margin (-mx-*) expands container outside parent bounds.",
    fix: "Ensure parent has 'overflow-hidden' or cancel negative margin on mobile screens.",
    check(line) {
      const match = line.match(/\b(-mx-(?:4|6|8|10|12|16|\d+))\b/);
      if (match && !line.includes("overflow-hidden") && !line.includes("sm:") && !line.includes("md:")) {
        return { token: match[0], detail: "Negative horizontal margin active at base mobile size" };
      }
      return null;
    }
  }
];
