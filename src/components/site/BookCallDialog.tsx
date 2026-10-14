"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const EASE = [0.22, 1, 0.36, 1] as const;

const CALENDLY_URL =
  "https://calendly.com/manas-zryth?embed_domain=zryth.com&embed_type=Inline&hide_gdpr_banner=1&primary_color=215ac8";

const EXPERT = {
  name: "Manas Dewari",
  role: "Co-founder & CTO",
  image: "/team/manas.jpeg",
  linkedin: "https://www.linkedin.com/in/manas-dewari/",
};

/**
 * "Book a call" dialog: our expert on one side, his Calendly on the other.
 * Rendered in a portal because the nav's backdrop blur would otherwise become
 * the containing block for a fixed overlay. The Calendly frame is mounted only
 * while open, so nothing third-party loads until someone asks for it.
 */
export function BookCallDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduced = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    setLoaded(false);
    const returnTo = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      returnTo?.focus?.();
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close"
            tabIndex={-1}
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-ink/50 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="book-call-title"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="relative flex h-[92dvh] w-full max-w-5xl flex-col overflow-hidden rounded-t-2xl bg-surface shadow-2xl sm:h-[min(44rem,90dvh)] sm:rounded-2xl lg:flex-row"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 flex size-10 items-center justify-center rounded-full border border-line bg-surface text-ink-muted transition-colors hover:border-brand-300 hover:text-ink"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {/* Expert */}
            <div className="shrink-0 border-b border-line bg-surface-alt p-5 pr-16 sm:p-8 lg:w-[22rem] lg:border-r lg:border-b-0 lg:pr-8">
              <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-6">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-surface sm:size-20 lg:size-40">
                  <Image
                    src={EXPERT.image}
                    alt={EXPERT.name}
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="label text-brand-600">Talk to our expert</p>
                  <h2 id="book-call-title" className="mt-1 text-xl font-semibold text-ink lg:mt-2 lg:text-2xl">
                    {EXPERT.name}
                  </h2>
                  <p className="mt-0.5 text-sm text-ink-muted">{EXPERT.role}</p>
                </div>
              </div>

              <p className="mt-5 hidden text-[0.9375rem] leading-relaxed text-ink-soft pretty sm:block">
                Manas has built AI systems end to end: document pipelines, voice and chat agents, and the
                software around them. He leads the engineering behind everything Zryth ships.
              </p>
              <p className="mt-3 hidden text-[0.9375rem] leading-relaxed text-ink-soft pretty sm:block">
                Tell him the problem you&rsquo;re trying to remove, and he&rsquo;ll tell you honestly what&rsquo;s
                worth building.
              </p>

              <a
                href={EXPERT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 hidden items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-brand-600 lg:inline-flex"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45Z" />
                </svg>
                LinkedIn
              </a>
            </div>

            {/* Calendly */}
            <div className="relative min-h-0 flex-1 bg-surface">
              {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center text-sm text-ink-faint">
                  Loading calendar…
                </div>
              )}
              <iframe
                src={CALENDLY_URL}
                title={`Book a call with ${EXPERT.name}`}
                onLoad={() => setLoaded(true)}
                className="relative h-full w-full border-0"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
