import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { ProductGridSkeleton } from '@/components/sections/ProductGridSkeleton'
import { ProductCard } from '@/components/ui/ProductCard'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/button'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { useProducts } from '@/hooks/use-products'
import { useWishlist } from '@/hooks/use-wishlist'
import { formatPrice } from '@/lib/utils'

export default function Wishlist() {
  const { products, isLoading } = useProducts()
  const { ids, clear } = useWishlist()

  const saved = products.filter((product) => ids.includes(product.id))

  const lines = saved
    .slice(0, 15)
    .map(
      (product, index) =>
        `${index + 1}. ${product.name} (${formatPrice(product.price)}) ${window.location.origin}/shop/${product.id}`,
    )

  const message = [
    "Hello, I'm interested in these items from my wishlist:",
    ...lines,
  ].join('\n')

  return (
    <>
      <PageHeader
        title="Your wishlist"
        subtitle="Items you saved on this device."
      />

      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        {isLoading ? (
          <ProductGridSkeleton count={4} />
        ) : saved.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card px-4 py-12 text-center">
            <Heart size={36} className="mx-auto text-primary" />
            <p className="mt-3 font-heading text-xl font-semibold text-primary">
              Nothing saved yet
            </p>
            <p className="mt-2 text-muted-foreground">
              Tap the heart on any item to save it here.
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
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-muted-foreground">
                {saved.length} {saved.length === 1 ? 'item' : 'items'} saved
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <WhatsAppButton
                  message={message}
                  label="Send my wishlist on WhatsApp"
                />
                <Button variant="outline" onClick={clear}>
                  Clear all
                </Button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {saved.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}