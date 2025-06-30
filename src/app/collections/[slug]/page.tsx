import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { collections } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

interface CollectionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return collections.map((collection) => ({
    slug: collection.slug,
  }));
}

export async function generateMetadata({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);

  if (!collection) {
    return {
      title: "Coleção não encontrada | DecorHome",
    };
  }

  return {
    title: `${collection.name} Coleção | DecorHome`,
    description: collection.description,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);

  if (!collection) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white mt-11">
      <Navbar />
      <div className="bg-[#A8B5A2] py-8">
        <div className="container mx-auto px-4">
          <Link
            href="/collections"
            className="inline-flex items-center text-gray-200 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Coleções
          </Link>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {collection.name}
            </h1>
            <p className="text-xl text-white">{collection.description}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collection.featured.map((image) => (
            <div key={image.id} className="group">
              <div className="relative overflow-hidden rounded-lg bg-gray-100 mb-4">
                <Image
                  src={image.url || "/placeholder.svg"}
                  alt={image.alt}
                  width={400}
                  height={300}
                  className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {image.title}
                </h3>

                <div className="flex items-center justify-between">
                  {image.price && (
                    <p className="text-xl font-bold text-gray-900">
                      ${image.price}
                    </p>
                  )}

                  {image.shopUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href={image.shopUrl}
                        className="inline-flex items-center"
                      >
                        Comprar agora
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 pt-10 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Explorar Coleções Relacionadas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections
              .filter((c) => c.slug !== collection.slug)
              .slice(0, 4)
              .map((relatedCollection) => (
                <Link
                  key={relatedCollection.id}
                  href={`/collections/${relatedCollection.slug}`}
                  className="group block"
                >
                  <div className="relative overflow-hidden rounded-lg bg-gray-100 mb-3">
                    <Image
                      src={
                        relatedCollection.featured[0].url || "/placeholder.svg"
                      }
                      alt={relatedCollection.name}
                      width={300}
                      height={200}
                      className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">
                    {relatedCollection.name}
                  </h3>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
