// One-off script: exports each landing page section as a standalone PNG for portfolio use.
// Usage: node scripts/export-sections.mjs
import { chromium } from "playwright";
import { mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "portfolio-exports");
const URL = "http://localhost:3001";

mkdirSync(OUT_DIR, { recursive: true });

const sections = [
  { name: "00-navbar", selector: "nav" },
  { name: "01-hero", selector: "main > section:nth-of-type(1)" },
  { name: "02-problem", selector: "main > section:nth-of-type(2)" },
  { name: "03-overview", selector: "main > section:nth-of-type(3)" },
  { name: "04-how-it-works", selector: "main > section:nth-of-type(4)" },
  { name: "05-who-its-for", selector: "main > section:nth-of-type(5)" },
  { name: "06-deliverables", selector: "main > section:nth-of-type(6)" },
  { name: "07-value-stack", selector: "main > section:nth-of-type(7)" },
  { name: "08-pricing", selector: "main > section:nth-of-type(8)" },
  { name: "09-guarantee", selector: "main > section:nth-of-type(9)" },
  { name: "10-faq", selector: "main > section:nth-of-type(10)" },
  { name: "11-team-training", selector: "main > section:nth-of-type(11)" },
  { name: "12-register", selector: "main > section:nth-of-type(12)" },
  { name: "13-footer", selector: "footer" },
];

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1280, height: 1000 },
  deviceScaleFactor: 2,
});

await page.goto(URL, { waitUntil: "networkidle" });

for (const { name, selector } of sections) {
  const el = page.locator(selector).first();
  await el.scrollIntoViewIfNeeded();

  // Navbar's scrolled (solid background) state looks better as a standalone frame
  // than its transparent-over-hero default state.
  if (selector === "nav") {
    await page.evaluate(() => window.scrollTo(0, 80));
    await page.waitForTimeout(400);
  }

  // Let FadeIn (whileInView, 0.4s + per-item delay) finish before capturing.
  await page.waitForTimeout(900);

  await el.screenshot({ path: join(OUT_DIR, `${name}.png`) });
  console.log(`Saved ${name}.png`);

  if (selector === "nav") {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);
  }
}

await browser.close();
console.log(`\nDone. Files saved to: ${OUT_DIR}`);
