"use client";
import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import type { CollectionImage } from "../types";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";

interface CollectionCardProps {
  image: CollectionImage;
  collectionSlug: string;
  collectionName: string;
}

export default function CollectionCard({
  image,
  collectionSlug,
  collectionName,
}: CollectionCardProps) {
  const { dispatch } = useCart();
  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({
      type: "ADD_ITEM",
      payload: {
        ...image,
        collectionName,
        quantity: 1,
      },
    });
  };
  return (
    <Link
      href={`/collections/${collectionSlug}`}
      className="group block flex-shrink-0 w-64 md:w-72"
    >
      <div className="relative overflow-hidden rounded-lg bg-gray-100 transition-transform duration-300 group-hover:scale-105">
        <Image
          src={image.url || "/placeholder.svg"}
          alt={image.alt}
          width={400}
          height={300}
          className="h-48 w-full object-cover transition-opacity duration-300 group-hover:opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
          {image.price && (
            <p className="text-sm opacity-90 mb-3">${image.price}</p>
          )}
          <Button
            onClick={handleBuyNow}
            size="sm"
            className="w-full bg-white text-black hover:bg-gray-100"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Compre agora
          </Button>
        </div>
      </div>
    </Link>
  );
}
