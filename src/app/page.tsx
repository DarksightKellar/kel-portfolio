import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import FitHighlights from "@/components/FitHighlights";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import OpenSource from "@/components/OpenSource";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <FitHighlights />
      <Projects />
      <Skills />
      <OpenSource />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
