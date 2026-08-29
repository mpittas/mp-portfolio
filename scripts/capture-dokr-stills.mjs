/**
 * Capture 1600×900 gallery stills from the Dokr demo.
 * Usage: node scripts/capture-dokr-stills.mjs
 */
import { copyFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "media", "notion", "dokr");
const WIDTH = 1600;
const HEIGHT = 900;
const URL = "https://dokr-kohl.vercel.app/";

const SHOTS = [
  { name: "hero", find: /building the future/i },
  { name: "offers", find: /elevate your financial/i },
  { name: "freedom", find: /your financial freedom/i },
  { name: "faq", find: /how do i create an account/i },
];

async function waitOutPreloader(page) {
  await page.waitForFunction(
    () => {
      const text = document.body.innerText || "";
      return /building the future/i.test(text);
    },
    { timeout: 30_000 },
  );
  await page.waitForTimeout(1800);
}

async function scrollToMatch(page, pattern) {
  const found = await page.evaluate((source) => {
    const re = new RegExp(source, "i");
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (re.test(node.textContent || "")) {
        const el = node.parentElement;
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo(0, Math.max(0, top - 80));
        return true;
      }
    }
    return false;
  }, pattern.source);
  await page.waitForTimeout(900);
  return found;
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 2,
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
  });
  const page = await context.newPage();

  await page.goto(URL, { waitUntil: "networkidle", timeout: 90_000 });
  await waitOutPreloader(page);

  for (const shot of SHOTS) {
    if (shot.name === "hero") {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(400);
    } else {
      const ok = await scrollToMatch(page, shot.find);
      if (!ok) console.warn(`  ! ${shot.name}: text not found, shooting current viewport`);
    }

    const outPath = join(OUT, `${shot.name}.jpg`);
    await page.screenshot({
      path: outPath,
      type: "jpeg",
      quality: 88,
      fullPage: false,
    });
    console.log(`  ✓ ${outPath}`);
  }

  await copyFile(join(OUT, "hero.jpg"), join(OUT, "cover.jpg"));
  await copyFile(join(OUT, "hero.jpg"), join(OUT, "cover-poster.jpg"));
  console.log("  ✓ cover.jpg + cover-poster.jpg from hero");

  await browser.close();
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
