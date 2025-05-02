"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import Image from "next/image";

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

interface Pagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export default function CategoriesPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    perPage: 10,
    total: 0,
    totalPages: 1,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    if (!isAuthenticated) return;

    fetchCategories();
  }, [
    isAuthenticated,
    pagination.page,
    pagination.perPage,
    searchTerm,
    sortBy,
    sortOrder,
  ]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/categories`
      );
      console.log(response)

      if (!response.ok) throw new Error("Failed to fetch categories");

      const { data, pagination: apiPagination } = await response.json();
      setCategories(data);
      setPagination((prev) => ({
        ...prev,
        total: apiPagination.total,
        totalPages: apiPagination.totalPages,
      }));
    } catch (err) {
      setError("Failed to load categories");
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      // Refresh categories if we're on the last page with one item
      if (categories.length === 1 && pagination.page > 1) {
        setPagination((prev) => ({ ...prev, page: prev.page - 1 }));
      } else {
        fetchCategories();
      }
    } catch (err) {
      setError("Failed to delete category");
      console.error("Error deleting category:", err);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleSortChange = (column: string) => {
    if (sortBy === column) {
      // Toggle order if clicking the same column
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Default to desc when selecting a new column
      setSortBy(column);
      setSortOrder("desc");
    }

    // Reset to first page when sorting changes
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const getSortIcon = (column: string) => {
    if (sortBy !== column) return "⋮";
    return sortOrder === "asc" ? "↑" : "↓";
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Categories Management
        </h1>
        <button
          onClick={() => router.push("/admin/categories/add")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Add Category
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white p-4 shadow-md rounded-lg mb-6">
        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row gap-4 items-end"
        >
          <div className="flex-grow">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Search
            </label>
            <div className="relative">
              <input
                id="search"
                type="text"
                placeholder="Search by name, slug, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-indigo-500 focus:border-indigo-500"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>
          </div>
          <div className="flex-shrink-0">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors w-full md:w-auto"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
          {error}
          <button
            onClick={() => setError("")}
            className="float-right text-red-600 hover:text-red-800"
          >
            ×
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <>
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
            {categories.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                {searchTerm
                  ? "No categories found matching your search criteria."
                  : "No categories have been created yet."}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        onClick={() => handleSortChange("name")}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      >
                        <div className="flex items-center">
                          Name
                          <span className="ml-1">{getSortIcon("name")}</span>
                        </div>
                      </th>
                      <th
                        onClick={() => handleSortChange("slug")}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      >
                        <div className="flex items-center">
                          Slug
                          <span className="ml-1">{getSortIcon("slug")}</span>
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th
                        onClick={() => handleSortChange("createdAt")}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      >
                        <div className="flex items-center">
                          Created
                          <span className="ml-1">
                            {getSortIcon("createdAt")}
                          </span>
                        </div>
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {categories.map((category) => (
                      <tr key={category.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {category.image && (
                              <div className="flex-shrink-0 h-10 w-10 mr-3">
                                <Image
                                  width={40}
                                  height={40}
                                  src={category.image}
                                  alt={category.name}
                                  className="h-10 w-10 rounded-full object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/placeholder-category.png";
                                  }}
                                />
                              </div>
                            )}
                            <div className="text-sm font-medium text-gray-900">
                              {category.name}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {category.slug}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500 line-clamp-2">
                            {category.description || "-"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {/* Add actual date when available in the data */}
                            {new Date().toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() =>
                              router.push(
                                `/admin/categories/edit/${category.id}`
                              )
                            }
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(category.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex flex-col md:flex-row items-center justify-between mt-4 gap-4">
              <div className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {(pagination.page - 1) * pagination.perPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(
                    pagination.page * pagination.perPage,
                    pagination.total
                  )}
                </span>{" "}
                of <span className="font-medium">{pagination.total}</span>{" "}
                categories
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={pagination.page === 1}
                  className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-50"
                  aria-label="First page"
                >
                  &laquo;
                </button>
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-50"
                  aria-label="Previous page"
                >
                  &lsaquo;
                </button>

                {Array.from(
                  { length: Math.min(5, pagination.totalPages) },
                  (_, i) => {
                    // Show 5 pages around current page
                    let pageNum;
                    if (pagination.totalPages <= 5) {
                      pageNum = i + 1;
                    } else {
                      const middle = Math.min(
                        Math.max(3, pagination.page),
                        pagination.totalPages - 2
                      );
                      pageNum = i + middle - 2;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-1 border rounded-md ${
                          pagination.page === pageNum
                            ? "bg-indigo-600 text-white"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                )}

                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                  className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-50"
                  aria-label="Next page"
                >
                  &rsaquo;
                </button>
                <button
                  onClick={() => handlePageChange(pagination.totalPages)}
                  disabled={pagination.page === pagination.totalPages}
                  className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-50"
                  aria-label="Last page"
                >
                  &raquo;
                </button>
              </div>

              <div className="flex items-center">
                <span className="mr-2 text-sm text-gray-700">Show:</span>
                <select
                  value={pagination.perPage}
                  onChange={(e) => {
                    setPagination((prev) => ({
                      ...prev,
                      perPage: Number(e.target.value),
                      page: 1, // Reset to first page when changing items per page
                    }));
                  }}
                  className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                >
                  {[10, 25, 50, 100].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
