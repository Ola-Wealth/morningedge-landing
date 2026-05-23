import FadeIn from "./FadeIn";

const deliverables = [
  {
    title: "Your personal prompt library",
    desc: "Every template, categorised and ready to use.",
  },
  {
    title: "Your custom tool stack",
    desc: "The exact combination of AI tools chosen for your role.",
  },
  {
    title: "Your AI workflow design",
    desc: "How AI fits into your daily and weekly rhythm.",
  },
  {
    title: "WhatsApp coaching support",
    desc: "Access to your coach between sessions for quick questions.",
  },
  {
    title: "Session notes after every call",
    desc: "Written summaries so nothing is lost.",
  },
];

export default function Deliverables() {
  return (
    <section className="bg-navy py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <FadeIn>
            <h2 className="text-[44px] leading-[1.05] font-semibold text-white">
              You leave with
              <br />
              more than knowledge.
              <br />
              You leave with
              <br />
              infrastructure.
            </h2>
          </FadeIn>

          {/* Right */}
          <FadeIn delay={0.15}>
            <div className="flex flex-col gap-7">
              {deliverables.map((d) => (
                <div key={d.title} className="flex gap-4">
                  <div className="w-0.5 bg-brand-blue flex-shrink-0 self-stretch" />
                  <div>
                    <p className="text-white text-[15px] font-medium mb-1">
                      {d.title}
                    </p>
                    <p className="text-[rgba(255,255,255,0.55)] text-[14px] leading-relaxed">
                      {d.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
