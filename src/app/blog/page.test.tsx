import { render, screen } from "@testing-library/react";
import { describe, expect, it, beforeEach, afterEach } from "vitest";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import BlogPage, { generateMetadata } from "./page";

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

describe("generateMetadata", () => {
  it("returns the blog page title and description", () => {
    const metadata = generateMetadata();

    expect(metadata.title).toBe("Blog — Kelvin Lartey");
    expect(metadata.description).toBeDefined();
  });
});

describe("BlogPage", () => {
  it("shows an empty state message when no posts exist", () => {
    render(<BlogPage />);

    expect(screen.getByText(/no posts/i)).toBeInTheDocument();
  });

  it("renders a list of posts with title, date, and excerpt", () => {
    writePost(
      "first-post",
      "First Post",
      "2025-01-15",
      "This is the first post excerpt.",
    );
    writePost(
      "second-post",
      "Second Post",
      "2025-03-20",
      "Second post excerpt content.",
    );

    render(<BlogPage />);

    expect(screen.getByText("First Post")).toBeInTheDocument();
    expect(screen.getByText("Second Post")).toBeInTheDocument();
    expect(screen.getByText("2025-01-15")).toBeInTheDocument();
    expect(screen.getByText("2025-03-20")).toBeInTheDocument();
    expect(
      screen.getByText("This is the first post excerpt."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Second post excerpt content."),
    ).toBeInTheDocument();
  });

  it("renders each post title as a link to the individual post page", () => {
    writePost("my-post", "My Post", "2025-06-01", "Excerpt text.");

    render(<BlogPage />);

    const link = screen.getByRole("link", { name: "My Post" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/blog/my-post");
  });

  it("renders posts sorted by date descending", () => {
    writePost("older", "Older Post", "2025-01-01", "Older.");
    writePost("newer", "Newer Post", "2025-06-01", "Newer.");

    render(<BlogPage />);

    const postHeadings = screen.getAllByRole("heading", { level: 2 });
    const titles = postHeadings.map((el) => el.textContent);
    expect(titles).toEqual(["Newer Post", "Older Post"]);
  });
});
