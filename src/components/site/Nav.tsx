"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/site/Wordmark";
import { BookCallDialog } from "@/components/site/BookCallDialog";
import { buttonClasses } from "@/components/ui/Button";
import { ToolIcon } from "@/components/site/ToolIcon";
import { TOOLS, toolHref } from "@/content/tools";

const links = [
  { href: "/services", label: "Services" },
  { href: "/transformation", label: "Success Stories" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/products", label: "Our Work" },
  { href: "/about", label: "About" },
];

/** Active for any page under /resources. */
const RESOURCES_PREFIX = "/resources";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Nav() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [booking, setBooking] = useState(false);
  const [resources, setResources] = useState(false);
  const resourcesRef = useRef<HTMLDivElement>(null);

  // Swap to the condensed, blurred bar once the hero starts leaving.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on route change so navigation never leaves it stuck open.
  useEffect(() => {
    setOpen(false);
    setResources(false);
  }, [pathname]);

  // The Resources menu closes on outside click or Escape.
  useEffect(() => {
    if (!resources) return;
    const onDown = (e: MouseEvent) => {
      if (!resourcesRef.current?.contains(e.target as Node)) setResources(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setResources(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [resources]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled || open
          ? "border-b border-line/80 bg-surface/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Container size="wide">
        <div className="flex h-16 items-center justify-between sm:h-20">
          <Link
            href="/"
            className="-m-2 flex items-center p-2"
            aria-label="Zryth home"
          >
            <Wordmark priority />
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 whitespace-nowrap xl:flex"
          >
            {links.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-full px-4 py-2 text-[0.9375rem] transition-colors ${
                    active
                      ? "text-ink"
                      : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-4 -bottom-0.5 h-px bg-brand-500"
                      transition={{ duration: 0.4, ease: EASE }}
                    />
                  )}
                </Link>
              );
            })}

            <div
              ref={resourcesRef}
              className="relative"
              onMouseEnter={() => setResources(true)}
              onMouseLeave={() => setResources(false)}
            >
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={resources}
                onClick={() => setResources((v) => !v)}
                className={`relative flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.9375rem] transition-colors ${
                  pathname.startsWith(RESOURCES_PREFIX) ? "text-ink" : "text-ink-muted hover:text-ink"
                }`}
              >
                Resources
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                  className={`transition-transform duration-200 ${resources ? "rotate-180" : ""}`}
                >
                  <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {pathname.startsWith(RESOURCES_PREFIX) && (
                  <span aria-hidden="true" className="absolute inset-x-4 -bottom-0.5 h-px bg-brand-500" />
                )}
              </button>

              <AnimatePresence>
                {resources && (
                  <motion.div
                    role="menu"
                    initial={reduced ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18, ease: EASE }}
                    className="absolute top-full left-1/2 w-[22rem] -translate-x-1/2 pt-3"
                  >
                    <div className="rounded-2xl border border-line bg-surface p-3 shadow-xl">
                      <Link
                        href="/resources/tools"
                        role="menuitem"
                        className="block rounded-xl px-3 py-3 transition-colors hover:bg-surface-alt"
                      >
                        <span className="text-[0.9375rem] font-semibold text-ink">Tools</span>
                        <span className="mt-0.5 block text-sm text-ink-muted">
                          Free everyday tools from Zryth.
                        </span>
                      </Link>
                      <div className="my-1 h-px bg-line" />
                      <ul className="py-1">
                        {TOOLS.map((tool) => (
                          <li key={tool.slug}>
                            <Link
                              href={toolHref(tool.slug)}
                              role="menuitem"
                              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.9375rem] text-ink-soft transition-colors hover:bg-surface-alt hover:text-ink"
                            >
                              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                                <ToolIcon slug={tool.slug} size={16} />
                              </span>
                              {tool.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setBooking(true)}
              className={`${buttonClasses("secondary")} max-sm:hidden`}
            >
              Book a call
            </button>
            <Button href="/get-started" className="max-sm:hidden">
              Get started
            </Button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-ink xl:hidden"
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-surface sm:max-h-[calc(100dvh-5rem)] xl:hidden"
          >
            <Container size="wide">
              <nav aria-label="Mobile" className="flex flex-col py-4">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="border-b border-line-soft py-4 text-statement font-medium text-ink last:border-0"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-b border-line-soft py-4">
                  <p className="label text-ink-faint">Resources</p>
                  <Link href="/resources/tools" className="mt-2 block text-statement font-medium text-ink">
                    Tools
                  </Link>
                  <ul className="mt-3 space-y-1 border-l border-line pl-4">
                    {TOOLS.map((tool) => (
                      <li key={tool.slug}>
                        <Link
                          href={toolHref(tool.slug)}
                          className="flex min-h-11 items-center gap-3 text-[1.0625rem] text-ink-soft"
                        >
                          <ToolIcon slug={tool.slug} size={18} className="text-brand-600" />
                          {tool.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setBooking(true);
                  }}
                  className={`${buttonClasses("secondary")} mt-6 w-full`}
                >
                  Book a call
                </button>
                <Button href="/get-started" className="mt-3 mb-4 w-full">
                  Get started
                </Button>
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
      <BookCallDialog open={booking} onClose={() => setBooking(false)} />
    </header>
  );
}
