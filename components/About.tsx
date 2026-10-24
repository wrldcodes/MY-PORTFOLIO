import { principles } from "@/lib/content";

/** Each word gets its own span so WordReveal can light them up while scrolling. */
function Words({ text }: { text: string }) {
  return <>{text.split(" ").map((w, i) => <span key={i}>{i > 0 && " "}<span className="w">{w}</span></span>)}</>;
}

export function About() {
  return (
    <section id="about">
      <div className="wrap about">
        <div>
          <h2 data-reveal>From metabolic pathways to application architecture</h2>
          <div data-words>
            <p><Words text="I studied Biochemistry at Lagos State University. The work was about understanding complex systems, testing ideas methodically, and finding the pattern under the noise." /></p>
            <p><Words text="Software turned out to need the same habits. I design the database and authentication, build the interface on top, and ship it. I care about code my future self can read, and tests that catch mistakes before users do." /></p>
          </div>
        </div>
        <div className="pr">{principles.map((p) => <div key={p}>{p}</div>)}</div>
      </div>
    </section>
  );
}
