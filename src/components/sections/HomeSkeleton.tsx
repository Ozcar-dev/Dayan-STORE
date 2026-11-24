import { ProductGridSkeleton } from '@/components/sections/ProductGridSkeleton'
import { Skeleton } from '@/components/ui/skeleton'

export function HomeSkeleton() {
  return (
    <div role="status" aria-label="Loading home page">
      <div className="bg-secondary">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-24">
          <Skeleton className="h-14 w-3/4 max-w-xl bg-background/60 sm:h-16 lg:h-20" />
          <Skeleton className="mt-4 h-5 w-full max-w-xl bg-background/60" />
          <Skeleton className="mt-2 h-5 w-2/3 max-w-md bg-background/60" />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Skeleton className="h-12 w-36 rounded-full bg-background/60" />
            <Skeleton className="h-12 w-52 rounded-full bg-background/60" />
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-6">
            {Array.from({ length: 3 }, (_, index) => (
              <Skeleton key={index} className="h-5 w-44 bg-background/60" />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <Skeleton className="h-9 w-56" />
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
          {Array.from({ length: 5 }, (_, index) => (
            <Skeleton key={index} className="h-22 rounded-2xl" />
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-5 w-20" />
        </div>
        <ProductGridSkeleton count={4} className="mt-6 lg:grid-cols-4" />
      </div>

      <div className="bg-secondary">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <Skeleton className="mx-auto h-9 w-48 bg-background/60" />
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
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <Skeleton className="h-56 rounded-3xl" />
      </div>
    </div>
  )
}