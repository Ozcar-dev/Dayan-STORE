import { useState } from 'react'
import { ProductImage } from '@/components/ui/ProductImage'
import { StockBadge } from '@/components/ui/StockBadge'
import { WishlistButton } from '@/components/ui/WishlistButton'
import { cn } from '@/lib/utils'
import type { Product } from '@/types'

export function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0)

  return (
    <div className="min-w-0 space-y-3">
      <div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl border border-border bg-muted">
        <ProductImage
          src={product.images[active]}
          alt={product.name}
          loading="eager"
          iconSize={56}
          className="h-full w-full object-cover"
        />
        <div className="absolute left-3 top-3">
          <StockBadge stock={product.stock} />
        </div>
        <WishlistButton
          productId={product.id}
          className="absolute right-3 top-3"
        />
      </div>

      {product.images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {product.images.map((src, index) => (
            <button
              key={src}
              type="button"
              aria-label={`Show photo ${index + 1}`}
              onClick={() => setActive(index)}
              className={cn(
                'relative h-20 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-muted',
                index === active ? 'border-primary' : 'border-transparent',
              )}
            >
              <ProductImage
                src={src}
                alt=""
                iconSize={20}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}