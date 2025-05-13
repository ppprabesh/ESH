"use client"

import { useEffect, useState, useRef, useId } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search } from "lucide-react"
import { useOutsideClick } from "@/hooks/use-outside-click"
import { ProductModal } from "@/components/product/productmodel"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ProductCard from "./product-card"

interface Product {
  id: string
  name: string
  slug: string
  price: number
  description: string
  images: string[]
  size: string[]
  colors: string[]
  featured: boolean
  additionalInfo?: string
  category: {
    id: string
    name: string
    slug: string
  }
}

interface Category {
  id: string
  name: string
  slug: string
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [activeProduct, setActiveProduct] = useState<Product | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const ref = useRef<HTMLDivElement>(null)
  const id = useId()

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/product")
        const data = await res.json()
        setProducts(data)
        setFilteredProducts(data)
      } catch (err) {
        console.error("Error fetching products:", err)
        setError("Failed to load products")
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories")
        if (!response.ok) {
          throw new Error("Failed to fetch categories")
        }
        const data = await response.json()
        setCategories(data)
      } catch (err) {
        setError("Failed to load categories")
        console.error("Error fetching categories:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    let filtered = [...products]

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category.id === selectedCategory)
    }

    // Filter by search query - now checks if name STARTS WITH the search query
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      )
    }

    setFilteredProducts(filtered)
  }, [searchQuery, selectedCategory, products])

  const handleProductClick = (product: Product) => {
    setActiveProduct(product)
  }

  const closeModal = () => {
    setActiveProduct(null)
  }

  useOutsideClick({ ref, callback: closeModal })

  const isModalOpen = !!activeProduct

  // Get the current category name for display
  const currentCategoryName = selectedCategory === "all" 
    ? "All Products" 
    : `All ${categories.find(c => c.id === selectedCategory)?.name || ''}`

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <motion.h1
          className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#000080] mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Our Products
        </motion.h1>
        <motion.p
          className="max-w-[600px] text-[#000080]/80 md:text-xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Discover our carefully curated selection of premium products designed for quality and style.
        </motion.p>

        {/* Search and Filter Row */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          {/* Category Display Text - Left side */}
          <motion.h2
            className="text-4xl font-bold text-[#000080] w-full md:w-auto text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {currentCategoryName}
          </motion.h2>

          {/* Search and Filter - Right side */}
          <div className="flex flex-col bg-[#F8F3D9] md:flex-row items-end md:items-center gap-4 w-full md:w-auto">
            <div className="relative w-full bg-[#F8F3D9] md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 bg-[#F8F3D9] text-[#000080]" />
              </div>
              <Input
                type="text"
                placeholder="Search"
                className="pl-10 shadow-md border-2 border-[#000080] bg-[#F8F3D9] w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="w-full bg-[#F8F3D9] md:w-48">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full shadow-md border-2 border-[#000080] bg-[#F8F3D9]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Blur the background when modal is open */}
      <div className={`transition-all duration-300 ${isModalOpen ? "filter blur-sm pointer-events-none" : ""}`}>
        {error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-[#F8F3D9] p-6 rounded-xl">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} onClick={() => handleProductClick(product)} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-[#000080]">No products found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeProduct && (
          <div ref={ref}>
            <ProductModal product={activeProduct} onClose={closeModal} layoutId={id} />
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}