"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Headline reveal: each line rises out from behind a clipping mask.
 * Reserved for short display headlines — one element per line, not per character.
 */
export function LineReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            data-reveal
            className={`block ${lineClassName ?? ""}`}
            initial={reduced ? false : { y: "108%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.85,
              delay: delay + i * 0.09,
              ease: EASE,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
