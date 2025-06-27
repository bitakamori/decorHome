import Navbar from "@/components/Navbar";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import GiftIdeasSection from "@/components/gift-ideas-section";
export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <GiftIdeasSection />
    </main>
  );
}
