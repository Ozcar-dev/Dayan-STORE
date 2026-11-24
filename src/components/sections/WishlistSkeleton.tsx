import { PageHeaderSkeleton } from '@/components/sections/PageHeaderSkeleton'
import { ProductGridSkeleton } from '@/components/sections/ProductGridSkeleton'
import { Skeleton } from '@/components/ui/skeleton'

export function WishlistSkeleton() {
  return (
    <div role="status" aria-label="Loading wishlist">
      <PageHeaderSkeleton />
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-9 w-24 rounded-full" />
        </div>
        <ProductGridSkeleton count={4} className="mt-6" />
      </div>
    </div>
  )
}