import { useSyncExternalStore } from 'react'
import { Truck } from 'lucide-react'
import { DELIVERY_NOTES } from '@/constants/delivery-notes'
import { getTick, noteIndex, subscribeTicker } from '@/lib/delivery-ticker'
import { cn } from '@/lib/utils'

interface DeliveryNoteProps {
  slot: number
  className?: string
}

export function DeliveryNote({ slot, className }: DeliveryNoteProps) {
  const tick = useSyncExternalStore(subscribeTicker, getTick, getTick)
  const current = DELIVERY_NOTES[noteIndex(slot, tick)]
  const previous = DELIVERY_NOTES[noteIndex(slot, tick - 1)]

  return (
    <div
      aria-hidden="true"
      className={cn(
        'flex h-10 items-start gap-1.5 overflow-hidden border-t border-border pt-2 text-[0.65rem] leading-snug text-muted-foreground sm:text-[0.7rem]',
        className,
      )}
    >
      <Truck size={12} className="mt-0.5 hidden shrink-0 text-primary sm:block" />
      <div className="grid min-w-0 flex-1">
        <span
          key={`out-${tick}`}
          className="col-start-1 row-start-1 line-clamp-2 animate-note-out"
        >
          {previous}
        </span>
        <span
          key={`in-${tick}`}
          className="col-start-1 row-start-1 line-clamp-2 animate-note-in"
        >
          {current}
        </span>
      </div>
    </div>
  )
}