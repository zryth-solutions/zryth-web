"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SampleBadge } from "@/components/demos/SampleBadge";
import type { DemoMeta } from "@/content/demos";
import { useActive } from "@/lib/demos/useActivity";

/**
 * Frame for an interactive figure inside an article. `onVisible` fires once,
 * the first time the figure is meaningfully on screen: figures start playing
 * where the reader is, not while they are still scrolled past.
 */
export function Figure({
  index,
  title,
  caption,
  scriptedAudio = false,
  onVisible,
  children,
}: {
  index: number;
  title: string;
  caption?: ReactNode;
  scriptedAudio?: boolean;
  onVisible?: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const latest = useRef(onVisible);
  latest.current = onVisible;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let fired = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired) {
          fired = true;
          latest.current?.();
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure ref={ref} className="-mx-6 border-y border-line bg-surface sm:mx-0 sm:rounded-2xl sm:border sm:shadow-sm">
      <figcaption className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-line-soft bg-surface-alt px-4 py-3 sm:rounded-t-2xl sm:px-6">
        <span>
          <span className="label block text-brand-600">Figure {index}</span>
          <span className="mt-1 block text-base font-semibold text-ink">{title}</span>
        </span>
        <SampleBadge scriptedAudio={scriptedAudio} />
      </figcaption>
      <div className="px-4 py-5 sm:p-6">{children}</div>
      {caption && <p className="border-t border-line-soft px-4 py-3 text-sm text-ink-muted sm:px-6">{caption}</p>}
    </figure>
  );
}

/** The workflow, animated: each step lights up in turn while the strip is on screen. */
export function WorkflowStrip({ steps }: { steps: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useActive(ref);
  const reduced = useReducedMotion() ?? false;
  const [done, setDone] = useState(0);

  useEffect(() => {
    if (!active || reduced) return;
    const id = setInterval(() => setDone((d) => (d >= steps.length + 1 ? 0 : d + 1)), 900);
    return () => clearInterval(id);
  }, [active, reduced, steps.length]);

  const shown = reduced ? steps.length : done;

  return (
    <div ref={ref} className="rounded-2xl border border-line bg-surface-alt p-4 sm:p-6">
      <p className="label text-ink-muted">The workflow</p>
      <ol className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-3">
        {steps.map((step, i) => {
          const isDone = i < shown;
          const current = i === shown && !reduced;
          return (
            <li key={step} className="flex items-center gap-2">
              <span
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors duration-500 ${
                  isDone
                    ? "border-brand-500 bg-brand-500 text-white"
                    : current
                      ? "border-brand-500 bg-surface text-brand-700"
                      : "border-line bg-surface text-ink-muted"
                }`}
              >
                <span aria-hidden="true" className="text-xs">
                  {isDone ? "✓" : i + 1}
                </span>
                {step}
              </span>
              {i < steps.length - 1 && <span aria-hidden="true" className="hidden h-px w-4 bg-line sm:block" />}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function OutcomeCallout({ outcome }: { outcome: ReactNode | null }) {
  return (
    <div className="rounded-2xl border border-brand-200 bg-brand-50/60 p-5 sm:p-6" role="status" aria-live="polite">
      <p className="label text-brand-700">The completed outcome</p>
      <div className="mt-3 text-[1.0625rem] leading-relaxed text-ink">
        {outcome ?? <p className="text-ink-muted">Appears once the workflow above has played through. Use the controls to jump ahead.</p>}
      </div>
    </div>
  );
}

/** How Zryth can tailor the demonstrated design, with the CTA into the contact flow. */
export function TailorBlock({ meta }: { meta: DemoMeta }) {
  return (
    <div className="rounded-2xl border border-line bg-surface-alt p-5 sm:p-8">
      <p className="label text-ink-muted">How Zryth can tailor it</p>
      <p className="mt-3 text-[1.125rem] leading-relaxed text-ink">{meta.tailorLead}</p>
      <ul className="mt-4 space-y-2 text-[1.0625rem] text-ink-soft">
        {meta.tailorPoints.map((p) => (
          <li key={p} className="flex gap-3">
            <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand-400" />
            {p}
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Button href={`/get-started?type=ai-automation&useCase=${meta.id}`}>Build this for my team</Button>
      </div>
    </div>
  );
}

export const smallButton =
  "inline-flex min-h-10 items-center justify-center rounded-full border border-line bg-surface px-4 text-sm font-medium text-ink transition-colors duration-200 hover:border-brand-300 hover:text-brand-700 disabled:cursor-not-allowed disabled:opacity-40";
