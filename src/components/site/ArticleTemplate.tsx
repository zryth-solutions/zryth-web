import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";

/**
 * Shared editorial article shape, used by Case Studies, Products and
 * the case studies. `body` is an ordered list of blocks (heading / subheading /
 * paragraph / image) rendered top to bottom, exactly like a Medium article:
 * add, remove or reorder blocks freely, the template just renders whatever's
 * here. No cards, no gradients, no metric tiles — the three sections should
 * read identically in structure and differ only in content.
 */
export type ArticleBlock =
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | {
      type: "image";
      label: string;
      caption?: string;
      src?: string;
      /** Tailwind aspect ratio class, e.g. "aspect-[4/3]". Defaults to 16/10. */
      ratio?: string;
    }
  /** An interactive or animated figure placed between paragraphs. */
  | { type: "figure"; node: ReactNode };

export type ArticleData = {
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  author: string;
  publishedDate: string;
  readingTime: string;
  heroImageLabel: string;
  /** Path under /public. Leave undefined to render the placeholder state. */
  heroImageSrc?: string;
  /** Tailwind aspect ratio class, e.g. "aspect-[1363/601]". Defaults to 16/9. */
  heroImageRatio?: string;
  body: ArticleBlock[];
  closingNote: string;
};

export function ArticleTemplate({
  article,
  closingLabel,
  next,
  relatedLink,
  download,
  backHref,
  backLabel,
  heroSlot,
  headerSlot,
}: {
  article: ArticleData;
  /** Replaces the hero image, e.g. with an animated preview. */
  heroSlot?: ReactNode;
  /** Extra content under the byline, e.g. links to the live product. */
  headerSlot?: ReactNode;
  /** e.g. "Zryth Case Studies", "Zryth Services", "Zryth Our Work". */
  closingLabel: string;
  next?: { title: string; href: string } | null;
  /** Optional cross-link, e.g. a product pointing to its case study. */
  relatedLink?: { label: string; href: string } | null;
  /** Optional file download, e.g. a product brochure. */
  download?: { label: string; href: string } | null;
  backHref: string;
  backLabel: string;
}) {
  return (
    <article className="pb-24 sm:pb-32">
      {/* Header */}
      <header className="pt-36 pb-12 sm:pt-44 sm:pb-16">
        <div className="mx-auto max-w-[720px] px-6 text-center sm:px-8">
          <p className="label text-brand-600">{article.category}</p>

          <h1 className="mt-6 text-[2.5rem] font-semibold leading-[1.08] tracking-tight text-ink balance sm:text-[3.25rem]">
            {article.title}
          </h1>

          <p className="mt-6 text-[1.1875rem] leading-[1.6] text-ink-soft pretty">
            {article.subtitle}
          </p>

          <p className="mt-8 text-sm text-ink-faint">
            {article.author} · {article.publishedDate} · {article.readingTime}
          </p>

          {headerSlot && <div className="mt-8 flex justify-center">{headerSlot}</div>}

          {download && (
            <div className="mt-8">
              <Button href={download.href} download variant="primary">
                {download.label}
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Hero image */}
      <div className="mx-auto max-w-[900px] px-6 sm:px-8">
        {heroSlot ?? (
          <PlaceholderImage
            label={article.heroImageLabel}
            src={article.heroImageSrc}
            ratio={article.heroImageRatio ?? "aspect-[16/9]"}
          />
        )}
      </div>

      {/* Article body */}
      <div className="mx-auto mt-16 max-w-[720px] px-6 sm:mt-20 sm:px-8">
        {article.body.map((block, i) => (
          <ArticleBlockView key={i} block={block} />
        ))}

        {relatedLink && (
          <p className="mt-10">
            <Link
              href={relatedLink.href}
              className="text-[1.125rem] font-medium text-brand-600 hover:text-brand-800"
            >
              {relatedLink.label}
            </Link>
          </p>
        )}
      </div>

      {/* End of article */}
      <div className="mx-auto mt-16 max-w-[720px] px-6 sm:mt-20 sm:px-8">
        <hr className="border-line-soft" />

        <div className="mt-12">
          <p className="text-base font-semibold text-ink">{closingLabel}</p>
          <p className="mt-2 text-[1.0625rem] leading-[1.6] text-ink-soft pretty">
            {article.closingNote}
          </p>

          {next && (
            <p className="mt-8">
              <Link
                href={next.href}
                className="text-[1.0625rem] font-medium text-brand-600 hover:text-brand-800"
              >
                Next: {next.title}
              </Link>
            </p>
          )}

          <p className="mt-8">
            <Link
              href={backHref}
              className="text-sm text-ink-muted transition-colors hover:text-brand-600"
            >
              {backLabel}
            </Link>
          </p>
        </div>
      </div>
    </article>
  );
}

function ArticleBlockView({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="mt-16 text-[1.75rem] font-semibold leading-[1.2] tracking-tight text-ink balance first:mt-0 sm:text-[2.25rem]">
          {block.text}
        </h2>
      );
    case "subheading":
      return (
        <h3 className="mt-10 text-[1.375rem] font-semibold leading-[1.25] text-ink balance sm:text-[1.625rem]">
          {block.text}
        </h3>
      );
    case "paragraph":
      return (
        <p className="mt-6 text-[1.125rem] leading-[1.75] text-ink-soft pretty">
          {block.text}
        </p>
      );
    case "list":
      return (
        <ul className="mt-6 space-y-3 text-[1.125rem] leading-[1.7] text-ink-soft">
          {block.items.map((item) => (
            <li key={item} className="flex gap-4">
              <span aria-hidden="true" className="mt-[0.8rem] size-1.5 shrink-0 rounded-full bg-brand-500" />
              <span className="pretty">{item}</span>
            </li>
          ))}
        </ul>
      );
    case "figure":
      // Wider than the text column on large screens, so side-by-side panes fit.
      return <div className="mt-12 lg:-mx-[90px]">{block.node}</div>;
    case "image":
      return (
        <div className="mt-10 sm:-mx-10">
          <PlaceholderImage
            label={block.label}
            src={block.src}
            caption={block.caption}
            ratio={block.ratio}
          />
        </div>
      );
  }
}

/**
 * Renders the real image flush and undecorated (no card, no shadow, no
 * rounded corners) when `src` is set; otherwise a flat placeholder box
 * labelled with what the image should eventually show.
 */
export function PlaceholderImage({
  label,
  src,
  caption,
  ratio = "aspect-[16/10]",
}: {
  label: string;
  src?: string;
  caption?: string;
  ratio?: string;
}) {
  return (
    <figure>
      {src ? (
        <div className={`relative ${ratio} w-full overflow-hidden bg-surface-alt`}>
          <Image
            src={src}
            alt={label}
            fill
            className="object-cover"
            sizes="(max-width: 900px) 100vw, 900px"
          />
        </div>
      ) : (
        <div
          className={`${ratio} flex w-full items-center justify-center border border-dashed border-line-soft bg-surface-alt text-sm text-ink-faint`}
        >
          {label}
        </div>
      )}
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-ink-faint">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/** Shared index-card look: image on top, category/read-time, title, link. */
export function ArticleIndexCard({
  href,
  category,
  readingTime,
  title,
  heroImageLabel,
  heroImageSrc,
  linkLabel,
  actions,
}: {
  href: string;
  category: string;
  readingTime: string;
  title: string;
  heroImageLabel: string;
  heroImageSrc?: string;
  linkLabel: string;
  /** Small extra links beside the card's own link, e.g. the live product. */
  actions?: ReactNode;
}) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors duration-200 hover:border-brand-300">
      {heroImageSrc ? (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-alt">
          <Image
            src={heroImageSrc}
            alt={heroImageLabel}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 640px"
          />
        </div>
      ) : (
        <div className="flex aspect-[16/10] w-full items-center justify-center border-b border-dashed border-line-soft bg-surface-alt text-center text-sm text-ink-faint">
          {heroImageLabel}
        </div>
      )}

      <div className="flex flex-1 flex-col p-8">
        <p className="flex items-center gap-2 label text-brand-600">
          {category}
          <span aria-hidden="true" className="text-ink-faint">
            ·
          </span>
          <span className="text-ink-faint">{readingTime}</span>
        </p>

        <h2 className="mt-5 flex-1 text-h3 font-semibold balance">{title}</h2>

        {/* The whole card is this link; `actions` sit beside it, above the overlay. */}
        <div className="mt-8 flex min-h-10 items-center justify-between gap-4">
          <Link
            href={href}
            className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-brand-600 after:absolute after:inset-0"
          >
            {linkLabel}
          </Link>
          {actions}
        </div>
      </div>
    </div>
  );
}
