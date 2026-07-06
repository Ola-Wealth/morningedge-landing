// Renders playbook.html to a print-ready A4 PDF + page screenshots for review.
import { chromium } from "playwright";
import { mkdirSync } from "fs";
import { fileURLToPath, pathToFileURL } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlPath = join(__dirname, "..", "portfolio-exports", "playbook.html");
const outPdf = join(__dirname, "..", "portfolio-exports", "The-AI-Edge-Prompt-Playbook.pdf");
const shotDir = join(__dirname, "..", "portfolio-exports", "_verify");
mkdirSync(shotDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(600);

await page.pdf({ path: outPdf, format: "A4", printBackground: true });

const pages = page.locator(".pg");
const count = await pages.count();
for (let i = 0; i < count; i++) {
  await pages.nth(i).screenshot({ path: join(shotDir, `pb-${String(i + 1).padStart(2, "0")}.png`) });
}
await browser.close();
console.log(`Saved PDF (${count} pages): ${outPdf}`);
