/**
 * Capture 1600×900 gallery stills from live project demos.
 * Usage: node scripts/capture-project-stills.mjs
 */
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const WIDTH = 1600;
const HEIGHT = 900;
const JPEG_QUALITY = 88;

/** @type {{ folder: string, shots: { name: string, url: string, wait?: string, scrollY?: number, settleMs?: number }[] }[]} */
const JOBS = [
  {
    folder: "know-your-geo",
    shots: [
      {
        name: "home",
        url: "https://knowyourgeo.vercel.app/",
        wait: "h1",
        settleMs: 2500,
      },
      {
        name: "ai-coach",
        url: "https://knowyourgeo.vercel.app/",
        wait: "h1",
        scrollY: 1600,
        settleMs: 2000,
      },
      {
        name: "guides",
        url: "https://knowyourgeo.vercel.app/guides/bollards-road-furniture-geoguessr/",
        wait: "h1",
        settleMs: 2000,
      },
    ],
  },
  {
    folder: "songrates",
    shots: [
      {
        name: "home",
        url: "https://songrates.vercel.app/",
        wait: "body",
        settleMs: 3000,
      },
      {
        name: "album",
        url: "https://songrates.vercel.app/album/6796864741",
        wait: "body",
        settleMs: 3000,
      },
      {
        name: "playlist",
        url: "https://songrates.vercel.app/apple-playlist/pl.d25f5d1181894928af76c85c967f8f31",
        wait: "body",
        settleMs: 3000,
      },
    ],
  },
];

async function dismissCookies(page) {
  const labels = ["Essential only", "Accept analytics", "Accept", "Agree"];
  for (const label of labels) {
    const btn = page.getByRole("button", { name: label });
    if (await btn.count()) {
      await btn.first().click({ timeout: 2000 }).catch(() => {});
      await page.waitForTimeout(300);
      break;
    }
  }
  await page.evaluate(() => {
    document
      .querySelectorAll(
        '[id*="cookie" i], [class*="cookie" i], [id*="consent" i], [class*="consent" i], [aria-label*="cookie" i]',
      )
      .forEach((el) => el.remove());
  });
}

async function hideChrome(page) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after { scroll-behavior: auto !important; }
      [data-lenis-prevent], html { scroll-behavior: auto !important; }
      cookie-banner, [id*="cookie" i], [class*="cookie" i], [class*="Cookie"],
      [id*="consent" i], [class*="consent" i], [aria-label*="cookie" i],
      [class*="Cookiebot"], #CybotCookiebotDialog {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
    `,
  });
  await dismissCookies(page);
}

async function captureShot(page, shot, outPath) {
  await page.goto(shot.url, { waitUntil: "networkidle", timeout: 90_000 });
  if (shot.wait) {
    await page.waitForSelector(shot.wait, { timeout: 30_000 }).catch(() => {});
  }
  await hideChrome(page);
  await page.waitForTimeout(shot.settleMs ?? 1500);

  if (shot.scrollY) {
    await page.evaluate((y) => window.scrollTo(0, y), shot.scrollY);
    await page.waitForTimeout(800);
  } else {
    await page.evaluate(() => window.scrollTo(0, 0));
  }

  await dismissCookies(page);

  const png = await page.screenshot({ type: "png", fullPage: false });
  await mkdir(dirname(outPath), { recursive: true });
  await sharp(png)
    .resize(WIDTH, HEIGHT, { fit: "cover", position: "top" })
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toFile(outPath);
  console.log(`  ✓ ${outPath}`);
}

async function cropFromFullPage(src, outPath, topY = 0) {
  const meta = await sharp(src).metadata();
  const w = meta.width ?? 1920;
  const cropH = Math.round((w / WIDTH) * HEIGHT);
  await sharp(src)
    .extract({
      left: 0,
      top: Math.min(topY, Math.max(0, (meta.height ?? cropH) - cropH)),
      width: w,
      height: Math.min(cropH, meta.height ?? cropH),
    })
    .resize(WIDTH, HEIGHT, { fit: "cover", position: "top" })
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toFile(outPath);
  console.log(`  ✓ ${outPath} (from ${src})`);
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 2,
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
  });
  const page = await context.newPage();

  for (const job of JOBS) {
    console.log(`\n→ ${job.folder}`);
    const outDir = join(ROOT, "public", "media", "notion", job.folder);
    await mkdir(outDir, { recursive: true });
    for (const shot of job.shots) {
      const outPath = join(outDir, `${shot.name}.jpg`);
      try {
        await captureShot(page, shot, outPath);
      } catch (err) {
        console.error(`  ✗ ${shot.name}: ${err.message}`);
      }
    }
  }

  await browser.close();

  // VSCS: live inner routes 404; crop authored full-page captures instead.
  const vscsAssets = join(ROOT, "videos", "vscs", "assets");
  const vscsOut = join(ROOT, "public", "media", "notion", "vscs-strapi");
  const fallbacks = [
    { src: "page-home.png", name: "home", topY: 0 },
    { src: "page-services.png", name: "services", topY: 0 },
    { src: "page-projects.png", name: "projects", topY: 0 },
    { src: "page-home.png", name: "home-mid", topY: 2200 },
  ];
  console.log("\n→ vscs full-page crops");
  for (const f of fallbacks) {
    try {
      await cropFromFullPage(join(vscsAssets, f.src), join(vscsOut, `${f.name}.jpg`), f.topY);
    } catch (err) {
      console.error(`  ✗ ${f.name}: ${err.message}`);
    }
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
