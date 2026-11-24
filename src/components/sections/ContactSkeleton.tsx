import { PageHeaderSkeleton } from '@/components/sections/PageHeaderSkeleton'
import { Skeleton } from '@/components/ui/skeleton'

function Field({ tall = false }: { tall?: boolean }) {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className={tall ? 'h-28 w-full' : 'h-12 w-full'} />
    </div>
  )
}

export function ContactSkeleton() {
  return (
    <div role="status" aria-label="Loading contact page">
      <PageHeaderSkeleton />

      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2">
        <div className="space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-6">
          <Field />
          <Field />
          <Field tall />
          <Skeleton className="h-12 w-44 rounded-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        <div className="space-y-6">
          <Skeleton className="h-44 rounded-2xl" />
          <Skeleton className="h-28 rounded-2xl" />
          <Skeleton className="h-36 rounded-2xl" />
        </div>
      </div>
    </div>
  )
}