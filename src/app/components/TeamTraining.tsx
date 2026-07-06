"use client";

import FadeIn from "./FadeIn";
import { Target, Users, Zap } from "lucide-react";

const pillars = [
  {
    Icon: Target,
    title: "Tailored curriculum",
    body: "Built around your industry, team function, and current AI maturity — not a generic workshop recycled from a YouTube tutorial.",
  },
  {
    Icon: Users,
    title: "Delivered to your team",
    body: "Live sessions for your department, unit, or full organisation. Remote or on-site. We come to where your team already is.",
  },
  {
    Icon: Zap,
    title: "Immediate application",
    body: "Practical frameworks your team starts using from day one. No theory without execution. No training without transfer.",
  },
];

export default function TeamTraining() {
  return (
    <section className="bg-white py-32 border-t border-line">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[2px] text-brand-blue mb-6">
              For Organisations
            </p>
            <h2 className="text-[40px] md:text-[48px] leading-[1.05] text-navy mb-6">
              Your team is already using AI.
              <br />
              <span className="serif-i text-bright">Just not well.</span>
            </h2>
            <p className="text-muted-text text-lg leading-relaxed">
              Most organisations have the tools. Few have the literacy. The gap
              shows up in output quality, decision speed, and who clients trust
              to get things done. The AI Edge Team Training closes that gap —
              across your entire team, at once.
            </p>
          </div>
        </FadeIn>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {pillars.map(({ Icon, title, body }, i) => (
            <FadeIn key={title} delay={i * 0.1}>
              <div className="bg-light-bg border border-line rounded-2xl p-7 h-full transition-all duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_24px_50px_rgba(10,10,46,0.09)]">
                <div className="w-10 h-10 rounded-xl bg-[rgba(47,47,240,0.08)] flex items-center justify-center mb-5">
                  <Icon size={18} className="text-bright" />
                </div>
                <h3 className="text-navy font-bold mb-2 text-[15px]">{title}</h3>
                <p className="text-muted-text text-[14px] leading-relaxed">{body}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* CTA strip */}
        <FadeIn>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-navy rounded-2xl px-8 py-7 shadow-[0_24px_60px_rgba(10,10,46,0.25)]">
            <div>
              <p className="text-white font-bold text-lg mb-1">
                Ready to bring The AI Edge to your team?
              </p>
              <p className="text-[rgba(255,255,255,0.55)] text-sm">
                Start with a free 40-minute strategy call. No commitment.
              </p>
            </div>
            <a
              href="#register"
              onClick={() => {
                if (typeof window !== "undefined") {
                  sessionStorage.setItem("registerTab", "team");
                }
              }}
              className="flex-shrink-0 cta-grad text-white font-bold text-[15px] px-7 py-3.5 rounded-full shadow-[0_14px_32px_rgba(255,106,61,0.4)] hover:-translate-y-0.5 whitespace-nowrap"
            >
              Book a team training call →
            </a>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
