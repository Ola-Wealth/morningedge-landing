import FadeIn from "../../components/FadeIn";

const problems = [
  {
    title: "Your listings read like everyone else's",
    body: "Generic descriptions, repetitive language, no personality. AI generates compelling property copy in seconds — listings that attract enquiries before the next agent finishes typing.",
  },
  {
    title: "You're losing leads while you sleep",
    body: "Every DM left unanswered after 9pm is a deal walking to the next agent. AI follow-up systems engage prospects the moment they reach out — 24 hours a day, without extra staff.",
  },
  {
    title: "The top agents in your market are already ahead",
    body: "AI literacy is becoming the dividing line between agents who scale and those who stay busy. In Lagos, Abuja, and Port Harcourt, the gap is widening every quarter. This programme puts you on the right side.",
  },
];

export default function Problem() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left */}
          <FadeIn>
            <p className="text-xs font-medium uppercase tracking-[1.5px] text-muted-text mb-5">
              The gap is real
            </p>
            <h2 className="text-[40px] leading-[1.1] font-semibold text-navy">
              AI is already
              <br />
              closing deals.
              <br />
              Most agents are
              <br />
              still catching up.
            </h2>
          </FadeIn>

          {/* Right */}
          <div className="flex flex-col gap-4">
            {problems.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.1}>
                <div className="bg-light-bg rounded-xl border-l-[3px] border-brand-blue p-6">
                  <h3 className="text-navy text-base font-semibold mb-2">
                    {p.title}
                  </h3>
                  <p className="text-muted-text text-[15px] leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
