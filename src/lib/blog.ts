import * as fs from "fs";
import * as path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";

export type BlogPost = {
  title: string;
  slug: string;
  date: string;
  content: string;
  excerpt: string;
};

export type BlogPostSummary = {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;");
}

function stripMarkdown(text: string): string {
  return text
    // Headers
    .replace(/^#{1,6}\s+/gm, "")
    // Bold / italic
    .replace(/(\*{1,3}|_{1,3})(.+?)\1/g, "$2")
    // Images
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    // Links
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    // Inline code
    .replace(/`{1,3}[^`]*`{1,3}/g, "")
    // Blockquotes
    .replace(/^>\s?/gm, "")
    // Horizontal rules
    .replace(/^[-*_]{3,}\s*$/gm, "")
    // List markers
    .replace(/^[\s]*[-*+]\s/gm, "")
    .replace(/^[\s]*\d+\.\s/gm, "")
    // Strikethrough
    .replace(/~~(.+?)~~/g, "$1")
    .trim();
}

function extractExcerpt(body: string): string {
  const firstPara = stripMarkdown(body.split(/\n\n+/)[0].trim());
  if (firstPara.length <= 200) {
    return firstPara;
  }
  return firstPara.slice(0, 200) + "...";
}

async function markdownToHtml(md: string): Promise<string> {
  const sanitizedMarkdown = escapeHtml(md);
  const result = await remark()
    .use(remarkParse)
    .use(remarkHtml, { sanitize: true })
    .process(sanitizedMarkdown);
  return result.toString();
}

async function parsePostFile(
  filePath: string,
  slug: string,
): Promise<BlogPost | null> {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content: body } = matter(raw);

    const title = data.title as string | undefined;
    const rawDate = data.date;
    const date =
      rawDate instanceof Date
        ? rawDate.toISOString().slice(0, 10)
        : typeof rawDate === "string"
          ? rawDate
          : undefined;

    if (!title || !date) return null;

    const content = await markdownToHtml(body);
    const excerpt = extractExcerpt(body);

    return { title, slug, date, content, excerpt };
  } catch {
    return null;
  }
}

export async function getAllPosts(
  contentDir: string,
): Promise<BlogPostSummary[]> {
  if (!fs.existsSync(contentDir)) return [];

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".md"));

  const posts: BlogPost[] = [];

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const post = await parsePostFile(path.join(contentDir, file), slug);
    if (post) {
      posts.push(post);
    }
  }

  posts.sort((a, b) => b.date.localeCompare(a.date));

  return posts.map((p) => ({
    title: p.title,
    slug: p.slug,
    date: p.date,
    excerpt: p.excerpt,
  }));
}

export async function getPostBySlug(
  contentDir: string,
  slug: string,
): Promise<BlogPost | null> {
  const filePath = path.join(contentDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  return parsePostFile(filePath, slug);
}
