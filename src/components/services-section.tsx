import ImageGallery from "./image-gallery";
import type { ImageCardData } from "@/types/index";

const galleryImages: ImageCardData[] = [
  {
    id: "decoration-consultation",
    src: "/consulta.jpg?height=400&width=400",
    alt: "Online Decoration Consultation",
    title: "Online Decoration Consultation",
    description:
      "Transforme seu lar com uma consulta personalizada: ideias sob medida para seu estilo e orçamento, direto para você!",
  },
  {
    id: "mood-boards",
    src: "/mood.jpg?height=400&width=400",
    alt: "Mood Boards",
    title: "Planos de Projeto de Decoração",
    description:
      "Receba um mood board exclusivo com inspirações e produtos perfeitos para criar o ambiente dos seus sonhos!",
  },
  {
    id: "diy-workshops",
    src: "/diy.jpg?height=400&width=400",
    alt: "diy workshops",
    title: "Workshops ou E-books de Decoração DIY",
    description:
      "Aprenda a decorar com criatividade: nossos workshops e e-books DIY trazem projetos simples para um lar único!",
  },
];

export default function DecorHomePage() {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex flex-col items-center p-10">
        <h6 className="text-gray-700 text-xs mb-5 md:mb-2">
          TRANSFORME SUA CASA, INSPIRE SUA VIDA!
        </h6>
        <h1 className="mb-5 md:mb-10 text-gray-700 text-5xl text-center">
          Nossos serviços
        </h1>
        <ImageGallery images={galleryImages} />
      </div>
    </div>
  );
}
