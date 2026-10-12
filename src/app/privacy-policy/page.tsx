import type { Metadata } from "next";
import { LegalDocument } from "@/components/site/LegalDocument";
import { PRIVACY } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: PRIVACY.description,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return <LegalDocument doc={PRIVACY} />;
}
