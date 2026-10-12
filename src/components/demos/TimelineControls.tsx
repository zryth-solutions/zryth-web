"use client";

import type { Timeline } from "@/lib/demos/useTimeline";

const btn =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line bg-surface px-4 text-sm sm:min-h-10 font-medium text-ink transition-colors duration-200 hover:border-brand-300 hover:text-brand-700 disabled:cursor-not-allowed disabled:opacity-40";

/**
 * Play/Pause, Replay and step navigation for a timeline. Under reduced motion
 * nothing plays by itself: the steps are the interface.
 */
export function TimelineControls({ timeline, className = "" }: { timeline: Timeline; className?: string }) {
  const { cues, cueIndex, playing, reducedMotion, time, total } = timeline;
  const pct = total > 0 ? Math.min(100, (time / total) * 100) : 0;

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-2">
        {!reducedMotion && (
          <button type="button" className={btn} onClick={timeline.toggle}>
            {playing ? "Pause" : timeline.atEnd ? "Play again" : "Play"}
          </button>
        )}
        <button type="button" className={`${btn} max-sm:hidden`} onClick={timeline.prev} disabled={cueIndex === 0 && time < 1000 && !reducedMotion}>
          Back
        </button>
        <button type="button" className={btn} onClick={timeline.next} disabled={cueIndex >= cues.length - 1 && (reducedMotion || timeline.atEnd)}>
          Next step
        </button>
        <button type="button" className={btn} onClick={timeline.replay}>
          Replay
        </button>
        <p className="order-last w-full text-sm text-ink-muted sm:order-none sm:ml-auto sm:w-auto" aria-live="polite">
          Step {cueIndex + 1} of {cues.length}: <span className="font-medium text-ink">{cues[cueIndex].label}</span>
        </p>
      </div>

      {reducedMotion && (
        <p className="mt-2 text-sm text-ink-muted">Motion is reduced on your device, so each step is shown still. Use Next step to move through the story.</p>
      )}

      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-line-soft" aria-hidden="true">
        <div className="h-full rounded-full bg-brand-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
