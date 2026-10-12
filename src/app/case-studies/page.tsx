import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Layout";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { BannerCTA } from "@/components/site/BannerCTA";
import { ArticleIndexCard } from "@/components/site/ArticleTemplate";
import { WRITE_UPS } from "@/content/case-write-ups";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Applied AI case studies from Zryth: what we investigated, what we tested, and what we learned building it.",
  keywords: [
    "AI case studies",
    "applied AI research",
    "AI OCR case study",
    "document processing case study",
    "AI accuracy benchmarks",
  ],
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        lines={["Applied AI work,", "not a portfolio page."]}
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
            {WRITE_UPS.map((entry, i) => (
              <Reveal as="li" key={entry.slug} delay={i * 0.06}>
                <ArticleIndexCard
                  href={`/case-studies/${entry.slug}`}
                  category={entry.category}
                  readingTime={entry.readingTime}
                  title={entry.title}
                  heroImageLabel={entry.heroImageLabel}
                  heroImageSrc={entry.heroImageSrc}
                  linkLabel="Read the case study"
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
