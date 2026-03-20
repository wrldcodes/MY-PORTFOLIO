// ─── Personal Info ───────────────────────────────────────────────────────────

export const personal = {
  name: "Jubril Elebute",
  role: "Frontend Developer",
  bio: `Hi, I'm Jubril, a frontend developer in training with a background in biochemistry.
        I enjoy turning ideas into clean, responsive, and user-friendly websites.
        Right now, I'm focused on mastering CSS and JavaScript while building projects
        that show my growth. My goal is to land my first role in web development and
        contribute to real-world solutions.`,
  worksheetUrl:
    "https://docs.google.com/document/d/1D8jbwHegkmxopPcPBbvtAPEzJ_O0KEl4dmAL00BL81o/edit?usp=sharing",
  profileImage: "/jubril.linkedIn.jpg",
};

// ─── Social Links ─────────────────────────────────────────────────────────────

export const socialLinks = [
  {
    id: "github",
    title: "Github",
    href: "https://github.com/wrldcodes",
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    href: "http://linkedin.com/in/jubril-elebute",
  },
  {
    id: "email",
    title: "Email",
    href: "mailto:jubrilelebute36@gmail.com",
  },
  {
    id: "phone",
    title: "Phone",
    href: "tel:+2348086649040",
  },
  {
    id: "x",
    title: "X",
    href: "https://x.com/wolaelebute?s=21",
  },
];

// ─── Projects ────────────────────────────────────────────────────────────────

export const projects = [
  {
    id: "troflixx",
    title: "Troflixx",
    liveUrl: "https://troflixx.vercel.app",
    description:
      "A movie discovery app with fast search, trending views, and detailed movie pages powered by live TMDB data.",
    stack: ["React (Vite)", "Tailwind CSS", "TanStack Query", "TMDB API"],
    image: "/troflixx.png",
    imageAlt:
      "Magenta Lime layout, featuring albums, reviews, a playlist, and an audio interface.",
    imageBorder: false,
  },
  {
    id: "mentorbridge",
    title: "MentorBridge",
    liveUrl: "https://mentorbridge-pi.vercel.app",
    description:
      "A mentorship platform where mentees discover mentors by skills and goals, with secure auth and structured profile data.",
    stack: [
      "Next.js (App Router)",
      "TypeScript",
      "Prisma + PostgreSQL",
      "NextAuth",
    ],
    image: "/Mentorbridge.png",
    imageAlt:
      "Grid-based layout with 3 columns and 4 rows, some merged, featuring planets and moons.",
    imageBorder: true,
  },
  {
    id: "wordoon",
    title: "Wordoon",
    liveUrl: null,
    description:
      "A Wordle-inspired game with clean UI and responsive gameplay, focused on smooth interactions and clear feedback.",
    stack: ["React (Vite)", "TypeScript", "Tailwind CSS"],
    image: "/project-wordoon.svg",
    imageAlt:
      "Our Team page featuring 6 images of people in 2 rows with social media icons overlapping each image.",
    imageBorder: false,
  },
];

// ─── Footer Data ──────────────────────────────────────────────────────────────

export const footerColumns = [
  {
    id: "portfolio",
    heading: "Portfolio:",
    links: [
      { label: "GitHub Profile", href: "https://github.com/wrldcodes" },
      {
        label: "LinkedIn",
        href: "http://linkedin.com/in/jubril-elebute",
      },
      { label: "Download CV", href: "/Jubril-Elebute-CV.pdf" },
      { label: "Project Worksheet", href: personal.worksheetUrl },
    ],
  },
  {
    id: "stack",
    heading: "Project Stack:",
    links: [
      { label: "React", href: "https://react.dev/" },
      { label: "Vite", href: "https://vite.dev/" },
      { label: "Tailwind CSS", href: "https://tailwindcss.com/" },
    ],
  },
  {
    id: "workflow",
    heading: "Workflow:",
    links: [
      {
        label: "GSAP",
        href: "https://gsap.com/",
      },
      {
        label: "GitHub Actions",
        href: "https://github.com/features/actions",
      },
      {
        label: "Playwright",
        href: "https://playwright.dev/",
      },
    ],
  },
];
