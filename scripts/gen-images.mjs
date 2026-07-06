// Generates brand-fit, photorealistic portfolio images via Gemini image model.
// Key is read from env (GEMINI_KEY) — never hardcoded/committed.
import { writeFileSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "portfolio-exports", "img");
mkdirSync(OUT, { recursive: true });

const KEY = process.env.GEMINI_KEY;
if (!KEY) { console.error("Missing GEMINI_KEY"); process.exit(1); }

const MODEL = process.env.GEN_MODEL || "gemini-2.5-flash-image";
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`;

const jobs = [
  {
    name: "ai-2", ar: "4:3", count: 1,
    prompt: "Realistic cinematic photograph of a career professional at a sleek modern desk actively using a laptop, with subtle translucent holographic AI dashboards and glowing data charts floating around the screen, focused and engaged, deep navy and electric-blue color grade, moody directional lighting with blue rim light, shallow depth of field, premium corporate marketing photography, photorealistic, ultra detailed, no text, no watermark",
  },
  {
    name: "ai-4", ar: "3:4", count: 2,
    prompt: "Realistic cinematic portrait of a confident Black African businessman in his late 30s in a smart business-casual shirt, working on a laptop at a modern desk with a glowing AI chat assistant interface subtly visible on the screen, focused concentrated expression looking at his work, soft directional window light, deep navy-blue cinematic color grade with electric-blue accents, shallow depth of field, premium corporate photography, photorealistic, sharp detailed eyes, no text",
  },
  {
    name: "ai-6", ar: "3:4", count: 2,
    prompt: "Realistic cinematic portrait of a confident Black African businesswoman in her late 30s wearing a modern professional blazer, holding a tablet displaying an AI assistant interface, standing in a softly blurred contemporary office, warm confident smile looking toward the camera, deep navy-blue cinematic color grade with subtle electric-blue accents, shallow depth of field, premium corporate photography, photorealistic, sharp detailed eyes, no text",
  },
];

async function genOne(job, suffix) {
  const body = {
    contents: [{ parts: [{ text: job.prompt }] }],
    generationConfig: { responseModalities: ["IMAGE"], imageConfig: { aspectRatio: job.ar } },
  };
  const res = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) { console.error(`${job.name}-${suffix} FAILED ${res.status}: ${(await res.text()).slice(0, 400)}`); return; }
  const data = await res.json();
  const parts = data?.candidates?.[0]?.content?.parts || [];
  const img = parts.find((p) => p.inlineData?.data);
  if (!img) { console.error(`${job.name}-${suffix} no image: ${JSON.stringify(data).slice(0, 300)}`); return; }
  const file = join(OUT, `${job.name}-${suffix}.png`);
  writeFileSync(file, Buffer.from(img.inlineData.data, "base64"));
  console.log(`Saved ${job.name}-${suffix}.png`);
}

for (const job of jobs) {
  for (let i = 0; i < job.count; i++) {
    await genOne(job, String.fromCharCode(97 + i));
  }
}
console.log("Done.");
