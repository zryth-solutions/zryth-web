"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { claimAudio, releaseAudio } from "@/lib/demos/audio-registry";

/**
 * Wraps one <audio> element. `time` mirrors audio.currentTime, the single
 * source of truth for transcripts and events, so seeking, replaying and
 * pausing all stay consistent. While playing it follows currentTime every
 * frame; `timeupdate`, `seeking` and `seeked` cover the paused cases.
 *
 * Sound starts only from play(), which callers wire to an explicit click.
 * On unmount the element is paused and releases the shared audio slot.
 */
export function useAudioClock(src: string) {
  const ref = useRef<HTMLAudioElement>(null);
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let last = -1;
    const sync = () => {
      if (Math.abs(el.currentTime - last) >= 0.03) {
        last = el.currentTime;
        setTime(el.currentTime);
      }
    };
    const loop = () => {
      sync();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => cancelAnimationFrame(raf);

    const onPlay = () => {
      claimAudio(el);
      setPlaying(true);
      setEnded(false);
      stop();
      raf = requestAnimationFrame(loop);
    };
    const onPause = () => {
      setPlaying(false);
      stop();
      last = -1;
      sync();
    };
    const onEnded = () => {
      setPlaying(false);
      setEnded(true);
      stop();
      last = -1;
      sync();
    };
    const onSeek = () => {
      last = -1;
      sync();
    };
    const onError = () => setUnavailable(true);

    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onEnded);
    el.addEventListener("timeupdate", sync);
    el.addEventListener("seeking", onSeek);
    el.addEventListener("seeked", onSeek);
    el.addEventListener("error", onError);
    return () => {
      stop();
      el.pause();
      releaseAudio(el);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("timeupdate", sync);
      el.removeEventListener("seeking", onSeek);
      el.removeEventListener("seeked", onSeek);
      el.removeEventListener("error", onError);
    };
  }, [src]);

  const play = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (el.ended) el.currentTime = 0;
    el.play().catch((err: unknown) => {
      // AbortError means a newer play/pause call superseded this one: harmless.
      if (err instanceof DOMException && err.name !== "AbortError") setUnavailable(true);
    });
  }, []);

  const pause = useCallback(() => ref.current?.pause(), []);
  const toggle = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) play();
    else el.pause();
  }, [play]);

  const seek = useCallback((seconds: number) => {
    const el = ref.current;
    if (!el) return;
    el.currentTime = Math.max(0, seconds);
    setTime(el.currentTime);
  }, []);

  const replay = useCallback(() => {
    seek(0);
    play();
  }, [play, seek]);

  return { ref, time, playing, ended, unavailable, play, pause, toggle, seek, replay };
}

export type AudioClock = ReturnType<typeof useAudioClock>;
