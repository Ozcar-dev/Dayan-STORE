import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { OptionChips } from '@/components/ui/OptionChips'
import { QuantityStepper } from '@/components/ui/QuantityStepper'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { CATEGORIES } from '@/constants/categories'
import { useCart } from '@/hooks/use-cart'
import { MAX_LINES } from '@/lib/cart'
import { siteOrigin } from '@/lib/site-url'
import { buildItemMessage } from '@/lib/whatsapp-messages'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types'

export function ProductInfo({ product }: { product: Product }) {
  const { add } = useCart()
  const [size, setSize] = useState<string | null>(
    product.sizes.length === 1 ? product.sizes[0] : null,
  )
  const [colour, setColour] = useState<string | null>(
    product.colours.length === 1 ? product.colours[0] : null,
  )
  const [quantity, setQuantity] = useState(1)
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')

  const categoryName =
    CATEGORIES.find((item) => item.slug === product.category)?.name ?? ''
  const soldOut = product.stock === 'sold-out'
  const hasColours = product.colours.length > 0

  const chooseSize = (value: string) => {
    setSize(value)
    setError('')
    setNotice('')
  }

  const chooseColour = (value: string) => {
    setColour(value)
    setError('')
    setNotice('')
  }

  const handleAdd = () => {
    const missing = [!size && 'a size', hasColours && !colour && 'a colour']
      .filter(Boolean)
      .join(' and ')

    if (missing) {
      setNotice('')
      setError(`Please choose ${missing}.`)
      return
    }

    const added = add(
      { productId: product.id, size: size ?? '', colour: colour ?? '' },
      quantity,
    )

    if (!added) {
      setNotice('')
      setError(
        `Your cart is full (${MAX_LINES} different items). Send this order first.`,
      )
      return
    }

    setError('')
    setNotice('Added to your cart.')
  }

  const orderMessage = buildItemMessage({
    product,
    size: size ?? undefined,
    colour: colour ?? undefined,
    quantity,
  })

  const similarMessage = [
    `Hello, do you have something like the ${product.name}?`,
    '',
    `${siteOrigin()}/p/${product.id}`,
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
              onChange={chooseSize}
            />
            <Link
              to="/size-guide"
              className="inline-block text-sm font-semibold text-primary underline underline-offset-4"
            >
              Not sure of your size? See the size guide
            </Link>
          </div>

          {hasColours && (
            <OptionChips
              label="Colour"
              options={product.colours}
              value={colour}
              onChange={chooseColour}
            />
          )}

          <div>
            <p className="mb-2 text-sm font-semibold">Quantity</p>
            <QuantityStepper
              label="Quantity"
              value={quantity}
              onChange={setQuantity}
            />
          </div>
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
          <>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" onClick={handleAdd} className="w-full sm:w-auto">
                <ShoppingCart size={18} />
                Add to cart
              </Button>
              <WhatsAppButton
                message={orderMessage}
                label="Order this on WhatsApp"
                className="w-full sm:w-auto"
              />
            </div>

            {error && (
              <p role="alert" className="text-sm font-semibold text-primary">
                {error}
              </p>
            )}

            {notice && (
              <p role="status" className="text-sm font-semibold text-primary">
                {notice}{' '}
                <Link to="/cart" className="underline underline-offset-4">
                  View cart
                </Link>
              </p>
            )}
          </>
        )}

        <p className="text-sm text-muted-foreground">
          We reply on WhatsApp from 8am to 10pm, every day.
        </p>
      </div>
    </div>
  )
}