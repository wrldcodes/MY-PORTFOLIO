"use client";

import { useEffect } from "react";

/** Hero letters flex in weight: thin near the cursor, a slow ripple when idle. DOM only, no state. */
export function LetterWeight() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const hero = document.getElementById("hero");
    if (!hero) return;
    const letters = [...hero.querySelectorAll<HTMLElement>(".ch")];
    const weights = letters.map(() => 800);
    let x = -999;
    let y = -999;
    let lastMove = -9999;
    let visible = true;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      lastMove = performance.now();
    };
    const loop = (now: number) => {
      frame = 0;
      if (!visible) return;
      const active = now - lastMove < 1800;
      // Read every position first, then write, to avoid layout thrashing.
      const targets = letters.map((el, i) => {
        if (!active) return 800 - 270 * (0.5 + 0.5 * Math.sin(now / 650 - i * 0.7));
        const r = el.getBoundingClientRect();
        return 300 + 500 * Math.min(Math.hypot(r.left + r.width / 2 - x, r.top + r.height / 2 - y) / 280, 1);
      });
      letters.forEach((el, i) => {
        weights[i] += (targets[i] - weights[i]) * 0.12;
        el.style.fontWeight = String(Math.round(weights[i]));
      });
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!frame) frame = requestAnimationFrame(loop);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });

    hero.addEventListener("pointermove", onMove);
    observer.observe(hero);
    start();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      hero.removeEventListener("pointermove", onMove);
    };
  }, []);

  return null;
}
