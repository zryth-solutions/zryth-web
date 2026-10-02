import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Layout";
import { PageHero } from "@/components/site/PageHero";
import { BannerCTA } from "@/components/site/BannerCTA";
import { CaseStudiesBrowser } from "@/components/site/CaseStudiesBrowser";
import { CASE_STUDIES } from "@/content/case-studies";

export const metadata: Metadata = {
  title: "Case studies",
  description:
    "The business value AI actually created for a mill, a CA firm and a publisher, and what the same approach could do for you.",
  keywords: [
    "AI case studies",
    "business automation case studies",
    "AI ROI examples",
    "AI transformation results",
    "AI implementation examples",
  ],
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        lines={["The business value", "AI actually creates."]}
        gradientFrom={1}
      >
        <p className="text-lead text-ink-soft pretty">
          Every case here is about the return on the work: what changed, what
          it was worth, and what the same approach could do inside your
          business.
        </p>
      </PageHero>

      <Section tone="alt">
        <Container>
          <CaseStudiesBrowser studies={CASE_STUDIES} />

          <div className="mt-20">
            <BannerCTA />
          </div>
        </Container>
      </Section>
    </>
  );
}
