/**
 * Only one audio track plays at a time. Every demo player claims the slot on
 * `play`, which pauses whatever held it before.
 */
let active: HTMLAudioElement | null = null;

export function claimAudio(el: HTMLAudioElement) {
  if (active && active !== el) active.pause();
  active = el;
}

export function releaseAudio(el: HTMLAudioElement) {
  if (active === el) active = null;
}
