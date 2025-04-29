import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal'
import { products } from '@/data/productData'

export function FeaturedProducts() {
  const content = products.map((product) => ({
    title: product.name,
    description: product.description,
    content: (
      <div className="flex h-full w-full items-center justify-center">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-contain"
        />
      </div>
    ),
  }));

  return (
    <section className="py-16 bg-[#F8F3D9]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start md:items-center justify-center gap-4 mb-8">
          <div className="flex flex-col items-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-[#000080]">Featured Products</h2>
            <p className="text-[#000080]">
              Handpicked Nepali treasures to explore and cherish
            </p>
          </div>
          <Link href="/products">
            <Button variant="default" className="mt-4 md:mt-0">
              View All Products
            </Button>
          </Link>
        </div>
        
        <div className="w-full">
          <StickyScroll content={content} />
        </div>
      </div>
    </section>
  )
}