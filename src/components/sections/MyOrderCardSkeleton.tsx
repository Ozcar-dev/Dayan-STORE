import { Skeleton } from '@/components/ui/skeleton'

export function MyOrderCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton className="h-5 w-48 max-w-full" />
          <Skeleton className="h-4 w-64 max-w-full" />
        </div>
        <Skeleton className="h-7 w-24 shrink-0 rounded-full" />
      </div>
      <div className="mt-3 flex gap-2">
        {Array.from({ length: 3 }, (_, index) => (
          <Skeleton key={index} className="h-14 w-11 shrink-0 rounded-lg" />
        ))}
      </div>
      <Skeleton className="mt-2 h-4 w-3/4" />
    </div>
  )
}