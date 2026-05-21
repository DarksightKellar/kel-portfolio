import Link from "next/link";
import type { BlogPost as BlogPostType } from "@/lib/blog";

export default function BlogPost({ post }: { post: BlogPostType }) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/blog"
        className="mb-8 inline-block text-sm font-medium text-zinc-500 transition hover:text-zinc-700 dark:text-white/40 dark:hover:text-white/70"
      >
        ← Back to blog
      </Link>

      <header className="mb-8">
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
          {post.title}
        </h1>
        <time className="text-sm text-zinc-500 dark:text-white/40">
          {post.date}
        </time>
      </header>

      <div
        className="prose prose-zinc max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
