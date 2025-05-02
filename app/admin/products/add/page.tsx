'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { uploadImage } from '@/lib/upload';
import Image from 'next/image';
import { useForm, Controller } from 'react-hook-form';

const categories = [
  { id: '1', name: 'Notebooks', slug: 'notebooks' },
  { id: '2', name: 'Keyrings', slug: 'keyrings' },
  { id: '3', name: 'Fridge Magnets', slug: 'fridge-magnets' },
  { id: '4', name: 'Scented Candles', slug: 'scented-candles' },
  { id: '5', name: 'Normal Candles', slug: 'normal-candles' },
  { id: '6', name: 'Statues', slug: 'statues' },
  { id: '7', name: 'Greeting Cards', slug: 'greeting-cards' },
  { id: '8', name: 'Handpost Cards', slug: 'handpost-cards' },
  { id: '9', name: 'Mugs', slug: 'mugs' },
  { id: '10', name: 'Essence Oils', slug: 'essence-oils' },
  { id: '11', name: 'Handmade Soaps', slug: 'handmade-soaps' },
  { id: '12', name: 'Felt Products', slug: 'felt-products' },
];

// Define the form data interface
interface ProductFormData {
  name: string;
  price: string;
  description: string;
  category: string;
  featured: string;
  size: string[];
  colors: string[];
  // Additional fields that will be handled outside of react-hook-form
  // size, colors, scents, fragrances, flavors, dimensions, material, weight
}

export default function AddProduct() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [customColor, setCustomColor] = useState('');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [customSize, setCustomSize] = useState('');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  // Initialize react-hook-form
  const { register, handleSubmit: hookFormSubmit, control, formState: { errors } } = useForm<ProductFormData>({
    defaultValues: {
      name: '',
      price: '',
      description: '',
      category: '',
      featured: 'false',
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(files);
      const urls = files.map(file => URL.createObjectURL(file));
      setPreviewUrls(urls);
    }
  };

  const onSubmit = async (formData: ProductFormData) => {
    setLoading(true);
    setError('');

    try {
      // Upload images to ImageKit
      const imageUrls = await Promise.all(images.map(uploadImage));
      
      const data = {
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        categoryId: formData.category,
        images: imageUrls,
        size: selectedSizes,
        colors: selectedColors,
        featured: formData.featured === 'true',
        // Category-specific attributes would come from additional form fields
        scents: [],
        fragrances: [],
        flavors: [],
        dimensions: '',
        material: '',
        weight: null,
      };

      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // if (!response.ok) {
      //   throw new Error('Failed to create product');
      // }

      // router.push('/admin/products');
    } catch (err) {
      setError('Failed to create product. Please try again.');
      console.error('Error creating product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomColorAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (customColor.trim() && !selectedColors.includes(customColor.trim())) {
        setSelectedColors([...selectedColors, customColor.trim()]);
        setCustomColor('');
      }
    }
  };

  const handleColorRemove = (colorToRemove: string) => {
    setSelectedColors(selectedColors.filter(color => color !== colorToRemove));
  };

  const handleCustomSizeAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (customSize.trim() && !selectedSizes.includes(customSize.trim())) {
        setSelectedSizes([...selectedSizes, customSize.trim()]);
        setCustomSize('');
      }
    }
  };

  const handleSizeRemove = (sizeToRemove: string) => {
    setSelectedSizes(selectedSizes.filter(size => size !== sizeToRemove));
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F5F5DC] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-2xl">
          <div className="px-6 py-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Add New Product
            </h3>
            <form onSubmit={hookFormSubmit(onSubmit)} className="space-y-8">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    {...register('name', { required: 'Product name is required' })}
                    id="name"
                    className="w-full h-12 px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 transition-colors duration-200"
                    placeholder="Enter product name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                    Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">Rs.</span>
                    <input
                      {...register('price', { 
                        required: 'Price is required',
                        pattern: {
                          value: /^\d+(\.\d{1,2})?$/,
                          message: 'Please enter a valid price'
                        }
                      })}
                      id="price"
                      type="number"
                      step="0.01"
                      className="w-full h-12 px-12 py-3 rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 transition-colors duration-200"
                      placeholder="0.00"
                    />
                  </div>
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  {...register('description', { required: 'Description is required' })}
                  id="description"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 transition-colors duration-200"
                  placeholder="Enter product description"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  {...register('category', { required: 'Please select a category' })}
                  id="category"
                  className="w-full h-12 px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 transition-colors duration-200"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-2">
                  Images
                </label>
                {previewUrls.length === 0 ? (
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-green-500 transition-colors duration-200">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="images"
                          className="relative cursor-pointer rounded-md bg-white font-medium text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2 hover:text-green-500"
                        >
                          <span>Upload images</span>
                          <input
                            id="images"
                            name="images"
                            type="file"
                            multiple
                            accept="image/*"
                            className="sr-only"
                            onChange={handleImageChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <Image
                        width={128}
                        height={128}
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newUrls = [...previewUrls];
                            newUrls.splice(index, 1);
                            setPreviewUrls(newUrls);
                            const newImages = [...images];
                            newImages.splice(index, 1);
                            setImages(newImages);
                          }}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="sizes" className="block text-sm font-medium text-gray-700 mb-2">
                  Sizes
                </label>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={customSize}
                    onChange={(e) => setCustomSize(e.target.value)}
                    onKeyDown={handleCustomSizeAdd}
                    placeholder="Enter size and press Enter"
                    className="w-full h-12 px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 transition-colors duration-200"
                  />

                  <div className="flex flex-wrap gap-2">
                    {selectedSizes.map((size) => (
                      <div
                        key={size}
                        className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800"
                      >
                        {size}
                        <button
                          type="button"
                          onClick={() => handleSizeRemove(size)}
                          className="ml-2 text-green-600 hover:text-green-800"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>


              <div>
                <label htmlFor="colors" className="block text-sm font-medium text-gray-700 mb-2">
                  Colors
                </label>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    onKeyDown={handleCustomColorAdd}
                    placeholder="Enter color and press Enter"
                    className="w-full h-12 px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 transition-colors duration-200"
                  />

                  <div className="flex flex-wrap gap-2">
                    {selectedColors.map((color) => (
                      <div
                        key={color}
                        className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800"
                      >
                        {color}
                        <button
                          type="button"
                          onClick={() => handleColorRemove(color)}
                          className="ml-2 text-green-600 hover:text-green-800"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="featured" className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Product
                </label>
                <Controller
                  name="featured"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      id="featured"
                      className="w-full h-12 px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 transition-colors duration-200"
                    >
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </select>
                  )}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => router.push('/admin/products')}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 disabled:opacity-50"
                >
                  {loading ? 'Adding...' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}