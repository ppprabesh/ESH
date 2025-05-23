'use client';

import { useEffect, useState } from 'react';
import { Carousel } from '../ui/carousel';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string | null;
}

export default function CardCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading)
  return (
    <div className="flex justify-center items-center h-48">
      <div className="w-12 h-12 border-4 border-indigo-900 border-t-transparent rounded-full animate-spin" />
    </div>
  );


  const slides = categories.map((cat) => ({
    title: cat.name,
    button: 'Shop Now',
    src: cat.image || null,
  }));

  return (
    <div className="my-10">
      <h2 className="text-center text-4xl font-bold mb-6">Browse Categories</h2>
      <h2 className="text-center text-lg font-light mb-6">Authentic product categories that reflect the culture, craft, and essence of Nepal.</h2>

      <Carousel slides={slides} />
    </div>
  );
}
