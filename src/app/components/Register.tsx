"use client";

import { useState, useEffect } from "react";

const STEPS = [
  "Saving your details…",
  "Reserving your spot…",
  "Opening your booking page…",
];

function SuccessState() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 600);
    const t2 = setTimeout(() => setStep(2), 1200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="text-center py-8">
      {/* Animated checkmark */}
      <div className="w-16 h-16 rounded-full bg-[rgba(30,30,180,0.15)] border border-brand-blue flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h3 className="text-white text-xl font-semibold mb-2">
        You&apos;re all set.
      </h3>
      <p className="text-[rgba(255,255,255,0.5)] text-sm mb-8">
        Hold on — we&apos;re getting things ready for you.
      </p>

      {/* Step progress */}
      <div className="flex flex-col gap-3 text-left mb-8">
        {STEPS.map((label, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <div
              key={label}
              className={`flex items-center gap-3 transition-opacity duration-500 ${
                i > step ? "opacity-30" : "opacity-100"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  done
                    ? "bg-brand-blue"
                    : active
                    ? "border-2 border-brand-blue"
                    : "border border-[rgba(255,255,255,0.2)]"
                }`}
              >
                {done && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {active && (
                  <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
                )}
              </div>
              <span
                className={`text-[14px] transition-colors duration-300 ${
                  done || active ? "text-white" : "text-[rgba(255,255,255,0.4)]"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      <a
        href="https://calendly.com/olaplusb/30min"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-brand-blue text-white text-sm font-medium px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
      >
        Open Calendly manually →
      </a>
    </div>
  );
}

export default function Register() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedRole, setSelectedRole] = useState("");
  const [otherRole, setOtherRole] = useState("");

  const validate = (form: HTMLFormElement) => {
    const errs: Record<string, string> = {};
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
    const challenge = (form.elements.namedItem("challenge") as HTMLTextAreaElement).value;

    if (!name.trim()) errs.name = "Name is required.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "A valid email is required.";
    if (!phone.trim()) errs.phone = "Phone number is required.";
    if (selectedRole === "Other" && !otherRole.trim())
      errs.otherRole = "Please specify your role.";
    if (!challenge.trim())
      errs.challenge = "Please share your biggest challenge.";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);

    const roleValue = selectedRole === "Other" ? otherRole : selectedRole;

    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      role: roleValue,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      challenge: (form.elements.namedItem("challenge") as HTMLTextAreaElement).value,
    };

    try {
      await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSubmitted(true);
      setTimeout(() => {
        window.open("https://calendly.com/olaplusb/30min", "_blank");
      }, 1800);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.15)] text-white placeholder-[rgba(255,255,255,0.3)] rounded-lg px-4 py-3 text-[15px] focus:outline-none focus:border-brand-blue transition-colors duration-200";
  const labelClass = "block text-[rgba(255,255,255,0.6)] text-[13px] mb-1.5";

  return (
    <section id="register" className="bg-navy py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[1.5px] text-brand-blue mb-6">
              Start here
            </p>
            <h2 className="text-[40px] leading-[1.1] font-semibold text-white mb-6">
              Book your free
              <br />
              discovery call.
            </h2>
            <p className="text-[rgba(255,255,255,0.6)] text-lg leading-relaxed mb-10">
              40 minutes. We assess your AI readiness, understand your role, and
              recommend the right package. No commitment required.
            </p>
            <div className="flex flex-col gap-4">
              {[
                "No sales pressure",
                "Fully personalised to your situation",
                "Spots are limited each month",
              ].map((line) => (
                <div key={line} className="flex items-center gap-3">
                  <span className="text-brand-blue text-sm font-semibold">→</span>
                  <span className="text-white text-[15px]">{line}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] rounded-xl p-8">
            {submitted ? (
              <SuccessState />
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className={labelClass}>Full name</label>
                  <input id="name" name="name" type="text" className={inputClass} placeholder="Your full name" />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className={labelClass}>Email address</label>
                  <input id="email" name="email" type="email" className={inputClass} placeholder="you@example.com" />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Phone — required */}
                <div>
                  <label htmlFor="phone" className={labelClass}>Phone number</label>
                  <input id="phone" name="phone" type="tel" className={inputClass} placeholder="+234 800 000 0000" />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* Role */}
                <div>
                  <label htmlFor="role" className={labelClass}>Your role</label>
                  <select
                    id="role"
                    name="role"
                    className={`${inputClass} appearance-none`}
                    value={selectedRole}
                    onChange={(e) => {
                      setSelectedRole(e.target.value);
                      setOtherRole("");
                    }}
                  >
                    <option value="" className="bg-[#0a0a2e]">Select your role</option>
                    <option value="Team Lead" className="bg-[#0a0a2e]">Team Lead</option>
                    <option value="Department Head / HOD" className="bg-[#0a0a2e]">Department Head / HOD</option>
                    <option value="Manager / Senior Manager" className="bg-[#0a0a2e]">Manager / Senior Manager</option>
                    <option value="Corporate Manager" className="bg-[#0a0a2e]">Corporate Manager</option>
                    <option value="Executive Admin" className="bg-[#0a0a2e]">Executive Admin</option>
                    <option value="Small Business Owner" className="bg-[#0a0a2e]">Small Business Owner</option>
                    <option value="AI Enthusiast" className="bg-[#0a0a2e]">AI Enthusiast</option>
                    <option value="Other" className="bg-[#0a0a2e]">Other</option>
                  </select>

                  {/* "Other" reveal */}
                  {selectedRole === "Other" && (
                    <div className="mt-2">
                      <input
                        type="text"
                        value={otherRole}
                        onChange={(e) => setOtherRole(e.target.value)}
                        className={inputClass}
                        placeholder="Tell us your role"
                      />
                      {errors.otherRole && (
                        <p className="text-red-400 text-xs mt-1">{errors.otherRole}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company" className={labelClass}>
                    Company name{" "}
                    <span className="text-[rgba(255,255,255,0.3)]">(optional)</span>
                  </label>
                  <input id="company" name="company" type="text" className={inputClass} placeholder="Your company" />
                </div>

                {/* Challenge */}
                <div>
                  <label htmlFor="challenge" className={labelClass}>
                    What&apos;s your biggest challenge with AI right now?
                  </label>
                  <textarea
                    id="challenge"
                    name="challenge"
                    rows={3}
                    className={`${inputClass} resize-none`}
                    placeholder="Tell us what's holding you back..."
                  />
                  {errors.challenge && (
                    <p className="text-red-400 text-xs mt-1">{errors.challenge}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-blue text-white font-medium text-[15px] py-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60 mt-1 cursor-pointer"
                >
                  {loading ? "Sending…" : "Book my free discovery call →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
