"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import FadeIn from "./FadeIn";

const faqs = [
  {
    q: "Do I need any technical background?",
    a: "None at all. This cohort was designed for business professionals, not developers. If you can use WhatsApp, you can use the tools in this programme.",
  },
  {
    q: "Is this a cohort or 1-on-1?",
    a: "It's a live cohort — you learn alongside a small group of ambitious professionals, which is where the accountability and momentum come from. Prefer it fully personalised? We also offer a private 1-on-1 track — just talk to our team.",
  },
  {
    q: "How long is it, and how is it structured?",
    a: "Six live sessions over about six weeks — four build sessions and two hot-seat reviews, interleaved so you apply what you learn between sessions. You finish by shipping a real AI workflow for your own job.",
  },
  {
    q: "What if I miss a session?",
    a: "Every session is recorded and yours to keep, and the cohort community plus office hours help you catch up. You won't fall behind.",
  },
  {
    q: "I've tried ChatGPT and it wasn't impressive. Will this be different?",
    a: "That's exactly why this exists. ChatGPT isn't the problem — prompting is. Most people get poor results because they ask poorly. The prompting session alone will change your entire experience of every AI tool.",
  },
  {
    q: "What will I walk away with?",
    a: "A shipped AI workflow for your job, a prompt library and templates, all the session recordings, a private community, and a certificate — a system you keep, not just notes.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-white py-32">
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
