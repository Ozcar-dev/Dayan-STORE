import { cn } from '@/lib/utils'

interface StitchCircleProps {
  className?: string
  ringClassName?: string
}

export function StitchCircle({ className, ringClassName }: StitchCircleProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute rounded-full', className)}
    >
      <div
        className={cn(
          'absolute inset-[8%] rounded-full border-2 border-dashed border-primary/30',
          ringClassName,
        )}
      />
    </div>
  )
}