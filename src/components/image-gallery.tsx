import ImageCard from "./image-card";
import type { ImageCardData } from "../types";

interface ImageGalleryProps {
  images: ImageCardData[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
        {images.map((image, index) => (
          <ImageCard key={image.id} data={image} priority={index === 0} />
        ))}
      </div>
    </div>
  );
}
