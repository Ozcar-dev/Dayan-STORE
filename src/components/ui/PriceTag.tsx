import { cn, formatPrice } from '@/lib/utils'

interface PriceTagProps {
  price: number
  muted?: boolean
  hidden?: boolean
  className?: string
}

export function PriceTag({ price, muted, hidden, className }: PriceTagProps) {
  return (
    <div
      aria-hidden={hidden}
      className={cn(
        'relative flex h-20 w-20 items-center justify-center rounded-full shadow-md',
        muted
          ? 'bg-muted text-muted-foreground'
          : 'bg-primary text-primary-foreground',
        className,
      )}
    >
      <span className="pointer-events-none absolute inset-1 rounded-full border-2 border-dashed border-current opacity-40" />
      <span className="relative whitespace-nowrap text-[0.8rem] font-bold leading-none">
        {formatPrice(price)}
      </span>
    </div>
  )
}