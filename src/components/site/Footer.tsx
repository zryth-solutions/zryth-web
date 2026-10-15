import Link from "next/link";
import { Container } from "@/components/ui/Layout";
import { Wordmark } from "@/components/site/Wordmark";
import { CredentialBadges } from "@/components/site/Credentials";
import { FooterCTA } from "@/components/site/FooterCTA";
import {
  ADDRESS,
  EMAILS,
  PHONE,
  MAP_LINK,
  LINKEDIN_URL,
  INSTAGRAM_URL,
} from "@/content/contact";

const socials = [
  {
    href: LINKEDIN_URL,
    label: "Zryth on LinkedIn",
    background: "#0A66C2",
    icon: LinkedInGlyph,
  },
  {
    href: INSTAGRAM_URL,
    label: "Zryth on Instagram",
    background:
      "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
    icon: InstagramGlyph,
  },
];

const columns = [
  {
    title: "Company",
    links: [
      { href: "/transformation", label: "Success Stories" },
      { href: "/case-studies", label: "Case Studies" },
      { href: "/about", label: "About" },
    ],
  },
  {
    title: "Build",
    links: [
      { href: "/services", label: "Services" },
      { href: "/products", label: "Our Work" },
      { href: "/get-started", label: "Get started" },
    ],
  },
];

const linkClass =
  "inline-flex min-h-8 items-center text-sm lg:min-h-11 text-ink-soft transition-colors hover:text-brand-600";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface-alt">
      {/* Closing CTA — hidden on pages that close with their own. */}
      <FooterCTA />

      <div className="border-t border-line">
        <Container className="flex flex-col gap-8 py-12 lg:gap-12 sm:py-16 lg:flex-row lg:justify-between">
          <div className="max-w-xs">
            <Wordmark />
            <p className="mt-4 text-body text-ink-muted pretty">
              We use AI and software to improve how your business operates:
              less manual work, better visibility, faster decisions.
            </p>
            <CredentialBadges className="mt-6" />

            <div className="mt-6 flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  style={{ background: social.background }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-white"
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-10 lg:gap-24">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="label text-ink-faint">
                  {col.title}
                </h3>
                <ul className="mt-3 space-y-1 lg:mt-5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3 className="label text-ink-faint">Contact</h3>
              <ul className="mt-3 space-y-1 lg:mt-5">
                <li>
                  <a href={`tel:${PHONE}`} className={linkClass}>
                    {PHONE}
                  </a>
                </li>
                {EMAILS.map((email) => (
                  <li key={email}>
                    <a href={`mailto:${email}`} className={linkClass}>
                      {email}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={MAP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block max-w-[16rem] py-1 text-sm text-ink-soft pretty transition-colors hover:text-brand-600"
                  >
                    {ADDRESS}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-2 py-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Zryth Solutions Private Limited. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <Link href="/privacy-policy" className="transition-colors hover:text-brand-600">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="transition-colors hover:text-brand-600">
              Terms &amp; Conditions
            </Link>
            <span>From work. To done.</span>
          </nav>
        </Container>
      </div>
    </footer>
  );
}

function LinkedInGlyph() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45Z" />
    </svg>
  );
}

function InstagramGlyph() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="#ffffff" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.6" stroke="#ffffff" strokeWidth="1.8" />
      <circle cx="17.35" cy="6.65" r="1.15" fill="#ffffff" />
    </svg>
  );
}
