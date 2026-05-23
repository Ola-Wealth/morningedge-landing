import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

const SHEET_ID = "1iRrJzDangjtuV4m6vKl_ikpT8dimdZaIWZ78fFxmbvQ";
const SHEET_TAB = "Sheet1";

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
    range: `${SHEET_TAB}!A:G`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  });
}

export async function POST(request: NextRequest) {
  const data = await request.json();

  const row = [
    new Date().toLocaleString("en-NG", { timeZone: "Africa/Lagos" }),
    data.name ?? "",
    data.email ?? "",
    data.phone ?? "",
    data.role ?? "",
    data.company ?? "",
    data.challenge ?? "",
  ];

  try {
    await appendToSheet(row);
    console.log("✅ Lead saved to Google Sheets:", data.name, data.email);
  } catch (err) {
    // Log the error but don't block — user still gets sent to Calendly
    console.error("❌ Google Sheets error:", err);
  }

  return NextResponse.json({ success: true });
}
