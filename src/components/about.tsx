import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Heart, Home, Sparkles } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us - Decor Home | Inspiring Home Decoration Ideas",
  description:
    "Discover Decor Home's mission to inspire beautiful living spaces with our curated selection of unique decor items. Transform your home with our premium collection.",
  keywords:
    "home decor, interior design, unique decor items, home inspiration, premium decor",
  openGraph: {
    title: "About Decor Home - Curated Home Decoration & Design",
    description:
      "Transform your living space with our carefully curated collection of unique decor items and inspiring design ideas.",
    type: "website",
  },
};

export default function About() {
  return (
    <div className="min-h-screen bg-white mt-7">
      <section
        className="py-16 px-4 sm:px-6 lg:px-8"
        aria-labelledby="mission-heading"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2
                  id="mission-heading"
                  className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6"
                >
                  Nossa Missão
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Na Decor Home, acreditamos que cada espaço tem o potencial de
                  contar uma bela história. Nossa missão é inspirar e capacitar
                  você a criar espaços que reflitam sua personalidade e estilo
                  únicos, ao mesmo tempo em que oferecemos acesso a peças de
                  decoração excepcionais e cuidadosamente selecionadas que
                  transformam casas em lares.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Entendemos que o lar é mais do que apenas um lugar — é um
                  santuário, uma tela para autoexpressão e um reflexo do que é
                  mais importante para você. É por isso que nos dedicamos a
                  encontrar itens de decoração exclusivos e de alta qualidade
                  que agradem ao proprietário exigente que valoriza tanto a
                  beleza quanto o artesanato.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <Heart
                      className="w-6 h-6 text-[#A8B5A2] mt-1"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Seleção com curadoria
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Cada peça é cuidadosamente selecionada por seu caráter
                      único e qualidade excepcional.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <Sparkles
                      className="w-6 h-6 text-[#A8B5A2] mt-1"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Inspiração de design
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Descubra possibilidades infinitas com nossas ideias de
                      design elaboradas por especialistas.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div
                className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-gray-100"
                role="img"
                aria-label="Beautifully decorated modern living room showcasing elegant home decor"
              >
                <Image
                  src="/DecorHome.png?height=600&width=480"
                  alt="Beautifully decorated modern living room with elegant furniture, soft lighting, and carefully curated decor items showcasing the Decor Home aesthetic"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 480px"
                  priority
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div
                className="absolute -inset-4 border-2 border-[#A8B5A2]/20 rounded-3xl -z-10"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50"
        aria-labelledby="values-heading"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2
            id="values-heading"
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8"
          >
            O que nos diferencia
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-12 max-w-3xl mx-auto">
            Não somos apenas mais uma loja de decoração. Somos curadores,
            contadores de histórias e defensores apaixonados do poder
            transformador do design inteligente. Nosso compromisso vai além da
            venda de objetos bonitos — estamos aqui para ajudar você a criar
            espaços que inspirem, confortem e reflitam o melhor de você.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#A8B5A2] rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Paixão pela Qualidade
              </h3>
              <p className="text-gray-600">
                Cada item da nossa coleção atende aos nossos rigorosos padrões
                de artesanato e excelência em design.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#A8B5A2] rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Toque pessoal
              </h3>
              <p className="text-gray-600">
                Entendemos que cada casa é única e estamos aqui para ajudar você
                a encontrar peças que combinem com seu estilo.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#A8B5A2] rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Experiências inspiradoras
              </h3>
              <p className="text-gray-600">
                Da descoberta à entrega, garantimos que cada interação com a
                Decor Home seja memorável e inspiradora.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-16 px-4 sm:px-6 lg:px-8"
        aria-labelledby="cta-heading"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2
            id="cta-heading"
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6"
          >
            Pronto para transformar seu espaço?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Explore nossa coleção cuidadosamente selecionada e descubra as peças
            perfeitas para dar vida à sua visão.
          </p>
          <Link href="/collections" className="inline-block mb-5 lg:mb-0">
            <button
              className="inline-flex items-center px-8 py-4 bg-[#A8B5A2] text-white font-semibold rounded-full hover:bg-[#96A390] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#A8B5A2] focus:ring-offset-2"
              aria-label="Browse our collection of home decor items"
            >
              Navegue pela nossa coleção
              <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
