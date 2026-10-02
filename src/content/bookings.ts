/**
 * The free offers. The `slug` is what travels in the `?type=` query param
 * from the banner CTA into the Get started form.
 */
export const BOOKING_TYPES = {
  "discovery-audit": {
    slug: "discovery-audit",
    label: "Free discovery audit",
    short: "Discovery audit",
  },
  "ai-seminar": {
    slug: "ai-seminar",
    label: "Free AI seminar",
    short: "AI seminar",
  },
  "ai-automation": {
    slug: "ai-automation",
    label: "Free AI Agent/Workflow Automation",
    short: "AI automation",
  },
} as const;

export type BookingSlug = keyof typeof BOOKING_TYPES;

export const BOOKING_LIST = Object.values(BOOKING_TYPES);

export function isBookingSlug(value: string | null): value is BookingSlug {
  return value !== null && value in BOOKING_TYPES;
}
