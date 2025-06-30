import { collections } from "@/lib/data";
import CollectionCarousel from "@/components/collection-carousel";

export const metadata = {
  title: "Collections | DecorHome",
  description:
    "Discover our curated home decor collections featuring modern minimalist, bohemian chic, industrial loft, coastal retreat, and vintage farmhouse styles.",
};

export default function Collections() {
  return (
    <div className="min-h-screen bg-white mt-7">
      <div className="bg-[#A8B5A2] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Coleções com curadoria
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8">
              Descubra peças de decoração para casa cuidadosamente selecionadas
              que contam sua história
            </p>
            <p className="text-lg text-white max-w-2xl mx-auto">
              Do minimalista moderno ao estilo vintage de casa de fazenda,
              explore nossas coleções cuidadosamente selecionadas, projetadas
              para inspirar e transformar seus espaços de vida.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {collections.map((collection) => (
          <CollectionCarousel key={collection.id} collection={collection} />
        ))}
      </div>

      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para transformar seu espaço?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Navegue pelo nosso catálogo completo de itens de decoração para casa
            e encontre as peças perfeitas para dar vida à sua visão.
          </p>
          <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
            Comprar todos os itens
          </button>
        </div>
      </div>
    </div>
  );
}
