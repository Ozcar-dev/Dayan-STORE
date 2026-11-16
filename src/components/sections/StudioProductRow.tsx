import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ProductImage } from '@/components/ui/ProductImage'
import { Select } from '@/components/ui/select'
import { STOCK_OPTIONS } from '@/constants/stock'
import { thumbUrl } from '@/lib/image-url'
import { formatPrice } from '@/lib/utils'
import type { Product, StockStatus } from '@/types'

interface StudioProductRowProps {
  product: Product
  busy: boolean
  onEdit: () => void
  onStockChange: (stock: StockStatus) => void
  onDelete: () => void
}

export function StudioProductRow({
  product,
  busy,
  onEdit,
  onStockChange,
  onDelete,
}: StudioProductRowProps) {
  const [confirming, setConfirming] = useState(false)

  return (
    <li className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
          <ProductImage
            src={thumbUrl(product.images[0])}
            alt=""
            iconSize={20}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="truncate font-semibold">{product.name}</p>
          <p className="text-sm text-muted-foreground">
            {formatPrice(product.price)}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Select
          aria-label={`Availability of ${product.name}`}
          value={product.stock}
          disabled={busy}
          onChange={(event) => onStockChange(event.target.value as StockStatus)}
          className="w-auto py-2 text-sm"
        >
          {STOCK_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <Button size="sm" variant="outline" onClick={onEdit} disabled={busy}>
          Edit
        </Button>

        {confirming ? (
          <>
            <Button
              size="sm"
              onClick={() => {
                setConfirming(false)
                onDelete()
              }}
              disabled={busy}
            >
              Yes, delete
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setConfirming(false)}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setConfirming(true)}
            disabled={busy}
          >
            Delete
          </Button>
        )}
      </div>
    </li>
  )
}