"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll and pointer effects, applied straight to the DOM.
 * It holds no React state, so none of this ever re-renders the page.
 */
export function Effects() {
  const bar = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = matchMedia("(pointer: fine)").matches;
    const cleanups: Array<() => void> = [];

    // Reveal each marked element once, when it scrolls into view.
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    // Scroll: progress bar, marquee rows, photo parallax. One rAF-throttled listener.
    const marquees = document.querySelectorAll<HTMLElement>("[data-marquee]");
    const photo = document.querySelector<HTMLElement>("[data-parallax]");
    let queued = false;
    const update = () => {
      queued = false;
      const y = scrollY;
      const max = document.documentElement.scrollHeight - innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      if (reduced) return;
      marquees.forEach((el) => {
        el.style.transform = `translateX(${Number(el.dataset.offset ?? 0) + Number(el.dataset.dir) * y * 0.35}px)`;
      });
      if (photo && y < innerHeight * 1.5) photo.style.transform = `translateY(${-y * 0.06}px)`;
    };
    const onScroll = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    };
    addEventListener("scroll", onScroll, { passive: true });
    update();
    cleanups.push(() => removeEventListener("scroll", onScroll));

    // Pointer: tile spotlight, email spotlight, contact glow, magnetic buttons, custom cursor.
    let px = 0;
    let py = 0;
    const onMove = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const local = (el: HTMLElement) => {
        const r = el.getBoundingClientRect();
        return [e.clientX - r.left, e.clientY - r.top, r] as const;
      };
      t.closest<HTMLElement>(".grid")?.querySelectorAll<HTMLElement>(".tile").forEach((tile) => {
        const [x, y] = local(tile);
        tile.style.setProperty("--mx", `${x}px`);
        tile.style.setProperty("--my", `${y}px`);
      });
      const mail = t.closest<HTMLElement>(".mail");
      if (mail) {
        const [x, y] = local(mail);
        mail.style.setProperty("--x", `${x}px`);
        mail.style.setProperty("--y", `${y}px`);
      }
      const contact = t.closest<HTMLElement>("#contact");
      if (contact) {
        const [x, y] = local(contact);
        contact.style.setProperty("--sx", `${x}px`);
        contact.style.setProperty("--sy", `${y}px`);
      }
      if (!reduced) {
        const mag = t.closest<HTMLElement>(".mag");
        if (mag) {
          const [x, y, r] = local(mag);
          mag.style.transform = `translate(${(x - r.width / 2) * 0.3}px, ${(y - r.height / 2) * 0.4}px)`;
        }
      }
      px = e.clientX;
      py = e.clientY;
      if (dot.current && ring.current) {
        dot.current.style.transform = `translate(${px}px, ${py}px)`;
        ring.current.className = t.closest("a, button, summary") ? "ring sm" : "ring";
      }
    };
    const onOut = (e: PointerEvent) => {
      const from = e.target as HTMLElement;
      const to = e.relatedTarget as Node | null;
      const mag = from.closest<HTMLElement>(".mag");
      if (mag && !mag.contains(to)) mag.style.transform = "";
      const mail = from.closest<HTMLElement>(".mail");
      if (mail && !mail.contains(to)) mail.style.setProperty("--x", "-999px");
    };
    addEventListener("pointermove", onMove);
    addEventListener("pointerout", onOut);
    cleanups.push(() => {
      removeEventListener("pointermove", onMove);
      removeEventListener("pointerout", onOut);
    });

    // The ring trails the dot with a little easing. Desktop mice only.
    if (finePointer && !reduced) {
      document.body.classList.add("hc");
      let rx = 0;
      let ry = 0;
      let frame = 0;
      const follow = () => {
        rx += (px - rx) * 0.16;
        ry += (py - ry) * 0.16;
        if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
        frame = requestAnimationFrame(follow);
      };
      follow();
      cleanups.push(() => {
        cancelAnimationFrame(frame);
        document.body.classList.remove("hc");
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <>
      <div id="bar" ref={bar} />
      <div className="cur" ref={dot} aria-hidden="true" />
      <div className="ring" ref={ring} aria-hidden="true"><span /></div>
    </>
  );
}
