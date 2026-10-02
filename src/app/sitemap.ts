import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/content/case-studies";
import { PRODUCTS } from "@/content/products";
import { RESEARCH_WORK } from "@/content/research-work";

const SITE_URL = "https://zryth.com";

/** Static, always-present routes. Dynamic slugs are appended below. */
const STATIC_ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/transformation", priority: 0.9 },
  { path: "/case-studies", priority: 0.9 },
  { path: "/products", priority: 0.9 },
  { path: "/research-work", priority: 0.7 },
  { path: "/about", priority: 0.6 },
  { path: "/get-started", priority: 0.9 },
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

  const productEntries = PRODUCTS.map((product) => ({
    url: `${SITE_URL}/products/${product.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const researchEntries = RESEARCH_WORK.map((item) => ({
    url: `${SITE_URL}/research-work/${item.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...caseStudyEntries, ...productEntries, ...researchEntries];
}
