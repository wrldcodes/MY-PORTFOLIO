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
  { label: "Work", href: "#work" },
  { label: "Stack", href: "#stack" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const projects = [
  {
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
