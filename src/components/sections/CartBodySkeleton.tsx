import { Skeleton } from '@/components/ui/skeleton'

export function CartBodySkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading cart"
      className="grid gap-8 lg:grid-cols-[1fr_20rem]"
    >
      <ul className="divide-y divide-border rounded-2xl border border-border bg-card px-4">
        {Array.from({ length: 3 }, (_, index) => (
          <li key={index} className="flex gap-4 py-4">
            <Skeleton className="h-24 w-20 shrink-0 rounded-xl" />
            <div className="min-w-0 flex-1 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1 space-y-2">
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <Skeleton className="h-5 w-16" />
              </div>
              <div className="flex items-center justify-between gap-3">
                <Skeleton className="h-10 w-28 rounded-full" />
                <Skeleton className="h-4 w-14" />
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="h-fit space-y-4 rounded-2xl border border-border bg-card p-5">
        <Skeleton className="h-7 w-28" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-7 w-24" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-12 w-full" />
        </div>
        <Skeleton className="h-12 w-full rounded-full" />
        <Skeleton className="h-9 w-28 rounded-full" />
      </div>
    </div>
  )
}