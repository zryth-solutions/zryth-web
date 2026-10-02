import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { TESTIMONIALS } from "@/content/testimonials";

/**
 * Client testimonials: what we solved, the quote, and who said it.
 * Kept to three plain blocks per card so it stays scannable.
 */
export function Testimonials() {
  return (
    <ul className="grid gap-6 lg:grid-cols-2">
      {TESTIMONIALS.map((item, i) => (
        <Reveal as="li" key={`${item.company}-${i}`} delay={i * 0.07}>
          <figure className="flex h-full flex-col rounded-xl border border-line bg-surface p-8 sm:p-10">
            <div>
              <p className="label text-brand-600">What we solved</p>
              <p className="mt-3 text-body text-ink-soft pretty">
                {item.solved}
              </p>
            </div>

            <blockquote className="mt-8 flex-1 text-statement font-medium text-ink pretty">
              &ldquo;{item.quote}&rdquo;
            </blockquote>

            <figcaption className="mt-8 flex items-center gap-4 border-t border-line-soft pt-6">
              {item.photo ? (
                <Image
                  src={item.photo}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 shrink-0 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-brand-200 bg-brand-50/60">
                  <PersonGlyph />
                </span>
              )}

              <span className="min-w-0">
                <span className="block text-base font-semibold text-ink">
                  {item.placeholder ? (
                    <span className="rounded border border-dashed border-amber-400 bg-amber-50 px-1.5 py-0.5 text-amber-800">
                      {item.name}
                    </span>
                  ) : (
                    item.name
                  )}
                </span>
                <span className="mt-0.5 block text-sm text-ink-muted">
                  {item.role}, {item.company}
                </span>
              </span>

              {item.result && (
                <span className="ml-auto shrink-0 rounded-md bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-700">
                  {item.result}
                </span>
              )}
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </ul>
  );
}

function PersonGlyph() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      stroke="#85a7e7"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="9" r="3.6" />
      <path d="M5.5 19.5a6.5 6.5 0 0 1 13 0" />
    </svg>
  );
}
