import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}) {
  const width = {
    narrow: "max-w-3xl",
    default: "max-w-6xl",
    wide: "max-w-7xl",
  }[size];

  return (
    <div className={`mx-auto w-full ${width} px-6 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "default" | "alt" | "tint";
}) {
  const bg = {
    default: "bg-surface",
    alt: "bg-surface-alt",
    tint: "bg-surface-tint",
  }[tone];

  return (
    <section
      id={id}
      className={`relative py-20 sm:py-24 lg:py-28 ${bg} ${className}`}
    >
      {children}
    </section>
  );
}

/**
 * Small uppercase label above a section headline. Pass `as="h2"` when it is the
 * only thing naming that section, so the page keeps a usable heading outline.
 */
export function Eyebrow({
  children,
  className = "",
  as: Tag = "p",
}: {
  children: ReactNode;
  className?: string;
  as?: "p" | "h2" | "h3";
}) {
  return <Tag className={`label text-brand-600 ${className}`}>{children}</Tag>;
}

/** Thin brand-tinted rule used to separate stacked ideas. */
export function Rule({ className = "" }: { className?: string }) {
  return <div className={`h-px w-full bg-line ${className}`} />;
}
