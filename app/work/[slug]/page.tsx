import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, projects, site } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

function find(slug: string) {
  const project = projects.find((p) => p.slug === slug);
  const study = caseStudies[slug];
  return project && study ? { project, study } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const found = find((await params).slug);
  if (!found) return {};
  const { project } = found;
  const path = `/work/${project.slug}`;
  return {
    title: `${project.name} case study`,
    description: project.summary,
    alternates: { canonical: path },
    openGraph: { type: "article", url: path, title: `${project.name} case study | ${site.name}`, description: project.summary },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const found = find((await params).slug);
  if (!found) notFound();
  const { project, study } = found;
  const next = projects.find((p) => p.slug === study.next);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${project.name} case study`,
    url: `${site.url}/work/${project.slug}`,
    about: { "@type": "SoftwareApplication", name: project.name, url: project.live, applicationCategory: "WebApplication", sameAs: [project.repo], author: { "@id": `${site.url}/#person` } },
  };

  return (
    <main className="csp">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <article className="cs-in">
        <Link className="mono back" href="/#work">← All work</Link>
        <p className="mono">Case study {study.number}</p>
        <h1 className="cs-t">{project.name}</h1>
        <p className="cs-s">{study.headline}</p>
        <div className="chips">{project.tags.map((t) => <span key={t}>{t}</span>)}</div>

        <div className="cs-g">
          <div><h3>The problem</h3><p>{study.problem}</p></div>
          <div><h3>What I built</h3><ul>{study.built.map((b) => <li key={b}>{b}</li>)}</ul></div>
        </div>

        <h3>How it works</h3>
        <div className="flow">
          {study.flow.map(([title, note], i) => (
            <div key={title} style={{ display: "contents" }}>
              {i > 0 && <i aria-hidden="true">→</i>}
              <div><b>{title}</b>{note}</div>
            </div>
          ))}
        </div>

        <h3>Decisions</h3>
        <div className="cs-d">{study.decisions.map(([title, text]) => <div key={title}><b>{title}</b><p>{text}</p></div>)}</div>

        <div className="shot">
          <i><b /><b /><b /></i>
          <Image src={project.image.src} alt={project.image.alt} width={project.image.width} height={project.image.height} sizes="(max-width: 1000px) 100vw, 952px" />
        </div>

        <p className="links" style={{ marginTop: 30 }}>
          <a href={project.live} target="_blank" rel="noopener noreferrer">Live site</a>
          <a href={project.repo} target="_blank" rel="noopener noreferrer">GitHub</a>
        </p>
        {next && <Link className="cs-n" href={`/work/${next.slug}`} style={{ display: "block", textDecoration: "none" }}>Next: {next.name} →</Link>}
      </article>
    </main>
  );
}
