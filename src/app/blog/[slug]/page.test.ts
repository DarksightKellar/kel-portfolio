import { describe, expect, it, beforeEach, afterEach } from "vitest";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { generateStaticParams } from "./page";

let testDir: string;

beforeEach(() => {
  testDir = fs.mkdtempSync(path.join(os.tmpdir(), "blog-page-test-"));
  process.env.BLOG_CONTENT_DIR = testDir;
});

afterEach(() => {
  fs.rmSync(testDir, { recursive: true, force: true });
  delete process.env.BLOG_CONTENT_DIR;
});

function writePost(slug: string, title: string, date: string, body: string) {
  const content = `---\ntitle: "${title}"\ndate: "${date}"\n---\n\n${body}`;
  fs.writeFileSync(path.join(testDir, `${slug}.md`), content);
}

describe("generateStaticParams", () => {
  it("returns an empty array when no posts exist", () => {
    const params = generateStaticParams();
    expect(params).toEqual([]);
  });

  it("returns a slug for each blog post", () => {
    writePost("first-post", "First", "2025-01-15", "Content one.");
    writePost("second-post", "Second", "2025-03-20", "Content two.");

    const params = generateStaticParams();

    expect(params).toHaveLength(2);
    expect(params).toEqual(
      expect.arrayContaining([
        { slug: "first-post" },
        { slug: "second-post" },
      ]),
    );
  });
});
