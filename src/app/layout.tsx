import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://zryth.com";

/**
 * Site-wide fallback keywords. Individual pages set their own, more specific
 * `keywords` in their own metadata — Next merges arrays, closest page wins
 * for title/description but keywords accumulate, so keep this list to broad,
 * always-true terms rather than duplicating page-level ones.
 */
const SITE_KEYWORDS = [
  "AI automation company",
  "AI transformation consulting",
  "business process automation",
  "AI agent for business",
  "custom AI software development",
  "AI consulting India",
  "enterprise AI solutions",
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Zryth: Outsource Your AI Development To Us",
    template: "%s | Zryth",
  },
  description:
    "Outsource your AI development to Zryth. We design, build and deploy custom AI and business software for your business, or you can deploy AI products we have already built.",
  keywords: SITE_KEYWORDS,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Zryth: Outsource Your AI Development To Us",
    description:
      "Two ways we create business value: custom AI development built for you, or products ready to deploy.",
    type: "website",
    url: SITE_URL,
    siteName: "Zryth",
    locale: "en_IN",
    images: [{ url: "/zryth-logo.png", width: 1804, height: 473, alt: "Zryth" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zryth: Outsource Your AI Development To Us",
    description:
      "Two ways we create business value: custom AI development built for you, or products ready to deploy.",
    images: ["/zryth-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Zryth",
  url: SITE_URL,
  logo: `${SITE_URL}/zryth-logo.png`,
  description:
    "Zryth builds custom AI and software for businesses that want to outsource their AI development, and offers ready-to-deploy AI products.",
  sameAs: [
    "https://www.linkedin.com/company/zryth/posts/?feedView=all",
    "https://www.instagram.com/zryth_solutions",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9870661438",
    contactType: "sales",
    areaServed: "IN",
  },
};

const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Zryth",
  url: SITE_URL,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={workSans.variable}>
      <head>
        {/*
          Reveal animations server-render with opacity:0 and wait for JS. If JS
          never runs, force every animated element to its final state so the page
          is still readable rather than blank.
        */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }}
        />
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:rounded-full focus:bg-brand-500 focus:px-5 focus:py-3 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
