import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Layout";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Hero } from "@/components/home/Hero";
import { BannerCTA } from "@/components/site/BannerCTA";
import {
  LogoGrid,
  ClientLogoStrip,
  MODEL_LOGOS,
  CLOUD_LOGOS,
  CLIENT_LOGOS,
} from "@/components/site/LogoWall";
import { Button } from "@/components/ui/Button";
import { STUDIO_OFFER, ROI_STEPS, INDUSTRIES } from "@/content/home";
import { SERVICES } from "@/content/services";
import { ArticleIndexCard } from "@/components/site/ArticleTemplate";
import { WRITE_UPS } from "@/content/case-write-ups";

export const metadata: Metadata = {
  title: "Zryth: Outsource Your AI Development To Us",
  description:
    "Outsource your AI development to Zryth. We design, build and deploy custom AI and business software for your business, or you can deploy AI products we have already built.",
  keywords: [
    "AI transformation company",
    "business automation software",
    "AI agency India",
    "AI automation services",
    "custom AI development company",
    "hire AI consultants",
    "AI agent for business",
  ],
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      {/* 01 — Hero */}
      <Hero />

      {/* 01.5 — Social proof strip: white, same as Hero's base, so credibility
          lands before the first grey content block rather than competing
          with it. */}
      <Section className="!py-10 sm:!py-14">
        <Container>
          <Reveal>
            <p className="text-center text-sm font-medium text-ink-faint">
              Our trusted clients
            </p>
          </Reveal>
          <ClientLogoStrip logos={CLIENT_LOGOS} className="mt-6 sm:mt-8" />
        </Container>
      </Section>

      {/* 02 — What Zryth is, in one message */}
      <Section tone="alt">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="label text-brand-600">{STUDIO_OFFER.eyebrow}</p>
                <h2 className="mt-4 text-h2 font-semibold balance">
                  {STUDIO_OFFER.title}
                </h2>
                <p className="mt-5 text-body text-ink-soft pretty">
                  {STUDIO_OFFER.lead}
                </p>
              </Reveal>

              <Reveal delay={0.1} className="mt-9 flex flex-wrap items-center gap-3">
                <Button href={STUDIO_OFFER.href}>{STUDIO_OFFER.cta}</Button>
                <Button href={STUDIO_OFFER.secondaryHref} variant="secondary">
                  {STUDIO_OFFER.secondaryCta}
                </Button>
              </Reveal>
            </div>

            <RevealGroup
              as="ol"
              className="mt-2 border-t border-line-soft lg:col-span-7"
            >
              {SERVICES.map((service, i) => (
                <RevealItem as="li" key={service.slug} className="border-b border-line-soft">
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex items-center gap-5 py-5 transition-colors duration-200"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition-colors duration-200 group-hover:bg-brand-100">
                      <OfferIcon index={i} />
                    </span>
                    <span className="flex-1 text-lg font-medium text-ink transition-colors duration-200 group-hover:text-brand-700">
                      {service.name}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-brand-600 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:opacity-100 max-lg:opacity-60"
                    >
                      <ArrowIcon />
                    </span>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </Section>

      {/* 03 — What we build on. Phrased as usage, not partnership. */}
      <Section>
        <Container>
          <Reveal>
            <h2 className="max-w-2xl text-h2 font-semibold balance">
              Models We Build With.
            </h2>
            <p className="mt-6 max-w-2xl text-lead text-ink-soft pretty">
              We&rsquo;re not tied to one model. We pick per workload, on
              accuracy, latency, cost and where your data is allowed to live.
            </p>
          </Reveal>

          <LogoGrid logos={MODEL_LOGOS} className="mt-12" />
        </Container>
      </Section>

      {/* 04 — How transformation runs */}
      <Section tone="alt">
        <Container>
          <Reveal>
            <h2 className="max-w-2xl text-h2 font-semibold balance">
              From AI Opportunity To{" "}
              <span className="text-gradient">Business ROI.</span>
            </h2>
          </Reveal>

          <RevealGroup
            as="ol"
            className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
          >
            {ROI_STEPS.map((step) => (
              <RevealItem as="li" key={step.id} className="border-t border-line pt-6">
                <span className="text-sm font-semibold tabular-nums text-brand-500">
                  {step.id}
                </span>
                <h3 className="mt-3 text-xl font-semibold tracking-tight balance">
                  {step.title}
                </h3>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* 05 — Who it's for, each linking straight to the proof */}
      <Section>
        <Container>
          <Reveal>
            <h2 className="max-w-2xl text-h2 font-semibold balance">
              Built For Businesses Where Operations Matter.
            </h2>
          </Reveal>

          <RevealGroup
            as="ul"
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {INDUSTRIES.map((industry) => (
              <RevealItem as="li" key={industry.id}>
                <Link
                  href={industry.href}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors duration-200 hover:border-brand-300"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-alt">
                    <Image
                      src={industry.image}
                      alt={industry.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 320px"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="flex-1 text-lg font-semibold tracking-tight text-ink balance">
                      {industry.name}
                    </h3>

                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600">
                      {industry.linkLabel}
                      <ArrowIcon />
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* 06 — Proof */}
      <Section tone="alt">
        <Container>
          <Reveal>
            <h2 className="max-w-2xl text-h2 font-semibold balance">
              Real Businesses.{" "}
              <span className="text-gradient">Measurable Results.</span>
            </h2>
          </Reveal>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

          <Reveal className="mt-10">
            <Button href="/case-studies" variant="secondary">
              See all case studies
            </Button>
          </Reveal>
        </Container>
      </Section>

      {/* 07 — Where it runs */}
      <Section>
        <Container>
          <Reveal>
            <h2 className="max-w-2xl text-h2 font-semibold balance">
              Clouds We Deploy On.
            </h2>
            <p className="mt-6 max-w-2xl text-lead text-ink-soft pretty">
              Your infrastructure or ours, in the region your obligations
              require.
            </p>
          </Reveal>

          <LogoGrid logos={CLOUD_LOGOS} className="mt-12" />

          {/* 08 — Closing CTA (unchanged) */}
          <BannerCTA className="mt-20" />
        </Container>
      </Section>
    </>
  );
}

function OfferIcon({ index }: { index: number }) {
  const props = {
    width: 20,
    height: 20,
    viewBox: "0 0 20 20",
    fill: "none",
    "aria-hidden": true,
  } as const;
  const stroke = {
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (index) {
    case 0: // Custom AI Automation
      return (
        <svg {...props}>
          <path d="M10 2 11.6 8.4 18 10 11.6 11.6 10 18 8.4 11.6 2 10 8.4 8.4Z" fill="currentColor" />
        </svg>
      );
    case 1: // Custom Software Development
      return (
        <svg {...props}>
          <path d="M7 6.5 3 10l4 3.5M13 6.5l4 3.5-4 3.5M11.3 5 8.7 15" {...stroke} />
        </svg>
      );
    case 2: // Document AI
      return (
        <svg {...props}>
          <path d="M6 3h6l3 3v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" {...stroke} />
          <path d="M12 3v3h3M7 10.5h6M7 13.5h6" {...stroke} />
        </svg>
      );
    case 3: // Voice AI
      return (
        <svg {...props}>
          <path d="M10 3a2.5 2.5 0 0 1 2.5 2.5v4a2.5 2.5 0 0 1-5 0v-4A2.5 2.5 0 0 1 10 3Z" {...stroke} />
          <path d="M5.5 9.5a4.5 4.5 0 0 0 9 0M10 14v3" {...stroke} />
        </svg>
      );
    case 4: // Chat AI
      return (
        <svg {...props}>
          <path d="M4.5 4h11a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5H9.5L6 17v-3H4.5A1.5 1.5 0 0 1 3 12.5v-7A1.5 1.5 0 0 1 4.5 4Z" {...stroke} />
          <path d="M7 8h6M7 10.5h3.5" {...stroke} />
        </svg>
      );
    default: // Developer Staff Augmentation
      return (
        <svg {...props}>
          <circle cx="8" cy="7" r="2.6" {...stroke} />
          <path d="M3 17a5 5 0 0 1 10 0M14 4.6a2.6 2.6 0 0 1 0 4.8M15.5 12.2A5 5 0 0 1 18 17" {...stroke} />
        </svg>
      );
  }
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.5 8h9M8.5 3.5 13 8l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

