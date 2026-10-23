"use client";

import { useEffect, useRef } from "react";

/** Drifting nodes and bonds that nudge away from the cursor. Drawn on a canvas, no React state. */
export function Network() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    type Node = { x: number; y: number; vx: number; vy: number };
    let nodes: Node[] = [];
    let width = 0;
    let height = 0;
    let mx = -999;
    let my = -999;
    let visible = true;
    let frame = 0;

    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      const count = Math.min(60, Math.floor((width * height) / 22000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    };

    const draw = () => {
      if (!visible) return;
      const styles = getComputedStyle(document.documentElement);
      const accent = styles.getPropertyValue("--acc").trim();
      const line = styles.getPropertyValue("--fg").trim();
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        const dx = n.x - mx;
        const dy = n.y - my;
        const dist = Math.hypot(dx, dy);
        if (dist > 0 && dist < 120) {
          n.x += (dx / dist) * 1.2;
          n.y += (dy / dist) * 1.2;
        }
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }

      ctx.globalAlpha = 0.2;
      ctx.strokeStyle = line;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y) < 130) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = accent;
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
      frame = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    // Pause drawing whenever the hero is off-screen.
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible) draw();
    });

    resize();
    observer.observe(canvas);
    addEventListener("resize", resize);
    canvas.parentElement?.addEventListener("pointermove", onMove);
    draw();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      removeEventListener("resize", resize);
      canvas.parentElement?.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas id="net" ref={ref} aria-hidden="true" />;
}
