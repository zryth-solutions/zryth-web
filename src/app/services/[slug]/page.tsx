import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceArticle } from "@/components/site/ServiceArticle";
import { SERVICES, getService } from "@/content/services";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.name} | Services`,
    description: service.subtitle,
    keywords: [service.name, `${service.name} services`, "outsource AI development", "AI development company India"],
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.name,
      description: service.subtitle,
      url: `/services/${service.slug}`,
      type: "article",
      images: [{ url: service.image.src, alt: service.image.alt }],
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return <ServiceArticle service={service} />;
}
