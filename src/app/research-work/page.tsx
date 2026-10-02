import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Layout";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { BannerCTA } from "@/components/site/BannerCTA";
import { ArticleIndexCard } from "@/components/site/ArticleTemplate";
import { RESEARCH_WORK } from "@/content/research-work";

export const metadata: Metadata = {
  title: "Research Work",
  description:
    "Applied AI research from Zryth: what we investigated, what we tested, and what we learned building it.",
  keywords: [
    "applied AI research",
    "AI OCR research",
    "document processing research",
    "AI accuracy benchmarks",
    "AI and OCR pipeline",
  ],
  alternates: { canonical: "/research-work" },
};

export default function ResearchWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Research Work"
        lines={["Applied AI research,", "not a portfolio page."]}
        gradientFrom={1}
      >
        <p className="text-lead text-ink-soft pretty">
          What we investigated, what we tested, what surprised us, and what
          it means for a business like yours.
        </p>
      </PageHero>

      <Section tone="alt">
        <Container>
          <ul className="grid gap-6 lg:grid-cols-3">
            {RESEARCH_WORK.map((entry, i) => (
              <Reveal as="li" key={entry.slug} delay={i * 0.06}>
                <ArticleIndexCard
                  href={`/research-work/${entry.slug}`}
                  category={entry.category}
                  readingTime={entry.readingTime}
                  title={entry.title}
                  heroImageLabel={entry.heroImageLabel}
                  heroImageSrc={entry.heroImageSrc}
                  linkLabel="Read the write-up"
                />
              </Reveal>
            ))}
          </ul>

          <div className="mt-20">
            <BannerCTA />
          </div>
        </Container>
      </Section>
    </>
  );
}
