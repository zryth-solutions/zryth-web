"use client";

import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import { AudioControls, Transcript, Waveform } from "@/components/demos/AudioParts";
import { Figure, OutcomeCallout } from "@/components/demos/story/shared";
import manifestJson from "@/content/demos/booking-call.manifest.json";
import { BOOKING, CONNECTORS, FRIDAY_SLOTS, SELECTED_SLOT, UNAVAILABLE_NOTE, } from "@/content/demos/voice-ai";
import { getDemo } from "@/content/demos";
import { activeTurnAt, formatClock, type AudioManifest } from "@/lib/demos/audio-manifest";
import { useAudioClock, type AudioClock } from "@/lib/demos/useAudioClock";
import { voiceStateAt, type VStatus, type VoiceState } from "@/lib/demos/voice-state";

const manifest = manifestJson as AudioManifest;
const meta = getDemo("voice-ai");

const FIXTURES = {
  ref: BOOKING.ref,
  before: BOOKING.before,
  after: BOOKING.after,
  slot: SELECTED_SLOT,
  labels: meta.workflow,
};

type Ctx = { clock: AudioClock; state: VoiceState; active: number; speaking: string | null };
const VoiceContext = createContext<Ctx | null>(null);
const useVoice = () => {
  const c = useContext(VoiceContext);
  if (!c) throw new Error("Voice figures must sit inside <VoiceStory>");
  return c;
};

/** Owns the single <audio> element. Both figures read its currentTime. */
export function VoiceStory({ children }: { children: ReactNode }) {
  const clock = useAudioClock(manifest.file);
  const t = clock.time;
  const state = voiceStateAt(t, manifest.turns, FIXTURES);
  const active = activeTurnAt(manifest.turns, t);
  const speaking = clock.playing && active >= 0 && t <= manifest.turns[active].end ? manifest.turns[active].speaker : null;
  return (
    <VoiceContext.Provider value={{ clock, state, active, speaking }}>
      <audio ref={clock.ref} src={manifest.file} preload="metadata" />
      {children}
    </VoiceContext.Provider>
  );
}

function Speaker({ label, active }: { label: string; active: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium transition-colors duration-200 ${
        active ? "border-brand-300 bg-brand-50 text-brand-800" : "border-line text-ink-muted"
      }`}
    >
      <span aria-hidden="true" className={`size-2 rounded-full ${active ? "bg-brand-500" : "bg-line"}`} />
      {label}
      {active && <span className="sr-only"> is speaking</span>}
    </span>
  );
}

function Dot({ status }: { status: VStatus }) {
  const base = "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-[0.6875rem] font-bold";
  if (status === "done")
    return (
      <span role="img" aria-label="Done" className={`${base} bg-emerald-100 text-emerald-800`}>
        ✓
      </span>
    );
  if (status === "running") return <span role="img" aria-label="Running" className={`${base} border-2 border-brand-200 border-t-brand-600 motion-safe:animate-spin`} />;
  return <span role="img" aria-label="Waiting" className={`${base} border border-line`} />;
}

/** Figure 1: listen to the scripted call, read along, seek anywhere. */
export function VoiceListenFigure() {
  const { clock, active, speaking } = useVoice();
  const listRef = useRef<HTMLDivElement>(null);

  // Keep the spoken line in view inside the transcript box without moving the page.
  useEffect(() => {
    const list = listRef.current;
    const line = list?.querySelector<HTMLElement>('[aria-current="true"]');
    if (list && line && clock.playing) list.scrollTo({ top: line.offsetTop - list.clientHeight / 2 + line.clientHeight / 2, behavior: "smooth" });
  }, [active, clock.playing]);

  return (
    <Figure
      index={1}
      title="Listen to the call"
      scriptedAudio
      caption="Synthesised voices reading a written script, generated in advance. This is not a recording of a live agent. Nothing plays until you press Play."
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Speaker label="Agent" active={speaking === "agent"} />
          <Speaker label="Caller" active={speaking === "customer"} />
        </div>
      </div>
      <div className="mt-4">
        <Waveform manifest={manifest} clock={clock} />
      </div>
      <div className="mt-4">
        <AudioControls manifest={manifest} clock={clock} />
      </div>
      {clock.unavailable && (
        <p role="alert" className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          Audio unavailable. {UNAVAILABLE_NOTE}
        </p>
      )}
      <div ref={listRef} className="mt-5 max-h-[22rem] overflow-y-auto rounded-lg border border-line-soft bg-surface-alt p-2">
        <Transcript manifest={manifest} active={active} onSeek={clock.seek} speakerLabel={(s) => (s === "customer" ? "Caller" : "Agent")} />
      </div>
    </Figure>
  );
}

/** Figure 2: the work happening behind the call, driven by the audio position. */
export function VoiceActionsFigure() {
  const { clock, state } = useVoice();
  const btn =
    "inline-flex min-h-10 min-w-24 items-center justify-center rounded-full bg-brand-600 px-5 text-sm font-medium text-white transition-colors duration-200 hover:bg-brand-700 disabled:opacity-40";

  return (
    <Figure
      index={2}
      title="What happens behind the call"
      scriptedAudio
      caption="Each step is tied to the moment in the script where it would happen, so you can scrub the recording and watch the booking change."
    >
      <div className="flex flex-wrap items-center gap-3 rounded-lg border border-line-soft bg-surface-alt p-3">
        <button type="button" onClick={clock.toggle} disabled={clock.unavailable} className={btn}>
          {clock.playing ? "Pause" : clock.ended ? "Play again" : "Play"}
        </button>
        <label className="min-w-0 flex-1">
          <span className="sr-only">Seek through the call</span>
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
        <span className="text-sm tabular-nums text-ink-muted">
          {formatClock(clock.time)} / {formatClock(manifest.duration)}
        </span>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div>
          <ul className="mb-3 flex flex-wrap gap-1.5" aria-label="Generic connectors used">
            {CONNECTORS.map((c) => (
              <li key={c} className="rounded-full border border-line bg-surface-alt px-2.5 py-0.5 text-[0.6875rem] font-medium text-ink-muted">
                {c}
              </li>
            ))}
          </ul>
          <ol className="space-y-3 rounded-xl border border-line bg-surface p-4">
            {state.steps.map((s) => (
              <li key={s.id} className="flex gap-3">
                <Dot status={s.status} />
                <div className="min-w-0">
                  <p className={`text-sm ${s.status === "idle" ? "text-ink-faint" : "font-semibold text-ink"}`}>{s.label}</p>
                  <p className="text-xs text-ink-muted">{s.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-line bg-surface p-4">
            <p className="label text-ink-faint">Friday afternoon</p>
            {state.slotsVisible ? (
              <ul className="mt-2 grid grid-cols-2 gap-2">
                {FRIDAY_SLOTS.map((slot) => {
                  const chosen = state.selectedSlot === slot.time;
                  return (
                    <li
                      key={slot.time}
                      className={`rounded-lg border px-3 py-2 text-center text-sm ${
                        chosen
                          ? "border-brand-500 bg-brand-50 font-semibold text-brand-800"
                          : slot.available
                            ? "border-line text-ink"
                            : "border-line-soft bg-surface-alt text-ink-faint line-through"
                      }`}
                    >
                      {slot.time}
                      <span className="sr-only">{chosen ? " (chosen)" : slot.available ? " (available)" : " (booked)"}</span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-ink-muted">Slots appear when the agent checks availability.</p>
            )}
          </div>

          <dl className="divide-y divide-line-soft rounded-xl border border-line bg-surface text-sm">
            <div className="px-4 py-3">
              <dt className="label text-ink-faint">Booking {BOOKING.ref}</dt>
              <dd className="mt-1">
                {state.booking.loaded ? (
                  <>
                    <p className="font-semibold text-ink">
                      {state.booking.when} · {state.booking.status}
                    </p>
                    <p className="text-xs text-ink-muted">
                      {BOOKING.service} · {BOOKING.customer}
                    </p>
                  </>
                ) : (
                  <p className="text-ink-faint">Not looked up yet</p>
                )}
              </dd>
            </div>
            <div className="px-4 py-3">
              <dt className="label text-ink-faint">Notification</dt>
              <dd className="mt-1">{state.notification ?? <span className="text-ink-faint">None sent yet</span>}</dd>
            </div>
          </dl>
        </div>
      </div>
    </Figure>
  );
}

export function VoiceOutcome() {
  const { state } = useVoice();
  return (
    <OutcomeCallout
      outcome={
        state.complete ? (
          <p>
            Booking {BOOKING.ref} moved to {BOOKING.after}, and the confirmation was sent, before the call ended.
          </p>
        ) : null
      }
    />
  );
}
