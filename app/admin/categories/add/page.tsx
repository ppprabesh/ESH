
import { CategoryForm } from "@/components/categories/categoryForm";



export default function AddCategoryPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium text-gray-900">Add New Category</h2>
      <CategoryForm isEdit={false} />
    </div>
  );
}
