import Image from "next/image";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

type Credential = {
  name: string;
  detail: string;
  /** Path under /public. Omit when there's no official logo to show. */
  logo?: string;
  /** Intrinsic pixel size, used to scale the logo without distortion. */
  width?: number;
  height?: number;
};

export const CREDENTIALS: Credential[] = [
  {
    name: "DPIIT recognised",
    detail:
      "Recognised as a startup by the Department for Promotion of Industry and Internal Trade, Government of India.",
    logo: "/credentials/dpiit.png",
    width: 3664,
    height: 855,
  },
  {
    name: "DPDPA Compliant",
    detail:
      "Built to the Digital Personal Data Protection Act: your data stays yours, handled only for the purpose you gave it.",
  },
];

/** Scales an intrinsic logo size down to a target height, preserving ratio. */
function scaledTo(item: Credential, targetHeight: number) {
  return {
    height: targetHeight,
    width: Math.round(((item.width ?? 1) / (item.height ?? 1)) * targetHeight),
  };
}

/** Compact inline form for the footer. */
export function CredentialBadges({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-6 ${className}`}>
      {CREDENTIALS.map((item) =>
        item.logo ? (
          <li key={item.name}>
            <Image src={item.logo} alt={item.name} {...scaledTo(item, 36)} />
          </li>
        ) : (
          <li key={item.name}>
            <span className="text-sm font-semibold text-ink-soft">
              {item.name}
            </span>
          </li>
        ),
      )}
    </ul>
  );
}

/** Fuller treatment with the explanation, for About and Get started. */
export function CredentialCards() {
  return (
    <RevealGroup as="ul" className="grid gap-6 sm:grid-cols-2">
      {CREDENTIALS.map((item) => (
        <RevealItem
          as="li"
          key={item.name}
          className="rounded-2xl border border-line bg-surface p-7"
        >
          {item.logo ? (
            <>
              <Image src={item.logo} alt={item.name} {...scaledTo(item, 48)} />
              <p className="mt-5 text-base font-semibold text-ink">
                {item.name}
              </p>
            </>
          ) : (
            <p className="flex h-12 items-center text-h3 font-semibold text-ink">
              {item.name}
            </p>
          )}
          <p className="mt-3 text-body text-ink-soft pretty">{item.detail}</p>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

/** Single-line reassurance for sitting next to a form. */
export function CredentialLine() {
  return (
    <Reveal>
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-muted">
        <Check />
        DPIIT certified and DPDPA compliant. Your details are used only to
        prepare your session.
      </p>
    </Reveal>
  );
}

function Check() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="8" cy="8" r="8" fill="#eef3fc" />
      <path
        d="M4.6 8.2l2.2 2.2 4.6-4.6"
        stroke="#1b49a4"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
