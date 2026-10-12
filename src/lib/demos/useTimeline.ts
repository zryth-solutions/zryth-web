"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type CueDef = { id: string; label: string; duration: number };
export type Cue = { id: string; label: string; at: number; end: number };

/** Lays cue durations (ms) end to end. */
export function layoutCues(defs: CueDef[]): { cues: Cue[]; total: number } {
  let at = 0;
  const cues = defs.map((d) => {
    const cue = { id: d.id, label: d.label, at, end: at + d.duration };
    at += d.duration;
    return cue;
  });
  return { cues, total: at };
}

/** Index of the cue containing `time`; the last cue once finished. */
export function cueIndexAt(cues: Cue[], time: number) {
  for (let i = 0; i < cues.length; i++) {
    if (time < cues[i].end) return i;
  }
  return cues.length - 1;
}

/** 0..1 progress of `time` through [from, to], clamped. */
export function span(time: number, from: number, to: number) {
  if (to <= from) return time >= to ? 1 : 0;
  return Math.min(1, Math.max(0, (time - from) / (to - from)));
}

type Options = {
  cues: Cue[];
  total: number;
  /** Start playing immediately. Ignored under reduced motion. */
  autoplay?: boolean;
  reducedMotion?: boolean;
};

/**
 * One controller for every demo: Play/Pause, Replay, step navigation, seek.
 * Scenes are pure functions of `time`, so seeking, replaying and the
 * reduced-motion static steps all share one code path.
 *
 * Cleanup guarantees: the frame loop is cancelled on pause, on unmount and
 * while the tab is hidden, so nothing keeps running after a dialog closes.
 */
export function useTimeline({ cues, total, autoplay = true, reducedMotion = false }: Options) {
  const settle = useCallback(
    (i: number) => cues[Math.min(Math.max(i, 0), cues.length - 1)].end - 1,
    [cues],
  );

  const [time, setTime] = useState(() => (reducedMotion ? settle(0) : 0));
  const [playing, setPlaying] = useState(autoplay && !reducedMotion);
  const [visible, setVisible] = useState(true);
  const timeRef = useRef(time);

  useEffect(() => {
    const onVisibility = () => setVisible(!document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (!playing || !visible) return;
    let raf = 0;
    let last = performance.now();
    let lastCommit = 0;
    const tick = (now: number) => {
      const next = Math.min(total, timeRef.current + (now - last));
      last = now;
      timeRef.current = next;
      if (now - lastCommit >= 33 || next >= total) {
        lastCommit = now;
        setTime(next);
      }
      if (next >= total) {
        setPlaying(false);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, visible, total]);

  const seek = useCallback(
    (ms: number) => {
      const clamped = Math.min(total, Math.max(0, ms));
      timeRef.current = clamped;
      setTime(clamped);
    },
    [total],
  );

  const play = useCallback(() => {
    if (reducedMotion) return;
    if (timeRef.current >= total) seek(0);
    setPlaying(true);
  }, [reducedMotion, seek, total]);

  const pause = useCallback(() => setPlaying(false), []);
  const toggle = useCallback(() => (playing ? pause() : play()), [playing, pause, play]);

  const replay = useCallback(() => {
    if (reducedMotion) {
      seek(settle(0));
      return;
    }
    seek(0);
    setPlaying(true);
  }, [reducedMotion, seek, settle]);

  const goToCue = useCallback(
    (i: number) => {
      const index = Math.min(Math.max(i, 0), cues.length - 1);
      if (reducedMotion) {
        seek(settle(index));
        setPlaying(false);
      } else {
        seek(cues[index].at);
        setPlaying(true);
      }
    },
    [cues, reducedMotion, seek, settle],
  );

  const cueIndex = cueIndexAt(cues, time);

  const next = useCallback(() => goToCue(cueIndexAt(cues, timeRef.current) + 1), [cues, goToCue]);
  const prev = useCallback(() => {
    const i = cueIndexAt(cues, timeRef.current);
    // Within the first second of a cue, "previous" means the cue before it.
    goToCue(timeRef.current - cues[i].at > 1000 ? i : i - 1);
  }, [cues, goToCue]);

  return {
    time,
    playing,
    cueIndex,
    atEnd: time >= total,
    total,
    cues,
    play,
    pause,
    toggle,
    replay,
    seek,
    goToCue,
    next,
    prev,
    reducedMotion,
  };
}

export type Timeline = ReturnType<typeof useTimeline>;
