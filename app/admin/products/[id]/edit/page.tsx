'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProductForm } from '@/components/product/productForm';
import { useParams } from 'next/navigation'; // Import useParams hook

export default function EditProductPage() {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams(); // Use useParams hook to get dynamic params

  useEffect(() => {
    const fetchProduct = async () => {
      if (!params.id) {
        setError('Product ID is missing');
        return;
      }

      try {
        const response = await fetch(`/api/product/${params.id}`);
        const data = await response.json();

        if (response.ok && !data.error) {
          setProduct(data);
        } else {
          setError(data.error || 'Product not found');
          router.push('/admin/products');
        }
      } catch (err) {
        setError('Failed to fetch product');
        router.push('/admin/products');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params, router]); // Watch for changes in params and router

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium text-gray-900">Edit Product</h2>
      <ProductForm initialData={product} isEdit={true} />
    </div>
  );
}
