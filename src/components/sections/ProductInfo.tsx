import { useState } from 'react'
import { Link } from 'react-router-dom'
import { OptionChips } from '@/components/ui/OptionChips'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { CATEGORIES } from '@/constants/categories'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types'

export function ProductInfo({ product }: { product: Product }) {
  const [size, setSize] = useState<string | null>(
    product.sizes.length === 1 ? product.sizes[0] : null,
  )
  const [colour, setColour] = useState<string | null>(
    product.colours.length === 1 ? product.colours[0] : null,
  )

  const categoryName =
    CATEGORIES.find((item) => item.slug === product.category)?.name ?? ''
  const soldOut = product.stock === 'sold-out'

  const details = [size && `size ${size}`, colour && `colour ${colour}`]
    .filter(Boolean)
    .join(', ')

  const orderMessage = [
    `Hello, I'm interested in the ${product.name} (${formatPrice(product.price)})${details ? `, ${details}` : ''}. Is it available?`,
    window.location.href,
  ].join('\n')

  const similarMessage = [
    `Hello, do you have something like the ${product.name}?`,
    window.location.href,
  ].join('\n')

  return (
    <div className="min-w-0 space-y-6">
      <div>
        <p className="text-sm font-semibold text-muted-foreground">
          {categoryName}
        </p>
        <h1 className="mt-1 text-3xl font-semibold sm:text-4xl">
          {product.name}
        </h1>
        <p className="mt-2 text-2xl font-semibold text-primary">
          {formatPrice(product.price)}
        </p>
      </div>

      <p className="text-muted-foreground">{product.description}</p>

      {!soldOut && (
        <div className="space-y-5">
          <div className="space-y-2">
            <OptionChips
              label="Size"
              options={product.sizes}
              value={size}
              onChange={setSize}
            />
            <Link
              to="/size-guide"
              className="inline-block text-sm font-semibold text-primary underline underline-offset-4"
            >
              Not sure of your size? See the size guide
            </Link>
          </div>

          <OptionChips
            label="Colour"
            options={product.colours}
            value={colour}
            onChange={setColour}
          />
        </div>
      )}

      <div className="space-y-3">
        {soldOut ? (
          <>
            <p className="rounded-2xl bg-muted px-4 py-3 text-sm font-semibold text-muted-foreground">
              This item is sold out.
            </p>
            <WhatsAppButton
              message={similarMessage}
              label="Ask about similar items"
              className="w-full sm:w-auto"
            />
          </>
        ) : (
          <WhatsAppButton
            message={orderMessage}
            className="w-full sm:w-auto"
          />
        )}
        <p className="text-sm text-muted-foreground">
          We reply on WhatsApp from 8am to 10pm, every day.
        </p>
      </div>
    </div>
  )
}