"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

function StatCard({
  className,
  icon,
  title,
  sub,
}: {
  className?: string;
  icon: React.ReactNode;
  title: string;
  sub: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 bg-white/90 backdrop-blur-sm border border-line rounded-2xl px-4 py-3 shadow-[0_18px_40px_rgba(10,10,46,0.10)] ${className ?? ""}`}
    >
      <span className="w-10 h-10 rounded-xl bg-[rgba(47,47,240,0.08)] flex items-center justify-center flex-shrink-0">
        {icon}
      </span>
      <span>
        <span className="block text-navy text-[15px] font-extrabold leading-tight">{title}</span>
        <span className="block text-muted-text text-[12px] font-medium">{sub}</span>
      </span>
    </div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="mesh-hero relative overflow-hidden pt-16">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center min-h-[92vh] py-16">

        {/* ── Left: copy ── */}
        <motion.div variants={container} initial={reduce ? "show" : "hidden"} animate="show">
          <motion.div variants={item} className="inline-flex items-center gap-2 bg-white border border-line rounded-full px-4 py-2 mb-7 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
            <span className="text-[12px] font-bold uppercase tracking-[1.5px] text-brand-blue">
              Next cohort · enrolling now
            </span>
          </motion.div>

          <motion.h1 variants={item} className="text-[44px] md:text-[64px] leading-[1.02] text-navy mb-6">
            Become the most
            <br />
            <span className="serif-i text-bright">AI-literate</span> professional
            <br />
            in the room.
          </motion.h1>

          <motion.p variants={item} className="text-muted-text text-lg leading-relaxed mb-8 max-w-md">
            A live 6-session cohort. You start using AI to get tasks done. You
            finish using it as a <b className="text-navy">thinking partner</b>.
            No code required.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-4 mb-8">
            <a
              href="#register"
              className="cta-grad text-white font-bold text-base px-8 py-4 rounded-full shadow-[0_18px_40px_rgba(255,106,61,0.4)] hover:shadow-[0_22px_48px_rgba(255,106,61,0.5)] hover:-translate-y-0.5"
            >
              Join the cohort →
            </a>
            <a
              href="#scorecard"
              className="inline-flex items-center gap-2 text-navy font-bold text-[15px] px-2 py-2 hover:text-bright"
            >
              <span className="w-9 h-9 rounded-full border border-navy/20 bg-white flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10M18 20V4M6 20v-4"/></svg>
              </span>
              Get your AI Readiness Score
            </a>
          </motion.div>

          <motion.div variants={item} className="flex items-center gap-3">
            <div className="flex -space-x-2.5">
              {["bg-lav", "bg-coral", "bg-bright", "bg-amber"].map((c, i) => (
                <span key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-white flex items-center justify-center text-white text-[11px] font-bold`}>
                  {["T", "A", "N", "K"][i]}
                </span>
              ))}
            </div>
            <p className="text-[13px] text-muted-text font-medium">
              <span className="text-navy font-bold">Leads, managers &amp; owners</span> are taking their seat
            </p>
          </motion.div>
        </motion.div>

        {/* ── Right: person + floating cards ── */}
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative hidden lg:block h-[660px] -mr-10"
        >
          {/* blob behind person */}
          <div
            className="absolute -inset-x-4 top-6 -bottom-16 rounded-[48%_52%_46%_54%/52%_48%_52%_48%]"
            style={{ background: "linear-gradient(150deg, rgba(143,144,255,.55), rgba(47,47,240,.28) 55%, rgba(255,106,61,.30))" }}
          />
          {/* close-up crop: cover fills the frame, anchored on the face */}
          <div className="absolute inset-0 -bottom-16 overflow-hidden rounded-b-none z-10">
            <Image
              src="/people/hero-man.png"
              alt="A professional pointing at the enrolment call to action"
              fill
              priority
              sizes="(min-width: 1024px) 640px, 0px"
              className="object-cover object-[42%_8%] scale-[1.28] origin-top"
            />
          </div>

          {/* floating stat cards */}
          <div className="absolute top-10 -left-2 z-20 floaty">
            <StatCard
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2f2ff0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>}
              title="6 live sessions"
              sub="4 build · 2 hot-seat"
            />
          </div>
          <div className="absolute top-44 right-0 z-20 floaty-2">
            <StatCard
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6a3d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/></svg>}
              title="Ship a real project"
              sub="Your capstone workflow"
            />
          </div>
          <div className="absolute bottom-16 -left-6 z-20 floaty-3">
            <StatCard
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e1eb4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
              title="A cohort beside you"
              sub="Community that stays"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
