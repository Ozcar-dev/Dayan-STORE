import { PageHeaderSkeleton } from '@/components/sections/PageHeaderSkeleton'
import { Skeleton } from '@/components/ui/skeleton'

export function SizeGuideSkeleton() {
  return (
    <div role="status" aria-label="Loading size guide">
      <PageHeaderSkeleton />

      <div className="mx-auto w-full max-w-6xl space-y-10 px-4 py-10 sm:px-6">
        <div>
          <Skeleton className="h-8 w-40" />
          <Skeleton className="mt-2 h-5 w-56" />
          <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card">
            <Skeleton className="h-12 rounded-none bg-secondary" />
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="border-t border-border p-3">
                <Skeleton className="h-6 w-full" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Skeleton className="h-8 w-44" />
          <Skeleton className="h-5 w-full max-w-lg" />
          <Skeleton className="h-5 w-full max-w-md" />
          <Skeleton className="h-5 w-full max-w-lg" />
        </div>

        <Skeleton className="h-36 rounded-2xl" />
      </div>
    </div>
  )
}