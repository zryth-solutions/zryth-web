"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { Container, Eyebrow } from "@/components/ui/Layout";
import { Reveal } from "@/components/motion/Reveal";

const THEN = [
  "Someone receives it.",
  "Someone forwards it.",
  "Someone explains it.",
  "Someone approves it.",
  "Someone enters it.",
  "Someone checks it.",
  "Someone follows up.",
  "Someone finally completes it.",
];

const NOW = [
  "Understands.",
  "Finds.",
  "Reasons.",
  "Acts.",
  "Updates.",
  "Escalates when necessary.",
  "Done.",
];

export function ThenNow() {
  return (
    <section className="relative bg-surface py-24 sm:py-32 lg:py-40">
      <Container>
        <Reveal>
          <Eyebrow>Then / Now</Eyebrow>
        </Reveal>

        <ChainBlock
          heading="Work used to move through people."
          lines={THEN}
          tone="then"
        />

        <ChainBlock
          heading="Now work can move itself."
          lines={NOW}
          tone="now"
        />

        <Reveal className="mt-20 sm:mt-28">
          <h2 className="text-h1 font-semibold balance">
            Fewer handoffs.
            <br />
            Fewer hours.
            <br />
            <span className="text-gradient">
              Fewer things lost in between.
            </span>
          </h2>
        </Reveal>
      </Container>
    </section>
  );
}

function ChainBlock({
  heading,
  lines,
  tone,
}: {
  heading: string;
  lines: string[];
  tone: "then" | "now";
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Ties each line's emphasis to how far this block has travelled through
  // the viewport, so the list reads top-to-bottom as you scroll.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });

  return (
    <div
      ref={ref}
      className="mt-20 grid gap-10 sm:mt-28 lg:grid-cols-12 lg:gap-16"
    >
      <div className="lg:col-span-5">
        <Reveal>
          <h2 className="text-h2 font-semibold balance lg:sticky lg:top-32">
            {tone === "now" ? (
              <span className="text-gradient">{heading}</span>
            ) : (
              heading
            )}
          </h2>
        </Reveal>
      </div>

      <ul className="lg:col-span-6 lg:col-start-7">
        {lines.map((line, i) => (
          <ChainLine
            key={line}
            line={line}
            index={i}
            total={lines.length}
            progress={scrollYProgress}
            tone={tone}
          />
        ))}
      </ul>
    </div>
  );
}

function ChainLine({
  line,
  index,
  total,
  progress,
  tone,
}: {
  line: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  tone: "then" | "now";
}) {
  const reduced = useReducedMotion();
  const point = index / total;

  const opacity = useTransform(progress, [point - 0.14, point + 0.04], [0.2, 1]);
  const x = useTransform(progress, [point - 0.14, point + 0.04], [8, 0]);

  return (
    <motion.li
      data-reveal
      style={reduced ? undefined : { opacity, x }}
      className={`border-b border-line-soft py-4 text-statement font-medium last:border-0${
        tone === "now" ? "text-ink" : "text-ink-soft"
      }`}
    >
      {line}
    </motion.li>
  );
}
