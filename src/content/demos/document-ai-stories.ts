/**
 * Document AI, told as three industry-specific blogs. Every result quoted here
 * is already published elsewhere on the site (the case studies);
 * nothing is estimated or invented. The animations are illustrative.
 */

export type DocStoryBlock =
  | { type: "heading" | "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "figure"; id: "flow" | "roi" | "links" | "cta" };

export type FlowStage = { title: string; line: string };

export type RoiItem =
  | { kind: "bars"; label: string; before: { name: string; display: string; value: number }; after: { name: string; display: string; value: number } }
  | { kind: "stat"; value: number; suffix: string; label: string }
  | { kind: "text"; display: string; label: string };

export type DocStory = {
  slug: string;
  industry: string;
  /** Category label, e.g. "Document AI · Milling". */
  category: string;
  title: string;
  subtitle: string;
  readingTime: string;
  preview: "bill" | "questions" | "ledgers";
  flow: FlowStage[];
  roi: RoiItem[];
  roiCaption: string;
  links: { label: string; href: string }[];
  blocks: DocStoryBlock[];
  closingNote: string;
};

const h = (text: string): DocStoryBlock => ({ type: "heading", text });
const p = (text: string): DocStoryBlock => ({ type: "paragraph", text });
const ul = (...items: string[]): DocStoryBlock => ({ type: "list", items });
const f = (id: "flow" | "roi" | "links" | "cta"): DocStoryBlock => ({ type: "figure", id });

export const DOC_STORIES: DocStory[] = [
  {
    slug: "document-ai-flour-mills",
    industry: "Flour mills",
    category: "Document AI · Milling",
    title: "Why a flour mill needs Document AI",
    subtitle:
      "A mill handles bills all day, many of them handwritten. Here is where Document AI earns its place, and what it did at one mill.",
    readingTime: "4 min read",
    preview: "bill",
    flow: [
      { title: "A bill arrives", line: "Printed or handwritten" },
      { title: "It is read", line: "Supplier, amount, order" },
      { title: "It is checked", line: "Against the purchase order" },
    ],
    roi: [
      {
        kind: "bars",
        label: "Bill verification accuracy",
        before: { name: "Before", display: "about 70–75%", value: 72.5 },
        after: { name: "After", display: "98%", value: 98 },
      },
    ],
    roiCaption: "From published Zryth work at Mill Software. The animation above is illustrative, not a real bill.",
    links: [
      { label: "Read the full write-up: The Bills Nobody Was Checking", href: "/case-studies/mill-software-bill-verification" },
      { label: "See the case study: Running a Mill on Phone Calls and Memory", href: "/case-studies/mill-software" },
    ],
    blocks: [
      h("Bills arrive all day. Few get a proper check."),
      p("A mill buys grain and materials through brokers and suppliers, so bills keep coming: printed ones, and plenty of handwritten ones. At one mill we worked with, about one in three was handwritten."),
      p("Each bill has to be read, typed into the system and checked against what was ordered. When volume is high, the careful check is the first thing to slip. Duplicates, inflated amounts and typing mistakes get through, and show up later as overpayments."),
      f("flow"),
      h("Where Document AI helps a mill"),
      ul(
        "Reading bills, printed or handwritten, and pulling out the details a person would type.",
        "Matching each bill to its purchase order, and tracking partial deliveries against it.",
        "Flagging what looks wrong, such as a duplicate or an amount that differs from the order.",
        "Connecting dispatch and sales documents to billing, so one trail replaces three.",
      ),
      p("Anything the system is unsure about goes to a person instead of being guessed."),
      h("What it did at one mill"),
      p("At Mill Software, bill verification accuracy rose from roughly 70–75% to 98%, including on handwritten bills."),
      f("roi"),
      p("Checking took 60–70% longer than before. That was deliberate: every bill is now scanned and checked, not only the ones someone had time for. The mistakes the old process had no way to catch are now flagged before they become overpayments."),
      h("The return is consistency, not speed"),
      p("A person checking bills on a busy day will miss some. A system checks each one the same way, so accuracy holds as the number of suppliers and bills grows."),
      h("Is it right for your mill?"),
      p("It fits when bills pile up, when a good share are handwritten, or when matching them to orders is done by hand. If that sounds familiar, start with one workflow."),
      f("cta"),
      f("links"),
    ],
    closingNote:
      "Why a flour mill needs Document AI: every bill read and checked, and the verification accuracy that followed at one mill.",
  },

  {
    slug: "document-ai-publishers",
    industry: "Publishers",
    category: "Document AI · Publishing",
    title: "Why a publisher needs Document AI",
    subtitle:
      "Question papers and study material arrive as PDFs. Here is where Document AI helps a publisher, and what it did for an education client.",
    readingTime: "4 min read",
    preview: "questions",
    flow: [
      { title: "A question paper arrives", line: "A PDF, as it always does" },
      { title: "Questions are read", line: "Text, images, options" },
      { title: "They are structured", line: "Ready to publish" },
    ],
    roi: [
      {
        kind: "bars",
        label: "Cost per question",
        before: { name: "By hand", display: "₹12", value: 12 },
        after: { name: "With Document AI", display: "₹5", value: 5 },
      },
      {
        kind: "bars",
        label: "Time to process 100 questions",
        before: { name: "By hand", display: "about 12 hours", value: 12 },
        after: { name: "With Document AI", display: "about 2 hours", value: 2 },
      },
    ],
    roiCaption: "From published Zryth work for an education client. The animation above is illustrative, not a real question paper.",
    links: [
      { label: "Read the full write-up: The ₹12 Question", href: "/case-studies/mock-test-question-extraction" },
      { label: "See the case study: One Publisher, Every Stage Rebuilt With AI", href: "/case-studies/publisher-ai-transformation" },
    ],
    blocks: [
      h("A question is more than text"),
      p("An education publisher builds mock tests at scale. Every question in every PDF has to become digital content: the question, its images, the options, the answer, hints and explanations, all tied together."),
      p("Done by hand, that cost about ₹12 per question at one client, and the cost grew in a straight line: roughly ₹1,20,000 for 10,000 questions."),
      f("flow"),
      h("Where Document AI helps a publisher"),
      ul(
        "Turning question PDFs into structured questions, options, answers and explanations.",
        "Keeping diagrams, images and mathematical expressions attached to the right question.",
        "Choosing the right method for each question: plain text, image-heavy or mixed.",
        "Checking drafted study content against its source before it ships.",
      ),
      p("That last one means AI at both ends of the process: helping draft content faster, and checking it against the source."),
      h("What it did for one client"),
      p("Cost per question fell from about ₹12 to ₹5. Processing 100 questions fell from about 12 hours to about 2."),
      f("roi"),
      p("At ₹5, 10,000 questions come to about ₹50,000 instead of ₹1,20,000. Work that needed several people entering and cross-checking now needs one person reviewing the output. In testing, text questions reached close to 100% extraction accuracy, and complex diagram or reasoning questions around 95%."),
      h("The return is scale"),
      p("The manual effort no longer grows in step with the volume. Thousands of questions can be processed without hiring in proportion."),
      h("Is it right for your publishing house?"),
      p("It fits when content arrives as PDFs, when staff retype it, or when checking is the bottleneck. Start with one title or one test series."),
      f("cta"),
      f("links"),
    ],
    closingNote:
      "Why a publisher needs Document AI: question PDFs turned into structured content, and the cost and time saved for one education client.",
  },

  {
    slug: "document-ai-ca-firms",
    industry: "CA firms",
    category: "Document AI · Audit & Finance",
    title: "Why a CA firm needs Document AI",
    subtitle:
      "Audits start with data scattered across Tally, the GST portal, TRACES and spreadsheets. Here is where Document AI helps, and what it did for one firm.",
    readingTime: "4 min read",
    preview: "ledgers",
    flow: [
      { title: "Records arrive", line: "Tally, GST, TDS" },
      { title: "They are reconciled", line: "Matched and flagged" },
      { title: "Ready for review", line: "Reports drafted" },
    ],
    roi: [
      { kind: "stat", value: 60, suffix: "%", label: "faster audits" },
      { kind: "stat", value: 80, suffix: "%", label: "fewer manual errors" },
      { kind: "text", display: "12 months", label: "of GST and TDS reconciled automatically" },
      { kind: "text", display: "4 → 1", label: "tools replaced by one" },
    ],
    roiCaption: "From published Zryth work at ARC & Associates. The animation above is illustrative, not a real client record.",
    links: [
      { label: "See the case study: Audits That Used To Take Days, Now Take Hours", href: "/case-studies/audit-firm-transformation" },
      { label: "See the product: FinanceAuditor.ai", href: "/products/finance-auditor" },
    ],
    blocks: [
      h("The audit starts before the audit"),
      p("Before a CA firm can review anything, the data has to be pulled from Tally, the GST portal, TRACES and a stack of spreadsheets, then reconciled by hand. That preparation is slow, and every manual step is another place for an error to hide."),
      f("flow"),
      h("Where Document AI helps a CA firm"),
      ul(
        "Pulling ledgers, GST and TDS data into one place instead of four.",
        "Reconciling GST and TDS automatically, and matching them against the books.",
        "Flagging anomalies before they become findings someone has to catch by hand.",
        "Drafting the Balance Sheet, the Profit & Loss and the tax audit report from reconciled data.",
      ),
      h("What it did for one firm"),
      p("At ARC & Associates, audits now run roughly 60% faster, with about 80% fewer manual errors. A full 12 months of GST and TDS are reconciled automatically, and four separate tools became one."),
      f("roi"),
      p("One auditor at the firm said that GST and TDS reconciliation and the tax audit report that used to take days are now ready in hours."),
      h("The return is where the team starts"),
      p("The team begins at review instead of preparation. The hours of an audit shift from assembling data to judging it."),
      h("Is it right for your firm?"),
      p("It fits when audits begin with exporting and matching data from several systems, and when reconciliation sets the pace. Start with one client's audit."),
      f("cta"),
      f("links"),
    ],
    closingNote:
      "Why a CA firm needs Document AI: records reconciled automatically, and the audit time and errors saved at one firm.",
  },
];

export function getDocStory(slug: string) {
  return DOC_STORIES.find((s) => s.slug === slug);
}
