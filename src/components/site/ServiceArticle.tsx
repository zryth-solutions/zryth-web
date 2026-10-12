import Image from "next/image";
import { ArticleTemplate, type ArticleBlock, type ArticleData } from "@/components/site/ArticleTemplate";
import { CtaBlock, LinksFigure } from "@/components/demos/story/StoryBits";
import { nextService, type Service } from "@/content/services";

const CTA_LEAD = "Tell us where the time goes. We will show you what it could look like.";

/** A service, told as an article in the case-study article format, with its photo and credit. */
export function ServiceArticle({ service }: { service: Service }) {
  const next = nextService(service.slug);

  const body: ArticleBlock[] = service.blocks.map((block): ArticleBlock => {
    if (block.type !== "figure") return block;
    return block.id === "links"
      ? { type: "figure", node: <LinksFigure links={service.links} /> }
      : { type: "figure", node: <CtaBlock useCase={service.slug} lead={CTA_LEAD} /> };
  });

  const article: ArticleData = {
    slug: service.slug,
    category: "Service",
    title: service.name,
    subtitle: service.subtitle,
    author: "Zryth",
    publishedDate: "October 2026",
    readingTime: service.readingTime,
    heroImageLabel: service.image.alt,
    body,
    closingNote: service.closingNote,
  };

  return (
    <ArticleTemplate
      article={article}
      closingLabel="Zryth Services"
      next={{ title: next.name, href: `/services/${next.slug}` }}
      backHref="/services"
      backLabel="← All services"
      heroSlot={
        <figure>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-line bg-surface-alt">
            <Image src={service.image.src} alt={service.image.alt} fill priority className="object-cover" sizes="(max-width: 900px) 100vw, 900px" />
          </div>
          <figcaption className="mt-3 text-sm text-ink-faint">
            Photo by{" "}
            <a href={service.image.credit.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-brand-600">
              {service.image.credit.name}
            </a>{" "}
            on{" "}
            <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-brand-600">
              Unsplash
            </a>
          </figcaption>
        </figure>
      }
    />
  );
}
