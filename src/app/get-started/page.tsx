import type { Metadata } from "next";
import { Suspense } from "react";
import { Container, Section, Eyebrow } from "@/components/ui/Layout";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { WorkflowForm } from "@/components/site/WorkflowForm";
import { CredentialLine } from "@/components/site/Credentials";
import { ContactDetails } from "@/components/site/ContactDetails";

export const metadata: Metadata = {
  title: "Get started",
  description:
    "Book a free discovery audit or a free AI seminar for your team. Show us how the work gets done today, and we'll show you what it could become.",
  keywords: [
    "book AI consultation",
    "free AI audit",
    "AI discovery session",
    "AI implementation consultation",
  ],
  alternates: { canonical: "/get-started" },
};

export default function GetStartedPage() {
  return (
    <>
      <PageHero
        eyebrow="Get started"
        lines={["Show us how the work", "gets done today."]}
      >
        <p className="text-lead text-ink-soft pretty">
          We&rsquo;ll show you what it could become. Start with one workflow:
          the one that costs you the most time.
        </p>
      </PageHero>

      <Section className="!pt-4">
        <Container size="wide">
          <Reveal>
            <Eyebrow as="h2">Tell us about the work</Eyebrow>
            <p className="mt-6 max-w-2xl text-lead text-ink-soft pretty">
              The more specific the workflow, the more useful our answer will
              be.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                {/* WorkflowForm reads ?type= to preselect what's being booked. */}
                <Suspense fallback={<FormSkeleton />}>
                  <WorkflowForm />
                </Suspense>
              </Reveal>

              <div className="mt-10 border-t border-line pt-8">
                <CredentialLine />
              </div>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.08} className="lg:sticky lg:top-32">
                <ContactDetails />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function FormSkeleton() {
  return (
    <div className="space-y-8" aria-hidden="true">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i}>
          <div className="h-4 w-32 rounded bg-line-soft" />
          <div className="mt-3 h-12 w-full rounded-xl bg-line-soft" />
        </div>
      ))}
    </div>
  );
}
