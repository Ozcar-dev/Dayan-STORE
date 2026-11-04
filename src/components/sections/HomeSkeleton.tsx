import { ProductGridSkeleton } from '@/components/sections/ProductGridSkeleton'
import { Skeleton } from '@/components/ui/skeleton'

export function HomeSkeleton() {
  return (
    <div role="status" aria-label="Loading home page">
      <div className="bg-secondary">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <Skeleton className="h-4 w-32 bg-background/60" />
          <Skeleton className="mt-4 h-12 w-3/4 max-w-xl bg-background/60 sm:h-16" />
          <Skeleton className="mt-4 h-5 w-full max-w-lg bg-background/60" />
          <Skeleton className="mt-2 h-5 w-2/3 max-w-md bg-background/60" />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Skeleton className="h-12 w-36 rounded-full bg-background/60" />
            <Skeleton className="h-12 w-44 rounded-full bg-background/60" />
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <Skeleton className="h-9 w-56" />
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton key={index} className="h-24 rounded-2xl" />
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
        <Skeleton className="h-9 w-64" />
        <ProductGridSkeleton count={4} className="mt-6 lg:grid-cols-4" />
      </div>
    </div>
  )
}