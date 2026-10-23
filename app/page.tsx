import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Effects } from "@/components/Effects";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Nav } from "@/components/Nav";
import { Projects } from "@/components/Projects";
import { Stack } from "@/components/Stack";
import { site } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Effects />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Projects />
        <Stack />
        <About />
        <Contact />
      </main>
      <footer>
        <div className="wrap mono">© {new Date().getFullYear()} {site.name} · {site.location}</div>
      </footer>
    </>
  );
}
