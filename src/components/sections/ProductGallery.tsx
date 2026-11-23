import { useState } from 'react'
import { PriceTag } from '@/components/ui/PriceTag'
import { ProductImage } from '@/components/ui/ProductImage'
import { StockBadge } from '@/components/ui/StockBadge'
import { WishlistButton } from '@/components/ui/WishlistButton'
import { thumbUrl } from '@/lib/image-url'
import { cn } from '@/lib/utils'
import type { Product } from '@/types'

export function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0)

  return (
    <div className="flex min-w-0 flex-col gap-3 md:h-full">
      <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl border border-border bg-muted md:aspect-auto md:max-h-[44rem] md:min-h-[24rem] md:flex-1">
        <ProductImage
          src={product.images[active]}
          alt={product.name}
          loading="eager"
          iconSize={56}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute left-3 top-3">
          <StockBadge stock={product.stock} />
        </div>
        <WishlistButton
          productId={product.id}
          className="absolute right-3 top-3"
        />
        <PriceTag
          price={product.price}
          hidden
          muted={product.stock === 'sold-out'}
          className="absolute bottom-3 right-3"
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
                src={thumbUrl(src)}
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