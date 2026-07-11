import { NextResponse } from "next/server";
import { google } from "googleapis";

// Same sheet the register endpoint appends to.
const SHEET_ID = "1iRrJzDangjtuV4m6vKl_ikpT8dimdZaIWZ78fFxmbvQ";

// Columns: 0 timestamp · 1 name · 2 email · 3 phone · 4 role · 5 company · 6 challenge · 7 inquiry_type · 8 team_size
export const dynamic = "force-dynamic";
export const revalidate = 0;

const BANDS = [
  { key: "observer",     name: "The Observer",     max: 6,  color: "#8f90ff" },
  { key: "dabbler",      name: "The Dabbler",      max: 12, color: "#2f2ff0" },
  { key: "practitioner", name: "The Practitioner", max: 18, color: "#ff6a3d" },
  { key: "sharp",        name: "The Sharp Edge",   max: 24, color: "#ffb02e" },
] as const;

type BandKey = (typeof BANDS)[number]["key"];

export async function GET(request: Request) {
  // Optional passcode gate — active only when DASHBOARD_KEY is set in the env.
  const KEY = process.env.DASHBOARD_KEY;
  if (KEY) {
    const provided = new URL(request.url).searchParams.get("key");
    if (provided !== KEY) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });
    const sheets = google.sheets({ version: "v4", auth });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "Sheet1!A:I",
    });
    const rows = res.data.values ?? [];

    const counts: Record<BandKey, number> = { observer: 0, dabbler: 0, practitioner: 0, sharp: 0 };
    let total = 0;
    let scoreSum = 0;
    let lastTs = "";

    for (const r of rows) {
      const inquiry = (r[7] ?? "").toString().trim().toLowerCase();
      if (inquiry !== "scorecard") continue;
      const challenge = (r[6] ?? "").toString();
      const m = challenge.match(/(\d+)\s*\/\s*24/);
      if (!m) continue;
      const score = parseInt(m[1], 10);
      const band = BANDS.find((b) => score <= b.max) ?? BANDS[BANDS.length - 1];
      counts[band.key]++;
      total++;
      scoreSum += score;
      if (r[0]) lastTs = r[0].toString();
    }

    const bands = BANDS.map((b) => ({
      key: b.key,
      name: b.name,
      color: b.color,
      count: counts[b.key],
      pct: total ? Math.round((counts[b.key] / total) * 1000) / 10 : 0,
    }));

    return NextResponse.json(
      {
        ok: true,
        total,
        avg: total ? Math.round((scoreSum / total) * 10) / 10 : 0,
        lastTs,
        bands,
        updated: new Date().toISOString(),
      },
      { headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to read sheet";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
