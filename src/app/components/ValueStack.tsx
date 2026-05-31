import FadeIn from "./FadeIn";

const items = [
  { label: "12 Live 1-on-1 Coaching Sessions",          value: "₦300,000" },
  { label: "AI Readiness Assessment (Session 1)",        value: "₦25,000"  },
  { label: "Custom AI Toolkit Built for Your Role",      value: "₦40,000"  },
  { label: "Personal AI Implementation Blueprint",       value: "₦35,000"  },
  { label: "Prompt Library for Your Profession",         value: "₦20,000"  },
  { label: "WhatsApp Support Between Sessions",          value: "₦40,000"  },
  { label: "All Session Recordings (Yours to Keep)",     value: "₦35,000"  },
  { label: "30-Day Post-Programme Check-In Call",        value: "₦25,000"  },
];

const TOTAL = "₦520,000";
const ENTRY  = "₦35,000";

export default function ValueStack() {
  return (
    <section className="bg-navy py-32">
      <div className="max-w-3xl mx-auto px-6">
        <FadeIn>
          <p className="text-xs font-medium uppercase tracking-[1.5px] text-brand-blue mb-4 text-center">
            What you actually get
          </p>
          <h2 className="text-[38px] leading-[1.1] font-semibold text-white text-center mb-4">
            Here&apos;s everything included
            <br />
            in the full programme.
          </h2>
          <p className="text-[rgba(255,255,255,0.5)] text-center text-lg mb-12">
            We built value into every layer — so you never have to wonder if it&apos;s worth it.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden">
            {/* Stack rows */}
            {items.map((item, i) => (
              <div
                key={item.label}
                className={`flex items-center justify-between gap-4 px-7 py-4 ${
                  i !== items.length - 1
                    ? "border-b border-[rgba(255,255,255,0.07)]"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <svg
                    className="w-4 h-4 text-brand-blue flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white text-[14px]">{item.label}</span>
                </div>
                <span className="text-[rgba(255,255,255,0.45)] text-[13px] font-medium whitespace-nowrap">
                  {item.value}
                </span>
              </div>
            ))}

            {/* Total + Price reveal */}
            <div className="bg-[rgba(30,30,180,0.12)] border-t border-[rgba(30,30,180,0.3)] px-7 py-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[rgba(255,255,255,0.5)] text-sm font-medium uppercase tracking-wider">
                  Total value
                </span>
                <span className="text-[rgba(255,255,255,0.4)] text-lg font-semibold line-through decoration-[#ff6b6b]">
                  {TOTAL}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white text-sm font-medium uppercase tracking-wider">
                  You invest
                </span>
                <div className="text-right">
                  <span className="text-brand-blue text-3xl font-bold">
                    from {ENTRY}
                  </span>
                  <p className="text-[rgba(255,255,255,0.4)] text-xs mt-0.5">
                    Taster · Starter · Growth · Full Programme
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="text-center mt-8">
            <a
              href="#register"
              className="inline-block bg-brand-blue text-white font-medium text-[15px] px-8 py-4 rounded-lg hover:opacity-90 transition-opacity"
            >
              Book your free discovery call →
            </a>
            <p className="text-[rgba(255,255,255,0.35)] text-xs mt-3">
              40 minutes. No commitment. Spots are limited.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
