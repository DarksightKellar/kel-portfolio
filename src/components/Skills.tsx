"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { capabilities, operatingPrinciples } from "@/lib/data";

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="border-t border-zinc-200 px-6 py-28 dark:border-white/5">
      <div className="mx-auto max-w-6xl" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.24em] text-zinc-500 dark:text-white/40">How I work</p>
          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-white md:text-5xl">Principles you can feel in the code.</h2>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {operatingPrinciples.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="rounded-2xl border border-zinc-200 bg-white/70 p-5 dark:border-white/10 dark:bg-white/[0.035]"
            >
              <h3 className="text-sm font-semibold leading-5 text-zinc-950 dark:text-white">{principle.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-white/45">{principle.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((group) => (
            <div key={group.category} className="rounded-2xl border border-zinc-200 bg-zinc-50/80 p-6 dark:border-white/10 dark:bg-white/[0.025]">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-white/35">{group.category}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="rounded-full bg-white px-3 py-1.5 text-sm text-zinc-700 shadow-sm dark:bg-white/5 dark:text-white/50">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
