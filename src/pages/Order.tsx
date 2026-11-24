import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { CheckCircle2, Clock } from 'lucide-react'
import { OrderSkeleton } from '@/components/sections/OrderSkeleton'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/ui/PageHeader'
import { ProductImage } from '@/components/ui/ProductImage'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { OWNER_PATH } from '@/constants/site'
import { useAuth } from '@/hooks/use-auth'
import { useNoindex } from '@/hooks/use-noindex'
import { useOrderMutations } from '@/hooks/use-orders'
import { formatWhen } from '@/lib/format-date'
import { thumbUrl } from '@/lib/image-url'
import { fetchOrder } from '@/lib/orders-api'
import { siteOrigin } from '@/lib/site-url'
import { cn, formatPrice } from '@/lib/utils'

const UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export default function Order() {
  useNoindex()
  const { id = '' } = useParams()
  const valid = UUID.test(id)
  const { session } = useAuth()
  const { setStatus } = useOrderMutations()

  const query = useQuery({
    queryKey: ['order', id],
    queryFn: () => fetchOrder(id),
    enabled: valid,
    refetchInterval: (current) =>
      current.state.data?.status === 'received' ? false : 15_000,
  })

  if (valid && query.isPending) return <OrderSkeleton />

  if (valid && query.isError) {
    return (
      <section className="mx-auto w-full max-w-xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-3xl font-semibold text-primary">
          We couldn't load this order
        </h1>
        <p className="mt-3 text-muted-foreground">
          Check your connection and try again.
        </p>
        <Button className="mt-5" onClick={() => void query.refetch()}>
          Try again
        </Button>
      </section>
    )
  }

  const order = query.data

  if (!valid || !order) {
    return (
      <section className="mx-auto w-full max-w-xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-3xl font-semibold text-primary">Order not found</h1>
        <p className="mt-3 text-muted-foreground">
          This link may be wrong or the order was removed.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-block rounded-full bg-primary px-6 py-2 font-semibold text-primary-foreground"
        >
          Back to shop
        </Link>
      </section>
    )
  }

  const received = order.status === 'received'

  return (
    <>
      <PageHeader
        title={`Order from ${order.customer_name}`}
        subtitle={`Placed ${formatWhen(order.created_at)}`}
      />

      <div className="mx-auto w-full max-w-3xl space-y-6 px-4 py-10 sm:px-6">
        <div
          role="status"
          className={cn(
            'flex items-start gap-3 rounded-2xl p-4',
            received
              ? 'bg-whatsapp text-whatsapp-foreground'
              : 'bg-secondary text-foreground',
          )}
        >
          {received ? (
            <CheckCircle2 size={24} className="mt-0.5 shrink-0" />
          ) : (
            <Clock size={24} className="mt-0.5 shrink-0 text-primary" />
          )}
          <div>
            <p className="font-heading text-lg font-semibold">
              {received ? 'Received' : 'Pending'}
            </p>
            <p className="text-sm">
              {received
                ? `The seller received this order${order.received_at ? ` on ${formatWhen(order.received_at)}` : ''}.`
                : 'Waiting for the seller to confirm. This page updates by itself.'}
            </p>
          </div>
        </div>

        {session && (
          <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card p-4">
            <p className="text-sm font-semibold text-primary">
              You are signed in as the seller.
            </p>
            <Button
              size="sm"
              disabled={setStatus.isPending}
              onClick={() =>
                setStatus.mutate({
                  id: order.id,
                  status: received ? 'pending' : 'received',
                })
              }
            >
              {received ? 'Undo received' : 'Mark as received'}
            </Button>
            <Link
              to={`${OWNER_PATH}/orders`}
              className="text-sm font-semibold text-primary underline underline-offset-4"
            >
              All orders
            </Link>
            {setStatus.isError && (
              <p
                role="alert"
                className="w-full text-sm font-semibold text-primary"
              >
                Could not update this order. Sign in again and retry.
              </p>
            )}
          </div>
        )}

        <ul className="divide-y divide-border rounded-2xl border border-border bg-card px-4">
          {order.items.map((item, index) => {
            const details = [
              item.size && `Size ${item.size}`,
              item.colour && `Colour ${item.colour}`,
            ]
              .filter(Boolean)
              .join(' · ')

            return (
              <li key={`${item.product_id}-${index}`} className="flex gap-4 py-4">
                <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-muted">
                  <ProductImage
                    src={thumbUrl(item.image)}
                    alt={item.name}
                    iconSize={22}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-heading font-semibold">{item.name}</p>
                  {details && (
                    <p className="text-sm text-muted-foreground">{details}</p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Quantity {item.quantity}
                  </p>
                </div>
                <p className="shrink-0 font-semibold text-primary">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">
          <span className="text-muted-foreground">
            Items total ({order.item_count})
          </span>
          <span className="text-xl font-semibold">
            {formatPrice(order.total)}
          </span>
        </div>

        <p className="text-sm text-muted-foreground">
          Delivery fees are confirmed with you on WhatsApp before you pay.
        </p>

        <WhatsAppButton
          message={`Hello, about my order: ${siteOrigin()}/o/${order.id}`}
          label="Chat with us about this order"
        />
      </div>
    </>
  )
}