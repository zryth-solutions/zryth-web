/**
 * Privacy Policy and Terms & Conditions. Structured data, rendered by
 * LegalDocument. The text describes what the website actually does today (an
 * enquiry form handled by the hosting provider, no analytics or advertising
 * scripts, one embedded map) and the services listed on /services.
 *
 * Keep it in step with the product: if analytics, new forms or new data flows
 * are added, update the relevant section and LEGAL_UPDATED. These are drafts
 * of standard provisions; have them reviewed by counsel before relying on them.
 */

import { ADDRESS, EMAILS, PHONE } from "@/content/contact";

export const COMPANY = "Zryth Solutions Private Limited";
export const COMPANY_SHORT = "Zryth";
export const LEGAL_UPDATED = "12 October 2026";

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] };

export type LegalSection = { id: string; title: string; blocks: LegalBlock[] };

export type LegalDoc = {
  slug: "privacy-policy" | "terms-and-conditions";
  title: string;
  description: string;
  intro: string;
  sections: LegalSection[];
};

const p = (text: string): LegalBlock => ({ type: "p", text });
const ul = (...items: string[]): LegalBlock => ({ type: "list", items });

const CONTACT = `${EMAILS.join(" or ")}, or by phone on ${PHONE}`;

export const PRIVACY: LegalDoc = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  description:
    "How Zryth Solutions Private Limited collects, uses and protects personal data on this website and when delivering AI and software services.",
  intro: `${COMPANY} (“${COMPANY_SHORT}”, “we”, “us”) is a company incorporated in India with its office at ${ADDRESS}. This policy explains what personal data we collect through this website and while delivering our services, why we collect it, who sees it, and the choices you have under the Digital Personal Data Protection Act, 2023 and other applicable Indian law.`,
  sections: [
    {
      id: "scope",
      title: "What this policy covers",
      blocks: [
        p("It covers two situations. The first is you visiting zryth.com, writing to us or booking a session with us. The second is when a business engages us to build or run AI and software for it, and we handle data on that business's behalf."),
        p("In the first case we decide why and how your data is used. In the second case our client decides, and we act as its processor under a written agreement (see “Data we handle for clients” below)."),
      ],
    },
    {
      id: "collect",
      title: "Information we collect",
      blocks: [
        p("Information you give us:"),
        ul(
          "The enquiry form on the Get started page: your company name, email address, phone number, the type of session you want (for example a discovery audit or an AI seminar) and any message you choose to write",
          "Anything you send us by email, phone, WhatsApp or LinkedIn",
          "Business contact details you share in meetings, proposals and contracts",
        ),
        p("Information collected automatically: when you visit the site, our hosting provider records standard server logs, such as your IP address, browser and device type, the pages requested and the time. We use these to run and secure the site."),
        p("Cookies and trackers: at the time of writing this website does not use analytics, advertising or social-media tracking scripts. The Get started page embeds a Google Map, and Google may set its own cookies when that map loads. If we add analytics or any other tracker in future, we will update this policy first and ask for consent where the law requires it."),
      ],
    },
    {
      id: "use",
      title: "How we use it",
      blocks: [
        ul(
          "To reply to your enquiry and arrange sessions you asked for",
          "To prepare and deliver proposals, contracts and services",
          "To send you information about our work only where you have asked for it or agreed to it, and to let you stop at any time",
          "To keep the website and our systems secure and working",
          "To meet legal, tax and accounting obligations and to handle disputes",
        ),
        p("We use your details only for the purpose you gave them. We do not sell personal data."),
      ],
    },
    {
      id: "basis",
      title: "Consent and lawful use",
      blocks: [
        p("When you submit the enquiry form or contact us, you consent to us using your details to respond. You can withdraw that consent at any time by writing to us; withdrawing does not affect what we did before. Where the law allows us to process data without consent, for example to comply with a legal obligation, we do so only for that purpose."),
      ],
    },
    {
      id: "client-data",
      title: "Data we handle for clients",
      blocks: [
        p("Our services can involve personal and business data that belongs to our clients and their customers:"),
        ul(
          "Document AI: invoices, bills, forms and other documents, which may contain names, addresses, tax and bank details",
          "Voice AI: call audio, transcripts and booking or customer records",
          "Chat AI: conversation text and the order, ticket or customer records the assistant looks up",
          "Custom AI automation and software development: operational data from the client's systems",
          "Developer staff augmentation: access to the client's code, systems and data while working inside its team",
        ),
        p("For this data the client is the data fiduciary and we are its processor. We handle it only to deliver the agreed services and on the client's documented instructions, under confidentiality obligations, and we do not use it for any other purpose unless the client agrees in writing. The client is responsible for having a lawful basis and any required consents for the data it asks us to process, including consent to record calls and notice to people who are talking to an automated assistant."),
        p("When we build with third-party AI models or cloud services on a client's behalf, we choose them per workload, including where the data is allowed to live, and agree this with the client in advance."),
      ],
    },
    {
      id: "sharing",
      title: "Who we share data with",
      blocks: [
        p("We share personal data only where needed, and only with:"),
        ul(
          "Service providers that help us run the website and our business, such as our hosting and form-handling provider (Netlify), email and communication tools, and cloud infrastructure",
          "AI model, cloud and telephony providers used to deliver a client's services, as agreed with that client",
          "Professional advisers such as accountants and lawyers, under confidentiality",
          "Authorities, courts or other parties where the law requires or where needed to protect our rights",
        ),
        p("These providers may only use the data to provide their service to us. Links from this site to LinkedIn, Instagram, WhatsApp and Google Maps lead to services with their own privacy policies, which we do not control."),
      ],
    },
    {
      id: "transfers",
      title: "Where data is processed",
      blocks: [
        p("Some of our providers run servers outside India. Where personal data is transferred outside India we do so in line with Indian law and only to providers that give it appropriate protection. For client work, the client can ask us to keep data in a region it specifies."),
      ],
    },
    {
      id: "retention",
      title: "How long we keep data",
      blocks: [
        p("We keep enquiry and contact details for as long as needed to respond and to maintain a business relationship, and for as long as the law requires us to keep business records. Client data is kept for the duration of the engagement and then returned or deleted as the agreement says. When data is no longer needed we delete or anonymise it."),
      ],
    },
    {
      id: "security",
      title: "How we protect it",
      blocks: [
        p("We use reasonable security safeguards, including encrypted connections to this website, access limited to people who need it, and confidentiality obligations for our team. No system is perfectly secure. If a personal data breach affects you or our clients, we will notify the people and authorities that the law requires us to."),
      ],
    },
    {
      id: "rights",
      title: "Your rights",
      blocks: [
        p("Under the Digital Personal Data Protection Act, 2023 you have the right to:"),
        ul(
          "Ask for a summary of the personal data we hold about you and how we use it",
          "Ask us to correct inaccurate or incomplete data, and to update it",
          "Ask us to erase your data when it is no longer needed for the purpose it was given, unless the law requires us to keep it",
          "Withdraw consent you have given",
          "Have your grievance addressed, and nominate another person to exercise these rights if you die or become unable to",
        ),
        p(`To use any of these rights, write to us at ${CONTACT}, saying what you want and from which email address or phone number you contacted us, so we can find your records. We may need to confirm who you are first. We will reply within the time the law sets, and in any case without unreasonable delay. If you are not satisfied with our response, you may complain to the Data Protection Board of India once it is operational.`),
      ],
    },
    {
      id: "children",
      title: "Children",
      blocks: [
        p("Our website and services are for businesses and are not directed at children under 18. We do not knowingly collect personal data from children. If you believe a child has sent us data, write to us and we will delete it."),
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      blocks: [
        p(`We may update this policy when our website, services or the law change. The date at the top shows when it was last updated. For significant changes affecting how we use your data, we will give you notice.`),
      ],
    },
    {
      id: "contact",
      title: "Contact and grievances",
      blocks: [
        p(`Questions, requests and complaints about personal data go to ${COMPANY}, ${ADDRESS}. Email ${EMAILS.join(" or ")}, or call ${PHONE}. Please put “Privacy request” in the subject line.`),
      ],
    },
  ],
};

export const TERMS: LegalDoc = {
  slug: "terms-and-conditions",
  title: "Terms & Conditions",
  description:
    "The terms that apply to the Zryth website and to our AI automation, software development, Document AI, Voice AI, Chat AI and developer staff augmentation services.",
  intro: `These terms apply to your use of zryth.com and to the services provided by ${COMPANY} (“${COMPANY_SHORT}”, “we”, “us”). By using the website you accept them. When a business engages us for a project, these terms apply alongside the proposal or statement of work (“SOW”) that we agree in writing; if the two conflict, the signed agreement prevails.`,
  sections: [
    {
      id: "services",
      title: "Our services",
      blocks: [
        p("We provide the following services. The exact scope, deliverables, timelines and fees of each engagement are set out in its proposal or SOW."),
        ul(
          "Custom AI Automation: AI agents and workflows built around a client's systems and rules",
          "Custom Software Development: internal tools, portals and products, with AI where it helps",
          "Document AI: reading documents and matching them against a client's records, with exceptions sent for review",
          "Voice AI: voice agents for calls such as bookings, lookups and confirmations",
          "Chat AI: chat assistants that look up records and take actions in a client's systems",
          "Developer Staff Augmentation: AI and full-stack engineers who work inside a client's team",
        ),
        p("Work outside the agreed scope is handled through a written change request and may change the timeline and fees."),
      ],
    },
    {
      id: "free-sessions",
      title: "Free sessions and demonstrations",
      blocks: [
        p("The free discovery audit and AI seminar are offered without obligation. They are not a contract for paid services, and we may change or withdraw them. The demonstrations and walkthroughs on this website run on sample data and scripted examples. They illustrate how a solution can work and are not live systems, real client data or a guarantee of what a solution will do for you."),
        p("Results described in our case studies were achieved for those clients in their circumstances. Your results will depend on your data, processes and use."),
      ],
    },
    {
      id: "client-duties",
      title: "What we need from clients",
      blocks: [
        ul(
          "Accurate information and timely access to the people, systems and data the work needs",
          "Decisions, approvals and feedback within the times agreed",
          "The right to give us the data you ask us to process, including any consents needed from your customers and staff",
          "Compliance with the laws that apply to your use of what we build, including notices that people are speaking with an automated assistant and consent to record calls",
        ),
        p("Delays in these inputs can delay delivery. We are not responsible for delay or failure caused by them."),
      ],
    },
    {
      id: "ai-outputs",
      title: "AI outputs and human review",
      blocks: [
        p("AI systems work on probabilities and can make mistakes: they can misread a document, mishear a call, or give an incorrect answer. We design solutions with checks and with a person in the loop where a decision matters, and we measure accuracy on the client's own examples where we can. We cannot guarantee that an AI system will be error-free."),
        p("The client remains responsible for how it uses outputs, and for keeping appropriate human review for decisions that affect people, money or compliance."),
      ],
    },
    {
      id: "fees",
      title: "Fees and payment",
      blocks: [
        p("Fees, billing schedule and payment terms are set out in the SOW. Unless stated otherwise, fees are in Indian rupees and exclude GST and other applicable taxes. Costs of third-party services that a solution uses, such as AI model usage, cloud hosting, telephony and messaging, are either included in the SOW or billed at cost as the SOW says. Late payments may attract interest as the SOW provides, and we may pause work on overdue invoices after notice."),
      ],
    },
    {
      id: "ip",
      title: "Ownership and intellectual property",
      blocks: [
        ul(
          "Client data and content stay the client's. We receive only the rights needed to deliver the services.",
          "Custom deliverables built specifically for the client: ownership or licence passes to the client as set out in the SOW, once the related fees are paid in full.",
          "Our pre-existing materials, tools, frameworks, models, know-how and general learnings remain ours. Where they are part of a deliverable, the client receives a licence to use them as part of that deliverable.",
          "Third-party and open-source components are provided under their own licences.",
          "Our products, such as FinanceAuditor.ai, Mill Software and Oswaal AI, are licensed, not sold, under their own terms.",
        ),
      ],
    },
    {
      id: "confidentiality",
      title: "Confidentiality",
      blocks: [
        p("Each party will keep the other's non-public business, technical and personal information confidential, use it only for the engagement, and disclose it only to people who need it and are bound to keep it confidential, or where the law requires. This does not cover information that is already public, independently developed, or lawfully obtained from someone else. These duties continue after the engagement ends."),
      ],
    },
    {
      id: "data",
      title: "Data protection",
      blocks: [
        p("For personal data we process for a client, the client is the data fiduciary and we are its processor. We process it only to deliver the services and on the client's instructions, apply reasonable security safeguards, tell the client without undue delay if we become aware of a breach affecting its data, and return or delete the data when the engagement ends, as the agreement says. See our Privacy Policy for how we handle data in general."),
      ],
    },
    {
      id: "third-party",
      title: "Third-party services",
      blocks: [
        p("Our solutions may rely on third-party AI models, cloud platforms, telephony, messaging and payment providers. Those providers' own terms apply to their services, and their availability, pricing or behaviour can change. We select providers with the client's needs in mind, but we are not responsible for outages or changes outside our reasonable control."),
      ],
    },
    {
      id: "staff-aug",
      title: "Developer staff augmentation",
      blocks: [
        ul(
          "The engineers we provide remain engaged by us, not by the client, and no employment relationship arises between them and the client.",
          "The client directs the day-to-day work, provides tools and access, and treats our engineers' work as it would its own team's.",
          "Work product created for the client is dealt with as the SOW says; our engineers are bound by confidentiality.",
          "Either party may ask for a change of personnel on reasonable grounds, with reasonable notice.",
          "Any restriction on hiring each other's staff applies only if the SOW says so.",
        ),
      ],
    },
    {
      id: "website",
      title: "Using this website",
      blocks: [
        p("You may use the website for lawful purposes only. Do not attempt to gain unauthorised access, probe or disrupt it, scrape it at scale, introduce harmful code, or submit false or unlawful content through the enquiry form."),
        p("The website's text, design, code and branding belong to us or our licensors. Photographs from Unsplash are used under the Unsplash licence and credited on the pages where they appear. You may link to our pages and quote them with attribution, but may not copy or reuse them otherwise without our permission."),
      ],
    },
    {
      id: "warranty",
      title: "Our commitment and its limits",
      blocks: [
        p("We will perform the services with reasonable skill and care and in line with the SOW. Except for this, and to the extent the law allows, the website and services are provided “as is”, and we do not promise specific business results, uninterrupted or error-free operation, or fitness for a particular purpose."),
      ],
    },
    {
      id: "liability",
      title: "Limit of liability",
      blocks: [
        p("To the extent the law allows, neither party is liable for indirect, incidental or consequential loss, or for loss of profit, revenue, data or goodwill. Each party's total liability arising from an engagement is limited to the fees paid or payable to us under the SOW for the 12 months before the claim arose, unless the SOW sets a different limit. Nothing here limits liability that cannot be limited by law."),
      ],
    },
    {
      id: "indemnity",
      title: "Indemnity",
      blocks: [
        p("The client will cover us against third-party claims arising from data, instructions or content it gives us without the right to do so, or from its unlawful use of what we deliver. We will cover the client against third-party claims that a custom deliverable we created infringes that party's intellectual property rights, provided the client tells us promptly and lets us handle the defence. Both are subject to the limit above."),
      ],
    },
    {
      id: "termination",
      title: "Term and termination",
      blocks: [
        p("An engagement runs for the period in the SOW. Either party may end it by written notice as the SOW provides, or immediately if the other commits a serious breach that is not fixed within a reasonable time after notice. On ending, the client pays for work done and costs committed up to that date, and we return or delete the client's data. Sections that by nature should continue, such as confidentiality, intellectual property, payment and liability, continue."),
      ],
    },
    {
      id: "force-majeure",
      title: "Events beyond our control",
      blocks: [
        p("Neither party is liable for delay or failure caused by events outside its reasonable control, such as natural disasters, power or network failures, government action or failures of third-party platforms. The affected party will tell the other promptly and take reasonable steps to resume."),
      ],
    },
    {
      id: "law",
      title: "Governing law and disputes",
      blocks: [
        p("These terms are governed by the laws of India. We will first try to resolve any dispute through good-faith discussion. If that does not work, the courts at Noida (Gautam Buddh Nagar), Uttar Pradesh have exclusive jurisdiction, unless the SOW provides for arbitration."),
      ],
    },
    {
      id: "changes",
      title: "Changes to these terms",
      blocks: [
        p("We may update these terms for the website and for new engagements. The date at the top shows the latest version. Changes do not alter the terms of an existing signed SOW unless both parties agree."),
      ],
    },
    {
      id: "contact",
      title: "Contact",
      blocks: [
        p(`${COMPANY}, ${ADDRESS}. Email ${EMAILS.join(" or ")}, or call ${PHONE}.`),
      ],
    },
  ],
};
