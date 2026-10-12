"use client";

import { useMemo, type ReactNode } from "react";
import { formatClock, type AudioManifest } from "@/lib/demos/audio-manifest";
import type { AudioClock } from "@/lib/demos/useAudioClock";

const BARS = 88;

/**
 * Waveform drawn from the real amplitude envelope measured when the audio was
 * generated. Clicking it seeks; the range input below is the accessible control.
 */
export function Waveform({ manifest, clock }: { manifest: AudioManifest; clock: AudioClock }) {
  const bars = useMemo(() => {
    const n = manifest.peaks.length;
    return Array.from({ length: BARS }, (_, i) => {
      const a = Math.floor((i * n) / BARS);
      const b = Math.max(a + 1, Math.floor(((i + 1) * n) / BARS));
      return Math.max(...manifest.peaks.slice(a, b));
    });
  }, [manifest.peaks]);

  const progress = manifest.duration > 0 ? clock.time / manifest.duration : 0;

  return (
    <div
      aria-hidden="true"
      className="flex h-16 cursor-pointer items-center gap-[2px]"
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        clock.seek(((e.clientX - rect.left) / rect.width) * manifest.duration);
      }}
    >
      {bars.map((h, i) => (
        <span
          key={i}
          className={`flex-1 rounded-full ${(i + 0.5) / BARS <= progress ? "bg-brand-500" : "bg-brand-200"}`}
          style={{ height: `${Math.max(8, h * 100)}%` }}
        />
      ))}
    </div>
  );
}

export function AudioControls({ manifest, clock, children }: { manifest: AudioManifest; clock: AudioClock; children?: ReactNode }) {
  const btn =
    "inline-flex min-h-10 items-center justify-center rounded-full border border-line bg-surface px-4 text-sm font-medium text-ink transition-colors duration-200 hover:border-brand-300 hover:text-brand-700 disabled:cursor-not-allowed disabled:opacity-40";
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={clock.toggle}
          disabled={clock.unavailable}
          className="inline-flex min-h-10 min-w-24 items-center justify-center rounded-full bg-brand-600 px-5 text-sm font-medium text-white transition-colors duration-200 hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {clock.playing ? "Pause" : clock.ended ? "Play again" : "Play"}
        </button>
        <button type="button" className={btn} onClick={clock.replay} disabled={clock.unavailable}>
          Replay
        </button>
        <p className="ml-auto text-sm tabular-nums text-ink-muted" aria-live="off">
          {formatClock(clock.time)} / {formatClock(manifest.duration)}
        </p>
      </div>
      <label className="mt-3 block">
        <span className="sr-only">Seek through the audio</span>
        <input
          type="range"
          min={0}
          max={manifest.duration}
          step={0.1}
          value={Math.min(clock.time, manifest.duration)}
          disabled={clock.unavailable}
          onChange={(e) => clock.seek(Number(e.target.value))}
          aria-valuetext={`${formatClock(clock.time)} of ${formatClock(manifest.duration)}`}
          className="h-8 w-full cursor-pointer accent-brand-600"
        />
      </label>
      {children}
    </div>
  );
}

/** Transcript that follows currentTime. Clicking a line seeks without starting playback. */
export function Transcript({
  manifest,
  active,
  onSeek,
  speakerLabel,
}: {
  manifest: AudioManifest;
  active: number;
  onSeek: (seconds: number) => void;
  speakerLabel: (speaker: string) => string;
}) {
  return (
    <ol className="space-y-2" aria-label="Transcript">
      {manifest.turns.map((turn) => {
        const isActive = turn.index === active;
        const agent = turn.speaker !== "customer";
        return (
          <li key={turn.index}>
            <button
              type="button"
              onClick={() => onSeek(turn.start)}
              aria-current={isActive ? "true" : undefined}
              className={`flex w-full flex-wrap items-baseline gap-x-3 gap-y-1 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors duration-200 sm:flex-nowrap ${
                isActive ? "border-brand-300 bg-brand-50" : "border-transparent hover:bg-surface-alt"
              }`}
            >
              <span className={`w-14 shrink-0 text-xs font-semibold sm:mt-0.5 sm:w-16 ${agent ? "text-brand-700" : "text-ink-muted"}`}>
                {speakerLabel(turn.speaker)}
              </span>
              <span className="order-2 ml-auto shrink-0 text-xs tabular-nums text-ink-faint sm:order-3 sm:pl-2">{formatClock(turn.start)}</span>
              <span className={`order-3 basis-full sm:order-2 sm:flex-1 sm:basis-0 ${isActive ? "font-medium text-ink" : "text-ink-soft"}`}>{turn.text}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
