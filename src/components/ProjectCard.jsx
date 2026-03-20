import { useRef } from "react";
import gsap from "gsap";
import useGsapInView from "../lib/hooks/useGsapInView";
import usePrefersReducedMotion from "../lib/hooks/usePrefersReducedMotion";

/**
 * Individual project card.
 */
export default function ProjectCard({ project }) {
  const { title, description, stack, image, imageAlt, imageBorder } = project;

  const cardRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGsapInView(cardRef, {
    from: { opacity: 0, y: 22 },
    to: { duration: 0.75, ease: "power3.out" },
  });

  const lift = () => {
    if (prefersReducedMotion || !cardRef.current) return;
    gsap.to(cardRef.current, {
      y: -8,
      scale: 1.01,
      duration: 0.28,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const settle = () => {
    if (prefersReducedMotion || !cardRef.current) return;
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      duration: 0.25,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  return (
    <article
      ref={cardRef}
      className="project project-card"
      tabIndex={0}
      role="group"
      aria-label={`Project: ${title}`}
      onMouseEnter={lift}
      onMouseLeave={settle}
      onFocus={lift}
      onBlur={settle}
    >
      <div className="project-text">
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
        <ul className="project-tags">
          {stack.map((tech) => (
            <li key={tech} className="project-tag">
              {tech}
            </li>
          ))}
        </ul>
      </div>
      <img
        src={image}
        alt={imageAlt}
        loading="lazy"
        decoding="async"
        className={
          imageBorder
            ? "img-border project-image order-first md:order-last"
            : "project-image order-first md:order-last"
        }
      />
    </article>
  );
}
