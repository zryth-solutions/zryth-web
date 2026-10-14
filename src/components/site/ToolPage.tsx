import Link from "next/link";
import { Container, Section, Eyebrow } from "@/components/ui/Layout";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/site/PageHero";
import { ToolIcon } from "@/components/site/ToolIcon";
import { getTool, toolExternalHref, toolHref, type Tool } from "@/content/tools";

const SITE = "https://zryth.com";

/** Cards linking to other tool pages. */
export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={toolHref(tool.slug)}
      className="group flex h-full flex-col rounded-xl border border-line bg-surface p-7 transition-colors duration-200 hover:border-brand-300"
    >
      <span className="flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
        <ToolIcon slug={tool.slug} />
      </span>
      <h3 className="mt-6 text-h3 font-semibold balance">{tool.name}</h3>
      <p className="mt-3 flex-1 text-body text-ink-soft pretty">{tool.blurb}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-brand-600">
        Learn more
        <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </Link>
  );
}

function TryNow({ tool, className = "" }: { tool: Tool; className?: string }) {
  return (
    <Button href={toolExternalHref(tool.slug)} className={className}>
      Try now
      <span aria-hidden="true">↗</span>
    </Button>
  );
}

function jsonLd(tool: Tool) {
  const url = `${SITE}${toolHref(tool.slug)}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: tool.title.replace(/^Free /, ""),
      url,
      description: tool.description,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      publisher: { "@type": "Organization", name: "Zryth Solutions", url: SITE },
      installUrl: toolExternalHref(tool.slug),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: tool.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Zryth", item: SITE },
        { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE}/resources/tools` },
        { "@type": "ListItem", position: 3, name: tool.name, item: url },
      ],
    },
  ];
}

/** One tool, described on zryth.com, with a Try now button that opens the tool itself. */
export function ToolPage({ tool }: { tool: Tool }) {
  const related = tool.related.map((s) => getTool(s)).filter((t): t is Tool => Boolean(t));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(tool)) }} />

      <PageHero eyebrow="Resources · Tools" lines={[...tool.heroLines]} gradientFrom={1}>
        <p className="text-lead text-ink-soft pretty">{tool.lead}</p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <TryNow tool={tool} />
          <Button href="/resources/tools" variant="secondary">
            All tools
          </Button>
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-muted">
          {tool.badges.map((b) => (
            <li key={b} className="flex items-center gap-2">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-500" />
              {b}
            </li>
          ))}
        </ul>
      </PageHero>

      {/* How it works */}
      <Section tone="alt">
        <Container>
          <Reveal>
            <Eyebrow as="h2">How it works</Eyebrow>
            <p className="mt-6 max-w-2xl text-h2 font-semibold balance">
              {tool.steps.length} steps, and it&rsquo;s done.
            </p>
          </Reveal>
          <RevealGroup as="ol" className="mt-12 grid gap-6 lg:grid-cols-3">
            {tool.steps.map((step, i) => (
              <RevealItem as="li" key={step.title}>
                <div className="h-full rounded-xl border border-line bg-surface p-7">
                  <span className="flex size-9 items-center justify-center rounded-full bg-brand-50 text-sm font-semibold text-brand-600">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 text-h3 font-semibold balance">{step.title}</h3>
                  <p className="mt-3 text-body text-ink-soft pretty">{step.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-10">
            <TryNow tool={tool} />
          </Reveal>
        </Container>
      </Section>

      {/* Use cases */}
      <Section>
        <Container>
          <Reveal>
            <Eyebrow as="h2">Put it to work</Eyebrow>
            <p className="mt-6 max-w-2xl text-h2 font-semibold balance">Where a {tool.name} earns its place.</p>
          </Reveal>
          <RevealGroup as="ul" className="mt-12 grid gap-6 lg:grid-cols-3">
            {tool.useCases.map((u) => (
              <RevealItem as="li" key={u.title}>
                <div className="h-full border-t border-line pt-6">
                  <h3 className="text-h3 font-semibold balance">{u.title}</h3>
                  <p className="mt-3 text-body text-ink-soft pretty">{u.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Static vs dynamic, where it helps */}
      {tool.compare && (
        <Section tone="alt">
          <Container>
            <Reveal>
              <Eyebrow as="h2">{tool.compare.heading}</Eyebrow>
              <p className="mt-6 max-w-2xl text-h2 font-semibold balance">Pick the one that fits the job.</p>
            </Reveal>
            <RevealGroup as="div" className="mt-12 grid gap-6 md:grid-cols-2">
              {tool.compare.rows.map((r) => (
                <RevealItem key={r.label}>
                  <div className="h-full rounded-xl border border-line bg-surface p-7">
                    <h3 className="text-h3 font-semibold">{r.label}</h3>
                    <p className="mt-3 text-body text-ink-soft pretty">{r.body}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </Section>
      )}

      {/* Tips + FAQ */}
      <Section tone={tool.compare ? "default" : "alt"}>
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <Eyebrow as="h2">Good to know</Eyebrow>
              <p className="mt-6 text-h3 font-semibold balance">Tips for a code that scans first time.</p>
              <ul className="mt-8 space-y-4 text-body text-ink-soft">
                {tool.tips.map((t) => (
                  <li key={t} className="flex gap-4">
                    <span aria-hidden="true" className="mt-[0.6rem] size-1.5 shrink-0 rounded-full bg-brand-500" />
                    <span className="pretty">{t}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-7">
              <Eyebrow as="h2">Questions</Eyebrow>
              <p className="mt-6 text-h3 font-semibold balance">Your questions, answered.</p>
              <div className="mt-8 divide-y divide-line border-y border-line">
                {tool.faqs.map((f) => (
                  <details key={f.q} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[1.0625rem] font-medium text-ink [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <span
                        aria-hidden="true"
                        className="mt-0.5 text-xl leading-none text-brand-600 transition-transform duration-200 group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-3 max-w-xl text-body text-ink-soft pretty">{f.a}</p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Try now band */}
      <Section>
        <Container>
          <Reveal>
            <div className="flex flex-col gap-8 rounded-2xl bg-[linear-gradient(104deg,var(--color-brand-800)_0%,var(--color-brand-600)_55%,var(--color-brand-500)_100%)] px-7 py-10 sm:px-12 sm:py-12 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <p className="label text-brand-100">Zryth Tools</p>
                <h2 className="mt-3 text-h3 font-semibold text-white balance">Ready to make yours?</h2>
                <p className="mt-3 text-body text-white/85 pretty">
                  The {tool.name} tool is free and opens on tools.zryth.com.
                </p>
              </div>
              <a
                href={toolExternalHref(tool.slug)}
                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-7 text-[0.9375rem] font-semibold text-brand-700 transition-colors hover:bg-brand-50"
              >
                Try now <span aria-hidden="true">↗</span>
              </a>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* More tools */}
      <Section tone="alt">
        <Container>
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow as="h2">More tools</Eyebrow>
              <p className="mt-6 text-h3 font-semibold balance">Find your next little shortcut.</p>
            </div>
            <Link href="/resources/tools" className="text-[0.9375rem] font-medium text-brand-600 hover:text-brand-800">
              All tools →
            </Link>
          </Reveal>
          <RevealGroup as="ul" className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((t) => (
              <RevealItem as="li" key={t.slug}>
                <ToolCard tool={t} />
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-20 border-t border-line pt-12">
            <p className="label text-brand-600">Built by Zryth</p>
            <p className="mt-4 max-w-2xl text-h3 font-semibold balance">
              Need something bigger than a tool? We build custom AI and software for businesses.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/services">Explore our services</Button>
              <Button href="/get-started" variant="secondary">
                Start with one workflow
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
