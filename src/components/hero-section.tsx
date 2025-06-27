"use client";
import Link from "next/link";
import ImageCarousel from "./image-carousel";

const carouselImages = [
  {
    src: "/macra.jpg",
    alt: "Modern living room with neutral tones and natural textures",
  },
  {
    src: "/macra.jpg",
    alt: "Scandinavian bedroom with wooden furniture and soft lighting",
  },
  {
    src: "/macra.jpg",
    alt: "Minimalist kitchen with marble countertops and brass fixtures",
  },
  {
    src: "/macra.jpg",
    alt: "Cozy reading nook with vintage armchair and botanical prints",
  },
];

export default function HeroSection() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 flex">
        <div className="w-4/5 bg-[#A8B5A2]" />
        <div className="w-1/5 bg-white" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="space-y-6 lg:space-y-8 max-w-lg">
              <div className="space-y-4 pt-20 md:pt-0">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Tudo o que você precisa para transformar sua casa está aqui!
                </h1>
                <p className="text-lg sm:text-xl text-white/80 leading-relaxed">
                  Descubra nossa coleção selecionada de decoração moderna para
                  casa que traz aconchego, estilo e personalidade a cada canto
                  da sua casa.
                </p>
              </div>

              <Link href="/collections" className="inline-block mb-5 lg:mb-0">
                <button
                  type="button"
                  aria-label="Explore Collections"
                  className="bg-white text-[#A8B5A2] hover:bg-white/90 font-semibold px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
                >
                  Explore nossas coleções
                </button>
              </Link>
            </div>

            <ImageCarousel
              images={carouselImages}
              autoPlay={true}
              autoPlayInterval={4000}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .absolute.inset-0.flex {
            flex-direction: column;
          }
          .absolute.inset-0.flex > div:first-child {
            width: 100%;
            height: 70%;
          }
          .absolute.inset-0.flex > div:last-child {
            width: 100%;
            height: 30%;
          }
        }
      `}</style>
    </div>
  );
}
