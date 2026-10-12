import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/content/case-studies";
import { CARDS } from "@/content/demos/cards";
import { PRODUCTS } from "@/content/products";
import { SERVICES } from "@/content/services";
import { WRITE_UPS } from "@/content/case-write-ups";

const SITE_URL = "https://zryth.com";

/** Static, always-present routes. Dynamic slugs are appended below. */
const STATIC_ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/services", priority: 0.9 },
  { path: "/transformation", priority: 0.9 },
  { path: "/case-studies", priority: 0.9 },
  { path: "/products", priority: 0.9 },
  { path: "/about", priority: 0.6 },
  { path: "/get-started", priority: 0.9 },
  { path: "/privacy-policy", priority: 0.3 },
  { path: "/terms-and-conditions", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries = STATIC_ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority,
  }));

  const caseStudyEntries = CASE_STUDIES.map((study) => ({
    url: `${SITE_URL}/case-studies/${study.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const walkthroughEntries = CARDS.map((card) => ({
    url: `${SITE_URL}${card.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const serviceEntries = SERVICES.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const productEntries = PRODUCTS.map((product) => ({
    url: `${SITE_URL}/products/${product.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const researchEntries = WRITE_UPS.map((item) => ({
    url: `${SITE_URL}/case-studies/${item.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...caseStudyEntries, ...walkthroughEntries, ...serviceEntries, ...productEntries, ...researchEntries];
}
