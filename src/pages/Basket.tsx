import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { BasketRow } from '@/components/sections/BasketRow'
import { ProductsError } from '@/components/sections/ProductsError'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/ui/PageHeader'
import { Skeleton } from '@/components/ui/skeleton'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { useBasket } from '@/hooks/use-basket'
import { useProducts } from '@/hooks/use-products'
import { buildOrderMessage, lineKey } from '@/lib/basket'
import type { BasketItem } from '@/lib/basket'
import { formatPrice } from '@/lib/utils'
import type { BasketLine, Product } from '@/types'

interface Unavailable {
  key: string
  line: BasketLine
  product?: Product
}

export default function Basket() {
  const { lines, setQuantity, remove, clear } = useBasket()
  const { products, isLoading, isError, refetch } = useProducts()
  const [clearing, setClearing] = useState(false)

  const items: BasketItem[] = []
  const unavailable: Unavailable[] = []

  for (const line of lines) {
    const key = lineKey(line)
    const product = products.find((entry) => entry.id === line.productId)

    if (!product || product.stock === 'sold-out') {
      unavailable.push({ key, line, product })
    } else {
      items.push({ key, line, product })
    }
  }

  const total = items.reduce(
    (sum, { line, product }) => sum + product.price * line.quantity,
    0,
  )

  const message = buildOrderMessage(items, window.location.origin)

  return (
    <>
      <PageHeader
        title="Your basket"
        subtitle="Review your items, then send your order on WhatsApp."
      />

      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        {isLoading ? (
          <div role="status" aria-label="Loading basket" className="space-y-3">
            {Array.from({ length: 3 }, (_, index) => (
              <Skeleton key={index} className="h-28 rounded-2xl" />
            ))}
          </div>
        ) : isError ? (
          <ProductsError onRetry={() => void refetch()} />
        ) : lines.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card px-4 py-12 text-center">
            <ShoppingBag size={36} className="mx-auto text-primary" />
            <p className="mt-3 font-heading text-xl font-semibold text-primary">
              Your basket is empty
            </p>
            <p className="mt-2 text-muted-foreground">
              Choose a size on any item and tap Add to basket.
            </p>
            <Link
              to="/shop"
              className="mt-5 inline-block rounded-full bg-primary px-6 py-2.5 font-semibold text-primary-foreground"
            >
              Browse the shop
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
            <div className="min-w-0 space-y-6">
              {items.length > 0 && (
                <ul className="divide-y divide-border rounded-2xl border border-border bg-card px-4">
                  {items.map((item) => (
                    <BasketRow
                      key={item.key}
                      item={item}
                      onQuantity={setQuantity}
                      onRemove={remove}
                    />
                  ))}
                </ul>
              )}

              {unavailable.length > 0 && (
                <section className="rounded-2xl border border-border bg-secondary p-4">
                  <h2 className="font-heading font-semibold text-primary">
                    No longer available
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    These items are sold out or have been removed. They are left
                    out of your order.
                  </p>
                  <ul className="mt-3 space-y-2">
                    {unavailable.map(({ key, line, product }) => (
                      <li
                        key={key}
                        className="flex items-center justify-between gap-3"
                      >
                        <span className="min-w-0 truncate font-semibold">
                          {product ? product.name : 'An item'}
                          {line.size && ` (size ${line.size})`}
                        </span>
                        <button
                          type="button"
                          onClick={() => remove(key)}
                          className="shrink-0 text-sm font-semibold text-primary underline underline-offset-4"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            <aside className="h-fit space-y-4 rounded-2xl border border-border bg-card p-5 lg:sticky lg:top-24">
              <h2 className="text-xl font-semibold text-primary">Summary</h2>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Items total</span>
                <span className="text-xl font-semibold">
                  {formatPrice(total)}
                </span>
              </div>

              <p className="text-sm text-muted-foreground">
                Delivery fees are confirmed with you on WhatsApp before you pay.
              </p>

              {items.length > 0 ? (
                <WhatsAppButton
                  message={message}
                  label="Send order on WhatsApp"
                  className="w-full"
                />
              ) : (
                <p className="text-sm font-semibold text-primary">
                  Nothing available to order right now.
                </p>
              )}

              {clearing ? (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => {
                      clear()
                      setClearing(false)
                    }}
                  >
                    Yes, clear
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setClearing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setClearing(true)}
                >
                  Clear basket
                </Button>
              )}
            </aside>
          </div>
        )}
      </div>
    </>
  )
}