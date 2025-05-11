"use client";

import { useEffect, useState, useRef, useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click"; // Ensure this is pointing to your TypeScript version
import ProductCard from "@/components/product/product-card";

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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/product");
      const data = await res.json();
      setProducts(data);
    }

    fetchProducts();
  }, []);

  const handleProductClick = (product: Product) => {
    setActiveProduct(product);
  };

  const closeModal = () => {
    setActiveProduct(null);
  };

  useOutsideClick({ ref, callback: closeModal });

  // To apply a blur effect to everything outside the modal
  const isModalOpen = activeProduct !== null;

  return (
    <div className="relative">
      {/* Apply blur effect to the background when modal is open */}
      <div
        className={`transition-all duration-300 ${isModalOpen ? "filter blur-sm pointer-events-none" : ""}`}
      >
        {/* The rest of the page content (e.g., navbar, product cards, etc.) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4">
          {products.map((product) => (
            <motion.div key={product.id}>
              <ProductCard
                product={product}
                onClick={() => handleProductClick(product)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50" // Ensure this modal is above other content
          >
            <motion.div
              layoutId={`card-${activeProduct.slug}-${id}`}
              ref={ref}
              className="bg-white rounded-2xl w-full sm:w-96 p-6 max-h-full overflow-y-auto pointer-events-auto shadow-lg"
            >
              <motion.button
                onClick={closeModal}
                className="absolute top-2 right-2 bg-white rounded-full p-2"
              >
                <CloseIcon />
              </motion.button>

              <motion.img
                layoutId={`image-${activeProduct.slug}-${id}`}
                className="w-full h-64 object-cover rounded-lg shadow-md"
                src={activeProduct.images[0] || "/images/placeholder.jpg"}
                alt={activeProduct.name}
              />

              <motion.h3 layoutId={`title-${activeProduct.slug}-${id}`} className="mt-4 text-2xl font-bold text-[#000080]">
                {activeProduct.name}
              </motion.h3>

              <motion.p className="mt-4 text-[#000080] font-medium"><span className="font-bold">Description : </span> {activeProduct.description}</motion.p>

              <motion.p className="mt-4 text-[#000080] font-medium">
                <span className="font-bold">Price :</span> Rs.{activeProduct.price}
              </motion.p>

              <motion.div className="mt-4">
                <b className="text-[#000080]">Size:</b> <span>{activeProduct.size.join(", ")}</span>
              </motion.div>
              <motion.div className="mt-2">
                <b className="text-[#000080]">Colors:</b> <span>{activeProduct.colors.join(", ")}</span>
              </motion.div>
              {activeProduct.additionalInfo && (
                <motion.div className="mt-4">
                  <b className="text-[#000080]">Additional Info:</b> <p>{activeProduct.additionalInfo}</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </svg>
);
