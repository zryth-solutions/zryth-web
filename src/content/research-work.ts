/**
 * Research Work — uses the shared editorial article template (see
 * src/components/site/ArticleTemplate.tsx), the same one Case Studies and
 * Products use. `body` is an ordered list of blocks (heading / subheading /
 * paragraph / image) rendered top to bottom, exactly like a Medium article:
 * add, remove or reorder blocks freely, the page just renders whatever's
 * here. To start a new placeholder entry, copy the block shapes below and
 * swap in bracketed strings like "[SECTION HEADING]" and
 * "[PARAGRAPH CONTENT]".
 */

import type { ArticleData } from "@/components/site/ArticleTemplate";

export type ResearchWork = ArticleData;

export const RESEARCH_WORK: ResearchWork[] = [
  {
    slug: "mill-software-bill-verification",
    category: "Case Study",
    title: "The Bills Nobody Was Checking",
    subtitle:
      "How an AI-powered scanning system took Mill Software's invoice verification from around 70% accuracy to 98%, even on handwritten bills.",
    author: "Zryth Research",
    publishedDate: "September 2026",
    readingTime: "4 min read",
    heroImageLabel: "[Bill scanning system in use]",
    heroImageSrc: "/research-work/mill-software-bill-verification.png",
    body: [
      { type: "heading", text: "A process too slow to actually work" },
      {
        type: "paragraph",
        text: "Mill Software's finance team was processing purchase invoices by hand: reading each bill, typing the details into their system, and checking the numbers against what was expected. For most manufacturers, this is normal. For a business receiving a high volume of bills, it also meant something else, nobody had time to look closely at every single one.",
      },
      {
        type: "paragraph",
        text: "There was no reliable way to catch a bill that looked slightly off. Duplicate entries, inflated amounts and simple data-entry mistakes could all slip through unnoticed, and the cost of a missed error only showed up later, as an overpayment or a reconciliation headache.",
      },
      {
        type: "image",
        label: "[Manual invoice verification, before AI]",
        src: "/research-work/manual-invoice-verification.png",
        caption: "Every bill still had to be read, typed and cross-checked by hand.",
      },
      {
        type: "heading",
        text: "Understanding the problem before building anything",
      },
      {
        type: "paragraph",
        text: "Before writing any code, our team spent time inside Mill Software's actual bill-processing workflow: what kinds of bills came in, how they were checked today, and where mistakes tended to happen. Some bills were clean, printed invoices. A meaningful share, roughly one in three, were handwritten, with inconsistent formatting and the usual quirks of handwriting.",
      },
      {
        type: "paragraph",
        text: "That distinction turned out to matter more than anything else in the project.",
      },
      {
        type: "heading",
        text: "Building a system that reads bills and flags what looks wrong",
      },
      {
        type: "paragraph",
        text: "We built an AI-powered bill-scanning system combining OCR with Google's Gemini models. The system reads each bill, extracts the relevant fields, and checks for irregularities that would normally require a person to notice, flagging anything uncertain for review instead of guessing.",
      },
      { type: "subheading", text: "Testing five models before picking one" },
      {
        type: "paragraph",
        text: "Speed and accuracy don't always move together, so we tested the workflow across five Gemini models on real bills, printed and handwritten, under the same lighting and camera conditions the system would actually run in.",
      },
      {
        type: "paragraph",
        text: "Gemini 2.5 Flash was the fastest, at 20–30 seconds per bill. Gemini 3.1 Flash and Gemini 2.5 Flash-Lite followed at 25–32 seconds and 25–30 seconds. Gemini 3.1 Pro took 30–35 seconds, and Gemini 2.5 Pro was the slowest, at 40–50 seconds.",
      },
      {
        type: "image",
        label: "[Processing time by model]",
        src: "/research-work/model-processing-time.png",
        ratio: "aspect-[4/3]",
        caption: "Speed varied by model, but speed wasn't the deciding factor.",
      },
      { type: "heading", text: "Why we picked the slower model" },
      {
        type: "paragraph",
        text: "On clean, printed bills, every model performed reasonably well. The difference showed up on the handwritten third of the bills, the ones that actually determine whether a system works in the real world. Gemini 3.1 Pro handled these consistently better than the faster options, even though it wasn't the quickest.",
      },
      {
        type: "paragraph",
        text: "Since the system had to work on the bills Mill Software actually receives, not just the easy ones, we chose reliability on the hardest cases over shaving a few seconds off the average.",
      },
      { type: "heading", text: "The result: a slower process that finally works" },
      {
        type: "paragraph",
        text: "Bill verification now takes 60–70% longer than before, because every bill is scanned and checked systematically instead of being reviewed only when someone had time. That trade-off was deliberate.",
      },
      {
        type: "paragraph",
        text: "Verification accuracy rose from roughly 70–75% to 98%. More importantly, mistakes the old process had no real way of catching, especially on handwritten bills, are now being found and flagged before they turn into overpayments or reconciliation problems.",
      },
      { type: "heading", text: "The takeaway" },
      {
        type: "paragraph",
        text: "The biggest win wasn't speed. It was turning bill verification from a manual process that was too difficult to apply consistently into a systematic one that catches mistakes that used to go unnoticed entirely.",
      },
    ],
    closingNote:
      "A look at how AI-powered OCR and careful model selection turned an overwhelmed manual process into a reliable, systematic one, even on the bills humans found hardest to read.",
  },
  {
    slug: "mock-test-question-extraction",
    category: "Case Study",
    title: "The ₹12 Question",
    subtitle:
      "How a hybrid AI and OCR pipeline turned mock-test PDFs into structured questions, cutting cost per question from ₹12 to ₹5 and processing time by 83%.",
    author: "Zryth Research",
    publishedDate: "September 2026",
    readingTime: "5 min read",
    heroImageLabel: "[Mock-test PDF being processed by AI]",
    heroImageSrc: "/research-work/mock-test-cover.jpg",
    heroImageRatio: "aspect-[1011/677]",
    body: [
      { type: "heading", text: "Twelve rupees, one question at a time" },
      {
        type: "paragraph",
        text: "An education client was building mock tests at scale, and every question in every PDF had to be converted into a digital format by hand: text, images, options, answers, all copied out manually. That process cost roughly ₹12 per question.",
      },
      {
        type: "paragraph",
        text: "The cost didn't stay small for long. 100 questions came to about ₹1,200. At 1,000 questions, it was ₹12,000. At 10,000, it was ₹1,20,000. There was no volume discount, the cost just kept scaling in a straight line with the work.",
      },
      {
        type: "image",
        label: "[Manual question entry from a mock-test PDF]",
        src: "/research-work/mock-test-manual-entry.jpg",
        ratio: "aspect-[1284/677]",
        caption: "Every question, image and option copied out by hand.",
      },
      { type: "heading", text: "A question is more than just text" },
      {
        type: "paragraph",
        text: "Before proposing anything, we sat down with the client's existing workflow rather than just looking at the PDFs in isolation. A single question could carry question text, images, multiple options, option images, section information, an answer, negative marking, hints and explanations, all of it tied together.",
      },
      {
        type: "paragraph",
        text: "The difficulty scaled with the question. A plain text question was straightforward. A question with a diagram, a mathematical expression, a reasoning puzzle, or a mix of text and images was a different problem entirely.",
      },
      {
        type: "heading",
        text: "Why one extraction method wasn't going to be enough",
      },
      {
        type: "paragraph",
        text: "We reviewed the process across many different mock-test PDFs and mapped out where automation could actually help: reading the PDF, extracting text, extracting images, identifying questions and options, detecting question structure, preserving mathematical and LaTeX content, handling image-based questions, mapping everything into the right structure, and validating accuracy at the end.",
      },
      {
        type: "paragraph",
        text: "That mapping made one thing clear early on: no single OCR or text-extraction technique was going to handle all of it. We designed a multi-stage AI workflow instead.",
      },
      {
        type: "heading",
        text: "Building a pipeline that adapts to the question",
      },
      {
        type: "paragraph",
        text: "The pipeline analyses each PDF to identify text, images, mathematical expressions, diagrams and mixed content, then extracts question text, options and images while keeping each one tied to the right question. Different AI models and OCR techniques are applied depending on the content type, mathematical expressions and LaTeX are preserved rather than lost, and the result is structured output, questions, options, answers, images, sections, explanations and negative marking, ready to load straight into the client's question bank.",
      },
      {
        type: "subheading",
        text: "Testing five ways to read a question",
      },
      {
        type: "paragraph",
        text: "Conventional PDF libraries and OCR handled simple text well but struggled with complex layouts, images, reasoning questions and mathematical content. Trying several OCR techniques improved raw text extraction, but none of them could reliably understand how a question, its options and its images related to each other.",
      },
      {
        type: "paragraph",
        text: "AI and LLM models were better at identifying structure, questions, options, answers, explanations, sections and metadata, and separate image-analysis models were better at reading diagrams and figures. No single one of these covered every case on its own.",
      },
      {
        type: "image",
        label: "[Hybrid pipeline routing by content type]",
        src: "/research-work/mock-test-pipeline.jpg",
        ratio: "aspect-[1284/677]",
        caption: "The system picks its approach based on what's actually on the page.",
      },
      { type: "heading", text: "Why the hybrid approach won" },
      {
        type: "paragraph",
        text: "The final system routes each question by content type: text-heavy questions go through text extraction plus AI analysis, image-heavy questions go through image extraction plus image analysis, and mixed questions get both. That hybrid routing outperformed every single-technique approach we tested.",
      },
      {
        type: "paragraph",
        text: "In testing, theory and text-based questions reached close to 100% extraction accuracy, while questions involving reasoning, diagrams or more complex images reached around 95%. The hybrid approach won because it balanced accuracy, image preservation, structure recognition, mathematical content and scale, rather than optimising for just one of them.",
      },
      { type: "heading", text: "The result: fewer hands, faster turnaround, lower cost" },
      {
        type: "paragraph",
        text: "Cost per question dropped from roughly ₹12 to ₹5, a reduction of about 58%. Processing 100 questions, which used to take around 12 hours, now takes about 2 hours, a reduction of roughly 83%.",
      },
      {
        type: "paragraph",
        text: "The work also needs fewer people. Instead of several people manually entering and cross-checking questions, one person mainly reviews the automated output, and because the system extracts and structures content consistently, accuracy improved rather than dropped.",
      },
      { type: "heading", text: "The takeaway" },
      {
        type: "paragraph",
        text: "The biggest success was turning a slow, expensive, manpower-heavy manual process into a largely automated workflow, one that got both cheaper and more accurate at the same time, and that now scales to thousands of questions without scaling the manual effort alongside it.",
      },
    ],
    closingNote:
      "How a hybrid AI and OCR pipeline turned manual mock-test question entry into an automated workflow, cutting cost per question by 58% and processing time by 83%.",
  },
];

export function getResearchWork(slug: string) {
  return RESEARCH_WORK.find((c) => c.slug === slug);
}

/**
 * The next entry in the list, wrapping around, used for the closing nav.
 * Returns undefined when there's nothing else to show (e.g. only one entry).
 */
export function getNextResearchWork(slug: string) {
  if (RESEARCH_WORK.length <= 1) return undefined;
  const i = RESEARCH_WORK.findIndex((c) => c.slug === slug);
  return RESEARCH_WORK[(i + 1) % RESEARCH_WORK.length];
}
