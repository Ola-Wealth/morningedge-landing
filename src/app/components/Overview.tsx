import FadeIn from "./FadeIn";

const features = [
  {
    title: "Live, not recorded",
    body: "Four build sessions teach you hands-on. Two hot-seat reviews put it to work on your real tasks.",
  },
  {
    title: "Zero code required",
    body: "Designed for business professionals, not developers. If you can send an email, you can do this.",
  },
  {
    title: "Practitioner-taught",
    body: "MorningEdge builds AI systems for businesses. You learn from the field, not from slides.",
  },
];

export default function Overview() {
  return (
    <section id="overview" className="mesh-band py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeIn>
          <p className="text-xs font-bold uppercase tracking-[2px] text-brand-blue mb-6">
            What is The AI Edge?
          </p>
          <h2 className="text-[40px] md:text-[56px] leading-[1.05] text-navy mb-8">
            Not a course.
            <br />
            <span className="serif-i text-bright">A live cohort.</span>
          </h2>
          <p className="text-muted-text text-lg leading-relaxed max-w-2xl mx-auto mb-16">
            Courses are passive. You watch, you forget. The AI Edge is six live
            sessions beside a cohort of ambitious professionals, applied to your
            actual job. You don&apos;t just leave with notes. You ship a real AI
            workflow, and keep the toolkit, the community, and the certificate.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-5 text-left">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.1}>
              <div className="bg-white border border-line rounded-2xl p-7 h-full shadow-[0_12px_30px_rgba(10,10,46,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_rgba(10,10,46,0.10)]">
                <span className="w-10 h-10 rounded-xl cta-grad flex items-center justify-center mb-5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                </span>
                <h3 className="text-navy text-base font-bold mb-2">{f.title}</h3>
                <p className="text-muted-text text-[14px] leading-relaxed">{f.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
