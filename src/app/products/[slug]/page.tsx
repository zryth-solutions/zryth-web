import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleTemplate, type ArticleData } from "@/components/site/ArticleTemplate";
import { LiveLinks } from "@/components/site/LiveLinks";
import { PRODUCTS, getProduct, getNextProduct } from "@/content/products";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  return {
    title: `${product.title} | Our Work`,
    description: product.subtitle,
    keywords: [
      product.title,
      `${product.category} AI software`,
      "AI powered business software",
      "custom AI product",
    ],
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: product.title,
      description: product.subtitle,
      url: `/products/${product.slug}`,
      type: "website",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const next = getNextProduct(slug);

  // Products that are live get a closing "see it live" section as well as links up top.
  const article: ArticleData = product.liveLinks
    ? {
        ...product,
        body: [
          ...product.body,
          { type: "heading", text: "See it live" },
          {
            type: "paragraph",
            text: `${product.title} is live. Open the website or install the app to see the work for yourself.`,
          },
          { type: "figure", node: <LiveLinks links={product.liveLinks} /> },
        ],
      }
    : product;

  return (
    <ArticleTemplate
      article={article}
      headerSlot={product.liveLinks ? <LiveLinks links={product.liveLinks} className="justify-center" /> : undefined}
      closingLabel="Zryth Our Work"
      next={{ title: next.title, href: `/products/${next.slug}` }}
      relatedLink={
        product.caseStudyHref
          ? { label: "Read the full case study", href: product.caseStudyHref }
          : null
      }
      download={
        product.brochureHref
          ? {
              label: product.brochureLabel ?? "Download Brochure",
              href: product.brochureHref,
            }
          : null
      }
      backHref="/products"
      backLabel="← All our work"
    />
  );
}
