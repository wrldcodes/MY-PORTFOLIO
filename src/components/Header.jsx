import { useEffect, useMemo, useState } from "react";
import { personal } from "../data/portfolio";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState("dark");

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Scroll-based background change (cheap + passive)
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active link highlighting via IntersectionObserver
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.id)
    ).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the most visible intersecting section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        setActiveSection(visible.target.id);
      },
      { threshold: [0.15, 0.35, 0.6], rootMargin: "-15% 0px -70% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const preferredTheme = useMemo(() => {
    const saved = localStorage.getItem("color-scheme");
    return saved === "light" ? "light" : "dark";
  }, []);

  useEffect(() => {
    setTheme(preferredTheme);
    document.documentElement.dataset.theme = preferredTheme;
  }, [preferredTheme]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("color-scheme", next);
  };

  return (
    <header
      className={`site-header ${isScrolled ? "site-header--scrolled" : ""}`}
    >
      <div className="site-header-inner mx-auto px-4 flex flex-col items-center justify-center gap-4 sm:flex-row sm:items-center sm:justify-between">
        <a
          href="#home"
          className="site-title text-center"
          aria-label={`Go to ${personal.name} home`}
          onClick={(e) => {
            e.preventDefault();
            scrollToId("home");
          }}
        >
          {personal.name}
        </a>

        <nav
          className="site-nav flex flex-nowrap overflow-x-auto whitespace-nowrap justify-center sm:justify-end gap-2"
          aria-label="Primary navigation"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`site-nav-link ${
                activeSection === item.id ? "is-active" : ""
              }`}
              aria-current={activeSection === item.id ? "page" : undefined}
              onClick={(e) => {
                e.preventDefault();
                scrollToId(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="theme-icon-btn"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        >
          {theme === "dark" ? (
            // Sun icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M12 18a6 6 0 1 0 0-12a6 6 0 0 0 0 12Zm0-16a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm0 19a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1ZM3 12a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Zm16 0a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1ZM5.03 5.03a1 1 0 0 1 1.41 0l.7.7a1 1 0 1 1-1.41 1.42l-.7-.7a1 1 0 0 1 0-1.42Zm12.23 12.23a1 1 0 0 1 1.41 0l.7.7a1 1 0 1 1-1.41 1.42l-.7-.7a1 1 0 0 1 0-1.42ZM18.97 5.03a1 1 0 0 1 0 1.41l-.7.7a1 1 0 1 1-1.41-1.42l.7-.7a1 1 0 0 1 1.41 0ZM6.74 17.26a1 1 0 0 1 0 1.41l-.7.7a1 1 0 1 1-1.41-1.42l.7-.7a1 1 0 0 1 1.41 0Z"
              />
            </svg>
          ) : (
            // Moon icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M21 12.79A9 9 0 0 1 11.21 3a7 7 0 1 0 9.79 9.79Z"
              />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
