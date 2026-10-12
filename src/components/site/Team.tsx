import Image from "next/image";
import Link from "next/link";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { TEAM } from "@/content/team";

/**
 * Founder cards: compact portraits in a four-column grid, so two founders sit
 * at a modest size at the left rather than stretching across the page.
 */
export function Team() {
  return (
    <RevealGroup as="ul" className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
      {TEAM.map((member, i) => (
        <RevealItem as="li" key={`${member.name}-${i}`}>
          <div className="group overflow-hidden rounded-xl border border-line bg-surface transition-colors duration-200 hover:border-brand-300">
            {member.image ? (
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-alt">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 260px"
                />
              </div>
            ) : (
              <div className="flex aspect-[4/5] w-full items-center justify-center border-b border-dashed border-brand-200 bg-brand-50/50">
                <PersonGlyph />
              </div>
            )}

            <div className="flex items-start justify-between gap-2 p-4">
              <div className="min-w-0">
                <p className="text-base font-semibold leading-snug text-ink">{member.name}</p>
                <p className="mt-1 text-sm text-ink-muted">{member.role}</p>
                {member.placeholder && <p className="mt-1.5 text-xs text-amber-700">Photo coming soon</p>}
              </div>

              {member.linkedin && (
                <Link
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on LinkedIn`}
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line text-ink-muted transition-colors duration-200 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600"
                >
                  <LinkedInGlyph />
                </Link>
              )}
            </div>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

function PersonGlyph() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="#85a7e7" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="9" r="3.6" />
      <path d="M5.5 19.5a6.5 6.5 0 0 1 13 0" />
    </svg>
  );
}

function LinkedInGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45Z" />
    </svg>
  );
}
