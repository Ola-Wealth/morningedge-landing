"use client";

import { useState, useEffect } from "react";
import { X, Menu } from "lucide-react";
import Image from "next/image";

const links = [
  { label: "Free scorecard", href: "#scorecard" },
  { label: "Program", href: "#overview" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(255,255,255,0.82)] backdrop-blur-md border-b border-line shadow-[0_8px_30px_rgba(10,10,46,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo + Wordmark */}
        <a href="#" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="MorningEdge AI"
            width={40}
            height={40}
            className="h-9 w-9 rounded-full"
            priority
          />
          <span className="text-[17px] font-black tracking-wide" style={{ fontFamily: "var(--font-playfair)" }}>
            <span className="text-navy">morning</span>
            <span className="text-bright">edge</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[14px] font-semibold text-muted-text hover:text-navy"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#register"
          className="hidden md:inline-block cta-grad text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-[0_10px_26px_rgba(255,106,61,0.35)] hover:shadow-[0_14px_32px_rgba(255,106,61,0.45)] hover:-translate-y-0.5"
        >
          Join the cohort
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-navy p-2 cursor-pointer"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div className="md:hidden bg-white px-6 py-8 border-t border-line shadow-lg">
          <div className="flex flex-col gap-5 mb-6">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-navy text-base font-semibold"
              >
                {l.label}
              </a>
            ))}
          </div>
          <a
            href="#register"
            onClick={() => setOpen(false)}
            className="block cta-grad text-white text-base font-bold px-5 py-3.5 rounded-full text-center"
          >
            Join the cohort
          </a>
        </div>
      )}
    </nav>
  );
}
