import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolPage } from "@/components/site/ToolPage";
import { TOOLS, getTool, toolHref } from "@/content/tools";

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  return {
    title: tool.title,
    description: tool.description,
    keywords: tool.keywords,
    alternates: { canonical: toolHref(tool.slug) },
    openGraph: {
      title: `${tool.title} | Zryth`,
      description: tool.description,
      url: toolHref(tool.slug),
      type: "website",
    },
  };
}

export default async function ToolRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();
  return <ToolPage tool={tool} />;
}
