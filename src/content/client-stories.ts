/**
 * Client transformation stories for the AI Transformation page.
 *
 * ─── BEFORE GOING LIVE ────────────────────────────────────────────────────────
 * Every story is marked `placeholder: true` and renders with a visible "needs
 * real content" treatment. Replace the values and delete the flag.
 *
 * `results` must only ever contain outcomes you can substantiate. Leave the
 * array empty rather than estimating — an unverified number is worse than none.
 *
 * Photographs should be the real client and their real operating environment
 * (factory floor, warehouse, line, office). Not stock imagery.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type ClientStory = {
  company: string;
  industry: string;
  /** One short sentence. The business problem, in plain language. */
  problem: string;
  /** One concise sentence. What was implemented and the operational result. */
  changed: string;
  quote: string;
  personName: string;
  personRole: string;
  /** Path under /public. Leave undefined for the placeholder panel. */
  photo?: string;
  /** Tailwind aspect ratio class, e.g. "aspect-[2000/1333]". Defaults to 3/4. */
  photoRatio?: string;
  /** Tailwind object-position class, e.g. "object-[50%_8%]". Defaults to center. */
  photoPosition?: string;
  photoAlt: string;
  /** Verified outcomes only. Numbers where you have them, words where you don't. */
  results: string[];
  placeholder?: boolean;
};

export const CLIENT_STORIES: ClientStory[] = [
  {
    company: "Oswaal Books",
    industry: "Publishing & Education",
    problem:
      "Editorial QA, content generation and warehousing ran as separate manual processes, with no direct AI product connecting Oswaal to its students.",
    changed:
      "Zryth brought AI into editorial QA and content generation, automated warehousing and CRM operations, and built Oswaal AI, a direct-to-student AI learning product.",
    quote: "Zryth are the AI experts. They've solved problems for us.",
    personName: "Naresh Jain",
    personRole: "Managing Director",
    photo: "/client-stories/oswaal-books-md.webp",
    photoRatio: "aspect-[2000/1333]",
    photoAlt: "Oswaal Books' Managing Director",
    results: [
      "58% cheaper content checks",
      "30% higher test scores",
      "Warehousing & CRM, connected",
    ],
  },
  {
    company: "Agra Rollers",
    industry: "Milling Industry",
    problem:
      "Procurement, reconciliation and sales ran as separate manual processes, with accuracy depending on whoever was reconciling that day.",
    changed:
      "Zryth connected procurement, reconciliation and sales into one system, with Mill Software handling the matching automatically.",
    quote:
      "Zryth understood our business requirement deeply and solved the problem in a way that fit our business well.",
    personName: "Utkarsh Agarwal",
    personRole: "Owner",
    photo: "/client-stories/agra-rollers.jpg",
    photoRatio: "aspect-[1600/1066]",
    photoAlt: "Utkarsh Agarwal, Owner of Agra Rollers",
    results: [
      "Procurement, tracked automatically",
      "Reconciliation errors caught by the system",
      "Accuracy that scales with volume",
    ],
  },
  {
    company: "ARC & Associates",
    industry: "Finance & Audit",
    problem:
      "Audit preparation meant moving between Tally, the GST portal, TRACES and spreadsheets before any review could begin.",
    changed:
      "Zryth brought the data together and automated GST and TDS reconciliation, so the team starts at review instead of preparation.",
    quote:
      "Zryth worked religiously with our team to solve the core problems that save us time and cost.",
    personName: "CA Rakesh Agarwal",
    personRole: "Owner",
    photo: "/client-stories/arc-associates.webp",
    photoRatio: "aspect-[2000/1333]",
    photoPosition: "object-[50%_12%]",
    photoAlt: "CA Rakesh Agarwal, ARC & Associates",
    results: ["60% faster audits", "80% fewer manual errors", "4 tools combined into one"],
  },
];
