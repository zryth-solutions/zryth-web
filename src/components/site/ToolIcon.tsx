import type { ToolSlug } from "@/content/tools";

const PATHS: Record<ToolSlug, React.ReactNode> = {
  "qr-code-generator": (
    <>
      <path d="M9 17H7A5 5 0 0 1 7 7h2" />
      <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
      <line x1="8" x2="16" y1="12" y2="12" />
    </>
  ),
  "dynamic-qr-code-generator": (
    <>
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </>
  ),
  "whatsapp-qr-code-generator": (
    <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
  ),
  "wifi-qr-code-generator": (
    <>
      <path d="M12 20h.01" />
      <path d="M2 8.82a15 15 0 0 1 20 0" />
      <path d="M5 12.859a10 10 0 0 1 14 0" />
      <path d="M8.5 16.429a5 5 0 0 1 7 0" />
    </>
  ),
  "vcard-qr-code-generator": (
    <>
      <path d="M16 2v2" />
      <path d="M17.915 21a6 6 0 10-12 0" />
      <path d="M8 2v2" />
      <circle cx="12" cy="11" r="4" />
      <rect x="3" y="3" width="18" height="18" rx="2" />
    </>
  ),
};

/** Line icon for a tool, matching the ones used on tools.zryth.com. */
export function ToolIcon({ slug, size = 22, className = "" }: { slug: ToolSlug; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {PATHS[slug]}
    </svg>
  );
}
