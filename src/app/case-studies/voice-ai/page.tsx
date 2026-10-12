import type { Metadata } from "next";
import { StoryArticle } from "@/components/demos/story/StoryArticle";
import { TailorBlock, WorkflowStrip } from "@/components/demos/story/shared";
import { VoiceActionsFigure, VoiceListenFigure, VoiceOutcome, VoiceStory } from "@/components/demos/story/VoiceStory";
import { getDemo } from "@/content/demos";
import { STORIES } from "@/content/demos/articles";

const meta = getDemo("voice-ai");

export const metadata: Metadata = {
  title: `${meta.heading} | Case Studies`,
  description: STORIES["voice-ai"].subtitle,
  keywords: ["voice AI demo", "AI booking assistant", "voice agent for appointments", "AI phone automation"],
  alternates: { canonical: "/case-studies/voice-ai" },
  openGraph: { title: meta.heading, description: STORIES["voice-ai"].subtitle, url: "/case-studies/voice-ai", type: "article" },
};

export default function VoiceAiPage() {
  return (
    <VoiceStory>
      <StoryArticle
        id="voice-ai"
        figures={{
          strip: <WorkflowStrip steps={meta.workflow} />,
          listen: <VoiceListenFigure />,
          actions: <VoiceActionsFigure />,
          outcome: <VoiceOutcome />,
          tailor: <TailorBlock meta={meta} />,
        }}
      />
    </VoiceStory>
  );
}
