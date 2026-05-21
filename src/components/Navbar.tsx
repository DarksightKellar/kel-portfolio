"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { profile } from "@/lib/data";

const links = [
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "GitHub", href: "#github" },
  { label: "Blog", href: "/blog" },
  { label: "Experience", href: "#experience" },
  { label: "Hire Kelvin", href: "#contact" },
];

type Theme = "dark" | "light";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === "undefined") return "dark";
    return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((current) => (current === "dark" ? "light" : "dark"));

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-zinc-200 bg-white/75 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#" className="text-sm font-bold tracking-[0.2em] text-zinc-950 dark:text-white" aria-label="Kelvin Lartey home">
          {profile.initials}
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-zinc-600 transition hover:text-zinc-950 dark:text-white/55 dark:hover:text-white">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            className="rounded-full p-2 text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950 dark:text-white/75 dark:hover:bg-white/10 dark:hover:text-white"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          <button className="rounded-full p-2 text-zinc-700 transition hover:bg-zinc-100 md:hidden dark:text-white/75 dark:hover:bg-white/10" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden border-t border-zinc-200 bg-white/95 dark:border-white/10 dark:bg-zinc-950/95 md:hidden">
            <div className="flex flex-col gap-4 px-6 py-5">
              {links.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-sm font-medium text-zinc-700 transition hover:text-zinc-950 dark:text-white/70 dark:hover:text-white">
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
