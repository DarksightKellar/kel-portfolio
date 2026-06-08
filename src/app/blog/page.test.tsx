import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import BlogPage, { generateMetadata } from "./page";

vi.mock("@/lib/blog", () => ({
  getAllPosts: vi.fn(),
}));

import { getAllPosts } from "@/lib/blog";

describe("generateMetadata", () => {
  it("returns the blog page title and description", () => {
    const metadata = generateMetadata();

    expect(metadata.title).toBe("Blog — Kelvin Lartey");
    expect(metadata.description).toBeDefined();
  });
});

describe("BlogPage", () => {
  it("shows an empty state message when no posts exist", async () => {
    vi.mocked(getAllPosts).mockResolvedValue([]);

    render(await BlogPage());

    expect(screen.getByText(/no posts/i)).toBeInTheDocument();
  });

  it("renders a list of posts with title, date, and excerpt", async () => {
    vi.mocked(getAllPosts).mockResolvedValue([
      {
        title: "First Post",
        slug: "first-post",
        date: "2025-01-15",
        excerpt: "This is the first post excerpt.",
      },
      {
        title: "Second Post",
        slug: "second-post",
        date: "2025-03-20",
        excerpt: "Second post excerpt content.",
      },
    ]);

    render(await BlogPage());

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

  it("renders each post title as a link to the individual post page", async () => {
    vi.mocked(getAllPosts).mockResolvedValue([
      {
        title: "My Post",
        slug: "my-post",
        date: "2025-06-01",
        excerpt: "Excerpt text.",
      },
    ]);

    render(await BlogPage());

    const link = screen.getByRole("link", { name: "My Post" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/blog/my-post");
  });

  it("renders posts sorted by date descending", async () => {
    vi.mocked(getAllPosts).mockResolvedValue([
      {
        title: "Newer Post",
        slug: "newer",
        date: "2025-06-01",
        excerpt: "Newer.",
      },
      {
        title: "Older Post",
        slug: "older",
        date: "2025-01-01",
        excerpt: "Older.",
      },
    ]);

    render(await BlogPage());

    const postHeadings = screen.getAllByRole("heading", { level: 2 });
    const titles = postHeadings.map((el) => el.textContent);
    expect(titles).toEqual(["Newer Post", "Older Post"]);
  });
});
