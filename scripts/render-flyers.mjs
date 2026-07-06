// Renders each flyer as a print-ready 2x PNG (2160x2700).
import { chromium } from "playwright";
import { fileURLToPath, pathToFileURL } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlPath = join(__dirname, "..", "portfolio-exports", "flyers.html");
const outDir = join(__dirname, "..", "portfolio-exports");

const flyers = [
  { id: "#f0", file: "Flyer-0-Cover.png" },
  { id: "#f1", file: "Flyer-1-Who-Its-For.png" },
  { id: "#f2", file: "Flyer-2-Starting-Price.png" },
  { id: "#f3", file: "Flyer-3-Outcome.png" },
  { id: "#fc", file: "Flyer-4-Close.png" },
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });
await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(500);

for (const f of flyers) {
  await page.locator(f.id).screenshot({ path: join(outDir, f.file) });
  console.log(`Saved ${f.file}`);
}
await browser.close();
console.log("Done.");
