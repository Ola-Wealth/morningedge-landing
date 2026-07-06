import FadeIn from "./FadeIn";
import Image from "next/image";

const deliverables = [
  {
    title: "Your capstone AI workflow",
    desc: "One real workflow you build and ship for your actual job.",
  },
  {
    title: "Your prompt library + templates",
    desc: "Every prompt and template, categorised and ready to use.",
  },
  {
    title: "Your custom tool stack",
    desc: "The exact combination of AI tools chosen for your role.",
  },
  {
    title: "A private cohort community",
    desc: "Peers and coach access between sessions — and beyond.",
  },
  {
    title: "Recordings + certificate",
    desc: "Every session recorded and yours to keep, plus proof you finished.",
  },
];

export default function Deliverables() {
  return (
    <section className="mesh-soft py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — headline + person */}
          <FadeIn from="right">
            <h2 className="text-[40px] md:text-[48px] leading-[1.05] text-navy mb-8">
              You leave with more
              <br />
              than knowledge.
              <br />
              You leave with
              <br />
              <span className="serif-i text-bright">infrastructure.</span>
            </h2>
            <div className="relative hidden lg:block h-[380px] -mb-32">
              <div
                className="absolute inset-x-10 top-6 bottom-0 rounded-[50%_50%_46%_54%/56%_48%_52%_44%]"
                style={{ background: "linear-gradient(150deg, rgba(143,144,255,.5), rgba(255,176,46,.28))" }}
              />
              <Image
                src="/people/outcome-woman.png"
                alt="A professional celebrating a finished AI workflow at her laptop"
                fill
                sizes="(min-width: 1024px) 480px, 0px"
                className="object-contain object-bottom relative z-10"
              />
            </div>
          </FadeIn>

          {/* Right — deliverables list */}
          <FadeIn delay={0.15}>
            <div className="flex flex-col gap-4">
              {deliverables.map((d) => (
                <div
                  key={d.title}
                  className="flex gap-4 items-start bg-white border border-line rounded-2xl p-5 shadow-[0_10px_26px_rgba(10,10,46,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(10,10,46,0.10)]"
                >
                  <span className="w-9 h-9 rounded-xl bg-[rgba(47,47,240,0.08)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2f2ff0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                  </span>
                  <div>
                    <p className="text-navy text-[15px] font-bold mb-1">
                      {d.title}
                    </p>
                    <p className="text-muted-text text-[14px] leading-relaxed">
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
