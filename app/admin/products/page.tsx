"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Pencil, Trash } from "lucide-react";
import Image from "next/image";

export default function ProductsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]); // Fetch categories to display their names
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null); // Track product to be deleted
  const [needsRefetch, setNeedsRefetch] = useState(false); // Flag to trigger refetch after edit

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/product");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        console.log(data);
      } catch (err) {
        setError("Failed to load products");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchProducts();
    fetchCategories();
  }, [needsRefetch]); // Refetch products when needsRefetch changes

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/product/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      setProducts(products.filter((product) => product.id !== id));
      setConfirmDelete(null); // Close the confirmation modal
    } catch (err) {
      setError("Failed to delete product");
      console.error("Error deleting product:", err);
    }
  };

  const handleEdit = async (id: string) => {
    // After edit, set needsRefetch to true to reload the products list
    setNeedsRefetch(true);
    router.push(`/admin/products/${id}/edit`);
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl font-semibold text-gray-900">No Data Found</h1>
        <p className="mt-2 text-sm text-gray-700">No products found in your store.</p>
        <div className="mt-4">
          <button
            type="button"
            onClick={() => router.push("/admin/products/add")}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add Product
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Products</h1>
          <p className="mt-2 text-sm text-gray-700">A list of all products in your store.</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => router.push("/admin/products/add")}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add Product
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span>Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {products.map((product) => {
                    const productCategory = categories.find(
                      (category) => category.id === product.categoryId
                    ); // Find the category name based on the categoryId

                    return (
                      <tr key={product.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <Image
                                className="h-10 w-10 rounded-full object-cover"
                                src={product.images[0]}
                                alt={product.name}
                                width={40}
                                height={40}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">
                                {product.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {/* Find category name by categoryId */}
                          {product.categoryId
                            ? categories.find(
                                (category) => category.id === product.categoryId
                              )?.name || "Unknown"
                            : "Unknown"}
                        </td>

                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          Rs.{product.price}
                        </td>
                        <td className="relative whitespace-nowrap py-4 flex justify-center pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            onClick={() => handleEdit(product.id)} // Trigger edit handler
                            className="text-indigo-600 hover:text-indigo-900 mr-4 flex items-center gap-2"
                          >
                            <Pencil className="h-5 w-5" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => setConfirmDelete(product.id)} // Open delete confirmation modal
                            className="text-red-600 hover:text-red-900 flex items-center gap-2"
                          >
                            <Trash className="h-5 w-5" />
                            <span>Delete</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {confirmDelete && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setConfirmDelete(null)}
        >
          <div
            className="bg-white p-8 rounded-md shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-gray-900">
              Are you sure you want to delete this product?
            </h3>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => handleDelete(confirmDelete)} // Perform delete action
                className="px-4 py-2 text-white bg-red-600 rounded-md"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setConfirmDelete(null)} // Close modal without deleting
                className="px-4 py-2 text-white bg-gray-600 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
