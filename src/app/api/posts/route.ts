import { NextResponse } from "next/server";
import * as path from "path";
import { getAllPosts } from "@/lib/blog";

const DEFAULT_CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function getContentDir(): string {
  return process.env.BLOG_CONTENT_DIR || DEFAULT_CONTENT_DIR;
}

export const dynamic = "force-static";

export function GET() {
  const posts = getAllPosts(getContentDir());
  return NextResponse.json({ posts });
}
