import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { BOOKING_TYPES } from "@/content/bookings";

/** Connector geometry for the decorative packets, echoing the hero diagram. */
const TRACES = [
  { d: "M0,20 C56,20 74,60 124,60", delay: "0s" },
  { d: "M0,60 L124,60", delay: "0.7s" },
  { d: "M0,100 C56,100 74,60 124,60", delay: "1.4s" },
  { d: "M124,60 L248,60", delay: "2.1s" },
];

const buttonBase =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-colors duration-200";

/**
 * Slim horizontal gradient CTA for the two free offers. Copy sits left, actions
 * right; each button carries the booking type through to the form as ?type=.
 */
export function BannerCTA({ className = "" }: { className?: string }) {
  return (
    <Reveal className={className}>
      <section className="relative isolate overflow-hidden rounded-2xl bg-[linear-gradient(104deg,var(--color-brand-800)_0%,var(--color-brand-600)_55%,var(--color-brand-500)_100%)] px-7 py-8 sm:px-10 sm:py-9">
        {/* Drifting highlight */}
        <div
          aria-hidden="true"
          className="banner-glow pointer-events-none absolute -right-20 -top-32 -z-10 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(129,169,235,0.5)_0%,transparent_70%)]"
        />

        {/* Flow traces, kept faint so they read as texture behind the copy */}
        <svg
          aria-hidden="true"
          viewBox="0 0 248 120"
          fill="none"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 hidden h-[7.5rem] -translate-y-1/2 opacity-30 xl:block"
        >
          {TRACES.map((trace) => (
            <path
              key={trace.d}
              d={trace.d}
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.25"
              fill="none"
            />
          ))}
          <circle cx="124" cy="60" r="11" fill="rgba(255,255,255,0.16)" />
          {TRACES.map((trace) => (
            <circle
              key={`dot-${trace.d}`}
              className="flow-dot"
              r="3.25"
              fill="#ffffff"
              style={
                {
                  "--flow-path": `path("${trace.d}")`,
                  "--flow-delay": trace.delay,
                } as React.CSSProperties
              }
            />
          ))}
        </svg>

        <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-md">
            <p className="label text-brand-100">Free with Zryth</p>
            <h2 className="mt-3 text-h3 font-semibold text-white balance">
              See what AI would actually change for you.
            </h2>
            <p className="mt-3 text-body text-white/85 pretty">
              Two ways in. Both free, both start with your actual work.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:shrink-0">
            <Link
              href={`/get-started?type=${BOOKING_TYPES["discovery-audit"].slug}`}
              className={`${buttonBase} bg-white font-semibold text-brand-700 hover:bg-brand-50`}
            >
              Book a free audit
            </Link>

            <Link
              href={`/get-started?type=${BOOKING_TYPES["ai-seminar"].slug}`}
              className={`${buttonBase} border border-white/45 text-white hover:border-white hover:bg-white/10`}
            >
              Free AI seminar
            </Link>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
