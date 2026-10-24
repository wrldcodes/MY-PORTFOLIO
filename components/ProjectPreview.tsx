"use client";

import { useEffect, useRef } from "react";

/** A screenshot that follows the cursor over each project title. Desktop mice only. */
export function ProjectPreview() {
  const box = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const preview = box.current;
    const picture = img.current;
    if (!preview || !picture) return;
    if (!matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rows = [...document.querySelectorAll<HTMLDetailsElement>("#work details")];
    const shots = [...document.querySelectorAll<HTMLImageElement>("#work .shot img")];
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let frame = 0;
    const cleanups: Array<() => void> = [];

    rows.forEach((row, i) => {
      row.open = false; // titles first; the preview does the talking
      const summary = row.querySelector("summary");
      if (!summary) return;
      const enter = (e: Event) => {
        const p = e as PointerEvent;
        if (row.open || !shots[i]) return;
        picture.src = shots[i].currentSrc || shots[i].src;
        cx = tx = p.clientX;
        cy = ty = p.clientY;
        preview.style.opacity = "1";
      };
      const leave = () => (preview.style.opacity = "0");
      const move = (e: Event) => {
        const p = e as PointerEvent;
        tx = Math.min(p.clientX + 32, innerWidth - 390);
        ty = p.clientY - 100;
      };
      summary.addEventListener("pointerenter", enter);
      summary.addEventListener("pointerleave", leave);
      summary.addEventListener("pointermove", move);
      summary.addEventListener("click", leave);
      cleanups.push(() => {
        summary.removeEventListener("pointerenter", enter);
        summary.removeEventListener("pointerleave", leave);
        summary.removeEventListener("pointermove", move);
        summary.removeEventListener("click", leave);
      });
    });

    const follow = () => {
      cx += (tx - cx) * 0.13;
      cy += (ty - cy) * 0.13;
      preview.style.transform = `translate(${cx}px, ${cy}px) rotate(${(tx - cx) * 0.06}deg)`;
      frame = requestAnimationFrame(follow);
    };
    follow();
    return () => {
      cancelAnimationFrame(frame);
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <div className="pv" ref={box} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={img} alt="" />
    </div>
  );
}
