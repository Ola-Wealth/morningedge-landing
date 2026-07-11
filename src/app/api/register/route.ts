import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { google } from "googleapis";

const SHEET_ID = "1iRrJzDangjtuV4m6vKl_ikpT8dimdZaIWZ78fFxmbvQ";
const SITE_URL = "https://aiedge.morningedgesystems.com";
const PAYMENT_URL = "https://paystack.shop/pay/ai-edge";
const WHATSAPP_URL = "https://wa.me/2348100526153";

// ── Google Sheets (secondary backup) ────────────────────────────────────────
async function appendToSheet(row: string[]) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: "Sheet1!A:I",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  });
}

// ── Instant email via Resend (skipped silently if RESEND_API_KEY unset) ─────
function emailContent(lead: { name: string; inquiry_type: string; challenge: string }) {
  const first = lead.name.split(" ")[0] || "there";
  const btn = (href: string, label: string, bg = "linear-gradient(135deg,#ff6a3d,#ffb02e)") =>
    `<a href="${href}" style="display:inline-block;background:${bg};color:#ffffff;font-weight:700;font-size:15px;padding:14px 28px;border-radius:100px;text-decoration:none;">${label}</a>`;
  const wrap = (inner: string) => `
    <div style="background:#f6f5fc;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#0a0a2e;">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;padding:36px 32px;">
        <p style="font-size:18px;font-weight:800;margin:0 0 20px;">morning<span style="color:#2f2ff0;">edge</span></p>
        ${inner}
        <p style="font-size:15px;line-height:1.6;color:#0a0a2e;margin:28px 0 0;">With Love,<br/><b>MorningEdge AI</b></p>
        <hr style="border:none;border-top:1px solid #e6e5f2;margin:20px 0 16px;"/>
        <p style="font-size:12px;color:#9a99b3;margin:0;">MorningEdge AI · Lagos, Nigeria · <a href="${WHATSAPP_URL}" style="color:#2f2ff0;">WhatsApp +234 810 052 6153</a></p>
      </div>
    </div>`;

  if (lead.inquiry_type === "scorecard" || lead.inquiry_type === "training") {
    // Parse the score out of "Scorecard: 18/24 — The Practitioner"
    const m = lead.challenge.match(/(\d+)\s*\/\s*24/);
    const score = m ? parseInt(m[1], 10) : -1;

    // Four score bands, mirroring the WhatsApp replies
    const p = (t: string) => `<p style="font-size:15px;line-height:1.65;color:#5c5c72;margin:0 0 16px;">${t}</p>`;
    const bands = [
      {
        max: 6, name: "The Observer",
        insight: p(`Honestly? That's the most exciting score to get. Right now AI is happening <i>around</i> you. In six weeks it can be working <i>for</i> you, and you'll feel the jump faster than anyone.`),
        close: p(`Any question at all, just reply to this email or message us on <a href="${WHATSAPP_URL}" style="color:#2f2ff0;font-weight:700;">WhatsApp</a>.`),
      },
      {
        max: 12, name: "The Dabbler",
        insight: p(`You already use AI, but a bit like a search engine. The real power sits one layer deeper, and it's learnable in weeks, not years. The framework in your Playbook alone will change the answers you get.`),
        close: p(`Questions? Just reply, we answer fast.`),
      },
      {
        max: 18, name: "The Practitioner",
        insight: p(`Strong. You're already ahead of most professionals. Here's the honest bit: what's capping you now isn't knowledge. It's a <b style="color:#0a0a2e;">system</b>, reps, feedback, and a structure that makes it stick.`),
        close: p(`Want me to point out which sessions hit your specific gaps? Just reply.`),
      },
      {
        max: 24, name: "The Sharp Edge",
        insight: p(`Seriously impressive, you're in the top tier. You don't need more tips. You need structure, reps, and a room of sharp people pushing you further.`),
        close: p(`Prefer it fully 1-on-1? Reply and we'll share the private track.`),
      },
    ];
    const band = score < 0 ? null : bands.find((b) => score <= b.max) ?? bands[bands.length - 1];

    const scoreLine = band
      ? `<p style="font-size:15px;line-height:1.6;color:#5c5c72;margin:0 0 16px;">Your result: <b style="color:#0a0a2e;">${score}/24 — ${band.name}.</b></p>`
      : "";
    const insight = band ? band.insight : p(`The framework and all 30 prompts are yours. Use five of them this week and feel the difference.`);
    const close = band ? band.close : p(`Question first? <a href="${WHATSAPP_URL}" style="color:#2f2ff0;font-weight:700;">Message us on WhatsApp</a>, we reply fast.`);

    return {
      subject: band ? `${first}, your Prompt Playbook (${band.name})` : "Your Prompt Playbook is inside 📖",
      html: wrap(`
        <h1 style="font-size:22px;margin:0 0 14px;">${first}, here is your Playbook.</h1>
        ${scoreLine}
        ${insight}
        <p style="margin:2px 0 20px;">${btn(`${SITE_URL}/prompt-playbook.pdf`, "Download the Prompt Playbook →", "#1e1eb4")}</p>
        <p style="font-size:15px;line-height:1.65;color:#5c5c72;margin:0 0 16px;">And when you're ready to close the gap for good: <b style="color:#0a0a2e;">The AI Edge</b> — 6 live sessions, applied to your real work, ending with a capstone you ship. First 15 seats at <b style="color:#0a0a2e;">₦49,899</b> (then ₦75,000). Not sharper after 2 sessions? You pay nothing.</p>
        <p style="margin:0 0 4px;">${btn(PAYMENT_URL, "Join the cohort — ₦49,899 →")}</p>
        ${close}
      `),
    };
  }
  if (lead.inquiry_type === "team") {
    return {
      subject: "Your team training call — MorningEdge AI",
      html: wrap(`
        <h1 style="font-size:22px;margin:0 0 14px;">${first}, we got your request.</h1>
        <p style="font-size:15px;line-height:1.6;color:#5c5c72;margin:0 0 22px;">We'll prepare for your team training call. If you haven't picked a time yet, grab one here:</p>
        <p style="margin:0;">${btn("https://calendly.com/olaplusb/30min", "Pick a call time →", "#1e1eb4")}</p>
      `),
    };
  }
  return {
    subject: "Your seat is one step away — The AI Edge",
    html: wrap(`
      <h1 style="font-size:22px;margin:0 0 14px;">${first}, your seat is held.</h1>
      <p style="font-size:15px;line-height:1.6;color:#5c5c72;margin:0 0 22px;">Complete your payment and you're in the cohort — 6 live sessions, your capstone, the community, and the certificate. Early bird: <b style="color:#0a0a2e;">₦49,899</b>, first 15 seats only.</p>
      <p style="margin:0 0 22px;">${btn(PAYMENT_URL, "Complete payment — ₦49,899 →")}</p>
      <p style="font-size:14px;line-height:1.6;color:#5c5c72;margin:0;">Question first? <a href="${WHATSAPP_URL}" style="color:#2f2ff0;font-weight:700;">Message us on WhatsApp</a> — we reply fast.</p>
    `),
  };
}

async function sendEmail(lead: { name: string; email: string; inquiry_type: string; challenge: string }) {
  const key = process.env.RESEND_API_KEY;
  if (!key || !lead.email) return;
  const from = process.env.EMAIL_FROM ?? "MorningEdge AI <hello@aiedge.morningedgesystems.com>";
  const { subject, html } = emailContent(lead);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [lead.email], subject, html }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

// ── Main handler ─────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  const data = await request.json();

  const lead = {
    name:         data.name         ?? "",
    email:        data.email        ?? "",
    phone:        data.phone        ?? "",
    role:         data.role         ?? "",
    company:      data.company      ?? "",
    challenge:    data.challenge    ?? "",
    inquiry_type: data.inquiry_type ?? "individual",
    team_size:    data.team_size    ?? "",
  };

  // 1️⃣  Save to Supabase (primary)
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("leads").insert([lead]);
    if (error) throw error;
    console.log("✅ Lead saved to Supabase:", lead.name, lead.email, `(${lead.inquiry_type})`);
  } catch (err) {
    console.error("❌ Supabase error:", err);
  }

  // 2️⃣  Save to Google Sheets (backup)
  try {
    const timestamp = new Date().toLocaleString("en-NG", {
      timeZone: "Africa/Lagos",
    });
    await appendToSheet([
      timestamp,
      lead.name,
      lead.email,
      lead.phone,
      lead.role,
      lead.company,
      lead.challenge,
      lead.inquiry_type,
      lead.team_size,
    ]);
    console.log("✅ Lead saved to Google Sheets:", lead.name);
  } catch (err) {
    console.error("❌ Google Sheets error:", err);
  }

  // 3️⃣  Instant email (Resend — no-op until RESEND_API_KEY is configured)
  try {
    await sendEmail(lead);
    console.log("✅ Welcome email sent:", lead.email);
  } catch (err) {
    console.error("❌ Email error:", err);
  }

  return NextResponse.json({ success: true });
}
