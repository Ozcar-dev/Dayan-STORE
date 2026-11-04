import { CategoryTiles } from '@/components/sections/CategoryTiles'
import { FeaturedProducts } from '@/components/sections/FeaturedProducts'
import { Hero } from '@/components/sections/Hero'
import { HowToOrder } from '@/components/sections/HowToOrder'
import { WhatsAppCta } from '@/components/sections/WhatsAppCta'
import { useProducts } from '@/hooks/use-products'

export default function Home() {
  const { products, isLoading } = useProducts()

  return (
    <>
      <Hero />
      <CategoryTiles products={products} loading={isLoading} />
      <FeaturedProducts products={products} loading={isLoading} />
      <HowToOrder />
      <WhatsAppCta />
    </>
  )
}