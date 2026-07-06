"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import FadeIn from "./FadeIn";

const PAYMENT_URL = "https://paystack.shop/pay/ai-edge";

/** Served from public/prompt-playbook.pdf on whatever domain the site runs on
 *  (morningedgesystems.com/prompt-playbook.pdf in production). */
const PLAYBOOK_URL = "/prompt-playbook.pdf";

type Dim = "tools" | "prompting" | "habit" | "workflow" | "data" | "decks" | "context" | "thinking";

const QUESTIONS: { q: string; dim: Dim; options: string[] }[] = [
  {
    q: "How often does AI touch your actual work in a normal week?",
    dim: "tools",
    options: [
      "Rarely — I mostly hear about it",
      "Occasionally, for quick questions",
      "A few times a week",
      "Daily — it's part of how I work",
    ],
  },
  {
    q: "You need a report drafted by 5pm. What happens?",
    dim: "workflow",
    options: [
      "I write every word myself",
      "I might ask ChatGPT for an outline",
      "AI drafts it, I edit heavily",
      "AI drafts from my template, I polish in minutes",
    ],
  },
  {
    q: "When AI gives you a weak answer, what do you do?",
    dim: "prompting",
    options: [
      "Close it — proves it's overhyped",
      "Rephrase the question and hope",
      "Keep adding details until it improves",
      "Diagnose what's missing: role, context, or format",
    ],
  },
  {
    q: "Do you reuse prompts that worked well?",
    dim: "habit",
    options: [
      "I've never thought about it",
      "I retype them from memory",
      "A few are saved in my notes",
      "I keep an organised prompt library",
    ],
  },
  {
    q: "A spreadsheet of messy numbers lands on your desk. You…",
    dim: "data",
    options: [
      "Spend hours in Excel",
      "Do it manually — AI can't be trusted with numbers",
      "Have tried AI for quick summaries",
      "Let AI find the trend and draft the story, then verify",
    ],
  },
  {
    q: "Next week you present to leadership. What's AI's role?",
    dim: "decks",
    options: [
      "None — my slides are handmade",
      "Maybe titles or ideas",
      "The outline and talking points",
      "Structure, draft and speaker notes — I refine the message",
    ],
  },
  {
    q: "Does AI actually know your role and standards when you use it?",
    dim: "context",
    options: [
      "No — I ask cold questions every time",
      "I sometimes explain my situation",
      "I paste in background when it matters",
      "I've set up assistants that already know my work",
    ],
  },
  {
    q: "Honestly — do you use AI for decisions, or just drafts?",
    dim: "thinking",
    options: [
      "Decisions are human work, full stop",
      "It never occurred to me",
      "I've asked for its opinion casually",
      "I pressure-test big decisions with it regularly",
    ],
  },
];

const PROFILES = [
  {
    min: 0, max: 6, name: "The Observer",
    line: "AI is happening around you, not for you. The good news: you have the most to gain, fastest.",
  },
  {
    min: 7, max: 12, name: "The Dabbler",
    line: "You use AI like a search engine. The real power is one layer deeper — and it's learnable in weeks.",
  },
  {
    min: 13, max: 18, name: "The Practitioner",
    line: "You're ahead of most professionals already. What's capping you now isn't knowledge. It's a system.",
  },
  {
    min: 19, max: 24, name: "The Sharp Edge",
    line: "You're close. You don't need more tips — you need structure, reps, and a cohort that pushes you.",
  },
];

const GAP_COPY: Record<Dim, { label: string; fix: string }> = {
  tools:     { label: "Your toolkit",        fix: "Your stack is thinner than your ambition. Session 1 sets it up properly." },
  prompting: { label: "Your prompting",      fix: "Weak answers start with weak prompts. Session 2 installs the framework." },
  habit:     { label: "Your prompt library", fix: "Starting from zero every day is the silent time-killer. Session 2 builds your library." },
  workflow:  { label: "Your daily workflow", fix: "AI visits your work — it doesn't live there yet. Session 4 weaves it in." },
  data:      { label: "Data & analysis",     fix: "Numbers-to-story is your biggest hidden leverage. Session 4 covers it." },
  decks:     { label: "Presentations",       fix: "Board-ready decks in minutes is a learnable skill. Session 4 shows you how." },
  context:   { label: "Context-building",    fix: "You're re-explaining yourself to AI every single time. Session 5 fixes that for good." },
  thinking:  { label: "Thinking partner",    fix: "You're using 30% of AI: execution without judgment. Session 5 makes the leap." },
};

const GAP_PRIORITY: Dim[] = ["prompting", "context", "workflow", "thinking", "data", "decks", "habit", "tools"];

export default function Training() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState<"intro" | "quiz" | "gate" | "result">("intro");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<Dim, number>>({} as Record<Dim, number>);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const saved = sessionStorage.getItem("scorecard");
    if (saved) { setAnswers(JSON.parse(saved)); setStep("result"); }
  }, []);

  const score = Object.values(answers).reduce((a, b) => a + b, 0);
  const profile = PROFILES.find((p) => score >= p.min && score <= p.max) ?? PROFILES[0];
  const gaps = [...QUESTIONS.map((q) => q.dim)]
    .sort((a, b) => (answers[a] ?? 0) - (answers[b] ?? 0) || GAP_PRIORITY.indexOf(a) - GAP_PRIORITY.indexOf(b))
    .slice(0, 3);

  const pick = (val: number) => {
    const next = { ...answers, [QUESTIONS[qIndex].dim]: val };
    setAnswers(next);
    if (qIndex < QUESTIONS.length - 1) setQIndex(qIndex + 1);
    else setStep("gate");
  };

  const handleGate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const name = (f.elements.namedItem("s_name") as HTMLInputElement).value;
    const email = (f.elements.namedItem("s_email") as HTMLInputElement).value;
    const phone = (f.elements.namedItem("s_phone") as HTMLInputElement).value;
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "A valid email is required.";
    if (!phone.trim()) errs.phone = "WhatsApp number is required.";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, email, phone, role: "", company: "",
          challenge: `Scorecard: ${score}/24 — ${profile.name}`,
          inquiry_type: "scorecard", team_size: "",
        }),
      });
    } finally {
      sessionStorage.setItem("scorecard", JSON.stringify(answers));
      setStep("result");
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-light-bg border border-line text-navy placeholder-[#9a99b3] rounded-lg px-4 py-3 text-[15px] focus:outline-none focus:border-bright focus:bg-white transition-colors duration-200";

  // popLayout (not "wait") so a stalled exit animation can never block the
  // next step from mounting — steps must advance even if rAF is throttled.
  const slide = {
    initial: reduce ? { opacity: 1 } : { opacity: 0, x: 26 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <section id="scorecard" className="mesh-band py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — pitch */}
          <FadeIn from="right">
            <p className="text-xs font-bold uppercase tracking-[2px] text-coral mb-5">
              Free 2-minute scorecard
            </p>
            <h2 className="text-[40px] md:text-[48px] leading-[1.05] text-navy mb-6">
              How AI-ready are
              <br />
              you, <span className="serif-i text-bright">really?</span>
            </h2>
            <p className="text-muted-text text-lg leading-relaxed mb-8 max-w-md">
              Eight honest questions. No wrong answers. You get a score, a
              profile, and the three exact gaps standing between you and the
              sharpest version of your work.
            </p>
            <div className="flex flex-col gap-4 mb-8">
              {[
                "Your AI Readiness Score and professional profile",
                "Your top 3 gaps, mapped to the exact fix",
                "The Prompt Playbook — 30 copy-paste prompts, free",
              ].map((l) => (
                <div key={l} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full cta-grad flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                  </span>
                  <span className="text-navy text-[15px] font-medium leading-relaxed">{l}</span>
                </div>
              ))}
            </div>
            <p className="text-muted-text text-sm">
              Most professionals score under 12. Where do you land?
            </p>
          </FadeIn>

          {/* Right — scorecard card */}
          <FadeIn delay={0.12}>
            <div className="relative bg-white border border-line rounded-2xl shadow-[0_30px_70px_rgba(10,10,46,0.14)] p-7 md:p-9 min-h-[480px] flex flex-col">

              <AnimatePresence mode="popLayout" initial={false}>
                {step === "intro" && (
                  <motion.div key="intro" {...slide} className="flex flex-col justify-center flex-1 text-center">
                    <span className="w-16 h-16 rounded-2xl cta-grad flex items-center justify-center mx-auto mb-6">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10M18 20V4M6 20v-4"/></svg>
                    </span>
                    <h3 className="text-navy text-2xl font-extrabold mb-3">The AI Readiness Scorecard</h3>
                    <p className="text-muted-text text-[15px] leading-relaxed mb-8 max-w-xs mx-auto">
                      8 questions · 2 minutes · scored out of 24. Answer for how
                      you actually work, not how you wish you did.
                    </p>
                    <button
                      onClick={() => setStep("quiz")}
                      className="cta-grad text-white font-bold text-base px-8 py-4 rounded-full shadow-[0_16px_36px_rgba(255,106,61,0.4)] hover:-translate-y-0.5 cursor-pointer mx-auto"
                    >
                      Start the scorecard →
                    </button>
                  </motion.div>
                )}

                {step === "quiz" && (
                  <motion.div key={`q${qIndex}`} {...slide} className="flex flex-col flex-1">
                    {/* progress */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[12px] font-bold uppercase tracking-[1.5px] text-muted-text">
                        Question {qIndex + 1} of {QUESTIONS.length}
                      </span>
                      {qIndex > 0 && (
                        <button onClick={() => setQIndex(qIndex - 1)} className="text-[12px] font-bold text-muted-text hover:text-navy cursor-pointer">
                          ← Back
                        </button>
                      )}
                    </div>
                    <div className="h-1.5 bg-light-bg rounded-full mb-7 overflow-hidden">
                      <div className="h-full cta-grad rounded-full transition-all duration-400" style={{ width: `${((qIndex) / QUESTIONS.length) * 100}%` }} />
                    </div>

                    <h3 className="text-navy text-xl font-extrabold mb-6 leading-snug">{QUESTIONS[qIndex].q}</h3>
                    <div className="flex flex-col gap-3">
                      {QUESTIONS[qIndex].options.map((opt, vi) => (
                        <button
                          key={opt}
                          onClick={() => pick(vi)}
                          className="text-left bg-light-bg border border-line rounded-xl px-5 py-4 text-[15px] font-medium text-navy hover:border-bright hover:bg-white hover:shadow-[0_10px_26px_rgba(47,47,240,0.10)] cursor-pointer transition-all duration-200"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === "gate" && (
                  <motion.div key="gate" {...slide} className="flex flex-col justify-center flex-1">
                    <div className="text-center mb-6">
                      <span className="inline-flex items-center gap-2 bg-[rgba(47,47,240,0.07)] border border-[rgba(47,47,240,0.2)] text-brand-blue text-[12px] font-bold uppercase tracking-[1.5px] px-4 py-2 rounded-full mb-5">
                        Your score is ready
                      </span>
                      <h3 className="text-navy text-2xl font-extrabold mb-2">Where should we send your results?</h3>
                      <p className="text-muted-text text-[14px]">Score + profile + the free Prompt Playbook, straight to your WhatsApp.</p>
                    </div>
                    <form onSubmit={handleGate} noValidate className="flex flex-col gap-3">
                      <div>
                        <input name="s_name" type="text" placeholder="Your first name" className={inputClass} aria-label="Your first name" />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <input name="s_email" type="email" placeholder="you@example.com" className={inputClass} aria-label="Email address" />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <input name="s_phone" type="tel" placeholder="WhatsApp number" className={inputClass} aria-label="WhatsApp number" />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full cta-grad text-white font-bold text-[15px] py-4 rounded-full shadow-[0_14px_30px_rgba(255,106,61,0.35)] hover:-translate-y-0.5 disabled:opacity-60 cursor-pointer"
                      >
                        {loading ? "Scoring…" : "Show my score →"}
                      </button>
                      <p className="text-center text-[11px] text-[#9a99b3]">No spam. Unsubscribe anytime.</p>
                    </form>
                  </motion.div>
                )}

                {step === "result" && (
                  <motion.div key="result" {...slide} className="flex flex-col flex-1">
                    <div className="text-center mb-6">
                      <p className="text-[12px] font-bold uppercase tracking-[2px] text-muted-text mb-2">Your AI Readiness Score</p>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-[64px] leading-none font-extrabold text-navy">{score}</span>
                        <span className="text-muted-text text-xl font-bold">/24</span>
                      </div>
                      <p className="serif-i text-bright text-2xl mt-1">{profile.name}</p>
                      <p className="text-muted-text text-[14px] leading-relaxed mt-2 max-w-sm mx-auto">{profile.line}</p>
                    </div>

                    <div className="flex flex-col gap-2.5 mb-6">
                      {gaps.map((g, i) => (
                        <div key={g} className="flex gap-3 items-start bg-light-bg border border-line rounded-xl px-4 py-3">
                          <span className="w-6 h-6 rounded-full bg-navy text-white text-[11px] font-extrabold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                          <div>
                            <p className="text-navy text-[13px] font-extrabold">{GAP_COPY[g].label}</p>
                            <p className="text-muted-text text-[13px] leading-snug">{GAP_COPY[g].fix}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 mb-3">
                      <a href={PLAYBOOK_URL} target="_blank" rel="noopener noreferrer" className="text-center border border-navy/25 text-navy font-bold text-[13px] py-3 rounded-full hover:bg-navy hover:text-white">
                        Download Playbook →
                      </a>
                      <a
                        href={`https://wa.me/2348100526153?text=${encodeURIComponent(`Hi MorningEdge, I just took the AI Readiness Scorecard. I scored ${score}/24 (${profile.name}). Send me the Prompt Playbook + cohort details.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 border border-[#25D366] bg-[#f0fdf5] text-[#0f7a3d] font-bold text-[13px] py-3 rounded-full hover:bg-[#25D366] hover:text-white"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.6 6.3A7.85 7.85 0 0 0 12 4a7.94 7.94 0 0 0-6.9 11.9L4 20l4.2-1.1A7.9 7.9 0 0 0 12 19.9a7.94 7.94 0 0 0 5.6-13.6ZM12 18.5a6.6 6.6 0 0 1-3.4-.9l-.24-.14-2.5.65.67-2.43-.16-.25A6.6 6.6 0 1 1 12 18.5Z"/></svg>
                        Get it on WhatsApp
                      </a>
                    </div>

                    <a
                      href={PAYMENT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cta-grad text-center text-white font-bold text-[15px] py-4 rounded-full shadow-[0_16px_36px_rgba(255,106,61,0.4)] hover:-translate-y-0.5"
                    >
                      Close all 3 gaps — join the cohort — ₦49,899 →
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
