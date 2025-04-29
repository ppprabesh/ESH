"use client"

import { ProductCard } from '@/components/product/product-card'
import { ProductFilters } from '@/components/product/product-filters'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useInView } from 'react-intersection-observer'
import { Skeleton } from '@/components/ui/skeleton'
import { Product } from '@/types'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { products } from '@/data/productData'
import { LoadingState } from "@/components/ui/loading-state"
import { NoProducts } from "@/components/ui/no-products"

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
  { id: '13', name: 'Religious Items', slug: 'religious-items' },
  { id: '14', name: 'Kitchen', slug: 'kitchen' },
  { id: '15', name: 'Home Decor', slug: 'home-decor' },
  { id: '16', name: 'Textiles', slug: 'textiles' },
  { id: '17', name: 'Art', slug: 'art' },
  { id: '18', name: 'Food', slug: 'food' },
  { id: '19', name: 'Music', slug: 'music' },
  { id: '20', name: 'Paper Products', slug: 'paper-products' },
  { id: '21', name: 'Accessories', slug: 'accessories' },
  { id: '22', name: 'Clothing', slug: 'clothing' }
];

const ITEMS_PER_PAGE = 16;

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  });

  const categorySlug = searchParams.get('category') || 'all';
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || 'newest';
  const page = Number(searchParams.get('page')) || 1;

  // Update current page when URL changes
  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  // Memoize filtered products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    
    // Category filter
    if (categorySlug !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === categorySlug.toLowerCase()
      );
    }
    
    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
      );
    }
    
    // Sort products
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sort === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [categorySlug, search, sort]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
  };

  // Handle category change
  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', value);
    params.set('page', '1'); // Reset to first page when changing category
    router.push(`?${params.toString()}`);
  };

  // Handle search
  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('search', value);
    params.set('page', '1'); // Reset to first page when searching
    router.push(`?${params.toString()}`);
  };

  // Handle sort change
  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    params.set('page', '1'); // Reset to first page when changing sort
    router.push(`?${params.toString()}`);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 3;
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    
    if (totalPages <= maxVisiblePages + 2) {
      // Show all pages if total pages are less than or equal to maxVisiblePages + 2
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate start and end of middle range
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if we're at the start
      if (currentPage <= 2) {
        startPage = 2;
        endPage = 4;
      }
      // Adjust if we're at the end
      else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 3;
        endPage = totalPages - 1;
      }
      
      // Add ellipsis and middle pages
      if (startPage > 2) pages.push('...');
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      if (endPage < totalPages - 1) pages.push('...');
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  // Memoize paginated products
  const paginatedProducts = useMemo(() => 
    filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE),
    [filteredProducts, currentPage]
  );

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              {categorySlug === 'all' 
                ? 'All Products'
                : `${categories.find(c => c.slug === categorySlug)?.name || 'Products'}`
              }
            </h1>
            <p className="text-muted-foreground text-sm">
              Browse our collection of handcrafted Nepali souvenirs and gifts
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full md:w-64"
              defaultValue={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <Select 
              value={categorySlug} 
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select 
              value={sort} 
              onValueChange={handleSortChange}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {filteredProducts.length === 0 ? (
          <NoProducts />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 px-2">
            {paginatedProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={index < 4}
              />
            ))}
          </div>
        )}

        {/* Pagination - Always visible */}
        {filteredProducts.length > 0 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            {getPageNumbers().map((pageNum, index) => (
              pageNum === '...' ? (
                <span key={`ellipsis-${index}`} className="px-2">...</span>
              ) : (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="icon"
                  onClick={() => handlePageChange(pageNum as number)}
                  disabled={currentPage === pageNum}
                >
                  {pageNum}
                </Button>
              )
            ))}
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 px-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-[225px] w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* Infinite scroll trigger */}
        <div ref={ref} className="h-10" />
      </div>
    </div>
  )
}