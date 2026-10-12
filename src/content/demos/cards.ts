import { DOC_STORIES } from "@/content/demos/document-ai-stories";
import { DEMOS } from "@/content/demos";

export type CardCategory = "Document AI" | "Voice AI" | "Chat AI";
export type PreviewKind = "bill" | "questions" | "ledgers" | "voice" | "chat";

export type Card = {
  /** Used as the ?useCase= value in the contact flow. */
  id: string;
  href: string;
  category: CardCategory;
  /** Small label above the title. */
  label: string;
  title: string;
  readingTime: string;
  preview: PreviewKind;
};

const voice = DEMOS.find((d) => d.id === "voice-ai")!;
const chat = DEMOS.find((d) => d.id === "chat-ai")!;

/** Order shown on the index and used for the "Next" links between walkthroughs. */
export const CARDS: Card[] = [
  ...DOC_STORIES.map((s): Card => ({
    id: s.slug,
    href: `/case-studies/${s.slug}`,
    category: "Document AI",
    label: "Document AI",
    title: s.title,
    readingTime: s.readingTime,
    preview: s.preview,
  })),
  {
    id: voice.id,
    href: `/case-studies/${voice.id}`,
    category: "Voice AI",
    label: "Voice AI",
    title: voice.title,
    readingTime: voice.readingTime,
    preview: "voice",
  },
  {
    id: chat.id,
    href: `/case-studies/${chat.id}`,
    category: "Chat AI",
    label: "Chat AI",
    title: chat.title,
    readingTime: chat.readingTime,
    preview: "chat",
  },
];

export function nextCard(href: string): Card {
  const i = CARDS.findIndex((c) => c.href === href);
  return CARDS[(i + 1) % CARDS.length];
}

export function getCardById(id: string): Card | undefined {
  return CARDS.find((c) => c.id === id);
}
