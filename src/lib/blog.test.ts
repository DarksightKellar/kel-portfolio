import { describe, expect, it, beforeEach, afterEach } from "vitest";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { getAllPosts, getPostBySlug } from "./blog";

let testDir: string;

beforeEach(() => {
  testDir = fs.mkdtempSync(path.join(os.tmpdir(), "blog-test-"));
});

afterEach(() => {
  fs.rmSync(testDir, { recursive: true, force: true });
});

function writePost(slug: string, frontmatter: Record<string, string>, body: string) {
  const lines = ["---"];
  for (const [key, value] of Object.entries(frontmatter)) {
    lines.push(`${key}: ${value}`);
  }
  lines.push("---");
  lines.push("");
  lines.push(body);
  fs.writeFileSync(path.join(testDir, `${slug}.md`), lines.join("\n"));
}

describe("getAllPosts", () => {
  it("returns an empty array when no posts exist", () => {
    const posts = getAllPosts(testDir);

    expect(posts).toEqual([]);
  });

  it("returns summaries of all posts sorted by date descending", () => {
    writePost(
      "first-post",
      { title: "First Post", date: "2025-01-15" },
      "This is the first post content."
    );
    writePost(
      "second-post",
      { title: "Second Post", date: "2025-03-20" },
      "This is the second post content."
    );
    writePost(
      "third-post",
      { title: "Third Post", date: "2025-02-10" },
      "This is the third post content."
    );

    const posts = getAllPosts(testDir);

    expect(posts).toHaveLength(3);
    expect(posts[0].slug).toBe("second-post");
    expect(posts[1].slug).toBe("third-post");
    expect(posts[2].slug).toBe("first-post");
  });

  it("extracts title, slug, date, and excerpt from each post", () => {
    writePost(
      "test-post",
      { title: "Test Title", date: "2025-06-01" },
      "First paragraph that should become the excerpt.\n\nSecond paragraph."
    );

    const posts = getAllPosts(testDir);

    expect(posts).toHaveLength(1);
    const post = posts[0];
    expect(post.title).toBe("Test Title");
    expect(post.slug).toBe("test-post");
    expect(post.date).toBe("2025-06-01");
    expect(post.excerpt).toBe("First paragraph that should become the excerpt.");
  });

  it("uses the first 200 characters as excerpt when no paragraph break exists", () => {
    const longLine =
      "A".repeat(250) + " content that continues beyond the excerpt limit.";
    writePost(
      "long-post",
      { title: "Long Post", date: "2025-01-01" },
      longLine
    );

    const posts = getAllPosts(testDir);

    expect(posts).toHaveLength(1);
    expect(posts[0].excerpt.length).toBeLessThanOrEqual(203);
    expect(posts[0].excerpt).toContain("...");
  });
});

describe("getPostBySlug", () => {
  it("returns null when no post matches the slug", () => {
    const post = getPostBySlug(testDir, "nonexistent");

    expect(post).toBeNull();
  });

  it("returns the full post with HTML content when slug matches", () => {
    writePost(
      "my-post",
      { title: "My Post", date: "2025-04-01" },
      "This is **bold** and this is a [link](https://example.com)."
    );

    const post = getPostBySlug(testDir, "my-post");

    expect(post).not.toBeNull();
    expect(post!.title).toBe("My Post");
    expect(post!.slug).toBe("my-post");
    expect(post!.date).toBe("2025-04-01");
    expect(post!.content).toContain("<strong>bold</strong>");
    expect(post!.content).toContain('<a href="https://example.com">link</a>');
    expect(post!.excerpt).toBeDefined();
  });

  it("escapes raw HTML in markdown content", () => {
    writePost(
      "unsafe-post",
      { title: "Unsafe Post", date: "2025-04-02" },
      "This paragraph includes <script>alert('xss')</script> markup."
    );

    const post = getPostBySlug(testDir, "unsafe-post");

    expect(post).not.toBeNull();
    expect(post!.content).not.toContain("<script>");
    expect(post!.content).toContain("&lt;script&gt;alert('xss')&lt;/script&gt;");
  });

  it("does not create links for dangerous href protocols", () => {
    writePost(
      "dangerous-link-post",
      { title: "Dangerous Link Post", date: "2025-04-03" },
      "This post has a [bad link](javascript:alert(1))."
    );

    const post = getPostBySlug(testDir, "dangerous-link-post");

    expect(post).not.toBeNull();
    expect(post!.content).not.toContain('href="javascript:alert(1)"');
    expect(post!.content).toContain("bad link");
  });

  it("returns null when slug does not match any file", () => {
    writePost("real-post", { title: "Real", date: "2025-01-01" }, "Content.");

    const post = getPostBySlug(testDir, "other-slug");

    expect(post).toBeNull();
  });
});
