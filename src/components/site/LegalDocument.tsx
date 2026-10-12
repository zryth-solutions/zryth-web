import Link from "next/link";
import { LEGAL_UPDATED, type LegalDoc } from "@/content/legal";

/** A legal page in the same editorial typography as the articles: contents, then numbered sections. */
export function LegalDocument({ doc }: { doc: LegalDoc }) {
  const other = doc.slug === "privacy-policy" ? { href: "/terms-and-conditions", label: "Terms & Conditions" } : { href: "/privacy-policy", label: "Privacy Policy" };

  return (
    <article className="pb-24 sm:pb-32">
      <header className="pt-36 pb-10 sm:pt-44 sm:pb-14">
        <div className="mx-auto max-w-[720px] px-6 sm:px-8">
          <p className="label text-brand-600">Legal</p>
          <h1 className="mt-6 text-[2.5rem] font-semibold leading-[1.08] tracking-tight text-ink balance sm:text-[3.25rem]">{doc.title}</h1>
          <p className="mt-6 text-sm text-ink-faint">Last updated {LEGAL_UPDATED}</p>
          <p className="mt-8 text-[1.125rem] leading-[1.7] text-ink-soft pretty">{doc.intro}</p>
        </div>
      </header>

      <div className="mx-auto max-w-[720px] px-6 sm:px-8">
        <nav aria-label="On this page" className="rounded-2xl border border-line bg-surface-alt p-6 sm:p-7">
          <p className="label text-ink-muted">On this page</p>
          <ol className="mt-4 grid gap-x-8 gap-y-2 text-[0.9375rem] sm:grid-cols-2">
            {doc.sections.map((section, i) => (
              <li key={section.id} className="flex gap-2">
                <span className="w-6 shrink-0 tabular-nums text-ink-faint">{i + 1}.</span>
                <a href={`#${section.id}`} className="text-ink-soft transition-colors hover:text-brand-600">
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {doc.sections.map((section, i) => (
          <section key={section.id} id={section.id} className="scroll-mt-28">
            <h2 className="mt-14 text-[1.5rem] font-semibold leading-[1.25] tracking-tight text-ink balance sm:text-[1.75rem]">
              <span className="mr-3 text-brand-500">{i + 1}.</span>
              {section.title}
            </h2>
            {section.blocks.map((block, j) =>
              block.type === "p" ? (
                <p key={j} className="mt-5 text-[1.0625rem] leading-[1.75] text-ink-soft pretty">
                  {block.text}
                </p>
              ) : (
                <ul key={j} className="mt-5 space-y-3 text-[1.0625rem] leading-[1.7] text-ink-soft">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-4">
                      <span aria-hidden="true" className="mt-[0.8rem] size-1.5 shrink-0 rounded-full bg-brand-500" />
                      <span className="pretty">{item}</span>
                    </li>
                  ))}
                </ul>
              ),
            )}
          </section>
        ))}

        <hr className="mt-16 border-line-soft" />
        <p className="mt-8 text-sm text-ink-muted">
          Also read our{" "}
          <Link href={other.href} className="font-medium text-brand-600 hover:text-brand-800">
            {other.label}
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
