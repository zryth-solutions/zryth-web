import Image from "next/image";
import logo from "../../../public/zryth-logo.png";
import mark from "../../../public/zryth-mark.png";

/**
 * Official Zryth lockup. `variant="mark"` renders just the glyph for tight
 * spots. Importing the asset lets Next supply intrinsic dimensions, so the
 * logo reserves its space and never shifts layout while loading.
 */
export function Wordmark({
  className = "",
  variant = "full",
  priority = false,
}: {
  className?: string;
  variant?: "full" | "mark";
  priority?: boolean;
}) {
  if (variant === "mark") {
    return (
      <Image
        src={mark}
        alt="Zryth"
        className={`h-7 w-7 ${className}`}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={logo}
      alt="Zryth"
      className={`h-6 w-auto sm:h-7 ${className}`}
      priority={priority}
      sizes="(max-width: 640px) 96px, 112px"
    />
  );
}
