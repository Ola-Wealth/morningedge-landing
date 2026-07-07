"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * Mobile-only sticky CTA bar — mirrors the navbar's "frozen" behaviour.
 * The navbar's CTA is hidden below md (only the hamburger shows there),
 * so on mobile there is otherwise no persistent "Join the cohort" button
 * while scrolling. Appears after the hero, hides once #register is in view.
 */
export default function StickyCTA() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("section");
    const register = document.getElementById("register");
    if (!hero || !register) return;

    let pastHero = false;
    // Ratchet: once the register form has been reached, stay hidden for
    // good — otherwise scrolling past it into the footer would resurface
    // the bar (it's no longer "intersecting" #register at that point).
    let reachedRegister = false;

    const update = () => setVisible(pastHero && !reachedRegister);

    const heroObs = new IntersectionObserver(
      ([entry]) => {
        pastHero = !entry.isIntersecting;
        update();
      },
      { threshold: 0 }
    );
    const registerObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) reachedRegister = true;
        update();
      },
      { threshold: 0.15 }
    );

    heroObs.observe(hero);
    registerObs.observe(register);
    return () => {
      heroObs.disconnect();
      registerObs.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduce ? { opacity: 0 } : { y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-line shadow-[0_-8px_30px_rgba(10,10,46,0.10)] px-4 pt-3"
          style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
        >
          <a
            href="#register"
            className="cta-grad text-white text-[15px] font-bold w-full flex items-center justify-center gap-2 py-3.5 rounded-full shadow-[0_10px_26px_rgba(255,106,61,0.35)]"
          >
            Join the cohort — ₦49,899 →
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
