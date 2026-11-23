import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { CheckCircle2, Clock, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/ui/PageHeader'
import { ProductImage } from '@/components/ui/ProductImage'
import { Skeleton } from '@/components/ui/skeleton'
import { useNoindex } from '@/hooks/use-noindex'
import { formatWhen } from '@/lib/format-date'
import { thumbUrl } from '@/lib/image-url'
import { readMyOrders } from '@/lib/my-orders'
import { fetchMyOrders } from '@/lib/orders-api'
import { cn, formatPrice } from '@/lib/utils'

function StatusPill({ received }: { received: boolean }) {
  const Icon = received ? CheckCircle2 : Clock

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold',
        received
          ? 'bg-whatsapp text-whatsapp-foreground'
          : 'bg-secondary text-primary',
      )}
    >
      <Icon size={14} />
      {received ? 'Received' : 'Pending'}
    </span>
  )
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card px-4 py-12 text-center">
      <Package size={36} className="mx-auto text-primary" />
      <p className="mt-3 font-heading text-xl font-semibold text-primary">
        No orders to show
      </p>
      <p className="mt-2 text-muted-foreground">{text}</p>
      <Link
        to="/shop"
        className="mt-5 inline-block rounded-full bg-primary px-6 py-2.5 font-semibold text-primary-foreground"
      >
        Browse the shop
      </Link>
    </div>
  )
}

export default function MyOrders() {
  useNoindex()
  const ids = useMemo(() => readMyOrders(), [])

  const query = useQuery({
    queryKey: ['my-orders', ids],
    queryFn: () => fetchMyOrders(ids),
    enabled: ids.length > 0,
    refetchInterval: (current) =>
      current.state.data?.some((order) => order.status === 'pending')
        ? 20_000
        : false,
  })

  const orders = query.data ?? []

  return (
    <>
      <PageHeader
        title="My orders"
        subtitle="Orders you placed on this device."
      />

      <div className="mx-auto w-full max-w-3xl space-y-4 px-4 py-10 sm:px-6">
        {ids.length === 0 ? (
          <EmptyState text="When you place an order, it will appear here." />
        ) : query.isPending ? (
          <div role="status" aria-label="Loading orders" className="space-y-3">
            {Array.from({ length: 3 }, (_, index) => (
              <Skeleton key={index} className="h-36 rounded-2xl" />
            ))}
          </div>
        ) : query.isError ? (
          <div className="rounded-2xl border border-border bg-card px-4 py-12 text-center">
            <p className="font-heading text-xl font-semibold text-primary">
              We couldn't load your orders
            </p>
            <p className="mt-2 text-muted-foreground">
              Check your connection and try again.
            </p>
            <Button className="mt-5" onClick={() => void query.refetch()}>
              Try again
            </Button>
          </div>
        ) : orders.length === 0 ? (
          <EmptyState text="We could not find your earlier orders." />
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              Orders are saved on this device. This page updates by itself.
            </p>

            <ul className="space-y-4">
              {orders.map((order) => (
                <li key={order.id}>
                  <Link
                    to={`/order/${order.id}`}
                    className="block rounded-2xl border border-border bg-card p-4 transition-shadow hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-heading font-semibold">
                          Order for {order.customer_name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatWhen(order.created_at)} · {order.item_count}{' '}
                          item(s) · {formatPrice(order.total)}
                        </p>
                      </div>
                      <StatusPill received={order.status === 'received'} />
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      {order.items.slice(0, 5).map((item, index) => (
                        <div
                          key={`${item.product_id}-${index}`}
                          className="relative h-14 w-11 shrink-0 overflow-hidden rounded-lg bg-muted"
                        >
                          <ProductImage
                            src={thumbUrl(item.image)}
                            alt={item.name}
                            iconSize={18}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                      {order.items.length > 5 && (
                        <span className="text-sm font-semibold text-muted-foreground">
                          +{order.items.length - 5}
                        </span>
                      )}
                    </div>

                    <p className="mt-2 truncate text-sm text-muted-foreground">
                      {order.items.map((item) => item.name).join(', ')}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  )
}