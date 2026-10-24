"use client";

import { useEffect, useRef } from "react";
import { stack, stackLinks } from "@/lib/content";

type Node = { symbol: string; name: string; note: string; group: number; x: number; y: number; vx: number; vy: number; links: Node[] };

/**
 * The stack as a live graph behind the section. Related tools are linked, each group
 * pulls into a cluster, and nodes can be dragged. Canvas only: no React state.
 */
export function Molecule() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tipRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const tip = tipRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !tip || !ctx) return;

    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rootStyle = getComputedStyle(document.documentElement);
    const mono = rootStyle.getPropertyValue("--font-mono");
    const display = rootStyle.getPropertyValue("--font-display");
    const dpr = Math.min(devicePixelRatio || 1, 2);

    const nodes: Node[] = [];
    const byName = new Map<string, Node>();
    stack.forEach((g, group) =>
      g.items.forEach(([symbol, name, note]) => {
        const node: Node = { symbol, name, note, group, x: 0, y: 0, vx: 0, vy: 0, links: [] };
        nodes.push(node);
        byName.set(name, node);
      }),
    );
    const edges = stackLinks.flatMap(([a, b]) => {
      const from = byName.get(a);
      const to = byName.get(b);
      if (!from || !to) return [];
      from.links.push(to);
      to.links.push(from);
      return [[from, to] as const];
    });

    let width = 0;
    let height = 0;
    let top = 260; // nodes stay below the section heading
    let hover: Node | null = null;
    let drag: Node | null = null;
    let visible = true;
    let frame = 0;

    const anchor = (group: number): [number, number] => {
      const room = height - top - 70;
      if (width < 600) return [width * (group % 2 ? 0.68 : 0.32), top + room * (0.13 + 0.245 * group)];
      const a = (group / 4) * Math.PI * 2 + 0.8;
      return [width / 2 + Math.cos(a) * width * 0.3, top + room / 2 + Math.sin(a) * room * 0.3];
    };

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const heading = document.querySelector<HTMLElement>("#stack .wrap");
      top = heading ? heading.offsetTop + heading.offsetHeight + 24 : 260;
      nodes.forEach((n) => {
        if (n.x) return;
        const [ax, ay] = anchor(n.group);
        n.x = ax + (Math.random() - 0.5) * 80;
        n.y = ay + (Math.random() - 0.5) * 80;
      });
    };

    const step = () => {
      const k = width < 600 ? 0.95 : Math.min(1.5, Math.max(1, width / 960));
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy + 0.5;
          const d = Math.sqrt(d2);
          const f = (2600 * k * k) / d2;
          a.vx += (dx / d) * f;
          a.vy += (dy / d) * f;
          b.vx -= (dx / d) * f;
          b.vy -= (dy / d) * f;
        }
      }
      edges.forEach(([a, b]) => {
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const d = Math.sqrt(dx * dx + dy * dy) + 0.01;
        const f = (d - 100 * k) * 0.012;
        a.vx += (dx / d) * f;
        a.vy += (dy / d) * f;
        b.vx -= (dx / d) * f;
        b.vy -= (dy / d) * f;
      });
      nodes.forEach((n) => {
        const [ax, ay] = anchor(n.group);
        n.vx = (n.vx + (ax - n.x) * 0.004) * 0.82;
        n.vy = (n.vy + (ay - n.y) * 0.004) * 0.82;
        if (n === drag) return;
        n.x = Math.max(34, Math.min(width - 34, n.x + n.vx));
        n.y = Math.max(top, Math.min(height - 58, n.y + n.vy));
      });
    };

    const draw = () => {
      const css = getComputedStyle(document.documentElement);
      const fg = css.getPropertyValue("--fg").trim();
      const accent = css.getPropertyValue("--acc").trim();
      const bg = css.getPropertyValue("--bg").trim();
      const small = width < 600;
      const radius = small ? 17 : 22;
      ctx.clearRect(0, 0, width, height);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      edges.forEach(([a, b]) => {
        const on = hover && (a === hover || b === hover);
        ctx.globalAlpha = on ? 1 : hover ? 0.07 : 0.25;
        ctx.strokeStyle = on ? accent : fg;
        ctx.lineWidth = on ? 1.8 : 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      });
      nodes.forEach((n) => {
        const related = hover && (n === hover || hover.links.includes(n));
        ctx.globalAlpha = hover && !related ? 0.28 : 1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = n === hover ? accent : bg;
        ctx.fill();
        ctx.lineWidth = 1.4;
        ctx.strokeStyle = related ? accent : fg;
        ctx.stroke();
        ctx.fillStyle = n === hover ? bg : fg;
        ctx.font = `500 ${small ? 11 : 13}px ${mono}`;
        ctx.fillText(n.symbol, n.x, n.y + 1);
        ctx.fillStyle = fg;
        ctx.font = `${small ? 11 : 12}px ${display}`;
        ctx.fillText(n.name, n.x, n.y + radius + (small ? 14 : 16));
      });
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      if (!visible) return;
      step();
      draw();
      frame = requestAnimationFrame(loop);
    };

    const pointer = (e: PointerEvent): [number, number] => {
      const r = canvas.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top];
    };
    const pick = ([px, py]: [number, number]) => {
      let best: Node | null = null;
      let min = 28;
      nodes.forEach((n) => {
        const d = Math.hypot(n.x - px, n.y - py);
        if (d < min) {
          min = d;
          best = n;
        }
      });
      return best as Node | null;
    };
    // Details only appear once someone actually hovers a node.
    const say = () => {
      tip.textContent = hover ? `${hover.name} · ${stack[hover.group].group} · ${hover.note} · connected to ${hover.links.length}` : "";
      if (still) draw();
    };

    const onMove = (e: PointerEvent) => {
      const p = pointer(e);
      if (drag) {
        drag.x = p[0];
        drag.y = p[1];
        drag.vx = drag.vy = 0;
        if (still) draw();
        return;
      }
      const n = pick(p);
      if (n !== hover) {
        hover = n;
        canvas.style.cursor = n ? "grab" : "";
        say();
      }
    };
    const onDown = (e: PointerEvent) => {
      const n = pick(pointer(e));
      if (!n) return;
      drag = hover = n;
      say();
      canvas.setPointerCapture(e.pointerId);
    };
    const release = () => (drag = null);
    const onLeave = () => {
      if (drag) return;
      hover = null;
      say();
    };
    const onResize = () => {
      resize();
      if (still) {
        for (let i = 0; i < 300; i++) step();
        draw();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible && !still) loop();
    });

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointerup", release);
    canvas.addEventListener("pointercancel", release);
    canvas.addEventListener("pointerleave", onLeave);
    addEventListener("resize", onResize);
    observer.observe(canvas);
    resize();
    if (still) {
      for (let i = 0; i < 400; i++) step();
      draw();
    } else {
      loop();
    }

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      removeEventListener("resize", onResize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerup", release);
      canvas.removeEventListener("pointercancel", release);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <canvas id="mol" ref={canvasRef} aria-hidden="true" />
      <p className="tip mono" ref={tipRef} />
    </>
  );
}
