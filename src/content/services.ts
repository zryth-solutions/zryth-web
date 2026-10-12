/**
 * The services Zryth offers, in the order shown on /services. Each one opens
 * as an article in the same editorial format as the case studies. The text describes the offering;
 * results are quoted only where the site already publishes them. Photos are
 * from Unsplash (see docs/image-credits.md).
 */

export type ServiceBlock =
  | { type: "heading" | "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "figure"; id: "links" | "cta" };

export type Service = {
  slug: string;
  name: string;
  subtitle: string;
  readingTime: string;
  image: { src: string; alt: string; credit: { name: string; url: string } };
  blocks: ServiceBlock[];
  links: { label: string; href: string }[];
  closingNote: string;
};

const h = (text: string): ServiceBlock => ({ type: "heading", text });
const p = (text: string): ServiceBlock => ({ type: "paragraph", text });
const ul = (...items: string[]): ServiceBlock => ({ type: "list", items });
const f = (id: "links" | "cta"): ServiceBlock => ({ type: "figure", id });

export const SERVICES: Service[] = [
  {
    slug: "custom-ai-automation",
    name: "Custom AI Automation",
    subtitle:
      "We find the repetitive, manual work in your business and automate it with AI agents and workflows, built around your systems and your rules.",
    readingTime: "4 min read",
    image: {
      src: "/services/custom-ai-automation.jpg",
      alt: "A blue industrial robot arm working on a factory line",
      credit: { name: "Homa Appliances", url: "https://unsplash.com/photos/blue-industrial-robot-arm-in-factory-sz1CHL7Pky0" },
    },
    blocks: [
      h("Most businesses run on work nobody designed"),
      p("Look closely at any business and you will find work that only exists because two systems do not talk to each other. Someone copies numbers between tools, chases approvals, prepares the same report every week, or checks a pile of records by hand. None of it is hard. All of it is slow, and it grows as the business grows."),
      p("Custom AI automation takes that work off your people. We design agents and workflows that read what comes in, recognise what is routine, do the routine part, and hand the rest to a person with everything they need."),
      h("Where it helps"),
      ul(
        "Reconciliation and matching, such as bills against purchase orders, or GST and TDS data against the books",
        "Data entry and re-keying between systems",
        "Approvals and routing, so work reaches the right person with the right context",
        "Recurring reports and management summaries",
        "Monitoring and follow-up: flagging what looks wrong and chasing what is late",
      ),
      h("What we provide"),
      ul(
        "A review of your current workflow, to find what is worth automating",
        "Design of the agent or workflow, including where a person stays in the loop",
        "Integration with the tools and data you already use",
        "Testing on your real cases before anything goes live",
        "Deployment, training for your team, and follow-up on how it performs",
      ),
      h("How we work with you"),
      p("We start with one workflow, usually the one that costs the most time. We study how it runs today and prove the idea on real examples. Then we build, deploy and measure. Once one workflow works, the next is easier to add."),
      h("See it in practice"),
      p("At Mill Software, procurement, reconciliation and sales were joined into one system, so the matching is done by the system instead of by whoever was reconciling that day."),
      f("links"),
      f("cta"),
    ],
    links: [
      { label: "See the case study: Running a Mill on Phone Calls and Memory", href: "/case-studies/mill-software" },
      { label: "Read: Why a flour mill needs Document AI", href: "/case-studies/document-ai-flour-mills" },
    ],
    closingNote: "What custom AI automation covers, where it helps, and how we work with you on it.",
  },

  {
    slug: "custom-software-development",
    name: "Custom Software Development",
    subtitle:
      "Business software designed, built and deployed around how you operate, from internal tools and portals to full products, with AI built in where it helps.",
    readingTime: "4 min read",
    image: {
      src: "/services/custom-software-development.jpg",
      alt: "A laptop on a table showing lines of code",
      credit: { name: "James Harrison", url: "https://unsplash.com/photos/black-laptop-computer-turned-on-on-table-vpOeXr5wmR4" },
    },
    blocks: [
      h("Off-the-shelf software fits the average business"),
      p("Generic tools are built for the average company. Yours has its own approvals, its own naming and its own rules about who sees what. When the software does not fit, people work around it with spreadsheets, messages and memory."),
      p("We build the software that fits: designed around your process, not the other way round."),
      h("What we build"),
      ul(
        "Internal tools and dashboards",
        "Customer and supplier portals",
        "Operations systems for procurement, billing, dispatch and similar workflows",
        "Products for your own customers, AI-powered ones included",
        "Integrations and data pipelines that connect the systems you already have",
      ),
      h("What we provide"),
      ul(
        "Discovery and design with the people who will actually use the software",
        "Full-stack development: the web front end, the back end and the data",
        "AI features where they earn their place, such as reading documents or answering questions",
        "Deployment on your infrastructure or ours",
        "Support and improvement after launch",
      ),
      h("How we work with you"),
      p("We work in short cycles you can see. You get a first usable version early, then improvements based on how your team uses it. You review each step, so nothing gets built that nobody asked for."),
      h("See what we have built"),
      p("Our own products grew out of this kind of work: FinanceAuditor.ai for audit teams, Mill Software for mills, and Oswaal AI for students."),
      f("links"),
      f("cta"),
    ],
    links: [
      { label: "See our work", href: "/products" },
      { label: "See the product: Mill Software", href: "/products/mill-software" },
    ],
    closingNote: "What custom software development covers, what we build, and how we work with you on it.",
  },

  {
    slug: "document-ai",
    name: "Document AI",
    subtitle:
      "We turn invoices, bills, forms and PDFs into checked, structured records, then match them against your own data and send exceptions to a person.",
    readingTime: "4 min read",
    image: {
      src: "/services/document-ai.jpg",
      alt: "A flat lay of forms and papers on a desk",
      credit: { name: "Kelly Sikkema", url: "https://unsplash.com/photos/stack-of-papers-flat-lay-photography-tQQ4BwN_UFs" },
    },
    blocks: [
      h("Documents are where the manual work hides"),
      p("Invoices arrive as PDFs, bills as photographs, forms as scans. Someone reads each one, types it into a system and checks it against something else. That is slow, and it is where mistakes get in."),
      h("What Document AI does"),
      ul(
        "Reads printed and handwritten documents and extracts the fields a person would type",
        "Keeps each value linked to where it was read, so it can be checked",
        "Normalises names, dates and amounts before matching",
        "Matches against your records and applies your business rules",
        "Sends anything uncertain or inconsistent to a person for review",
      ),
      h("Where it helps"),
      ul(
        "Purchase bills against purchase orders, for mills and manufacturers",
        "Question papers and study material turned into structured content, for publishers",
        "Ledger, GST and TDS reconciliation, for CA firms and finance teams",
        "Forms and applications entered into a system",
      ),
      h("What we provide"),
      ul(
        "Mapping of your documents and the rules that govern them",
        "An extraction pipeline tuned to your document types, handwriting included",
        "Matching and exception review built around your records",
        "Integration with your accounting or operations software",
        "Measurement of accuracy on your own documents",
      ),
      h("What it has done"),
      p("Results from our own published work: at a mill, bill verification accuracy rose from roughly 70–75% to 98%. For an education client, cost per question fell from about ₹12 to ₹5. At a CA firm, audits now run roughly 60% faster."),
      f("links"),
      f("cta"),
    ],
    links: [
      { label: "Read: Why a flour mill needs Document AI", href: "/case-studies/document-ai-flour-mills" },
      { label: "Read: Why a publisher needs Document AI", href: "/case-studies/document-ai-publishers" },
      { label: "Read: Why a CA firm needs Document AI", href: "/case-studies/document-ai-ca-firms" },
    ],
    closingNote: "What Document AI covers, where it helps, and the results it has produced in our own work.",
  },

  {
    slug: "voice-ai",
    name: "Voice AI",
    subtitle:
      "Voice agents for calls that lead to action: bookings and rescheduling, customer lookups and confirmations, connected to the systems behind the call.",
    readingTime: "4 min read",
    image: {
      src: "/services/voice-ai.jpg",
      alt: "A headset with a microphone on a desk",
      credit: { name: "Siwawut Phoophinyo", url: "https://unsplash.com/photos/a-pair-of-black-headphones-sitting-on-top-of-a-table-zo43vop2Iuk" },
    },
    blocks: [
      h("A phone call is still the front door for many businesses"),
      p("Customers call to book, move or check something. Someone has to listen, look up a record, check availability, make a change and confirm it, often while the next call is already waiting."),
      p("A voice agent can take that call. What makes it useful is not the voice. It is the connection: the agent looks up the booking, checks the calendar, asks the caller to confirm, updates the system and sends the confirmation."),
      h("Where it helps"),
      ul(
        "Booking, rescheduling and cancelling appointments",
        "Status calls, such as the state of an order or a service visit",
        "Confirmation and reminder calls",
        "Intake: collecting details before a person takes over",
        "Calls that arrive outside working hours and would otherwise go unanswered",
      ),
      h("What we provide"),
      ul(
        "Design of the call flow, including the confirmations the agent must ask for",
        "Connection to your booking, CRM or records systems",
        "Voice and language setup suited to your callers",
        "Handoff to a person when a call needs one, with the details already captured",
        "Testing before launch",
      ),
      h("An honest note on our demo"),
      p("Our walkthrough uses a scripted call with synthesised voices, on sample data. It shows how a call connects to booking steps. It does not show how fast or how well a live agent performs. For that, we test on your own calls."),
      f("links"),
      f("cta"),
    ],
    links: [{ label: "Try the Voice AI walkthrough", href: "/case-studies/voice-ai" }],
    closingNote: "What Voice AI covers, where it helps, and how a call can lead to action.",
  },

  {
    slug: "chat-ai",
    name: "Chat AI",
    subtitle:
      "Chat assistants that finish the job, not just answer: they look up the record, apply your policy, ask before acting and update your systems.",
    readingTime: "4 min read",
    image: {
      src: "/services/chat-ai.jpg",
      alt: "Speech bubbles on a translucent screen",
      credit: { name: "kuu akura", url: "https://unsplash.com/photos/speech-bubbles-on-translucent-screen-pnK6Q-QTHM4" },
    },
    blocks: [
      h("Chat that only answers leaves the work to your team"),
      p("A customer or employee asks for something. A basic bot answers from a script or sends a link. The real work, looking up the order, checking the policy, making the change and updating the ticket, still lands on a person."),
      p("A Chat AI assistant does that work. It is connected to your systems and follows your rules, and it asks for confirmation before it changes anything."),
      h("Where it helps"),
      ul(
        "Customer support: orders, returns, refunds and replacements",
        "Internal help desks for IT, HR and operations requests",
        "Study and learning assistants that answer doubts from your own content, as Oswaal AI does for students",
        "Sales and service enquiries that need a record looked up",
      ),
      h("What we provide"),
      ul(
        "Assistants built on your policies, knowledge and approval rules",
        "Actions in your order, ticket, CRM and messaging systems",
        "Confirmation steps and clear limits on what the assistant may do",
        "A clean handoff to a person, with the whole conversation attached, when something fails",
        "Deployment on the channels your customers already use, such as your website or messaging apps",
      ),
      h("When something goes wrong"),
      p("If a system is down, the assistant says so, changes nothing, and hands the conversation to a person along with what was tried. The customer does not have to explain it all again."),
      f("links"),
      f("cta"),
    ],
    links: [
      { label: "Try the Chat AI walkthrough", href: "/case-studies/chat-ai" },
      { label: "See the product: Oswaal AI", href: "/products/ai-education" },
    ],
    closingNote: "What Chat AI covers, where it helps, and how an assistant completes the work or hands off cleanly.",
  },

  {
    slug: "developer-staff-augmentation",
    name: "Developer Staff Augmentation",
    subtitle:
      "Add experienced AI and full-stack developers to your team for a project or on an ongoing basis. You set the direction; we bring the engineers.",
    readingTime: "3 min read",
    image: {
      src: "/services/developer-staff-augmentation.jpg",
      alt: "Developers working at computers in a bright office",
      credit: { name: "TECNIC Bioprocess Solutions", url: "https://unsplash.com/photos/office-workers-are-busy-working-on-computers-R4a4zrZ8KfQ" },
    },
    blocks: [
      h("Sometimes the answer is more hands, not a new vendor"),
      p("You may already know what to build, and have a team to lead it. What you lack is capacity, or one specific skill: someone who has shipped AI features, or a full-stack developer who can own a module."),
      p("Staff augmentation adds engineers to your team without a long hiring cycle. They work in your tools, follow your process and report to your lead."),
      h("Who you can add"),
      ul(
        "AI engineers, for document, voice and chat AI and for automation",
        "Full-stack developers, for web applications, back ends and integrations",
        "A single engineer for a specific module, or a small group for a larger build",
      ),
      h("How it works"),
      ul(
        "We agree the roles, skills and expected duration with you",
        "We propose engineers whose experience fits the work",
        "They join your team, your tools and your working hours",
        "You direct the work and review it as you would your own staff",
        "You scale up or down as the work changes",
      ),
      h("What you keep"),
      p("You keep control of the roadmap, the code and the priorities. We take care of the engineers' side, so you manage the work and not the hiring."),
      h("When it is the right fit"),
      p("It fits when you have clear direction and need capacity or AI experience quickly. If you would rather hand over the whole outcome, our custom AI automation and custom software development services fit better."),
      f("links"),
      f("cta"),
    ],
    links: [
      { label: "Custom AI Automation", href: "/services/custom-ai-automation" },
      { label: "Custom Software Development", href: "/services/custom-software-development" },
      { label: "Meet the team", href: "/about" },
    ],
    closingNote: "What developer staff augmentation covers, who you can add to your team, and how it works.",
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

export function nextService(slug: string) {
  const i = SERVICES.findIndex((s) => s.slug === slug);
  return SERVICES[(i + 1) % SERVICES.length];
}
