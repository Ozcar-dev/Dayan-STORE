import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ProductImage } from '@/components/ui/ProductImage'
import { formatWhen } from '@/lib/format-date'
import { thumbUrl } from '@/lib/image-url'
import { formatPrice } from '@/lib/utils'
import type { Order } from '@/types'

interface AdminOrderCardProps {
  order: Order
  busy: boolean
  onToggle: () => void
  onDelete: () => void
}

export function AdminOrderCard({
  order,
  busy,
  onToggle,
  onDelete,
}: AdminOrderCardProps) {
  const [confirming, setConfirming] = useState(false)
  const received = order.status === 'received'

  return (
    <li className="space-y-4 rounded-2xl border border-border bg-card p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-heading text-lg font-semibold">
            {order.customer_name}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatWhen(order.created_at)} · {order.item_count} item(s)
          </p>
        </div>
        <p className="text-lg font-semibold text-primary">
          {formatPrice(order.total)}
        </p>
      </div>

      <ul className="space-y-3">
        {order.items.map((item, index) => {
          const details = [item.size, item.colour].filter(Boolean).join(', ')

          return (
            <li key={`${item.product_id}-${index}`} className="flex gap-3">
              <div className="relative h-14 w-11 shrink-0 overflow-hidden rounded-lg bg-muted">
                <ProductImage
                  src={thumbUrl(item.image)}
                  alt={item.name}
                  iconSize={18}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  {details ? `${details} · ` : ''}x{item.quantity}
                </p>
              </div>
              <p className="shrink-0 text-sm font-semibold">
                {formatPrice(item.price * item.quantity)}
              </p>
            </li>
          )
        })}
      </ul>

      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" onClick={onToggle} disabled={busy}>
          {received ? 'Undo received' : 'Mark as received'}
        </Button>

        <Link
          to={`/order/${order.id}`}
          className="inline-flex items-center rounded-full border border-border px-4 py-1.5 text-sm font-semibold hover:bg-secondary"
        >
          View page
        </Link>

        {confirming ? (
          <>
            <Button
              size="sm"
              disabled={busy}
              onClick={() => {
                setConfirming(false)
                onDelete()
              }}
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
            disabled={busy}
            onClick={() => setConfirming(true)}
          >
            Delete
          </Button>
        )}

        {received && order.received_at && (
          <span className="text-sm text-muted-foreground">
            Received {formatWhen(order.received_at)}
          </span>
        )}
      </div>
    </li>
  )
}