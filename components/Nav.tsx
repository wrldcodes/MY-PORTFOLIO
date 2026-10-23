"use client";

import { useEffect, useState } from "react";
import { navLinks, site, socials } from "@/lib/content";

/** Top bar plus the full-screen mobile menu. The only state is whether the menu is open. */
export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const close = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onResize = () => innerWidth > 820 && close();
    addEventListener("keydown", onKey);
    addEventListener("resize", onResize);
    return () => {
      removeEventListener("keydown", onKey);
      removeEventListener("resize", onResize);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav>
        <div className="wrap">
          <a className="logo" href="#top" aria-label={`${site.name}, home`}>
            <span className="nm">{site.name}</span>
          </a>
          <div className="lk">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </div>
          <button className="bg" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>
            <i />
            <i />
          </button>
        </div>
      </nav>
      <div className={`menu${open ? " open" : ""}`} id="menu" aria-hidden={!open}>
        <div className="mn">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
        </div>
        <div className="ms mono">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
          ))}
        </div>
      </div>
    </>
  );
}
