import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BlogPost from "./BlogPost";
import type { BlogPost as BlogPostType } from "@/lib/blog";

const samplePost: BlogPostType = {
  title: "Test Post Title",
  slug: "test-post",
  date: "2025-05-21",
  content: "<p>This is <strong>bold</strong> content.</p>",
  excerpt: "This is bold content.",
};

describe("BlogPost", () => {
  it("renders the post title", () => {
    render(<BlogPost post={samplePost} />);

    expect(
      screen.getByRole("heading", { name: "Test Post Title" }),
    ).toBeInTheDocument();
  });

  it("renders the post date", () => {
    render(<BlogPost post={samplePost} />);

    expect(screen.getByText("2025-05-21")).toBeInTheDocument();
  });

  it("adds a semantic datetime attribute to the time element", () => {
    render(<BlogPost post={samplePost} />);

    expect(screen.getByText("2025-05-21")).toHaveAttribute("dateTime", "2025-05-21");
  });

  it("renders the post content as HTML", () => {
    render(<BlogPost post={samplePost} />);

    const content = screen.getByText("bold");
    expect(content).toBeInTheDocument();
    expect(content.tagName).toBe("STRONG");
  });

  it("includes a link back to the blog listing", () => {
    render(<BlogPost post={samplePost} />);

    const link = screen.getByRole("link", { name: /back to blog/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/blog");
  });
});
