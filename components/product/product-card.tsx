import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { memo } from 'react'
import { NewBadge } from "@/components/ui/new-badge"

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export const ProductCard = memo(function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <Link 
      href={`/products/${product.slug}`} 
      className="group block h-full"
      prefetch={priority}
    >
      <Card className="overflow-hidden border-[#F8F3D9] bg-[#F8F3D9] hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <div className="relative aspect-[4/3] overflow-hidden">
          <NewBadge uploadDate={product.createdAt} />
          <Image
            src={product.images[0]}
            alt={product.name}
            width={300}
            height={225}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={priority ? 90 : 75}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy0vLzYvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLz/2wBDAR0dHh4eHRoaHSQtJSEkLzYvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLz/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <Badge variant="destructive">Out of Stock</Badge>
            </div>
          )}
        </div>
        <CardContent className="pt-3 px-3 flex-grow">
          {product.category && (
            <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
          )}
          <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
        </CardContent>
        <CardFooter className="border-t border-border pt-2 px-3">
          <div className="text-sm font-semibold">
            {formatPrice(product.price)}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
})