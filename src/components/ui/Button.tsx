import Link from "next/link";
import type { ReactNode } from "react";

/**
 * No lift or shadow on hover — interactivity is signalled with colour only,
 * which keeps the surface calm and reads as more considered.
 */
const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 text-[0.9375rem] font-medium transition-colors duration-200";

const variants = {
  primary: "bg-brand-gradient text-white hover:opacity-90",
  secondary:
    "border border-line bg-surface text-ink hover:border-brand-300 hover:text-brand-700",
  ghost: "text-ink-soft hover:text-brand-600",
} as const;

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  download,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  /** Set to trigger a file download instead of navigation, e.g. a filename. */
  download?: boolean | string;
}) {
  return (
    <Link
      href={href}
      download={download}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
