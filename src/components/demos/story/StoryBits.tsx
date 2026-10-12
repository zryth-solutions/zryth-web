import Link from "next/link";
import { Button } from "@/components/ui/Button";

/** Where to read more, as plain links. */
export function LinksFigure({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className="space-y-3 border-t border-line-soft pt-6">
      {links.map((l) => (
        <li key={l.href}>
          <Link href={l.href} className="text-[1.0625rem] font-medium text-brand-600 hover:text-brand-800">
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** The one call to action, with the selected use case carried into the contact form. */
export function CtaBlock({ useCase, lead }: { useCase: string; lead: string }) {
  return (
    <div className="rounded-2xl border border-line bg-surface-alt p-6 sm:p-8">
      <p className="text-[1.125rem] leading-relaxed text-ink">{lead}</p>
      <div className="mt-5">
        <Button href={`/get-started?type=ai-automation&useCase=${useCase}`}>Build this for my team</Button>
      </div>
    </div>
  );
}
