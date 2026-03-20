import { useEffect, useMemo, useState } from "react";
import { personal } from "../data/portfolio";
import { FaMoon, FaSun } from "react-icons/fa6";

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
      document.getElementById(item.id),
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
      { threshold: [0.15, 0.35, 0.6], rootMargin: "-15% 0px -70% 0px" },
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

        <div className="flex w-full items-center justify-center gap-2 sm:w-auto sm:justify-end">
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
              <FaSun size={20} aria-hidden="true" />
            ) : (
              <FaMoon size={20} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
