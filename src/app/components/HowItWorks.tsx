import FadeIn from "./FadeIn";

const steps = [
  {
    number: "01",
    title: "Join the cohort",
    body: "Take the free scorecard, then secure your seat with one payment. First 15 seats at ₦50,000.",
  },
  {
    number: "02",
    title: "Onboard & assess",
    body: "A short AI-readiness assessment and setup, so you arrive to Session 1 ready to build.",
  },
  {
    number: "03",
    title: "6 live sessions",
    body: "Four build sessions and two hot-seat reviews, interleaved over ~6 weeks so you apply as you learn.",
  },
  {
    number: "04",
    title: "Ship your capstone",
    body: "Finish having built one real AI workflow for your job — plus a toolkit, recordings, and a community you keep.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mesh-soft py-32">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <h2 className="text-[40px] md:text-[48px] leading-[1.05] text-navy text-center mb-4">
            From cautious to capable,
            <br />
            <span className="serif-i text-bright">in one cohort.</span>
          </h2>
          <p className="text-muted-text text-center text-lg mb-16">
            Four steps. Nothing to figure out on your own.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <FadeIn key={step.number} delay={i * 0.1}>
              <div className="relative bg-white rounded-2xl border border-line p-6 h-full shadow-[0_12px_30px_rgba(10,10,46,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_rgba(10,10,46,0.10)]">
                <span className="absolute top-4 right-4 text-5xl font-extrabold text-[rgba(10,10,46,0.05)] select-none leading-none pointer-events-none">
                  {step.number}
                </span>
                <span className="inline-flex w-9 h-9 rounded-full cta-grad text-white text-[13px] font-extrabold items-center justify-center mb-4">
                  {step.number}
                </span>
                <h3 className="text-navy text-base font-bold mb-3 pr-8">
                  {step.title}
                </h3>
                <p className="text-muted-text text-[15px] leading-relaxed">
                  {step.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
