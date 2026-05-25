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
    <section className="bg-[#07071f] py-24 border-t border-[rgba(255,255,255,0.07)]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center mb-16">
            <p className="text-xs font-medium uppercase tracking-[1.5px] text-brand-blue mb-6">
              For Organisations
            </p>
            <h2 className="text-[40px] leading-[1.1] font-semibold text-white mb-6">
              Your team is already using AI.
              <br />
              <span className="text-[rgba(255,255,255,0.45)]">Just not well.</span>
            </h2>
            <p className="text-[rgba(255,255,255,0.55)] text-lg leading-relaxed">
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
              <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl p-7 h-full">
                <div className="w-10 h-10 rounded-lg bg-[rgba(30,30,180,0.2)] flex items-center justify-center mb-5">
                  <Icon size={18} className="text-brand-blue" />
                </div>
                <h3 className="text-white font-semibold mb-2 text-[15px]">{title}</h3>
                <p className="text-[rgba(255,255,255,0.45)] text-[14px] leading-relaxed">{body}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* CTA strip */}
        <FadeIn>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-[rgba(30,30,180,0.12)] border border-[rgba(30,30,180,0.3)] rounded-xl px-8 py-7">
            <div>
              <p className="text-white font-semibold text-lg mb-1">
                Ready to bring The AI Edge to your team?
              </p>
              <p className="text-[rgba(255,255,255,0.45)] text-sm">
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
              className="flex-shrink-0 bg-brand-blue text-white font-medium text-[15px] px-7 py-3.5 rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Book a team training call →
            </a>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
