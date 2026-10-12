import type { ReactNode } from "react";
import { ArticleTemplate, type ArticleBlock, type ArticleData } from "@/components/site/ArticleTemplate";
import { DemoPreview } from "@/components/demos/DemoPreviews";
import { getDemo, type DemoId } from "@/content/demos";
import { nextCard } from "@/content/demos/cards";
import { STORIES } from "@/content/demos/articles";

/**
 * One walkthrough, rendered in the same editorial format as the case studies.
 * `figures` maps the ids used in the article text to interactive figures.
 */
export function StoryArticle({ id, figures }: { id: DemoId; figures: Record<string, ReactNode> }) {
  const meta = getDemo(id);
  const story = STORIES[id];
  const next = nextCard(`/case-studies/${id}`);

  const body: ArticleBlock[] = story.blocks.map((block) => {
    if (block.type !== "figure") return block;
    const node = figures[block.id];
    if (!node) throw new Error(`Missing figure "${block.id}" for ${id}`);
    return { type: "figure", node };
  });

  const article: ArticleData = {
    slug: id,
    category: meta.category,
    title: meta.heading,
    subtitle: story.subtitle,
    author: "Zryth",
    publishedDate: "October 2026",
    readingTime: meta.readingTime,
    heroImageLabel: meta.title,
    body,
    closingNote: story.closingNote,
  };

  return (
    <ArticleTemplate
      article={article}
      closingLabel="Zryth Case Studies"
      next={{ title: next.title, href: next.href }}
      backHref="/case-studies"
      backLabel="← Back to Case Studies"
      heroSlot={
        <div className="flex justify-center rounded-xl border border-line bg-brand-50/40 px-4 py-8 sm:py-10">
          <div className="aspect-[16/10] w-full max-w-[520px] overflow-hidden rounded-lg border border-line shadow-sm">
            <DemoPreview kind={id === "voice-ai" ? "voice" : "chat"} />
          </div>
        </div>
      }
    />
  );
}
