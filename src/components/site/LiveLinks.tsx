import type { LiveLink } from "@/content/products";

const LABELS: Record<LiveLink["kind"], { top: string; label: string }> = {
  website: { top: "Visit the", label: "Website" },
  playstore: { top: "Get it on", label: "Google Play" },
  appstore: { top: "Download on the", label: "App Store" },
};

function Glyph({ kind }: { kind: LiveLink["kind"] }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", "aria-hidden": true } as const;
  if (kind === "website")
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18" />
      </svg>
    );
  if (kind === "playstore")
    return (
      <svg {...common} fill="currentColor">
        <path d="M4.2 2.6c-.2.2-.3.5-.3.9v17c0 .4.1.7.3.9l9.5-9.4L4.2 2.6Zm10.9 8.2 2.6-2.6L6 1.7l9.1 9.1Zm0 2.4L6 22.3l11.7-6.5-2.6-2.6Zm5-2.2-2.4-1.4-2.9 2.9 2.9 2.9 2.4-1.4c.7-.4.7-2.6 0-3Z" />
      </svg>
    );
  return (
    <svg {...common} fill="currentColor">
      <path d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9-.7 0-1.8-.8-3-.8-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.900 2.300 1.200 0 1.600-.7 3-.7s1.800.7 3 .7c1.300 0 2.100-1.100 2.800-2.300.9-1.300 1.300-2.500 1.300-2.600 0 0-2.500-1-2.500-3.800ZM14.100 5.800c.6-.8 1.100-1.900.9-3-.9 0-2.100.6-2.700 1.400-.6.700-1.100 1.800-1 2.900 1.100.1 2.200-.5 2.800-1.300Z" />
    </svg>
  );
}

const ICON_LABELS: Record<LiveLink["kind"], string> = {
  website: "Visit the website",
  playstore: "Get it on Google Play",
  appstore: "Download on the App Store",
};

/**
 * Links to the live product: its website and app stores. Opens in a new tab so
 * people can look at the real work without losing their place. `compact` is
 * icon-only, for tight spots like a card footer.
 */
export function LiveLinks({
  links,
  className = "",
  compact = false,
}: {
  links: LiveLink[];
  className?: string;
  compact?: boolean;
}) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {links.map((l) => {
        const t = LABELS[l.kind];
        return (
          <li key={l.kind}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={ICON_LABELS[l.kind]}
              title={ICON_LABELS[l.kind]}
              className={`relative z-10 inline-flex items-center border border-line bg-surface text-ink transition-colors duration-200 hover:border-brand-300 hover:text-brand-700 ${
                compact ? "size-10 justify-center rounded-full" : "min-h-11 gap-2.5 rounded-xl px-4 py-1.5"
              }`}
            >
              <Glyph kind={l.kind} />
              {!compact && (
                <span className="flex flex-col text-left leading-tight">
                  <span className="text-[0.625rem] font-medium uppercase tracking-wider text-ink-faint">{t.top}</span>
                  <span className="text-[0.9375rem] font-semibold">{t.label}</span>
                </span>
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
