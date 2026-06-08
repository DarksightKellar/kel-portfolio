import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

const DEFAULT_CONTENT_DIR = `${process.cwd()}/content/blog`;

function getContentDir(): string {
  return process.env.BLOG_CONTENT_DIR || DEFAULT_CONTENT_DIR;
}

export function generateMetadata(): Metadata {
  return {
    title: "Blog — Kelvin Lartey",
    description: "Thoughts, learnings, and musings from building software.",
  };
}

export default async function BlogPage() {
  const posts = await getAllPosts(getContentDir());

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="mx-auto max-w-3xl px-6 pt-28 pb-20">
        <h1 className="mb-10 text-4xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-white md:text-5xl">
          Blog
        </h1>

        {posts.length === 0 && (
          <p className="text-zinc-500 dark:text-white/35">No posts yet.</p>
        )}

        {posts.length > 0 && (
          <ul className="space-y-6">
            {posts.map((post) => (
              <li key={post.slug}>
                <article className="rounded-2xl border border-zinc-200 bg-white/70 p-6 transition hover:border-zinc-300 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-white/15">
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <h2 className="text-xl font-semibold tracking-tight text-zinc-950 transition group-hover:text-zinc-700 dark:text-white dark:group-hover:text-white/80">
                      {post.title}
                    </h2>
                  </Link>

                  <div className="mt-2 flex items-center gap-1.5 text-xs text-zinc-500 dark:text-white/35">
                    <CalendarDays size={13} />
                    <time dateTime={post.date}>{post.date}</time>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-white/45">
                    {post.excerpt}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        )}
      </section>

      <Footer />
    </main>
  );
}
