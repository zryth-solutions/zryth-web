/**
 * Copy and metadata for the interactive Voice AI and Chat AI walkthroughs.
 * Scene scripts, fixtures and engines live beside this file / in src/lib/demos,
 * never inside components. Document AI is told as industry case-study blogs:
 * see document-ai-stories.ts.
 */

export type DemoId = "voice-ai" | "chat-ai";

export type DemoMeta = {
  id: DemoId;
  /** Filter chip label. */
  category: string;
  /** Short card title. */
  title: string;
  /** Dialog heading. */
  heading: string;
  /** One sentence describing the outcome (card text). */
  outcome: string;
  workflow: string[];
  /** The "Copy:" line from the brief, shown verbatim. */
  tailorLead: string;
  /** How Zryth tailors the demonstrated design. Design approach only, no claims. */
  tailorPoints: string[];
  /** True when the demo plays synthesized speech. */
  scriptedAudio?: boolean;
  readingTime: string;
};

export const SAMPLE_LABEL = "Interactive demo · sample data";
export const AUDIO_LABEL = "Scripted audio demonstration";

export const DEMOS: DemoMeta[] = [
  {
    id: "voice-ai",
    category: "Voice AI",
    title: "Calls that lead to action",
    heading: "Calls that lead to action",
    outcome:
      "A rescheduling call updates the booking and sends the confirmation while the caller is still on the line.",
    workflow: [
      "Look up booking",
      "Check availability",
      "Confirm with caller",
      "Update booking",
      "Send confirmation",
    ],
    tailorLead:
      "Voice agents connected to the work behind the call—appointments, customer records and human handoff.",
    tailorPoints: [
      "Connection to your booking and customer systems.",
      "Confirmation steps before anything changes.",
      "Handoff to a person when the call needs one.",
    ],
    scriptedAudio: true,
    readingTime: "5 min read",
  },
  {
    id: "chat-ai",
    category: "Chat AI",
    title: "Support that completes the workflow",
    heading: "Support that completes the workflow",
    outcome:
      "A damaged-delivery chat ends with the order, ticket and customer updated, or a clean human handoff.",
    workflow: [
      "Retrieve order",
      "Check policy",
      "Request confirmation",
      "Submit action",
      "Update support ticket",
      "Notify customer",
    ],
    tailorLead:
      "Built around your support policies, systems and approval rules—from the first message to the completed action.",
    tailorPoints: [
      "Integrations with the systems your team already uses.",
      "Workflow agents that take the action, not just answer.",
      "Business rules and approvals that stay yours.",
      "A useful human handoff when something fails.",
    ],
    readingTime: "5 min read",
  },
];

export function getDemo(id: DemoId): DemoMeta {
  const demo = DEMOS.find((d) => d.id === id);
  if (!demo) throw new Error(`Unknown demo: ${id}`);
  return demo;
}
