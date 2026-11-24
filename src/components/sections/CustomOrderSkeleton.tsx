import { PageHeaderSkeleton } from '@/components/sections/PageHeaderSkeleton'
import { Skeleton } from '@/components/ui/skeleton'

function Field({ tall = false }: { tall?: boolean }) {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-28" />
      <Skeleton className={tall ? 'h-28 w-full' : 'h-12 w-full'} />
    </div>
  )
}

export function CustomOrderSkeleton() {
  return (
    <div role="status" aria-label="Loading custom order page">
      <PageHeaderSkeleton />

      <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6">
        <div className="space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-6">
          <Field />
          <Field tall />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field />
            <Field />
          </div>
          <Field />
          <Skeleton className="h-12 w-60 rounded-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  )
}