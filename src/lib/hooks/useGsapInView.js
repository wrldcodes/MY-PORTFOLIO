import { useEffect, useRef } from "react";
import gsap from "gsap";
import usePrefersReducedMotion from "./usePrefersReducedMotion";

/**
 * Animates a node the first time it enters the viewport.
 * Uses IntersectionObserver for performance (no scroll listeners).
 */
export default function useGsapInView(ref, options = {}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const optionsRef = useRef(options);

  // Keep latest animation options without re-subscribing the observer.
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    const node = ref?.current;
    if (!node) return;
    if (prefersReducedMotion) return;

    const defaultFrom = { opacity: 0, y: 20 };
    const defaultTo = { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" };

    const {
      once = true,
      threshold = 0.15,
      rootMargin = "0px 0px -10% 0px",
      from,
      to,
    } = optionsRef.current;

    const finalFrom = { ...defaultFrom, ...(from ?? {}) };
    const finalTo = { ...defaultTo, ...(to ?? {}) };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;

        gsap.fromTo(node, finalFrom, { ...finalTo, overwrite: "auto" });

        if (once) observer.disconnect();
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, prefersReducedMotion]);
}

