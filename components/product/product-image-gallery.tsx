"use client"

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ProductImageGalleryProps {
  images: string[]
  productName: string
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  
  if (!images.length) {
    return (
      <div className="aspect-square bg-secondary flex items-center justify-center rounded-md">
        <p className="text-muted-foreground">No image available</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square rounded-md overflow-hidden bg-muted">
        <Image
          src={images[selectedImage]}
          alt={`${productName} - Image ${selectedImage + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority
        />
      </div>
      
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((image, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(i)}
              className={cn(
                "relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all",
                selectedImage === i 
                  ? "border-primary" 
                  : "border-transparent hover:border-muted-foreground/50"
              )}
            >
              <Image
                src={image}
                alt={`${productName} - Thumbnail ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}