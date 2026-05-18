"use client";

import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useRef } from "react";
import { openSourceSignals } from "@/lib/data";

export default function OpenSource() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="github" className="border-t border-zinc-200 px-6 py-28 dark:border-white/5">
      <div ref={ref} className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <p className="mb-4 text-sm uppercase tracking-[0.24em] text-zinc-500 dark:text-white/40">Public GitHub work</p>
          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-white md:text-5xl">Public code and contributions.</h2>
          <p className="mt-5 text-base leading-7 text-zinc-700 dark:text-white/55">
            Most client work stays private. The repos I can show cover product surfaces, protocol boundaries, mobile tooling, and automation where correctness matters.
          </p>
        </motion.div>

        <div className="grid gap-4">
          {openSourceSignals.map((signal, index) => (
            <motion.a
              key={signal.repo}
              href={signal.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group rounded-2xl border border-zinc-200 bg-white/70 p-5 transition hover:border-zinc-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-white/20 dark:hover:bg-white/[0.055]"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-mono text-sm font-semibold text-zinc-950 dark:text-white">{signal.repo}</h3>
                <ExternalLink size={16} className="text-zinc-400 transition group-hover:text-zinc-900 dark:group-hover:text-white" />
              </div>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-white/45">{signal.note}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
