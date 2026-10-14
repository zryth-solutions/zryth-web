import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Layout";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/Button";
import { ArticleIndexCard } from "@/components/site/ArticleTemplate";
import { LiveLinks } from "@/components/site/LiveLinks";
import { PRODUCTS } from "@/content/products";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "AI-powered software for finance, operations, education, sales and decision-making.",
  keywords: [
    "AI software products",
    "AI automation tools",
    "document AI software",
    "voice AI software",
    "custom AI products",
    "AI powered business software",
  ],
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        lines={["Our work, built around", "real business problems."]}
        gradientFrom={1}
      >
        <p className="text-lead text-ink-soft pretty">
          AI-powered software for finance, operations, education, sales and
          decision-making.
        </p>
      </PageHero>

      <Section tone="alt">
        <Container>
          <ul className="grid gap-6 lg:grid-cols-3">
            {PRODUCTS.map((product, i) => (
              <Reveal as="li" key={product.slug} delay={i * 0.05}>
                <ArticleIndexCard
                  href={`/products/${product.slug}`}
                  category={product.category}
                  readingTime={product.readingTime}
                  title={product.title}
                  heroImageLabel={product.heroImageLabel}
                  heroImageSrc={product.heroImageSrc}
                  linkLabel="See product"
                  actions={product.liveLinks ? <LiveLinks links={product.liveLinks} compact className="flex-nowrap" /> : undefined}
                />
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container size="narrow">
          <Reveal className="text-center">
            <h2 className="text-h2 font-semibold balance">
              Need something more specific?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lead text-ink-soft pretty">
              We also build AI-powered workflows and products around how your
              business actually operates.
            </p>
            <div className="mt-10 flex justify-center">
              <Button href="/get-started">Talk to Zryth</Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
