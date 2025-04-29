"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";


const productNames = ["notebook", "candles", "fridgeMagnets", "mugs", "essenceOils", "soaps", "felt", "keychains" , "postcards", "incense"];

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
      whileTap={{ opacity: 0 }}
      className="flex flex-col items-center py-10 gap-5 justify-center lg:gap-3 mx-8 relative"
      onClick={changeNum}
    >
     
        {/* Title Section */}
        <div className="relative w-full bg-[#F8F3D9] flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-3xl lg:text-4xl text-[#000080] font-bold">
            We Offer
          </h1>
          <p className="text-md bg-[#F8F3D9] lg:text-lg text-[#000080] font-light">
            Offering a Wide Range Of High-Quality, Made in Nepal products.
          </p>
        </div>
        {/* Marquee Slider */}
        <motion.div className="overflow-hidden bg-[#F8F3D9] h-auto w-full max-w-[1928px]">
          {/* For Small Screens */}
          <div className="block sm:hidden">
            {/* First Line of Logos */}
            <Marquee autoFill pauseOnHover>
              {productNames.slice(0, 4).map((product, index) => (
                <div key={index} className="flex-shrink-0 mt-3 mx-4">
                  <Image
                    className="w-32 rounded-md"
                    src={`/images/products/${product}.png`}
                    alt={product}
                    height={50}
                    width={150}
                  />
                </div>
              ))}
            </Marquee>
           
          </div>
          {/* For Medium and Large Screens */}
          <div className="hidden bg-[#F8F3D9] sm:flex overflow-hidden items-center md:pb-2 md:pt-12 md:gap-5 justify-between">
            <Marquee autoFill pauseOnHover>
              {productNames.map((product, index) => (
                <div key={index} className="flex-shrink-0  mt-3 md:my-auto md:mr-44">
                  <Image
                    className="w-32  rounded-md"
                    src={`/images/products/${product}.png`}
                    alt={product}
                    height={50}
                    width={150}
                  />
                </div>
              ))}
            </Marquee>
          </div>
        </motion.div>
    
    </motion.div>
  );
}