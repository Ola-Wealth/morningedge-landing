"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Band = { key: string; name: string; color: string; count: number; pct: number };
type Stats = {
  ok: boolean;
  total: number;
  avg: number;
  lastTs: string;
  bands: Band[];
  updated: string;
};

const REFRESH_MS = 8000;

const LABEL: Record<string, string> = {
  observer: "Just starting — AI is happening around them.",
  dabbler: "Uses AI casually, like a search engine.",
  practitioner: "Ahead of most — needs a system to go further.",
  sharp: "Top tier — needs reps, structure and a sharp room.",
};

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);
  const [pulse, setPulse] = useState(0);
  const firstLoad = useRef(true);

  useEffect(() => {
    let alive = true;
    const key = new URLSearchParams(window.location.search).get("key");
    const endpoint = `/api/scorecard-stats${key ? `?key=${encodeURIComponent(key)}` : ""}`;
    const load = async () => {
      try {
        const r = await fetch(endpoint, { cache: "no-store" });
        if (r.status === 401) {
          if (alive) setLocked(true);
          return;
        }
        const j = (await r.json()) as Stats & { error?: string };
        if (!alive) return;
        if (j.ok) {
          setStats(j);
          setLocked(false);
          setError(null);
          setPulse((p) => p + 1);
        } else {
          setError(j.error || "Could not read the sheet.");
        }
      } catch {
        if (alive) setError("Network error — retrying…");
      } finally {
        firstLoad.current = false;
      }
    };
    load();
    const id = setInterval(load, REFRESH_MS);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  // Ranked copy (most common first) for the "who's ranking as what" list.
  const ranked = useMemo(() => {
    if (!stats) return [];
    return [...stats.bands].sort((a, b) => b.count - a.count || b.pct - a.pct);
  }, [stats]);

  // All hooks run above; the passcode screen is a safe post-hook early return.
  if (locked) return <Passcode />;

  const leader = ranked[0];
  const maxPct = Math.max(1, ...(stats?.bands.map((b) => b.pct) ?? [1]));

  // Share scoring below "The Sharp Edge" — everyone with real room to grow.
  const roomToGrow = stats
    ? Math.round(stats.bands.filter((b) => b.key !== "sharp").reduce((s, b) => s + b.pct, 0))
    : 0;

  const updatedLabel = stats
    ? new Date(stats.updated).toLocaleTimeString("en-NG", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "—";

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(80% 55% at 85% -5%, rgba(143,144,255,.20) 0%, transparent 55%)," +
          "radial-gradient(60% 45% at 0% 100%, rgba(255,106,61,.10) 0%, transparent 55%)," +
          "linear-gradient(170deg,#ffffff 0%,#f5f4fc 60%,#f7f2fa 100%)",
        color: "#0a0a2e",
        fontFamily:
          "'Manrope',system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif",
        padding: "clamp(20px,5vw,56px) clamp(16px,5vw,40px)",
      }}
    >
      <div style={{ maxWidth: 940, margin: "0 auto" }}>
        {/* Header */}
        <header
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 34,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: 2.5,
                textTransform: "uppercase",
                color: "#2f2ff0",
                marginBottom: 10,
              }}
            >
              MorningEdge AI · The AI Edge
            </div>
            <h1
              style={{
                fontSize: "clamp(28px,5vw,42px)",
                lineHeight: 1.05,
                fontWeight: 800,
                letterSpacing: -1,
                margin: 0,
              }}
            >
              AI Readiness — Live Dashboard
            </h1>
            <p style={{ margin: "10px 0 0", color: "#5c5c72", fontSize: 15, maxWidth: 520 }}>
              How every scorecard respondent is ranking, updating itself as new
              responses land in the sheet.
            </p>
          </div>

          <LivePill updatedLabel={updatedLabel} online={!error} pulse={pulse} />
        </header>

        {error && !stats && (
          <div
            style={{
              padding: "16px 18px",
              borderRadius: 14,
              background: "#fff4f0",
              border: "1px solid #ffd9cc",
              color: "#b23a17",
              fontSize: 14,
              fontWeight: 600,
              marginBottom: 24,
            }}
          >
            {error}
          </div>
        )}

        {/* KPI tiles */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
            gap: 16,
            marginBottom: 26,
          }}
        >
          <Kpi
            label="Average score"
            value={stats && stats.total ? `${stats.avg} / 24` : "—"}
            accent="#ff6a3d"
          />
          <Kpi
            label="Most common profile"
            value={stats && leader && stats.total ? leader.name : "—"}
            accent={leader?.color ?? "#8f90ff"}
            small
          />
          <Kpi
            label="Room to grow"
            value={stats && stats.total ? `${roomToGrow}%` : "—"}
            accent="#2f2ff0"
          />
        </section>

        {/* Ranked distribution */}
        <section
          style={{
            background: "#ffffff",
            border: "1px solid #ecebf6",
            borderRadius: 20,
            padding: "clamp(18px,3vw,28px)",
            boxShadow: "0 24px 60px rgba(10,10,46,.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <h2 style={{ fontSize: 17, fontWeight: 800, margin: 0 }}>
              Where people rank
            </h2>
            <span style={{ fontSize: 13, color: "#9a99b3", fontWeight: 600 }}>
              % of all responses
            </span>
          </div>

          {!stats && !error && (
            <p style={{ color: "#9a99b3", fontSize: 14 }}>Loading live data…</p>
          )}

          {stats && stats.total === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "34px 12px",
                color: "#9a99b3",
              }}
            >
              <div style={{ fontSize: 30, marginBottom: 8 }}>📊</div>
              <p style={{ fontWeight: 700, color: "#5c5c72", margin: "0 0 4px" }}>
                No scorecard responses yet.
              </p>
              <p style={{ fontSize: 14, margin: 0 }}>
                The moment someone completes the scorecard, they&apos;ll appear here.
              </p>
            </div>
          )}

          {stats &&
            stats.total > 0 &&
            ranked.map((b, i) => (
              <BandRow key={b.key} band={b} rank={i + 1} maxPct={maxPct} />
            ))}

          {/* Stacked bar */}
          {stats && stats.total > 0 && (
            <div style={{ marginTop: 22 }}>
              <div
                style={{
                  display: "flex",
                  height: 14,
                  borderRadius: 100,
                  overflow: "hidden",
                  border: "1px solid #efeef8",
                }}
              >
                {stats.bands.map((b) =>
                  b.pct > 0 ? (
                    <div
                      key={b.key}
                      title={`${b.name} — ${b.pct}%`}
                      style={{
                        width: `${b.pct}%`,
                        background: b.color,
                        transition: "width .7s cubic-bezier(.2,.7,.2,1)",
                      }}
                    />
                  ) : null,
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px 18px",
                  marginTop: 14,
                }}
              >
                {stats.bands.map((b) => (
                  <span
                    key={b.key}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 7,
                      fontSize: 12.5,
                      fontWeight: 600,
                      color: "#5c5c72",
                    }}
                  >
                    <span
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 3,
                        background: b.color,
                      }}
                    />
                    {b.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        <p
          style={{
            textAlign: "center",
            fontSize: 12.5,
            color: "#9a99b3",
            marginTop: 22,
          }}
        >
          Reads directly from the responses sheet · refreshes every{" "}
          {REFRESH_MS / 1000}s · aggregate counts only, no personal data shown.
        </p>
      </div>
    </main>
  );
}

function Passcode() {
  const [val, setVal] = useState("");
  const [wrong, setWrong] = useState(false);

  useEffect(() => {
    // If we're here with a key already in the URL, it was rejected.
    if (new URLSearchParams(window.location.search).get("key")) setWrong(true);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!val.trim()) return;
    window.location.href = `/dashboard?key=${encodeURIComponent(val.trim())}`;
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        background:
          "radial-gradient(80% 55% at 85% -5%, rgba(143,144,255,.20) 0%, transparent 55%)," +
          "linear-gradient(170deg,#ffffff 0%,#f5f4fc 60%,#f7f2fa 100%)",
        fontFamily: "'Manrope',system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif",
        color: "#0a0a2e",
      }}
    >
      <form
        onSubmit={submit}
        style={{
          width: "100%",
          maxWidth: 360,
          background: "#fff",
          border: "1px solid #ecebf6",
          borderRadius: 20,
          padding: "32px 28px",
          boxShadow: "0 24px 60px rgba(10,10,46,.08)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 30, marginBottom: 12 }}>🔒</div>
        <h1 style={{ fontSize: 20, fontWeight: 800, margin: "0 0 6px" }}>Private dashboard</h1>
        <p style={{ fontSize: 14, color: "#5c5c72", margin: "0 0 20px" }}>
          Enter the passcode to view live scorecard results.
        </p>
        <input
          type="password"
          autoFocus
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
            setWrong(false);
          }}
          placeholder="Passcode"
          style={{
            width: "100%",
            padding: "13px 16px",
            fontSize: 15,
            borderRadius: 12,
            border: `1px solid ${wrong ? "#ffb3a0" : "#e3e2f0"}`,
            outline: "none",
            marginBottom: 12,
            background: "#fbfbfe",
          }}
        />
        {wrong && (
          <p style={{ fontSize: 13, color: "#c23a17", fontWeight: 600, margin: "0 0 12px" }}>
            That passcode didn&apos;t work. Try again.
          </p>
        )}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "13px 16px",
            fontSize: 15,
            fontWeight: 800,
            color: "#fff",
            border: "none",
            borderRadius: 100,
            cursor: "pointer",
            background: "linear-gradient(135deg,#ff6a3d,#ffb02e)",
          }}
        >
          Unlock →
        </button>
      </form>
    </main>
  );
}

function LivePill({
  updatedLabel,
  online,
  pulse,
}: {
  updatedLabel: string;
  online: boolean;
  pulse: number;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        background: "#fff",
        border: "1px solid #ecebf6",
        borderRadius: 100,
        padding: "9px 16px 9px 14px",
        boxShadow: "0 12px 30px rgba(10,10,46,.06)",
      }}
    >
      <span style={{ position: "relative", display: "inline-flex", width: 10, height: 10 }}>
        <span
          key={pulse}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: online ? "#1f9d55" : "#c23a17",
            animation: online ? "ae-ping 1.4s ease-out" : "none",
          }}
        />
        <span
          style={{
            position: "relative",
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: online ? "#22c55e" : "#e05a35",
          }}
        />
      </span>
      <div style={{ lineHeight: 1.2 }}>
        <div style={{ fontSize: 12.5, fontWeight: 800, color: online ? "#0a0a2e" : "#b23a17" }}>
          {online ? "LIVE" : "Reconnecting…"}
        </div>
        <div style={{ fontSize: 11.5, color: "#9a99b3", fontWeight: 600 }}>
          updated {updatedLabel}
        </div>
      </div>
      <style>{`@keyframes ae-ping{0%{transform:scale(1);opacity:.7}100%{transform:scale(2.6);opacity:0}}`}</style>
    </div>
  );
}

function Kpi({
  label,
  value,
  accent,
  small,
}: {
  label: string;
  value: string;
  accent: string;
  small?: boolean;
}) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #ecebf6",
        borderRadius: 18,
        padding: "18px 20px",
        boxShadow: "0 16px 40px rgba(10,10,46,.05)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          background: accent,
        }}
      />
      <div
        style={{
          fontSize: 11.5,
          fontWeight: 800,
          letterSpacing: 1.4,
          textTransform: "uppercase",
          color: "#9a99b3",
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: small ? "clamp(17px,2.4vw,22px)" : "clamp(26px,4vw,36px)",
          fontWeight: 800,
          letterSpacing: -0.5,
          lineHeight: 1.05,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function BandRow({ band, rank, maxPct }: { band: Band; rank: number; maxPct: number }) {
  return (
    <div style={{ padding: "12px 0", borderTop: rank === 1 ? "none" : "1px solid #f2f1f9" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 9,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
          <span
            style={{
              flex: "none",
              width: 26,
              height: 26,
              borderRadius: 8,
              background: "#f4f3fb",
              color: "#5c5c72",
              fontSize: 13,
              fontWeight: 800,
              display: "grid",
              placeItems: "center",
            }}
          >
            {rank}
          </span>
          <span
            style={{ flex: "none", width: 11, height: 11, borderRadius: "50%", background: band.color }}
          />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.1 }}>{band.name}</div>
            <div
              style={{
                fontSize: 12.5,
                color: "#9a99b3",
                fontWeight: 500,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {LABEL[band.key]}
            </div>
          </div>
        </div>
        <div style={{ textAlign: "right", flex: "none" }}>
          <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1, color: band.color }}>
            {band.pct}%
          </div>
        </div>
      </div>
      <div
        style={{
          height: 10,
          borderRadius: 100,
          background: "#f2f1f9",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${(band.pct / maxPct) * 100}%`,
            background: band.color,
            borderRadius: 100,
            transition: "width .8s cubic-bezier(.2,.7,.2,1)",
          }}
        />
      </div>
    </div>
  );
}
