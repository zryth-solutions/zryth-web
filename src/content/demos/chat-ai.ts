import { layoutCues } from "@/lib/demos/useTimeline";

/**
 * Chat AI demo script: a damaged-delivery support chat. Everything here is a
 * local fixture. Connector names are generic: no real system is contacted.
 */

export const ORDER = {
  id: "ZY-1042",
  item: "Desk lamp (sample item)",
  total: 109,
  deliveredDaysAgo: 5,
  stockBefore: 12,
};

export const POLICY = {
  name: "Sample returns policy",
  windowDays: 30,
  text: "Damaged items can be replaced or refunded within 30 days of delivery.",
};

export const TICKET_ID = "TCK-3187";

export const CONNECTORS = ["Order system", "Policy library", "Ticketing", "Customer messaging"];

/** Millisecond marks of the auto-played opening. */
export const INTRO = {
  msgReport: 800,
  typingAsk: [1500, 3200] as const,
  msgAsk: 3200,
  msgOrderNumber: 5200,
  lookupStart: 5600,
  lookupDone: 7400,
  policyDone: 9200,
  typingOffer: [9500, 11200] as const,
  msgOffer: 11200,
};

export const INTRO_TIMELINE = layoutCues([
  { id: "report", label: "Customer reports the problem", duration: 3200 },
  { id: "order", label: "Order number given", duration: 2400 },
  { id: "checks", label: "Order and policy checked", duration: 3600 },
  { id: "offer", label: "Options offered", duration: 3300 },
]);

/** Marks (ms from confirmation) of the simulated action run. */
export const EXEC = {
  submitDone: 1800,
  ticketDone: 3200,
  notifyDone: 4600,
  typingReply: [4600, 5800] as const,
  msgReply: 5800,
};

export const EXEC_TIMELINE = layoutCues([
  { id: "submit", label: "Submit action", duration: 1800 },
  { id: "ticket", label: "Update support ticket", duration: 1400 },
  { id: "notify", label: "Notify customer", duration: 1400 },
  { id: "reply", label: "Reply to customer", duration: 1200 },
]);

export const TEXT = {
  report: "My order arrived damaged. Can you help?",
  ask: "I'm sorry it arrived damaged. What's your order number?",
  orderNumber: "ZY-1042.",
  offer: "This order is eligible. Would you prefer a replacement or a $109 refund?",
  replacementChoice: "Replacement",
  refundChoice: "Refund",
  confirmReplacement: "Please confirm: send a replacement for order ZY-1042?",
  confirmRefund: "Please confirm: refund $109.00 for order ZY-1042 to your original payment method?",
  confirmed: "Yes, confirm.",
  doneReplacement:
    "Done. A replacement for ZY-1042 is on its way. I've updated your ticket and emailed you a confirmation.",
  doneRefund:
    "Done. I've submitted a $109.00 refund for ZY-1042 to your original payment method, updated your ticket and emailed you a confirmation.",
  failed:
    "I couldn't complete that just now: the order system isn't responding. I've handed this to a teammate with our conversation and what I tried, so you won't need to repeat anything. You'll hear from us by email.",
};

export const SCENARIO_LABEL = { normal: "Normal", outage: "System unavailable" } as const;
