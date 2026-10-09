/**
 * Build Dribbble-style catalog thumbnails with one shared template:
 * solid colour field, small title + stack pills, a large tilted hero screenshot.
 * Rendered with headless Chrome (system install) so type, shadows and perspective stay crisp.
 * Usage: node scripts/make-thumbnails.mjs
 */
import { createRequire } from "node:module";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath, pathToFileURL } from "node:url";
import { writeFile } from "node:fs/promises";
import { readFileSync } from "node:fs";

const ROOT = join(fileURLToPath(import.meta.url), "..", "..");
const { chromium } = createRequire(join(ROOT, "package.json"))("playwright");

const W = 1600;
const H = 1000;
const summaries = Object.fromEntries(JSON.parse(readFileSync(join(ROOT, "content/projects.json"), "utf8")).map((p) => [p.slug, p.summary]));
const url = (p) => pathToFileURL(join(ROOT, p)).href;

/** bg: field colour, glow: soft highlight, ink: text colour, shots: [hero] under public/media/notion. */
const jobs = [
  { slug: "klndr", variant: 1, title: "klndr", tags: ["Nuxt", "Firebase", "Tailwind"], bg: "#5b4bdb", glow: "#a79bff", ink: "#ffffff", shots: ["klndr/calendar.png", "klndr/planner.jpg"] },
  { slug: "digio", variant: 2, title: "Digio", tags: ["Next.js", "Three.js", "Motion"], bg: "#e8482c", glow: "#ff9a73", ink: "#ffffff", shots: ["digio/hero-live.webp", "digio/work.jpg"] },
  { slug: "realster", variant: 3, title: "Realster", tags: ["Next.js", "Motion", "Tailwind"], bg: "#0f6b4f", glow: "#4fd1a1", ink: "#ffffff", shots: ["realster/neighborhoods.jpg", "realster/how-it-works.jpg"] },
  { slug: "photofolio", variant: 4, title: "Photofolio", tags: ["Vue", "GSAP", "Tailwind"], bg: "#1c1b19", glow: "#6b6659", ink: "#f3eee2", shots: ["portfolio-modern/hero.jpg", "portfolio-modern/services.jpg"] },
  { slug: "know-your-geo", variant: 2, title: "KnowYourGeo", tags: ["Next.js", "Gemini", "Maps"], bg: "#2f4a1b", glow: "#8fbf5a", ink: "#f2f7e8", shots: ["know-your-geo/home.jpg", "know-your-geo/guides.jpg"] },
  { slug: "songrates", variant: 1, title: "Songrates", tags: ["Next.js", "Supabase", "Apple Music"], bg: "#ee4b83", glow: "#ffb0cb", ink: "#ffffff", shots: ["songrates/home.jpg", "songrates/album.jpg"] },
  { slug: "vscs-strapi", variant: 3, title: "VSCS", tags: ["Next.js", "Strapi", "i18n"], bg: "#b7e24b", glow: "#eaffa6", ink: "#10200a", shots: ["vscs-strapi/home.jpg", "vscs-strapi/projects.jpg"] },
  { slug: "mikrofond", variant: 4, title: "Mikrofond", tags: ["WordPress", "Elementor", "Figma"], bg: "#0e4c92", glow: "#4f9ef0", ink: "#ffffff", shots: ["mikrofond/za-nas.jpg", "mikrofond/kontakti.jpg"] },
  { slug: "collection-of-landing-pages", variant: 2, title: "Landing Pages", tags: ["Figma", "UI", "UX"], bg: "#f2a93b", glow: "#ffe0a0", ink: "#2a1700", shots: ["collection-of-landing-pages/studio.jpg", "collection-of-landing-pages/got.jpg"] },
  { slug: "dokr", variant: 1, title: "Dokr", tags: ["Next.js", "GSAP", "Motion"], bg: "#0b3b2e", glow: "#2fbf8f", ink: "#eafff6", shots: ["dokr/hero.jpg", "dokr/offers.jpg"] },
  { slug: "kallos", variant: 1, title: "Kallos", tags: ["React 19", "TypeScript", "Chart.js"], bg: "#3558f0", glow: "#9fb4ff", ink: "#ffffff", shots: ["kallos/dark.jpg", "kallos/home.jpg"] },
];

/** Perceived brightness 0..1 of a #rrggbb colour. */
function luma(hex) {
  const n = parseInt(hex.slice(1), 16);
  return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
}

/** Opacity that shifts the background by the same visible amount whatever the colour pair. */
const PATTERN_STRENGTH = 0.035;
function patternOpacity(job) {
  return Math.min(0.3, PATTERN_STRENGTH / Math.max(0.15, Math.abs(luma(job.ink) - luma(job.bg))));
}

/** Smooth flowing wave lines and soft rings behind the content; phase and tilt change per variant. */
function pattern(job) {
  const v = job.variant;
  const amp = [90, 140, 70, 120][v - 1];
  const flip = v % 2 ? 1 : -1;
  const lines = Array.from({ length: 11 }, (_, i) => {
    const y = -100 + i * 120;
    const a = amp * flip;
    return `<path d="M-100 ${y} C 250 ${y - a}, 550 ${y + a}, 800 ${y} S 1350 ${y - a}, 1700 ${y + a / 2}" />`;
  }).join("");
  const rings = [260, 420, 580, 740]
    .map((r) => `<circle cx="${[1400, 200, 800, 1500][v - 1]}" cy="${[900, 1000, -100, 150][v - 1]}" r="${r}" />`)
    .join("");
  return `<svg class="pattern" xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none" stroke="${job.ink}" stroke-width="2.5">
  <g opacity="${patternOpacity(job).toFixed(3)}">${lines}</g>
  <g opacity="${patternOpacity(job).toFixed(3)}">${rings}</g>
</svg>`;
}

function html(job) {
  const [hero] = job.shots;
  return `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: "Valley"; src: url("${url("app/fonts/ValleySans-Variable.woff2")}"); font-weight: 100 900; }
* { box-sizing: border-box; margin: 0; }
body { width: ${W}px; height: ${H}px; overflow: hidden; position: relative; font-family: "Valley", Helvetica, sans-serif;
  color: ${job.ink}; background:
    radial-gradient(900px 700px at 85% 15%, ${job.glow}55, transparent 70%),
    radial-gradient(900px 700px at 0% 100%, #00000033, transparent 70%),
    ${job.bg}; }
.pattern { position: absolute; inset: 0; z-index: 0; }
.text { position: absolute; left: 0; right: 0; top: 60px; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 16px; z-index: 5; }
h1 { font-size: 72px; font-weight: 600; letter-spacing: -0.03em; line-height: 1; }
.summary { max-width: 900px; font-size: 32px; line-height: 1.3; letter-spacing: -0.01em; opacity: 0.85; }
.tags { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 4px; }
.tags span { font-size: 26px; padding: 10px 22px; border-radius: 999px; border: 1.5px solid ${job.ink}55; }
.shot { position: absolute; left: 160px; top: 400px; width: 1280px; overflow: hidden; border-radius: 22px; background: #fff; box-shadow: 0 60px 100px -40px #00000066, 0 0 0 1.5px #ffffff26; }
.shot img { width: 100%; height: auto; display: block; }

/* Centred title, description and stack at the top; straight screenshot centred below, cropped by the bottom edge. */

</style></head><body class="v${job.variant}">
${pattern(job)}
<div class="shot"><img src="${url(`public/media/notion/${hero}`)}"></div>
<div class="text">
  <h1>${job.title}</h1>
  <p class="summary">${summaries[job.slug] ?? ""}</p>
  <div class="tags">${job.tags.map((t) => `<span>${t}</span>`).join("")}</div>
</div>
</body></html>`;
}

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: W, height: H } });
for (const job of jobs) {
  const file = join(tmpdir(), `thumb-${job.slug}.html`);
  await writeFile(file, html(job));
  await page.goto(pathToFileURL(file).href);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => [...document.images].every((i) => i.complete));
  const out = join(ROOT, "public/media/thumbs", `${job.slug}-v22.jpg`);
  await page.screenshot({ path: out, type: "jpeg", quality: 92 });
  console.log(`wrote ${out}`);
}
await browser.close();
