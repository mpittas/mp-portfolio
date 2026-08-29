/**
 * One-off: capture Umedio gallery stills + cover from the live demo.
 * Usage: node scripts/capture-umedio.mjs
 */
import { copyFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const WIDTH = 1600;
const HEIGHT = 900;
const JPEG_QUALITY = 88;
const outDir = join(ROOT, "public", "media", "notion", "umedio");

/** @type {{ name: string, url: string, wait?: string, scrollY?: number, settleMs?: number }[]} */
const shots = [
  {
    name: "home",
    url: "https://umedio.vercel.app/",
    wait: "h1",
    settleMs: 3500,
  },
  {
    name: "workflows",
    url: "https://umedio.vercel.app/",
    wait: "h1",
    scrollY: 1400,
    settleMs: 2500,
  },
  {
    name: "features",
    url: "https://umedio.vercel.app/features",
    wait: "h1",
    settleMs: 3000,
  },
  {
    name: "pricing",
    url: "https://umedio.vercel.app/pricing",
    wait: "h1",
    settleMs: 3000,
  },
  {
    name: "case-study",
    url: "https://umedio.vercel.app/case-study",
    wait: "h1",
    settleMs: 3000,
  },
];

async function captureShot(page, shot, outPath) {
  await page.goto(shot.url, { waitUntil: "networkidle", timeout: 90_000 });
  if (shot.wait) {
    await page.waitForSelector(shot.wait, { timeout: 30_000 }).catch(() => {});
  }

  await page.addStyleTag({
    content: `
      *, *::before, *::after { scroll-behavior: auto !important; }
      html, body { scroll-behavior: auto !important; }
    `,
  });

  await page.evaluate(() => {
    try {
      sessionStorage.setItem("umedio-intro", "1");
    } catch {}
    document.documentElement.classList.add("intro-seen");
    document.documentElement.classList.remove("intro-active");
    document.querySelectorAll("[class*='Intro'], [class*='intro-overlay']").forEach((el) => {
      if (el instanceof HTMLElement && el.tagName !== "HTML" && el.tagName !== "BODY") {
        el.style.display = "none";
      }
    });
  });

  await page.waitForTimeout(shot.settleMs ?? 1500);

  if (shot.scrollY) {
    await page.evaluate((y) => window.scrollTo(0, y), shot.scrollY);
    await page.waitForTimeout(1000);
  } else {
    await page.evaluate(() => window.scrollTo(0, 0));
  }

  const png = await page.screenshot({ type: "png", fullPage: false });
  await sharp(png)
    .resize(WIDTH, HEIGHT, { fit: "cover", position: "top" })
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toFile(outPath);
  console.log(`  ✓ ${outPath}`);
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 2,
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
  });
  await context.addInitScript(() => {
    try {
      sessionStorage.setItem("umedio-intro", "1");
      document.documentElement.classList.add("intro-seen");
      document.documentElement.classList.remove("intro-active");
    } catch {}
  });
  const page = await context.newPage();

  console.log("\n→ umedio");
  for (const shot of shots) {
    const outPath = join(outDir, `${shot.name}.jpg`);
    try {
      await captureShot(page, shot, outPath);
    } catch (err) {
      console.error(`  ✗ ${shot.name}: ${err.message}`);
    }
  }

  await copyFile(join(outDir, "home.jpg"), join(outDir, "cover.jpg"));
  console.log(`  ✓ ${join(outDir, "cover.jpg")} (from home)`);

  await browser.close();
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
