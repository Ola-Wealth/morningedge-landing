// Screenshots each portfolio page for visual verification.
import { chromium } from "playwright";
import { fileURLToPath, pathToFileURL } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlPath = join(__dirname, "..", "portfolio-exports", "portfolio.html");
const outDir = join(__dirname, "..", "portfolio-exports", "_verify");
import { mkdirSync } from "fs";
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 960 }, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(500);

const pages = page.locator(".page");
const n = await pages.count();
for (let i = 0; i < n; i++) {
  await pages.nth(i).screenshot({ path: join(outDir, `page-${String(i + 1).padStart(2, "0")}.png`) });
}
await browser.close();
console.log(`Captured ${n} pages.`);
