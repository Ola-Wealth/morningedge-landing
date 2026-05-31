"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import FadeIn from "../../components/FadeIn";

const faqs = [
  {
    q: "Do I need any technical background?",
    a: "None at all. If you can use WhatsApp to market properties, you already have the mindset this programme builds on. This was designed for working property professionals, not developers.",
  },
  {
    q: "Will this work for my specific market in Nigeria?",
    a: "Yes. Every session is built around your actual work — your listings, your clients, your city. Whether you operate in Lagos Island, Lekki, Abuja, Port Harcourt, or anywhere else in Nigeria, the programme adapts to your market.",
  },
  {
    q: "How is this different from a social media or digital marketing course?",
    a: "Digital marketing courses teach platforms. This programme builds your AI system — a set of tools and habits that improve everything you do: listing copy, lead responses, content creation, research, and client communication.",
  },
  {
    q: "What AI tools will I learn to use?",
    a: "ChatGPT, Claude, Gemini, Canva AI, Perplexity, and more — each selected based on what Nigerian real estate professionals actually need. No unnecessary tools, no hype.",
  },
  {
    q: "Can AI help with listings on PropertyPro and Nigeria Property Centre?",
    a: "Absolutely. Session 2 covers property copywriting specifically — writing listings that attract serious enquiries, position your properties above the competition, and get you called first.",
  },
  {
    q: "Is there support between sessions?",
    a: "Yes. WhatsApp access to your coach throughout the programme for quick questions and real-time guidance — exactly when you need it.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-white py-24">
      <div className="max-w-[680px] mx-auto px-6">
        <FadeIn>
          <h2 className="text-[40px] leading-[1.1] font-semibold text-navy text-center mb-14">
            Common questions.
          </h2>
        </FadeIn>

        <div className="divide-y divide-[#e0e0e8]">
          {faqs.map((faq, i) => (
            <div key={faq.q}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left gap-4 cursor-pointer"
                aria-expanded={openIndex === i}
              >
                <span className="text-navy text-base font-medium leading-snug">
                  {faq.q}
                </span>
                <span className="flex-shrink-0 text-muted-text">
                  {openIndex === i ? <X size={18} /> : <Plus size={18} />}
                </span>
              </button>
              {openIndex === i && (
                <div className="pb-5">
                  <p className="text-muted-text text-[15px] leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
