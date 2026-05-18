export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 px-6 py-8 dark:border-white/5">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-xs text-zinc-500 dark:text-white/25">© {new Date().getFullYear()} Kelvin Lartey.</p>
        <p className="text-xs text-zinc-500 dark:text-white/25">Static Next.js portfolio. Tested because the words matter too.</p>
      </div>
    </footer>
  );
}
