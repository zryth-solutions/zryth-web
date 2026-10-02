"use client";

import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Pages that close with their own strong CTA. Showing the footer's as well
 * would stack two calls-to-action back to back.
 */
const PAGES_WITH_OWN_CTA = ["/transformation"];

export function FooterCTA() {
  const pathname = usePathname();
  if (PAGES_WITH_OWN_CTA.includes(pathname)) return null;

  return (
    <Container className="py-24 sm:py-32">
      <Reveal>
        <p className="label text-brand-600">Get started</p>
        <h2 className="mt-6 max-w-3xl text-h2 font-semibold balance">
          Show us how the work gets done today.
          <br />
          <span className="text-gradient">
            We&rsquo;ll show you what it could become.
          </span>
        </h2>
        <div className="mt-10">
          <Button href="/get-started">Start with one workflow</Button>
        </div>
      </Reveal>
    </Container>
  );
}
