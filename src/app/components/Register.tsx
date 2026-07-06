"use client";

import { useState, useEffect } from "react";

const CALENDLY_URL = "https://calendly.com/olaplusb/30min";
const PAYMENT_URL = "https://paystack.shop/pay/ai-edge";

const ROLE_OPTIONS = [
  "Team Lead",
  "Department Head / HOD",
  "Manager / Senior Manager",
  "Corporate Manager",
  "Executive Admin",
  "Small Business Owner",
  "AI Enthusiast",
  "Other",
];

const TEAM_SIZES = ["2–5", "6–15", "16–30", "31–50", "50+"];

// ── Success state with 3-step countdown ──────────────────────────────────────
function SuccessState({ isTeam }: { isTeam: boolean }) {
  const [step, setStep] = useState(0);
  const [countdown, setCountdown] = useState(3);

  const DEST = isTeam ? CALENDLY_URL : PAYMENT_URL;
  const STEPS = isTeam
    ? ["Saving your details…", "Reserving your spot…", "Opening your booking page…"]
    : ["Saving your details…", "Holding your seat…", "Opening secure payment…"];

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 600);
    const t2 = setTimeout(() => setStep(2), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (step !== 2) return;
    if (countdown === 0) { window.location.href = DEST; return; }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [step, countdown, DEST]);

  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 rounded-full bg-[rgba(30,30,180,0.15)] border border-brand-blue flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-navy text-xl font-bold mb-2">You&apos;re all set.</h3>
      <p className="text-muted-text text-sm mb-8">
        {isTeam
          ? "Hold on — we're preparing your team training call."
          : "Your seat is held — taking you to secure payment."}
      </p>

      <div className="flex flex-col gap-3 text-left mb-8">
        {STEPS.map((label, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <div key={label} className={`flex items-center gap-3 transition-opacity duration-500 ${i > step ? "opacity-30" : "opacity-100"}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${done ? "bg-brand-blue" : active ? "border-2 border-brand-blue" : "border border-[#c9c8e2]"}`}>
                {done && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {active && i < 2 && <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />}
                {active && i === 2 && countdown > 0 && (
                  <span className="text-[10px] font-bold text-brand-blue leading-none">{countdown}</span>
                )}
              </div>
              <span className={`text-[14px] transition-colors duration-300 ${done || active ? "text-navy font-medium" : "text-[#9a99b3]"}`}>
                {label}
                {active && i === 2 && countdown > 0 && (
                  <span className="text-[#9a99b3] ml-1">in {countdown}s…</span>
                )}
              </span>
            </div>
          );
        })}
      </div>

      <a href={DEST} className="inline-block cta-grad text-white text-sm font-bold px-6 py-3 rounded-full shadow-[0_12px_28px_rgba(255,106,61,0.35)] hover:-translate-y-0.5">
        {isTeam ? "Open Calendly now →" : "Pay ₦50,000 securely →"}
      </a>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Register() {
  const [activeTab, setActiveTab] = useState<"individual" | "team">("individual");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedRole, setSelectedRole] = useState("");
  const [otherRole, setOtherRole] = useState("");

  const isTeam = activeTab === "team";

  // Pre-select team tab if navigated from TeamTraining CTA
  useEffect(() => {
    const tab = sessionStorage.getItem("registerTab");
    if (tab === "team") {
      setActiveTab("team");
      sessionStorage.removeItem("registerTab");
    }
  }, []);

  const handleTabSwitch = (tab: "individual" | "team") => {
    setActiveTab(tab);
    setErrors({});
    setSelectedRole("");
    setOtherRole("");
    setSubmitted(false);
  };

  const validate = (form: HTMLFormElement) => {
    const errs: Record<string, string> = {};
    const name    = (form.elements.namedItem("name")    as HTMLInputElement).value;
    const email   = (form.elements.namedItem("email")   as HTMLInputElement).value;
    const phone   = (form.elements.namedItem("phone")   as HTMLInputElement).value;
    const company = (form.elements.namedItem("company") as HTMLInputElement).value;
    const challenge = (form.elements.namedItem("challenge") as HTMLTextAreaElement).value;

    if (!name.trim())    errs.name    = "Name is required.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "A valid email is required.";
    if (!phone.trim())   errs.phone   = "Phone number is required.";
    if (isTeam && !company.trim()) errs.company = "Organisation name is required.";
    if (selectedRole === "Other" && !otherRole.trim())
      errs.otherRole = "Please specify your role.";
    if (!challenge.trim())
      errs.challenge = isTeam
        ? "Please share what you want your team to gain."
        : "Please share your biggest challenge.";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    const roleValue = selectedRole === "Other" ? otherRole : selectedRole;
    const teamSize  = isTeam
      ? (form.elements.namedItem("team_size") as HTMLSelectElement)?.value ?? ""
      : "";

    const data = {
      name:         (form.elements.namedItem("name")      as HTMLInputElement).value,
      email:        (form.elements.namedItem("email")     as HTMLInputElement).value,
      phone:        (form.elements.namedItem("phone")     as HTMLInputElement).value,
      role:         roleValue,
      company:      (form.elements.namedItem("company")   as HTMLInputElement).value,
      challenge:    (form.elements.namedItem("challenge") as HTMLTextAreaElement).value,
      inquiry_type: activeTab,
      team_size:    teamSize,
    };

    try {
      await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-light-bg border border-line text-navy placeholder-[#9a99b3] rounded-lg px-4 py-3 text-[15px] focus:outline-none focus:border-bright focus:bg-white transition-colors duration-200";
  const labelClass = "block text-muted-text text-[13px] font-semibold mb-1.5";

  const individualBullets = [
    "Secure checkout — your seat is locked instantly",
    "Applied to your real work in hot-seat reviews",
    "Money-back guarantee after your first 2 sessions",
  ];
  const teamBullets = [
    "Curriculum tailored to your team's function",
    "Delivered live — remote or on-site",
    "Every team member walks away equipped",
  ];

  return (
    <section id="register" className="mesh-hero py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — adapts to tab */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[1.5px] text-brand-blue mb-6">
              Start here
            </p>

            {isTeam ? (
              <>
                <h2 className="text-[40px] leading-[1.05] text-navy mb-6">
                  Train your team.
                  <br />
                  <span className="serif-i text-bright">Raise the bar.</span>
                </h2>
                <p className="text-muted-text text-lg leading-relaxed mb-10">
                  One programme. Every person on your team walks away
                  AI-literate, equipped with practical tools, and ready to
                  apply them to their actual work.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-[40px] leading-[1.05] text-navy mb-6">
                  Join the
                  <br />
                  <span className="serif-i text-bright">cohort.</span>
                </h2>
                <p className="text-muted-text text-lg leading-relaxed mb-10">
                  Fill the form, pay securely, and your seat is locked. Got a
                  question first? Message us on WhatsApp —{" "}
                  <a href="https://wa.me/2348100526153" target="_blank" rel="noopener noreferrer" className="text-bright font-semibold underline underline-offset-2">
                    +234 810 052 6153
                  </a>
                  .
                </p>
              </>
            )}

            <div className="flex flex-col gap-4">
              {(isTeam ? teamBullets : individualBullets).map((line) => (
                <div key={line} className="flex items-center gap-3">
                  <span className="text-coral text-sm font-bold">→</span>
                  <span className="text-navy text-[15px] font-medium">{line}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form card */}
          <div className="bg-white border border-line rounded-2xl p-8 shadow-[0_30px_70px_rgba(10,10,46,0.10)]">
            {submitted ? (
              <SuccessState isTeam={isTeam} />
            ) : (
              <>
                {/* Tab toggle */}
                <div className="flex rounded-full bg-light-bg border border-line p-1 mb-6">
                  {(["individual", "team"] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => handleTabSwitch(tab)}
                      className={`flex-1 text-sm font-bold py-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                        activeTab === tab
                          ? "bg-navy text-white shadow-sm"
                          : "text-muted-text hover:text-navy"
                      }`}
                    >
                      {tab === "individual" ? "For Me" : "For My Team"}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

                  {/* Name */}
                  <div>
                    <label htmlFor="name" className={labelClass}>Full name</label>
                    <input id="name" name="name" type="text" className={inputClass} placeholder="Your full name" />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      {isTeam ? "Work email" : "Email address"}
                    </label>
                    <input id="email" name="email" type="email" className={inputClass} placeholder="you@example.com" />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className={labelClass}>Phone number</label>
                    <input id="phone" name="phone" type="tel" className={inputClass} placeholder="+234 800 000 0000" />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  {/* Role */}
                  <div>
                    <label htmlFor="role" className={labelClass}>
                      {isTeam ? "Your role in the organisation" : "Your role"}
                    </label>
                    <select
                      id="role"
                      name="role"
                      className={`${inputClass} appearance-none`}
                      value={selectedRole}
                      onChange={(e) => { setSelectedRole(e.target.value); setOtherRole(""); }}
                    >
                      <option value="" className="bg-white text-navy">Select your role</option>
                      {ROLE_OPTIONS.map((r) => (
                        <option key={r} value={r} className="bg-white text-navy">{r}</option>
                      ))}
                    </select>
                    {selectedRole === "Other" && (
                      <div className="mt-2">
                        <input
                          type="text"
                          value={otherRole}
                          onChange={(e) => setOtherRole(e.target.value)}
                          className={inputClass}
                          placeholder="Tell us your role"
                        />
                        {errors.otherRole && <p className="text-red-400 text-xs mt-1">{errors.otherRole}</p>}
                      </div>
                    )}
                  </div>

                  {/* Company / Organisation */}
                  <div>
                    <label htmlFor="company" className={labelClass}>
                      {isTeam ? "Organisation name" : (
                        <span>
                          Company name{" "}
                          <span className="text-[#9a99b3]">(optional)</span>
                        </span>
                      )}
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      className={inputClass}
                      placeholder={isTeam ? "Your organisation" : "Your company"}
                    />
                    {errors.company && <p className="text-red-400 text-xs mt-1">{errors.company}</p>}
                  </div>

                  {/* Team size — team tab only */}
                  {isTeam && (
                    <div>
                      <label htmlFor="team_size" className={labelClass}>Team size</label>
                      <select id="team_size" name="team_size" className={`${inputClass} appearance-none`}>
                        <option value="" className="bg-white text-navy">Select team size</option>
                        {TEAM_SIZES.map((s) => (
                          <option key={s} value={s} className="bg-white text-navy">{s} people</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Challenge */}
                  <div>
                    <label htmlFor="challenge" className={labelClass}>
                      {isTeam
                        ? "What do you want your team to gain from this training?"
                        : "What’s your biggest challenge with AI right now?"}
                    </label>
                    <textarea
                      id="challenge"
                      name="challenge"
                      rows={3}
                      className={`${inputClass} resize-none`}
                      placeholder={
                        isTeam
                          ? "Describe what you want your team to be able to do…"
                          : "Tell us what’s holding you back…"
                      }
                    />
                    {errors.challenge && <p className="text-red-400 text-xs mt-1">{errors.challenge}</p>}
                  </div>

                  {/* Scarcity line */}
                  {!isTeam && (
                    <div className="flex items-center justify-center gap-2 text-[#e5326e] text-xs font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e5326e] animate-pulse flex-shrink-0" />
                      Early bird: first 15 seats at ₦50,000 — then ₦75,000.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full cta-grad text-white font-bold text-[15px] py-4 rounded-full shadow-[0_16px_36px_rgba(255,106,61,0.35)] hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(255,106,61,0.45)] disabled:opacity-60 mt-1 cursor-pointer"
                  >
                    {loading
                      ? "Sending…"
                      : isTeam
                      ? "Book a team training call →"
                      : "Join the cohort — ₦50,000 →"}
  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
