import * as fs from "fs";
import * as path from "path";

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

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, body: raw };
  }

  const frontmatterBlock = match[1];
  const body = match[2];

  const data: Record<string, string> = {};
  for (const line of frontmatterBlock.split("\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    const value = line.slice(colonIndex + 1).trim().replace(/^["']|["']$/g, "");
    if (key) {
      data[key] = value;
    }
  }

  return { data, body };
}

function markdownToHtml(md: string): string {
  let html = md;

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Paragraphs: split on blank lines, wrap non-empty chunks in <p>
  const paragraphs = html.split(/\n\n+/);
  html = paragraphs
    .map((p) => p.trim())
    .filter((p) => p.length > 0)
    .map((p) => `<p>${p.replace(/\n/g, " ")}</p>`)
    .join("\n");

  return html;
}

function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[_*`~]/g, "");
}

function extractExcerpt(body: string): string {
  const firstPara = stripMarkdown(body.split(/\n\n+/)[0].trim());
  if (firstPara.length <= 200) {
    return firstPara;
  }
  return firstPara.slice(0, 200) + "...";
}

function parsePostFile(filePath: string, slug: string): BlogPost | null {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, body } = parseFrontmatter(raw);

    const title = data.title;
    const date = data.date;

    if (!title || !date) return null;

    const content = markdownToHtml(body);
    const excerpt = extractExcerpt(body);

    return { title, slug, date, content, excerpt };
  } catch {
    return null;
  }
}

export function getAllPosts(contentDir: string): BlogPostSummary[] {
  if (!fs.existsSync(contentDir)) return [];

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".md"));

  const posts: BlogPost[] = [];

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const post = parsePostFile(path.join(contentDir, file), slug);
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

export function getPostBySlug(
  contentDir: string,
  slug: string
): BlogPost | null {
  const filePath = path.join(contentDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  return parsePostFile(filePath, slug);
}
