"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import type { FlowStage, RoiItem } from "@/content/demos/document-ai-stories";
import { useActive } from "@/lib/demos/useActivity";

function Frame({ caption, children }: { caption?: string; children: ReactNode }) {
  return (
    <figure className="rounded-2xl border border-line bg-surface-alt p-5 sm:p-8">
      {children}
      {caption && <figcaption className="mt-5 text-sm text-ink-muted">{caption}</figcaption>}
    </figure>
  );
}

/* ------------------------------------------------------------------ flow */

function Glyph({ kind, lit }: { kind: 0 | 1 | 2; lit: boolean }) {
  const stroke = lit ? "#215ac8" : "#b8bfce";
  const fill = lit ? "#eef3fc" : "#ffffff";
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true" className="transition-all duration-500">
      <rect x="1" y="1" width="62" height="62" rx="16" fill={fill} stroke={stroke} strokeWidth="1.5" />
      {kind === 0 && (
        <>
          <path d="M22 16h14l8 8v24a2 2 0 0 1-2 2H22a2 2 0 0 1-2-2V18a2 2 0 0 1 2-2Z" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
          <path d="M26 31h12M26 37h12M26 43h8" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
        </>
      )}
      {kind === 1 && (
        <>
          <path d="M22 16h20a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H22a2 2 0 0 1-2-2V18a2 2 0 0 1 2-2Z" stroke={stroke} strokeWidth="2" />
          <rect x="25" y="23" width="14" height="4" rx="2" fill={stroke} opacity={lit ? 1 : 0.4} />
          <rect x="25" y="31" width="14" height="4" rx="2" fill={stroke} opacity={lit ? 1 : 0.4} />
          <rect x="25" y="39" width="9" height="4" rx="2" fill={stroke} opacity={lit ? 1 : 0.4} />
        </>
      )}
      {kind === 2 && (
        <>
          <circle cx="32" cy="32" r="15" stroke={stroke} strokeWidth="2" />
          <path d="m25 32.5 5 5 9-10" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
    </svg>
  );
}

/** Three calm steps that light up in turn while on screen. Static (all lit) under reduced motion. */
export function FlowFigure({ stages, caption }: { stages: FlowStage[]; caption?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useActive(ref);
  const reduced = useReducedMotion() ?? false;
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!active || reduced) return;
    const id = setInterval(() => setStep((s) => (s >= 4 ? 0 : s + 1)), 1400);
    return () => clearInterval(id);
  }, [active, reduced]);

  const lit = reduced ? 3 : Math.min(step, 3);

  return (
    <Frame caption={caption}>
      <div ref={ref}>
        <ol className="grid gap-6 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-start sm:gap-4">
          {stages.flatMap((stage, i) => {
            const on = i < lit;
            const item = (
              <li key={stage.title} className="flex items-center gap-4 sm:flex-col sm:gap-3 sm:text-center">
                <Glyph kind={i as 0 | 1 | 2} lit={on} />
                <div>
                  <p className={`text-base font-semibold transition-colors duration-500 ${on ? "text-ink" : "text-ink-faint"}`}>{stage.title}</p>
                  <p className="mt-0.5 text-sm text-ink-muted">{stage.line}</p>
                </div>
              </li>
            );
            if (i === stages.length - 1) return [item];
            return [
              item,
              <li key={`line-${i}`} aria-hidden="true" className="hidden h-px w-12 self-start overflow-hidden bg-line sm:mt-8 sm:block lg:w-20">
                <span className="block h-full bg-brand-500 transition-all duration-700" style={{ width: lit >= i + 1 ? "100%" : "0%" }} />
              </li>,
            ];
          })}
        </ol>
      </div>
    </Frame>
  );
}

/* ------------------------------------------------------------------- ROI */

function useCountUp(target: number, run: boolean, reduced: boolean) {
  const [value, setValue] = useState(reduced ? target : 0);
  useEffect(() => {
    if (reduced) {
      setValue(target);
      return;
    }
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1100);
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, reduced]);
  return value;
}

function Stat({ value, suffix, label, run, reduced }: { value: number; suffix: string; label: string; run: boolean; reduced: boolean }) {
  const n = useCountUp(value, run, reduced);
  return (
    <div>
      <p className="text-5xl font-semibold tracking-tight text-brand-600 tabular-nums">
        {n}
        {suffix}
      </p>
      <p className="mt-2 text-base text-ink-soft">{label}</p>
    </div>
  );
}

/** Real, published results shown with as little as possible: a bar pair or a big number. */
export function RoiFigure({ items, caption }: { items: RoiItem[]; caption?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion() ?? false;
  const run = inView || reduced;
  const stats = items.length > 1 && items.every((i) => i.kind !== "bars");

  return (
    <Frame caption={caption}>
      <div ref={ref} className={stats ? "grid gap-8 sm:grid-cols-2" : "space-y-8"}>
        {items.map((item, idx) => {
          if (item.kind === "stat") return <Stat key={idx} value={item.value} suffix={item.suffix} label={item.label} run={run} reduced={reduced} />;
          if (item.kind === "text")
            return (
              <div key={idx}>
                <p className="text-5xl font-semibold tracking-tight text-brand-600">{item.display}</p>
                <p className="mt-2 text-base text-ink-soft">{item.label}</p>
              </div>
            );
          const max = Math.max(item.before.value, item.after.value);
          return (
            <div key={idx}>
              <p className="label text-ink-muted">{item.label}</p>
              <div className="mt-4 space-y-3">
                {[item.before, item.after].map((bar, i) => (
                  <div key={bar.name} className="grid grid-cols-[6.5rem_1fr] items-center gap-3 sm:grid-cols-[9rem_1fr]">
                    <span className="text-sm text-ink-muted">{bar.name}</span>
                    <div className="flex items-center gap-3">
                      <span
                        className={`block h-7 rounded-md ${i === 0 ? "bg-line" : "bg-brand-500"}`}
                        style={{
                          width: run ? `${(bar.value / max) * 78}%` : "0%",
                          transition: `width 1s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.25}s`,
                        }}
                      />
                      <span className={`whitespace-nowrap text-base font-semibold ${i === 0 ? "text-ink-soft" : "text-ink"}`}>{bar.display}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Frame>
  );
}
