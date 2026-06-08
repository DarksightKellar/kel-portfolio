"use client";

import { motion, useInView } from "framer-motion";
import { Bug, DraftingCompass, GitBranch } from "lucide-react";
import { useRef } from "react";

const situations = [
  {
    icon: DraftingCompass,
    title: "A product is still mostly in someone’s head",
    body: "I can pull out the real workflow, name the decisions, cut the vague parts down to scope, and turn the first usable slice into software.",
  },
  {
    icon: Bug,
    title: "A bug is real, expensive, and hard to reproduce",
    body: "I start with evidence: reproduce it, isolate the fault line, write the regression test, and fix the smallest thing that actually explains the failure.",
  },
  {
    icon: GitBranch,
    title: "A workflow has grown around spreadsheets, Slack threads, and tribal knowledge",
    body: "I model the work people are already doing, build the control points, and leave behind software the team can operate without folklore.",
  },
];

export default function FitHighlights() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="border-t border-zinc-200 px-6 py-24 dark:border-white/5">
      <div ref={ref} className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end"
        >
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.24em] text-zinc-500 dark:text-white/40">When I’m the right person</p>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-white md:text-5xl">The useful cases are messy before they are obvious.</h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-zinc-700 dark:text-white/55">
            I shine where the team only knows the shape of the pain but not the system yet: half-specified product work, fragile production behavior, and workflows that need to become reliable without losing the human context.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {situations.map((situation, index) => {
            const Icon = situation.icon;

            return (
              <motion.article
                key={situation.title}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.42, delay: index * 0.07 }}
                className="rounded-3xl border border-zinc-200 bg-white/72 p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.035]"
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
                  <Icon size={19} />
                </div>
                <h3 className="text-lg font-semibold tracking-[-0.02em] text-zinc-950 dark:text-white">{situation.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-white/48">{situation.body}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
