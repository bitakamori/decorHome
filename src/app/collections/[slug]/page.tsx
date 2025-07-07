import { notFound } from "next/navigation";
import { collections } from "@/lib/data";
import CollectionPageClient from "@/components/collection-page-client";
import type { Metadata } from "next";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) return { title: "Collection Not Found | DecorHome" };

  return {
    title: `${collection.name} Collection | DecorHome`,
    description: collection.description,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) notFound();
  return <CollectionPageClient collection={collection} />;
}
