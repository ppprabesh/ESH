import Image from "next/image";
import { Button } from "./ui/button";

export default function HeroSection() {
  return (
    <div>
        <div className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="block text-black">Sustainable Clothing</span>
                <span className="block text-green-800">Made for Everyone</span>
              </h1>
              <p className="text-lg text-gray-700">
                Explore our eco-friendly collection of 100% Cotton, Hemp/Cotton, and Bamboo Cotton T-shirts.
              </p>
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                Shop Now
              </Button>
            </div>
            <div className="flex-1 relative h-[300px] sm:h-[350px] md:h-[400px] w-full">
              <Image
                src="/images/dsofMomo.jpg"
                alt="Traditional Nepali Clothing"
                width={1200}
                height={600}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}