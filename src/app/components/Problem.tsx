import FadeIn from "./FadeIn";

const problems = [
  {
    title: "You're doing manually what AI does in seconds",
    body: "Emails, reports, research, proposals — tasks that take hours are being done in minutes by professionals who know how to use AI.",
  },
  {
    title: "The tools exist. Nobody taught you how to use them.",
    body: "It's not about access. ChatGPT, Claude, Gemini — they're all free. The gap is knowing how to speak to them, when to trust them, and how to make them work for your specific role.",
  },
  {
    title: "The gap is widening every month.",
    body: "AI literacy is becoming the dividing line between professionals who scale and those who stay busy. This program puts you on the right side of that line.",
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
              AI is already at work.
              <br />
              Most professionals
              <br />
              are still catching up.
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
