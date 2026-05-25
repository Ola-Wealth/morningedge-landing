import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { google } from "googleapis";

const SHEET_ID = "1iRrJzDangjtuV4m6vKl_ikpT8dimdZaIWZ78fFxmbvQ";

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
    range: "Sheet1!A:G",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  });
}

// ── Main handler ─────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  const data = await request.json();

  const lead = {
    name: data.name ?? "",
    email: data.email ?? "",
    phone: data.phone ?? "",
    role: data.role ?? "",
    company: data.company ?? "",
    challenge: data.challenge ?? "",
  };

  // 1️⃣  Save to Supabase (primary)
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("leads").insert([lead]);
    if (error) throw error;
    console.log("✅ Lead saved to Supabase:", lead.name, lead.email);
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
    ]);
    console.log("✅ Lead saved to Google Sheets:", lead.name);
  } catch (err) {
    console.error("❌ Google Sheets error:", err);
  }

  return NextResponse.json({ success: true });
}
