import { useRef } from "react";
import ProjectCard from "./ProjectCard";
import { projects } from "../data/portfolio";
import useGsapInView from "../lib/hooks/useGsapInView";

export default function Projects() {
  const headingRef = useRef(null);
  useGsapInView(headingRef, {
    from: { opacity: 0, y: 18 },
    to: { duration: 0.65, ease: "power3.out" },
  });

  return (
    <section id="projects" className="section projects-section">
      <div className="section-header px-4">
        <h2 ref={headingRef} className="section-title">
          Projects
        </h2>
        <p className="section-subtitle">
          A selection of work focused on clean UI, responsiveness, and practical
          frontend engineering.
        </p>
      </div>

      <div className="projects">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
