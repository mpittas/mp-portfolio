import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

async function main() {
  const outDir = join(process.cwd(), "videos", "mikrofond", "assets");
  await mkdir(outDir, { recursive: true });

  console.log("Launching browser...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1.5,
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  });

  const page = await context.newPage();
  console.log("Navigating to https://www.mikrofond.bg/...");
  await page.goto("https://www.mikrofond.bg/", { waitUntil: "networkidle", timeout: 45000 });

  // Dismiss cookie banner or overlays if any
  try {
    const cookieBtns = page.getByRole("button", { name: /accept|съгласен|приемам|разбрах|agree|ок/i });
    if (await cookieBtns.count()) {
      await cookieBtns.first().click({ timeout: 3000 }).catch(() => {});
    }
  } catch (e) {}

  await page.evaluate(() => {
    // Remove cookie banner or dialog elements
    document.querySelectorAll('[id*="cookie" i], [class*="cookie" i], [id*="consent" i], [class*="consent" i], #CybotCookiebotDialog, .cky-consent-container').forEach(el => el.remove());
    // Remove invisible classes from elementor so everything is visible
    document.querySelectorAll('.elementor-invisible').forEach(el => el.classList.remove('elementor-invisible'));
    // Ensure smooth scrolling doesn't interfere
    document.documentElement.style.scrollBehavior = "auto";
  });

  await page.waitForTimeout(2000);

  // Scroll through page to trigger lazy loading of images
  console.log("Scrolling page to trigger lazy-loads...");
  const bodyHandle = await page.$("body");
  const boundingBox = await bodyHandle.boundingBox();
  const totalHeight = boundingBox ? boundingBox.height : 5400;
  console.log("Total page height:", totalHeight);

  for (let y = 0; y < totalHeight; y += 600) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(200);
  }

  // Ensure all animations and invisible items are resolved
  await page.evaluate(() => {
    document.querySelectorAll('.elementor-invisible').forEach(el => el.classList.remove('elementor-invisible'));
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1500);

  const fullPagePath = join(outDir, "full-page.png");
  console.log("Taking full page screenshot...");
  await page.screenshot({ path: fullPagePath, fullPage: true });

  const heroPath = join(outDir, "hero.png");
  await page.screenshot({ path: heroPath, fullPage: false });

  console.log("Screenshots saved successfully to", outDir);
  await browser.close();
}

main().catch(err => {
  console.error("Error during capture:", err);
  process.exit(1);
});
