import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleTemplate } from "@/components/site/ArticleTemplate";
import { DocStoryArticle } from "@/components/demos/story/DocStoryArticle";
import { DOC_STORIES, getDocStory } from "@/content/demos/document-ai-stories";
import { WRITE_UPS, getNextWriteUp, getWriteUp } from "@/content/case-write-ups";
import {
  CASE_STUDIES,
  getCaseStudy,
  getNextCaseStudy,
} from "@/content/case-studies";

export function generateStaticParams() {
  return [...CASE_STUDIES, ...DOC_STORIES, ...WRITE_UPS].map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDocStory(slug);
  if (doc) {
    return {
      title: `${doc.title} | Case Studies`,
      description: doc.subtitle,
      keywords: [doc.title, `Document AI for ${doc.industry.toLowerCase()}`, "document AI case study", "AI ROI case study"],
      alternates: { canonical: `/case-studies/${doc.slug}` },
      openGraph: { title: doc.title, description: doc.subtitle, url: `/case-studies/${doc.slug}`, type: "article" },
    };
  }
  const writeUp = getWriteUp(slug);
  if (writeUp) {
    return {
      title: `${writeUp.title} | Case Studies`,
      description: writeUp.subtitle,
      keywords: [writeUp.title, "applied AI case study", "AI OCR case study", "AI accuracy benchmark"],
      alternates: { canonical: `/case-studies/${writeUp.slug}` },
      openGraph: { title: writeUp.title, description: writeUp.subtitle, url: `/case-studies/${writeUp.slug}`, type: "article" },
    };
  }
  const study = getCaseStudy(slug);
  if (!study) return {};

  return {
    title: `${study.title} | Case Studies`,
    description: study.subtitle,
    keywords: [
      `${study.category} AI case study`,
      "AI transformation case study",
      "AI ROI case study",
      study.title,
    ],
    alternates: { canonical: `/case-studies/${study.slug}` },
    openGraph: {
      title: study.title,
      description: study.subtitle,
      url: `/case-studies/${study.slug}`,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDocStory(slug);
  if (doc) return <DocStoryArticle story={doc} />;

  const writeUp = getWriteUp(slug);
  if (writeUp) {
    const nextWriteUp = getNextWriteUp(slug);
    return (
      <ArticleTemplate
        article={writeUp}
        closingLabel="Zryth Case Studies"
        next={nextWriteUp ? { title: nextWriteUp.title, href: `/case-studies/${nextWriteUp.slug}` } : null}
        backHref="/case-studies"
        backLabel="← Back to Case Studies"
      />
    );
  }

  const study = getCaseStudy(slug);
  if (!study) notFound();

  const next = getNextCaseStudy(slug);

  return (
    <ArticleTemplate
      article={study}
      closingLabel="Zryth Case Studies"
      next={next ? { title: next.title, href: `/case-studies/${next.slug}` } : null}
      relatedLink={
        study.productHref
          ? { label: study.productLabel ?? "See the product", href: study.productHref }
          : null
      }
      backHref="/case-studies"
      backLabel="← All case studies"
    />
  );
}
