"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { projects, type Project } from "@/lib/data";

function CoverVisual({ project }: { project: Project }) {
  const common = "absolute inset-0 opacity-55";

  return (
    <div className="relative h-48 overflow-hidden rounded-t-[1.5rem]" style={{ background: `linear-gradient(135deg, ${project.cover.from}, ${project.cover.to})` }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(255,255,255,0.28),transparent_28%),radial-gradient(circle_at_18%_76%,rgba(255,255,255,0.12),transparent_24%)]" />
      {project.cover.shape === "grid" && <div className={`${common} bg-[linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] bg-[size:28px_28px]`} />}
      {project.cover.shape === "vault" && <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/45 shadow-[0_0_80px_rgba(255,255,255,0.22)]" />}
      {project.cover.shape === "ledger" && <div className="absolute inset-x-10 top-10 space-y-4">{[0, 1, 2, 3].map((line) => <div key={line} className="h-3 rounded-full bg-white/25" style={{ width: `${92 - line * 13}%` }} />)}</div>}
      {project.cover.shape === "pulse" && <div className="absolute inset-0 flex items-center justify-center"><div className="h-24 w-24 rounded-full border border-white/35" /><div className="absolute h-40 w-40 rounded-full border border-white/15" /></div>}
      {project.cover.shape === "timeline" && <div className="absolute left-12 right-12 top-1/2 h-px bg-white/35">{[0, 1, 2, 3].map((dot) => <span key={dot} className="absolute -top-2 h-4 w-4 rounded-full bg-white/60" style={{ left: `${dot * 33}%` }} />)}</div>}
      {project.cover.shape === "atelier" && <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(255,255,255,0.08),rgba(255,255,255,0.32),rgba(255,255,255,0.08))]" />}
      <div className="absolute bottom-5 left-5 rounded-full border border-white/15 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/70 backdrop-blur">
        {project.kind}
      </div>
    </div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="px-6 py-28">
      <div className="mx-auto max-w-6xl" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.24em] text-zinc-500 dark:text-white/40">Selected work</p>
          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-white md:text-5xl">Work that had to hold.</h2>
          <p className="mt-5 text-base leading-7 text-zinc-650 text-zinc-700 dark:text-white/55">
            Some of it is public. Some of it I can only walk through. The through-line is the same: vague requirements, fragile workflows, and software that had to survive real users.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-7 lg:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 26 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="group overflow-hidden rounded-[1.5rem] border border-zinc-200 bg-white/70 shadow-sm transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-950/5 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-white/20 dark:hover:shadow-black/20"
            >
              <CoverVisual project={project} />
              <div className="p-7">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-0.03em] text-zinc-950 dark:text-white">{project.title}</h3>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-white/40">{project.role}</p>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">{project.highlight}</span>
                </div>

                <p className="mt-5 text-sm leading-6 text-zinc-700 dark:text-white/58">{project.description}</p>

                <ul className="mt-5 space-y-2">
                  {project.proof.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-zinc-600 dark:text-white/48">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-white/30" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-white/40">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-4">
                  {project.evidence.map((link) => (
                    <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-zinc-800 underline-offset-4 transition hover:underline dark:text-white/75">
                      {link.label}
                      <ExternalLink size={14} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
