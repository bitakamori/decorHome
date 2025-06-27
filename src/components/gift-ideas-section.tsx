"use client";
import GiftCarousel from "./gift-carousel";
import type { CarouselImage, GiftIdeasSectionProps } from "@/types/index";
import Image from "next/image";

const giftImages: CarouselImage[] = [
  {
    id: "ceramic",
    src: "/ceramica.jpg?height=300&width=300",
    alt: "Ceramica",
    title: "Cerâmica",
  },
  {
    id: "bordado",
    src: "/bordado.jpg?height=300&width=300",
    alt: "Bordado",
    title: "Bordado",
  },
  {
    id: "croche",
    src: "/croche.jpg?height=300&width=300",
    alt: "Croche",
    title: "Crochê",
  },
  {
    id: "macrame",
    src: "/macrame.jpg?height=300&width=300",
    alt: "Macrame",
    title: "Macrame",
  },
  {
    id: "punch",
    src: "/punch.jpg?height=300&width=300",
    alt: "Punch",
    title: "Punch Needle",
  },
  {
    id: "cimento",
    src: "/cimento.jpg?height=300&width=300",
    alt: "Cimento",
    title: "Cimento",
  },
];

export default function GiftIdeasSection({
  title = "Para Presentear",
  description = "Surpreenda quem você ama com presentes que transformam qualquer lar! De almofadas coloridas que trazem vida à sala a vasinhos charmosos para um toque verde, itens de decoração são perfeitos para qualquer ocasião. Escolha velas aromáticas para criar um clima aconchegante, quadros com frases inspiradoras para personalizar espaços ou cestas organizadoras que unem estilo e praticidade. Inspire-se e encontre o presente ideal para encantar!",
  image = {
    src: "/gift.jpg?height=400&width=400",
    alt: "gift ideas image",
  },
  className = "",
}: GiftIdeasSectionProps) {
  return (
    <div className="relative w-full overflow-hidden">
      <section
        className={`${className} relative border border-t-[#A8B5A2] border-b-white`}
        aria-labelledby="gift-ideas-title"
      >
        <div className="absolute inset-0 flex">
          <div className="w-3/4 2xl:w-3/5 bg-[#A8B5A2] md:bg-white" />
          <div className="w-1/4 2xl:w-2/5 bg-white md:bg-[#A8B5A2]" />
        </div>
        <div className="max-w-7xl mx-auto pt-3 md:pt-0 px-4 sm:px-6 lg:px-8 relative z-10 ">
          <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-16">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <h2
                id="gift-ideas-title"
                className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
              >
                {title}
              </h2>
              <p className="text-center sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
                {description}
              </p>
            </div>
            <div className="flex-1 flex justify-center md:justify-end mb-10 md:mb-0">
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[400px] lg:h-[400px]">
                <div className="md:mt-[50px] relative w-full h-full overflow-hidden rounded-2xl shadow-xl">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, 400px"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="p-5 md:p-0 md:py-16 lg:py-24 bg-white text-white"
        aria-labelledby="gift-carousel-title"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2">
          <div className="text-center mb-12">
            <h2
              id="gift-carousel-title"
              className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4"
            >
              Populares no momento
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubra os itens de decoração mais populares do momento: de vasos
              minimalistas a tapetes boho, transforme seu lar com estilo e
              tendência!
            </p>
          </div>

          <GiftCarousel
            images={giftImages}
            itemsPerView={{ mobile: 1, tablet: 2, desktop: 4 }}
            showNavigation={true}
            showDots={true}
            autoPlay={false}
            className="px-8"
          />
        </div>
      </section>
      <style jsx>{`
        @media (max-width: 768px) {
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
