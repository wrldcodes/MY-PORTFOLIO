import Image from "next/image";
import { projects } from "@/lib/content";

// Each project opens with a native <details>, so no JavaScript or state is needed.
export function Projects() {
  return (
    <section id="work">
      <div className="wrap">
        <h2 data-reveal>Selected work</h2>
        <p className="sub">Two products, built end to end. Open one for the details.</p>
        {projects.map((p, i) => (
          <details key={p.name} open={i === 0}>
            <summary>
              <b>{p.name}</b>
              <span className="mono">{p.kind}</span>
              <span className="plus">+</span>
            </summary>
            <div className="body">
              <div>
                <p>{p.summary}</p>
                <ul>{p.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
                <div className="chips">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
                <p className="links">
                  <a href={p.live} target="_blank" rel="noopener noreferrer">Live site</a>
                  <a href={p.repo} target="_blank" rel="noopener noreferrer">GitHub</a>
                </p>
              </div>
              <div className="shot">
                <i><b /><b /><b /></i>
                <Image src={p.image.src} alt={p.image.alt} width={p.image.width} height={p.image.height} sizes="(max-width: 820px) 100vw, 560px" />
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
