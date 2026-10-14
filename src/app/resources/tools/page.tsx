import type { Metadata } from "next";
import { Container, Section, Eyebrow } from "@/components/ui/Layout";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/site/PageHero";
import { ToolCard } from "@/components/site/ToolPage";
import { COMING_SOON, TOOLS, TOOLS_SITE } from "@/content/tools";

const TITLE = "Free Tools";
const DESCRIPTION =
  "Free everyday tools from Zryth: URL, dynamic, WhatsApp, WiFi and vCard QR code generators. Pick a tool, learn how it works, and try it free.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "free QR code generator",
    "QR code tools",
    "WhatsApp QR code",
    "WiFi QR code",
    "vCard QR code",
    "dynamic QR code",
    "free online tools",
  ],
  alternates: { canonical: "/resources/tools" },
  openGraph: { title: `${TITLE} | Zryth`, description: DESCRIPTION, url: "/resources/tools", type: "website" },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Zryth free tools",
  itemListElement: TOOLS.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.title,
    url: `https://zryth.com/resources/tools/${t.slug}`,
  })),
};

export default function ToolsHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />

      <PageHero eyebrow="Resources · Tools" lines={["Small tools.", "Big possibilities."]} gradientFrom={1}>
        <p className="text-lead text-ink-soft pretty">
          Simple, free tools that make everyday work easier. We&rsquo;re starting with QR codes. Open any tool to see
          what it does and how it works, then try it.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={TOOLS_SITE}>
            Open Zryth Tools <span aria-hidden="true">↗</span>
          </Button>
        </div>
      </PageHero>

      <Section tone="alt">
        <Container>
          <Reveal>
            <Eyebrow as="h2">QR code tools</Eyebrow>
            <p className="mt-6 max-w-2xl text-h2 font-semibold balance">Five ways to make a QR code useful.</p>
          </Reveal>
          <RevealGroup as="ul" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((tool) => (
              <RevealItem as="li" key={tool.slug}>
                <ToolCard tool={tool} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <Eyebrow as="h2">Coming soon</Eyebrow>
            <p className="mt-6 max-w-2xl text-h2 font-semibold balance">More tools are on the way.</p>
            <p className="mt-6 max-w-2xl text-lead text-ink-soft pretty">
              These categories are planned and not available yet.
            </p>
          </Reveal>
          <RevealGroup as="ul" className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {COMING_SOON.map((c) => (
              <RevealItem as="li" key={c.name} className="border-t border-line pt-5">
                <p className="text-[1.0625rem] font-semibold text-ink">{c.name}</p>
                <p className="mt-1 text-body text-ink-muted">{c.line}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="alt">
        <Container>
          <Reveal>
            <p className="label text-brand-600">Built by Zryth</p>
            <p className="mt-4 max-w-2xl text-h3 font-semibold balance">
              The same focus on removing repetitive work, applied to your business.
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
