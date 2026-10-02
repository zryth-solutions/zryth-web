"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** One agent working a real exception, end to end. */
const STEPS = [
  "Reads the supplier invoice",
  "Matches it to the purchase order",
  "Flags the quantity mismatch",
  "Updates the ERP record",
  "Notifies the ops owner",
];

const STEP_MS = 1400;
/** Extra ticks after the last step so the finished run holds before repeating. */
const HOLD_TICKS = 2;

/**
 * Looping illustration of an agent executing a task without supervision:
 * each step moves pending → running → done, then the run restarts.
 *
 * Decorative, so it's hidden from assistive tech — the adjacent copy carries
 * the meaning. The timer only runs while the card is on screen, and reduced
 * motion renders the completed run instead of cycling.
 */
export function AgentRun() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  // Defaults to running: if the observer never reports (or isn't supported),
  // the run should still play rather than sit frozen on step one.
  const [onScreen, setOnScreen] = useState(true);
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!onScreen || reduced) return;
    const id = setInterval(
      () => setCursor((c) => (c + 1) % (STEPS.length + HOLD_TICKS)),
      STEP_MS,
    );
    return () => clearInterval(id);
  }, [onScreen, reduced]);

  // Reduced motion shows the finished run rather than an empty one.
  const active = reduced ? STEPS.length : cursor;
  const complete = active >= STEPS.length;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="rounded-2xl border border-line bg-surface p-6 shadow-[0_20px_50px_-32px_rgba(11,16,32,0.4)] sm:p-8"
    >
      <div className="flex items-center justify-between gap-4 border-b border-line-soft pb-5">
        <div>
          <p className="label text-brand-600">Agent run</p>
          <p className="mt-2 text-sm font-medium text-ink">Invoice exception</p>
        </div>

        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-500 ${
            complete
              ? "bg-brand-500 text-white"
              : "bg-brand-50 text-brand-700"
          }`}
        >
          {complete ? (
            <Check className="text-white" />
          ) : (
            <span className="relative flex h-1.5 w-1.5">
              <span className="agent-ring absolute inline-flex h-full w-full rounded-full bg-brand-500" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-500" />
            </span>
          )}
          {complete ? "Done" : "Running"}
        </span>
      </div>

      <ol className="mt-2">
        {STEPS.map((step, i) => {
          const done = i < active;
          const running = i === active;

          return (
            <li key={step} className="relative flex gap-4 py-3.5">
              {i < STEPS.length - 1 && (
                <>
                  <span className="absolute left-[11px] top-9 h-full w-px bg-line-soft" />
                  <span
                    className="absolute left-[11px] top-9 h-full w-px origin-top bg-brand-300 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ transform: `scaleY(${done ? 1 : 0})` }}
                  />
                </>
              )}

              <span className="relative mt-0.5 h-[22px] w-[22px] shrink-0">
                {/* Pending */}
                <span
                  className={`absolute inset-0 rounded-full border border-line bg-surface-alt transition-opacity duration-300 ${
                    done || running ? "opacity-0" : "opacity-100"
                  }`}
                />

                {/* Running */}
                <span
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    running ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <span className="absolute inset-0 rounded-full border-2 border-brand-200" />
                  <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-brand-500" />
                </span>

                {/* Done */}
                <span
                  className={`absolute inset-0 flex items-center justify-center rounded-full bg-brand-500 transition-all duration-300 ${
                    done ? "scale-100 opacity-100" : "scale-75 opacity-0"
                  }`}
                >
                  <Check className="text-white" />
                </span>
              </span>

              <span
                className={`text-[0.9375rem] font-medium transition-colors duration-300 ${
                  done || running ? "text-ink" : "text-ink-faint"
                }`}
              >
                {step}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="mt-3 flex items-center justify-between border-t border-line-soft pt-5">
        <p className="text-sm text-ink-muted">Handoffs required</p>
        <p className="text-sm font-semibold text-brand-700">None</p>
      </div>
    </div>
  );
}

function Check({ className = "" }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path
        d="M3.6 8.4l3 3 5.8-6.4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
