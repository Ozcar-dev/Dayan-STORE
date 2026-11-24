import { ProductGridSkeleton } from '@/components/sections/ProductGridSkeleton'
import { Skeleton } from '@/components/ui/skeleton'

export function ShopSkeleton() {
  return (
    <section
      role="status"
      aria-label="Loading shop"
      className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6"
    >
      <Skeleton className="h-10 w-32" />
      <Skeleton className="mt-2 h-6 w-20" />

      <div className="mt-6 flex items-center gap-2 sm:gap-3 lg:gap-4">
        <Skeleton className="h-12 min-w-0 flex-1 rounded-full lg:w-104 lg:flex-none" />
        <Skeleton className="h-12 w-28 shrink-0 rounded-full lg:hidden" />
        <div className="hidden gap-2 lg:flex">
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton key={index} className="h-9 w-20 rounded-full" />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <ProductGridSkeleton />
      </div>
    </section>
  )
}