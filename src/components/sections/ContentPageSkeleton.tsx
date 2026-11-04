import { Skeleton } from '@/components/ui/skeleton'

export function ContentPageSkeleton() {
  return (
    <div role="status" aria-label="Loading page">
      <div className="bg-secondary">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <Skeleton className="h-10 w-56 bg-background/60 sm:h-12" />
          <Skeleton className="mt-3 h-5 w-full max-w-md bg-background/60" />
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-2">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className="h-40 rounded-2xl" />
        ))}
      </div>
    </div>
  )
}