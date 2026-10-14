/**
 * Products — uses the shared editorial article template (see
 * src/components/site/ArticleTemplate.tsx), the same one Case Studies and
 * the case studies use. `body` is an ordered list of blocks (heading /
 * subheading / paragraph / image) rendered top to bottom, exactly like a
 * Medium article: add, remove or reorder blocks freely, the page just
 * renders whatever's here.
 *
 * Distinct from case-studies.ts (client transformation narratives): this
 * describes the products themselves, what they do and who they're for. A
 * product may optionally point to a related case study via `caseStudyHref`,
 * shown as a plain text link, but its own page never redirects there —
 * /products/[slug] is always where "See product" lands.
 */

import type { ArticleData } from "@/components/site/ArticleTemplate";

export type Product = ArticleData & {
  /** Optional link to a related case study, shown as a plain text link. */
  caseStudyHref?: string;
  /** Optional downloadable brochure, shown as a button under the byline. */
  brochureHref?: string;
  brochureLabel?: string;
  /** Where people can try the live product: website and app stores. */
  liveLinks?: LiveLink[];
};

export type LiveLink = { kind: "website" | "playstore" | "appstore"; href: string };

export const PRODUCTS: Product[] = [
  {
    slug: "ai-education",
    category: "Education",
    title: "Oswaal AI",
    subtitle: "One AI hub for every chapter, doubt and test.",
    author: "Zryth Product Team",
    publishedDate: "September 2026",
    readingTime: "4 min read",
    heroImageLabel: "[Oswaal AI: chapter-wise learning hub, home screen]",
    heroImageSrc: "/products/ai-education-banner.png",
    heroImageRatio: "aspect-[16/9]",
    body: [
      { type: "heading", text: "Everything a student needs in one place" },
      {
        type: "paragraph",
        text: "Students used to switch between apps and textbooks for notes, doubts, tests and revision, working through slow, generic study material with no help built around them personally. Oswaal AI brings all of it into one place, chapter-wise study, AI doubt-solving, custom tests, games and revision tools, for instant, exam-focused learning built around each student's own board, exam and book. It saves time, clears doubts faster and makes exam preparation smarter.",
      },
      { type: "heading", text: "Study a chapter the way that works for you" },
      {
        type: "paragraph",
        text: "Learn opens any book chapter-wise in one smart learning hub, with a switcher for how to study it, Podcast, PPT, Mindmap, Flashcards or more, plus past year papers and current affairs alongside it.",
      },
      {
        type: "image",
        label: "[A chapter's book card, with Podcast, PPT and Mindmap buttons plus Past Year Papers and Current Affairs]",
        src: "/products/ai-education-book-card.webp",
        ratio: "aspect-[16/9]",
      },
      { type: "subheading", text: "Podcast and PPT, for listening and watching" },
      {
        type: "paragraph",
        text: "Podcast turns the chapter into an audio lesson to play on the go, and PPT auto-generates narrated chapter slides for a quick visual pass.",
      },
      {
        type: "image",
        label: "[Podcast: a chapter as an audio lesson]",
        src: "/products/ai-education-podcast.webp",
        ratio: "aspect-[16/9]",
      },
      {
        type: "image",
        label: "[PPT: auto-generated, narrated chapter slides]",
        src: "/products/ai-education-ppt.webp",
        ratio: "aspect-[16/9]",
      },
      { type: "subheading", text: "Mindmap and Flashcards, for making it stick" },
      {
        type: "paragraph",
        text: "Mindmap lays out a chapter's key concepts and how they connect, and Flashcards give quick, bite-sized cards for recall and revision.",
      },
      {
        type: "image",
        label: "[Mindmap: a chapter's key concepts, connected]",
        src: "/products/ai-education-mindmap.webp",
        ratio: "aspect-[16/9]",
      },
      { type: "subheading", text: "Doubts answered instantly" },
      {
        type: "paragraph",
        text: "AI Chat answers doubts scoped to the selected subject and chapter, while the Guide Agent works like a ChatGPT-style assistant for anything beyond it.",
      },
      {
        type: "image",
        label: "[AI Chat answering a doubt, scoped to the selected book and chapter]",
        src: "/products/ai-education-ai-chat.webp",
        ratio: "aspect-[16/9]",
      },
      { type: "subheading", text: "Tests that adjust to the student" },
      {
        type: "paragraph",
        text: "Chapter-wise Tests can be tuned by difficulty, time limit and format. When a question stalls a student, AI Assistance steps in with Show Hint, Similar Question and Ask AI, and full-length, timed Mock Tests build readiness for the real exam.",
      },
      {
        type: "image",
        label: "[A full-length, timed Mock Test in progress]",
        src: "/products/ai-education-mock-test.webp",
        ratio: "aspect-[8/5]",
      },
      { type: "subheading", text: "Revision that doesn't feel repetitive" },
      {
        type: "paragraph",
        text: "Learning Games turn revision into simulation, virtual lab, matching games, quizzes and flashcards.",
      },
      {
        type: "image",
        label: "[Learning Games: quiz, flashcards, puzzle, word builder and creative builder]",
        src: "/products/ai-education-learning-games.webp",
        ratio: "aspect-[16/9]",
      },
      {
        type: "paragraph",
        text: "Students can also write and save their own prompts for any chapter in a Prompt Library, share them in the Prompt Community and track rank and performance, while past year question papers and current affairs keep preparation grounded in the actual exam.",
      },
      {
        type: "image",
        label: "[Prompt Community: shared prompts ranked by performance]",
        src: "/products/ai-education-prompt-community.webp",
        ratio: "aspect-[16/9]",
      },
      { type: "heading", text: "How a student actually uses it" },
      {
        type: "paragraph",
        text: "A student selects their board, exam and book, CBSE 12th Biology, for instance, learns the chapter through Podcast, PPT, Mindmap and Flashcards, clears doubts instantly with AI Chat or the Guide Agent, practises with Chapter-wise Tests, Mock Tests and Learning Games, then tracks performance to revise the weak areas that actually move the score.",
      },
      { type: "heading", text: "What it's changed for students" },
      {
        type: "paragraph",
        text: "Students using Oswaal AI report spending roughly 50% less time on revision and seeing around 30% higher test scores, with doubts cleared instantly instead of waiting, and more than five separate study tools now living inside one app.",
      },
      {
        type: "paragraph",
        text: "“Oswaal AI made exam prep so much easier, I clear doubts instantly and my test scores improved within weeks,” one Class 12 CBSE student said.",
      },
    ],
    closingNote:
      "How Oswaal AI brings chapter-wise learning, AI doubt-solving, adaptive testing, games and revision tools into one hub built around each student's own board and exam.",
    caseStudyHref: "/case-studies/publisher-ai-transformation",
    liveLinks: [
      { kind: "website", href: "https://oswaal.ai" },
      { kind: "playstore", href: "https://play.google.com/store/apps/details?id=com.oswaal.ai" },
      { kind: "appstore", href: "https://apps.apple.com/in/app/oswaal-ai/id6774501859" },
    ],
  },
  {
    slug: "finance-auditor",
    category: "Audit",
    title: "FinanceAuditor.ai",
    subtitle: "Audit faster. Focus on judgment, not preparation.",
    author: "Zryth Product Team",
    publishedDate: "September 2026",
    readingTime: "5 min read",
    heroImageLabel: "[FinanceAuditor.ai dashboard, an audit's full status at a glance]",
    heroImageSrc: "/products/finance-auditor-banner-2.png",
    heroImageRatio: "aspect-[16/9]",
    body: [
      { type: "heading", text: "One platform for the entire statutory audit" },
      {
        type: "paragraph",
        text: "CAs and auditors used to work across Tally, the GST portal, TRACES and multiple Excel sheets, manually reconciling GST and TDS, scanning ledgers for errors and drafting financials and tax audit reports by hand, slow, tedious and error-prone. FinanceAuditor.ai brings the entire statutory audit into one AI-powered platform: it fetches Tally, GST and TDS data automatically, flags anomalies, and auto-generates the Balance Sheet, P&L and Form 3CA/3CB-3CD.",
      },
      { type: "heading", text: "An AI agent that runs the audit for you" },
      {
        type: "paragraph",
        text: "AI Audit runs a full compliance audit end-to-end in one place, and it starts with the Org Brief, an auto-generated organisation profile with PAN, GSTIN and entity details already filled in.",
      },
      {
        type: "image",
        label: "[AI Audit running a compliance audit, with the Org Brief already filled in]",
        src: "/products/finance-auditor-ai-audit-org-brief.webp",
        ratio: "aspect-[8/5]",
      },
      { type: "heading", text: "Ledgers, GST and TDS, reconciled automatically" },
      {
        type: "paragraph",
        text: "The Tally Connector fetches ledger data directly from Tally, giving Ledger Management a central view of every ledger, group and balance, with Stock Items tracking opening and closing balances alongside it. Ledger Scrutiny then scans those ledgers and flags risky entries, like high-value cash payments, while GST Reconciliation fetches and matches GSTR-1, 2A, 2B and 3B straight from the GST portal, and TDS Reconciliation pulls Conso files from TRACES and verifies 24Q, 26Q and 27EQ.",
      },
      {
        type: "image",
        label: "[GST and TDS reconciliation, matched against GSTR-1, 2A, 2B, 3B and TRACES Conso data]",
        src: "/products/finance-auditor-gst-tds-reconciliation.webp",
        ratio: "aspect-[8/5]",
      },
      { type: "heading", text: "Documents that read themselves" },
      {
        type: "paragraph",
        text: "The Abhilekh Agent reads documents and extracts the entities and relationships inside them automatically, and Anomaly Detection surfaces suspicious transactions and observations in a single click, catching what a manual scan would otherwise miss.",
      },
      {
        type: "image",
        label: "[Abhilekh Agent extracting entities from an uploaded document, anomalies flagged alongside]",
        src: "/products/finance-auditor-abhilekh-agent.webp",
        ratio: "aspect-[8/5]",
      },
      { type: "heading", text: "Financials and filings, generated, not typed" },
      {
        type: "paragraph",
        text: "Balance Sheet Generation builds a compliant Balance Sheet per ICAI guidance, P&L Statement Generation produces the Statement of Profit & Loss with a prior-year comparison, and Tax Audit Reporting builds Form 3CA/3CB-3CD under Section 44AB, ready to file. ITR Schedule then prepares the income-tax schedules straight from the audited data.",
      },
      {
        type: "image",
        label: "[Auto-generated Balance Sheet, P&L and Form 3CA/3CB-3CD, ready to file]",
        src: "/products/finance-auditor-tax-audit-report.webp",
        ratio: "aspect-[8/5]",
      },
      { type: "heading", text: "One dashboard, every client entity" },
      {
        type: "paragraph",
        text: "Organisations lets a firm manage and audit multiple client entities from one dashboard, instead of switching between separate files for every client.",
      },
      {
        type: "image",
        label: "[Organisations dashboard, multiple client entities side by side]",
        src: "/products/finance-auditor-organisations.webp",
        ratio: "aspect-[8/5]",
      },
      { type: "heading", text: "How an audit actually runs" },
      {
        type: "paragraph",
        text: "An auditor selects the organisation and connects Tally through the Tally Connector, auto-fetches ledgers, GST returns and TDS data into the software, runs Ledger Scrutiny and Find Anomaly to flag risky entries, auto-generates GST and TDS reconciliation alongside the Balance Sheet and P&L, then produces the final Tax Audit Report, Form 3CA/3CB-3CD, ready to file.",
      },
      { type: "heading", text: "What it's changed for audit teams" },
      {
        type: "paragraph",
        text: "Firms using FinanceAuditor.ai report audits running roughly 60% faster with about 80% fewer manual errors, a full 12 months of GST and TDS reconciled automatically, and four separate tools now combined into one.",
      },
      {
        type: "paragraph",
        text: "“FinanceAuditor.ai cut our audit time drastically, GST and TDS reconciliation and the tax audit report that used to take days are now ready in hours,” one auditor using the platform said.",
      },
    ],
    closingNote:
      "How FinanceAuditor.ai brings Tally, GST and TDS reconciliation, anomaly detection and statutory reporting into one AI-powered audit platform.",
    caseStudyHref: "/case-studies/audit-firm-transformation",
    brochureHref: "/brochures/finance-auditor-brochure.pdf",
    brochureLabel: "Download Brochure",
  },
  {
    slug: "mill-software",
    category: "Manufacturing",
    title: "Mill Software",
    subtitle:
      "The AI-integrated operating system for modern mills, from truck in to truck out.",
    author: "Zryth Product Team",
    publishedDate: "September 2026",
    readingTime: "6 min read",
    heroImageLabel: "[Mill Software: from truck in to truck out]",
    heroImageSrc: "/products/mill-software-banner.png",
    heroImageRatio: "aspect-[16/9]",
    body: [
      { type: "heading", text: "A mill is more than a factory. It's a flow of operations." },
      {
        type: "paragraph",
        text: "A truck arrives, its number is recorded, its weight is verified, its bill is checked, quality is recorded, the bill is matched against a purchase order, PAN status and deductions are checked, documents are collected, sales and dispatch records are updated, and the truck is sent out. Ten steps, and in most mills, ten separate manual processes.",
      },
      {
        type: "paragraph",
        text: "When those steps work in isolation, errors slip through and revenue losses go unnoticed until much later, if they're noticed at all. Mill Software connects the entire journey, every operation, every transaction and every decision, into one system.",
      },
      {
        type: "image",
        label: "[The mill's operational flow, before digitalisation]",
        src: "/products/mill-software-flow.png",
        ratio: "aspect-[662/619]",
      },
      { type: "heading", text: "One mill, one connected system" },
      {
        type: "paragraph",
        text: "Mill Software is built around five areas that, in most mills, don't talk to each other: operations, procurement, documents, sales and compliance, and automation.",
      },
      {
        type: "paragraph",
        text: "Operations covers digitising truck movement, weighbridge readings and quality checks. Procurement covers creating purchase orders, tracking deliveries and reconciling bills. Documents means storing operational paperwork in one place and using AI to verify it. Sales and compliance connects sales, Tally, PAN status and TDS/TCS in a single flow. And automation is where the system is headed next, AI-powered stock counting and RFID-based workforce management.",
      },
      { type: "heading", text: "Smart truck in, smart truck out" },
      {
        type: "paragraph",
        text: "Every truck entry used to mean writing down a vehicle number, checking a bill and keeping supporting documents separately. Mill Software replaces that with CCTV and OCR-based number plate recognition, recording the truck, its bill and its details automatically from the moment it enters the mill.",
      },
      {
        type: "subheading",
        text: "On the way out, the same discipline applies",
      },
      {
        type: "paragraph",
        text: "Managing truck exits, outgoing material, prices and invoices by hand made dispatch verification slow. The system now records outgoing details, applies the right prices, generates the invoice and keeps a complete digital record of the exit, automatically.",
      },
      {
        type: "image",
        label: "[Smart Truck In / Smart Truck Out]",
        src: "/products/mill-software-truck-in-out.png",
        ratio: "aspect-[16/9]",
      },
      { type: "heading", text: "Documents that check themselves" },
      {
        type: "paragraph",
        text: "Truck photographs and operational documents used to live scattered across physical files, making anything hard to retrieve or double-check. Mill Software stores them in one place and, using AI, cross-checks bills, nakalpatra and truck bilty against each other, catching mismatches a person would otherwise have to find by hand.",
      },
      {
        type: "image",
        label: "[AI document verification]",
        src: "/products/mill-software-document-verification.png",
        ratio: "aspect-[16/9]",
      },
      { type: "heading", text: "Weight and quality, verified automatically" },
      {
        type: "paragraph",
        text: "Comparing a bill's weight against the actual weighbridge reading by hand caused delays and let differences slip through. The system now captures the actual weight directly, sends it to the dashboard and checks it against the bill.",
      },
      {
        type: "image",
        label: "[Weighbridge automation]",
        src: "/products/mill-software-weighbridge.png",
        ratio: "aspect-[16/9]",
      },
      { type: "subheading", text: "Quality data, recorded once" },
      {
        type: "paragraph",
        text: "Protein, moisture and other quality values used to be tracked manually alongside bag counts, making deductions and brokerage calculations repetitive. Mill Software records them digitally and applies the deductions automatically.",
      },
      {
        type: "image",
        label: "[Quality assurance panel]",
        src: "/products/mill-software-quality-panel.png",
        ratio: "aspect-[16/9]",
      },
      { type: "heading", text: "Procurement that reconciles itself" },
      {
        type: "paragraph",
        text: "Creating and sharing purchase orders meant multiple manual steps between the mill, suppliers and brokers. Mill Software lets POs be created in one place and shared directly, and brokers can raise them on the mill's behalf while tracking their own orders, commissions and deductions.",
      },
      {
        type: "subheading",
        text: "Bills matched to POs, without the back and forth",
      },
      {
        type: "paragraph",
        text: "Matching purchase orders against bills and tracking partial deliveries used to mean repeated manual updates. The system reconciles POs and bills automatically, tracks what's still outstanding, checks rates, and flags when an order is fully delivered.",
      },
      {
        type: "image",
        label: "[PO creation and PO/bill reconciliation]",
        src: "/products/mill-software-po-reconciliation.png",
        ratio: "aspect-[16/9]",
      },
      { type: "heading", text: "Compliance and sales, connected" },
      {
        type: "paragraph",
        text: "Checking a party's PAN status and working out the applicable TDS or TCS used to be a separate manual step on every transaction. Mill Software verifies PAN status against available government data and applies the right deduction automatically.",
      },
      { type: "subheading", text: "Sales, dispatch and billing in one place" },
      {
        type: "paragraph",
        text: "Sales orders, dispatches, completion dates and party details used to sit across different records. The system connects order booking, dispatch verification and billing, and can pull party information directly from Tally.",
      },
      {
        type: "image",
        label: "[PAN/TDS verification and sales tracking]",
        src: "/products/mill-software-pan-sales.png",
        ratio: "aspect-[16/9]",
      },
      { type: "heading", text: "One place for parties, products and people" },
      {
        type: "paragraph",
        text: "Parties, brokers, suppliers, products, delivery locations and vehicles used to be managed separately, making day-to-day operations harder to control. Mill Software centralises all of it, so there's one source of truth for the information every other part of the system depends on.",
      },
      { type: "heading", text: "What's coming next" },
      {
        type: "paragraph",
        text: "Manually counting bags inside a godown is repetitive and needs constant physical verification, and tracking where workers spend their time is just as manual. Mill Software is building AI-powered back counting through CCTV and computer vision, alongside RFID-based workforce tracking, to bring the same automation to inventory and labour that the rest of the system already brings to operations.",
      },
      { type: "heading", text: "The takeaway" },
      {
        type: "paragraph",
        text: "Mill Software isn't about digitising paperwork for its own sake. It connects a mill's entire operational journey, from truck in to truck out, into one system that gets smarter as it's used, so operators spend less time chasing information and more time making decisions with it.",
      },
    ],
    closingNote:
      "How an AI-integrated operating system connects a mill's entire journey, from truck in to truck out, into one system that gets smarter as it's used.",
    caseStudyHref: "/case-studies/mill-software",
    brochureHref: "/brochures/mill-software-brochure.pdf",
    brochureLabel: "Download Brochure",
  },
  {
    slug: "learning",
    category: "L&D",
    title: "Learning",
    subtitle: "Run training and learning from one place.",
    author: "Zryth Product Team",
    publishedDate: "September 2026",
    readingTime: "4 min read",
    heroImageLabel: "[Learning platform course view]",
    heroImageSrc: "/products/learning-banner.png",
    heroImageRatio: "aspect-[16/9]",
    body: [
      {
        type: "heading",
        text: "One platform for courses, programs and live batches",
      },
      {
        type: "paragraph",
        text: "A learning platform for building and running structured training, internal or external, without stitching together separate tools for courses, cohorts and payments. Students see their courses, live batches and progress from one dashboard.",
      },
      {
        type: "image",
        label: "[Student dashboard: My Courses and My Batches, with progress tracked]",
        src: "/products/learning-student-dashboard.png",
        ratio: "aspect-[1523/872]",
      },
      { type: "heading", text: "Built to run many kinds of courses at once" },
      {
        type: "paragraph",
        text: "The same platform runs an MBA crash course, a real estate finance course, NEET and CBSE board preparation and more, side by side, each with its own content, pricing and enrolment.",
      },
      {
        type: "image",
        label: "[Courses listing: from NEET prep to MBA Essentials, published side by side]",
        src: "/products/learning-all-courses.png",
        ratio: "aspect-[1522/871]",
      },
      { type: "subheading", text: "Courses built from chapters, lessons and mock tests" },
      {
        type: "paragraph",
        text: "A course is structured into chapters and lessons, with assignments, quizzes and mock tests alongside, plus a preview video, pricing and the course creator, all in one editor view.",
      },
      {
        type: "image",
        label: "[A course's content: chapters, lessons, quizzes, assignments and mock tests, with a preview video alongside]",
        src: "/products/learning-course-editor.png",
        ratio: "aspect-[1533/870]",
      },
      { type: "subheading", text: "Programs bundle courses into a learning path" },
      {
        type: "paragraph",
        text: "Programs group one or more courses into a single structured path, like a complete exam-preparation track, rather than leaving learners to piece courses together themselves.",
      },
      {
        type: "image",
        label: "[Programs: courses bundled into a structured learning path]",
        src: "/products/learning-programs.png",
        ratio: "aspect-[1531/871]",
      },
      { type: "heading", text: "Live batches, scheduled and seat-limited" },
      {
        type: "paragraph",
        text: "Batches run a course as a live cohort, with its own date range, time, timezone, seat count and instructor, tracked separately from the self-paced course underneath it.",
      },
      {
        type: "image",
        label: "[Live batches: dated, timed and seat-limited cohorts]",
        src: "/products/learning-batches.png",
        ratio: "aspect-[1530/863]",
      },
      { type: "heading", text: "Admin controls for the whole platform" },
      {
        type: "paragraph",
        text: "An admin home shows courses created, batches and content at a glance, and system configuration covers guest access, video-skip prevention, PWA installs, and per-channel notifications, in-app or email, for published courses, batches and payments.",
      },
      {
        type: "image",
        label: "[Admin home: courses created, batches and content at a glance]",
        src: "/products/learning-admin-home.png",
        ratio: "aspect-[1523/872]",
      },
      {
        type: "image",
        label: "[System configuration: guest access, video controls, and per-channel notifications]",
        src: "/products/learning-configuration.png",
        ratio: "aspect-[1533/870]",
      },
      { type: "heading", text: "Sign-in and hands-on practice, built in" },
      {
        type: "paragraph",
        text: "Students sign in with a password or a one-time email link, and Programming Exercises let them code directly in the browser, with their solution checked as they type.",
      },
      {
        type: "image",
        label: "[Sign in: password or a one-time email link]",
        src: "/products/learning-sign-in.png",
        ratio: "aspect-[1517/871]",
      },
      { type: "heading", text: "Where it fits" },
      {
        type: "paragraph",
        text: "Covers course authoring, programs, live batches, payments, certifications and platform-wide configuration, for teams running training at a scale spreadsheets and email can't keep up with.",
      },
    ],
    closingNote:
      "How the Learning platform brings courses, programs, live batches and platform-wide admin controls into one place for internal or external training.",
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

/** The next product in the list, wrapping around, used for the closing nav. */
export function getNextProduct(slug: string) {
  const i = PRODUCTS.findIndex((p) => p.slug === slug);
  return PRODUCTS[(i + 1) % PRODUCTS.length];
}
