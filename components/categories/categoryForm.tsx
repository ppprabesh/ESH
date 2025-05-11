'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import axios from 'axios';

interface CategoryFormProps {
  categoryId?: string;
  isEdit: boolean;
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
  formData.append('folder', '/categories');

  const response = await axios.post('https://upload.imagekit.io/api/v1/files/upload', formData);
  return response.data.url;
}

export function CategoryForm({ categoryId, isEdit }: CategoryFormProps) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && categoryId) {
      const fetchCategory = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/categories/${categoryId}`);
          const data = await response.json();
          setName(data.name);
          setSlug(data.slug);
          setDescription(data.description);
          setImage(data.image);
        } catch (err) {
          console.error('Failed to fetch category:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchCategory();
    }
  }, [categoryId, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const categoryData = {
      name,
      slug,
      description,
      image,
    };

    const url = isEdit ? `/api/categories/${categoryId}` : '/api/categories';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      setLoading(true);
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });

      if (response.ok) {
        router.push('/admin/categories');
      } else {
        const error = await response.json();
        alert('Error saving category: ' + (error?.error || 'Unknown error'));
      }
    } catch (err) {
      alert('Failed to save category. See console for details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      try {
        const imageUrl = await uploadImage(file); // Upload to ImageKit
        setImage(imageUrl); // Set the image URL in state
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Error uploading image');
      }
    }
  };

  const removeImage = () => {
    setImage(''); // Remove image URL from state
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Category Name</label>
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
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Category Image</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3"
        />
        {image && (
          <div className="mt-4 relative">
            <img
              src={image}
              alt="Category Image"
              className="w-full h-32 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-0 right-0 p-2 bg-gray-500 text-white rounded-full"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? 'Saving...' : isEdit ? 'Update Category' : 'Add Category'}
        </button>
      </div>
    </form>
  );
}
