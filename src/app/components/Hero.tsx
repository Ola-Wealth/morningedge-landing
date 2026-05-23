"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="bg-navy min-h-[90vh] flex items-center pt-16 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full border border-[rgba(30,30,180,0.12)] pointer-events-none translate-x-1/4" />
      <div className="absolute top-1/3 right-0 w-[320px] h-[320px] rounded-full border border-[rgba(30,30,180,0.08)] pointer-events-none translate-x-1/3" />
      <div className="absolute bottom-1/4 left-0 w-[200px] h-[200px] rounded-full border border-[rgba(30,30,180,0.07)] pointer-events-none -translate-x-1/3" />

      <div className="max-w-6xl mx-auto px-6 py-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl"
        >
          {/* Badge */}
          <div className="inline-block mb-8">
            <span className="text-xs font-medium uppercase tracking-[1.5px] bg-[rgba(30,30,180,0.15)] border border-[rgba(30,30,180,0.35)] text-brand-blue px-4 py-2 rounded-full">
              A MorningEdge Coaching Program
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[48px] md:text-[72px] leading-[1.0] font-semibold mb-6">
            <span className="text-white">The AI </span>
            <span className="text-brand-blue">Edge.</span>
          </h1>

          {/* Subheadline */}
          <div className="border-l-2 border-brand-blue pl-4 mb-6">
            <p className="text-white text-lg font-medium">
              Your AI literacy gap is showing.
            </p>
          </div>

          {/* Body */}
          <p className="text-[rgba(255,255,255,0.65)] text-lg leading-relaxed mb-10 max-w-xl">
            Most professionals don&apos;t know what they&apos;re missing. This
            program closes the gap — live, 1-on-1, and with zero code required.
          </p>

          {/* CTA */}
          <a
            href="#register"
            className="inline-block bg-brand-blue text-white font-medium text-base px-8 py-4 rounded-[10px] hover:opacity-90 transition-opacity mb-4"
          >
            Book your free discovery call →
          </a>

          <p className="text-[rgba(255,255,255,0.4)] text-sm mb-10">
            40 minutes. No commitment. Just clarity.
          </p>

          {/* Stat pills */}
          <div className="flex flex-wrap gap-3">
            {["12 live sessions", "Zero code", "Built around you"].map(
              (stat) => (
                <div
                  key={stat}
                  className="border border-[rgba(30,30,180,0.4)] bg-[rgba(30,30,180,0.08)] text-white text-sm font-medium px-5 py-2.5 rounded-full"
                >
                  {stat}
                </div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
