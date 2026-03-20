import { useRef } from "react";
import gsap from "gsap";
import SocialIcon from "./SocialIcon";
import { personal, socialLinks } from "../data/portfolio";
import useGsapInView from "../lib/hooks/useGsapInView";
import usePrefersReducedMotion from "../lib/hooks/usePrefersReducedMotion";

export default function Hero() {
  const imgRef = useRef(null);
  const contentRef = useRef(null);

  useGsapInView(imgRef, { from: { opacity: 0, y: 26 }, to: { duration: 0.75 } });
  useGsapInView(contentRef, {
    from: { opacity: 0, y: 26 },
    to: { duration: 0.85, ease: "power3.out" },
  });

  const prefersReducedMotion = usePrefersReducedMotion();
  const primaryBtnRef = useRef(null);
  const secondaryBtnRef = useRef(null);

  const lift = (node) => {
    if (!node || prefersReducedMotion) return;
    gsap.to(node, { y: -3, duration: 0.25, ease: "power3.out" });
  };
  const drop = (node) => {
    if (!node || prefersReducedMotion) return;
    gsap.to(node, { y: 0, duration: 0.25, ease: "power3.out" });
  };

  return (
    <section id="home" className="hero section main-article">
      <div className="px-4">
        <img
          ref={imgRef}
          src={personal.profileImage}
          alt={personal.name}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="profile-pic mx-auto"
        />
      </div>

      <div ref={contentRef} className="hero-content px-4">
        <p className="hero-role">{personal.role}</p>

        <p className="hero-bio">
          {personal.bio}{" "}
          <a
            className="inline-link"
            href={personal.worksheetUrl}
            target="_blank"
            rel="noreferrer"
          >
            Check Jubril&apos;s worksheet
          </a>
          .
        </p>

        <div className="hero-cta">
          <a
            ref={primaryBtnRef}
            className="btn btn-primary"
            href="#projects"
            onMouseEnter={() => lift(primaryBtnRef.current)}
            onMouseLeave={() => drop(primaryBtnRef.current)}
            onFocus={() => lift(primaryBtnRef.current)}
            onBlur={() => drop(primaryBtnRef.current)}
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            View Projects
          </a>
          <a
            ref={secondaryBtnRef}
            className="btn btn-secondary"
            href={personal.worksheetUrl}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => lift(secondaryBtnRef.current)}
            onMouseLeave={() => drop(secondaryBtnRef.current)}
            onFocus={() => lift(secondaryBtnRef.current)}
            onBlur={() => drop(secondaryBtnRef.current)}
          >
            Open Worksheet
          </a>
        </div>

        <ul className="icons mt-10">
          {socialLinks.map((link) => (
            <SocialIcon key={link.id} link={link} />
          ))}
        </ul>
      </div>
    </section>
  );
}
