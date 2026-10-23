import { stack } from "@/lib/content";

export function Stack() {
  return (
    <section id="stack">
      <div className="wrap">
        <h2 data-reveal>The stack</h2>
        <p className="sub">The tools behind the work above. Move your cursor across the grid.</p>
        {stack.map((g) => (
          <div key={g.group}>
            <div className="grp mono">{g.group}</div>
            <div className="grid">
              {g.items.map(([symbol, name, note], i) => (
                <div key={name} className="tile" data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
                  <s>{symbol}</s>
                  <em>{name}</em>
                  <small>{note}</small>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
