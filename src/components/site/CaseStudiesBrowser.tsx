"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { ArticleIndexCard } from "@/components/site/ArticleTemplate";
import type { CaseStudy } from "@/content/case-studies";

/**
 * Search box + tag chips over the case-study grid. All filtering runs
 * client-side against the small, already-loaded list — no fetches, no
 * server round trip needed at this scale.
 */
export function CaseStudiesBrowser({ studies }: { studies: CaseStudy[] }) {
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    studies.forEach((study) => study.tags.forEach((tag) => set.add(tag)));
    return Array.from(set).sort();
  }, [studies]);

  function toggleTag(tag: string) {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  const filtered = studies.filter((study) => {
    const q = query.trim().toLowerCase();
    const matchesQuery =
      q.length === 0 ||
      study.title.toLowerCase().includes(q) ||
      study.subtitle.toLowerCase().includes(q) ||
      study.category.toLowerCase().includes(q) ||
      study.tags.some((tag) => tag.toLowerCase().includes(q));

    const matchesTags =
      activeTags.length === 0 ||
      activeTags.some((tag) => study.tags.includes(tag));

    return matchesQuery && matchesTags;
  });

  return (
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block w-full sm:max-w-xs">
          <span className="sr-only">Search case studies</span>
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search case studies…"
            className="w-full rounded-full border border-line bg-surface py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink-faint focus:border-brand-300 focus:outline-none"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTags([])}
            aria-pressed={activeTags.length === 0}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 ${
              activeTags.length === 0
                ? "bg-brand-600 text-white"
                : "border border-line text-ink-soft hover:border-brand-300"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => {
            const active = activeTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                aria-pressed={active}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 ${
                  active
                    ? "bg-brand-600 text-white"
                    : "border border-line text-ink-soft hover:border-brand-300"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-body text-ink-muted">
          No case studies match your search.
        </p>
      ) : (
        <ul className="mt-10 grid gap-6 lg:grid-cols-3">
          {filtered.map((study, i) => (
            <Reveal as="li" key={study.slug} delay={i * 0.06}>
              <ArticleIndexCard
                href={`/case-studies/${study.slug}`}
                category={study.category}
                readingTime={study.readingTime}
                title={study.title}
                heroImageLabel={study.heroImageLabel}
                heroImageSrc={study.heroImageSrc}
                linkLabel="Read the case study"
              />
            </Reveal>
          ))}
        </ul>
      )}
    </div>
  );
}

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M13 13 10.3 10.3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
