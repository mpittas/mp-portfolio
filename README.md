# Marios Pittas, Product Designer

Portfolio built with Next.js 16, React 19 and Tailwind CSS v4.

```bash
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

## Where things live

- `content/site.json`: name, role, intro, stats, capabilities, process, experience, education, other work.
- `content/projects.ts`: case studies. Each project is either `shipped` or `concept` and is built from typed blocks (`lib/types.ts`).
- `components/mocks/`: concept screens built in code (Clearing, Renewal Radar). Edit `mocks.css` for their styling.
- `app/globals.css`: design tokens and utilities. See `DESIGN.md`.
- `PRODUCT.md`: audience, positioning and the rules for what the site may claim.

## Adding a case study

1. Add a `Project` to `content/projects.ts` and drop images in `public/media/`.
2. Use real screenshots for shipped work. For concepts, build screens in `components/mocks` and register them in `components/mocks/index.tsx`, or use `cover: { type: "type", mark }` for a written case study with no images.
3. Keep concept validation written as a plan, never as results.

## Contact form

Needs SMTP settings. Copy `.env.example` to `.env.local` and fill it in.

## Open Graph images

`npm run export:og` (with the dev server running) saves every OG image to `og-previews/`.
