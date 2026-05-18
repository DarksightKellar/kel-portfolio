import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const themeBootstrapScript = `
(() => {
  try {
    const stored = window.localStorage.getItem("theme");
    const theme = stored === "light" || stored === "dark" ? stored : "dark";
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  } catch {
    const root = document.documentElement;
    root.setAttribute("data-theme", "dark");
    root.classList.add("dark");
    root.style.colorScheme = "dark";
  }
})();
`;

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kelvin Lartey — Senior product engineer for ambiguous builds and brittle systems",
  description:
    "Kelvin Lartey builds unclear product ideas, debugs brittle systems, and ships tested web, mobile, payments, automation, and protocol software.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`} data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      <body className="antialiased transition-colors duration-300">{children}</body>
    </html>
  );
}
