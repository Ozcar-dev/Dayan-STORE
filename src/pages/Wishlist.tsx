import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { ProductGridSkeleton } from '@/components/sections/ProductGridSkeleton'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/ui/PageHeader'
import { ProductCard } from '@/components/ui/ProductCard'
import { Reveal } from '@/components/ui/Reveal'
import { Skeleton } from '@/components/ui/skeleton'
import { useProducts } from '@/hooks/use-products'
import { useWishlist } from '@/hooks/use-wishlist'

export default function Wishlist() {
  const { products, isLoading } = useProducts()
  const { ids, clear } = useWishlist()

  const saved = products.filter((product) => ids.includes(product.id))

  return (
    <>
      <PageHeader
        title="Your wishlist"
        subtitle="Pieces you have saved to come back to."
      />

      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        {isLoading ? (
          <div role="status" aria-label="Loading wishlist">
            <div className="flex items-center justify-between gap-3">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-9 w-24 rounded-full" />
            </div>
            <ProductGridSkeleton count={4} className="mt-6" />
          </div>
        ) : saved.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card px-4 py-12 text-center">
            <Heart size={36} className="mx-auto text-primary" />
            <p className="mt-3 font-heading text-xl font-semibold text-primary">
              Nothing saved yet
            </p>
            <p className="mt-2 text-muted-foreground">
              Open any item and tap the heart to save it here.
            </p>
            <Link
              to="/shop"
              className="mt-5 inline-block rounded-full bg-primary px-6 py-2.5 font-semibold text-primary-foreground"
            >
              Browse the shop
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold text-muted-foreground">
                {saved.length} {saved.length === 1 ? 'item' : 'items'} saved
              </p>
              <Button variant="outline" size="sm" onClick={clear}>
                Clear all
              </Button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {saved.map((product, index) => (
                <Reveal
                  key={product.id}
                  className="h-full"
                  delay={(index % 8) * 60}
                >
                  <ProductCard product={product} noteSlot={index} />
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}