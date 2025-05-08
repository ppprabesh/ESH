'use client';

import { ProductForm } from "@/components/product/productForm";


export default function AddProductPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium text-gray-900">Add New Product</h2>
      <ProductForm isEdit={false} />
    </div>
  );
}
