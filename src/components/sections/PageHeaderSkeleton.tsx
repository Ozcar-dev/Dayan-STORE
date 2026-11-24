import { Skeleton } from '@/components/ui/skeleton'

export function PageHeaderSkeleton({ subtitle = true }: { subtitle?: boolean }) {
  return (
    <div className="bg-secondary">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <Skeleton className="h-10 w-56 bg-background/60 sm:h-12 sm:w-72" />
        {subtitle && (
          <Skeleton className="mt-2 h-7 w-full max-w-md bg-background/60" />
        )}
      </div>
    </div>
  )
}