/** All site copy lives here. Edit this file; components just render it. */

export const site = {
  name: "Jubril Elebute",
  title: "Jubril Elebute — Software engineer",
  description:
    "Jubril Elebute is a software engineer in Lagos who builds TypeScript, Next.js and PostgreSQL applications with authentication, role-based access and tests.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://jubrilelebute.vercel.app",
  email: "jubrilelebute36@gmail.com",
  location: "Lagos, Nigeria",
};

export const socials = [
  { label: "GitHub", href: "https://github.com/wrldcodes" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jubril-elebute/" },
  { label: "X", href: "https://x.com/wolaElebute" },
];

export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Stack", href: "/#stack" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export const projects = [
  {
    slug: "alafia",
    name: "Aláfíà",
    kind: "Health platform",
    summary:
      "A two-sided community health platform for Nigeria. Patients find and book clinics; clinics, staff and doctors manage appointments and medical records.",
    points: [
      "Separate dashboards for patients, clinics and doctors",
      "JWT sessions in HTTP-only cookies, verified at the edge",
      "PostgreSQL and Prisma data model behind a REST API",
    ],
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Zod"],
    live: "https://alafia-ara.vercel.app",
    repo: "https://github.com/wrldcodes/alafia",
    image: { src: "/images/alafia.jpg", width: 1100, height: 657, alt: "Aláfíà landing page: Healthcare that reaches everyone" },
  },
  {
    slug: "mentorbridge",
    name: "MentorBridge",
    kind: "Mentorship platform",
    summary:
      "A mentorship platform. Mentees find mentors, send requests and book sessions; mentors set availability and manage who they work with.",
    points: [
      "Mentee, mentor and admin roles with protected routes",
      "Credentials and Google sign-in through NextAuth",
      "Tested with Vitest and React Testing Library, CI on GitHub Actions",
    ],
    tags: ["Next.js", "TypeScript", "NextAuth", "Prisma", "Vitest"],
    live: "https://mentorbridge-pi.vercel.app",
    repo: "https://github.com/wrldcodes/MentorBridge",
    image: { src: "/images/mentorbridge.jpg", width: 1100, height: 718, alt: "MentorBridge landing page: Connect with your perfect mentor" },
  },
];

export const stack = [
  { group: "Frontend", items: [["Rc", "React", "Components and hooks"], ["Nx", "Next.js", "App Router, route handlers"], ["Tw", "Tailwind", "Responsive design tokens"], ["Gs", "GSAP", "Scroll and entrance motion"], ["Fm", "Framer Motion", "Interface transitions"]] },
  { group: "Backend and data", items: [["Nd", "Node.js", "APIs and tooling"], ["Ex", "Express", "REST services"], ["Pg", "PostgreSQL", "Relational data models"], ["Pr", "Prisma", "Schema and migrations"], ["Mg", "MongoDB", "Document storage"]] },
  { group: "Language and security", items: [["Ts", "TypeScript", "Strict mode everywhere"], ["Zd", "Zod", "Validation at the boundary"], ["Jw", "JWT", "HTTP-only cookie sessions"], ["Oa", "OAuth 2.0", "Google sign-in"], ["Rb", "RBAC", "Role-based routes"]] },
  { group: "Quality and delivery", items: [["Vt", "Vitest", "Unit and component tests"], ["Pw", "Playwright", "End-to-end tests"], ["Gh", "GitHub Actions", "CI on every push"], ["Vc", "Vercel", "Deployment"], ["Es", "ESLint", "Consistent code"]] },
] as const;

export const marqueeWords = ["TypeScript", "Next.js", "React", "PostgreSQL", "Prisma", "Node.js", "NextAuth", "Zod", "Tailwind", "GSAP", "Vitest", "Playwright"];

export const principles = [
  "Build things that solve real problems.",
  "Choose maintainability over cleverness.",
  "Write code your future self can read.",
  "Learn deeply, not just quickly.",
];

/** Which tools connect to which in the stack graph. */
export const stackLinks: [string, string][] = [
  ["React", "Next.js"], ["Next.js", "Tailwind"], ["Next.js", "GSAP"], ["React", "Framer Motion"], ["Next.js", "TypeScript"],
  ["TypeScript", "Zod"], ["Next.js", "Prisma"], ["Prisma", "PostgreSQL"], ["Node.js", "Express"], ["Node.js", "Next.js"],
  ["Express", "MongoDB"], ["Next.js", "JWT"], ["JWT", "RBAC"], ["OAuth 2.0", "JWT"], ["Vitest", "TypeScript"],
  ["Vitest", "Playwright"], ["GitHub Actions", "Vitest"], ["GitHub Actions", "Vercel"], ["Next.js", "Vercel"],
  ["ESLint", "TypeScript"], ["Prisma", "TypeScript"],
];

export type CaseStudy = {
  number: string;
  headline: string;
  problem: string;
  built: string[];
  flow: [string, string][];
  decisions: [string, string][];
  next: string;
};

/** Case-study copy, keyed by project slug. */
export const caseStudies: Record<string, CaseStudy> = {
  alafia: {
    number: "01",
    headline: "A two-sided community health platform for Nigeria.",
    problem:
      "Patients need an easy way to find and book clinics, and clinics need tools to manage appointments and records. Aláfíà puts both on one platform, designed for low-data use on basic smartphones and simple onboarding by role.",
    built: [
      "Patients register, sign in, book appointments and view their records and prescriptions",
      "Clinics, staff and doctors manage patients, appointments, slots and medical records",
      "Separate dashboards for patients, clinics and doctors",
      "A REST API behind every dashboard, with Cloudinary for medical attachments",
    ],
    flow: [["Browser", "Patient, clinic or doctor"], ["proxy.ts", "JWT checked at the edge"], ["Route handlers", "REST API"], ["Prisma", "Typed queries"], ["PostgreSQL", "One data model"]],
    decisions: [
      ["Sessions in HTTP-only cookies", "Tokens are signed JWTs kept in HTTP-only cookies, so page scripts cannot read them."],
      ["Checked before the page loads", "Role-based protection runs in Next.js 16’s proxy.ts, ahead of any dashboard route."],
      ["Validated at the boundary", "Zod schemas check input on forms and API routes before it reaches the database."],
      ["Route groups by role", "Marketing site, auth flows and each dashboard live in separate route groups."],
    ],
    next: "mentorbridge",
  },
  mentorbridge: {
    number: "02",
    headline: "A mentorship platform that connects mentees with mentors.",
    problem:
      "Mentees need a clear way to find the right mentor, and mentors need a way to manage requests and availability. MentorBridge brings discovery, structured requests and session booking into one platform.",
    built: [
      "Role-based onboarding and dashboards for mentees, mentors and admins",
      "Mentor discovery with filters",
      "A request lifecycle: send, accept or reject",
      "Mentor availability management and session booking from open slots",
    ],
    flow: [["Browser", "Mentee, mentor or admin"], ["NextAuth", "Credentials and Google"], ["Route handlers", "Protected, role-aware"], ["Prisma", "Typed queries"], ["PostgreSQL", "Relational data"]],
    decisions: [
      ["Two ways to sign in", "Credentials and Google OAuth both go through NextAuth."],
      ["Role-aware routing", "Protected routes redirect by role, so each user lands on the right dashboard."],
      ["Tested", "Vitest and React Testing Library cover the app."],
      ["Checked on every push", "GitHub Actions runs the checks and strict TypeScript catches the rest."],
    ],
    next: "alafia",
  },
};
