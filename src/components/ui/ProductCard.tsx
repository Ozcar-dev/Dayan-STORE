import { Link } from 'react-router-dom'
import { PriceTag } from '@/components/ui/PriceTag'
import { ProductImage } from '@/components/ui/ProductImage'
import { StockBadge } from '@/components/ui/StockBadge'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { WishlistButton } from '@/components/ui/WishlistButton'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types'
import { thumbUrl } from '@/lib/image-url'



export function ProductCard({ product }: { product: Product }) {
  const soldOut = product.stock === 'sold-out'
  const link = `/shop/${product.id}`
  const message = `Hello, I'm interested in the ${product.name} (${formatPrice(product.price)}). Is it available?`

  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground">
      <div className="relative">
        <Link to={link} className="group block">
          <div className="relative aspect-3/4 w-full overflow-hidden bg-muted">
            <ProductImage
              src={thumbUrl(product.images[0])}
              alt={product.name}
              className="h-full w-full object-cover group-hover:scale-105"
            />
            <div className="absolute left-3 top-3">
              <StockBadge stock={product.stock} />
            </div>
          </div>
        </Link>

        <WishlistButton
          productId={product.id}
          className="absolute right-3 top-3"
        />

        <PriceTag
          price={product.price}
          muted={soldOut}
          className="absolute -bottom-9 right-3 z-10"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <Link
          to={link}
          className="line-clamp-2 min-w-0 pr-24 font-heading font-semibold hover:text-primary"
        >
          {product.name}
        </Link>

        <div className="mt-auto pt-2">
          {soldOut ? (
            <p className="rounded-full bg-muted px-5 py-2.5 text-center text-sm font-semibold text-muted-foreground">
              Sold out
            </p>
          ) : (
            <WhatsAppButton message={message} className="w-full" />
          )}
        </div>
      </div>
    </article>
  )
}