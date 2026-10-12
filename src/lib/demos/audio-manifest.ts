export type AudioTurn = {
  index: number;
  speaker: "agent" | "customer";
  voice: string;
  text: string;
  start: number;
  end: number;
};

export type AudioManifest = {
  id: string;
  generatedBy: string;
  note: string;
  file: string;
  sampleRate: number;
  duration: number;
  peakStep: number;
  peaks: number[];
  turns: AudioTurn[];
};

/** Index of the turn being spoken at `t`; stays on the previous turn through short gaps. */
export function activeTurnAt(turns: AudioTurn[], t: number): number {
  let idx = -1;
  for (const turn of turns) {
    if (t >= turn.start) idx = turn.index;
  }
  return idx;
}

export function formatClock(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
