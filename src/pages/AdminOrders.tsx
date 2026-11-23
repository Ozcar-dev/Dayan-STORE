import { AdminNav } from '@/components/sections/AdminNav'
import { AdminOrderCard } from '@/components/sections/AdminOrderCard'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/ui/PageHeader'
import { Skeleton } from '@/components/ui/skeleton'
import { useNoindex } from '@/hooks/use-noindex'
import { useOrderMutations, useOrders } from '@/hooks/use-orders'
import { getErrorMessage } from '@/lib/errors'

export default function AdminOrders() {
  useNoindex()
  const { data, isPending, isError, isFetching, refetch } = useOrders()
  const { setStatus, remove } = useOrderMutations()

  const orders = data ?? []
  const waiting = orders.filter((order) => order.status === 'pending')
  const received = orders.filter((order) => order.status === 'received')
  const busy = setStatus.isPending || remove.isPending

  const mutationError = setStatus.isError
    ? getErrorMessage(setStatus.error)
    : remove.isError
      ? getErrorMessage(remove.error)
      : null

  const renderList = (list: typeof orders) => (
    <ul className="space-y-4">
      {list.map((order) => (
        <AdminOrderCard
          key={order.id}
          order={order}
          busy={busy}
          onToggle={() =>
            setStatus.mutate({
              id: order.id,
              status: order.status === 'received' ? 'pending' : 'received',
            })
          }
          onDelete={() => remove.mutate(order.id)}
        />
      ))}
    </ul>
  )

  return (
    <>
      <PageHeader title="Orders" subtitle="Orders placed on your website." />

      <div className="mx-auto w-full max-w-4xl space-y-6 px-4 py-10 sm:px-6">
        <AdminNav />

        {mutationError && (
          <p
            role="alert"
            className="rounded-xl bg-secondary px-4 py-3 text-sm font-semibold text-primary"
          >
            {mutationError}
          </p>
        )}

        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            This list refreshes by itself every 30 seconds.
          </p>
          <Button
            size="sm"
            variant="outline"
            disabled={isFetching}
            onClick={() => void refetch()}
          >
            {isFetching ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>

        {isPending ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }, (_, index) => (
              <Skeleton key={index} className="h-40 rounded-2xl" />
            ))}
          </div>
        ) : isError ? (
          <p role="alert" className="font-semibold text-primary">
            Could not load orders. Check your connection and refresh.
          </p>
        ) : orders.length === 0 ? (
          <p className="rounded-2xl border border-border bg-card p-6 text-center text-muted-foreground">
            No orders yet.
          </p>
        ) : (
          <>
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-primary">
                Waiting to be received ({waiting.length})
              </h2>
              {waiting.length > 0 ? (
                renderList(waiting)
              ) : (
                <p className="text-muted-foreground">Nothing waiting.</p>
              )}
            </section>

            {received.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-primary">
                  Received ({received.length})
                </h2>
                {renderList(received)}
              </section>
            )}
          </>
        )}
      </div>
    </>
  )
}