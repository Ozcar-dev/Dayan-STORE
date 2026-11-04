import { ProductGridSkeleton } from '@/components/sections/ProductGridSkeleton'
import { Skeleton } from '@/components/ui/skeleton'

export function ShopSkeleton() {
  return (
    <section
      role="status"
      aria-label="Loading shop"
      className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6"
    >
      <Skeleton className="h-10 w-40" />
      <Skeleton className="mt-3 h-5 w-24" />
      <Skeleton className="mt-6 h-12 w-full rounded-full" />
      <div className="mt-4 flex flex-wrap gap-2">
        {Array.from({ length: 7 }, (_, index) => (
          <Skeleton key={index} className="h-9 w-24 rounded-full" />
        ))}
      </div>
      <div className="mt-8">
        <ProductGridSkeleton />
      </div>
    </section>
  )
}