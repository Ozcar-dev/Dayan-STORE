import { PageHeaderSkeleton } from '@/components/sections/PageHeaderSkeleton'
import { Skeleton } from '@/components/ui/skeleton'

export function AboutSkeleton() {
  return (
    <div role="status" aria-label="Loading about page">
      <PageHeaderSkeleton />

      <div className="mx-auto w-full max-w-6xl space-y-10 px-4 py-10 sm:px-6">
        <div className="max-w-3xl space-y-3">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-2/3" />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton key={index} className="h-16 rounded-2xl" />
          ))}
        </div>

        <Skeleton className="h-12 w-52 rounded-full" />
      </div>
    </div>
  )
}