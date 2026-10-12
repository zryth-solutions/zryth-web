import type { Metadata } from "next";
import { StoryArticle } from "@/components/demos/story/StoryArticle";
import { TailorBlock, WorkflowStrip } from "@/components/demos/story/shared";
import { ChatBackstageFigure, ChatConversationFigure, ChatOutcome, ChatStory } from "@/components/demos/story/ChatStory";
import { getDemo } from "@/content/demos";
import { STORIES } from "@/content/demos/articles";

const meta = getDemo("chat-ai");

export const metadata: Metadata = {
  title: `${meta.heading} | Case Studies`,
  description: STORIES["chat-ai"].subtitle,
  keywords: ["chat AI demo", "AI customer support agent", "support workflow automation", "AI chatbot with human handoff"],
  alternates: { canonical: "/case-studies/chat-ai" },
  openGraph: { title: meta.heading, description: STORIES["chat-ai"].subtitle, url: "/case-studies/chat-ai", type: "article" },
};

export default function ChatAiPage() {
  return (
    <ChatStory>
      <StoryArticle
        id="chat-ai"
        figures={{
          strip: <WorkflowStrip steps={meta.workflow} />,
          conversation: <ChatConversationFigure />,
          backstage: <ChatBackstageFigure />,
          outcome: <ChatOutcome />,
          tailor: <TailorBlock meta={meta} />,
        }}
      />
    </ChatStory>
  );
}
