// Generates a WhatsApp QR for the flyers (navy modules on white).
import QRCode from "qrcode";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, "..", "portfolio-exports", "img", "qr-wa.png");

const url = "https://wa.me/2348100526153?text=" +
  encodeURIComponent("Hi MorningEdge, I'm interested in The AI Edge program.");

await QRCode.toFile(out, url, {
  color: { dark: "#0a0a2e", light: "#ffffff" },
  margin: 1,
  width: 720,
  errorCorrectionLevel: "H",
});
console.log("Saved qr-wa.png");
