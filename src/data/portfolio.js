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
    description:
      "Troflixx is a movie discovery web application that I built using a movie API. The goal of the project was to provide users with an easy way to explore trending films, search for specific titles, and view detailed information about each movie. In building Troflixx, I focused on learning how to fetch and display data from APIs while designing a clean, responsive interface that makes browsing enjoyable.",
    stack: [
      "React (Vite)",
      "Tailwind CSS",
      "TanStack Query",
      "Appwrite",
      "TMDB API",
      "Playwright",
      "GitHub Actions",
    ],
    image: "/troflixx.png",
    imageAlt:
      "Magenta Lime layout, featuring albums, reviews, a playlist, and an audio interface.",
    imageBorder: false,
  },
  {
    id: "mentorbridge",
    title: "MentorBridge",
    description:
      "The idea behind the project is to make mentorship opportunities more accessible by allowing mentees to find mentors based on skills, goals, or shared interests. Building MentorBridge helped me practice designing user flows, managing authentication, and creating a professional, community-driven platform that solves a real-world problem.",
    stack: [
      "Next.js (App Router)",
      "React 19 + TypeScript",
      "Tailwind CSS",
      "Prisma + PostgreSQL",
      "NextAuth (Google + Credentials)",
      "Vitest + React Testing Library",
    ],
    image: "/Mentorbridge.png",
    imageAlt:
      "Grid-based layout with 3 columns and 4 rows, some merged, featuring planets and moons.",
    imageBorder: true,
  },
  {
    id: "wordoon",
    title: "Wordoon",
    description:
      "Woordoon is a fun and interactive word game I built, inspired by the popular Wordle. The game challenges players to guess words within a limited number of attempts, making it both entertaining and mentally stimulating. While the core idea is simple, I focused on adding my own touch by designing a smooth user interface, implementing clear game logic, and ensuring the game works seamlessly on both desktop and mobile devices.",
    stack: ["React (Vite)", "TypeScript", "Tailwind CSS", "Game State Logic"],
    image: "/project-wordoon.svg",
    imageAlt:
      "Our Team page featuring 6 images of people in 2 rows with social media icons overlapping each image.",
    imageBorder: false,
  },
];

// ─── Footer Data ──────────────────────────────────────────────────────────────

export const footerColumns = [
  {
    id: "blogging",
    heading: "Blogging:",
    links: [
      { label: "learntoteach.tech", href: "https://learntoteach.tech/" },
      {
        label: "Microblog open source contributions",
        href: "https://github.com/microdotblog",
      },
    ],
  },
  {
    id: "opensource",
    heading: "Open Source:",
    links: [
      { label: "This-social / that-website", href: null },
      { label: "that / angular-website", href: null },
      { label: "Them / docs", href: null },
    ],
  },
  {
    id: "courses",
    heading: "Other Courses:",
    links: [
      {
        label: "My Frontend Masters courses",
        href: "https://frontendmasters.com/teachers/jen-kramer/",
      },
      {
        label: "Personal Portfolio Website course",
        href: "https://frontendmasters.com/courses/portfolio-website/",
      },
      {
        label: "Intermediate HTML & CSS course",
        href: "https://frontendmasters.com/courses/intermediate-html-css/",
      },
    ],
  },
];
