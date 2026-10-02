/**
 * Homepage content. Positioning: one identity — an AI Labs & Software
 * Studio — proven by one list of what we build. Previously this was split
 * into two competing "ways" (AI transformation vs. products/services), which
 * duplicated the ROI_STEPS methodology below it and read as two pitches
 * instead of one. Keep it to one message; add depth on /transformation and
 * /products instead of re-arguing the pitch here.
 */

export const STUDIO_OFFER = {
  eyebrow: "AI Labs & Software Studio",
  title: "Zryth Helps With",
  lead: "Ready-to-deploy AI products, or custom AI and software built around what you need.",
  items: [
    "Custom AI Automation",
    "Custom Software Development",
    "Document AI",
    "Voice AI",
    "Ready to Deploy Products",
  ],
  href: "/products",
  cta: "Explore Products & Services",
  secondaryHref: "/transformation",
  secondaryCta: "View success stories",
};

export const ROI_STEPS = [
  { id: "01", title: "Understand Your Business" },
  { id: "02", title: "Build Your AI Strategy" },
  { id: "03", title: "Implement AI" },
  { id: "04", title: "Train Teams & Measure ROI" },
];

/**
 * Kept to the industries we can back with a real case study or product,
 * each linking straight there — this list is proof, not a coverage map.
 */
export const INDUSTRIES = [
  {
    id: "manufacturing",
    name: "Manufacturing & Industrial",
    href: "/case-studies/mill-software",
    linkLabel: "See the case study",
    image: "/industries/manufacturing.jpg",
  },
  {
    id: "publishing",
    name: "Printing & Publishing",
    href: "/case-studies/publisher-ai-transformation",
    linkLabel: "See the case study",
    image: "/industries/publishing.jpg",
  },
  {
    id: "logistics",
    name: "Logistics & Warehousing",
    href: "/products/mill-software",
    linkLabel: "See the product",
    image: "/industries/logistics.jpg",
  },
  {
    id: "finance",
    name: "Finance",
    href: "/case-studies/audit-firm-transformation",
    linkLabel: "See the case study",
    image: "/industries/finance.jpg",
  },
];

export const USE_CASES = [
  "Production Planning",
  "Quality Inspection",
  "Procurement",
  "Inventory",
  "Document Automation",
  "Finance & Reconciliation",
  "Sales & Customer Support",
  "Predictive Maintenance",
  "Computer Vision",
  "Management Reporting",
  "AI Agents & Workflow Automation",
];

export const INDUSTRY_PRODUCTS = [
  {
    name: "FinanceAuditor.ai",
    line: "AI-assisted audit and reconciliation.",
    href: "/products/finance-auditor",
  },
  {
    name: "Mill Software",
    line: "One digital operating system for mill operations.",
    href: "/products/mill-software",
  },
  {
    name: "Oswaal AI",
    line: "Chapter-wise learning, doubt-solving and tests in one AI hub.",
    href: "/products/ai-education",
  },
];

/**
 * Results are shown as direction of change until verified numbers exist.
 * Replace the arrows with real figures only where they can be substantiated.
 */
export const RESULTS = [
  {
    sector: "Textile Manufacturing",
    headline: "Manual Mill Operations To One Digital System",
    metrics: ["Inventory ↓", "Visibility ↑"],
    href: "/case-studies/mill-software",
    /** Set a path under /public to replace the placeholder panel. */
    image: "/products/mill-software-banner.png" as string | undefined,
    imageAlt: "Mill operations dashboard",
  },
  {
    sector: "Finance & Audit",
    headline: "Audit Preparation To AI-Assisted Review",
    metrics: ["Prep Time ↓", "Capacity ↑"],
    href: "/case-studies/audit-firm-transformation",
    image: "/products/finance-auditor-banner-2.png" as string | undefined,
    imageAlt: "Audit reconciliation screen",
  },
  {
    sector: "Education",
    headline: "One Pace For All To A Tutor For Each Student",
    metrics: ["Access ↑", "Teacher Load ↓"],
    href: "/case-studies/publisher-ai-transformation",
    image: "/products/ai-education-banner.png" as string | undefined,
    imageAlt: "AI tutoring session",
  },
];
