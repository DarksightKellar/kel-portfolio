"use client";

import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { profile, quickScanProof } from "@/lib/data";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden px-6 pt-28 pb-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.18),transparent_28%),radial-gradient(circle_at_82%_12%,rgba(59,130,246,0.16),transparent_30%),radial-gradient(circle_at_55%_82%,rgba(168,85,247,0.14),transparent_30%)]" />
      <div className="absolute inset-x-0 top-24 -z-10 mx-auto h-80 max-w-5xl rounded-full bg-zinc-900/10 blur-3xl dark:bg-white/5" />

      <div className="mx-auto grid min-h-[calc(100vh-9rem)] max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <p className="mb-5 inline-flex rounded-full border border-zinc-300/80 bg-white/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-zinc-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-white/60">
            {profile.title}
          </p>

          <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-zinc-950 dark:text-white md:text-7xl lg:text-8xl">
            Bring me the thing that still lives in your head.
            <span className="block text-zinc-500 dark:text-white/35">I’ll turn it into working software, then make it reliable.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-700 dark:text-white/65 md:text-xl">
            {profile.positioning}
          </p>

          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-600 dark:text-white/45">{profile.summary}</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-white/90"
            >
              <Mail size={17} />
              Talk through the rough version
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white/70 px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:border-zinc-500 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-white/25"
            >
              See work that held
              <ArrowDown size={16} />
            </a>
          </div>

          <div className="mt-8 flex items-center gap-5 text-zinc-600 dark:text-white/45">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition hover:text-zinc-950 dark:hover:text-white">
              <GithubIcon size={22} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition hover:text-zinc-950 dark:hover:text-white">
              <LinkedinIcon size={22} />
            </a>
            <a href={`mailto:${profile.email}`} className="text-sm transition hover:text-zinc-950 dark:hover:text-white">
              {profile.email}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15 }}
          className="rounded-[2rem] border border-zinc-200 bg-white/75 p-5 shadow-2xl shadow-zinc-950/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.045] dark:shadow-black/30"
        >
          <div className="rounded-[1.5rem] border border-zinc-200 bg-zinc-950 p-6 text-white dark:border-white/10">
            <p className="text-xs uppercase tracking-[0.24em] text-emerald-300/70">At a glance</p>
            <div className="mt-6 space-y-5">
              {quickScanProof.map((item) => (
                <div key={item.label} className="border-b border-white/10 pb-5 last:border-b-0 last:pb-0">
                  <dt className="text-xs uppercase tracking-[0.2em] text-white/35">{item.label}</dt>
                  <dd className="mt-2 text-lg font-medium tracking-tight text-white">{item.value}</dd>
                </div>
              ))}
            </div>
          </div>
          <p className="px-2 pt-5 text-sm leading-6 text-zinc-600 dark:text-white/45">{profile.availability}</p>
        </motion.div>
      </div>
    </section>
  );
}
