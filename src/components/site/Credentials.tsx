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
  /** Where the credential links to: the certificate PDF, or the privacy policy. */
  href: string;
  /** Opens in a new tab with this accessible label (certificate PDFs). */
  newTabLabel?: string;
  /** Visible call to action on the full card. */
  linkText: string;
};

export const CREDENTIALS: Credential[] = [
  {
    name: "DPIIT recognised",
    detail:
      "Recognised as a startup by the Department for Promotion of Industry and Internal Trade, Government of India. Certificate no. DIPP233348, issued 9 December 2025.",
    logo: "/credentials/dpiit.png",
    width: 3664,
    height: 855,
    href: "/credentials/dpiit-certificate.pdf",
    newTabLabel: "View the DPIIT recognition certificate (PDF, opens in a new tab)",
    linkText: "View the certificate",
  },
  {
    name: "DPDPA Compliant",
    detail:
      "Built to the Digital Personal Data Protection Act: your data stays yours, handled only for the purpose you gave it.",
    href: "/privacy-policy",
    linkText: "Read our privacy policy",
  },
];

/** Scales an intrinsic logo size down to a target height, preserving ratio. */
function scaledTo(item: Credential, targetHeight: number) {
  return {
    height: targetHeight,
    width: Math.round(((item.width ?? 1) / (item.height ?? 1)) * targetHeight),
  };
}

/** Compact inline form for the footer. Each badge links to its proof. */
export function CredentialBadges({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-6 ${className}`}>
      {CREDENTIALS.map((item) => {
        const external = Boolean(item.newTabLabel);
        const inner = item.logo ? (
          <Image src={item.logo} alt={item.name} {...scaledTo(item, 36)} />
        ) : (
          <span className="text-sm font-semibold text-ink-soft">{item.name}</span>
        );
        return (
          <li key={item.name}>
            <a
              href={item.href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              aria-label={item.newTabLabel ?? `${item.name}: ${item.linkText}`}
              className="block rounded transition-opacity hover:opacity-75"
            >
              {inner}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/** Fuller treatment with the explanation, for About and Get started. */
export function CredentialCards() {
  return (
    <RevealGroup as="ul" className="grid gap-6 sm:grid-cols-2">
      {CREDENTIALS.map((item) => {
        const external = Boolean(item.newTabLabel);
        return (
          <RevealItem
            as="li"
            key={item.name}
            className="group relative rounded-2xl border border-line bg-surface p-7 transition-colors duration-200 focus-within:border-brand-300 hover:border-brand-300"
          >
            {item.logo ? (
              <>
                <Image src={item.logo} alt="" {...scaledTo(item, 48)} />
                <p className="mt-5 text-base font-semibold text-ink">{item.name}</p>
              </>
            ) : (
              <p className="flex h-12 items-center text-h3 font-semibold text-ink">{item.name}</p>
            )}
            <p className="mt-3 text-body text-ink-soft pretty">{item.detail}</p>

            <a
              href={item.href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              aria-label={item.newTabLabel}
              className="mt-5 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-brand-600 after:absolute after:inset-0 after:content-[''] group-hover:text-brand-800"
            >
              {item.linkText}
              <span aria-hidden="true">{external ? "↗" : "→"}</span>
            </a>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}

/** Single-line reassurance for sitting next to a form. */
export function CredentialLine() {
  return (
    <Reveal>
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-muted">
        <Check />
        <span>
          <a href="/credentials/dpiit-certificate.pdf" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-brand-600">
            DPIIT certified
          </a>{" "}
          and{" "}
          <a href="/privacy-policy" className="underline underline-offset-2 hover:text-brand-600">
            DPDPA compliant
          </a>
          . Your details are used only to prepare your session.
        </span>
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
