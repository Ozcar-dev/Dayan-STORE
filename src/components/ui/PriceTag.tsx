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
        'relative flex h-14 w-14 items-center justify-center rounded-full shadow-md transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 sm:h-20 sm:w-20',
        muted
          ? 'bg-muted text-muted-foreground'
          : 'bg-primary text-primary-foreground',
        className,
      )}
    >
      <span className="pointer-events-none absolute inset-1 rounded-full border-2 border-dashed border-current opacity-40" />
      <span className="relative whitespace-nowrap text-[0.62rem] font-bold leading-none sm:text-[0.8rem]">
        {formatPrice(price)}
      </span>
    </div>
  )
}