import type { DemoId } from "@/content/demos";

/**
 * The words of each walkthrough article. Figures (the interactive animations)
 * are referenced by id and supplied by each route, so text stays out of the
 * components. Everything described runs on sample data.
 */

export type StoryBlock =
  | { type: "heading" | "subheading" | "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "figure"; id: string };

export type StoryArticleContent = {
  subtitle: string;
  blocks: StoryBlock[];
  closingNote: string;
};

const h = (text: string): StoryBlock => ({ type: "heading", text });
const p = (text: string): StoryBlock => ({ type: "paragraph", text });
const f = (id: string): StoryBlock => ({ type: "figure", id });

export const STORIES: Record<DemoId, StoryArticleContent> = {
  "voice-ai": {
    subtitle:
      "Installation and field-service teams spend their day moving appointments by phone. Listen to a scripted call that updates the booking and sends the confirmation before it ends, and watch the work behind it.",
    blocks: [
      h("In installation and field-service businesses, the phone is the booking system"),
      p("Think of a company that installs solar panels, appliances or broadband, or services equipment on site. Customers call to move an appointment. Someone has to find the booking, check which slots are free, make the change and send a confirmation, usually while the customer waits and the next call is already ringing."),
      p("The same pattern shows up wherever appointments are booked by phone, such as clinics, salons and repair shops. This walkthrough uses an installation booking as the example."),
      p("The call you can play below is a scripted demonstration. Two synthesised voices read a written script that was generated in advance. It is not a recording of a live agent, and nothing here shows how quickly a real agent would respond or how it handles interruptions."),
      f("strip"),
      h("Listen to the call"),
      p("Press play and follow along in the transcript. Click any line, or drag the slider, to jump to that moment. The audio does not start until you ask it to."),
      f("listen"),
      h("What happens while the caller talks"),
      p("A call that leads to action is connected to the systems behind it. When the caller gives the reference, the booking is looked up. When the agent offers Friday, the available slots have already been checked. Nothing changes until the caller confirms. Then the booking is updated and the confirmation is sent."),
      f("actions"),
      p("Scrub back and forth through the recording and the panel follows. Every step is tied to the moment in the script where it would happen, which is how the demonstration stays honest about what is scripted."),
      f("outcome"),
      h("Making it fit your business"),
      p("Building this for your team means connecting a voice agent to your booking and customer systems, agreeing which confirmations it must ask for, and deciding when a call should go to a person."),
      f("tailor"),
    ],
    closingNote:
      "How a rescheduling call can update an installation booking and send the confirmation, shown with a scripted call on sample data.",
  },

  "chat-ai": {
    subtitle:
      "Online retail support, start to finish: a damaged-delivery chat that ends with the order, ticket and customer updated, or with a clean handoff to a person when a system fails.",
    blocks: [
      h("In online retail, a damaged delivery is a daily ticket"),
      p("An online shop or direct-to-consumer brand gets the same message again and again: an order arrived damaged. Before anyone can help, someone looks up the order, checks the returns policy, decides what to offer, makes the change and updates the ticket. The customer waits through all of it."),
      p("Marketplaces and subscription businesses face the same loop with their own policies. This walkthrough uses a damaged delivery from an online store as the example."),
      p("The conversation below is a scripted sample. The agent's messages play from a script and you choose what the customer says. No real agent, order system or customer is involved."),
      f("strip"),
      h("The conversation"),
      p("The opening plays by itself. When the agent offers a replacement or a refund, the choice is yours. The agent asks you to confirm before it does anything, and you can change your mind first."),
      f("conversation"),
      h("What the agent is doing behind the chat"),
      p("Each reply is backed by work in other systems: retrieving the order, checking the policy, requesting confirmation, submitting the action, updating the support ticket and notifying the customer. The records change as the steps finish."),
      f("backstage"),
      h("When a system is down"),
      p("Switch to System unavailable in the conversation above and run it again. The action fails and the agent says so. Nothing is changed, no success is shown, and a ticket goes to a person carrying the whole conversation and what was tried. The customer does not have to explain it all again."),
      f("outcome"),
      h("Making it fit your business"),
      p("Building this means connecting to the systems your team already uses, encoding your support policies and approval rules, and deciding exactly when a person should step in."),
      f("tailor"),
    ],
    closingNote:
      "How an online retailer's support chat can complete the workflow, or hand off cleanly when it cannot, shown on sample data.",
  },
};
