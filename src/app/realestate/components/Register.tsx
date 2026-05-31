"use client";

import { useState, useEffect } from "react";

const CALENDLY_URL = "https://calendly.com/olaplusb/30min";

const STEPS = [
  "Saving your details…",
  "Reserving your spot…",
  "Opening your booking page…",
];

const ROLE_OPTIONS = [
  "Independent Realtor",
  "Property Agent",
  "Estate Developer",
  "Real Estate Firm Lead",
  "Property Manager",
  "Real Estate Investor",
  "Other",
];

const AGENCY_SIZES = ["2–5", "6–15", "16–30", "31–50", "50+"];

function SuccessState({ isTeam }: { isTeam: boolean }) {
  const [step, setStep] = useState(0);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 600);
    const t2 = setTimeout(() => setStep(2), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (step !== 2) return;
    if (countdown === 0) { window.location.href = CALENDLY_URL; return; }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [step, countdown]);

  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 rounded-full bg-[rgba(30,30,180,0.15)] border border-brand-blue flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-white text-xl font-semibold mb-2">You&apos;re all set.</h3>
      <p className="text-[rgba(255,255,255,0.5)] text-sm mb-8">
        {isTeam
          ? "Hold on — we're preparing your agency training call."
          : "Hold on — we're getting things ready for you."}
      </p>

      <div className="flex flex-col gap-3 text-left mb-8">
        {STEPS.map((label, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <div key={label} className={`flex items-center gap-3 transition-opacity duration-500 ${i > step ? "opacity-30" : "opacity-100"}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${done ? "bg-brand-blue" : active ? "border-2 border-brand-blue" : "border border-[rgba(255,255,255,0.2)]"}`}>
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
              <span className={`text-[14px] transition-colors duration-300 ${done || active ? "text-white" : "text-[rgba(255,255,255,0.4)]"}`}>
                {label}
                {active && i === 2 && countdown > 0 && (
                  <span className="text-[rgba(255,255,255,0.4)] ml-1">in {countdown}s…</span>
                )}
              </span>
            </div>
          );
        })}
      </div>

      <a href={CALENDLY_URL} className="inline-block bg-brand-blue text-white text-sm font-medium px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
        Open Calendly now →
      </a>
    </div>
  );
}

export default function Register() {
  const [activeTab, setActiveTab] = useState<"individual" | "team">("individual");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedRole, setSelectedRole] = useState("");
  const [otherRole, setOtherRole] = useState("");

  const isTeam = activeTab === "team";

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
    const name      = (form.elements.namedItem("name")      as HTMLInputElement).value;
    const email     = (form.elements.namedItem("email")     as HTMLInputElement).value;
    const phone     = (form.elements.namedItem("phone")     as HTMLInputElement).value;
    const company   = (form.elements.namedItem("company")   as HTMLInputElement).value;
    const challenge = (form.elements.namedItem("challenge") as HTMLTextAreaElement).value;

    if (!name.trim())  errs.name  = "Name is required.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "A valid email is required.";
    if (!phone.trim()) errs.phone = "Phone number is required.";
    if (isTeam && !company.trim()) errs.company = "Agency name is required.";
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
      await fetch("/api/register-realestate", {
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
    "w-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.15)] text-white placeholder-[rgba(255,255,255,0.3)] rounded-lg px-4 py-3 text-[15px] focus:outline-none focus:border-brand-blue transition-colors duration-200";
  const labelClass = "block text-[rgba(255,255,255,0.6)] text-[13px] mb-1.5";

  const individualBullets = [
    "No sales pressure",
    "Built around your listings and market",
    "Spots are limited each month",
  ];
  const teamBullets = [
    "Curriculum tailored to your agency's function",
    "Delivered live — remote or on-site",
    "Every agent walks away equipped",
  ];

  return (
    <section id="register" className="bg-navy py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[1.5px] text-brand-blue mb-6">
              Start here
            </p>

            {isTeam ? (
              <>
                <h2 className="text-[40px] leading-[1.1] font-semibold text-white mb-6">
                  Train your agency.
                  <br />
                  Raise the bar.
                </h2>
                <p className="text-[rgba(255,255,255,0.6)] text-lg leading-relaxed mb-10">
                  One programme. Every agent on your team walks away
                  AI-literate, equipped with practical tools, and ready to
                  apply them to their next listing.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-[40px] leading-[1.1] font-semibold text-white mb-6">
                  Book your free
                  <br />
                  discovery call.
                </h2>
                <p className="text-[rgba(255,255,255,0.6)] text-lg leading-relaxed mb-10">
                  30 minutes. We assess your AI readiness, understand your
                  property business, and recommend the right package. No
                  commitment required.
                </p>
              </>
            )}

            <div className="flex flex-col gap-4">
              {(isTeam ? teamBullets : individualBullets).map((line) => (
                <div key={line} className="flex items-center gap-3">
                  <span className="text-brand-blue text-sm font-semibold">→</span>
                  <span className="text-white text-[15px]">{line}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form card */}
          <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] rounded-xl p-8">
            {submitted ? (
              <SuccessState isTeam={isTeam} />
            ) : (
              <>
                {/* Tab toggle */}
                <div className="flex rounded-lg bg-[rgba(255,255,255,0.06)] p-1 mb-6">
                  {(["individual", "team"] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => handleTabSwitch(tab)}
                      className={`flex-1 text-sm font-medium py-2 rounded-md transition-all duration-200 ${
                        activeTab === tab
                          ? "bg-brand-blue text-white"
                          : "text-[rgba(255,255,255,0.5)] hover:text-white"
                      }`}
                    >
                      {tab === "individual" ? "For Me" : "For My Agency"}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

                  {/* Name */}
                  <div>
                    <label htmlFor="re-name" className={labelClass}>Full name</label>
                    <input id="re-name" name="name" type="text" className={inputClass} placeholder="Your full name" />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="re-email" className={labelClass}>
                      {isTeam ? "Work email" : "Email address"}
                    </label>
                    <input id="re-email" name="email" type="email" className={inputClass} placeholder="you@example.com" />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="re-phone" className={labelClass}>Phone number</label>
                    <input id="re-phone" name="phone" type="tel" className={inputClass} placeholder="+234 800 000 0000" />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  {/* Role */}
                  <div>
                    <label htmlFor="re-role" className={labelClass}>
                      {isTeam ? "Your role in the agency" : "Your role"}
                    </label>
                    <select
                      id="re-role"
                      name="role"
                      className={`${inputClass} appearance-none`}
                      value={selectedRole}
                      onChange={(e) => { setSelectedRole(e.target.value); setOtherRole(""); }}
                    >
                      <option value="" className="bg-[#0a0a2e]">Select your role</option>
                      {ROLE_OPTIONS.map((r) => (
                        <option key={r} value={r} className="bg-[#0a0a2e]">{r}</option>
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

                  {/* Agency name */}
                  <div>
                    <label htmlFor="re-company" className={labelClass}>
                      {isTeam ? "Agency name" : (
                        <span>
                          Agency name{" "}
                          <span className="text-[rgba(255,255,255,0.3)]">(optional)</span>
                        </span>
                      )}
                    </label>
                    <input
                      id="re-company"
                      name="company"
                      type="text"
                      className={inputClass}
                      placeholder={isTeam ? "Your agency" : "Your agency or firm"}
                    />
                    {errors.company && <p className="text-red-400 text-xs mt-1">{errors.company}</p>}
                  </div>

                  {/* Agency size — team tab only */}
                  {isTeam && (
                    <div>
                      <label htmlFor="re-team-size" className={labelClass}>Agency size</label>
                      <select id="re-team-size" name="team_size" className={`${inputClass} appearance-none`}>
                        <option value="" className="bg-[#0a0a2e]">Select agency size</option>
                        {AGENCY_SIZES.map((s) => (
                          <option key={s} value={s} className="bg-[#0a0a2e]">{s} agents</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Challenge */}
                  <div>
                    <label htmlFor="re-challenge" className={labelClass}>
                      {isTeam
                        ? "What do you want your agency to be able to do after this training?"
                        : "What's your biggest challenge in your property business right now?"}
                    </label>
                    <textarea
                      id="re-challenge"
                      name="challenge"
                      rows={3}
                      className={`${inputClass} resize-none`}
                      placeholder={
                        isTeam
                          ? "Describe what you want your agents to be able to do…"
                          : "E.g., writing listings quickly, following up with leads, marketing on social…"
                      }
                    />
                    {errors.challenge && <p className="text-red-400 text-xs mt-1">{errors.challenge}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-blue text-white font-medium text-[15px] py-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60 mt-1 cursor-pointer"
                  >
                    {loading
                      ? "Sending…"
                      : isTeam
                      ? "Book an agency training call →"
                      : "Book my free discovery call →"}
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
