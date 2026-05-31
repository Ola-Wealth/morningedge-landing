import FadeIn from "../../components/FadeIn";

const packages = [
  {
    name: "Taster Session",
    price: "₦35,000",
    usd: "~$22 USD",
    duration: "1 session · 90 minutes",
    desc: "For property professionals who want to experience the coaching before committing. One live session on your highest-leverage AI use case.",
    cta: "Start here",
    highlighted: false,
  },
  {
    name: "Starter Pack",
    price: "₦120,000",
    usd: "~$75 USD",
    duration: "4 sessions",
    desc: "AI foundations and property-specific prompting. Walk away with a listing template library you can use immediately.",
    cta: "Get started",
    highlighted: false,
  },
  {
    name: "Growth Pack",
    price: "₦220,000",
    usd: "~$138 USD",
    duration: "8 sessions",
    desc: "Full coverage of listing copy, lead response, and content operations. Best for active agents managing multiple clients.",
    cta: "Get started",
    highlighted: true,
    badge: "Most popular",
  },
  {
    name: "Full Program",
    price: "₦300,000",
    usd: "~$188 USD",
    duration: "12 sessions · Complete program",
    desc: "Every module. Customised to your market. Your complete property AI system delivered at the final session.",
    cta: "Get started",
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-light-bg py-24">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <h2 className="text-[40px] leading-[1.1] font-semibold text-navy text-center mb-3">
            Choose your pace.
          </h2>
          <p className="text-muted-text text-center text-lg mb-14">
            Every package starts with a free 30-minute discovery call.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {packages.map((pkg, i) => (
            <FadeIn key={pkg.name} delay={i * 0.08}>
              <div
                className={`relative rounded-xl p-6 flex flex-col h-full bg-white ${
                  pkg.highlighted
                    ? "border-2 border-brand-blue shadow-lg shadow-brand-blue/10"
                    : "border border-[#d0d0e0]"
                }`}
              >
                {pkg.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="bg-brand-blue text-white text-xs font-medium px-3 py-1 rounded-full">
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div className="mb-4 pt-3">
                  <p className="text-xs font-medium uppercase tracking-[1.5px] text-muted-text mb-2">
                    {pkg.name}
                  </p>
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
                  href="#register"
                  className={`block text-center text-sm font-medium py-3 rounded-lg transition-colors duration-200 ${
                    pkg.highlighted
                      ? "bg-brand-blue text-white hover:opacity-90"
                      : "border border-navy text-navy hover:bg-navy hover:text-white"
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
            Training your full agency? Monthly retainer available at ₦100,000/month.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
