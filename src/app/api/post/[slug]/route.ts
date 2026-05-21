import { NextResponse } from "next/server";
import * as path from "path";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

const DEFAULT_CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function getContentDir(): string {
  return process.env.BLOG_CONTENT_DIR || DEFAULT_CONTENT_DIR;
}

export const dynamic = "force-static";

export function generateStaticParams() {
  const posts = getAllPosts(getContentDir());
  return posts.map((post) => ({ slug: post.slug }));
}

export function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  return params.then(({ slug }) => {
    const post = getPostBySlug(getContentDir(), slug);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post });
  });
}
