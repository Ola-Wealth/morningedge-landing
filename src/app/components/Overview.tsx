import FadeIn from "./FadeIn";

const features = [
  "Fully personalised to your role and industry",
  "Zero code. Zero technical background required.",
  "Practitioner-taught — MorningEdge builds AI systems for businesses.",
];

export default function Overview() {
  return (
    <section id="overview" className="bg-navy py-24">
      <div className="max-w-[680px] mx-auto px-6 text-center">
        <FadeIn>
          <p className="text-xs font-medium uppercase tracking-[1.5px] text-brand-blue mb-6">
            What is The AI Edge?
          </p>
          <h2 className="text-[40px] leading-[1.1] font-semibold text-white mb-8">
            Not a course. A coaching program.
          </h2>
          <div className="text-[rgba(255,255,255,0.6)] text-lg leading-relaxed text-left space-y-4 mb-10">
            <p>Courses are passive. You watch, you forget.</p>
            <p>
              The AI Edge is different. Every session is live and 1-on-1. Every
              task is applied to your actual work. Every outcome is specific to
              your role, your tools, and your challenges.
            </p>
            <p>
              You don&apos;t leave with a certificate. You leave with a working
              personal AI system — built for the way you work.
            </p>
          </div>
          <div className="flex flex-col gap-4 text-left">
            {features.map((f) => (
              <div key={f} className="flex items-start gap-4">
                <span className="text-brand-blue text-base mt-0.5 flex-shrink-0">
                  ◆
                </span>
                <p className="text-white text-[15px] leading-relaxed">{f}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
