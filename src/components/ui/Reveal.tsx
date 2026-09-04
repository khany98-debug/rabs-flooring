"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * The site's only scroll animation: a short, quiet rise-and-fade as a block
 * enters the viewport.
 *
 * Deliberately restrained. No parallax, no scroll hijacking, no staggered
 * letter animations — those read as agency showreel, not as a retailer people
 * are trying to buy a carpet from. This exists to make the page feel
 * considered as you move down it, and nothing more.
 *
 * `useReducedMotion` disables it entirely for anyone who has asked for that,
 * rendering the content in its final state immediately.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  y = 18,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
