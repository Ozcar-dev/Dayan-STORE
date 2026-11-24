import { MyOrderCardSkeleton } from '@/components/sections/MyOrderCardSkeleton'
import { PageHeaderSkeleton } from '@/components/sections/PageHeaderSkeleton'
import { Skeleton } from '@/components/ui/skeleton'

export function MyOrdersSkeleton() {
  return (
    <div role="status" aria-label="Loading orders">
      <PageHeaderSkeleton />
      <div className="mx-auto w-full max-w-3xl space-y-4 px-4 py-10 sm:px-6">
        <Skeleton className="h-4 w-full max-w-lg" />
        {Array.from({ length: 3 }, (_, index) => (
          <MyOrderCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}