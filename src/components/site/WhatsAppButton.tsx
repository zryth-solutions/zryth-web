import { PHONE } from "@/content/contact";

/** wa.me needs digits only, no "+" or separators. */
const WHATSAPP_NUMBER = PHONE.replace(/\D/g, "");

/**
 * Fixed, site-wide contact shortcut. Deliberately kept in WhatsApp's own
 * green rather than the brand blue — it needs to read instantly as "chat on
 * WhatsApp", not as a Zryth-branded control.
 */
export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_12px_30px_-8px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:scale-105 sm:bottom-6 sm:right-6"
    >
      <WhatsAppGlyph />
    </a>
  );
}

function WhatsAppGlyph() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12.02 2C6.5 2 2.03 6.48 2.03 12c0 1.77.46 3.44 1.27 4.89L2 22l5.25-1.38a9.9 9.9 0 0 0 4.77 1.22h.01c5.52 0 9.99-4.48 9.99-10S17.54 2 12.02 2Zm0 18.06h-.01a8.3 8.3 0 0 1-4.24-1.16l-.3-.18-3.12.82.83-3.04-.2-.31a8.28 8.28 0 0 1-1.28-4.42c0-4.6 3.74-8.34 8.33-8.34a8.27 8.27 0 0 1 8.32 8.34c0 4.6-3.74 8.29-8.33 8.29Zm4.56-6.21c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.78.98-.14.17-.29.19-.53.06-.25-.13-1.04-.38-1.99-1.22-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.22.89 2.4 1.02 2.57.13.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.1-.23-.16-.48-.28Z"
        fill="#ffffff"
      />
    </svg>
  );
}
