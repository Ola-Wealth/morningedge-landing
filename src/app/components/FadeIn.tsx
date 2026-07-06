"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** slide direction on entry */
  from?: "up" | "down" | "left" | "right" | "none";
}

export default function FadeIn({
  children,
  delay = 0,
  className = "",
  from = "up",
}: FadeInProps) {
  const reduce = useReducedMotion();

  const offset = { up: { y: 24 }, down: { y: -24 }, left: { x: 24 }, right: { x: -24 }, none: {} }[from];

  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
