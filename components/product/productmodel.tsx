// components/product/product-modal.tsx
"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useOutsideClick } from "@/hooks/use-outside-click";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  images: string[];
  size: string[];
  colors: string[];
  featured: boolean;
  additionalInfo?: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
}

interface ProductModalProps {
  product: Product;
  layoutId: string;
  onClose: () => void;
}

export function ProductModal({ product, layoutId, onClose }: ProductModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick({ ref, callback: onClose });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
    >
      <motion.div
        layoutId={`card-${product.slug}-${layoutId}`}
        ref={ref}
        className="bg-[#F8F3D9] rounded-2xl w-full sm:w-96 p-6 max-h-full overflow-y-auto pointer-events-auto shadow-lg"
      >
        <motion.button
          onClick={onClose}
          className="absolute top-2 right-2 bg-[#F8F3D9] rounded-full p-2"
        >
          <CloseIcon />
        </motion.button>

        <motion.img
          layoutId={`image-${product.slug}-${layoutId}`}
          className="w-full h-64 object-contain rounded-lg shadow-md"
          src={product.images[0] || "/images/placeholder.jpg"}
          alt={product.name}
        />

        <motion.h3
          layoutId={`title-${product.slug}-${layoutId}`}
          className="mt-4 text-2xl font-bold text-[#000080]"
        >
          {product.name}
        </motion.h3>

        <motion.p className="mt-4 text-[#000080] font-medium">
          <span className="font-bold">Description: </span> {product.description}
        </motion.p>

        <motion.p className="mt-4 text-[#000080] font-medium">
          <span className="font-bold">Price:</span> Rs.{product.price}
        </motion.p>

        <motion.div className="mt-4">
          <b className="text-[#000080]">Size:</b> <span>{product.size.join(", ")}</span>
        </motion.div>
        <motion.div className="mt-2">
          <b className="text-[#000080]">Colors:</b> <span>{product.colors.join(", ")}</span>
        </motion.div>
        {product.additionalInfo && (
          <motion.div className="mt-4">
            <b className="text-[#000080]">Additional Info:</b> <p>{product.additionalInfo}</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </svg>
);
