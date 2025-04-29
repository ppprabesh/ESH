import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Category {
  id: string
  name: string
  slug: string
  image: string
}

interface CategoryShowcaseProps {
  categories: Category[]
}

export function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  return (
    <section className="py-16 bg-[#F8F3D9]">
      <div className="container mx-auto px-4">
        <div className="space-y-2 text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Explore our diverse collection of traditional and contemporary Nepali crafts and souvenirs
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className={cn(
                "group relative aspect-square overflow-hidden rounded-md",
                // Highlight first category as featured if there are at least 4 categories
                index === 0 && categories.length >= 4 ? "md:col-span-2 md:row-span-2" : ""
              )}
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 group-hover:to-background/90 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
                <h3 className="text-foreground font-medium">{category.name}</h3>
                <ArrowRight className="text-foreground opacity-0 group-hover:opacity-100 transition-opacity h-5 w-5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}