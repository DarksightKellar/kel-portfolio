"use client";

import { motion, useInView } from "framer-motion";
import { Mail } from "lucide-react";
import { useRef } from "react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { profile } from "@/lib/data";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="border-t border-zinc-200 px-6 py-28 dark:border-white/5">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-4xl rounded-[2rem] border border-zinc-200 bg-zinc-950 p-8 text-white shadow-2xl shadow-zinc-950/10 dark:border-white/10 md:p-12"
      >
        <p className="text-sm uppercase tracking-[0.24em] text-emerald-300/70">Work with Kelvin</p>
        <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Start with the rough version.</h2>
        <p className="mt-6 max-w-2xl text-base leading-7 text-white/62">
          If the product direction is unclear, the bug only appears in production, or the architecture is slowing the team down, I can help turn the problem into a tested path forward.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href={`mailto:${profile.email}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-white/90">
            <Mail size={17} />
            Email Kelvin about a build
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/35 hover:text-white">
            <GithubIcon size={17} />
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/35 hover:text-white">
            <LinkedinIcon size={17} />
            LinkedIn
          </a>
        </div>
      </motion.div>
    </section>
  );
}
