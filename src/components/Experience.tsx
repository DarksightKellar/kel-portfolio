"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { experiences } from "@/lib/data";

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="border-t border-zinc-200 px-6 py-28 dark:border-white/5">
      <div className="mx-auto max-w-6xl" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <p className="mb-4 text-sm uppercase tracking-[0.24em] text-zinc-500 dark:text-white/40">Experience</p>
          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-white md:text-5xl">Where the edge got sharpened.</h2>
        </motion.div>

        <div className="mt-14 space-y-6">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.company}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.42, delay: index * 0.07 }}
              className="grid gap-6 rounded-3xl border border-zinc-200 bg-white/70 p-7 dark:border-white/10 dark:bg-white/[0.035] md:grid-cols-[0.4fr_1fr]"
            >
              <div>
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-zinc-950 dark:text-white">{experience.company}</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-white/45">{experience.role}</p>
                <p className="mt-1 text-sm text-zinc-500 dark:text-white/30">{experience.period}</p>
              </div>
              <ul className="space-y-3">
                {experience.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-sm leading-6 text-zinc-650 text-zinc-700 dark:text-white/52">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-white/30" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
