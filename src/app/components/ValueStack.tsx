import FadeIn from "./FadeIn";

const items = [
  { label: "6 Live Cohort Sessions (4 Build + 2 Hot-Seat)", value: "₦260,000" },
  { label: "AI Readiness Assessment + Onboarding",          value: "₦25,000"  },
  { label: "Capstone: Ship 1 Real AI Workflow",             value: "₦60,000"  },
  { label: "Prompt Library + Workflow Templates",           value: "₦40,000"  },
  { label: "Private Cohort Community (ongoing)",            value: "₦45,000"  },
  { label: "All Session Recordings (Yours to Keep)",        value: "₦30,000"  },
  { label: "Weekly Assignments + Accountability",           value: "₦20,000"  },
  { label: "Certificate of Completion",                     value: "₦20,000"  },
];

const TOTAL = "₦500,000";
const ENTRY  = "₦50,000";

export default function ValueStack() {
  return (
    <section className="bg-navy py-32">
      <div className="max-w-3xl mx-auto px-6">
        <FadeIn>
          <p className="text-xs font-bold uppercase tracking-[2px] text-lav mb-4 text-center">
            What you actually get
          </p>
          <h2 className="text-[38px] leading-[1.1] font-semibold text-white text-center mb-4">
            Here&apos;s everything included
            <br />
            in the cohort.
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
                    Early-bird price · rises to ₦75,000
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
              className="inline-block cta-grad text-white font-bold text-[15px] px-8 py-4 rounded-full shadow-[0_18px_40px_rgba(255,106,61,0.35)] hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(255,106,61,0.5)]"
            >
              Join the cohort — ₦50,000 →
            </a>
            <p className="text-[rgba(255,255,255,0.35)] text-xs mt-3">
              First 15 seats at ₦50,000. Enrolling now.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
