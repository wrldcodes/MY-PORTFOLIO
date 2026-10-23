# Jubril Elebute: portfolio

Next.js (App Router), TypeScript, plain CSS. Server Components by default; client code only where the browser is needed.

## Run it
```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm lint && pnpm typecheck && pnpm build
```

## Where things live
- `lib/content.ts`: all text, projects, stack and links. **Edit this to change the site.**
- `components/`: one small component per section.
  - `Nav.tsx`, `CopyEmail.tsx`: client components. Their only state is "menu open" and "copy message".
  - `Effects.tsx`, `Network.tsx`: client components that touch the DOM directly (refs, no state, no re-renders).
  - Everything else is a Server Component and ships no JavaScript.
- `app/layout.tsx`: fonts, metadata, JSON-LD (Person, WebSite, ProfilePage).
- `app/robots.ts`, `app/sitemap.ts`, `app/opengraph-image.tsx`, `public/llms.txt`: SEO and AI-crawler files.
- `app/globals.css`: design tokens (dark and light), layout and motion.

## Before you deploy
1. Set `NEXT_PUBLIC_SITE_URL` in Vercel to your real domain. It drives canonical URLs, the sitemap and structured data.
2. Fonts load from Google Fonts at build time, so the first build needs internet access.
3. Put the site URL on your GitHub, LinkedIn and X profiles, then add the site to Google Search Console and submit `/sitemap.xml`.
4. Run Lighthouse on the deployed URL and check the mobile menu on a real phone.

## Not included yet
Vitest unit tests, a Playwright smoke test, and GSAP/Lenis smooth scrolling. The current motion is CSS plus small DOM effects.
