import type { Metadata } from "next";
import { LegalDocument } from "@/components/site/LegalDocument";
import { TERMS } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: TERMS.description,
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsPage() {
  return <LegalDocument doc={TERMS} />;
}
