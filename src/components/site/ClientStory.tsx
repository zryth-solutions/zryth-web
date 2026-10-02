import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import type { ClientStory as Story } from "@/content/client-stories";

/**
 * One client transformation story: photograph on one side, the story on the
 * other, alternating down the page. Deliberately not a card — separation comes
 * from whitespace and a single hairline rule.
 *
 * Type scale is set so the quote is the loudest thing in the column and the
 * supporting copy stays quiet: company 32 / quote 24 / body 16.
 */
export function ClientStory({
  story,
  reversed = false,
}: {
  story: Story;
  reversed?: boolean;
}) {
  return (
    <article className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
      <Reveal className={reversed ? "lg:order-2" : ""}>
        {story.photo ? (
          <div
            className={`relative ${story.photoRatio ?? "aspect-[3/4]"} w-full overflow-hidden rounded-2xl bg-surface-alt`}
          >
            <Image
              src={story.photo}
              alt={story.photoAlt}
              fill
              className={`object-cover ${story.photoPosition ?? ""}`}
              sizes="(max-width: 1024px) 100vw, 520px"
            />
          </div>
        ) : (
          <div
            className={`flex ${story.photoRatio ?? "aspect-[3/4]"} w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-brand-200 bg-brand-50/50 p-8 text-center`}
          >
            <CameraGlyph />
            <p className="label mt-1 text-brand-600">Client photograph</p>
            <p className="max-w-[16rem] text-sm text-ink-muted">
              {story.photoAlt}
            </p>
          </div>
        )}
      </Reveal>

      <Reveal delay={0.08} className={reversed ? "lg:order-1" : ""}>
        <p className="label text-brand-600">{story.industry}</p>

        <h3 className="mt-4 text-h3 font-semibold balance">
          {story.placeholder ? (
            <span className="inline-block rounded border border-dashed border-amber-400 bg-amber-50 px-2 py-0.5 text-amber-800">
              {story.company}
            </span>
          ) : (
            story.company
          )}
        </h3>

        <dl className="mt-9 space-y-8 border-t border-line pt-8">
          <div>
            <dt className="label text-ink-faint">The problem</dt>
            <dd className="mt-3 max-w-md text-body text-ink-soft pretty">
              {story.problem}
            </dd>
          </div>
          <div>
            <dt className="label text-ink-faint">What changed</dt>
            <dd className="mt-3 max-w-md text-body text-ink pretty">
              {story.changed}
            </dd>
          </div>
        </dl>

        <blockquote className="mt-11 border-l-2 border-brand-400 pl-6 text-statement font-medium text-ink pretty">
          &ldquo;{story.quote}&rdquo;
        </blockquote>

        <p className="mt-5 pl-6 text-sm text-ink-muted">
          <span className="font-semibold text-ink">{story.personName}</span>
          {" · "}
          {story.personRole}, {story.company}
        </p>

        {story.results.length > 0 && (
          <ul className="mt-11 grid gap-x-6 gap-y-5 sm:grid-cols-3">
            {story.results.map((result) => (
              <li key={result} className="border-t border-line pt-4">
                <span className="text-base font-semibold tracking-tight text-brand-700">
                  {result}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Reveal>
    </article>
  );
}

function CameraGlyph() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      stroke="#85a7e7"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8.5A1.5 1.5 0 0 1 4.5 7h2.2l1.1-2h8.4l1.1 2h2.2A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z" />
      <circle cx="12" cy="13" r="3.6" />
    </svg>
  );
}
