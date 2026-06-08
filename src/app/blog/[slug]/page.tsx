import * as path from "path";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import BlogPost from "@/components/BlogPost";
import type { Metadata } from "next";

const DEFAULT_CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function getContentDir(): string {
  return process.env.BLOG_CONTENT_DIR || DEFAULT_CONTENT_DIR;
}

export async function generateStaticParams() {
  const posts = await getAllPosts(getContentDir());
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(getContentDir(), slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: `${post.title} — Kelvin Lartey`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(getContentDir(), slug);

  if (!post) {
    notFound();
  }

  return <BlogPost post={post} />;
}
