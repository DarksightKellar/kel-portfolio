// @vitest-environment node
import { describe, expect, it, beforeEach, afterEach } from "vitest";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { GET as listHandler } from "./route";
import { GET as singleHandler } from "../post/[slug]/route";

let testDir: string;
let originalEnv: string | undefined;

beforeEach(() => {
  testDir = fs.mkdtempSync(path.join(os.tmpdir(), "blog-route-test-"));
  originalEnv = process.env.BLOG_CONTENT_DIR;
  process.env.BLOG_CONTENT_DIR = testDir;
});

afterEach(() => {
  process.env.BLOG_CONTENT_DIR = originalEnv;
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

describe("GET /api/posts", () => {
  it("returns 200 OK with an empty posts array when no posts exist", async () => {
    const response = await listHandler();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ posts: [] });
  });

  it("returns 200 OK with posts sorted by date descending", async () => {
    writePost(
      "alpha",
      { title: "Alpha", date: "2025-01-01" },
      "Alpha content.",
    );
    writePost(
      "beta",
      { title: "Beta", date: "2025-06-15" },
      "Beta content.",
    );
    writePost(
      "gamma",
      { title: "Gamma", date: "2025-03-10" },
      "Gamma content.",
    );

    const response = await listHandler();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.posts).toHaveLength(3);
    expect(body.posts[0].slug).toBe("beta");
    expect(body.posts[0].title).toBe("Beta");
    expect(body.posts[1].slug).toBe("gamma");
    expect(body.posts[2].slug).toBe("alpha");
  });
});

describe("GET /api/post/[slug]", () => {
  it("returns 404 when slug does not match any post", async () => {
    const response = await singleHandler(new Request("http://localhost"), {
      params: Promise.resolve({ slug: "nonexistent" }),
    });
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body).toEqual({ error: "Post not found" });
  });

  it("returns 200 OK with full post when slug matches", async () => {
    writePost(
      "hello-world",
      { title: "Hello World", date: "2025-04-20" },
      "The **bold** claim with a [link](https://example.com).",
    );

    const response = await singleHandler(new Request("http://localhost"), {
      params: Promise.resolve({ slug: "hello-world" }),
    });
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.post.title).toBe("Hello World");
    expect(body.post.slug).toBe("hello-world");
    expect(body.post.date).toBe("2025-04-20");
    expect(body.post.content).toContain("<strong>bold</strong>");
    expect(body.post.content).toContain('<a href="https://example.com">link</a>');
  });
});
