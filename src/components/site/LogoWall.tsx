import Image from "next/image";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

type Logo = {
  name: string;
  src: string;
  /** Intrinsic ratio; display height is fixed in CSS and width follows. */
  width: number;
  height: number;
  /** Reads larger than the rest of the strip, on every breakpoint. */
  large?: boolean;
};

export const MODEL_LOGOS: Logo[] = [
  { name: "Anthropic Claude", src: "/logos/anthropic.svg", width: 256, height: 257 },
  { name: "OpenAI GPT", src: "/logos/openai.svg", width: 256, height: 260 },
  { name: "Google Gemini", src: "/logos/gemini.svg", width: 296, height: 298 },
  { name: "DeepSeek", src: "/logos/deepseek.svg", width: 24, height: 24 },
  { name: "Mistral AI", src: "/logos/mistral.svg", width: 256, height: 233 },
];

export const CLOUD_LOGOS: Logo[] = [
  { name: "Google Cloud", src: "/logos/gcp.svg", width: 256, height: 256 },
  { name: "Amazon Web Services", src: "/logos/aws.svg", width: 304, height: 182 },
  { name: "Microsoft Azure", src: "/logos/azure.svg", width: 96, height: 96 },
];

/** Businesses Zryth has delivered work for — shown on the homepage. */
export const CLIENT_LOGOS: Logo[] = [
  { name: "Oswaal Books", src: "/logos/clients/oswaal.avif", width: 400, height: 81 },
  { name: "Anuyog Softwares", src: "/logos/clients/anuyog.png", width: 1280, height: 720 },
  { name: "Dimple Collection", src: "/logos/clients/dimple.avif", width: 240, height: 89 },
  {
    name: "Agra Rollers",
    src: "/logos/clients/agra-rollers.png",
    width: 204,
    height: 309,
    large: true,
  },
];

/**
 * A row of third-party marks. Wording around it should say what Zryth does
 * with these platforms — it must not assert a partnership or endorsement.
 */
export function LogoGrid({
  logos,
  className = "",
}: {
  logos: Logo[];
  className?: string;
}) {
  return (
    <RevealGroup
      as="ul"
      className={`flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:justify-start sm:gap-x-12 sm:gap-y-7 ${className}`}
    >
      {logos.map((logo) => (
        <RevealItem as="li" key={logo.name}>
          <span className="flex items-center gap-3">
            <Image
              src={logo.src}
              alt={logo.name}
              width={logo.width}
              height={logo.height}
              className="h-8 w-auto"
            />
            <span className="hidden text-base font-medium text-ink-soft sm:inline">
              {logo.name}
            </span>
          </span>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

/** A muted strip of client marks — logo only, colour on hover. */
export function ClientLogoStrip({
  logos,
  className = "",
}: {
  logos: Logo[];
  className?: string;
}) {
  return (
    <RevealGroup
      as="ul"
      className={`flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-16 sm:gap-y-8 ${className}`}
    >
      {logos.map((logo) => (
        <RevealItem as="li" key={logo.name}>
          <Image
            src={logo.src}
            alt={logo.name}
            width={logo.width}
            height={logo.height}
            className={`w-auto object-contain opacity-70 grayscale transition duration-200 hover:opacity-100 hover:grayscale-0 ${
              logo.large ? "h-14 sm:h-[88px]" : "h-9 sm:h-14"
            }`}
          />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
