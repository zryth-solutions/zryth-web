import type { ReactNode } from "react";
import { ADDRESS, EMAILS, PHONE, MAP_EMBED_SRC, MAP_LINK } from "@/content/contact";

/** Direct contact details and office location, for sitting beside the form. */
export function ContactDetails() {
  return (
    <div className="rounded-2xl border border-line bg-surface p-8 sm:p-10">
      <p className="label text-brand-600">Prefer to reach out directly?</p>
      <h2 className="mt-4 text-h3 font-semibold balance">
        Talk to us, no form required.
      </h2>

      <ul className="mt-8 space-y-5">
        <li className="flex items-start gap-3.5">
          <IconBadge>
            <PhoneIcon />
          </IconBadge>
          <div>
            <p className="text-sm font-semibold text-ink">Phone</p>
            <a
              href={`tel:${PHONE}`}
              className="mt-1 block text-body text-ink-soft transition-colors hover:text-brand-600"
            >
              {PHONE}
            </a>
          </div>
        </li>

        <li className="flex items-start gap-3.5">
          <IconBadge>
            <MailIcon />
          </IconBadge>
          <div>
            <p className="text-sm font-semibold text-ink">Email</p>
            {EMAILS.map((email) => (
              <a
                key={email}
                href={`mailto:${email}`}
                className="mt-1 block text-body text-ink-soft transition-colors hover:text-brand-600"
              >
                {email}
              </a>
            ))}
          </div>
        </li>

        <li className="flex items-start gap-3.5">
          <IconBadge>
            <PinIcon />
          </IconBadge>
          <div>
            <p className="text-sm font-semibold text-ink">Office</p>
            <a
              href={MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block max-w-xs text-body text-ink-soft pretty transition-colors hover:text-brand-600"
            >
              {ADDRESS}
            </a>
          </div>
        </li>
      </ul>

      <div className="mt-8 aspect-[4/3] w-full overflow-hidden rounded-xl border border-line">
        <iframe
          src={MAP_EMBED_SRC}
          title="Zryth office location"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0"
        />
      </div>
    </div>
  );
}

function IconBadge({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50">
      {children}
    </span>
  );
}

const iconProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 16 16",
  fill: "none" as const,
  "aria-hidden": true,
  stroke: "#1b49a4",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function PhoneIcon() {
  return (
    <svg {...iconProps}>
      <path d="M3.2 2.4h2.1l1 2.6-1.3 1.2a7.6 7.6 0 0 0 3.8 3.8l1.2-1.3 2.6 1v2.1c0 .7-.6 1.2-1.3 1.1A10.8 10.8 0 0 1 2.1 3.7c-.1-.7.4-1.3 1.1-1.3Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg {...iconProps}>
      <rect x="2" y="3.5" width="12" height="9" rx="1.4" />
      <path d="M2.6 4.2 8 8.4l5.4-4.2" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg {...iconProps}>
      <path d="M8 14s4.6-4.2 4.6-7.6A4.6 4.6 0 1 0 3.4 6.4C3.4 9.8 8 14 8 14Z" />
      <circle cx="8" cy="6.4" r="1.6" />
    </svg>
  );
}
