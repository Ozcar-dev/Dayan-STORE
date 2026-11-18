import { Skeleton } from '@/components/ui/skeleton'

export function ProductDetailSkeleton() {
  return (
    <section
      role="status"
      aria-label="Loading product"
      className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6"
    >
      <Skeleton className="h-5 w-28" />

      <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-12">
        <Skeleton className="aspect-4/5 md:aspect-square w-full rounded-2xl" />

        <div className="space-y-6">
          <div className="space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-8 w-32" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton key={index} className="h-9 w-14 rounded-full" />
            ))}
          </div>

          <Skeleton className="h-11 w-full rounded-full sm:w-56" />
        </div>
      </div>
    </section>
  )
}