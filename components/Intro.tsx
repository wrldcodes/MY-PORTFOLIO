"use client";

import { useEffect, useRef } from "react";

/**
 * First-visit intro: counts to 100%, then lifts like a curtain.
 * The inline script in layout.tsx decides whether it shows at all (adds `pre` to <html>).
 */
export function Intro() {
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    if (!html.classList.contains("pre")) return;
    const start = performance.now();
    let frame = 0;
    let timer: ReturnType<typeof setTimeout>;

    const tick = (now: number) => {
      const p = Math.min((now - start) / 1500, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      if (bar.current) bar.current.style.width = `${eased * 100}%`;
      if (count.current) count.current.textContent = `${Math.round(eased * 100)}%`;
      if (p < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }
      root.current?.classList.add("go");
      timer = setTimeout(() => {
        html.classList.remove("pre");
        try {
          sessionStorage.setItem("seen", "1");
        } catch {
          /* storage can be blocked; the intro then simply plays again next time */
        }
      }, 450);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div id="intro" ref={root} aria-hidden="true">
      <div className="in-n"><span>Jubril Elebute</span></div>
      <div className="in-c"><span>Software engineer</span><span ref={count}>0%</span></div>
      <div className="in-l"><i ref={bar} /></div>
    </div>
  );
}
