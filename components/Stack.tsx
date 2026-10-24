import { Molecule } from "./Molecule";
import { stack } from "@/lib/content";

export function Stack() {
  return (
    <section id="stack">
      <Molecule />
      <div className="wrap">
        <h2 data-reveal>The stack</h2>
        <p className="sub">The tools behind the work above.</p>
      </div>
      {/* The graph is drawn on a canvas, so the same tools are listed here for screen readers and crawlers. */}
      <div className="sr">
        {stack.map((g) => (
          <div key={g.group}>
            <h3>{g.group}</h3>
            <ul>{g.items.map(([, name, note]) => <li key={name}>{name}: {note}</li>)}</ul>
          </div>
        ))}
      </div>
    </section>
  );
}
