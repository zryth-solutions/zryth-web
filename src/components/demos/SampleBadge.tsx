import { AUDIO_LABEL, SAMPLE_LABEL } from "@/content/demos";

/** The discreet, readable "this is a fixture" label every demo carries. */
export function SampleBadge({
  scriptedAudio = false,
  label,
  className = "",
}: {
  scriptedAudio?: boolean;
  /** Overrides the default "Interactive demo · sample data" text. */
  label?: string;
  className?: string;
}) {
  return (
    <p
      className={`inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg border border-line bg-surface-alt px-2.5 py-1 text-[0.6875rem] font-medium text-ink-muted sm:px-3 sm:text-xs ${className}`}
    >
      <span>{label ?? SAMPLE_LABEL}</span>
      {scriptedAudio && (
        <>
          <span aria-hidden="true" className="text-ink-faint">
            ·
          </span>
          <span>{AUDIO_LABEL}</span>
        </>
      )}
    </p>
  );
}
