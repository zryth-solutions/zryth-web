import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleTemplate } from "@/components/site/ArticleTemplate";
import {
  CASE_STUDIES,
  getCaseStudy,
  getNextCaseStudy,
} from "@/content/case-studies";

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
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
