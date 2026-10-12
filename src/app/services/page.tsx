import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Layout";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { BannerCTA } from "@/components/site/BannerCTA";
import { ArticleIndexCard } from "@/components/site/ArticleTemplate";
import { SERVICES } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom AI automation, custom software development, Document AI, Voice AI, Chat AI and developer staff augmentation from Zryth.",
  keywords: [
    "custom AI automation",
    "custom software development company",
    "document AI services",
    "voice AI development",
    "chat AI development",
    "developer staff augmentation",
    "outsource AI development",
  ],
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" lines={["What we build", "for your business."]} gradientFrom={1}>
        <p className="text-lead text-ink-soft pretty">
          Six ways to work with us, from automating one workflow to building a whole product or adding engineers to your
          team. Open any of them to see what we provide.
        </p>
      </PageHero>

      <Section tone="alt">
        <Container>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <Reveal as="li" key={service.slug} delay={(i % 3) * 0.06}>
                <ArticleIndexCard
                  href={`/services/${service.slug}`}
                  category="Service"
                  readingTime={service.readingTime}
                  title={service.name}
                  heroImageLabel={service.image.alt}
                  heroImageSrc={service.image.src}
                  linkLabel="See what we provide"
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
