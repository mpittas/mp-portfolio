# Prompt: redesign my portfolio for a senior front-end job search

Copy everything below the line into Claude Code, opened in the portfolio repo.

---

You are acting as a technical recruiter and a senior front-end engineer. I am applying for **senior front-end developer roles in Bulgaria, fully remote or hybrid**. Redesign my portfolio so it proves senior-level engineering, then give me recruiter-style feedback on what I am still missing.

## Before you start

- Read `AGENTS.md` and the relevant guide in `node_modules/next/dist/docs/` first. This is Next.js 16 and differs from what you know.
- Read `PRODUCT.md`, `DESIGN.md`, `content/site.json`, `content/projects.json`, `lib/content.ts` and the CV at `public/media/site/cv/Marios_Pittas_CV.pdf` (use `pdftotext -layout`).
- Look at the live site at https://www.mpittas.com/ and compare it with the CV. List every inconsistency before changing anything.
- Do not overwrite uncommitted work without checking `git status` and `git diff` first. Work on a new branch.

## Who I am (facts you may use)

Marios Pittas, front-end developer, Vratsa, Bulgaria. Career: Front-End Developer at Webiorr (Jun 2016 - Jul 2018, 20+ client sites), UI Designer at CoinMarketLaunch (Sep 2018 - Apr 2020, 15+ projects), Front-End Developer at Tech City Ventures (May 2020 - Nov 2021, React component library reused across 5+ projects, MUI and Ant Design), Front-End Developer at OutsourceBulgaria (Dec 2021 - present, React and Webflow from Figma, Agile/Scrum, cut design-to-dev handoff time by about 30%). English C1, Bulgarian native. BA in Web Design & Image Advertising, Sofia, part-time, expected 2027. Skills from the CV: React, Next.js, Vue/Nuxt, TypeScript, Tailwind, Redux, Jest, Cypress, WCAG 2.1, Git, CI/CD, Vercel, Figma.

**Honesty rule:** use only facts from the CV, the existing project files, or things you build in this session. Never invent employers, clients, metrics, awards, testimonials or years. If a claim needs a number I do not have, leave it out and list it for me to supply.

## What to change

1. **Positioning.** Lead with "Senior Front-End Developer" and engineering evidence, not "designer who codes". Remove my age. Fix typos. Show availability (remote or hybrid in Bulgaria, time zone, languages), email, GitHub, LinkedIn (https://www.linkedin.com/in/mariospittas/) and CV on the first screen.
2. **Projects.** Keep only real apps with public code: klndr, VSCS, Songrates, KnowYourGeo. Remove concept or placeholder work (Dokr, Realster, Photofolio, Digio, Collection of Landing Pages) and the WordPress/Elementor site (Mikrofond). Delete their media. Rewrite each case study with the same structure: kind, my role, problem, what I built, 3 engineering decisions, stack, links. Use only facts already in the repo.
3. **New example projects ("Labs").** Build two real, working demos inside the site, not mock-ups:
   - **Primitives:** accessible Tabs, Dialog (native `<dialog>`), Combobox (ARIA 1.2) and Toast built without a UI library, with keyboard support and focus management.
   - **Ledger:** a typed data table of 10,000 generated rows with sorting, filtering, windowed rendering, `aria-rowcount`/`aria-rowindex`, URL-synced state and a visible render-cost readout.
   Put the logic in pure, typed modules. Add tests with Vitest and Testing Library. Label both clearly as self-initiated labs.
4. **New sections on the home page:** proof strip (only CV-backed numbers), selected work, labs, "how I work" (testing, accessibility, performance, collaboration), stack grouped by how much I use it, compact experience, contact call to action.
5. **About page:** short story, what I am looking for, experience with achievements from the CV, education and courses, languages, interests. Fix the dates and titles so they match the CV.
6. **Contact page:** show email and LinkedIn directly, not only the form.
7. **Engineering hygiene:** add a GitHub Actions workflow running lint, type check, tests and a production build. Add JSON-LD `Person` data, `sitemap.ts`, `robots.ts`, and make sure Open Graph images still work.
8. **Cleanup:** remove the unused layout variants under `app/v/`, the mobile redirect in `proxy.ts`, and any dead components. Update `PRODUCT.md` and `DESIGN.md` to match the new positioning.
9. **Design:** keep the quiet black-and-neutral look, Valley Sans, hairline rules and square corners. Respect `prefers-reduced-motion`. Keyboard access and visible focus everywhere. Mobile first.

## Verify

Run `npm run lint`, `npx tsc --noEmit`, the tests and `npm run build`. Start the dev server and check the home page, About, Contact, one case study, `/labs`, both labs, mobile width and dark mode. Check the browser console for errors. Do not tell me it works until you have seen it work.

## Deliverables

- The redesigned site on a new branch (do not commit until I say so).
- `docs/recruiter-feedback.md`: your honest recruiter review of the site, CV and gaps, ordered by impact. Cover at least: CV and site inconsistencies (years of experience, job titles, degree dates, stale demo links), missing seniority signals (leadership, mentoring, architecture decisions, ownership), the lack of named product work in the last four years of employment, testing evidence, and what to add to LinkedIn.
- A short summary of what you removed, added and could not verify.

Keep your final message to a few lines and link the files.
