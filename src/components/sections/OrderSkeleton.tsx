import { PageHeaderSkeleton } from '@/components/sections/PageHeaderSkeleton'
import { Skeleton } from '@/components/ui/skeleton'

export function OrderSkeleton() {
  return (
    <div role="status" aria-label="Loading order">
      <PageHeaderSkeleton />

      <div className="mx-auto w-full max-w-3xl space-y-6 px-4 py-10 sm:px-6">
        <div className="flex items-start gap-3 rounded-2xl bg-secondary p-4">
          <Skeleton className="h-6 w-6 shrink-0 rounded-full bg-background/60" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-28 bg-background/60" />
            <Skeleton className="h-4 w-3/4 bg-background/60" />
          </div>
        </div>

        <ul className="divide-y divide-border rounded-2xl border border-border bg-card px-4">
          {Array.from({ length: 3 }, (_, index) => (
            <li key={index} className="flex gap-4 py-4">
              <Skeleton className="h-20 w-16 shrink-0 rounded-xl" />
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-5 w-16" />
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-7 w-28" />
        </div>

        <Skeleton className="h-4 w-full max-w-md" />
        <Skeleton className="h-12 w-64 rounded-full" />
      </div>
    </div>
  )
}