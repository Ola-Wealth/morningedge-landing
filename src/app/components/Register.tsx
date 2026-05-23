"use client";

import { useState } from "react";

export default function Register() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (form: HTMLFormElement) => {
    const errs: Record<string, string> = {};
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const challenge = (
      form.elements.namedItem("challenge") as HTMLTextAreaElement
    ).value;

    if (!name.trim()) errs.name = "Name is required.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "A valid email is required.";
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

    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      role: (form.elements.namedItem("role") as HTMLSelectElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      challenge: (
        form.elements.namedItem("challenge") as HTMLTextAreaElement
      ).value,
    };

    try {
      await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSubmitted(true);
      // Redirect to Calendly after a brief moment so the success state is visible
      setTimeout(() => {
        window.open("https://calendly.com/olaplusb/30min", "_blank");
      }, 1200);
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
                  <span className="text-brand-blue text-sm font-semibold">
                    →
                  </span>
                  <span className="text-white text-[15px]">{line}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] rounded-xl p-8">
            {submitted ? (
              <div className="text-center py-8">
                <div className="text-brand-blue text-5xl mb-5">✓</div>
                <h3 className="text-white text-xl font-semibold mb-3">
                  Got it. Opening Calendly now.
                </h3>
                <p className="text-[rgba(255,255,255,0.6)] text-[15px] leading-relaxed mb-5">
                  Pick a time that works for you. We&apos;ll send a confirmation straight to your inbox.
                </p>
                <a
                  href="https://calendly.com/olaplusb/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-brand-blue text-white text-sm font-medium px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Open Calendly →
                </a>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-5"
              >
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className={inputClass}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={inputClass}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Phone number{" "}
                    <span className="text-[rgba(255,255,255,0.3)]">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className={inputClass}
                    placeholder="+234 800 000 0000"
                  />
                </div>

                <div>
                  <label htmlFor="role" className={labelClass}>
                    Your role
                  </label>
                  <select
                    id="role"
                    name="role"
                    className={`${inputClass} appearance-none`}
                  >
                    <option value="" className="bg-[#0a0a2e]">
                      Select your role
                    </option>
                    <option value="Business Manager" className="bg-[#0a0a2e]">
                      Business Manager
                    </option>
                    <option value="Executive Admin" className="bg-[#0a0a2e]">
                      Executive Admin
                    </option>
                    <option
                      value="Small Business Owner"
                      className="bg-[#0a0a2e]"
                    >
                      Small Business Owner
                    </option>
                    <option value="AI Enthusiast" className="bg-[#0a0a2e]">
                      AI Enthusiast
                    </option>
                    <option value="Other" className="bg-[#0a0a2e]">
                      Other
                    </option>
                  </select>
                </div>

                <div>
                  <label htmlFor="company" className={labelClass}>
                    Company name{" "}
                    <span className="text-[rgba(255,255,255,0.3)]">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    className={inputClass}
                    placeholder="Your company"
                  />
                </div>

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
                    <p className="text-red-400 text-xs mt-1">
                      {errors.challenge}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-blue text-white font-medium text-[15px] py-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60 mt-1 cursor-pointer"
                >
                  {loading
                    ? "Sending..."
                    : "Book my free discovery call →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
