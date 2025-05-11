'use client';

import { CategoryForm } from '@/components/categories/categoryForm';
import { useParams, useRouter } from 'next/navigation';


export default function EditCategoryPage() {
  const router = useRouter();
  const { id: categoryId } = useParams();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium text-gray-900">Edit Category</h2>
      <CategoryForm isEdit={true} categoryId={categoryId as string} />
    </div>
  );
}





// const { id: categoryId } = useParams();