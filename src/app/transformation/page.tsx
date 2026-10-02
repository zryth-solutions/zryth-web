import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Layout";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { ClientStory } from "@/components/site/ClientStory";
import { Button } from "@/components/ui/Button";
import { CLIENT_STORIES } from "@/content/client-stories";

export const metadata: Metadata = {
  title: "AI Transformation & Success Stories",
  description:
    "Find the opportunity. Implement AI. Train your team. Measure the impact. Zryth transforms how traditional businesses operate.",
  keywords: [
    "AI transformation case studies",
    "AI success stories",
    "business automation results",
    "AI ROI case studies",
    "AI implementation consulting",
  ],
  alternates: { canonical: "/transformation" },
};

export default function TransformationPage() {
  return (
    <>
      {/* 1 — Hero */}
      <PageHero
        eyebrow="AI Transformation"
        lines={["Outsource Your", "AI Development", "To Us."]}
        gradientFrom={1}
      >
        <p className="text-lead text-ink-soft pretty">
          Find the opportunity. Implement AI. Train your team. Measure the
          impact.
        </p>
        <div className="mt-10">
          <Button href="/get-started">Start Your AI Project</Button>
        </div>
      </PageHero>

      {/* 2 — Client transformation stories */}
      <Section>
        <Container>
          <Reveal>
            <h2 className="max-w-2xl text-h2 font-semibold balance">
              What Changed For Our Clients.
            </h2>
            <p className="mt-5 text-lead text-ink-soft">
              Real problems. Real implementation. Real business impact.
            </p>
          </Reveal>

          {/* Separation comes from whitespace and one rule, not boxes. */}
          <div className="mt-20 space-y-24 sm:mt-24 sm:space-y-32">
            {CLIENT_STORIES.map((story, i) => (
              <div
                key={`${story.company}-${i}`}
                className={i > 0 ? "border-t border-line pt-24 sm:pt-32" : ""}
              >
                <ClientStory story={story} reversed={i % 2 === 1} />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3 — One closing CTA */}
      <section className="relative isolate overflow-hidden bg-[linear-gradient(104deg,var(--color-brand-800)_0%,var(--color-brand-600)_55%,var(--color-brand-500)_100%)] py-24 sm:py-32">
        <div
          aria-hidden="true"
          className="banner-glow pointer-events-none absolute -right-32 -top-40 -z-10 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(129,169,235,0.45)_0%,transparent_70%)]"
        />

        <Container>
          <Reveal>
            <h2 className="max-w-3xl text-h1 font-semibold text-white balance">
              Find Where AI Can Create ROI In Your Business.
            </h2>

            <p className="mt-6 max-w-xl text-lead text-white/85 pretty">
              Show us how your business works today. We&rsquo;ll identify where
              AI can create measurable value.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button
                href="/get-started"
                variant="secondary"
                className="border-transparent bg-white font-semibold text-brand-700 hover:border-transparent hover:bg-brand-50 hover:text-brand-800"
              >
                Book a Session
              </Button>

              <Button
                href="/case-studies"
                variant="secondary"
                className="border-white/45 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white"
              >
                Explore Our Work
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
