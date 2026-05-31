"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="min-h-[100vh] flex items-center pt-16 relative overflow-hidden">

      {/* Hero image */}
      <Image
        src="/hero-bg.jpg"
        alt=""
        fill
        className="object-cover object-center mix-blend-overlay opacity-75"
        priority
      />

      {/* Blue multiply layer — converts white/grey areas in image to blue */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "#1e1eb4", mixBlendMode: "multiply" }}
      />

      {/* Left-side text protection */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to right, rgba(10,10,46,1) 0%, rgba(10,10,46,0.9) 45%, rgba(10,10,46,0.2) 70%, rgba(10,10,46,0) 100%)"
        }}
      />

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{ background: "linear-gradient(to top, rgba(10,10,46,1), rgba(10,10,46,0))" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          {/* Badge */}
          <div className="inline-block mb-8">
            <span className="text-xs font-medium uppercase tracking-[1.5px] bg-[rgba(30,30,180,0.2)] border border-[rgba(30,30,180,0.4)] text-brand-blue px-4 py-2 rounded-full">
              A MorningEdge Coaching Program
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[60px] md:text-[96px] leading-[0.95] mb-6">
            <span className="text-white">The AI </span>
            <span className="text-brand-blue">Edge.</span>
          </h1>

          {/* Scarcity chip */}
          <div className="inline-flex items-center gap-2 bg-[rgba(255,80,80,0.12)] border border-[rgba(255,80,80,0.3)] text-[#ff6b6b] text-xs font-medium px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b6b] animate-pulse" />
            Only 5 new clients accepted per month
          </div>

          {/* Subheadline */}
          <div className="border-l-2 border-brand-blue pl-4 mb-6">
            <p className="text-white text-lg font-medium">
              Become the most AI-literate professional in the room.
            </p>
          </div>

          {/* Body */}
          <p className="text-[rgba(255,255,255,0.7)] text-lg leading-relaxed mb-10 max-w-xl">
            Most professionals don&apos;t know what they&apos;re missing. This
            program closes the gap — live, 1-on-1, and with zero code required.
          </p>

          {/* CTA */}
          <a
            href="#register"
            className="inline-block bg-brand-blue text-white font-medium text-base px-8 py-4 rounded-[10px] hover:opacity-90 mb-4"
          >
            Book your free discovery call →
          </a>

          <p className="text-[rgba(255,255,255,0.4)] text-sm mb-10">
            40 minutes. No commitment. Just clarity.
          </p>

          {/* Stat pills */}
          <div className="flex flex-wrap gap-3">
            {["12 live sessions", "Zero code", "Built around you"].map((stat) => (
              <div
                key={stat}
                className="border border-[rgba(30,30,180,0.5)] bg-[rgba(30,30,180,0.15)] backdrop-blur-sm text-white text-sm font-medium px-5 py-2.5 rounded-full"
              >
                {stat}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
