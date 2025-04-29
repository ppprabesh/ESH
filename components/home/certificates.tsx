import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/spotlight";
import Image from "next/image";

export function Certificates() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Title and Description */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#000080] mb-4">
            Our Certifications
          </h2>
          <p className="text-lg text-[#000080] max-w-2xl mx-auto">
            Recognized for our commitment to quality and authenticity. These certifications demonstrate our adherence to the highest industry standards.
          </p>
        </div>

        {/* Certificates Grid - Side by Side */}
        <div className="flex justify-center items-center gap-8 md:gap-12">
          {/* Certificate 1 */}
          <div className="bg-transparent rounded-lg overflow-hidden transition-transform hover:scale-[1.02] w-64">
            <div className="relative h-48 w-full">
              <Image
                src="/images/certificates/certificate1.png"
                alt="Ministry of Industry, Commerce and Supplies"
                fill
                className="object-contain p-4"
              />
            </div>
            <div className="p-2 bg-transparent text-center">
              <h3 className="text-lg font-semibold text-[#000080]">Registered With</h3>
              <p className="text-sm text-[#000080] mt-1">Issued: 2023 | Valid through 2025</p>
            </div>
          </div>

          {/* Certificate 2 */}
          <div className="bg-transparent rounded-lg overflow-hidden transition-transform hover:scale-[1.02] w-64">
            <div className="relative h-48 w-full">
              <Image
                src="/images/certificates/certificate2.png"
                alt="Federation of Handicraft Associations of Nepal"
                fill
                className="object-contain p-4"
              />
            </div>
            <div className="p-2 bg-transparent text-center">
              <h3 className="text-lg font-semibold text-[#000080]">General Member Of</h3>
              <p className="text-sm text-[#000080] mt-1">Federation of Handicraft Associations of Nepal</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}