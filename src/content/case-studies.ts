/**
 * Case Studies — uses the shared editorial article template (see
 * src/components/site/ArticleTemplate.tsx), the same one Products and
 * Research Work use. `body` is an ordered list of blocks (heading /
 * subheading / paragraph / image) rendered top to bottom, exactly like a
 * Medium article: add, remove or reorder blocks freely, the page just
 * renders whatever's here.
 *
 * Do not invent numbers or testimonials — if a real metric or quote isn't
 * available yet, leave it out of the narrative rather than filling in a
 * placeholder figure.
 */

import type { ArticleData } from "@/components/site/ArticleTemplate";

export type CaseStudy = ArticleData & {
  /** Optional link to the related product, shown as a plain text link. */
  productHref?: string;
  productLabel?: string;
  /** Used for the search/filter chips on the case studies index. */
  tags: string[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "mill-software",
    category: "Milling Industry",
    title: "Running a Mill on Phone Calls and Memory",
    subtitle:
      "How Mill Software connected procurement, reconciliation and sales into one accurate system, instead of three disconnected manual processes.",
    author: "Zryth Research",
    publishedDate: "September 2026",
    readingTime: "4 min read",
    heroImageLabel: "[Mill Software operations dashboard]",
    heroImageSrc: "/products/mill-software-banner.png",
    heroImageRatio: "aspect-[1366/768]",
    productHref: "/products/mill-software",
    productLabel: "See the product: Mill Software",
    tags: ["Document AI", "Automation", "Manufacturing"],
    body: [
      {
        type: "heading",
        text: "Procurement, reconciliation and sales, each running on its own",
      },
      {
        type: "paragraph",
        text: "Purchase orders were raised over calls and messages with brokers and suppliers, bills were matched against them by hand, and sales orders, dispatches and billing lived in their own separate trail. None of the three talked to each other, so accuracy depended entirely on whoever was reconciling that day, and growing the business meant growing the number of people doing that reconciliation.",
      },
      { type: "heading", text: "Procurement that tracks itself" },
      {
        type: "paragraph",
        text: "Purchase orders can now be created and shared directly, and brokers can raise POs on the mill's behalf while tracking their own orders, commissions and deductions, instead of every order being relayed over a phone call.",
      },
      { type: "heading", text: "Reconciliation the system does automatically" },
      {
        type: "paragraph",
        text: "Matching a purchase order against the bill that eventually arrives, and tracking partial deliveries against it, used to mean repeated manual checking. The system reconciles POs and bills automatically, tracks what's still outstanding, checks rates, and flags the moment an order is fully delivered.",
      },
      {
        type: "image",
        label: "[PO and bill reconciliation, automated]",
        src: "/products/mill-software-po-reconciliation.png",
        ratio: "aspect-[1366/768]",
      },
      { type: "heading", text: "Sales, dispatch and billing, in one trail" },
      {
        type: "paragraph",
        text: "Sales orders, dispatch verification and billing used to sit in separate records that had to be cross-checked by hand. They now run through one connected process, with party information pulled straight from Tally instead of re-entered.",
      },
      {
        type: "image",
        label: "[Sales and dispatch, connected to billing]",
        src: "/products/mill-software-truck-in-out.png",
        ratio: "aspect-[1366/768]",
      },
      { type: "heading", text: "The result: accuracy that scales with volume" },
      {
        type: "paragraph",
        text: "Reconciliation errors that used to depend on how careful that day's manual check happened to be now get caught by the system on every order, not just the ones someone had time to double-check. That accuracy held even as the number of suppliers, brokers and orders grew, because the system, not a person, was doing the matching.",
      },
      { type: "heading", text: "The takeaway" },
      {
        type: "paragraph",
        text: "The mill didn't just digitise procurement, reconciliation and sales. It removed the ceiling that manual reconciliation put on how much volume the business could handle accurately, which is what actually let it grow.",
      },
    ],
    closingNote:
      "How Mill Software connected procurement, reconciliation and sales into one accurate system, removing the manual ceiling on how much volume the business could handle.",
  },
  {
    slug: "audit-firm-transformation",
    category: "Audit & Compliance",
    title: "Audits That Used To Take Days, Now Take Hours",
    subtitle:
      "How an AI-powered audit platform helped a CA firm run statutory audits faster and at a fraction of the manual cost.",
    author: "Zryth Research",
    publishedDate: "September 2026",
    readingTime: "4 min read",
    heroImageLabel: "[Audit reconciliation dashboard]",
    heroImageSrc: "/products/finance-auditor-banner-2.png",
    heroImageRatio: "aspect-[1366/768]",
    productHref: "/products/finance-auditor",
    productLabel: "See the product: FinanceAuditor.ai",
    tags: ["Document AI", "Automation", "Finance"],
    body: [
      { type: "heading", text: "An audit spread across four disconnected systems" },
      {
        type: "paragraph",
        text: "The firm's auditors worked across Tally, the GST portal, TRACES and a stack of Excel sheets, pulling ledgers from one, GST returns from another, TDS data from a third, then reconciling all of it by hand before a Balance Sheet, P&L or tax audit report could even be drafted. Manual reconciliation this scattered was slow, and every manual step was another place an error could hide.",
      },
      { type: "heading", text: "One platform instead of four" },
      {
        type: "paragraph",
        text: "FinanceAuditor.ai brought the audit into one place: Tally data fetched directly through a connector, GST and TDS data fetched and matched automatically, and anomalies flagged before they became findings someone had to catch by hand.",
      },
      {
        type: "image",
        label: "[Ledgers, GST and TDS reconciled automatically]",
        src: "/products/finance-auditor-gst-tds-reconciliation.webp",
        ratio: "aspect-[2000/1250]",
      },
      { type: "heading", text: "Financials generated, not typed" },
      {
        type: "paragraph",
        text: "Once the underlying data was reconciled, the Balance Sheet, the Statement of Profit & Loss and the Form 3CA/3CB-3CD tax audit report could be generated directly from it, ready to file, instead of assembled by hand from four different sources.",
      },
      {
        type: "image",
        label: "[Auto-generated financials and tax audit report]",
        src: "/products/finance-auditor-tax-audit-report.webp",
        ratio: "aspect-[2000/1250]",
      },
      { type: "heading", text: "The result: faster audits, at a lower cost" },
      {
        type: "paragraph",
        text: "The firm now runs audits roughly 60% faster, with about 80% fewer manual errors, a full 12 months of GST and TDS reconciled automatically, and four separate tools replaced by one.",
      },
      {
        type: "paragraph",
        text: "“GST and TDS reconciliation and the tax audit report that used to take days are now ready in hours,” one auditor at the firm said.",
      },
      { type: "heading", text: "The takeaway" },
      {
        type: "paragraph",
        text: "The firm didn't just speed up data entry. It removed the manual reconciliation step that used to set the pace, and the cost, of the entire audit.",
      },
    ],
    closingNote:
      "How an AI-powered audit platform helped a CA firm cut audit time by 60% and manual errors by 80%, replacing four tools with one.",
  },
  {
    slug: "publisher-ai-transformation",
    category: "Publishing",
    title: "One Publisher, Every Stage Rebuilt With AI",
    subtitle:
      "How a publisher used AI to generate and check content, run its warehouse, and reach students directly with its own AI study product.",
    author: "Zryth Research",
    publishedDate: "September 2026",
    readingTime: "5 min read",
    heroImageLabel: "[Publisher operations, before and after AI]",
    heroImageSrc: "/products/ai-education-banner.png",
    heroImageRatio: "aspect-[1366/768]",
    productHref: "/products/ai-education",
    productLabel: "See the product: Oswaal AI",
    tags: ["Chat AI", "Document AI", "Education"],
    body: [
      { type: "heading", text: "A publisher with AI needs at every stage, not just one" },
      {
        type: "paragraph",
        text: "A publisher's work doesn't stop at printing a book. Content has to be written and checked, stock has to move through a warehouse, and increasingly, students expect to reach the material directly on their phone, not just on a shelf. Each of these was its own slow, manual bottleneck.",
      },
      { type: "heading", text: "Content that used to be written and checked by hand" },
      {
        type: "paragraph",
        text: "Producing mock tests and study material meant writing content and then checking it against source material by hand, question by question. AI now sits at both ends of that pipeline, drafting study content faster, and verifying it against the source before it ships.",
      },
      { type: "subheading", text: "Extraction that pays for itself" },
      {
        type: "paragraph",
        text: "For one workflow alone, turning mock-test PDFs into structured, checked questions, a hybrid AI and OCR pipeline cut the cost per question from roughly ₹12 to ₹5 and cut processing time by about 83%, at an accuracy the manual process couldn't consistently hit on complex or handwritten content.",
      },
      {
        type: "image",
        label: "[Manual content checking, before AI]",
        src: "/research-work/mock-test-manual-entry.jpg",
        ratio: "aspect-[1284/677]",
      },
      { type: "heading", text: "Warehousing that runs on visibility, not memory" },
      {
        type: "paragraph",
        text: "Physical stock moving in and out of the warehouse used to be tracked with less visibility than anyone would like, and errors surfaced only once a shipment didn't match what was expected. AI-assisted tracking gave the publisher a clearer, more current picture of what stock actually existed and where it was, catching mismatches before they became a customer's problem.",
      },
      {
        type: "image",
        label: "[Warehouse stock tracking]",
        src: "/products/ai-education-warehouse.jpg",
        ratio: "aspect-[1200/1600]",
      },
      { type: "heading", text: "Reaching students directly, not just through a book" },
      {
        type: "paragraph",
        text: "The bigger shift was building a direct relationship with the end reader. Oswaal AI turned the publisher's content into a chapter-wise AI learning hub, podcasts, auto-generated slides, mind maps, an AI chat for doubts, adaptive tests and revision tools, so a student's relationship is with the publisher's AI product, not just its books on a shelf.",
      },
      {
        type: "paragraph",
        text: "Students using it report roughly 50% less time spent on revision and around 30% higher test scores, with more than five separate study tools now living inside one app instead of five.",
      },
      {
        type: "image",
        label: "[Oswaal AI, the direct-to-student product]",
        src: "/products/ai-education-ai-chat.webp",
        ratio: "aspect-[2000/1129]",
      },
      { type: "heading", text: "The result: one AI foundation, four different jobs" },
      {
        type: "paragraph",
        text: "Content generation, content verification, warehouse visibility and a direct-to-student product now run on the same underlying AI capability, instead of four separate, one-off efforts. What started as a way to check mock-test questions faster became the foundation for how the publisher reaches its readers directly.",
      },
      { type: "heading", text: "The takeaway" },
      {
        type: "paragraph",
        text: "The value wasn't in any single AI feature. It was in building AI as shared infrastructure across content, operations and the product itself, so each new use case got cheaper and faster to add than the last.",
      },
    ],
    closingNote:
      "How a publisher used one AI foundation to generate and check content, run its warehouse and reach students directly with its own AI study product.",
  },
];

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

/**
 * The next study in the list, wrapping around, used for the closing nav.
 * Returns undefined when there's nothing else to show (e.g. only one study).
 */
export function getNextCaseStudy(slug: string) {
  if (CASE_STUDIES.length <= 1) return undefined;
  const i = CASE_STUDIES.findIndex((c) => c.slug === slug);
  return CASE_STUDIES[(i + 1) % CASE_STUDIES.length];
}
