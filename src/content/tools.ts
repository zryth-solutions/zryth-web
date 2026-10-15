/**
 * The free tools at tools.zryth.com, each given its own page on zryth.com
 * under Resources → Tools. Everything stated about a tool (what it does, what
 * it stores, what it costs) mirrors what the tools site itself says; the
 * extra copy is general QR-code guidance. "Try now" sends people to the tool.
 */

export const TOOLS_SITE = "https://tools.zryth.com";

export type ToolSlug =
  | "qr-code-generator"
  | "dynamic-qr-code-generator"
  | "whatsapp-qr-code-generator"
  | "wifi-qr-code-generator"
  | "vcard-qr-code-generator"
  | "ai-chatbot-cost-calculator";

type VersusSide = { label: string; points: string[] };

export type Tool = {
  slug: ToolSlug;
  /** Short name, as on tools.zryth.com. */
  name: string;
  /** Full page name, used for the title and schema. */
  title: string;
  /** Two-line headline for the page hero. */
  heroLines: [string, string];
  /** One line for cards and the hub. */
  blurb: string;
  /** Lead paragraph under the headline. */
  lead: string;
  /** Meta description. */
  description: string;
  keywords: string[];
  badges: string[];
  steps: { title: string; body: string }[];
  useCases: { title: string; body: string }[];
  tips: string[];
  /** Heading above the tips. Defaults to QR-code wording. */
  tipsTitle?: string;
  faqs: { q: string; a: string }[];
  /** Shown only where a comparison helps (static vs dynamic). */
  compare?: { heading: string; rows: { label: string; body: string }[] };
  /** Two sides compared point by point, shown near the top; the second side is highlighted. */
  versus?: { heading: string; title: string; sides: [VersusSide, VersusSide] };
  /** Tools default to the QR code group on the hub. */
  category?: "ai";
  related: ToolSlug[];
};

export const TOOLS: Tool[] = [
  {
    slug: "qr-code-generator",
    name: "Website URL QR",
    title: "Free URL QR Code Generator",
    heroLines: ["URL QR Code", "Generator."],
    blurb: "Turn any website link into a ready-to-share QR code.",
    lead: "Create a static QR code for a website, document or online page. Preview it instantly, pick your colours and size, and download a PNG or SVG. No account needed.",
    description:
      "Free URL QR code generator. Turn a website, document or page link into a static QR code, then download it as a PNG or SVG with no sign-in.",
    keywords: [
      "URL QR code generator",
      "free QR code generator",
      "website QR code",
      "link to QR code",
      "QR code PNG SVG",
      "static QR code",
    ],
    badges: ["100% free", "Made in your browser", "No signup needed", "PNG & SVG"],
    steps: [
      { title: "Add your link", body: "Paste the website, document or page address you want people to reach." },
      { title: "Make it yours", body: "Choose your colours and size. The preview updates as you go, so you can see exactly what you will print." },
      { title: "Download and test", body: "Save a crisp PNG or SVG, then scan it with a phone before it goes anywhere near a printer." },
    ],
    useCases: [
      {
        title: "Business cards",
        body: "Link a business card to your portfolio, your company site or a booking page. A card has room for a name and a number; a QR code gives it everything else, one scan away.",
      },
      {
        title: "Event posters",
        body: "Put the event page on the poster instead of a long address nobody will type. People walking past can scan once and land on the schedule, the registration form or the map.",
      },
      {
        title: "Feedback forms",
        body: "Give customers a direct route to a feedback form on a receipt, a table card or a delivery note. The shorter the path, the more replies you get.",
      },
    ],
    tips: [
      "Keep strong contrast between the code and its background. Dark on light scans most reliably.",
      "Leave clear space around the code. Text or images pressed against the edge can stop it scanning.",
      "Use SVG for print, since it stays sharp at any size, and PNG for screens and everyday use.",
      "Always test the finished print with a phone, ideally more than one.",
    ],
    faqs: [
      {
        q: "Can I change a static QR code after printing?",
        a: "A static QR code contains the original link. To change it, create a new code, or use a dynamic QR code from the start.",
      },
      {
        q: "Do static QR codes expire?",
        a: "The QR image does not expire. It works for as long as its destination remains available.",
      },
      {
        q: "Which format should I download?",
        a: "PNG works well for screens and everyday use. SVG stays sharp at any size and is useful for print.",
      },
      {
        q: "Is the URL QR code generator free?",
        a: "Yes. It is free, runs in your browser, and does not need an account.",
      },
    ],
    related: ["dynamic-qr-code-generator", "whatsapp-qr-code-generator", "wifi-qr-code-generator", "vcard-qr-code-generator"],
  },
  {
    slug: "dynamic-qr-code-generator",
    name: "Dynamic QR",
    title: "Free Dynamic QR Code Generator",
    heroLines: ["Dynamic QR Code", "Generator."],
    blurb: "Change the destination. Keep the same QR code.",
    lead: "Create a QR code with an editable destination. Update the link from your dashboard without reprinting the code, and see basic scan activity.",
    description:
      "Free dynamic QR code generator. Make a QR code with an editable destination, update the link without reprinting, and see basic scan activity.",
    keywords: [
      "dynamic QR code generator",
      "editable QR code",
      "QR code with analytics",
      "change QR code destination",
      "free dynamic QR code",
      "QR code scan tracking",
    ],
    badges: ["Free", "Editable destination", "Basic scan activity", "Sign in with Google to save"],
    steps: [
      { title: "Add your link", body: "Enter the destination, give the QR a name so you can find it later, and choose your colours." },
      { title: "Save it", body: "Sign in with Google to save the code. An account keeps your links and analytics in one place." },
      { title: "Share, then update whenever", body: "Download and print it. When the destination needs to change, edit it in My QR codes. The printed code stays exactly the same." },
    ],
    useCases: [
      {
        title: "Restaurant menus",
        body: "Update the menu behind the QR on your table cards whenever dishes or prices change, without reprinting a single card.",
      },
      {
        title: "Event schedules",
        body: "Posters go up weeks before an event, and plans change. Point the code at the schedule page and edit the destination when the schedule moves.",
      },
      {
        title: "Product packaging",
        body: "Packaging is printed in bulk and stays in circulation. A dynamic code lets you send visitors to a new support page without touching the pack.",
      },
    ],
    compare: {
      heading: "Static or dynamic?",
      rows: [
        {
          label: "Static QR",
          body: "Encodes the destination directly. No account or redirect service is needed. To change the destination, you create a new QR image.",
        },
        {
          label: "Dynamic QR",
          body: "Encodes a stable redirect link. An account is required to save and manage it. You can edit the destination and keep the printed QR.",
        },
      ],
    },
    tips: [
      "Pick dynamic whenever you are printing at volume or the destination might change.",
      "Name each code clearly, so the right one is easy to find in your dashboard.",
      "Treat the scan count as a signal, not a headcount. It counts successful redirects, not unique people.",
      "Test the code on a phone before printing, and again after you edit the destination.",
    ],
    faqs: [
      {
        q: "How does a dynamic QR code work?",
        a: "A dynamic QR encodes a stable redirect URL. The service looks up its current destination and redirects the visitor. Updating that destination keeps the QR image unchanged.",
      },
      {
        q: "Can I edit a QR code after printing?",
        a: "Yes, if it was created as a dynamic QR. Edit its destination in My QR codes. An existing static QR cannot be converted without replacing the printed image.",
      },
      {
        q: "Do dynamic QR codes expire?",
        a: "No expiry is scheduled by the app. Dynamic codes do depend on the service and its domain remaining available, and may be paused or disabled for abuse.",
      },
      {
        q: "What does a scan count mean?",
        a: "A scan is a successful redirect request. Repeat visits and some automated traffic may count, so it is not a count of unique people.",
      },
    ],
    related: ["qr-code-generator", "whatsapp-qr-code-generator", "wifi-qr-code-generator", "vcard-qr-code-generator"],
  },
  {
    slug: "whatsapp-qr-code-generator",
    name: "WhatsApp QR",
    title: "Free WhatsApp QR Code Generator",
    heroLines: ["WhatsApp QR Code", "Generator."],
    blurb: "Start a conversation with a single scan.",
    lead: "Create a QR code that opens a WhatsApp chat with an international phone number and an optional pre-filled message. The visitor chooses whether to send it.",
    description:
      "Free WhatsApp QR code generator. Make a QR code that opens a WhatsApp chat with your number and an optional pre-filled message. Download PNG or SVG.",
    keywords: [
      "WhatsApp QR code generator",
      "WhatsApp chat QR code",
      "QR code for WhatsApp number",
      "WhatsApp link QR",
      "free WhatsApp QR",
      "pre-filled WhatsApp message QR",
    ],
    badges: ["100% free", "Made in your browser", "No signup needed", "PNG & SVG"],
    steps: [
      { title: "Add your number", body: "Enter the full international number with the country code, such as +91 for India." },
      { title: "Write an optional message", body: "Pre-fill a greeting or a question so the chat starts with context. The visitor still chooses whether to send it." },
      { title: "Download and test", body: "Pick your colours, download a PNG or SVG and scan it with a phone to confirm it opens the right chat." },
    ],
    useCases: [
      {
        title: "Shop windows",
        body: "Add a customer enquiry link to your shop window. People can ask about stock, prices or opening hours from the pavement, even when the shop is closed.",
      },
      {
        title: "Event enquiries",
        body: "Make it easy to ask about an event. A pre-filled message such as the event name saves the visitor typing and tells you what they are asking about.",
      },
      {
        title: "Printed material",
        body: "Share a contact link on brochures, flyers and packaging, so a reader can start a conversation the moment they have a question.",
      },
    ],
    tips: [
      "Use the full international number including the country code, and leave out the local leading zero after it.",
      "Keep the pre-filled message short and specific, for example the product or event the visitor is asking about.",
      "A scan opens the chat. It does not send a message by itself.",
      "A static code stores its original link. Save a dynamic version if the number might change.",
    ],
    faqs: [
      {
        q: "How should I enter my phone number?",
        a: "Use the full international number including the country code, such as +91 for India. Omit the local leading zero after the country code.",
      },
      {
        q: "Is the message sent automatically?",
        a: "No. WhatsApp opens a chat with your draft message. The visitor still chooses whether to send it.",
      },
      {
        q: "Can I change the number later?",
        a: "A static WhatsApp QR stores its original link. Save a dynamic version to update the destination later.",
      },
      {
        q: "Is the WhatsApp QR code generator free?",
        a: "Yes. It is free, runs in your browser, and does not need an account.",
      },
    ],
    related: ["qr-code-generator", "dynamic-qr-code-generator", "wifi-qr-code-generator", "vcard-qr-code-generator"],
  },
  {
    slug: "wifi-qr-code-generator",
    name: "WiFi QR",
    title: "Free WiFi QR Code Generator",
    heroLines: ["WiFi QR Code", "Generator."],
    blurb: "Help guests get connected, without the typing.",
    lead: "Create a WiFi QR code from your network name, password and security type. Generation stays in your browser, and WiFi passwords are never sent to our server.",
    description:
      "Free WiFi QR code generator. Create a WiFi QR from your network name, password and security type. It runs in your browser and never uploads your password.",
    keywords: [
      "WiFi QR code generator",
      "QR code for WiFi password",
      "guest WiFi QR code",
      "share WiFi with QR",
      "free WiFi QR",
      "WiFi QR code printable",
    ],
    badges: ["100% free", "Made in your browser", "Password never uploaded", "PNG & SVG"],
    steps: [
      { title: "Add your network", body: "Enter the network name (SSID), pick the security type, and add the password. Turn on Hidden network if the name is not broadcast." },
      { title: "Make it yours", body: "Choose colours and size, and check the preview as it updates." },
      { title: "Download and place it", body: "Save a PNG or SVG, print it, and test it with the phones your guests are likely to use." },
    ],
    useCases: [
      {
        title: "Guest networks",
        body: "Give visitors access to a guest network without reading out a password or spelling it twice. One scan, and they are connected.",
      },
      {
        title: "Meeting rooms",
        body: "Place a WiFi card in a meeting room, so clients and candidates can get online as soon as they sit down.",
      },
      {
        title: "Home WiFi",
        body: "Print a connection card for your home, so friends and family do not need to ask for the password.",
      },
    ],
    tips: [
      "A WiFi QR contains the password in readable form. Share it only with people who should have access, ideally on a guest network.",
      "Choose the security type that matches your router: WPA / WPA2, WEP, or No password.",
      "Support varies by device and camera app. Many recent phones recognise WiFi codes, so test on the devices you expect.",
      "If you change the password, generate a new code and replace the printed one.",
    ],
    faqs: [
      {
        q: "Is my WiFi password stored?",
        a: "No. WiFi details are processed only in your browser and are not saved to your account or sent to the server.",
      },
      {
        q: "Can anyone read the password from the QR?",
        a: "Yes. A WiFi QR contains the password in readable form. Share it only with people who should have access, ideally for a guest network.",
      },
      {
        q: "Will every phone connect automatically?",
        a: "Support varies by device and camera app. Many recent phones recognise WiFi QR codes. Test with the devices you expect guests to use.",
      },
      {
        q: "What if my network is hidden?",
        a: "Turn on the Hidden network option when you create the code, so the QR carries the details a device needs to find a network that is not broadcast.",
      },
    ],
    related: ["qr-code-generator", "dynamic-qr-code-generator", "whatsapp-qr-code-generator", "vcard-qr-code-generator"],
  },
  {
    slug: "vcard-qr-code-generator",
    name: "vCard QR",
    title: "Free vCard QR Code Generator",
    heroLines: ["vCard QR Code", "Generator."],
    blurb: "Your contact details, one scan away.",
    lead: "Put your name, company, phone number, email and website into a vCard QR code. Compatible phones can preview the details and add them to contacts.",
    description:
      "Free vCard QR code generator. Put your name, company, phone, email and website in a QR code that phones can save to contacts. Download PNG or SVG.",
    keywords: [
      "vCard QR code generator",
      "contact QR code",
      "business card QR code",
      "digital business card QR",
      "free vCard QR",
      "save contact QR code",
    ],
    badges: ["100% free", "Made in your browser", "Details never uploaded", "PNG & SVG"],
    steps: [
      { title: "Add your details", body: "Enter your full name, then add as much or as little as you like: company, job title, phone, email, website and address." },
      { title: "Make it yours", body: "Pick colours and size, and check the preview as it updates." },
      { title: "Download and test", body: "Save a PNG or SVG, then scan it to confirm your phone offers to save the contact." },
    ],
    useCases: [
      {
        title: "Business cards",
        body: "Add a contact QR to your business card. The person you meet can save your details straight to their phone instead of typing them in later.",
      },
      {
        title: "Event speakers",
        body: "Share a speaker's contact details on a slide or a badge, so attendees can follow up with them without hunting for a name.",
      },
      {
        title: "Business contacts",
        body: "Help customers save a business contact from a shop counter, an invoice or a leaflet, so your number is in their phone when they need it.",
      },
    ],
    tips: [
      "More contact fields create a denser code. Keep details concise and print the code larger if you include a lot.",
      "The information is contained in the QR image itself, so share it intentionally.",
      "Test the code on both iPhone and Android before printing.",
      "Print at a comfortable size and leave clear space around the code so it scans quickly.",
    ],
    faqs: [
      {
        q: "What is a vCard QR code?",
        a: "It is a QR code containing a digital contact card. A compatible scanner offers to save its details to the address book.",
      },
      {
        q: "Are my contact details uploaded?",
        a: "No. Contact cards are generated in your browser. The information is contained in the QR image, so share it intentionally.",
      },
      {
        q: "Why is my QR more detailed?",
        a: "More contact fields create a denser code. Keep details concise, use a larger printed size, and test it before printing.",
      },
      {
        q: "Which fields can I include?",
        a: "Full name, company, job title, phone number, email, website and address. Only the full name is required.",
      },
    ],
    related: ["qr-code-generator", "dynamic-qr-code-generator", "whatsapp-qr-code-generator", "wifi-qr-code-generator"],
  },
  {
    slug: "ai-chatbot-cost-calculator",
    name: "AI Chatbot Cost Calculator",
    title: "Free AI Chatbot Cost Calculator",
    heroLines: ["AI Chatbot Cost", "Calculator."],
    blurb: "Estimate what a website chatbot costs to run each month.",
    lead: "Answer two questions: how many conversations each user has in a month, and how many active users you expect. Get an estimated monthly AI cost for your website chatbot, in US dollars.",
    description:
      "Free AI chatbot cost calculator. Enter conversations per user and monthly active users to estimate what a website chatbot costs to run each month.",
    keywords: [
      "AI chatbot cost calculator",
      "chatbot cost estimate",
      "website chatbot pricing",
      "AI chatbot monthly cost",
      "chatbot running cost",
      "cost of AI customer support",
    ],
    badges: ["100% free", "Two questions", "No signup needed", "Results in US dollars"],
    steps: [
      { title: "Add your conversations", body: "Enter how many chats one person usually starts with your chatbot in a month." },
      { title: "Add your users", body: "Enter how many different people use the chatbot in a month." },
      { title: "See your cost", body: "Get the monthly cost, the cost per conversation, the cost per user and the cost for a year." },
    ],
    useCases: [
      {
        title: "Planning a chatbot",
        body: "Before you build or buy a chatbot, see what it would cost to run at your traffic. A clear monthly figure makes the decision easier to discuss and approve.",
      },
      {
        title: "Setting a budget",
        body: "Turn expected users into a monthly and yearly figure you can put in a budget, and see how the cost changes as your audience grows.",
      },
      {
        title: "Comparing quotes",
        body: "Check a vendor quote against the AI usage behind it. If a plan charges far more per conversation than the AI costs, you know what you are paying for.",
      },
    ],
    versus: {
      heading: "CRM chatbot or Zryth chatbot?",
      title: "Why a Zryth chatbot does more.",
      sides: [
        {
          label: "Typical CRM chatbot",
          points: [
            "Answers from a script or collects a lead",
            "Built on the vendor's templates and flows",
            "Works mostly inside its own CRM",
            "Limited to the actions the platform allows",
            "Customers often repeat themselves after a handoff",
            "Runs in the vendor's own chat widget",
          ],
        },
        {
          label: "Zryth chatbot",
          points: [
            "Finishes the job: looks up the record and completes the request",
            "Built around your policies, knowledge and approval rules",
            "Connects to your order, ticket, CRM and messaging systems",
            "Asks before it changes anything, with clear limits",
            "Hands off to a person with the whole conversation attached",
            "Runs on your website and the messaging apps your customers use",
          ],
        },
      ],
    },
    tipsTitle: "Tips for a realistic estimate.",
    tips: [
      "Count conversations, not messages. One visit to the chatbot is one conversation, however many messages it has.",
      "Use monthly active users, the people who actually open the chatbot, not every visitor to your website.",
      "Start with your current numbers, then try a higher figure to see the cost as you grow.",
      "Taxes are not included in the estimate.",
    ],
    faqs: [
      {
        q: "How is the cost calculated?",
        a: "The calculator multiplies conversations per user by monthly active users, then prices each conversation at standard AI usage rates. Each conversation is about two minutes of back-and-forth chat.",
      },
      {
        q: "What counts as a conversation?",
        a: "A conversation starts when a visitor sends their first message to the chatbot and ends when they leave. If the same person comes back another day and chats again, that is a new conversation.",
      },
      {
        q: "What is not included?",
        a: "Databases, chatbot platform fees and taxes are not included.",
      },
      {
        q: "Is the AI chatbot cost calculator free?",
        a: "Yes. It is free, runs in your browser, and does not need an account.",
      },
    ],
    category: "ai",
    related: ["qr-code-generator", "dynamic-qr-code-generator", "whatsapp-qr-code-generator", "vcard-qr-code-generator"],
  },
];

export const COMING_SOON = [
  { name: "Finance tools", line: "Everyday calculators for money matters." },
  { name: "Marketing tools", line: "Small helpers for campaigns and content." },
  { name: "Education tools", line: "Handy utilities for teachers and learners." },
  { name: "Business tools", line: "Shortcuts for the daily running of things." },
  { name: "Developer tools", line: "Formatters, encoders and quick checks." },
  { name: "AI tools", line: "Focused AI helpers for everyday tasks." },
];

export function getTool(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export const toolHref = (slug: string) => `/resources/tools/${slug}`;
export const toolExternalHref = (slug: string) => `${TOOLS_SITE}/${slug}`;
