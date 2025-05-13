// 'use client';

// import { useEffect, useState, useRef, useId } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import ProductCard from '@/components/product/product-card';
// import { useOutsideClick } from '@/hooks/use-outside-click';
// import { ProductModal } from '@/components/product/productmodel';
import ProductHeroSection from '@/components/product/producthero';
import ProductList from '@/components/product/productlist';

// interface Product {
//   id: string;
//   name: string;
//   slug: string;
//   price: number;
//   description: string;
//   images: string[];
//   size: string[];
//   colors: string[];
//   featured: boolean;
//   additionalInfo?: string;
//   category: {
//     id: string;
//     name: string;
//     slug: string;
//   };
// }

export default function ProductsPage() {
  // const [products, setProducts] = useState<Product[]>([]);
  // const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  // const ref = useRef<HTMLDivElement>(null);
  // const id = useId();

  // useEffect(() => {
  //   async function fetchProducts() {
  //     const res = await fetch('/api/product');
  //     const data = await res.json();
  //     setProducts(data);
  //   }

  //   fetchProducts();
  // }, []);

  // const handleProductClick = (product: Product) => {
  //   setActiveProduct(product);
  // };

  // const closeModal = () => {
  //   setActiveProduct(null);
  // };

  // useOutsideClick({ ref, callback: closeModal });

  // const isModalOpen = !!activeProduct;

  return (
    <div className="relative">
    
      <ProductHeroSection />
      <ProductList/>

      {/* Main content */}

      {/* Blur the background when modal is open
      <div className={`transition-all duration-300 ${isModalOpen ? 'filter blur-sm pointer-events-none' : ''}`}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4">
          {products.map((product) => (
            <motion.div key={product.id}>
              <ProductCard product={product} onClick={() => handleProductClick(product)} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {/* <AnimatePresence>
        {activeProduct && (
          <ProductModal
            product={activeProduct}
            onClose={closeModal}
            layoutId={id}
          />
        )}
      </AnimatePresence> */} 
    </div>
  );
}
