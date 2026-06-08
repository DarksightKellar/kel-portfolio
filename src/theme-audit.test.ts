// @vitest-environment node
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function collectTsxFiles(dir: string): string[] {
  const entries = readdirSync(dir);
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      files.push(...collectTsxFiles(fullPath));
      continue;
    }

    if (entry.endsWith(".tsx")) {
      files.push(fullPath);
    }
  }

  return files;
}

function extractClassNames(source: string): string[] {
  const matches = source.matchAll(/className\s*=\s*"([^"]*)"/g);
  return Array.from(matches, (match) => match[1]);
}

describe("theme audit", () => {
  it("root layout does not hardcode the dark class on <html>", () => {
    const layout = readFileSync("src/app/layout.tsx", "utf8");
    expect(layout).not.toContain("scroll-smooth dark");
  });

  it("tailwind dark variant is driven by app theme selector, not OS media query", () => {
    const css = readFileSync("src/app/globals.css", "utf8");
    expect(css).toContain("@custom-variant dark");
    expect(css).toContain('[data-theme="dark"]');
  });

  it("every dark text utility has a light-mode base text utility", () => {
    const files = collectTsxFiles("src");
    const invalid: Array<{ file: string; className: string }> = [];

    for (const file of files) {
      const source = readFileSync(file, "utf8");
      const classNames = extractClassNames(source);

      for (const className of classNames) {
        const tokens = className.split(/\s+/).filter(Boolean);
        const hasDarkText = tokens.some((token) => token.startsWith("dark:text-"));

        if (!hasDarkText) {
          continue;
        }

        const hasBaseText = tokens.some(
          (token) =>
            token.startsWith("text-") &&
            !token.startsWith("text-white/") &&
            !token.startsWith("text-white") &&
            !token.startsWith("text-black")
              ? true
              : token.startsWith("text-zinc") ||
                token.startsWith("text-slate") ||
                token.startsWith("text-neutral") ||
                token.startsWith("text-gray") ||
                token.startsWith("text-stone") ||
                token.startsWith("text-emerald") ||
                token.startsWith("text-red") ||
                token.startsWith("text-blue") ||
                token.startsWith("text-green") ||
                token.startsWith("text-amber") ||
                token.startsWith("text-yellow") ||
                token.startsWith("text-lime") ||
                token.startsWith("text-cyan") ||
                token.startsWith("text-indigo") ||
                token.startsWith("text-violet") ||
                token.startsWith("text-purple") ||
                token.startsWith("text-pink") ||
                token.startsWith("text-orange") ||
                token.startsWith("text-black") ||
                token.startsWith("text-white"),
        );

        if (!hasBaseText) {
          invalid.push({ file, className });
        }
      }
    }

    expect(invalid).toEqual([]);
  });
});
