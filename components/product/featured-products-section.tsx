import { ProductCard } from './product-card'
import { Product } from '@/types'
import { products } from '@/data/productData'

export function FeaturedProductsSection() {
  const featuredProducts = products.filter(product => product.featured)

  if (featuredProducts.length === 0) {
    return null
  }

  return (
    <section className="py-12 bg-[#F5F5DC]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start md:items-center justify-center gap-4 mb-8">
          <div className="flex flex-col items-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-[#000080]">Featured Products</h2>
            <p className="text-[#000080]">
              Handpicked Nepali treasures to explore and cherish
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 px-2">
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index < 4}
            />
          ))}
        </div>
      </div>
    </section>
  )
} 