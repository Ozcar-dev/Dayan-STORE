import { PageHeaderSkeleton } from '@/components/sections/PageHeaderSkeleton'
import { Skeleton } from '@/components/ui/skeleton'

const HEIGHTS = ['h-56', 'h-40', 'h-64', 'h-48', 'h-52', 'h-36', 'h-60', 'h-44']

export function ReviewsSkeleton() {
  return (
    <div role="status" aria-label="Loading reviews">
      <PageHeaderSkeleton />

      <div className="mx-auto w-full max-w-6xl space-y-10 px-4 py-10 sm:px-6">
        <div className="columns-2 gap-3 sm:columns-3 lg:columns-4">
          {HEIGHTS.map((height, index) => (
            <Skeleton
              key={index}
              className={`mb-3 w-full break-inside-avoid rounded-2xl ${height}`}
            />
          ))}
        </div>

        <Skeleton className="h-36 rounded-2xl" />
      </div>
    </div>
  )
}