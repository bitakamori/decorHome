"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";
import type { Collection } from "@/types";
import Navbar from "./Navbar";

interface CollectionPageClientProps {
  collection: Collection;
}

export default function CollectionPageClient({
  collection,
}: CollectionPageClientProps) {
  const { dispatch } = useCart();
  const [added, setAdded] = useState<Set<string>>(new Set());

  const handleAdd = (item: Collection["featured"][number]) => {
    dispatch({
      type: "ADD_ITEM",
      payload: { ...item, collectionName: collection.name, quantity: 1 },
    });

    // visual feedback
    setAdded((prev) => new Set(prev).add(item.id));
    setTimeout(() => {
      setAdded((prev) => {
        const n = new Set(prev);
        n.delete(item.id);
        return n;
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="bg-gray-50 py-8 mt-16">
        <div className="container mx-auto px-4">
          <Link
            href="/collections"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Coleções
          </Link>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {collection.name}
            </h1>
            <p className="text-xl text-gray-600">{collection.description}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collection.featured.map((img) => (
            <div key={img.id} className="group">
              <div className="relative overflow-hidden rounded-lg bg-gray-100 mb-4">
                <Image
                  src={img.url || "/placeholder.svg"}
                  alt={img.alt}
                  width={400}
                  height={300}
                  className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {img.title}
                </h3>
                {img.price && (
                  <p className="text-xl font-bold text-gray-900">
                    R${img.price}
                  </p>
                )}

                <Button
                  onClick={() => handleAdd(img)}
                  className={`w-full transition-all duration-200 ${
                    added.has(img.id)
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-900 hover:bg-gray-800"
                  }`}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {added.has(img.id)
                    ? "Adicionado ao carrinho!"
                    : "Adicionar ao Carrinho"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
