"use client";

import { useState, useEffect } from "react";
import { X, Menu } from "lucide-react";
import Image from "next/image";

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
          ? "bg-[rgba(10,10,46,0.85)] backdrop-blur-md border-b border-[rgba(255,255,255,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="MorningEdge Co."
            width={40}
            height={40}
            className="h-10 w-10 invert"
            priority
          />
        </div>

        {/* Desktop CTA */}
        <a
          href="#register"
          className="hidden md:inline-block border border-white text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-white hover:text-navy transition-colors duration-200"
        >
          Book a free call
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white p-1"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div className="md:hidden bg-navy px-6 py-8 border-t border-[rgba(255,255,255,0.08)]">
          <a
            href="#register"
            onClick={() => setOpen(false)}
            className="block border border-white text-white text-base font-medium px-5 py-3 rounded-lg text-center hover:bg-white hover:text-navy transition-colors duration-200"
          >
            Book a free call
          </a>
        </div>
      )}
    </nav>
  );
}
