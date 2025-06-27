"use client";
import Image from "next/image";
import type { ImageCardProps } from "../types";
import { useState } from "react";
import Modal from "./modal";

export default function ImageCard({ data, priority = false }: ImageCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center space-y-4 group">
      <button
        onClick={() => setIsModalOpen(true)}
        className="relative w-full aspect-square overflow-hidden rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#A8B5A2]/30"
        aria-label={`View details for ${data.title}`}
      >
        <Image
          src={data.src || "/placeholder.svg"}
          alt={data.alt}
          fill
          className="object-cover transition-opacity duration-300"
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </button>

      <div className="text-center space-y-2 px-2">
        <h3 className="text-lg font-semibold text-gray-800 leading-tight">
          {data.title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
          {data.description}
        </p>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Em Breve</h3>
          <p className="text-gray-600">
            Esta seção estará disponível em breve. Fique atento às novidades!
          </p>
        </div>
      </Modal>
    </div>
  );
}
