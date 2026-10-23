import { CopyEmail } from "./CopyEmail";
import { site, socials } from "@/lib/content";

export function Contact() {
  return (
    <section id="contact">
      <div className="wrap">
        <p className="big" data-reveal>Let’s build something.</p>
        <a className="mail" href={`mailto:${site.email}`}>{site.email}</a>
        <div className="row"><CopyEmail email={site.email} /></div>
        <div className="links">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
          ))}
        </div>
      </div>
    </section>
  );
}
