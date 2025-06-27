import Navbar from "@/components/Navbar";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <ServicesSection />
    </main>
  );
}
