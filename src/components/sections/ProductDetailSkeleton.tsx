import { ProductGridSkeleton } from '@/components/sections/ProductGridSkeleton'
import { Skeleton } from '@/components/ui/skeleton'

function Chips({ count, width }: { count: number; width: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: count }, (_, index) => (
        <Skeleton key={index} className={`h-9 rounded-full ${width}`} />
      ))}
    </div>
  )
}

export function ProductDetailSkeleton() {
  return (
    <section
      role="status"
      aria-label="Loading product"
      className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6"
    >
      <Skeleton className="h-5 w-28" />

      <div className="mt-6 grid gap-8 md:grid-cols-2 md:items-stretch md:gap-12">
        <div className="flex min-w-0 flex-col gap-3 md:h-full">
          <Skeleton className="aspect-4/5 w-full rounded-2xl md:aspect-auto md:min-h-96 md:flex-1" />
          <div className="flex gap-2">
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton key={index} className="h-20 w-16 shrink-0 rounded-lg" />
            ))}
          </div>
        </div>

        <div className="min-w-0 space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-9 w-3/4 sm:h-10" />
            <Skeleton className="h-8 w-32" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-12" />
            <Chips count={4} width="w-14" />
            <Skeleton className="h-4 w-64 max-w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-14" />
            <Chips count={2} width="w-24" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-28 rounded-full" />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Skeleton className="h-12 w-40 rounded-full" />
            <Skeleton className="h-10 w-36 rounded-full" />
          </div>

          <Skeleton className="h-4 w-full max-w-sm" />
        </div>
      </div>

      <div className="mt-16">
        <Skeleton className="h-8 w-56" />
        <ProductGridSkeleton
          count={5}
          className="mt-6 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 xl:grid-cols-5"
        />
      </div>
    </section>
  )
}