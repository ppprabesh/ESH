'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import axios from 'axios';

interface ProductFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export async function uploadImage(file: File): Promise<string> {
  const authRes = await fetch('/api/imagekit/auth');
  const auth = await authRes.json();

  const formData = new FormData();
  formData.append('file', file);
  formData.append('fileName', file.name);
  formData.append('publicKey', process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!);
  formData.append('signature', auth.signature);
  formData.append('expire', auth.expire);
  formData.append('token', auth.token);
  formData.append('folder', '/products');

  const response = await axios.post('https://upload.imagekit.io/api/v1/files/upload', formData);
  return response.data.url;
}

export function ProductForm({ initialData, isEdit }: ProductFormProps) {
  const router = useRouter();

  const [name, setName] = useState(initialData?.name || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [price, setPrice] = useState(initialData?.price || '');
  const [images, setImages] = useState<any[]>(initialData?.images || []);
  const [size, setSize] = useState<string[]>(initialData?.size || []);
  const [colors, setColors] = useState<string[]>(initialData?.colors || []);
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [additionalInfo, setAdditionalInfo] = useState(initialData?.additionalInfo || '');
  const [category, setCategory] = useState(initialData?.category?.slug || '');
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      name,
      slug,
      description,
      price: parseFloat(price),
      images,
      size,
      colors,
      featured,
      additionalInfo,
      category, // Send category slug or name (not ID)
    };

    const url = isEdit ? `/api/product/${initialData?.id}` : '/api/product';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        router.push('/admin/products');
      } else {
        const error = await response.json();
        alert('Error saving product: ' + (error?.error || 'Unknown error'));
      }
    } catch (err) {
      alert('Failed to save product. See console for details.');
      console.error(err);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const uploadedImages: string[] = [];

      for (const file of files) {
        try {
          const imageUrl = await uploadImage(file);
          uploadedImages.push(imageUrl);
        } catch (error) {
          console.error('Error uploading image:', error);
          alert('Error uploading image');
        }
      }

      setImages((prev) => [...prev, ...uploadedImages]);
    }
  };

  const removeImage = (image: string) => {
    setImages(images.filter((img) => img !== image));
  };

  const handleSizeChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const val = (e.target as HTMLInputElement).value.trim();
    if (e.key === 'Enter' && val) {
      e.preventDefault();
      setSize((prev) => [...prev, val]);
      (e.target as HTMLInputElement).value = '';
    }
  };

  const handleColorChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const val = (e.target as HTMLInputElement).value.trim();
    if (e.key === 'Enter' && val) {
      e.preventDefault();
      setColors((prev) => [...prev, val]);
      (e.target as HTMLInputElement).value = '';
    }
  };

  const removeSize = (item: string) => {
    setSize(size.filter((s) => s !== item));
  };

  const removeColor = (item: string) => {
    setColors(colors.filter((c) => c !== item));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3"
          required
        />
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700">Slug</label>
        <input
          type="text"
          id="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3"
        />
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3"
          required
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3"
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat: any) => (
            <option key={cat.id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="images" className="block text-sm font-medium text-gray-700">Upload Images</label>
        <input
          type="file"
          id="images"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3"
          multiple
        />
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((image, index) => {
            const src = image instanceof File ? URL.createObjectURL(image) : image;
            return (
              <div key={index} className="relative">
                <img
                  src={src}
                  alt={`Image ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(image)}
                  className="absolute top-0 right-0 p-2 bg-gray-500 text-white rounded-full"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <label htmlFor="size" className="block text-sm font-medium text-gray-700">Sizes</label>
        <input
          type="text"
          id="size"
          onKeyDown={handleSizeChange}
          placeholder="Press Enter to add"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {size.map((s, idx) => (
            <span key={idx} className="bg-gray-200 px-2 py-1 rounded">
              {s} <button type="button" onClick={() => removeSize(s)}>x</button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="colors" className="block text-sm font-medium text-gray-700">Colors</label>
        <input
          type="text"
          id="colors"
          onKeyDown={handleColorChange}
          placeholder="Press Enter to add"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {colors.map((c, idx) => (
            <span key={idx} className="bg-gray-200 px-2 py-1 rounded">
              {c} <button type="button" onClick={() => removeColor(c)}>x</button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="featured"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="featured" className="text-sm font-medium text-gray-700">Featured Product</label>
      </div>

      <div>
        <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">Additional Info</label>
        <textarea
          id="additionalInfo"
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3"
        />
      </div>

      <div className="flex items-center space-x-4">
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          {isEdit ? 'Update Product' : 'Add Product'}
        </button>
      </div>
    </form>
  );
}
