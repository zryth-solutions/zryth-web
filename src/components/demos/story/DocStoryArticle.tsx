import { ArticleTemplate, type ArticleBlock, type ArticleData } from "@/components/site/ArticleTemplate";
import { DemoPreview } from "@/components/demos/DemoPreviews";
import { FlowFigure, RoiFigure } from "@/components/demos/story/SimpleFigures";
import { CtaBlock, LinksFigure } from "@/components/demos/story/StoryBits";
import { nextCard } from "@/content/demos/cards";
import type { DocStory } from "@/content/demos/document-ai-stories";

const CTA_LEAD =
  "Reading is only the starting point. We connect documents to your records, apply your business rules and route exceptions for review.";

/** A Document AI case study: short text, a simple animation, real results. */
export function DocStoryArticle({ story }: { story: DocStory }) {
  const next = nextCard(`/case-studies/${story.slug}`);

  const body: ArticleBlock[] = story.blocks.map((block): ArticleBlock => {
    if (block.type !== "figure") return block;
    switch (block.id) {
      case "flow":
        return { type: "figure", node: <FlowFigure stages={story.flow} caption="Illustrative animation, not a real client document." /> };
      case "roi":
        return { type: "figure", node: <RoiFigure items={story.roi} caption={story.roiCaption} /> };
      case "links":
        return { type: "figure", node: <LinksFigure links={story.links} /> };
      case "cta":
        return { type: "figure", node: <CtaBlock useCase={story.slug} lead={CTA_LEAD} /> };
    }
  });

  const article: ArticleData = {
    slug: story.slug,
    category: story.category,
    title: story.title,
    subtitle: story.subtitle,
    author: "Zryth",
    publishedDate: "October 2026",
    readingTime: story.readingTime,
    heroImageLabel: story.title,
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
            <DemoPreview kind={story.preview} />
          </div>
        </div>
      }
    />
  );
}
