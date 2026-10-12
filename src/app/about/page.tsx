import type { Metadata } from "next";
import { Container, Section, Eyebrow } from "@/components/ui/Layout";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { CredentialCards } from "@/components/site/Credentials";
import { Team } from "@/components/site/Team";
import { TeamStrip } from "@/components/site/TeamStrip";

export const metadata: Metadata = {
  title: "About",
  description:
    "Zryth is an AI labs and software studio in Noida. We build AI and software that removes the work that never needed a person, so people can focus on the decisions that matter.",
  keywords: ["AI company India", "about Zryth", "AI development company Noida", "outsource AI development"],
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Zryth" lines={["AI that removes the work", "that never needed a person."]} gradientFrom={1}>
        <p className="text-lead text-ink-soft pretty">
          Zryth is an AI labs and software studio in Noida. We work with businesses in milling and manufacturing, finance
          and audit, and publishing and education, and we build products of our own.
        </p>
      </PageHero>

      {/* The ideology. */}
      <Section tone="alt">
        <Container>
          <Reveal>
            <Eyebrow as="h2">What we believe</Eyebrow>
          </Reveal>

          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <p className="text-h2 font-semibold balance">
                <span className="text-gradient">AI changes the unit of productivity.</span>
              </p>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-5 lg:col-start-8">
              <p className="text-lead text-ink-soft pretty">
                It isn&rsquo;t only about making a person faster anymore. It&rsquo;s about removing the work that never
                needed a person in the first place.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-8 border-t border-line pt-14 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <p className="text-h2 font-semibold balance">People should make the decisions that matter.</p>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-5 lg:col-start-8">
              <p className="text-lead text-ink-soft pretty">
                Not copy information between systems. Not chase approvals. Not prepare the same report again. Not search
                for context someone already had.
              </p>
              <p className="mt-6 text-lead font-medium text-ink">Let people think. Let the system handle the rest.</p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Founders. */}
      <Section>
        <Container>
          <Reveal>
            <Eyebrow as="h2">Founders</Eyebrow>
            <p className="mt-6 max-w-2xl text-h2 font-semibold balance">Meet our founders.</p>
          </Reveal>

          <div className="mt-12">
            <Team />
          </div>
        </Container>
      </Section>

      {/* Team photos, full width. */}
      <Section tone="alt" className="overflow-hidden">
        <Container>
          <Reveal>
            <Eyebrow as="h2">Our team</Eyebrow>
            <p className="mt-6 max-w-2xl text-h2 font-semibold balance">The people who do the work.</p>
          </Reveal>
        </Container>
        <Reveal className="mt-12">
          <TeamStrip />
        </Reveal>
      </Section>

      {/* Credentials. */}
      <Section>
        <Container>
          <Reveal>
            <Eyebrow as="h2">How we operate</Eyebrow>
            <p className="mt-6 max-w-2xl text-h2 font-semibold balance">Recognised, and accountable for your data.</p>
          </Reveal>
          <div className="mt-12">
            <CredentialCards />
          </div>
        </Container>
      </Section>
    </>
  );
}
