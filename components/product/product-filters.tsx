"use client"

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Check, ChevronDown, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'

interface Category {
  id: string
  name: string
  slug: string
}

interface ProductFiltersProps {
  categories: Category[]
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  
  const currentCategory = searchParams.get('category') || ''
  const currentSort = searchParams.get('sort') || ''
  
  const sortOptions = [
    { label: 'Newest', value: 'newest' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
  ]

  const createQueryString = (params: Record<string, string | null>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newSearchParams.delete(key)
      } else {
        newSearchParams.set(key, value)
      }
    })
    
    return newSearchParams.toString()
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/products?${createQueryString({ search: searchQuery || null })}`)
  }

  const handleCategoryChange = (slug: string) => {
    router.push(`/products?${createQueryString({ category: slug === currentCategory ? null : slug })}`)
  }

  const handleSortChange = (value: string) => {
    router.push(`/products?${createQueryString({ sort: value })}`)
  }

  const clearFilters = () => {
    setSearchQuery('')
    router.push('/products')
  }

  const hasActiveFilters = searchQuery || currentCategory || currentSort

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="relative">
        <Input
          type="search"
          placeholder="Search products..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </form>
      
      <div className="flex flex-wrap gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              Categories
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuGroup>
              {categories.map((category) => (
                <DropdownMenuItem 
                  key={category.id}
                  className="cursor-pointer flex items-center justify-between"
                  onClick={() => handleCategoryChange(category.slug)}
                >
                  {category.name}
                  {currentCategory === category.slug && (
                    <Check className="h-4 w-4" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              Sort
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuGroup>
              {sortOptions.map((option) => (
                <DropdownMenuItem 
                  key={option.value}
                  className="cursor-pointer flex items-center justify-between"
                  onClick={() => handleSortChange(option.value)}
                >
                  {option.label}
                  {currentSort === option.value && (
                    <Check className="h-4 w-4" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear Filters
          </Button>
        )}
      </div>
      
      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 pt-2">
          {currentCategory && (
            <Badge variant="secondary" className="gap-1">
              {categories.find(c => c.slug === currentCategory)?.name}
              <button 
                onClick={() => handleCategoryChange(currentCategory)}
                className="ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </Badge>
          )}
          {currentSort && (
            <Badge variant="secondary" className="gap-1">
              {sortOptions.find(s => s.value === currentSort)?.label}
              <button 
                onClick={() => handleSortChange('')}
                className="ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </Badge>
          )}
          {searchQuery && (
            <Badge variant="secondary" className="gap-1">
              Search: {searchQuery}
              <button 
                onClick={() => {
                  setSearchQuery('')
                  router.push(`/products?${createQueryString({ search: null })}`)
                }}
                className="ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}