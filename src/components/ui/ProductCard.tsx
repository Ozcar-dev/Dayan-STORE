import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PriceTag } from '@/components/ui/PriceTag'
import { ProductImage } from '@/components/ui/ProductImage'
import { StockBadge } from '@/components/ui/StockBadge'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { WishlistButton } from '@/components/ui/WishlistButton'
import { useCart } from '@/hooks/use-cart'
import { thumbUrl } from '@/lib/image-url'
import { buildItemMessage } from '@/lib/whatsapp-messages'
import type { Product } from '@/types'

type AddStatus = 'idle' | 'added' | 'full'

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart()
  const [status, setStatus] = useState<AddStatus>('idle')

  const soldOut = product.stock === 'sold-out'
  const link = `/shop/${product.id}`
  const quickAdd = product.sizes.length === 1 && product.colours.length <= 1
  const message = buildItemMessage({ product })

  const handleAdd = () => {
    const added = add(
      {
        productId: product.id,
        size: product.sizes[0],
        colour: product.colours[0] ?? '',
      },
      1,
    )
    setStatus(added ? 'added' : 'full')
  }

  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground">
      <div className="relative">
        <Link to={link} className="group block">
          <div className="relative aspect-5/5 w-full overflow-hidden bg-muted">
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
        <div className="min-w-0">
          <Link
            to={link}
            className="line-clamp-2 pr-24 font-heading font-semibold hover:text-primary"
          >
            {product.name}
          </Link>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {product.description}
          </p>
        </div>

        <div className="mt-auto space-y-2 pt-2">
          {soldOut ? (
            <p className="rounded-full bg-muted px-5 py-2.5 text-center text-sm font-semibold text-muted-foreground">
              Sold out
            </p>
          ) : (
            <>
              {quickAdd ? (
                <Button className="w-full" onClick={handleAdd}>
                  <ShoppingCart size={18} />
                  Add to cart
                </Button>
              ) : (
                <Link
                  to={link}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  Choose options
                </Link>
              )}

              <WhatsAppButton
                message={message}
                label="Order on WhatsApp"
                className="w-full"
              />

              {status === 'added' && (
                <p role="status" className="text-sm font-semibold text-primary">
                  Added.{' '}
                  <Link to="/cart" className="underline underline-offset-4">
                    View cart
                  </Link>
                </p>
              )}

              {status === 'full' && (
                <p role="alert" className="text-sm font-semibold text-primary">
                  Your cart is full. Send this order first.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </article>
  )
}