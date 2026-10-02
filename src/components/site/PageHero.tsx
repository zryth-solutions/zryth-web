"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Layout";
import { LineReveal } from "@/components/motion/LineReveal";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Shared opening for inner pages: eyebrow, masked headline lines, supporting copy.
 * `gradientFrom` marks the index at which headline lines switch to the brand gradient.
 */
export function PageHero({
  eyebrow,
  lines,
  gradientFrom,
  children,
}: {
  eyebrow: string;
  lines: string[];
  gradientFrom?: number;
  children?: ReactNode;
}) {
  const reduced = useReducedMotion();
  const plain = gradientFrom === undefined ? lines : lines.slice(0, gradientFrom);
  const accent = gradientFrom === undefined ? [] : lines.slice(gradientFrom);

  return (
    <section className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28 lg:pt-52 lg:pb-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-brand-aura"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-surface"
      />

      <Container>
        <motion.p
          data-reveal
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="label text-brand-600"
        >
          {eyebrow}
        </motion.p>

        <h1 className="mt-8 text-h1 font-semibold">
          <LineReveal lines={plain} delay={0.08} />
          {accent.length > 0 && (
            <LineReveal
              lines={accent}
              lineClassName="text-gradient"
              delay={0.08 + plain.length * 0.09}
            />
          )}
        </h1>

        {children && (
          <motion.div
            data-reveal
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.2 + lines.length * 0.09,
              ease: EASE,
            }}
            className="mt-10 max-w-2xl"
          >
            {children}
          </motion.div>
        )}
      </Container>
    </section>
  );
}
