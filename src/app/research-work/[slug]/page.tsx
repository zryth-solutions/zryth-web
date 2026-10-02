import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleTemplate } from "@/components/site/ArticleTemplate";
import {
  RESEARCH_WORK,
  getResearchWork,
  getNextResearchWork,
} from "@/content/research-work";

export function generateStaticParams() {
  return RESEARCH_WORK.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getResearchWork(slug);
  if (!entry) return {};

  return {
    title: `${entry.title} | Research Work`,
    description: entry.subtitle,
    keywords: [entry.title, "applied AI research", "AI OCR research", "AI accuracy benchmark"],
    alternates: { canonical: `/research-work/${entry.slug}` },
    openGraph: {
      title: entry.title,
      description: entry.subtitle,
      url: `/research-work/${entry.slug}`,
      type: "article",
    },
  };
}

export default async function ResearchWorkEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getResearchWork(slug);
  if (!entry) notFound();

  const next = getNextResearchWork(slug);

  return (
    <ArticleTemplate
      article={entry}
      closingLabel="Zryth Research"
      next={next ? { title: next.title, href: `/research-work/${next.slug}` } : null}
      backHref="/research-work"
      backLabel="← Back to Research"
    />
  );
}
