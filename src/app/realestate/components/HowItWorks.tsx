import FadeIn from "../../components/FadeIn";

const steps = [
  {
    number: "01",
    title: "Free discovery call",
    body: "A 30-minute conversation to assess your AI readiness, understand your property business, and recommend the right package.",
  },
  {
    number: "02",
    title: "Personalised intake",
    body: "A short form so the coach knows your listing types, goals, and top three challenges before Session 1 begins.",
  },
  {
    number: "03",
    title: "12 live sessions",
    body: "Six modules. Real work. Real results. Each session ends with a practical task applied directly to your property business.",
  },
  {
    number: "04",
    title: "Your property AI system",
    body: "The final session delivers your complete tool stack, listing prompt library, and workflow design — yours to keep.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-light-bg py-24">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <h2 className="text-[40px] leading-[1.1] font-semibold text-navy text-center mb-16">
            From zero to fluent in 12 sessions.
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <FadeIn key={step.number} delay={i * 0.1}>
              <div className="relative bg-white rounded-xl border border-[#e0e0e8] p-6 h-full">
                <span className="absolute top-4 right-4 text-5xl font-semibold text-[rgba(10,10,46,0.06)] select-none leading-none pointer-events-none">
                  {step.number}
                </span>
                <div className="text-brand-blue text-xs font-semibold uppercase tracking-[1.5px] mb-3">
                  {step.number}
                </div>
                <h3 className="text-navy text-base font-semibold mb-3 pr-8">
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
