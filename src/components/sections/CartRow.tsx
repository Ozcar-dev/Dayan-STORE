import { Link } from 'react-router-dom'
import { ProductImage } from '@/components/ui/ProductImage'
import { QuantityStepper } from '@/components/ui/QuantityStepper'
import type { CartItem } from '@/lib/cart'
import { thumbUrl } from '@/lib/image-url'
import { formatPrice } from '@/lib/utils'

interface CartRowProps {
  item: CartItem
  onQuantity: (key: string, quantity: number) => void
  onRemove: (key: string) => void
}

export function CartRow({ item, onQuantity, onRemove }: CartRowProps) {
  const { key, line, product } = item

  const details = [
    line.size && `Size ${line.size}`,
    line.colour && `Colour ${line.colour}`,
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <li className="flex gap-4 py-4">
      <Link
        to={`/shop/${product.id}`}
        className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-muted"
      >
        <ProductImage
          src={thumbUrl(product.images[0])}
          alt={product.name}
          iconSize={24}
          className="h-full w-full object-cover"
        />
      </Link>

      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              to={`/shop/${product.id}`}
              className="line-clamp-2 font-heading font-semibold hover:text-primary"
            >
              {product.name}
            </Link>
            {details && (
              <p className="text-sm text-muted-foreground">{details}</p>
            )}
            {line.quantity > 1 && (
              <p className="text-sm text-muted-foreground">
                {formatPrice(product.price)} each
              </p>
            )}
          </div>
          <p className="shrink-0 font-semibold text-primary">
            {formatPrice(product.price * line.quantity)}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <QuantityStepper
            label={`Quantity of ${product.name}`}
            value={line.quantity}
            onChange={(value) => onQuantity(key, value)}
          />
          <button
            type="button"
            onClick={() => onRemove(key)}
            className="text-sm font-semibold text-primary underline underline-offset-4"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  )
}