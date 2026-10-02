import type { Metadata } from "next";
import { Container, Section, Eyebrow } from "@/components/ui/Layout";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { CredentialCards } from "@/components/site/Credentials";
import { Team } from "@/components/site/Team";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "AI changes the unit of productivity. It isn't only about making a person faster. It's about removing the work that never needed a person in the first place.",
  keywords: [
    "AI company India",
    "about Zryth",
    "AI consulting team",
    "AI transformation company",
  ],
  alternates: { canonical: "/about" },
};

const USED_TO_MEAN = [
  "More output per employee.",
  "Better tools.",
  "Faster communication.",
  "More organized teams.",
];

const NOT_THIS = [
  "Not copy information between systems.",
  "Not chase approvals.",
  "Not prepare the same report again.",
  "Not search for context someone already had.",
  "Not spend their day moving work around.",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Zryth"
        lines={[
          "We think “productivity”",
          "is about to mean",
          "something entirely different.",
        ]}
        gradientFrom={2}
      />

      <Section tone="alt">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <p className="text-lead text-ink-soft pretty lg:sticky lg:top-32">
                For a long time, productivity meant:
              </p>
            </Reveal>

            <RevealGroup
              as="ul"
              className="space-y-3 lg:col-span-6 lg:col-start-7"
            >
              {USED_TO_MEAN.map((line) => (
                <RevealItem
                  as="li"
                  key={line}
                  className="border-b border-line py-4 text-statement font-medium text-ink-muted last:border-0"
                >
                  {line}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <Reveal className="mt-20 sm:mt-24">
            <h2 className="max-w-3xl text-h2 font-semibold balance">
              <span className="text-gradient">
                AI changes the unit of productivity.
              </span>
            </h2>
            <p className="mt-8 max-w-2xl text-lead text-ink-soft pretty">
              It isn&rsquo;t only about making a person faster anymore.
              It&rsquo;s about removing the work that never needed a person in
              the first place.
            </p>
            <p className="mt-6 max-w-2xl text-lead font-medium text-ink">
              That&rsquo;s what Zryth is here to build.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* The belief. */}
      <Section>
        <Container>
          <Reveal>
            <h2 className="max-w-3xl text-h1 font-semibold balance">
              People should make the decisions that matter.
            </h2>
          </Reveal>

          <RevealGroup as="ul" className="mt-14 max-w-2xl space-y-3">
            {NOT_THIS.map((line) => (
              <RevealItem
                as="li"
                key={line}
                className="border-b border-line-soft py-4 text-statement font-medium text-ink-muted last:border-0"
              >
                {line}
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-20 sm:mt-24">
            <h3 className="text-h2 font-semibold balance">
              Let people think.
              <br />
              <span className="text-gradient">
                Let the system handle the rest.
              </span>
            </h3>
            <div className="mt-10">
              <Button href="/get-started">Start with one workflow</Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Team. */}
      <Section tone="alt">
        <Container>
          <Reveal>
            <Eyebrow as="h2">Our team</Eyebrow>
            <h2 className="mt-6 max-w-2xl text-h2 font-semibold balance">
              Meet our founders.
            </h2>
          </Reveal>

          <div className="mt-12">
            <Team />
          </div>
        </Container>
      </Section>

      {/* Credentials. */}
      <Section>
        <Container>
          <Reveal>
            <Eyebrow as="h2">How we operate</Eyebrow>
            <h2 className="mt-6 max-w-2xl text-h2 font-semibold balance">
              Recognised, and accountable for your data.
            </h2>
          </Reveal>
          <div className="mt-12">
            <CredentialCards />
          </div>
        </Container>
      </Section>
    </>
  );
}
