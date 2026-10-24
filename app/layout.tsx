import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Effects } from "@/components/Effects";
import { Intro } from "@/components/Intro";
import { Nav } from "@/components/Nav";
import { ProjectPreview } from "@/components/ProjectPreview";
import { LetterWeight } from "@/components/LetterWeight";
import { WordReveal } from "@/components/WordReveal";
import { site, socials } from "@/lib/content";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
  authors: [{ name: site.name, url: site.url }],
  openGraph: { type: "website", url: site.url, siteName: site.name, title: site.title, description: site.description, locale: "en_NG" },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, creator: "@wolaElebute" },
  verification: { google: "riZ_H-pG0Gpt3Wxj-cGc3KB6epoYLMt0k_VeRLvPeE0" },
};

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0B0F0D" },
    { media: "(prefers-color-scheme: light)", color: "#F2F0E8" },
  ],
};

// Plays the intro once per browser session, and never for people who prefer reduced motion.
// It runs before first paint, and a 5s failsafe means it can never trap the page.
const introScript = `(function(){var r=document.documentElement,m=false,s=false;try{m=matchMedia("(prefers-reduced-motion:reduce)").matches}catch(e){}try{s=!!sessionStorage.getItem("seen")}catch(e){}if(!m&&!s)r.classList.add("pre");setTimeout(function(){r.classList.remove("pre")},5000)})();`;

// Structured data so search engines and AI assistants know who this site is about.
const personId = `${site.url}/#person`;
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: site.name,
      jobTitle: "Software Engineer",
      url: site.url,
      image: `${site.url}/images/jubril.jpg`,
      address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
      alumniOf: { "@type": "CollegeOrUniversity", name: "Lagos State University" },
      knowsAbout: ["TypeScript", "JavaScript", "Next.js", "React", "Node.js", "PostgreSQL", "Prisma", "Software engineering"],
      sameAs: socials.map((s) => s.href),
    },
    { "@type": "WebSite", "@id": `${site.url}/#website`, url: site.url, name: site.name, publisher: { "@id": personId } },
    { "@type": "ProfilePage", url: site.url, mainEntity: { "@id": personId } },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${mono.variable} ${serif.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        <Intro />
        <Effects />
        <LetterWeight />
        <WordReveal />
        <ProjectPreview />
        <Nav />
        {children}
        <footer>
          <div className="wrap mono">© {new Date().getFullYear()} {site.name} · {site.location}</div>
        </footer>
      </body>
    </html>
  );
}
