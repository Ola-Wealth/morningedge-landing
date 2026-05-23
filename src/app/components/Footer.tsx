const navLinks = [
  { label: "Program", href: "#overview" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Book a call", href: "#register" },
];

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-[rgba(255,255,255,0.08)]">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Left */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-0.5 h-5 bg-brand-blue" />
              <span className="text-white text-sm font-medium">
                MorningEdge Co.
              </span>
            </div>
            <p className="text-[rgba(255,255,255,0.4)] text-sm leading-relaxed">
              AI systems for modern businesses.
            </p>
          </div>

          {/* Center */}
          <div className="flex flex-wrap md:flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[rgba(255,255,255,0.5)] text-sm hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right */}
          <div className="flex flex-col gap-1.5">
            <p className="text-[rgba(255,255,255,0.5)] text-sm">
              morningedge@proton.me
            </p>
            <p className="text-[rgba(255,255,255,0.5)] text-sm">
              morningedge.co.site
            </p>
            <p className="text-[rgba(255,255,255,0.5)] text-sm">
              Lagos, Nigeria
            </p>
          </div>
        </div>

        <div className="border-t border-[rgba(255,255,255,0.08)] pt-6">
          <p className="text-[rgba(255,255,255,0.3)] text-[12px] text-center tracking-wide">
            © 2026 MorningEdge Co. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
