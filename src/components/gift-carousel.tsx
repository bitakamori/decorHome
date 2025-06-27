"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { GiftCarouselProps } from "@/types/index";

export default function GiftCarousel({
  images,
  itemsPerView = { mobile: 1, tablet: 2, desktop: 4 },
  showNavigation = true,
  showDots = true,
  autoPlay = false,
  autoPlayInterval = 5000,
  className = "",
}: GiftCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(itemsPerView.desktop);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setItemsToShow(itemsPerView.mobile);
      } else if (width < 1024) {
        setItemsToShow(itemsPerView.tablet);
      } else {
        setItemsToShow(itemsPerView.desktop);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [itemsPerView]);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = Math.max(0, images.length - itemsToShow);
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, images.length, itemsToShow]);

  const maxIndex = Math.max(0, images.length - itemsToShow);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
  }, [maxIndex]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  }, [maxIndex]);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentIndex(Math.min(index, maxIndex));
    },
    [maxIndex]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        goToPrevious();
      } else if (event.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrevious, goToNext]);

  if (!images || images.length === 0) {
    return (
      <div
        className={`flex items-center justify-center h-64 bg-gray-100 rounded-lg ${className}`}
      >
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full ${className}`}
      role="region"
      aria-label="Gift ideas carousel"
    >
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / itemsToShow}%)`,
          }}
        >
          {images.map((image, index) => (
            <div
              key={image.id}
              className="flex-shrink-0 px-2"
              style={{ width: `${100 / itemsToShow}%` }}
            >
              <div className="group cursor-pointer">
                <div className="relative aspect-square overflow-hidden rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    priority={index < itemsToShow}
                  />
                </div>
                {image.title && (
                  <h3 className="mt-3 text-center text-sm font-medium text-gray-800 group-hover:text-gray-600 transition-colors">
                    {image.title}
                  </h3>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showNavigation && images.length > itemsToShow && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Previous images"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Next images"
            disabled={currentIndex === maxIndex}
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </>
      )}

      {showDots && images.length > itemsToShow && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? "bg-gray-800 scale-125"
                  : "bg-gray-300 hover:bg-gray-500"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
