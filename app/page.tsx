import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Projects } from "@/components/Projects";
import { Stack } from "@/components/Stack";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Projects />
      <Stack />
      <About />
      <Contact />
    </main>
  );
}
