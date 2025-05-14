"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

const productNames = ["notebook", "candles", "fridgeMagnets", "mugs", "essenceOils", "soaps", "felt", "keychains", "postcards", "incense"];

export default function WeSellSlider() {
  const [startNum, setStartNum] = useState(0);
  const [endNum, setEndNum] = useState(8);

  const changeNum = () => {
    setStartNum(startNum === 0 ? 3 : 0);
    setEndNum(endNum === 8 ? 12 : 8);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      changeNum();
    }, 5000);

    return () => clearTimeout(timer);
  }, [startNum, endNum]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center py-10 gap-5 justify-center lg:gap-3 mx-8 relative"
    >
      {/* Title Section */}
      <motion.div 
        className="relative w-full bg-[#F8F3D9] flex flex-col items-center justify-center gap-4 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.h1 
          className="text-3xl lg:text-4xl text-[#000080] font-bold"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          We Offer
        </motion.h1>
        <motion.p 
          className="text-md bg-[#F8F3D9] lg:text-lg text-[#000080] font-light"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Offering a Wide Range Of High-Quality, Made in Nepal products.
        </motion.p>
      </motion.div>

      {/* Marquee Slider */}
      <motion.div 
        className="overflow-hidden bg-[#F8F3D9] h-auto w-full max-w-[1928px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        {/* For Small Screens */}
        <div className="block sm:hidden">
          <Marquee autoFill pauseOnHover>
            {productNames.slice(0, 4).map((product, index) => (
              <motion.div 
                key={index} 
                className="flex-shrink-0 mt-3 mx-4"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5,
                  delay: 0.2 + (index * 0.1),
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  className="w-32 rounded-md"
                  src={`/images/products/${product}.png`}
                  alt={product}
                  height={50}
                  width={150}
                />
              </motion.div>
            ))}
          </Marquee>
        </div>

        {/* For Medium and Large Screens */}
        <div className="hidden bg-[#F8F3D9] sm:flex overflow-hidden items-center md:pb-2 md:pt-12 md:gap-5 justify-between">
          <Marquee autoFill pauseOnHover>
            {productNames.map((product, index) => (
              <motion.div 
                key={index} 
                className="flex-shrink-0 mt-3 md:my-auto md:mr-44"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5,
                  delay: 0.2 + (index * 0.05),
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  className="w-32 rounded-md"
                  src={`/images/products/${product}.png`}
                  alt={product}
                  height={50}
                  width={150}
                />
              </motion.div>
            ))}
          </Marquee>
        </div>
      </motion.div>
    </motion.div>
  );
}