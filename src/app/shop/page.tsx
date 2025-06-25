import Navbar from "@/components/Navbar";

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">
        <h1 className="text-red-500">shop</h1>
      </div>
    </main>
  );
}
