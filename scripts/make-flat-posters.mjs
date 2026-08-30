/**
 * Build flat catalog posters: brand dark field + centered screenshot stuck to bottom.
 * Usage: node scripts/make-flat-posters.mjs
 */
import sharp from "sharp";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(import.meta.url), "..", "..");
const W = 1920;
const H = 1080;
const SHOT_WIDTH = 1640;
const TOP_RADIUS = 22;

const jobs = [
  {
    out: "public/media/notion/know-your-geo/cover-poster.jpg",
    shot: "public/media/notion/know-your-geo/home.jpg",
    bg: { r: 9, g: 14, b: 6 }, // #090e06
  },
  {
    out: "public/media/notion/songrates/cover-poster.jpg",
    shot: "public/media/notion/songrates/home.jpg",
    bg: { r: 15, g: 12, b: 17 }, // #0F0C11
  },
  {
    out: "public/media/notion/mikrofond/cover-poster.jpg",
    shot: "public/media/notion/mikrofond/finansirane.jpg",
    bg: { r: 6, g: 16, b: 30 }, // #06101e
  },
];

/** Round top corners only so the plate can sit flush on the canvas bottom. */
function topRoundedMask(width, height, radius) {
  const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <path d="M0,${radius}
    Q0,0 ${radius},0
    H${width - radius}
    Q${width},0 ${width},${radius}
    V${height}
    H0
    Z" fill="#fff"/>
</svg>`);
  return sharp(svg).png().toBuffer();
}

async function softShadow(width, height, radius) {
  const pad = 56;
  const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width + pad * 2}" height="${height + pad}">
  <defs>
    <filter id="b" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="20"/>
    </filter>
  </defs>
  <path d="M${pad},${pad + radius}
    Q${pad},${pad} ${pad + radius},${pad}
    H${pad + width - radius}
    Q${pad + width},${pad} ${pad + width},${pad + radius}
    V${pad + height}
    H${pad}
    Z" fill="rgba(0,0,0,0.5)" filter="url(#b)"/>
</svg>`);
  return { buffer: await sharp(svg).png().toBuffer(), pad };
}

function vignette(bg) {
  const lift = (n) => Math.min(255, n + 16);
  const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <radialGradient id="g" cx="50%" cy="38%" r="70%">
      <stop offset="0%" stop-color="rgb(${lift(bg.r)},${lift(bg.g)},${lift(bg.b)})"/>
      <stop offset="100%" stop-color="rgb(${bg.r},${bg.g},${bg.b})"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
</svg>`);
  return sharp(svg).png().toBuffer();
}

for (const job of jobs) {
  const resized = await sharp(join(ROOT, job.shot))
    .resize({ width: SHOT_WIDTH, withoutEnlargement: false })
    .ensureAlpha()
    .png()
    .toBuffer();
  const meta = await sharp(resized).metadata();
  const sw = meta.width;
  const sh = meta.height;
  const mask = await topRoundedMask(sw, sh, TOP_RADIUS);
  const plate = await sharp(resized)
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();

  const { buffer: shadow, pad } = await softShadow(sw, sh, TOP_RADIUS);
  const left = Math.round((W - sw) / 2);
  const top = H - sh;
  const backdrop = await vignette(job.bg);

  await sharp(backdrop)
    .composite([
      { input: shadow, left: left - pad, top: top - pad },
      { input: plate, left, top },
    ])
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(join(ROOT, job.out));

  console.log(`wrote ${job.out} (${sw}x${sh} at y=${top})`);
}
