/**
 * The booking call as a pure function of audio time. Each system step is
 * anchored to the turn in which it would happen, so seeking anywhere in the
 * recording produces the matching state. Fixture playback: it shows how the
 * call connects to booking steps, not live agent behaviour.
 */
import type { AudioTurn } from "@/lib/demos/audio-manifest";

export type VStatus = "idle" | "running" | "done";

export type VoiceState = {
  steps: { id: string; label: string; status: VStatus; detail: string }[];
  slotsVisible: boolean;
  selectedSlot: string | null;
  booking: { loaded: boolean; when: string; status: string };
  notification: string | null;
  doneCount: number;
  complete: boolean;
};

type Fixtures = {
  ref: string;
  before: string;
  after: string;
  slot: string;
  labels: string[];
};

export function voiceStateAt(t: number, turns: AudioTurn[], fx: Fixtures): VoiceState {
  const T = (i: number) => turns[i];
  const status = (from: number, to: number): VStatus => (t >= to ? "done" : t >= from ? "running" : "idle");

  // Anchors (seconds).
  const lookupFrom = T(3).start + 0.8;
  const lookupTo = T(3).end + 0.1;
  const availFrom = lookupTo;
  const availTo = T(4).start;
  const slotAt = T(5).start + 0.8;
  const confirmFrom = T(6).start;
  const confirmTo = T(7).start + 0.9;
  const updateFrom = confirmTo;
  const updateTo = T(8).start;
  const notifyFrom = T(8).start;
  const notifyTo = T(8).start + 2.0;

  const lookup = status(lookupFrom, lookupTo);
  const avail = status(availFrom, availTo);
  const confirm = status(confirmFrom, confirmTo);
  const update = status(updateFrom, updateTo);
  const notify = status(notifyFrom, notifyTo);
  const slot = t >= slotAt ? fx.slot : null;

  const steps: VoiceState["steps"] = [
    {
      id: "lookup",
      label: fx.labels[0],
      status: lookup,
      detail: lookup === "done" ? `${fx.ref} found: currently ${fx.before}` : lookup === "running" ? `Looking up the reference the caller gave…` : "Starts when the caller gives a reference.",
    },
    {
      id: "availability",
      label: fx.labels[1],
      status: avail,
      detail: avail === "done" ? "Friday: 2:00 p.m. and 4:00 p.m. are open." : avail === "running" ? "Checking Friday afternoon…" : "Checked once the booking is found.",
    },
    {
      id: "confirm",
      label: fx.labels[2],
      status: confirm,
      detail:
        confirm === "done"
          ? `Caller confirmed moving ${fx.ref} to Friday at ${fx.slot}`
          : confirm === "running"
            ? "Reading the change back to the caller…"
            : slot
              ? `Caller chose ${slot}`
              : "Asked before anything changes.",
    },
    {
      id: "update",
      label: fx.labels[3],
      status: update,
      detail: update === "done" ? `${fx.ref} rescheduled to ${fx.after}` : update === "running" ? "Updating the booking…" : "Runs only after the caller confirms.",
    },
    {
      id: "notify",
      label: fx.labels[4],
      status: notify,
      detail: notify === "done" ? "Confirmation sent (sample message)." : notify === "running" ? "Sending the confirmation…" : "Sent after the update.",
    },
  ];

  const loaded = lookup === "done";
  return {
    steps,
    slotsVisible: avail === "done",
    selectedSlot: slot,
    booking: {
      loaded,
      when: update === "done" ? fx.after : fx.before,
      status: update === "done" ? "Rescheduled" : "Confirmed",
    },
    notification: notify === "done" ? "Confirmation sent to the customer (sample message)" : null,
    doneCount: steps.filter((s) => s.status === "done").length,
    complete: notify === "done",
  };
}
