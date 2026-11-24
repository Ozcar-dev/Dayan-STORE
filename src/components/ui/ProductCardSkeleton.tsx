import { Skeleton } from '@/components/ui/skeleton'

export function ProductCardSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading item"
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card"
    >
      <div className="relative">
        <Skeleton className="aspect-square w-full rounded-none" />
        <Skeleton className="absolute -bottom-6 right-3 z-10 h-14 w-14 rounded-full sm:-bottom-9 sm:h-20 sm:w-20" />
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3 pt-7 sm:p-3.5">
        <Skeleton className="h-4 w-4/5 sm:h-5 sm:w-3/5" />
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-2/3" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="mt-auto h-10 w-full rounded-lg" />
      </div>
    </div>
  )
}