"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import Image from "next/image"

export const AboutUsPage = () => {
  return (
    <div className="bg-[#F8F3D9]  min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h1 
          className="text-4xl bg-[#F8F3D9]  text-[#000080] font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Everest Souvenir House
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="mb-8  bg-[#F8F3D9] border-none">
            <CardContent className="p-6">
              <motion.h2 
                className="text-2xl text-[#000080] font-semibold mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Our Journey
              </motion.h2>
              <motion.p 
                className="text-[#000080]/80 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Established in 2016, Everest Souvenir House began its journey in the heart of Patan, Lalitpur, as a small boutique dedicated to showcasing the finest Nepali craftsmanship. Following the devastating earthquake, we relocated to Thamel, where we continue to serve our valued customers with the same commitment to quality and authenticity.
              </motion.p>
              
              <motion.div 
                className="relative w-full h-64 mb-6 rounded-lg overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src="/images/shop1.jpg"
                  alt="Everest Souvenir House"
                  fill
                  className="object-cover"
                />
              </motion.div>

              <motion.h2 
                className="text-2xl text-[#000080] font-semibold mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Our Mission
              </motion.h2>
              <motion.p 
                className="text-[#000080]/80 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                At The Melting Pot, we are committed to promoting Nepali craftsmanship and sustainable fashion. Our mission is to provide high-quality, ethically made products while supporting local artisans and preserving traditional techniques.
              </motion.p>

              <motion.h2 
                className="text-2xl text-[#000080] font-semibold mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Our Values
              </motion.h2>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <motion.div whileHover={{ y: -5 }}>
                  <Card  className="bg-[#F8F3D9] border-none">
                    <CardHeader>
                      <CardTitle className="text-[#000080]">Quality</CardTitle>
                    </CardHeader>
                    <CardContent className="text-[#000080]/80">
                      We maintain the highest standards in materials and craftsmanship, ensuring every product meets our rigorous quality requirements.
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div whileHover={{ y: -5 }}>
                  <Card className="bg-[#F8F3D9] border-none">
                    <CardHeader>
                      <CardTitle className="text-[#000080]">Sustainability</CardTitle>
                    </CardHeader>
                    <CardContent className="text-[#000080]/80">
                      We prioritize eco-friendly practices and materials, working towards a more sustainable future for Nepali fashion.
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div whileHover={{ y: -5 }}>
                  <Card className="bg-[#F8F3D9] border-none">
                    <CardHeader>
                      <CardTitle className="text-[#000080]">Community</CardTitle>
                    </CardHeader>
                    <CardContent className="text-[#000080]/80">
                      We actively support local artisans and communities, helping to preserve traditional crafts and create sustainable livelihoods.
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              <motion.h2 
                className="text-2xl text-[#000080] font-semibold mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                Our Location
              </motion.h2>
              <motion.p 
                className="text-[#000080]/80 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                Currently located in the vibrant Thamel district, our store serves as a cultural hub where tradition meets contemporary fashion. Our new location allows us to reach a broader audience while maintaining our commitment to quality and authenticity.
              </motion.p>

              <motion.h2 
                className="text-2xl text-[#000080] font-semibold mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                Our Products
              </motion.h2>
              <motion.p 
                className="text-[#000080]/80 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.3 }}
              >
                We offer a carefully curated selection of clothing and accessories, each piece telling a unique story of Nepali craftsmanship. From traditional designs to modern interpretations, our collection represents the rich cultural heritage of Nepal.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="flex justify-center"
              >
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUsPage;