"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { LineReveal } from "@/components/motion/LineReveal";
import { HeroFlow } from "@/components/home/HeroFlow";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-32">
      {/* Decorative ambient wash. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-brand-aura"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-surface"
      />

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h1 className="text-display font-semibold">
              <LineReveal lines={["Outsource Your"]} />
              <LineReveal
                lines={["AI Development", "To Us."]}
                lineClassName="text-gradient"
                delay={0.09}
              />
            </h1>

            <motion.div
              data-reveal
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.42, ease: EASE }}
              className="mt-9"
            >
              <p className="max-w-md text-lead text-ink-soft pretty">
                Tell us the problem. We design, build and deploy the AI that
                solves it, so your team stays focused on the business.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button href="/transformation">View Success Stories</Button>
                <Button href="/products" variant="secondary">
                  Explore Products
                </Button>
              </div>
            </motion.div>
          </div>

          <motion.div
            data-reveal
            initial={reduced ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
            className="flex justify-center lg:col-span-5 lg:justify-end"
          >
            <HeroFlow />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
