import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import usePrefersReducedMotion from "./lib/hooks/usePrefersReducedMotion";

export default function App() {
  const wrapperRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!wrapperRef.current) return;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      wrapperRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" }
    );
  }, [prefersReducedMotion]);

  return (
    <>
      <Header />
      <div ref={wrapperRef} className="wrapper">
        <Hero />
        <Projects />
        <Footer />
      </div>
    </>
  );
}
