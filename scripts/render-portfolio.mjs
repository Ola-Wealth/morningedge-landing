// Renders portfolio.html into a print-quality 4:3 PDF (1280x960 px pages).
import { chromium } from "playwright";
import { fileURLToPath, pathToFileURL } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlPath = join(__dirname, "..", "portfolio-exports", "portfolio.html");
const outPath = join(__dirname, "..", "portfolio-exports", "The-AI-Edge-Portfolio.pdf");

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(600);

await page.pdf({
  path: outPath,
  width: "1280px",
  height: "960px",
  printBackground: true,
  pageRanges: "",
});

await browser.close();
console.log(`Saved PDF: ${outPath}`);
