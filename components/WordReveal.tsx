"use client";

import { useEffect } from "react";

/** Lights up the About words one by one as you scroll through them. */
export function WordReveal() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = document.querySelector<HTMLElement>("[data-words]");
    if (!box) return;
    const words = [...box.querySelectorAll<HTMLElement>(".w")];
    let queued = false;

    const update = () => {
      queued = false;
      const r = box.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (innerHeight * 0.82 - r.top) / (r.height + innerHeight * 0.3)));
      words.forEach((w, i) => w.classList.toggle("lit", progress * words.length > i));
    };
    const onScroll = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    };

    document.body.classList.add("words-on");
    addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      removeEventListener("scroll", onScroll);
      document.body.classList.remove("words-on");
    };
  }, []);

  return null;
}
