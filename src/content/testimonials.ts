/**
 * Client testimonials shown elsewhere on the site.
 *
 * ─── BEFORE GOING LIVE ────────────────────────────────────────────────────────
 * Everything marked `placeholder: true` renders with a visible "needs real
 * content" treatment. Replace the values and delete the flag.
 *
 * Do not ship an invented quote or an unverified result.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type Testimonial = {
  /** The problem this client actually had. */
  solved: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Path under /public. Leave undefined for the placeholder avatar. */
  photo?: string;
  /** Optional outcome. Only fill this in where it can be substantiated. */
  result?: string;
  placeholder?: boolean;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    solved:
      "Replace with the problem this client came to us with, in one line.",
    quote:
      "Replace with a real customer quote. Keep it specific about what changed in their day-to-day work, not how impressive the technology is.",
    name: "Full name",
    role: "Role / title",
    company: "Company",
    result: "Result",
    placeholder: true,
  },
  {
    solved:
      "Replace with the problem this client came to us with, in one line.",
    quote:
      "Replace with a real customer quote. The best ones name a specific task that used to take hours and no longer does.",
    name: "Full name",
    role: "Role / title",
    company: "Company",
    result: "Result",
    placeholder: true,
  },
];
