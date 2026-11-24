import { PageHeaderSkeleton } from '@/components/sections/PageHeaderSkeleton'
import { Skeleton } from '@/components/ui/skeleton'

const ROWS = [4, 2, 2, 2]

export function DeliverySkeleton() {
  return (
    <div role="status" aria-label="Loading delivery information">
      <PageHeaderSkeleton />

      <div className="mx-auto w-full max-w-6xl space-y-12 px-4 py-10 sm:px-6">
        <div className="grid gap-4 md:grid-cols-2">
          {ROWS.map((rows, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-7 w-44" />
              </div>
              <div className="mt-4 space-y-3">
                {Array.from({ length: rows }, (_, row) => (
                  <div key={row} className="space-y-1.5">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-5 w-3/4" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div>
          <Skeleton className="mx-auto h-9 w-48" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-5"
              >
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        </div>

        <Skeleton className="h-32 rounded-2xl" />
      </div>
    </div>
  )
}