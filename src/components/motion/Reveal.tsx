"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;
const MARGIN = "0px 0px -12% 0px";

/**
 * Tags these primitives can render as. Looked up on framer's cached proxy —
 * calling motion.create() during render would remount on every pass.
 */
type Tag = "div" | "section" | "ul" | "ol" | "li" | "p" | "span";

const motionTags = {
  div: motion.div,
  section: motion.section,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  p: motion.p,
  span: motion.span,
} as const;

/**
 * True once the element should show its final state — either it has entered the
 * viewport, or it started out already scrolled past (browser scroll restoration,
 * deep link to an anchor), in which case it must not stay stuck at opacity 0.
 */
function useRevealed(ref: React.RefObject<Element | null>, skip: boolean) {
  const inView = useInView(ref, { once: true, margin: MARGIN });
  const [alreadyPassed, setAlreadyPassed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (el && el.getBoundingClientRect().bottom < 0) setAlreadyPassed(true);
  }, [ref]);

  return skip || inView || alreadyPassed;
}

type RevealProps = {
  children: ReactNode;
  /** Seconds to wait after the element enters view. */
  delay?: number;
  /** Vertical travel in px. Kept small so it reads as a fade, not a slide. */
  y?: number;
  as?: Tag;
  className?: string;
};

/**
 * Fades content up as it enters the viewport, once. Under `prefers-reduced-motion`
 * it renders the final state immediately with no travel.
 */
export function Reveal({
  children,
  delay = 0,
  y = 14,
  as = "div",
  className,
}: RevealProps) {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const revealed = useRevealed(ref, reduced);
  // The tag union widens ref to an intersection of every element type; we only
  // ever measure the node, so collapse it to one concrete motion component.
  const Tag = motionTags[as] as typeof motion.div;

  return (
    <Tag
      ref={ref}
      data-reveal
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      animate={revealed ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

/**
 * Wraps a list so children reveal in sequence. Keep to ~8 children — beyond that
 * the tail of the stagger starts to feel laggy.
 */
export function RevealGroup({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
}) {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const revealed = useRevealed(ref, reduced);
  const Tag = motionTags[as] as typeof motion.div;

  return (
    <Tag
      ref={ref}
      data-reveal
      className={className}
      variants={staggerParent}
      initial={reduced ? false : "hidden"}
      animate={revealed ? "show" : "hidden"}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
}) {
  const Tag = motionTags[as];
  return (
    <Tag data-reveal className={className} variants={staggerChild}>
      {children}
    </Tag>
  );
}
