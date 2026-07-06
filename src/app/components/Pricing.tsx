import FadeIn from "./FadeIn";

type Pkg = {
  name: string;
  price: string;
  usd: string;
  totalValue: string;
  duration: string;
  desc: string;
  cta: string;
  highlighted: boolean;
  badge?: string;
  href?: string;
  external?: boolean;
};

const packages: Pkg[] = [
  {
    name: "Early Bird",
    price: "₦49,899",
    usd: "~$32 USD",
    totalValue: "₦500,000",
    duration: "6 live sessions · everything included",
    desc: "The full cohort at the early-bird price — sessions, capstone, community, and certificate. First 15 seats only.",
    cta: "Join the cohort — ₦49,899",
    highlighted: true,
    badge: "First 15 seats",
  },
  {
    name: "Standard Seat",
    price: "₦75,000",
    usd: "~$48 USD",
    totalValue: "₦500,000",
    duration: "6 live sessions · everything included",
    desc: "The same full cohort — 4 build sessions, 2 hot-seat reviews, your capstone, community, and certificate.",
    cta: "Join the cohort",
    highlighted: false,
  },
  {
    name: "1-on-1 Private Track",
    price: "Custom",
    usd: "By application",
    totalValue: "",
    duration: "Fully personalised · your schedule",
    desc: "Prefer it bespoke and on your own schedule? Talk to our team about the private 1-on-1 track.",
    cta: "Talk to our team",
    highlighted: false,
    href: "https://wa.me/2348100526153",
    external: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-light-bg py-32">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <h2 className="text-[44px] leading-[1.05] text-navy text-center mb-3">
            Lock in <span className="serif-i text-bright">your seat.</span>
          </h2>
          <p className="text-muted-text text-center text-lg mb-14">
            Early bird ends when the first 15 seats fill. 1-on-1 available on request.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {packages.map((pkg, i) => (
            <FadeIn key={pkg.name} delay={i * 0.08}>
              <div
                className={`relative rounded-xl p-6 flex flex-col h-full bg-white transition-all duration-300 hover:-translate-y-2 ${
                  pkg.highlighted
                    ? "border-2 border-coral shadow-lg shadow-coral/15 hover:shadow-xl hover:shadow-coral/20"
                    : "border border-line hover:shadow-xl hover:shadow-navy/8 hover:border-[#c9c8e2]"
                }`}
              >
                {pkg.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="cta-grad text-white text-xs font-bold px-3.5 py-1 rounded-full">
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div className="mb-4 pt-3">
                  <p className="text-xs font-medium uppercase tracking-[1.5px] text-muted-text mb-2">
                    {pkg.name}
                  </p>
                  {/* Value vs price */}
                  {pkg.totalValue && (
                    <p className="text-xs text-muted-text line-through decoration-red-400 mb-0.5">
                      Total value: {pkg.totalValue}
                    </p>
                  )}
                  <p className="text-3xl font-semibold text-navy">
                    {pkg.price}
                  </p>
                  <p className="text-xs text-muted-text mt-1">{pkg.usd}</p>
                </div>

                <p className="text-xs text-muted-text mb-3 font-medium">
                  {pkg.duration}
                </p>
                <p className="text-navy text-sm leading-relaxed mb-6 flex-1">
                  {pkg.desc}
                </p>

                <a
                  href={pkg.href ?? "#register"}
                  target={pkg.external ? "_blank" : undefined}
                  rel={pkg.external ? "noopener noreferrer" : undefined}
                  className={`block text-center text-sm font-bold py-3.5 rounded-full transition-all duration-200 ${
                    pkg.highlighted
                      ? "cta-grad text-white shadow-[0_12px_28px_rgba(255,106,61,0.35)] hover:-translate-y-0.5"
                      : "border border-navy/30 text-navy hover:bg-navy hover:text-white"
                  }`}
                >
                  {pkg.cta}
                </a>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <p className="text-center text-muted-text text-sm mt-8">
            Every seat is backed by the money-back guarantee — sharper after 2 sessions, or you pay nothing.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
