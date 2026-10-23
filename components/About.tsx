import { principles } from "@/lib/content";

export function About() {
  return (
    <section id="about">
      <div className="wrap about">
        <div>
          <h2 data-reveal>From metabolic pathways to application architecture</h2>
          <p>I studied Biochemistry at Lagos State University. The work was about understanding complex systems, testing ideas methodically, and finding the pattern under the noise.</p>
          <p>Software turned out to need the same habits. I design the database and authentication, build the interface on top, and ship it. I care about code my future self can read, and tests that catch mistakes before users do.</p>
        </div>
        <div className="pr">{principles.map((p) => <div key={p}>{p}</div>)}</div>
      </div>
    </section>
  );
}
